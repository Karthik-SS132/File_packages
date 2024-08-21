<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="Org.BouncyCastle.Crypto" %>
<%@ Import Namespace="Org.BouncyCastle.Crypto.Parameters" %>
<%@ Import Namespace="Org.BouncyCastle.Security" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Security.Cryptography" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Threading.Tasks" %>
<%@ Import Namespace="Newtonsoft.Json.Linq" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String clientID, countryCode;

        try
        {

            clientID = Request.QueryString["client_id"];
            countryCode = Request.QueryString["country_code"];

            EInvoicing.Begin(clientID, countryCode);

        }
        catch(Exception ex)
        {
            Response.Write("{\"status\":\"FAILURE\", \"data\":\"" + ex.Message + "\"}");
        }
    }

    public class EInvoicing
    {
        public static void Begin( String clientID, String countryCode)
        {
            dynamic eInvoiceConfig, authResponse, updateList, responseObject, updateObject;
            String convertedSourceData, invoiceNo;
            DataTable invoiceList, invoiceCancelList;

            try
            {
                invoiceList = EInvoicing.GetInvoiceList(clientID, countryCode);

                if (invoiceList.Rows.Count != 0)
                {
                    eInvoiceConfig = EInvoicing.GetAuthenticationConfiguration(clientID, countryCode);

					updateList = JsonConvert.DeserializeObject<dynamic>("{}");

					foreach(DataRow sourceData in invoiceList.Rows)
					{
						responseObject = null;
						convertedSourceData = Convert.ToBase64String(Encoding.UTF8.GetBytes(sourceData[1].ToString()));
						invoiceNo = (String)(JsonConvert.DeserializeObject<dynamic>(sourceData[1].ToString())).DocDtls.No;
						eInvoiceConfig.gstin = (String)(JsonConvert.DeserializeObject<dynamic>(sourceData[1].ToString())).SellerDtls.Gstin;
						eInvoiceConfig.user_name = (String)(JsonConvert.DeserializeObject<dynamic>(sourceData[1].ToString())).SellerDtls.UserName;
						eInvoiceConfig.password = (String)(JsonConvert.DeserializeObject<dynamic>(sourceData[1].ToString())).SellerDtls.Password;
						
						if (EInvoicing.Authenticate(clientID, countryCode, eInvoiceConfig))
						{
							authResponse = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + eInvoiceConfig.gstin + "_authResponse.json")));
							
							if(GenerateIRN(clientID, countryCode, eInvoiceConfig, authResponse, convertedSourceData, invoiceNo, out responseObject))
							{
								updateObject = JsonConvert.DeserializeObject<dynamic>("{}");
								updateObject.status = "SUCCESS";
								updateObject.Irn = (String)responseObject.Irn;
								updateObject.SignedQRCode = (String)responseObject.SignedQRCode;
								updateList[invoiceNo] = updateObject;
							}
							else
							{
								updateObject = JsonConvert.DeserializeObject<dynamic>("{}");
								updateObject.status = "FAILURE";
								updateObject.ErrorCode = (String)responseObject.ErrorDetails[0].ErrorCode;
								updateObject.ErrorMessage = (String)responseObject.ErrorDetails[0].ErrorMessage;
								updateList[invoiceNo] = updateObject;
							}
						}
						else
						{
							authResponse = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + eInvoiceConfig.gstin + "_authResponse.json")));
							
							updateObject = JsonConvert.DeserializeObject<dynamic>("{}");
							updateObject.status = "FAILURE";
							updateObject.ErrorCode = (String)authResponse.ErrorDetails[0].ErrorCode;
							updateObject.ErrorMessage = (String)authResponse.ErrorDetails[0].ErrorMessage;
							updateList[invoiceNo] = updateObject;
						}
					}

					EInvoicing.UpdateInvoiceStatus(clientID, countryCode, updateList);
                }
				
				invoiceCancelList = EInvoicing.GetInvoiceCancelList(clientID, countryCode);
				
				if (invoiceCancelList.Rows.Count != 0)
                {
                    eInvoiceConfig = EInvoicing.GetAuthenticationConfiguration(clientID, countryCode);

					updateList = JsonConvert.DeserializeObject<dynamic>("{}");

					foreach(DataRow sourceData in invoiceCancelList.Rows)
					{
						responseObject = null;
						convertedSourceData = Convert.ToBase64String(Encoding.UTF8.GetBytes(sourceData[1].ToString()));
						invoiceNo = (String)(JsonConvert.DeserializeObject<dynamic>(sourceData[1].ToString())).InvNo;
						eInvoiceConfig.gstin = (String)(JsonConvert.DeserializeObject<dynamic>(sourceData[1].ToString())).Gstin;
						eInvoiceConfig.user_name = (String)(JsonConvert.DeserializeObject<dynamic>(sourceData[1].ToString())).UserName;
						eInvoiceConfig.password = (String)(JsonConvert.DeserializeObject<dynamic>(sourceData[1].ToString())).Password;
						
						
						
						if (EInvoicing.Authenticate(clientID, countryCode, eInvoiceConfig))
						{
							authResponse = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + eInvoiceConfig.gstin + "_authResponse.json")));
							
							if(CancelIRN(clientID, countryCode, eInvoiceConfig, authResponse, convertedSourceData, invoiceNo, out responseObject))
							{
								updateObject = JsonConvert.DeserializeObject<dynamic>("{}");
								updateObject.status = "SUCCESS";
								updateObject.Irn = (String)responseObject.Irn;
								updateObject.CancelDate = (String)responseObject.CancelDate;
								updateList[invoiceNo] = updateObject;
							}
							else
							{
								updateObject = JsonConvert.DeserializeObject<dynamic>("{}");
								updateObject.status = "FAILURE";
								updateObject.ErrorCode = (String)responseObject.ErrorDetails[0].ErrorCode;
								updateObject.ErrorMessage = (String)responseObject.ErrorDetails[0].ErrorMessage;
								updateList[invoiceNo] = updateObject;
							}
						}
						else
						{
							authResponse = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + eInvoiceConfig.gstin + "_authResponse.json")));
							
							updateObject = JsonConvert.DeserializeObject<dynamic>("{}");
							updateObject.status = "FAILURE";
							updateObject.ErrorCode = (String)authResponse.ErrorDetails[0].ErrorCode;
							updateObject.ErrorMessage = (String)authResponse.ErrorDetails[0].ErrorMessage;
							updateList[invoiceNo] = updateObject;
						}
					}

					EInvoicing.UpdateInvoiceCancelStatus(clientID, countryCode, updateList);
                }
				
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void UpdateInvoiceStatus(String clientID, String countryCode, dynamic inputParameter)
        {
            DataTable customInfoDetail;
            SqlConnection conn = null;
            SqlCommand command;
            SqlParameter oOutputparamDetailXml, oUpdateStatus, oErrorNo;
            String connectionString, updateStatus;

            try
            {
                /* GETTING THE CONNECTION STRING FOR DATABASE */
                connectionString = ConfigurationManager.ConnectionStrings["conn_" + clientID + "_" + countryCode + "_app"].ConnectionString;


                conn = new SqlConnection();
                command = new SqlCommand();
                customInfoDetail = new DataTable();
                updateStatus = "";


                /* SETTING THE SQL PROPERTIES */
                customInfoDetail.Columns.Add("i_sl_no", typeof(Byte));
                customInfoDetail.Columns.Add("i_inputparam_detail_xml", typeof(String));
                customInfoDetail.Columns.Add("i_crud_ind", typeof(String));
                conn.ConnectionString = connectionString;
                command.Connection = conn;
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Clear();
                command.CommandText = "sp_save_manage_custom_info";
                command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid("2F068E8A-F42F-4486-B41B-EDB915DCA6F6");
                command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = "processuser";
                command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = clientID;
                command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = "en-us";
                command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;
                command.Parameters.Add("@i_custom_info_code", SqlDbType.VarChar, 60).Value = "einvoice";
                command.Parameters.Add("@i_custom_info_ref_no1", SqlDbType.NVarChar, 60).Value = "";
                command.Parameters.Add("@i_custom_info_ref_no2", SqlDbType.NVarChar, 60).Value = "";
                command.Parameters.Add("@i_inputparam_header_xml", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(inputParameter);
                command.Parameters.Add("@i_rec_timestamp", SqlDbType.UniqueIdentifier).Value = new Guid("00000000-0000-0000-0000-000000000000");
                command.Parameters.Add("@i_save_mode", SqlDbType.VarChar, 1).Value = "U";
                oOutputparamDetailXml = command.Parameters.Add("@o_outputparam_detail_xml", SqlDbType.VarChar, -1);
                oOutputparamDetailXml.Direction = ParameterDirection.Output;

                oUpdateStatus = command.Parameters.Add("@o_update_status", SqlDbType.NVarChar, 5);
                oUpdateStatus.Direction = ParameterDirection.Output;
                command.Parameters.Add("@custom_info_detail", SqlDbType.Structured).Value = customInfoDetail;
                oErrorNo = command.Parameters.Add("@errorNo", SqlDbType.VarChar, 15);
                oErrorNo.Direction = ParameterDirection.Output;
                conn.Open();
                command.ExecuteNonQuery();
                if (oErrorNo.Value.ToString().Trim() != "")
                {
                    updateStatus = (oUpdateStatus.Value != DBNull.Value) ? (String)oUpdateStatus.Value.ToString().Trim() : null;
                }
                else
                {
                    updateStatus = (oUpdateStatus.Value != DBNull.Value) ? (String)oUpdateStatus.Value.ToString().Trim() : null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (conn != null)
                {
                    conn.Close();
                }
            }
        }
		
		public static void UpdateInvoiceCancelStatus(String clientID, String countryCode, dynamic inputParameter)
        {
            DataTable customInfoDetail;
            SqlConnection conn = null;
            SqlCommand command;
            SqlParameter oOutputparamDetailXml, oUpdateStatus, oErrorNo;
            String connectionString, updateStatus;

            try
            {
                /* GETTING THE CONNECTION STRING FOR DATABASE */
                connectionString = ConfigurationManager.ConnectionStrings["conn_" + clientID + "_" + countryCode + "_app"].ConnectionString;


                conn = new SqlConnection();
                command = new SqlCommand();
                customInfoDetail = new DataTable();
                updateStatus = "";


                /* SETTING THE SQL PROPERTIES */
                customInfoDetail.Columns.Add("i_sl_no", typeof(Byte));
                customInfoDetail.Columns.Add("i_inputparam_detail_xml", typeof(String));
                customInfoDetail.Columns.Add("i_crud_ind", typeof(String));
                conn.ConnectionString = connectionString;
                command.Connection = conn;
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Clear();
                command.CommandText = "sp_save_manage_custom_info";
                command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid("2F068E8A-F42F-4486-B41B-EDB915DCA6F6");
                command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = "processuser";
                command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = clientID;
                command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = "en-us";
                command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;
                command.Parameters.Add("@i_custom_info_code", SqlDbType.VarChar, 60).Value = "cancel_einvoice";
                command.Parameters.Add("@i_custom_info_ref_no1", SqlDbType.NVarChar, 60).Value = "";
                command.Parameters.Add("@i_custom_info_ref_no2", SqlDbType.NVarChar, 60).Value = "";
                command.Parameters.Add("@i_inputparam_header_xml", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(inputParameter);
                command.Parameters.Add("@i_rec_timestamp", SqlDbType.UniqueIdentifier).Value = new Guid("00000000-0000-0000-0000-000000000000");
                command.Parameters.Add("@i_save_mode", SqlDbType.VarChar, 1).Value = "U";
                oOutputparamDetailXml = command.Parameters.Add("@o_outputparam_detail_xml", SqlDbType.VarChar, -1);
                oOutputparamDetailXml.Direction = ParameterDirection.Output;

                oUpdateStatus = command.Parameters.Add("@o_update_status", SqlDbType.NVarChar, 5);
                oUpdateStatus.Direction = ParameterDirection.Output;
                command.Parameters.Add("@custom_info_detail", SqlDbType.Structured).Value = customInfoDetail;
                oErrorNo = command.Parameters.Add("@errorNo", SqlDbType.VarChar, 15);
                oErrorNo.Direction = ParameterDirection.Output;
                conn.Open();
                command.ExecuteNonQuery();
                if (oErrorNo.Value.ToString().Trim() != "")
                {
                    updateStatus = (oUpdateStatus.Value != DBNull.Value) ? (String)oUpdateStatus.Value.ToString().Trim() : null;
                }
                else
                {
                    updateStatus = (oUpdateStatus.Value != DBNull.Value) ? (String)oUpdateStatus.Value.ToString().Trim() : null;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (conn != null)
                {
                    conn.Close();
                }
            }
        }

        public static DataTable GetInvoiceList(String clientID, String countryCode)
        {
            DataTable invoiceList;
            SqlDataAdapter adapter;
            SqlConnection conn = null;
            SqlCommand command;
            SqlParameter oRetrieveStatus;
            String connectionString;

            try
            {
                /* GETTING THE CONNECTION STRING FOR DATABASE */
                connectionString = ConfigurationManager.ConnectionStrings["conn_" + clientID + "_" + countryCode + "_app"].ConnectionString;


                conn = new SqlConnection();
                command = new SqlCommand();
                invoiceList = new DataTable();


                /* SETTING THE SQL PROPERTIES */
                conn.ConnectionString = connectionString;
                command.Connection = conn;
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Clear();
                command.CommandText = "sp_retrieve_manage_custom_info_list";
                command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid("2F068E8A-F42F-4486-B41B-EDB915DCA6F6");
                command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = "processuser";
                command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = clientID;
                command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = "en-us";
                command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;
                command.Parameters.Add("@i_custom_info_code", SqlDbType.VarChar, 60).Value = "einvoice";
                command.Parameters.Add("@i_inputparam_xml", SqlDbType.NVarChar, -1).Value = "";

                oRetrieveStatus = command.Parameters.Add("@o_retrieve_status", SqlDbType.NVarChar, 5);
                oRetrieveStatus.Direction = ParameterDirection.Output;
                conn.Open();

                adapter = new SqlDataAdapter(command);
                adapter.Fill(invoiceList);

                return invoiceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (conn != null)
                {
                    conn.Close();
                }
            }
        }
		
		public static DataTable GetInvoiceCancelList(String clientID, String countryCode)
        {
            DataTable invoiceList;
            SqlDataAdapter adapter;
            SqlConnection conn = null;
            SqlCommand command;
            SqlParameter oRetrieveStatus;
            String connectionString;

            try
            {
                /* GETTING THE CONNECTION STRING FOR DATABASE */
                connectionString = ConfigurationManager.ConnectionStrings["conn_" + clientID + "_" + countryCode + "_app"].ConnectionString;


                conn = new SqlConnection();
                command = new SqlCommand();
                invoiceList = new DataTable();


                /* SETTING THE SQL PROPERTIES */
                conn.ConnectionString = connectionString;
                command.Connection = conn;
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Clear();
                command.CommandText = "sp_retrieve_manage_custom_info_list";
                command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid("2F068E8A-F42F-4486-B41B-EDB915DCA6F6");
                command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = "processuser";
                command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = clientID;
                command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = "en-us";
                command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;
                command.Parameters.Add("@i_custom_info_code", SqlDbType.VarChar, 60).Value = "cancel_einvoice";
                command.Parameters.Add("@i_inputparam_xml", SqlDbType.NVarChar, -1).Value = "";

                oRetrieveStatus = command.Parameters.Add("@o_retrieve_status", SqlDbType.NVarChar, 5);
                oRetrieveStatus.Direction = ParameterDirection.Output;
                conn.Open();

                adapter = new SqlDataAdapter(command);
                adapter.Fill(invoiceList);

                return invoiceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (conn != null)
                {
                    conn.Close();
                }
            }
        }

        public static bool GenerateIRN(String clientID, String countryCode, dynamic eInvoiceConfig, dynamic authResponse, String sourceData, String invoiceNo, out dynamic responseObject)
        {
            HttpWebRequest request;
            HttpWebResponse response;
            String irnPublicKey, irnUrl, irnClientID, irnClientSecret, irnContentType, irnGSTIN, irnUserName, irnPassword, irnAuthToken, decryptedSek, responseMessage, decryptedResponse;
            dynamic payloadObject;
            byte[] encodedInputData;
            bool returnStatus;

            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                payloadObject = JsonConvert.DeserializeObject<dynamic>("{}");

                irnPublicKey = (String)eInvoiceConfig.public_key;
                irnUrl = (String)eInvoiceConfig.generate_irn_url;
                irnClientID = (String)eInvoiceConfig.client_id;
                irnClientSecret = (String)eInvoiceConfig.client_secret;
                irnContentType = (String)eInvoiceConfig.content_type;
                irnGSTIN = (String)eInvoiceConfig.gstin;
                irnUserName = (String)eInvoiceConfig.user_name;
                irnPassword = (String)eInvoiceConfig.password;
                irnAuthToken = (String)authResponse.AuthToken;

                request = (HttpWebRequest)WebRequest.Create(irnUrl);
                request.Method = "POST";
                request.ContentType = irnContentType;
                request.Headers.Add("client-id", irnClientID);
                request.Headers.Add("client-secret", irnClientSecret);
                request.Headers.Add("gstin", irnGSTIN);
                request.Headers.Add("user-name", irnUserName);
                request.Headers.Add("authtoken", irnAuthToken);


                decryptedSek = DecryptBySymmerticKey((String)authResponse.Sek, Convert.FromBase64String((String)authResponse.AppKeyString));
                payloadObject.Data = EncryptBySymmetricKey(sourceData, decryptedSek);

                encodedInputData = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(payloadObject));
                request.ContentLength = encodedInputData.Length;
                using (var stream = request.GetRequestStream())
                {
                    stream.Write(encodedInputData, 0, encodedInputData.Length);
                }

                response = (HttpWebResponse)request.GetResponse();
                responseMessage = (new StreamReader(response.GetResponseStream()).ReadToEnd());
                responseObject = JsonConvert.DeserializeObject<dynamic>(responseMessage);



                if ((int)responseObject.Status == 1)
                {
                    if(!Directory.Exists(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + "success")))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + "success"));
                    }

                    decryptedResponse = DecryptBySymmerticKey((String)responseObject.Data, Convert.FromBase64String(decryptedSek));
					
					responseObject = JsonConvert.DeserializeObject<dynamic>(Encoding.UTF8.GetString(Convert.FromBase64String(decryptedResponse)));

                    File.WriteAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + "success") + "\\"+ invoiceNo.Replace("\\", "-").Replace("/", "-") + ".txt", Encoding.UTF8.GetString(Convert.FromBase64String(decryptedResponse)));
                    returnStatus = true;
                }
                else
                {
                    if(!Directory.Exists(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + "failure")))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + "failure"));
                    }

                    File.WriteAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + "failure")+ "\\" + invoiceNo.Replace("\\", "-").Replace("/", "-") + ".txt", JsonConvert.SerializeObject(responseObject));
                    returnStatus = false;
                }

                return returnStatus;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
		
		public static bool CancelIRN(String clientID, String countryCode, dynamic eInvoiceConfig, dynamic authResponse, String sourceData, String invoiceNo, out dynamic responseObject)
        {
            HttpWebRequest request;
            HttpWebResponse response;
            String irnPublicKey, irnUrl, irnClientID, irnClientSecret, irnContentType, irnGSTIN, irnUserName, irnPassword, irnAuthToken, decryptedSek, responseMessage, decryptedResponse;
            dynamic payloadObject;
            byte[] encodedInputData;
            bool returnStatus;

            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                payloadObject = JsonConvert.DeserializeObject<dynamic>("{}");

                irnPublicKey = (String)eInvoiceConfig.public_key;
                irnUrl = (String)eInvoiceConfig.cancel_irn_url;
                irnClientID = (String)eInvoiceConfig.client_id;
                irnClientSecret = (String)eInvoiceConfig.client_secret;
                irnContentType = (String)eInvoiceConfig.content_type;
                irnGSTIN = (String)eInvoiceConfig.gstin;
                irnUserName = (String)eInvoiceConfig.user_name;
                irnPassword = (String)eInvoiceConfig.password;
                irnAuthToken = (String)authResponse.AuthToken;

                request = (HttpWebRequest)WebRequest.Create(irnUrl);
                request.Method = "POST";
                request.ContentType = irnContentType;
                request.Headers.Add("client-id", irnClientID);
                request.Headers.Add("client-secret", irnClientSecret);
                request.Headers.Add("gstin", irnGSTIN);
                request.Headers.Add("user-name", irnUserName);
                request.Headers.Add("authtoken", irnAuthToken);


                decryptedSek = DecryptBySymmerticKey((String)authResponse.Sek, Convert.FromBase64String((String)authResponse.AppKeyString));
                payloadObject.Data = EncryptBySymmetricKey(sourceData, decryptedSek);

                encodedInputData = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(payloadObject));
                request.ContentLength = encodedInputData.Length;
                using (var stream = request.GetRequestStream())
                {
                    stream.Write(encodedInputData, 0, encodedInputData.Length);
                }

                response = (HttpWebResponse)request.GetResponse();
                responseMessage = (new StreamReader(response.GetResponseStream()).ReadToEnd());
                responseObject = JsonConvert.DeserializeObject<dynamic>(responseMessage);

                if ((int)responseObject.Status == 1)
                {
                    if(!Directory.Exists(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "cancelEInvoice" + "\\" + "success")))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "cancelEInvoice" + "\\" + "success"));
                    }

                    decryptedResponse = DecryptBySymmerticKey((String)responseObject.Data, Convert.FromBase64String(decryptedSek));
					
					responseObject = JsonConvert.DeserializeObject<dynamic>(Encoding.UTF8.GetString(Convert.FromBase64String(decryptedResponse)));


                    File.WriteAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "cancelEInvoice" + "\\" + "success") + "\\" + invoiceNo.Replace("\\", "-").Replace("/", "-") + ".txt", Encoding.UTF8.GetString(Convert.FromBase64String(decryptedResponse)));
                    returnStatus = true;
                }
                else
                {
                    if(!Directory.Exists(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "cancelEInvoice" + "\\" + "failure")))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "cancelEInvoice" + "\\" + "failure"));
                    }

                    File.WriteAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "cancelEInvoice" + "\\" + "failure") + "\\" + invoiceNo.Replace("\\", "-").Replace("/", "-") + ".txt", JsonConvert.SerializeObject(responseObject));
                    returnStatus = false;
                }

                return returnStatus;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static dynamic GetAuthenticationConfiguration(String clientID, String countryCode)
        {
            String authConfigData;
            dynamic authConfig;

            try
            {
                authConfigData = File.ReadAllText(HttpContext.Current.Server.MapPath("~/fmt" + "\\" + "eInvoice" + "\\" + "eInvoice_configuration_" + clientID + "_" + countryCode + ".json"));
                authConfig = JsonConvert.DeserializeObject<dynamic>(authConfigData);

                return authConfig;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool Authenticate(String clientID, String countryCode, dynamic authConfig)
        {
            HttpWebRequest request;
            HttpWebResponse response;
            String authPublicKey, authUrl, authClientID, authClientSecret, authContentType, authGSTIN, authUserName, authPassword, authAppKeyString, responseMessage;
            dynamic inputObject, payloadObject, responseObject, returnObject, authResponse;
            byte[] authAppKey, encodedInputData;
            bool returnStatus;

            try
            {
                returnStatus = false;

                if (File.Exists(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + authConfig.gstin + "_authResponse.json")))
                {
                    authResponse = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + authConfig.gstin + "_authResponse.json")));
                    if ((int)authResponse.Status == 1)
                    {
                        if (DateTime.Parse((String)authResponse.TokenExpiry) > DateTime.Now)
                        {
                            returnStatus = true;
                        }
                    }
                }

                if (returnStatus == false)
                {
                    ServicePointManager.Expect100Continue = true;
                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                    inputObject = JsonConvert.DeserializeObject<dynamic>("{}");
                    payloadObject = JsonConvert.DeserializeObject<dynamic>("{}");

                    authPublicKey = (String)authConfig.public_key;
                    authUrl = (String)authConfig.auth_url;
                    authClientID = (String)authConfig.client_id;
                    authClientSecret = (String)authConfig.client_secret;
                    authContentType = (String)authConfig.content_type;
                    authGSTIN = (String)authConfig.gstin;
                    authUserName = (String)authConfig.user_name;
                    authPassword = (String)authConfig.password;


                    authAppKey = EInvoicing.GenerateAuthAppKey();
                    authAppKeyString = Convert.ToBase64String(authAppKey);


                    inputObject.UserName = authUserName;
                    inputObject.Password = authPassword;
                    inputObject.AppKey = authAppKeyString;
                    inputObject.ForceRefreshAccessToken = true;

                    payloadObject.Data = EncryptAuthRequestData(Convert.ToBase64String(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(inputObject))), authPublicKey);

                    request = (HttpWebRequest)WebRequest.Create(authUrl);
                    request.Method = "POST";
                    request.ContentType = authContentType;
                    request.Headers.Add("client-id", authClientID);
                    request.Headers.Add("client-secret", authClientSecret);
                    request.Headers.Add("gstin", authGSTIN);
                    encodedInputData = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(payloadObject));
                    request.ContentLength = encodedInputData.Length;
                    using (var stream = request.GetRequestStream())
                    {
                        stream.Write(encodedInputData, 0, encodedInputData.Length);
                    }

                    response = (HttpWebResponse)request.GetResponse();
                    responseMessage = (new StreamReader(response.GetResponseStream()).ReadToEnd());
                    responseObject = JsonConvert.DeserializeObject<dynamic>(responseMessage);

                    if(!Directory.Exists(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice")))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice"));
                    }

                    if ((int)responseObject.Status == 1)
                    {
                        returnObject = responseObject.Data;
                        returnObject.AppKeyString = authAppKeyString;
                        returnObject.Status = responseObject.Status;

                        File.WriteAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + authConfig.gstin + "_authResponse.json"), JsonConvert.SerializeObject(returnObject));
                        returnStatus = true;
                    }
                    else
                    {
                        File.WriteAllText(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "eInvoice" + "\\" + authConfig.gstin + "_authResponse.json"), JsonConvert.SerializeObject(responseObject));
                        returnStatus = false;
                    }
                }

                return returnStatus;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static byte[] GenerateAuthAppKey()
        {
            Aes keyGenerator;
            byte[] authAppKey;

            try
            {
                keyGenerator = Aes.Create();
                authAppKey = keyGenerator.Key;

                return authAppKey;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static String EncryptAuthRequestData(String data, String key)
        {
            byte[] keyBytes, plaintext, ciphertext;
            AsymmetricKeyParameter asymmetricKeyParameter;
            RsaKeyParameters rsaKeyParameters;
            RSAParameters rsaParameters;
            RSACryptoServiceProvider rsa;
            String cipherresult;

            try
            {
                keyBytes = Convert.FromBase64String(key);
                asymmetricKeyParameter = PublicKeyFactory.CreateKey(keyBytes);
                rsaKeyParameters = (RsaKeyParameters)asymmetricKeyParameter;
                rsaParameters = new RSAParameters();
                rsaParameters.Modulus = rsaKeyParameters.Modulus.ToByteArrayUnsigned();
                rsaParameters.Exponent = rsaKeyParameters.Exponent.ToByteArrayUnsigned();
                rsa = new RSACryptoServiceProvider();
                rsa.ImportParameters(rsaParameters);
                plaintext = Encoding.UTF8.GetBytes(data);
                ciphertext = rsa.Encrypt(plaintext, false);
                cipherresult = Convert.ToBase64String(ciphertext);

                return cipherresult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string DecryptBySymmerticKey(string encryptedText, byte[] key)
        {
            byte[] dataToDecrypt, deCipher;
            AesManaged tdes;
            ICryptoTransform decrypt__1;
            string EK_result;

            try
            {
                dataToDecrypt = Convert.FromBase64String(encryptedText);
                var keyBytes = key;
                tdes = new AesManaged();
                tdes.KeySize = 256;
                tdes.BlockSize = 128;
                tdes.Key = keyBytes;
                tdes.Mode = CipherMode.ECB;
                tdes.Padding = PaddingMode.PKCS7;
                decrypt__1 = tdes.CreateDecryptor();
                deCipher = decrypt__1.TransformFinalBlock(dataToDecrypt, 0, dataToDecrypt.Length);
                tdes.Clear();
                EK_result = Convert.ToBase64String(deCipher);

                return EK_result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static string EncryptBySymmetricKey(string jsondata, string sek)
        {
            byte[] dataToEncrypt, deCipher;
            AesManaged tdes;
            ICryptoTransform encrypt__1;
            string EK_result;

            try
            {
                dataToEncrypt = Convert.FromBase64String(jsondata);
                var keyBytes = Convert.FromBase64String(sek);
                tdes = new AesManaged();
                tdes.KeySize = 256;
                tdes.BlockSize = 128;
                tdes.Key = keyBytes;
                tdes.Mode = CipherMode.ECB;
                tdes.Padding = PaddingMode.PKCS7;
                encrypt__1 = tdes.CreateEncryptor();
                deCipher = encrypt__1.TransformFinalBlock(dataToEncrypt, 0, dataToEncrypt.Length);
                tdes.Clear();
                EK_result = Convert.ToBase64String(deCipher);

                return EK_result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
</script>
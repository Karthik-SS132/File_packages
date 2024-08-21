<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="Newtonsoft.Json.Linq" %>
<%@ Import Namespace="System.Text.RegularExpressions" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String clientID, countryCode, appID, currentDomain;
        JArray payLoadList;

        try
        {
            clientID = Request.QueryString["clientID"].ToString();
            countryCode = Request.QueryString["countryCode"].ToString();
            appID = Request.QueryString["appID"].ToString();
            currentDomain = HttpContext.Current.Request.Url.Scheme +"://" + HttpContext.Current.Request.Url.Authority;
           
            payLoadList = GetList(clientID, countryCode, appID);
            foreach (JObject payLoad in payLoadList)
            {
                ExecuteEscalationPayLoad(clientID, countryCode, appID, currentDomain, payLoad.ToString());
            }

            GenerateEscalationNotification(clientID, countryCode, appID);
        }
        catch (Exception ex)
        {
            Response.Write("{\"status\":\"FAILURE\", \"data\":\"" + ex.Message + "\"}");
        }
    }

    public static dynamic GetList(String clientID, String countryCode, String appID)
    {
        SqlConnection conn = null;
        SqlCommand command;
        SqlParameter oRetrieveStatus;
        String connectionString, returnListString;
        DataTable resultTable;
        SqlDataAdapter dataAdapter;
        dynamic inputparameter, returnList;

        try
        {
            /* GETTING THE CONNECTION STRING FOR DATABASE */
            connectionString = ConfigurationManager.ConnectionStrings["conn_" + clientID + "_" + countryCode + "_app"].ConnectionString;

            conn = new SqlConnection();
            command = new SqlCommand();
            resultTable = new DataTable();
            dataAdapter = new SqlDataAdapter();


            /* SETTING THE INPUTPARAM HEADER */
            inputparameter = JsonConvert.DeserializeObject<dynamic>("{\"app_id\":\"" + appID + "\"}");


            /* SETTING THE SQL PROPERTIES */
            conn.ConnectionString = connectionString;
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Clear();
            command.CommandText = "sp_retrieve_manage_custom_info_list";
            command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid("00000000-0000-0000-0000-000000000000");
            command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = "system";
            command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = clientID;
            command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = "en-us";
            command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;
            command.Parameters.Add("@i_custom_info_code", SqlDbType.VarChar, 60).Value = "mserviceAI_escalationList";
            command.Parameters.Add("@i_inputparam_xml", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(inputparameter);

            oRetrieveStatus = command.Parameters.Add("@o_retrieve_status", SqlDbType.NVarChar, 5);
            oRetrieveStatus.Direction = ParameterDirection.Output;

            conn.Open();
            dataAdapter.SelectCommand = command;
            dataAdapter.Fill(resultTable);	
            if (oRetrieveStatus.Value.ToString().Trim() == "SP001")
            {
                returnListString = "";

                foreach(DataRow row in resultTable.Rows)
                {
                    returnListString += "," + row[1].ToString();

                }

                returnListString = "[" + ((returnListString != "") ? (returnListString.Substring(1)) : (returnListString)) + "]";
				
                returnList = JArray.Parse(returnListString);
            }
            else
            {
                returnList = JArray.Parse("[]");
            }
			
            return returnList;
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

    public static void ExecuteEscalationPayLoad(String clientID, String countryCode, String appID, String currentDomain, String payLoad)
    {
        String targetURL;
        HttpWebRequest request;
        HttpWebResponse response;
        String responseMessage;
        Byte[] encodedInputData;
        try
        {
            targetURL = currentDomain + "/common/components/msvMsg/mserviceAI.aspx";
            request = (HttpWebRequest)WebRequest.Create(targetURL);
            encodedInputData = Encoding.UTF8.GetBytes(payLoad);
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";
            request.ContentLength = encodedInputData.Length;
            using (var stream = request.GetRequestStream())
            {
                stream.Write(encodedInputData, 0, encodedInputData.Length);
            }
            response = (HttpWebResponse)request.GetResponse();
            responseMessage = (new StreamReader(response.GetResponseStream()).ReadToEnd());
			
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public static void GenerateEscalationNotification(String clientID, String countryCode, String appID)
    {
        SqlConnection conn = null;
        SqlCommand command;
        SqlParameter oRetrieveStatus;
        String connectionString;
        DataTable resultTable;
        SqlDataAdapter dataAdapter;

        try
        {
            /* GETTING THE CONNECTION STRING FOR DATABASE */
            connectionString = ConfigurationManager.ConnectionStrings["conn_" + clientID + "_" + countryCode + "_app"].ConnectionString;

            conn = new SqlConnection();
            command = new SqlCommand();
            resultTable = new DataTable();
            dataAdapter = new SqlDataAdapter();


            /* SETTING THE SQL PROPERTIES */
            conn.ConnectionString = connectionString;
            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Clear();
            command.CommandText = "sp_retrieve_listof_delay_notifications_for_delivery";
            command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid("00000000-0000-0000-0000-000000000000");
            command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = "system";
            command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = clientID;
            command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = "en-us";
            command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;
            command.Parameters.Add("@i_transaction_type_code", SqlDbType.VarChar, 60).Value = "CALL";

            oRetrieveStatus = command.Parameters.Add("@o_retrieve_status", SqlDbType.NVarChar, 5);
            oRetrieveStatus.Direction = ParameterDirection.Output;

            conn.Open();
            dataAdapter.SelectCommand = command;
            dataAdapter.Fill(resultTable);
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

</script>

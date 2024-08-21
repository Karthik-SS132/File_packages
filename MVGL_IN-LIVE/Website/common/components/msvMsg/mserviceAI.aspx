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
        String requestStream, returnValue;
        dynamic msgHeader, msgBody;

        try
        {
            requestStream = new StreamReader(Request.InputStream).ReadToEnd();

            MserviceAI.ProcessData(requestStream, out msgHeader, out msgBody);

            returnValue = PushNotification.SendMessage(msgHeader, msgBody);

            Response.Write(returnValue);
        }
        catch (Exception ex)
        {
            Response.Write("{\"status\":\"FAILURE\", \"data\":\"" + ex.Message + "\"}");
        }
    }

    public class MserviceAI
    {
        public static void GetMessageParameters(String requestStream, out dynamic msgHeader, out dynamic msgBody)
        {
            dynamic msgObject;

            try
            {
                msgObject = JsonConvert.DeserializeObject<dynamic>(requestStream);
                msgHeader = msgObject.msgHeader;
                msgBody = msgObject.msgBody;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void ProcessData(String data, out dynamic msgHeader, out dynamic msgBody)
        {
            dynamic autoReplyResult;
			bool hasSubKey;
            try
            {
				hasSubKey = true;
                MserviceAI.GetMessageParameters(data, out msgHeader, out msgBody);

                if ((String)msgBody.subKey == "")
                {
                    msgBody.subKey = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss-") + (String)msgBody.from.id + "-" + (String)msgBody.from.channel;
					hasSubKey = false;
                }

                if ((String)msgBody.actionPath != "")
                {				
					/* SAVING THE ATTACHMENT DURING THE ACTION */
					if ((String)msgBody.msgType == "action")
					{
						foreach (dynamic attachmentObject in msgBody.attachments)
						{
							if ((String)attachmentObject.type == "I")
							{
								if ((String)attachmentObject.base64 != null && (String)attachmentObject.base64 != "")
								{
									File.WriteAllBytes(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + ((String)msgHeader.clientID) + "\\" + ((String)msgHeader.countryCode) + "\\" + ((String)attachmentObject.src)), Convert.FromBase64String((new Regex(@"^[\w/\:.-]+;base64,")).Replace(((String)attachmentObject.base64), String.Empty)));
									attachmentObject.base64 = "";
								}
							}
						}
					}
				
                    autoReplyResult = AutoReply(msgHeader, msgBody);

                    if (autoReplyResult.content != "")
                    {
						if(hasSubKey == true && (String)msgBody.followup == "")
						{
							/* SAVE THE MESSAGE TO HISTORY */
							PushNotification.SaveMessage(msgHeader, msgBody);
						}
						
                        msgBody.msgType = autoReplyResult.msgType;
                        msgBody.actionPath = autoReplyResult.actionPath;
                        msgBody.content = autoReplyResult.content;
                        msgBody.suggestions = autoReplyResult.suggestions;
                        msgBody.attachments = autoReplyResult.attachments;
                        msgBody.custom = autoReplyResult.custom;
                        msgBody.autoReply = "true";
                        msgBody.from.sysMsg = "true";
                        msgBody.followup = autoReplyResult.followupPath;
                        if (autoReplyResult.actions != null)
                        {
                            msgBody.actions = autoReplyResult.actions;
                        }
                        if (autoReplyResult.allowMessage != null)
                        {
                            msgBody.allowMsg = autoReplyResult.allowMessage;
                        }
                        if (autoReplyResult.allowAttachment != null)
                        {
                            msgBody.allowAttach = autoReplyResult.allowAttachment;
                        }
						if (autoReplyResult.escalationTimer != null)
                        {
                            msgBody.idleTime = autoReplyResult.escalationTimer;
                        }else{
							msgBody.idleTime = "";
						}
						if (autoReplyResult.refreshHeader != null)
                        {
                            msgBody.refreshHeader = autoReplyResult.refreshHeader;
                        }else{
							msgBody.refreshHeader = "";
						}
                    }
                    else
                    {						
                        msgBody.autoReply = "false";
						
                        if (autoReplyResult.actions != null)
                        {
                            msgBody.actions = autoReplyResult.actions;
                        }
                    }

                    msgBody.msgTo = MserviceAI.GetList(msgHeader, msgBody, "recipientList", autoReplyResult.recipients);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static String GetAutoReplyData(dynamic msgHeader, dynamic msgBody)
        {
            String returnValue, filePath;

            try
            {
                returnValue = "";
                filePath = HttpContext.Current.Server.MapPath("~/fmt" + "\\" + "msvMsg" + "\\" + ((String)msgHeader.appID) + "\\" + "fcmautoreply" + "_" + ((String)msgBody.key) + "_" + (String)msgHeader.clientID + "_" + (String)msgHeader.countryCode + ".json");

                if (File.Exists(filePath))
                {
                    returnValue = File.ReadAllText(filePath);
                }
                else
                {
                    filePath =HttpContext.Current.Server.MapPath("~/fmt" + "\\" + "msvMsg" + "\\" + ((String)msgHeader.appID) + "\\" + "fcmautoreply" + "_" + (String)msgHeader.clientID + "_" + (String)msgHeader.countryCode + ".json");
                    if (File.Exists(filePath))
                    {
                        returnValue = File.ReadAllText(filePath);
                    }
                }

                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static dynamic AutoReply(dynamic msgHeader, dynamic msgBody)
        {
            String autoReplyData, finalActionPath;
            dynamic autoReplyObj, currentReplyObj, autoReplyResult, actionResponse;

            try
            {
                autoReplyResult = JsonConvert.DeserializeObject<dynamic>("{}");

                autoReplyData = GetAutoReplyData(msgHeader, msgBody);
                autoReplyObj = JsonConvert.DeserializeObject<dynamic>(autoReplyData);
                finalActionPath = ((String)msgBody.followup == "" || (String)msgBody.followup == "false" ) ? ((String)msgBody.actionPath) : ((String)msgBody.actionPath + "/" + (String)msgBody.followup);
                currentReplyObj = DataBinder.Eval(autoReplyObj, finalActionPath + "." + (String)msgBody.msgType);
				
                if (currentReplyObj.ToString().Substring(0, 1) == "@")
                {
                    currentReplyObj = DataBinder.Eval(autoReplyObj, currentReplyObj.ToString());
                }

                if (currentReplyObj.action != null)
                {
                    actionResponse = MserviceAI.ApplyAction(msgHeader, msgBody, currentReplyObj.action);
                    msgBody.custom = actionResponse.msgBody.custom;
                }


                autoReplyResult.content = MserviceAI.GetTransformedContent((String)currentReplyObj.content, msgBody);
                autoReplyResult.msgType = (String)currentReplyObj.msgType;
                autoReplyResult.actionPath = (String)currentReplyObj.actionPath;
                autoReplyResult.recipients = currentReplyObj.recipients;
                autoReplyResult.custom = msgBody.custom;
                autoReplyResult.followupPath = (currentReplyObj.followupPath != null) ? ((String)currentReplyObj.followupPath) : ("false");

                if (currentReplyObj.suggestions != null)
                {
                    if (currentReplyObj.suggestions.Count != null)
                    {
                        autoReplyResult.suggestions = currentReplyObj.suggestions;
                    }
                    else
                    {
                        autoReplyResult.suggestions = MserviceAI.GetList(msgHeader, msgBody, "suggestionList", currentReplyObj.suggestions);
                    }
                }
                else
                {
                    autoReplyResult.suggestions = JsonConvert.DeserializeObject<dynamic>("[]");
                }

                if (currentReplyObj.attachments != null)
                {
                    if (currentReplyObj.attachments.Count != null)
                    {
                        autoReplyResult.attachments = currentReplyObj.attachments;
                    }
                    else
                    {
                        autoReplyResult.attachments = MserviceAI.GetList(msgHeader, msgBody, "attachmentList", currentReplyObj.attachments);
                    }
                }
                else
                {
                    autoReplyResult.attachments = JsonConvert.DeserializeObject<dynamic>("[]");
                }

                if (currentReplyObj.actions != null)
                {
                    if (currentReplyObj.actions.Count != null)
                    {
                        autoReplyResult.actions = currentReplyObj.actions;
                    }
                    else
                    {
                        autoReplyResult.actions = MserviceAI.GetList(msgHeader, msgBody, "actionList", currentReplyObj.actions);
                    }
                }
                else
                {
                    autoReplyResult.actions = JsonConvert.DeserializeObject<dynamic>("[]");
                }
                if (currentReplyObj.allowMessage != null)
                {
                    autoReplyResult.allowMessage = currentReplyObj.allowMessage;
                }
                if (currentReplyObj.allowAttachment != null)
                {
                    autoReplyResult.allowAttachment = currentReplyObj.allowAttachment;
                }
				if (currentReplyObj.escalationTimer != null)
                {
                    autoReplyResult.escalationTimer = currentReplyObj.escalationTimer;
                }else{
					autoReplyResult.escalationTimer = "";
				}
				if (currentReplyObj.refreshHeader != null)
                {
                    autoReplyResult.refreshHeader = currentReplyObj.refreshHeader;
                }else{
					autoReplyResult.refreshHeader = "";
				}

                return autoReplyResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static dynamic GetList(dynamic msgHeader, dynamic msgBody, String listType, dynamic listConfiguration)
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
                connectionString = ConfigurationManager.ConnectionStrings["conn_" + (String)msgHeader.clientID + "_" + (String)msgHeader.countryCode + "_app"].ConnectionString;


                conn = new SqlConnection();
                command = new SqlCommand();
                resultTable = new DataTable();
                dataAdapter = new SqlDataAdapter();


                /* SETTING THE INPUTPARAM HEADER */
                inputparameter = JsonConvert.DeserializeObject<dynamic>("{}");
                inputparameter.msgHeader = msgHeader;
                inputparameter.msgBody = msgBody;
                inputparameter[listType] = listConfiguration;


                /* SETTING THE SQL PROPERTIES */
                conn.ConnectionString = connectionString;
                command.Connection = conn;
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Clear();
                command.CommandText = "sp_retrieve_manage_custom_info_list";
                command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid((String)msgHeader.sessionID);
                command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = (String)msgHeader.userID;
                command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = (String)msgHeader.clientID;
                command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = (String)msgHeader.localeID;
                command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = (String)msgHeader.countryCode;
                command.Parameters.Add("@i_custom_info_code", SqlDbType.VarChar, 60).Value = "mserviceAI_" + listType;
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
						if (listType == "recipientList")
						{
							returnListString += "," + "\"" + row[1].ToString() + "\"";
						}
						else
						{
							returnListString += "," + row[1].ToString();
						}                        
                    }

                    returnListString = "[" + ((returnListString != "") ? (returnListString.Substring(1)) : (returnListString)) + "]";

                    returnList = JsonConvert.DeserializeObject<dynamic>(returnListString);
                }
                else
                {
                    returnList = JsonConvert.DeserializeObject<dynamic>("[]");
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

        public static dynamic ApplyAction(dynamic msgHeader, dynamic msgBody, dynamic actionConfiguration)
        {
            DataTable customInfoDetail;
            SqlConnection conn = null;
            SqlCommand command;
            SqlParameter oOutputparamDetailXml, oUpdateStatus, oErrorNo;
            String connectionString, updateStatus, errorNo;
            dynamic inputparamHeader, outputParameter;

            try
            {
                /* GETTING THE CONNECTION STRING FOR DATABASE */
                connectionString = ConfigurationManager.ConnectionStrings["conn_" + (String)msgHeader.clientID + "_" + (String)msgHeader.countryCode + "_app"].ConnectionString;


                conn = new SqlConnection();
                command = new SqlCommand();
                customInfoDetail = new DataTable();
                updateStatus = "";
                errorNo = "";
                outputParameter = null;


                /* SETTING THE INPUTPARAM HEADER */
                inputparamHeader = JsonConvert.DeserializeObject<dynamic>("{}");
                inputparamHeader.msgHeader = msgHeader;
                inputparamHeader.msgBody = msgBody;
                inputparamHeader.action = actionConfiguration;


                /* SETTING THE SQL PROPERTIES */
                customInfoDetail.Columns.Add("i_sl_no", typeof(Byte));
                customInfoDetail.Columns.Add("i_inputparam_detail_xml", typeof(String));
                customInfoDetail.Columns.Add("i_crud_ind", typeof(String));
                conn.ConnectionString = connectionString;
                command.Connection = conn;
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Clear();
                command.CommandText = "sp_save_manage_custom_info";
                command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid((String)msgHeader.sessionID);
                command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = (String)msgHeader.userID;
                command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = (String)msgHeader.clientID;
                command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = (String)msgHeader.localeID;
                command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = (String)msgHeader.countryCode;
                command.Parameters.Add("@i_custom_info_code", SqlDbType.VarChar, 60).Value = "mserviceAI";
                command.Parameters.Add("@i_custom_info_ref_no1", SqlDbType.NVarChar, 60).Value = (String)msgBody.subKey;
                command.Parameters.Add("@i_custom_info_ref_no2", SqlDbType.NVarChar, 60).Value = "";
                command.Parameters.Add("@i_inputparam_header_xml", SqlDbType.NVarChar, -1).Value = JsonConvert.SerializeObject(inputparamHeader);
                command.Parameters.Add("@i_rec_timestamp", SqlDbType.UniqueIdentifier).Value = new Guid((String)msgHeader.sessionID);
                command.Parameters.Add("@i_save_mode", SqlDbType.VarChar, 1).Value = "A";
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
                    errorNo = oErrorNo.Value.ToString().Trim();
                }
                else
                {
                    updateStatus = (oUpdateStatus.Value != DBNull.Value) ? (String)oUpdateStatus.Value.ToString().Trim() : null;
                    outputParameter = JsonConvert.DeserializeObject<dynamic>(oOutputparamDetailXml.Value.ToString().Trim());
                }

                return outputParameter;
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

        public static String GetTransformedContent(String sourceString, dynamic msgBody)
        {
            String returnString, dataString;
            int index;
            bool dataCapture;
            try
            {
                returnString = "";
                dataString = "";
                dataCapture = false;

                sourceString = sourceString.Replace("\\#", "!@$%");

                for (index = 0; index < sourceString.Length; index ++)
                {
                    if (dataCapture)
                    {
                        if (sourceString[index] != '#')
                        {
                            dataString += sourceString[index];
                        }
                        else
                        {
                            dataCapture = false;
                            returnString += DataBinder.Eval(msgBody, dataString.Trim());
                            dataString = "";
                        }
                    }
                    else
                    {
                        if (sourceString[index] == '#')
                        {
                            dataCapture = true;
                        }
                        else
                        {
                            returnString += sourceString[index];
                        }
                    }
                }

                returnString = returnString.Replace("!@$%", "#");

                return returnString;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }

    public class PushNotification
    {
        public static dynamic GetFcmKeyConfiguration(dynamic msgHeader)
        {
            String fcmKeyData;
            dynamic fcmKeyObject;

            try
            {
                fcmKeyData = File.ReadAllText(HttpContext.Current.Server.MapPath("~/fmt" + "\\" + "msvMsg" + "\\" + ((String)msgHeader.appID) + "\\" + "fcmkey_" + (String)msgHeader.clientID + "_" + (String)msgHeader.countryCode + ".json"));
                fcmKeyObject = JsonConvert.DeserializeObject<dynamic>(fcmKeyData);
                return fcmKeyObject;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static dynamic GetRecipientToken(dynamic msgHeader, String recipientID, String channel)
        {
            String fcmTokenPath, fcmTokenData;
            dynamic recipientToken;

            try
            {
                recipientToken = null;

                fcmTokenPath =HttpContext.Current.Server.MapPath("~/content_store" + "\\" + (String)msgHeader.clientID + "\\" + (String)msgHeader.countryCode + "\\" + "msvMsg" + "\\" + "fcmtoken" + "\\" + ((String)msgHeader.appID) + "\\" + channel + "\\" + recipientID + ".txt");
                if (File.Exists(fcmTokenPath))
                {
                    fcmTokenData = File.ReadAllText(fcmTokenPath);
                    recipientToken = JsonConvert.DeserializeObject<dynamic>(fcmTokenData);
                }

                return recipientToken;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static String SendMessage(dynamic msgHeader, dynamic msgBody)
        {
            dynamic msgSchema, fcmKeyConfiguration, recipientToken, webRecipientToken, mobileRecipientToken;
            String returnValue, webRecipients, mobileRecipients, recipientLocale;

            try
            {
                returnValue = "";
                webRecipients = "";
                mobileRecipients = "";
                msgSchema = PushNotification.GenerateMessage(msgHeader, msgBody);
                fcmKeyConfiguration = PushNotification.GetFcmKeyConfiguration(msgHeader);


                foreach (String msgTo in msgSchema.data.msgBody.msgTo)
                {
                    if (((String)msgBody.from.id).ToLower() == msgTo.ToLower() && ((String)msgHeader.userID).ToLower() != "system")
                    {
                        recipientToken = PushNotification.GetRecipientToken(msgHeader, msgTo, ((String)msgBody.from.channel));
                        msgSchema.data.msgBody.to.Add(JsonConvert.DeserializeObject<dynamic>("{\"id\":\"" + msgTo + "\",\"name\":\"" + (String)recipientToken.title + " " + (String)recipientToken.first_name + " " + (String)recipientToken.last_name + "\", \"initial\":\"" + (String)recipientToken.initial + "\"}" ));

                        recipientLocale = ((String)recipientToken.locale).Substring(0, ((String)recipientToken.locale).IndexOf('-'));
                        /* if (msgSchema.data.msgBody.translations[recipientLocale] == null)
                        {
                            msgSchema.data.msgBody.translations[recipientLocale] = PushNotification.TranslateMessage(appRoot, msgHeader, msgBody, recipientLocale);
                        } */

                        if ((String)msgBody.from.channel == "web")
                        {
                            mobileRecipientToken = PushNotification.GetRecipientToken(msgHeader, msgTo, "mobile");
                            if (mobileRecipientToken != null)
                            {
                                mobileRecipients += ",\"" + (String)mobileRecipientToken.userId + "\"";
                            }
                        }
                        else if ((String)msgBody.from.channel == "mobile")
                        {
                            webRecipientToken = PushNotification.GetRecipientToken(msgHeader, msgTo, "web");
                            if (webRecipientToken != null)
                            {
                                webRecipients += ",\"" + (String)webRecipientToken.userId + "\"";
                            }
                        }

                        returnValue = "SUCCESS";
                    }
                    else
                    {
                        /* IDENTIFY WEB RECIPIENTS */
                        webRecipientToken = PushNotification.GetRecipientToken(msgHeader, msgTo, "web");
                        if (webRecipientToken != null)
                        {
                            msgSchema.data.msgBody.to.Add(JsonConvert.DeserializeObject<dynamic>("{\"id\":\"" + msgTo + "\", \"name\":\"" + (String)webRecipientToken.title + " " + (String)webRecipientToken.first_name + " " + (String)webRecipientToken.last_name + "\", \"initial\":\"" + (String)webRecipientToken.initial + "\"}"));

                            recipientLocale = ((String)webRecipientToken.locale).Substring(0, ((String)webRecipientToken.locale).IndexOf('-'));
                            /* if (msgSchema.data.msgBody.translations[recipientLocale] == null)
                            {
                                msgSchema.data.msgBody.translations[recipientLocale] = PushNotification.TranslateMessage(appRoot, msgHeader, msgBody, recipientLocale);
                            } */

                            webRecipients += ",\"" + (String)webRecipientToken.userId + "\"";
                        }

                        /* IDENTIFY MOBILE RECIPIENTS */
                        mobileRecipientToken = PushNotification.GetRecipientToken(msgHeader, msgTo, "mobile");
                        if (mobileRecipientToken != null)
                        {
                            if (webRecipientToken == null)
                            {
                                msgSchema.data.msgBody.to.Add(JsonConvert.DeserializeObject<dynamic>("{\"id\":\"" + msgTo + "\", \"name\":\"" + (String)mobileRecipientToken.title + " " + (String)mobileRecipientToken.first_name + " " + (String)mobileRecipientToken.last_name + "\",\"initial\":\"" + (String)mobileRecipientToken.initial + "\"}"));
								
								recipientLocale = ((String)mobileRecipientToken.locale).Substring(0, ((String)mobileRecipientToken.locale).IndexOf('-'));
                                /* if (msgSchema.data.msgBody.translations[recipientLocale] == null)
                                {
                                    msgSchema.data.msgBody.translations[recipientLocale] = PushNotification.TranslateMessage(appRoot, msgHeader, msgBody, recipientLocale);
                                } */
                            }
                            mobileRecipients += ",\"" + (String)mobileRecipientToken.userId + "\"";
                        }
                    }
                }


                /* REMOVE THE MSGTO PROPERTY */
                msgSchema.data.msgBody.Remove("msgTo");


                /* SAVE THE MESSAGE TO HISTORY */
                PushNotification.SaveMessage(msgHeader, msgSchema.data.msgBody);


                /* SEND THE MESSAGES TO RESPECTIVE CHANNELS */
                if (returnValue == "SUCCESS")
                {
                    if ((String)msgSchema.data.msgBody.autoReply == "true")
                    {
                        returnValue = "{\"status\":\"SUCCESS\", \"data\":" + JsonConvert.SerializeObject(msgSchema.data.msgBody) + "}";
                    }
                    else
                    {
                        returnValue = "{\"status\":\"SUCCESS\", \"data\":\"PUSHMSG\"}";
                    }
                }
                else
                {
                    returnValue = "{\"status\":\"SUCCESS\", \"data\":\"PUSHMSG\"}";
                }


                if (webRecipients != "" || mobileRecipients != "")
                {
                    if (fcmKeyConfiguration.all != null)
                    {
                        msgSchema.app_id = (String)fcmKeyConfiguration.all.appID;
                        msgSchema.include_player_ids = JsonConvert.DeserializeObject<dynamic>("[" + (webRecipients + mobileRecipients).Substring(1) + "]");
                        msgSchema.template_id = (String)fcmKeyConfiguration.all.template.ms_text_message;
                        PushNotification.InvokeOnesignalAPI((JsonConvert.SerializeObject(msgSchema)), ((String)fcmKeyConfiguration.all.fcmKey));
                    }
                    else
                    {
                        if (webRecipients != "")
                        {
                            if (fcmKeyConfiguration.web != null)
                            {
                                msgSchema.app_id = (String)fcmKeyConfiguration.web.appID;
                                msgSchema.include_player_ids = JsonConvert.DeserializeObject<dynamic>("[" + webRecipients.Substring(1) + "]");
                                msgSchema.template_id = (String)fcmKeyConfiguration.web.template.ms_text_message;
                                PushNotification.InvokeOnesignalAPI((JsonConvert.SerializeObject(msgSchema)), ((String)fcmKeyConfiguration.web.fcmKey));
                            }
                        }

                        if (mobileRecipients != "")
                        {
                            if (fcmKeyConfiguration.mobile != null)
                            {
                                msgSchema.app_id = (String)fcmKeyConfiguration.mobile.appID;
                                msgSchema.include_player_ids = JsonConvert.DeserializeObject<dynamic>("[" + mobileRecipients.Substring(1) + "]");
                                msgSchema.template_id = (String)fcmKeyConfiguration.mobile.template.ms_text_message;
                                PushNotification.InvokeOnesignalAPI((JsonConvert.SerializeObject(msgSchema)), ((String)fcmKeyConfiguration.mobile.fcmKey));
                            }
                        }
                    }
                }


                return returnValue;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void InvokeOnesignalAPI(String inputData, String fcmKey)
        {
            HttpWebRequest request;
            HttpWebResponse response;
            Byte[] encodedInputData;
            String responseMessage;

            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                request = (HttpWebRequest)WebRequest.Create("https://onesignal.com/api/v1/notifications");
				

                encodedInputData = Encoding.UTF8.GetBytes(inputData);
                request.Method = "POST";
                request.ContentType = "application/json; charset=utf-8";
                request.Headers.Add("authorization", "Basic " + fcmKey);
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

        public static dynamic GenerateMessage(dynamic msgHeader, dynamic msgBody)
        {
            dynamic msgSchema;

            try
            {
                msgSchema = JsonConvert.DeserializeObject<dynamic>(PushNotification.GetMessageSchema());


                /* UPDATE MESSAGE HEADER SECTION */
                foreach (JProperty key in msgSchema.data.msgHeader.Properties())
                {
                    msgSchema.data.msgHeader[key.Name] = ((msgHeader[key.Name] != null) ? ((String)msgHeader[key.Name]) : (""));
                }

                /* UPDATE MESSAGE CONTENT SECTION */
                if ((String)msgBody.content != "")
                {
                    msgSchema.contents.en = (String)msgBody.content;
                }


                /* UPDATE MESSAGE BODY SECTION */
                msgSchema.data.msgBody.key = (String)msgBody.key;
                msgSchema.data.msgBody.subKey = (String)msgBody.subKey;
                msgSchema.data.msgBody.msgType = (String)msgBody.msgType;
                msgSchema.data.msgBody.content = (String)msgBody.content;
                //msgSchema.data.msgBody.translations = JsonConvert.DeserializeObject<dynamic>("{}");
                msgSchema.data.msgBody.followup = (String)msgBody.followup;
                msgSchema.data.msgBody.actionPath = (String)msgBody.actionPath;
                msgSchema.data.msgBody.suggestions = msgBody.suggestions;
                msgSchema.data.msgBody.scrID = (String)msgBody.scrID;
                msgSchema.data.msgBody.msgTo = (JArray)msgBody.msgTo;
                msgSchema.data.msgBody.autoReply = (String)msgBody.autoReply;
                msgSchema.data.msgBody.custom = msgBody.custom;
                msgSchema.data.msgBody.actions = msgBody.actions;
                msgSchema.data.msgBody.allowMsg = msgBody.allowMsg;
                msgSchema.data.msgBody.allowAttach = msgBody.allowAttach;
                msgSchema.data.msgBody.idleTime = msgBody.idleTime;
                msgSchema.data.msgBody.refreshHeader = msgBody.refreshHeader;

                /* UPDATE MESSAGE BODY FROM SECTION */
                msgSchema.data.msgBody.from.id = (String)msgBody.from.id;
				msgSchema.data.msgBody.from.name = (String)msgBody.from.name;
                msgSchema.data.msgBody.from.channel = (String)msgBody.from.channel;
                msgSchema.data.msgBody.from.sysMsg = (String)msgBody.from.sysMsg;
                msgSchema.data.msgBody.from.initial = (String)msgBody.from.initial;


                /* UPDATE MESSAGE BODY ATTACHMENT SECTION */
                msgSchema.data.msgBody.attachments = msgBody.attachments;


                /* UPDATE MESSAGE BODY INFO SECTION */
                msgSchema.data.msgBody.info.id = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                msgSchema.data.msgBody.info.date = DateTime.Now.ToString("yyyy-MM-dd");
                msgSchema.data.msgBody.info.hour = DateTime.Now.ToString("HH");
                msgSchema.data.msgBody.info.min = DateTime.Now.ToString("mm");
                msgSchema.data.msgBody.info.sec = DateTime.Now.ToString("ss");


                return msgSchema;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static String GetMessageSchema()
        {
            try
            {
                return "{\"app_id\":\"\",\"contents\":{\"en\":\"You have a new notification\"},\"include_player_ids\":\"\",\"template_id\":\"\",\"data\":{\"msgHeader\":{\"sessionID\":\"\",\"clientID\":\"\",\"countryCode\":\"\",\"localeID\":\"\",\"userID\":\"\",\"appID\":\"\"},\"msgBody\":{\"autoReply\":\"\",\"key\":\"\",\"subKey\":\"\",\"from\":{\"id\":\"\",\"name\":\"\",\"initial\":\"\",\"channel\":\"\",\"sysMsg\":\"\"},\"to\":[],\"attachments\":\"\",\"msgType\":\"\",\"content\":\"\",\"translations\":\"\",\"followup\":\"\",\"actionPath\":\"\",\"suggestions\":\"\",\"actions\":\"\",\"allowMsg\":\"\",\"allowAttach\":\"\",\"idleTime\":\"\",\"refreshHeader\":\"\",\"scrID\":\"\",\"custom\":{},\"info\":{\"id\":\"\",\"date\":\"\",\"hour\":\"\",\"min\":\"\",\"sec\":\"\",\"type\":\"chat\"}}}}";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void SaveMessage(dynamic msgHeader, dynamic msgBody)
        {
            String savePath;

            try
            {
                /* SET UP THE MESSAGE STORING PATH */
                savePath = HttpContext.Current.Server.MapPath("~/content_store" + "\\" + (String)msgHeader.clientID + "\\" + (String)msgHeader.countryCode + "\\" + "msvMsg" + "\\" + "history" + "\\" + ((String)msgHeader.appID) + "\\" + (String)msgBody.key + "\\" + (String)msgBody.subKey);
                if (!Directory.Exists(savePath))
                {
                    Directory.CreateDirectory(savePath);
                }


                /* STORE THE MESSAGE */
                File.AppendAllText(savePath + "\\" + (String)msgBody.subKey + ".txt", "," + JsonConvert.SerializeObject(msgBody));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static String GetTranslationKey(dynamic msgHeader)
        {
            String translationKey;
            XmlDocument keyList;

            try
            {
                translationKey = "";
                keyList = new XmlDocument();

                keyList.Load(HttpContext.Current.Server.MapPath("~/key" + "\\" + "google_api_key_configuration_" + (String)msgHeader.clientID + "_" + (String)msgHeader.countryCode + ".xml"));
                translationKey = keyList.DocumentElement.SelectSingleNode("translation").InnerText;

                return translationKey;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static String TranslateMessage(dynamic msgHeader, dynamic msgBody, String locale)
        {
            HttpWebRequest request;
            HttpWebResponse response;
            String translationKey, responseMessage;
            dynamic responseObject;

            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                translationKey = PushNotification.GetTranslationKey(msgHeader);

                request = (HttpWebRequest)WebRequest.Create("https://translation.googleapis.com/language/translate/v2?target=" + locale + "&key=" + translationKey + "&q=" + (String)msgBody.content);
                response = (HttpWebResponse)request.GetResponse();
                responseMessage = (new StreamReader(response.GetResponseStream()).ReadToEnd());
                responseObject = JsonConvert.DeserializeObject<dynamic>(responseMessage);

                return (String)responseObject.data.translations[0].translatedText;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
</script>

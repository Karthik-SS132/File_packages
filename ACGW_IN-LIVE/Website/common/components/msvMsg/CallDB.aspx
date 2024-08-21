<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Drawing.Imaging" %>
<%@ Import Namespace="Newtonsoft.Json" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String appRoot, appID, sessionID, clientID, countryCode, localeID, userID;
        String key, subKey, exchangeKey, exchangeMsgTo, msgFrom, msgTo, scrID, msgType, actionPath, content, actionList, attachName, attachType, attachSrc, toolType, outContent, outActionList;
        String connectionStr, callMsg;

        appRoot = AppDomain.CurrentDomain.BaseDirectory;

        try
        {
            var fmtObject = JsonConvert.DeserializeObject<dynamic>(new StreamReader(Request.InputStream).ReadToEnd());
            //var fmtObject = JsonConvert.DeserializeObject<dynamic>("{\"msgHeader\":{\"sessionID\":\"00000000-0000-0000-0000-000000000000\",\"clientID\":\"myquest\",\"countryCode\":\"in\",\"userID\":\"123\",\"localeID\":\"en-us\"},\"msgBody\":{\"key\":\"calldb\",\"subKey\":\"QU20190813140935123\",\"msgFrom\":\"123\",\"msgTo\":\"7418365722\",\"scrID\":\"chat\",\"msgType\":\"text\",\"actionPath\":\"@init.@general\",\"actionList\":\"\",\"content\":\"Lot of Problem\"}}");

            /* READING THE MESSAGE HEADER DATA */
            appID = (String)fmtObject.msgHeader.appID;
            sessionID = (String)fmtObject.msgHeader.sessionID;
            clientID = (String)fmtObject.msgHeader.clientID;
            countryCode = (String)fmtObject.msgHeader.countryCode;
            localeID = (String)fmtObject.msgHeader.localeID;
            userID = (String)fmtObject.msgHeader.userID;


            /* RAEDING THE MESSAGE BODY DATA */
            key = (String)fmtObject.msgBody.key;
            subKey = (String)fmtObject.msgBody.subKey;
            exchangeKey = (String)fmtObject.msgBody.exchangeKey;
            exchangeMsgTo = (String)fmtObject.msgBody.exchangeMsgTo;
            msgFrom = (String)fmtObject.msgBody.msgFrom;
            msgTo = (String)fmtObject.msgBody.msgTo;
            scrID = (String)fmtObject.msgBody.scrID;
            msgType = (String)fmtObject.msgBody.msgType;
            content = (String)fmtObject.msgBody.content;
            actionPath = (String)fmtObject.msgBody.actionPath;
            actionList = (String)fmtObject.msgBody.actionList;
            attachName = (String)fmtObject.msgBody.attachName;
            attachType = (String)fmtObject.msgBody.attachType;
            attachSrc = (String)fmtObject.msgBody.attachSrc;
            toolType = (String)fmtObject.msgBody.toolType;

            connectionStr = ConfigurationManager.ConnectionStrings["conn_" + clientID + "app"].ConnectionString;

            if (actionPath != "")
            {
                ProcessAutoReply(appRoot, clientID, countryCode, msgType, actionPath, actionList, out outContent, out outActionList);

                if (outContent != "")
                {
                    SendMessage(appRoot, appID, sessionID, clientID, countryCode, localeID, userID, key, subKey, exchangeKey, exchangeMsgTo, msgFrom, msgFrom, scrID, (outActionList != "" ? "action" : "text"), outContent, actionPath, outActionList, attachName, attachType, attachSrc);
                }
                else
                {
                    if (CreateCall(appRoot, sessionID, clientID, countryCode, localeID, userID, connectionStr, content, actionPath) == "SP001")
                    {
                        var callObject = JsonConvert.DeserializeObject<dynamic>(RetrieveCallInfo(appRoot, sessionID, clientID, countryCode, localeID, userID, connectionStr, content, actionPath));
                        
                        /* SEND MESSAGE TO THE CREATED BY EMPLOYEE ID */
                        callMsg = "Your request is accepted and it is assigned to " + callObject.assigned_to_emp_name + ".";
                        callMsg += "Your reference number is " + callObject.call_ref_no;
                        SendMessage(appRoot, appID, sessionID, clientID, countryCode, localeID, userID, key, subKey, (String)callObject.call_ref_no, (String)callObject.assigned_to_user_id, msgFrom, msgFrom, scrID, "text", callMsg, "", "", attachName, attachType, attachSrc);

                        /* SEND MESSAGE TO THE ASSIGNED TO EMPLOYEE ID */
                        callMsg = "A new request created by " + callObject.created_by_emp_name + " is assigned to you.";
                        callMsg += "Your reference number is " + callObject.call_ref_no;
                        SendMessage(appRoot, appID, sessionID, clientID, countryCode, localeID, userID, key, subKey, (String)callObject.call_ref_no, msgFrom, (String)callObject.assigned_to_user_id, (String)callObject.assigned_to_user_id, scrID, "text", callMsg, "", "", attachName, attachType, attachSrc);
                    }
                    else
                    {
                        SendMessage(appRoot, appID, sessionID, clientID, countryCode, localeID, userID, key, subKey, exchangeKey, exchangeMsgTo, msgFrom, msgFrom, scrID, "text", "Failed to create your request", "", "", attachName, attachType, attachSrc);
                    }                    
                }
            }
            else
            {
				if (!Directory.Exists(appRoot + "\\" + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvMsg" + "\\" + "history" + "\\" + key + "\\" + subKey))
				{
					Directory.CreateDirectory(appRoot + "\\" + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvMsg" + "\\" + "history" + "\\" + key + "\\" + subKey);
				}
			
                if (toolType == "camera" || toolType == "gallery")
                {
                    byte[] bytes = Convert.FromBase64String(attachSrc);
                    using (System.Drawing.Image image = System.Drawing.Image.FromStream(new MemoryStream(bytes)))
                    {
						image.Save(appRoot + "\\" + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvMsg" + "\\" + "history" + "\\" + key + "\\" + subKey + "\\" + attachName, System.Drawing.Imaging.ImageFormat.Png);
                    }

                    fmtObject.msgBody.attachSrc = "msvMsg" + "\\" + "history" + "\\" + key + "\\" + subKey + "\\" + attachName;
					attachSrc = "msvMsg" + "\\" + "history" + "\\" + key + "\\" + subKey + "\\" + attachName;
                }
                else if (toolType == "close")
                {
                    if (CloseCall(appRoot, sessionID, clientID, countryCode, localeID, userID, connectionStr, content, actionPath, subKey) == "SP001")
                    {
                        content = "This request is closed.";

                        SendMessage(appRoot, appID, sessionID, clientID, countryCode, localeID, userID, key, subKey, exchangeKey, exchangeMsgTo, msgFrom, msgFrom, scrID, msgType, content, actionPath, actionList, attachName, attachType, attachSrc);
                    }
                }

                SendMessage(appRoot, appID, sessionID, clientID, countryCode, localeID, userID, key, subKey, exchangeKey, exchangeMsgTo, msgFrom, msgTo, scrID, msgType, content, actionPath, actionList, attachName, attachType, attachSrc);
				
                File.AppendAllText(appRoot + "\\" + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvMsg" + "\\" + "history" + "\\" + key + "\\" + subKey + "\\" + subKey + ".txt", (String)JsonConvert.SerializeObject(fmtObject.msgBody) + ",");																																																																																														   
            }
        }
        catch (Exception ex)
        {
            Response.Write("false");
            Response.Write(ex);
        }
    }

    public static String CreateCall(String appRoot, String sessionID, String clientID, String countryCode, String localeID, String userID, String connectionStr, String content, String actionPath)
    {
        DataTable customInfoDetail;
        SqlConnection conn = null;
        SqlCommand command;
        SqlParameter oUpdateStatus, oErrorNo;
        String updateStatus, errorNo;

        try
        {
            conn = new SqlConnection();
            command = new SqlCommand();
            customInfoDetail = new DataTable();
            customInfoDetail.Columns.Add("i_sl_no", typeof(Byte));
            customInfoDetail.Columns.Add("i_inputparam_detail_xml", typeof(String));
            customInfoDetail.Columns.Add("i_crud_ind", typeof(String));

            updateStatus = "";
            errorNo = "";


            /* SETTING THE SQL PROPERTIES */
            conn.ConnectionString = connectionStr;

            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Clear();
            command.CommandText = "sp_save_manage_custom_info";
            command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid(sessionID);
            command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = userID;
            command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = clientID;
            command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = localeID;
            command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;
            command.Parameters.Add("@i_custom_info_code", SqlDbType.VarChar, 60).Value = "call_db";
            command.Parameters.Add("@i_custom_info_ref_no1", SqlDbType.NVarChar, 60).Value = "";
            command.Parameters.Add("@i_custom_info_ref_no2", SqlDbType.NVarChar, 60).Value = "";
            command.Parameters.Add("@i_inputparam_header_xml", SqlDbType.NVarChar, -1).Value = "<inputparam><problem_desc>" + content + "</problem_desc><action_path>" + actionPath + "</action_path></inputparam>";
            command.Parameters.Add("@i_rec_timestamp", SqlDbType.UniqueIdentifier).Value = new Guid(sessionID);
            command.Parameters.Add("@i_save_mode", SqlDbType.VarChar, 1).Value = "A";

            oUpdateStatus = command.Parameters.Add("@o_update_status", SqlDbType.VarChar, 5);
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
            }            

            return updateStatus;
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

    public static String CloseCall(String appRoot, String sessionID, String clientID, String countryCode, String localeID, String userID, String connectionStr, String content, String actionPath, String subKey)
    {
        DataTable customInfoDetail;
        SqlConnection conn = null;
        SqlCommand command;
        SqlParameter oUpdateStatus, oErrorNo;
        String updateStatus, errorNo;

        try
        {
            conn = new SqlConnection();
            command = new SqlCommand();
            customInfoDetail = new DataTable();
            customInfoDetail.Columns.Add("i_sl_no", typeof(Byte));
            customInfoDetail.Columns.Add("i_inputparam_detail_xml", typeof(String));
            customInfoDetail.Columns.Add("i_crud_ind", typeof(String));

            updateStatus = "";
            errorNo = "";


            /* SETTING THE SQL PROPERTIES */
            conn.ConnectionString = connectionStr;

            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Clear();
            command.CommandText = "sp_save_manage_custom_info";
            command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid(sessionID);
            command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = userID;
            command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = clientID;
            command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = localeID;
            command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;
            command.Parameters.Add("@i_custom_info_code", SqlDbType.VarChar, 60).Value = "call_db";
            command.Parameters.Add("@i_custom_info_ref_no1", SqlDbType.NVarChar, 60).Value = subKey;
            command.Parameters.Add("@i_custom_info_ref_no2", SqlDbType.NVarChar, 60).Value = "";
            command.Parameters.Add("@i_inputparam_header_xml", SqlDbType.NVarChar, -1).Value = "";
            command.Parameters.Add("@i_rec_timestamp", SqlDbType.UniqueIdentifier).Value = new Guid(sessionID);
            command.Parameters.Add("@i_save_mode", SqlDbType.VarChar, 1).Value = "U";

            oUpdateStatus = command.Parameters.Add("@o_update_status", SqlDbType.VarChar, 5);
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
            }

            return updateStatus;
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

    public static String RetrieveCallInfo(String appRoot, String sessionID, String clientID, String countryCode, String localeID, String userID, String connectionStr, String content, String actionPath)
    {
        DataTable customInfoDetail, outputJSON;
        SqlConnection conn = null;
        SqlCommand command;
        SqlParameter oUpdateStatus, oErrorNo;
        SqlDataAdapter dataAdapter;

        try
        {
            conn = new SqlConnection();
            command = new SqlCommand();
            customInfoDetail = new DataTable();
            customInfoDetail.Columns.Add("i_sl_no", typeof(Byte));
            customInfoDetail.Columns.Add("i_inputparam_detail_xml", typeof(String));
            customInfoDetail.Columns.Add("i_crud_ind", typeof(String));
            outputJSON = new DataTable();


            /* SETTING THE SQL PROPERTIES */
            conn.ConnectionString = connectionStr;

            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Clear();
            command.CommandText = "sp_save_manage_custom_info";
            command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = new Guid(sessionID);
            command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = userID;
            command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = clientID;
            command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = localeID;
            command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;
            command.Parameters.Add("@i_custom_info_code", SqlDbType.VarChar, 60).Value = "call_db";
            command.Parameters.Add("@i_custom_info_ref_no1", SqlDbType.NVarChar, 60).Value = "";
            command.Parameters.Add("@i_custom_info_ref_no2", SqlDbType.NVarChar, 60).Value = "";
            command.Parameters.Add("@i_inputparam_header_xml", SqlDbType.NVarChar, -1).Value = "<inputparam><problem_desc>" + content + "</problem_desc><action_path>" + actionPath + "</action_path></inputparam>";
            command.Parameters.Add("@i_rec_timestamp", SqlDbType.UniqueIdentifier).Value = new Guid(sessionID);
            command.Parameters.Add("@i_save_mode", SqlDbType.VarChar, 1).Value = "R";

            oUpdateStatus = command.Parameters.Add("@o_update_status", SqlDbType.VarChar, 5);
            oUpdateStatus.Direction = ParameterDirection.Output;

            command.Parameters.Add("@custom_info_detail", SqlDbType.Structured).Value = customInfoDetail;

            oErrorNo = command.Parameters.Add("@errorNo", SqlDbType.VarChar, 15);
            oErrorNo.Direction = ParameterDirection.Output;

            conn.Open();

            dataAdapter = new SqlDataAdapter(command);
            dataAdapter.Fill(outputJSON);
            dataAdapter.Dispose();

            return outputJSON.Rows[0][0].ToString();
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

    public static void ProcessAutoReply(String appRoot, String clientID, String countryCode, String msgType, String actionPath, String actionList, out String outContent, out String outActionList)
    {
        try
        {
            var autoReplyObj = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(appRoot + "\\" + "fmt" + "\\" + "msvMsg" + "\\" + "fcmautoreply_" + clientID + "_" + countryCode + ".json"));

            if (msgType == "action")
            {
                var actionObj = DataBinder.Eval(autoReplyObj, actionPath);

                outContent = (String)actionObj.content;

                if (actionObj.actions != null)
                {
                    outActionList = (String)JsonConvert.SerializeObject(actionObj.actions);
                }
                else
                {
                    outActionList = "";
                }
            }
            else
            {
                if (actionList == "true")
                {
                    outContent = DataBinder.Eval(autoReplyObj, "@invalid");
                    outActionList = (String)JsonConvert.SerializeObject(DataBinder.Eval(autoReplyObj, actionPath).actions);
                }
                else
                {
                    outContent = "";
                    outActionList = "";
                }
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public static void SendMessage(String appRoot, String appID, String sessionID, String clientID, String countryCode, String localeID, String userID, String key, String subKey, String exchangeKey, String exchangeMsgTo, String msgFrom, String msgTo, String scrID, String msgType, String content, String actionPath, String actionList, String attachName, String attachType, String attachSrc)
    {
        HttpWebRequest request;
        HttpWebResponse response;
        Byte[] encodedInputData;
        String responseMessage;

        try
        {
            var restAPiObject = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(appRoot + "\\" + "fmt" + "\\" + "msvMsg" + "\\" + "fcmkey_" + clientID + "_" + countryCode + ".json"));

            request = (HttpWebRequest)WebRequest.Create("https://onesignal.com/api/v1/notifications");

            encodedInputData = Encoding.UTF8.GetBytes(GenerateMessage(appRoot, appID, sessionID, clientID, countryCode, localeID, userID, key, subKey, exchangeKey, exchangeMsgTo, msgFrom, msgTo, scrID, msgType, content, actionPath, actionList, attachName, attachType, attachSrc));

            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";
            request.Headers.Add("authorization", "Basic " + (String)restAPiObject[appID]);
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

    private static String GenerateMessage(String appRoot, String appID, String sessionID, String clientID, String countryCode, String localeID, String userID, String key, String subKey, String exchangeKey, String exchangeMsgTo, String msgFrom, String msgTo, String scrID, String msgType, String content, String actionPath, String actionList, String attachName, String attachType, String attachSrc)
    {
        try
        {
            var msgObject = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(appRoot + "\\" + "fmt" + "\\" + "msvMsg" + "\\" + "fcmmsg_" + clientID + "_" + countryCode + ".json"));
            msgObject = msgObject[appID];

            var msgToObject = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(appRoot + "\\" + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvMsg" + "\\" + "fcmtoken" + "\\" + msgTo + ".txt"));

            
            /* UPDATING MSG HEADER PARAMETERS */
            msgObject.data.msgHeader.sessionID = sessionID;
            msgObject.data.msgHeader.clientID = clientID;
            msgObject.data.msgHeader.countryCode = countryCode;
            msgObject.data.msgHeader.localeID = localeID;
            msgObject.data.msgHeader.userID = userID;
            msgObject.data.msgHeader.appID = appID;


            /* UPDATING MSG BODY PARAMETERS */
            msgObject.data.msgBody.key = key;
            msgObject.data.msgBody.subKey = subKey;
            msgObject.data.msgBody.exchangeKey = exchangeKey;
            msgObject.data.msgBody.exchangeMsgTo = exchangeMsgTo;
            msgObject.data.msgBody.msgFrom = msgFrom;
            msgObject.data.msgBody.msgTo = msgTo;
            msgObject.data.msgBody.scrID = scrID;
            msgObject.data.msgBody.msgType = msgType;
            msgObject.data.msgBody.content = content;
            msgObject.data.msgBody.actionPath = actionPath;
            msgObject.data.msgBody.actionList = actionList;
            msgObject.data.msgBody.attachName = attachName;
            msgObject.data.msgBody.attachType = attachType;
            msgObject.data.msgBody.attachSrc = attachSrc;
           
            
            /* UPDATING FCM TOKEN PARAMETER */
            msgObject.include_player_ids = JsonConvert.DeserializeObject<dynamic>("[\"" + (String)msgToObject.userId + "\"]");
            
            return JsonConvert.SerializeObject(msgObject);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
</script>
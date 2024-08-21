<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="System.Text.RegularExpressions" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Net.Mail" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="Newtonsoft.Json.Linq" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="msvInterface" %>

<script runat="server">

    private static String queueFileName;
    private static String queueUserID;
    private static String queueExceptionContent;

    protected void Page_Load(object sender, EventArgs e)
    {
        String clientID, countryCode;

        clientID = Request.QueryString["client_id"];
        countryCode = Request.QueryString["country_code"];

        try
        {
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            ProcessQueueManagerDirectory(clientID, countryCode);
        }
        catch (Exception ex)
        {
            msvUtil.LogException(clientID, countryCode, "QueueManager", ex.Message, ex.StackTrace);
            ExceptionNotification(clientID, countryCode, ex.Message, ex.StackTrace);
        }
    }

    private static void ProcessQueueManagerDirectory(String clientID, String countryCode)
    {
        DirectoryInfo queueManagerDirectory;
        XmlDocument exceptionIgnoreList;
        Boolean exceptionIgnoreIndicator;

        try
        {
            queueManagerDirectory = new DirectoryInfo(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"));

            if (queueManagerDirectory.Exists == true)
            {
                foreach (DirectoryInfo userDirectory in queueManagerDirectory.GetDirectories())
                {
                    queueUserID = "";

                    try
                    {
                        queueUserID = userDirectory.Name;

                        if (!File.Exists(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + "StopQueueProcess")+ "\\" + userDirectory.Name + ".txt"))
                        {
                            ProcessQueueDirectory(clientID, countryCode, userDirectory.Name);
                        }
                    }
                    catch (Exception ex)
                    {
                        msvUtil.LogException(clientID, countryCode, "QueueManager", ex.Message, ex.StackTrace);
                        ExceptionNotification(clientID, countryCode, ex.Message, ex.StackTrace);
                        exceptionIgnoreList = new XmlDocument();
                        exceptionIgnoreIndicator = false;
                        exceptionIgnoreList.Load(HttpContext.Current.Server.MapPath("~\\fmt"+ "\\" + "msvQueueManager" + "\\" +"ExceptionIgnoreList.xml"));

                        foreach (XmlNode node in exceptionIgnoreList.DocumentElement)
                        {
                            if (Regex.IsMatch(ex.Message, node.InnerText))
                            {
                                exceptionIgnoreIndicator = true;
                                break;
                            }
                        }

                        if (!exceptionIgnoreIndicator)
                        {
                            if (!Directory.Exists(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + "StopQueueProcess")))
                            {
                                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + "StopQueueProcess"));
                            }
                            File.WriteAllText(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + "StopQueueProcess")+ "\\" + userDirectory.Name + ".txt", "Exception has been occured while processing the queue for this user. Kindly refer the exception log for more details.");
                        }
                        else
                        {
                            LogIgnoredException(clientID, countryCode, userDirectory.Name, ex.Message);
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static void ProcessQueueDirectory(String clientID, String countryCode, String userID)
    {
        DirectoryInfo queueDirectory;

        try
        {
            queueFileName = "";
            queueDirectory = new DirectoryInfo(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "queue"));

            if (queueDirectory.Exists == true)
            {
                foreach (FileInfo queueFile in queueDirectory.GetFiles())
                {
                    queueFileName = queueFile.Name;

                    if (!File.Exists(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log")+ "\\" + queueFile.Name))
                    {
                        if (!ProcessQueueFile(clientID, countryCode, userID, "queue", queueFile.Name))
                        {
                            break;
                        }
                    }
                    else
                    {
                        File.Delete(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "queue")+ "\\" + queueFile.Name);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static Boolean ProcessQueueFile(String clientID, String countryCode, String userID, String filePath, String fileName)
    {
        String queueString, requestUrl, requestData, requestType, attachmentPath, attachmentName, responseString;
        MemoryStream postDataStream;
        StreamWriter postDataWriter;
        FileStream fileStream;
        Byte[] buffer, encodedRequestData;
        Int32 bytesRead, filesCount;
        HttpWebRequest request;
        HttpWebResponse response;
        Boolean processIndicator, exceptionIgnoreIndicator;
        XmlDocument exceptionIgnoreList;
        JArray attachmentsList;

        try
        {
            attachmentPath = null;
            attachmentName = null;
            attachmentsList = null;
            processIndicator = true;
            exceptionIgnoreIndicator = false;

            queueString = File.ReadAllText(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + filePath+ "\\" + fileName));

            queueString = queueString.Replace("52.172.43.138", "52.172.4.35");

            var queueObject = JsonConvert.DeserializeObject<dynamic>(queueString);
            requestUrl = (String)queueObject.url;
            requestData = (String)queueObject.input;
            requestType = (String)queueObject.type;


            if (requestType == null)
            {
                request = (HttpWebRequest)WebRequest.Create(requestUrl);
                encodedRequestData = Encoding.UTF8.GetBytes(requestData);
                request.Method = WebRequestMethods.Http.Post;
                request.ContentType = "application/json";
                request.ContentLength = encodedRequestData.Length;


                using (var stream = request.GetRequestStream())
                {
                    stream.Write(encodedRequestData, 0, encodedRequestData.Length);
                }
            }
            else if (requestType == "attachments")
            {
                request = (HttpWebRequest)WebRequest.Create(requestUrl);
                request.Method = WebRequestMethods.Http.Post;
                request.ContentType = "multipart/form-data; boundary=----****";
                request.KeepAlive = true;

                postDataStream = new MemoryStream();
                postDataWriter = new StreamWriter(postDataStream);

                attachmentsList = queueObject.attachments;

                for (filesCount = 0; filesCount < attachmentsList.Count; filesCount++)
                {
                    attachmentPath = HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "attachments");
                    attachmentName = (String)JsonConvert.DeserializeObject<dynamic>(attachmentsList[filesCount].ToString()).name;

                    postDataWriter.Write("\r\n------****\r\n");
                    postDataWriter.Write("Content-Disposition: form-data;" + "name=\"{0}\";" + "filename=\"{1}\"" + "\r\nContent-Type: {2}\r\n\r\n", attachmentName, Path.GetFileName(attachmentPath+ "\\" + attachmentName), Path.GetExtension(attachmentPath+ "\\" + attachmentName));
                    postDataWriter.Flush();

                    fileStream = new FileStream(attachmentPath+ "\\" + attachmentName, FileMode.Open, FileAccess.Read);
                    buffer = new byte[1024];
                    bytesRead = 0;
                    while ((bytesRead = fileStream.Read(buffer, 0, buffer.Length)) != 0)
                    {
                        postDataStream.Write(buffer, 0, bytesRead);
                    }
                    fileStream.Close();

                    postDataWriter.Write("\r\n------****\r\n");
                    postDataWriter.Flush();
                }

                postDataWriter.Write("\r\n------****--\r\n");
                postDataWriter.Flush();

                request.ContentLength = postDataStream.Length;

                using (var stream = request.GetRequestStream())
                {
                    postDataStream.WriteTo(stream);
                }
                postDataStream.Close();
            }
            else
            {
                attachmentName = (String)queueObject.filename;
                attachmentPath = HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "attachments");

                request = (HttpWebRequest)WebRequest.Create(requestUrl + "&filename=" + attachmentName);
                request.Method = WebRequestMethods.Http.Post;
                request.ContentType = "multipart/form-data; boundary=----****";
                request.KeepAlive = true;


                postDataStream = new MemoryStream();
                postDataWriter = new StreamWriter(postDataStream);
                postDataWriter.Write("\r\n------****\r\n");
                postDataWriter.Write("Content-Disposition: form-data;" + "name=\"{0}\";" + "filename=\"{1}\"" + "\r\nContent-Type: {2}\r\n\r\n", "myFile", Path.GetFileName(attachmentPath+ "\\" + attachmentName), Path.GetExtension(attachmentPath+ "\\" + attachmentName));
                postDataWriter.Flush();


                fileStream = new FileStream(attachmentPath+ "\\" + attachmentName, FileMode.Open, FileAccess.Read);
                buffer = new byte[1024];
                bytesRead = 0;
                while ((bytesRead = fileStream.Read(buffer, 0, buffer.Length)) != 0)
                {
                    postDataStream.Write(buffer, 0, bytesRead);
                }
                fileStream.Close();


                postDataWriter.Write("\r\n------****--\r\n");
                postDataWriter.Flush();


                request.ContentLength = postDataStream.Length;


                using (var stream = request.GetRequestStream())
                {
                    postDataStream.WriteTo(stream);
                }
                postDataStream.Close();
            }

            response = (HttpWebResponse)request.GetResponse();
            responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();


            if (ProcessResponse(clientID, countryCode, userID, filePath, fileName, requestUrl, responseString))
            {
                /* MOVE THE PROCESSED FILE TO LOG FOLDER */
                if (!Directory.Exists(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log")))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log"));
                }
                File.Move(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + filePath+ "\\" + fileName), HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log"+ "\\" + fileName));

                File.AppendAllText(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log"+ "\\" + fileName), Environment.NewLine + Environment.NewLine + responseString);

                if (attachmentsList != null)
                {
                    for (filesCount = 0; filesCount < attachmentsList.Count; filesCount++)
                    {
                        attachmentPath = HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "attachments");
                        attachmentName = (String)JsonConvert.DeserializeObject<dynamic>(attachmentsList[filesCount].ToString()).name;

                        File.Move(attachmentPath+ "\\" + attachmentName, HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log"+ "\\" + attachmentName));
                    }
                }
                else if (attachmentPath != null && attachmentName != null)
                {
                    File.Move(attachmentPath+ "\\" + attachmentName, HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log"+ "\\" + attachmentName));
                }
            }
            else
            {
                /* CHECK FOR THE EXCEPTION IGNORE INDICATION */
                exceptionIgnoreList = new XmlDocument();
                exceptionIgnoreList.Load(HttpContext.Current.Server.MapPath("~\\fmt"+ "\\" + "msvQueueManager" + "\\" + "ExceptionIgnoreList.xml"));

                processIndicator = false;

                foreach (XmlNode node in exceptionIgnoreList.DocumentElement)
                {
                    if (Regex.IsMatch(responseString, node.InnerText))
                    {
                        exceptionIgnoreIndicator = true;
                        processIndicator = Convert.ToBoolean(node.Attributes.GetNamedItem("process").Value);
                        break;
                    }
                }

                if (!exceptionIgnoreIndicator)
                {
                    LogServiceException(clientID, countryCode, userID, filePath, fileName, queueString, responseString);

                    if (!Directory.Exists(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + "StopQueueProcess")))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + "StopQueueProcess"));
                    }

                    File.WriteAllText(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + "StopQueueProcess"+ "\\" + userID + ".txt"), "Exception has been occured while processing the queue for this user. Kindly refer the exception log for more details.");
                }
                else
                {
                    LogIgnoredException(clientID, countryCode, userID, responseString);
                }

                if (processIndicator)
                {
                    /* MOVE THE PROCESSED FILE TO LOG FOLDER */
                    if (!Directory.Exists(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log")))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log"));
                    }

                    File.Move(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + filePath+ "\\" + fileName), HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log"+ "\\" + fileName));

                    File.AppendAllText(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log"+ "\\" + fileName), Environment.NewLine + Environment.NewLine + responseString);

                    if (attachmentsList != null)
                    {
                        for (filesCount = 0; filesCount < attachmentsList.Count; filesCount++)
                        {
                            attachmentPath = HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "attachments");
                            attachmentName = (String)JsonConvert.DeserializeObject<dynamic>(attachmentsList[filesCount].ToString()).name;

                            File.Move(attachmentPath+ "\\" + attachmentName, HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log"+ "\\" + attachmentName));
                        }
                    }
                    else if (attachmentPath != null && attachmentName != null)
                    {
                        File.Move(attachmentPath+ "\\" + attachmentName, HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "log"+ "\\" + attachmentName));
                    }
                }
            }

            return processIndicator;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static Boolean ProcessResponse(String clientID, String countryCode, String userID, String filePath, String fileName, String requestUrl, String responseString)
    {
        Boolean processIndicator;

        try
        {
            processIndicator = true;

            if (requestUrl.Contains("save_mark_attendance") || requestUrl.Contains("save_file_to_attachment_master") || requestUrl.Contains("delete_data") || requestUrl.Contains("save_trip_sheet") || requestUrl.Contains("update_call_wfeventverb_status_change") || requestUrl.Contains("save_manage_custom_info"))
            {
                try
                {
                    if (responseString.IndexOf("ApplicationException") != -1 && responseString.IndexOf("\"ApplicationException\":null") == -1)
                    {
                        processIndicator = RecoverException(clientID, countryCode, userID, filePath, fileName, requestUrl, responseString);
                    }
                }
                catch (Exception ex)
                {
                    processIndicator = true;
                }
            }
            else if (requestUrl.Contains("convertHtml2PDFOffline") || requestUrl.Contains("file_upload_offline") || requestUrl.Contains("file_delete") || requestUrl.Contains("UploadFiles") || requestUrl.Contains("CreateDigitalReport"))
            {
                var responseObject = JsonConvert.DeserializeObject<dynamic>(responseString);

                if (responseObject.status != "success")
                {
                    processIndicator = false;
                }

            }

            return processIndicator;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static Boolean RecoverException(String clientID, String countryCode, String userID, String filePath, String fileName, String requestUrl, String responseString)
    {
        Boolean recoverIndicator;

        try
        {
            recoverIndicator = false;

            if (requestUrl.Contains("save_trip_sheet"))
            {
                if (responseString.Contains("String was not recognized as a valid DateTime"))
                {
                    LogRecoveredException(clientID, countryCode, userID, filePath+ "\\" + fileName);

                    recoverIndicator = true;
                }
            }

            return recoverIndicator;
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public static void LogServiceException(String clientID, String countryCode, String userID, String filePath, String fileName, String queueString, String responseString)
    {
        String notificationMessage;

        try
        {
            if (!Directory.Exists(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "exception")))
            {
                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "exception"));
            }

            File.WriteAllText(HttpContext.Current.Server.MapPath("~\\content_store"+ "\\" + clientID+ "\\" + countryCode+ "\\" + "QueueManager"+ "\\" + userID+ "\\" + "exception"+ "\\" + fileName), queueString + Environment.NewLine + Environment.NewLine + responseString);

            LogServiceException2DB(clientID, countryCode, userID);

            notificationMessage = "<div>";
            notificationMessage += "<div><b>CLIENT ID</b> - " + clientID + "</div><br/>";
            notificationMessage += "<div><b>COUNTRY CODE</b> - " + countryCode + "</div><br/>";
            notificationMessage += "<div><b>USER ID</b> - " + userID + "</div><br/>";
            notificationMessage += "<div><b>FILE NAME</b> - " + fileName + "</div><br/>";
            notificationMessage += "<div><b>EXCEPTION CONTENT</b> - " + responseString + "</div><br/>";
            notificationMessage += "</div>";

            SendNotification(clientID, countryCode, notificationMessage);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public static void SendNotification(String clientID, String countryCode, String errorMessage)
    {
        XmlDocument configDoc;
        SmtpClient smtpServer;
        MailMessage mailMessage;
        String smtpServerName, smtpUserName, smtpPassword, smtpSenderName, smtpPortNo, smtpEnableSSL, notificationEmailTO, notificationEmailCC;
        String[] ccList;
        Int32 index;

        try
        {
            configDoc = new XmlDocument();
            configDoc.Load(HttpContext.Current.Server.MapPath("~\\fmt" + "\\" + "msvQueueManager" + "\\" + "configuration.xml"));
            smtpServerName = configDoc.SelectSingleNode("configuration" + "/" + clientID + "/" + countryCode + "/" + "smtpServerName").InnerText.ToString();
            smtpUserName = configDoc.SelectSingleNode("configuration" + "/" + clientID + "/" + countryCode + "/" + "smtpUserName").InnerText.ToString();
            smtpPassword = configDoc.SelectSingleNode("configuration" + "/" + clientID + "/" + countryCode + "/" + "smtpPassword").InnerText.ToString();
            smtpSenderName = configDoc.SelectSingleNode("configuration" + "/" + clientID + "/" + countryCode + "/" + "smtpSenderName").InnerText.ToString();
            smtpPortNo = configDoc.SelectSingleNode("configuration" + "/" + clientID + "/" + countryCode + "/" + "smtpPortNo").InnerText.ToString();
            smtpEnableSSL = configDoc.SelectSingleNode("configuration" + "/" + clientID + "/" + countryCode + "/" + "smtpEnableSSL").InnerText.ToString();
            notificationEmailTO = configDoc.SelectSingleNode("configuration" + "/" + clientID + "/" + countryCode + "/" + "notificationEmailTO").InnerText.ToString();
            notificationEmailCC = configDoc.SelectSingleNode("configuration" + "/" + clientID + "/" + countryCode + "/" + "notificationEmailCC").InnerText.ToString();

            mailMessage = new MailMessage();
            smtpServer = new SmtpClient(smtpServerName);
            mailMessage.From = new MailAddress(smtpUserName, smtpSenderName);
            mailMessage.To.Add(notificationEmailTO);

            if (notificationEmailCC != "")
            {
                ccList = notificationEmailCC.Split(';');

                for (index = 0; index < ccList.Length; index++)
                {
                    mailMessage.CC.Add(ccList[index]);
                }
            }

            mailMessage.Subject = "Mservice Queue Manager Exception Notification";
            mailMessage.IsBodyHtml = true;
            mailMessage.Body = errorMessage;
            smtpServer.Port = Convert.ToInt16(smtpPortNo);
            smtpServer.EnableSsl = Convert.ToBoolean(smtpEnableSSL);
            smtpServer.Credentials = new System.Net.NetworkCredential(smtpUserName, smtpPassword);

            smtpServer.Send(mailMessage);
        }
        catch (Exception ex)
        {
            msvUtil.LogException(clientID, countryCode, "QueueManager", ex.Message, ex.StackTrace);
            LogServiceException2DB(clientID, countryCode, queueUserID);
        }
    }
    private static void ExceptionNotification(String clientID, String countryCode, String errorMessage, String stackTrace)
    {
        String exceptionContent, notificationMessage;

        exceptionContent = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");
        exceptionContent += Environment.NewLine;
        exceptionContent += "------------------------------------";
        exceptionContent += Environment.NewLine;
        exceptionContent += queueFileName;
        exceptionContent += Environment.NewLine;
        exceptionContent += "------------------------------------";
        exceptionContent += Environment.NewLine;
        exceptionContent += errorMessage;
        exceptionContent += Environment.NewLine;
        exceptionContent += stackTrace;
        exceptionContent += Environment.NewLine;
        exceptionContent += Environment.NewLine;
        exceptionContent += "**********************************************************************************************************************************";
        exceptionContent += Environment.NewLine;

        LogServiceException2DB(clientID, countryCode, queueUserID);

        notificationMessage = "<div>";
        notificationMessage += "<div><b>CLIENT ID</b> - " + clientID + "</div><br/>";
        notificationMessage += "<div><b>COUNTRY CODE</b> - " + countryCode + "</div><br/>";
        notificationMessage += "<div><b>EXCEPTION CONTENT</b> - " + exceptionContent + "</div><br/>";
        notificationMessage += "</div>";

        SendNotification(clientID, countryCode, notificationMessage);
    }

    private static void LogIgnoredException(String clientID, String countryCode, String userID, String errorMessage)
    {
        string exceptionContent;

        if (!Directory.Exists(HttpContext.Current.Server.MapPath("~\\log\\QueueManager")))
        {
            Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~\\log\\QueueManager"));
        }

        exceptionContent = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss") + "--->";
        exceptionContent += clientID + "--->";
        exceptionContent += countryCode + "--->";
        exceptionContent += userID + "--->";
        exceptionContent += errorMessage;
        exceptionContent += Environment.NewLine;

        File.AppendAllText(HttpContext.Current.Server.MapPath("~\\log\\QueueManager" + "\\" + "Ignored_" + DateTime.Now.ToString("dd-MM-yyyy") + ".txt"), exceptionContent);
    }

    private static void LogRecoveredException(String clientID, String countryCode, String userID, String errorMessage)
    {
        string exceptionContent;

        if (!Directory.Exists(HttpContext.Current.Server.MapPath("~\\log\\QueueManager")))
        {
            Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~\\log\\QueueManager"));
        }

        exceptionContent = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss") + "--->";
        exceptionContent += clientID + "--->";
        exceptionContent += countryCode + "--->";
        exceptionContent += userID + "--->";
        exceptionContent += errorMessage;
        exceptionContent += Environment.NewLine;

        File.AppendAllText(HttpContext.Current.Server.MapPath("~\\log\\QueueManager" + "\\" + "Recovered_" + DateTime.Now.ToString("dd-MM-yyyy") + ".txt"), exceptionContent);
    }

    private static void LogServiceException2DB(String clientID, String countryCode, String userID)
    {
        string fileContent;
        SqlConnection conn;
        SqlCommand command;

        conn = new SqlConnection();
        command = new SqlCommand();

        try
        {
			/*GET CONNECTION STRING FROM WEB.CONFIG*/
            conn.ConnectionString = ConfigurationManager.ConnectionStrings["conn_toolz"].ConnectionString;

            if (File.Exists(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + userID + "\\" + "exception" + "\\" + queueFileName)))
            {
                fileContent = File.ReadAllText(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + userID + "\\" + "exception" + "\\" + queueFileName));
            }
            else
            {
                fileContent = queueExceptionContent;
            }
            if (queueFileName == "")
            {
                queueFileName = DateTime.Now.ToString("yyyymmddhhmmss") + "_unkown_file_name";
            }

            command.Connection = conn;
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.Clear();
            command.CommandText = "sp_save_manage_exception_detail";
            command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = userID;
            command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = "toolz";
            command.Parameters.Add("@i_customer_id", SqlDbType.VarChar, 20).Value = clientID;
            command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = "en-us";
            command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = countryCode;
            command.Parameters.Add("@i_file_name", SqlDbType.VarChar, 50).Value = queueFileName;
            command.Parameters.Add("@i_file_content", SqlDbType.NVarChar, 3500).Value = fileContent.Replace("}\r\n\r\n{", ",").Replace("\"", "").Replace("\\", "").Replace("\r\n", "");
            command.Parameters.Add("@i_root_cause", SqlDbType.NVarChar, 30).Value = "";
            command.Parameters.Add("@i_remarks", SqlDbType.NVarChar, 1500).Value = "";
            command.Parameters.Add("@i_received_on", SqlDbType.NVarChar, 30).Value = DateTime.Now.ToString("dd.MMM.yyyy  hh:mm:ss tt");
            command.Parameters.Add("@i_resolved_on", SqlDbType.NVarChar, 30).Value = " ";
            command.Parameters.Add("@i_save_mode", SqlDbType.VarChar, 1).Value = 'A';

            conn.Open();
            command.ExecuteNonQuery();
        }
        catch (Exception ex)
        {
            msvUtil.LogException(clientID, countryCode, "QueueMonitorToolz", ex.Message, ex.StackTrace);
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

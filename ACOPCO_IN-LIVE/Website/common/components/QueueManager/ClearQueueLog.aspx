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
<%@ Import Namespace="msvInterface" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String clientID, countryCode;

        clientID = Request.QueryString["client_id"];
        countryCode = Request.QueryString["country_code"];

        try
        {
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

        try
        {
            queueManagerDirectory = new DirectoryInfo(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager"));

            if (queueManagerDirectory.Exists == true)
            {
                foreach (DirectoryInfo userDirectory in queueManagerDirectory.GetDirectories())
                {
                    try
                    {
                        ClearLogDirectory(clientID, countryCode, userDirectory.Name);
                    }
                    catch (Exception ex)
                    {
                        msvUtil.LogException(clientID, countryCode, "QueueManager", ex.Message, ex.StackTrace);
                        ExceptionNotification(clientID, countryCode, ex.Message, ex.StackTrace);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    private static void ClearLogDirectory(String clientID, String countryCode, String userID)
    {
        try
        {
            if (Directory.Exists(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + userID + "\\" + "log")))
            {
                Directory.Delete(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + userID + "\\" + "log"), true);
            }
            if (Directory.Exists(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + userID + "\\" + "exception")))
            {
                Directory.Delete(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + userID + "\\" + "exception"), true);
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public static void ExceptionNotification(String clientID, String countryCode,String errorMessage, String stackTrace)
    {
        String exceptionContent, notificationMessage;

        try
        {
            exceptionContent = DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss");
            exceptionContent += Environment.NewLine;
            exceptionContent += "-------------------";
            exceptionContent += Environment.NewLine;
            exceptionContent += errorMessage;
            exceptionContent += Environment.NewLine;
            exceptionContent += stackTrace;
            exceptionContent += Environment.NewLine;
            exceptionContent += Environment.NewLine;
            exceptionContent += "**********************************************************************************************************************************";
            exceptionContent += Environment.NewLine;

            notificationMessage = "<div>";
            notificationMessage += "<div><b>CLIENT ID</b> - " + clientID + "</div><br/>";
            notificationMessage += "<div><b>COUNTRY CODE</b> - " + countryCode + "</div><br/>";
            notificationMessage += "<div><b>EXCEPTION CONTENT</b> - " + exceptionContent + "</div><br/>";
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
            configDoc.Load(HttpContext.Current.Server.MapPath("~\\fmt"+ "\\" + "msvQueueManager" + "\\" + "configuration.xml"));
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
        }
    }
</script>
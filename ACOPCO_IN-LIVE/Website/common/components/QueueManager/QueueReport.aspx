<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="msvInterface" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String clientID, countryCode, filePath;
        clientID = Request.QueryString["client_id"];
        countryCode = Request.QueryString["country_code"];
        try
        {
            filePath = HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + "StopQueueProcess.xml");

            if (File.Exists(filePath))
            {
                XmlDocument doc = new XmlDocument();
                doc.Load(filePath);

                Response.ContentType = "application/json";
                Response.Write(Request.QueryString["callback"] + "(" + "{\"content\":\"" + doc.OuterXml + "\"}" + ")");
            }
            else
            {
                Response.ContentType = "application/json";
                Response.Write(Request.QueryString["callback"] + "(" + "{\"content\":\"\"}" + ")");
            }
        }
        catch (Exception ex)
        {
            msvUtil.LogException(clientID, countryCode, "QueueManager", ex.Message, ex.StackTrace);
        }

    }
</script>
<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String clientID, countryCode, deletePath, deleteFiles, responseMessage;
        String[] deleteFilesList;

        responseMessage = "";

        try
        {
            clientID = Request.QueryString["client_id"];
            countryCode = Request.QueryString["country_code"];
            deletePath = Request.QueryString["path"];
            deleteFiles = Request.QueryString["files"];

            deleteFilesList = deleteFiles.Split('|');

            foreach(String file in deleteFilesList)
            {
                if (File.Exists(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + deletePath + "\\" + file)))
                {
                    File.Delete(HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + deletePath + "\\" + file));
                }
            }

            responseMessage = "{\"status\":\"success\", \"response\":\"" + "SP001" + "\"}";
        }
        catch(Exception ex)
        {
            responseMessage = "{\"status\":\"failure\", \"response\":\"" + ex.Message + "\"}";
        }

        Response.ContentType = "text/json";
        Response.Write(responseMessage);
    }
</script>
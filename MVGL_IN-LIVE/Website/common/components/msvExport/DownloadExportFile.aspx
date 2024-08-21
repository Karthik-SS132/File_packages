<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="Newtonsoft.Json"%>
<%@ Import Namespace="Newtonsoft.Json.Linq"%>
<%@ Import Namespace="System.Web.UI" %>
<%@ Import Namespace="System.Web.UI.WebControls" %>
<%@ Import Namespace="System.Collections.Specialized" %>
<%@ Import Namespace="msvInterface"%>

<script runat="server">
    public void Page_Load(object sender, EventArgs e)
    {
        String clientId, countryCode, filePath;

        clientId = Request.QueryString["client_id"];
        countryCode = Request.QueryString["country_code"];
        filePath = Request.QueryString["filePath"];

        try
        {

            if (File.Exists(HttpContext.Current.Server.MapPath("~\\" + filePath)))
            {
                Response.Clear();
                Response.ClearContent();
                Response.ClearHeaders();
                Response.AddHeader("content-disposition", "attachment; filename=" + Path.GetFileName(filePath));
                Response.ContentType = "application/octet-stream";
                Response.WriteFile(HttpContext.Current.Server.MapPath("~\\" + filePath));
                Response.Flush();
            }

            Response.Write("{\"status\":\"success\", \"response\":\"" + "SP001" + "\"}");
        }
        catch (Exception ex)
        {
            Response.Write(ex.Message);
            msvUtil.LogException(clientId, countryCode, "Export", ex.Message, ex.StackTrace);
        }
    }
</script>
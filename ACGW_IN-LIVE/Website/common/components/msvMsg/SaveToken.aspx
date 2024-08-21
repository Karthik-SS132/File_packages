<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="msvInterface" %>
<%@ Import Namespace="Newtonsoft.Json" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        var requestStream = JsonConvert.DeserializeObject<dynamic>(new StreamReader(Request.InputStream).ReadToEnd());
        msvMsg.SaveFcmToken(Request.QueryString["client_id"], Request.QueryString["country_code"], (String)requestStream.mobileno, (String)requestStream.token, (String)requestStream.appid, (String)requestStream.channel);
		Response.Write("{\"status\":\"success\"}");
    }
</script>
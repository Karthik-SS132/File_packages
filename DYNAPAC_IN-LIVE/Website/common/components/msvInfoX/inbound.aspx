<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="msvInterface" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String clientId, countryCode, infoXSubType, responseMessage;

        //GET VALUE FROM QUERY STRING
        clientId = Request.QueryString["clientId"];
        countryCode = Request.QueryString["countryCode"];
        infoXSubType = Request.QueryString["infoXSubType"];

        try
        {
            msvInfoX.InitiateInbound(clientId, countryCode, infoXSubType);
            responseMessage = "{\"status\":\"success\", \"response\":\"" + "SP001" + "\"}";
        }
        catch(Exception ex)
        {
            msvUtil.LogException(clientId, countryCode, "msvinfox", ex.Message, ex.StackTrace);
            responseMessage = "{\"status\":\"failure\", \"response\":\"" + ex.Message + "\"}";
        }

        Response.ContentType = "text/json";
        Response.Write(responseMessage);
    }
</script>
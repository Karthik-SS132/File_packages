<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="msvInterface" %>
<%@ Import Namespace="Newtonsoft.Json" %>

<script runat="server">
	protected void Page_Load(object sender, EventArgs e)
    {
       msvMsg.SendMessage(AppDomain.CurrentDomain.BaseDirectory, Request.QueryString["client_id"], Request.QueryString["country_code"], Request.QueryString["from"], Request.QueryString["to"], Request.QueryString["msg"]);
    }    
</script>
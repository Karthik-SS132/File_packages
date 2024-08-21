<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="msvInterface" %>

<script runat="server">
	protected void Page_Load(object sender, EventArgs e)
    {
		String clientID, countryCode, userID, returnValue;

		clientID = Request.QueryString["client_id"];	
		countryCode = Request.QueryString["country_code"];	
		userID = Request.QueryString["user_id"];	
		
		try 
		{				
			
			if (Directory.Exists(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + userID + "\\" + "queue")))
			{
				if ((new DirectoryInfo(HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + userID + "\\" + "queue"))).GetFiles().Length == 0)
				{
					returnValue = "true";
				}
				else
				{
					returnValue = "false";
				}
			}
			else
			{
				returnValue = "true";
			}
			
			Response.Write(returnValue);
		}
		catch(Exception ex) 
		{
			msvUtil.LogException(clientID, countryCode, "QueueManager", ex.Message, ex.StackTrace);
			Response.Write("false");
		}
    }
</script>
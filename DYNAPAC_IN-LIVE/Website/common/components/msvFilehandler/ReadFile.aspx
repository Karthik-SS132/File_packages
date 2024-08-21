<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>

<script runat="server">
	protected void Page_Load(object sender, EventArgs e)
    {
		String appRoot, clientID, countryCode, filePath, fileContent, responseMessage;
		
		appRoot = AppDomain.CurrentDomain.BaseDirectory;
		responseMessage = "";
		
		try 
		{			
			clientID = Request.QueryString["client_id"];	
			countryCode = Request.QueryString["country_code"];	
			filePath = Request.QueryString["path"];
			
			if (File.Exists(appRoot + filePath))
			{
				fileContent = File.ReadAllText(appRoot + filePath);
				responseMessage = "{\"status\":\"success\", \"response\":" + fileContent + "}";
			}
			else
			{
				responseMessage = "{\"status\":\"failure\", \"response\":\"file_does_not_exist\"}";
			}
		}
		catch(Exception ex) 
		{
			responseMessage = "{\"status\":\"failure\", \"response\":\"" + ex.Message + "\"}";
		}
		
		Response.ContentType = "text/json";
		Response.Write(responseMessage);
    }
</script>
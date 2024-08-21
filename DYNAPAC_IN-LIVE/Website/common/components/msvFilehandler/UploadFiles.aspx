<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>

<script runat="server">
	protected void Page_Load(object sender, EventArgs e)
    {
		String appRoot, clientID, countryCode, uploadPath, responseMessage;
		HttpFileCollection uploadedFiles;
		int filesCount;
		
		appRoot = AppDomain.CurrentDomain.BaseDirectory;
		responseMessage = "";
		
		try 
		{			
			clientID = Request.QueryString["client_id"];	
			countryCode = Request.QueryString["country_code"];	
			uploadPath = Request.QueryString["path"];
			
			uploadedFiles = Request.Files;
			
			if (!Directory.Exists(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + uploadPath))
			{
				Directory.CreateDirectory(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + uploadPath);
			}			

			for (filesCount = 0; filesCount < uploadedFiles.Count; filesCount++)
			{
				uploadedFiles[filesCount].SaveAs(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + uploadPath + "\\" + uploadedFiles[filesCount].FileName);				
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
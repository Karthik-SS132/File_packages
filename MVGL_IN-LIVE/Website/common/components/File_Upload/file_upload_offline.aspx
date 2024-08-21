<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>

<script runat="server">
	protected void Page_Load(object sender, EventArgs e)
    {
		String responseMessage = "", companyId, countryCode, filename, doc_type, path;
		
		try 
		{
			companyId = Request.QueryString["companyId"];
			countryCode = Request.QueryString["countryCode"];
			filename = Request.QueryString["filename"];
			doc_type = Request.QueryString["doc_type"];			
			path = "~/content_store/" + companyId + "/" + countryCode + "/" + doc_type;
			
			var srv_path = Server.MapPath(path);			
            
			HttpFileCollection uploadedFiles = Request.Files;
			if (!Directory.Exists(srv_path))
			{
				Directory.CreateDirectory(srv_path);
			}
			
			HttpPostedFile file = uploadedFiles[0];
			file.SaveAs(srv_path + "/" + filename);
			
			responseMessage = "{\"status\":\"success\", \"response\":\"SP001\"}";
		}
		catch(Exception ex) 
		{
			responseMessage = "{\"status\":\"failure\", \"response\":\"" + ex.Message + "\"}";
		}
		
		Response.ContentType = "text/json";
		Response.Write(responseMessage);
    }
</script>
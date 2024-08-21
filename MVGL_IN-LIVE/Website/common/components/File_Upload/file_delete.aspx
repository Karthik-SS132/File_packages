<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>

<script runat="server">
	protected void Page_Load(object sender, EventArgs e)
    {
		String responseMessage = "", path;
		
		try 
		{		
			path = Request.QueryString["path"];
		   
			path = "~/content_store/" + path + "asd";
			
			var srv_path = Server.MapPath(path);
		   
			if(File.Exists(srv_path))
			{
				File.Delete(srv_path);
			}
			
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
<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>
<script runat="server">
protected void Page_Load(object sender, EventArgs e)
    {
		String companyId = Request.QueryString["companyId"];
		String countryCode = Request.QueryString["countryCode"];
		String filename = Request.QueryString["filename"];
		String doc_type = Request.QueryString["doc_type"];
		HttpFileCollection uploadedFiles = Request.Files;
		HttpPostedFile file = uploadedFiles[0];
		
		String path="~/content_store/"+companyId+"/"+countryCode+"/"+doc_type;   

		var srv_path = Server.MapPath(path);
		
		if (!Directory.Exists(srv_path))
		{
			Directory.CreateDirectory(srv_path);
		}		
		
		file.SaveAs(srv_path + "/" + filename);
    }
</script>
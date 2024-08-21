<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>
<script runat="server">
protected void Page_Load(object sender, EventArgs e)
    {
		//Get value from Query string
		String companyId=Request.QueryString["companyId"];
		String countryCode=Request.QueryString["countryCode"];
		String filename=Request.QueryString["filename"];
		String doc_type=Request.QueryString["doc_type"];
		
		//path generation
		String path="~/content_store/"+companyId+"/"+countryCode+"/"+doc_type;
	   
		//Maping Server Path
		var srv_path = Server.MapPath(path);
	   
		//Files load
		HttpFileCollection uploadedFiles = Request.Files;
		
		//File upload operation
        for (int i = 0; i < uploadedFiles.Count; i++)
        {           
            if (!Directory.Exists(srv_path))	// Directory Creation If It not exist.
            {
                Directory.CreateDirectory(srv_path);
            }
            HttpPostedFile file = uploadedFiles[i];
            file.SaveAs(srv_path+"/"+file.FileName);
        }
    }
</script>
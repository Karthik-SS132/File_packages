<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.Linq" %>
<%@ Import Namespace="System.Web.UI" %>
<%@ Import Namespace="System.Web.UI.WebControls" %>
<%@ Import Namespace="System.Collections.Specialized" %>

<script runat="server">
    public void Page_Load(object sender, EventArgs e)
    {
        String fileName = Request.QueryString["fileName"];
        String filePath = Request.QueryString["filePath"];

        Response.Clear();
        Response.AppendHeader("Content-Disposition", "attachment;filename=" + fileName + ".zip");
        Response.ContentType = "application / x - zip - compressed";
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.WriteFile(HttpContext.Current.Server.MapPath( "~/" + filePath + "/" + fileName + ".zip"));
        Response.Flush();
        Directory.Delete(HttpContext.Current.Server.MapPath("~/" + filePath), true);

        Response.End();
    }
</script>
<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Xml" %>

<script runat="server">
public void Page_Load(object sender, EventArgs e)
{
	String clientID, countryCode, localeID, configFileName, fmtRoot, productInfoRoot, productName, imgFileName, contentFileName, response;
    XmlDocument configDoc;
        
	try
	{
        
        clientID = Request.QueryString["client_id"];
        countryCode = Request.QueryString["country_code"];
        localeID = Request.QueryString["locale_id"];

        fmtRoot = "fmt" + "/" + "ProductInformation";
        configFileName = "product_info_" + clientID + "_" + countryCode + "_" + localeID + ".xml";

        if (!File.Exists(HttpContext.Current.Server.MapPath("~/" + fmtRoot + "/" + configFileName))) 
        {            
            configFileName = "product_info_" + clientID + "_" + countryCode + "_" + "ALL" + ".xml";
            if (!File.Exists(HttpContext.Current.Server.MapPath("~/" + fmtRoot + "/" + configFileName))) 
            {   
                configFileName = "";
            }
        }

        if (configFileName != "")
        {
            configDoc = new XmlDocument();
            configDoc.Load(HttpContext.Current.Server.MapPath("~/" + fmtRoot + "/" + configFileName));

            productInfoRoot = "content_store" + "/" + clientID + "/" + countryCode + "/" + "ProductInformation";
            
            response = "[";

            foreach (XmlNode node in configDoc.DocumentElement.ChildNodes)
            {
                productName = node.SelectSingleNode("product_name").InnerText;
                imgFileName = node.SelectSingleNode("img_file_name").InnerText;
                contentFileName = node.SelectSingleNode("content_file_name").InnerText;

                response += "{";
                response += "\"product_name\":\"" + productName + "\",";
                response += "\"img_src\":\"" + productInfoRoot + "/" + imgFileName + "\",";
                response += "\"content\":\"" + File.ReadAllText(HttpContext.Current.Server.MapPath("~/" + productInfoRoot + "\\" + contentFileName)).Replace("\r", "").Replace("\n", "").Replace("\t", "") + "\"";
                response += "},";    
            }

            if (response != "[")
            {
                response = response.Substring(0, response.Length - 1);
            }

            response += "]";
			
            Response.Write(response);
        }
        else
        {
            Response.Write("[]");
        }
	}
	catch (Exception ex)
	{
		Response.Write("[]");
	}
}
</script>
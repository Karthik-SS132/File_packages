<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Xml.Schema" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Xml.Xsl" %>
<%@ Import Namespace="System.Reflection" %>
<%@ Import Namespace="NReco.PdfGenerator" %>
<%@ Import Namespace="UmoldITLibraries" %>
<%@ Import Namespace="CustomLibraries" %>

<script runat="server">
protected void Page_Load(object sender, EventArgs e)
{
    XmlDocument xmlIn = new XmlDocument();
    XmlDocument xmlOut = new XmlDocument();
	string responseMessage = "";

    try
    {
		
		StreamReader sr = new StreamReader(Request.InputStream);
        string serviceInputJSON = sr.ReadToEnd();
		xmlIn = Utilities.ConvertJsonStringToXml(serviceInputJSON);
		
        
        //xmlIn.Load(Request.InputStream);

        string sessionId = xmlIn.FirstChild.SelectSingleNode("./context/sessionId").InnerText;
        string userId = xmlIn.FirstChild.SelectSingleNode("./context/userId").InnerText;
        string client_id = xmlIn.FirstChild.SelectSingleNode("./context/client_id").InnerText;
        string locale_id = xmlIn.FirstChild.SelectSingleNode("./context/locale_id").InnerText;
        string country_code = xmlIn.FirstChild.SelectSingleNode("./context/country_code").InnerText;

        string htmlString = xmlIn.FirstChild.SelectSingleNode("./context/inputparam/p_input_html_string").InnerText;
        string output_directory = HttpContext.Current.Server.MapPath("~/" + xmlIn.FirstChild.SelectSingleNode("./context/inputparam/p_output_file_path").InnerText);
        string output_filename = xmlIn.FirstChild.SelectSingleNode("./context/inputparam/p_output_file_name").InnerText;


        string pdfPath = output_directory + "/" + output_filename;



        string finalHtmlString = htmlString.Replace("\r\n\t", "");

        if (!Directory.Exists(output_directory))
        {
            Directory.CreateDirectory(output_directory);
        }
		
		HtmlToPdfConverter pdf = new HtmlToPdfConverter();
		pdf.Size = NReco.PdfGenerator.PageSize.A4;
		pdf.Orientation = NReco.PdfGenerator.PageOrientation.Portrait;
		pdf.GeneratePdf("<meta charset = 'UTF-8'>" + finalHtmlString, null, pdfPath);
		
		//File.WriteAllText(pdfPath.Replace(".pdf", ".xml"), xmlString);		
		//xmlOut.LoadXml(BuildRespose("<outputparam><return_status>SP001</return_status></outputparam>"));
		responseMessage = "{\"status\":\"success\", \"response\":\"SP001\"}";
    }
    catch (Exception exp)
    {
		responseMessage = "{\"status\":\"failure\", \"response\":\"Sorry! Unable to generate the pdf file. Plese contact your support desk.\"}";
		string exception_directory = HttpContext.Current.Server.MapPath("~/Log/convertHtml2PDF/");
		string exception_file_name = exception_directory + "exception_" + DateTime.Now.ToString("yyyy_MM_dd") + ".txt";
		string exception_msg = "<document>";
		exception_msg += "<UADSApplicationExceptionClass>";
		exception_msg += "<error_message>Sorry! Unable to generate the pdf file. Plese contact your support desk. </error_message>";
		exception_msg += "</UADSApplicationExceptionClass>";
		exception_msg += "</document>";

		if (!Directory.Exists(exception_directory))
		{
			Directory.CreateDirectory(exception_directory);
		}   

		string error_conent = "----------------------------------------------------------------------------------------------------------\n";
		error_conent += "Error raised time:" + DateTime.Now.ToString("HH:mm") + "\n";
		error_conent += "XmlIn:" + xmlIn.OuterXml.ToString() + "\n";
		error_conent += "Exception:" + exp.Message + "\n";
		File.AppendAllText(exception_file_name, error_conent);
    }
    Response.ContentType = "text/json";
    Response.Write(responseMessage);
}
public string BuildApplicationException(string error_message,string xmlIn)
{
    string exception_directory = HttpContext.Current.Server.MapPath("~/Log/convertHtml2PDF/");
    string exception_file_name =exception_directory + "exception_" + DateTime.Now.ToString("yyyy_MM_dd") + ".txt";
    string exception_msg = "<document>";
    exception_msg += "<UADSApplicationExceptionClass>";
    exception_msg += "<error_message>Sorry! Unable to generate the pdf file. Plese contact your support desk. </error_message>";
    exception_msg += "</UADSApplicationExceptionClass>";
    exception_msg += "</document>";

    if (!Directory.Exists(exception_directory))
    {
        Directory.CreateDirectory(exception_directory);
    }   

    string error_conent = "----------------------------------------------------------------------------------------------------------\n";
    error_conent += "Error raised time:" + DateTime.Now.ToString("HH:mm") + "\n";
    error_conent += "XmlIn:" + xmlIn + "\n";
    error_conent += "Exception:" + error_message + "\n";
    File.AppendAllText(exception_file_name, error_conent);
   
    return exception_msg;
}
public string BuildRespose(string response_xml)
{
    String response_msg = "<document>";
    response_msg += "<context>";
    response_msg += response_xml;
    response_msg += "</context>";
    response_msg += "</document>";
    return response_msg;
}
</script>
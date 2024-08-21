<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Xml.Schema" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Xml.Xsl" %>
<%@ Import Namespace="System.Reflection" %>
<%@ Import Namespace="NReco.PdfGenerator" %>

<script runat="server">
protected void Page_Load(object sender, EventArgs e)
{
    XmlDocument xmlIn = new XmlDocument();
    XmlDocument xmlOut = new XmlDocument();

    try
    {
        
        xmlIn.Load(Request.InputStream);

        string sessionId = xmlIn.FirstChild.SelectSingleNode("./context/sessionId").InnerText;
        string userId = xmlIn.FirstChild.SelectSingleNode("./context/userId").InnerText;
        string client_id = xmlIn.FirstChild.SelectSingleNode("./context/client_id").InnerText;
        string locale_id = xmlIn.FirstChild.SelectSingleNode("./context/locale_id").InnerText;
        string country_code = xmlIn.FirstChild.SelectSingleNode("./context/country_code").InnerText;

        string template = xmlIn.FirstChild.SelectSingleNode("./context/inputparam/p_template_code").InnerText;
        string xmlString = xmlIn.FirstChild.SelectSingleNode("./context/inputparam/p_inputparam_xml").InnerText;
        string output_directory = HttpContext.Current.Server.MapPath("~/" + xmlIn.FirstChild.SelectSingleNode("./context/inputparam/p_output_file_path").InnerText);
        string output_filename = xmlIn.FirstChild.SelectSingleNode("./context/inputparam/p_output_file_name").InnerText;


        string xslFile = HttpContext.Current.Server.MapPath("~/common/components/convertHtml2Pdf/templates/" + template + "_" + client_id + "_" + country_code + "_" + locale_id + ".xslt");
        string htmlFile = HttpContext.Current.Server.MapPath("~/common/components/convertHtml2Pdf/templates/" + template + "_" + client_id + "_" + country_code + "_" + locale_id + ".html");
        string pdfPath =  output_directory + output_filename;


        string xslFileString = File.ReadAllText(xslFile);
        string htmlFileString = File.ReadAllText(htmlFile);

        string finalXslTemplateString = xslFileString.Replace("<html></html>", htmlFileString).Replace("\r\n\t", "");

        StringWriter finalHtmlObject = new StringWriter();
        XmlDocument xdoc = new XmlDocument();
        xdoc.LoadXml(xmlString);
        XsltSettings settings = new XsltSettings();
        settings.EnableScript = true;
        XslTransform xslTran = new XslTransform();
        XslCompiledTransform objXslTrans = new XslCompiledTransform();
        objXslTrans.Load(new XmlTextReader(new StringReader(finalXslTemplateString)), settings, new XmlUrlResolver());
        objXslTrans.Transform(xdoc, null, finalHtmlObject);

        if (!Directory.Exists(output_directory))
        {
            Directory.CreateDirectory(output_directory);
        }
		
		if (template.IndexOf("jsa") == -1)
		{
			Assembly DocgenAssembly = Assembly.LoadFile(HttpContext.Current.Server.MapPath("~/bin/doc_gen.dll"));
			Type DocgenAssemblyClass = DocgenAssembly.GetType("doc_gen");
			object DocgenAssemblyClassInstance = Activator.CreateInstance(DocgenAssemblyClass);
			string docgen_response = (string)DocgenAssemblyClass.InvokeMember("Doc_gen", BindingFlags.InvokeMethod | BindingFlags.Instance | BindingFlags.Public, null, DocgenAssemblyClassInstance, new object[] { finalHtmlObject.ToString(), pdfPath });
			if (docgen_response == "SP001")
			{
				xmlOut.LoadXml(BuildRespose("<outputparam><return_status>SP001</return_status></outputparam>"));
			}
			else
			{
				xmlOut.LoadXml(BuildApplicationException(docgen_response, xmlIn.OuterXml.ToString()));
			}
		}
		else
		{
			HtmlToPdfConverter pdf = new HtmlToPdfConverter();
            pdf.Size = NReco.PdfGenerator.PageSize.A4;
            pdf.Orientation = NReco.PdfGenerator.PageOrientation.Portrait;
            pdf.GeneratePdf("<meta charset = 'UTF-8'>" + finalHtmlObject.ToString(), null, pdfPath);
            xmlOut.LoadXml(BuildRespose("<outputparam><return_status>SP001</return_status></outputparam>"));
		}
    }
    catch (Exception exp)
    {
        xmlOut.LoadXml(BuildApplicationException(exp.Message, xmlIn.OuterXml.ToString()));
    }
    Response.ContentType = "text/xml";
    Response.Write(xmlOut.OuterXml.ToString());
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
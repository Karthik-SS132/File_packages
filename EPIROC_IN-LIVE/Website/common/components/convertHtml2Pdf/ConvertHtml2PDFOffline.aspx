<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Xml.Schema" %>
<%@ Import Namespace="System.Collections.Generic" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Xml.Xsl" %>
<%@ Import Namespace="System.Reflection" %>
<%@ Import Namespace="NReco.PdfGenerator" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>
<%@ Import Namespace="System.Xml.Serialization" %>

<script runat="server">
	protected void Page_Load(object sender, EventArgs e) 
	{
		XmlDocument xmlIn = new XmlDocument();
		String responseMessage = "", header = "", footer= "";
		String serviceInputJSON, client_id, locale_id, country_code, sessionId, userId, template, xmlString, output_directory, output_filename, xslFile, pdfPath, xslFileString, finalXslTemplateString,exception_directory, exception_file_name, exception_msg, form_version;
		StreamReader sr;
		StringWriter finalHtmlObject;
		
		try 
		{
			sr = new StreamReader(Request.InputStream);
			serviceInputJSON = sr.ReadToEnd();
			xmlIn = ConvertJsonStringToXml(serviceInputJSON);
			
			sessionId = xmlIn.FirstChild.SelectSingleNode("./context/sessionId").InnerText;
			userId = xmlIn.FirstChild.SelectSingleNode("./context/userId").InnerText;
			client_id = xmlIn.FirstChild.SelectSingleNode("./context/client_id").InnerText;
			locale_id = xmlIn.FirstChild.SelectSingleNode("./context/locale_id").InnerText;
			country_code = xmlIn.FirstChild.SelectSingleNode("./context/country_code").InnerText;

			template = xmlIn.FirstChild.SelectSingleNode("./context/inputparam/p_template_code").InnerText;
			xmlString = xmlIn.FirstChild.SelectSingleNode("./context/inputparam/p_inputparam_xml").InnerText;
			output_directory = HttpContext.Current.Server.MapPath("~/" + xmlIn.FirstChild.SelectSingleNode("./context/inputparam/p_output_file_path").InnerText);
			output_filename = xmlIn.FirstChild.SelectSingleNode("./context/inputparam/p_output_file_name").InnerText;
			
			if( xmlIn.FirstChild.SelectSingleNode("./context/inputparam/form_version") != null ) 
			{
				form_version = xmlIn.FirstChild.SelectSingleNode("./context/inputparam/form_version").InnerText;
				xslFile = HttpContext.Current.Server.MapPath("~/common/components/convertHtml2Pdf/templates/" + template + "_" + client_id + "_" + country_code + "_" + locale_id + "_" + form_version + ".xslt");
			} else 
			{
				xslFile = HttpContext.Current.Server.MapPath("~/common/components/convertHtml2Pdf/templates/" + template + "_" + client_id + "_" + country_code + "_" + locale_id + ".xslt");
			}
			
			pdfPath = output_directory + output_filename;

			xslFileString = File.ReadAllText(xslFile);
			finalXslTemplateString = xslFileString.Replace("\r\n\t", "");
			finalHtmlObject = new StringWriter();
			XmlDocument xdoc = new XmlDocument();
			xdoc.LoadXml(xmlString);
			XsltSettings settings = new XsltSettings();
			settings.EnableScript = true;
			XslCompiledTransform objXslTrans = new XslCompiledTransform();
			objXslTrans.Load(new XmlTextReader(new StringReader(finalXslTemplateString)), settings, new XmlUrlResolver());
			objXslTrans.Transform(xdoc, null, finalHtmlObject);
			
			// Check output directory exists or not
			if (!Directory.Exists(output_directory)) 
			{
				Directory.CreateDirectory(output_directory);
			}
			
			HtmlToPdfConverter pdf = new HtmlToPdfConverter();
			pdf.Size = NReco.PdfGenerator.PageSize.A4;
			pdf.Orientation = NReco.PdfGenerator.PageOrientation.Portrait;
			String str = finalHtmlObject.ToString();
		   
			//Header Part Generation
			if (str.Contains("<mserviceheader>")) 
			{
				int startIndex = str.IndexOf("<mserviceheader>");
				int endIndex = str.IndexOf("</mserviceheader>") + 17;
				int finalIndex = endIndex - startIndex;
				header = str.Substring(startIndex, finalIndex);
				str = str.Remove(startIndex, finalIndex);
			}
			 
			 //Footer Part Generation
			if (str.Contains("<mservicefooter>")) 
			{
				int startIndex = str.IndexOf("<mservicefooter>");
				int endIndex = str.IndexOf("</mservicefooter>") + 17;
				int finalIndex = endIndex - startIndex;
				footer = str.Substring(startIndex, finalIndex);
				str = str.Remove(startIndex, finalIndex);
			}
			String degreeCharValue = "" + Convert.ToChar(176);
			str = str.Replace("\\n", "<br/>").Replace("&amp;#176;", degreeCharValue);
			pdf.PageHeaderHtml = header;
			pdf.PageFooterHtml = footer;
			pdf.GeneratePdf("<meta charset = 'UTF-8'>" + str, null, pdfPath);
			
			
			//xml file Creation
			File.WriteAllText(pdfPath.Replace(".pdf", ".xml"), xmlString);
			responseMessage = "{\"status\":\"success\", \"response\":\"SP001\"}";
		}
		catch (Exception exp) 
		{
			responseMessage = "{\"status\":\"failure\", \"response\":\"Sorry! Unable to generate the pdf file. Plese contact your support desk.\"}";
			exception_directory = HttpContext.Current.Server.MapPath("~/Log/convertHtml2PDF/");
			exception_file_name = exception_directory + "exception_" + DateTime.Now.ToString("yyyy_MM_dd") + ".txt";
			exception_msg = "<document>";
			exception_msg += "<UADSApplicationExceptionClass>";
			exception_msg += "<error_message>Sorry! Unable to generate the pdf file. Plese contact your support desk. </error_message>";
			exception_msg += "</UADSApplicationExceptionClass>";
			exception_msg += "</document>";

			if (!Directory.Exists(exception_directory)) 
			{
				Directory.CreateDirectory(exception_directory);
			}   

			String error_conent = "----------------------------------------------------------------------------------------------------------\n";
			error_conent += "Error raised time:" + DateTime.Now.ToString("HH:mm") + "\n";
			error_conent += "XmlIn:" + xmlIn.OuterXml.ToString() + "\n";
			error_conent += "Exception:" + exp.Message + "\n";
			File.AppendAllText(exception_file_name, error_conent);
		}
		
		Response.ContentType = "text/json";
		Response.Write(responseMessage);
	}

	public static XmlDocument ConvertJsonStringToXml(string json)
	{
		JavaScriptSerializer js = new JavaScriptSerializer() { MaxJsonLength = 20971520 };
		XmlDocument convertedXml = new XmlDocument();
		Dictionary<string, object> jsonObjDictionary = (Dictionary<string, object>)js.DeserializeObject(json);

		convertedXml.InnerXml = "<document />";

		return convertJsontoXml(jsonObjDictionary, convertedXml, convertedXml.FirstChild);
	}

	private static XmlDocument convertJsontoXml(Dictionary<string, object> jsonObjDictionary, XmlDocument convertedXml, XmlNode parentNode)
	{
		foreach (var item in jsonObjDictionary)
		{
			if (item.Value.GetType().IsGenericType)
			{
				XmlElement newElement = convertedXml.CreateElement(item.Key);
				XmlNode childNode = parentNode.AppendChild(newElement);

				Dictionary<string, object> dicObject = new Dictionary<string, object>();
				dicObject = (Dictionary<string, object>)item.Value;

				convertedXml = convertJsontoXml(dicObject, convertedXml, childNode);
			}
			else
			{
				XmlElement newElement = convertedXml.CreateElement(item.Key);
				newElement.InnerText = (item.Value.ToString());
				parentNode.AppendChild(newElement);
			}
		}
		return convertedXml;
	}
</script>
<%@ Page Language="C#" %>
<%@ Import Namespace="System.Xml" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Text" %>
<%@ Import Namespace="UmoldITLibraries" %>
<%@ Import Namespace="CustomLibraries" %>

<script runat="server" language="C#">
    
protected void Page_Load(object sender, EventArgs e)
{
    XmlDocument requestXml = new XmlDocument();
    XmlDocument serviceInput = new XmlDocument();
    XmlDocument serviceOutput = new XmlDocument();
    String serviceURL = "";
    
    try
    {
        requestXml.Load(Request.InputStream);

        serviceURL = requestXml.DocumentElement.SelectSingleNode("./serviceURL").InnerText;

	    //Remove extra node
        serviceInput.InnerXml = "<document/>";
        serviceInput.DocumentElement.AppendChild(serviceInput.ImportNode(requestXml.DocumentElement.SelectSingleNode("./context"), true));

        serviceOutput = (XmlDocument)executeService(serviceURL, serviceInput);
        if (serviceOutput.FirstChild.SelectSingleNode("./UADSApplicationExceptionClass") == null)
        {
            XmlNode contextNode = serviceOutput.SelectSingleNode(".//context");

            transformXml(contextNode, serviceOutput);
        }
    }
    catch (Exception exp)
    {
        serviceOutput = Utilities.generateXML(exp.Message);
    }    
    
    Response.ContentType = "text/xml";
    Response.Write(serviceOutput.OuterXml.ToString());
}

//XML OVER HTTP INVOCATION
public XmlDocument executeService(string targetURL, XmlDocument inputXMLDoc)
{
    XmlDocument outXML = null;
    try
    {
        HttpWebRequest request;
        HttpWebResponse response = null;
        XmlTextReader textReader;
        Stream requestStream, responseStream;
        byte[] bytes;
        
        request = (HttpWebRequest)WebRequest.Create(targetURL);
        bytes = Encoding.ASCII.GetBytes(inputXMLDoc.InnerXml);
        
        request.Method = "POST";
        request.ContentType = "text/xml";
        request.ContentLength = bytes.Length;
        
        requestStream = request.GetRequestStream();
        requestStream.Write(bytes, 0, bytes.Length);
        requestStream.Close();
                
        response = (HttpWebResponse)request.GetResponse();
        
        if (response.StatusCode == HttpStatusCode.OK)
        {
            responseStream = response.GetResponseStream();
            textReader = new XmlTextReader(responseStream);
            outXML = new XmlDocument();
            outXML.Load(textReader);
            textReader.Close();
        }
        response.Close();
    }
    catch (Exception ex)
    {
        throw ex;
    }
    return outXML;
}

//FUNCTION TO TRANSFORM XML
private void transformXml(XmlNode parentNode, XmlDocument serviceresponseXml)
{
    foreach (XmlNode childNode in parentNode.ChildNodes)
    {
        if (childNode != null && childNode.NodeType == XmlNodeType.Element)
        {
            if (childNode.Name.Contains("_xml"))
            {
                childNode.InnerXml = childNode.InnerText.Replace("&","&amp;");
            }
            else if (childNode.HasChildNodes)
            {
                transformXml(childNode, serviceresponseXml);
            }
        }
    }
}
    
</script>
/* 
 * This file contains invocation code snippets for executing the service convertHtml2PDF. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service convertHtml2PDF 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service convertHtml2PDF
function executeService_convertHtml2PDF(convertHtml2PDF_object)
{
    var targetURL = getWebserverpath() + "common/components/convertHtml2Pdf/convertHtml2PDF.aspx";
    
    //Prepare convertHtml2PDF service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_convertHtml2PDF(convertHtml2PDF_object));
    
    if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
    {
        //Response xml contains error
        //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue
        //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue
        alert(responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
        return false;
    }
    else
    {
        return processServiceResponseData_convertHtml2PDF(responseXML);
    }
    return false;
}

//Code for preparing input data for the service convertHtml2PDF
function prepareServiceRequestData_convertHtml2PDF(convertHtml2PDF_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
	serviceDetails = serviceDetails + "<inputparam>";
	serviceDetails = serviceDetails + "<p_template_code>" + getXmlString(convertHtml2PDF_object.p_template_code) + "</p_template_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_inputparam_xml>" + getXmlString(convertHtml2PDF_object.p_inputparam_xml) + "</p_inputparam_xml>";  // Unlimited
    serviceDetails = serviceDetails + "<p_output_file_path>" + getXmlString(convertHtml2PDF_object.p_output_file_path) + "</p_output_file_path>";  // Unicode string
    serviceDetails = serviceDetails + "<p_output_file_name>" + getXmlString(convertHtml2PDF_object.p_output_file_name) + "</p_output_file_name>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service convertHtml2PDF
function processServiceResponseData_convertHtml2PDF(xmlDoc)
{
	var return_value = "";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
			return_value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
        }
    }
	return return_value;
}

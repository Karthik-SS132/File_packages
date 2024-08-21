/* 
 * This file contains invocation code snippets for executing the service generate_pdf_document. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service generate_pdf_document 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service generate_pdf_document
function executeService_generate_pdf_document()
{
    var targetURL =  getWebserverpath() + "common_modules/generate_pdf_document.aspx";
    
    //Prepare generate_pdf_document service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_generate_pdf_document());
    
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
        processServiceResponseData_generate_pdf_document(responseXML);
        return true;
    }
    return false;
}

//Code for preparing input data for the service generate_pdf_document
function prepareServiceRequestData_generate_pdf_document()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
	serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_document_type>" + getXmlString(document_type) + "</p_document_type>";  // Unicode string
	 serviceDetails = serviceDetails + "<p_document_template>" + getXmlString(document_template) + "</p_document_template>";  // Unicode string
    serviceDetails = serviceDetails + "<p_data_retrieve_service_name>" + getXmlString(retrieve_service_name) + "</p_data_retrieve_service_name>";  // String
    serviceDetails = serviceDetails + "<p_data_retrieve_request_xml>" + getXmlString(retrieve_request_xml) + "</p_data_retrieve_request_xml>";  // Unicode string
    serviceDetails = serviceDetails + "<p_output_file_path>" + getXmlString(output_file_path) + "</p_output_file_path>";  // Unicode string
    serviceDetails = serviceDetails + "<p_output_file_name>" + getXmlString(output_file_name) + "</p_output_file_name>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service generate_pdf_document
function processServiceResponseData_generate_pdf_document(xmlDoc)
{
	pdf_update_status="";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
          //  document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_file_name
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[2].lastChild.nodeValue; // p_file_path
		   
		   pdf_update_status=responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
        }
    }
}

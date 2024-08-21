/* 
 * This file contains invocation code snippets for executing the service delete_data. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service delete_data 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service delete_data
function executeService_delete_data()
{
    var targetURL = getWebserverpath() + "common_modules/delete_data.aspx";
    
    //Prepare delete_data service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_delete_data());
    
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
        return processServiceResponseData_delete_data(responseXML);
    }
    return false;
}

//Code for preparing input data for the service delete_data
function prepareServiceRequestData_delete_data()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_information_type>" + getXmlString(p_information_type) + "</p_information_type>";  // String
    serviceDetails = serviceDetails + "<p_field_1>" + getXmlString(p_field_1) + "</p_field_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_field_2>" + getXmlString(p_field_2) + "</p_field_2>";  // Unicode string
    serviceDetails = serviceDetails + "<p_field_3>" + getXmlString(p_field_3) + "</p_field_3>";  // Unicode string
    serviceDetails = serviceDetails + "<p_field_4>" + getXmlString(p_field_4) + "</p_field_4>";  // Unicode string
    serviceDetails = serviceDetails + "<p_field_5>" + getXmlString(p_field_5) + "</p_field_5>";  // Unicode string
    serviceDetails = serviceDetails + "<p_field_6>" + getXmlString(p_field_6) + "</p_field_6>";  // Unicode string
    serviceDetails = serviceDetails + "<p_field_7>" + getXmlString(p_field_7) + "</p_field_7>";  // Unicode string
    serviceDetails = serviceDetails + "<p_field_8>" + getXmlString(p_field_8) + "</p_field_8>";  // Unicode string
    serviceDetails = serviceDetails + "<p_field_9>" + getXmlString(p_field_9) + "</p_field_9>";  // Unicode string
    serviceDetails = serviceDetails + "<p_field_10>" + getXmlString(p_field_10) + "</p_field_10>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service delete_data
function processServiceResponseData_delete_data(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            return responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
}

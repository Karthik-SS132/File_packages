/* 
 * This file contains invocation code snippets for executing the service retrieve_manage_asset_service_visit_details. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_manage_asset_service_visit_details 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_manage_asset_service_visit_details
function executeService_retrieve_manage_asset_service_visit_details(retrieve_manage_asset_service_visit_details_object)
{
    var targetURL = getWebserverpath() + "mservice/retrieve_manage_asset_service_visit_details.aspx";
    
    //Prepare retrieve_manage_asset_service_visit_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_asset_service_visit_details(retrieve_manage_asset_service_visit_details_object));
    
    if (responseXML.getElementsByTagName("ApplicationException").length > 0)
    {
        //Output contains error
        var exceptionNode = responseXML.getElementsByTagName("ApplicationException")[0];
        var errorNumber = "", errorDescription = "";
        errorNumber = exceptionNode.childNodes[0].lastChild.nodeValue;
        errorDescription = exceptionNode.childNodes[1].lastChild.nodeValue;
        if (errorNumber != "")
            errorNumber += ": ";
        alert(errorNumber + errorDescription);
        return false;
    }
    else
    {
        return processServiceResponseData_retrieve_manage_asset_service_visit_details(responseXML);
    }
    return false;
}

//Code for preparing input data for the service retrieve_manage_asset_service_visit_details
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_manage_asset_service_visit_details(retrieve_manage_asset_service_visit_details_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_asset_id>" + getXmlString(retrieve_manage_asset_service_visit_details_object.p_asset_id) + "</p_asset_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_contract_doc_no>" + getXmlString(retrieve_manage_asset_service_visit_details_object.p_contract_doc_no) + "</p_contract_doc_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_service_visit_slno>" + getXmlString(retrieve_manage_asset_service_visit_details_object.p_service_visit_slno) + "</p_service_visit_slno>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_manage_asset_service_visit_details
function processServiceResponseData_retrieve_manage_asset_service_visit_details(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var returnValue = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            returnValue += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_service_visit_detail_xml
        }
    }
	returnValue += "</list>";
	return returnValue;
}

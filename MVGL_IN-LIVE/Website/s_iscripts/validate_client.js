/* 
 * This file contains invocation code snippets for executing the service validate_client. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service validate_client 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service validate_client
function executeService_validate_client()
{
    var targetURL = getWebserverpath() + "security/validate_client.aspx";
    
    //Prepare validate_client service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_validate_client());
    
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
        processServiceResponseData_validate_client(responseXML);
        return true;
    }
    return false;
}

//Code for preparing input data for the service validate_client
function prepareServiceRequestData_validate_client()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails += "<context>";
    serviceDetails += "<sessionId>" + getXmlString("7e9c274d-1c4b-4234-9eec-4f90971f998b") + "</sessionId>"; //UniqueIdentifier string
    serviceDetails += "<userId>" +  getXmlString("signin") + "</userId>"; //Unicode string
    serviceDetails += "<client_id>" + getXmlString(client_id) + "</client_id>"; //String
    serviceDetails += "<locale_id>" + getXmlString("en-us") + "</locale_id>"; //String
    serviceDetails += "<country_code>" + getXmlString("in") + "</country_code>"; //String
	
    //Processing auth_client_request segment
    serviceDetails = serviceDetails + "<auth_client_request>";
    serviceDetails = serviceDetails + "<p_company_id>" + getXmlString(client_id) + "</p_company_id>";  // String
    serviceDetails = serviceDetails + "</auth_client_request>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service validate_client
function processServiceResponseData_validate_client(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "auth_client_response_header")
        {
            p_valid_client_ind = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_valid_client_ind
			AppName = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_app_name
        }
    }
}

/* 
 * This file contains invocation code snippets for executing the service validate_device. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service validate_device 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service validate_device
function executeService_validate_device()
{
    var targetURL = getWebserverpath() + "/security/validate_device.aspx";
    
    //Prepare validate_device service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_validate_device());
    
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
        return processServiceResponseData_validate_device(responseXML);
        
    }
    return false;
}

//Code for preparing input data for the service validate_device
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_validate_device()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
     //Processing context segment
    serviceDetails = serviceDetails + "<context>";
    serviceDetails = serviceDetails + "<sessionId>" + getXmlString("B06DAAC4-5601-4008-BA24-9968C4AF0F76") + "</sessionId>"; // UniqueIdentifier string
    serviceDetails = serviceDetails + "<userId>" + getXmlString("dsignin") + "</userId>"; // Unicode string
    serviceDetails = serviceDetails + "<client_id>" + getXmlString(device_profile.company_id) + "</client_id>"; // String
    serviceDetails = serviceDetails + "<locale_id>" + getXmlString(device_profile.local_id) + "</locale_id>"; // String
    serviceDetails = serviceDetails + "<country_code>" + getXmlString(device_profile.country_code) + "</country_code>"; // String
    
    //Processing auth_device_request segment
    serviceDetails = serviceDetails + "<auth_device_request>";
    serviceDetails = serviceDetails + "<p_device_id>" + getXmlString(device_profile.device_id) + "</p_device_id>";  // String
    serviceDetails = serviceDetails + "<p_company_id>" + getXmlString(device_profile.company_id) + "</p_company_id>";  // String
    serviceDetails = serviceDetails + "<p_country_code>" + getXmlString(device_profile.country_code) + "</p_country_code>";  // String
    serviceDetails = serviceDetails + "<p_company_location_code>" + getXmlString(device_profile.company_location) + "</p_company_location_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_login_date>" + device_profile.login_date + "</p_login_date>";  // String
    serviceDetails = serviceDetails + "<p_login_hour>" + device_profile.login_hour + "</p_login_hour>";  // String
    serviceDetails = serviceDetails + "<p_login_minute>" + device_profile.login_minute + "</p_login_minute>";  // String
    serviceDetails = serviceDetails + "</auth_device_request>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service validate_device
function processServiceResponseData_validate_device(xmlDoc)
{
	var validate_device_header = {};
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "auth_device_response_header")
        {
            validate_device_header.valid_device_ind = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_valid_device_ind
            validate_device_header.valid_app_name = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_app_name
			validate_device_header.session_id = responseXMLNode[toplevelChildi].childNodes[2].lastChild.nodeValue; // p_device_session_id
        }
    }
	return validate_device_header;
}

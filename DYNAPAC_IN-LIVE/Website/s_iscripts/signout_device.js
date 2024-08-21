/* 
 * This file contains invocation code snippets for executing the service signout_device. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service signout_device 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service signout_device
function executeService_signout_device()
{
    var targetURL = getWebserverpath() + "/security/signout_device.aspx";
    
    //Prepare signout_device service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_signout_device());
    
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
        processServiceResponseData_signout_device(responseXML);
        return true;
    }
    return false;
}

//Code for preparing input data for the service signout_device
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_signout_device()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + "<context>";
    serviceDetails = serviceDetails + "<sessionId>" + getXmlString(device_profile.sessionId) + "</sessionId>"; // UniqueIdentifier string
    serviceDetails = serviceDetails + "<userId>" + getXmlString("ws_device") + "</userId>"; // Unicode string
    serviceDetails = serviceDetails + "<client_id>" + getXmlString(device_profile.company_id) + "</client_id>"; // String
    serviceDetails = serviceDetails + "<locale_id>" + getXmlString(device_profile.local_id) + "</locale_id>"; // String
    serviceDetails = serviceDetails + "<country_code>" + getXmlString(device_profile.country_code) + "</country_code>"; // String
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_device_id>" + getXmlString(device_profile.device_id) + "</p_device_id>";  // String
    serviceDetails = serviceDetails + "<p_logout_date>" + getXmlString(CurrentDateTime("yyyy") + "/" + CurrentDateTime("mm") + "/" + CurrentDateTime("dd")) + "</p_logout_date>";  // String
    serviceDetails = serviceDetails + "<p_logout_hour>" + CurrentDateTime("hr") + "</p_logout_hour>";  // String
    serviceDetails = serviceDetails + "<p_logout_minute>" + CurrentDateTime("min") + "</p_logout_minute>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service signout_device
function processServiceResponseData_signout_device(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    //alert(XMLtoString(xmlDoc));
}

/* 
 * This file contains invocation code snippets for executing the service change_password. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service change_password 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service change_password
function executeService_change_password(change_password_object)
{
    var targetURL = getWebserverpath() + "security/change_password.aspx";
    
    //Prepare change_password service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_change_password(change_password_object));
    
    if (responseXML.getElementsByTagName("ApplicationException").length > 0)
    {
        //Output contains error
        var exceptionNode = responseXML.getElementsByTagName("ApplicationException")[0];
        var errorNumber = "", errorDescription = "";
        if(exceptionNode.childNodes[0].lastChild != null)
            errorNumber = exceptionNode.childNodes[0].lastChild.nodeValue;
        errorDescription = exceptionNode.childNodes[1].lastChild.nodeValue.replace(/'/g, "\'");
        if (errorNumber != "")
            errorNumber += ": ";
        alert(errorNumber + errorDescription);
        return false;
    }
    else
    {
        return processServiceResponseData_change_password(responseXML);
    }
    return false;
}

//Code for preparing input data for the service change_password
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_change_password(change_password_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing input_param segment
    serviceDetails = serviceDetails + "<input_param>";
    serviceDetails = serviceDetails + "<p_old_password>" + getXmlString(change_password_object.p_old_password) + "</p_old_password>";  // Unicode string
    serviceDetails = serviceDetails + "<p_new_password>" + getXmlString(change_password_object.p_new_password) + "</p_new_password>";  // Unicode string
    serviceDetails = serviceDetails + "</input_param>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service change_password
function processServiceResponseData_change_password(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	return true;
}

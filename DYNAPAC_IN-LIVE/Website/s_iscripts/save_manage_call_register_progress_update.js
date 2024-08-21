/* 
 * This file contains invocation code snippets for executing the service save_manage_call_register_progress_update. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_call_register_progress_update 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_call_register_progress_update
function executeService_save_manage_call_register_progress_update(save_manage_call_register_progress_update_object)
{
    var targetURL = getWebserverpath() + "mservice/save_manage_call_register_progress_update.aspx";
    
    //Prepare save_manage_call_register_progress_update service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_call_register_progress_update(save_manage_call_register_progress_update_object));
    
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
        return processServiceResponseData_save_manage_call_register_progress_update(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_call_register_progress_update
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_call_register_progress_update(save_manage_call_register_progress_update_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_call_no>" + getXmlString(save_manage_call_register_progress_update_object.p_call_no) + "</p_call_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_comments>" + getXmlString(save_manage_call_register_progress_update_object.p_comments) + "</p_comments>";  // Unicode string
    serviceDetails = serviceDetails + "<p_progress_update_date>" + getXmlString(save_manage_call_register_progress_update_object.p_progress_update_date) + "</p_progress_update_date>";  // String
    serviceDetails = serviceDetails + "<p_progress_update_hour>" + save_manage_call_register_progress_update_object.p_progress_update_hour + "</p_progress_update_hour>";  // String
    serviceDetails = serviceDetails + "<p_progress_update_minute>" + save_manage_call_register_progress_update_object.p_progress_update_minute + "</p_progress_update_minute>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_call_register_progress_update
function processServiceResponseData_save_manage_call_register_progress_update(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var returnValue;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            returnValue = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
	return returnValue;
}

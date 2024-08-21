/* 
 * This file contains invocation code snippets for executing the service save_manage_company_notification_enable_disable. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_company_notification_enable_disable 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_company_notification_enable_disable
function executeService_save_manage_company_notification_enable_disable()
{
    var targetURL = getWebserverpath() + "/common_modules/save_manage_company_notification_enable_disable.aspx";
    
    //Prepare save_manage_company_notification_enable_disable service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_company_notification_enable_disable());
    
    if (responseXML.getElementsByTagName("ApplicationException").length > 0)
    {
        //Response xml contains error
        //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue
        //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue
        alert(responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
        return false;
    }
    else
    {
        return processServiceResponseData_save_manage_company_notification_enable_disable(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_company_notification_enable_disable
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_company_notification_enable_disable()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_notification_event_code>" + getXmlString(Notification_Event_Code) + "</p_notification_event_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_enable_disable_ind>" + getXmlString(Notification_Activate_Indicator) + "</p_enable_disable_ind>";  // Boolean: true or false
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_company_notification_enable_disable
function processServiceResponseData_save_manage_company_notification_enable_disable(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            console.log(responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue); // p_update_status
			return responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
}

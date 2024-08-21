/* 
 * This file contains invocation code snippets for executing the service save_manage_company_notification_recipients. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_company_notification_recipients 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_company_notification_recipients
function executeService_save_manage_company_notification_recipients()
{
    var targetURL = getWebserverpath() + "/common_modules/save_manage_company_notification_recipients.aspx";
    
    //Prepare save_manage_company_notification_recipients service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_company_notification_recipients());
    
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
        return processServiceResponseData_save_manage_company_notification_recipients(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_company_notification_recipients
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_company_notification_recipients()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_notification_event_code>" + getXmlString(Notification_Event_Code) + "</p_notification_event_code>";  // String
    serviceDetails = serviceDetails + "<p_notification_mode>" + getXmlString(Notificaion_Mode) + "</p_notification_mode>";  // String
    serviceDetails = serviceDetails + "<p_recipient_type>" + getXmlString(Recipient_Type) + "</p_recipient_type>";  // String
    serviceDetails = serviceDetails + "<p_id_type>" + getXmlString(ID_Type) + "</p_id_type>";  // String
    serviceDetails = serviceDetails + "<p_org_level_no>" + Org_Level_No + "</p_org_level_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_id_code>" + getXmlString(ID_Code) + "</p_id_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_rec_timestamp>" + getXmlString(rec_tstamp) + "</p_rec_timestamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_mode_notification_mode_recipient) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_company_notification_recipients
function processServiceResponseData_save_manage_company_notification_recipients(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //return responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
}

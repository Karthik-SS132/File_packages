/* 
 * This file contains invocation code snippets for executing the service update_customer_order_wfeventverb_status_change. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service update_customer_order_wfeventverb_status_change 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service update_customer_order_wfeventverb_status_change
function executeService_update_customer_order_wfeventverb_status_change(update_customer_order_wfeventverb_status_change_object)
{
    var targetURL = getWebserverpath() + "salesinvoice/update_customer_order_wfeventverb_status_change.aspx";
    
    //Prepare update_customer_order_wfeventverb_status_change service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_update_customer_order_wfeventverb_status_change(update_customer_order_wfeventverb_status_change_object));
    
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
        return processServiceResponseData_update_customer_order_wfeventverb_status_change(responseXML);
    }
    return false;
}

//Code for preparing input data for the service update_customer_order_wfeventverb_status_change
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_update_customer_order_wfeventverb_status_change(update_customer_order_wfeventverb_status_change_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    var context = getContext();
    serviceDetails = serviceDetails + "<context>";
    if(context != null && context.hasOwnProperty("sessionId"))
        serviceDetails = serviceDetails + "<sessionId>" + context.sessionId + "</sessionId>";
    if(context != null && context.hasOwnProperty("userId"))
        serviceDetails = serviceDetails + "<userId>" + context.userId + "</userId>";
    if(context != null && context.hasOwnProperty("client_id"))
        serviceDetails = serviceDetails + "<client_id>" + context.client_id + "</client_id>";
    if(context != null && context.hasOwnProperty("locale_id"))
        serviceDetails = serviceDetails + "<locale_id>" + context.locale_id + "</locale_id>";
    if(context != null && context.hasOwnProperty("country_code"))
        serviceDetails = serviceDetails + "<country_code>" + context.country_code + "</country_code>";
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_customer_order_no>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_customer_order_no) + "</p_customer_order_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_wfeventverb_id>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_wfeventverb_id) + "</p_wfeventverb_id>";  // String
    serviceDetails = serviceDetails + "<p_event_date>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_event_date) + "</p_event_date>";  // String
    serviceDetails = serviceDetails + "<p_event_hour>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_event_hour) + "</p_event_hour>";  // String
    serviceDetails = serviceDetails + "<p_event_minute>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_event_minute) + "</p_event_minute>";  // String
    serviceDetails = serviceDetails + "<p_from_wf_stage_no>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_from_wf_stage_no) + "</p_from_wf_stage_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_to_wf_stage_no>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_to_wf_stage_no) + "</p_to_wf_stage_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_from_wf_status>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_from_wf_status) + "</p_from_wf_status>";  // String
    serviceDetails = serviceDetails + "<p_to_wf_status>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_to_wf_status) + "</p_to_wf_status>";  // String
    serviceDetails = serviceDetails + "<p_channel_id>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_channel_id) + "</p_channel_id>";  // String
    serviceDetails = serviceDetails + "<p_by_employee_id>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_by_employee_id) + "</p_by_employee_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_to_employee_id_string>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_to_employee_id_string) + "</p_to_employee_id_string>";  // Unicode string
    serviceDetails = serviceDetails + "<p_reason_code>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_reason_code) + "</p_reason_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_comments>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_comments) + "</p_comments>";  // Unicode string
    serviceDetails = serviceDetails + "<p_attachment_xml>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_attachment_xml) + "</p_attachment_xml>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_inputparam_xml1>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_inputparam_xml1) + "</p_inputparam_xml1>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_inputparam_xml2>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_inputparam_xml2) + "</p_inputparam_xml2>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_inputparam_xml3>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_inputparam_xml3) + "</p_inputparam_xml3>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(update_customer_order_wfeventverb_status_change_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service update_customer_order_wfeventverb_status_change
function processServiceResponseData_update_customer_order_wfeventverb_status_change(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var returnValue = {};
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            returnValue.update_status = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
            returnValue.updated_record = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_updated_record
        }
    }
	return returnValue;
}
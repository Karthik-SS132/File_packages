/* 
 * This file contains invocation code snippets for executing the service save_manage_company_notification_rule. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_company_notification_rule 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_company_notification_rule
function executeService_save_manage_company_notification_rule(save_define_notification_rule_object)
{
    var targetURL = getWebserverpath() + "/common_modules/save_manage_company_notification_rule.aspx";
    
    //Prepare save_manage_company_notification_rule service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_company_notification_rule(save_define_notification_rule_object));
    
    if (responseXML.getElementsByTagName("ApplicationException").length > 0)
    {
        //Output contains error
        var exceptionNode = responseXML.getElementsByTagName("ApplicationException")[0];
        errorDescription = exceptionNode.childNodes[1].lastChild.nodeValue;
        alert(errorDescription);
        return false;
    }
    else
    {
        return processServiceResponseData_save_manage_company_notification_rule(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_company_notification_rule
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_company_notification_rule(save_define_notification_rule_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_transaction_type_code>" + getXmlString(save_define_notification_rule_object.p_transaction_type_code) + "</p_transaction_type_code>";  // String
    serviceDetails = serviceDetails + "<p_transaction_subtype_code>" + getXmlString(save_define_notification_rule_object.p_transaction_subtype_code) + "</p_transaction_subtype_code>";  // String
    serviceDetails = serviceDetails + "<p_request_category>" + getXmlString(save_define_notification_rule_object.p_request_category) + "</p_request_category>";  // String
    serviceDetails = serviceDetails + "<p_request_type>" + getXmlString(save_define_notification_rule_object.p_request_type) + "</p_request_type>";  // String
    serviceDetails = serviceDetails + "<p_org_level_no>" + getXmlString(save_define_notification_rule_object.p_org_level_no) + "</p_org_level_no>";  // String
    serviceDetails = serviceDetails + "<p_org_level_code>" + getXmlString(save_define_notification_rule_object.p_org_level_code) + "</p_org_level_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_company_location_code>" + getXmlString(save_define_notification_rule_object.p_company_location_code) + "</p_company_location_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_attachment_type>" + getXmlString(save_define_notification_rule_object.p_attachment_type) + "</p_attachment_type>";  // String
    serviceDetails = serviceDetails + "<p_infromto_ind>" + getXmlString(save_define_notification_rule_object.p_infromto_ind) + "</p_infromto_ind>";  // String
    serviceDetails = serviceDetails + "<p_wf_stage_in>" + save_define_notification_rule_object.p_wf_stage_in + "</p_wf_stage_in>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_wf_status_in>" + getXmlString(save_define_notification_rule_object.p_wf_status_in) + "</p_wf_status_in>";  // String
    serviceDetails = serviceDetails + "<p_wf_stage_from>" + save_define_notification_rule_object.p_wf_stage_from + "</p_wf_stage_from>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_wf_status_from>" + getXmlString(save_define_notification_rule_object.p_wf_status_from) + "</p_wf_status_from>";  // String
    serviceDetails = serviceDetails + "<p_wf_stage_to>" + save_define_notification_rule_object.p_wf_stage_to + "</p_wf_stage_to>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_wf_status_to>" + getXmlString(save_define_notification_rule_object.p_wf_status_to) + "</p_wf_status_to>";  // String
    serviceDetails = serviceDetails + "<p_time_interval>" + save_define_notification_rule_object.p_time_interval + "</p_time_interval>";  // Int16: -32768 to 32767
    serviceDetails = serviceDetails + "<p_time_interval_uom>" + getXmlString(save_define_notification_rule_object.p_time_interval_uom) + "</p_time_interval_uom>";  // String
    serviceDetails = serviceDetails + "<p_time_interval_from_code>" + getXmlString(save_define_notification_rule_object.p_time_interval_from_code) + "</p_time_interval_from_code>";  // String
    serviceDetails = serviceDetails + "<p_notification_eventcode_list>" + getXmlString(save_define_notification_rule_object.p_notification_eventcode_list) + "</p_notification_eventcode_list>";  // Unicode string
    serviceDetails = serviceDetails + "<p_notification_rule_gen_id>" + save_define_notification_rule_object.p_notification_rule_gen_id + "</p_notification_rule_gen_id>";  // Int32: -2147483648 to 2147483647
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_define_notification_rule_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_company_notification_rule
function processServiceResponseData_save_manage_company_notification_rule(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var returnValue = {};
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "inputparam")
        {
            returnValue.rule_gen_id = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_notification_rule_gen_id
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            returnValue.updateStatus = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
	return returnValue;
}

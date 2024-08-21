/* 
 * This file contains invocation code snippets for executing the service save_manage_call_register. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_call_register 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_call_register
function executeService_save_manage_call_register(save_manage_call_register_object)
{
    var targetURL = getWebserverpath() + "mservice/save_manage_call_register.aspx";
    
    //Prepare save_manage_call_register service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_call_register(save_manage_call_register_object));
    
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
        return processServiceResponseData_save_manage_call_register(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_call_register
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_call_register(save_manage_call_register_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_customer_id>" + getXmlString(save_manage_call_register_object.p_customer_id) + "</p_customer_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_asset_id>" + getXmlString(save_manage_call_register_object.p_asset_id) + "</p_asset_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_asset_location_reported>" + getXmlString(save_manage_call_register_object.p_asset_location_reported) + "</p_asset_location_reported>";  // Unicode string
    serviceDetails = serviceDetails + "<p_problem_description>" + getXmlString(save_manage_call_register_object.p_problem_description) + "</p_problem_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_priority_code>" + getXmlString(save_manage_call_register_object.p_priority_code) + "</p_priority_code>";  // String
    serviceDetails = serviceDetails + "<p_customer_contact_name>" + getXmlString(save_manage_call_register_object.p_customer_contact_name) + "</p_customer_contact_name>";  // Unicode string
    serviceDetails = serviceDetails + "<p_call_logged_by_userid>" + getXmlString(save_manage_call_register_object.p_call_logged_by_userid) + "</p_call_logged_by_userid>";  // Unicode string
    serviceDetails = serviceDetails + "<p_call_logged_on_date>" + getXmlString(save_manage_call_register_object.p_call_logged_on_date) + "</p_call_logged_on_date>";  // String
    serviceDetails = serviceDetails + "<p_call_logged_on_hour>" + save_manage_call_register_object.p_call_logged_on_hour + "</p_call_logged_on_hour>";  // String
    serviceDetails = serviceDetails + "<p_call_logged_on_minute>" + save_manage_call_register_object.p_call_logged_on_minute + "</p_call_logged_on_minute>";  // String
    serviceDetails = serviceDetails + "<p_customer_location_code>" + getXmlString(save_manage_call_register_object.p_customer_location_code) + "</p_customer_location_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_company_location_code>" + getXmlString(save_manage_call_register_object.p_company_location_code) + "</p_company_location_code>";  // Unicode string
	serviceDetails = serviceDetails + "<p_organogram_level_no>" + getXmlString(save_manage_call_register_object.p_organogram_level_no) + "</p_organogram_level_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_organogram_level_code>" + getXmlString(save_manage_call_register_object.p_organogram_level_code) + "</p_organogram_level_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_call_category>" + getXmlString(save_manage_call_register_object.p_call_category) + "</p_call_category>";  // String
    serviceDetails = serviceDetails + "<p_call_type>" + getXmlString(save_manage_call_register_object.p_call_type) + "</p_call_type>";  // String
    serviceDetails = serviceDetails + "<p_additional_description>" + getXmlString(save_manage_call_register_object.p_additional_description) + "</p_additional_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_customer_contact_no>" + getXmlString(save_manage_call_register_object.p_customer_contact_no) + "</p_customer_contact_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_customer_contact_email_id>" + getXmlString(save_manage_call_register_object.p_customer_contact_email_id) + "</p_customer_contact_email_id>";  // Unicode string
	serviceDetails = serviceDetails + "<p_equipment_id>" + getXmlString(save_manage_call_register_object.p_equipment_id) + "</p_equipment_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_billable_nonbillable_ind>" + getXmlString(save_manage_call_register_object.p_billable_nonbillable_ind) + "</p_billable_nonbillable_ind>";  // String
    serviceDetails = serviceDetails + "<p_charges_gross_amount>" + getXmlString(save_manage_call_register_object.p_charges_gross_amount) + "</p_charges_gross_amount>";  // Decimal: Total no of digits - 14; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_charges_discount_amount>" + getXmlString(save_manage_call_register_object.p_charges_discount_amount) + "</p_charges_discount_amount>";  // Decimal: Total no of digits - 14; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_charges_tax_amount>" + getXmlString(save_manage_call_register_object.p_charges_tax_amount) + "</p_charges_tax_amount>";  // Decimal: Total no of digits - 14; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_charges_net_amount>" + getXmlString(save_manage_call_register_object.p_charges_net_amount) + "</p_charges_net_amount>";  // Decimal: Total no of digits - 14; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_charges_currency_code>" + getXmlString(save_manage_call_register_object.p_charges_currency_code) + "</p_charges_currency_code>";
	serviceDetails = serviceDetails + "<p_contract_doc_no>" + getXmlString(save_manage_call_register_object.p_contract_doc_no) + "</p_contract_doc_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_contract_visit_no>" + getXmlString(save_manage_call_register_object.p_contract_visit_no) + "</p_contract_visit_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_call_mapped_to_func_role>" + getXmlString(save_manage_call_register_object.p_call_mapped_to_func_role) + "</p_call_mapped_to_func_role>";  // Unicode string
    serviceDetails = serviceDetails + "<p_call_mapped_to_employee_id>" + getXmlString(save_manage_call_register_object.p_call_mapped_to_employee_id) + "</p_call_mapped_to_employee_id>";  // Unicode string
	serviceDetails = serviceDetails + "<p_inputparam_udf_xml>" + getXmlString(save_manage_call_register_object.p_inputparam_udf_xml) + "</p_inputparam_udf_xml>";  // Unlimited unicode string    
    serviceDetails = serviceDetails + "<p_rec_timestamp>" + getXmlString(save_manage_call_register_object.p_rec_timestamp) + "</p_rec_timestamp>";  // UniqueIdentifier string
	serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_call_register_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    
    //Processing outputparam segment
    serviceDetails = serviceDetails + "<outputparam>";
    serviceDetails = serviceDetails + "<p_service_call_ref_no>" + getXmlString(save_manage_call_register_object.p_service_call_ref_no) + "</p_service_call_ref_no>";  // Unicode string
    serviceDetails = serviceDetails + "</outputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_call_register
function processServiceResponseData_save_manage_call_register(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	var returnValue = {};
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
			returnValue.referenceNumber = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_service_call_ref_no
            returnValue.updateStatus = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_update_status
        }
    }
	return returnValue;
}

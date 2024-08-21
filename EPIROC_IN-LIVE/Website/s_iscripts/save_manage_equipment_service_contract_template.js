/* 
 * This file contains invocation code snippets for executing the service save_manage_equipment_service_contract_template. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_equipment_service_contract_template 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_equipment_service_contract_template
function executeService_save_manage_equipment_service_contract_template(save_manage_equipment_service_contract_template_object)
{
    var targetURL = getWebserverpath() + "mservice/save_manage_equipment_service_contract_template.aspx";
    
    //Prepare save_manage_equipment_service_contract_template service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_equipment_service_contract_template(save_manage_equipment_service_contract_template_object));
    
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
        return processServiceResponseData_save_manage_equipment_service_contract_template(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_equipment_service_contract_template
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_equipment_service_contract_template(save_manage_equipment_service_contract_template_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_equipment_id>" + getXmlString(save_manage_equipment_service_contract_template_object.p_equipment_id) + "</p_equipment_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_description>" + getXmlString(save_manage_equipment_service_contract_template_object.p_description) + "</p_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_addn_description>" + getXmlString(save_manage_equipment_service_contract_template_object.p_addn_description) + "</p_addn_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_contract_type>" + getXmlString(save_manage_equipment_service_contract_template_object.p_contract_type) + "</p_contract_type>";  // Unicode string
    serviceDetails = serviceDetails + "<p_contract_duration>" + getXmlString(save_manage_equipment_service_contract_template_object.p_contract_duration) + "</p_contract_duration>";  // Int32: -2147483648 to 2147483647
    serviceDetails = serviceDetails + "<p_contract_duration_uom>" + getXmlString(save_manage_equipment_service_contract_template_object.p_contract_duration_uom) + "</p_contract_duration_uom>";  // String
    serviceDetails = serviceDetails + "<p_parts_covered_ind>" + getXmlString(save_manage_equipment_service_contract_template_object.p_parts_covered_ind) + "</p_parts_covered_ind>";  // Boolean: true or false
    serviceDetails = serviceDetails + "<p_labor_covered_ind>" + getXmlString(save_manage_equipment_service_contract_template_object.p_labor_covered_ind) + "</p_labor_covered_ind>";  // Boolean: true or false
    serviceDetails = serviceDetails + "<p_initial_warranty_ind>" + getXmlString(save_manage_equipment_service_contract_template_object.p_initial_warranty_ind) + "</p_initial_warranty_ind>";  // Boolean: true or false
    serviceDetails = serviceDetails + "<p_prevm_fcy_uom>" + getXmlString(save_manage_equipment_service_contract_template_object.p_prevm_fcy_uom) + "</p_prevm_fcy_uom>";  // String
    serviceDetails = serviceDetails + "<p_prevm_fcy_no>" + getXmlString(save_manage_equipment_service_contract_template_object.p_prevm_fcy_no) + "</p_prevm_fcy_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_prevm_fcy_mprofile_template_id>" + getXmlString(save_manage_equipment_service_contract_template_object.p_prevm_fcy_mprofile_template_id) + "</p_prevm_fcy_mprofile_template_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_inputparam_udf_xml>" + getXmlString(save_manage_equipment_service_contract_template_object.p_inputparam_udf_xml) + "</p_inputparam_udf_xml>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(save_manage_equipment_service_contract_template_object.p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_equipment_service_contract_template_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_equipment_service_contract_template
function processServiceResponseData_save_manage_equipment_service_contract_template(xmlDoc)
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

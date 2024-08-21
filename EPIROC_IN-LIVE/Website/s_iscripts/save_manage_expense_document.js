/* 
 * This file contains invocation code snippets for executing the service save_manage_expense_document. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_expense_document 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_expense_document
function executeService_save_manage_expense_document(save_manage_expense_document_object)
{
    var targetURL = getWebserverpath() + "common_modules/save_manage_expense_document.aspx";
    
    //Prepare save_manage_expense_document service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_expense_document(save_manage_expense_document_object));
    
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
        return processServiceResponseData_save_manage_expense_document(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_expense_document
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_expense_document(save_manage_expense_document_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_expdoc_ref_no>" + getXmlString(save_manage_expense_document_object.p_expdoc_ref_no) + "</p_expdoc_ref_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_call_jo_proj_ind>" + getXmlString(save_manage_expense_document_object.p_call_jo_proj_ind) + "</p_call_jo_proj_ind>";  // String
    serviceDetails = serviceDetails + "<p_expdoc_category>" + getXmlString(save_manage_expense_document_object.p_expdoc_category) + "</p_expdoc_category>";  // String
    serviceDetails = serviceDetails + "<p_expdoc_type>" + getXmlString(save_manage_expense_document_object.p_expdoc_type) + "</p_expdoc_type>";  // Unicode string
    serviceDetails = serviceDetails + "<p_inputparam_udf_xml>" + getXmlString(save_manage_expense_document_object.p_inputparam_udf_xml) + "</p_inputparam_udf_xml>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_rec_timestamp>" + getXmlString(save_manage_expense_document_object.p_rec_timestamp) + "</p_rec_timestamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_expense_document_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 0; inputparam_detaili < save_manage_expense_document_object.inputparam_detail.length; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_expdoc_sl_no>" + getXmlString(save_manage_expense_document_object.inputparam_detail[inputparam_detaili].p_expdoc_sl_no) + "</p_expdoc_sl_no>";  // Byte: 0 to 255
        serviceDetails = serviceDetails + "<p_exp_head_code>" + getXmlString(save_manage_expense_document_object.inputparam_detail[inputparam_detaili].p_exp_head_code) + "</p_exp_head_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_exp_narration>" + getXmlString(save_manage_expense_document_object.inputparam_detail[inputparam_detaili].p_exp_narration) + "</p_exp_narration>";  // Unicode string
		serviceDetails = serviceDetails + "<p_exp_std_rate>" + getXmlString(save_manage_expense_document_object.inputparam_detail[inputparam_detaili].p_exp_std_rate) + "</p_exp_std_rate>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_exp_std_rate_currency>" + getXmlString(save_manage_expense_document_object.inputparam_detail[inputparam_detaili].p_exp_std_rate_currency) + "</p_exp_std_rate_currency>";  // String
        serviceDetails = serviceDetails + "<p_exp_noof_units>" + getXmlString(save_manage_expense_document_object.inputparam_detail[inputparam_detaili].p_exp_noof_units) + "</p_exp_noof_units>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_exp_amount>" + getXmlString(save_manage_expense_document_object.inputparam_detail[inputparam_detaili].p_exp_amount) + "</p_exp_amount>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_inputparam_detail_udf_xml>" + getXmlString(save_manage_expense_document_object.inputparam_detail[inputparam_detaili].p_inputparam_detail_udf_xml) + "</p_inputparam_detail_udf_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "<p_crud_ind>" + getXmlString(save_manage_expense_document_object.inputparam_detail[inputparam_detaili].p_crud_ind) + "</p_crud_ind>";  // String
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_expense_document
function processServiceResponseData_save_manage_expense_document(xmlDoc)
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

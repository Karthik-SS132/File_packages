/* 
 * This file contains invocation code snippets for executing the service save_manage_quotation. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_quotation 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_quotation
function executeService_save_manage_quotation(save_manage_quotation_object)
{
    var targetURL = getWebserverpath() + "salesinvoice/save_manage_quotation.aspx";
    
    //Prepare save_manage_quotation service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_quotation(save_manage_quotation_object));
    
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
        return processServiceResponseData_save_manage_quotation(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_quotation
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_quotation(save_manage_quotation_object)
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
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_txn_ref_no>" + getXmlString(save_manage_quotation_object.p_txn_ref_no) + "</p_txn_ref_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_txn_header_coref_xml>" + getXmlString(save_manage_quotation_object.p_txn_header_coref_xml) + "</p_txn_header_coref_xml>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_txn_header_udf_xml>" + getXmlString(save_manage_quotation_object.p_txn_header_udf_xml) + "</p_txn_header_udf_xml>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_rec_timestamp>" + getXmlString(save_manage_quotation_object.p_rec_timestamp) + "</p_rec_timestamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_quotation_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    
    //Processing inputparam_detail1 segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detail1i = 0; inputparam_detail1i < save_manage_quotation_object.inputparam_detail1.length; inputparam_detail1i++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail1>";
        serviceDetails = serviceDetails + "<p_txn_detail1_sl_no>" + getXmlString(save_manage_quotation_object.inputparam_detail1[inputparam_detail1i].p_txn_detail1_sl_no) + "</p_txn_detail1_sl_no>";  // Byte: 0 to 255
        serviceDetails = serviceDetails + "<p_txn_detail1_coref_xml>" + getXmlString(save_manage_quotation_object.inputparam_detail1[inputparam_detail1i].p_txn_detail1_coref_xml) + "</p_txn_detail1_coref_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "<p_txn_detail1_udf_xml>" + getXmlString(save_manage_quotation_object.inputparam_detail1[inputparam_detail1i].p_txn_detail1_udf_xml) + "</p_txn_detail1_udf_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "<p_txn_detail1_crud_ind>" + getXmlString(save_manage_quotation_object.inputparam_detail1[inputparam_detail1i].p_txn_detail1_crud_ind) + "</p_txn_detail1_crud_ind>";  // String
        serviceDetails = serviceDetails + "</inputparam_detail1>";
    }
    
    //Processing inputparam_detail2 segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
	for (var inputparam_detail2i = 0; inputparam_detail2i < save_manage_quotation_object.inputparam_detail2.length; inputparam_detail2i++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail2>";
        serviceDetails = serviceDetails + "<p_txn_detail2_sl_no>" + getXmlString(save_manage_quotation_object.inputparam_detail2[inputparam_detail2i].p_txn_detail2_sl_no) + "</p_txn_detail2_sl_no>";  // Byte: 0 to 255
        serviceDetails = serviceDetails + "<p_txn_detail2_coref_xml>" + getXmlString(save_manage_quotation_object.inputparam_detail2[inputparam_detail2i].p_txn_detail2_coref_xml) + "</p_txn_detail2_coref_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "<p_txn_detail2_udf_xml>" + getXmlString(save_manage_quotation_object.inputparam_detail2[inputparam_detail2i].p_txn_detail2_udf_xml) + "</p_txn_detail2_udf_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "<p_txn_detail2_crud_ind>" + getXmlString(save_manage_quotation_object.inputparam_detail2[inputparam_detail2i].p_txn_detail2_crud_ind) + "</p_txn_detail2_crud_ind>";  // String
        serviceDetails = serviceDetails + "</inputparam_detail2>";
    }
    
    //Processing inputparam_detail3 segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
	for (var inputparam_detail3i = 0; inputparam_detail3i < save_manage_quotation_object.inputparam_detail3.length; inputparam_detail3i++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail3>";
        serviceDetails = serviceDetails + "<p_txn_detail3_sl_no>" + getXmlString(save_manage_quotation_object.inputparam_detail3[inputparam_detail3i].p_txn_detail3_sl_no) + "</p_txn_detail3_sl_no>";  // Byte: 0 to 255
        serviceDetails = serviceDetails + "<p_txn_detail3_coref_xml>" + getXmlString(save_manage_quotation_object.inputparam_detail3[inputparam_detail3i].p_txn_detail3_coref_xml) + "</p_txn_detail3_coref_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "<p_txn_detail3_udf_xml>" + getXmlString(save_manage_quotation_object.inputparam_detail3[inputparam_detail3i].p_txn_detail3_udf_xml) + "</p_txn_detail3_udf_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "<p_txn_detail3_crud_ind>" + getXmlString(save_manage_quotation_object.inputparam_detail3[inputparam_detail3i].p_txn_detail3_crud_ind) + "</p_txn_detail3_crud_ind>";  // String
        serviceDetails = serviceDetails + "</inputparam_detail3>";
    }
    
    //Processing inputparam_detail4 segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
	for (var inputparam_detail4i = 0; inputparam_detail4i < save_manage_quotation_object.inputparam_detail4.length; inputparam_detail4i++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail4>";
        serviceDetails = serviceDetails + "<p_txn_detail4_sl_no>" + getXmlString(save_manage_quotation_object.inputparam_detail4[inputparam_detail4i].p_txn_detail4_sl_no) + "</p_txn_detail4_sl_no>";  // Byte: 0 to 255
        serviceDetails = serviceDetails + "<p_txn_detail4_coref_xml>" + getXmlString(save_manage_quotation_object.inputparam_detail4[inputparam_detail4i].p_txn_detail4_coref_xml) + "</p_txn_detail4_coref_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "<p_txn_detail4_udf_xml>" + getXmlString(save_manage_quotation_object.inputparam_detail4[inputparam_detail4i].p_txn_detail4_udf_xml) + "</p_txn_detail4_udf_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "<p_txn_detail4_crud_ind>" + getXmlString(save_manage_quotation_object.inputparam_detail4[inputparam_detail4i].p_txn_detail4_crud_ind) + "</p_txn_detail4_crud_ind>";  // String
        serviceDetails = serviceDetails + "</inputparam_detail4>";
    }
    
    //Processing inputparam_detail5 segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detail5i = 0; inputparam_detail5i < save_manage_quotation_object.inputparam_detail5.length; inputparam_detail5i++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail5>";
        serviceDetails = serviceDetails + "<p_txn_detail5_sl_no>" + getXmlString(save_manage_quotation_object.inputparam_detail5[inputparam_detail5i].p_txn_detail5_sl_no) + "</p_txn_detail5_sl_no>";  // Byte: 0 to 255
        serviceDetails = serviceDetails + "<p_txn_detail5_coref_xml>" + getXmlString(save_manage_quotation_object.inputparam_detail5[inputparam_detail5i].p_txn_detail5_coref_xml) + "</p_txn_detail5_coref_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "<p_txn_detail5_udf_xml>" + getXmlString(save_manage_quotation_object.inputparam_detail5[inputparam_detail5i].p_txn_detail5_udf_xml) + "</p_txn_detail5_udf_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "<p_txn_detail5_crud_ind>" + getXmlString(save_manage_quotation_object.inputparam_detail5[inputparam_detail5i].p_txn_detail5_crud_ind) + "</p_txn_detail5_crud_ind>";  // String
        serviceDetails = serviceDetails + "</inputparam_detail5>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_quotation
function processServiceResponseData_save_manage_quotation(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var returnValue = {};
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            returnValue.update_status = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
	return returnValue;
}
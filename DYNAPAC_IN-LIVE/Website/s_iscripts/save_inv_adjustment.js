/* 
 * This file contains invocation code snippets for executing the service save_inv_adjustment. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_inv_adjustment 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_inv_adjustment
function executeService_save_inv_adjustment(save_inv_adjustment_object)
{
    var targetURL = getWebserverpath() + "mservice/save_inv_adjustment.aspx";
    
    //Prepare save_inv_adjustment service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_inv_adjustment(save_inv_adjustment_object));
    
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
        return processServiceResponseData_save_inv_adjustment(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_inv_adjustment
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_inv_adjustment(save_inv_adjustment_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_txn_document_no>" + getXmlString(save_inv_adjustment_object.p_txn_document_no) + "</p_txn_document_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_ref_doc_no>" + getXmlString(save_inv_adjustment_object.p_ref_doc_no) + "</p_ref_doc_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_vendor_reference>" + getXmlString(save_inv_adjustment_object.p_vendor_reference) + "</p_vendor_reference>";  // Unicode string
    serviceDetails = serviceDetails + "<p_txn_date>" + getXmlString(save_inv_adjustment_object.p_txn_date) + "</p_txn_date>";  // String
    serviceDetails = serviceDetails + "<p_txn_hour>" + getXmlString(save_inv_adjustment_object.p_txn_hour) + "</p_txn_hour>";  // String
    serviceDetails = serviceDetails + "<p_txn_minute>" + getXmlString(save_inv_adjustment_object.p_txn_minute) + "</p_txn_minute>";  // String
    serviceDetails = serviceDetails + "<p_qc_doc_ref>" + getXmlString(save_inv_adjustment_object.p_qc_doc_ref) + "</p_qc_doc_ref>";  // Unicode string
    serviceDetails = serviceDetails + "<p_txn_type>" + getXmlString(save_inv_adjustment_object.p_txn_type) + "</p_txn_type>";  // String
	serviceDetails = serviceDetails + "<p_organogram_level_no>" + getXmlString(save_inv_adjustment_object.p_organogram_level_no) + "</p_organogram_level_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_organogram_level_code>" + getXmlString(save_inv_adjustment_object.p_organogram_level_code) + "</p_organogram_level_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_header_rec_tstamp>" + getXmlString(save_inv_adjustment_object.p_header_rec_tstamp) + "</p_header_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_inv_adjustment_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 0; inputparam_detaili < save_inv_adjustment_object.inputparam_detail.length; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_item_code>" + getXmlString(save_inv_adjustment_object.inputparam_detail[inputparam_detaili].p_item_code) + "</p_item_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_item_variant_code>" + getXmlString(save_inv_adjustment_object.inputparam_detail[inputparam_detaili].p_item_variant_code) + "</p_item_variant_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_warehouse_id>" + getXmlString(save_inv_adjustment_object.inputparam_detail[inputparam_detaili].p_warehouse_id) + "</p_warehouse_id>";  // Unicode string
        serviceDetails = serviceDetails + "<p_lot_batch_no>" + getXmlString(save_inv_adjustment_object.inputparam_detail[inputparam_detaili].p_lot_batch_no) + "</p_lot_batch_no>";  // Unicode string
        serviceDetails = serviceDetails + "<p_expiry_date>" + getXmlString(save_inv_adjustment_object.inputparam_detail[inputparam_detaili].p_expiry_date) + "</p_expiry_date>";  // String
        serviceDetails = serviceDetails + "<p_expiry_hour>" + getXmlString(save_inv_adjustment_object.inputparam_detail[inputparam_detaili].p_expiry_hour) + "</p_expiry_hour>";  // String
        serviceDetails = serviceDetails + "<p_expiry_minute>" + getXmlString(save_inv_adjustment_object.inputparam_detail[inputparam_detaili].p_expiry_minute) + "</p_expiry_minute>";  // String
        serviceDetails = serviceDetails + "<p_quantity>" + getXmlString(save_inv_adjustment_object.inputparam_detail[inputparam_detaili].p_quantity) + "</p_quantity>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_uom>" + getXmlString(save_inv_adjustment_object.inputparam_detail[inputparam_detaili].p_uom) + "</p_uom>";  // String
        serviceDetails = serviceDetails + "<p_adj_reason_code>" + getXmlString(save_inv_adjustment_object.inputparam_detail[inputparam_detaili].p_adj_reason_code) + "</p_adj_reason_code>";  // String
        serviceDetails = serviceDetails + "<p_detail_rec_tstamp>" + getXmlString(save_inv_adjustment_object.inputparam_detail[inputparam_detaili].p_detail_rec_tstamp) + "</p_detail_rec_tstamp>";  // UniqueIdentifier string
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_inv_adjustment
function processServiceResponseData_save_inv_adjustment(xmlDoc)
{
	var returnValue;
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            returnValue = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
	return returnValue;
}
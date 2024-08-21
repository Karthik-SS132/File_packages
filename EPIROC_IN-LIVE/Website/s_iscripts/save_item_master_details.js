/* 
 * This file contains invocation code snippets for executing the service save_item_master_details. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_item_master_details 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_item_master_details
function executeService_save_item_master_details(save_item_master_details_object)
{
    var targetURL = getWebserverpath() + "mservice/save_item_master_details.aspx";
    
    //Prepare save_item_master_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_item_master_details(save_item_master_details_object));
    
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
        return processServiceResponseData_save_item_master_details(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_item_master_details
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_item_master_details(save_item_master_details_object)
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
    serviceDetails = serviceDetails + "<p_item_code>" + getXmlString(save_item_master_details_object.p_item_code) + "</p_item_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_variant_code>" + getXmlString(save_item_master_details_object.p_item_variant_code) + "</p_item_variant_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_description>" + getXmlString(save_item_master_details_object.p_item_description) + "</p_item_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_variant_description>" + getXmlString(save_item_master_details_object.p_item_variant_description) + "</p_item_variant_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_udf_xml>" + getXmlString(save_item_master_details_object.p_item_udf_xml) + "</p_item_udf_xml>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_item_category>" + getXmlString(save_item_master_details_object.p_item_category) + "</p_item_category>";  // String
    serviceDetails = serviceDetails + "<p_item_type>" + getXmlString(save_item_master_details_object.p_item_type) + "</p_item_type>";  // Unicode string
    serviceDetails = serviceDetails + "<p_lot_batch_no_appl_ind>" + getXmlString(save_item_master_details_object.p_lot_batch_no_appl_ind) + "</p_lot_batch_no_appl_ind>";  // Boolean: true or false
    serviceDetails = serviceDetails + "<p_expiry_date_appl_ind>" + getXmlString(save_item_master_details_object.p_expiry_date_appl_ind) + "</p_expiry_date_appl_ind>";  // Boolean: true or false
    serviceDetails = serviceDetails + "<p_organogram_level_no>" + getXmlString(save_item_master_details_object.p_organogram_level_no) + "</p_organogram_level_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_organogram_level_code>" + getXmlString(save_item_master_details_object.p_organogram_level_code) + "</p_organogram_level_code>";  // Unicode string
	 serviceDetails = serviceDetails + "<p_inputparam_header_xml>" + getXmlString(save_item_master_details_object.p_inputparam_header_xml) + "</p_inputparam_header_xml>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_item_master_details_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(save_item_master_details_object.p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "</inputparam_header>";
    
    //Processing inputparam_item_rate segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_item_ratei = 0; inputparam_item_ratei < save_item_master_details_object.inputparam_item_rate.length; inputparam_item_ratei++)
    {
        serviceDetails = serviceDetails + "<inputparam_item_rate>";
        serviceDetails = serviceDetails + "<p_uom_code>" + getXmlString(save_item_master_details_object.inputparam_item_rate[inputparam_item_ratei].p_uom_code) + "</p_uom_code>";  // String
        serviceDetails = serviceDetails + "<p_std_rate>" + getXmlString(save_item_master_details_object.inputparam_item_rate[inputparam_item_ratei].p_std_rate) + "</p_std_rate>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_currency_code>" + getXmlString(save_item_master_details_object.inputparam_item_rate[inputparam_item_ratei].p_currency_code) + "</p_currency_code>";  // String
        serviceDetails = serviceDetails + "<p_reorder_level>" + getXmlString(save_item_master_details_object.inputparam_item_rate[inputparam_item_ratei].p_reorder_level) + "</p_reorder_level>";  // Decimal: Total no of digits - 12; No of digits after decimal point - 2
        serviceDetails = serviceDetails + "<p_eoq>" + getXmlString(save_item_master_details_object.inputparam_item_rate[inputparam_item_ratei].p_eoq) + "</p_eoq>";  // Decimal: Total no of digits - 14; No of digits after decimal point - 4
		serviceDetails = serviceDetails + "<p_purchase_amt_or_perc_ind>" + getXmlString(save_item_master_details_object.inputparam_item_rate[inputparam_item_ratei].p_purchase_amt_or_perc_ind) + "</p_purchase_amt_or_perc_ind>";  // String
        serviceDetails = serviceDetails + "<p_purchase_amt_or_perc>" + getXmlString(save_item_master_details_object.inputparam_item_rate[inputparam_item_ratei].p_purchase_amt_or_perc) + "</p_purchase_amt_or_perc>";  // Decimal: Total no of digits - 18; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_inputparam_detail_xml>" + getXmlString(save_item_master_details_object.inputparam_item_rate[inputparam_item_ratei].p_inputparam_detail_xml) + "</p_inputparam_detail_xml>";  // Unlimited unicode string
        serviceDetails = serviceDetails + "</inputparam_item_rate>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_item_master_details
function processServiceResponseData_save_item_master_details(xmlDoc)
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
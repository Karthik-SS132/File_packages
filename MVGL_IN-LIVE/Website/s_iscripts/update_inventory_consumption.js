/* 
 * This file contains invocation code snippets for executing the service update_inventory_consumption. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service update_inventory_consumption 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service update_inventory_consumption
function executeService_update_inventory_consumption(update_inventory_consumption_object)
{
    var targetURL = getWebserverpath() + "mservice/update_inventory_consumption.aspx";
    
    //Prepare update_inventory_consumption service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_update_inventory_consumption(update_inventory_consumption_object));
    
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
        return processServiceResponseData_update_inventory_consumption(responseXML);
    }
    return false;
}

//Code for preparing input data for the service update_inventory_consumption
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_update_inventory_consumption(update_inventory_consumption_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_project_id>" + getXmlString(update_inventory_consumption_object.p_project_id) + "</p_project_id>";  // String
    serviceDetails = serviceDetails + "<p_template_id>" + getXmlString(update_inventory_consumption_object.p_template_id) + "</p_template_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_project_task_level_ind>" + getXmlString(update_inventory_consumption_object.p_project_task_level_ind) + "</p_project_task_level_ind>";  // String
    serviceDetails = serviceDetails + "<p_task_id>" + getXmlString(update_inventory_consumption_object.p_task_id) + "</p_task_id>";  // Int32: -2147483648 to 2147483647
    serviceDetails = serviceDetails + "<p_partlist_template_type>" + getXmlString(update_inventory_consumption_object.p_partlist_template_type) + "</p_partlist_template_type>";  // String
    serviceDetails = serviceDetails + "<p_partlist_template_id>" + getXmlString(update_inventory_consumption_object.p_partlist_template_id) + "</p_partlist_template_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_primary_item_code>" + getXmlString(update_inventory_consumption_object.p_primary_item_code) + "</p_primary_item_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_primary_item_variant_code>" + getXmlString(update_inventory_consumption_object.p_primary_item_variant_code) + "</p_primary_item_variant_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_primary_item_uom>" + getXmlString(update_inventory_consumption_object.p_primary_item_uom) + "</p_primary_item_uom>";  // String
    serviceDetails = serviceDetails + "<p_alt_item_consumed_ind>" + getXmlString(update_inventory_consumption_object.p_alt_item_consumed_ind) + "</p_alt_item_consumed_ind>";  // String
    serviceDetails = serviceDetails + "<p_primary_item_qty_reqd>" + getXmlString(update_inventory_consumption_object.p_primary_item_qty_reqd) + "</p_primary_item_qty_reqd>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_item_source_ind>" + getXmlString(update_inventory_consumption_object.p_item_source_ind) + "</p_item_source_ind>";  // String
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(update_inventory_consumption_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 0; inputparam_detaili < update_inventory_consumption_object.inputparam_detail.length; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_consumption_item_code>" + getXmlString(update_inventory_consumption_object.inputparam_detail[inputparam_detaili].p_consumption_item_code) + "</p_consumption_item_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_consumption_item_variant_code>" + getXmlString(update_inventory_consumption_object.inputparam_detail[inputparam_detaili].p_consumption_item_variant_code) + "</p_consumption_item_variant_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_warehouse_code>" + getXmlString(update_inventory_consumption_object.inputparam_detail[inputparam_detaili].p_warehouse_code) + "</p_warehouse_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_batch_no>" + getXmlString(update_inventory_consumption_object.inputparam_detail[inputparam_detaili].p_batch_no) + "</p_batch_no>";  // Unicode string
        serviceDetails = serviceDetails + "<p_consumed_qty>" + getXmlString(update_inventory_consumption_object.inputparam_detail[inputparam_detaili].p_consumed_qty) + "</p_consumed_qty>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_consumed_qty_uom>" + getXmlString(update_inventory_consumption_object.inputparam_detail[inputparam_detaili].p_consumed_qty_uom) + "</p_consumed_qty_uom>";  // String
        serviceDetails = serviceDetails + "<p_uom_conversion_factor>" + getXmlString(update_inventory_consumption_object.inputparam_detail[inputparam_detaili].p_uom_conversion_factor) + "</p_uom_conversion_factor>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service update_inventory_consumption
function processServiceResponseData_update_inventory_consumption(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	var returnValue;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            returnValue = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
	return returnValue;
}

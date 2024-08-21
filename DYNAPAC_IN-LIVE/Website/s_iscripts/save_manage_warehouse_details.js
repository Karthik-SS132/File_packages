/* 
 * This file contains invocation code snippets for executing the service save_manage_warehouse_details. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_warehouse_details 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_warehouse_details
function executeService_save_manage_warehouse_details(save_manage_warehouse_details_object)
{
    var targetURL = getWebserverpath() + "mservice/save_manage_warehouse_details.aspx";
    
    //Prepare save_manage_warehouse_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_warehouse_details(save_manage_warehouse_details_object));
    
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
        return processServiceResponseData_save_manage_warehouse_details(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_warehouse_details
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_warehouse_details(save_manage_warehouse_details_object)
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
    serviceDetails = serviceDetails + "<p_warehouse_id>" + getXmlString(save_manage_warehouse_details_object.p_warehouse_id) + "</p_warehouse_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_warehouse_name>" + getXmlString(save_manage_warehouse_details_object.p_warehouse_name) + "</p_warehouse_name>";  // Unicode string
    serviceDetails = serviceDetails + "<p_warehouse_loc_code>" + getXmlString(save_manage_warehouse_details_object.p_warehouse_loc_code) + "</p_warehouse_loc_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_address_line_1>" + getXmlString(save_manage_warehouse_details_object.p_address_line_1) + "</p_address_line_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_city>" + getXmlString(save_manage_warehouse_details_object.p_city) + "</p_city>";  // Unicode string
    serviceDetails = serviceDetails + "<p_state_code>" + getXmlString(save_manage_warehouse_details_object.p_state_code) + "</p_state_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_country>" + getXmlString(save_manage_warehouse_details_object.p_country) + "</p_country>";  // String
    serviceDetails = serviceDetails + "<p_pincode>" + getXmlString(save_manage_warehouse_details_object.p_pincode) + "</p_pincode>";  // Unicode string
    serviceDetails = serviceDetails + "<p_head_emp_id>" + getXmlString(save_manage_warehouse_details_object.p_head_emp_id) + "</p_head_emp_id>";  // String
    serviceDetails = serviceDetails + "<p_organogram_level_no>" + getXmlString(save_manage_warehouse_details_object.p_organogram_level_no) + "</p_organogram_level_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_organogram_level_code>" + getXmlString(save_manage_warehouse_details_object.p_organogram_level_code) + "</p_organogram_level_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(save_manage_warehouse_details_object.p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_warehouse_details_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    
    //Processing inputparam_warehouse_location_map segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_warehouse_location_mapi = 0; inputparam_warehouse_location_mapi < save_manage_warehouse_details_object.inputparam_warehouse_location_map.length; inputparam_warehouse_location_mapi++)
    {
        serviceDetails = serviceDetails + "<inputparam_warehouse_location_map>";
        serviceDetails = serviceDetails + "<p_mapped_location_code>" + getXmlString(save_manage_warehouse_details_object.inputparam_warehouse_location_map[inputparam_warehouse_location_mapi].p_mapped_location_code) + "</p_mapped_location_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_warehouse_type>" + getXmlString(save_manage_warehouse_details_object.inputparam_warehouse_location_map[inputparam_warehouse_location_mapi].p_warehouse_type) + "</p_warehouse_type>";  // Unicode string
        serviceDetails = serviceDetails + "</inputparam_warehouse_location_map>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_warehouse_details
function processServiceResponseData_save_manage_warehouse_details(xmlDoc)
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
/* 
 * This file contains invocation code snippets for executing the service save_manage_dealer_mapping_to_employee. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_dealer_mapping_to_employee 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_dealer_mapping_to_employee
function executeService_save_manage_dealer_mapping_to_employee(save_manage_dealer_mapping_to_employee_object)
{
    var targetURL = getWebserverpath() + "common_modules/save_manage_dealer_mapping_to_employee.aspx";
    
    //Prepare save_manage_dealer_mapping_to_employee service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_dealer_mapping_to_employee(save_manage_dealer_mapping_to_employee_object));
    
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
        return processServiceResponseData_save_manage_dealer_mapping_to_employee(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_dealer_mapping_to_employee
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_dealer_mapping_to_employee(save_manage_dealer_mapping_to_employee_object)
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
    serviceDetails = serviceDetails + "<p_dealer_id>" + getXmlString(save_manage_dealer_mapping_to_employee_object.p_dealer_id) + "</p_dealer_id>";  // String
    serviceDetails = serviceDetails + "<p_dealer_loc_code>" + getXmlString(save_manage_dealer_mapping_to_employee_object.p_dealer_loc_code) + "</p_dealer_loc_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_mapping_purpose_code>" + getXmlString(save_manage_dealer_mapping_to_employee_object.p_mapping_purpose_code) + "</p_mapping_purpose_code>";  // String
    serviceDetails = serviceDetails + "<p_request_category>" + getXmlString(save_manage_dealer_mapping_to_employee_object.p_request_category) + "</p_request_category>";  // String
    serviceDetails = serviceDetails + "<p_request_type>" + getXmlString(save_manage_dealer_mapping_to_employee_object.p_request_type) + "</p_request_type>";  // Unicode string
    serviceDetails = serviceDetails + "<p_equipment_category>" + getXmlString(save_manage_dealer_mapping_to_employee_object.p_equipment_category) + "</p_equipment_category>";  // Unicode string
    serviceDetails = serviceDetails + "<p_equipment_type>" + getXmlString(save_manage_dealer_mapping_to_employee_object.p_equipment_type) + "</p_equipment_type>";  // Unicode string
    serviceDetails = serviceDetails + "<p_employee_id>" + getXmlString(save_manage_dealer_mapping_to_employee_object.p_employee_id) + "</p_employee_id>";  // String
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_dealer_mapping_to_employee_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(save_manage_dealer_mapping_to_employee_object.p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_dealer_mapping_to_employee
function processServiceResponseData_save_manage_dealer_mapping_to_employee(xmlDoc)
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
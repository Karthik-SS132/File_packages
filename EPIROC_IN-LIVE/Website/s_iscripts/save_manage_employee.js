/* 
 * This file contains invocation code snippets for executing the service save_manage_employee. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_employee 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_employee
function executeService_save_manage_employee(save_manage_employee_object)
{
    var targetURL = getWebserverpath() + "common_modules/save_manage_employee.aspx";
    
    //Prepare save_manage_employee service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_employee(save_manage_employee_object));
    
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
        return processServiceResponseData_save_manage_employee(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_employee
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_employee(save_manage_employee_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_employee_id>" + getXmlString(save_manage_employee_object.p_employee_id) + "</p_employee_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_first_name>" + getXmlString(save_manage_employee_object.p_first_name) + "</p_first_name>";  // Unicode string
    serviceDetails = serviceDetails + "<p_middle_name>" + getXmlString(save_manage_employee_object.p_middle_name) + "</p_middle_name>";  // Unicode string
    serviceDetails = serviceDetails + "<p_last_name>" + getXmlString(save_manage_employee_object.p_last_name) + "</p_last_name>";  // Unicode string
    serviceDetails = serviceDetails + "<p_title>" + getXmlString(save_manage_employee_object.p_title) + "</p_title>";  // Unicode string
    serviceDetails = serviceDetails + "<p_location_code>" + getXmlString(save_manage_employee_object.p_location_code) + "</p_location_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_org_level_no>" + getXmlString(save_manage_employee_object.p_org_level_no) + "</p_org_level_no>";  // Byte: 0 to 255
    serviceDetails = serviceDetails + "<p_org_level_code>" + getXmlString(save_manage_employee_object.p_org_level_code) + "</p_org_level_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_manager_id>" + getXmlString(save_manage_employee_object.p_manager_id) + "</p_manager_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_contact_mobile_no>" + getXmlString(save_manage_employee_object.p_contact_mobile_no) + "</p_contact_mobile_no>";  // String
    serviceDetails = serviceDetails + "<p_email_id>" + getXmlString(save_manage_employee_object.p_email_id) + "</p_email_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_photo_reference>" + getXmlString(save_manage_employee_object.p_photo_reference) + "</p_photo_reference>";  // Unicode string
    serviceDetails = serviceDetails + "<p_inputparam_udf_xml>" + getXmlString(save_manage_employee_object.p_inputparam_udf_xml) + "</p_inputparam_udf_xml>";  // Unlimited unicode string
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(save_manage_employee_object.p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_employee_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_employee
function processServiceResponseData_save_manage_employee(xmlDoc)
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

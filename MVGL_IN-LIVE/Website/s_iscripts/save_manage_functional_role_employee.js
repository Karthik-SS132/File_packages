/* 
 * This file contains invocation code snippets for executing the service save_manage_functional_role_employee. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_functional_role_employee 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_functional_role_employee
function executeService_save_manage_functional_role_employee(save_manage_functional_role_employee_object)
{
    var targetURL = getWebserverpath() + "common_modules/save_manage_functional_role_employee.aspx";
    
    //Prepare save_manage_functional_role_employee service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_functional_role_employee(save_manage_functional_role_employee_object));
    
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
        return processServiceResponseData_save_manage_functional_role_employee(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_functional_role_employee
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_functional_role_employee(save_manage_functional_role_employee_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_employee_id>" + getXmlString(save_manage_functional_role_employee_object.p_employee_id) + "</p_employee_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_functional_role_id>" + getXmlString(save_manage_functional_role_employee_object.p_functional_role_id) + "</p_functional_role_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_reporting_to_functional_role_id>" + getXmlString(save_manage_functional_role_employee_object.p_reporting_to_functional_role_id) + "</p_reporting_to_functional_role_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_reporting_to_emp_id>" + getXmlString(save_manage_functional_role_employee_object.p_reporting_to_emp_id) + "</p_reporting_to_emp_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_mapped_to_functional_role_id>" + getXmlString(save_manage_functional_role_employee_object.p_mapped_to_functional_role_id) + "</p_mapped_to_functional_role_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_mapped_to_emp_id>" + getXmlString(save_manage_functional_role_employee_object.p_mapped_to_emp_id) + "</p_mapped_to_emp_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(save_manage_functional_role_employee_object.p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(save_manage_functional_role_employee_object.p_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_functional_role_employee
function processServiceResponseData_save_manage_functional_role_employee(xmlDoc)
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

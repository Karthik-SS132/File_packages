/* 
 * This file contains invocation code snippets for executing the service save_manage_call_assignment. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_call_assignment 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_call_assignment
function executeService_save_manage_call_assignment(save_manage_call_assignment_object)
{
    var targetURL = getWebserverpath() + "mservice/save_manage_call_assignment.aspx";
    
    //Prepare save_manage_call_assignment service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_call_assignment(save_manage_call_assignment_object));
    
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
        return processServiceResponseData_save_manage_call_assignment(responseXML);
    }
    return false;
}

//Code for preparing input data for the service save_manage_call_assignment
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_manage_call_assignment(save_manage_call_assignment_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_call_no>" + getXmlString(save_manage_call_assignment_object.p_call_no) + "</p_call_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_assigned_to_emp_id>" + getXmlString(save_manage_call_assignment_object.p_assigned_to_emp_id) + "</p_assigned_to_emp_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_assigned_on_date>" + getXmlString(save_manage_call_assignment_object.p_assigned_on_date) + "</p_assigned_on_date>";  // String
    serviceDetails = serviceDetails + "<p_assigned_on_hour>" + save_manage_call_assignment_object.p_assigned_on_hour + "</p_assigned_on_hour>";  // String
    serviceDetails = serviceDetails + "<p_assigned_on_minute>" + save_manage_call_assignment_object.p_assigned_on_minute + "</p_assigned_on_minute>";  // String
    serviceDetails = serviceDetails + "<p_sch_start_date>" + getXmlString(save_manage_call_assignment_object.p_sch_start_date) + "</p_sch_start_date>";  // String
    serviceDetails = serviceDetails + "<p_sch_start_hour>" + save_manage_call_assignment_object.p_sch_start_hour + "</p_sch_start_hour>";  // String
    serviceDetails = serviceDetails + "<p_sch_start_minute>" + save_manage_call_assignment_object.p_sch_start_minute + "</p_sch_start_minute>";  // String
    serviceDetails = serviceDetails + "<p_sch_finish_date>" + getXmlString(save_manage_call_assignment_object.p_sch_finish_date) + "</p_sch_finish_date>";  // String
    serviceDetails = serviceDetails + "<p_sch_finish_hour>" + save_manage_call_assignment_object.p_sch_finish_hour + "</p_sch_finish_hour>";  // String
    serviceDetails = serviceDetails + "<p_sch_finish_minute>" + save_manage_call_assignment_object.p_sch_finish_minute + "</p_sch_finish_minute>";  // String
    serviceDetails = serviceDetails + "<p_plan_duration>" + getXmlString(save_manage_call_assignment_object.p_plan_duration) + "</p_plan_duration>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 2
    serviceDetails = serviceDetails + "<p_plan_duration_uom>" + getXmlString(save_manage_call_assignment_object.p_plan_duration_uom) + "</p_plan_duration_uom>";  // String
    serviceDetails = serviceDetails + "<p_plan_work>" + getXmlString(save_manage_call_assignment_object.p_plan_work) + "</p_plan_work>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 2
    serviceDetails = serviceDetails + "<p_plan_work_uom>" + getXmlString(save_manage_call_assignment_object.p_plan_work_uom) + "</p_plan_work_uom>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_manage_call_assignment
function processServiceResponseData_save_manage_call_assignment(xmlDoc)
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

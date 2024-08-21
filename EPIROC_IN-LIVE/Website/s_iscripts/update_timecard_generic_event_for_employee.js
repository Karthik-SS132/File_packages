/* 
 * This file contains invocation code snippets for executing the service update_timecard_generic_event_for_employee. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service update_timecard_generic_event_for_employee 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service update_timecard_generic_event_for_employee
function executeService_update_timecard_generic_event_for_employee()
{
    var targetURL = getWebserverpath() + "mservice/update_timecard_generic_event_for_employee.aspx";
  
    //Prepare update_timecard_generic_event_for_employee service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_update_timecard_generic_event_for_employee());
    
    if (responseXML.documentElement.childNodes[0].nodeName == "ApplicationException")
    {
        //Output contains error
        var errorNumber = "", errorDescription = "";
        errorNumber = responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue;
        errorDescription = responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue;
        if (errorNumber != "")
            errorNumber += ": ";
        alert(errorNumber + errorDescription);
        return false;
    }
    else
    {
        return processServiceResponseData_update_timecard_generic_event_for_employee(responseXML);
    }
    return false;
}

//Code for preparing input data for the service update_timecard_generic_event_for_employee
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_update_timecard_generic_event_for_employee()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_employee_id>" + employee_id + "</p_employee_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_event>" + generic_schedule_event + "</p_event>";  // String
    serviceDetails = serviceDetails + "<p_alloc_to_type_code>" + no_schedule_code + "</p_alloc_to_type_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_date>" + currentnsDate + "</p_date>";  // String
    serviceDetails = serviceDetails + "<p_hour>" + currentnsHr + "</p_hour>";  // String
    serviceDetails = serviceDetails + "<p_minute>" + currentnsMin + "</p_minute>";  // String
    serviceDetails = serviceDetails + "<p_comments>" + generic_schedule_comment + "</p_comments>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Code for processing output data from the service update_timecard_generic_event_for_employee
function processServiceResponseData_update_timecard_generic_event_for_employee(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            generic_timecard_status = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
			if(generic_timecard_status == 'SP001')
			{
				//alert('Timecard Updated Successfully.');
				$.mobile.loadingMessage = 'Timecard Updated Successfully.';
				$.mobile.showPageLoadingMsg();
			}
			else
			{
				alert('Timecard Updation failed.');
			}
        }
    }
}

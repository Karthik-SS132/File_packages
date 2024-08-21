/* 
 * This file contains invocation code snippets for executing the service retrieve_timecard_generic_event_for_employee. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_timecard_generic_event_for_employee 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_timecard_generic_event_for_employee
function executeService_retrieve_timecard_generic_event_for_employee()
{
    var targetURL = getWebserverpath() + "mservice/retrieve_timecard_generic_event_for_employee.aspx";
    
    //Prepare retrieve_timecard_generic_event_for_employee service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_timecard_generic_event_for_employee());
    
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
        processServiceResponseData_retrieve_timecard_generic_event_for_employee(responseXML);
        return true;
    }
    return false;
}

//Code for preparing input data for the service retrieve_timecard_generic_event_for_employee
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_timecard_generic_event_for_employee()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_employee_id>" + employee_id + "</p_employee_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_date>" + getCurrentDate().split(' ')[0] + "</p_date>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_timecard_generic_event_for_employee
function processServiceResponseData_retrieve_timecard_generic_event_for_employee(xmlDoc)
{
	generic_timecard_retrieve_status = "";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_alloc_to_type_code
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_start_event_date
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[2].lastChild.nodeValue; // p_start_event_hour
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[3].lastChild.nodeValue; // p_start_event_minute
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[4].lastChild.nodeValue; // p_retrieve_status
			if(responseXMLNode[toplevelChildi].childNodes[5].hasChildNodes() == true)
			{
				generic_timecard_retrieve_status  += responseXMLNode[toplevelChildi].childNodes[5].lastChild.nodeValue;
			}
			else
			{
				timecard_alloc_type_code = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
				timecard_start_event_date = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue;
				timecard_start_event_hour = responseXMLNode[toplevelChildi].childNodes[2].lastChild.nodeValue;
				timecard_start_event_minute = responseXMLNode[toplevelChildi].childNodes[3].lastChild.nodeValue;
				if(responseXMLNode[toplevelChildi].childNodes[4].hasChildNodes() == true)
				{
					timecard_comments = responseXMLNode[toplevelChildi].childNodes[4].lastChild.nodeValue;
				}
				else
				{
					timecard_comments = '';
				}
			}
        }
    }
}

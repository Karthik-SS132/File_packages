/* 
 * This file contains invocation code snippets for executing the service retrieve_timecard_entry_list. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_timecard_entry_list 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_timecard_entry_list
function executeService_retrieve_timecard_entry_list()
{
    var targetURL = getWebserverpath() + "common_modules/retrieve_timecard_entry_list.aspx";
    
    //Prepare retrieve_timecard_entry_list service request and invoke service 
   // var responseXML = executeServiceAndtransformResponse(targetURL, prepareServiceRequestData_retrieve_timecard_entry_list());
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_timecard_entry_list());
    
    if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
    {
        //Response xml contains error
        //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue
        //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue
        //alert(responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
        return '1';
    }
    else
    {
        return processServiceResponseData_retrieve_timecard_entry_list(responseXML);
    }
    return '1';
}

//Code for preparing input data for the service retrieve_timecard_entry_list
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_timecard_entry_list()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_location_code_filter>ALL</p_location_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_shift_id_filter>ALL</p_shift_id_filter>";  // String
    serviceDetails = serviceDetails + "<p_emp_id_filter>" + timecard_employee_id + "</p_emp_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_project_scall_ind_filter>" + project_scall_ind_filter + "</p_project_scall_ind_filter>";  // String
    serviceDetails = serviceDetails + "<p_project_id_filter>" + job_profile.job_id + "</p_project_id_filter>";  // String
    serviceDetails = serviceDetails + "<p_task_id_filter>" + jobtask_profile.task_id + "</p_task_id_filter>";  // String
    serviceDetails = serviceDetails + "<p_service_call_ref_no_filter>"+service_call_ref_no_filter+"</p_service_call_ref_no_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_from_date_filter>"+p_from_date_filter+"</p_from_date_filter>";  // String
    serviceDetails = serviceDetails + "<p_to_date_filter>"+p_to_date_filter+"</p_to_date_filter>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_timecard_entry_list
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table no need to have as many rows as retrieved in the list segment; rows will be added dynamically 
     to the existing table
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_retrieve_timecard_entry_list(xmlDoc)
{
	var timecard = new Object();
	var retrieve_status = "";
	var timecard_details ="<?xml version=\"1.0\" encoding=\"utf-8\" ?><list>";
	//var timecard_details =[];
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_retrieve_status
			if(responseXMLNode[toplevelChildi].childNodes[0].hasChildNodes() == true)
			{
				retrieve_status += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue;
			}
			else
			{
				retrieve_status += '';
			}
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //Delete existing table rows
           /* if (first_outputparam_detail_item) {
                deleteTableRows(document.getElementById('USER CONTROL'));
                first_outputparam_detail_item = false;
            }
            createTableRows(1, document.getElementById('USER CONTROL').rows[0].cells.length, document.getElementById('USER CONTROL'));
            
            document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_timecard_entry_list_xml
            outputparam_detailcount++;*/
			//timecard_details.push({txt: responseXMLNode[toplevelChildi].childNodes[0].childNodes[0]});
			timecard_details += '<timecard_entry>'+responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue+'</timecard_entry>';
        }
    }
	timecard_details += "</list>";
	timecard = {header:retrieve_status,detail:timecard_details};
	return timecard;
}

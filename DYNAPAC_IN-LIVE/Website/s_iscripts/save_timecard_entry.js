/* 
 * This file contains invocation code snippets for executing the service save_timecard_entry. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_timecard_entry 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_timecard_entry
function executeService_save_timecard_entry()
{
    var targetURL = getWebserverpath() + "common_modules/save_timecard_entry.aspx";
    
    //Prepare save_timecard_entry service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_timecard_entry());
    
    if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
    {
        //Response xml contains error
        //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue
        //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue
        alert(responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
        return false;
    }
    else
    {
        return processServiceResponseData_save_timecard_entry(responseXML);
    }
  //  return false;
}

//Code for preparing input data for the service save_timecard_entry
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_save_timecard_entry()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_project_scall_ind>" + project_scall_ind_filter + "</p_project_scall_ind>";  // String
    serviceDetails = serviceDetails + "<p_project_id>" + job_profile.job_id + "</p_project_id>";  // String
    serviceDetails = serviceDetails + "<p_template_id>" + job_profile.template_id + "</p_template_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_task_id>" + jobtask_profile.task_id + "</p_task_id>";  // Int32: -2147483648 to 2147483647
    serviceDetails = serviceDetails + "<p_scall_ref_no>"+scall_ref_no+"</p_scall_ref_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_employee_id>" + timecard_employee_id + "</p_employee_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_entry_date>" + p_entry_date + "</p_entry_date>";  // String
    serviceDetails = serviceDetails + "<p_from_hour>" + FromHr + "</p_from_hour>";  // String
    serviceDetails = serviceDetails + "<p_from_minute>" + FromMin + "</p_from_minute>";  // String
    serviceDetails = serviceDetails + "<p_to_hour>" + ToHr + "</p_to_hour>";  // String
    serviceDetails = serviceDetails + "<p_to_minute>" + ToMin + "</p_to_minute>";  // String
    serviceDetails = serviceDetails + "<p_alloc_type_code>" + alloc_type_code + "</p_alloc_type_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_header_rec_timestamp>"+ header_rec_timestamp +"</p_header_rec_timestamp>";  // UniqueIdentifier string
	serviceDetails = serviceDetails + "<p_save_mode>" + save_mode + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service save_timecard_entry
function processServiceResponseData_save_timecard_entry(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue == 'SP001')
			{
				if(save_mode == 'A')
				{
					alert('Time Card saved successfully.');
				}
				else
				{
					alert('Time Card deleted successfully.');
				}
			}
			else
			{
				if(save_mode == 'A')
				{
					alert('Saving Time Card Failed.');
				}
				else
				{
					alert('Deletion of Time Card Failed.');
				}
			}
			return responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue ;
        }
		
    }
}

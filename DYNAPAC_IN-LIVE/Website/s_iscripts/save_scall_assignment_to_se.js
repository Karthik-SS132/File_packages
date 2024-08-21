//Function to call save_scall_assignment_to_se service
function executeService_save_scall_assignment_to_se()
{
    var targetURL = getWebserverpath() + "/mservice/save_scall_assignment_to_se.aspx";
    
    //Prepare save_scall_assignment_to_se service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_scall_assignment_to_se());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
            return '1';
        }
        else
        {
            return processServiceResponseData_save_scall_assignment_to_seForIEBrowser(responseXML);
        }
    }
    else if (window.XMLHttpRequest)  //Code for other browsers like FIREFOX/OPERA
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].textContent 
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].textContent 
            alert(responseXML.documentElement.childNodes[0].childNodes[1].textContent);
            return '1';
        }
        else
        {
            return processServiceResponseData_save_scall_assignment_to_seForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare save_scall_assignment_to_se service request
function prepareServiceRequestData_save_scall_assignment_to_se()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_servicecall_no>" + scall_no_val.toString() + "</p_servicecall_no>";  // Unicode string
    serviceDetails = serviceDetails + "<p_se_emp_id>" + getXmlString(assign_se_val) + "</p_se_emp_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_assigned_on_date>" + getCurrentDate().slice(0,10) + "</p_assigned_on_date>";  // String
    serviceDetails = serviceDetails + "<p_assigned_on_hour>" + timeHrs.toString() + "</p_assigned_on_hour>";  // String
    serviceDetails = serviceDetails + "<p_assigned_on_minute>" + timeMin.toString() + "</p_assigned_on_minute>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process save_scall_assignment_to_se service response ForIEBrowser

function processServiceResponseData_save_scall_assignment_to_seForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].text == 'SP001')
			{
				alert('Service Engineer Assigned Successfully');
			}
			else
			{
				alert('Assignment of Service Engineer failed');
			}
        }
    }
}

//Function to process save_scall_assignment_to_se service response ForNonIEBrowser

function processServiceResponseData_save_scall_assignment_to_seForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_update_status
		   if(responseXMLNode[toplevelChildi].childNodes[0].textContent == 'SP001')
			{
				alert('Service Engineer Assigned Successfully');
			}
			else
			{
				alert('Assignment of Service Engineer failed');
			}
        }
    }
}

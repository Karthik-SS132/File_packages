//Function to call retrieve_servicecall_list_assigned service
function executeService_retrieve_servicecall_list_assigned()
{
	var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    var targetURL = getWebserverpath() + "/mservice/retrieve_servicecall_list_assigned.aspx";
    
    //Prepare retrieve_servicecall_list_assigned service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_servicecall_list_assigned());
    
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
            return processServiceResponseData_retrieve_servicecall_list_assignedForIEBrowser(responseXML);
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
            return processServiceResponseData_retrieve_servicecall_list_assignedForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_servicecall_list_assigned service request
function prepareServiceRequestData_retrieve_servicecall_list_assigned()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_servicecall_list_assigned service response ForIEBrowser
function processServiceResponseData_retrieve_servicecall_list_assignedForIEBrowser(xmlDoc)
{
	var service_call_value = new Object();
	var service_call_details ="<?xml version=\"1.0\" encoding=\"utf-8\" ?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    //var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_retrieve_status
			retrieve_status = responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
           // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_servicecall_xml
            //outputparam_detailcount++;
			service_call_details += responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	service_call_details += "</list>";
	service_call_value = {header:retrieve_status,detail:service_call_details};
	return service_call_value;
}

//Function to process retrieve_servicecall_list_assigned service response ForNonIEBrowser
function processServiceResponseData_retrieve_servicecall_list_assignedForNonIEBrowser(xmlDoc)
{
	var service_call_value = new Object();
	var service_call_details ="<?xml version=\"1.0\" encoding=\"utf-8\" ?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    //var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
          //  document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_retrieve_status
		  retrieve_status = responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
          //  document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_servicecall_xml
          //  outputparam_detailcount++;
		  service_call_details += responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	service_call_details += "</list>";
	service_call_value = {header:retrieve_status,detail:service_call_details};
	return service_call_value;
}

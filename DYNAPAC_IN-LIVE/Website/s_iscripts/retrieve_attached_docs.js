//Function to call retrieve_attached_docs service
function executeService_retrieve_attached_docs()
{
	var retVal = isValidSession();
	 
	if ( retVal == 1)
	{
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	}
    var targetURL =  getWebserverpath() + "common_modules/retrieve_attached_docs.aspx";
    
    //Prepare retrieve_attached_docs service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_attached_docs());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
            return "1";
        }
        else
        {
            return processServiceResponseData_retrieve_attached_docsForIEBrowser(responseXML);
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
            return "1";
        }
        else
        {
            return processServiceResponseData_retrieve_attached_docsForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_attached_docs service request
function prepareServiceRequestData_retrieve_attached_docs()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_project_task_level_ind>" + project_task_level_ind + "</p_project_task_level_ind>";  // String
	if(login_profile.project_type == 'J')
	{
		serviceDetails = serviceDetails + "<p_project_id>" + job_profile.job_id + "</p_project_id>";  // String
		//serviceDetails = serviceDetails + "<p_template_id>" + job_template_id + "</p_template_id>";  // Unicode string
		serviceDetails = serviceDetails + "<p_template_id></p_template_id>";  // Unicode string
		serviceDetails = serviceDetails + "<p_task_id>" + jobtask_profile.task_id + "</p_task_id>";  // Int32: -2147483648 to 2147483647
	}
	else if(login_profile.project_type == 'P')
	{
		serviceDetails = serviceDetails + "<p_project_id>" + project_profile.project_id + "</p_project_id>";  // String
		serviceDetails = serviceDetails + "<p_template_id>" + project_profile.template_id + "</p_template_id>";  // Unicode string
		serviceDetails = serviceDetails + "<p_task_id>" + task_profile.task_id + "</p_task_id>";  // Int32: -2147483648 to 2147483647
	}
	else
	{
		serviceDetails = serviceDetails + "<p_project_id>" + p_project_id + "</p_project_id>";  // String
		serviceDetails = serviceDetails + "<p_template_id>"+p_template_id+"</p_template_id>";  // Unicode string
		serviceDetails = serviceDetails + "<p_task_id>" + p_task_id + "</p_task_id>";  // Int32: -2147483648 to 2147483647
	}
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_attached_docs service response ForIEBrowser
function processServiceResponseData_retrieve_attached_docsForIEBrowser(xmlDoc)
{
	var a_docs=new Object();
	var retrieve_status = '';
	var a_docs_details ="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_retrieve_status
			retrieve_status += responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_attached_doc_xml
			a_docs_details += responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	a_docs_details += "</list>";
	a_docs = {header:retrieve_status,detail:a_docs_details};
	return a_docs;
}

//Function to process retrieve_attached_docs service response ForNonIEBrowser
function processServiceResponseData_retrieve_attached_docsForNonIEBrowser(xmlDoc)
{
	var a_docs=new Object();
	var retrieve_status = '';
	var a_docs_details ="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_retrieve_status
			retrieve_status += responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_attached_doc_xml
			 a_docs_details += responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	a_docs_details += "</list>";
	a_docs = {header:retrieve_status,detail:a_docs_details};
	return a_docs;
}

//Function to call retrieve_attached_lists service
function executeService_retrieve_attached_lists() {
	var retVal = isValidSession();

	if (retVal == 1) {
		alert('Invalid Session: You have not logged into the system');
		return '1';
	}
	//Replace ~webserverpath~ with appropriate physical server address
	var targetURL = getWebserverpath() + "common_modules/retrieve_attached_lists.aspx";

	//Prepare retrieve_attached_lists service request and invoke service
	var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_attached_lists());

	if (window.ActiveXObject) {
		if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass") {
			//Response xml contains error
			//ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
			//Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
			alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
			return "1";
		} else {
			return processServiceResponseData_retrieve_attached_listsForIEBrowser(responseXML);
		}
	} else if (window.XMLHttpRequest) //Code for other browsers like FIREFOX/OPERA
	{
		if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass") {
			//Response xml contains error
			//ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].textContent
			//Error no:  responseXML.documentElement.childNodes[0].childNodes[0].textContent
			alert(responseXML.documentElement.childNodes[0].childNodes[1].textContent);
			return "1";
		} else {
			return processServiceResponseData_retrieve_attached_listsForNonIEBrowser(responseXML);
		}
	}
}

//Function to prepare retrieve_attached_lists service request
function prepareServiceRequestData_retrieve_attached_lists() {
	var serviceDetails;
	serviceDetails = "<document>";

	//Processing context segment
	serviceDetails = serviceDetails + getContextElements();

	//Processing inputparam segment
	serviceDetails = serviceDetails + "<inputparam>"
		serviceDetails = serviceDetails + "<p_project_task_level_ind>" + project_task_level_ind + "</p_project_task_level_ind>"; // String
	if (login_profile.project_type == "P") {
		serviceDetails = serviceDetails + "<p_project_id>" + getXmlString(project_profile.project_id) + "</p_project_id>"; // String
	} else {
		serviceDetails = serviceDetails + "<p_project_id>" + getXmlString(job_profile.job_id) + "</p_project_id>"; // String
	}
	if (login_profile.project_type == "P") {
		serviceDetails = serviceDetails + "<p_template_id>" + getXmlString(project_profile.template_id) + "</p_template_id>"; // Unicode string
	} else {
		serviceDetails = serviceDetails + "<p_template_id>" + getXmlString(job_profile.template_id) + "</p_template_id>"; // Unicode string
	}
	if (login_profile.project_type == "P") {
		serviceDetails = serviceDetails + "<p_task_id>" + getXmlString(task_profile.task_id) + "</p_task_id>"; // Int32: -2147483648 to 2147483647
	} else {
		serviceDetails = serviceDetails + "<p_task_id>" + jobtask_profile.task_id.toString() + "</p_task_id>"; // Int32: -2147483648 to 2147483647
	}
	serviceDetails = serviceDetails + "</inputparam>"
		serviceDetails = serviceDetails + "</context>";
	serviceDetails = serviceDetails + "</document>";
	return serviceDetails;
}

//Function to process retrieve_attached_lists service response ForIEBrowser
function processServiceResponseData_retrieve_attached_listsForIEBrowser(xmlDoc) {
	a_list = "";
	a_list += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
	var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++) {
		if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header") {}
	}
	for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++) {
		if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail") {
			a_list += '<a_list>' + responseXMLNode[toplevelChildi].childNodes[0].text + '</a_list>';
		}
	}
	a_list += "</list>";
}

//Function to process retrieve_attached_lists service response ForNonIEBrowser
function processServiceResponseData_retrieve_attached_listsForNonIEBrowser(xmlDoc) {
	a_list = "";
	a_list += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
	var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++) {
		if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header") {}
	}
	for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++) {
		if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail") {
			a_list += '<a_list>' + responseXMLNode[toplevelChildi].childNodes[0].textContent + '</a_list>';
		}
	}
	a_list += "</list>";
}
//Function to call retrieve_project_resource_list_detail service
function executeService_retrieve_project_resource_list_detail()
{
      var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() +"common_modules/retrieve_project_resource_list_detail.aspx";
    
    //Prepare retrieve_project_resource_list_detail service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_project_resource_list_detail());
    
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
          return  processServiceResponseData_retrieve_project_resource_list_detailForIEBrowser(responseXML);
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
          return  processServiceResponseData_retrieve_project_resource_list_detailForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_project_resource_list_detail service request
function prepareServiceRequestData_retrieve_project_resource_list_detail()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails +  "<inputparam>"
	if(login_profile.project_type=="P"){
		serviceDetails = serviceDetails + "<p_project_id>" + getXmlString(project_profile.project_id) + "</p_project_id>";  // String
	}
	else if(login_profile.project_type=="J"){
		serviceDetails = serviceDetails + "<p_project_id>" + getXmlString(job_profile.job_id) + "</p_project_id>";  // String
	}
	if(login_profile.project_type=="P"){
		serviceDetails = serviceDetails + "<p_template_id>" + getXmlString(project_profile.template_id) + "</p_template_id>";  // Unicode string
	}
	else if(login_profile.project_type=="J"){
		serviceDetails = serviceDetails + "<p_template_id>" + getXmlString(job_profile.template_id) + "</p_template_id>";  // Unicode string
	}
    serviceDetails = serviceDetails + "<p_project_task_level_ind>" + project_task_level_ind + "</p_project_task_level_ind>";  // String
	if(login_profile.project_type=="P"){
		serviceDetails = serviceDetails + "<p_task_id>" + getXmlString(task_profile.task_id) + "</p_task_id>";  // Int32: -2147483648 to 2147483647
	}
	else if(login_profile.project_type=="J"){
		serviceDetails = serviceDetails + "<p_task_id>" + getXmlString(jobtask_profile.task_id) + "</p_task_id>";  // Int32: -2147483648 to 2147483647
	}
    serviceDetails = serviceDetails + "<p_resourcelist_id>" + getXmlString(r_list_id) + "</p_resourcelist_id>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process retrieve_project_resource_list_detail service response ForIEBrowser
function processServiceResponseData_retrieve_project_resource_list_detailForIEBrowser(xmlDoc)
{
rlist="";
rlist+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outparam")
        {
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_resourcelist_detl_xml
        rlist+=responseXMLNode[toplevelChildi].childNodes[0].text;
		}
    }
	rlist+="</list>";
}

//Function to process retrieve_project_resource_list_detail service response ForNonIEBrowser
function processServiceResponseData_retrieve_project_resource_list_detailForNonIEBrowser(xmlDoc)
{
rlist="";
rlist+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outparam")
        {
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_resourcelist_detl_xml
        rlist+=responseXMLNode[toplevelChildi].childNodes[0].textContent;
		}
    }
	rlist+="</list>";
}

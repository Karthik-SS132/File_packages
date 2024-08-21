//Function to call save_project_list_attachments_master service
function executeService_save_project_list_attachments_master()
{
    var targetURL = getWebserverpath() + "/common_modules/save_project_list_attachments_master.aspx";
    
    //Prepare save_project_list_attachments_master service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_project_list_attachments_master());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
            return false;
        }
        else
        {
            processServiceResponseData_save_project_list_attachments_masterForIEBrowser(responseXML);
            return true;
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
            return false;
        }
        else
        {
            processServiceResponseData_save_project_list_attachments_masterForNonIEBrowser(responseXML);
            return true;
        }
    }
    return false;
}

//Function to prepare save_project_list_attachments_master service request
function prepareServiceRequestData_save_project_list_attachments_master()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
   if (project_level_task_ind == "PR" || project_level_task_ind == "PT")
	{
    serviceDetails = serviceDetails + "<p_project_id>" + getXmlString(slctmp_uid) + "</p_project_id>";  // String
	}
	else if (project_level_task_ind == "MP" || project_level_task_ind == "MT")
	{
	serviceDetails = serviceDetails + "<p_project_id>" + getXmlString(main_rowmodel['template_id']) + "</p_project_id>";  // String
	}
	if (project_level_task_ind == "PR" || project_level_task_ind == "MP")
	{
    serviceDetails = serviceDetails + "<p_task_id>" + getXmlString("0") + "</p_task_id>";  // Int32: -2147483648 to 2147483647
	}
	else 
	{
	if (project_level_task_ind == "PT")
	{
	serviceDetails = serviceDetails + "<p_task_id>" + getXmlString("0") + "</p_task_id>";  // Int32: -2147483648 to 2147483647
	}
	else if (project_level_task_ind == "MT")
	{
	serviceDetails = serviceDetails + "<p_task_id>" + getXmlString(mtndetail_rowmodel['task_id']) + "</p_task_id>";  // Int32: -2147483648 to 2147483647
	}
	}
    //serviceDetails = serviceDetails + "<p_task_id>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_task_id>";  // Int32: -2147483648 to 2147483647
    serviceDetails = serviceDetails + "<p_attach_level_ind>" + getXmlString(project_level_task_ind) + "</p_attach_level_ind>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    
    //Processing inputparam_lists segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_listsi = 0; inputparam_listsi < al_detS.length ; inputparam_listsi++)
    {
		  serviceDetails = serviceDetails + "<inputparam_lists>";
        serviceDetails = serviceDetails + "<p_list_type>" + getXmlString(al_detS[inputparam_listsi].a_list_type) + "</p_list_type>";  // String
        serviceDetails = serviceDetails + "<p_list_id>" + getXmlString(al_detS[inputparam_listsi].a_list_id) + "</p_list_id>";  // Unicode string
        serviceDetails = serviceDetails + "<p_attach_event_ind>" + getXmlString(al_detS[inputparam_listsi].a_list_event) + "</p_attach_event_ind>";  // String
		serviceDetails = serviceDetails + "<p_list_add_upd_ind>" + getXmlString(al_detS[inputparam_listsi].list_add_upd_ind) + "</p_list_add_upd_ind>";  // String
		serviceDetails = serviceDetails + "</inputparam_lists>";
   
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process save_project_list_attachments_master service response ForIEBrowser

function processServiceResponseData_save_project_list_attachments_masterForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
          //  document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_update_status
		  if(responseXMLNode[toplevelChildi].childNodes[0].text == 'SP001')
			{
			alert("Attachments Saved Successfully");
			}

        }
    }
}

//Function to process save_project_list_attachments_master service response ForNonIEBrowser

function processServiceResponseData_save_project_list_attachments_masterForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
          //  document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_update_status
        
			if(responseXMLNode[toplevelChildi].childNodes[0].textContent == 'SP001')
			{
			alert("Attachments Saved Successfully");
			}
			
		}
    }
}

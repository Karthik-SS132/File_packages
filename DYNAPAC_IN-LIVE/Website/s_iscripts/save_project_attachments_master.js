//Function to call save_project_attachments_master service
function executeService_save_project_attachments_master()
{
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() +"common_modules/save_project_attachments_master.aspx";
    
    //Prepare save_project_attachments_master service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_project_attachments_master());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
        }
        else
        {
            processServiceResponseData_save_project_attachments_masterForIEBrowser(responseXML);
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
        }
        else
        {
            processServiceResponseData_save_project_attachments_masterForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare save_project_attachments_master service request
function prepareServiceRequestData_save_project_attachments_master()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>"
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
    serviceDetails = serviceDetails + "</inputparam_header>"
    
    //Processing inputparam_filelist segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_filelisti = 0; inputparam_filelisti <= af_detS.length - 1; inputparam_filelisti++)
    {
        serviceDetails = serviceDetails + "<inputparam_filelist>";
        serviceDetails = serviceDetails + "<p_file_category>" + getXmlString(af_detS[inputparam_filelisti].a_file_category) + "</p_file_category>";  // String
        serviceDetails = serviceDetails + "<p_file_type>" + getXmlString(af_detS[inputparam_filelisti].a_file_type) + "</p_file_type>";  // String
        serviceDetails = serviceDetails + "<p_file_id>" + getXmlString(af_detS[inputparam_filelisti].a_file_id) + "</p_file_id>";  // Unicode string
        serviceDetails = serviceDetails + "<p_file_name>" + getXmlString(af_detS[inputparam_filelisti].a_file_name) + "</p_file_name>";  // Unicode string
        serviceDetails = serviceDetails + "</inputparam_filelist>";
    }
    
    //Processing inputparam_lists segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_listsi = 0; inputparam_listsi <= al_detS.length - 1; inputparam_listsi++)
    {
        serviceDetails = serviceDetails + "<inputparam_lists>";
        serviceDetails = serviceDetails + "<p_list_type>" + getXmlString(al_detS[inputparam_listsi].a_list_type) + "</p_list_type>";  // String
        serviceDetails = serviceDetails + "<p_list_id>" + getXmlString(al_detS[inputparam_listsi].a_list_id) + "</p_list_id>";  // Unicode string
        serviceDetails = serviceDetails + "<p_attach_event_ind>" + getXmlString(al_detS[inputparam_listsi].a_list_event) + "</p_attach_event_ind>";  // String
		/*if (list_add_upd_ind == 'A')
		{*/
        serviceDetails = serviceDetails + "<p_list_add_upd_ind>" + getXmlString(al_detS[inputparam_listsi].list_add_upd_ind) + "</p_list_add_upd_ind>";  // String
		/*}
		else
		{
		serviceDetails = serviceDetails + "<p_list_add_upd_ind>" + getXmlString('E') + "</p_list_add_upd_ind>";  // String
		}*/
        serviceDetails = serviceDetails + "</inputparam_lists>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process save_project_attachments_master service response ForIEBrowser
function processServiceResponseData_save_project_attachments_masterForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].text == 1)
			{
			alert("Attachments Saved Successfully");
			}
			else if(responseXMLNode[toplevelChildi].childNodes[0].text  == 0)
			{
			alert("Attachments Saving Failed");
			}
			
        }
    }
}

//Function to process save_project_attachments_master service response ForNonIEBrowser
function processServiceResponseData_save_project_attachments_masterForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].textContent == 1)
			{
			alert("Attachments Saved Successfully");
			}
			else if(responseXMLNode[toplevelChildi].childNodes[0].textContent == 0)
			{
			alert("Attachments Saving Failed");
			}
			
        }
    }
}

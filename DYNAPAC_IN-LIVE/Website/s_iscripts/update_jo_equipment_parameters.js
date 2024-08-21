//Function to call update_jo_equipment_parameters service
function executeService_update_jo_equipment_parameters()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() + "mservice/update_jo_equipment_parameters.aspx";
    
    //Prepare update_jo_equipment_parameters service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_update_jo_equipment_parameters());
    
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
            return processServiceResponseData_update_jo_equipment_parametersForIEBrowser(responseXML);
        }
    }
    else if (window.XMLHttpRequest)  //Code for other browsers like FIREFOX/OPERA
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].textContent 
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].textContent 
			alert(responseXML.documentElement.childNodes[0].childNodes[1].textContent );
			return "1";
        }
        else
        {
            return processServiceResponseData_update_jo_equipment_parametersForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare update_jo_equipment_parameters service request
function prepareServiceRequestData_update_jo_equipment_parameters()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>"
    serviceDetails = serviceDetails + "<p_project_id>" + getXmlString(job_profile.job_id) + "</p_project_id>";  // String
    serviceDetails = serviceDetails + "<p_template_id>" + getXmlString(template_id) + "</p_template_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_project_task_level_ind>" + getXmlString(projectind) + "</p_project_task_level_ind>";  // String
    serviceDetails = serviceDetails + "<p_task_id>" + getXmlString(jobtask_profile.task_id) + "</p_task_id>";  // Int32: -2147483648 to 2147483647
    serviceDetails = serviceDetails + "<p_asset_id>" + getXmlString(asset_id) + "</p_asset_id>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam_header>"
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
   // {
       // serviceDetails = serviceDetails + "<inputparam_detail>";
       // serviceDetails = serviceDetails + "<p_param_code>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_param_code>";  // Unicode string
       // serviceDetails = serviceDetails + "<p_param_value>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_param_value>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
       // serviceDetails = serviceDetails + "<p_equipment_param_record_timestamp>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_equipment_param_record_timestamp>";  // String
        //serviceDetails = serviceDetails + "</inputparam_detail>";
   // }
   
	for(i=0;i<eq_list;i++)
	{
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_param_code>" + getXmlString(eqarray[i][0])+ "</p_param_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_param_value>" +getXmlString(eqarray[i][1] )+ "</p_param_value>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_equipment_param_record_timestamp>" +getXmlString(eqarray[i][2])+ "</p_equipment_param_record_timestamp>";  // String
		serviceDetails = serviceDetails + "</inputparam_detail>";
	}
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process update_jo_equipment_parameters service response ForIEBrowser
function processServiceResponseData_update_jo_equipment_parametersForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
}

//Function to process update_jo_equipment_parameters service response ForNonIEBrowser
function processServiceResponseData_update_jo_equipment_parametersForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
}

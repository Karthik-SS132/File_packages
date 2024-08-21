//Function to call save_manage_equipment_parameters service
function executeService_save_manage_equipment_parameters()
{
    var targetURL = getWebserverpath() + "mservice/save_manage_equipment_parameters.aspx";
    
    //Prepare save_manage_equipment_parameters service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_equipment_parameters());
    
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
            processServiceResponseData_save_manage_equipment_parametersForIEBrowser(responseXML);
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
            processServiceResponseData_save_manage_equipment_parametersForNonIEBrowser(responseXML);
            return true;
        }
    }
    return false;
}

//Function to prepare save_manage_equipment_parameters service request
function prepareServiceRequestData_save_manage_equipment_parameters()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
	
    serviceDetails = serviceDetails + "<p_equipment_id>" + getXmlString(manage_equipment_master_grid_1.dataSource.getByUid(selected_equipment_uid).equipment_id) + "</p_equipment_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_param_code>" + getXmlString(param_code.toString()) + "</p_param_code>";  // Unicode string
	
    serviceDetails = serviceDetails + "<p_param_description>" + getXmlString(param_description) + "</p_param_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_uom_code>" + getXmlString(param_uom_code) + "</p_uom_code>";  // String
    serviceDetails = serviceDetails + "<p_incr_or_lclucl_ind>" + getXmlString(incr_or_lclucl_ind) + "</p_incr_or_lclucl_ind>";  // String
	if(lcl_value != "")
	{
	
    serviceDetails = serviceDetails + "<p_lcl_value>" + (lcl_value.toString()) + "</p_lcl_value>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
	}
	else
	{
	lcl_value=0;
	serviceDetails = serviceDetails + "<p_lcl_value>" + (lcl_value) + "</p_lcl_value>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
	}
	if(ucl_value != "")
	{
	
	serviceDetails = serviceDetails + "<p_ucl_value>" + (ucl_value.toString()) + "</p_ucl_value>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
    }
	else
	{
	ucl_value=0;
	serviceDetails = serviceDetails + "<p_ucl_value>" + (ucl_value) + "</p_ucl_value>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
    }
	if(increment_value!= "")
	{
	
	serviceDetails = serviceDetails + "<p_increment_value>" + (increment_value.toString()) + "</p_increment_value>";  // Decimal: Total no of digits - 6; No of digits after decimal point - 0
    }
	else
	{
	increment_value=0;
	serviceDetails = serviceDetails + "<p_increment_value>" + (increment_value) + "</p_increment_value>";  // Decimal: Total no of digits - 6; No of digits after decimal point - 0
    }
	
	serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(param_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
   
   serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(eqparam_edit_type) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process save_manage_equipment_parameters service response ForIEBrowser

function processServiceResponseData_save_manage_equipment_parametersForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_update_status
		   if(responseXMLNode[toplevelChildi].childNodes[0].text== "SP001")
		   {eq_param_update_status = 1;}
		   else{eq_param_update_status = 0;}
        }
    }
}

//Function to process save_manage_equipment_parameters service response ForNonIEBrowser

function processServiceResponseData_save_manage_equipment_parametersForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_update_status
		   if(responseXMLNode[toplevelChildi].childNodes[0].textContent == "SP001")
		   {eq_param_update_status = 1;}
		   else{eq_param_update_status = 0;}
        }
    }
}

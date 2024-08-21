//Function to call save_manage_sla_master service
function executeService_save_manage_sla_master()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() + "common_modules/save_manage_sla_master.aspx";
    
    //Prepare save_manage_sla_master service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_sla_master());
    
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
            return processServiceResponseData_save_manage_sla_masterForIEBrowser(responseXML);
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
            return processServiceResponseData_save_manage_sla_masterForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare save_manage_sla_master service request
function prepareServiceRequestData_save_manage_sla_master()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_sla_for_code>" + sla_master_ind + "</p_sla_for_code>";  // String
    serviceDetails = serviceDetails + "<p_sla_item_category>" + category + "</p_sla_item_category>";  // Unicode string
    serviceDetails = serviceDetails + "<p_sla_item_type>" + type + "</p_sla_item_type>";  // String
    serviceDetails = serviceDetails + "<p_customer_id>" + cust_id + "</p_customer_id>";  // String
    serviceDetails = serviceDetails + "<p_priority_code>" + priority_cd + "</p_priority_code>";  // String
	serviceDetails = serviceDetails + "<p_effective_from_date>" + eff_from_date + "</p_effective_from_date>";  // String
    serviceDetails = serviceDetails + "<p_effective_to_date>" + eff_to_date + "</p_effective_to_date>";  // String
    serviceDetails = serviceDetails + "<p_sla_interval>" + sla_interval + "</p_sla_interval>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 4
    serviceDetails = serviceDetails + "<p_sla_uom_code>" + sla_uom_code + "</p_sla_uom_code>";  // String
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + sla_rec_tstamp + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + save_mode_ind + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process save_manage_sla_master service response ForIEBrowser
function processServiceResponseData_save_manage_sla_masterForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_update_status
		   if (save_mode_ind ="U")
		   {
		   if(responseXMLNode[toplevelChildi].childNodes[0].text == "SP001")
			{
			alert("SLA  Updated Successfully");
			update_status = "P" ;
			}
			else
			{
			alert("SLA  Updation Failed");
			update_status = "F" ;
			}
			}
			else if(save_mode_ind = "D")
			{
			if(responseXMLNode[toplevelChildi].childNodes[0].text == "SP001")
			{
			alert("SLA  Deleted Successfully");
			update_status = "P" ;
			}
			else
			{
			alert("SLA  Deletion Failed");
			update_status = "F" ;
			}
			}
        }
    }
}

//Function to process save_manage_sla_master service response ForNonIEBrowser
function processServiceResponseData_save_manage_sla_masterForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_update_status
			if (save_mode_ind ="U")
		   {
			if(responseXMLNode[toplevelChildi].childNodes[0].textContent == "SP001")
			{
			alert("SLA is Updated Successfully");
			update_status = "P" ;
			}
			else if(responseXMLNode[toplevelChildi].childNodes[0].textContent == 0)
			{
			alert("SLA  Updation Failed");
			update_status = "F" ;
			}
			}
			else if (save_mode_ind ="D")
		   {
		   if(responseXMLNode[toplevelChildi].childNodes[0].textContent == "SP001")
			{
			alert("SLA  Deleted Successfully");
			update_status = "P" ;
			}
			else if(responseXMLNode[toplevelChildi].childNodes[0].textContent == 0)
			{
			alert("SLA  Deletion Failed");
			update_status = "F" ;
			}
		   }
        }
    }
}

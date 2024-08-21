//Function to call retrieve_inventory_item_details service
function executeService_retrieve_inventory_item_details()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
     var targetURL = getWebserverpath() + "mservice/retrieve_inventory_item_details.aspx";
    
    //Prepare retrieve_inventory_item_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_inventory_item_details());
    
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
          return  processServiceResponseData_retrieve_inventory_item_detailsForIEBrowser(responseXML);
			
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
           return processServiceResponseData_retrieve_inventory_item_detailsForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_inventory_item_details service request
function prepareServiceRequestData_retrieve_inventory_item_details()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_project_id>" + job_profile.job_id + "</p_project_id>";  // String
	serviceDetails = serviceDetails + "<p_template_id>" + job_profile.template_id + "</p_template_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_partlist_template_type>" + partlist_template_type + "</p_partlist_template_type>";  // String
    serviceDetails = serviceDetails + "<p_partlist_template_id>" + sParts_id + "</p_partlist_template_id>";  // Unicode string
    //serviceDetails = serviceDetails + "<p_project_task_level_ind>" + getXmlString(projectind) + "</p_project_task_level_ind>";  // String
    serviceDetails = serviceDetails + "<p_project_task_level_ind>" + project_task_level_ind + "</p_project_task_level_ind>";  // String
    serviceDetails = serviceDetails + "<p_task_id>" + jobtask_profile.task_id + "</p_task_id>";  // Int32: -2147483648 to 2147483647
	//serviceDetails = serviceDetails + "<p_template_id>" + getXmlString(job_profile.template_id) + "</p_template_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_code>" + item_code + "</p_item_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_variant_code>" + item_variant_code + "</p_item_variant_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_alt_items_allowed_ind>" + alt_items_allowed + "</p_alt_items_allowed_ind>";  // Boolean: true or false
    serviceDetails = serviceDetails + "<p_item_uom_code>" + pl_uom + "</p_item_uom_code>";  // String
	serviceDetails = serviceDetails + "<p_item_source_ind>" + item_source_ind + "</p_item_source_ind>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_inventory_item_details service response ForIEBrowser
function processServiceResponseData_retrieve_inventory_item_detailsForIEBrowser(xmlDoc)
{
	var inventorylistvalue=new Object();
	var retrieve_status = "";
    var  inventorylistvalue_details ="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";	
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
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_inventory_item_xml
			inventorylistvalue_details += responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	inventorylistvalue_details += "</list>";
	inventorylistvalue = {header:retrieve_status,detail:inventorylistvalue_details};
	return inventorylistvalue;
}

//Function to process retrieve_inventory_item_details service response ForNonIEBrowser
function processServiceResponseData_retrieve_inventory_item_detailsForNonIEBrowser(xmlDoc)
{
	var inventorylistvalue=new Object();
	var retrieve_status = "";
	var  inventorylistvalue_details ="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";	
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
           // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_inventory_item_xml
            inventorylistvalue_details += responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	inventorylistvalue_details += "</list>";
	inventorylistvalue = {header:retrieve_status,detail:inventorylistvalue_details};
	return inventorylistvalue;
}

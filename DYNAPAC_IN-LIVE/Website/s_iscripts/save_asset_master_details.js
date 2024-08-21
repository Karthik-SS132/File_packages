//Function to call save_asset_master_details service
function executeService_save_asset_master_details()
{

     var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() +"mservice/save_asset_master_details.aspx";
    
    //Prepare save_asset_master_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_asset_master_details());
    
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
            return processServiceResponseData_save_asset_master_detailsForIEBrowser(responseXML);
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
            return processServiceResponseData_save_asset_master_detailsForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare save_asset_master_details service request
function prepareServiceRequestData_save_asset_master_details()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_asset_id>" + getXmlString(document.getElementById('asset_id').value) + "</p_asset_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_equipment_id>" + getXmlString(dropdownlist1.text()) + "</p_equipment_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_customer_id>" + getXmlString(dropdownlist.text()) + "</p_customer_id>";  // String
    serviceDetails = serviceDetails + "<p_asset_location_code>" + getXmlString(document.getElementById('asset_location_code').value) + "</p_asset_location_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_locator_layout>" + getXmlString(document.getElementById('locator_layout').value) + "</p_locator_layout>";  // Unicode string
    serviceDetails = serviceDetails + "<p_installation_date>" + getXmlString(document.getElementById('installation_date').value) + "</p_installation_date>";  // String
    //serviceDetails = serviceDetails + "<p_warranty_expiry_date>" + getXmlString(document.getElementById('warranty_ex_date').value) + "</p_warranty_expiry_date>";  // String
	serviceDetails = serviceDetails + "<p_attribute_1>" + getXmlString(document.getElementById('attribute_1').value) + "</p_attribute_1>";  // Unicode string
    serviceDetails = serviceDetails + "<p_attribute_2>" + getXmlString(document.getElementById('attribute_2').value) + "</p_attribute_2>";  // Unicode string
    serviceDetails = serviceDetails + "<p_attribute_3>" + getXmlString(document.getElementById('attribute_3').value) + "</p_attribute_3>";  // Unicode string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(edit_type) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process save_asset_master_details service response ForIEBrowser
function processServiceResponseData_save_asset_master_detailsForIEBrowser(xmlDoc)
{
    save_status="";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].text == '1')
			{
			alert('Asset master details saved successfully');
            save_status=responseXMLNode[toplevelChildi].childNodes[0].text;
			}
			else
			{
            save_status=0;
			alert('Saving Asset master details failed');
			}
        }
    }
}

//Function to process save_asset_master_details service response ForNonIEBrowser
function processServiceResponseData_save_asset_master_detailsForNonIEBrowser(xmlDoc)
{
    save_status="";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].textContent == '1')
			{
			alert('Asset master details saved successfully');
			save_status=responseXMLNode[toplevelChildi].childNodes[0].textContent;
            }
			else
			{
                save_status=0;
			alert('Saving Asset master details failed');
			}
        }
    }
}

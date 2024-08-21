//Function to call save_manage_item_alternates service
function executeService_save_manage_item_alternates()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() + "mservice/save_manage_item_alternates.aspx";
    
    //Prepare save_manage_item_alternates service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_item_alternates());
    
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
            return processServiceResponseData_save_manage_item_alternatesForIEBrowser(responseXML);
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
            return processServiceResponseData_save_manage_item_alternatesForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare save_manage_item_alternates service request
function prepareServiceRequestData_save_manage_item_alternates()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>"
    serviceDetails = serviceDetails + "<p_item_code>" + getXmlString(slctr_itemcode) + "</p_item_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_item_variant_code>" + getXmlString(slctr_variantcode) + "</p_item_variant_code>";  // Unicode string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(alt_edit_type) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>"
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 0; inputparam_detaili < alternate_item_details.length; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_item_code>" + getXmlString( alternate_item_details[inputparam_detaili].alt_item_code) + "</p_item_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_item_variant_code>" + getXmlString( alternate_item_details[inputparam_detaili].alt_item_variant_code) + "</p_item_variant_code>";  // Unicode string
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process save_manage_item_alternates service response ForIEBrowser
function processServiceResponseData_save_manage_item_alternatesForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           //alert(getString(responseXMLNode[toplevelChildi].childNodes[0].text)); // p_update_status
		    if(responseXMLNode[toplevelChildi].childNodes[0].text == '1')
			{
				alert('Item alternate details saved successfully');
			}
			else
			{
				alert('Saving Item alternate details failed');
			}
        }
    }
}

//Function to process save_manage_item_alternates service response ForNonIEBrowser
function processServiceResponseData_save_manage_item_alternatesForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //alert(getString(responseXMLNode[toplevelChildi].childNodes[0].textContent)); // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].textContent == '1')
			{
				alert('Item alternate details saved successfully');
			}
			else
			{
				alert('Saving Item alternate details failed');
			}
        }
    }
}

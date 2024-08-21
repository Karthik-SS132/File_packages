//Function to call retrieve_manage_sla_master service
function executeService_retrieve_manage_sla_master()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() +"common_modules/retrieve_manage_sla_master.aspx";
    
    //Prepare retrieve_manage_sla_master service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_sla_master());
    
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
            return processServiceResponseData_retrieve_manage_sla_masterForIEBrowser(responseXML);
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
            return processServiceResponseData_retrieve_manage_sla_masterForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_manage_sla_master service request
function prepareServiceRequestData_retrieve_manage_sla_master()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_sla_for_code>" + getXmlString(sla_master_ind) + "</p_sla_for_code>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";

    return serviceDetails;
}

//Function to process retrieve_manage_sla_master service response ForIEBrowser
function processServiceResponseData_retrieve_manage_sla_masterForIEBrowser(xmlDoc)
{
	var ret_m_sla = "";
	ret_m_sla += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    //var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_sla_list_xml
            //outputparam_detailcount++;
			ret_m_sla += responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	ret_m_sla += "</list>";
    return ret_m_sla;
	//alert(ret_m_sla);
}

//Function to process retrieve_manage_sla_master service response ForNonIEBrowser
function processServiceResponseData_retrieve_manage_sla_masterForNonIEBrowser(xmlDoc)
{
var ret_m_sla = "";
ret_m_sla += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    //var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_sla_list_xml
            //outputparam_detailcount++;
			ret_m_sla += responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	ret_m_sla += "</list>";
    return ret_m_sla;
	//alert(ret_m_sla);
}

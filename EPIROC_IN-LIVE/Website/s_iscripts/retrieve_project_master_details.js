//Function to call retrieve_project_master_details service
function executeService_retrieve_project_master_details()
{
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() + "mptrak/retrieve_project_master_details.aspx";
    
    //Prepare retrieve_project_master_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_project_master_details());
    
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
          return  processServiceResponseData_retrieve_project_master_detailsForIEBrowser(responseXML);
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
          return  processServiceResponseData_retrieve_project_master_detailsForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_project_master_details service request
function prepareServiceRequestData_retrieve_project_master_details()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	  
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_project_id>" + getXmlString(slctmp_uid) + "</p_project_id>"; // String
	serviceDetails = serviceDetails + "<p_project_type>" + getXmlString('P') + "</p_project_type>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_project_master_details service response ForIEBrowser
function processServiceResponseData_retrieve_project_master_detailsForIEBrowser(xmlDoc)
{
	m_p_det="";
	m_p_det += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
   // var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_project_header_xml
			m_p_det += responseXMLNode[toplevelChildi].childNodes[0].text;
		}
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_project_detail_xml
           // outputparam_detailcount++;
		   m_p_det += responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	m_p_det += "</list>";
	
}

//Function to process retrieve_project_master_details service response ForNonIEBrowser
function processServiceResponseData_retrieve_project_master_detailsForNonIEBrowser(xmlDoc)
{
	m_p_det="";
	m_p_det += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    //var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_project_header_xml
			m_p_det += responseXMLNode[toplevelChildi].childNodes[0].textContent;
		}
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
           // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_project_detail_xml
           // outputparam_detailcount++;
		   m_p_det += responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	m_p_det += "</list>";
	return m_p_det;
	
}

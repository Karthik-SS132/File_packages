 //Function to call retrieve_manage_customer_details service
function executeService_retrieve_manage_customer_details()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() +"common_modules/retrieve_manage_customer_details.aspx";
    
    //Prepare retrieve_manage_customer_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_customer_details());
    
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
            return processServiceResponseData_retrieve_manage_customer_detailsForIEBrowser(responseXML);
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
           return processServiceResponseData_retrieve_manage_customer_detailsForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_manage_customer_details service request
function prepareServiceRequestData_retrieve_manage_customer_details()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	 
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_customer_id>" + getXmlString(slctmc_uid) + "</p_customer_id>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process retrieve_manage_customer_details service response ForIEBrowser
function processServiceResponseData_retrieve_manage_customer_detailsForIEBrowser(xmlDoc)
{
var m_cust_det = "";
m_cust_det += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_customer_master_detail_xml
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[1].text); // p_retrieve_status
			m_cust_det += responseXMLNode[toplevelChildi].childNodes[0].text;
		}
    }
	m_cust_det += "</list>";
    return m_cust_det;
	//alert(m_cust_det);
}

//Function to process retrieve_manage_customer_details service response ForNonIEBrowser
function processServiceResponseData_retrieve_manage_customer_detailsForNonIEBrowser(xmlDoc)
{
var m_cust_det = "";
m_cust_det += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_customer_master_detail_xml
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[1].textContent); // p_retrieve_status
			m_cust_det += responseXMLNode[toplevelChildi].childNodes[0].textContent;
		}
    }
	m_cust_det += "</list>";
    return m_cust_det;
	
}

//Function to call retrieve_company_list service
function executeService_retrieve_company_list()
{
  var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
	  
              
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "common_modules/retrieve_company_list.aspx";
    
    //Prepare retrieve_company_list service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_company_list());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
			 alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
			return '1';
        }
        else
        {
          return  processServiceResponseData_retrieve_company_listForIEBrowser(responseXML);
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
			return '1';
        }
        else
        {
          return  processServiceResponseData_retrieve_company_listForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_company_list service request
function prepareServiceRequestData_retrieve_company_list()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
	serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_company_list service response ForIEBrowser
function processServiceResponseData_retrieve_company_listForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // company_id
            document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[1].text; // company_name
        }
    }
}

//Function to process retrieve_company_list service response ForNonIEBrowser
function processServiceResponseData_retrieve_company_listForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // company_id
            document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[1].textContent; // company_name
        }
    }
}

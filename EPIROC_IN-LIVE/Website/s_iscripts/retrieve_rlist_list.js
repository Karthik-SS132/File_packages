//Function to call retrieve_rlist_list service
function executeService_retrieve_rlist_list()
{
       var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() +"common_modules/retrieve_rlist_list.aspx";
    
    //Prepare retrieve_rlist_list service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_rlist_list());
    
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
          return  processServiceResponseData_retrieve_rlist_listForIEBrowser(responseXML);
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
         return   processServiceResponseData_retrieve_rlist_listForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_rlist_list service request
function prepareServiceRequestData_retrieve_rlist_list()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process retrieve_rlist_list service response ForIEBrowser
function processServiceResponseData_retrieve_rlist_listForIEBrowser(xmlDoc)
{
	var listr="";
	listr+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_rlist_xml
			listr+=responseXMLNode[toplevelChildi].childNodes[0].text;
		}
    }
		listr+="</list>";
        return listr;
		//alert(listr);
}

//Function to process retrieve_rlist_list service response ForNonIEBrowser
function processServiceResponseData_retrieve_rlist_listForNonIEBrowser(xmlDoc)
{
	var listr="";
	listr+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_rlist_xml
        listr+=responseXMLNode[toplevelChildi].childNodes[0].textContent;
		}
    }
		listr+="</list>";
        return listr;
		//alert(listr);
}

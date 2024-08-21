//Function to call retrieve_listof_country_codes service
function executeService_retrieve_listof_country_codes()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() +"common_modules/retrieve_listof_country_codes.aspx";
    
    //Prepare retrieve_listof_country_codes service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listof_country_codes());
    
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
            return processServiceResponseData_retrieve_listof_country_codesForIEBrowser(responseXML);
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
            return processServiceResponseData_retrieve_listof_country_codesForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_listof_country_codes service request
function prepareServiceRequestData_retrieve_listof_country_codes()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
	serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	return serviceDetails;
}

//Function to process retrieve_listof_country_codes service response ForIEBrowser
function processServiceResponseData_retrieve_listof_country_codesForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_country_code
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].text; // p_description
			mc_ctry_data.push({
				country_code : responseXMLNode[toplevelChildi].childNodes[0].text,
				description : responseXMLNode[toplevelChildi].childNodes[1].text
			});
		}
    }
}

//Function to process retrieve_listof_country_codes service response ForNonIEBrowser
function processServiceResponseData_retrieve_listof_country_codesForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_country_code
           // document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].textContent; // p_description
			mc_ctry_data.push({
				country_code : responseXMLNode[toplevelChildi].childNodes[0].textContent,
				description : responseXMLNode[toplevelChildi].childNodes[1].textContent
			});
		}
    }
}

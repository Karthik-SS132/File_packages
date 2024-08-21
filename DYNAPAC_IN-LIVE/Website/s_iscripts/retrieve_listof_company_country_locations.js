//Function to call retrieve_listof_company_country_locations service
function executeService_retrieve_listof_company_country_locations()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }

    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "common_modules/retrieve_listof_company_country_locations.aspx";
    
    //Prepare retrieve_listof_company_country_locations service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listof_company_country_locations());
    
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
             return processServiceResponseData_retrieve_listof_company_country_locationsForIEBrowser(responseXML);
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
           return processServiceResponseData_retrieve_listof_company_country_locationsForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_listof_company_country_locations service request
function prepareServiceRequestData_retrieve_listof_company_country_locations()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process retrieve_listof_company_country_locations service response ForIEBrowser
function processServiceResponseData_retrieve_listof_company_country_locationsForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // o_country_code
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].text; // o_country_name
			company_country_locations_data.push({
			country_code : responseXMLNode[toplevelChildi].childNodes[0].text,
			country_name : responseXMLNode[toplevelChildi].childNodes[1].text,
			location_code: responseXMLNode[toplevelChildi].childNodes[2].text,
			location_name: responseXMLNode[toplevelChildi].childNodes[3].text
		   });
		}
    }
}

//Function to process retrieve_listof_company_country_locations service response ForNonIEBrowser
function processServiceResponseData_retrieve_listof_company_country_locationsForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // o_country_code
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].textContent; // o_country_name
			company_country_locations_data.push({
			country_code : responseXMLNode[toplevelChildi].childNodes[0].textContent,
			country_name : responseXMLNode[toplevelChildi].childNodes[1].textContent,
			location_code : responseXMLNode[toplevelChildi].childNodes[2].textContent,
			location_name : responseXMLNode[toplevelChildi].childNodes[3].textContent
		   });
		}
    }
}

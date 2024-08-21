//Function to call retrieve_listof_jo_status service
function executeService_retrieve_listof_jo_status()
{
    var targetURL = getWebserverpath() + "/mservice/retrieve_listof_jo_status.aspx";
    
    //Prepare retrieve_listof_jo_status service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listof_jo_status());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
            return false;
        }
        else
        {
            processServiceResponseData_retrieve_listof_jo_statusForIEBrowser(responseXML);
            return true;
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
            return false;
        }
        else
        {
            processServiceResponseData_retrieve_listof_jo_statusForNonIEBrowser(responseXML);
            return true;
        }
    }
    return false;
}

//Function to prepare retrieve_listof_jo_status service request
function prepareServiceRequestData_retrieve_listof_jo_status()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_listof_jo_status service response ForIEBrowser
function processServiceResponseData_retrieve_listof_jo_statusForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_jo_status
          //  document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].text; // p_description
        jo_status_data.push({
			value:responseXMLNode[toplevelChildi].childNodes[0].textContent,
			text:responseXMLNode[toplevelChildi].childNodes[1].textContent
			
			});
		
		}
    }
}

//Function to process retrieve_listof_jo_status service response ForNonIEBrowser
function processServiceResponseData_retrieve_listof_jo_statusForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_jo_status
           // document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].textContent; // p_description
       
			jo_status_data.push({
			value:responseXMLNode[toplevelChildi].childNodes[0].textContent,
			text:responseXMLNode[toplevelChildi].childNodes[1].textContent
			
			});
	   }
    }
}

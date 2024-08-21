//Function to call retrieve_listof_file_catg_type service
function executeService_retrieve_listof_file_catg_type()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() +"common_modules/retrieve_listof_file_catg_type.aspx";
    
    //Prepare retrieve_listof_file_catg_type service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listof_file_catg_type());
    
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
            return processServiceResponseData_retrieve_listof_file_catg_typeForIEBrowser(responseXML);
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
            return processServiceResponseData_retrieve_listof_file_catg_typeForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_listof_file_catg_type service request
function prepareServiceRequestData_retrieve_listof_file_catg_type()
{
	var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	return serviceDetails;
}

//Function to process retrieve_listof_file_catg_type service response ForIEBrowser
function processServiceResponseData_retrieve_listof_file_catg_typeForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            /*document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_file_category
            document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].text; // p_file_catg_description
            document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[2].text; // p_file_type
            document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[3].text; // p_file_type_description*/
			catg_type_data.push({
			file_category:responseXMLNode[toplevelChildi].childNodes[0].text,
			file_catg_description:responseXMLNode[toplevelChildi].childNodes[1].text
			});
			type_file_data.push({
			file_category:responseXMLNode[toplevelChildi].childNodes[0].text,
			file_type:responseXMLNode[toplevelChildi].childNodes[2].text,
			file_type_description:responseXMLNode[toplevelChildi].childNodes[3].text
			});
        }
    }
}

//Function to process retrieve_listof_file_catg_type service response ForNonIEBrowser
function processServiceResponseData_retrieve_listof_file_catg_typeForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            /*document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_file_category
            document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].textContent; // p_file_catg_description
            document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[2].textContent; // p_file_type
            document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[3].textContent; // p_file_type_description*/
			catg_type_data.push({
			file_category:responseXMLNode[toplevelChildi].childNodes[0].textContent,
			file_catg_description:responseXMLNode[toplevelChildi].childNodes[1].textContent
			});
			type_file_data.push({
			file_category:responseXMLNode[toplevelChildi].childNodes[0].textContent,
			file_type:responseXMLNode[toplevelChildi].childNodes[2].textContent,
			file_type_description:responseXMLNode[toplevelChildi].childNodes[3].textContent
			});
		}
    }
}

//Function to call authenticate_client service
function executeService_authenticate_client()
{
    var targetURL =  getWebserverpath() + "security/authenticate_client.aspx";
    
    //Prepare authenticate_client service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_authenticate_client());
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
           return  processServiceResponseData_authenticate_clientForIEBrowser(responseXML);
            return '1';
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
           return  processServiceResponseData_authenticate_clientForNonIEBrowser(responseXML);
            return '1';
        }
    }
   // return false;
}

//Function to prepare authenticate_client service request
function prepareServiceRequestData_authenticate_client()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
     //Processing context segment
    serviceDetails = serviceDetails + "<context>";
    serviceDetails = serviceDetails + "<sessionId>" + getXmlString("7e9c274d-1c4b-4234-9eec-4f90971f998b") + "</sessionId>"; // UniqueIdentifier string
    serviceDetails = serviceDetails + "<userId>" + getXmlString("signin") + "</userId>"; // Unicode string
    serviceDetails = serviceDetails + "<client_id>" + getXmlString(client_id) + "</client_id>"; // String
    serviceDetails = serviceDetails + "<locale_id>" + getXmlString("en-us") + "</locale_id>"; // String
    serviceDetails = serviceDetails + "<country_code>" + getXmlString("in") + "</country_code>"; // String
	
    //Processing auth_client_request segment
    serviceDetails = serviceDetails + "<auth_client_request>";
    serviceDetails = serviceDetails + "<p_company_id>" + getXmlString(client_id) + "</p_company_id>";  // String
    serviceDetails = serviceDetails + "</auth_client_request>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process authenticate_client service response ForIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_authenticate_clientForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	var country_list = [];
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "auth_client_response_header")
        {
			p_valid_client_ind = responseXMLNode[toplevelChildi].childNodes[0].text; // p_valid_client_ind
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "auth_client_response_detail")
        {
            country_list.push({
				p_country_id:responseXMLNode[toplevelChildi].childNodes[0].text,
				p_country_name:responseXMLNode[toplevelChildi].childNodes[1].text
			});
        }
    }
	return country_list;
}

//Function to process authenticate_client service response ForNonIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_authenticate_clientForNonIEBrowser(xmlDoc)
{
	var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	var country_list = [];
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "auth_client_response_header")
        {
			p_valid_client_ind = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_valid_client_ind
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "auth_client_response_detail")
        {
            country_list.push({
				p_country_id:responseXMLNode[toplevelChildi].childNodes[0].textContent,
				p_country_name:responseXMLNode[toplevelChildi].childNodes[1].textContent
			});
        }
    }
	return country_list;
}

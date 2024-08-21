//Function to call retrieve_manage_code_details service
function executeService_retrieve_manage_code_details()
{
      var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() +"common_modules/retrieve_manage_code_details.aspx";
    
    //Prepare retrieve_manage_code_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_code_details());
    
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
          return  processServiceResponseData_retrieve_manage_code_detailsForIEBrowser(responseXML);
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
          return  processServiceResponseData_retrieve_manage_code_detailsForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_manage_code_details service request
function prepareServiceRequestData_retrieve_manage_code_details()
{
 
    v var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_country_code_filter>" + getXmlString(countrycode) + "</p_country_code_filter>";  // String
    serviceDetails = serviceDetails + "<p_locale_id_filter>" + getXmlString(locale_id_value) + "</p_locale_id_filter>";  // String
    serviceDetails = serviceDetails + "<p_code_type_filter>" + getXmlString(code_type_value) + "</p_code_type_filter>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process retrieve_manage_code_details service response ForIEBrowser
function processServiceResponseData_retrieve_manage_code_detailsForIEBrowser(xmlDoc)
{
        var  code_details="";
    code_details+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_code_value_xml
        code_details=code_details+responseXMLNode[toplevelChildi].childNodes[0].text;     
		}
    }
	code_details+= "</list>";
	return code_details;
}

//Function to process retrieve_manage_code_details service response ForNonIEBrowser
function processServiceResponseData_retrieve_manage_code_detailsForNonIEBrowser(xmlDoc)
{
    var  code_details="";
    code_details+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
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
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_code_value_xml
               code_details=code_details+responseXMLNode[toplevelChildi].childNodes[0].textContent;            
	   }
    }
	code_details+= "</list>";
	//alert("list is"+code_details);
	return code_details;
}

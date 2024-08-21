//Function to call retrieve_listof_codetypes service
function executeService_retrieve_listof_codetypes()
{


    var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() +"common_modules/retrieve_listof_codetypes.aspx";
    
    //Prepare retrieve_listof_codetypes service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listof_codetypes());
    
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
            processServiceResponseData_retrieve_listof_codetypesForIEBrowser(responseXML);
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
            processServiceResponseData_retrieve_listof_codetypesForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_listof_codetypes service request
function prepareServiceRequestData_retrieve_listof_codetypes()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_country_code_filter>" + getXmlString(login_profile.country_code) + "</p_country_code_filter>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process retrieve_listof_codetypes service response ForIEBrowser
function processServiceResponseData_retrieve_listof_codetypesForIEBrowser(xmlDoc)
{
    var counter=0;
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
          //  document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_code_type
          //  document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].text; // p_description
          //  document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[2].text; // p_size
        
		
		code_type_data.push({
		code_type: responseXMLNode[toplevelChildi].childNodes[0].text,
		code_desc: responseXMLNode[toplevelChildi].childNodes[1].text,
	    size: responseXMLNode[toplevelChildi].childNodes[2].text
		});
		code_type_arr[counter]=new Array();
		code_type_arr[counter][0]=responseXMLNode[toplevelChildi].childNodes[0].text;
		code_type_arr[counter][1]= responseXMLNode[toplevelChildi].childNodes[1].text;
		counter=counter+1; 
		}
    }
}

//Function to process retrieve_listof_codetypes service response ForNonIEBrowser
function processServiceResponseData_retrieve_listof_codetypesForNonIEBrowser(xmlDoc)
{
   var counter=0;
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
          //  document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_code_type
         //   document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].textContent; // p_description
          //  document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[2].textContent; // p_size
        
		code_type_data.push({
		code_type: responseXMLNode[toplevelChildi].childNodes[0].textContent,
		code_desc: responseXMLNode[toplevelChildi].childNodes[1].textContent,
	    size: responseXMLNode[toplevelChildi].childNodes[2].textContent
		});
		code_type_arr[counter]=new Array();
		code_type_arr[counter][0]= responseXMLNode[toplevelChildi].childNodes[0].textContent;
		code_type_arr[counter][1]= responseXMLNode[toplevelChildi].childNodes[1].textContent;
		counter=counter+1; 
		}
    }
}

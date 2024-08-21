//Function to call retrieve_listval_priority_code service
function executeService_retrieve_listval_priority_code()
{

    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() +"common_modules/retrieve_listval_priority_code.aspx";
    
    //Prepare retrieve_listval_priority_code service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listval_priority_code());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
			alert( responseXML.documentElement.childNodes[0].childNodes[1].text);
			return "1";
        }
        else
        {
            processServiceResponseData_retrieve_listval_priority_codeForIEBrowser(responseXML);
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
            processServiceResponseData_retrieve_listval_priority_codeForNonIEBrowser(responseXML);
        }
    }

}

//Function to prepare retrieve_listval_priority_code service request
function prepareServiceRequestData_retrieve_listval_priority_code()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_listval_priority_code service response ForIEBrowser
function processServiceResponseData_retrieve_listval_priority_codeForIEBrowser(xmlDoc)
{
    var i=0;
	var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "listof_values")
        {
	      i=i+1;
			 
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // o_priority_code
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].text; // o_priority_code_description
		priority_data.push({
			    slno: i,
			    prioritycode: responseXMLNode[toplevelChildi].childNodes[0].text,
				description :responseXMLNode[toplevelChildi].childNodes[0].text+"-"+responseXMLNode[toplevelChildi].childNodes[1].text,
				value: responseXMLNode[toplevelChildi].childNodes[0].text,
				text: responseXMLNode[toplevelChildi].childNodes[1].text,
				 desc:responseXMLNode[toplevelChildi].childNodes[1].text,
			});
		}
    }
	
}

//Function to process retrieve_listval_priority_code service response ForNonIEBrowser
function processServiceResponseData_retrieve_listval_priority_codeForNonIEBrowser(xmlDoc)
{

  var i=0;
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "listof_values")
        {
		   i=i+1;
		   // document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // o_priority_code
           // document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].textContent; // o_priority_code_description
		    	priority_data.push({
			    slno: i,
			    prioritycode: responseXMLNode[toplevelChildi].childNodes[0].textContent,
				description :responseXMLNode[toplevelChildi].childNodes[0].textContent+"-"+responseXMLNode[toplevelChildi].childNodes[1].textContent,
				value: responseXMLNode[toplevelChildi].childNodes[0].textContent,
				 text: responseXMLNode[toplevelChildi].childNodes[1].textContent,
				 desc:responseXMLNode[toplevelChildi].childNodes[1].textContent,
			});
		
		}
    }

}

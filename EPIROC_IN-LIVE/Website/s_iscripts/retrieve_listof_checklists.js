//Function to call retrieve_listof_checklists service
function executeService_retrieve_listof_checklists()
{
 var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
	  
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "common_modules/retrieve_listof_checklists.aspx";
    
    //Prepare retrieve_listof_checklists service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listof_checklists());
    
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
          return  processServiceResponseData_retrieve_listof_checklistsForIEBrowser(responseXML);
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
          return  processServiceResponseData_retrieve_listof_checklistsForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_listof_checklists service request
function prepareServiceRequestData_retrieve_listof_checklists()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}
//Function to process retrieve_listof_checklists service response ForIEBrowser
function processServiceResponseData_retrieve_listof_checklistsForIEBrowser(xmlDoc)
{
    var i=0;
	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
		   i=i+1;
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_checklist_id
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].text; // p_checklist_name
			checklist_data.push({
			    slno: i,
			    checklistid: responseXMLNode[toplevelChildi].childNodes[0].text,
				checklistname: responseXMLNode[toplevelChildi].childNodes[1].text
			});
   	        //checklistId[i]=responseXMLNode[toplevelChildi].childNodes[0].text;
			//Description[i]=responseXMLNode[toplevelChildi].childNodes[1].text;
			//i=i+1;
        }
    }
}

//Function to process retrieve_listof_checklists service response ForNonIEBrowser
function processServiceResponseData_retrieve_listof_checklistsForNonIEBrowser(xmlDoc)
{
    var i=0;
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
		    i = i+1;
			
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_checklist_id
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].textContent; // p_checklist_name
			//checklistId[i]=responseXMLNode[toplevelChildi].childNodes[0].textContent;
			//Description[i]=responseXMLNode[toplevelChildi].childNodes[1].textContent;
			//i=i+1;
			checklist_data.push({
			    slno: i,
			    checklistid: responseXMLNode[toplevelChildi].childNodes[0].textContent,
				checklistname: responseXMLNode[toplevelChildi].childNodes[1].textContent
			});
        }
    }
}

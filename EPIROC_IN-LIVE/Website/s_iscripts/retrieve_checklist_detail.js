//Function to call retrieve_checklist_detail service
function executeService_retrieve_checklist_detail()
{
      var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "common_modules/retrieve_checklist_detail.aspx";
    
    //Prepare retrieve_checklist_detail service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_checklist_detail());
    
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
          return  processServiceResponseData_retrieve_checklist_detailForIEBrowser(responseXML);
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
          return  processServiceResponseData_retrieve_checklist_detailForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_checklist_detail service request
function prepareServiceRequestData_retrieve_checklist_detail()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_checklist_id>" + getXmlString(qsparam["checklist_id"]) + "</p_checklist_id>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process retrieve_checklist_detail service response ForIEBrowser
function processServiceResponseData_retrieve_checklist_detailForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
		
		checklist_header.push({
		        checklistid: qsparam["checklist_id"],
			    checklistname: responseXMLNode[toplevelChildi].childNodes[0].text,// p_checklist_name
				checklist_header_tstamp: responseXMLNode[toplevelChildi].childNodes[1].text// p_header_rec_timestamp
			});
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
		   checklist_detail.push({
			    checklist_slno: responseXMLNode[toplevelChildi].childNodes[0].text,
				description: responseXMLNode[toplevelChildi].childNodes[1].text,
		        allow_yes_ind: responseXMLNode[toplevelChildi].childNodes[2].text,
				allow_yes_no_ind: responseXMLNode[toplevelChildi].childNodes[3].text,
				allow_yes_no_na_ind: responseXMLNode[toplevelChildi].childNodes[4].text,
				detl_rec_timestamp: responseXMLNode[toplevelChildi].childNodes[5].text
				});
            outputparam_detailcount++;
        }
    }
}

//Function to process retrieve_checklist_detail service response ForNonIEBrowser
function processServiceResponseData_retrieve_checklist_detailForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
        checklist_header.push({
		        checklistid: qsparam["checklist_id"],
			    checklistname: responseXMLNode[toplevelChildi].childNodes[0].textContent,// p_checklist_name
				checklist_header_tstamp: responseXMLNode[toplevelChildi].childNodes[1].textContent // p_header_rec_timestamp
			});
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
        checklist_detail.push({
			    checklist_slno: parseInt(responseXMLNode[toplevelChildi].childNodes[0].textContent),
				description: responseXMLNode[toplevelChildi].childNodes[1].textContent,
		        allow_yes_ind: responseXMLNode[toplevelChildi].childNodes[2].textContent,
				allow_yes_no_ind: responseXMLNode[toplevelChildi].childNodes[3].textContent,
				allow_yes_no_na_ind: responseXMLNode[toplevelChildi].childNodes[4].textContent,
				detl_rec_timestamp: responseXMLNode[toplevelChildi].childNodes[5].textContent
				});
            outputparam_detailcount++;
        }
    }
}

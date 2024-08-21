//Function to call retrieve_manage_equipment_prevmrules_fcy service
function executeService_retrieve_manage_equipment_prevmrules_fcy()
{
    var targetURL = getWebserverpath() + "/mservice/retrieve_manage_equipment_prevmrules_fcy.aspx";
    
    //Prepare retrieve_manage_equipment_prevmrules_fcy service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_equipment_prevmrules_fcy());
    
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
           return  processServiceResponseData_retrieve_manage_equipment_prevmrules_fcyForIEBrowser(responseXML);
            //return true;
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
            return processServiceResponseData_retrieve_manage_equipment_prevmrules_fcyForNonIEBrowser(responseXML);
			//return true;
        }
    }
   // return false;
}

//Function to prepare retrieve_manage_equipment_prevmrules_fcy service request
function prepareServiceRequestData_retrieve_manage_equipment_prevmrules_fcy()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_equipment_id>" + getXmlString(slctdeq_model['equipment_id']) + "</p_equipment_id>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_manage_equipment_prevmrules_fcy service response ForIEBrowser

function processServiceResponseData_retrieve_manage_equipment_prevmrules_fcyForIEBrowser(xmlDoc)
{
	var  eq_prevrules_list="";
    eq_prevrules_list+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_equipment_prevmrule_fcy_xml
          //  document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[1].text; // p_retrieve_status
			 eq_prevrules_list=eq_prevrules_list+responseXMLNode[toplevelChildi].childNodes[0].text;    
		}
    }
	eq_prevrules_list+= "</list>";
	return eq_prevrules_list;
}

//Function to process retrieve_manage_equipment_prevmrules_fcy service response ForNonIEBrowser

function processServiceResponseData_retrieve_manage_equipment_prevmrules_fcyForNonIEBrowser(xmlDoc)
{
	var  eq_prevrules_list="";
    eq_prevrules_list+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
          //  document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_equipment_prevmrule_fcy_xml
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[1].textContent; // p_retrieve_status
			 eq_prevrules_list=eq_prevrules_list+responseXMLNode[toplevelChildi].childNodes[0].textContent;    
		}
    }
	eq_prevrules_list+= "</list>";
	return eq_prevrules_list;
}

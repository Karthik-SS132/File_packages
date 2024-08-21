//Function to call retrieve_manage_equipment_prevmrules_eqparambased service
function executeService_retrieve_manage_equipment_prevmrules_eqparambased()
{
    var targetURL = getWebserverpath() + "mservice/retrieve_manage_equipment_prevmrules_eqparambased.aspx";
    
    //Prepare retrieve_manage_equipment_prevmrules_eqparambased service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_equipment_prevmrules_eqparambased());
    
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
           return  processServiceResponseData_retrieve_manage_equipment_prevmrules_eqparambasedForIEBrowser(responseXML);
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
            return '1';
        }
        else
        {
           return processServiceResponseData_retrieve_manage_equipment_prevmrules_eqparambasedForNonIEBrowser(responseXML);
            return true;
        }
    }
   // return false;
}

//Function to prepare retrieve_manage_equipment_prevmrules_eqparambased service request
function prepareServiceRequestData_retrieve_manage_equipment_prevmrules_eqparambased()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_equipment_id>" + getXmlString(selected_equipment_model['equipment_id']) + "</p_equipment_id>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_manage_equipment_prevmrules_eqparambased service response ForIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_retrieve_manage_equipment_prevmrules_eqparambasedForIEBrowser(xmlDoc)
{
	var  eq_prevrules_param_list="";
    eq_prevrules_param_list+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
   // var outputparam_detailcount = 1;
   
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
          //  document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_prevmrule_eqparambased_xml
          //  outputparam_detailcount++;
			 eq_prevrules_param_list=eq_prevrules_param_list+responseXMLNode[toplevelChildi].childNodes[0].text; 
		}
    }
	eq_prevrules_param_list+= "</list>";
	return eq_prevrules_param_list;
}

//Function to process retrieve_manage_equipment_prevmrules_eqparambased service response ForNonIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_retrieve_manage_equipment_prevmrules_eqparambasedForNonIEBrowser(xmlDoc)
{
	var  eq_prevrules_param_list="";
    eq_prevrules_param_list+="<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";	
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    //var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_prevmrule_eqparambased_xml
            //outputparam_detailcount++;
			 eq_prevrules_param_list=eq_prevrules_param_list+responseXMLNode[toplevelChildi].childNodes[0].textContent; 
		}
    }
		eq_prevrules_param_list+= "</list>";
		return eq_prevrules_param_list;
}

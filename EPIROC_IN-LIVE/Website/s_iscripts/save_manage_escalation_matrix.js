//Function to call save_manage_escalation_matrix service
function executeService_save_manage_escalation_matrix()
{
    var targetURL = getWebserverpath() + "common_modules/save_manage_escalation_matrix.aspx";
    
    //Prepare save_manage_escalation_matrix service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_escalation_matrix());
    
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
            processServiceResponseData_save_manage_escalation_matrixForIEBrowser(responseXML);
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
            processServiceResponseData_save_manage_escalation_matrixForNonIEBrowser(responseXML);
            return true;
        }
    }
    return false;
}

//Function to prepare save_manage_escalation_matrix service request
function prepareServiceRequestData_save_manage_escalation_matrix()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_escalation_for_type>" + getXmlString(escltn_for_type) + "</p_escalation_for_type>";  // String
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(esc_save_mode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam>";
    
    //Processing outputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var outputparam_detaili = 0; outputparam_detaili < esc_metrics_array.length; outputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<outputparam_detail>";
		serviceDetails = serviceDetails + "<p_level_id>" + (esc_metrics_array[outputparam_detaili].level_id) + "</p_level_id>";  // Byte: 0 to 255
       
		serviceDetails = serviceDetails + "<p_escalation_id_type>" + getXmlString(esc_metrics_array[outputparam_detaili].esc_id_type) + "</p_escalation_id_type>";  // String
        if(esc_metrics_array[outputparam_detaili].esc_org_lvl_no == "")
		{
		serviceDetails = serviceDetails + "<p_escalation_org_level_no>" +(0) + "</p_escalation_org_level_no>";  // Byte: 0 to 255
        
		}
		else
		{
		serviceDetails = serviceDetails + "<p_escalation_org_level_no>" + getXmlString(esc_metrics_array[outputparam_detaili].esc_org_lvl_no) + "</p_escalation_org_level_no>";  // Byte: 0 to 255
        }
		serviceDetails = serviceDetails + "<p_escalation_id_code>" + (esc_metrics_array[outputparam_detaili].esc_id_code) + "</p_escalation_id_code>";  // String
        serviceDetails = serviceDetails + "<p_elapsed_time_since_sla>" + getXmlString(esc_metrics_array[outputparam_detaili].elapsed_time_since_sla) + "</p_elapsed_time_since_sla>";  // Int16: -32768 to 32767
        serviceDetails = serviceDetails + "<p_elapsed_time_uom>" + getXmlString(esc_metrics_array[outputparam_detaili].elapsed_time_uom) + "</p_elapsed_time_uom>";  // String
        serviceDetails = serviceDetails + "<p_notification_mode>" + getXmlString(esc_metrics_array[outputparam_detaili].notification_mode) + "</p_notification_mode>";  // String
        serviceDetails = serviceDetails + "</outputparam_detail>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process save_manage_escalation_matrix service response ForIEBrowser

function processServiceResponseData_save_manage_escalation_matrixForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_update_status
			esc_update_status=responseXMLNode[toplevelChildi].childNodes[0].text ;
		}
    }
}

//Function to process save_manage_escalation_matrix service response ForNonIEBrowser

function processServiceResponseData_save_manage_escalation_matrixForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_update_status
        
			esc_update_status=responseXMLNode[toplevelChildi].childNodes[0].textContent ;
		}
    }
}

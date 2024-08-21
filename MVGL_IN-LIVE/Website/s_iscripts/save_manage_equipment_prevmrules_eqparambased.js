//Function to call save_manage_equipment_prevmrules_eqparambased service
function executeService_save_manage_equipment_prevmrules_eqparambased()
{
    var targetURL = getWebserverpath() + "/mservice/save_manage_equipment_prevmrules_eqparambased.aspx";
    
    //Prepare save_manage_equipment_prevmrules_eqparambased service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_equipment_prevmrules_eqparambased());
    
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
            processServiceResponseData_save_manage_equipment_prevmrules_eqparambasedForIEBrowser(responseXML);
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
            processServiceResponseData_save_manage_equipment_prevmrules_eqparambasedForNonIEBrowser(responseXML);
            return true;
        }
    }
    return false;
}

//Function to prepare save_manage_equipment_prevmrules_eqparambased service request
function prepareServiceRequestData_save_manage_equipment_prevmrules_eqparambased()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_equipment_id>" + getXmlString(manage_equipment_master_grid_1.dataSource.getByUid(selected_equipment_uid).equipment_id) + "</p_equipment_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(eqparam_prevrules_parambased_savemode) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 0; inputparam_detaili < eq_param_data.length; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_param_code>" + getXmlString(eq_param_data[inputparam_detaili].parameter) + "</p_param_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_mprofile_template_id>" + getXmlString(eq_param_data[inputparam_detaili].mprofile_id) + "</p_mprofile_template_id>";  // Unicode string
        serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString("00000000-0000-0000-0000-000000000000") + "</p_rec_tstamp>";  // UniqueIdentifier string
        serviceDetails = serviceDetails + "<p_crud_ind>" + getXmlString('U') + "</p_crud_ind>";  // String
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process save_manage_equipment_prevmrules_eqparambased service response ForIEBrowser

function processServiceResponseData_save_manage_equipment_prevmrules_eqparambasedForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].text == "SP001")
			{
			alert("Template is updated successfully");
			}
			else
			alert("failed");
		}
    }
}

//Function to process save_manage_equipment_prevmrules_eqparambased service response ForNonIEBrowser

function processServiceResponseData_save_manage_equipment_prevmrules_eqparambasedForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].textContent == "SP001")
			{
			alert("Template is updated successfully");
			}
			else
			alert("failed");
			
		}
    }
}

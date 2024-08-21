//Function to call save_mtnceprofile_master_template service
function executeService_save_mtnceprofile_master_template()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() + "mservice/save_mtnceprofile_master_template.aspx";
    
    //Prepare save_mtnceprofile_master_template service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_mtnceprofile_master_template());
    
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
           return processServiceResponseData_save_mtnceprofile_master_templateForIEBrowser(responseXML);
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
            return processServiceResponseData_save_mtnceprofile_master_templateForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare save_mtnceprofile_master_template service request
function prepareServiceRequestData_save_mtnceprofile_master_template()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
	if(mtn_updatetype == "U")
	{
    serviceDetails = serviceDetails +"<inputparam_header>"
    serviceDetails = serviceDetails + "<p_template_id>" + getXmlString( arr_profile.template_id) + "</p_template_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_template_description>" + getXmlString(mtn_newdesc) + "</p_template_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_effective_from_date>" + getXmlString((mtn_new_fdate1).toString()) + "</p_effective_from_date>";  // String
    serviceDetails = serviceDetails + "<p_effective_to_date>" + getXmlString((mtn_new_tdate1).toString())+ "</p_effective_to_date>";  // String
    serviceDetails = serviceDetails + "<p_header_rec_tstamp>" + getXmlString("00000000-0000-0000-0000-000000000000") + "</p_header_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString((mtn_updatetype).toString()) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>"
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 0; inputparam_detaili <  det_arr.length ; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_task_no>" + getXmlString((det_arr[inputparam_detaili].task_id).toString())+ "</p_task_no>";  // Int16: -32768 to 32767
	
        serviceDetails = serviceDetails + "<p_task_code>" +getXmlString(( det_arr[inputparam_detaili].task_code).toString()) + "</p_task_code>";  // String
		
        serviceDetails = serviceDetails + "<p_task_description>" +getXmlString( det_arr[inputparam_detaili].task_description) + "</p_task_description>";  // Unicode string
		
        serviceDetails = serviceDetails + "<p_std_duration>" + getXmlString(det_arr[inputparam_detaili].std_duration) + "</p_std_duration>";  // Int32: -2147483648 to 2147483647
        serviceDetails = serviceDetails + "<p_std_duration_uom>" + getXmlString(det_arr[inputparam_detaili].std_duration_uom) + "</p_std_duration_uom>";  // String
        serviceDetails = serviceDetails + "<p_std_work>" + getXmlString(det_arr[inputparam_detaili].std_work) + "</p_std_work>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 2
        serviceDetails = serviceDetails + "<p_std_work_uom>" + getXmlString(det_arr[inputparam_detaili].std_work_uom) + "</p_std_work_uom>";  // String
		
		
        serviceDetails = serviceDetails + "<p_noof_resources>" +getXmlString( det_arr[inputparam_detaili].noof_resources) + "</p_noof_resources>";  // Byte: 0 to 255
		
        if(det_arr[inputparam_detaili].predecessors == undefined)
		{
	
		serviceDetails = serviceDetails + "<p_predecessors>" +getXmlString('') + "</p_predecessors>";  // String
		
		}
		else
		{
		
		serviceDetails = serviceDetails + "<p_predecessors>" +getXmlString( (det_arr[inputparam_detaili].predecessors).toString()) + "</p_predecessors>";  // String
		}
		serviceDetails = serviceDetails + "<p_capture_equipment_param_ind>" +getXmlString((false).toString()) + "</p_capture_equipment_param_ind>"; // Boolean: true or false
		serviceDetails = serviceDetails + "<p_capture_item_param_ind>" +getXmlString((false).toString()) + "</p_capture_item_param_ind>";  // Boolean: true or false
		
        serviceDetails = serviceDetails + "<p_applicable_item_code>" + getXmlString((false).toString()) + "</p_applicable_item_code>";  // Unicode string

	   serviceDetails = serviceDetails + "<p_applicable_item_variant_code>" + getXmlString((false).toString()) + "</p_applicable_item_variant_code>";  // Unicode string
		if(al_detS.length != 0 || af_detS.length != 0)
		{
		 serviceDetails = serviceDetails + "<p_attachment_avl_ind>" + getXmlString((true).toString())+ "</p_attachment_avl_ind>";  // Boolean: true or false
       
		}
		else
        serviceDetails = serviceDetails + "<p_attachment_avl_ind>" + getXmlString((false).toString())+ "</p_attachment_avl_ind>";  // Boolean: true or false
        serviceDetails = serviceDetails + "<p_detail_rec_tstamp>" + getXmlString(det_arr[inputparam_detaili].detail_rec_tstamp) + "</p_detail_rec_tstamp>"; 
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
	}
	
	
	if(mtn_edittype == "A")
	{
    serviceDetails = serviceDetails +"<inputparam_header>"
    serviceDetails = serviceDetails + "<p_template_id>" + getXmlString(mtn_newtemplate) + "</p_template_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_template_description>" +unescape(mtn_newdesc) + "</p_template_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_effective_from_date>" + getXmlString(mtn_new_fdate1) + "</p_effective_from_date>";  // String
    serviceDetails = serviceDetails + "<p_effective_to_date>" + getXmlString(mtn_new_tdate1) + "</p_effective_to_date>";  // String
    serviceDetails = serviceDetails + "<p_header_rec_tstamp>" + getXmlString("00000000-0000-0000-0000-000000000000") + "</p_header_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(mtn_edittype) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>"
   

    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 0; inputparam_detaili <  det_arr1.length ; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_task_no>" + getXmlString( (det_arr1[inputparam_detaili].task_id).toString())+ "</p_task_no>";  // Int16: -32768 to 32767
        serviceDetails = serviceDetails + "<p_task_code>" +getXmlString( det_arr1[inputparam_detaili].task_code) + "</p_task_code>";  // String
        serviceDetails = serviceDetails + "<p_task_description>" +getXmlString( det_arr1[inputparam_detaili].task_description)+ "</p_task_description>";  // Unicode string
       serviceDetails = serviceDetails + "<p_std_duration>" + getXmlString(det_arr[inputparam_detaili].std_duration) + "</p_std_duration>";  // Int32: -2147483648 to 2147483647
        serviceDetails = serviceDetails + "<p_std_duration_uom>" + getXmlString(det_arr[inputparam_detaili].std_duration_uom) + "</p_std_duration_uom>";  // String
        serviceDetails = serviceDetails + "<p_std_work>" + getXmlString(det_arr[inputparam_detaili].std_work) + "</p_std_work>";  // Decimal: Total no of digits - 10; No of digits after decimal point - 2
        serviceDetails = serviceDetails + "<p_std_work_uom>" + getXmlString(det_arr[inputparam_detaili].std_work_uom) + "</p_std_work_uom>";  // String
		 serviceDetails = serviceDetails + "<p_noof_resources>" +getXmlString( det_arr1[inputparam_detaili].noof_resources) + "</p_noof_resources>";  // Byte: 0 to 255
        serviceDetails = serviceDetails + "<p_predecessors>" +getXmlString( det_arr1[inputparam_detaili].predecessors) + "</p_predecessors>";  // String
		
		serviceDetails = serviceDetails + "<p_capture_equipment_param_ind>" +getXmlString((false).toString()) + "</p_capture_equipment_param_ind>";  // Boolean: true or false
		serviceDetails = serviceDetails + "<p_capture_item_param_ind>" +getXmlString((false).toString()) + "</p_capture_item_param_ind>";  // Boolean: true or false
		
      
        serviceDetails = serviceDetails + "<p_applicable_item_code>" + getXmlString((false).toString()) + "</p_applicable_item_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_applicable_item_variant_code>" + getXmlString((false).toString()) + "</p_applicable_item_variant_code>";  // Unicode string
	
        serviceDetails = serviceDetails + "<p_attachment_avl_ind>" + getXmlString((false).toString())+ "</p_attachment_avl_ind>";  // Boolean: true or false
        serviceDetails = serviceDetails + "<p_detail_rec_tstamp>" + getXmlString(det_arr1[inputparam_detaili].detail_rec_tstamp) + "</p_detail_rec_tstamp>"; 
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }

	}



	serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";

    return serviceDetails;
}

//Function to process save_mtnceprofile_master_template service response ForIEBrowser
function processServiceResponseData_save_mtnceprofile_master_templateForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "inputparam_header")
        {
          //  document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_update_status
        if((responseXMLNode[toplevelChildi].childNodes[0].text) == "SP001")
			{alert("Maintenance profile Template is added successfully");}
		}
    }
}

//Function to process save_mtnceprofile_master_template service response ForNonIEBrowser
function processServiceResponseData_save_mtnceprofile_master_templateForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "inputparam_header")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_update_status
			if((responseXMLNode[toplevelChildi].childNodes[0].textContent) == "SP001")
			{alert("Maintenance profile Template is updated successfully");}
        }
    }
}

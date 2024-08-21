//Function to call delete_manage_user_group service
function executeService_delete_manage_user_group()
{
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "common_modules/delete_manage_user_group.aspx";
    
    //Prepare delete_manage_user_group service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_delete_manage_user_group());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
        }
        else
        {
            processServiceResponseData_delete_manage_user_groupForIEBrowser(responseXML);
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
            processServiceResponseData_delete_manage_user_groupForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare delete_manage_user_group service request
function prepareServiceRequestData_delete_manage_user_group()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>"
    serviceDetails = serviceDetails + "<p_qclist_id>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_qclist_id>";  // Unicode string
    serviceDetails = serviceDetails + "<p_description>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_description>";  // Unicode string
    serviceDetails = serviceDetails + "<p_header_rec_tstamp>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_header_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "<p_save_mode>" + getXmlString(document.getElementById('USER CONTROL').value) + "</p_save_mode>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>"
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 1; inputparam_detaili <= document.getElementById('USER CONTROL').rows.length - 1; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_qclist_slno>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_qclist_slno>";  // Int16: -32768 to 32767
        serviceDetails = serviceDetails + "<p_description>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_description>";  // Unicode string
        serviceDetails = serviceDetails + "<p_quantitative_ind>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_quantitative_ind>";  // Boolean: true or false
        serviceDetails = serviceDetails + "<p_desired_val_min>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_desired_val_min>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_desired_val_max>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_desired_val_max>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_uom>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_uom>";  // String
        serviceDetails = serviceDetails + "<p_allowed_deviation_up>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_allowed_deviation_up>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_allowed_deviation_down>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_allowed_deviation_down>";  // Decimal: Total no of digits - 8; No of digits after decimal point - 4
        serviceDetails = serviceDetails + "<p_allowed_deviation_perc_or_no_ind>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_allowed_deviation_perc_or_no_ind>";  // String
        serviceDetails = serviceDetails + "<p_detail_rec_tstamp>" + document.getElementById('USER CONTROL').rows[inputparam_detaili].cells[COLNO].innerHTML + "</p_detail_rec_tstamp>";  // UniqueIdentifier string
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process delete_manage_user_group service response ForIEBrowser
function processServiceResponseData_delete_manage_user_groupForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_update_status
        }
    }
}

//Function to process delete_manage_user_group service response ForNonIEBrowser
function processServiceResponseData_delete_manage_user_groupForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_update_status
        }
    }
}

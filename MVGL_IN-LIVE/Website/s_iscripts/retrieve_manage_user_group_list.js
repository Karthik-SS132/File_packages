//Function to call retrieve_manage_user_group_list service
function executeService_retrieve_manage_user_group_list()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "common_modules/retrieve_manage_user_group_list.aspx";
    //Prepare retrieve_manage_user_group_list service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_user_group_list());
    
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
            return processServiceResponseData_retrieve_manage_user_group_listForIEBrowser(responseXML);
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
            return processServiceResponseData_retrieve_manage_user_group_listForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_manage_user_group_list service request
function prepareServiceRequestData_retrieve_manage_user_group_list()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process retrieve_manage_user_group_list service response ForIEBrowser
function processServiceResponseData_retrieve_manage_user_group_listForIEBrowser(xmlDoc)
{
	var fn_user_grp=new Object();
    var mn_user_group_list = "";
     mn_user_group_list += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
	var ret_upd = "";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    //var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_retrieve_status
		   ret_upd += responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
           // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_user_group_list_xml
           // outputparam_detailcount++;
        mn_user_group_list += responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	mn_user_group_list += "</list>";
	fn_user_grp={status:ret_upd,xmllist:mn_user_group_list};
	return fn_user_grp;
}

//Function to process retrieve_manage_user_group_list service response ForNonIEBrowser
function processServiceResponseData_retrieve_manage_user_group_listForNonIEBrowser(xmlDoc)
{
	var fn_user_grp=new Object();
    var mn_user_group_list = "";
     mn_user_group_list += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
	var ret_upd = "";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
   // var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_retrieve_status
		   ret_upd += responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_user_group_list_xml
           // outputparam_detailcount++;
           mn_user_group_list += responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	mn_user_group_list += "</list>";
	fn_user_grp={status:ret_upd,xmllist:mn_user_group_list};
	return fn_user_grp;
}

//Function to call retrieve_manage_users_list service
function executeService_retrieve_manage_users_list()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() +"common_modules/retrieve_manage_users_list.aspx";
    
    //Prepare retrieve_manage_users_list service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_users_list());
    
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
            return processServiceResponseData_retrieve_manage_users_listForIEBrowser(responseXML);
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
            return processServiceResponseData_retrieve_manage_users_listForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_manage_users_list service request
function prepareServiceRequestData_retrieve_manage_users_list()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails +  "<inputparam>"
	if (user_group_filter == "")
		serviceDetails = serviceDetails + "<p_user_group_filter>" + getXmlString("ALL") + "</p_user_group_filter>";  // Unicode string
	else
		serviceDetails = serviceDetails + "<p_user_group_filter>" + getXmlString(user_group_filter) + "</p_user_group_filter>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Function to process retrieve_manage_users_list service response ForIEBrowser
function processServiceResponseData_retrieve_manage_users_listForIEBrowser(xmlDoc)
{
var fn_users_list = new Object();
var ret_upd = "";
var mn_users_list = "";
     mn_users_list += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    //var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].text); // p_retrieve_status
			ret_upd += responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_user_list_xml
            //outputparam_detailcount++;
			mn_users_list += responseXMLNode[toplevelChildi].childNodes[0].text;
        }
    }
	mn_users_list += "</list>";
	fn_users_list={user_status:ret_upd,xmluserlist:mn_users_list};
	return fn_users_list;
}

//Function to process retrieve_manage_users_list service response ForNonIEBrowser
function processServiceResponseData_retrieve_manage_users_listForNonIEBrowser(xmlDoc)
{
var fn_users_list = new Object();
var ret_upd = "";
var mn_users_list = "";
     mn_users_list += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    //var outputparam_detailcount = 1;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = getString(responseXMLNode[toplevelChildi].childNodes[0].textContent); // p_retrieve_status
			ret_upd += responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_user_list_xml
            //outputparam_detailcount++;
			mn_users_list += responseXMLNode[toplevelChildi].childNodes[0].textContent;
        }
    }
	mn_users_list += "</list>";
	fn_users_list={user_status:ret_upd,xmluserlist:mn_users_list};
	return fn_users_list;
}

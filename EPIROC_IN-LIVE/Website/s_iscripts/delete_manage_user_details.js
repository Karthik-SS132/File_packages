//Function to call delete_manage_user_details service
function executeService_delete_manage_user_details()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() + "common_modules/delete_manage_user_details.aspx";
    
	//Prepare delete_manage_user_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_delete_manage_user_details());
    
    if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
    {
        //Response xml contains error
        //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue
        //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue
        alert(responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
        return '1';
    }
    else
    {
        return processServiceResponseData_delete_manage_user_details(responseXML);
    }
    return false;
}

//Function to prepare delete_manage_user_details service request
function prepareServiceRequestData_delete_manage_user_details()
{
     var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_user_id>" + slctmul_userid + "</p_user_id>";  // Unicode string
	serviceDetails = serviceDetails + "<p_rec_tstamp>" + p_rec_tstamp + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	
    return serviceDetails;
}

//Code for processing output data from the service delete_manage_user_details
function processServiceResponseData_delete_manage_user_details(xmlDoc)
{
	var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue == 'SP001')
			{
				alert('User Details deleted successfully.');
			}
			else
			{
				alert('User Details deletion successfully.');
			}
        }
    }
}
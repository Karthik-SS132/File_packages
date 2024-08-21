/* 
 * This file contains invocation code snippets for executing the service validateclient. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service validateclient 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service validateclient
function executeService_validateclient(validateclient_object)
{
    var targetURL = cvs.cvsTargetURL + "validate_client.aspx";
    
    //Prepare validateclient service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_validateclient(validateclient_object));
    
    if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
    {
        //Response xml contains error
        //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue
        //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue
        alert(responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
        return false;
    }
    else
    {
        return processServiceResponseData_validateclient(responseXML);
    }
    return false;
}

//Code for preparing input data for the service validateclient
function prepareServiceRequestData_validateclient(validateclient_object)
{
    var serviceDetails = "";
    //Processing context segment
    serviceDetails += "<inputparam>";
    serviceDetails += "<client_id>" + getXmlString(validateclient_object.client_id) + "</client_id>"; //String
    serviceDetails += "<country_code>" + getXmlString(validateclient_object.country_code) + "</country_code>"; //String
    serviceDetails += "</inputparam>";
    return serviceDetails;
}

//Code for processing output data from the service validateclient
function processServiceResponseData_validateclient(xmlDoc)
{
	var return_value = "";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            return_value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_valid_client_ind
        }
    }
	return return_value;
}

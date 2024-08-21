/* 
 * This file contains invocation code snippets for executing the service retrieve_last_change_timestamp. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_last_change_timestamp 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_last_change_timestamp
function executeService_retrieve_last_change_timestamp(retrieve_last_change_timestamp_object)
{
    var targetURL = cvs.cvsTargetURL + "retrieve_last_change_timestamp.aspx";
    
    //Prepare retrieve_last_change_timestamp service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_last_change_timestamp(retrieve_last_change_timestamp_object));
    
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
        return processServiceResponseData_retrieve_last_change_timestamp(responseXML);
    }
    return false;
}

//Code for preparing input data for the service retrieve_last_change_timestamp
function prepareServiceRequestData_retrieve_last_change_timestamp(retrieve_last_change_timestamp_object)
{
    var serviceDetails = "";
    //Processing context segment
    serviceDetails += "<inputparam>";
    serviceDetails += "<client_id>" + getXmlString(retrieve_last_change_timestamp_object.client_id) + "</client_id>"; //String
    serviceDetails += "<country_code>" + getXmlString(retrieve_last_change_timestamp_object.country_code) + "</country_code>"; //String
    serviceDetails += "</inputparam>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_last_change_timestamp
function processServiceResponseData_retrieve_last_change_timestamp(xmlDoc)
{
	var return_value = [];
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
			return_value.push({
				client_functional_access_package_last_change_timestamp: responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue,
				client_functional_configuration_package_last_change_timestamp: responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue
			});
        }
    }
	return return_value;
}

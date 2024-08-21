/* 
 * This file contains invocation code snippets for executing the service activate_deactivate_device. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service activate_deactivate_device 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service activate_deactivate_device
function executeService_activate_deactivate_device(activate_deactivate_device_object)
{
    var targetURL = getWebserverpath() + "common_modules/activate_deactivate_device.aspx";
    
    //Prepare activate_deactivate_device service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_activate_deactivate_device(activate_deactivate_device_object));
    
    if (responseXML.getElementsByTagName("ApplicationException").length > 0)
    {
        //Output contains error
        var exceptionNode = responseXML.getElementsByTagName("ApplicationException")[0];
        var errorNumber = "", errorDescription = "";
        if(exceptionNode.childNodes[0].lastChild != null)
            errorNumber = exceptionNode.childNodes[0].lastChild.nodeValue;
        errorDescription = exceptionNode.childNodes[1].lastChild.nodeValue.replace(/'/g, "\'");
        if (errorNumber != "")
            errorNumber += ": ";
        alert(errorNumber + errorDescription);
        return false;
    }
    else
    {
        return processServiceResponseData_activate_deactivate_device(responseXML);
    }
    return false;
}

//Code for preparing input data for the service activate_deactivate_device
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_activate_deactivate_device(activate_deactivate_device_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_device_id>" + getXmlString(activate_deactivate_device_object.p_device_id) + "</p_device_id>";  // String
    serviceDetails = serviceDetails + "<p_activate_deactivate_ind>" + getXmlString(activate_deactivate_device_object.p_activate_deactivate_ind) + "</p_activate_deactivate_ind>";  // String
    serviceDetails = serviceDetails + "<p_rec_tstamp>" + getXmlString(activate_deactivate_device_object.p_rec_tstamp) + "</p_rec_tstamp>";  // UniqueIdentifier string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service activate_deactivate_device
function processServiceResponseData_activate_deactivate_device(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var returnValue;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            returnValue = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
	return returnValue;
}

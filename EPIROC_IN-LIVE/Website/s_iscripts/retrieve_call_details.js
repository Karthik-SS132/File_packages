/* 
 * This file contains invocation code snippets for executing the service retrieve_call_details. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_call_details 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_call_details
function executeService_retrieve_call_details()
{
    var targetURL = getWebserverpath() + "mservice/retrieve_call_details.aspx";
    
    //Prepare retrieve_call_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_call_details());
    
    if (responseXML.getElementsByTagName("ApplicationException").length > 0)
    {
        //Output contains error
        var exceptionNode = responseXML.getElementsByTagName("ApplicationException")[0];
        var errorNumber = "", errorDescription = "";
        errorNumber = exceptionNode.childNodes[0].lastChild.nodeValue;
        errorDescription = exceptionNode.childNodes[1].lastChild.nodeValue;
        if (errorNumber != "")
            errorNumber += ": ";
        alert(errorNumber + errorDescription);
        return '1';
    }
    else
    {
        return processServiceResponseData_retrieve_call_details(responseXML);
    }
    return '1';
}

//Code for preparing input data for the service retrieve_call_details
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_call_details()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_call_ref_no>" + selected_scall_no + "</p_call_ref_no>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_call_details
function processServiceResponseData_retrieve_call_details(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var call_details_obj = new Object();
	call_details_list = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";	
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            call_details_list += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_call_detail_xml
        }
    }
	call_details_list += "</list>";
	call_details_obj = {detail:call_details_list};
	return call_details_obj;
}

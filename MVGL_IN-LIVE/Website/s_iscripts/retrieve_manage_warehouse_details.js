/* 
 * This file contains invocation code snippets for executing the service retrieve_manage_warehouse_details. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_manage_warehouse_details 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_manage_warehouse_details
function executeService_retrieve_manage_warehouse_details()
{
    var targetURL = getWebserverpath() + "mservice/retrieve_manage_warehouse_details.aspx";
    
    //Prepare retrieve_manage_warehouse_details service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_warehouse_details());
    
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
        return processServiceResponseData_retrieve_manage_warehouse_details(responseXML);
    }
    return false;
}

//Code for preparing input data for the service retrieve_manage_warehouse_details
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_manage_warehouse_details()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_warehouse_id>" + getXmlString(warehouse_id) + "</p_warehouse_id>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_manage_warehouse_details
function processServiceResponseData_retrieve_manage_warehouse_details(xmlDoc)
{
	var retrieved_detail = "";
	retrieved_detail += "<?xml version=\"1.0\" encoding=\"UTF-8\"?><list>";
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
            retrieved_detail += responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_warehouse_detail_xml
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_retrieve_status
        }
    }
	retrieved_detail += "</list>";
	return retrieved_detail;
}

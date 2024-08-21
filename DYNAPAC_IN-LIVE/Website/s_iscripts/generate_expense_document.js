/* 
 * This file contains invocation code snippets for executing the service generate_expense_document. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service generate_expense_document 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service generate_expense_document
function executeService_generate_expense_document(generate_expense_document_object)
{
    var targetURL = getWebserverpath() + "common_modules/generate_expense_document.aspx";
    
    //Prepare generate_expense_document service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_generate_expense_document(generate_expense_document_object));
    
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
        return processServiceResponseData_generate_expense_document(responseXML);
    }
    return false;
}

//Code for preparing input data for the service generate_expense_document
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_generate_expense_document(generate_expense_document_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_call_jo_project_ind>" + getXmlString(generate_expense_document_object.p_call_jo_project_ind) + "</p_call_jo_project_ind>";  // String
    serviceDetails = serviceDetails + "<p_call_jo_project_ref_no>" + getXmlString(generate_expense_document_object.p_call_jo_project_ref_no) + "</p_call_jo_project_ref_no>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service generate_expense_document
function processServiceResponseData_generate_expense_document(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var returnValue = {};
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            returnValue.expense_doc_ref_no = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_expense_doc_ref_no
            returnValue.update_status = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_update_status
        }
    }
	return returnValue;
}

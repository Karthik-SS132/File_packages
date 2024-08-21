/* 
 * This file contains invocation code snippets for executing the service generate_invoice. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service generate_invoice 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service generate_invoice
function executeService_generate_invoice(generate_invoice_object)
{
    var targetURL = getWebserverpath() + "common_modules/generate_invoice.aspx";
    
    //Prepare generate_invoice service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_generate_invoice(generate_invoice_object));
    
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
        return processServiceResponseData_generate_invoice(responseXML);
    }
    return false;
}

//Code for preparing input data for the service generate_invoice
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_generate_invoice(generate_invoice_object)
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_expense_doc_no_string>" + getXmlString(generate_invoice_object.p_expense_doc_no_string) + "</p_expense_doc_no_string>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service generate_invoice
/*
  The code snippet given below is for binding the retrieved list segment to a HTML table. This snippet makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table need not be designed, beforehand itself, to contain as many rows as retrieved in the list segment; rows will 
     be dynamically added to the existing HTML table, by this code snippet
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derived through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_generate_invoice(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var outputparam_detailcount = 1;
    var first_outputparam_detail_item = true;
    var returnValue;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            returnValue = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
        }
    }
    /*for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
            //Delete existing table rows
            if (first_outputparam_detail_item) {
                deleteTableRows(document.getElementById('USER CONTROL'));
                first_outputparam_detail_item = false;
            }
            createTableRows(1, document.getElementById('USER CONTROL').rows[0].cells.length, document.getElementById('USER CONTROL'));
            
            document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_invoice_no
            document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_expense_doc_no
            outputparam_detailcount++;
        }
    }*/
	return returnValue;
}

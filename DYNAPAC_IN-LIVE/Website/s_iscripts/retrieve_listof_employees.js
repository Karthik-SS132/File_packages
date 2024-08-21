//Function to call retrieve_listof_employees service
function executeService_retrieve_listof_employees()
{
    var targetURL = getWebserverpath() + "common_modules/retrieve_listof_employees.aspx";
    
    //Prepare retrieve_listof_employees service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_listof_employees());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
            return false;
        }
        else
        {
            processServiceResponseData_retrieve_listof_employeesForIEBrowser(responseXML);
            return true;
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
            return false;
        }
        else
        {
            processServiceResponseData_retrieve_listof_employeesForNonIEBrowser(responseXML);
            return true;
        }
    }
    return false;
}

//Function to prepare retrieve_listof_employees service request
function prepareServiceRequestData_retrieve_listof_employees()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>";
    serviceDetails = serviceDetails + "<p_org_level_no_filter>" + getXmlString("ALL") + "</p_org_level_no_filter>";  // String
    serviceDetails = serviceDetails + "<p_org_level_code_filter>" + getXmlString("ALL") + "</p_org_level_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_location_code_filter>" + getXmlString("ALL") + "</p_location_code_filter>";  // Unicode string
    serviceDetails = serviceDetails + "<p_supervisor_emp_id_filter>" + getXmlString("ALL") + "</p_supervisor_emp_id_filter>";  // Unicode string
    serviceDetails = serviceDetails + "</inputparam>";
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_listof_employees service response ForIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_retrieve_listof_employeesForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
           // document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_employee_id
          //  document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].text; // p_employee_name
			employee_data.push({
				value:responseXMLNode[toplevelChildi].childNodes[0].text,
				text:responseXMLNode[toplevelChildi].childNodes[1].text
			});
		}
    }
}

//Function to process retrieve_listof_employees service response ForNonIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_retrieve_listof_employeesForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam")
        {
			//document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_employee_id
			// document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].textContent; // p_employee_name
        
			employee_data.push({
				value:responseXMLNode[toplevelChildi].childNodes[0].textContent,
				text:responseXMLNode[toplevelChildi].childNodes[1].textContent
			});
		}
    }
}

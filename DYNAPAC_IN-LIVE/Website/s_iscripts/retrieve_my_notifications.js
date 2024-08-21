//Function to call retrieve_my_notifications service
function executeService_retrieve_my_notifications()
{
	var retVal = isValidSession();
	 
	if ( retVal == 1)
	{
		alert('Invalid Session: You have not logged into the system');
		return '1';
	}
    var targetURL =   getWebserverpath() + "common_modules/retrieve_my_notifications.aspx";
    
    //Prepare retrieve_my_notifications service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_my_notifications());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
            return '1';
        }
        else
        {
            return processServiceResponseData_retrieve_my_notificationsForIEBrowser(responseXML);
            //return true;
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
            return '1';
        }
        else
        {
            return processServiceResponseData_retrieve_my_notificationsForNonIEBrowser(responseXML);
            //return true;
        }
    }
    return false;
}

//Function to prepare retrieve_my_notifications service request
function prepareServiceRequestData_retrieve_my_notifications()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_header segment
    serviceDetails = serviceDetails + "<inputparam_header>";
    serviceDetails = serviceDetails + "<p_last_retrieval_date>" + last_retrieval_date + "</p_last_retrieval_date>";  // String
    serviceDetails = serviceDetails + "<p_last_retrieval_hour>" + last_retrieval_hour + "</p_last_retrieval_hour>";  // String
    serviceDetails = serviceDetails + "<p_last_retrieval_minute>" + last_retrieval_min + "</p_last_retrieval_minute>";  // String
    serviceDetails = serviceDetails + "<p_last_retrieval_second>" + last_retrieval_sec + "</p_last_retrieval_second>";  // String
    serviceDetails = serviceDetails + "<p_notification_mode_filter>" + "APP" + "</p_notification_mode_filter>";  // String
    serviceDetails = serviceDetails + "</inputparam_header>";
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
	if(notification_arr[0].length != 0)
	{
    for (var inputparam_detaili = 0; inputparam_detaili < notification_arr.length; inputparam_detaili++)
    {
        serviceDetails = serviceDetails + "<inputparam_detail>";
		serviceDetails = serviceDetails + "<p_notification_id>" + notification_arr[inputparam_detaili][0] + "</p_notification_id>";  // Int32: -2147483648 to 2147483647
        serviceDetails = serviceDetails + "<p_delivery_date>" + notification_arr[inputparam_detaili][1] + "</p_delivery_date>";  // String
        serviceDetails = serviceDetails + "<p_delivery_hour>" + notification_arr[inputparam_detaili][2] + "</p_delivery_hour>";  // String
        serviceDetails = serviceDetails + "<p_delivery_minute>" + notification_arr[inputparam_detaili][3] + "</p_delivery_minute>";  // String
        serviceDetails = serviceDetails + "<p_delivery_second>" + notification_arr[inputparam_detaili][4] + "</p_delivery_second>";  // String
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
	}
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Function to process retrieve_my_notifications service response ForIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_retrieve_my_notificationsForIEBrowser(xmlDoc)
{
	//if(new_not_xml_ind == '')
	//{
		new_notification_xml = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><list>";
	//}
	retrieve_status ='';
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
	for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].text; // p_retrieval_date
          //  document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[1].text; // p_retrieval_hour
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[2].text; // p_retrieval_minute
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[3].text; // p_retrieval_second
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[4].text; // p_retrieval_status
			
			retrieve_status = responseXMLNode[toplevelChildi].childNodes[4].text; // p_retrieval_status
			
			/*if(retrieve_status == 'SP001')
			{			
			}
			else
			{*/
				last_retrieval_date = responseXMLNode[toplevelChildi].childNodes[0].text; // p_retrieval_date
				last_retrieval_hour = responseXMLNode[toplevelChildi].childNodes[1].text; // p_retrieval_hour
				last_retrieval_min = responseXMLNode[toplevelChildi].childNodes[2].text; // p_retrieval_minute
				last_retrieval_sec = responseXMLNode[toplevelChildi].childNodes[3].text; // p_retrieval_second
			//}
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
           // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_new_notification_id
           // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].text; // p_new_notification_xml
            //document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[2].text; // p_new_notification_event_code
			new_notification.push({
				new_notification_id:responseXMLNode[toplevelChildi].childNodes[0].text,
				//new_notification_xml:responseXMLNode[toplevelChildi].childNodes[1].text,
				new_notification_event_code:responseXMLNode[toplevelChildi].childNodes[2].text
			});
			
			//if(new_not_xml_ind == '')
			//{
				new_notification_xml += responseXMLNode[toplevelChildi].childNodes[1].textContent;
			//}
        }
    }
//	if(new_not_xml_ind == '')
	//{
		new_notification_xml += "</list>";
	//	new_not_xml_ind = '1';
	//}
}

//Function to process retrieve_my_notifications service response ForNonIEBrowser
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table would have as many rows as retrieved in the list segment
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_retrieve_my_notificationsForNonIEBrowser(xmlDoc)
{
	//if(new_not_xml_ind == '')
	//{
		new_notification_xml = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><list>";
	//}
	retrieve_status ='';
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_retrieval_date
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[1].textContent; // p_retrieval_hour
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[2].textContent; // p_retrieval_minute
           // document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[3].textContent; // p_retrieval_second
          //  document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[4].textContent; // p_retrieval_status
		  
		  retrieve_status = responseXMLNode[toplevelChildi].childNodes[4].textContent; // p_retrieval_status
			
			/*if(retrieve_status == 'SP001')
			{			
			}
			else
			{*/
				last_retrieval_date = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_retrieval_date
				last_retrieval_hour = responseXMLNode[toplevelChildi].childNodes[1].textContent; // p_retrieval_hour
				last_retrieval_min = responseXMLNode[toplevelChildi].childNodes[2].textContent; // p_retrieval_minute
				last_retrieval_sec = responseXMLNode[toplevelChildi].childNodes[3].textContent; // p_retrieval_second
			//}
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_detail")
        {
           // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_new_notification_id
           // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].textContent; // p_new_notification_xml
           // document.getElementById('USER CONTROL').rows[outputparam_detailcount].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[2].textContent; // p_new_notification_event_code
		   new_notification.push({
				new_notification_id:responseXMLNode[toplevelChildi].childNodes[0].textContent,
				//new_notification_xml:responseXMLNode[toplevelChildi].childNodes[1].textContent,
				new_notification_event_code:responseXMLNode[toplevelChildi].childNodes[2].textContent
			});
			
			//if(new_not_xml_ind == '')
		//	{
				new_notification_xml += responseXMLNode[toplevelChildi].childNodes[1].textContent;
			//}
        }
    }
	//if(new_not_xml_ind == '')
	//{
		new_notification_xml += "</list>";
	//	new_not_xml_ind = '1';
	//}
}

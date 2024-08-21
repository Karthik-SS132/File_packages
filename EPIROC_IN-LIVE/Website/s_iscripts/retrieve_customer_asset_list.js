//Function to call retrieve_customer_asset_list service
function executeService_retrieve_customer_asset_list()
{
var retVal = isValidSession();
	 
	 if ( retVal == 1)
	 {
	    alert('Invalid Session: You have not logged into the system');
		return '1';
	 }
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL = getWebserverpath() +"mservice/retrieve_customer_asset_list.aspx";
    
    //Prepare retrieve_customer_asset_list service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_customer_asset_list());
    
    if (window.ActiveXObject)
    {
        if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
        {
            //Response xml contains error
            //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].text
            //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].text
            alert(responseXML.documentElement.childNodes[0].childNodes[1].text);
			return "1";
        }
        else
        {
           return processServiceResponseData_retrieve_customer_asset_listForIEBrowser(responseXML);
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
			return "1";
        }
        else
        {
           return processServiceResponseData_retrieve_customer_asset_listForNonIEBrowser(responseXML);
        }
    }
}

//Function to prepare retrieve_customer_asset_list service request
function prepareServiceRequestData_retrieve_customer_asset_list()
{
	var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
	
    //Processing inputparam segment
    serviceDetails = serviceDetails + "<inputparam>"
    serviceDetails = serviceDetails + "<p_customer_id>" + getXmlString(cust) + "</p_customer_id>";  // String
    serviceDetails = serviceDetails + "</inputparam>"
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	return serviceDetails;
}

//Function to process retrieve_customer_asset_list service response ForIEBrowser
function processServiceResponseData_retrieve_customer_asset_listForIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
	
        if (responseXMLNode[toplevelChildi].nodeName == "outparam")
        {
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].text; // p_asset_id
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].text; // p_equipment_id
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[2].text; // p_asset_location_code
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[3].text; // p_equipment_description
			//document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[4].text; // p_org_level_no
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[5].text; // p_org_level_code
			
			if(assetid==responseXMLNode[toplevelChildi].childNodes[0].text)
			{
			equipmentid=responseXMLNode[toplevelChildi].childNodes[1].text;
			assetloc=responseXMLNode[toplevelChildi].childNodes[2].text;
			equipmentdesc=responseXMLNode[toplevelChildi].childNodes[3].text;
			}
			else
			{
			customerasset_data.push({
			asset_id:responseXMLNode[toplevelChildi].childNodes[0].text,
			equipment_id:responseXMLNode[toplevelChildi].childNodes[1].text,
			asset_location:responseXMLNode[toplevelChildi].childNodes[2].text,
			equipment_desc:responseXMLNode[toplevelChildi].childNodes[3].text
			});
			}
			asset_eq_srvcorg_data.push({
				asset_id:responseXMLNode[toplevelChildi].childNodes[0].text,
				equipment_id:responseXMLNode[toplevelChildi].childNodes[1].text,
				equipment_desc:responseXMLNode[toplevelChildi].childNodes[3].text,
				org_level_no:responseXMLNode[toplevelChildi].childNodes[4].text,
				org_level_code:responseXMLNode[toplevelChildi].childNodes[5].text
			});
		}
    }
}

//Function to process retrieve_customer_asset_list service response ForNonIEBrowser
function processServiceResponseData_retrieve_customer_asset_listForNonIEBrowser(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
		
        if (responseXMLNode[toplevelChildi].nodeName == "outparam")
        {
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[0].textContent; // p_asset_id
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[1].textContent; // p_equipment_id
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[2].textContent; // p_asset_location_code
            //document.getElementById('USER CONTROL').rows[toplevelChildi].cells[COLNO].innerHTML = responseXMLNode[toplevelChildi].childNodes[3].textContent; // p_equipment_description
			if(assetid==responseXMLNode[toplevelChildi].childNodes[0].textContent)
			{
			equipmentid=responseXMLNode[toplevelChildi].childNodes[1].textContent;
			assetloc=responseXMLNode[toplevelChildi].childNodes[2].textContent;
			equipmentdesc=responseXMLNode[toplevelChildi].childNodes[3].textContent;
			}
			else
			{
			customerasset_data.push({
			asset_id:responseXMLNode[toplevelChildi].childNodes[0].textContent,
			equipment_id:responseXMLNode[toplevelChildi].childNodes[1].textContent,
			asset_location:responseXMLNode[toplevelChildi].childNodes[2].textContent,
			equipment_desc:responseXMLNode[toplevelChildi].childNodes[3].textContent
			});
			}
			asset_eq_srvcorg_data.push({
				asset_id:responseXMLNode[toplevelChildi].childNodes[0].textContent,
				equipment_id:responseXMLNode[toplevelChildi].childNodes[1].textContent,
				equipment_desc:responseXMLNode[toplevelChildi].childNodes[3].textContent,
				org_level_no:responseXMLNode[toplevelChildi].childNodes[4].textContent,
				org_level_code:responseXMLNode[toplevelChildi].childNodes[5].textContent
			});
		}
    }
}

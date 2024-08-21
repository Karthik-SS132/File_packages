//Function to call transform_xml_to_html service
function executeService_transform_xml_to_html(xmldoc, xslfile)
{
    //Replace ~webserverpath~ with appropriate physical server address
    var targetURL =  getWebserverpath() +"common_modules/ConvertXMLtoHTML.aspx?xsl="+escape(xslfile);
	
    var responseText = transform_xml_to_html(targetURL, xmldoc);
    
	return responseText;
    
}
function transform_xml_to_html(targetURL, serviceDetails)
{

    var xmlhttp;
    //Code for IE
    if (window.ActiveXObject)
    {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else if (window.XMLHttpRequest)  //Code for other browsers like FIREFOX/OPERA
    {
        xmlhttp = new XMLHttpRequest();
    }
    try { 
		
        xmlhttp.open("POST", targetURL, false);
        xmlhttp.setRequestHeader("Content-Type", "text/xml");
        xmlhttp.send(serviceDetails);
    }
    catch (err) {
        alert("Error encountered during service execution");
        return false;
    }

    return xmlhttp.responseText;
}

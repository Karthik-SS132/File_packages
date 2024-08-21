/* 
 * This file contains invocation code snippets for executing the service save_manage_organogram. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service save_manage_organogram 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service save_manage_organogram
function executeService_save_manage_organogram()
{
    var targetURL = getWebserverpath() + "common_modules/save_manage_organogram.aspx";
    
    //Prepare save_manage_organogram service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_save_manage_organogram());
    
    if (responseXML.documentElement.childNodes[0].nodeName == "UADSApplicationExceptionClass")
    {
        //Response xml contains error
        //ErrorDescription:  responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue
        //Error no:  responseXML.documentElement.childNodes[0].childNodes[0].lastChild.nodeValue
        alert(responseXML.documentElement.childNodes[0].childNodes[1].lastChild.nodeValue);
        return '1';
    }
    else
    {
        return processServiceResponseData_save_manage_organogram(responseXML);
    }
    return '1';
}

//Code for preparing input data for the service save_manage_organogram
function prepareServiceRequestData_save_manage_organogram()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    
    //Processing inputparam_detail segment
    //Here USER CONTROL refers to control from where segment dataitems should have to be bound
    for (var inputparam_detaili = 0; inputparam_detaili < organogram_tview.dataSource.transport.data.length; inputparam_detaili++)
    {
        var inputparam_detailKeyString = organogram_tview.dataSource._data[0].text;
        serviceDetails = serviceDetails + "<inputparam_detail>";
        serviceDetails = serviceDetails + "<p_level1_code>" + organogram_tview.dataSource.transport.data[0].inv[1].text + "</p_level1_code>";  // Unicode string
        serviceDetails = serviceDetails + "<p_level1_head_emp_id>" + organogram_tview.dataSource.transport.data[0].inv[0].text + "</p_level1_head_emp_id>";  // Unicode string
        serviceDetails = serviceDetails + "<p_level1_code_description>" + getXmlString(organogram_tview.dataSource._data[0].text) + "</p_level1_code_description>";  // Unicode string
        serviceDetails = serviceDetails + "<p_level1_crud_ind>" + organogram_tview.dataSource.transport.data[0].inv[2].text + "</p_level1_crud_ind>";  // String
        
        //Processing level1_supervisor segment
        //Here USER CONTROL refers to control from where segment dataitems should have to be bound
        for (var level1_supervisori = 0; level1_supervisori < organogram_tview.dataSource.transport.data[0].items[0].items.length - 1; level1_supervisori++)
        {
            if (organogram_tview.dataSource._data[0].text == inputparam_detailKeyString)
            {
                serviceDetails = serviceDetails + "<level1_supervisor>";
                serviceDetails = serviceDetails + "<p_level1_supervisor_emp_id>" + organogram_tview.dataSource.transport.data[0].items[0].items[level1_supervisori].text + "</p_level1_supervisor_emp_id>";  // Unicode string
                serviceDetails = serviceDetails + "<p_level1_supervisor_crud_ind>" + organogram_tview.dataSource.transport.data[0].items[0].items[level1_supervisori].inv[0].text + "</p_level1_supervisor_crud_ind>";  // String
                serviceDetails = serviceDetails + "</level1_supervisor>";
            }
        }
        
        //Processing level2 segment
        //Here USER CONTROL refers to control from where segment dataitems should have to be bound
        for (var level2i = 1; level2i < organogram_tview.dataSource.transport.data[0].items.length - 1; level2i++)
        {
            if (organogram_tview.dataSource._data[0].text == inputparam_detailKeyString)
            {
                var level2KeyString = organogram_tview.dataSource.transport.data[0].items[level2i].items[0].text;
                serviceDetails = serviceDetails + "<level2>";
                serviceDetails = serviceDetails + "<p_level2_code>" + organogram_tview.dataSource.transport.data[0].items[level2i].inv[1].text + "</p_level2_code>";  // Unicode string
                serviceDetails = serviceDetails + "<p_level2_head_emp_id>" + organogram_tview.dataSource.transport.data[0].items[level2i].inv[0].text + "</p_level2_head_emp_id>";  // Unicode string
                serviceDetails = serviceDetails + "<p_level2_code_description>" + getXmlString(organogram_tview.dataSource.transport.data[0].items[level2i].text) + "</p_level2_code_description>";  // Unicode string
                serviceDetails = serviceDetails + "<p_level2_crud_ind>" + organogram_tview.dataSource.transport.data[0].items[level2i].inv[2].text + "</p_level2_crud_ind>";  // String
                
                //Processing level2_supervisor segment
                //Here USER CONTROL refers to control from where segment dataitems should have to be bound
                for (var level2_supervisori = 0; level2_supervisori < organogram_tview.dataSource.transport.data[0].items[level2i].items[0].items.length - 1; level2_supervisori++)
                {
                    if (organogram_tview.dataSource._data[0].text == inputparam_detailKeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[0].text == level2KeyString)
                    {
                        serviceDetails = serviceDetails + "<level2_supervisor>";
                        serviceDetails = serviceDetails + "<p_level2_supervisor_emp_id>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[0].items[level2_supervisori].text + "</p_level2_supervisor_emp_id>";  // Unicode string
                        serviceDetails = serviceDetails + "<p_level2_supervisor_crud_ind>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[0].items[level2_supervisori].inv[0].text + "</p_level2_supervisor_crud_ind>";  // String
                        serviceDetails = serviceDetails + "</level2_supervisor>";
                    }
                }
                
                //Processing level3 segment
                //Here USER CONTROL refers to control from where segment dataitems should have to be bound
                for (var level3i = 1; level3i < organogram_tview.dataSource.transport.data[0].items[level2i].items.length - 1; level3i++)
                {
                    if (organogram_tview.dataSource._data[0].text == inputparam_detailKeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[0].text == level2KeyString)
                    {
                       var level3KeyString = organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[0].text;
                        serviceDetails = serviceDetails + "<level3>";
                        serviceDetails = serviceDetails + "<p_level3_code>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].inv[1].text + "</p_level3_code>";  // Unicode string
                        serviceDetails = serviceDetails + "<p_level3_head_emp_id>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].inv[0].text + "</p_level3_head_emp_id>";  // Unicode string
                        serviceDetails = serviceDetails + "<p_level3_code_description>" + getXmlString(organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].text) + "</p_level3_code_description>";  // Unicode string
                        serviceDetails = serviceDetails + "<p_level3_crud_ind>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].inv[2].text + "</p_level3_crud_ind>";  // String
                        
                        //Processing level3_supervisor segment
                        //Here USER CONTROL refers to control from where segment dataitems should have to be bound
                        for (var level3_supervisori = 0; level3_supervisori <organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[0].items.length - 1; level3_supervisori++)
                        {
                            if (organogram_tview.dataSource._data[0].text == inputparam_detailKeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[0].text == level2KeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[0].text == level3KeyString)
                            {
                                serviceDetails = serviceDetails + "<level3_supervisor>";
                                serviceDetails = serviceDetails + "<p_level3_supervisor_emp_id>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[0].items[level3_supervisori].text + "</p_level3_supervisor_emp_id>";  // Unicode string
                                serviceDetails = serviceDetails + "<p_level3_supervisor_crud_ind>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[0].items[level3_supervisori].inv[0].text + "</p_level3_supervisor_crud_ind>";  // String
                                serviceDetails = serviceDetails + "</level3_supervisor>";
                            }
                        }
                        
                        //Processing level4 segment
                        //Here USER CONTROL refers to control from where segment dataitems should have to be bound
                        for (var level4i = 1; level4i < organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items.length - 1; level4i++)
                        {
                            if (organogram_tview.dataSource._data[0].text == inputparam_detailKeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[0].text == level2KeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[0].text == level3KeyString)
                            {
                                var level4KeyString = organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[0].text;
                                serviceDetails = serviceDetails + "<level4>";
                                serviceDetails = serviceDetails + "<p_level4_code>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].inv[1].text + "</p_level4_code>";  // Unicode string
                                serviceDetails = serviceDetails + "<p_level4_head_emp_id>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].inv[0].text + "</p_level4_head_emp_id>";  // Unicode string
                                serviceDetails = serviceDetails + "<p_level4_code_description>" + getXmlString(organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].text) + "</p_level4_code_description>";  // Unicode string
                                serviceDetails = serviceDetails + "<p_level4_crud_ind>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].inv[2].text + "</p_level4_crud_ind>";  // String
                                
                                //Processing level4_supervisor segment
                                //Here USER CONTROL refers to control from where segment dataitems should have to be bound
                                for (var level4_supervisori = 0; level4_supervisori < organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[0].items.length - 1; level4_supervisori++)
                                {
                                    if (organogram_tview.dataSource._data[0].text == inputparam_detailKeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[0].text == level2KeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[0].text == level3KeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[0].text == level4KeyString)
                                    {
                                        serviceDetails = serviceDetails + "<level4_supervisor>";
                                        serviceDetails = serviceDetails + "<p_level4_supervisor_emp_id>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[0].items[level4_supervisori].text + "</p_level4_supervisor_emp_id>";  // Unicode string
                                        serviceDetails = serviceDetails + "<p_level4_supervisor_crud_ind>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[0].items[level4_supervisori].inv[0].text + "</p_level4_supervisor_crud_ind>";  // String
                                        serviceDetails = serviceDetails + "</level4_supervisor>";
                                    }
                                }
                                
                                //Processing level5 segment
                                //Here USER CONTROL refers to control from where segment dataitems should have to be bound
                                for (var level5i = 1; level5i < organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items.length - 1; level5i++)
                                {
                                    if (organogram_tview.dataSource._data[0].text == inputparam_detailKeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[0].text == level2KeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[0].text == level3KeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[0].text == level4KeyString)
                                    {
                                        var level5KeyString = organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[level5i].items[0].text;
                                        serviceDetails = serviceDetails + "<level5>";
                                        serviceDetails = serviceDetails + "<p_level5_code>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[level5i].inv[1].text + "</p_level5_code>";  // Unicode string
                                        serviceDetails = serviceDetails + "<p_level5_head_emp_id>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[level5i].inv[0].text + "</p_level5_head_emp_id>";  // Unicode string
                                        serviceDetails = serviceDetails + "<p_level5_code_description>" + getXmlString(organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[level5i].text) + "</p_level5_code_description>";  // Unicode string
                                        serviceDetails = serviceDetails + "<p_level5_crud_ind>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[level5i].inv[2].text + "</p_level5_crud_ind>";  // String
                                        
                                        //Processing level5_supervisor segment
                                        //Here USER CONTROL refers to control from where segment dataitems should have to be bound
                                        for (var level5_supervisori = 0; level5_supervisori < organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[level5i].items[0].items.length - 1; level5_supervisori++)
                                        {
                                            if (organogram_tview.dataSource._data[0].text == inputparam_detailKeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[0].text == level2KeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[0].text == level3KeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[0].text == level4KeyString && organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[level5i].items[0].text == level5KeyString)
                                            {
                                                serviceDetails = serviceDetails + "<level5_supervisor>";
                                                serviceDetails = serviceDetails + "<p_level5_supervisor_emp_id>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[level5i].items[0].items[level5_supervisori].text + "</p_level5_supervisor_emp_id>";  // Unicode string
                                                serviceDetails = serviceDetails + "<p_level5_supervisor_crud_ind>" + organogram_tview.dataSource.transport.data[0].items[level2i].items[level3i].items[level4i].items[level5i].items[0].items[level5_supervisori].inv[0].text + "</p_level5_supervisor_crud_ind>";  // String
                                                serviceDetails = serviceDetails + "</level5_supervisor>";
                                            }
                                        }
                                        serviceDetails = serviceDetails + "</level5>";
                                    }
                                }
                                serviceDetails = serviceDetails + "</level4>";
                            }
                        }
                        serviceDetails = serviceDetails + "</level3>";
                    }
                }
                serviceDetails = serviceDetails + "</level2>";
            }
        }
        serviceDetails = serviceDetails + "</inputparam_detail>";
    }
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
	console.log(serviceDetails);
    return serviceDetails;
}

//Code for processing output data from the service save_manage_organogram
function processServiceResponseData_save_manage_organogram(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_update_status
			if(responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue == 'SP001')
			{
				alert('Organogram saved successfully.');
			}
			else
			{
				alert('Saving organogram failed.');
			}
        }
    }
}

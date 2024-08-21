/* 
 * This file contains invocation code snippets for executing the service retrieve_manage_organogram. These code snippets have been organized as three
 * seperate functions. Include these snippet file reference in the html/aspx page or javascript file from where the service retrieve_manage_organogram 
 * would be invoked. Substitute USER CONTROL tokens in these snippets, with corresponding user control references of the html/aspx page.
 */

//Code for executing the service retrieve_manage_organogram
function executeService_retrieve_manage_organogram()
{
    var targetURL = getWebserverpath() + "common_modules/retrieve_manage_organogram.aspx";
    
    //Prepare retrieve_manage_organogram service request and invoke service 
    var responseXML = executeService(targetURL, prepareServiceRequestData_retrieve_manage_organogram());
    
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
        return false;
    }
    else
    {
        return processServiceResponseData_retrieve_manage_organogram(responseXML);
    }
    return false;
}

//Code for preparing input data for the service retrieve_manage_organogram
/* 
 * In the following code snippet, the code to get the user control values, viz., proxyInstance.getXmlString, assumes 
 * that the user control values need to be xml-encoded before forming the service input document. If the values are 
 * already encoded while being read from the user controls, then the function proxyInstance.getXmlString is not needed 
 * and the values as obtained from the controls must be directly used for forming the service input.
 */
function prepareServiceRequestData_retrieve_manage_organogram()
{
    var serviceDetails;
    serviceDetails = "<document>";
    
    //Processing context segment
    serviceDetails = serviceDetails + getContextElements();
    serviceDetails = serviceDetails + "</context>";
    serviceDetails = serviceDetails + "</document>";
    return serviceDetails;
}

//Code for processing output data from the service retrieve_manage_organogram
/*
  The code snippet given below for binding list segments to datagrids/tables, makes the following assumptions:
  a. A static HTML table would be present on the form to hold the list segment data
  b. Each cell (row-column intersection) in the HTML table would hold the bound data as innerHTML text;
     logic for representing the data in specific controls like TextInput, Calendar, etc., would have to be separately coded.
  c. The static HTML table no need to have as many rows as retrieved in the list segment; rows will be added dynamically 
     to the existing table
 
  If there are hidden column(s) in the static HTML table for which data is not retrieved in the list segment 
  but would be derieved through front-end logic, such logic should be manually included inside the code snippet given below.
 */
function processServiceResponseData_retrieve_manage_organogram(xmlDoc)
{
    var responseXMLNode = xmlDoc.documentElement.childNodes[0].childNodes;
    var level1count = 1;
    var first_level1_item = true;
    var level1_supervisorcount = 1;
    var first_level1_supervisor_item = true;
    var level2count = 1;
    var first_level2_item = true;
    var level2_supervisorcount = 1;
    var first_level2_supervisor_item = true;
    var level3count = 1;
    var first_level3_item = true;
    var level3_supervisorcount = 1;
    var first_level3_supervisor_item = true;
    var level4count = 1;
    var first_level4_item = true;
    var level4_supervisorcount = 1;
    var first_level4_supervisor_item = true;
    var level5count = 1;
    var first_level5_item = true;
    var level5_supervisorcount = 1;
    var first_level5_supervisor_item = true;
	
	var returnValue = {};
	var organogramDataArray = [];
    
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "outputparam_header")
        {
            returnValue.noOfOrgLevels = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_no_of_org_levels
            //document.getElementById('USER CONTROL').value = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_retrieve_status
        }
    }
    for (var toplevelChildi = 0; toplevelChildi < responseXMLNode.length; toplevelChildi++)
    {
        if (responseXMLNode[toplevelChildi].nodeName == "level1")
        {
			var level1_details = {};
            level1_details.levelCode = responseXMLNode[toplevelChildi].childNodes[0].lastChild.nodeValue; // p_level1_code
			if (responseXMLNode[toplevelChildi].childNodes[1].hasChildNodes())
			{
				level1_details.headEmployeeID = responseXMLNode[toplevelChildi].childNodes[1].lastChild.nodeValue; // p_level1_head_emp_id
			}
			else
			{
				level1_details.headEmployeeID = "";
			}
            level1_details.text = responseXMLNode[toplevelChildi].childNodes[2].lastChild.nodeValue; // p_level1_code_description
            level1_details.crudIndicator = responseXMLNode[toplevelChildi].childNodes[3].lastChild.nodeValue; // p_level1_crud_ind
			level1_details.levelNumber = 1;
			level1_details.type = "LEVEL";
            level1count++;
            
            var level1KeyDataItem = responseXMLNode[toplevelChildi].childNodes[3].lastChild.nodeValue;
            var level1 = responseXMLNode[toplevelChildi].childNodes;
			
			var level1_items = [];
			var level1_supervisor_object = {text: "Supervisor"};
			var level1_supervisor_items = [];
            for (var level1Childi = 0; level1Childi < level1.length; level1Childi++)
            {
                if (level1[level1Childi].nodeName == "level1_supervisor")
                {
					var level1_supervisor_items_object = {};
                    level1_supervisor_items_object.value = level1[level1Childi].childNodes[0].lastChild.nodeValue; // p_level1_supervisor_emp_id
					level1_supervisor_items_object.text = GetCodeDescriptionValue('EMPLOYEE', level1[level1Childi].childNodes[0].lastChild.nodeValue, ''); 
                    level1_supervisor_items_object.supervisorCrudIndicator = level1[level1Childi].childNodes[1].lastChild.nodeValue; // p_level1_supervisor_crud_ind
                    level1_supervisorcount++;
					level1_supervisor_items_object.levelNumber = 1;
					level1_supervisor_items_object.type = "SUPERVISOR";				
					level1_supervisor_items.push(level1_supervisor_items_object);
                }
            }			
			level1_supervisor_items.push({text: "ADD", levelNumber: 1, type: "SUPERVISOR"});
			level1_supervisor_object.items = level1_supervisor_items;
			level1_items.push(level1_supervisor_object);
			
            for (var level1Childi = 0; level1Childi < level1.length; level1Childi++)
            {
                if (level1[level1Childi].nodeName == "level2")
                {	
					var level2_details = {};
                    level2_details.levelCode = level1[level1Childi].childNodes[0].lastChild.nodeValue; // p_level2_code
					if (level1[level1Childi].childNodes[1].hasChildNodes())
					{
						level2_details.headEmployeeID = level1[level1Childi].childNodes[1].lastChild.nodeValue; // p_level2_head_emp_id
					}
					else
					{
						level2_details.headEmployeeID = "";
					}
                    level2_details.text = level1[level1Childi].childNodes[2].lastChild.nodeValue; // p_level2_code_description
                    level2_details.crudIndicator = level1[level1Childi].childNodes[3].lastChild.nodeValue; // p_level2_crud_ind
					level2_details.levelNumber = 2;
					level2_details.type = "LEVEL";
                    level2count++;
                    
                    var level2KeyDataItem = level1[level1Childi].childNodes[3].lastChild.nodeValue;
                    var level2 = level1[level1Childi].childNodes;
					
					var level2_items = [];
					var level2_supervisor_object = {text: "Supervisor"};
					var level2_supervisor_items = [];					
                    for (var level2Childi = 0; level2Childi < level2.length; level2Childi++)
                    {
                        if (level2[level2Childi].nodeName == "level2_supervisor")
                        {
							var level2_supervisor_items_object = {};
                            level2_supervisor_items_object.value = level2[level2Childi].childNodes[0].lastChild.nodeValue; // p_level2_supervisor_emp_id
							level2_supervisor_items_object.text = GetCodeDescriptionValue('EMPLOYEE', level2[level2Childi].childNodes[0].lastChild.nodeValue, ''); 
							
							
                            level2_supervisor_items_object.supervisorCrudIndicator = level2[level2Childi].childNodes[1].lastChild.nodeValue; // p_level2_supervisor_crud_ind
                            level2_supervisorcount++;
							level2_supervisor_items_object.levelNumber = 2;
							level2_supervisor_items_object.type = "SUPERVISOR";
							level2_supervisor_items.push(level2_supervisor_items_object);
                        }
                    }					
					level2_supervisor_items.push({text: "ADD", levelNumber: 2, type: "SUPERVISOR"});
					level2_supervisor_object.items = level2_supervisor_items;
					level2_items.push(level2_supervisor_object);
					
                    for (var level2Childi = 0; level2Childi < level2.length; level2Childi++)
                    {
                        if (level2[level2Childi].nodeName == "level3")
                        {
							var level3_details = {};							
                            level3_details.levelCode = level2[level2Childi].childNodes[0].lastChild.nodeValue; // p_level3_code
							if (level2[level2Childi].childNodes[1].hasChildNodes())
							{
								level3_details.headEmployeeID = level2[level2Childi].childNodes[1].lastChild.nodeValue; // p_level3_head_emp_id
							}
							else
							{
								level3_details.headEmployeeID = "";
							}
                            level3_details.text = level2[level2Childi].childNodes[2].lastChild.nodeValue; // p_level3_code_description
                            level3_details.crudIndicator = level2[level2Childi].childNodes[3].lastChild.nodeValue; // p_level3_crud_ind
							level3_details.levelNumber = 3;
							level3_details.type = "LEVEL";
                            level3count++;
                            
                            var level3KeyDataItem = level2[level2Childi].childNodes[3].lastChild.nodeValue;
                            var level3 = level2[level2Childi].childNodes;
							
							var level3_items = [];
							var level3_supervisor_object = {text: "Supervisor"};
							var level3_supervisor_items = [];	
                            for (var level3Childi = 0; level3Childi < level3.length; level3Childi++)
                            {
                                if (level3[level3Childi].nodeName == "level3_supervisor")
                                {
									var level3_supervisor_items_object = {};
                                    level3_supervisor_items_object.value = level3[level3Childi].childNodes[0].lastChild.nodeValue; // p_level3_supervisor_emp_id
									level3_supervisor_items_object.text = GetCodeDescriptionValue('EMPLOYEE', level3[level3Childi].childNodes[0].lastChild.nodeValue, ''); 
								  level3_supervisor_items_object.supervisorCrudIndicator = level3[level3Childi].childNodes[1].lastChild.nodeValue; // p_level3_supervisor_crud_ind
                                    level3_supervisorcount++;
									level3_supervisor_items_object.levelNumber = 3;
									level3_supervisor_items_object.type = "SUPERVISOR";
									level3_supervisor_items.push(level3_supervisor_items_object);
                                }
                            }							
							level3_supervisor_items.push({text: "ADD", levelNumber: 3, type: "SUPERVISOR"});
							level3_supervisor_object.items = level3_supervisor_items;
							level3_items.push(level3_supervisor_object);
							
                            for (var level3Childi = 0; level3Childi < level3.length; level3Childi++)
                            {
                                if (level3[level3Childi].nodeName == "level4")
                                {
									var level4_details = {};
                                    level4_details.levelCode = level3[level3Childi].childNodes[0].lastChild.nodeValue; // p_level4_code
									if (level3[level3Childi].childNodes[1].hasChildNodes())
									{
										level4_details.headEmployeeID = level3[level3Childi].childNodes[1].lastChild.nodeValue; // p_level4_head_emp_id
									}
									else
									{
										level4_details.headEmployeeID = "";
									}
                                    level4_details.text = level3[level3Childi].childNodes[2].lastChild.nodeValue; // p_level4_code_description
                                    level4_details.crudIndicator = level3[level3Childi].childNodes[3].lastChild.nodeValue; // p_level4_crud_ind
									level4_details.levelNumber = 4;
									level4_details.type = "LEVEL";
                                    level4count++;
                                    
                                    var level4KeyDataItem = level3[level3Childi].childNodes[3].lastChild.nodeValue;
                                    var level4 = level3[level3Childi].childNodes;
									
									var level4_items = [];
									var level4_supervisor_object = {text: "Supervisor"};
									var level4_supervisor_items = [];
                                    for (var level4Childi = 0; level4Childi < level4.length; level4Childi++)
                                    {
                                        if (level4[level4Childi].nodeName == "level4_supervisor")
                                        {
											var level4_supervisor_items_object = {};
											 level4_supervisor_items_object.value = level4[level4Childi].childNodes[0].lastChild.nodeValue; // p_level4_supervisor_emp_id
                                            level4_supervisor_items_object.text = GetCodeDescriptionValue('EMPLOYEE', level4[level4Childi].childNodes[0].lastChild.nodeValue, ''); 
											level4_supervisor_items_object.supervisorCrudIndicator = level4[level4Childi].childNodes[1].lastChild.nodeValue; // p_level4_supervisor_crud_ind
                                            level4_supervisorcount++;
											level4_supervisor_items_object.levelNumber = 4;
											level4_supervisor_items_object.type = "SUPERVISOR";
											level4_supervisor_items.push(level4_supervisor_items_object);
                                        }
                                    }									
									level4_supervisor_items.push({text: "ADD", levelNumber: 4, type: "SUPERVISOR"});
									level4_supervisor_object.items = level4_supervisor_items;
									level4_items.push(level4_supervisor_object);
									
                                    for (var level4Childi = 0; level4Childi < level4.length; level4Childi++)
                                    {
                                        if (level4[level4Childi].nodeName == "level5")
                                        {
											var level5_details = {};
                                            level5_details.levelCode = level4[level4Childi].childNodes[0].lastChild.nodeValue; // p_level5_code
											if (level4[level4Childi].childNodes[1].hasChildNodes())
											{
												level5_details.headEmployeeID = level4[level4Childi].childNodes[1].lastChild.nodeValue; // p_level5_head_emp_id
											}
											else
											{
												level5_details.headEmployeeID = "";
											}
                                            level5_details.text = level4[level4Childi].childNodes[2].lastChild.nodeValue; // p_level5_code_description
                                            level5_details.crudIndicator = level4[level4Childi].childNodes[3].lastChild.nodeValue; // p_level5_crud_ind
											level5_details.levelNumber = 5;
											level5_details.type = "LEVEL";
                                            level5count++;
                                            
                                            var level5KeyDataItem = level4[level4Childi].childNodes[3].lastChild.nodeValue;
                                            var level5 = level4[level4Childi].childNodes;
											
											var level5_items = [];
											var level5_supervisor_object = {text: "Supervisor"};
											var level5_supervisor_items = [];											
                                            for (var level5Childi = 0; level5Childi < level5.length; level5Childi++)
                                            {
                                                if (level5[level5Childi].nodeName == "level5_supervisor")
                                                {
													var level5_supervisor_items_object = {};
                                                   level5_supervisor_items_object.value = level5[level5Childi].childNodes[0].lastChild.nodeValue; // p_level5_supervisor_emp_id
                                                    level5_supervisor_items_object.text = GetCodeDescriptionValue('EMPLOYEE', level5[level5Childi].childNodes[0].lastChild.nodeValue, ''); 
													level5_supervisor_items_object.supervisorCrudIndicator = level5[level5Childi].childNodes[1].lastChild.nodeValue; // p_level5_supervisor_crud_ind
                                                    level5_supervisorcount++;
													level5_supervisor_items_object.levelNumber = 5;
													level5_supervisor_items_object.type = "SUPERVISOR";
													level5_supervisor_items.push(level5_supervisor_items_object);
                                                }
                                            }
											level5_supervisor_items.push({text: "ADD", levelNumber: 5, type: "SUPERVISOR"});
											level5_supervisor_object.items = level5_supervisor_items;
											level5_items.push(level5_supervisor_object);
											level5_details.items = level5_items;
											level4_items.push(level5_details);
                                        }
                                    }
									if (parseInt(returnValue.noOfOrgLevels) > 4)
									{
										level4_items.push({text: "ADD LEVEL 5", levelNumber: 5, type: "LEVEL"});
									}
									level4_details.items = level4_items;
									level3_items.push(level4_details);
                                }
                            }
							if (parseInt(returnValue.noOfOrgLevels) > 3)
							{
								level3_items.push({text: "ADD LEVEL 4", levelNumber: 4, type: "LEVEL"});
							}
							level3_details.items = level3_items;
							level2_items.push(level3_details);
                        }
                    }
					if (parseInt(returnValue.noOfOrgLevels) > 2)
					{
						level2_items.push({text: "ADD LEVEL 3", levelNumber: 3, type: "LEVEL"});
					}
					level2_details.items = level2_items;
					level1_items.push(level2_details);
                }
            }
			if (parseInt(returnValue.noOfOrgLevels) > 1)
			{
				level1_items.push({text: "ADD LEVEL 2", levelNumber: 2, type: "LEVEL"});
			}
			level1_details.items = level1_items;
			organogramDataArray.push(level1_details);
        }
    }
	if (organogramDataArray.length == 0)
	{
		organogramDataArray.push({text: "ADD LEVEL 1", levelNumber: 1, type: "LEVEL"});
	}
	returnValue.organogramData = organogramDataArray;
	return returnValue;
}

function GetGridColumns(sectionID,GRID_ID,favourite) {			
	var columnArray = [], detailNode, fieldNodes, displayNode, fieldID, widthNode, templateNode;
	
	if (sectionID.substring(0,6) == "report") {
		detailNode = xmlDocREPORT.getElementsByTagName(sectionID);
	}
	else {
		detailNode = xmlDocUI.getElementsByTagName(sectionID);
	}
	if (detailNode.length != 0) {
		fieldNodes = detailNode[0].getElementsByTagName("field");
		if(favourite == true)
		{
			userPreferenceString = retrievingUserPreferences();
			var length = 0;
			
			Favoutiteobj = $.grep(userPreferenceString,function(element,index){  
				userPreferenceObject = JSON.parse(element.preference_json);	
				return element.preference_area == 'GRID' && userPreferenceObject['grid_id']  == GRID_ID
			});
			if (Favoutiteobj.length != 0) {			
				for(var preferenStrCtr = 0 ;preferenStrCtr<Favoutiteobj.length;preferenStrCtr++)
				{
					if ( Favoutiteobj[preferenStrCtr]['preference_json'] != undefined && Favoutiteobj[preferenStrCtr]['preference_json'] != "") 
					{
						userPreferenceObject = JSON.parse(Favoutiteobj[preferenStrCtr]['preference_json']);		
						$.each(userPreferenceObject,function(fieldID,fieldValue)
						{
							for (var j = 0; j < fieldNodes.length; j++) 
							{
								gridFieldID = fieldNodes[j].getAttribute("id");
								if(fieldID != 'grid_id' && gridFieldID == fieldID)
								{
									widthNode = fieldNodes[j].getElementsByTagName("width");
									templateNode = fieldNodes[j].getElementsByTagName("template");
									if(widthNode[0].childNodes.length == 0)
									{
										width = "";
									}
									else
									{
										width=widthNode[0].childNodes[0].nodeValue;
									}
									if (templateNode[0].childNodes[0].nodeValue == "false") {
										columnArray.push({field: fieldID, width:width, template: eval(templateNode[0].childNodes[0].nodeValue)});
									}
									else {
										columnArray.push({field: fieldID, width: width, template: templateNode[0].childNodes[0].nodeValue});
									}
									
								}
							}
						});	
					}	
				}
			} else {
				for (var j = 0; j < fieldNodes.length; j++) {
				displayNode = fieldNodes[j].getElementsByTagName("display");
				if (displayNode[0].childNodes[0].nodeValue == "true") {
					fieldID = fieldNodes[j].getAttribute("id");
					widthNode = fieldNodes[j].getElementsByTagName("width");
					templateNode = fieldNodes[j].getElementsByTagName("template");
					if(widthNode[0].childNodes.length == 0)
					{
						width = "";
					}
					else
					{
						width=widthNode[0].childNodes[0].nodeValue;
					}
					if (templateNode[0].childNodes[0].nodeValue == "false") {
						columnArray.push({field: fieldID, width:width, template: eval(templateNode[0].childNodes[0].nodeValue)});
					}
					else {
						columnArray.push({field: fieldID, width: width, template: templateNode[0].childNodes[0].nodeValue});
					}
				}
			}
				
			}
		}
		else
		{
			for (var j = 0; j < fieldNodes.length; j++) {
				displayNode = fieldNodes[j].getElementsByTagName("display");
				if (displayNode[0].childNodes[0].nodeValue == "true") {
					fieldID = fieldNodes[j].getAttribute("id");
					widthNode = fieldNodes[j].getElementsByTagName("width");
					templateNode = fieldNodes[j].getElementsByTagName("template");
					if(widthNode[0].childNodes.length == 0)
					{
						width = "";
					}
					else
					{
						width=widthNode[0].childNodes[0].nodeValue;
					}
					if (templateNode[0].childNodes[0].nodeValue == "false") {
						columnArray.push({field: fieldID, width:width, template: eval(templateNode[0].childNodes[0].nodeValue)});
					}
					else {
						columnArray.push({field: fieldID, width: width, template: templateNode[0].childNodes[0].nodeValue});
					}
				}
			}
		}
	}
	return columnArray;
}

function ApplyConfiguredLabelsForUserPreference(screenID) {
	var parentNode, screenNode, headerNode, detailNode, fieldNodes, displayNode, fieldID, titleNode, labelNode;
	parentNode = xmlDocLBLFORREPORT.getElementsByTagName("screen");
	screenNode = parentNode[0].getElementsByTagName(screenID);
	if (screenNode.length != 0) {
		for (var i = 1; i <= 3; i++) {
			headerNode = screenNode[0].getElementsByTagName(screenID + "_header_" + i);
			detailNode = screenNode[0].getElementsByTagName(screenID + "_detail_" + i);	
			if (headerNode.length == 0 && detailNode.length == 0) {
				break;
			}
			if (headerNode.length != 0) {
				fieldNodes = headerNode[0].getElementsByTagName("field");
				for (var j = 0; j < fieldNodes.length; j++) {
					fieldID = fieldNodes[j].getAttribute("id");
					labelNode = fieldNodes[j].getElementsByTagName("label");
					$("#" + screenID + "_dl_" + i + " #" + screenID + "_" + fieldID + "_lbl").prepend(labelNode[0].childNodes[0].nodeValue);
				}
			}
			if (detailNode.length != 0) {
				fieldNodes = detailNode[0].getElementsByTagName("field");
				for (var j = 0; j < fieldNodes.length; j++) {
					fieldID = fieldNodes[j].getAttribute("id");
					titleNode = fieldNodes[j].getElementsByTagName("title");
					//$("#" + screenID + "_grid_" + i + " thead [data-field=" + fieldID + "] .k-link").html(titleNode[0].childNodes[0].nodeValue);
					$("#" +  fieldID ).text($('<p>'+titleNode[0].childNodes[0].nodeValue+'</p>').text());
				}
			}
		} 
	}
}


function GetDataSourceSchema(screenID,dataSource)
{
	var fieldID,codeType,codeField ;
	if(screenID.indexOf("report") != -1)
	{
		xmlnode = xmlDocREPORT.childNodes[0].getElementsByTagName(screenID)[0];
	}
	else{
		xmlnode = xmlDocUI.childNodes[0].getElementsByTagName(screenID)[0];
	}
	fieldNodes = xmlnode.getElementsByTagName(dataSource)[0].getElementsByTagName("field");
	field_obj = {};
	fields = {}; 
	for(var i = 0; i < fieldNodes.length; i++) 
	{		
		
		fieldID = fieldNodes[i].getAttribute("id");	
		fieldProperty={};
	
		/*if(screenID.indexOf("report") != -1)
		{
			fieldProperty['field'] = fieldID + "/text()";
		}
		else
		{*/
			fieldProperty['editable'] =true;
		//}
		if (fieldNodes[i].getElementsByTagName("codeType").length != 0) {
			
			fieldProperty["codeType"] = fieldNodes[i].getElementsByTagName("codeType")[0].childNodes[0].nodeValue;
			
		}	
		if (fieldNodes[i].getElementsByTagName("codeField").length != 0) {
				
				fieldProperty["codeField"] = fieldNodes[i].getElementsByTagName("codeField")[0].childNodes[0].nodeValue;
			}
		if (fieldNodes[i].getElementsByTagName("type").length != 0) {
				
				fieldProperty["type"] = fieldNodes[i].getElementsByTagName("type")[0].childNodes[0].nodeValue;
		}
		if (fieldNodes[i].getElementsByTagName("parentCodeField").length != 0) {
				
				fieldProperty["parentCodeField"] = fieldNodes[i].getElementsByTagName("parentCodeField")[0].childNodes[0].nodeValue;
		}
		if (fieldNodes[i].getElementsByTagName("identifier").length != 0) {
				
				fieldProperty["identifier"] = fieldNodes[i].getElementsByTagName("identifier")[0].childNodes[0].nodeValue;
		}
		fields[fieldID] = fieldProperty;
	}
	
	field_obj['fields'] = fields;
	return field_obj;
}
function ApplyConfiguredLabels(screenID) {
	var parentNode, screenNode, headerNode, detailNode, fieldNodes, displayNode, fieldID, titleNode, labelNode;
	parentNode = xmlDocLBL.getElementsByTagName("screen");
	screenNode = parentNode[0].getElementsByTagName(screenID);
	if (screenNode.length != 0) {
		for (var i = 1; i <= 15; i++) {
			headerNode = screenNode[0].getElementsByTagName(screenID + "_header_" + i);
			detailNode = screenNode[0].getElementsByTagName(screenID + "_detail_" + i);	
			if (headerNode.length == 0 && detailNode.length == 0) {
				break;
			}
			if (headerNode.length != 0) {
				fieldNodes = headerNode[0].getElementsByTagName("field");
				for (var j = 0; j < fieldNodes.length; j++) {
					fieldID = fieldNodes[j].getAttribute("id");
					labelNode = fieldNodes[j].getElementsByTagName("label");
					$("#" + screenID + "_" + fieldID + "_lbl").prepend(labelNode[0].childNodes[0].nodeValue);
				}
			}
			if (detailNode.length != 0) {
				fieldNodes = detailNode[0].getElementsByTagName("field");
				for (var j = 0; j < fieldNodes.length; j++) {
					fieldID = fieldNodes[j].getAttribute("id");
					titleNode = fieldNodes[j].getElementsByTagName("title");
					$("#" + screenID + "_grid_" + i + " thead [data-field=" + fieldID + "] .k-link").html(titleNode[0].childNodes[0].nodeValue);
				}
			}
		} 
	}
}

function ApplyConfiguredLabelsForReport(screenID) {
	var parentNode, screenNode, headerNode, detailNode, fieldNodes, displayNode, fieldID, titleNode, labelNode;
	parentNode = xmlDocLBLFORREPORT.getElementsByTagName("screen");
	screenNode = parentNode[0].getElementsByTagName(screenID);
	if (screenNode.length != 0) {
		for (var i = 1; i <= 3; i++) {
			headerNode = screenNode[0].getElementsByTagName(screenID + "_header_" + i);
			detailNode = screenNode[0].getElementsByTagName(screenID + "_detail_" + i);	
			if (headerNode.length == 0 && detailNode.length == 0) {
				break;
			}
			if(screenID.indexOf('report_generic_data',0) == 0)
			{
				if (headerNode.length != 0) {
					fieldNodes = headerNode[0].getElementsByTagName("field");
					for (var j = 0; j < fieldNodes.length; j++) {
						fieldID = fieldNodes[j].getAttribute("id");
						labelNode = fieldNodes[j].getElementsByTagName("label");
						$("#report_generic_data" + "_" + fieldID + "_lbl").text(labelNode[0].childNodes[0].nodeValue);
					}
				}
				if (detailNode.length != 0) {
					fieldNodes = detailNode[0].getElementsByTagName("field");
					for (var j = 0; j < fieldNodes.length; j++) {
						fieldID = fieldNodes[j].getAttribute("id");
						titleNode = fieldNodes[j].getElementsByTagName("title");
						$("#report_generic_data" +  "_grid_" + i + " thead [data-field=" + fieldID + "] .k-link").html(titleNode[0].childNodes[0].nodeValue);
					}
				}
			}
			else
			{
				if (headerNode.length != 0) {
					fieldNodes = headerNode[0].getElementsByTagName("field");
					for (var j = 0; j < fieldNodes.length; j++) {
						fieldID = fieldNodes[j].getAttribute("id");
						labelNode = fieldNodes[j].getElementsByTagName("label");
						$("#" + screenID + "_" + fieldID + "_lbl").text(labelNode[0].childNodes[0].nodeValue);
					}
				}
				if (detailNode.length != 0) {
					fieldNodes = detailNode[0].getElementsByTagName("field");
					for (var j = 0; j < fieldNodes.length; j++) {
						fieldID = fieldNodes[j].getAttribute("id");
						titleNode = fieldNodes[j].getElementsByTagName("title");
						$("#" + screenID + "_grid_" + i + " thead [data-field=" + fieldID + "] .k-link").html(titleNode[0].childNodes[0].nodeValue);
					}
				}
			}
		} 
	}
}

function AddCustomFilterForReport(screenID,widgetID) {
		var screenNode, headerNode, fieldNodes, displayNode, fieldID, typeNode, dataSourceNode, cascadingNode, eventsNode, filterNode, filterDetailNode, filterDetailObject, ddlObject;
	screenNode = xmlDocREPORT.getElementsByTagName(screenID);
	if (screenNode.length != 0) {
		for (var i = 1; i <= 3; i++) {
			headerNode = screenNode[0].getElementsByTagName(screenID + "_header_" + i);
			if (headerNode.length != 0) {
				fieldNodes = headerNode[0].getElementsByTagName("field");
				
				if(screenID.indexOf('report_generic_data',0) == 0)
				{
					for (var j = 0; j < fieldNodes.length; j++) {
						if(fieldNodes[j].getAttribute("id") )
						{
							displayNode = fieldNodes[j].getElementsByTagName("display");
							if (displayNode[0].childNodes[0].nodeValue == "true") {
								fieldID = fieldNodes[j].getAttribute("id");
								typeNode = fieldNodes[j].getElementsByTagName("type");
								dt_width  =fieldNodes[j].getElementsByTagName("dt_width")[0].childNodes[0].nodeValue;
								dd_width  = fieldNodes[j].getElementsByTagName("dd_width")[0].childNodes[0].nodeValue;
								/* FORMING HTML ELEMENT */
								var dt = document.createElement("dt");
								var dd1 = document.createElement("dd");
								var dd2 = document.createElement("dd");
								var label = document.createElement("Label");
								if (typeNode[0].childNodes[0].nodeValue == "multiselect")
								{
									var element = document.createElement("select");
								}
								else
								{
									var element = document.createElement("input");
								}
								var div = document.createElement("div");
								var hr = document.createElement("hr");
								var br = document.createElement("br");
								var span = document.createElement("span");
								span.setAttribute("class", "display_description");	
								span.setAttribute("data-for", 'report_generic_data' + "_" + fieldID);
								dt.setAttribute("class", "term_one");	
								dt.setAttribute("style", "width:"+dt_width);				
								label.setAttribute("id", 'report_generic_data' + "_" + fieldID + "_lbl");
								label.setAttribute("style", "width:"+dt_width);
								dd1.setAttribute("class", "colen");
								dd1.textContent = ":";
								dd2.setAttribute("class", "value");
								dd2.setAttribute("style", "width:"+dd_width);						
								element.setAttribute("id", 'report_generic_data' + "_" + fieldID);
								div.setAttribute("id", 'report_generic_data' + "_" + fieldID+"_div");
								element.setAttribute("name", 'report_generic_data' + "_" + fieldID);		
								element.setAttribute("style", "width:"+dd_width);						
								var dl = $("#report_generic_data" + " .preference_for_filters")[0];
								
								dl.appendChild(div);
								if(j%3 == 2) {
									dl.appendChild(hr);
								}
								div.appendChild(dt);
								dt.appendChild(label);
								div.appendChild(dd1);
								div.appendChild(dd2);
								dd2.appendChild(element);
								//dd2.appendChild(br);
								dd2.appendChild(span);
								if (typeNode[0].childNodes[0].nodeValue  == "text") {
									//element.setAttribute("class", "k-textbox");
									var textBox  = $("#" + 'report_generic_data' + "_" + fieldID).attr("class", "k-textbox");
									eval('report_generic_data'+"_"+fieldID + "=textBox");
									/*defaultValueNode = fieldNodes[j].getElementsByTagName("default_value");
									if (defaultValueNode.length != 0) {
										$("#" + 'report_generic_data' + "_" + fieldID).val(eval(defaultValueNode[0].childNodes[0].nodeValue));
									}*/
									ddlObject = {};
									ddlObject.fieldID = 'report_generic_data' + "_" + fieldID;
									eventsNode = fieldNodes[j].getElementsByTagName("events");
									if (eventsNode.length != 0) {
										ddlObject.events = {};
										for (var k = 0; k < eventsNode[0].childElementCount; k++) {
											ddlObject.events[eventsNode[0].childNodes[k].nodeName] = eventsNode[0].childNodes[k].childNodes[0].nodeValue;
										}
									}
									$("#" + ddlObject.fieldID).on("change", function(e) {								
										if (ddlObject.events != undefined && ddlObject.events.change != undefined) {
											eval(ddlObject.events.change + "(e)");
										}
									});
								}
								else if (typeNode[0].childNodes[0].nodeValue  == "date") {												
									var DatePicker = $("#" + 'report_generic_data' + "_" + fieldID).kendoDatePicker({format : "dd-MM-yyyy"}).data("kendoDatePicker");
									eval('report_generic_data' + "_" + fieldID + "=DatePicker");
									/*defaultValueNode = fieldNodes[j].getElementsByTagName("default_value");
									if (defaultValueNode.length != 0) {
										if (eval(defaultValueNode[0].childNodes[0].nodeValue) != "") {
											var value = eval(defaultValueNode[0].childNodes[0].nodeValue);
											eval('report_generic_data' + "_" + fieldID+".value('"+value+"')");
										}
									}*/
									ddlObject = {};
									ddlObject.fieldID = 'report_generic_data' + "_" + fieldID;
									eventsNode = fieldNodes[j].getElementsByTagName("events");
									if (eventsNode.length != 0) {
										ddlObject.events = {};
										for (var k = 0; k < eventsNode[0].childElementCount; k++) {
											ddlObject.events[eventsNode[0].childNodes[k].nodeName] = eventsNode[0].childNodes[k].childNodes[0].nodeValue;
										}
									}
									$("#" + ddlObject.fieldID).on("change", function(e) {								
										if (ddlObject.events != undefined && ddlObject.events.change != undefined) {
											eval(ddlObject.events.change + "(e)");
										}
									});
								}
								else {
								/* INITIALIZE DROP DOWN LIST */
															
									ddlObject = {};
									ddlObject.fieldID = 'report_generic_data' + "_" + fieldID;
									ddlObject.filterMode = true;
									ddlObject.template = fieldNodes[j].getElementsByTagName("template")[0].childNodes[0].nodeValue;
									ddlObject.dataTextField = fieldNodes[j].getElementsByTagName("data_text_field")[0].childNodes[0].nodeValue;
									ddlObject.dataValueField = fieldNodes[j].getElementsByTagName("data_value_field")[0].childNodes[0].nodeValue;
									
									dataSourceNode = fieldNodes[j].getElementsByTagName("datasource");
									if (dataSourceNode[0].childElementCount > 0) {
										ddlObject.dataSource = {};
										ddlObject.dataSource.applicationName = dataSourceNode[0].getElementsByTagName("application_name")[0].childNodes[0].nodeValue;
										ddlObject.dataSource.serviceName = dataSourceNode[0].getElementsByTagName("service_name")[0].childNodes[0].nodeValue;
										if (dataSourceNode[0].getElementsByTagName("input_parameter").length != 0) {
											ddlObject.dataSource.inputParameter = {};
											for (var k = 0; k < dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes.length; k++) {
												if (dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].childNodes[0] != undefined) {
													ddlObject.dataSource.inputParameter[dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].nodeName] = dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].childNodes[0].nodeValue;
												}
												else {
													ddlObject.dataSource.inputParameter[dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].nodeName] = "";
												}
											}
										}	
									}
									else {
										ddlObject.dataSource = eval(dataSourceNode[0].childNodes[0].nodeValue);
									}
									cascadingNode = fieldNodes[j].getElementsByTagName("cascading");
									if (cascadingNode.length != 0) {
										ddlObject.cascading = {};
										ddlObject.cascading.cascadeFrom = 'report_generic_data'+"_"+cascadingNode[0].getElementsByTagName("cascade_from")[0].childNodes[0].nodeValue;
										ddlObject.cascading.cascadeFromField = cascadingNode[0].getElementsByTagName("cascade_from_field")[0].childNodes[0].nodeValue;
										if (cascadingNode[0].getElementsByTagName("default_cascadevalue")[0] != undefined) {
											ddlObject.cascading.defaultCascadeValue = eval(cascadingNode[0].getElementsByTagName("default_cascadevalue")[0].childNodes[0].nodeValue);
										}
									}
									eventsNode = fieldNodes[j].getElementsByTagName("events");
									if (eventsNode.length != 0) {
										ddlObject.events = {};
										for (var k = 0; k < eventsNode[0].childElementCount; k++) {
											ddlObject.events[eventsNode[0].childNodes[k].nodeName] = eventsNode[0].childNodes[k].childNodes[0].nodeValue;
										}
									}
									filterNode = fieldNodes[j].getElementsByTagName("filter");
									if (filterNode.length != 0) {
										ddlObject.filter = [];
										filterDetailNode = filterNode[0].getElementsByTagName("filter_detail");
										for (var k = 0; k < filterDetailNode.length; k++) {
											filterDetailObject = {};
											filterDetailObject.name = filterDetailNode[k].getElementsByTagName("name")[0].childNodes[0].nodeValue;
											filterDetailObject.value = filterDetailNode[k].getElementsByTagName("value")[0].childNodes[0].nodeValue;
											ddlObject.filter.push(filterDetailObject);
										}
									}
								/*	defaultValueNode = fieldNodes[j].getElementsByTagName("default_value");
									if (defaultValueNode.length != 0) {
										ddlObject.defaultValue =eval(defaultValueNode[0].childNodes[0].nodeValue);							
									}	*/	
									if (typeNode[0].childNodes[0].nodeValue == "ddl") {
										eval('report_generic_data' + "_" + fieldID + "= InitializeKendoDropDownList(ddlObject)");
									}
									else if (typeNode[0].childNodes[0].nodeValue == "combo") {
										eval('report_generic_data' + "_" + fieldID + "= InitializeKendoComboBox(ddlObject)");
									}
									else if (typeNode[0].childNodes[0].nodeValue == "multiselect") {
										eval('report_generic_data' + "_" + fieldID + "= InitializeKendoMultiSelect(ddlObject)");
									}
								}
							}
						}
					}
				}
				else
				{
					for (var j = 0; j < fieldNodes.length; j++) {
						if(fieldNodes[j].getAttribute("id") == widgetID)
						{
							displayNode = fieldNodes[j].getElementsByTagName("display");
							if (displayNode[0].childNodes[0].nodeValue == "true") {
								fieldID = fieldNodes[j].getAttribute("id");
								typeNode = fieldNodes[j].getElementsByTagName("type");
								dt_width  =fieldNodes[j].getElementsByTagName("dt_width")[0].childNodes[0].nodeValue;
								dd_width  = fieldNodes[j].getElementsByTagName("dd_width")[0].childNodes[0].nodeValue;
								/* FORMING HTML ELEMENT */
								var dt = document.createElement("dt");
								var dd1 = document.createElement("dd");
								var dd2 = document.createElement("dd");
								var label = document.createElement("Label");
								if (typeNode[0].childNodes[0].nodeValue == "multiselect")
								{
									var element = document.createElement("select");
								}
								else
								{
									var element = document.createElement("input");
								}
								var div = document.createElement("div");
								var hr = document.createElement("hr");
								var br = document.createElement("br");
								var span = document.createElement("span");
								span.setAttribute("class", "display_description");	
								span.setAttribute("data-for", screenID + "_" + fieldID);
								dt.setAttribute("class", "term_one");	
								dt.setAttribute("style", "width:"+dt_width);				
								label.setAttribute("id", screenID + "_" + fieldID + "_lbl");
								label.setAttribute("style", "width:"+dt_width);
								dd1.setAttribute("class", "colen");
								dd1.textContent = ":";
								dd2.setAttribute("class", "value");
								dd2.setAttribute("style", "width:"+dd_width);						
								element.setAttribute("id", screenID + "_" + fieldID);
								div.setAttribute("id", screenID + "_" + fieldID+"_div");
								element.setAttribute("name", screenID + "_" + fieldID);		
								element.setAttribute("style", "width:"+dd_width);						
								var dl = $("#"+screenID + " .preference_for_filters")[0];
								
								dl.appendChild(div);
								div.appendChild(dt);
								dt.appendChild(label);
								div.appendChild(dd1);
								div.appendChild(dd2);
								dd2.appendChild(element);
								//dd2.appendChild(br);
								dd2.appendChild(span);
								if (typeNode[0].childNodes[0].nodeValue  == "text") {
									//element.setAttribute("class", "k-textbox");
									var textBox  = $("#" + screenID + "_" + fieldID).attr("class", "k-textbox");
									eval(screenID+"_"+fieldID + "=textBox");
									/*defaultValueNode = fieldNodes[j].getElementsByTagName("default_value");
									if (defaultValueNode.length != 0) {
										$("#" + screenID + "_" + fieldID).val(eval(defaultValueNode[0].childNodes[0].nodeValue));
									}*/
									ddlObject = {};
									ddlObject.fieldID = screenID + "_" + fieldID;
									eventsNode = fieldNodes[j].getElementsByTagName("events");
									if (eventsNode.length != 0) {
										ddlObject.events = {};
										for (var k = 0; k < eventsNode[0].childElementCount; k++) {
											ddlObject.events[eventsNode[0].childNodes[k].nodeName] = eventsNode[0].childNodes[k].childNodes[0].nodeValue;
										}
									}
									$("#" + ddlObject.fieldID).on("change", function(e) {								
										if (ddlObject.events != undefined && ddlObject.events.change != undefined) {
											eval(ddlObject.events.change + "(e)");
										}
									});
								}
								else if (typeNode[0].childNodes[0].nodeValue  == "date") {												
									var DatePicker = $("#" + screenID + "_" + fieldID).kendoDatePicker({format : "dd-MM-yyyy"}).data("kendoDatePicker");
									eval(screenID + "_" + fieldID + "=DatePicker");
									/*defaultValueNode = fieldNodes[j].getElementsByTagName("default_value");
									if (defaultValueNode.length != 0) {
										if (eval(defaultValueNode[0].childNodes[0].nodeValue) != "") {
											var value = eval(defaultValueNode[0].childNodes[0].nodeValue);
											eval(screenID + "_" + fieldID+".value('"+value+"')");
										}
									}*/
									ddlObject = {};
									ddlObject.fieldID = screenID + "_" + fieldID;
									eventsNode = fieldNodes[j].getElementsByTagName("events");
									if (eventsNode.length != 0) {
										ddlObject.events = {};
										for (var k = 0; k < eventsNode[0].childElementCount; k++) {
											ddlObject.events[eventsNode[0].childNodes[k].nodeName] = eventsNode[0].childNodes[k].childNodes[0].nodeValue;
										}
									}
									$("#" + ddlObject.fieldID).on("change", function(e) {								
										if (ddlObject.events != undefined && ddlObject.events.change != undefined) {
											eval(ddlObject.events.change + "(e)");
										}
									});
								}
								else {
								/* INITIALIZE DROP DOWN LIST */
															
									ddlObject = {};
									ddlObject.fieldID = screenID + "_" + fieldID;
									ddlObject.filterMode = true;
									ddlObject.template = fieldNodes[j].getElementsByTagName("template")[0].childNodes[0].nodeValue;
									ddlObject.dataTextField = fieldNodes[j].getElementsByTagName("data_text_field")[0].childNodes[0].nodeValue;
									ddlObject.dataValueField = fieldNodes[j].getElementsByTagName("data_value_field")[0].childNodes[0].nodeValue;
									
									dataSourceNode = fieldNodes[j].getElementsByTagName("datasource");
									if (dataSourceNode[0].childElementCount > 0) {
										ddlObject.dataSource = {};
										ddlObject.dataSource.applicationName = dataSourceNode[0].getElementsByTagName("application_name")[0].childNodes[0].nodeValue;
										ddlObject.dataSource.serviceName = dataSourceNode[0].getElementsByTagName("service_name")[0].childNodes[0].nodeValue;
										if (dataSourceNode[0].getElementsByTagName("input_parameter").length != 0) {
											ddlObject.dataSource.inputParameter = {};
											for (var k = 0; k < dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes.length; k++) {
												if (dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].childNodes[0] != undefined) {
													ddlObject.dataSource.inputParameter[dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].nodeName] = dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].childNodes[0].nodeValue;
												}
												else {
													ddlObject.dataSource.inputParameter[dataSourceNode[0].getElementsByTagName("input_parameter")[0].childNodes[k].nodeName] = "";
												}
											}
										}	
									}
									else {
										ddlObject.dataSource = eval(dataSourceNode[0].childNodes[0].nodeValue);
									}
									cascadingNode = fieldNodes[j].getElementsByTagName("cascading");
									if (cascadingNode.length != 0) {
										ddlObject.cascading = {};
										ddlObject.cascading.cascadeFrom = screenID+"_"+cascadingNode[0].getElementsByTagName("cascade_from")[0].childNodes[0].nodeValue;
										ddlObject.cascading.cascadeFromField = cascadingNode[0].getElementsByTagName("cascade_from_field")[0].childNodes[0].nodeValue;
										if (cascadingNode[0].getElementsByTagName("default_cascadevalue")[0] != undefined) {
											ddlObject.cascading.defaultCascadeValue = eval(cascadingNode[0].getElementsByTagName("default_cascadevalue")[0].childNodes[0].nodeValue);
										}
									}
									eventsNode = fieldNodes[j].getElementsByTagName("events");
									if (eventsNode.length != 0) {
										ddlObject.events = {};
										for (var k = 0; k < eventsNode[0].childElementCount; k++) {
											ddlObject.events[eventsNode[0].childNodes[k].nodeName] = eventsNode[0].childNodes[k].childNodes[0].nodeValue;
										}
									}
									filterNode = fieldNodes[j].getElementsByTagName("filter");
									if (filterNode.length != 0) {
										ddlObject.filter = [];
										filterDetailNode = filterNode[0].getElementsByTagName("filter_detail");
										for (var k = 0; k < filterDetailNode.length; k++) {
											filterDetailObject = {};
											filterDetailObject.name = filterDetailNode[k].getElementsByTagName("name")[0].childNodes[0].nodeValue;
											filterDetailObject.value = filterDetailNode[k].getElementsByTagName("value")[0].childNodes[0].nodeValue;
											ddlObject.filter.push(filterDetailObject);
										}
									}
								/*	defaultValueNode = fieldNodes[j].getElementsByTagName("default_value");
									if (defaultValueNode.length != 0) {
										ddlObject.defaultValue =eval(defaultValueNode[0].childNodes[0].nodeValue);							
									}	*/	
									if (typeNode[0].childNodes[0].nodeValue == "ddl") {
										eval(screenID + "_" + fieldID + "= InitializeKendoDropDownList(ddlObject)");
									}
									else if (typeNode[0].childNodes[0].nodeValue == "combo") {
										eval(screenID + "_" + fieldID + "= InitializeKendoComboBox(ddlObject)");
									}
									else if (typeNode[0].childNodes[0].nodeValue == "multiselect") {
										eval(screenID + "_" + fieldID + "= InitializeKendoMultiSelect(ddlObject)");
									}
								}
							}
						}
					}
				
				}
			}
		}	
	}
}

function AddCustomCheckBoxForReport(screenID)
{
	var screenNode, headerNode, fieldNodes, displayNode, fieldID;
	screenNode = xmlDocREPORT.getElementsByTagName(screenID);
	if (screenNode.length != 0)
	{
		for (var i = 1; i <= 3; i++)
		{
			headerNode = screenNode[0].getElementsByTagName(screenID + "_header_" + i);
			if (headerNode.length != 0)
			{
				fieldNodes = headerNode[0].getElementsByTagName("field");
				for (var j = 0; j < fieldNodes.length; j++)
				{
					displayNode = fieldNodes[j].getElementsByTagName("display");
					if (displayNode[0].childNodes[0].nodeValue == "true")
					{
						fieldID = fieldNodes[j].getAttribute("id");
						/* FORMING HTML ELEMENT */
						var dt = document.createElement("dt");
						var dd2 = document.createElement("dd");
						var label = document.createElement("Label");
						var element = document.createElement("input");
					
						var hr = document.createElement("hr");
						dt.setAttribute("class", "term_one");	
						dt.setAttribute("style", "width:120px");				
						label.setAttribute("id", screenID + "_" + fieldID + "_lbl");
						label.setAttribute("style", "width:120px");
						dd2.setAttribute("class", "value");
						dd2.setAttribute("style", "width:30px;margin-top:4px");						
						element.setAttribute("id", screenID + "_" + fieldID);
						element.setAttribute("type", "checkbox");
						//element.setAttribute("class", "k-checkbox");
						element.setAttribute("name", screenID + "_" + fieldID);	
						parent = fieldNodes[j].getElementsByTagName("parent");
						if(parent.length != 0)
						{
							dependantNodeValue = parent[0].childNodes[0].nodeValue;
						}
						else
						{
							dependantNodeValue = "";
						}						
						element.setAttribute("parentNode",  dependantNodeValue);	
						child = fieldNodes[j].getElementsByTagName("child");
						if(child.length != 0)
						{
							childdependantNodeValue = child[0].childNodes[0].nodeValue;
						}
						else
						{
							childdependantNodeValue = "";
						}						
						element.setAttribute("childNode",  childdependantNodeValue);							
						element.setAttribute("style", "width:30px");						
						var dl = document.getElementById(screenID + "_dl_" + i);
						
						dl.appendChild(dd2);
						dd2.appendChild(element);	
						dl.appendChild(dt);
						dt.appendChild(label);
						
						if (document.getElementById(screenID + "_dl_" + i).getElementsByTagName("dt").length % 5 == 0)
						{
							dl.appendChild(hr);
						}
						
						$('#'+screenID + "_" + fieldID).bind('change',function(e) {
							if(e.target.attributes.parentNode.nodeValue != "")
							{
								if($('#'+ e.target.id).is(':checked' ) == true)
								{
									$('#'+screenID + "_" + e.target.attributes.parentNode.nodeValue).prop('checked',true);
									
								}
								/*else
								{
									$('#'+screenID + "_" + e.target.attributes.parentNode.nodeValue).prop('checked',false);
								}*/
							}
							if(e.target.attributes.childNode.nodeValue != "")
							{
								if($('#'+ e.target.id).is(':checked' ) != true)
								{
									$('#'+screenID + "_" + e.target.attributes.childNode.nodeValue).prop('checked',false);
									
								}
								
							}
							report_checkbox_change(e);
						});	
					}
				}
			}
		}	
	}
}

function AddCustomFields(screenID, eventVerb) {
	var screenNode, headerNode, fieldNodes, displayProperty, fieldID, filterModeValue, customFieldCounter, typeNode, typeValue;
	
	screenNode = xmlDocUI.getElementsByTagName(screenID);
	if (screenNode.length != 0) {
		for (var i = 1; i <= 3; i++) {
			if (eventVerb == undefined) {
				headerNode = screenNode[0].getElementsByTagName(screenID + "_header_" + i);
			}
			else {
				headerNode = screenNode[0].getElementsByTagName(eventVerb);
				if (i == 2) {
					break;
				}
			}
			if (headerNode.length != 0) {
				customFieldCounter = 0;
				fieldNodes = headerNode[0].getElementsByTagName("field");
				for (var j = 0; j < fieldNodes.length; j++) {
					displayProperty = fieldNodes[j].getAttribute("display");
					if (displayProperty == "true") {
						fieldID = fieldNodes[j].getAttribute("id");
						typeNode = fieldNodes[j].getElementsByTagName("type");
						typeValue = typeNode[0].childNodes[0].nodeValue;
						
						filterModeValue = false;
						if (fieldID.substring(fieldID.length - 6) == "filter") {
							filterModeValue = true;
						}
						
						CreateInputElement(); // FUNCTION TO CREATE HTML ELEMENT
						
						/* CONFIGURATION BASED ON TYPE */
						if (typeValue == "textarea") {
							var maxlengthNode = fieldNodes[j].getElementsByTagName("maxlength");
							if (maxlengthNode.length != 0) {
								$("#" + screenID + "_" + fieldID).attr("maxlength", maxlengthNode[0].childNodes[0].nodeValue);
							}
							$("#" + screenID + "_" + fieldID).attr("class", "k-textbox");
							$("#" + screenID + "_" + fieldID).attr("style", "width:520px; height:50px; resize:none;");
						}
						else if (typeValue == "text") {
							var maxlengthNode = fieldNodes[j].getElementsByTagName("maxlength");
							if (maxlengthNode.length != 0) {
								$("#" + screenID + "_" + fieldID).attr("maxlength", maxlengthNode[0].childNodes[0].nodeValue);
							}
							$("#" + screenID + "_" + fieldID).attr("class", "k-textbox");
							$("#" + screenID + "_" + fieldID).attr("type", "text");
						}
						else if (typeValue == "checkbox") {
							$("#" + screenID + "_" + fieldID).attr("type", "checkbox");
						}
						else if (typeValue == "number") {
							var formatNode, minimumNode, maximumNode, stepNode, formatValue = "n", minimumValue = null, maximumValue = null, stepValue = 1;
							
							formatNode = fieldNodes[j].getElementsByTagName("format");
							if (formatNode.length != 0) {
								formatValue = formatNode[0].childNodes[0].nodeValue;
							}
							
							minimumNode = fieldNodes[j].getElementsByTagName("minimum");
							if (minimumNode.length != 0) {
								minimumValue = parseFloat(minimumNode[0].childNodes[0].nodeValue);
							}
							
							maximumNode = fieldNodes[j].getElementsByTagName("maximum");
							if (maximumNode.length != 0) {
								maximumValue = parseFloat(maximumNode[0].childNodes[0].nodeValue);
							}
							
							stepNode = fieldNodes[j].getElementsByTagName("step");
							if (stepNode.length != 0) {
								stepValue = parseFloat(stepNode[0].childNodes[0].nodeValue);
							}
							
							$("#" + screenID + "_" + fieldID).kendoNumericTextBox({
								format: formatValue,
								max: maximumValue,
								min: minimumValue,
								step: stepValue
							});
							eval(screenID + "_" + fieldID + " = $('#" + screenID + "_" + fieldID + "').data('kendoNumericTextBox')");
						}
						else if (typeValue == "date") {
							var formatNode, minimumNode, maximumNode, formatValue = "dd-MM-yyyy", minimumValue = new Date(1900, 0, 1), maximumValue = new Date(2099, 11, 31);
							
							formatNode = fieldNodes[j].getElementsByTagName("format");
							if (formatNode.length != 0) {
								formatValue = formatNode[0].childNodes[0].nodeValue;
							}
							
							minimumNode = fieldNodes[j].getElementsByTagName("minimum");
							if (minimumNode.length != 0) {
								if (minimumNode[0].childNodes[0].nodeValue == "NEWDATE") {
									minimumValue = new Date();
								}
								else {
									minimumValue = eval(minimumNode[0].childNodes[0].nodeValue);
								}
							}
							
							maximumNode = fieldNodes[j].getElementsByTagName("maximum");							
							if (maximumNode.length != 0) {
								if (maximumNode[0].childNodes[0].nodeValue == "NEWDATE") {
									maximumValue = new Date();
								}
								else {
									maximumValue = eval(maximumNode[0].childNodes[0].nodeValue);
								}
							}
							
							$("#" + screenID + "_" + fieldID).kendoDatePicker({
								format: formatValue,
								min: minimumValue,
								max: maximumValue
							});
							eval(screenID + "_" + fieldID + " = $('#" + screenID + "_" + fieldID + "').data('kendoDatePicker')");
						}
						else if (typeValue == "datetime") {
							var formatNode, minimumNode, maximumNode, intervalNode, formatValue = "dd-MM-yyyy HH:mm", minimumValue = new Date(1900, 0, 1), maximumValue = new Date(2099, 11, 31), intervalValue = 30;
							
							formatNode = fieldNodes[j].getElementsByTagName("format");
							if (formatNode.length != 0) {
								formatValue = formatNode[0].childNodes[0].nodeValue;
							}
							
							minimumNode = fieldNodes[j].getElementsByTagName("minimum");
							if (minimumNode.length != 0) {
								if (minimumNode[0].childNodes[0].nodeValue == "NEWDATE") {
									minimumValue = new Date();
								}
								else {
									minimumValue = eval(minimumNode[0].childNodes[0].nodeValue);
								}
							}
							
							maximumNode = fieldNodes[j].getElementsByTagName("maximum");
							if (maximumNode.length != 0) {
								if (maximumNode[0].childNodes[0].nodeValue == "NEWDATE") {
									maximumValue = new Date();
								}
								else {
									maximumValue = eval(maximumNode[0].childNodes[0].nodeValue);
								}
							}
							
							intervalNode = fieldNodes[j].getElementsByTagName("interval");							
							if (intervalNode.length != 0) {
								intervalValue = parseFloat(intervalNode[0].childNodes[0].nodeValue);
							}
							
							$("#" + screenID + "_" + fieldID).kendoDateTimePicker({
								format: formatValue,
								min: minimumValue,
								max: maximumValue,
								interval: intervalValue
							});
							eval(screenID + "_" + fieldID + " = $('#" + screenID + "_" + fieldID + "').data('kendoDateTimePicker')");
						}
						else {
							var initializationObject = {}, dataTextFieldNode, dataValueFieldNode, defaultValueNode, templateNode, dataSourceNode, defaultValueDescriptionNode;
							
							initializationObject.fieldID = screenID + "_" + fieldID;
							initializationObject.filterMode = filterModeValue;
							
							dataTextFieldNode = fieldNodes[j].getElementsByTagName("dataTextField");
							if (dataTextFieldNode.length != 0) {
								initializationObject.dataTextField = dataTextFieldNode[0].childNodes[0].nodeValue;
							}
							
							dataValueFieldNode = fieldNodes[j].getElementsByTagName("dataValueField");							
							if (dataValueFieldNode.length != 0) {
								initializationObject.dataValueField = dataValueFieldNode[0].childNodes[0].nodeValue;
							}
							
							defaultValueNode = fieldNodes[j].getElementsByTagName("defaultValue");							
							if (defaultValueNode.length != 0) {
								try {
									initializationObject.defaultValue = eval(defaultValueNode[0].childNodes[0].nodeValue);
								}
								catch (e) {
									initializationObject.defaultValue = "";
								}
							}
							
							templateNode = fieldNodes[j].getElementsByTagName("template");							
							if (templateNode.length != 0) {
								initializationObject.template = templateNode[0].childNodes[0].nodeValue;
							}
							
							dataSourceNode = fieldNodes[j].getElementsByTagName("dataSource");
							if (dataSourceNode.length != 0) {
								if (dataSourceNode[0].childElementCount == 0) {
									initializationObject.dataSource = eval(dataSourceNode[0].childNodes[0].nodeValue);
								}
								else {
									var applicationNameNode, serviceNameNode, inputParameterNode;
									initializationObject.dataSource = {};
									
									applicationNameNode = dataSourceNode[0].getElementsByTagName("applicationName");
									if (applicationNameNode.length != 0) {
										initializationObject.dataSource.applicationName = applicationNameNode[0].childNodes[0].nodeValue;
									}
									
									serviceNameNode = dataSourceNode[0].getElementsByTagName("serviceName");							
									if (serviceNameNode.length != 0) {
										initializationObject.dataSource.serviceName = serviceNameNode[0].childNodes[0].nodeValue;
									}
									
									inputParameterNode = dataSourceNode[0].getElementsByTagName("inputParameter");
									if (inputParameterNode.length != 0) {
										initializationObject.dataSource.inputParameter = {};										
										if (inputParameterNode[0].childElementCount != 0) {
											for (var k = 0; k < inputParameterNode[0].childElementCount; k++) {
												if (inputParameterNode[0].childNodes[k].childNodes[0] != undefined) {
													try {
														initializationObject.dataSource.inputParameter[inputParameterNode[0].childNodes[k].nodeName] = eval(inputParameterNode[0].childNodes[k].childNodes[0].nodeValue);
													}
													catch (e) {
														initializationObject.dataSource.inputParameter[inputParameterNode[0].childNodes[k].nodeName] = inputParameterNode[0].childNodes[k].childNodes[0].nodeValue;
													}													
												}
												else {
													initializationObject.dataSource.inputParameter[inputParameterNode[0].childNodes[k].nodeName] = "";
												}
											}
										}
									}									
								}
							}
							
							defaultValueDescriptionNode = fieldNodes[j].getElementsByTagName("defaultValueDescription");
							if (defaultValueDescriptionNode.length != 0) {
								var codeTypeNode, parentCodeValueNode;
								initializationObject.defaultValueDescription = {};
								
								codeTypeNode = defaultValueDescriptionNode[0].getElementsByTagName("codeType");
								if (codeTypeNode.length != 0) {
									initializationObject.defaultValueDescription.codeType = codeTypeNode[0].childNodes[0].nodeValue;
								}
								
								parentCodeValueNode = defaultValueDescriptionNode[0].getElementsByTagName("parentCodeValue");
								if (parentCodeValueNode.length != 0) {
									initializationObject.defaultValueDescription.parentCodeValue = parentCodeValueNode[0].childNodes[0].nodeValue;
								}
							}
							
							if (typeValue == "ddl" || typeValue == "combo") {
								var childFieldIDNode, cascadingNode;
								
								childFieldIDNode = fieldNodes[j].getElementsByTagName("childFieldID");
								if (childFieldIDNode.length != 0) {
									initializationObject.childFieldID = screenID + "_" + childFieldIDNode[0].childNodes[0].nodeValue;
								}
								
								cascadingNode = fieldNodes[j].getElementsByTagName("cascading");
								if (cascadingNode.length != 0) {
									var cascadeFromNode, cascadeFromFieldNode, defaultCascadeValueNode;
									initializationObject.cascading = {};
									
									cascadeFromNode = cascadingNode[0].getElementsByTagName("cascadeFrom");
									if (cascadeFromNode.length != 0) {
										initializationObject.cascading.cascadeFrom = screenID + "_" + cascadeFromNode[0].childNodes[0].nodeValue;
									}
									
									cascadeFromFieldNode = cascadingNode[0].getElementsByTagName("cascadeFromField");
									if (cascadeFromFieldNode.length != 0) {
										initializationObject.cascading.cascadeFromField = cascadeFromFieldNode[0].childNodes[0].nodeValue;
									}
									
									defaultCascadeValueNode = cascadingNode[0].getElementsByTagName("defaultCascadeValue");
									if (defaultCascadeValueNode.length != 0) {
										try {
											initializationObject.cascading.defaultCascadeValue = eval(defaultCascadeValueNode[0].childNodes[0].nodeValue);
										}
										catch (e) {
											initializationObject.cascading.defaultCascadeValue = "";
										}
									}
								}								
							}
							
							if (typeValue == "ddl") {
								eval(screenID + "_" + fieldID + "= InitializeKendoDropDownList(initializationObject)");
							}
							else if (typeValue == "combo") {
								eval(screenID + "_" + fieldID + "= InitializeKendoComboBox(initializationObject)");
							}
							else if (typeValue == "multiselect") {
								eval(screenID + "_" + fieldID + "= InitializeKendoMultiSelect(initializationObject)");
							}
						}
					}					
				}
			}
		}
	}
	
	function CreateInputElement() {
		var dlTag, groupSpanTag, dtTag, labelTag, dd1Tag, dd2Tag, inputTag, textAreaTag, brTag, descriptionSpanTag, validationSpanTag, hrTag;
		
		dlTag = document.getElementById(screenID + "_dl_" + i);
		groupSpanTag = document.createElement("span");
		dtTag = document.createElement("dt");
		labelTag = document.createElement("label");
		dd1Tag = document.createElement("dd");
		dd2Tag = document.createElement("dd");
		brTag = document.createElement("br");
		
		if (typeValue == "textarea") {
			textAreaTag = document.createElement("textarea");
		}
		else {
			inputTag = document.createElement("input");
		}
		
		if (filterModeValue == true) {
			dtTag.setAttribute("class", "term_one");
			dd2Tag.setAttribute("style", "width:160px");
			if (customFieldCounter % 3 == 0) {
				hrTag = document.createElement("hr");
				dlTag.appendChild(hrTag);
			}
		}
		else {
			dtTag.setAttribute("class", "term_two");
			if (customFieldCounter % 2 == 0) {
				hrTag = document.createElement("hr");
				dlTag.appendChild(hrTag);
			}
		}
		
		groupSpanTag.setAttribute("id", screenID + "_" + fieldID + "_group");
		groupSpanTag.setAttribute("name", screenID + "_" + fieldID + "_group");
		labelTag.setAttribute("id", screenID + "_" + fieldID + "_lbl");
		labelTag.setAttribute("name", screenID + "_" + fieldID + "_lbl");
		dd1Tag.setAttribute("class", "colen");
		dd1Tag.textContent = ":";
		dd2Tag.setAttribute("class", "value");
		
		if (typeValue == "textarea") {
			textAreaTag.setAttribute("id", screenID + "_" + fieldID);
			textAreaTag.setAttribute("name", screenID + "_" + fieldID);
		}
		else {
			inputTag.setAttribute("id", screenID + "_" + fieldID);
			inputTag.setAttribute("name", screenID + "_" + fieldID);
		}
		
		dtTag.appendChild(labelTag);
		
		if (typeValue == "textarea") {
			dd2Tag.appendChild(textAreaTag);
		}
		else {
			dd2Tag.appendChild(inputTag);
		}
		
		if (typeValue != "multiselect") {
			dd2Tag.appendChild(brTag);
		}
		
		if (typeValue == "ddl" || typeValue == "combo" || typeValue == "multiselect") {
			descriptionSpanTag = document.createElement("span");
			descriptionSpanTag.setAttribute("class", "display_description");
			descriptionSpanTag.setAttribute("data-for", screenID + "_" + fieldID);
			dd2Tag.appendChild(descriptionSpanTag);
		}
		
		if (filterModeValue == false) {
			validationSpanTag = document.createElement("span");
			validationSpanTag.setAttribute("class", "k-invalid-msg");
			validationSpanTag.setAttribute("data-for", screenID + "_" + fieldID);
			dd2Tag.appendChild(validationSpanTag);
		}
		
		groupSpanTag.appendChild(dtTag);
		groupSpanTag.appendChild(dd1Tag);
		groupSpanTag.appendChild(dd2Tag);
		dlTag.appendChild(groupSpanTag);
		
		customFieldCounter ++;
	}
}

/* FUNCTIONS BELOW FOR MSR MOBILE */
function createPage(viewConfiguration) {
	view = document.createElement("div");
	view.setAttribute("id", viewConfiguration.viewID);
	view.setAttribute("data-role", "view");
	view.setAttribute("data-before-show", "fn_" + viewConfiguration.screenID + "_child");
	view.setAttribute("data-layout", viewConfiguration.screenID + "_layout");
	//view.setAttribute("data-stretch", "true");

	content = document.createElement("div");
	content.setAttribute("data-role", "content");
	listview = document.createElement("ul");
	listview.setAttribute("id", viewConfiguration.viewID + "_ul");
	listview.setAttribute("data-role", "listview");
	listview.setAttribute("data-style", "inset");
	content.appendChild(listview);
	
	view.appendChild(content);
	document.body.appendChild(view);
}
function AddCustomFieldsForMobile(screenID) {
    var screenNode, headerNode, fieldNodes, displayProperty, fieldID, filterModeValue, customFieldCounter = 0, typeNode, typeValue;
    var screenNode = xmlDocUI.getElementsByTagName(screenID);
    var no_of_fields_per_page = 14; /* NUMBER OF FIELDS PER VIEW*/
    if (screenNode.length != 0) {
        var blocks = screenNode[0].childNodes; /* SCALAR AND VECTOR BLOCKS OF THE ACTIVE SCREEN */
        for (var blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
            var blockName = blocks[blockIndex].nodeName;
            if (blockName.indexOf("header") != -1) { /* SCALAR BLOCK */
                var fieldNodes = blocks[blockIndex].getElementsByTagName("field"); /* SCALAR FIELDS */
                for (var fieldIndex = 0; fieldIndex < fieldNodes.length; fieldIndex++) {
                    displayProperty = fieldNodes[fieldIndex].getAttribute("display");
                    if (displayProperty == "true") {
						 /* PAGE CREATION */
						if(fieldNodes[fieldIndex].getElementsByTagName("type")[0].childNodes[0].nodeValue == "signature") {
							customFieldCounter = 0;
							var viewLength = getViews(screenID).length;
							createPage({
								viewID: screenID + "_child_" + (viewLength),
								screenID: screenID
							});				
						}
						else {
							if (customFieldCounter >= no_of_fields_per_page) {
								customFieldCounter = 0;
								var viewLength = getViews(screenID).length;
								createPage({
									viewID: screenID + "_child_" + (viewLength),
									screenID: screenID
								});
							}
							customFieldCounter = customFieldCounter + 1;
						}

						var viewLength = getViews(screenID).length; /* FIELD CREATION */
						if (viewLength == 1) {
							listviewid = screenID + "_ul";
						} else {
							listviewid = screenID + "_child_" + (viewLength - 1) + "_ul";
						}
						var fieldObfieldIndexect = {
							listViewID: listviewid,
							fieldID: screenID + "_" + fieldNodes[fieldIndex].getAttribute("id"),
							typeValue: fieldNodes[fieldIndex].getElementsByTagName("type")[0].childNodes[0].nodeValue
						}

                        CreateInputElement(fieldObfieldIndexect); /* FIELD CREATION */

                        /* CONFIGURATION BASED ON TYPE */
                        if (fieldObfieldIndexect.typeValue == "text") {
                            var maxlengthNode = fieldNodes[fieldIndex].getElementsByTagName("maxlength");
                            if (maxlengthNode.length != 0) {
                                $("#" + fieldObfieldIndexect.fieldID).attr("maxlength", maxlengthNode[0].childNodes[0].nodeValue);
                            }
                            $("#" + fieldObfieldIndexect.fieldID).attr("class", "k-textbox");
                            $("#" + fieldObfieldIndexect.fieldID).attr("type", "text");
                        } else if (fieldObfieldIndexect.typeValue == "radio") {
                            var options = fieldNodes[fieldIndex].getElementsByTagName("options");
                            var option = options[0].getElementsByTagName("option");
                            for (var i = 0; i < option.length; i++) {
                                var li = document.createElement("li");
                                li.setAttribute("id", fieldObfieldIndexect.fieldID + "_" + option[i].getAttribute("id"));
                                litext = document.createTextNode(option[i].childNodes[0].nodeValue);
                                li.appendChild(litext);
                                document.getElementById(fieldObfieldIndexect.fieldID).appendChild(li);
                            }
                        }else if (fieldObfieldIndexect.typeValue == "boolean") {
                            var trueValue = fieldNodes[fieldIndex].getElementsByTagName("true")[0].childNodes[0].nodeValue;
                            var falseValue = fieldNodes[fieldIndex].getElementsByTagName("false")[0].childNodes[0].nodeValue;
                            $("#" + fieldObfieldIndexect.fieldID).kendoMobileSwitch({
                                onLabel: trueValue,
                                offLabel: falseValue
                            });
                        }else if (fieldObfieldIndexect.typeValue == "signature") {
                            var canvas = $("#" + fieldObfieldIndexect.fieldID + " canvas");
							canvas.attr("width",window.screen.width - 100);
							var tp = $("#" + fieldObfieldIndexect.fieldID).signaturePad({
								drawOnly: true,
								defaultAction: 'drawIt',
								validateFields: false,
								lineWidth: 0,
								output: null,
								sigNav: null,
								name: null,
								typed: null,
								clear: 'input[type=reset]',
								typeIt: null,
								drawIt: null,
								typeItDesc: null,
								drawItDesc: null,
							});
							eval(fieldObfieldIndexect.fieldID + "=tp");
                        }else if (fieldObfieldIndexect.typeValue == "number") {
                            var formatNode,
                                minimumNode,
                                maximumNode,
                                stepNode,
                                formatValue = "n",
                                minimumValue = null,
                                maximumValue = null,
                                stepValue = 1;

                            formatNode = fieldNodes[fieldIndex].getElementsByTagName("format");
                            if (formatNode.length != 0) {
                                formatValue = formatNode[0].childNodes[0].nodeValue;
                            }

                            minimumNode = fieldNodes[fieldIndex].getElementsByTagName("minimum");
                            if (minimumNode.length != 0) {
                                minimumValue = parseFloat(minimumNode[0].childNodes[0].nodeValue);
                            }

                            maximumNode = fieldNodes[fieldIndex].getElementsByTagName("maximum");
                            if (maximumNode.length != 0) {
                                maximumValue = parseFloat(maximumNode[0].childNodes[0].nodeValue);
                            }

                            stepNode = fieldNodes[fieldIndex].getElementsByTagName("step");
                            if (stepNode.length != 0) {
                                stepValue = parseFloat(stepNode[0].childNodes[0].nodeValue);
                            }

                            $("#" + fieldObfieldIndexect.fieldID).attr("type", "number");
                            $("#" + fieldObfieldIndexect.fieldID).attr("min", minimumValue);
                            $("#" + fieldObfieldIndexect.fieldID).attr("max", maximumValue);
                        } else if (fieldObfieldIndexect.typeValue == "date") {

                            var formatNode,
                                minimumNode,
                                maximumNode,
								formatValue = "dd-MM-yyyy",
								minimumValue = new Date(1900, 0, 1),
                                maximumValue = new Date(2099, 11, 31);
								

                            formatNode = fieldNodes[fieldIndex].getElementsByTagName("format");
                            if (formatNode.length != 0) {
                                formatValue = formatNode[0].childNodes[0].nodeValue;
                            }

                            minimumNode = fieldNodes[fieldIndex].getElementsByTagName("minimum");
                            if (minimumNode.length != 0) {
                                if (minimumNode[0].childNodes[0].nodeValue == "NEWDATE") {
                                    minimumValue = new Date();
                                } else {
                                    minimumValue = eval(minimumNode[0].childNodes[0].nodeValue);
                                }
                            }

                            maximumNode = fieldNodes[fieldIndex].getElementsByTagName("maximum");
                            if (maximumNode.length != 0) {
                                if (maximumNode[0].childNodes[0].nodeValue == "NEWDATE") {
                                    maximumValue = new Date();
                                } else {
                                    maximumValue = eval(maximumNode[0].childNodes[0].nodeValue);
                                }
                            }
							
							var dateObject = {
								fieldID: fieldObfieldIndexect.fieldID,
								format: formatValue,
								minimum: minimumValue,
								maximum: maximumValue
							}
							InitializePhonegapDatePicker(dateObject);
                        } else if (fieldObfieldIndexect.typeValue == "time") {
                            var formatNode,
                                minimumNode,
                                maximumNode,
                                formatValue = "HH:mm",
                                minimumValue = new Date(1900, 0, 1),
                                maximumValue = new Date(2099, 11, 31),

                            formatNode = fieldNodes[fieldIndex].getElementsByTagName("format");
                            if (formatNode.length != 0) {
                                formatValue = formatNode[0].childNodes[0].nodeValue;
                            }

                            minimumNode = fieldNodes[fieldIndex].getElementsByTagName("minimum");
                            if (minimumNode.length != 0) {
                                if (minimumNode[0].childNodes[0].nodeValue == "NEWDATE") {
                                    minimumValue = new Date();
                                } else {
                                    minimumValue = eval(minimumNode[0].childNodes[0].nodeValue);
                                }
                            }

                            maximumNode = fieldNodes[fieldIndex].getElementsByTagName("maximum");
                            if (maximumNode.length != 0) {
                                if (maximumNode[0].childNodes[0].nodeValue == "NEWDATE") {
                                    maximumValue = new Date();
                                } else {
                                    maximumValue = eval(maximumNode[0].childNodes[0].nodeValue);
                                }
                            }
							var timeObject = {
								fieldID: fieldObfieldIndexect.fieldID,
								format: formatValue,
								minimum: minimumValue,
								maximum: maximumValue
							}
							InitializePhonegapTimePicker(timeObject);
                        } else {
                            var initializationObfieldIndexect = {},
                                dataTextFieldNode, dataValueFieldNode, defaultValueNode, templateNode, dataSourceNode, defaultValueDescriptionNode;

                            initializationObfieldIndexect.fieldID = fieldObfieldIndexect.fieldID;
                            initializationObfieldIndexect.filterMode = filterModeValue;

                            dataTextFieldNode = fieldNodes[fieldIndex].getElementsByTagName("dataTextField");
                            if (dataTextFieldNode.length != 0) {
                                initializationObfieldIndexect.dataTextField = dataTextFieldNode[0].childNodes[0].nodeValue;
                            }

                            dataValueFieldNode = fieldNodes[fieldIndex].getElementsByTagName("dataValueField");
                            if (dataValueFieldNode.length != 0) {
                                initializationObfieldIndexect.dataValueField = dataValueFieldNode[0].childNodes[0].nodeValue;
                            }

                            defaultValueNode = fieldNodes[fieldIndex].getElementsByTagName("defaultValue");
                            if (defaultValueNode.length != 0) {
                                try {
                                    initializationObfieldIndexect.defaultValue = eval(defaultValueNode[0].childNodes[0].nodeValue);
                                } catch (e) {
                                    initializationObfieldIndexect.defaultValue = "";
                                }
                            }

                            templateNode = fieldNodes[fieldIndex].getElementsByTagName("template");
                            if (templateNode.length != 0) {
                                initializationObfieldIndexect.template = templateNode[0].childNodes[0].nodeValue;
                            }

                            dataSourceNode = fieldNodes[fieldIndex].getElementsByTagName("dataSource");
                            if (dataSourceNode.length != 0) {
                                if (dataSourceNode[0].childElementCount == 0) {
                                    initializationObfieldIndexect.dataSource = eval(dataSourceNode[0].childNodes[0].nodeValue);
                                } else {
                                    var applicationNameNode, serviceNameNode, inputParameterNode;
                                    initializationObfieldIndexect.dataSource = {};

                                    applicationNameNode = dataSourceNode[0].getElementsByTagName("applicationName");
                                    if (applicationNameNode.length != 0) {
                                        initializationObfieldIndexect.dataSource.applicationName = applicationNameNode[0].childNodes[0].nodeValue;
                                    }

                                    serviceNameNode = dataSourceNode[0].getElementsByTagName("serviceName");
                                    if (serviceNameNode.length != 0) {
                                        initializationObfieldIndexect.dataSource.serviceName = serviceNameNode[0].childNodes[0].nodeValue;
                                    }

                                    inputParameterNode = dataSourceNode[0].getElementsByTagName("inputParameter");
                                    if (inputParameterNode.length != 0) {
                                        initializationObfieldIndexect.dataSource.inputParameter = {};
                                        if (inputParameterNode[0].childElementCount != 0) {
                                            for (var k = 0; k < inputParameterNode[0].childElementCount; k++) {
                                                if (inputParameterNode[0].childNodes[k].childNodes[0] != undefined) {
                                                    initializationObfieldIndexect.dataSource.inputParameter[inputParameterNode[0].childNodes[k].nodeName] = inputParameterNode[0].childNodes[k].childNodes[0].nodeValue;
                                                } else {
                                                    initializationObfieldIndexect.dataSource.inputParameter[inputParameterNode[0].childNodes[k].nodeName] = "";
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            defaultValueDescriptionNode = fieldNodes[fieldIndex].getElementsByTagName("defaultValueDescription");
                            if (defaultValueDescriptionNode.length != 0) {
                                var codeTypeNode, parentCodeValueNode;
                                initializationObfieldIndexect.defaultValueDescription = {};

                                codeTypeNode = defaultValueDescriptionNode[0].getElementsByTagName("codeType");
                                if (codeTypeNode.length != 0) {
                                    initializationObfieldIndexect.defaultValueDescription.codeType = codeTypeNode[0].childNodes[0].nodeValue;
                                }

                                parentCodeValueNode = defaultValueDescriptionNode[0].getElementsByTagName("parentCodeValue");
                                if (parentCodeValueNode.length != 0) {
                                    initializationObfieldIndexect.defaultValueDescription.parentCodeValue = parentCodeValueNode[0].childNodes[0].nodeValue;
                                }
                            }

                            if (fieldObfieldIndexect.typeValue == "ddl" || fieldObfieldIndexect.typeValue == "combo") {
                                var childFieldIDNode, cascadingNode;

                                childFieldIDNode = fieldNodes[fieldIndex].getElementsByTagName("childFieldID");
                                if (childFieldIDNode.length != 0) {
                                    initializationObfieldIndexect.childFieldID = screenID + "_" + childFieldIDNode[0].childNodes[0].nodeValue;
                                }

                                cascadingNode = fieldNodes[fieldIndex].getElementsByTagName("cascading");
                                if (cascadingNode.length != 0) {
                                    var cascadeFromNode, cascadeFromFieldNode, defaultCascadeValueNode;
                                    initializationObfieldIndexect.cascading = {};

                                    cascadeFromNode = cascadingNode[0].getElementsByTagName("cascadeFrom");
                                    if (cascadeFromNode.length != 0) {
                                        initializationObfieldIndexect.cascading.cascadeFrom = screenID + "_" + cascadeFromNode[0].childNodes[0].nodeValue;
                                    }

                                    cascadeFromFieldNode = cascadingNode[0].getElementsByTagName("cascadeFromField");
                                    if (cascadeFromFieldNode.length != 0) {
                                        initializationObfieldIndexect.cascading.cascadeFromField = cascadeFromFieldNode[0].childNodes[0].nodeValue;
                                    }

                                    defaultCascadeValueNode = cascadingNode[0].getElementsByTagName("defaultCascadeValue");
                                    if (defaultCascadeValueNode.length != 0) {
                                        try {
                                            initializationObfieldIndexect.cascading.defaultCascadeValue = eval(defaultCascadeValueNode[0].childNodes[0].nodeValue);
                                        } catch (e) {
                                            initializationObfieldIndexect.cascading.defaultCascadeValue = "";
                                        }
                                    }
                                }
                            }

                            if (fieldObfieldIndexect.typeValue == "ddl") {
                                eval(fieldObfieldIndexect.fieldID + "= InitializeKendoDropDownList(initializationObfieldIndexect)");
                            } else if (fieldObfieldIndexect.typeValue == "combo") {
                                eval(fieldObfieldIndexect.fieldID + "= InitializeKendoComboBox(initializationObfieldIndexect)");
                            } else if (fieldObfieldIndexect.typeValue == "multiselect") {
                                eval(fieldObfieldIndexect.fieldID + "= InitializeKendoMultiSelect(initializationObfieldIndexect)");
                            }
                        }
                    }
                }
            } else if (blockName.indexOf("detail") != -1) { /* VECTOR BLOCK */
				displayProperty = blocks[blockIndex].getAttribute("display");
                if (displayProperty == "true") {
					if (customFieldCounter >= no_of_fields_per_page) {
						customFieldCounter = 0;
						var viewLength = getViews(screenID).length;
						createPage({
							viewID: screenID + "_child_" + (viewLength),
							screenID: screenID
						});
					}
					customFieldCounter = customFieldCounter + 1;
					
					var viewLength = getViews(screenID).length; /* FIELD CREATION */
					if (viewLength == 1) {
						listviewid = screenID + "_ul";
					} else {
						listviewid = screenID + "_child_" + (viewLength - 1) + "_ul";
					}
					fieldObfieldIndexect = {
						screenID: screenID,
						listViewID: listviewid,
						fieldID: blockName,
						typeValue: "grid"
					}
					CreateInputElement(fieldObfieldIndexect); /* FIELD CREATION */
					
					/* CONFIGURATION BASED ON TYPE */
					if (fieldObfieldIndexect.typeValue == "grid") {
                            $("#" + fieldObfieldIndexect.fieldID).parent().css("height", "400px");
							$("#" + fieldObfieldIndexect.fieldID).addClass("adaptive-grid-wrapper");
							var detailIndex = fieldObfieldIndexect.fieldID.substr(fieldObfieldIndexect.fieldID.lastIndexOf("_")+1);							
							var temp_array = new kendo.data.ObservableArray([]);
							var schema_model = GetDataSourceSchema(fieldObfieldIndexect.screenID,fieldObfieldIndexect.screenID + "_datasource_" + detailIndex);
							var datasource = eval(fieldObfieldIndexect.screenID + "_datasource_" + detailIndex + "_temp =  new kendo.data.DataSource({data : temp_array, pageSize : 10,schema :{ model: schema_model }})");			
							var toolbars = ["create"];
							eval(fieldObfieldIndexect.screenID + "_grid_" + detailIndex + "= InitializeKendoGrid({sectionID: '" + fieldObfieldIndexect.fieldID + "',toolbar: toolbars,mobile : true,editable : 'popup',dataSource: datasource,height: 300,pageSize: 2})");
					} 
				}
            }
        }
    }
}
function CreateInputElement(fieldConfiguration) {
	var ulTag,
	liTag,
	labelTag,
	inputTag,
	selectTag,
	brTag,
	descriptionSpanTag,
	validationSpanTag,
	hrTag,radioTag,
	divTage,
	gridTage,
	resetButton,
	textNode;

	ulTag = document.getElementById(fieldConfiguration.listViewID);
	liTag = document.createElement("li");
	liTag.style.height = "50px";
	labelTag = document.createElement("label");
	labelTag.setAttribute("id", fieldConfiguration.fieldID + "_lbl");
	labelTag.setAttribute("name", fieldConfiguration.fieldID + "_lbl");
	labelTag.style.display = "block";
	labelTag.style.float = "left";
	liTag.appendChild(labelTag);

	if (fieldConfiguration.typeValue == "ddl") {
		selectTag = document.createElement("select");
		selectTag.setAttribute("id", fieldConfiguration.fieldID);
		liTag.appendChild(selectTag);
	} 
	else if(fieldConfiguration.typeValue == "radio") {
		radioTag = document.createElement("ul");
		radioTag.setAttribute("id",fieldConfiguration.fieldID);
		radioTag.setAttribute("data-role","buttongroup");
		liTag.appendChild(radioTag);
	}
	else if(fieldConfiguration.typeValue == "boolean") {
		inputTag = document.createElement("input");
		inputTag.setAttribute("id", fieldConfiguration.fieldID);
		inputTag.setAttribute("data-role","switch");
		liTag.appendChild(inputTag);
	}
	else if(fieldConfiguration.typeValue == "grid") {
		divTage = document.createElement("div");
		divTage.setAttribute("id",fieldConfiguration.fieldID);
		divTage.setAttribute("class","adaptive-grid-wrapper");
		gridTage = document.createElement("div");
		gridTage.setAttribute("id",fieldConfiguration.screenID + "_grid_" + fieldConfiguration.fieldID.substr(fieldConfiguration.fieldID.lastIndexOf("_")+1));
		divTage.appendChild(gridTage);
		liTag.appendChild(divTage);
	}
	else if(fieldConfiguration.typeValue == "signature") {
		divTage = document.createElement("div");
		divTage.setAttribute("id",fieldConfiguration.fieldID);
		gridTage = document.createElement("canvas");
		gridTage.setAttribute("class","pad");
		gridTage.style.border = "ridge";
		divTage.appendChild(gridTage);
		resetButton = document.createElement("Button");
		textNode = document.createTextNode("Clear");
		resetButton.appendChild(textNode);
		resetButton.setAttribute("id",fieldConfiguration.fieldID + "_clear");
		resetButton.setAttribute("class","k-button");
		resetButton.setAttribute("class","clear-button");
		liTag.appendChild(divTage);
		liTag.style.height = "";
		liTag.appendChild(resetButton);
	}
	else {
		inputTag = document.createElement("input");
		inputTag.setAttribute("id", fieldConfiguration.fieldID);
		liTag.appendChild(inputTag);
	}
	ulTag.appendChild(liTag);
}
function getViews(screenID) {
	var filteredViews = $.grep($("[data-role='view']"), function(element, index) {
			if(element.id.indexOf(screenID) != -1)
			return element.id;
		});
	return filteredViews;
}
/* FUNCTIONS BELOW SHOULD BE MODIFIED OR REMOVED IN THE FUTURE */
/*-------------------------START-------------------------------*/
function ResolveLabels(screenId)
{
	for(var i = 0; i < xmlDocLBL.childNodes[0].childElementCount; i++)
	{
		var screenDetails = xmlDocLBL.getElementsByTagName("screen")[i];
		if(screenDetails != undefined)
		{
			var configuredScreenId = screenDetails.getAttribute("id");
			if(screenId == configuredScreenId)
			{
				var screenLabelDetails = screenDetails.getElementsByTagName("label");
				for(var j = 0; j < screenLabelDetails.length; j++)
				{								
					var labelDetails = screenLabelDetails[j];
					var labelId = labelDetails.getAttribute("id");									
					var labelText = labelDetails.childNodes[0].nodeValue;
					eval("$('label[for = " + '"' + labelId + '"' + "]')" + ".text('" + labelText.trim() + "')");
				}
				break;
			}
		}
	}
}

function addingProperty()
{
	for(var i = 0; i < configured_xml_value.childNodes[0].childElementCount; i++)
	{
		var screen_details = configured_xml_value.getElementsByTagName("screen")[i];
		if(screen_details != undefined)
		{
			var config_xml_screen_id = screen_details.getAttribute("id");
			if($('#container')[0].firstChild.id == config_xml_screen_id)
			{
				var no_of_fields = screen_details.getElementsByTagName("field");
				for(var i = 0; i < no_of_fields.length; i++)
				{
					var field_details = screen_details.getElementsByTagName("field")[i];					
					var field_id = field_details.getAttribute("id");
					if(field_details.getElementsByTagName("maxlength")[0] != undefined)
					{
						if(field_details.getElementsByTagName("maxlength")[0].childNodes.length != 0)
						{
							$('#' + field_id).attr('maxlength',field_details.getElementsByTagName("maxlength")[0].childNodes[0].nodeValue);
						}
					}
					if(field_details.getElementsByTagName("pattern")[0] != undefined)
					{
						if(field_details.getElementsByTagName("pattern")[0].childNodes.length != 0)
						{
							$('#' + field_id).attr('pattern',field_details.getElementsByTagName("pattern")[0].childNodes[0].nodeValue);
						}					
					}
					if(field_details.getElementsByTagName("mandatory")[0] != undefined)
					{
						if(field_details.getElementsByTagName("mandatory")[0].childNodes.length != 0)
						{
							var mandatory_value = field_details.getElementsByTagName("mandatory")[0].childNodes[0].nodeValue;
							if(mandatory_value == "1")
							{
								$("#" + field_id).attr('required','required');
								$("#span_" + field_id).text("*").addClass("required");
							}							
						}
					}						
				}			
			}
		}
	}
}

screen_datasource = "";
function retrieve_user_defined_fields()
{
	
	//$('#'+$('#container')[0].firstChild.id+'_attr_1').val(screen_datasource.attribute_1);
	//$('#'+$('#container')[0].firstChild.id+'_attr_2').val(screen_datasource.attribute_2);
	//$('#'+$('#container')[0].firstChild.id+'_attr_3').val(screen_datasource.attribute_3);

	for(var i=1;i<parseInt(char_field)+1 ;i++)
	{
		$('#'+$('#container')[0].firstChild.id+'_char_'+i).val(screen_datasource["udf_char_"+i]);
	}
	for(var i=1;i<bit_field.length+1 ;i++)
	{
		if(screen_datasource["udf_bit_"+i] == "1")
		{
			$('#'+$('#container')[0].firstChild.id+'_bit_'+i).attr("checked",true)
		}
	}
	for(var i=1;i<parseInt(float_field)+1 ;i++)
	{
		this["float"+i] = $('#'+$('#container')[0].firstChild.id+'_float_'+i).data("kendoNumericTextBox");
		if(this["float"+i] != null)
		{
			if(screen_datasource["udf_float_"+i] != undefined && screen_datasource["udf_float_"+i] != "")
			{
				this["float"+i].value(screen_datasource.udf_float_1);
			}
			else
			{
				this["float"+i].value("");
			}
		}
	}
		
	for(var i=1;i<parseInt(analysis_field)+1 ;i++)
	{
		this["analysis"+i]=$('#'+$('#container')[0].firstChild.id+'_analysis_'+i).data("kendoDropDownList");
		if(this["analysis"+i] != null)
		{
			if(screen_datasource['analysis_code'+i] != undefined && screen_datasource['analysis_code'+i] != "")
			{
				this["analysis"+i].value(screen_datasource.analysis_code1);
			}
			else
			this["analysis"+i].value("");
		}
	}
	for(var i=1;i<parseInt(date_field)+1 ;i++)
	{
		this["date1"+i] = $('#'+$('#container')[0].firstChild.id+'_date_'+i).data("kendoDateTimePicker");
		if(this["date1"+i] != null)
		{
			if(screen_datasource['udf_date_'+i] != undefined && screen_datasource['udf_date_'+i] != "")
			{
				this["date_val"+i]=screen_datasource['udf_date_'+i].split("-");
				this["date1"+i].value(this["date_val"+i][2]+"-"+this["date_val"+i][1]+"-"+this["date_val"+i][0]+" "+screen_datasource["udf_date_"+i]+"_hour"+":"+screen_datasource["udf_date_"+i]+"_minute");
			}
			else
			{
				this["date1"+i].value("");
			}
		}
	}
}
	
function save_user_defined_fields()
{
	/*if($('#'+$('#container')[0].firstChild.id+'_attr_1').val() != undefined)
			{
				attr_field1 = $('#'+$('#container')[0].firstChild.id+'_attr_1').val() ;
			}
			else
			{
				attr_field1= "";
			}
	if($('#'+$('#container')[0].firstChild.id+'_attr_2').val() != undefined)
			{
				attr_field2 = $('#'+$('#container')[0].firstChild.id+'_attr_2').val() ;
			}
			else
			{
				attr_field2= "";
			}
	if($('#'+$('#container')[0].firstChild.id+'_attr_3').val() != undefined)
			{
				attr_field3 = $('#'+$('#container')[0].firstChild.id+'_attr_3').val() ;
			}
			else
			{
				attr_field3= "";
			}*/
			
			
	for(var i=1;i<parseInt(bit_field)+1;i++)
	{
		if($('#'+$('#container')[0].firstChild.id+'_bit_'+i).is(":checked"))
			{
				this["bit_value"+i] ="1";
			}
			else
			{
				this["bit_value"+i]="0";
			}
	}
	
	for(var i=1;i<parseInt(date_field)+1;i++)
	{
		if($('#'+$('#container')[0].firstChild.id+'_date_'+i).val() != undefined && $('#'+$('#container')[0].firstChild.id+'_date_'+i).val() != "")
		{
			var date1=$('#'+$('#container')[0].firstChild.id+'_date_'+i).val().substr(0,10).split("-");
			this["date_field_"+i]=date1[2]+"-"+date1[1]+"-"+date1[0];
			var time1=$('#'+$('#container')[0].firstChild.id+'_date_'+i).val().substr(11,5).split(":");
			this["hour_field_"+i]=time1[0];
			this["min_field_"+i]=time1[1];
		}
		else
		{
			this["date_field_"+i]="";
			this["hour_field_"+i]="";
			this["min_field_"+i]="";
		}
	}

	for(var i=1;i<parseInt(char_field)+1;i++)
	{
	
		if($('#'+$('#container')[0].firstChild.id+'_char_'+i).val() != undefined)
			{
				this["char_field"+ i]= $('#'+$('#container')[0].firstChild.id+'_char_'+i).val() ;
			}
			else
			{
				this["char_field" + i] = "";
			}
	}
	for(var i=1;i<parseInt(float_field)+1;i++)
	{
		if($('#'+$('#container')[0].firstChild.id+'_float_'+i).val() != undefined && $('#'+$('#container')[0].firstChild.id+'_float_'+i).val() != "")
			{
				this["float_field"+i] = $('#'+$('#container')[0].firstChild.id+'_float_'+i).val() ;
			}
			else
			{
				this["float_field"+i ] = "0";
			}
	}	
	for(var i=1;i<parseInt(analysis_field)+1;i++)
	{
		if($('#'+$('#container')[0].firstChild.id+'_analysis_'+i).val() != undefined)
		{
			this["analysis_field"+i ] = $('#'+$('#container')[0].firstChild.id+'_analysis_'+i).val() ;
		}
		else
		{
			this["analysis_field"+i ]= "";
		}
	}
}

function  addingAttributeValue()
{
		for(var i=0;i<configured_xml_value.childNodes[0].childElementCount;i++)
		{
			screen_details=configured_xml_value.getElementsByTagName("screen")[i];
			screen_details_of_label=configured_label_value.getElementsByTagName("screen")[i];
			if(screen_details != undefined)
			{
				config_xml_screen_id=screen_details.getAttribute("id");
				if(screenID == config_xml_screen_id)
				{
					total_no_of_field_details=screen_details.getElementsByTagName("no_of_fields")[0];
					char_field = total_no_of_field_details.getElementsByTagName("char")[0].childNodes[0].nodeValue;
					bit_field = total_no_of_field_details.getElementsByTagName("bit")[0].childNodes[0].nodeValue;
					float_field = total_no_of_field_details.getElementsByTagName("float")[0].childNodes[0].nodeValue;
					date_field = total_no_of_field_details.getElementsByTagName("date")[0].childNodes[0].nodeValue;
					analysis_field = total_no_of_field_details.getElementsByTagName("analysis")[0].childNodes[0].nodeValue;
					no_of_fields=screen_details.getElementsByTagName("field");
					for(var i=0;i<no_of_fields.length;i++)
					{

						field_details=screen_details.getElementsByTagName("field")[i];
						
						field_id=field_details.getAttribute("id");
						if(field_details.getElementsByTagName("applicable")[0].childNodes[0].nodeValue == "1")
						{
							if(field_details.getElementsByTagName("type")[0] !=undefined)
							{
								if(field_details.getElementsByTagName("type")[0].childNodes.length != 0)
								{
										dt=document.createElement("dt");
										dt.setAttribute("class","term_two");
										var label= document.createElement("Label");
										label.setAttribute("for",field_id);
										var element = document.createElement("input");
										var dd= document.createElement("dd");
										dd.setAttribute("class","value");
										var dd1= document.createElement("dd");
										dd1.setAttribute("class","colon");
										element.setAttribute("id",field_id);
										element.setAttribute("name",field_id);
										var hr= document.createElement("hr");
										var span = document.createElement("span");
										span.setAttribute("id","span_"+field_id);
										span.setAttribute("class","req")
										
										var dl = document.getElementById($('#container')[0].firstChild.id+"_dl");
										dl.appendChild(dt);
										dt.appendChild(label);
										dl.appendChild(dd1);
										dl.appendChild(dd);
										dd.appendChild(element);
										if(i%2 == 1)
										{
											dl.appendChild(hr);
										}
										dt.appendChild(span);
										
									/*function callingValidation()
									{
										if(field_details.getElementsByTagName("maxlength")[0] !=undefined)
										{
											if(field_details.getElementsByTagName("maxlength")[0].childNodes.length != 0)
												$('#'+field_id).attr('maxlength',field_details.getElementsByTagName("maxlength")[0].childNodes[0].nodeValue);
										}
										if(field_details.getElementsByTagName("pattern")[0] !=undefined)
										{
											if(field_details.getElementsByTagName("pattern")[0].childNodes.length != 0)
												$('#'+field_id).attr('pattern',field_details.getElementsByTagName("pattern")[0].childNodes[0].nodeValue);
										
										}
										if(field_details.getElementsByTagName("mandatory")[0] !=undefined)
										{
											if(field_details.getElementsByTagName("mandatory")[0].childNodes.length != 0)
											{
												mandatory_value=field_details.getElementsByTagName("mandatory")[0].childNodes[0].nodeValue;
												if(mandatory_value == "1")
												{
													$("#"+field_id).attr('required','required');
													$("#span_"+field_id).text("*");
												}
											}
										}
									} */
									if(field_details.getElementsByTagName("type")[0].childNodes[0].nodeValue == "text") 
									{
										
										element.setAttribute("class","k-textbox");
										// callingValidation();
										
									}
									if(field_details.getElementsByTagName("type")[0].childNodes[0].nodeValue == "bit") 
									{
										
										element.setAttribute("type","checkbox");
										// callingValidation();
										
									}
									if(field_details.getElementsByTagName("type")[0].childNodes[0].nodeValue == "float") 
									{
										// callingValidation();
										$('#'+field_id).kendoNumericTextBox({min:"1"});
									}
									if(field_details.getElementsByTagName("type")[0].childNodes[0].nodeValue == "date") 
									{
										// callingValidation();
										$('#'+field_id).kendoDateTimePicker({format:"dd-MM-yyyy hh:mm"});
									}
									if(field_details.getElementsByTagName("type")[0].childNodes[0].nodeValue == "ddl_or_combo") 
									{
										// callingValidation();
										array=[];
										$("#"+field_id).kendoDropDownList({
											optionLabel:"---Select---",
											dataTextField:"description",
											dataValueField:"code",
											dataSource:array
	
										});
										field_name = $("#"+field_id).data("kendoDropDownList");
										if(field_details.getElementsByTagName("lov_code_type")[0] != undefined)
										{
											if(field_details.getElementsByTagName("lov_code_type")[0].childNodes.length != 0)
											{
												list_of_codes=[];
												lov_code_type=field_details.getElementsByTagName("lov_code_type")[0].childNodes[0].nodeValue;
												code_type=lov_code_type;
												search_field_1="";
												search_field_2="";
												executeService_retrieve_listof_values_for_codes();
							
												field_name.dataSource.data(list_of_codes);
											}
										}
									}
								}
							}
						}
					}
					
					/*for(var j=0;j<configured_label_value.childNodes[0].childElementCount;j++)
					{
						screen_details_of_label=configured_label_value.getElementsByTagName("screen")[j];
						if(screen_details_of_label != undefined)
						{
							config_lbl_screen_id=screen_details_of_label.getAttribute("id");
							if(config_xml_screen_id == config_lbl_screen_id)
							{
								no_of_labels=screen_details_of_label.getElementsByTagName("label");
								for(var k=0;k<no_of_fields.length;k++)
								{
									field_details=screen_details.getElementsByTagName("field")[k];
									field_id=field_details.getAttribute("id");
									for(var l=0;l<no_of_labels.length;l++)
									{
										label_details=screen_details_of_label.getElementsByTagName("label")[l];
										label_id=label_details.getAttribute("id");
										if(field_id == label_id )
										{
											if(field_details.getElementsByTagName("applicable")[0].childNodes[0].nodeValue == 1)
											{
												label_text_value=screen_details_of_label.getElementsByTagName("label")[l].childNodes[0].nodeValue;
												eval( "$('label[for="+'"'+ label_id+'"'+"]')"+".text('"+label_text_value.trim()+"')" );
												//eval( "$('#"+ label_id+"')"+".text('"+label_text_value.trim()+"')" );
														
											}
										}
									}
								}
							}
						}
					} */
				}
			}
		}
}

/*--------------- END-------------------------*/

console.log("mobileConfigurationEngine");
var mobileConfigurationEngine = {
	applyConfiguredLabels : function (screenID, eventVerb) {
		var currentLabelConfig,
		actualLabelConfig,
		sourceLabelFields,
		sourceLabelFieldsCounter,
		fieldID;
		if (mobileConfigurationEngine.var.labelConfigurations.length != 0) {
			currentLabelConfig = $.grep(mobileConfigurationEngine.var.labelConfigurations, function (element, index) {
					return element.screenID == screenID;
				})[0];
			if (currentLabelConfig.length != 0) {
				if (eventVerb == undefined) {
					actualLabelConfig = currentLabelConfig;
				} else {
					actualLabelConfig = currentLabelConfig[eventVerb];
				}
				sourceLabelFields = $.grep($("#" + screenID).find("[data-label-type='main']"), function (element, index) {
						return $(element).attr("id").length == $(element).attr("id").lastIndexOf("_lbl") + 4;
					});
				for (sourceLabelFieldsCounter = 0; sourceLabelFieldsCounter < sourceLabelFields.length; sourceLabelFieldsCounter++) {
					fieldID = $(sourceLabelFields[sourceLabelFieldsCounter]).attr("id").replace(screenID + "_", "");
					fieldID = fieldID.substring(0, fieldID.length - 4);
					$(sourceLabelFields[sourceLabelFieldsCounter]).prepend(actualLabelConfig.labels[fieldID]);
				}
			}
		}
	},
	createConfiguredFields : function (screenID, eventVerb) {
		var currentUiConfig,
		sourceFields,
		fieldsCounter,
		actualDataSource,
		inputParameterNode,
		actualDefaultValue;
		if (mobileConfigurationEngine.var.uiConfigurations.length != 0) {
			currentUiConfig = $.grep(mobileConfigurationEngine.var.uiConfigurations, function (element, index) {
					return element.screenID == screenID;
				})[0];
			if (currentUiConfig.length != 0) {
				if (eventVerb == undefined) {
					sourceFields = currentUiConfig.fields;
				} else {
					sourceFields = [];
					if (currentUiConfig[eventVerb] != undefined) {
						sourceFields = currentUiConfig[eventVerb].fields;
					}
				}
				for (fieldsCounter = 0; fieldsCounter < sourceFields.length; fieldsCounter++) {
					if (sourceFields[fieldsCounter].dataSource != undefined) {
						actualDataSource = eval(sourceFields[fieldsCounter].dataSource);
						if (actualDataSource.applicationName != undefined) {
							for (inputParameterNode in actualDataSource.inputParameter) {
								try {
									if (actualDataSource.inputParameter[inputParameterNode] != "") {
										actualDataSource.inputParameter[inputParameterNode] = eval(actualDataSource.inputParameter[inputParameterNode]);
									} else {
										actualDataSource.inputParameter[inputParameterNode] = actualDataSource.inputParameter[inputParameterNode];
									}
								} catch (e) {
									actualDataSource.inputParameter[inputParameterNode] = actualDataSource.inputParameter[inputParameterNode];
								}
							}
						}
					}
					try {
						actualDefaultValue = eval(sourceFields[fieldsCounter].defaultValue);
					} catch (e) {
						actualDefaultValue = sourceFields[fieldsCounter].defaultValue;
					}
					if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
						if($("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").length ==0) {
							$("#" + screenID + "_content").append("<span id = '" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group" + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group" + "'><div class='ui-field-contain'><fieldset data-role='collapsible'><legend><label id='" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_lbl' style='display: inline' data-label-type='main'></label><a id='" + sourceFields[fieldsCounter].parentGroupNode + "_check_ind' data-icon='check' data-role='button' data-inline='true' data-mini='true' style='float: right;display: none;width: 19px;height: 19px;' data-iconpos='notext'></a></legend></fieldset></div></span>");
						}
						$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<label id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "_lbl" + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "_lbl" + "' data-label-type='main'></label>");
					} else {
						$("#" + screenID + "_content").append("<span id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "_group" + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "_group" + "'></span>");
						$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<label id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "_lbl" + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "_lbl" + "' data-label-type='main'></label>");
					}
					if (sourceFields[fieldsCounter].type == "m_combobox") {
						if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<select id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-field-parent='" + sourceFields[fieldsCounter].parentGroupNode + "'></select>");
						} else {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<select id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "'></select>");
						}
						$("#" + screenID + "_" + sourceFields[fieldsCounter].id).initializeMCombobox({
							screenID : screenID,
							dataTextField : sourceFields[fieldsCounter].dataTextField,
							dataValueField : sourceFields[fieldsCounter].dataValueField,
							dataSource : actualDataSource,
							defaultValue : actualDefaultValue
						});
					} else if (sourceFields[fieldsCounter].type == "m_datebox") {
						if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<input id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-field-parent='" + sourceFields[fieldsCounter].parentGroupNode + "'></input>");
						} else {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<input id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "'></input>");
						}
						$("#" + screenID + "_" + sourceFields[fieldsCounter].id).initializeMDatebox({
							screenID : screenID,
							maximum : sourceFields[fieldsCounter].maximum,
							minimum : sourceFields[fieldsCounter].minimum
						});
					} else if (sourceFields[fieldsCounter].type == "m_dropdownlist") {
						if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<select id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-field-parent='" + sourceFields[fieldsCounter].parentGroupNode + "'></select>");
						} else {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<select id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "'></select>");
						}
						$("#" + screenID + "_" + sourceFields[fieldsCounter].id).initializeMDropdownlist({
							screenID : screenID,
							dataTextField : sourceFields[fieldsCounter].dataTextField,
							dataValueField : sourceFields[fieldsCounter].dataValueField,
							dataSource : actualDataSource,
							defaultValue : actualDefaultValue
						});
					} else if (sourceFields[fieldsCounter].type == "m_flipswitch") {
						if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<select id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-field-parent='" + sourceFields[fieldsCounter].parentGroupNode + "'></select>");
						} else {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<select id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "'></select>");
						}
						$("#" + screenID + "_" + sourceFields[fieldsCounter].id).initializeMFlipswitch({
							screenID : screenID,
							trueText : sourceFields[fieldsCounter].trueText,
							falseText : sourceFields[fieldsCounter].falseText,
							defaultValue : actualDefaultValue
						});
					} else if (sourceFields[fieldsCounter].type == "m_multiselect") {
						if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<select id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-field-parent='" + sourceFields[fieldsCounter].parentGroupNode + "'></select>");
						} else {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<select id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "'></select>");
						}
						$("#" + screenID + "_" + sourceFields[fieldsCounter].id).initializeMMultiselect({
							screenID : screenID,
							dataTextField : sourceFields[fieldsCounter].dataTextField,
							dataValueField : sourceFields[fieldsCounter].dataValueField,
							dataSource : actualDataSource,
							defaultValue : actualDefaultValue
						});
					} else if (sourceFields[fieldsCounter].type == "m_numerictextbox") {
						if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<input id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-field-parent='" + sourceFields[fieldsCounter].parentGroupNode + "'></input>");
						} else {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<input id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "'></input>");
						}
						$("#" + screenID + "_" + sourceFields[fieldsCounter].id).initializeMNumerictextbox({
							screenID : screenID,
							maximum : sourceFields[fieldsCounter].maximum,
							minimum : sourceFields[fieldsCounter].minimum
						});
					} else if (sourceFields[fieldsCounter].type == "m_textbox") {
						if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<input id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-field-parent='" + sourceFields[fieldsCounter].parentGroupNode + "'></input>");
						} else {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<input id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "'></input>");
						}
						$("#" + screenID + "_" + sourceFields[fieldsCounter].id).initializeMTextbox({
							screenID : screenID,
							maxlength : sourceFields[fieldsCounter].maxlength
						});
					} else if (sourceFields[fieldsCounter].type == "m_timebox") {
						if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<input id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-field-parent='" + sourceFields[fieldsCounter].parentGroupNode + "'></input>");
						} else {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<input id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "'></input>");
						}
						$("#" + screenID + "_" + sourceFields[fieldsCounter].id).initializeMTimebox({
							screenID : screenID
						});
					} else if (sourceFields[fieldsCounter].type == "m_textarea") {
						if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<textarea id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-field-parent='" + sourceFields[fieldsCounter].parentGroupNode + "'></textarea>");
						} else {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<textarea id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "'></textarea>");
						}
						$("#" + screenID + "_" + sourceFields[fieldsCounter].id).initializeMTextarea({
							screenID : screenID,
							maxlength : sourceFields[fieldsCounter].maxlength
						});
					} else if (sourceFields[fieldsCounter].type == "m_signaturepad") {
						if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY/iPFwxT6f//AdN17xH8QXloAAAAAElFTkSuQmCC' id='" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-widget-type = 'm_signaturepad' style='width:" + (window.innerWidth-window.innerWidth/100*10) + "px; height:" + (window.innerHeight/6) + "px;border-radius: 10px;'></img>");
						} else {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAIAAABPmPnhAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAQSURBVBhXY/iPFwxT6f//AdN17xH8QXloAAAAAElFTkSuQmCC' id='" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-widget-type = 'm_signaturepad' style='width:" + (window.innerWidth-window.innerWidth/100*10) + "px; height:" + (window.innerHeight/6) + "px;border-radius: 10px;'></img>");
						}
					} else if (sourceFields[fieldsCounter].type == "m_radiobox") {
						if(sourceFields[fieldsCounter].parentGroupNode != undefined) {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].parentGroupNode + "_group").find('fieldset').append("<div data-role='controlgroup' style='display: -webkit-box;' id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' data-field-parent='" + sourceFields[fieldsCounter].parentGroupNode + "'></div>");
						} else {
							$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<div data-role='controlgroup' id = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' name = '" + screenID + "_" + sourceFields[fieldsCounter].id + "'></div>");
						}
						$("#" + screenID + "_" + sourceFields[fieldsCounter].id).initializeMRadioBox({
							screenID : screenID,
							dataSource : actualDataSource,
							viewType : sourceFields[fieldsCounter].viewTypeNode
						});
					}
					$("#" + screenID + "_" + sourceFields[fieldsCounter].id + "_group").append("<span data-for = '" + screenID + "_" + sourceFields[fieldsCounter].id + "' class = 'k-invalid-msg'></span>");
				}
			}
		}
	},
	getLabelConfigurationObject : function (screenID, xmlDoc, eventVerb) {
		var currentLabelConfig,
		eventVerbCounter,
		eventVerbCounterLength,
		fieldNodes,
		fieldNodesCounter,
		fieldID;
		currentLabelConfig = {
			screenID : screenID
		};
		if (eventVerb == undefined) {
			eventVerbCounterLength = 1;
		} else {
			eventVerbCounterLength = xmlDoc.childNodes[0].childNodes.length;
		}
		for (eventVerbCounter = 0; eventVerbCounter < eventVerbCounterLength; eventVerbCounter++) {
			if (eventVerb == undefined) {
				currentLabelConfig.labels = {};
				fieldNodes = xmlDoc.childNodes[0].getElementsByTagName("field");
			} else {
				currentLabelConfig[xmlDoc.childNodes[0].childNodes[eventVerbCounter].tagName] = {};
				currentLabelConfig[xmlDoc.childNodes[0].childNodes[eventVerbCounter].tagName].labels = {};
				fieldNodes = xmlDoc.childNodes[0].childNodes[eventVerbCounter].getElementsByTagName("field");
			}
			for (fieldNodesCounter = 0; fieldNodesCounter < fieldNodes.length; fieldNodesCounter++) {
				fieldID = fieldNodes[fieldNodesCounter].getAttribute("id");
				if (eventVerb == undefined) {
					currentLabelConfig.labels[fieldID] = fieldNodes[fieldNodesCounter].getElementsByTagName("label")[0].childNodes[0].nodeValue;
				} else {
					currentLabelConfig[xmlDoc.childNodes[0].childNodes[eventVerbCounter].tagName].labels[fieldID] = fieldNodes[fieldNodesCounter].getElementsByTagName("label")[0].childNodes[0].nodeValue;
				}
			}
		}
		mobileConfigurationEngine.var.labelConfigurations.push(currentLabelConfig);
	},
	getUiConfigurationObject : function (screenID, xmlDoc, eventVerb) {
		var currentUiConfig,
		eventVerbCounter,
		eventVerbCounterLength,
		fieldOrderNode,
		fieldNodes,
		fieldNodesCounter,
		inputParameterCounter,
		fieldID,
		currentFieldConfig,
		typeNode,
		minimumNode,
		maximumNode,
		dataTextFieldNode,
		dataValueFieldNode,
		defaultValueNode,
		dataSourceNode,
		applicationNameNode,
		serviceNameNode,
		outputPathNode,
		inputParameterNode,
		trueTextNode,
		falseTextNode,
		heightNode,
		widthNode,
		parentGroupNode,
		viewTypeNode;
		currentUiConfig = {
			screenID : screenID
		};
		if (eventVerb == undefined) {
			eventVerbCounterLength = 1;
		} else {
			eventVerbCounterLength = xmlDoc.childNodes[0].childNodes.length;
		}
		for (eventVerbCounter = 0; eventVerbCounter < eventVerbCounterLength; eventVerbCounter++) {
			if (eventVerb == undefined) {
				currentUiConfig.fields = [];
				fieldOrderNode = xmlDoc.childNodes[0].getElementsByTagName("fieldOrder")[0];
				if (fieldOrderNode != undefined) {
					currentUiConfig.fieldOrder = fieldOrderNode.childNodes[0].nodeValue;
				}
				fieldNodes = xmlDoc.childNodes[0].getElementsByTagName("field");
			} else {
				currentUiConfig[xmlDoc.childNodes[0].childNodes[eventVerbCounter].tagName] = {};
				currentUiConfig[xmlDoc.childNodes[0].childNodes[eventVerbCounter].tagName].fields = [];
				fieldOrderNode = xmlDoc.childNodes[0].childNodes[eventVerbCounter].getElementsByTagName("fieldOrder")[0];
				if (fieldOrderNode != undefined) {
					currentUiConfig[xmlDoc.childNodes[0].childNodes[eventVerbCounter].tagName].fieldOrder = fieldOrderNode.childNodes[0].nodeValue;
				}
				fieldNodes = xmlDoc.childNodes[0].childNodes[eventVerbCounter].getElementsByTagName("field");
			}
			for (fieldNodesCounter = 0; fieldNodesCounter < fieldNodes.length; fieldNodesCounter++) {
				currentFieldConfig = {};
				fieldID = fieldNodes[fieldNodesCounter].getAttribute("id");
				currentFieldConfig.id = fieldID;
				typeNode = fieldNodes[fieldNodesCounter].getElementsByTagName("type");
				if (typeNode[0] != undefined) {
					if (typeNode[0].childNodes[0] != undefined) {
						currentFieldConfig.type = typeNode[0].childNodes[0].nodeValue;
					}
				}
				minimumNode = fieldNodes[fieldNodesCounter].getElementsByTagName("minimum");
				if (minimumNode[0] != undefined) {
					if (minimumNode[0].childNodes[0] != undefined) {
						currentFieldConfig.minimum = minimumNode[0].childNodes[0].nodeValue;
					}
				}
				maximumNode = fieldNodes[fieldNodesCounter].getElementsByTagName("maximum");
				if (maximumNode[0] != undefined) {
					if (maximumNode[0].childNodes[0] != undefined) {
						currentFieldConfig.maximum = maximumNode[0].childNodes[0].nodeValue;
					}
				}
				dataTextFieldNode = fieldNodes[fieldNodesCounter].getElementsByTagName("dataTextField");
				if (dataTextFieldNode[0] != undefined) {
					if (dataTextFieldNode[0].childNodes[0] != undefined) {
						currentFieldConfig.dataTextField = dataTextFieldNode[0].childNodes[0].nodeValue;
					}
				}
				dataValueFieldNode = fieldNodes[fieldNodesCounter].getElementsByTagName("dataValueField");
				if (dataValueFieldNode[0] != undefined) {
					if (dataValueFieldNode[0].childNodes[0] != undefined) {
						currentFieldConfig.dataValueField = dataValueFieldNode[0].childNodes[0].nodeValue;
					}
				}
				defaultValueNode = fieldNodes[fieldNodesCounter].getElementsByTagName("defaultValue");
				if (defaultValueNode[0] != undefined) {
					if (defaultValueNode[0].childNodes[0] != undefined) {
						currentFieldConfig.defaultValue = defaultValueNode[0].childNodes[0].nodeValue;
					}
				}
				dataSourceNode = fieldNodes[fieldNodesCounter].getElementsByTagName("dataSource");
				if (dataSourceNode[0] != undefined) {
					if (dataSourceNode[0].childNodes[0] != undefined) {
						if (dataSourceNode[0].childElementCount == 0) {
							currentFieldConfig.dataSource = dataSourceNode[0].childNodes[0].nodeValue;
						} else {
							currentFieldConfig.dataSource = {};
							applicationNameNode = dataSourceNode[0].getElementsByTagName("applicationName");
							if (applicationNameNode[0] != undefined) {
								if (applicationNameNode[0].childNodes[0] != undefined) {
									currentFieldConfig.dataSource.applicationName = applicationNameNode[0].childNodes[0].nodeValue;
								}
							}
							serviceNameNode = dataSourceNode[0].getElementsByTagName("serviceName");
							if (serviceNameNode[0] != undefined) {
								if (serviceNameNode[0].childNodes[0] != undefined) {
									currentFieldConfig.dataSource.serviceName = serviceNameNode[0].childNodes[0].nodeValue;
								}
							}
							outputPathNode = dataSourceNode[0].getElementsByTagName("outputPath");
							if (outputPathNode[0] != undefined) {
								if (outputPathNode[0].childNodes[0] != undefined) {
									currentFieldConfig.dataSource.outputPath = outputPathNode[0].childNodes[0].nodeValue;
								}
							}
							inputParameterNode = dataSourceNode[0].getElementsByTagName("inputParameter");
							if (inputParameterNode[0] != undefined) {
								if (inputParameterNode[0].childNodes[0] != undefined) {
									currentFieldConfig.dataSource.inputParameter = {};
									if (inputParameterNode[0].childElementCount != 0) {
										for (inputParameterCounter = 0; inputParameterCounter < inputParameterNode[0].childElementCount; inputParameterCounter++) {
											if (inputParameterNode[0].childNodes[inputParameterCounter].childNodes[0] != undefined) {
												currentFieldConfig.dataSource.inputParameter[inputParameterNode[0].childNodes[inputParameterCounter].nodeName] = inputParameterNode[0].childNodes[inputParameterCounter].childNodes[0].nodeValue;
											} else {
												currentFieldConfig.dataSource.inputParameter[inputParameterNode[0].childNodes[inputParameterCounter].nodeName] = "";
											}
										}
									}
								}
							}
						}
					}
				}
				trueTextNode = fieldNodes[fieldNodesCounter].getElementsByTagName("trueText");
				if (trueTextNode[0] != undefined) {
					if (trueTextNode[0].childNodes[0] != undefined) {
						currentFieldConfig.trueText = trueTextNode[0].childNodes[0].nodeValue;
					}
				}
				falseTextNode = fieldNodes[fieldNodesCounter].getElementsByTagName("falseText");
				if (falseTextNode[0] != undefined) {
					if (falseTextNode[0].childNodes[0] != undefined) {
						currentFieldConfig.falseText = falseTextNode[0].childNodes[0].nodeValue;
					}
				}
				maxlengthNode = fieldNodes[fieldNodesCounter].getElementsByTagName("maxlength");
				if (maxlengthNode[0] != undefined) {
					if (maxlengthNode[0].childNodes[0] != undefined) {
						currentFieldConfig.maxlength = maxlengthNode[0].childNodes[0].nodeValue;
					}
				}
				heightNode = fieldNodes[fieldNodesCounter].getElementsByTagName("height");
				if (heightNode[0] != undefined) {
					if (heightNode[0].childNodes[0] != undefined) {
						currentFieldConfig.height = heightNode[0].childNodes[0].nodeValue;
					}
				}
				widthNode = fieldNodes[fieldNodesCounter].getElementsByTagName("height");
				if (widthNode[0] != undefined) {
					if (widthNode[0].childNodes[0] != undefined) {
						currentFieldConfig.width = widthNode[0].childNodes[0].nodeValue;
					}
				}
				parentGroupNode = fieldNodes[fieldNodesCounter].getElementsByTagName("parent_group");
				if (parentGroupNode[0] != undefined) {
					if (parentGroupNode[0].childNodes[0] != undefined) {
						currentFieldConfig.parentGroupNode = parentGroupNode[0].childNodes[0].nodeValue;
					}
				}
				viewTypeNode = fieldNodes[fieldNodesCounter].getElementsByTagName("view_type");
				if (viewTypeNode[0] != undefined) {
					if (viewTypeNode[0].childNodes[0] != undefined) {
						currentFieldConfig.viewTypeNode = viewTypeNode[0].childNodes[0].nodeValue;
					}
				}
				if (eventVerb == undefined) {
					currentUiConfig.fields.push(currentFieldConfig);
				} else {
					currentUiConfig[xmlDoc.childNodes[0].childNodes[eventVerbCounter].tagName].fields.push(currentFieldConfig);
				}
			}
		}
		mobileConfigurationEngine.var.uiConfigurations.push(currentUiConfig);
	},
	revampScreen : function (screenID, eventVerb) {
		var currentUiConfig,
		contentFieldList,
		contentFieldsCounter;
		if (mobileConfigurationEngine.var.uiConfigurations.length != 0) {
			currentUiConfig = $.grep(mobileConfigurationEngine.var.uiConfigurations, function (element, index) {
					return element.screenID == screenID;
				})[0];
			if (currentUiConfig.length != 0) {
				if (eventVerb == undefined) {
					contentFieldList = currentUiConfig.fieldOrder;
				} else {
					if (currentUiConfig[eventVerb] != undefined) {
						contentFieldList = currentUiConfig[eventVerb].fieldOrder;
					}
				}
				if (contentFieldList != undefined) {
					contentFieldsList = contentFieldList.split(",");
					for (contentFieldsCounter = 1; contentFieldsCounter < contentFieldsList.length; contentFieldsCounter++) {
						$("#" + screenID + "_" + contentFieldsList[contentFieldsCounter].trim() + "_group").insertAfter("#" + screenID + "_" + contentFieldsList[contentFieldsCounter - 1].trim() + "_group");
					}
				}
			}
		}
	},
	var : {
		labelConfigurations : [],
		uiConfigurations : [],
		valueChangeIndicator : false,
		call_details_loadIndicator : true
	}
};
var mobileWidgetInitializer = {
	initializeMCombobox : function (initObject) {
		var mDatasource;
		if (initObject.dataSource.applicationName != undefined) {
			mDatasource = new kendo.data.DataSource({
					transport : {
						read : {
							type : "POST",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : mserviceUtilities.getTransportUrl(initObject.dataSource.applicationName, initObject.dataSource.serviceName, initObject.dataSource.outputPath),
							complete : function (data, textstatus) {
								$("#" + initObject.fieldID).html(mserviceUtilities.getOptionListForSelect({
										data : mDatasource.data(),
										dataTextField : initObject.dataTextField,
										dataValueField : initObject.dataValueField
									})).selectmenu("refresh");
							}
						},
						parameterMap : function (options, operation) {
							if (initObject.dataSource.inputParameter != undefined) {
								return mserviceUtilities.getTransportParameter({
									inputparam : initObject.dataSource.inputParameter
								});
							} else {
								return mserviceUtilities.getTransportParameter();
							}
						}
					}
				});
		}
		if (initObject.defaultValue != undefined && initObject.defaultValue != "") {
			$("#" + initObject.fieldID).html("<option value = '" + initObject.defaultValue + "' data-text = '" + initObject.defaultValue + "'>" + initObject.defaultValue + "</option>");
		} else {
			if (initObject.dataSource.applicationName != undefined) {
				mDatasource.read();
			} else {
				$("#" + initObject.fieldID).html(mserviceUtilities.getOptionListForSelect({
						data : initObject.dataSource,
						dataTextField : initObject.dataTextField,
						dataValueField : initObject.dataValueField
					}));
			}
		}
		$("#" + initObject.fieldID).change(function (e) {
			if (initObject.events != undefined && initObject.events.change == true) {
				eval(initObject.screenID + "." + initObject.fieldID.replace(initObject.screenID + "_", "") + "_change()");
			}
		});
		$("#" + initObject.fieldID).attr("data-widget-type", "m_combobox");
		$("#" + initObject.fieldID).attr("data-mini", "true");
		$("#" + initObject.fieldID).attr("data-native-menu", "false");
		$("#" + initObject.fieldID).attr("class", "filterable-select");
		$("#" + initObject.fieldID).attr("data-theme", "f");
	},
	initializeMDatebox : function (initObject) {
		var maximumDays = false,
		minimumDays = false;
		if (initObject.maximum != undefined) {
			if (initObject.maximum == "NEWDATE") {
				maximumDays = 0;
			} else {
				maximumDays = Math.round((eval(initObject.maximum) - new Date()) / (1000 * 60 * 60 * 24));
			}
		}
		if (initObject.minimum != undefined) {
			if (initObject.minimum == "NEWDATE") {
				minimumDays = 0;
			} else {
				minimumDays = Math.round((new Date() - eval(initObject.minimum)) / (1000 * 60 * 60 * 24));
			}
		}
		$("#" + initObject.fieldID).attr("data-widget-type", "m_datebox");
		$("#" + initObject.fieldID).attr("type", "text");
		$("#" + initObject.fieldID).attr("data-role", "datebox");
		$("#" + initObject.fieldID).attr("data-theme", "a");
		$("#" + initObject.fieldID).attr('data-options', '{"mode": "datebox", "themeButton": "b", "themeHeader": "b", "themeSetButton": "d", "disableManualInput": true, "maxDays": ' + maximumDays + ', "minDays": ' + minimumDays + '}');
	},
	initializeMDropdownlist : function (initObject) {
		var mDatasource;
		if (initObject.dataSource.applicationName != undefined) {
			mDatasource = new kendo.data.DataSource({
					transport : {
						read : {
							type : "POST",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : mserviceUtilities.getTransportUrl(initObject.dataSource.applicationName, initObject.dataSource.serviceName, initObject.dataSource.outputPath),
							complete : function (data, textstatus) {
								$("#" + initObject.fieldID).html(mserviceUtilities.getOptionListForSelect({
										data : mDatasource.data(),
										dataTextField : initObject.dataTextField,
										dataValueField : initObject.dataValueField
									})).selectmenu("refresh");
							}
						},
						parameterMap : function (options, operation) {
							if (initObject.dataSource.inputParameter != undefined) {
								return mserviceUtilities.getTransportParameter({
									inputparam : initObject.dataSource.inputParameter
								});
							} else {
								return mserviceUtilities.getTransportParameter();
							}
						}
					}
				});
		}
		if (initObject.defaultValue != undefined && initObject.defaultValue != "") {
			$("#" + initObject.fieldID).html("<option value = '" + initObject.defaultValue + "' data-text = '" + initObject.defaultValue + "'>" + initObject.defaultValue + "</option>");
		} else {
			if (initObject.dataSource.applicationName != undefined) {
				mDatasource.read();
			} else {
				$("#" + initObject.fieldID).html(mserviceUtilities.getOptionListForSelect({
						data : initObject.dataSource,
						dataTextField : initObject.dataTextField,
						dataValueField : initObject.dataValueField
					}));
			}
		}
		$("#" + initObject.fieldID).change(function (e) {
			if (initObject.events != undefined && initObject.events.change == true) {
				eval(initObject.screenID + "." + initObject.fieldID.replace(initObject.screenID + "_", "") + "_change()");
			}
		});
		$("#" + initObject.fieldID).attr("data-widget-type", "m_dropdownlist");
		$("#" + initObject.fieldID).attr("data-mini", "true");
		$("#" + initObject.fieldID).attr("data-native-menu", "false");
		$("#" + initObject.fieldID).attr("data-theme", "f");
	},
	initializeMFlipswitch : function (initObject) {
		var optionList;
		optionList = "<option value = '0'>" + initObject.falseText + "</option><option value = '1'>" + initObject.trueText + "</option>";
		$("#" + initObject.fieldID).html(optionList);
		$("#" + initObject.fieldID).val("1");
		if (initObject.defaultValue != undefined && initObject.defaultValue != "") {
			$("#" + initObject.fieldID).val(initObject.defaultValue);
		}
		$("#" + initObject.fieldID).change(function () {
			if (initObject.events != undefined && initObject.events.change == true) {
				eval(initObject.screenID + "." + initObject.fieldID.replace(initObject.screenID + "_", "") + "_change()");
			}
		});
		$("#" + initObject.fieldID).attr("data-widget-type", "m_flipswitch");
		$("#" + initObject.fieldID).attr("data-role", "flipswitch");
		$("#" + initObject.fieldID).attr("data-theme", "c");
	},
	initializeMMultiselect : function (initObject) {
		var mDatasource;
		if (initObject.dataSource.applicationName != undefined) {
			mDatasource = new kendo.data.DataSource({
					transport : {
						read : {
							type : "POST",
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : mserviceUtilities.getTransportUrl(initObject.dataSource.applicationName, initObject.dataSource.serviceName, initObject.dataSource.outputPath),
							complete : function (data, textstatus) {
								$("#" + initObject.fieldID).html(mserviceUtilities.getOptionListForSelect({
										data : mDatasource.data(),
										dataTextField : initObject.dataTextField,
										dataValueField : initObject.dataValueField,
										multiple : true
									})).selectmenu("refresh");
							}
						},
						parameterMap : function (options, operation) {
							if (initObject.dataSource.inputParameter != undefined) {
								return mserviceUtilities.getTransportParameter({
									inputparam : initObject.dataSource.inputParameter
								});
							} else {
								return mserviceUtilities.getTransportParameter();
							}
						}
					}
				});
		}
		if (initObject.defaultValue != undefined && initObject.defaultValue != "") {
			$("#" + initObject.fieldID).html("<option value = '" + initObject.defaultValue + "' data-text = '" + initObject.defaultValue + "'>" + initObject.defaultValue + "</option>");
		} else {
			if (initObject.dataSource.applicationName != undefined) {
				mDatasource.read();
			} else {
				$("#" + initObject.fieldID).html(mserviceUtilities.getOptionListForSelect({
						data : initObject.dataSource,
						dataTextField : initObject.dataTextField,
						dataValueField : initObject.dataValueField,
						multiple : true
					}));
			}
		}
		$("#" + initObject.fieldID).change(function (e) {
			if (initObject.events != undefined && initObject.events.change == true) {
				eval(initObject.screenID + "." + initObject.fieldID.replace(initObject.screenID + "_", "") + "_change()");
			}
		});
		$("#" + initObject.fieldID).attr("data-widget-type", "m_multiselect");
		$("#" + initObject.fieldID).attr("data-mini", "true");
		$("#" + initObject.fieldID).attr("data-native-menu", "false");
		$("#" + initObject.fieldID).attr("multiple", "multiple");
		$("#" + initObject.fieldID).attr("data-theme", "f");
	},
	initializeMNumerictextbox : function (initObject) {
		if (initObject.minimum != undefined) {
			$("#" + initObject.fieldID).attr("min", initObject.minimum);
		}
		if (initObject.maximum != undefined) {
			$("#" + initObject.fieldID).attr("max", initObject.maximum);
		}
		$("#" + initObject.fieldID).attr("data-widget-type", "m_numerictextbox");
		$("#" + initObject.fieldID).attr("type", "number");
		$("#" + initObject.fieldID).attr("step", "0.01");
	},
	initializeMSignaturepad : function (initObject) {
		$("#" + initObject.fieldID).signaturePad({
			drawOnly : true,
			defaultAction : 'drawIt',
			validateFields : false,
			lineWidth : 0,
			output : null,
			sigNav : null,
			name : null,
			typed : null,
			clear : 'input[type=reset]',
			typeIt : null,
			drawIt : null,
			typeItDesc : null,
			drawItDesc : null,
		});
	},
	initializeMTextarea : function (initObject) {
		if (initObject.maxlength != undefined) {
			$("#" + initObject.fieldID).attr("maxlength", initObject.maxlength);
		}
		$("#" + initObject.fieldID).attr("data-widget-type", "m_textarea");
		$("#" + initObject.fieldID).attr("type", "text");
	},
	initializeMTextbox : function (initObject) {
		if (initObject.maxlength != undefined) {
			$("#" + initObject.fieldID).attr("maxlength", initObject.maxlength);
		}
		$("#" + initObject.fieldID).attr("data-widget-type", "m_textbox");
		$("#" + initObject.fieldID).attr("type", "text");
	},
	initializeMTimebox : function (initObject) {
		$("#" + initObject.fieldID).attr("data-widget-type", "m_timebox");
		$("#" + initObject.fieldID).attr("type", "text");
		$("#" + initObject.fieldID).attr("data-role", "datebox");
		$("#" + initObject.fieldID).attr("data-theme", "a");
		$("#" + initObject.fieldID).attr('data-options', '{"mode": "timebox", "themeButton": "b", "themeHeader": "b", "themeSetButton": "d", "disableManualInput": true}');
	},
	initializeMRadioBox : function (initObject) {
		var options = "";
		for(var optionCounter=0; optionCounter < initObject.dataSource.length; optionCounter++) {
			options += "<input type='radio' name='" + initObject.fieldID + "_radio' id='" + initObject.fieldID + "_" + optionCounter + "' value='"+ initObject.dataSource[optionCounter].p_code_value + "'>";
			options += "<label for='" + initObject.fieldID + "_" + optionCounter + "'>" + initObject.dataSource[optionCounter].p_code_value_description + "</label>";
		}
		$("#" + initObject.fieldID).html(options);
		$("#" + initObject.fieldID).attr("data-widget-type", "m_radiobox");
		if (initObject.viewType != undefined) {
			$("#" + initObject.fieldID).attr("data-type", initObject.viewType);
		}
	}
};
var mserviceUtilities = {
	deleteFile : function (filePath) {
		var deleteStatus,
		xmlhttp,
		deleteURL;
		deleteStatus = false;
		if (window.ActiveXObject) {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		};
		deleteURL = mserviceUtilities.getWebserverpath() + "common/components/File_Upload/file_delete.aspx?path=" + login_profile.client_id + "/" + login_profile.country_code + "/" + filePath;
		xmlhttp.addEventListener("error", function (event) {
			deleteStatus = false;
			alert("Unable to delete the file");
		}, false);
		xmlhttp.addEventListener("load", function (event) {
			deleteStatus = true;
		}, false);
		xmlhttp.open("POST", deleteURL, false);
		xmlhttp.send();
		return deleteStatus;
	},
	deleteData : function (deleteObject) {
		var deleteDataSource,
		deleteInputParameter,
		deleteKey,
		returnValue,
		transportResponse;
		returnValue = false;
		deleteInputParameter = {
			p_information_type : "",
			p_field_1 : "",
			p_field_2 : "",
			p_field_3 : "",
			p_field_4 : "",
			p_field_5 : "",
			p_field_6 : "",
			p_field_7 : "",
			p_field_8 : "",
			p_field_9 : "",
			p_field_10 : ""
		};
		for (deleteKey in deleteObject) {
			deleteInputParameter[deleteKey] = deleteObject[deleteKey];
		};
		deleteDataSource = new kendo.data.DataSource({
				transport : {
					destroy : {
						type : "POST",
						async : false,
						dataType : "json",
						contentType : "application/json; charset=utf-8",
						url : mserviceUtilities.getTransportUrl("common_modules", "delete_data", "context/outputparam"),
						complete : function (data, textstatus) {
							mserviceUtilities.processTransportResponse(data, textstatus);
							transportResponse = JSON.parse(data.responseText);
							if ($.isArray(transportResponse)) {
								if (transportResponse[0].p_update_status == "SP001") {
									returnValue = true;
								}
							}
						}
					},
					parameterMap : function (options, operation) {
						return mserviceUtilities.getTransportParameter({
							inputparam : deleteInputParameter
						});
					}
				},
				schema : {
					model : {
						id : "p_information_type",
						fields : {
							p_information_type : {
								editable : true
							},
							p_field_1 : {
								editable : true
							},
							p_field_2 : {
								editable : true
							},
							p_field_3 : {
								editable : true
							},
							p_field_4 : {
								editable : true
							},
							p_field_5 : {
								editable : true
							},
							p_field_6 : {
								editable : true
							},
							p_field_7 : {
								editable : true
							},
							p_field_8 : {
								editable : true
							},
							p_field_9 : {
								editable : true
							},
							p_field_10 : {
								editable : true
							}
						}
					}
				}
			});
		deleteDataSource.add(deleteInputParameter);
		deleteDataSource.remove(deleteDataSource.at(0));
		deleteDataSource.sync();
		return returnValue;
	},
	getActualValue : function (valueString) {
		var returnValue = "";
		if (valueString != undefined && valueString != "") {
			if (valueString.indexOf("$") == 0) {
				try {
					returnValue = eval(valueString.substring(1));
				} catch (exception) {
					returnValue = "";
				}
			} else if (valueString.indexOf("#") == 0) {
				returnValue = $(valueString).getVal();
			} else if (valueString == "NEWDATE") {
				returnValue = new Date();
			} else if (valueString.charAt(0) == "'" || valueString.charAt(0) == '"') {
				returnValue = valueString.substring(1, valueString.length - 1);
			} else {
				try {
					returnValue = eval(valueString);
				} catch (exception) {
					returnValue = "";
				}
			}
		}
		return returnValue;
	},
	getAllowedFileExtensions : function () {
		if (typeof(mserviceUtilities.var.userAttachmentsAllowedFileExtensions) == "undefined") {
			mserviceUtilities.var.userAttachmentsAllowedFileExtensions = ConvertXMLStringToJSONArray(executeService_retrieve_listof_values_for_searchcondition({
						p_inputparam_xml : "<inputparam><lov_code_type>FILEEXTNALLOWED</lov_code_type></inputparam>"
					}));
		}
		return mserviceUtilities.var.userAttachmentsAllowedFileExtensions;
	},
	getMimeType : function (fileExtension) {
		var mimType = "";
		if(fileExtension == ".au") {
			mimType = "audio/basic";
		} else if(fileExtension == ".avi") {
			mimType = "video/avi";
		} else if(fileExtension == ".bmp") {
			mimType = "image/bmp";
		} else if(fileExtension == ".doc") {
			mimType = "application/msword";
		} else if(fileExtension == ".gif") {
			mimType = "image/gif";
		} else if(fileExtension == ".mp3") {
			mimType = "audio/mpeg";
		} else if(fileExtension == ".mpeg") {
			mimType = "video/mpeg";
		} else if(fileExtension == ".jpg" || fileExtension == ".jpeg") {
			mimType = "image/jpeg";
		} else if(fileExtension == ".txt") {
			mimType = "image/jpeg";
		} else if(fileExtension == ".pdf") {
			mimType = "application/pdf";
		} else if(fileExtension == ".png") {
			mimType = "image/png";
		} else if(fileExtension == ".wav") {
			mimType = "audio/wav";
		} else if(fileExtension == ".xls" || fileExtension == ".xlsx") {
			mimType = "application/vnd.ms-excel";
		} else if(fileExtension == ".xml") {
			mimType = "application/xml";
		} else if(fileExtension == ".zip") {
			mimType = "application/zip";
		} else if(fileExtension == ".mp4") {
			mimType = "video/mp4";
		} else if(fileExtension == ".csv") {
			mimType = "text/csv";
		}
		return mimType;
	},
	getCachedDataSource : function (dataSourceObject) {
		return new kendo.data.DataSource({
			schema : {
				parse : function () {
					return cacheManager.getDataSet(dataSourceObject);
				}
			}
		});
	},
	getConcatenatedValue : function (concatenationObject) {
		var actualValueList,
		valueListCounter;
		actualValueList = [];
		for (valueListCounter = 0; valueListCounter < concatenationObject.valueList.length; valueListCounter++) {
			actualValueList.push(mserviceUtilities.getActualValue(concatenationObject.valueList[valueListCounter].trim()));
		};
		return actualValueList.join(concatenationObject.delimiter);
	},
	getCurrentScreenID : function () {
		return $.mobile.activePage.attr("id");
	},
	getDataSourceSchema : function (screenID, dataSourceName) {
		var currentConfig,
		dataSourceNode,
		currentDataSourceNode,
		fieldNodes,
		fieldCounter,
		schemaModelFields,
		fieldProperty,
		codeTypeNode,
		codeFieldNode,
		parentCodeFieldNode,
		idField;
		currentConfig = webConfigurationEngine.getUiConfigurationObject(screenID);
		schemaModelFields = {};
		if (currentConfig != undefined) {
			dataSourceNode = currentConfig.configuration.getElementsByTagName("datasource")[0];
			if (dataSourceNode != undefined) {
				currentDataSourceNode = dataSourceNode.getElementsByTagName(dataSourceName)[0];
				if (currentDataSourceNode != undefined) {
					idField = currentDataSourceNode.getAttribute("id");
					fieldNodes = currentDataSourceNode.getElementsByTagName("field");
					for (fieldCounter = 0; fieldCounter < fieldNodes.length; fieldCounter++) {
						fieldProperty = {
							editable : true
						};
						codeTypeNode = fieldNodes[fieldCounter].getElementsByTagName("codeType")[0];
						if (codeTypeNode != undefined) {
							fieldProperty.codeType = codeTypeNode.childNodes[0].nodeValue;
						};
						codeFieldNode = fieldNodes[fieldCounter].getElementsByTagName("codeField")[0];
						if (codeFieldNode != undefined) {
							fieldProperty.codeField = codeFieldNode.childNodes[0].nodeValue;
						};
						parentCodeFieldNode = fieldNodes[fieldCounter].getElementsByTagName("parentCodeField")[0];
						if (parentCodeFieldNode != undefined) {
							fieldProperty.parentCodeField = parentCodeFieldNode.childNodes[0].nodeValue;
						};
						schemaModelFields[fieldNodes[fieldCounter].getAttribute("id")] = fieldProperty;
					}
				}
			}
		};
		if (Object.keys(schemaModelFields).length != 0) {
			if (idField != null) {
				return {
					id : idField,
					fields : schemaModelFields
				};
			} else {
				return {
					fields : schemaModelFields
				};
			}
		} else {
			return false;
		}
	},
	getDateFieldOrder : function () {
		if (login_profile.date_display_format == "dmy") {
			return ['d', 'm', 'y'];
		} else if (login_profile.date_display_format == "mdy") {
			return ['m', 'd', 'y'];
		}
	},
	getDateFormat : function () {
		if (login_profile.date_display_format == "dmy") {
			return "%d-%m-%Y";
		} else if (login_profile.date_display_format == "mdy") {
			return "%m-%d-%Y";
		}
	},
	getDateObject : function (dateObject) {
		var returnValue,
		dateStringSplit;
		returnValue = "";
		if (dateObject.dateString != undefined && dateObject.dateString != "") {
			dateStringSplit = dateObject.dateString.split("-");
			if (dateObject.hourString != undefined && dateObject.hourString != "") {
				returnValue = new Date(parseInt(dateStringSplit[0]), parseInt(dateStringSplit[1]) - 1, parseInt(dateStringSplit[2]), parseInt(dateObject.hourString), parseInt(dateObject.minuteString));
			} else {
				returnValue = new Date(parseInt(dateStringSplit[0]), parseInt(dateStringSplit[1]) - 1, parseInt(dateStringSplit[2]));
			}
		}
		return returnValue;
	},
	getDateString : function (dateObject, format) {
		return kendo.toString(dateObject, format);
	},
	getDescriptionFields : function (dataList, schemaModel) {
		var keyName,
		codeTypeArray = [],
		codeFieldArray = [],
		descriptionFieldArray = [],
		parentCodeFieldArray = [],
		dataListCounter,
		codeTypeCounter;
		if (schemaModel != undefined && schemaModel != false) {
			for (keyName in schemaModel.fields) {
				if (schemaModel.fields[keyName].codeType != undefined) {
					codeTypeArray.push(schemaModel.fields[keyName].codeType);
					codeFieldArray.push(schemaModel.fields[keyName].codeField);
					descriptionFieldArray.push(keyName);
					if (schemaModel.fields[keyName].parentCodeField != undefined) {
						parentCodeFieldArray.push(schemaModel.fields[keyName].parentCodeField);
					} else {
						parentCodeFieldArray.push("");
					}
				}
			};
			for (dataListCounter = 0; dataListCounter < dataList.length; dataListCounter++) {
				for (codeTypeCounter = 0; codeTypeCounter < codeTypeArray.length; codeTypeCounter++) {
					if (dataList[dataListCounter][codeFieldArray[codeTypeCounter]] != "" && dataList[dataListCounter][codeFieldArray[codeTypeCounter]] != undefined) {
						if (parentCodeFieldArray[codeTypeCounter] == "") {
							dataList[dataListCounter][descriptionFieldArray[codeTypeCounter]] = mserviceUtilities.getDescriptionForCode(codeTypeArray[codeTypeCounter], dataList[dataListCounter][codeFieldArray[codeTypeCounter]], "");
						} else {
							dataList[dataListCounter][descriptionFieldArray[codeTypeCounter]] = mserviceUtilities.getDescriptionForCode(codeTypeArray[codeTypeCounter], dataList[dataListCounter][codeFieldArray[codeTypeCounter]], dataList[dataListCounter][parentCodeFieldArray[codeTypeCounter]]);
						}
					}
				}
			}
		};
		return dataList;
	},
	getDescriptionForCode : function (codeType, code, parentCode) {
		var codeTypeObject,
		dataSetObject;
		codeTypeObject = $.grep(mserviceUtilities.variable.descriptionDatasource, function (e, i) {
				return e.codeType == codeType;
			})[0];
		if (codeTypeObject != undefined) {
			dataSetObject = $.grep(codeTypeObject.dataSet, function (e, i) {
					return e.code == code && kendo.toString(e.parentCode) == parentCode;
				})[0];
			if (dataSetObject != undefined) {
				return kendo.toString(dataSetObject.description);
			} else {
				return code;
			}
		} else {
			mserviceUtilities.updateDescriptionDatasource(codeType, code, parentCode);
			return mserviceUtilities.getDescriptionForCode(codeType, code, parentCode);
		}
	},
	getEventverbSaveInputparamXML : function () {
		var inputparamFields,
		fieldCounter,
		inputparamXML,
		fieldID,
		tagName;
		inputparamFields = $.grep($("#manage_call_register_wfeventverb_status_change").find("input,textarea,select"), function (element, index) {
				return (($(element).attr("id") != undefined) && ($(element).attr("id").replace("manage_call_register_wfeventverb_status_change_", "").indexOf("call_register") != -1 || $(element).attr("id").replace("manage_call_register_wfeventverb_status_change_", "").indexOf("lead_register") != -1));
			});
		inputparamXML = "<inputparam>";
		for (fieldCounter = 0; fieldCounter < inputparamFields.length; fieldCounter++) {
			fieldID = $(inputparamFields[fieldCounter]).attr("id");
			tagName = fieldID.replace("manage_call_register_wfeventverb_status_change_", "");
			if ($("#" + fieldID).attr("data-widget-type") == "m_datebox") {
				inputparamXML += "<" + tagName + ">" + kendo.toString($("#" + fieldID).getVal(), "yyyy-MM-dd") + "</" + tagName + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "m_timebox") {
				inputparamXML += "<" + tagName.replace("_time", "_hour") + ">" + $("#" + fieldID).getVal().getHours() + "</" + tagName.replace("_time", "_hour") + ">";
				inputparamXML += "<" + tagName.replace("_time", "_minute") + ">" + $("#" + fieldID).getVal().getMinutes() + "</" + tagName.replace("_time", "_minute") + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "m_combobox" || $("#" + fieldID).attr("data-widget-type") == "m_dropdownlist" || $("#" + fieldID).attr("data-widget-type") == "m_flipswitch" || $("#" + fieldID).attr("data-widget-type") == "m_textbox" || $("#" + fieldID).attr("data-widget-type") == "m_numerictextbox") {
				inputparamXML += "<" + tagName + ">" + getXmlString($("#" + fieldID).getVal()) + "</" + tagName + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "m_multiselect") {
				inputparamXML += "<" + tagName + ">" + getXmlString($("#" + fieldID).getVal().join()) + "</" + tagName + ">";
			}
		}
		inputparamXML += "</inputparam>";
		return inputparamXML;
	},
	getFileUploadPath : function (uploadObject) {
		if (mserviceUtilities.var.userAttachmentsFilePath[uploadObject.transactionType] == undefined) {
			mserviceUtilities.var.userAttachmentsFilePath[uploadObject.transactionType] = ConvertXMLStringToJSONArray(executeService_retrieve_listof_values_for_searchcondition({
						p_inputparam_xml : "<inputparam><lov_code_type>FILEATTACHPATH</lov_code_type><search_field_1>" + uploadObject.transactionType + "</search_field_1></inputparam>"
					}))[0];
		}
		if (uploadObject.async) {
			return getWebserverpath() + "common/components/File_Upload/file_upload.aspx?companyId=" + login_profile.client_id + "&countryCode=" + login_profile.country_code + "&doc_type=" + mserviceUtilities.var.userAttachmentsFilePath[uploadObject.transactionType].code + "/" + uploadObject.referenceNumber;
		} else {
			return mserviceUtilities.var.userAttachmentsFilePath[uploadObject.transactionType].code + "/" + uploadObject.referenceNumber;
		}
	},
	getInputparamUdfXML : function (screenID) {
		var inputparamFields,
		fieldCounter,
		inputparamXML,
		fieldID,
		tagName;
		inputparamFields = $.grep($("#" + screenID).find("input, textarea, select"), function (element, index) {
				return $(element).attr("id").match(screenID + "_udf");
			});
		inputparamXML = "<inputparam>";
		for (fieldCounter = 0; fieldCounter < inputparamFields.length; fieldCounter++) {
			fieldID = $(inputparamFields[fieldCounter]).attr("id");
			tagName = fieldID.substring(screenID.length + 1);
			if ($("#" + fieldID).attr("data-widget-type") == "m_datebox") {
				inputparamXML += "<" + tagName + ">" + kendo.toString($("#" + fieldID).getVal(), "yyyy-MM-dd") + "</" + tagName + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "m_timebox") {
				inputparamXML += "<" + tagName.replace("_time", "_hour") + ">" + $("#" + fieldID).getVal().getHours() + "</" + tagName.replace("_time", "_hour") + ">";
				inputparamXML += "<" + tagName.replace("_time", "_minute") + ">" + $("#" + fieldID).getVal().getMinutes() + "</" + tagName.replace("_time", "_minute") + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "m_combobox" || $("#" + fieldID).attr("data-widget-type") == "m_dropdownlist" || $("#" + fieldID).attr("data-widget-type") == "m_flipswitch" || $("#" + fieldID).attr("data-widget-type") == "m_textbox" || $("#" + fieldID).attr("data-widget-type") == "m_numerictextbox" || $("#" + fieldID).attr("data-widget-type") == "m_textarea") {
				inputparamXML += "<" + tagName + ">" + getXmlString($("#" + fieldID).getVal()) + "</" + tagName + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "m_multiselect") {
				inputparamXML += "<" + tagName + ">" + getXmlString($("#" + fieldID).getVal().join()) + "</" + tagName + ">";
			}
		}
		inputparamXML += "</inputparam>";
		return inputparamXML;
	},
	getInputparamFSRXML : function (screenID) {
		var inputparamFields,
		fieldCounter,
		inputparamXML,
		fieldID,
		tagName;
		inputparamFields = $.grep($("#" + screenID).find("div, input, textarea, select, img"), function (element, index) {
				return $(element).attr("id") != undefined;
			});
		inputparamXML = "<inputparam>";
		for (fieldCounter = 0; fieldCounter < inputparamFields.length; fieldCounter++) {
			fieldID = $(inputparamFields[fieldCounter]).attr("id");
			tagName = fieldID.substring(screenID.length + 1);
			if ($("#" + fieldID).attr("data-widget-type") == "m_datebox") {
				inputparamXML += "<" + tagName + ">" + kendo.toString($("#" + fieldID).getVal(), "yyyy-MM-dd") + "</" + tagName + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "m_timebox") {
				inputparamXML += "<" + tagName + ">" + kendo.toString($("#" + fieldID).getVal(), "HH:mm") + "</" + tagName + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "m_combobox" || $("#" + fieldID).attr("data-widget-type") == "m_dropdownlist" || $("#" + fieldID).attr("data-widget-type") == "m_flipswitch" || $("#" + fieldID).attr("data-widget-type") == "m_textbox" || $("#" + fieldID).attr("data-widget-type") == "m_numerictextbox" || $("#" + fieldID).attr("data-widget-type") == "m_textarea") {
				inputparamXML += "<" + tagName + ">" + getXmlString($("#" + fieldID).getVal()) + "</" + tagName + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "m_multiselect") {
				inputparamXML += "<" + tagName + ">" + getXmlString($("#" + fieldID).getVal().join()) + "</" + tagName + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "m_signaturepad") {
				inputparamXML += "<" + tagName + ">" + getXmlString($("#" + fieldID).getVal()) + "</" + tagName + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "m_radiobox") {
				inputparamXML += "<" + tagName + ">" + getXmlString($("#" + fieldID).getVal()) + "</" + tagName + ">";
			}
		}
		inputparamXML += "</inputparam>";
		return inputparamXML;
	},
	getOptionListForSelect : function (optionListObject) {
		var optionList,
		dataCounter;
		optionList = "<option value = '---Select---'>---Select---</option>";
		if (optionListObject.multiple == true) {
			optionList = "<option value = ''>---Select---</option>";
		}
		for (dataCounter = 0; dataCounter < optionListObject.data.length; dataCounter++) {
			optionList += "<option value = '" + optionListObject.data[dataCounter][optionListObject.dataValueField] + "' data-text = '" + optionListObject.data[dataCounter][optionListObject.dataTextField] + "'>" + optionListObject.data[dataCounter][optionListObject.dataTextField] + "</option>";
		}
		return optionList
	},
	getTransportDataSource : function (dataSourceObject) {
		return new kendo.data.DataSource({
			transport : {
				read : {
					type : "POST",
					async : false,
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : mserviceUtilities.getTransportUrl(dataSourceObject.applicationName, dataSourceObject.serviceName, dataSourceObject.outputPath)
				},
				parameterMap : function (options, operation) {
					if (dataSourceObject.inputParameter != undefined) {
						return mserviceUtilities.getTransportParameter({
							inputparam : dataSourceObject.inputParameter
						});
					} else {
						return mserviceUtilities.getTransportParameter();
					}
				}
			}
		});
	},
	getTransportParameter : function (inputParameter) {
		var stringInput,
		inputParameterString;
		stringInput = '{"context": {"sessionId":"' + login_profile.guid_val + '","userId":"' + login_profile.user_id + '","client_id":"' + login_profile.client_id + '","locale_id":"' + login_profile.locale_id + '","country_code":"' + login_profile.country_code + '"';
		if (inputParameter != undefined) {
			inputParameterString = JSON.stringify(inputParameter);
			stringInput += ',' + inputParameterString.substring(1, inputParameterString.length - 1);
		}
		stringInput += '}}';
		return stringInput;
	},
	getRestAPIParameter : function (inputParameter) {
		var stringInput,
		inputParameterString;
		stringInput = '{"contextElement": {"sessionIdField":"' + login_profile.guid_val + '","userIdField":"' + login_profile.user_id + '","client_idField":"' + login_profile.client_id + '","locale_idField":"' + login_profile.locale_id + '","country_codeField":"' + login_profile.country_code + '"';
		if (inputParameter != undefined) {
			inputParameterString = JSON.stringify(inputParameter);
			stringInput += ',' + inputParameterString.substring(1, inputParameterString.length - 1);
		}
		stringInput += '}}';
		return stringInput;
	},
	getTransportUrl : function (applicationName, serviceName, path) {
		return mserviceUtilities.getWebserverpath() + "JSONServiceEndpoint.aspx?appName=" + applicationName + "&serviceName=" + serviceName + "&path=" + path;
	},
	getWebserverpath : function () {
		if (login_profile.app_mode == "MOBILE_NATIVE") {
			return login_profile.protocol + "//" + login_profile.domain_name + ":" + login_profile.portno + "/";
		} else {
			return login_profile.protocol + "//" + window.location.host + "/";
		}
	},
	getWorkflowEventVerbs : function (callObject) {
		var allowedWorkflowArray = [];
		if (mserviceUtilities.var.callRegisterWorkflowEventVerbList == "") {
			mserviceUtilities.var.callRegisterWorkflowEventVerbList = ConvertXMLStringToJSONArray(executeService_retrieve_listof_values_for_searchcondition({
						p_inputparam_xml : "<inputparam><lov_code_type>CALL_ALLOWED_EVENTVERB_LIST</lov_code_type><search_field_1>ALL</search_field_1><search_field_2>ALL</search_field_2><search_field_3>ALL</search_field_3><search_field_4>ALL</search_field_4></inputparam>"
					}));
		}
		if (callObject != undefined) {
			allowedWorkflowArray = $.grep(mserviceUtilities.var.callRegisterWorkflowEventVerbList, function (element, index) {
					return (element.event_verb == callObject.eventVerb && element.request_category == callObject.requestCategory && element.request_type == callObject.requestType && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus);
				});
			if (allowedWorkflowArray.length == 0) {
				allowedWorkflowArray = $.grep(mserviceUtilities.var.callRegisterWorkflowEventVerbList, function (element, index) {
						return (element.event_verb == callObject.eventVerb && element.request_category == callObject.requestCategory && element.request_type == "ALL" && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus);
					});
				if (allowedWorkflowArray.length == 0) {
					allowedWorkflowArray = $.grep(mserviceUtilities.var.callRegisterWorkflowEventVerbList, function (element, index) {
							return (element.event_verb == callObject.eventVerb && element.request_category == "ALL" && element.request_type == "ALL" && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus);
						});
				}
			}
		}
		return allowedWorkflowArray;
	},
	goBackToPreviousScreen : function () {
		$.mobile.back();
	},
	loadJSScripts : function (jsScripts) {
		var jsLoadSuccess = true;
		for (var jsScriptNo = 0; jsScriptNo < jsScripts.length; jsScriptNo++) {
			$.cachedScript(jsScripts[jsScriptNo]).fail(function (jqxhr, settings, exception) {
				jsLoadSuccess = false;
			});
			if (!jsLoadSuccess) {
				break;
			}
		}
		return jsLoadSuccess;
	},
	loadXSLDoc : function (fileName) {
		var filePath,
		returnDoc;
		if (login_profile.app_mode == 'MOBILE_BROWSER') {
			filePath = "../xsl/";
		} else if (login_profile.app_mode == 'MOBILE_NATIVE') {
			filePath = app.persistentStorageRootDirectory + cvs.applicationBaseDirectory + "/" + cvs.functionalConfigurationPkgDirectory + "/" + login_profile.client_id + "/" + login_profile.country_code + "/xsl/";
		}
		$.ajax({
			url : filePath + fileName + "_" + login_profile.client_id + "_" + login_profile.country_code + ".xsl",
			async : false,
			cache : true,
			dataType : "xml"
		}).done(function (data) {
			returnDoc = data;
		}).fail(function () {
			$.ajax({
				url : filePath + fileName + "_" + login_profile.client_id + ".xsl",
				async : false,
				cache : true,
				dataType : "xml"
			}).done(function (data) {
				returnDoc = data;
			}).fail(function () {
				$.ajax({
					url : filePath + fileName + ".xsl",
					async : false,
					cache : true,
					dataType : "xml"
				}).done(function (data) {
					returnDoc = data;
				}).fail(function () {
					alert('Unable to load required files.');
					mserviceUtilities.goBackToPreviousScreen();
				});
			});
		});
		return returnDoc;
	},
	loadHTMLDoc : function (fileName) {
		var filePath,
		returnDoc;
		if (login_profile.app_mode == 'MOBILE_BROWSER') {
			filePath = "../html/";
		} else if (login_profile.app_mode == 'MOBILE_NATIVE') {
			filePath = app.persistentStorageRootDirectory + cvs.applicationBaseDirectory + "/" + cvs.functionalConfigurationPkgDirectory + "/" + login_profile.client_id + "/" + login_profile.country_code + "/html/";
		}
		$.ajax({
			url : filePath + fileName + "_" + login_profile.client_id + "_" + login_profile.country_code + ".html",
			async : false,
			cache : true,
			dataType : "text"
		}).done(function (data) {
			returnDoc = data;
		}).fail(function () {
			$.ajax({
				url : filePath + fileName + "_" + login_profile.client_id + ".html",
				async : false,
				cache : true,
				dataType : "text"
			}).done(function (data) {
				returnDoc = data;
			}).fail(function () {
				$.ajax({
					url : filePath + fileName + ".html",
					async : false,
					cache : true,
					dataType : "text"
				}).done(function (data) {
					returnDoc = data;
				}).fail(function () {
					alert('Unable to load required files.');
					mserviceUtilities.goBackToPreviousScreen();
				});
			});
		});
		return returnDoc;
	},
	managingSubFeatureAccess : function (screenID) {
		var featureAccessProfile,
		subFeatureArray,
		subFeatureCounter,
		childScreenID;
		subFeatureArray = $("#" + screenID).find('[data-button-role="feature"],[data-button-role="workflow"]');
		for (subFeatureCounter = 0; subFeatureCounter < subFeatureArray.length; subFeatureCounter++) {
			childScreenID = $(subFeatureArray[subFeatureCounter]).attr("id").replace(screenID + "_", "").replace("_btn", "");
			featureAccessProfile = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == childScreenID;
				});
			if (featureAccessProfile.length != 0) {
				if (featureAccessProfile[0].feature_access == "true") {
					$(subFeatureArray[subFeatureCounter]).attr("data-feature-access", "true");
					$(subFeatureArray[subFeatureCounter]).show();
				} else {
					$(subFeatureArray[subFeatureCounter]).attr("data-feature-access", "false");
				}
			} else {
				$(subFeatureArray[subFeatureCounter]).attr("data-feature-access", "false");
			}
		}
	},
	pageIsSelectmenuDialog : function (page) {
		var isDialog = false,
		id = page && page.attr("id");
		$(".filterable-select").each(function () {
			if ($(this).attr("id") + "-dialog" === id) {
				isDialog = true;
				return false;
			}
		});
		return isDialog;
	},
	setInterval : function (setIntervalObj) {
		var durationCounter;
		durationCounter = 0;
		var setTimeInterval = setInterval(function () {
				durationCounter++;
				if (mserviceUtilities.var.intervalEndIndicator == setIntervalObj.intervalEndIndicator) {
					clearInterval(setTimeInterval);
					mserviceUtilities.var.intervalEndIndicator = 0;
					setIntervalObj.success();
				} else if (setIntervalObj.waitDuration == durationCounter) {
					clearInterval(setTimeInterval);
					mserviceUtilities.var.intervalEndIndicator = 0;
					setIntervalObj.failure();
				}
			}, 1000);
	},
	transformXML : function (xmlDoc, xslDoc, xslPath) {
		var returnHTML,
		xsltProcessor;
		if (window.ActiveXObject) {
			if (login_profile.device == 'iswinOS') {
				returnHTML = executeService_transform_xml_to_html(xmlDoc, xslPath);
			} else {
				returnHTML = xmlDoc.transformNode(xslDoc);
			}
		} else if (document.implementation && document.implementation.createDocument) {
			if (login_profile.device == 'Android' && (login_profile.opsys_version == '1.x' || login_profile.opsys_version == '2.x')) {
				returnHTML = executeService_transform_xml_to_html(xmlDoc, xslPath);
			} else {
				xsltProcessor = new XSLTProcessor();
				xsltProcessor.importStylesheet(xslDoc);
				returnHTML = xsltProcessor.transformToFragment(xmlDoc, document);
			}
		}
		return returnHTML;
	},
	processTransportResponse : function (data, textstatus) {
		var responseData,returnValue = false;
		if (textstatus == "success") {
			responseData = JSON.parse(data.responseText);
			if (responseData.document != undefined) {
				if (responseData.document.ApplicationException != undefined) {
					if (responseData.document.ApplicationException.errorNumber != "") {
						alert(responseData.document.ApplicationException.errorNumber + " : " + responseData.document.ApplicationException.errorDescription);
					} else {
						alert("Unable to process your request.");
					}
				}
			} else {
				if (responseData.length == 0) {
					alert("No records found.");
				}
				else {
					returnValue = true;
				}
			}
		} else if (textstatus == "timeout") {
			alert("Sorry your request is timed out. Please try again.");
		} else {
			alert("Unable to process your request.");
		}
		return returnValue;
	},
	isBackbutton : function() {
		/*if(device.platform == 'iOS') {
			return true;
		}*/
		return false;
	},
	var : {
		callRegisterWorkflowEventVerbList : "",
		userAttachmentsFilePath : {},
		intervalEndIndicator : 0
	},
};
var transformJSON = {
	toHTML : function (jsonData, htmlData) {
		var returnValue,
		processingString,
		jsonDataCounter;
		returnValue = "";
		for (jsonDataCounter = 0; jsonDataCounter < jsonData.length; jsonDataCounter++) {
			transformJSON.variable.currentJsonObject = jsonData[jsonDataCounter];
			processingString = htmlData;
			while (true) {
				if (processingString.indexOf("@") == -1) {
					if (((processingString.indexOf("<eval>") != -1) && (processingString.indexOf("</eval>") != -1)) && ((processingString.indexOf("<condition>") == -1) || (processingString.indexOf("<eval>") < processingString.indexOf("<condition>")))) {
						returnValue += processingString.substring(0, processingString.indexOf("<eval>"));
						returnValue += transformJSON.evaluateExpression(processingString.substring(processingString.indexOf("<eval>"), processingString.indexOf("</eval>") + 7));
						processingString = processingString.substring(processingString.indexOf("</eval>") + 7);
					} else if (((processingString.indexOf("<condition>") != -1) && (processingString.indexOf("</condition>") != -1)) && ((processingString.indexOf("<eval>") == -1) || (processingString.indexOf("<condition>") < processingString.indexOf("<eval>")))) {
						returnValue += processingString.substring(0, processingString.indexOf("<condition>"));
						returnValue += transformJSON.executeConditionBlock(processingString.substring(processingString.indexOf("<condition>"), processingString.indexOf("</condition>") + 12));
						processingString = processingString.substring(processingString.indexOf("</condition>") + 12);
					} else {
						returnValue += processingString;
					}
					break;
				} else {
					if (((processingString.indexOf("<eval>") != -1) && (processingString.indexOf("</eval>") != -1)) && (((processingString.indexOf("<condition>") == -1) || (processingString.indexOf("<eval>") < processingString.indexOf("<condition>"))) && (processingString.indexOf("<eval>") < processingString.indexOf("@")))) {
						returnValue += processingString.substring(0, processingString.indexOf("<eval>"));
						returnValue += transformJSON.evaluateExpression(processingString.substring(processingString.indexOf("<eval>"), processingString.indexOf("</eval>") + 7));
						processingString = processingString.substring(processingString.indexOf("</eval>") + 7);
					} else if (((processingString.indexOf("<condition>") != -1) && (processingString.indexOf("</condition>") != -1)) && (((processingString.indexOf("<eval>") == -1) || (processingString.indexOf("<condition>") < processingString.indexOf("<eval>"))) && (processingString.indexOf("<condition>") < processingString.indexOf("@")))) {
						returnValue += processingString.substring(0, processingString.indexOf("<condition>"));
						returnValue += transformJSON.executeConditionBlock(processingString.substring(processingString.indexOf("<condition>"), processingString.indexOf("</condition>") + 12));
						processingString = processingString.substring(processingString.indexOf("</condition>") + 12);
					} else {
						returnValue += processingString.substring(0, (processingString.indexOf("@") - 1));
						processingString = processingString.substring(processingString.indexOf("@"));
						returnValue += transformJSON.getValue(processingString.substring(0, processingString.indexOf(" ")));
						processingString = processingString.substring(processingString.indexOf(" ") + 1);
					}
				}
			}
		}
		return returnValue;
	},
	evaluateExpression : function (expression) {
		var returnValue,
		processingString,
		evaluationString;
		returnValue = "";
		evaluationString = "";
		if (expression.indexOf("<eval>") != -1 && expression.indexOf("</eval>") != -1) {
			processingString = expression.substring(expression.indexOf("<eval>") + 6, expression.indexOf("</eval>"));
			if (processingString != undefined) {
				while (true) {
					if (processingString.indexOf("@") == -1) {
						evaluationString += processingString;
						break;
					} else {
						evaluationString += processingString.substring(0, (processingString.indexOf("@") - 1));
						processingString = processingString.substring(processingString.indexOf("@"));
						evaluationString += transformJSON.getValue(processingString.substring(0, processingString.indexOf(" ")));
						processingString = processingString.substring(processingString.indexOf(" ") + 1);
					}
				}
			}
		}
		try {
			returnValue = eval("returnValue =" + evaluationString);
		} catch (ex) {
			returnValue = ""
		}
		return returnValue;
	},
	evaluateCondition : function (condition) {
		var actualCondition,
		conditionArguments,
		argumentCounter,
		leftSideValue,
		rightSideValue;
		conditionArguments = {};
		argumentCounter = 1; ;
		condition = condition.trim();
		actualCondition = "";
		while (true) {
			if (condition != "") {
				if (condition.charAt(0) == "(" || condition.charAt(0) == ")") {
					actualCondition += condition.charAt(0);
					condition = condition.substring(1).trim();
				} else {
					if (actualCondition.charAt(actualCondition.length - 1) != ")") {
						leftSideValue = condition.substring(0, condition.indexOf(" "));
						conditionArguments["leftArgument" + argumentCounter] = transformJSON.getValue(leftSideValue);
						actualCondition += "conditionArguments.leftArgument" + argumentCounter;
						condition = condition.substring(condition.indexOf(" ")).trim();
						actualCondition += condition.substring(0, condition.indexOf(" "));
						condition = condition.substring(condition.indexOf(" ")).trim();
						rightSideValue = condition.substring(0, condition.indexOf(")")).trim();
						conditionArguments["rightArgument" + argumentCounter] = transformJSON.getValue(rightSideValue);
						actualCondition += "conditionArguments.rightArgument" + argumentCounter;
						condition = condition.substring(condition.indexOf(")")).trim();
						argumentCounter++;
					} else {
						actualCondition += condition.substring(0, condition.indexOf(" "));
						condition = condition.substring(condition.indexOf(" ")).trim();
					}
				}
			} else {
				break;
			}
		}
		return eval(actualCondition);
	},
	executeConditionBlock : function (conditionBlock) {
		var returnValue,
		conditionString,
		processingString;
		returnValue = "";
		if (conditionBlock.indexOf("<condition>") != -1 && conditionBlock.indexOf("</condition>") != -1) {
			if (conditionBlock.indexOf("<if>") != -1 && conditionBlock.indexOf("</if>") != -1) {
				conditionString = conditionBlock.substring(conditionBlock.indexOf("<if>") + 4, conditionBlock.indexOf("</if>"));
				if (transformJSON.evaluateCondition(conditionString)) {
					if (conditionBlock.indexOf("<true>") != -1 && conditionBlock.indexOf("</true>") != -1) {
						processingString = conditionBlock.substring(conditionBlock.indexOf("<true>") + 6, conditionBlock.indexOf("</true>"));
					}
				} else {
					if (conditionBlock.indexOf("<false>") != -1 && conditionBlock.indexOf("</false>") != -1) {
						processingString = conditionBlock.substring(conditionBlock.indexOf("<false>") + 7, conditionBlock.indexOf("</false>"));
					}
				}
				if (processingString != undefined) {
					while (true) {
						if (processingString.indexOf("@") == -1) {
							if (((processingString.indexOf("<eval>") != -1) && (processingString.indexOf("</eval>") != -1)) && ((processingString.indexOf("<condition>") == -1) || (processingString.indexOf("<eval>") < processingString.indexOf("<condition>")))) {
								returnValue += processingString.substring(0, processingString.indexOf("<eval>"));
								returnValue += transformJSON.evaluateExpression(processingString.substring(processingString.indexOf("<eval>"), processingString.indexOf("</eval>") + 7));
								processingString = processingString.substring(processingString.indexOf("</eval>") + 7);
							} else {
								returnValue += processingString;
							}
							break;
						} else {
							if (((processingString.indexOf("<eval>") != -1) && (processingString.indexOf("</eval>") != -1)) && (((processingString.indexOf("<condition>") == -1) || (processingString.indexOf("<eval>") < processingString.indexOf("<condition>"))) && (processingString.indexOf("<eval>") < processingString.indexOf("@")))) {
								returnValue += processingString.substring(0, processingString.indexOf("<eval>"));
								returnValue += transformJSON.evaluateExpression(processingString.substring(processingString.indexOf("<eval>"), processingString.indexOf("</eval>") + 7));
								processingString = processingString.substring(processingString.indexOf("</eval>") + 7);
							} else {
								returnValue += processingString.substring(0, (processingString.indexOf("@") - 1));
								processingString = processingString.substring(processingString.indexOf("@"));
								returnValue += transformJSON.getValue(processingString.substring(0, processingString.indexOf(" ")));
								processingString = processingString.substring(processingString.indexOf(" ") + 1);
							}
						}
					}
				}
			}
		}
		return returnValue;
	},
	getValue : function (source) {
		var returnValue;
		returnValue = "";
		if (source.charAt(0) == "'" || source.charAt(0) == '"') {
			returnValue = source.substring(1, source.length - 1);
		} else if (source.charAt(0) == "@") {
			if (transformJSON.variable.currentJsonObject != "") {
				if (transformJSON.variable.currentJsonObject[source.trim().substring(1)] != undefined) {
					returnValue = transformJSON.variable.currentJsonObject[source.trim().substring(1)];
				}
			}
		}
		return returnValue;
	},
	variable : {
		currentJsonObject : ""
	}
};
$.fn.extend({
	applyConfiguredLabels : function (eventVerb) {
		var grepReturnValue,
		currentScreenID,
		configurationURL;
		currentScreenID = $(this).attr("id");
		if (login_profile.app_mode == "MOBILE_BROWSER") {
			configurationURL = "../configuration/label/label_" + currentScreenID + "_" + login_profile.client_id + "_" + login_profile.country_code + "_" + login_profile.locale_id + ".xml";
		} else {
			configurationURL = app.persistentStorageRootDirectory + cvs.applicationBaseDirectory + "/" + cvs.functionalConfigurationPkgDirectory + "/" + login_profile.client_id + "/" + login_profile.country_code + "/label/label_" + currentScreenID + "_" + login_profile.client_id + "_" + login_profile.country_code + "_" + login_profile.locale_id + ".xml";
		}
		if (currentScreenID != undefined) {
			grepReturnValue = $.grep(mobileConfigurationEngine.var.labelConfigurations, function (element, index) {
					return element.screenID == currentScreenID;
				});
			if (grepReturnValue.length == 0) {
				$.ajax({
					url : configurationURL,
					async : false,
					dataType : "xml",
					cache : false
				}).done(function (data) {
					mobileConfigurationEngine.getLabelConfigurationObject(currentScreenID, data, eventVerb);
				});
			}
			mobileConfigurationEngine.applyConfiguredLabels(currentScreenID, eventVerb);
		}
	},
	createConfiguredFields : function (eventVerb) {
		var grepReturnValue,
		currentScreenID,
		configurationURL;
		currentScreenID = $(this).attr("id");
		if (login_profile.app_mode == "MOBILE_BROWSER") {
			configurationURL = "../configuration/ui/ui_" + currentScreenID + "_" + login_profile.client_id + "_" + login_profile.country_code + ".xml";
		} else {
			configurationURL = app.persistentStorageRootDirectory + cvs.applicationBaseDirectory + "/" + cvs.functionalConfigurationPkgDirectory + "/" + login_profile.client_id + "/" + login_profile.country_code + "/ui/ui_" + currentScreenID + "_" + login_profile.client_id + "_" + login_profile.country_code + ".xml";
		}
		if (currentScreenID != undefined) {
			grepReturnValue = $.grep(mobileConfigurationEngine.var.uiConfigurations, function (element, index) {
					return element.screenID == currentScreenID;
				});
			if (grepReturnValue.length == 0) {
				$.ajax({
					url : configurationURL,
					async : false,
					dataType : "xml",
					cache : false
				}).done(function (data) {
					mobileConfigurationEngine.getUiConfigurationObject(currentScreenID, data, eventVerb);
				});
			}
			mobileConfigurationEngine.createConfiguredFields(currentScreenID, eventVerb);
		}
	},
	disable : function () {
		if ($(this).attr("data-widget-type") == "m_datebox" || $(this).attr("data-widget-type") == "m_timebox") {
			$(this).datebox("disable").parent().css("opacity", ".7");
		} else if ($(this).attr("data-widget-type") == "m_combobox" || $(this).attr("data-widget-type") == "m_dropdownlist" || $(this).attr("data-widget-type") == "m_multiselect") {
			$(this).selectmenu("disable").prev().css("opacity", ".7");
		} else if ($(this).attr("data-widget-type") == "m_textbox" || $(this).attr("data-widget-type") == "m_numerictextbox") {
			$(this).attr("disabled", true).parent().css("opacity", ".7");
		} else if ($(this).attr("data-widget-type") == "m_textarea") {
			$(this).attr("disabled", true).css("opacity", ".7");
		} else if ($(this).attr("data-widget-type") == "m_flipswitch") {
			$(this).flipswitch("disable").parent().css("opacity", ".5")
		}
	},
	enable : function () {
		if ($(this).attr("data-widget-type") == "m_datebox" || $(this).attr("data-widget-type") == "m_timebox") {
			$(this).datebox("enable").parent().css("opacity", "");
		} else if ($(this).attr("data-widget-type") == "m_combobox" || $(this).attr("data-widget-type") == "m_dropdownlist" || $(this).attr("data-widget-type") == "m_multiselect") {
			$(this).selectmenu("enable").prev().css("opacity", "");
		} else if ($(this).attr("data-widget-type") == "m_textbox" || $(this).attr("data-widget-type") == "m_numerictextbox") {
			$(this).attr("disabled", false).parent().css("opacity", "");
		} else if ($(this).attr("data-widget-type") == "m_textarea") {
			$(this).attr("disabled", false).css("opacity", "");
		} else if ($(this).attr("data-widget-type") == "m_flipswitch") {
			$(this).flipswitch("enable").parent().css("opacity", "")
		}
	},
	getVal : function () {
		var returnValue;
		if ($(this).attr("data-widget-type") == "m_datebox" || $(this).attr("data-widget-type") == "m_timebox") {
			returnValue = "";
			if ($(this).val() != "") {
				returnValue = $(this).datebox('getTheDate');
			}
		} else if ($(this).attr("data-widget-type") == "m_combobox" || $(this).attr("data-widget-type") == "m_dropdownlist") {
			returnValue = "";
			if ($(this).val() != "---Select---" && $(this).val() != null) {
				returnValue = $(this).val();
			}
		} else if ($(this).attr("data-widget-type") == "m_numerictextbox" || $(this).attr("data-widget-type") == "m_textbox") {
			returnValue = $(this).val();
		} else if ($(this).attr("data-widget-type") == "m_flipswitch") {
			returnValue = "0";
			if ($(this).val() != null) {
				returnValue = $(this).val();
			}
		} else if ($(this).attr("data-widget-type") == "m_multiselect") {
			returnValue = [];
			if ($(this).val() != null) {
				returnValue = $(this).val();
			}
		} else if ($(this).attr("data-widget-type") == "m_textarea") {
			returnValue = $(this).val().replace(/\n/g, "\\n");
		} else if ($(this).attr("data-widget-type") == "m_signaturepad") {
			returnValue = $(this).attr("src");
		} else if ($(this).attr("data-widget-type") == "m_radiobox") {
			returnValue = "";
			if($("#" + $(this).attr("id") + " :radio:checked").val() != undefined) {
				returnValue = $("#" + $(this).attr("id") + " :radio:checked").val();
			}
		}
		return returnValue;
	},
	initializeMCombobox : function (initObject) {
		initObject.fieldID = $(this).attr("id");
		mobileWidgetInitializer.initializeMCombobox(initObject);
	},
	initializeMDatebox : function (initObject) {
		initObject.fieldID = $(this).attr("id");
		mobileWidgetInitializer.initializeMDatebox(initObject);
	},
	initializeMDropdownlist : function (initObject) {
		initObject.fieldID = $(this).attr("id");
		mobileWidgetInitializer.initializeMDropdownlist(initObject);
	},
	initializeMFlipswitch : function (initObject) {
		initObject.fieldID = $(this).attr("id");
		mobileWidgetInitializer.initializeMFlipswitch(initObject);
	},
	initializeMMultiselect : function (initObject) {
		initObject.fieldID = $(this).attr("id");
		mobileWidgetInitializer.initializeMMultiselect(initObject);
	},
	initializeMNumerictextbox : function (initObject) {
		initObject.fieldID = $(this).attr("id");
		mobileWidgetInitializer.initializeMNumerictextbox(initObject);
	},
	initializeMSignaturepad : function (initObject) {
		initObject.fieldID = $(this).attr("id");
		mobileWidgetInitializer.initializeMSignaturepad(initObject);
	},
	initializeMTextarea : function (initObject) {
		initObject.fieldID = $(this).attr("id");
		mobileWidgetInitializer.initializeMTextarea(initObject);
	},
	initializeMTextbox : function (initObject) {
		initObject.fieldID = $(this).attr("id");
		mobileWidgetInitializer.initializeMTextbox(initObject);
	},
	initializeMTimebox : function (initObject) {
		initObject.fieldID = $(this).attr("id");
		mobileWidgetInitializer.initializeMTimebox(initObject);
	},
	initializeMRadioBox : function (initObject) {
		initObject.fieldID = $(this).attr("id");
		mobileWidgetInitializer.initializeMRadioBox(initObject);
	},
	revampScreen : function (eventVerb) {
		var grepReturnValue,
		currentScreenID,
		configurationURL;
		currentScreenID = $(this).attr("id");
		if (login_profile.app_mode == "MOBILE_BROWSER") {
			configurationURL = "../configuration/ui/ui_" + currentScreenID + "_" + login_profile.client_id + "_" + login_profile.country_code + ".xml";
		} else {
			configurationURL = app.persistentStorageRootDirectory + cvs.applicationBaseDirectory + "/" + cvs.functionalConfigurationPkgDirectory + "/" + login_profile.client_id + "/" + login_profile.country_code + "/ui/ui_" + currentScreenID + "_" + login_profile.client_id + "_" + login_profile.country_code + ".xml";
		}
		if (currentScreenID != undefined) {
			grepReturnValue = $.grep(mobileConfigurationEngine.var.uiConfigurations, function (element, index) {
					return element.screenID == currentScreenID;
				});
			if (grepReturnValue.length == 0) {
				$.ajax({
					url : configurationURL,
					async : false,
					dataType : "xml",
					cache : false
				}).done(function (data) {
					mobileConfigurationEngine.getUiConfigurationObject(currentScreenID, data, eventVerb);
				});
			}
			mobileConfigurationEngine.revampScreen(currentScreenID, eventVerb);
		}
	},
	setVal : function (value) {
		if ($(this).attr("data-widget-type") == "m_datebox" || $(this).attr("data-widget-type") == "m_timebox") {
			return $(this).datebox('setTheDate', value);
		} else if ($(this).attr("data-widget-type") == "m_flipswitch") {
			$(this).val(value).flipswitch('refresh');
		} else if ($(this).attr("data-widget-type") == "m_multiselect") {
			if(value != '') {
				value = value.split(',');
				$(this).val(value);
			}
			$(this).selectmenu('refresh');
		} else if ($(this).attr("data-widget-type") == "m_combobox" || $(this).attr("data-widget-type") == "m_dropdownlist") {
			$(this).val(value).selectmenu('refresh');
		} else if ($(this).attr("data-widget-type") == "m_textbox" || $(this).attr("data-widget-type") == "m_numerictextbox" || $(this).attr("data-widget-type") == "m_textarea") {
			$(this).val(value);
		} else if ($(this).attr("data-widget-type") == "m_radiobox") {
			$("#" + $(this).attr("id") + " [value=" + value + "]").attr('checked', true);
			$("#" + $(this).attr("id") + " [value=" + value + "]").checkboxradio("refresh");
			$("#" + $(this).attr("id")).trigger("change");
		} 
	}
});
$.extend(jQuery.mobile.datebox.prototype.options.lang, {
	'en' : {
		setDateButtonLabel : "Set Date",
		setTimeButtonLabel : "Set Time",
		setDurationButtonLabel : "Set Duration",
		calTodayButtonLabel : "Jump to Today",
		titleDateDialogLabel : "Set Date",
		titleTimeDialogLabel : "Set Time",
		daysOfWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		daysOfWeekShort : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		monthsOfYear : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		monthsOfYearShort : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		durationLabel : ['Days', 'Hours', 'Minutes', 'Seconds'],
		durationDays : ['Day', 'Days'],
		tooltip : "Open Date Picker",
		nextMonth : "Next Month",
		prevMonth : "Previous Month",
		timeFormat : 24,
		headerFormat : '%A, %B %-d, %Y',
		dateFieldOrder : mserviceUtilities.getDateFieldOrder(),
		timeFieldOrder : ['h', 'i', 'a'],
		slideFieldOrder : ['y', 'm', 'd'],
		dateFormat : mserviceUtilities.getDateFormat(),
		useArabicIndic : false,
		isRTL : false,
		calStartDay : 0,
		clearButton : 'clear'
	}
});
$.extend(jQuery.mobile.datebox.prototype.options, {
	useLang : 'en'
});
$.mobile.document.on("selectmenucreate", ".filterable-select", function (event) {
	var input,
	selectmenu = $(event.target),
	list = $("#" + selectmenu.attr("id") + "-menu"),
	form = list.jqmData("filter-form");
	if (!form) {
		input = $("<input data-type='search'></input>");
		form = $("<form></form>").append(input);
		input.textinput();
		list.before(form).jqmData("filter-form", form);
		form.jqmData("listview", list);
	}
	selectmenu.filterable({
		input : input,
		children : "> option[value]"
	}).on("filterablefilter", function () {
		selectmenu.selectmenu("refresh");
	});
}).on("pagecontainerbeforeshow", function (event, data) {
	var listview,
	form;
	if (!mserviceUtilities.pageIsSelectmenuDialog(data.toPage)) {
		return;
	}
	listview = data.toPage.find("ul");
	form = listview.jqmData("filter-form");
	data.toPage.jqmData("listview", listview);
	listview.before(form);
}).on("pagecontainerhide", function (event, data) {
	var listview,
	form;
	if (!mserviceUtilities.pageIsSelectmenuDialog(data.prevPage)) {
		return;
	}
	listview = data.prevPage.jqmData("listview"),
	form = listview.jqmData("filter-form");
	listview.before(form);
});
$(document).delegate("[type = 'number']", "keydown", function (e) {
	if (e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 || e.keyCode == 13 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
		return;
	} else {
		if (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	}
}).delegate("[data-widget-type]", "change", function (e) {
	$("#" + $(this).attr("data-field-parent") + "_check_ind").css("display","");
}).delegate("[data-widget-type = 'm_button']", "click", function (e) {
	var mButton,
	screenObject;
	mButton = $(this);
	screenObject = eval(mserviceUtilities.getCurrentScreenID());
	if (mButton.attr("data-button-role") == "workflow") {
		screenObject.var.selected_workflow_event_verb = mButton.attr("id").replace(mserviceUtilities.getCurrentScreenID() + "_", "").replace("_btn", "");
		screenObject.var.selected_workflow_event_verb_name = mButton.attr('data-text');
		if (eval(screenObject["workflow_btn_pre_click"]())) {
			if (ruleEngine.executeRuleStatements({
					screenID : mserviceUtilities.getCurrentScreenID(),
					objectID : "button",
					eventID : "click",
					fieldID : mButton.attr("id")
				})) {
				eval(screenObject["workflow_btn_click"]());
			}
		}
	} else if (mButton.attr("data-button-role") == "submit") {
		if (eval(screenObject["submit_btn_pre_click"]())) {
			if (ruleEngine.executeRuleStatements({
					screenID : mserviceUtilities.getCurrentScreenID(),
					objectID : "button",
					eventID : "click",
					fieldID : mButton.attr("id")
				})) {
				if (eval(screenObject["submit_btn_click"]())) {
					mserviceUtilities.goBackToPreviousScreen();
				}
			}
		}
	} else if (mButton.attr("data-button-role") == "cancel") {
		if (mobileConfigurationEngine.var.valueChangeIndicator) {
			if (confirm("Do you want to cancel the changes you made ?")) {
				mserviceUtilities.goBackToPreviousScreen();
			}
		} else {
			mserviceUtilities.goBackToPreviousScreen();
		}
		mobileConfigurationEngine.var.call_details_loadIndicator = false;
	} else if (mButton.attr("data-button-role") == "signaturereset") {
		$("#" + mserviceUtilities.getCurrentScreenID() + "_signature").signaturePad().clearCanvas();
	} else if (mButton.attr("data-button-role") == "signature_submit") {
		$("#" + $("#" + mserviceUtilities.getCurrentScreenID() + "_signature").attr("data-widget-parent")).attr("src", $("#" + mserviceUtilities.getCurrentScreenID() + "_signature").signaturePad().getSignatureImage());
		$("#" + mserviceUtilities.getCurrentScreenID() + "_signature_popup").popup("close");
	} else {
		if (eval(screenObject[mButton.attr("id").replace(mserviceUtilities.getCurrentScreenID() + "_", "") + "_pre_click"]())) {
			if (ruleEngine.executeRuleStatements({
					screenID : mserviceUtilities.getCurrentScreenID(),
					objectID : "button",
					eventID : "click",
					fieldID : mButton.attr("id")
				})) {
				eval(screenObject[mButton.attr("id").replace(mserviceUtilities.getCurrentScreenID() + "_", "") + "_click"]());
			}
		}
	}
}).delegate("[data-widget-type = 'm_combobox'], [data-widget-type = 'm_datebox'], [data-widget-type = 'm_dropdownlist'], [data-widget-type = 'm_flipswitch'], [data-widget-type = 'm_multiselect'], [data-widget-type = 'm_numerictextbox'], [data-widget-type = 'm_textarea'], [data-widget-type = 'm_textbox'], [data-widget-type = 'm_timebox'], [data-widget-type = 'm_radiobox'], [data-widget-type = 'm_signaturepad']", "change", function () {
	mobileConfigurationEngine.var.valueChangeIndicator = true;
}).delegate("[data-widget-type = 'm_signaturepad']", "click", function (e) {
	var mButton;
	mButton = $(this);
	if(device.platform != 'iOS') {
		screen.lockOrientation('landscape');
	}
	setTimeout(function(){
		$canvas = $('canvas');
		if($canvas.length != 0) {
			$canvas.attr({
				height: window.innerHeight/100*80,
				width: window.innerWidth/100*90,
			});
		} 
		$("#" + mserviceUtilities.getCurrentScreenID() + "_signature_popup").bind({
		   popupbeforeposition: function(event, ui) {
			   $("#" + mserviceUtilities.getCurrentScreenID() + "_signature").signaturePad().clearCanvas();
		   },
		   popupafterclose: function(event, ui) {
			   if(device.platform != 'iOS') {
					screen.lockOrientation('portrait');
			   }
		   }
		});
		$("#" + mserviceUtilities.getCurrentScreenID() + "_signature_popup").popup("open",{
			positionTo:"window",
			transition:"pop"
		});
		$("#" + mserviceUtilities.getCurrentScreenID() + "_signature").attr("data-widget-parent",mButton.attr("id"));
	}, 1000);
});
Object.preventExtensions(mobileConfigurationEngine);
Object.preventExtensions(mobileWidgetInitializer);
Object.preventExtensions(mserviceUtilities);
Object.preventExtensions(transformJSON);
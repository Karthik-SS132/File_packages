/* Mservice Common Scripts - Version 1.2.01 - 23/03/20 */

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
							if (textstatus == "success") {
								transportResponse = JSON.parse(data.responseText);
								if ($.isArray(transportResponse)) {
									if (transportResponse[0].p_update_status == "SP001") {
										returnValue = true;
									}
								} else {
									if (transportResponse.document != undefined) {
										if (transportResponse.document.ApplicationException != undefined) {
											alert(transportResponse.document.ApplicationException.errorNumber + transportResponse.document.ApplicationException.errorDescription);
										}
									}
								}
							} else if (textstatus == "timeout") {
								alert("Sorry your request is timed out. Please try again.");
							} else {
								alert("Unable to process your request.");
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
		var returnValue,
		xmlDoc,
		childNodesCounter;
		returnValue = "";
		if (valueString != undefined && valueString != "") {
			if (valueString.charAt(0) == "$") {
				try {
					returnValue = eval(valueString.substring(1));
				} catch (exception) {
					returnValue = "";
				}
			} else if (valueString.charAt(0) == "#") {
				returnValue = $(valueString).getVal();
			} else if (valueString == "NEWDATE") {
				returnValue = new Date();
			} else if (valueString.charAt(0) == "'" || valueString.charAt(0) == '"') {
				returnValue = valueString.substring(1, valueString.length - 1);
			} else if (valueString.charAt(0) == "<" && valueString.charAt(valueString.length - 1) == ">") {
				xmlDoc = mserviceUtilities.getXMLDocument(valueString);
				for (childNodesCounter = 0; childNodesCounter < xmlDoc.childNodes[0].childElementCount; childNodesCounter++) {
					xmlDoc.childNodes[0].childNodes[childNodesCounter].childNodes[0].nodeValue = mserviceUtilities.getActualValue(xmlDoc.childNodes[0].childNodes[childNodesCounter].childNodes[0].nodeValue);
				};
				returnValue = xmlDoc.childNodes[0].outerHTML;
			} else {
				try {
					returnValue = eval(valueString);
				} catch (exception) {
					returnValue = "";
				}
			}
		};
		return returnValue;
	},
	getAllowedFileExtensions : function () {
		if (typeof(mserviceUtilities.variable.userAttachmentsAllowedFileExtensions) == "undefined") {
			mserviceUtilities.variable.userAttachmentsAllowedFileExtensions = ConvertXMLStringToJSONArray(executeService_retrieve_listof_values_for_searchcondition({
						p_inputparam_xml : "<inputparam><lov_code_type>FILEEXTNALLOWED</lov_code_type></inputparam>"
					}));
		};
		return mserviceUtilities.variable.userAttachmentsAllowedFileExtensions;
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
		};
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
	getAllowedWorkflowEventVerbs: function (callObject) {
		var allowedWorkflowArray, 
		transactionString, 
		eventVerbList, 
		accessWorkflowArray, 
		nextWorkflowArray = [];
		if (mserviceUtilities.variable.WorkflowObject[callObject.transactionType] === undefined ) {
				transactionString = callObject.transactionType +"_ALLOWED_EVENTVERB_LIST" ;
					eventVerbList = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					outputPath : "context/outputparam",
					pageSize : 10,
					inputParameter : {
						p_inputparam_xml : "'<inputparam><lov_code_type>" + transactionString +"</lov_code_type><search_field_1>ALL</search_field_1><search_field_2>ALL</search_field_2><search_field_3>ALL</search_field_3><search_field_4>ALL</search_field_4></inputparam>'"
					},
					screenID : "",
				});
				eventVerbList.read();
				mserviceUtilities.variable.WorkflowObject[callObject.transactionType] = eventVerbList.data();
			};
			
			allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.request_category == callObject.requestCategory && element.request_type == callObject.requestType && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus  && element.current_feature_id == callObject.currentFeatureId); 
			});
			if (allowedWorkflowArray.length == 0)
				allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.request_category == callObject.requestCategory && element.request_type == "ALL" && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus  && element.current_feature_id == callObject.currentFeatureId);
				});
			if (allowedWorkflowArray.length == 0)
				allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.request_category == callObject.requestCategory && element.request_type == "ALL" && element.from_workflow_stage == 0 && element.from_status == "ALL"  && element.current_feature_id == callObject.currentFeatureId);
				});	
			if (allowedWorkflowArray.length ==0)
				allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.request_category == callObject.requestCategory && element.request_type == callObject.requestType && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus  && element.current_feature_id == "ALL");
				});	
			if (allowedWorkflowArray.length == 0)
				allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.request_category == callObject.requestCategory && element.request_type == "ALL" && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus  && element.current_feature_id == callObject.currentFeatureId);
				});	
			if (allowedWorkflowArray.length == 0)
				allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.request_category == callObject.requestCategory && element.request_type == "ALL" && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus  && element.current_feature_id == "ALL");
				});	
			if (allowedWorkflowArray.length ==0)
			     allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.request_category == callObject.requestCategory && element.request_type == "ALL" && element.from_workflow_stage == 0 && element.from_status == "ALL" && element.current_feature_id == "ALL"); 
				 });
			
		for(var workflowConut = 0; workflowConut < allowedWorkflowArray.length; workflowConut++ )
		{ 
			accessWorkflowArray = $.grep(access_profile.user_functional_access, function (element,index){
				return (element.child_screen_id == allowedWorkflowArray[workflowConut].event_verb)
			})[0];
			if (accessWorkflowArray != undefined && accessWorkflowArray.feature_access == "true"){
				nextWorkflowArray.push (accessWorkflowArray);
			}
		}
		return nextWorkflowArray;
	},
	getNextWorkflowEventVerbs: function (callObject) {
		var allowedWorkflowArray;
			if (mserviceUtilities.variable.WorkflowObject[callObject.transactionType] === undefined ) {
				transactionString = callObject.transactionType +"_ALLOWED_EVENTVERB_LIST" ;
					eventVerbList = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					outputPath : "context/outputparam",
					pageSize : 10,
					inputParameter : {
						p_inputparam_xml : "'<inputparam><lov_code_type>" + transactionString +"</lov_code_type><search_field_1>ALL</search_field_1><search_field_2>ALL</search_field_2><search_field_3>ALL</search_field_3><search_field_4>ALL</search_field_4></inputparam>'"
					},
					screenID : "",
				});
				eventVerbList.read();
				mserviceUtilities.variable.WorkflowObject[callObject.transactionType] = eventVerbList.data();
			};
			allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.event_verb == callObject.eventVerb && element.request_category == callObject.requestCategory && element.request_type == callObject.requestType && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus  && element.current_feature_id == callObject.currentFeatureId); 
			});
			if (allowedWorkflowArray.length == 0)
				allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.event_verb == callObject.eventVerb && element.request_category == callObject.requestCategory && element.request_type == "ALL" && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus  && element.current_feature_id == callObject.currentFeatureId);
				});
			if (allowedWorkflowArray.length == 0)
				allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.event_verb == callObject.eventVerb && element.request_category == callObject.requestCategory && element.request_type == "ALL" && element.from_workflow_stage == 0 && element.from_status == "ALL"  && element.current_feature_id == callObject.currentFeatureId);
				});	
			if (allowedWorkflowArray.length ==0)
				allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.event_verb == callObject.eventVerb && element.request_category == callObject.requestCategory && element.request_type == callObject.requestType && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus  && element.current_feature_id == "ALL");
				});	
			if (allowedWorkflowArray.length == 0)
				allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.event_verb == callObject.eventVerb && element.request_category == callObject.requestCategory && element.request_type == "ALL" && element.from_workflow_stage == callObject.fromStage && element.from_status == callObject.fromStatus  && element.current_feature_id == "ALL");
				});	
			if (allowedWorkflowArray.length ==0)
			     allowedWorkflowArray = $.grep(mserviceUtilities.variable.WorkflowObject[callObject.transactionType], function (element, index) {
					return (element.event_verb == callObject.eventVerb && element.request_category == callObject.requestCategory && element.request_type == "ALL" && element.from_workflow_stage == 0 && element.from_status == "ALL" && element.current_feature_id == "ALL"); 
				 });
			
			return allowedWorkflowArray;
	},
	getFileUploadPath : function (uploadObject) {
		if (mserviceUtilities.variable.userAttachmentsFilePath[uploadObject.transactionType] == undefined) {
			mserviceUtilities.variable.userAttachmentsFilePath[uploadObject.transactionType] = ConvertXMLStringToJSONArray(executeService_retrieve_listof_values_for_searchcondition({
						p_inputparam_xml : "<inputparam><lov_code_type>FILEATTACHPATH</lov_code_type><search_field_1>" + uploadObject.transactionType + "</search_field_1></inputparam>"
					}))[0];
		};
		if (uploadObject.async) {
			return mserviceUtilities.getWebserverpath() + "common/components/File_Upload/file_upload.aspx?companyId=" + login_profile.client_id + "&countryCode=" + login_profile.country_code + "&doc_type=" + mserviceUtilities.variable.userAttachmentsFilePath[uploadObject.transactionType].code + "/" + uploadObject.referenceNumber;
		} else {
			return mserviceUtilities.variable.userAttachmentsFilePath[uploadObject.transactionType].code + "/" + uploadObject.referenceNumber;
		}
	},
	getInputparamXML : function (helperObject) {
		var conditionString,
		matchConditionCounter,
		inputparamFields,
		fieldCounter,
		fieldID,
		tagName,
		inputparamXML;
		conditionString = "";
		inputparamXML = "<inputparam>";
		if ($.isArray(helperObject.matchCondition)) {
			conditionString = "(($(element).attr('id') != undefined) && (";
			for (matchConditionCounter = 0; matchConditionCounter < helperObject.matchCondition.length; matchConditionCounter++) {
				conditionString += "($(element).attr('id').indexOf('" + helperObject.matchCondition[matchConditionCounter] + "') != -1) || ";
			};
			conditionString = conditionString.substring(0, conditionString.length - 4);
			conditionString += "))";
		};
		if (conditionString == "") {
			conditionString = "$(element).attr('id') != undefined";
		};
		inputparamFields = $.grep($("#" + helperObject.contentID).find(webWidgetInitializer.variable.widgetSelector), function (element, index) {
				return eval(conditionString);
			});
		for (fieldCounter = 0; fieldCounter < inputparamFields.length; fieldCounter++) {
			fieldID = $(inputparamFields[fieldCounter]).attr("id");
			tagName = fieldID.substring(helperObject.screenID.length + 1);
			if ($("#" + fieldID).attr("data-widget-type") == "w_datepicker") {
				if ($("#" + fieldID).getVal() != "") {
					inputparamXML += "<" + tagName + ">" + mserviceUtilities.getDateString($("#" + fieldID).getVal(), "yyyy-MM-dd") + "</" + tagName + ">";
				} else {
					inputparamXML += "<" + tagName + ">" + "" + "</" + tagName + ">";
				};
				inputparamXML += "<" + tagName + "_hour>" + "00" + "</" + tagName + "_hour>";
				inputparamXML += "<" + tagName + "_minute>" + "00" + "</" + tagName + "_minute>";
			} else if ($("#" + fieldID).attr("data-widget-type") == "w_datetimepicker") {
				if ($("#" + fieldID).getVal() != "") {
					inputparamXML += "<" + tagName + ">" + mserviceUtilities.getDateString($("#" + fieldID).getVal(), "yyyy-MM-dd") + "</" + tagName + ">";
					inputparamXML += "<" + tagName + "_hour>" + mserviceUtilities.getDateString($("#" + fieldID).getVal(), "HH") + "</" + tagName + "_hour>";
					inputparamXML += "<" + tagName + "_minute>" + mserviceUtilities.getDateString($("#" + fieldID).getVal(), "mm") + "</" + tagName + "_minute>";
				} else {
					inputparamXML += "<" + tagName + ">" + "" + "</" + tagName + ">";
					inputparamXML += "<" + tagName + "_hour>" + "00" + "</" + tagName + "_hour>";
					inputparamXML += "<" + tagName + "_minute>" + "00" + "</" + tagName + "_minute>";
				}
			} else if ($("#" + fieldID).attr("data-widget-type") == "w_multiselect") {
				inputparamXML += "<" + tagName + ">" + getXmlString($("#" + fieldID).getVal().join()) + "</" + tagName + ">";
			} else if ($("#" + fieldID).attr("data-widget-type") == "w_numerictextbox") {
				inputparamXML += "<" + tagName + ">" + $("#" + fieldID).getVal().toString() + "</" + tagName + ">";
			} else {
				inputparamXML += "<" + tagName + ">" + getXmlString($("#" + fieldID).getVal()) + "</" + tagName + ">";
			}
		};
		inputparamXML += "</inputparam>";
		return inputparamXML;
	},
	getInputparamJSON : function (helperObject) {
		var conditionString,
		matchConditionCounter,
		inputparamFields,
		fieldCounter,
		fieldID,
		tagName,
		inputparamJSON;
		conditionString = "";
		inputparamJSON = "{";
		if ($.isArray(helperObject.matchCondition)) {
			conditionString = "(($(element).attr('id') != undefined) && (";
			for (matchConditionCounter = 0; matchConditionCounter < helperObject.matchCondition.length; matchConditionCounter++) {
				conditionString += "($(element).attr('id').indexOf('" + helperObject.matchCondition[matchConditionCounter] + "') != -1) || ";
			};
			conditionString = conditionString.substring(0, conditionString.length - 4);
			conditionString += "))";
		};
		if (conditionString == "") {
			conditionString = "$(element).attr('id') != undefined";
		};
		inputparamFields = $.grep($("#" + helperObject.contentID).find(webWidgetInitializer.variable.widgetSelector), function (element, index) {
				return eval(conditionString);
			});
		for (fieldCounter = 0; fieldCounter < inputparamFields.length; fieldCounter++) {
			fieldID = $(inputparamFields[fieldCounter]).attr("id");
			tagName = fieldID.substring(helperObject.screenID.length + 1);
			if ($("#" + fieldID).attr("data-widget-type") == "w_datepicker") {
				if ($("#" + fieldID).getVal() != "") {
					inputparamJSON += '"' + tagName + '":"' + mserviceUtilities.getDateString($("#" + fieldID).getVal(), "yyyy-MM-dd") + '",'
				} else {
					inputparamJSON += '"' + tagName + '":"' + '' + '",'
				};
				inputparamJSON += '"' + tagName + "_hour" + '":"' + '00' + '",'
				inputparamJSON += '"' + tagName + "_minute" + '":"' + '00' + '",'
			} else if ($("#" + fieldID).attr("data-widget-type") == "w_datetimepicker") {
				if ($("#" + fieldID).getVal() != "") {
					inputparamJSON += '"' + tagName + '":"' + mserviceUtilities.getDateString($("#" + fieldID).getVal(), "yyyy-MM-dd") + '",'
					inputparamJSON += '"' + tagName + "_hour" + '":"' + mserviceUtilities.getDateString($("#" + fieldID).getVal(), "HH") + '",'
					inputparamJSON += '"' + tagName + "_minute" + '":"' + mserviceUtilities.getDateString($("#" + fieldID).getVal(), "mm") + '",'
				} else {
					inputparamJSON += '"' + tagName + '":"' + '' + '",'
					inputparamJSON += '"' + tagName + "_hour" + '":"' + '00' + '",'
					inputparamJSON += '"' + tagName + "_minute" + '":"' + '00' + '",'
				}
			} else if ($("#" + fieldID).attr("data-widget-type") == "w_multiselect") {
				inputparamJSON += '"' + tagName + '":"' + getXmlString($("#" + fieldID).getVal().join()) + '",'
			} else if ($("#" + fieldID).attr("data-widget-type") == "w_numerictextbox") {
				inputparamJSON += '"' + tagName + '":"' + $("#" + fieldID).getVal().toString() + '",'
			} else {
				inputparamJSON += '"' + tagName + '":"' + getXmlString($("#" + fieldID).getVal()) + '",'
			}
		};
		inputparamJSON += "}";
		return inputparamJSON.replace(",}","}");
	},
	resetInputparamXML : function (helperObject) {
		var conditionString,
		matchConditionCounter,
		inputparamFields,
		fieldCounter,
		fieldID;
		conditionString = "";
		if ($.isArray(helperObject.matchCondition)) {
			conditionString = "(($(element).attr('id') != undefined) && (";
			for (matchConditionCounter = 0; matchConditionCounter < helperObject.matchCondition.length; matchConditionCounter++) {
				conditionString += "($(element).attr('id').indexOf('" + helperObject.matchCondition[matchConditionCounter] + "') != -1) || ";
			};
			conditionString = conditionString.substring(0, conditionString.length - 4);
			conditionString += "))";
		};
		if (conditionString == "") {
			conditionString = "$(element).attr('id') != undefined";
		};
		inputparamFields = $.grep($("#" + helperObject.contentID).find(webWidgetInitializer.variable.widgetSelector), function (element, index) {
				return eval(conditionString);
			});
		for (fieldCounter = 0; fieldCounter < inputparamFields.length; fieldCounter++) {
			fieldID = $(inputparamFields[fieldCounter]).attr("id");
			if (($("#" + fieldID).is('[disabled=disabled]') == false) && ($("#" + fieldID + "_group").is(":hidden") == false)) {
				$("#" + fieldID).setVal("");
			}
		};
	},
	resetFilterIndicator : function (helperObject) {
		var conditionString,
		matchConditionCounter,
		inputparamFields,
		fieldCounter,
		fieldID;
		conditionString = "";
		if ($.isArray(helperObject.matchCondition)) {
			conditionString = "(($(element).attr('id') != undefined) && (";
			for (matchConditionCounter = 0; matchConditionCounter < helperObject.matchCondition.length; matchConditionCounter++) {
				conditionString += "($(element).attr('id').indexOf('" + helperObject.matchCondition[matchConditionCounter] + "') != -1) || ";
			};
			conditionString = conditionString.substring(0, conditionString.length - 4);
			conditionString += "))";
		};
		if (conditionString == "") {
			conditionString = "$(element).attr('id') != undefined";
		};
		inputparamFields = $.grep($("#" + helperObject.contentID).find(webWidgetInitializer.variable.widgetSelector), function (element, index) {
				return eval(conditionString);
			});
		for (fieldCounter = 0; fieldCounter < inputparamFields.length; fieldCounter++) {
			fieldID = $(inputparamFields[fieldCounter]).attr("id");
			if (($("#" + fieldID).is('[disabled=disabled]') == false) && ($("#" + fieldID + "_group").is(":hidden") == false)) {
				if($("#" + fieldID).getVal() != ""){
					$("#" + screenID + "_filters_btn .k-i-filter").css("color","orangered");
				}
			}
		};
		var applicableFilters = $.grep(inputparamFields, function(data) {
			return (($("#" + data.id).is('[disabled=disabled]') == false) && ($("#" + data.id + "_group").is(":hidden") == false));
		});
		var emptyFilters = $.grep(inputparamFields, function(data) {
			return (($("#" + data.id).is('[disabled=disabled]') == false) && ($("#" + data.id + "_group").is(":hidden") == false) && $("#" + data.id).getVal() == "");
		});
		var appliedFilters = $.grep(inputparamFields, function(data) {
			return (($("#" + data.id).is('[disabled=disabled]') == false) && ($("#" + data.id + "_group").is(":hidden") == false) && $("#" + data.id).getVal() != "");
		});
		if((applicableFilters.length == emptyFilters.length) && (appliedFilters.length == 0)){
			$("#" + screenID + "_filters_btn .k-i-filter").css("color","black");
		}
	},
	getKeyFieldDataSource : function (keyFieldObject) {
		var keyFieldInputParameter,
		keyFieldParameter;
		keyFieldInputParameter = {
			p_screen_name : "",
			p_validation_field_1 : "",
			p_validation_field_2 : "",
			p_validation_field_3 : "",
			p_validation_field_4 : "",
			p_validation_field_5 : "",
			p_validation_field_6 : "",
			p_validation_field_7 : "",
			p_validation_field_8 : "",
			p_validation_field_9 : "",
			p_validation_field_10 : ""
		};
		for (keyFieldParameter in keyFieldObject) {
			keyFieldInputParameter[keyFieldParameter] = keyFieldObject[keyFieldParameter];
		};
		return mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "validate_key_field",
			inputParameter : keyFieldInputParameter,
			schemaModel : {
				fields : {
					p_screen_name : {
						editable : true
					},
					p_validation_field_1 : {
						editable : true
					},
					p_validation_field_2 : {
						editable : true
					},
					p_validation_field_3 : {
						editable : true
					},
					p_validation_field_4 : {
						editable : true
					},
					p_validation_field_5 : {
						editable : true
					},
					p_validation_field_6 : {
						editable : true
					},
					p_validation_field_7 : {
						editable : true
					},
					p_validation_field_8 : {
						editable : true
					},
					p_validation_field_9 : {
						editable : true
					},
					p_validation_field_10 : {
						editable : true
					}
				}
			},
			processResponse : true
		});
	},
	getTransportDataSource : function (dataSourceObject) {
		var pageSizeValue,
		outputPathValue,
		schemaModelValue,
		noRecordAlertValue,
		parseResponse;
		outputPathValue = "context/outputparam";
		schemaModelValue = false;
		noRecordAlertValue = true;
		if (dataSourceObject.pageSize != undefined) {
			pageSizeValue = dataSourceObject.pageSize;
		};
		if (dataSourceObject.noRecordAlert != undefined) {
			noRecordAlertValue = dataSourceObject.noRecordAlert;
		};
		if (dataSourceObject.outputPath == false) {
			outputPathValue = false;
		} else if (dataSourceObject.outputPath != undefined) {
			outputPathValue = dataSourceObject.outputPath;
		};
		if (dataSourceObject.schemaModel) {
			if (typeof(dataSourceObject.schemaModel) == "object") {
				schemaModelValue = dataSourceObject.schemaModel;
			} else {
				schemaModelValue = mserviceUtilities.getDataSourceSchema(dataSourceObject.screenID, dataSourceObject.dataSourceName);
			}
		};
		return new kendo.data.DataSource({
			pageSize : pageSizeValue,
			transport : {
				read : {
					type : "POST",
					async : false,
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : mserviceUtilities.getTransportUrl(dataSourceObject.applicationName, dataSourceObject.serviceName, outputPathValue, dataSourceObject.api),
					complete : function (data, textstatus) {
						if (dataSourceObject.processResponse) {
							mserviceUtilities.processTransportResponse(data, textstatus, dataSourceObject.api, dataSourceObject.outputPath, noRecordAlertValue);
						}
					}
				},
				parameterMap : function (options, operation) {
					return mserviceUtilities.getTransportParameter({
						inputparam : dataSourceObject.inputParameter
					});
				}
			},
			schema : {
				model : schemaModelValue,
				parse : function (response) {
					if(dataSourceObject.wrongService){
						parseResponse = response.context;
					} else {
						parseResponse = response;
					}
					parseResponse = JSON.parse(JSON.stringify(parseResponse).replace(/\\\\n/g, "\\n"));
					if (dataSourceObject.parse != undefined && typeof(dataSourceObject.parse) == "function") {
						parseResponse = dataSourceObject.parse(parseResponse);
					};
					parseResponse = mserviceUtilities.getDescriptionFields(parseResponse, schemaModelValue);
					return parseResponse;
				}
			}
		});
	},
	getTransportPagingDataSource : function (dataSourceObject) {
		var pageSizeValue,
		outputPathValue,
		schemaModelValue,
		noRecordAlertValue,
		parseResponse,
		index,
		key;
		outputPathValue = "context/outputparam";
		schemaModelValue = false;
		noRecordAlertValue = true;
		if (dataSourceObject.pageSize != undefined) {
			pageSizeValue = dataSourceObject.pageSize;
		};
		if (dataSourceObject.noRecordAlert != undefined) {
			noRecordAlertValue = dataSourceObject.noRecordAlert;
		};
		if (dataSourceObject.outputPath == false) {
			outputPathValue = false;
		} else if (dataSourceObject.outputPath != undefined) {
			outputPathValue = dataSourceObject.outputPath;
		};
		if (dataSourceObject.schemaModel) {
			if (typeof(dataSourceObject.schemaModel) == "object") {
				schemaModelValue = dataSourceObject.schemaModel;
			} else {
				schemaModelValue = mserviceUtilities.getDataSourceSchema(dataSourceObject.screenID, dataSourceObject.dataSourceName);
			}
		};
		return new kendo.data.DataSource({
			pageSize : pageSizeValue,
			transport : {
				read : {
					type : "POST",
					async : false,
					dataType : "json",
					contentType : "application/json; charset=utf-8",
					url : mserviceUtilities.getTransportUrl(dataSourceObject.applicationName, dataSourceObject.serviceName, outputPathValue, dataSourceObject.api),
					complete : function (data, textstatus) {
						if (dataSourceObject.processResponse) {
							mserviceUtilities.processTransportResponse(data, textstatus, dataSourceObject.api, dataSourceObject.outputPath, noRecordAlertValue);
						}
					}
				},
				parameterMap : function (options, operation) {
					return mserviceUtilities.getTransportParameter({
						inputparam : dataSourceObject.inputParameter
					}).replace("</inputparam>", "<skip>" + options.skip + "</skip><take>" + pageSizeValue + "</take></inputparam>");
				}
			},
			schema : {
				total : function (response) {
					if (response.length != 0) {
						return response[0].total;
					} else {
						return 0;
					}
				},
				model : schemaModelValue,
				parse : function (response) {
					parseResponse = [];
					if (dataSourceObject.api) {
						if(dataSourceObject.wrongService){
							response = response.context[dataSourceObject.outputPath];
							response = ((response === null) ? ([]) : (response));
							for (index = 0; index < response.length; index++) {
								for (key in response[index]) {
									parseResponse.push(JSON.parse(WebAPIProxy.MJSONEncode(response[index][key])));
									parseResponse[index].msid = (index + 1);
								}
							}
						} else {
							response = response[dataSourceObject.outputPath];
							response = ((response === null) ? ([]) : (response));
							for (index = 0; index < response.length; index++) {
								for (key in response[index]) {
									parseResponse.push(JSON.parse(WebAPIProxy.MJSONEncode(response[index][key])));
									parseResponse[index].msid = (index + 1);
								}
							}
						}
					} else {
						for (index = 0; index < response.length; index++) {
							parseResponse.push(response[index]);
							parseResponse[index].msid = (index + 1);
						}
					}
					parseResponse = JSON.parse(JSON.stringify(parseResponse).replace(/\\\\n/g, "\\n"));
					if (dataSourceObject.parse != undefined && typeof(dataSourceObject.parse) == "function") {
						parseResponse = dataSourceObject.parse(parseResponse);
					};
					parseResponse = mserviceUtilities.getDescriptionFields(parseResponse, schemaModelValue);
					return parseResponse;
				}
			},
			serverPaging : true,
		});
	},
	getTransportParameter : function (inputParameter) {
		var contextSegment,
		currentInputParameter;
		contextSegment = {
			sessionId : login_profile.guid_val,
			userId : login_profile.user_id,
			client_id : login_profile.client_id,
			locale_id : login_profile.locale_id,
			country_code : login_profile.country_code
		};
		currentInputParameter = JSON.parse(JSON.stringify(inputParameter));
		if (currentInputParameter != undefined) {
			for (var nameValue in currentInputParameter) {
				for (var childNameValue in currentInputParameter[nameValue]) {
					currentInputParameter[nameValue][childNameValue] = mserviceUtilities.getActualValue(currentInputParameter[nameValue][childNameValue]);
				};
				contextSegment[nameValue] = currentInputParameter[nameValue];
			}
		};
		return JSON.stringify({
			context : contextSegment
		});
	},
	getTransportUrl : function (applicationName, serviceName, path, api) {
		var returnUrl;
		if (api) {
			returnUrl = mserviceUtilities.getWebserverpath() + "api/" + applicationName + "/" + serviceName;
		} else {
			if (path) {
				returnUrl = mserviceUtilities.getWebserverpath() + "JSONServiceEndpoint.aspx?appName=" + applicationName + "&serviceName=" + serviceName + "&path=" + path;
			} else {
				returnUrl = mserviceUtilities.getWebserverpath() + "JSONServiceEndpoint.aspx?appName=" + applicationName + "&serviceName=" + serviceName;
			}
		};
		return returnUrl;
	},
	getWebserverpath : function () {
		return login_profile.protocol + "//" + login_profile.domain_name + ":" + login_profile.portno + "/";
	},
	getXMLDocument : function (xmlString) {
		var returnValue;
		xmlString = xmlString.replace(/&/g, "&amp;");
		if (window.ActiveXObject) {
			returnValue = (new ActiveXObject("Microsoft.XMLDOM")).loadXML(xmlString);
		} else {
			returnValue = (new DOMParser()).parseFromString(xmlString, "text/xml");
		};
		return returnValue;
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
		};
		return jsLoadSuccess;
	},
	processTransportResponse : function (data, textstatus, api, outputPath, noRecordAlert) {
		var responseData;
		if (textstatus == "success") {
			responseData = JSON.parse(data.responseText);
			if (api) {
				if (responseData.ApplicationException == null) {
					if ((outputPath != false) && (responseData[outputPath] == null)) {
						alert("No records found.");
					}
				} else {
					alert("Unable to process your request.");
				}				
			} else {
				if (responseData.document != undefined) {
					if (responseData.document.ApplicationException != undefined) {
						if (responseData.document.ApplicationException.errorNumber != "") {
							alert(responseData.document.ApplicationException.errorNumber + " : " + responseData.document.ApplicationException.errorDescription);
						} else {
							alert("Unable to process your request.");
						}
					}
				} else {
					if (responseData.length == 0 && noRecordAlert == true) {
						alert("No records found.");
					}
				}
			}			
		} else if (textstatus == "timeout") {
			alert("Sorry your request is timed out. Please try again.");
		} else {
			alert("Unable to process your request.");
		}
	},
	updateDescriptionDatasource : function (codeType, code, parentCode) {
		var codeTypeObject,
		inputParameter,
		tempDatasource;
		codeTypeObject = $.grep(mserviceUtilities.variable.descriptionDatasource, function (e, i) {
				return e.codeType == codeType;
			})[0];
		if (codeTypeObject == undefined) {
			tempDatasource = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					inputParameter : {
						p_inputparam_xml : "'<inputparam><lov_code>" + codeType + "</lov_code><search_field_1></search_field_1><search_field_2></search_field_2></inputparam>'"
					}
				});
			tempDatasource.read();
			mserviceUtilities.variable.descriptionDatasource.push({
				codeType : codeType,
				dataSet : JSON.parse(JSON.stringify(tempDatasource.data()))
			});
		}
	},
	uploadFile : function (folderName, fileObject) {
		var updateStatus,
		formData,
		xmlhttp,
		targetURL;
		updateStatus = 0;
		formData = new FormData();
		formData.append("file", fileObject);
		targetURL = mserviceUtilities.getWebserverpath() + "common/components/File_Upload/file_upload.aspx?companyId=" + login_profile.client_id + "&countryCode=" + login_profile.country_code + "&doc_type=" + folderName + "&filename=";
		if (window.ActiveXObject) {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} else if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		};
		xmlhttp.addEventListener("load", function (event) {
			updateStatus = 1;
		}, false);
		xmlhttp.addEventListener("error", function (event) {
			updateStatus = 0;
		}, false);
		xmlhttp.open("POST", targetURL, false);
		xmlhttp.send(formData);
		return updateStatus;
	},
	variable : {
		callRegisterWorkflowEventVerbList : "",
		expenseDocWorkflowEventVerbList : "",
		pwclaimDocWorkflowEventVerbList : "",
		quotationDocWorkflowEventVerbList : "",
		customerOrderDocWorkflowEventVerbList : "",
		salesinvoiceDocWorkflowEventVerbList : "",
		invoiceWorkflowEventVerbList : "",
		partsOrderWorkflowEventVerbList : "",
		inventoryAdjustmentWorkflowEventVerbList : "",
		userAttachmentsFilePath : {},
		WorkflowObject : {},
		descriptionDatasource : [{
				codeType : "MONTHLIST",
				dataSet : LoadMonthFilter()
			}, {
				codeType : "WEEKLIST",
				dataSet : LoadWeekOfMonthFilter()
			}, {
				codeType : "PAYMENTMODE",
				dataSet : [{
						code : "CHEQUE",
						description : "Cheque"
					}, {
						code : "TRF",
						description : "Bank Transfer"
					}, {
						code : "CASH",
						description : "Cash"
					}, {
						code : "LC",
						description : "Letter of Credit"
					}
				]
			}, {
				codeType : "COLLECTIONSTATUS",
				dataSet : [{
						code : "C",
						description : "Cleared"
					}, {
						code : "P",
						description : "Pending"
					}, {
						code : "R",
						description : "Bounced"
					}
				]
			}
		]
	},
};
$.fn.extend({
	getInputparamXML : function (helperObject) {
		helperObject.contentID = $(this).attr("id");
		return mserviceUtilities.getInputparamXML(helperObject);
	},
	getInputparamJSON : function (helperObject) {
		helperObject.contentID = $(this).attr("id");
		return mserviceUtilities.getInputparamJSON(helperObject);
	}
});
Object.preventExtensions(mserviceUtilities);

var ruleEngine = {
	applyRuleActions : function (actionString) {
		var actionList,
		actionListCounter,
		currentActionString,
		actionName,
		actionFields,
		actionFieldsCounter,
		dataValidationRules,
		alertMessage,
		readDataSource,
		readDataSourceInput,
		valueString;
		actionList = actionString.trim().split("\n");
		for (actionListCounter = 0; actionListCounter < actionList.length; actionListCounter++) {
			currentActionString = actionList[actionListCounter].trim();
			if (currentActionString != "") {
				if (currentActionString.indexOf("ALERT") == 0) {
					alertMessage = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]"));
					alertMessage = alertMessage.substring(alertMessage.indexOf('"') + 1, alertMessage.lastIndexOf('"'));
					alert(alertMessage);
				} else {
					actionName = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim();
					currentActionString = currentActionString.substring(currentActionString.indexOf("ON"));
					actionFields = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim().split(",");
					for (actionFieldsCounter = 0; actionFieldsCounter < actionFields.length; actionFieldsCounter++) {
						if (actionName == "SetValue") {
							if (currentActionString.indexOf("VALUE") != -1) {
								currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
								valueString = currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim();
								if (valueString.indexOf("CONCAT") == 0) {
									valueString = valueString.substring(valueString.indexOf("(") + 1, valueString.lastIndexOf(")")).split(",");
									if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
										$(actionFields[actionFieldsCounter].trim()).setVal(mserviceUtilities.getConcatenatedValue({
												delimiter : valueString[0].trim(),
												valueList : valueString.splice(1)
											}));
									} else if (actionFields[actionFieldsCounter].trim().indexOf("$") == 0) {
										eval(actionFields[actionFieldsCounter].trim().substring(1) + " = mserviceUtilities.getConcatenatedValue({delimiter : valueString[0].trim(), valueList : valueString.splice(1)})");
									}
								} else if (valueString.indexOf("READ") == 0) {
									valueString = valueString.substring(valueString.indexOf("(") + 1, valueString.lastIndexOf(")"));
									readDataSourceInput = JSON.parse(valueString);
									readDataSource = mserviceUtilities.getTransportDataSource(readDataSourceInput);
									readDataSource.read();
									if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
										$(actionFields[actionFieldsCounter].trim()).setVal(readDataSource.data()[0][readDataSourceInput.outputParameter]);
									} else if (actionFields[actionFieldsCounter].trim().indexOf("$") == 0) {
										if (readDataSourceInput.outputParameter != undefined) {
											eval(actionFields[actionFieldsCounter].trim().substring(1) + " = readDataSource.data()[0][readDataSourceInput.outputParameter]");
										} else {
											eval(actionFields[actionFieldsCounter].trim().substring(1) + " = readDataSource.data()");
										}
									}
								} else {
									if (actionFields[actionFieldsCounter].trim().indexOf("#") == 0) {
										$(actionFields[actionFieldsCounter].trim()).setVal(mserviceUtilities.getActualValue(valueString));
									} else if (actionFields[actionFieldsCounter].trim().indexOf("$") == 0) {
										eval(actionFields[actionFieldsCounter].trim().substring(1) + " = mserviceUtilities.getActualValue(valueString)");
									}
								}
							}
						} else if (actionName == "KeyfieldPattern" || actionName == "OtherfieldPattern" || actionName == "NumberPattern" || actionName == "DatePattern" || actionName == "DateTimePattern") {
							if ($(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule") == undefined) {
								$(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule", actionName);
							} else {
								dataValidationRules = $(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule").split(",");
								if ($.inArray(actionName, dataValidationRules) == -1) {
									dataValidationRules.push(actionName);
									$(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule", dataValidationRules.join());
								}
							}
							if ($(actionFields[actionFieldsCounter].trim()).attr("data-widget-type") == "w_combotextbox") {
								if ($(actionFields[actionFieldsCounter].trim() + "_textentry").attr("data-validation-rule") == undefined) {
									$(actionFields[actionFieldsCounter].trim() + "_textentry").attr("data-validation-rule", actionName);
								} else {
									dataValidationRules = $(actionFields[actionFieldsCounter].trim() + "_textentry").attr("data-validation-rule").split(",");
									if ($.inArray(actionName, dataValidationRules) == -1) {
										dataValidationRules.push(actionName);
										$(actionFields[actionFieldsCounter].trim() + "_textentry").attr("data-validation-rule", dataValidationRules.join());
									}
								}
							}
						}  else if (actionName == "Mandatory") {
							if ($(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule") == undefined) {
								$(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule", actionName);
								if ($(actionFields[actionFieldsCounter].trim() + "_lbl span").length == 0) {
									$(actionFields[actionFieldsCounter].trim() + "_lbl").append("<span class = 'required'>*</span>");
								} else {
									$(actionFields[actionFieldsCounter].trim() + "_lbl span").show();
								}
							} else {
								dataValidationRules = $(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule").split(",");
								if ($.inArray(actionName, dataValidationRules) == -1) {
									dataValidationRules.push(actionName);
									$(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule", dataValidationRules.join());
									if ($(actionFields[actionFieldsCounter].trim() + "_lbl span").length == 0) {
										$(actionFields[actionFieldsCounter].trim() + "_lbl").append("<span class = 'required'>*</span>");
									} else {
										$(actionFields[actionFieldsCounter].trim() + "_lbl span").show();
									}
								}
							}
							if ($(actionFields[actionFieldsCounter].trim()).attr("data-widget-type") == "w_combotextbox") {
								if ($(actionFields[actionFieldsCounter].trim() + "_textentry").attr("data-validation-rule") == undefined) {
									$(actionFields[actionFieldsCounter].trim() + "_textentry").attr("data-validation-rule", actionName);
								} else {
									dataValidationRules = $(actionFields[actionFieldsCounter].trim() + "_textentry").attr("data-validation-rule").split(",");
									if ($.inArray(actionName, dataValidationRules) == -1) {
										dataValidationRules.push(actionName);
										$(actionFields[actionFieldsCounter].trim() + "_textentry").attr("data-validation-rule", dataValidationRules.join());
									}
								}
							}
						} else if (actionName == "Optional") {
							if ($(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule") != undefined) {
								dataValidationRules = $(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule").split(",");
								if ($.inArray("Mandatory", dataValidationRules) != -1) {
									dataValidationRules.splice($.inArray("Mandatory", dataValidationRules), 1);
									if (dataValidationRules.length == 0) {
										$(actionFields[actionFieldsCounter].trim()).removeAttr("data-validation-rule");
										$(actionFields[actionFieldsCounter].trim() + "_lbl span").hide();
									} else {
										$(actionFields[actionFieldsCounter].trim()).attr("data-validation-rule", dataValidationRules.join());
										$(actionFields[actionFieldsCounter].trim() + "_lbl span").hide();
									}
								}
							}
						} else if (actionName == "Hide") {
							if (($(actionFields[actionFieldsCounter].trim()).attr("role") == "tab") || ($(actionFields[actionFieldsCounter].trim()).attr("data-widget-type") == "w_button")) {
								$(actionFields[actionFieldsCounter].trim()).hide();
							} else {
								$(actionFields[actionFieldsCounter].trim() + "_group").hide();
							}
						} else if (actionName == "Show") {
							if (($(actionFields[actionFieldsCounter].trim()).attr("role") == "tab") || ($(actionFields[actionFieldsCounter].trim()).attr("data-widget-type") == "w_button")) {
								$(actionFields[actionFieldsCounter].trim()).show();
							} else {
								$(actionFields[actionFieldsCounter].trim() + "_group").show();
							}
						} else if (actionName == "Enable") {
							$(actionFields[actionFieldsCounter].trim()).enable();
						} else if (actionName == "Disable") {
							$(actionFields[actionFieldsCounter].trim()).disable();
						} else if (actionName == "Click") {
							$(actionFields[actionFieldsCounter].trim()).click();
						} else if (actionName == "SetMinimum") {
							if (currentActionString.indexOf("VALUE") != -1) {
								currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
								$(actionFields[actionFieldsCounter].trim()).setMin(mserviceUtilities.getActualValue(currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim()));
							}
						} else if (actionName == "SetMaximum") {
							if (currentActionString.indexOf("VALUE") != -1) {
								currentActionString = currentActionString.substring(currentActionString.indexOf("VALUE"));
								$(actionFields[actionFieldsCounter].trim()).setMax(mserviceUtilities.getActualValue(currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("]")).trim()));
							}
						} else if (actionName == "Search") {
							if (currentActionString.indexOf("VALUE") != -1) {
								currentActionString = currentActionString.slice(currentActionString.indexOf("VALUE"));
								eval(currentActionString.substring(currentActionString.indexOf("[") + 1, currentActionString.indexOf("];")).trim());
							}
						}
					}
				}
			}
		}
	},
	evaluateConditionString : function (rawConditionString) {
		var conditionString,
		conditionArguments,
		argumentCounter,
		leftSideValue,
		rightSideValue;
		conditionArguments = {};
		argumentCounter = 1;
		rawConditionString = rawConditionString.substring(rawConditionString.indexOf("("), rawConditionString.length).trim();
		conditionString = "";
		while (true) {
			if (rawConditionString != "") {
				if (rawConditionString.charAt(0) == "(" || rawConditionString.charAt(0) == ")") {
					conditionString += rawConditionString.charAt(0);
					rawConditionString = rawConditionString.substring(1).trim();
				} else {
					if (conditionString.charAt(conditionString.length - 1) != ")") {
						leftSideValue = rawConditionString.substring(0, rawConditionString.indexOf(" "));
						conditionArguments["leftArgument" + argumentCounter] = mserviceUtilities.getActualValue(leftSideValue);
						conditionString += "conditionArguments.leftArgument" + argumentCounter;
						rawConditionString = rawConditionString.substring(rawConditionString.indexOf(" ")).trim();
						conditionString += rawConditionString.substring(0, rawConditionString.indexOf(" "));
						rawConditionString = rawConditionString.substring(rawConditionString.indexOf(" ")).trim();
						rightSideValue = rawConditionString.substring(0, rawConditionString.indexOf(")")).trim();
						conditionArguments["rightArgument" + argumentCounter] = mserviceUtilities.getActualValue(rightSideValue);
						conditionString += "conditionArguments.rightArgument" + argumentCounter;
						rawConditionString = rawConditionString.substring(rawConditionString.indexOf(")")).trim();
						argumentCounter++;
					} else {
						conditionString += ruleEngine.getOperatorForCode(rawConditionString.substring(0, rawConditionString.indexOf(" ")));
						rawConditionString = rawConditionString.substring(rawConditionString.indexOf(" ")).trim();
					}
				}
			} else {
				break;
			}
		};
		return eval(conditionString);
	},
	executeConfiguredRules : function (screenID) {
		$("#" + screenID).kendoValidator({
			rules : {
				validationRuleMandatory : function (e) {
					if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("Mandatory") != null) {
						if (e.attr("data-widget-type") == "w_multiselect" || e.attr("data-widget-type") == "m_multiselect") {
							if (e.getVal().length == 0) {
								return false;
							}
						} else if (e.attr("data-widget-type") == "w_attachment") {
							var screenObj = eval(webNavigationController.getCurrentScreenID());
							if (screenObj.variable.custom.attachedFilesList.length == 0) {
								return false;
							}
						} else if (e.attr("data-widget-type") == "w_combotextbox") {
							if (e.getVal().split("-")[0].toString() == "") {
								return false;
							}
						} else if (e.attr("data-widget-subtype") == "textentry") {
							if (e.val().toString() == "") {
								return false;
							}
						} else {
							if (e.getVal().toString() == "") {
								return false;
							}
						}
					};
					return true;
				},
				validationRuleKeyfieldPattern : function (e) {
					if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("KeyfieldPattern") != null) {
						if (e.val() != "") {
							if (!e.val().match(/^[.\w-\/]*$/)) {
								return false;
							}
						}
					};
					return true;
				},
				validationRuleOtherfieldPattern : function (e) {
					if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("OtherfieldPattern") != null) {
						if (e.val() != "") {
							if (!e.val().match(/^[\w\s#-\/\\&\(\):@;.,\[\]]*$/)) {
								return false;
							}
						}
					};
					return true;
				},
				validationRuleNumberPattern : function (e) {
					if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("NumberPattern") != null) {
						if (e.val() != "") {
							if (!e.val().match(/^-?[\d]*$/)) {
								return false;
							}
						}
					};
					return true;
				},
				validationRuleDatePickerPattern : function (e) {
					if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("DatePattern") != null) {
						if (e.val() != "") {
							if (!e.val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)$/)) {
								return false;
							}
						}
					};
					return true;
				},
				validationRuleDateTimePickerPattern : function (e) {
					if (e.attr("data-validation-rule") != undefined && e.attr("data-validation-rule").match("DateTimePattern") != null) {
						if (e.val() != "") {
							if (!e.val().match(/^(0[1-9]|[12]\d|3[0-1])[-](0[1-9]|1[012])[-](19\d\d|20\d\d)[\s]([01]\d|2[0123])[:]([0-5]\d)$/)) {
								return false;
							}
						}
					};
					return true;
				}
			},
			messages : {
				validationRuleMandatory : "Should not be empty",
				validationRuleKeyfieldPattern : "Only a-zA-Z0-9._-/ are allowed",
				validationRuleOtherfieldPattern : "Only a-zA-Z0-9_-\\#/& :@;.,()[] are allowed",
				validationRuleNumberPattern : "This is not a valid Number",
				validationRuleDatePickerPattern : "Date should be in 'dd-mm-yyyy' format",
				validationRuleDateTimePickerPattern : "Date & Time should be in 'dd-mm-yyyy hh:mm' (24 hour) format",
				email : "This is not a valid E-mail id"
			},
		});
		$("#" + screenID).data("kendoValidator")._inputSelector = $("#" + screenID).data("kendoValidator")._inputSelector.replace(",[readonly]", "");
		return $("#" + screenID).data("kendoValidator");
	},
	executeRuleStatements : function (ruleObject) {
		var currentConfig,
		currentObjectConfig,
		currentEventConfig,
		currentFieldConfig,
		ruleArray,
		ruleCounter,
		currentRule,
		alertMessage,
		returnValue = true;
		currentConfig = $.grep(ruleEngine.variable.ruleConfigurations, function (element, index) {
				return element.screenID == ruleObject.screenID;
			})[0];
		if (currentConfig != undefined) {
			currentObjectConfig = $.grep(currentConfig.object, function (element, index) {
					return element.name == ruleObject.objectID;
				})[0];
			if (currentObjectConfig != undefined) {
				currentEventConfig = $.grep(currentObjectConfig.event, function (element, index) {
						return element.name == ruleObject.eventID;
					})[0];
				if (currentEventConfig != undefined) {
					currentFieldConfig = $.grep(currentEventConfig.field, function (element, index) {
							return element.name == ruleObject.fieldID;
						})[0];
					if (currentFieldConfig != undefined) {
						ruleArray = currentFieldConfig.rule;
						for (ruleCounter = 1; ruleCounter <= ruleArray.length; ruleCounter++) {
							currentRule = $.grep(ruleArray, function (element, index) {
									return element.order == ruleCounter.toString();
								})[0];
							if (currentRule != undefined) {
								if (currentRule.ruleStatements.executeService != "") {
									ruleEngine.executeServiceRequest(currentRule.ruleStatements.executeService);
								};
								if (currentRule.ruleStatements.condition == "") {
									if (ruleObject.objectID == "button") {
										returnValue = true;
									} else if (currentRule.ruleStatements.true != "") {
										ruleEngine.applyRuleActions(currentRule.ruleStatements.true);
									}
								} else {
									if (ruleEngine.evaluateConditionString(currentRule.ruleStatements.condition)) {
										if (ruleObject.objectID == "button") {
											if (currentRule.ruleStatements.true.indexOf("CONTINUE") != -1) {
												returnValue = true;
												ruleEngine.applyRuleActions(currentRule.ruleStatements.true.substring(0, currentRule.ruleStatements.true.indexOf("CONTINUE")));
											} else {
												returnValue = false;
												ruleEngine.applyRuleActions(currentRule.ruleStatements.true);
											}
										} else if (currentRule.ruleStatements.true != "") {
											ruleEngine.applyRuleActions(currentRule.ruleStatements.true);
										}
									} else {
										if (ruleObject.objectID == "button") {
											if (currentRule.ruleStatements.false.indexOf("CONTINUE") != -1) {
												returnValue = true;
												ruleEngine.applyRuleActions(currentRule.ruleStatements.false.substring(0, currentRule.ruleStatements.false.indexOf("CONTINUE")));
											} else {
												returnValue = false;
												ruleEngine.applyRuleActions(currentRule.ruleStatements.false);
											}
										} else if (currentRule.ruleStatements.false != "") {
											ruleEngine.applyRuleActions(currentRule.ruleStatements.false);
										}
									}
								}
							}
						}
					}
				}
			}
		};
		return returnValue;
	},
	executeServiceRequest : function (serviceString) {
		var sourceVariable,
		inputXMLDocument,
		inputXMLString,
		childNodesCounter;
		sourceVariable = serviceString.substring((serviceString.indexOf("SET") + 3), serviceString.indexOf("=")).trim().substring(1);
		serviceString = serviceString.substring(serviceString.indexOf("EXECUTE_SERVICE"));
		inputXMLDocument = loadXMLString(serviceString.substring((serviceString.indexOf("[") + 1), serviceString.lastIndexOf("]")).trim());
		inputXMLString = "<inputparam>";
		for (childNodesCounter = 0; childNodesCounter < inputXMLDocument.childNodes[0].childNodes.length; childNodesCounter++) {
			inputXMLString += "<" + inputXMLDocument.childNodes[0].childNodes[childNodesCounter].tagName + ">";
			if (inputXMLDocument.childNodes[0].childNodes[childNodesCounter].childNodes[0] != undefined) {
				inputXMLString += mserviceUtilities.getActualValue(inputXMLDocument.childNodes[0].childNodes[childNodesCounter].childNodes[0].nodeValue);
			};
			inputXMLString += "</" + inputXMLDocument.childNodes[0].childNodes[childNodesCounter].tagName + ">";
		};
		inputXMLString += "</inputparam>";
		eval(sourceVariable + " = ConvertXMLStringToJSONArray(executeService_retrieve_listof_values_for_searchcondition({p_inputparam_xml: inputXMLString}))");
	},
	getOperatorForCode : function (code) {
		var operator = code;
		if (code == "AND") {
			operator = "&&";
		} else if (code == "OR") {
			operator = "||";
		} else if (code == "EQ") {
			operator = "==";
		} else if (code == "NEQ") {
			operator = "!=";
		};
		return operator;
	},
	getRuleConfigurationObject : function (screenID, configString) {
		var currentScreenConfig,
		beginIndex,
		endIndex,
		attributeString,
		grepReturn,
		objectString,
		objectObject,
		eventString,
		eventObject,
		fieldString,
		fieldObject,
		ruleString,
		ruleObject,
		ruleStatementsString,
		ruleStatementsObject;
		currentScreenConfig = {
			screenID : screenID,
			object : []
		};
		while (true) {
			beginIndex = configString.indexOf("OBJECT_BEGIN");
			endIndex = configString.indexOf("OBJECT_END");
			if (endIndex != -1) {
				objectObject = {};
				objectString = configString.substring(beginIndex, endIndex + 10);
				configString = configString.substring(endIndex + 10);
				attributeString = objectString.substring(objectString.indexOf("[") + 1, objectString.indexOf("]"));
				grepReturn = $.grep(attributeString.split(","), function (element, index) {
						return element.indexOf("NAME") != -1;
					});
				if (grepReturn.length != 0) {
					objectObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
				} else {
					objectObject.name = "";
				};
				objectObject.event = [];
				while (true) {
					beginIndex = objectString.indexOf("EVENT_BEGIN");
					endIndex = objectString.indexOf("EVENT_END");
					if (endIndex != -1) {
						eventObject = {};
						eventString = objectString.substring(beginIndex, endIndex + 9);
						objectString = objectString.substring(endIndex + 9);
						attributeString = eventString.substring(eventString.indexOf("[") + 1, eventString.indexOf("]"));
						grepReturn = $.grep(attributeString.split(","), function (element, index) {
								return element.indexOf("NAME") != -1;
							});
						if (grepReturn.length != 0) {
							eventObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
						} else {
							eventObject.name = "";
						};
						eventObject.field = [];
						while (true) {
							beginIndex = eventString.indexOf("FIELD_BEGIN");
							endIndex = eventString.indexOf("FIELD_END");
							if (endIndex != -1) {
								fieldObject = {};
								fieldString = eventString.substring(beginIndex, endIndex + 9);
								eventString = eventString.substring(endIndex + 9);
								attributeString = fieldString.substring(fieldString.indexOf("[") + 1, fieldString.indexOf("]"));
								grepReturn = $.grep(attributeString.split(","), function (element, index) {
										return element.indexOf("NAME") != -1;
									});
								if (grepReturn.length != 0) {
									fieldObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
								} else {
									fieldObject.name = "";
								};
								fieldObject.rule = [];
								while (true) {
									beginIndex = fieldString.indexOf("RULE_BEGIN");
									endIndex = fieldString.indexOf("RULE_END");
									if (endIndex != -1) {
										ruleObject = {};
										ruleString = fieldString.substring(beginIndex, endIndex + 8);
										fieldString = fieldString.substring(endIndex + 8);
										attributeString = ruleString.substring(ruleString.indexOf("[") + 1, ruleString.indexOf("]"));
										grepReturn = $.grep(attributeString.split(","), function (element, index) {
												return element.indexOf("NAME") != -1;
											});
										if (grepReturn.length != 0) {
											ruleObject.name = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
										} else {
											ruleObject.name = "";
										};
										grepReturn = $.grep(attributeString.split(","), function (element, index) {
												return element.indexOf("ORDER") != -1;
											});
										if (grepReturn.length != 0) {
											ruleObject.order = grepReturn[0].substring(grepReturn[0].indexOf('"') + 1, grepReturn[0].lastIndexOf('"'));
										} else {
											ruleObject.order = "";
										};
										ruleStatementsString = ruleString.substring(ruleString.indexOf("]") + 1, ruleString.indexOf("RULE_END")).trim();
										ruleStatementsObject = {
											executeService : "",
											condition : "",
											true : "",
											false : ""
										};
										while (true) {
											if (ruleStatementsString != "") {
												if (ruleStatementsString.indexOf("SET") == 0) {
													ruleStatementsObject.executeService = ruleStatementsString.substring(0, ruleStatementsString.indexOf("\n") + 1).trim();
													ruleStatementsString = ruleStatementsString.substring(ruleStatementsString.indexOf("\n") + 1).trim();
												} else if (ruleStatementsString.indexOf("APPLY") == 0) {
													ruleStatementsObject.true = ruleStatementsString.substring(0, ruleStatementsString.length);
													ruleStatementsString = ruleStatementsString.substring(ruleStatementsString.length + 1).trim();
												} else if (ruleStatementsString.indexOf("IF") == 0) {
													ruleStatementsObject.condition = ruleStatementsString.substring(0, ruleStatementsString.indexOf("\n") + 1).trim();
													ruleStatementsString = ruleStatementsString.substring(ruleStatementsString.indexOf("\n") + 1).trim();
													ruleStatementsObject.true = ruleStatementsString.substring(ruleStatementsString.indexOf("BEGIN") + 5, ruleStatementsString.indexOf("END")).trim();
													ruleStatementsString = ruleStatementsString.substring(ruleStatementsString.indexOf("END") + 3).trim();
													if (ruleStatementsString.indexOf("ELSE") == 0) {
														ruleStatementsObject.false = ruleStatementsString.substring(ruleStatementsString.indexOf("BEGIN") + 5, ruleStatementsString.indexOf("END")).trim();
														ruleStatementsString = ruleStatementsString.substring(ruleStatementsString.indexOf("END") + 3).trim();
													}
												}
											} else {
												break;
											}
										};
										ruleObject.ruleStatements = ruleStatementsObject;
									} else {
										break;
									};
									fieldObject.rule.push(ruleObject);
								}
							} else {
								break;
							};
							eventObject.field.push(fieldObject);
						}
					} else {
						break;
					};
					objectObject.event.push(eventObject);
				}
			} else {
				break;
			};
			currentScreenConfig.object.push(objectObject);
		};
		ruleEngine.variable.ruleConfigurations.push(currentScreenConfig);
	},
	variable : {
		ruleConfigurations : []
	}
};
$.fn.extend({
	applyConfiguredRules : function () {
		var grepReturnValue,
		currentScreenID,
		filePath,
		ruleFileUrl;
		currentScreenID = $(this).attr("id");
		if (currentScreenID != undefined) {
			grepReturnValue = $.grep(ruleEngine.variable.ruleConfigurations, function (element, index) {
					return element.screenID == currentScreenID;
				})[0];
				
				filePath = currentScreenID;
				if (webWidgetInitializer.variable.customMainParam != undefined && filePath.indexOf ("manage_custom_maintenance") != -1 ){
					if (filePath.split("manage_custom_maintenance")[1] != "")
						filePath = webWidgetInitializer.variable.customMainParam + filePath.split("manage_custom_maintenance")[1];
					else 
						filePath = webWidgetInitializer.variable.customMainParam;
				}	
				
			if (grepReturnValue == undefined) {
				if (login_profile.app_mode == "MOBILE_BROWSER" || login_profile.app_mode == "WEB_BROWSER") {
					ruleFileUrl = "../configuration/rule/rule_" + filePath + "_" + login_profile.client_id + "_" + login_profile.country_code + ".txt";
				} else {
					if (login_profile.device == "iPhone") {
						ruleFileUrl = cordova.file.documentsDirectory + cvs.applicationBaseDirectory + "/" + cvs.functionalConfigurationPkgDirectory + "/" + login_profile.client_id + "/" + login_profile.country_code + "/rule/rule_" + currentScreenID + "_" + login_profile.client_id + "_" + login_profile.country_code + ".txt";
					} else {
						ruleFileUrl = "file:///sdcard/" + cvs.applicationBaseDirectory + "/" + cvs.functionalConfigurationPkgDirectory + "/" + login_profile.client_id + "/" + login_profile.country_code + "/rule/rule_" + currentScreenID + "_" + login_profile.client_id + "_" + login_profile.country_code + ".txt";
					}
				};
				$.ajax({
					url : ruleFileUrl,
					async : false,
					cache : false
				}).done(function (data) {
					ruleEngine.getRuleConfigurationObject(currentScreenID, data);
				});
			};
			ruleEngine.executeRuleStatements({
				screenID : currentScreenID,
				objectID : "screen",
				eventID : "load",
				fieldID : currentScreenID
			});
			return ruleEngine.executeConfiguredRules(currentScreenID);
		}
	}
});
Object.preventExtensions(ruleEngine);

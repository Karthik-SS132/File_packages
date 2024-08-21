globalDataSourceArray = [];
globalDataSourceArray.push({
	codeType : "MONTHLIST",
	codeTypeResultSet : LoadMonthFilter(),
	requestServer : false
});
globalDataSourceArray.push({
	codeType : "WEEKLIST",
	codeTypeResultSet : LoadWeekOfMonthFilter(),
	requestServer : false
});
globalDataSourceArray.push({
	codeType : "PAYMENTMODE",
	codeTypeResultSet : [{
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
	],
	requestServer : false
});
globalDataSourceArray.push({
	codeType : "COLLECTIONSTATUS",
	codeTypeResultSet : [{
			code : "C",
			description : "Cleared"
		}, {
			code : "P",
			description : "Pending"
		}, {
			code : "R",
			description : "Bounced"
		}
	],
	requestServer : false
});

function BuildMenu() {
	$("#menu_home").children().remove();
	var innerHTMLString, sortedChildDisplayOrder, childLevelNumberIndex, childDisplayOrderIndex, childSubDisplayIndex, childSubCounter_2, parentDisplayOrderElements, childDisplayOrderElements, level1Counter, level2Counter, level3Counter;			
	parentDisplayOrderElements = 0;
	innerHTMLString = "<ul id = 'menu_content'>";			
	for (var i = 0; i < access_profile.user_functional_access.length; i ++) {
		var sortedParentDisplayOrder = $.grep(access_profile.user_functional_access, function(element, index) {
			return element.parent_display_order == i.toString();
		});
		if (sortedParentDisplayOrder.length != 0) {
			parentDisplayOrderElements += sortedParentDisplayOrder.length;
			if (i == 0) {
				continue;
			}
			childLevelNumberIndex = 1, sortedChildDisplayOrder = [], childDisplayOrderIndex = 1, childDisplayOrderElements = 0;
			while (true) {
				var tempStorage = $.grep(sortedParentDisplayOrder, function(element, index) {
					return element.child_level_no == childLevelNumberIndex.toString();
				});
				childDisplayOrderElements += tempStorage.length;
				if (tempStorage.length != 0) {
					sortedChildDisplayOrder.push(tempStorage);						
				}
				childLevelNumberIndex ++;
				if (childDisplayOrderElements == sortedParentDisplayOrder.length) {
					break;
				}
			}				
			level1Counter = 0;
			innerHTMLString += "<li>" + sortedChildDisplayOrder[0][0].parent_group_display_label + "<ul>";				
			while (true) {
				if (sortedChildDisplayOrder.length == 1) { /* CHILD LEVEL 1 */
					var tempStorage = $.grep(sortedChildDisplayOrder[0], function(element, index) {
						return element.child_display_order == childDisplayOrderIndex.toString();
					});
					level1Counter += tempStorage.length;
					if (tempStorage.length != 0) {							
						if (tempStorage[0].feature_access == "true") {
							innerHTMLString += "<li data-screenid = '" + tempStorage[0].child_screen_id + "'>" + tempStorage[0].child_feature_display_label + "</li>";
						}							
					}
					childDisplayOrderIndex ++;
					if (level1Counter == sortedChildDisplayOrder[0].length) {
						break;
					}
				}
				else if (sortedChildDisplayOrder.length == 2) { /* CHILD LEVEL 2 */
					var tempStorage = $.grep(sortedChildDisplayOrder[0], function(element, index) {
						return element.child_display_order == childDisplayOrderIndex.toString();
					});
					level1Counter += tempStorage.length;
					if (tempStorage.length != 0) {
						if (tempStorage[0].child_feature_id_or_group_ind == "F") {
							if (tempStorage[0].feature_access == "true") {
								innerHTMLString += "<li data-screenid = '" + tempStorage[0].child_screen_id + "'>" + tempStorage[0].child_feature_display_label + "</li>";
							}
						}
						else if (tempStorage[0].child_feature_id_or_group_ind == "G") {
							childSubDisplayIndex = 1, level2Counter = 0;
							innerHTMLString += "<li>" + tempStorage[0].child_feature_display_label + "<ul>";								
							while (true) {
								var tempSubStorage = $.grep(sortedChildDisplayOrder[1], function(element, index) {
									return element.child_display_order == childSubDisplayIndex.toString();
								});
								level2Counter += tempSubStorage.length;
								if (tempSubStorage.length != 0) {
									if (tempStorage[0].child_feature_id_or_group == tempSubStorage[0].parent_feature_group) {
										if (tempSubStorage[0].feature_access == "true") {
											innerHTMLString += "<li data-screenid = '" + tempSubStorage[0].child_screen_id + "'>" + tempSubStorage[0].child_feature_display_label + "</li>";
										}
									}
								}
								childSubDisplayIndex ++;
								if (level2Counter == sortedChildDisplayOrder[1].length) {
									break;
								}
							}
							innerHTMLString += "</ul></li>";
						}
					}
					childDisplayOrderIndex ++;
					if (level1Counter == sortedChildDisplayOrder[0].length) {
						break;
					}
				}
				else if (sortedChildDisplayOrder.length == 3) { /* CHILD LEVEL 3 */
					var tempStorage = $.grep(sortedChildDisplayOrder[0], function(element, index) {
						return element.child_display_order == childDisplayOrderIndex.toString();
					});
					level1Counter += tempStorage.length;
					if (tempStorage.length != 0) {
						if (tempStorage[0].child_feature_id_or_group_ind == "F") {
							if (tempStorage[0].feature_access == "true") {
								innerHTMLString += "<li data-screenid = '" + tempStorage[0].child_screen_id + "'>" + tempStorage[0].child_feature_display_label + "</li>";
							}
						}
						else if (tempStorage[0].child_feature_id_or_group_ind == "G") {
							childSubDisplayIndex = 1, level2Counter = 0;
							innerHTMLString += "<li>" + tempStorage[0].child_feature_display_label + "<ul>";								
							while (true) {
								var tempSubStorage = $.grep(sortedChildDisplayOrder[1], function(element, index) {
									return element.child_display_order == childSubDisplayIndex.toString();
								});
								level2Counter += tempSubStorage.length;
								if (tempSubStorage.length != 0) {
									if (tempSubStorage[0].child_feature_id_or_group_ind == "F") {
										if (tempStorage[0].child_feature_id_or_group == tempSubStorage[0].parent_feature_group) {
											if (tempSubStorage[0].feature_access == "true") {
												innerHTMLString += "<li data-screenid = '" + tempSubStorage[0].child_screen_id + "'>" + tempSubStorage[0].child_feature_display_label + "</li>";
											}
										}
									}
									else if (tempSubStorage[0].child_feature_id_or_group_ind == "G") {
										childSubDisplayIndex_2 = 1, level3Counter = 0;
										innerHTMLString += "<li>" + tempSubStorage[0].child_feature_display_label + "<ul>";								
										while (true) {
											var tempSubStorage_2 = $.grep(sortedChildDisplayOrder[2], function(element, index) {
												return element.child_display_order == childSubDisplayIndex_2.toString();
											});
											level3Counter += tempSubStorage_2.length;
											if (tempSubStorage_2.length != 0) {
												if (tempSubStorage[0].child_feature_id_or_group == tempSubStorage_2[0].parent_feature_group) {
													if (tempSubStorage[0].feature_access == "true") {
														innerHTMLString += "<li data-screenid = '" + tempSubStorage_2[0].child_screen_id + "'>" + tempSubStorage_2[0].child_feature_display_label + "</li>";
													}
												}
											}
											childSubDisplayIndex_2 ++;
											if (level3Counter == sortedChildDisplayOrder[2].length) {
												break;
											}
										}
										innerHTMLString += "</ul></li>";
									}
								}
								childSubDisplayIndex ++;
								if (level2Counter == sortedChildDisplayOrder[1].length) {
									break;
								}
							}
							innerHTMLString += "</ul></li>";
						}
					}
					childDisplayOrderIndex ++;
					if (level1Counter == sortedChildDisplayOrder[0].length) {
						break;
					}
				}
			}
			innerHTMLString += "</ul></li>";
			if (parentDisplayOrderElements == access_profile.user_functional_access.length) {
				break;
			}
		}
	}
	innerHTMLString += "</ul>";
	$("#menu_home").append(innerHTMLString);
	
	for (var i = 0; i < $("#menu_content li ul li ul li ul").length; i++) {
		if ($($("#menu_content li ul li ul li ul")[i]).children().length == 0) {
			$($("#menu_content li ul li ul li ul")[i]).parent().attr("class", "menu_content_delete");
		}
	}
	$("#menu_content .menu_content_delete").remove();
	for (var i = 0; i < $("#menu_content li ul li ul").length; i++) {
		if ($($("#menu_content li ul li ul")[i]).children().length == 0) {
			$($("#menu_content li ul li ul")[i]).parent().attr("class", "menu_content_delete");
		}
	}
	$("#menu_content .menu_content_delete").remove();
	for (var i = 0; i < $("#menu_content li ul").length; i++) {
		if ($($("#menu_content li ul")[i]).children().length == 0) {
			$($("#menu_content li ul")[i]).parent().attr("class", "menu_content_delete");
		}
	}
	$("#menu_content .menu_content_delete").remove();
}

function ConfigureMenuLabels() {
	var menuNode, menuItemListHTML, screenIDNode;
	menuNode = xmlDocLBL.getElementsByTagName("menu");
	menuItemListHTML = $("#menu_content li");
	for (var menuItemListCount = 0; menuItemListCount < menuItemListHTML.length; menuItemListCount++) {
		if ($(menuItemListHTML[menuItemListCount]).data("screenid") != undefined) {
			screenIDNode = menuNode[0].getElementsByTagName($(menuItemListHTML[menuItemListCount]).data("screenid"));
			if (screenIDNode.length != 0) {
				$(menuItemListHTML[menuItemListCount]).text(screenIDNode[0].childNodes[0].nodeValue);
			}
		}
	}
}

function LoadJSScripts(jsScripts) {
	var jsLoadSuccess = true;			
	for (var jsScriptNo = 0; jsScriptNo < jsScripts.length; jsScriptNo ++) {
		$.cachedScript(login_profile.protocol + '//' + window.location.host + '/' + jsScripts[jsScriptNo]).fail(function(jqxhr, settings, exception) {
			jsLoadSuccess = false;
		});
		if (!jsLoadSuccess) {
			break;
		}
	}
	return jsLoadSuccess;
}

function NavigateForward(navigationObject) {
	if (LoadJSScripts(["webui/scripts/js/fn_" + navigationObject.screenID + ".js"])) {
		var navigationMapLastChild = $.grep(navigation_map, function(element, index) {
			return index == navigation_map.length - 1;
		});
		if (navigationObject.destination == "container") {
			if (navigationObject.menuClickIndicator == true) {
				$('#container').load(navigationObject.screenID + '.html', function() {
					UpdateNavigationMap(navigationObject);
					BuildBreadCrumb();
					ExecuteScreenFunction(navigationObject);
				});
			}
			else {
				$.get(navigationObject.screenID + '.html', function(data) {
					$("#" + navigationMapLastChild[0].screenID).hide();
					$("#container").append(data);
					UpdateNavigationMap(navigationObject);
					BuildBreadCrumb();
					ExecuteScreenFunction(navigationObject);
				});
			}
		}
		else if (navigationObject.destination == "window") {
			InitializeKendoWindow({
				fieldID: navigationMapLastChild[0].screenID + "_child_window",
				screenID: navigationObject.screenID,
				windowWidth: navigationObject.windowWidth,
				windowHeight: navigationObject.windowHeight,
				windowTitle: navigationObject.windowTitle
			});
			UpdateNavigationMap(navigationObject);
		}
	}
	else {
		alert('E_LO_1002: Unable to load required files. Please contact your support desk.');
		return false;
	}
}

function NavigateBackward(navigationObject) {
	var navigationMapLastChild = navigation_map.pop();
	BuildBreadCrumb();
	if ($("#openkendowindow").length == 0) {
		$("#" + navigationMapLastChild.screenID).remove();
		$("#" + navigationMapLastChild.parentScreenID).show();
	}
	else {
		$("#openkendowindow").data("kendoWindow").close();				
	}

	/* REFRESHING PARENT SCREEN */
	if (navigationObject.buttonType == "submit") {
		eval ("fn_" + navigationMapLastChild.parentScreenID + "_refresh()");
	}
}

function ManagingSubFeatureAccess(screenId) {
	var featureButtonName, featureName, featureAccessProfile;	
	for (var i = 0; i < $("#" + screenId + " button").length; i ++) {
		featureButtonName = $("#" + screenId + " button")[i].id.substring(screenId.length + 1);
		featureName = featureButtonName.substring(0, featureButtonName.lastIndexOf('_'));
		featureAccessProfile = $.grep(access_profile.user_functional_access, function(element, index) {
			return element.child_screen_id == featureName;
		});
		if (featureAccessProfile.length != 0) {
			if (featureAccessProfile[0].feature_access == "false" && featureAccessProfile[0].menu_display_ind == "false") {
				$("#" + $("#" + screenId + " button")[i].id).hide();
			}
		}
	}
}

function ManagingFeatureAccess(screenId) {
	var featureAccessProfile;
	featureAccessProfile = $.grep(access_profile.user_functional_access, function(element, index) {
		return element.child_screen_id == screenId;
	});
	if (featureAccessProfile.length != 0) {
		if (featureAccessProfile[0].add_access == "false") {
			$("#" + screenId + "_add_btn").hide();
		}
		if (featureAccessProfile[0].edit_access == "false") {
			$("#" + screenId + "_edit_btn").hide();
		}
		if (featureAccessProfile[0].view_access == "false") {
			$("#" + screenId + "_view_btn").hide();
		}
		if (featureAccessProfile[0].delete_access == "false") {
			$("#" + screenId + "_delete_btn").hide();
		}
	}
}

function BuildBreadCrumb() {
	var buildBreadCrumb = '';	
	for (var i = 0 ; i < navigation_map.length; i ++) {
		if (i > 0) {
			buildBreadCrumb += ' > ';
		}
		buildBreadCrumb += '<label id = "' + navigation_map[i].screenID + '_bc">' + navigation_map[i].displayLabel + '</label>';
	}
	$('#breadcrumb .left').html(buildBreadCrumb);
}

function UpdateNavigationMap(navigationObject) {
	if (navigationObject.menuClickIndicator == true) {
		navigation_map = [];
		navigation_map.push({screenID: 'home_container', parentScreenID: 'home', displayLabel: 'Home'});
		navigation_map.push({
			screenID: navigationObject.screenID,
			parentScreenID: "home_container",
			displayLabel: navigationObject.displayLabel
		});
	}
	else {
		var navigationMapLastChild = $.grep(navigation_map, function(element, index) {
			return index == navigation_map.length - 1;
		});
		navigation_map.push({
			screenID: navigationObject.screenID,
			parentScreenID: navigationMapLastChild[0].screenID,
			displayLabel: navigationObject.displayLabel
		});
	}
}

function ExecuteScreenFunction(navigationObject) {
	try {
		if (eval('fn_' + navigationObject.screenID + '_loadScripts()')) { //This Condition Block Should be removed in future
			eval('fn_' + navigationObject.screenID + '()');
			//ManagingSubFeatureAccess();
			//AttachValidator(navigationObject.screenID);
		}
		else {
			alert('E_LO_1002: Unable to load required files. Please contact your support desk.');
			return false;
		}
	}
	catch (e) {
		console.log("/***  " + e.toString() + " STACK TRACE: " + e.stack + "  ***/");
		alert('E_LO_1003: Unable to load required files. Please contact your support desk.');
		return false;
	}
}

function DelegateForButtonClickInContainer() {
	var buttonType, buttonID;
	var buttonID = $(this).attr("id");
	if (buttonID.indexOf("cancel_btn") == -1 && buttonID.indexOf("submit_btn") == -1) {
		eval(buttonID + "_click()");
	}
	else {
		if (buttonID.indexOf("cancel_btn") != -1) {
			buttonType = "cancel";
		}
		else if (buttonID.indexOf("submit_btn") != -1) {
			buttonType = "submit";
		}
		NavigateBackward({
			origin: "container",
			buttonType: buttonType,
			buttonID: buttonID
		});
	}
}

function DelegateForButtonClickInWindow() {
	var buttonType, buttonID;
	var buttonID = $(this).attr("id");
	if (buttonID.indexOf("cancel_btn") == -1 && buttonID.indexOf("submit_btn") == -1) {
		eval(buttonID + "_click()");
	}
	else {
		if (buttonID.indexOf("cancel_btn") != -1) {
			buttonType = "cancel";
		}
		else if (buttonID.indexOf("submit_btn") != -1) {
			buttonType = "submit";
		}
		NavigateBackward({
			origin: "window",
			buttonType: buttonType,
			buttonID: buttonID
		});
	}
}

function DelegateForInputChangeInContainer() {
	isDataModified = true;
}

function DelegateForInputChangeInWindow() {
	isDataModified = true;
}

function SetLoginTitle(applicationName,clientID, countryCode) {
  $(document).attr('title',applicationName+' - '+clientID);
}
function SetLoginHeader(applicationName,clientID, countryCode) {
	var loginCompanyLogoImg = new Image();
	if (countryCode != "") {
		$('#page_title img').attr('src','common/images'+'/'+clientID+'/'+countryCode+'/'+'login_company_logo.png');
		$('#login_leftpanel img').attr('src','common/images'+'/'+clientID+'/'+countryCode+'/'+'login.jpg');
		loginCompanyLogoImg.src = '/common/images'+'/'+clientID+'/'+countryCode+'/'+'login_company_logo.png';
	}
	else {
		$('#page_title img').attr('src','common/images'+'/'+clientID+'/'+'login_company_logo.png');
		$('#login_leftpanel img').attr('src','common/images'+'/'+clientID+'/'+'login.jpg');	
		loginCompanyLogoImg.src = '/common/images'+'/'+clientID+'/'+'login_company_logo.png';
	}
	loginCompanyLogoImg.onload = function() {
		var loginCompanyLogoCanvas = document.createElement("canvas");
		loginCompanyLogoCanvas.width =140;
		loginCompanyLogoCanvas.height=80;
		var ctx = loginCompanyLogoCanvas.getContext("2d");
		var hRatio = loginCompanyLogoCanvas.width  / loginCompanyLogoImg.width    ;
		var vRatio =  loginCompanyLogoCanvas.height / loginCompanyLogoImg.height  ;
		var ratio  = Math.min( hRatio, vRatio );
		var centerShift_x = ( loginCompanyLogoCanvas.width - loginCompanyLogoImg.width * ratio ) / 2;
		var centerShift_y = ( loginCompanyLogoCanvas.height - loginCompanyLogoImg.height * ratio ) / 2;  
		ctx.clearRect(0,0,loginCompanyLogoCanvas.width, loginCompanyLogoCanvas.height);
		ctx.drawImage(loginCompanyLogoImg, 0, 0, loginCompanyLogoImg.width, loginCompanyLogoImg.height, centerShift_x, centerShift_y, loginCompanyLogoImg.width * ratio, loginCompanyLogoImg.height * ratio); 
		var dataurl = loginCompanyLogoCanvas.toDataURL();
		$('#page_title img').attr('src',dataurl);
	};
}

function SetLoginFooter(applicationName,clientID, countryCode) {
	$('#login_footer').html('<p>&copy; Selfservit, All Rights Reserved</p><span style="float:right;"><img src="common/images/icon_20.png" style="vertical-align: middle;">'+applicationName+'</span>');
}

function SetHomeTitle(applicationName,clientID, countryCode) {
	$(document).attr('title',applicationName+' - '+clientID);
}

function SetHomeHeader(applicationName,clientID, countryCode) {
	var header_html_snippet;	
	$('#home_logo img').attr('src','../../common/images/'+clientID+'/'+countryCode+'/company_logo.png');	
	if (login_profile.last_login_date != "") {
		header_html_snippet = '<p class="right1"><label class="lbl" id="welcome">Welcome </label>#=title# #= first_name # ['+login_profile.client_id+' @ '+login_profile.location_code+'] | <a id="change_password" style="cursor:pointer" >Change Password</a> |  <span> <a id="head_logout" style="cursor:pointer">Logout</a> </span> </p>	';
		header_html_snippet += '<br/><p class="right1"><label class="lbl" id="last_visit">Last Visited</label> : #= kendo.toString(new Date(parseInt(login_profile.last_login_date.substr(0,4)), parseInt(login_profile.last_login_date.substr(5,2)) - 1,parseInt(login_profile.last_login_date.substr(8,2)), parseInt(login_profile.last_login_hour), parseInt(login_profile.last_login_minute)),cultureInfo.calendar.patterns.g) # | [ <span><img id="head_notification" src="../images/Android_notifications_24.png"></img><span class="notification_count_bubble"></span> </span> ]  | <a id="training" style="cursor:pointer; color: blue;text-decoration: underline;" >Training</a></p><div id="notification_child"/>';
	}
	else {
		header_html_snippet = '<p class="right1"><label class="lbl" id="welcome">Welcome </label>#=title# #= first_name # ['+login_profile.client_id+' @ '+login_profile.location_code+'] | <a  style="cursor:pointer" id="change_password" >Change Password</a> |  <span> <a id="head_logout" style="cursor:pointer">Logout</a> </span> </p>	';
		header_html_snippet += '<br/><p class="right1">[<span><img id="head_notification" src="../images/Android_notifications_24.png"></img><span class="notification_count_bubble"></span> </span> ] | <a id="training" style="cursor:pointer; color: blue;text-decoration: underline;" >Training</a> </p><div id="notification_child"/>';
	}
	var header_template = kendo.template(header_html_snippet);
	$('#home_toprightnav').html(header_template(login_profile));
}

function SetHomeFooter(applicationName,clientID, countryCode) {
	$("#home_footer").html('<div class="inside"><p class="left">&copy; Selfservit, All Rights Reserved</p><span style="float:right;"><img src="/common/images/'+clientID+'/'+countryCode+'/'+'company_logo.png" style="height:12px;width:12px">&nbsp;'+applicationName+'</span></div>');
}

function ConvertXMLStringToJSONArray(xmlString) {
	function StringToXML(oString) {
		oString = oString.replace(/&/g, "&amp;");
		if (window.ActiveXObject) {
			var oXML = new ActiveXObject("Microsoft.XMLDOM"); oXML.loadXML(oString);
			return oXML;
		}
		else {
			return (new DOMParser()).parseFromString(oString, "text/xml");
		}
	}
	
	/* VARIABLE DECLARATIONS */
	var xmlDoc = StringToXML(xmlString), returnArray = [], resultSetNodes, jsonString, nodeName, nodeValue;
	resultSetNodes = xmlDoc.getElementsByTagName("result_set");	
	for (var i = 0; i < resultSetNodes.length; i++) {
		jsonString = "{";
		for (var j = 0; j < resultSetNodes[i].childNodes.length; j++) {
			/* GETTING NODE NAME AND NODE VALUE FROM XML */
			nodeName = resultSetNodes[i].childNodes[j].tagName;
			if (resultSetNodes[i].childNodes[j].childNodes[0] != undefined) {
				nodeValue = resultSetNodes[i].childNodes[j].childNodes[0].nodeValue;
			}
			else {
				nodeValue = "";
			}
			
			/* FORMING JSON STRING */
			if (j < resultSetNodes[i].childNodes.length - 1) {
				jsonString += "\"" + nodeName + "\":\"" + nodeValue + "\",";
			}
			else {
				jsonString += "\"" + nodeName + "\":\"" + nodeValue + "\"";
			}
		}
		jsonString += "}";				
		returnArray.push(JSON.parse(jsonString.replace(/\n/, "\\n")));
	}	
	return returnArray;
}

function GetCodeDescriptionValue (codeType, codeValue, parentCodeValue) {
	var codeTypeObject, codeTypeResultObject, newCodeTypeObject, newCodeTypeResultObject;
	/* FILTER THE REQUESTED CODE TYPE OBJECT FROM GLOBAL DATA SOURCE ARRAY */
	codeTypeObject = $.grep(globalDataSourceArray, function(element, index) {
		return element.codeType == codeType;
	});
	
	if (codeTypeObject.length > 0) {
		/* FILTER THE REQUESTED CODE TYPE RESULT OBJECT FROM CODE TYPE OBJECT */
		if (parentCodeValue == "") {
			codeTypeResultObject = $.grep(codeTypeObject[0].codeTypeResultSet, function(element, index) {
				return element.code == codeValue;
			});
		}
		else {
			codeTypeResultObject = $.grep(codeTypeObject[0].codeTypeResultSet, function(element, index) {
				return element.code == codeValue && element.parent_code == parentCodeValue;
			});
		}
		
		if (codeTypeResultObject.length > 0) {
			return codeTypeResultObject[0].description;
		}
		else {
			UpdateGlobalDataSourceArray(codeType, codeValue, parentCodeValue);
			newCodeTypeObject = $.grep(globalDataSourceArray, function(element, index) {
				return element.codeType == codeType;
			});
			
			if (parentCodeValue == "") {
				newCodeTypeResultObject = $.grep(newCodeTypeObject[0].codeTypeResultSet, function(element, index) {					
					return element.code == codeValue;
				});
			}
			else {
				newCodeTypeResultObject = $.grep(newCodeTypeObject[0].codeTypeResultSet, function(element, index) {					
					return element.code == codeValue && element.parent_code == parentCodeValue;
				});
			}
			if (newCodeTypeResultObject.length == 1) {
				return newCodeTypeResultObject[0].description;
			}
			else {
				return codeValue;
			}
		}		
	}
	else {
		UpdateGlobalDataSourceArray(codeType, codeValue, parentCodeValue);
		newCodeTypeObject = $.grep(globalDataSourceArray, function(element, index) {
			return element.codeType == codeType;
		});
		if (parentCodeValue == "") {
			newCodeTypeResultObject = $.grep(newCodeTypeObject[0].codeTypeResultSet, function(element, index) {					
				return element.code == codeValue;
			});
		}
		else {
			newCodeTypeResultObject = $.grep(newCodeTypeObject[0].codeTypeResultSet, function(element, index) {					
				return element.code == codeValue && element.parent_code == parentCodeValue;
			});
		}
		if (newCodeTypeResultObject.length == 1) {
			return newCodeTypeResultObject[0].description;
		}
		else {
			return codeValue;
		}
	}
}

function UpdateGlobalDataSourceArray(codeType, codeValue, parentCodeValue) {
	var codeTypeObject, codeTypeResultXml, convertedObject;
	codeTypeObject = $.grep(globalDataSourceArray, function(element, index) {
		return element.codeType == codeType;
	});
	
	if (codeTypeObject.length == 0) {
		codeTypeResultXml = executeService_retrieve_listof_values_for_searchcondition({p_inputparam_xml: "<inputparam><lov_code>" + codeType + "</lov_code><search_field_1></search_field_1><search_field_2></search_field_2></inputparam>"});
		convertedObject = ConvertXMLStringToJSONArray(codeTypeResultXml);
		globalDataSourceArray.push({codeType: codeType, codeTypeResultSet: convertedObject, requestServer: true});
	}
	else {
		if (codeTypeObject[0].requestServer == true) {
			codeTypeResultXml = executeService_retrieve_listof_values_for_searchcondition({p_inputparam_xml: "<inputparam><lov_code>" + codeType + "</lov_code><search_field_1>" + codeValue + "</search_field_1><search_field_2>" + parentCodeValue + "</search_field_2></inputparam>"});
			convertedObject = ConvertXMLStringToJSONArray(codeTypeResultXml);
			if (convertedObject.length != 0) {
				codeTypeObject[0].codeTypeResultSet.push(convertedObject[0]);
			}
		}
	}
}

function GetDescriptionFieldsForDataSource(response, dataSource) {
	var codeTypeArray = [], codeFieldArray = [], descriptionFieldArray = [], parentCodeFieldArray = [], descriptionValue = "", descriptionElement = "", descriptionElementNodeValue = "";
	
	for (var i in dataSource.options.schema.model.fields) {
		if (dataSource.options.schema.model.fields[i].codeType != undefined) {
			codeTypeArray.push(dataSource.options.schema.model.fields[i].codeType);
			codeFieldArray.push(dataSource.options.schema.model.fields[i].codeField);
			descriptionFieldArray.push(i);
			if (dataSource.options.schema.model.fields[i].parentCodeField != undefined) {
				parentCodeFieldArray.push(dataSource.options.schema.model.fields[i].parentCodeField);
			}
			else {
				parentCodeFieldArray.push("");
			}
		}
	}
	
	if (dataSource.options.schema.type == "xml") {
		for (var i = 0; i < response.childNodes[0].childElementCount; i ++) {
			for (var j = 0; j < codeTypeArray.length; j ++) {
				if (response.childNodes[0].childNodes[i].getElementsByTagName(codeFieldArray[j])[0].hasChildNodes()) {
					if (response.childNodes[0].childNodes[i].getElementsByTagName(codeFieldArray[j])[0].childNodes[0].nodeValue != "" && response.childNodes[0].childNodes[i].getElementsByTagName(codeFieldArray[j])[0].childNodes[0].nodeValue != undefined) {
						if (parentCodeFieldArray[j] == "") {
							descriptionValue = GetCodeDescriptionValue (codeTypeArray[j], response.childNodes[0].childNodes[i].getElementsByTagName(codeFieldArray[j])[0].childNodes[0].nodeValue, "");
						}
						else {
							descriptionValue = GetCodeDescriptionValue (codeTypeArray[j], response.childNodes[0].childNodes[i].getElementsByTagName(codeFieldArray[j])[0].childNodes[0].nodeValue, response.childNodes[0].childNodes[i].getElementsByTagName(parentCodeFieldArray[j])[0].childNodes[0].nodeValue);
						}						
						descriptionElement = response.createElement(descriptionFieldArray[j]);
						descriptionElementNodeValue = response.createTextNode(descriptionValue);
						descriptionElement.appendChild(descriptionElementNodeValue);
						response.childNodes[0].childNodes[i].appendChild(descriptionElement);					
					}
				}
			}
		}
		return response;
	}
	else {
		for (var i = 0; i < response.length; i ++) {
			for (var j = 0; j < codeTypeArray.length; j ++) {
				if (response[i][codeFieldArray[j]] != "" && response[i][codeFieldArray[j]] != undefined) {
					if (parentCodeFieldArray[j] == "") {
						response[i][descriptionFieldArray[j]] = GetCodeDescriptionValue (codeTypeArray[j], response[i][codeFieldArray[j]], "");
					}
					else {
						response[i][descriptionFieldArray[j]] = GetCodeDescriptionValue (codeTypeArray[j], response[i][codeFieldArray[j]], response[i][parentCodeFieldArray[j]]);
					}
				}
			}	
		}
		return response;
	}	
}
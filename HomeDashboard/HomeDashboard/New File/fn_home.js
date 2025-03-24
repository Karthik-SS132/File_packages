var home = {
	constructScreen : function () {
		home.readSessionStorage();
		home.setEmployeeProfileInfo();
		home.setCompanyFeatureInfo();
		home.validateSession();
		home.loadHomeContainer();
		home.initializeVariables();
		home.loadConfigurationFiles();
		home.updateHeaderFooter();
		home.validateFeatureAccess();
		home.attachEventHandlers();
		if(login_profile.dealer_org_level_code != ""){
			home.homeNotification();
		};
		window.history.pushState(null, "", window.location.href); 
		home.variable.windowHistoryCount =  window.history.length;		
		window.onpopstate = function() {
			if(home.variable.windowHistoryCount == window.history.length){
				window.history.pushState(null, "", window.location.href);
				window.history.pushState(null, "", window.location.href); 
			} else {
				window.history.pushState(null, "", window.location.href);
				userSessionLogout();
			};
		};
	},
	homeNotification : function() {
		$.ajax({
			url : mserviceUtilities.getWebserverpath() + login_profile.client_id + "_" + login_profile.country_code +"_home_notification.txt",
			async : false,
			dataType : "text",
			cache : true,
		}).done(function (data) {
			if(data != "") {
				var notification = $("#notification").kendoNotification({
					 position: {
						bottom: 10,
						right: 0
					},
					templates: [{
						type: "upload-success",
						template: $("#successTemplate").html()
					}],
					animation: {
						open: {
							effects: "slideIn:left"
						},
						close: {
							effects: "slideIn:left",
							reverse: true
						}
					},
					button: true,
					hideOnClick: true,
					autoHideAfter: 0
				}).data("kendoNotification");
				notification.show({
					message: data
				}, "upload-success");
			}					
		}).fail(function() { 
			console.log("No Notification Available");
		});
	},
	initializeVariables : function () {
		isDataModified = false;
		isScreenEditable = false;
		screenName = "";
		sessionTimer = 0;
		kendo.culture("en-GB");
		cultureInfo = kendo.culture();
		codeValueList = new Object();
		current_date = getCurrentDate();
	},
	changePassword : function () {
		if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_change_password.js", "../../s_iscripts/change_password.js"])) {
			$.ajax({
				url : "manage_change_password.html",
				async : false,
				dataType : "text",
				cache : true
			}).done(function (data) {
				$("#container").html(data);
			});
			resetNavigationMap();
			parentScreenID = "home_container";
			screenName = "manage_change_password";
			screenID = "manage_change_password";
			divID = screenID;
			displayLabel = "Change Password";
			AddToNavigationMap(divID, screenID, displayLabel, parentScreenID);
			webNavigationController.variable.navigationMap = [{
					screenID : "home_container",
					screenName : "Home",
					parentScreenID : "home"
				}
			];
			try {
				webNavigationController.pushNavigationMap({
					nextScreenID : "manage_change_password",
					nextScreenName : "Change Password",
					screenID : "home_container"
				});
				manage_change_password.constructScreen();
				webNavigationController.applyScreenConfigurations();
			} catch (ex) {
				alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
				if (webNavigationController.getCurrentScreenID() == "manage_change_password") {
					webNavigationController.gotoPreviousScreen();
				}
			}
		} else {
			alert("Sorry. This feature is unavailable. Please contact your support desk.");
			return false;
		}
	},
	attachEventHandlers : function () {
		$(window).resize(positionFooter);
		$("#container").delegate("[data-button-type = 'set_preference']", "click", function (e) {
			var buttonID,
			screenID;
			buttonID = $(this).attr("id");
			screenID = buttonID.substring(0, buttonID.indexOf("_set_preference_btn"));
			SaveUserPreferences(screenID);
		}).delegate("[data-button-type = 'delete_preference']", "click", function (e) {
			var buttonID,
			screenID;
			buttonID = $(this).attr("id");
			screenID = buttonID.substring(0, buttonID.indexOf("_delete_preference_btn"));
			DeleteUserPreferences(screenID);
		}).delegate("[data-button-type = 'preference_for_grid_and_export']", "click", function (e) {
			var buttonID,
			screenID;
			buttonID = $(this).attr("id");
			UserPreferencesForGridAndExport($("#" + buttonID).parent().parent().parent().attr('id'));
		}).delegate('.submit .right :button', 'click', function () {
			if ($(this).attr("data-widget-type") != "w_button") {
				if (screenChangeInd != '0') {
					isScreenEditable = false;
					screenInd = '0';
					removeScreen();
				};
				screenChangeInd = '';
			}
		}).delegate('.da_auth', 'click', function () {
			var btn_result = enable_or_disable_Approvebutton(da_info_type, da_event, da_orglvlno, da_orglvlcode, da_reqcatg, da_reqtype);
			if (btn_result == true) {
				da_auth_service();
			} else {
				alert('You do not have the permission.');
			}
		}).mousemove(resetTimer);
		$('#import').on('click', function (e) {
			if (screenName != "") {
				var newTempScreen = $.grep(webConfigurationEngine.variable.newTemplateScreen, function (e, i) {
						return e == screenName;
					})[0];
				if (newTempScreen != undefined) {
					var screenObject = eval(webNavigationController.getCurrentScreenID());
					if (screenObject.variable.standard.importConfiguration != undefined) {
						var accessCheck = $.grep(access_profile.user_functional_access, function (e, i) {
								return e.child_screen_id == screenName && e.import_access == "true";
							})[0];
						if (accessCheck != undefined) {
							if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_import.js", "../../s_iscripts/upload_data.js"])) {
								manage_import.variable.standard.configurationParam = screenName;
								manage_import.variable.custom.informationType = screenObject.variable.standard.importConfiguration.informationType;
								webNavigationController.gotoNextScreen({
									screenID : screenName,
									fieldID : "import_window",
									nextScreenID : "manage_import",
									nextScreenName : "Import",
									execute : manage_import.constructScreen
								});
							} else {
								alert("Sorry. This feature is unavailable. Please contact your support desk.");
								return false;
							}
						} else {
							alert("You don't have permission to import");
							return false;
						}
					} else {
						alert("Import is not allowed for this feature.");
						return false;
					}
				} else {
					alert("Import is not allowed for this feature.");
					return false;
				}
			} else {
				alert("Please select a feature before you import.");
				return false;
			}
		});
		$('#export').on('click', function (e) {
			var newTemplateScreen,
			screenObject;
			screenID = navigation_map[navigation_map.length - 1].screenID;
			e.preventDefault();
			if (screenName == "") {
				alert("Select the menu items");
			} else {
				for (i = 0; i < access_profile.user_functional_access.length; i++) {
					if (access_profile.user_functional_access[i].child_screen_id == screenName) {
						if (access_profile.user_functional_access[i].export_access == "False") {
							alert("You don't have permission to export");
							return false;
						} else {
							try {
								newTemplateScreen = $.grep(webConfigurationEngine.variable.newTemplateScreen, function (element, index) {
										return element == screenID;
									})[0];
								if (newTemplateScreen != undefined) {
									screenObject = eval(webNavigationController.getCurrentScreenID());
									var exportConfiguration = screenObject.variable.standard.exportConfiguration;
								} else {
									var exportConfiguration = eval("fn_" + screenID + "_PreExport()");
								};
								if (exportConfiguration.mode == "single") {
									if (LoadJSScripts(["../../common/scripts/js/fn_manage_export.js"])) {
										fn_single_document_export(exportConfiguration)
									} else {
										alert("Sorry. This featue is unavailable. Please contact your support desk.");
									}
								} else {
									if (LoadJSScripts(["../../common/scripts/js/fn_manage_export.js"])) {
										var export_window = InitializeKendoWindow({
												fieldID : 'export_window',
												windowTitle : displayLabel,
												windowHeight : 200,
												windowWidth : 400,
												screenID : 'manage_export'
											});
									} else {
										alert("Sorry. This featue is unavailable. Please contact your support desk.");
									}
								}
							} catch (e) {
								alert("Sorry. This featue is unavailable. Please contact your support desk.");
								console.log(e.Message);
							}
						}
					}
				}
			}
		});
		$('#print').on('click', function (e) {
			var newTemplateScreen,
			screenObject;
			e.preventDefault();
			if (screenName == "") {
				alert("Select the menu items");
			} else {
				for (i = 0; i < access_profile.user_functional_access.length; i++) {
					if (access_profile.user_functional_access[i].child_screen_id == screenName) {
						if (access_profile.user_functional_access[i].print_access == "False") {
							alert("You don't have permission to print");
							return false;
						} else {
							try {
								newTemplateScreen = $.grep(webConfigurationEngine.variable.newTemplateScreen, function (element, index) {
										return element == screenID;
									})[0];
								if (newTemplateScreen != undefined) {
									screenObject = eval(webNavigationController.getCurrentScreenID());
									var printConfiguration = screenObject.variable.standard.printConfiguration;
								} else {
									var printConfiguration = eval("fn_" + screenID + "_PrePrint()");
								};
								if (printConfiguration.mode == "single") {
									if (LoadJSScripts(["../../common/scripts/js/fn_manage_print.js"])) {
										fn_print(printConfiguration.content[0].fieldId);
									} else {
										alert("Sorry. This featue is unavailable. Please contact your support desk.");
									}
								} else {
									if (LoadJSScripts(["../../common/scripts/js/fn_manage_print.js"])) {
										var print_window = InitializeKendoWindow({
												fieldID : 'print_window',
												windowTitle : 'Print',
												windowHeight : 200,
												windowWidth : 400,
												screenID : 'manage_print'
											});
									} else {
										alert("Sorry. This featue is unavailable. Please contact your support desk.");
									}
								}
							} catch (e) {
								alert("Sorry. This featue is unavailable. Please contact your support desk.");
								console.log(e.Message);
							}
						}
					}
				}
			}
		});
		$('#training').on('click', function (e) {
			e.preventDefault();
			screenName = "manage_training";
			$.cachedScript("../scripts/js/fn_" + screenName + ".js").done(function () {
				$('#container').load(screenName + '.html', function () {
					resetNavigationMap();
					parentScreenID = 'home';
					screenID = screenName;
					divID = screenID;
					displayLabel = "Training";
					AddToNavigationMap(divID, screenID, displayLabel, parentScreenID);
					try {
						eval('fn_' + screenName + '()');
					} catch (err) {
						console.log(err.message);
						alert('E_LO_1003: Unable to load required files. Please contact your support desk.');
						return false;
					}
				});
			}).fail(function () {
				alert('E_LO_1001: Unable to load required files. Please contact your support desk.');
				return false;
			});
		});
		$('#head_notification').on('click', function (e) {
			e.preventDefault();
			if (typeof new_notification != 'undefined') {
				notification_child_edit = $("#notification_child");
				var onClose = function () {
					executeService_retrieve_my_notifications();
					$('#head_notification').html('<img id="head_notification" src="../images/Android_notifications_24.png"></img>');
					$('.notification_count_bubble').hide();
					$('#head_notification').unbind('click');
				};
				if (!notification_child_edit.data("kendoWindow")) {
					notification_child_edit.kendoWindow({
						width : "300px",
						actions : ["Close"],
						draggable : false,
						height : "250px",
						modal : true,
						resizable : false,
						close : onClose
					});
				};
				notification_child_edit.data("kendoWindow").refresh("notification_child.html");
				notification_child_edit.data("kendoWindow").title("Notification");
				$(".k-window").css({
					"box-shadow" : "10px 10px 5px rgb(5, 5, 5)",
					"border-top-color" : "#72B320"
				});
				$('#notification_child_wnd_title').parents('.k-header').css({
					"background-image" : "none,linear-gradient(to bottom,rgb(114, 179, 32) 0,rgb(172, 245, 169) 100%)"
				});
				$("#notification_child").closest(".k-window").css({
					top : 41,
					left : 995,
				});
				$(".k-overlay").css({
					"background-color" : "transparent"
				});
				notification_child_edit.data("kendoWindow").open();
			}
		});
		$('#head_logout').on('click', function (e) {
			e.preventDefault();
			if (isDataModified == true && isScreenEditable == true) {
				var ignoreChanges = confirm("Data is modified. Do you want to cancel the changes? Click OK to proceed without saving, Cancel to stay on the current page.");
				if (ignoreChanges == false) {
					return;
				}
			};
			isDataModified = false;
			userSessionLogout();
		});
		$('#change_password').on('click', function (e) {
			home.changePassword();
		});
		window.onload = resetTimer;
		document.onkeypress = resetTimer;
		document.onclick = resetTimer;
	},
	displaySingleMenu : function () {
		var newTemplateScreen,
		nextScreenObject;
		newTemplateScreen = $.grep(webConfigurationEngine.variable.newTemplateScreen, function (element, index) {
				return element == home.variable.singleMenuFeatureObject.child_screen_id;
			})[0];
		if (newTemplateScreen != undefined) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_" + home.variable.singleMenuFeatureObject.child_screen_id + ".js"])) {
				$.ajax({
					url : home.variable.singleMenuFeatureObject.child_screen_id + ".html",
					async : false,
					dataType : "text",
					cache : true
				}).done(function (data) {
					$("#container").html(data);
				});
				resetNavigationMap();
				parentScreenID = "home_container";
				screenName = home.variable.singleMenuFeatureObject.child_screen_id;
				screenID = home.variable.singleMenuFeatureObject.child_screen_id;
				divID = screenID;
				displayLabel = home.variable.singleMenuFeatureObject.child_feature_display_label;
				AddToNavigationMap(divID, screenID, displayLabel, parentScreenID);
				nextScreenObject = eval(home.variable.singleMenuFeatureObject.child_screen_id);
				try {
					webNavigationController.pushNavigationMap({
						nextScreenID : home.variable.singleMenuFeatureObject.child_screen_id,
						nextScreenName : home.variable.singleMenuFeatureObject.child_feature_display_label,
						screenID : "home_container"
					});
					nextScreenObject.constructScreen();
					webNavigationController.applyScreenConfigurations();
				} catch (ex) {
					alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
					if (webNavigationController.getCurrentScreenID() == home.variable.singleMenuFeatureObject.child_screen_id) {
						webNavigationController.gotoPreviousScreen();
					}
				}
			} else {
				alert("E_LO_1002: Unable to load required files. Please contact your support desk.");
				return false;
			}
		} else {
			$.cachedScript("../scripts/js/fn_" + home.variable.singleMenuFeatureObject.child_screen_id + ".js").done(function () {
				if (eval('fn_' + home.variable.singleMenuFeatureObject.child_screen_id + '_loadScripts()')) {
					$.ajax({
						url : home.variable.singleMenuFeatureObject.child_screen_id + ".html",
						async : false,
						dataType : "text",
						cache : true
					}).done(function (data) {
						$("#container").html(data);
					});
					parentScreenID = 'home_container';
					screenID = home.variable.singleMenuFeatureObject.child_screen_id;
					divID = screenID;
					displayLabel = label;
					AddToNavigationMap(divID, screenID, displayLabel, parentScreenID);
					eval('fn_' + home.variable.singleMenuFeatureObject.child_screen_id + '()');
					ManagingFeatureAccess(home.variable.singleMenuFeatureObject.child_screen_id);
					ManagingSubFeatureAccess(home.variable.singleMenuFeatureObject.child_screen_id);
					return false;
				}
			});
		}
	},
	readSessionStorage : function () {
		login_profile = $.parseJSON(sessionStorage.getItem('login_profile'));
		navigation_map = $.parseJSON(sessionStorage.getItem('navigation_map'));
		access_profile = $.parseJSON(sessionStorage.getItem('access_profile'));
		task_profile = $.parseJSON(sessionStorage.getItem('task_profile'));
		job_profile = $.parseJSON(sessionStorage.getItem('job_profile'));
		jobtask_profile = $.parseJSON(sessionStorage.getItem('jobtask_profile'));
	},
	loadConfigurationFiles : function () {
		configuredLabelValueXML = loadXMLDoc("label_resolution_" + login_profile.client_id + "_" + login_profile.country_code + "_" + login_profile.locale_id + ".xml");
		configured_xml_value = loadXMLDoc("ui_config_" + login_profile.client_id + "_in.xml");
		configured_label_value = loadXMLDoc("label_translation_" + login_profile.client_id + "_in_en-us.xml");
		xmlDocUI = loadXMLDoc("ui_configuration_" + login_profile.client_id + "_" + login_profile.country_code + ".xml");
		xmlDocLBL = loadXMLDoc("label_configuration_" + login_profile.client_id + "_" + login_profile.country_code + "_" + login_profile.locale_id + ".xml");
		xmlDocREPORT = loadXMLDoc("report_configuration_" + login_profile.client_id + "_" + login_profile.country_code + ".xml");
		xmlDocLBLFORREPORT = loadXMLDoc("report_label_configuration_" + login_profile.client_id + "_" + login_profile.country_code + "_" + login_profile.locale_id + ".xml");
		xmlDocRule = loadXMLDoc("rule_configuration_" + login_profile.client_id + "_" + login_profile.country_code + ".xml");
		xmlDocImportUI = loadXMLDoc("import_configuration_" + login_profile.client_id + "_" + login_profile.country_code + ".xml");
	},
	loadHomeContainer : function () {
		$.ajax({
			url : "home_container.html",
			async : false,
			dataType : "text",
			cache : true
		}).done(function (data) {
			$("#container").html(data);
			/*if ($.grep(access_profile.user_functional_access,function(element,index){ return (element.child_screen_id == "home_container" && element.feature_access == "true")})[0] !== undefined) {
				home_container.constructScreen();
			};*/			
		});
		webNavigationController.variable.navigationMap.push({
			screenID : "home_container",
			screenName : "Home",
			parentScreenID : "home"
		});
	},
	updateHeaderFooter : function () {
		$("#home_logo img").attr("src", "../../common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + "company_logo.png");
		$("#home_username").text(login_profile.title + ". " + login_profile.first_name);
		$("#home_company_loation").text(login_profile.client_id + " @ " + login_profile.location_code);
		$("#home_footer img").attr("src", "../../common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + "company_logo.png");
		$("#home_footer_app_name").text(login_profile.software_product);
		if (login_profile.last_login_date != "") {
			$("#home_last_visit").text("Last Visited : " + kendo.toString(mserviceUtilities.getDateObject({
						dateString : login_profile.last_login_date,
						hourString : login_profile.last_login_hour,
						minuteString : login_profile.last_login_minute
					}), cultureInfo.calendar.patterns.g) + " | ").show();
		}
	},
	validateSession : function () {
		if (login_profile) {
			if (isValidSession() == 1) {
				alert('You have not logged into the system.. Pl.login to proceed');
				window.location.href = "login.html";
			}
		} else {
			alert('You have not logged into the system.. Pl.login to proceed');
			window.location.href = "login.html";
		};
	},
	validateFeatureAccess : function () {
		var accessibleFeatures;
		accessibleFeatures = $.grep(access_profile.user_functional_access, function (e, i) {
				return e.child_feature_id_or_group_ind == "F" && e.menu_display_ind == "true" && e.feature_access == "true";
			});	   
		if ((accessibleFeatures.length == 1) && ($.grep(access_profile.user_functional_access,function(element,index){ return (element.child_screen_id == "home_container" && element.feature_access == "true")}).length == 0)) {
			home.variable.displaySingleMenu = true;
			home.variable.singleMenuFeatureObject = accessibleFeatures[0];
			if (login_profile.def_pwd_ind == 'Y') {
				home.changePassword();
				$("#manage_change_password_cancel_btn").hide();
				$("#menu_content").hide();
			} else {
				home.displaySingleMenu();
			};
			$('#breadcrumb').show();
		} else if (((accessibleFeatures.length == 1) && ($.grep(access_profile.user_functional_access,function(element,index){ return (element.child_screen_id == "home_container" && element.feature_access == "true")}).length != 0)) || (accessibleFeatures.length > 1))  {
			$("#menu").hide();
			$("#menu").initializeWMenu();
			$("#menu").show();
			if (login_profile.def_pwd_ind == 'Y') {
				home.changePassword();
				$("#manage_change_password_cancel_btn").hide();
				$("#menu_content").hide();
			};
			$("#breadcrumb hr").remove();
			$('#breadcrumb').show();
		} else if ((accessibleFeatures.length == 0) && ($.grep(access_profile.user_functional_access,function(element,index){ return (element.child_screen_id == "home_container" && element.feature_access == "true")}).length != 0)) {
			if (login_profile.def_pwd_ind == 'Y') {
				home.changePassword();
				$("#manage_change_password_cancel_btn").hide();
				$("#menu_content").hide();
			};
			$("#breadcrumb hr").remove();
		} else {
			alert("Sorry. You do not have access to the features of the system.");
		}
	},
	setEmployeeProfileInfo : function () {
		var emp_profile_info = cacheManager.getDataSet({
				informationType : "'EMPLOYEE_PROFILE_INFO'",
				searchField1 : "$login_profile.emp_id"
			})[0];
		for (var index in emp_profile_info) {
			login_profile[index] = emp_profile_info[index];
		}
	},
	setCompanyFeatureInfo : function () {
		var company_feature_info = cacheManager.getDataSet({
				informationType : "'COMPANY_FEATURE_INFO'"
			})[0];
		for (var index in company_feature_info) {
			login_profile[index] = company_feature_info[index];
		}
	},
	variable : {
		displaySingleMenu : false,
		singleMenuFeatureObject : "",
		windowHistoryCount : 0
	}
};
$.ajaxSetup({
	timeout : 300000
});
$.cachedScript = function (url, options) {
	options = $.extend(options || {}, {
			dataType : "script",
			cache : true,
			async : false,
			url : url,
		});
	return $.ajax(options);
};
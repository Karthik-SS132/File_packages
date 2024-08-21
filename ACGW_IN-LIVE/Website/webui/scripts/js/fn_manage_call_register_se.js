var manage_call_register_se = {
	constructScreen : function () {
		manage_call_register_se.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "mservice",
				serviceName : "retrieve_manage_call_register",
				outputPath : "context/outputparam_detail",
				pageSize : 50,
				inputParameter : {
					p_inputparam_xml : "manage_call_register_se.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_call_register_se",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
		manage_call_register_se.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				outputPath : "context/outputparam",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'COMP_FEATURE_ACCESS_AUTH_LIST'</lov_code_type></inputparam>"
				},
				screenID : "manage_call_register_se",
			});
		if (login_profile.user_group_type == "CU") {
			manage_call_register_se.variable.custom.customerUserDetails = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values",
					inputParameter : {
						p_lov_code : "'GET_CUST_USER_DETAILS'",
						p_search_field_1 : "$login_profile.user_id",
						p_search_field_2 : "",
						p_search_field_3 : "",
						p_search_field_4 : "",
						p_search_field_5 : ""
					}
				});
			manage_call_register_se.variable.custom.customerUserDetails.read();
			if (manage_call_register_se.variable.custom.customerUserDetails.data()[0] != undefined) {
				manage_call_register_se.variable.custom.customerUserCustomerID = manage_call_register_se.variable.custom.customerUserDetails.data()[0].p_value_field_1;
			}
		}
	},
	postConstruct : function () {
		manage_call_register_se_filterArea = $("#manage_call_register_se_pane2");
		$("#manage_call_register_se_content_1 span dt").removeClass("term_one");
		$("#manage_call_register_se_content_1 span dt").removeClass("term_two");
		$("#manage_call_register_se_content_1 span dd.colen").html("");
		$("#manage_call_register_se_content_1").find('dt').css("width","120px");
		$("#manage_call_register_se_editor").append("<li id='manage_call_register_se_grid_pager'></li>");
		$("#manage_call_register_se_grid_pager").append($("#manage_call_register_se_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_call_register_se_grid_1").data("kendoGrid").bind("dataBound", manage_call_register_se.customRequirementHandler.gridPager);
		if(manage_call_register_se.variable.custom.autoLoadInd == "true") {
			manage_call_register_se.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_call_register_se_splitter[manage_call_register_se_filterArea.width() > 0 ? "collapse" : "expand"](manage_call_register_se_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_call_register_se_content_1",
					screenID : "manage_call_register_se",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_call_register_se_content_1",
				screenID : "manage_call_register_se",
				matchCondition : ["_filter"]
			});
			manage_call_register_se_pane1_width = $("#manage_call_register_se_splitter").width() - 9;
		}, 30);
	},
	initializeWidgets : function () {
		manage_call_register_se.variable.custom.grid_1 = $("#manage_call_register_se_grid_1").initializeWGrid({
				screenID : "manage_call_register_se",
				dataSource : manage_call_register_se.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_call_register_se_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_call_register_se_editor").kendoMenu();		
		manage_call_register_se_splitter = $("#manage_call_register_se_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }				
			],
			resize: function(e) {
				manage_call_register_se.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_call_register_se.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_call_register_se.variable.custom.crudIndicator == "R") {
				manage_call_register_se.variable.custom.grid_1.dataSource._skip = 0;
				manage_call_register_se.variable.custom.grid_1.dataSource.pageSize(50);
				if(manage_call_register_se_filterArea.width() == 0){
					$("#manage_call_register_se_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_call_register_se_grid_1").find(".k-grid-header").height()).css("width", manage_call_register_se_pane1_width - $("#manage_call_register_se_grid_1").find(".k-grid-content-locked").width());
				} else {
					$("#manage_call_register_se_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_call_register_se_grid_1").find(".k-grid-header").height()).css("width", manage_call_register_se_pane1_width - $("#manage_call_register_se_grid_1").find(".k-grid-content-locked").width() - 330);
				}
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_se_edit.js", "../../s_iscripts/save_manage_call_register.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_call_register_se",
						nextScreenID : "manage_call_register_se_edit",
						nextScreenName : manage_call_register_se.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_call_register_se.variable.custom.miscID == "filters"){
				manage_call_register_se_splitter[manage_call_register_se_filterArea.width() > 0 ? "collapse" : "expand"](manage_call_register_se_filterArea);
				if(manage_call_register_se_filterArea.width() == 0){
					$("#manage_call_register_se_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_call_register_se_grid_1").find(".k-grid-header").height()).css("width", manage_call_register_se_pane1_width - $("#manage_call_register_se_grid_1").find(".k-grid-content-locked").width());
				} else {
					$("#manage_call_register_se_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_call_register_se_grid_1").find(".k-grid-header").height()).css("width", manage_call_register_se_pane1_width - $("#manage_call_register_se_grid_1").find(".k-grid-content-locked").width() - 330);
				}
			}
			if(manage_call_register_se.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_call_register_se_content_1",
					screenID : "manage_call_register_se",
					matchCondition : ["_filter"]
				});
				$("#manage_call_register_se_filters_btn .k-i-filter").css("color","black");
			}
			if(manage_call_register_se.variable.custom.miscID == "acgic_report_form"){
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_form_handler.js"])) {
					my_calls = {
						variable : {
							selectedRecord : {}
						}
					};
					manage_call_register_se.variable.custom.myCallData = mserviceUtilities.getTransportPagingDataSource({
						applicationName : "common_modules",
						serviceName : "retrieve_manage_custom_info_list",
						outputPath : "outputparam_detail",
						api : true,
						pageSize : 50,
						inputParameter : {
							p_custom_info_code : "'retrieve_my_calls'",
							p_inputparam_xml : "'<inputparam><assigned_to_emp_id_filter>" + login_profile.emp_id +"</assigned_to_emp_id_filter><call_ref_no_filter>" + manage_call_register_se.variable.custom.selectedRecord.call_no + "</call_ref_no_filter></inputparam>'"
						},
						screenID : "manage_call_register_se"
					});
					manage_call_register_se.variable.custom.myCallData.read();
					if(manage_call_register_se.variable.custom.myCallData.data().length != 0){
						my_calls.variable.selectedRecord = manage_call_register_se.variable.custom.myCallData.data()[0];
					}
					form_handler.variable.template = manage_call_register_se.variable.custom.miscID;
					form_handler.variable.transNo = manage_call_register_se.variable.custom.selectedRecord.call_no;
					form_handler.variable.attachInd = "C";
					form_handler.variable.taskID = "0";
					$("#manage_call_register_se_grid_1").append("<div id = 'manage_call_register_se_form_handler_window'><div id = 'manage_call_register_se_form_handler_loader' style='width: 100%; height: 90%;' ></div></div>");
					$("#manage_call_register_se_form_handler_window").kendoWindow({
						width : (screen.width * 0.30),
						height : (screen.height * 0.75),
						title : manage_call_register_se.variable.custom.nextScreenName,
						visible : false,
						modal : true,
						deactivate : function () {
							eval("delete form_handler");
							eval("delete formHandlerRuleEngine");
							this.destroy();
						},
					});
					$.ajax({
						url : mserviceUtilities.getWebserverpath() + "webui/html/form_handler.html",
						async : false,
						dataType : "text",
						cache : true
					}).done(function (data) {
						try {
							$("#manage_call_register_se_form_handler_loader").append(data);
							form_handler.constructScreen();
							$("#manage_call_register_se_form_handler_window").data("kendoWindow").center().open();
							$(".k-overlay").css("opacity", "0.8");
						} catch (ex) {
							alert("Sorry. This feature is unavailable. Please contact your support desk.");
							eval("delete form_handler");
							eval("delete formHandlerRuleEngine");
							$("#manage_call_register_se_form_handler_window").data("kendoWindow").destroy();
							return false;
						}
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			} 
			
		if(manage_call_register_se.variable.custom.miscID == "final_mom_form"){
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_form_handler.js"])) {
					my_calls = {
						variable : {
							selectedRecord : {}
						}
					};
					manage_call_register_se.variable.custom.myCallData = mserviceUtilities.getTransportPagingDataSource({
						applicationName : "common_modules",
						serviceName : "retrieve_manage_custom_info_list",
						outputPath : "outputparam_detail",
						api : true,
						pageSize : 50,
						inputParameter : {
							p_custom_info_code : "'retrieve_my_calls'",
							p_inputparam_xml : "'<inputparam><assigned_to_emp_id_filter>" + login_profile.emp_id +"</assigned_to_emp_id_filter><call_ref_no_filter>" + manage_call_register_se.variable.custom.selectedRecord.call_no + "</call_ref_no_filter></inputparam>'"
						},
						screenID : "manage_call_register_se"
					});
					manage_call_register_se.variable.custom.myCallData.read();
					if(manage_call_register_se.variable.custom.myCallData.data().length != 0){
						my_calls.variable.selectedRecord = manage_call_register_se.variable.custom.myCallData.data()[0];
					}
					form_handler.variable.template = manage_call_register_se.variable.custom.miscID;
					form_handler.variable.transNo = manage_call_register_se.variable.custom.selectedRecord.call_no;
					form_handler.variable.attachInd = "C";
					form_handler.variable.taskID = "0";
					$("#manage_call_register_se_grid_1").append("<div id = 'manage_call_register_se_form_handler_window'><div id = 'manage_call_register_se_form_handler_loader' style='width: 100%; height: 90%;' ></div></div>");
					$("#manage_call_register_se_form_handler_window").kendoWindow({
						width : (screen.width * 0.30),
						height : (screen.height * 0.75),
						title : manage_call_register_se.variable.custom.nextScreenName,
						visible : false,
						modal : true,
						deactivate : function () {
							eval("delete form_handler");
							eval("delete formHandlerRuleEngine");
							this.destroy();
						},
					});
					$.ajax({
						url : mserviceUtilities.getWebserverpath() + "webui/html/form_handler.html",
						async : false,
						dataType : "text",
						cache : true
					}).done(function (data) {
						try {
							$("#manage_call_register_se_form_handler_loader").append(data);
							form_handler.constructScreen();
							$("#manage_call_register_se_form_handler_window").data("kendoWindow").center().open();
							$(".k-overlay").css("opacity", "0.8");
						} catch (ex) {
							alert("Sorry. This feature is unavailable. Please contact your support desk.");
							eval("delete form_handler");
							eval("delete formHandlerRuleEngine");
							$("#manage_call_register_se_form_handler_window").data("kendoWindow").destroy();
							return false;
						}
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			} 
		if(manage_call_register_se.variable.custom.miscID == "foc_report_form"){
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_form_handler.js"])) {
					my_calls = {
						variable : {
							selectedRecord : {}
						}
					};
					manage_call_register_se.variable.custom.myCallData = mserviceUtilities.getTransportPagingDataSource({
						applicationName : "common_modules",
						serviceName : "retrieve_manage_custom_info_list",
						outputPath : "outputparam_detail",
						api : true,
						pageSize : 50,
						inputParameter : {
							p_custom_info_code : "'retrieve_my_calls'",
							p_inputparam_xml : "'<inputparam><assigned_to_emp_id_filter>" + login_profile.emp_id +"</assigned_to_emp_id_filter><call_ref_no_filter>" + manage_call_register_se.variable.custom.selectedRecord.call_no + "</call_ref_no_filter></inputparam>'"
						},
						screenID : "manage_call_register_se"
					});
					manage_call_register_se.variable.custom.myCallData.read();
					if(manage_call_register_se.variable.custom.myCallData.data().length != 0){
						my_calls.variable.selectedRecord = manage_call_register_se.variable.custom.myCallData.data()[0];
					}
					form_handler.variable.template = manage_call_register_se.variable.custom.miscID;
					form_handler.variable.transNo = manage_call_register_se.variable.custom.selectedRecord.call_no;
					form_handler.variable.attachInd = "C";
					form_handler.variable.taskID = "0";
					$("#manage_call_register_se_grid_1").append("<div id = 'manage_call_register_se_form_handler_window'><div id = 'manage_call_register_se_form_handler_loader' style='width: 100%; height: 90%;' ></div></div>");
					$("#manage_call_register_se_form_handler_window").kendoWindow({
						width : (screen.width * 0.30),
						height : (screen.height * 0.75),
						title : manage_call_register_se.variable.custom.nextScreenName,
						visible : false,
						modal : true,
						deactivate : function () {
							eval("delete form_handler");
							eval("delete formHandlerRuleEngine");
							this.destroy();
						},
					});
					$.ajax({
						url : mserviceUtilities.getWebserverpath() + "webui/html/form_handler.html",
						async : false,
						dataType : "text",
						cache : true
					}).done(function (data) {
						try {
							$("#manage_call_register_se_form_handler_loader").append(data);
							form_handler.constructScreen();
							$("#manage_call_register_se_form_handler_window").data("kendoWindow").center().open();
							$(".k-overlay").css("opacity", "0.8");
						} catch (ex) {
							alert("Sorry. This feature is unavailable. Please contact your support desk.");
							eval("delete form_handler");
							eval("delete formHandlerRuleEngine");
							$("#manage_call_register_se_form_handler_window").data("kendoWindow").destroy();
							return false;
						}
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			} 
		},
		feature_btn_click : function (element, event) {
			if (manage_call_register_se.variable.custom.selectedFeatureID == "manage_user_attachments") {
				if (manage_call_register_se.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register_se.customRequirementHandler.validateAccess(element)) {
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments.js"])) {
							manage_user_attachments.variable.standard.configurationParam = "CALL";
							manage_user_attachments.variable.custom.project_task_level_ind = "C";
							manage_user_attachments.variable.custom.project_id = manage_call_register_se.variable.custom.selectedRecord.call_no;
							manage_user_attachments.variable.custom.template_id = "";
							manage_user_attachments.variable.custom.task_id = "0";
							manage_user_attachments.variable.custom.project_status_defaultValue = manage_call_register_se.variable.custom.selectedRecord.call_status_desc;
							webNavigationController.gotoNextScreen({
								screenID : "manage_call_register_se",
								nextScreenID : "manage_user_attachments",
								nextScreenName : "Attachments"
							});
						} else {
							alert("Sorry. This feature is unavailable. Please contact support desk.");
							return false;
						}
					} else {
						alert("You do not have access to this call.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_call_register_se.variable.custom.selectedFeatureID == "view_calendar") {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_view_calendar.js", "../../s_iscripts/retrieve_calendar.js"])) {
					displayLabel = 'Calendar';
					$.get('view_calendar.html', function (data) {
						$("#manage_call_register_se").hide();
						$("#container").append(data);
						fn_view_calendar();
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact support desk.");
					return false;
				}
			} else if (manage_call_register_se.variable.custom.selectedFeatureID == "manage_call_resource_update") {
				if (manage_call_register_se.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register_se.customRequirementHandler.validateAccess(element)) {
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_resource_update.js", "../../s_iscripts/update_project_resourcelist_detail.js"])) {
							webNavigationController.gotoNextScreen({
								screenID : "manage_call_register_se",
								nextScreenID : "manage_call_resource_update",
								nextScreenName : "Resource Update"
							});
						} else {
							alert("Sorry. This feature is unavailable. Please contact support desk.");
							return false;
						}
					} else {
						alert("You do not have access to this call.");
						return false;
					}
				} else {
					alert("No row has been selected");
					return false;
				}
			} else if (manage_call_register_se.variable.custom.selectedFeatureID == "manage_call_sparepart_update") {
				if (manage_call_register_se.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register_se.customRequirementHandler.validateAccess(element)) {
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_sparepart_update.js", "../../s_iscripts/update_inventory_consumption.js"])) {
							webNavigationController.gotoNextScreen({
								screenID : "manage_call_register_se",
								nextScreenID : "manage_call_sparepart_update",
								nextScreenName : "Sparepart Update"
							});
						} else {
							alert("Sorry. This feature is unavailable. Please contact support desk.");
							return false;
						}
					} else {
						alert("You do not have access to this call.");
						return false;
					}
				} else {
					alert("No row has been selected");
					return false;
				}
			} else if (manage_call_register_se.variable.custom.selectedFeatureID == "track_employee_geolocation") {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_track_employee_geolocation.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_call_register_se",
						nextScreenID : "track_employee_geolocation",
						nextScreenName : "Track Employee Geolocation"
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact support desk.");
					return false;
				}
			} else if (manage_call_register_se.variable.custom.selectedFeatureID == "generate_service_coupon") {
				if (manage_call_register_se.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register_se.customRequirementHandler.validateAccess(element)) {
						manage_call_register_se.variable.custom.selectedRecord = manage_call_register_se.variable.custom.grid_1.dataSource.getByUid(manage_call_register_se.variable.custom.grid_1.select().data("uid"));
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_service_coupon.js"])) {
							manage_call_register_se.variable.custom.visit_template_id = mserviceUtilities.getTransportDataSource({
									applicationName : "common_modules",
									serviceName : "retrieve_listof_values_for_searchcondition",
									inputParameter : {
										p_inputparam_xml : "'<inputparam><lov_code_type>VISITTEMPLATEID</lov_code_type><search_field_1>" + manage_call_register_se.variable.custom.selectedRecord.call_no + "</search_field_1></inputparam>'"
									},
								});
							manage_call_register_se.variable.custom.visit_template_id.read();
							if (manage_call_register_se.variable.custom.visit_template_id.data().length != 0) {
								generate_service_coupon.variable.custom.document_type = "AssetServiceVisitSchedule";
								generate_service_coupon.variable.custom.document_template = manage_call_register_se.variable.custom.visit_template_id.data()[0].visittemplateid,
								generate_service_coupon.variable.custom.retrieve_service_name = "/mservice/retrieve_asset_service_visit_schedule_for_docgen";
								generate_service_coupon.variable.custom.retrieve_service_inputparam = "<inputparam>";
								generate_service_coupon.variable.custom.retrieve_service_inputparam += "<p_inputparam_xml>";
								generate_service_coupon.variable.custom.retrieve_service_inputparam += getXmlString("<call_no>" + manage_call_register_se.variable.custom.selectedRecord.call_no + "</call_no>");
								generate_service_coupon.variable.custom.retrieve_service_inputparam += getXmlString("<asset_id>" + manage_call_register_se.variable.custom.selectedRecord.asset_id + "</asset_id>");
								generate_service_coupon.variable.custom.retrieve_service_inputparam += "</p_inputparam_xml>";
								generate_service_coupon.variable.custom.retrieve_service_inputparam += "</inputparam>";
								generate_service_coupon.variable.custom.output_file_path = "/content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/";
								generate_service_coupon.variable.custom.output_file_name = manage_call_register_se.variable.custom.visit_template_id.data()[0].visitreportno;
								generate_service_coupon.variable.custom.generate_pdf_document_dataSource_1 = mserviceUtilities.getTransportDataSource({
										applicationName : "common_modules",
										serviceName : "generate_pdf_document",
										outputPath : "context/outputparam_header",
										inputParameter : {
											p_document_type : "$generate_service_coupon.variable.custom.document_type",
											p_document_template : "$generate_service_coupon.variable.custom.document_template",
											p_data_retrieve_service_name : "$generate_service_coupon.variable.custom.retrieve_service_name",
											p_data_retrieve_request_xml : "'" + generate_service_coupon.variable.custom.retrieve_service_inputparam + "'",
											p_output_file_path : "$generate_service_coupon.variable.custom.output_file_path",
											p_output_file_name : "$generate_service_coupon.variable.custom.output_file_name"
										}
									});
								generate_service_coupon.variable.custom.generate_pdf_document_dataSource_1.read();
								if (generate_service_coupon.variable.custom.generate_pdf_document_dataSource_1.data()[0].p_update_status == "SP001") {
									webNavigationController.gotoNextScreen({
										screenID : "manage_call_register_se",
										fieldID : "manage_call_register_se_child_window",
										nextScreenID : "generate_service_coupon",
										nextScreenName : manage_call_register_se.variable.custom.nextScreenName,
										windowHeight : 600,
										windowWidth : 900,
										execute : generate_service_coupon.constructScreen
									});
								} else {
									alert("Sorry. PDF generation failed. Please contact support desk.");
									return false;
								}
							} else {
								alert("Sorry, Service visit is not linked to this call.")
							}
						} else {
							alert("Sorry. This feature is unavailable. Please contact support desk.");
							return false;
						}
					} else {
						alert("You do not have access to this call.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_call_register_se.variable.custom.selectedFeatureID == "generate_expense_document") {
				if (manage_call_register_se.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register_se.customRequirementHandler.validateAccess(element)) {
						manage_call_register_se.variable.custom.selectedRecord = manage_call_register_se.variable.custom.grid_1.dataSource.getByUid(manage_call_register_se.variable.custom.grid_1.select().data("uid"));
						if (mserviceUtilities.loadJSScripts(["../../s_iscripts/generate_expense_document.js"])) {
							if (confirm("Are you sure do you want to generate expense document for this call ?")) {
								var returnValue;
								returnValue = executeService_generate_expense_document({
										p_call_jo_project_ind : "C",
										p_call_jo_project_ref_no : manage_call_register_se.variable.custom.selectedRecord.call_no
									});
								if (returnValue.update_status == "SP001") {
									alert("Expense Document generated successfully. Your Expense Document reference number is " + returnValue.expense_doc_ref_no);
									manage_call_register_se.variable.custom.grid_1.dataSource.pageSize(50);
									return true;
								} else {
									alert("Generation of Expense Document failed.");
									return false;
								}
							}
						} else {
							alert("Sorry. This feature is unavailable. Please contact support desk.");
							return false;
						}
					} else {
						alert("You do not have access to this call.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_call_register_se.variable.custom.selectedFeatureID == "manage_call_stockout") {
				if (manage_call_register_se.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register_se.customRequirementHandler.validateAccess(element)) {
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_stockout.js", "../../s_iscripts/update_call_wfeventverb_status_change.js"])) {
							var allowedWorkflowArray;
							manage_call_register_se.variable.custom.selectedRecord = manage_call_register_se.variable.custom.grid_1.dataSource.getByUid(manage_call_register_se.variable.custom.grid_1.select().data("uid"));
							allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
									transactionType : "CALL",
																			
									eventVerb : "MATLISSUE",
									requestCategory : manage_call_register_se.variable.custom.selectedRecord.call_category,
									requestType : manage_call_register_se.variable.custom.selectedRecord.call_type,
									fromStage : manage_call_register_se.variable.custom.selectedRecord.workflow_stage_no,
									fromStatus : manage_call_register_se.variable.custom.selectedRecord.call_status
								});
							manage_call_register_se.variable.custom.selectedWorkflowToStage = "";
							manage_call_register_se.variable.custom.selectedWorkflowToStatus = "";
							if (allowedWorkflowArray.length != 0) {
								manage_call_register_se.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
								manage_call_register_se.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
								manage_call_register_se.variable.custom.selectedCallLoggedDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register_se.variable.custom.selectedRecord.created_on_date,
										hourString : manage_call_register_se.variable.custom.selectedRecord.created_on_hour,
										minuteString : manage_call_register_se.variable.custom.selectedRecord.created_on_minute
									});
								manage_call_register_se.variable.custom.selectedActualStartDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register_se.variable.custom.selectedRecord.act_start_on_date,
										hourString : manage_call_register_se.variable.custom.selectedRecord.act_start_on_hour,
										minuteString : manage_call_register_se.variable.custom.selectedRecord.act_start_on_minute
									});
								manage_call_register_se.variable.custom.selectedScheduledStartDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register_se.variable.custom.selectedRecord.sch_start_on_date,
										hourString : manage_call_register_se.variable.custom.selectedRecord.sch_start_on_hour,
										minuteString : manage_call_register_se.variable.custom.selectedRecord.sch_start_on_minute
									});
								manage_call_register_se.variable.custom.selectedScheduledFinishDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register_se.variable.custom.selectedRecord.sch_finish_on_date,
										hourString : manage_call_register_se.variable.custom.selectedRecord.sch_finish_on_hour,
										minuteString : manage_call_register_se.variable.custom.selectedRecord.sch_finish_on_minute
									});
								webNavigationController.gotoNextScreen({
									screenID : "manage_call_register_se",
									nextScreenID : "manage_call_stockout",
									nextScreenName : "Stockout Update"
								});
							} else {
								alert("Sorry. This feature is unavailable for the selected record.");
								return false;
							}
						} else {
							alert("Sorry. This feature is unavailable. Please contact support desk.");
							return false;
						}
					} else {
						alert("You do not have access to this call.");
						return false;
					}
				} else {
					alert("No row has been selected");
					return false;
				}
			} else if (manage_call_register_se.variable.custom.selectedFeatureID == "manage_call_stockin") {
				if (manage_call_register_se.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register_se.customRequirementHandler.validateAccess(element)) {
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_stockin.js", "../../s_iscripts/update_call_wfeventverb_status_change.js"])) {
							var allowedWorkflowArray;
							manage_call_register_se.variable.custom.selectedRecord = manage_call_register_se.variable.custom.grid_1.dataSource.getByUid(manage_call_register_se.variable.custom.grid_1.select().data("uid"));
							allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
									transactionType : "CALL",
									eventVerb : "MATLRECEIPT",
									requestCategory : manage_call_register_se.variable.custom.selectedRecord.call_category,
									requestType : manage_call_register_se.variable.custom.selectedRecord.call_type,
									fromStage : manage_call_register_se.variable.custom.selectedRecord.workflow_stage_no,
									fromStatus : manage_call_register_se.variable.custom.selectedRecord.call_status
								});
							manage_call_register_se.variable.custom.selectedWorkflowToStage = "";
							manage_call_register_se.variable.custom.selectedWorkflowToStatus = "";
							if (allowedWorkflowArray.length != 0) {
								manage_call_register_se.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
								manage_call_register_se.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
								manage_call_register_se.variable.custom.selectedCallLoggedDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register_se.variable.custom.selectedRecord.created_on_date,
										hourString : manage_call_register_se.variable.custom.selectedRecord.created_on_hour,
										minuteString : manage_call_register_se.variable.custom.selectedRecord.created_on_minute
									});
								manage_call_register_se.variable.custom.selectedActualStartDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register_se.variable.custom.selectedRecord.act_start_on_date,
										hourString : manage_call_register_se.variable.custom.selectedRecord.act_start_on_hour,
										minuteString : manage_call_register_se.variable.custom.selectedRecord.act_start_on_minute
									});
								manage_call_register_se.variable.custom.selectedScheduledStartDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register_se.variable.custom.selectedRecord.sch_start_on_date,
										hourString : manage_call_register_se.variable.custom.selectedRecord.sch_start_on_hour,
										minuteString : manage_call_register_se.variable.custom.selectedRecord.sch_start_on_minute
									});
								manage_call_register_se.variable.custom.selectedScheduledFinishDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register_se.variable.custom.selectedRecord.sch_finish_on_date,
										hourString : manage_call_register_se.variable.custom.selectedRecord.sch_finish_on_hour,
										minuteString : manage_call_register_se.variable.custom.selectedRecord.sch_finish_on_minute
									});
								webNavigationController.gotoNextScreen({
									screenID : "manage_call_register_se",
									nextScreenID : "manage_call_stockin",
									nextScreenName : "Stockin Update"
								});

							} else {
								alert("Sorry. This feature is unavailable for the selected record.");
								return false;
							}
						} else {
							alert("Sorry. This feature is unavailable. Please contact support desk.");
							return false;
						}
					} else {
						alert("You do not have access to this call.");
						return false;
					}
				} else {
					alert("No row has been selected");
					return false;
				}
			} else if (manage_call_register_se.variable.custom.selectedFeatureID == "generate_pwclaim_document") {
				if (manage_call_register_se.variable.custom.grid_1.select().length != 0) {
					var generate_pwclaim = new kendo.data.DataSource({
						pageSize : 10,
						transport : {
							read : {
								async : false,
								type : "POST",
								dataType : 'json',
								contentType : "application/json; charset=utf-8",
								url : getWebserverpath() + "api/mservice/generate_pwclaim",
								complete : function (data, textstatus) {
									if(generate_pwclaim.data()[0] != null){
										if (generate_pwclaim.data()[0].p_update_status == "SP001") {
											alert("FOC Document generated successfully. Your FOC Document reference number is " + generate_pwclaim.data()[0].p_pwclaim_ref_no);
											manage_call_register_se.variable.custom.grid_1.dataSource.pageSize(50);
											return true;
										} 
									} else {
										alert("Generation of FOC Document failed.");
										return false;
									}							
								}
							},
							parameterMap : function (data, type) {
								return mserviceUtilities.getTransportParameter({
									inputparam : {
										p_call_jo_project_ind : "'C'",
										p_call_jo_project_ref_no : "$manage_call_register_se.variable.custom.selectedRecord.call_no"
									}
								});
							}
						},
						schema : {
							parse : function (response) {
								return [response.outputparam_header];
							}
						}
					});
					generate_pwclaim.read();
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_call_register_se.variable.custom.selectedFeatureID == "generate_tada_claim") {
				if (mserviceUtilities.loadJSScripts(["../../s_iscripts/custominfo_setDetail.js"])) {
					if (manage_call_register_se.variable.custom.grid_1.select().length != 0) {
						var returnValue = common_modules_custominfo_setDetail.invokeAPI({
							p_custom_info_code : "tada_claim",
							p_custom_info_ref_no1: "",
							p_custom_info_ref_no2: "",
							p_inputparam_header_xml : "<inputparam><request_category>TADA</request_category><request_type>" + manage_call_register_se.variable.custom.selectedRecord.call_type +"</request_type><call_ref_no>" + manage_call_register_se.variable.custom.selectedRecord.call_no +"</call_ref_no></inputparam>",
							p_rec_timestamp : "00000000-0000-0000-0000-000000000000",
							p_save_mode : "A",
							inputparam_detail : []
						});
						if (returnValue.update_status == "SP001") {
							alert("TADA is generated successfully.");
							return true;
						} else {
							alert("Failed to generate TADA.");
							return false;
						};
					} else {
						alert("No row has been selected.");
						return false;
					}
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		workflow_btn_click : function (element, event) {
			var allowedWorkflowArray;
			if (manage_call_register_se.variable.custom.grid_1.select().length != 0) {
				if(element.getAttribute("data-button-type") == "form_handler"){
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_form_handler.js"])) {
						my_calls = {
							variable : {
								selectedRecord : {}
							}
						};
						manage_call_register_se.variable.custom.myCallData = mserviceUtilities.getTransportPagingDataSource({
							applicationName : "common_modules",
							serviceName : "retrieve_manage_custom_info_list",
							outputPath : "outputparam_detail",
							api : true,
							pageSize : 50,
							inputParameter : {
								p_custom_info_code : "'retrieve_my_calls'",
								p_inputparam_xml : "'<inputparam><assigned_to_emp_id_filter>" + login_profile.emp_id +"</assigned_to_emp_id_filter><call_ref_no_filter>" + manage_call_register_se.variable.custom.selectedRecord.call_no + "</call_ref_no_filter></inputparam>'"
							},
							screenID : "manage_call_register_se"
						});
						manage_call_register_se.variable.custom.myCallData.read();
						if(manage_call_register_se.variable.custom.myCallData.data().length != 0){
							my_calls.variable.selectedRecord = manage_call_register_se.variable.custom.myCallData.data()[0];
						}
						form_handler.variable.template = element.getAttribute("data-button-role");
						form_handler.variable.transNo = manage_call_register_se.variable.custom.selectedRecord.call_no;
						form_handler.variable.attachInd = "C";
						form_handler.variable.taskID = "0";
						$("#manage_call_register_se_grid_1").append("<div id = 'manage_call_register_se_form_handler_window'><div id = 'manage_call_register_se_form_handler_loader' style='width: 100%; height: 90%;' ></div></div>");
						$("#manage_call_register_se_form_handler_window").kendoWindow({
							width : (screen.width * 0.30),
							height : (screen.height * 0.75),
							title : manage_call_register_se.variable.custom.nextScreenName,
							visible : false,
							modal : true,
							deactivate : function () {
								eval("delete form_handler");
								eval("delete formHandlerRuleEngine");
								this.destroy();
							},
						});
						$.ajax({
							url : mserviceUtilities.getWebserverpath() + "webui/html/form_handler.html",
							async : false,
							dataType : "text",
							cache : true
						}).done(function (data) {
							try {
								$("#manage_call_register_se_form_handler_loader").append(data);
								form_handler.constructScreen();
								$("#manage_call_register_se_form_handler_window").data("kendoWindow").center().open();
								$(".k-overlay").css("opacity", "0.8");
							} catch (ex) {
								alert("Sorry. This feature is unavailable. Please contact your support desk.");
								eval("delete form_handler");
								eval("delete formHandlerRuleEngine");
								$("#manage_call_register_se_form_handler_window").data("kendoWindow").destroy();
								return false;
							}
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact your support desk.");
						return false;
					}
				} else { 
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_se_wfeventverb_status_change.js", "../../s_iscripts/update_call_wfeventverb_status_change.js"])) {
						manage_call_register_se.variable.custom.selectedRecord = manage_call_register_se.variable.custom.grid_1.dataSource.getByUid(manage_call_register_se.variable.custom.grid_1.select().data("uid"));
						allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
								transactionType : "CALL",
								eventVerb : manage_call_register_se.variable.custom.selectedWorkflowEventVerb,
								requestCategory : manage_call_register_se.variable.custom.selectedRecord.call_category,
								requestType : manage_call_register_se.variable.custom.selectedRecord.call_type,
								fromStage : manage_call_register_se.variable.custom.selectedRecord.workflow_stage_no,
								fromStatus : manage_call_register_se.variable.custom.selectedRecord.call_status,
								currentFeatureId: manage_call_register_se.variable.custom.selectedRecord.last_accessed_feature
							});
						manage_call_register_se.variable.custom.selectedWorkflowToStage = "";
						manage_call_register_se.variable.custom.selectedWorkflowToStatus = "";
						if (allowedWorkflowArray.length != 0) {
							manage_call_register_se.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
							manage_call_register_se.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
							manage_call_register_se.variable.custom.selectedCallLoggedDate = mserviceUtilities.getDateObject({
									dateString : manage_call_register_se.variable.custom.selectedRecord.created_on_date,
									hourString : manage_call_register_se.variable.custom.selectedRecord.created_on_hour,
									minuteString : manage_call_register_se.variable.custom.selectedRecord.created_on_minute
								});
							manage_call_register_se.variable.custom.selectedActualStartDate = mserviceUtilities.getDateObject({
									dateString : manage_call_register_se.variable.custom.selectedRecord.act_start_on_date,
									hourString : manage_call_register_se.variable.custom.selectedRecord.act_start_on_hour,
									minuteString : manage_call_register_se.variable.custom.selectedRecord.act_start_on_minute
								});
							manage_call_register_se.variable.custom.selectedScheduledStartDate = mserviceUtilities.getDateObject({
									dateString : manage_call_register_se.variable.custom.selectedRecord.sch_start_on_date,
									hourString : manage_call_register_se.variable.custom.selectedRecord.sch_start_on_hour,
									minuteString : manage_call_register_se.variable.custom.selectedRecord.sch_start_on_minute
								});
							manage_call_register_se.variable.custom.selectedScheduledFinishDate = mserviceUtilities.getDateObject({
									dateString : manage_call_register_se.variable.custom.selectedRecord.sch_finish_on_date,
									hourString : manage_call_register_se.variable.custom.selectedRecord.sch_finish_on_hour,
									minuteString : manage_call_register_se.variable.custom.selectedRecord.sch_finish_on_minute
								});
							webNavigationController.gotoNextScreen({
								screenID : "manage_call_register_se",
								fieldID : "manage_call_register_se_child_window",
								nextScreenID : "manage_call_register_se_wfeventverb_status_change",
								nextScreenName : manage_call_register_se.variable.custom.nextScreenName,
								execute : manage_call_register_se_wfeventverb_status_change.constructScreen
							});
						} else {
							alert("Sorry. This feature is unavailable for the selected record.");
							return false;
						}
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				}
			} else {
				alert("No row has been selected.");
				return false;
			}
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_call_register_se_contextMenu").data("kendoContextMenu").open(element);
			manage_call_register_se.variable.custom.contextChildElement = $('#manage_call_register_se_contextMenu').children();
			for (i = 0; i < manage_call_register_se.variable.custom.contextChildElement.length; i++){
				if (manage_call_register_se.variable.custom.contextChildElement[i].dataset.buttonGroup == 'workflow'){
					$('#' + screenID + '_'+ manage_call_register_se.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').hide();
				}
			}
			manage_call_register_se.variable.custom.selectedRecord = manage_call_register_se.variable.custom.grid_1.dataSource.getByUid(manage_call_register_se.variable.custom.grid_1.select().data("uid"));
			allowedWorkflowArray = mserviceUtilities.getAllowedWorkflowEventVerbs({
					transactionType : "CALL",
					requestCategory : manage_call_register_se.variable.custom.selectedRecord.call_category,
					requestType : manage_call_register_se.variable.custom.selectedRecord.call_type,
					fromStage : manage_call_register_se.variable.custom.selectedRecord.workflow_stage_no,
					fromStatus : manage_call_register_se.variable.custom.selectedRecord.call_status,
					currentFeatureId: manage_call_register_se.variable.custom.selectedRecord.last_accessed_feature
				});
				
			for (workFlowLength = 0; workFlowLength < allowedWorkflowArray.length; workFlowLength ++){
				currentFeature  = allowedWorkflowArray[workFlowLength].child_screen_id;
				for (i = 0; i < manage_call_register_se.variable.custom.contextChildElement.length; i++){
					if (manage_call_register_se.variable.custom.contextChildElement[i].dataset.buttonRole == currentFeature ){
						$('#' + screenID + '_'+ manage_call_register_se.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').show();
						break;
					}
				} 
			}
			$("#manage_call_register_se_contextMenu").show();
			var columnData = $.grep(manage_call_register_se.variable.custom.contextChildElement, function (data) {
				if($('#' + data.id ).is(':visible')){ $('#' + data.id ).css("display","inline-block").css("min-width","180px"); }
				return $('#' + data.id ).is(':visible');
			});
			var columnCount = parseInt(columnData.length / 6);
			if((columnData.length % 6) != 0){ 
				columnCount = columnCount + 1;
			}
			$("#manage_call_register_se_contextMenu").css("columns", columnCount.toString()).css("width", "min-content");
		},
		expdoc_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_expdoc_header.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_expdoc_header";
				});
				manage_expdoc_header.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_call_register_se",
					nextScreenID : "manage_expdoc_header",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_call_register_se").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_call_register_se"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_expdoc_header"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_expdoc_header";
				webNavigationController.buildBreadCrumb();
				$("#manage_expdoc_header_expdoc_number_filter").setVal($(element).text());
				manage_expdoc_header.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		pwclaim_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_pwclaim_header.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_pwclaim_header";
				});
				manage_pwclaim_header.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_call_register_se",
					nextScreenID : "manage_pwclaim_header",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_call_register_se").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_call_register_se"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_pwclaim_header"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_pwclaim_header";
				webNavigationController.buildBreadCrumb();
				$("#manage_pwclaim_header_pwclaim_number_filter").setVal($(element).text());
				manage_pwclaim_header.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		 call_job_reference_link_click: function (element, event) {
            if ($(element).text() != "") {
                var screenObjectCatg = $(element).attr('data-link-catg');
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_"+ screenObjectCatg +".js"])) {
					var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
						return element.child_screen_id == "manage_call_register_"+ screenObjectCatg;
					});
					eval("manage_call_register_"+ screenObjectCatg).variable.custom.linkRefInd = "true";
					webNavigationController.gotoNextScreen({
						screenID : screenID,
						nextScreenID : "manage_call_register_"+ screenObjectCatg,
						nextScreenName : nextScreenProperties[0].child_feature_display_label
					});
					$("#"+screenID).remove();
					for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
						if(webNavigationController.variable.navigationMap[index].screenID == screenID){
							webNavigationController.variable.navigationMap.splice(index,1);
						}
						if(webNavigationController.variable.navigationMap[index].screenID == "manage_call_register_"+screenObjectCatg){
							webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
						}
					}
					screenID = "manage_call_register_"+ screenObjectCatg;
					webNavigationController.buildBreadCrumb();
					$("#manage_call_register_" +screenObjectCatg+ "_call_number_filter").setVal($(element).text());
					eval("manage_call_register_"+screenObjectCatg).variable.custom.grid_1.dataSource.read();
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
            };
        },
		quotation_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_quotation_master_service_spares.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_quotation_master_service_spares";
				});
				manage_quotation_master_service_spares.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_call_register_se",
					nextScreenID : "manage_quotation_master_service_spares",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_call_register_se").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_call_register_se"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_quotation_master_service_spares"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_quotation_master_service_spares";
				webNavigationController.buildBreadCrumb();
				$("#manage_quotation_master_service_spares_quotation_number_filter").setVal($(element).text());
				manage_quotation_master_service_spares.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_call_register_se_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_call_register_se_grid_1").find(".k-grid-header").height()).css("width", $("#manage_call_register_se_grid_1").width() - $("#manage_call_register_se_grid_1").find(".k-grid-content-locked").width());
			$("#manage_call_register_se_grid_1").find(".k-grid-content-locked").css("height", 498 - $("#manage_call_register_se_grid_1").find(".k-grid-header").height()).css("overflow-x","scroll");
			$("#manage_call_register_se_grid_1").css("overflow-x","hidden");
		},
		getFilterValues : function () {
			return $("#manage_call_register_se_content_1").getInputparamXML({
				screenID : "manage_call_register_se",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_call_register_se.variable.custom.selectedRecord = manage_call_register_se.variable.custom.grid_1.dataSource.getByUid(manage_call_register_se.variable.custom.grid_1.select().data("uid"));
		},
		validateAccess : function (buttonId) {
			if (login_profile.user_group_id == "clientadmn" || login_profile.user_group_id == "sadmn") {
				return true;
			} else {
				var featureArray = $.grep(access_profile.user_functional_access, function (element, index) {
						return (element.child_screen_id == $(buttonId).attr('data-button-role'));
					});
				var callObject = manage_call_register_se.variable.custom.selectedRecord;
				manage_call_register_se.variable.custom.datasource_2.read();
				if ((callObject.assigned_to_emp_id == undefined || callObject.assigned_to_emp_id == "") || (callObject.assigned_to_emp_id == login_profile.emp_id || callObject.assignee_mapped_to_emp_id == login_profile.emp_id)) {
					var validateAccessArray = $.grep(manage_call_register_se.variable.custom.datasource_2.data(), function (element, index) {
							return (element.trans == "CALL" && element.catg == callObject.call_category && element.type == callObject.call_type && (element.feature == featureArray[0].child_feature_id_or_group || element.feature == "ALL") && element.role_ind == "FR" && element.role_id == login_profile.functional_role_id && element.allow_rest_ind == "R");
						});
					if (validateAccessArray.length == 0) {
						validateAccessArray = $.grep(manage_call_register_se.variable.custom.datasource_2.data(), function (element, index) {
								return (element.trans == "CALL" && element.catg == callObject.call_category && element.type == "ALL" && (element.feature == featureArray[0].child_feature_id_or_group || element.feature == "ALL") && element.role_ind == "FR" && element.role_id == login_profile.functional_role_id && element.allow_rest_ind == "R");
							});
						if (validateAccessArray.length == 0) {
							validateAccessArray = $.grep(manage_call_register_se.variable.custom.datasource_2.data(), function (element, index) {
									return (element.trans == "CALL" && element.catg == "ALL" && element.type == "ALL" && (element.feature == featureArray[0].child_feature_id_or_group || element.feature == "ALL") && element.role_ind == "FR" && element.role_id == login_profile.functional_role_id && element.allow_rest_ind == "R");
								});
							if (validateAccessArray.length != 0) {
								return false;
							}
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					var validateAccessArray = $.grep(manage_call_register_se.variable.custom.datasource_2.data(), function (element, index) {
							return (element.trans == "CALL" && element.catg == callObject.call_category && element.type == callObject.call_type && (element.feature == featureArray[0].child_feature_id_or_group || element.feature == "ALL") && element.role_ind == "FR" && element.role_id == login_profile.functional_role_id && element.allow_rest_ind == "A");
						});
					if (validateAccessArray.length == 0) {
						validateAccessArray = $.grep(manage_call_register_se.variable.custom.datasource_2.data(), function (element, index) {
								return (element.trans == "CALL" && element.catg == callObject.call_category && element.type == "ALL" && (element.feature == featureArray[0].child_feature_id_or_group || element.feature == "ALL") && element.role_ind == "FR" && element.role_id == login_profile.functional_role_id && element.allow_rest_ind == "A");
							});
						if (validateAccessArray.length == 0) {
							validateAccessArray = $.grep(manage_call_register_se.variable.custom.datasource_2.data(), function (element, index) {
									return (element.trans == "CALL" && element.catg == "ALL" && element.type == "ALL" && (element.feature == featureArray[0].child_feature_id_or_group || element.feature == "ALL") && element.role_ind == "FR" && element.role_id == login_profile.functional_role_id && element.allow_rest_ind == "A");
								});
							if (validateAccessArray.length == 0) {
								return false;
							}
						}
					}
				}
				return true;
			}
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_call_register_se_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_call_register_se",
					service : "sp_retrieve_manage_call_register",
					request : "<signature><i_inputparam_xml>" + manage_call_register_se.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_call_register_se.variable.custom.grid_1.dataSource.data().length
				};
			}
		}
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 1
				}
			],
			importConfiguration : {
				informationType : 'call_register_se'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_call_register_se_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_call_register_se_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			customerUserCustomerID : ""
		}
	}
};
var manage_call_register = {
	constructScreen : function () {
		manage_call_register.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "mservice",
				serviceName : "retrieve_manage_call_register",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "manage_call_register.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_call_register",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
		manage_call_register.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				outputPath : "context/outputparam",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'COMP_FEATURE_ACCESS_AUTH_LIST'</lov_code_type></inputparam>"
				},
				screenID : "manage_call_register",
			});
		if (login_profile.user_group_type == "CU") {
			manage_call_register.variable.custom.customerUserDetails = mserviceUtilities.getTransportDataSource({
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
			manage_call_register.variable.custom.customerUserDetails.read();
			if (manage_call_register.variable.custom.customerUserDetails.data()[0] != undefined) {
				manage_call_register.variable.custom.customerUserCustomerID = manage_call_register.variable.custom.customerUserDetails.data()[0].p_value_field_1;
			}
		}
	},
	postConstruct : function () {
		manage_call_register_filterArea = $("#manage_call_register_pane2");
		$("#manage_call_register_content_1 span dt").removeClass("term_one");
		$("#manage_call_register_content_1 span dt").removeClass("term_two");
		$("#manage_call_register_content_1 span dd.colen").html("");
		$("#manage_call_register_content_1").find('dt').css("width","120px");
		$("#manage_call_register_editor").append("<li id='manage_call_register_grid_pager'></li>");
		$("#manage_call_register_grid_pager").append($("#manage_call_register_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_call_register_grid_1").data("kendoGrid").bind("dataBound", manage_call_register.customRequirementHandler.gridPager);
		if(manage_call_register.variable.custom.autoLoadInd == "true") {
			manage_call_register.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_call_register_splitter[manage_call_register_filterArea.width() > 0 ? "collapse" : "expand"](manage_call_register_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_call_register_content_1",
					screenID : "manage_call_register",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_call_register_content_1",
				screenID : "manage_call_register",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_call_register.variable.custom.grid_1 = $("#manage_call_register_grid_1").initializeWGrid({
				screenID : "manage_call_register",
				dataSource : manage_call_register.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_call_register_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_call_register_editor").kendoMenu();		
		manage_call_register_splitter = $("#manage_call_register_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_call_register.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_call_register.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_call_register.variable.custom.crudIndicator == "R") {
				manage_call_register.variable.custom.grid_1.dataSource._skip = 0;
				manage_call_register.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_edit.js", "../../s_iscripts/save_manage_call_register.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_call_register",
						nextScreenID : "manage_call_register_edit",
						nextScreenName : manage_call_register.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_call_register.variable.custom.miscID == "filters"){
				manage_call_register_splitter[manage_call_register_filterArea.width() > 0 ? "collapse" : "expand"](manage_call_register_filterArea);
			}
			if(manage_call_register.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_call_register_content_1",
					screenID : "manage_call_register",
					matchCondition : ["_filter"]
				});
				$("#manage_call_register_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_call_register.variable.custom.selectedFeatureID == "manage_user_attachments") {
				if (manage_call_register.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register.customRequirementHandler.validateAccess(element)) {
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments.js"])) {
							manage_user_attachments.variable.standard.configurationParam = "CALL";
							manage_user_attachments.variable.custom.project_task_level_ind = "C";
							manage_user_attachments.variable.custom.project_id = manage_call_register.variable.custom.selectedRecord.call_no;
							manage_user_attachments.variable.custom.template_id = "";
							manage_user_attachments.variable.custom.task_id = "0";
							manage_user_attachments.variable.custom.project_status_defaultValue = manage_call_register.variable.custom.selectedRecord.call_status_desc;
							webNavigationController.gotoNextScreen({
								screenID : "manage_call_register",
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
			} else if (manage_call_register.variable.custom.selectedFeatureID == "view_calendar") {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_view_calendar.js", "../../s_iscripts/retrieve_calendar.js"])) {
					displayLabel = 'Calendar';
					$.get('view_calendar.html', function (data) {
						$("#manage_call_register").hide();
						$("#container").append(data);
						fn_view_calendar();
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact support desk.");
					return false;
				}
			} else if (manage_call_register.variable.custom.selectedFeatureID == "manage_call_resource_update") {
				if (manage_call_register.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register.customRequirementHandler.validateAccess(element)) {
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_resource_update.js", "../../s_iscripts/update_project_resourcelist_detail.js"])) {
							webNavigationController.gotoNextScreen({
								screenID : "manage_call_register",
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
			} else if (manage_call_register.variable.custom.selectedFeatureID == "manage_call_sparepart_update") {
				if (manage_call_register.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register.customRequirementHandler.validateAccess(element)) {
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_sparepart_update.js", "../../s_iscripts/update_inventory_consumption.js"])) {
							webNavigationController.gotoNextScreen({
								screenID : "manage_call_register",
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
			} else if (manage_call_register.variable.custom.selectedFeatureID == "track_employee_geolocation") {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_track_employee_geolocation.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_call_register",
						nextScreenID : "track_employee_geolocation",
						nextScreenName : "Track Employee Geolocation"
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact support desk.");
					return false;
				}
			} else if (manage_call_register.variable.custom.selectedFeatureID == "generate_service_coupon") {
				if (manage_call_register.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register.customRequirementHandler.validateAccess(element)) {
						manage_call_register.variable.custom.selectedRecord = manage_call_register.variable.custom.grid_1.dataSource.getByUid(manage_call_register.variable.custom.grid_1.select().data("uid"));
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_service_coupon.js"])) {
							manage_call_register.variable.custom.visit_template_id = mserviceUtilities.getTransportDataSource({
									applicationName : "common_modules",
									serviceName : "retrieve_listof_values_for_searchcondition",
									inputParameter : {
										p_inputparam_xml : "'<inputparam><lov_code_type>VISITTEMPLATEID</lov_code_type><search_field_1>" + manage_call_register.variable.custom.selectedRecord.call_no + "</search_field_1></inputparam>'"
									},
								});
							manage_call_register.variable.custom.visit_template_id.read();
							if (manage_call_register.variable.custom.visit_template_id.data().length != 0) {
								generate_service_coupon.variable.custom.document_type = "AssetServiceVisitSchedule";
								generate_service_coupon.variable.custom.document_template = manage_call_register.variable.custom.visit_template_id.data()[0].visittemplateid,
								generate_service_coupon.variable.custom.retrieve_service_name = "/mservice/retrieve_asset_service_visit_schedule_for_docgen";
								generate_service_coupon.variable.custom.retrieve_service_inputparam = "<inputparam>";
								generate_service_coupon.variable.custom.retrieve_service_inputparam += "<p_inputparam_xml>";
								generate_service_coupon.variable.custom.retrieve_service_inputparam += getXmlString("<call_no>" + manage_call_register.variable.custom.selectedRecord.call_no + "</call_no>");
								generate_service_coupon.variable.custom.retrieve_service_inputparam += getXmlString("<asset_id>" + manage_call_register.variable.custom.selectedRecord.asset_id + "</asset_id>");
								generate_service_coupon.variable.custom.retrieve_service_inputparam += "</p_inputparam_xml>";
								generate_service_coupon.variable.custom.retrieve_service_inputparam += "</inputparam>";
								generate_service_coupon.variable.custom.output_file_path = "/content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/";
								generate_service_coupon.variable.custom.output_file_name = manage_call_register.variable.custom.visit_template_id.data()[0].visitreportno;
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
										screenID : "manage_call_register",
										fieldID : "manage_call_register_child_window",
										nextScreenID : "generate_service_coupon",
										nextScreenName : manage_call_register.variable.custom.nextScreenName,
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
			} else if (manage_call_register.variable.custom.selectedFeatureID == "generate_expense_document") {
				if (manage_call_register.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register.customRequirementHandler.validateAccess(element)) {
						manage_call_register.variable.custom.selectedRecord = manage_call_register.variable.custom.grid_1.dataSource.getByUid(manage_call_register.variable.custom.grid_1.select().data("uid"));
						if (mserviceUtilities.loadJSScripts(["../../s_iscripts/generate_expense_document.js"])) {
							if (confirm("Are you sure do you want to generate expense document for this call ?")) {
								var returnValue;
								returnValue = executeService_generate_expense_document({
										p_call_jo_project_ind : "C",
										p_call_jo_project_ref_no : manage_call_register.variable.custom.selectedRecord.call_no
									});
								if (returnValue.update_status == "SP001") {
									alert("Expense Document generated successfully. Your Expense Document reference number is " + returnValue.expense_doc_ref_no);
									manage_call_register.variable.custom.grid_1.dataSource.pageSize(50);
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
			} else if (manage_call_register.variable.custom.selectedFeatureID == "manage_call_stockout") {
				if (manage_call_register.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register.customRequirementHandler.validateAccess(element)) {
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_stockout.js", "../../s_iscripts/update_call_wfeventverb_status_change.js"])) {
							var allowedWorkflowArray;
							manage_call_register.variable.custom.selectedRecord = manage_call_register.variable.custom.grid_1.dataSource.getByUid(manage_call_register.variable.custom.grid_1.select().data("uid"));
							allowedWorkflowArray = mserviceUtilities.getWorkflowEventVerbs({
									eventVerb : "MATLISSUE",
									requestCategory : manage_call_register.variable.custom.selectedRecord.call_category,
									requestType : manage_call_register.variable.custom.selectedRecord.call_type,
									fromStage : manage_call_register.variable.custom.selectedRecord.workflow_stage_no,
									fromStatus : manage_call_register.variable.custom.selectedRecord.call_status
								});
							manage_call_register.variable.custom.selectedWorkflowToStage = "";
							manage_call_register.variable.custom.selectedWorkflowToStatus = "";
							if (allowedWorkflowArray.length != 0) {
								manage_call_register.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
								manage_call_register.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
								manage_call_register.variable.custom.selectedCallLoggedDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register.variable.custom.selectedRecord.created_on_date,
										hourString : manage_call_register.variable.custom.selectedRecord.created_on_hour,
										minuteString : manage_call_register.variable.custom.selectedRecord.created_on_minute
									});
								manage_call_register.variable.custom.selectedActualStartDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register.variable.custom.selectedRecord.act_start_on_date,
										hourString : manage_call_register.variable.custom.selectedRecord.act_start_on_hour,
										minuteString : manage_call_register.variable.custom.selectedRecord.act_start_on_minute
									});
								manage_call_register.variable.custom.selectedScheduledStartDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register.variable.custom.selectedRecord.sch_start_on_date,
										hourString : manage_call_register.variable.custom.selectedRecord.sch_start_on_hour,
										minuteString : manage_call_register.variable.custom.selectedRecord.sch_start_on_minute
									});
								manage_call_register.variable.custom.selectedScheduledFinishDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register.variable.custom.selectedRecord.sch_finish_on_date,
										hourString : manage_call_register.variable.custom.selectedRecord.sch_finish_on_hour,
										minuteString : manage_call_register.variable.custom.selectedRecord.sch_finish_on_minute
									});
								webNavigationController.gotoNextScreen({
									screenID : "manage_call_register",
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
			} else if (manage_call_register.variable.custom.selectedFeatureID == "manage_call_stockin") {
				if (manage_call_register.variable.custom.grid_1.select().length != 0) {
					if (manage_call_register.customRequirementHandler.validateAccess(element)) {
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_stockin.js", "../../s_iscripts/update_call_wfeventverb_status_change.js"])) {
							var allowedWorkflowArray;
							manage_call_register.variable.custom.selectedRecord = manage_call_register.variable.custom.grid_1.dataSource.getByUid(manage_call_register.variable.custom.grid_1.select().data("uid"));
							allowedWorkflowArray = mserviceUtilities.getWorkflowEventVerbs({
									eventVerb : "MATLRECEIPT",
									requestCategory : manage_call_register.variable.custom.selectedRecord.call_category,
									requestType : manage_call_register.variable.custom.selectedRecord.call_type,
									fromStage : manage_call_register.variable.custom.selectedRecord.workflow_stage_no,
									fromStatus : manage_call_register.variable.custom.selectedRecord.call_status
								});
							manage_call_register.variable.custom.selectedWorkflowToStage = "";
							manage_call_register.variable.custom.selectedWorkflowToStatus = "";
							if (allowedWorkflowArray.length != 0) {
								manage_call_register.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
								manage_call_register.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
								manage_call_register.variable.custom.selectedCallLoggedDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register.variable.custom.selectedRecord.created_on_date,
										hourString : manage_call_register.variable.custom.selectedRecord.created_on_hour,
										minuteString : manage_call_register.variable.custom.selectedRecord.created_on_minute
									});
								manage_call_register.variable.custom.selectedActualStartDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register.variable.custom.selectedRecord.act_start_on_date,
										hourString : manage_call_register.variable.custom.selectedRecord.act_start_on_hour,
										minuteString : manage_call_register.variable.custom.selectedRecord.act_start_on_minute
									});
								manage_call_register.variable.custom.selectedScheduledStartDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register.variable.custom.selectedRecord.sch_start_on_date,
										hourString : manage_call_register.variable.custom.selectedRecord.sch_start_on_hour,
										minuteString : manage_call_register.variable.custom.selectedRecord.sch_start_on_minute
									});
								manage_call_register.variable.custom.selectedScheduledFinishDate = mserviceUtilities.getDateObject({
										dateString : manage_call_register.variable.custom.selectedRecord.sch_finish_on_date,
										hourString : manage_call_register.variable.custom.selectedRecord.sch_finish_on_hour,
										minuteString : manage_call_register.variable.custom.selectedRecord.sch_finish_on_minute
									});
								webNavigationController.gotoNextScreen({
									screenID : "manage_call_register",
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
			} else if (manage_call_register.variable.custom.selectedFeatureID == "customer_feedback") {
				if (manage_call_register.variable.custom.grid_1.select().length != 0) {
					$.ajax({
					url : mserviceUtilities.getWebserverpath() + "feedback/feedback_web.html?call_ref_no=" + manage_call_register.variable.custom.selectedRecord.call_no,
					async : false,
					cache : false
					}).done(function (data) {
						$("#manage_call_register_child_window").append("<div id='manage_call_register_child_window_feedback'><div>" + data + "</div></div>");
						$("#manage_call_register_child_window_feedback").kendoWindow({
							width : "80%",
							height : "70%",
							title : "Customer Feedback",
							visible : false,
							modal : true,
							deactivate : function () {
								this.destroy();
							},
						});
						$("#manage_call_register_child_window_feedback").data("kendoWindow").center().open();
						$("#overallCommission").getKendoSlider().wrapper.css("width", "400px");
						$("#overallCommission").getKendoSlider().resize();
						$("#techie_competency_level").getKendoSlider().wrapper.css("width", "400px");
						$("#techie_competency_level").getKendoSlider().resize();
						$("#response_support_rendered").getKendoSlider().wrapper.css("width", "400px");
						$("#response_support_rendered").getKendoSlider().resize();
						$("#prod_performance").getKendoSlider().wrapper.css("width", "400px");
						$("#prod_performance").getKendoSlider().resize();
						$("#satisfied_with_acopco").getKendoSlider().wrapper.css("width", "400px");
						$("#satisfied_with_acopco").getKendoSlider().resize();
						$("#recommend_acopco_to_friend").getKendoSlider().wrapper.css("width", "400px");
						$("#recommend_acopco_to_friend").getKendoSlider().resize();
					}).fail(function (){
						alert("Sorry. This feature is unavailable. Please contact support desk.");
					});
				} else {
					alert("No row has been selected");
					return false;
				}
			}
		},
		workflow_btn_click : function (element, event) {
			var allowedWorkflowArray;
			if (manage_call_register.variable.custom.grid_1.select().length != 0) {
				/*manage_call_register.variable.custom.validateCallAccess = mserviceUtilities.getTransportDataSource({
						applicationName : "common_modules",
						serviceName : "retrieve_listof_values_for_searchcondition",
						outputPath : "context/outputparam",
						inputParameter : {
							p_inputparam_xml : "<inputparam><lov_code_type>'VALIDATE_CALL_ACCESS'</lov_code_type><search_field_1>$manage_call_register.variable.custom.selectedRecord.call_no</search_field_1><search_field_2>'WEB'</search_field_2></inputparam>"
						},
						screenID : "manage_call_register",
					});
				manage_call_register.variable.custom.validateCallAccess.read();
				if (manage_call_register.variable.custom.validateCallAccess.data()[0].access_ind == "1") {
					if (confirm("Your update may be overwritten by the update from the mobile.Do you wish to continue ?")) {*/
						if (manage_call_register.customRequirementHandler.validateAccess(element)) {
							if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_wfeventverb_status_change.js", "../../s_iscripts/update_call_wfeventverb_status_change.js"])) {
								manage_call_register.variable.custom.selectedRecord = manage_call_register.variable.custom.grid_1.dataSource.getByUid(manage_call_register.variable.custom.grid_1.select().data("uid"));
								allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
										transactionType : "CALL",
										eventVerb : manage_call_register.variable.custom.selectedWorkflowEventVerb,
										requestCategory : manage_call_register.variable.custom.selectedRecord.call_category,
										requestType : manage_call_register.variable.custom.selectedRecord.call_type,
										fromStage : manage_call_register.variable.custom.selectedRecord.workflow_stage_no,
										fromStatus : manage_call_register.variable.custom.selectedRecord.call_status
									});
								manage_call_register.variable.custom.selectedWorkflowToStage = "";
								manage_call_register.variable.custom.selectedWorkflowToStatus = "";
								if (allowedWorkflowArray.length != 0) {
									manage_call_register.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
									manage_call_register.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
									manage_call_register.variable.custom.selectedCallLoggedDate = mserviceUtilities.getDateObject({
											dateString : manage_call_register.variable.custom.selectedRecord.created_on_date,
											hourString : manage_call_register.variable.custom.selectedRecord.created_on_hour,
											minuteString : manage_call_register.variable.custom.selectedRecord.created_on_minute
										});
									manage_call_register.variable.custom.selectedActualStartDate = mserviceUtilities.getDateObject({
											dateString : manage_call_register.variable.custom.selectedRecord.act_start_on_date,
											hourString : manage_call_register.variable.custom.selectedRecord.act_start_on_hour,
											minuteString : manage_call_register.variable.custom.selectedRecord.act_start_on_minute
										});
									manage_call_register.variable.custom.selectedScheduledStartDate = mserviceUtilities.getDateObject({
											dateString : manage_call_register.variable.custom.selectedRecord.sch_start_on_date,
											hourString : manage_call_register.variable.custom.selectedRecord.sch_start_on_hour,
											minuteString : manage_call_register.variable.custom.selectedRecord.sch_start_on_minute
										});
									manage_call_register.variable.custom.selectedScheduledFinishDate = mserviceUtilities.getDateObject({
											dateString : manage_call_register.variable.custom.selectedRecord.sch_finish_on_date,
											hourString : manage_call_register.variable.custom.selectedRecord.sch_finish_on_hour,
											minuteString : manage_call_register.variable.custom.selectedRecord.sch_finish_on_minute
										});
									webNavigationController.gotoNextScreen({
										screenID : "manage_call_register",
										fieldID : "manage_call_register_child_window",
										nextScreenID : "manage_call_register_wfeventverb_status_change",
										nextScreenName : manage_call_register.variable.custom.nextScreenName,
										execute : manage_call_register_wfeventverb_status_change.constructScreen
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
					/*}
				} else {
					alert("This Call is been accessed by someother Service Engineer.");
					return false;
				}*/
			} else {
				alert("No row has been selected.");
				return false;
			}
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_call_register_contextMenu").data("kendoContextMenu").open(element);
			manage_call_register.variable.custom.contextChildElement = $('#manage_call_register_contextMenu').children();
			for (i = 0; i < manage_call_register.variable.custom.contextChildElement.length; i++){
				if (manage_call_register.variable.custom.contextChildElement[i].dataset.buttonGroup == 'workflow'){
					$('#' + screenID + '_'+ manage_call_register.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').hide();
				}
			}
			manage_call_register.variable.custom.selectedRecord = manage_call_register.variable.custom.grid_1.dataSource.getByUid(manage_call_register.variable.custom.grid_1.select().data("uid"));
			allowedWorkflowArray = mserviceUtilities.getAllowedWorkflowEventVerbs({
					transactionType : "CALL",
					requestCategory : manage_call_register.variable.custom.selectedRecord.call_category,
					requestType : manage_call_register.variable.custom.selectedRecord.call_type,
					fromStage : manage_call_register.variable.custom.selectedRecord.workflow_stage_no,
					fromStatus : manage_call_register.variable.custom.selectedRecord.call_status
				});
			for (workFlowLength = 0; workFlowLength < allowedWorkflowArray.length; workFlowLength ++){
				currentFeature  = allowedWorkflowArray[workFlowLength].child_screen_id;
				for (i = 0; i < manage_call_register.variable.custom.contextChildElement.length; i++){
					if (manage_call_register.variable.custom.contextChildElement[i].dataset.buttonRole == currentFeature ){
						$('#' + screenID + '_'+ manage_call_register.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').show();
						break;
					}
				} 
			}
			$("#manage_call_register_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_call_register_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_call_register_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_call_register_content_1").getInputparamXML({
				screenID : "manage_call_register",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_call_register.variable.custom.selectedRecord = manage_call_register.variable.custom.grid_1.dataSource.getByUid(manage_call_register.variable.custom.grid_1.select().data("uid"));
		},
		validateAccess : function (buttonId) {
			if (login_profile.user_group_id == "clientadmn" || login_profile.user_group_id == "sadmn") {
				return true;
			} else {
				var featureArray = $.grep(access_profile.user_functional_access, function (element, index) {
						return (element.child_screen_id == $(buttonId).attr('data-button-role'));
					});
				var callObject = manage_call_register.variable.custom.selectedRecord;
				manage_call_register.variable.custom.datasource_2.read();
				if ((callObject.assigned_to_emp_id == undefined || callObject.assigned_to_emp_id == "") || (callObject.assigned_to_emp_id == login_profile.emp_id || callObject.assignee_mapped_to_emp_id == login_profile.emp_id)) {
					var validateAccessArray = $.grep(manage_call_register.variable.custom.datasource_2.data(), function (element, index) {
							return (element.trans == "CALL" && element.catg == callObject.call_category && element.type == callObject.call_type && (element.feature == featureArray[0].child_feature_id_or_group || element.feature == "ALL") && element.role_ind == "FR" && element.role_id == login_profile.functional_role_id && element.allow_rest_ind == "R");
						});
					if (validateAccessArray.length == 0) {
						validateAccessArray = $.grep(manage_call_register.variable.custom.datasource_2.data(), function (element, index) {
								return (element.trans == "CALL" && element.catg == callObject.call_category && element.type == "ALL" && (element.feature == featureArray[0].child_feature_id_or_group || element.feature == "ALL") && element.role_ind == "FR" && element.role_id == login_profile.functional_role_id && element.allow_rest_ind == "R");
							});
						if (validateAccessArray.length == 0) {
							validateAccessArray = $.grep(manage_call_register.variable.custom.datasource_2.data(), function (element, index) {
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
					var validateAccessArray = $.grep(manage_call_register.variable.custom.datasource_2.data(), function (element, index) {
							return (element.trans == "CALL" && element.catg == callObject.call_category && element.type == callObject.call_type && (element.feature == featureArray[0].child_feature_id_or_group || element.feature == "ALL") && element.role_ind == "FR" && element.role_id == login_profile.functional_role_id && element.allow_rest_ind == "A");
						});
					if (validateAccessArray.length == 0) {
						validateAccessArray = $.grep(manage_call_register.variable.custom.datasource_2.data(), function (element, index) {
								return (element.trans == "CALL" && element.catg == callObject.call_category && element.type == "ALL" && (element.feature == featureArray[0].child_feature_id_or_group || element.feature == "ALL") && element.role_ind == "FR" && element.role_id == login_profile.functional_role_id && element.allow_rest_ind == "A");
							});
						if (validateAccessArray.length == 0) {
							validateAccessArray = $.grep(manage_call_register.variable.custom.datasource_2.data(), function (element, index) {
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
			if(gridId == "manage_call_register_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_call_register",
					service : "sp_retrieve_manage_call_register",
					request : "<signature><i_inputparam_xml>" + manage_call_register.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_call_register.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_call_register.variable.custom.grid_1.dataSource.data().length
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
				informationType : 'call_register'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_call_register_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_call_register_grid_1",
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
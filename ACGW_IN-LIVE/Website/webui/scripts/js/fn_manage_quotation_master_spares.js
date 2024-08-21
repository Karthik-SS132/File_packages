var manage_quotation_master_spares = {
	constructScreen : function () {
		manage_quotation_master_spares.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
			applicationName : "salesinvoice",
			serviceName : "retrieve_manage_quotation_list",
			outputPath : "outputparam_detail",
			api : true,
			pageSize : 50,
			inputParameter : {
				p_inputparam_xml : "manage_quotation_master_spares.customRequirementHandler.getFilterValues()"
			},
			schemaModel : true,
			screenID : "manage_quotation_master_spares",
			dataSourceName : "datasource_1",
			processResponse : true,
			serverPaging : true
		});
	},
	postConstruct : function () {
		manage_quotation_master_spares_filterArea = $("#manage_quotation_master_spares_pane2");
		$("#manage_quotation_master_spares_content_1 span dt").removeClass("term_one");
		$("#manage_quotation_master_spares_content_1 span dd.colen").html("");
		$("#manage_quotation_master_spares_content_1").find('dt').css("width","120px");
		$("#manage_quotation_master_spares_editor").append("<li id='manage_quotation_master_spares_grid_pager'></li>");
		$("#manage_quotation_master_spares_grid_pager").append($("#manage_quotation_master_spares_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_quotation_master_spares_grid_1").data("kendoGrid").bind("dataBound", manage_quotation_master_spares.customRequirementHandler.gridPager);
		if(manage_quotation_master_spares.variable.custom.autoLoadInd == "true") {
			manage_quotation_master_spares.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_quotation_master_spares_splitter[manage_quotation_master_spares_filterArea.width() > 0 ? "collapse" : "expand"](manage_quotation_master_spares_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_quotation_master_spares_content_1",
					screenID : "manage_quotation_master_spares",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_quotation_master_spares_content_1",
				screenID : "manage_quotation_master_spares",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_quotation_master_spares.variable.custom.grid_1 = $("#manage_quotation_master_spares_grid_1").initializeWGrid({
				screenID : "manage_quotation_master_spares",
				dataSource : manage_quotation_master_spares.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
	   $("#manage_quotation_master_spares_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_quotation_master_spares_editor").kendoMenu();		
		manage_quotation_master_spares_splitter = $("#manage_quotation_master_spares_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_quotation_master_spares.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_quotation_master_spares.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_quotation_master_spares.variable.custom.crudIndicator == "R") {
				manage_quotation_master_spares.variable.custom.grid_1.dataSource._skip = 0;
				manage_quotation_master_spares.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_quotation_master_spares_edit.js", "../../s_iscripts/quotation_setDetail.js"])) {
					if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_quotation_spares_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
						mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_quotation_spares_" + login_profile.country_code + ".js"]);
					};
					webNavigationController.gotoNextScreen({
						screenID : "manage_quotation_master_spares",
						nextScreenID : "manage_quotation_master_spares_edit",
						nextScreenName : manage_quotation_master_spares.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_quotation_master_spares.variable.custom.miscID == "filters"){
				manage_quotation_master_spares_splitter[manage_quotation_master_spares_filterArea.width() > 0 ? "collapse" : "expand"](manage_quotation_master_spares_filterArea);
			}
			if(manage_quotation_master_spares.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_quotation_master_spares_content_1",
					screenID : "manage_quotation_master_spares",
					matchCondition : ["_filter"]
				});
				$("#manage_quotation_master_spares_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_quotation_master_spares.variable.custom.selectedFeatureID == "generate_quotation_pdf") {
				if (manage_quotation_master_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_quotation_spares_pdf.js"])) {
						if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_quotation_spares_pdf_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
							mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_quotation_spares_pdf_" + login_profile.country_code + ".js"]);
						};
						webNavigationController.gotoNextScreen({
							screenID : "manage_quotation_master_spares",
							fieldID : "manage_quotation_master_spares_child_window",
							nextScreenID : "generate_quotation_spares_pdf",
							nextScreenName : manage_quotation_master_spares.variable.custom.selectedRecord.quotation_no,
							windowHeight : 620,
							windowWidth : 600,
							execute : generate_quotation_spares_pdf.constructScreen
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_quotation_master_spares.variable.custom.selectedFeatureID == "regenerate_quotation") {
				if (manage_quotation_master_spares.variable.custom.grid_1.select().length != 0) {
					manage_quotation_master_spares.variable.custom.selectedRecord = manage_quotation_master_spares.variable.custom.grid_1.dataSource.getByUid(manage_quotation_master_spares.variable.custom.grid_1.select().data("uid"));
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/regenerate_quotation_document.js"])) {
						if (confirm("Are you sure do you want to re-generate this quotation ?")) {
							var returnValue;
							returnValue = executeService_regenerate_quotation_document({
									p_quotation_no : manage_quotation_master_spares.variable.custom.selectedRecord.quotation_no
								});
							if (returnValue.update_status == "SP001") {
								alert("Quotation Re-generated successfully. Your Quotation Document reference number is " + returnValue.requotation_doc_ref_no);
								manage_quotation_master_spares.variable.custom.grid_1.dataSource.pageSize(50);
								return true;
							} else {
								alert("Generation of Quotation Re-generation failed.");
								return false;
							}
						}
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_quotation_master_spares.variable.custom.selectedFeatureID == "manage_txn_event_log") {
				if (manage_quotation_master_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_txn_event_log.js"])) {
						manage_txn_event_log.variable.standard.configurationParam = "QUOTATION";
						manage_txn_event_log.variable.custom.txn_ref_no = manage_quotation_master_spares.variable.custom.selectedRecord.quotation_no;
						manage_txn_event_log.variable.custom.txn_status = manage_quotation_master_spares.variable.custom.selectedRecord.quotation_status_desc;
						manage_txn_event_log.variable.custom.txn_type_code = "QUOTATION";
						webNavigationController.gotoNextScreen({
							screenID : "manage_quotation_master_spares",
							nextScreenID : "manage_txn_event_log",
							nextScreenName : "Event Log"
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_quotation_master_spares.variable.custom.selectedFeatureID == "manage_user_attachments") {
				if (manage_quotation_master_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments.js"])) {
						manage_user_attachments.variable.standard.configurationParam = "QUOTATION";
						manage_user_attachments.variable.custom.project_task_level_ind = "Q";
						manage_user_attachments.variable.custom.project_id = manage_quotation_master_spares.variable.custom.selectedRecord.quotation_no;
						manage_user_attachments.variable.custom.template_id = "";
						manage_user_attachments.variable.custom.task_id = "0";
						manage_user_attachments.variable.custom.project_status_defaultValue = manage_quotation_master_spares.variable.custom.selectedRecord.quotation_status_desc;
						webNavigationController.gotoNextScreen({
							screenID : "manage_quotation_master_spares",
							nextScreenID : "manage_user_attachments",
							nextScreenName : "Attachments"
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			}  else if (manage_quotation_master_spares.variable.custom.selectedFeatureID == "CUSTOMERORDERWON") {
				if (manage_quotation_master_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_pe.js"])) {
						manage_quotation_master_spares.variable.custom.callRecord = mserviceUtilities.getTransportPagingDataSource({
							applicationName : "mservice",
							serviceName : "retrieve_manage_call_register",
							outputPath : "context/outputparam_detail", 
							pageSize : 1, 
							inputParameter : {
								p_inputparam_xml : "<inputparam><call_number_filter>'" + manage_quotation_master_spares.variable.custom.selectedRecord.call_ref_no + "'</call_number_filter></inputparam>"
							},
							screenID : "manage_quotation_master_spares",
							processResponse : true
						});
						manage_quotation_master_spares.variable.custom.callRecord.read();
						manage_call_register_pe.variable.custom.selectedRecord = manage_quotation_master_spares.variable.custom.callRecord.data()[0];
						manage_call_register_pe.variable.custom.selectedWorkflowEventVerb = manage_quotation_master_spares.variable.custom.selectedFeatureID;
						manage_call_register_pe.variable.custom.nextScreenName = "Order Won";
						manage_call_register_pe.variable.custom.selectedWorkflowToStage = "";
						manage_call_register_pe.variable.custom.selectedWorkflowToStatus = "";
						manage_call_register_pe.variable.custom.selectedCallLoggedDate = mserviceUtilities.getDateObject({
								dateString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].created_on_date,
								hourString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].created_on_hour,
								minuteString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].created_on_minute
							});
						manage_call_register_pe.variable.custom.selectedActualStartDate = mserviceUtilities.getDateObject({
								dateString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].act_start_on_date,
								hourString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].act_start_on_hour,
								minuteString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].act_start_on_minute
							});
						manage_call_register_pe.variable.custom.selectedScheduledStartDate = mserviceUtilities.getDateObject({
								dateString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_start_on_date,
								hourString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_start_on_hour,
								minuteString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_start_on_minute
							});
						manage_call_register_pe.variable.custom.selectedScheduledFinishDate = mserviceUtilities.getDateObject({
								dateString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_finish_on_date,
								hourString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_finish_on_hour,
								minuteString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_finish_on_minute
							});
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_pe_wfeventverb_status_change.js", "../../s_iscripts/update_call_wfeventverb_status_change.js"])) {
							allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
									transactionType : "CALL",
									eventVerb : manage_quotation_master_spares.variable.custom.selectedFeatureID,
									requestCategory : manage_quotation_master_spares.variable.custom.callRecord.data()[0].call_category,
									requestType : manage_quotation_master_spares.variable.custom.callRecord.data()[0].call_type,
									fromStage : manage_quotation_master_spares.variable.custom.callRecord.data()[0].workflow_stage_no,
									fromStatus : manage_quotation_master_spares.variable.custom.callRecord.data()[0].call_status
								});
							if (allowedWorkflowArray.length != 0) {
								manage_call_register_pe.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
								manage_call_register_pe.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
								webNavigationController.gotoNextScreen({
									screenID : "manage_quotation_master_spares",
									fieldID : "manage_quotation_master_spares_child_window",
									nextScreenID : "manage_call_register_pe_wfeventverb_status_change",
									nextScreenName : manage_call_register_pe.variable.custom.nextScreenName,
									execute : manage_call_register_pe_wfeventverb_status_change.constructScreen
								});
							} else {
								alert("Only Approved Quotation with Enquiry Status as Quotation Submitted are allowed.");
								return false;
							}
						} else {
							alert("Sorry. This feature is unavailable. Please contact support desk.");
							return false;
						}
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_quotation_master_spares.variable.custom.selectedFeatureID == "CUSTOMERORDERLOST") {
				if (manage_quotation_master_spares.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_pe.js"])) {
						manage_quotation_master_spares.variable.custom.callRecord = mserviceUtilities.getTransportPagingDataSource({
							applicationName : "mservice",
							serviceName : "retrieve_manage_call_register",
							outputPath : "context/outputparam_detail", 
							pageSize : 1, 
							inputParameter : {
								p_inputparam_xml : "<inputparam><call_number_filter>'" + manage_quotation_master_spares.variable.custom.selectedRecord.call_ref_no + "'</call_number_filter></inputparam>"
							},
							screenID : "manage_quotation_master_spares",
							processResponse : true
						});
						manage_quotation_master_spares.variable.custom.callRecord.read();
						manage_call_register_pe.variable.custom.selectedRecord = manage_quotation_master_spares.variable.custom.callRecord.data()[0];
						manage_call_register_pe.variable.custom.selectedWorkflowEventVerb = manage_quotation_master_spares.variable.custom.selectedFeatureID;
						manage_call_register_pe.variable.custom.nextScreenName = "Order Lost";
						manage_call_register_pe.variable.custom.selectedWorkflowToStage = "";
						manage_call_register_pe.variable.custom.selectedWorkflowToStatus = "";
						manage_call_register_pe.variable.custom.selectedCallLoggedDate = mserviceUtilities.getDateObject({
								dateString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].created_on_date,
								hourString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].created_on_hour,
								minuteString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].created_on_minute
							});
						manage_call_register_pe.variable.custom.selectedActualStartDate = mserviceUtilities.getDateObject({
								dateString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].act_start_on_date,
								hourString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].act_start_on_hour,
								minuteString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].act_start_on_minute
							});
						manage_call_register_pe.variable.custom.selectedScheduledStartDate = mserviceUtilities.getDateObject({
								dateString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_start_on_date,
								hourString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_start_on_hour,
								minuteString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_start_on_minute
							});
						manage_call_register_pe.variable.custom.selectedScheduledFinishDate = mserviceUtilities.getDateObject({
								dateString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_finish_on_date,
								hourString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_finish_on_hour,
								minuteString : manage_quotation_master_spares.variable.custom.callRecord.data()[0].sch_finish_on_minute
							});
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_pe_wfeventverb_status_change.js", "../../s_iscripts/update_call_wfeventverb_status_change.js"])) {
							allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
									transactionType : "CALL",
									eventVerb : manage_quotation_master_spares.variable.custom.selectedFeatureID,
									requestCategory : manage_quotation_master_spares.variable.custom.callRecord.data()[0].call_category,
									requestType : manage_quotation_master_spares.variable.custom.callRecord.data()[0].call_type,
									fromStage : manage_quotation_master_spares.variable.custom.callRecord.data()[0].workflow_stage_no,
									fromStatus : manage_quotation_master_spares.variable.custom.callRecord.data()[0].call_status
								});
							if (allowedWorkflowArray.length != 0) {
								manage_call_register_pe.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
								manage_call_register_pe.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
								webNavigationController.gotoNextScreen({
									screenID : "manage_quotation_master_spares",
									fieldID : "manage_quotation_master_spares_child_window",
									nextScreenID : "manage_call_register_pe_wfeventverb_status_change",
									nextScreenName : manage_call_register_pe.variable.custom.nextScreenName,
									execute : manage_call_register_pe_wfeventverb_status_change.constructScreen
								});
							} else {
								alert("Only Approved Quotation with Enquiry Status as Quotation Submitted are allowed.");
								return false;
							}
						} else {
							alert("Sorry. This feature is unavailable. Please contact support desk.");
							return false;
						}
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			}
		},
		workflow_btn_click : function (element, event) {
			var allowedWorkflowArray;
			if (manage_quotation_master_spares.variable.custom.grid_1.select().length != 0) {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_quotation_spares_wfeventverb_status_change.js", "../../s_iscripts/update_quotation_wfeventverb_status_change.js"])) {
					if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_quotation_spares_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
						mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_quotation_spares_" + login_profile.country_code + ".js"]);
					};
					allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
							transactionType : "QUOTATION",
							eventVerb : manage_quotation_master_spares.variable.custom.selectedWorkflowEventVerb,
							requestCategory : manage_quotation_master_spares.variable.custom.selectedRecord.quotation_category,
							requestType : manage_quotation_master_spares.variable.custom.selectedRecord.quotation_type,
							fromStage : manage_quotation_master_spares.variable.custom.selectedRecord.workflow_stage_no,
							fromStatus : manage_quotation_master_spares.variable.custom.selectedRecord.quotation_status
						});
					manage_quotation_master_spares.variable.custom.selectedWorkflowToStage = "";
					manage_quotation_master_spares.variable.custom.selectedWorkflowToStatus = "";
					if (allowedWorkflowArray.length != 0) {
						manage_quotation_master_spares.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
						manage_quotation_master_spares.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
						webNavigationController.gotoNextScreen({
							screenID : "manage_quotation_master_spares",
							fieldID : "manage_quotation_master_spares_child_window",
							nextScreenID : "manage_quotation_spares_wfeventverb_status_change",
							nextScreenName : manage_quotation_master_spares.variable.custom.nextScreenName,
							execute : manage_quotation_spares_wfeventverb_status_change.constructScreen
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
				alert("No row has been selected.");
				return false;
			}
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_quotation_master_spares_contextMenu").data("kendoContextMenu").open(element);
			manage_quotation_master_spares.variable.custom.contextChildElement = $('#manage_quotation_master_spares_contextMenu').children();
			for (i = 0; i < manage_quotation_master_spares.variable.custom.contextChildElement.length; i++){
				if (manage_quotation_master_spares.variable.custom.contextChildElement[i].dataset.buttonGroup == 'workflow'){
					$('#' + screenID + '_'+ manage_quotation_master_spares.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').hide();
				}
			}
			manage_quotation_master_spares.variable.custom.selectedRecord = manage_quotation_master_spares.variable.custom.grid_1.dataSource.getByUid(manage_quotation_master_spares.variable.custom.grid_1.select().data("uid"));
			allowedWorkflowArray = mserviceUtilities.getAllowedWorkflowEventVerbs({
					transactionType : "QUOTATION",
					requestCategory : manage_quotation_master_spares.variable.custom.selectedRecord.quotation_category,
					requestType : manage_quotation_master_spares.variable.custom.selectedRecord.quotation_type,
					fromStage : manage_quotation_master_spares.variable.custom.selectedRecord.workflow_stage_no,
					fromStatus : manage_quotation_master_spares.variable.custom.selectedRecord.quotation_status
				});
				
			for (workFlowLength = 0; workFlowLength < allowedWorkflowArray.length; workFlowLength ++){
				currentFeature  = allowedWorkflowArray[workFlowLength].child_screen_id;
				for (i = 0; i < manage_quotation_master_spares.variable.custom.contextChildElement.length; i++){
					if (manage_quotation_master_spares.variable.custom.contextChildElement[i].dataset.buttonRole == currentFeature ){
						$('#' + screenID + '_'+ manage_quotation_master_spares.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').show();
						break;
					}
				} 
			}
			$("#manage_quotation_master_spares_contextMenu").show();
			var columnData = $.grep(manage_quotation_master_spares.variable.custom.contextChildElement, function (data) {
				if($('#' + data.id ).is(':visible')){ $('#' + data.id ).css("display","inline-block").css("min-width","180px"); }
				return $('#' + data.id ).is(':visible');
			});
			var columnCount = parseInt(columnData.length / 6);
			if((columnData.length % 6) != 0){ 
				columnCount = columnCount + 1;
			}
			$("#manage_quotation_master_spares_contextMenu").css("columns", columnCount.toString()).css("width", "min-content");
		},
		call_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_pe.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_call_register_pe";
				});
				manage_call_register_pe.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_quotation_master_spares",
					nextScreenID : "manage_call_register_pe",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_quotation_master_spares").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_quotation_master_spares"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_call_register_pe"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_call_register_pe";
				webNavigationController.buildBreadCrumb();
				$("#manage_call_register_pe_call_number_filter").setVal($(element).text());
				manage_call_register_pe.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		customer_order_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_order_master_spares.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_customer_order_master_spares";
				});
				manage_customer_order_master_spares.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_quotation_master_spares",
					nextScreenID : "manage_customer_order_master_spares",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_quotation_master_spares").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_quotation_master_spares"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_customer_order_master_spares"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_customer_order_master_spares";
				webNavigationController.buildBreadCrumb();
				$("#manage_customer_order_master_spares_customer_order_number_filter").setVal($(element).text());
				manage_customer_order_master_spares.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_quotation_master_spares_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_quotation_master_spares_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_quotation_master_spares_content_1").getInputparamXML({
				screenID : "manage_quotation_master_spares",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_quotation_master_spares.variable.custom.selectedRecord = manage_quotation_master_spares.variable.custom.grid_1.dataSource.getByUid(manage_quotation_master_spares.variable.custom.grid_1.select().data("uid"));
		},
	    getExportConfig : function (gridId) {
			if(gridId == "manage_quotation_master_spares_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_quotation_master_spares",
					service : "sp_retrieve_manage_quotation_list",
					request : "<signature><i_inputparam_xml>" + manage_quotation_master_spares.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_quotation_master_spares.variable.custom.grid_1.dataSource.data().length
				};
			}
		}
	},	
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_quotation_master_spares_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_quotation_master_spares_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			quotation_generatePDF : "false"
		}
	}
};
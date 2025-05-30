var manage_custom_maintenance = {
	constructScreen : function () {
		manage_custom_maintenance.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_manage_custom_info_list",
			outputPath : "outputparam_detail",
			api : true,
			pageSize : 50,
			inputParameter : {
				p_custom_info_code : "webWidgetInitializer.variable.customMainParam.replace('manage_custom_maintenance_','')",
				p_inputparam_xml : "manage_custom_maintenance.customRequirementHandler.getFilterValues()"
			},
			screenID : "manage_custom_maintenance",
			schemaModel : true,
			dataSourceName : "datasource_1",
			processResponse : true,
			serverPaging : true
		});
		manage_custom_maintenance.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values",
				outputPath: "context/outputparam",
				pageSize: 1,
				inputParameter : {
					p_lov_code : "'WORKFLOW_EVENTVERB_ID'",
					p_search_field_1 : "webWidgetInitializer.variable.customMainParam.replace('manage_custom_maintenance_','')",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
				screenID: "manage_custom_maintenance",
		});
		manage_custom_maintenance.customRequirementHandler.workFlowButtonCreation();
	},
	postConstruct : function () {
		manage_custom_maintenance.variable.custom.filterArea = $("#manage_custom_maintenance_pane2");
		$("#manage_custom_maintenance_content_1 span dt").removeClass("term_one");
		$("#manage_custom_maintenance_content_1 span dd.colen").html("");
		$("#manage_custom_maintenance_content_1").find('dt').css("width","120px");
		setTimeout(function(){
			manage_custom_maintenance_splitter[manage_custom_maintenance.variable.custom.filterArea.width() > 0 ? "collapse" : "expand"](manage_custom_maintenance.variable.custom.filterArea);
		}, 100);
		$("#manage_custom_maintenance_editor").append("<li id='manage_custom_maintenance_grid_pager'></li>");
		$("#manage_custom_maintenance_grid_pager").append($("#manage_custom_maintenance_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_custom_maintenance_grid_1").data("kendoGrid").bind("dataBound", manage_custom_maintenance.customRequirementHandler.gridPager);
	},
	initializeWidgets : function () {
		manage_custom_maintenance.variable.custom.grid_1 = $("#manage_custom_maintenance_grid_1").initializeWGrid({
			screenID : "manage_custom_maintenance",
			dataSource : manage_custom_maintenance.variable.custom.datasource_1,
			height : 500,
			pageSize : 50,
			filterable : true,
			sortable : true,
			pageable : false,
			toolbar : false
		});
		$("#manage_custom_maintenance_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_custom_maintenance_editor").kendoMenu();		
		manage_custom_maintenance_splitter = $("#manage_custom_maintenance_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_custom_maintenance.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_custom_maintenance.variable.custom.grid_1.refresh();
		if(manage_custom_maintenance.variable.custom.crudIndicator != "D"){
			manage_custom_maintenance.variable.custom.grid_1.dataSource.pageSize(50);
		}
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_custom_maintenance.variable.custom.validator.validate()) {
				if (manage_custom_maintenance.variable.custom.crudIndicator == "R") {
					manage_custom_maintenance.variable.custom.grid_1.dataSource.read();
				} else if (manage_custom_maintenance.variable.custom.crudIndicator == "D") {
					alert("Data deleted successfully.");
					return false;
				} else {
					if(manage_custom_maintenance.variable.custom[webWidgetInitializer.variable.customMainParam.substr(26)] == "Yes"){
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_custom_maintenance_edit.js", "../../s_iscripts/custominfo_setDetail.js"])) {
							if(manage_custom_maintenance.variable.custom.crudIndicator == "A"){
								manage_custom_maintenance.variable.custom.nextScreenName = "Add";
								manage_custom_maintenance.variable.custom.selectedRecord = "";
							};
							webNavigationController.gotoNextScreen({
								screenID : "manage_custom_maintenance",
								nextScreenID : "manage_custom_maintenance_edit",
								nextScreenName : manage_custom_maintenance.variable.custom.nextScreenName
							});
						} else {
							alert("Sorry. This feature is unavailable. Please contact your support desk.");
							return false;
						}
					} else{
						if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_custom_maintenance_edit_child.js","../../s_iscripts/custominfo_setDetail.js"])) {
							if(manage_custom_maintenance.variable.custom.crudIndicator == "A"){
								manage_custom_maintenance.variable.custom.nextScreenName = "Add";
								manage_custom_maintenance.variable.custom.selectedRecord = "";
							};
							webNavigationController.gotoNextScreen({
								screenID : "manage_custom_maintenance",
								fieldID : "manage_custom_maintenance_child_window",
								nextScreenID : "manage_custom_maintenance_edit_child",
								nextScreenName : manage_custom_maintenance.variable.custom.nextScreenName,
								execute : manage_custom_maintenance_edit_child.constructScreen
							});
						} else {
							alert("Sorry. This feature is unavailable. Please contact your support desk.");
							return false;
						}
					}
				}
			}	
		},
		misc_btn_click  : function (element, event) {
			if(manage_custom_maintenance.variable.custom.miscID == "filters"){
				manage_custom_maintenance_splitter[manage_custom_maintenance.variable.custom.filterArea.width() > 0 ? "collapse" : "expand"](manage_custom_maintenance.variable.custom.filterArea);
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_custom_maintenance.variable.custom.selectedFeatureID == "manage_user_attachments") {
				if (manage_custom_maintenance.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments.js"])) {
							manage_user_attachments.variable.standard.configurationParam = "ANCILLARY";
							manage_user_attachments.variable.custom.project_task_level_ind = "A";
							manage_user_attachments.variable.custom.project_id = manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no;
							manage_user_attachments.variable.custom.template_id = "";
							manage_user_attachments.variable.custom.task_id = "0";
							manage_user_attachments.variable.custom.project_status_defaultValue = manage_custom_maintenance.variable.custom.selectedRecord.request_status_desc;
							webNavigationController.gotoNextScreen({
								screenID : "manage_custom_maintenance",
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
			} else if (manage_custom_maintenance.variable.custom.selectedFeatureID == "manage_txn_event_log") {
				if (manage_custom_maintenance.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_txn_event_log.js"])) {
						manage_txn_event_log.variable.standard.configurationParam = webWidgetInitializer.variable.customMainParam.replace('manage_custom_maintenance_','');
						manage_txn_event_log.variable.custom.txn_ref_no = manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no;
						manage_txn_event_log.variable.custom.txn_status = manage_custom_maintenance.variable.custom.selectedRecord.request_status_desc;
						manage_txn_event_log.variable.custom.txn_type_code = webWidgetInitializer.variable.customMainParam.replace('manage_custom_maintenance_','');
						webNavigationController.gotoNextScreen({
							screenID : "manage_custom_maintenance",
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
			} else if (manage_custom_maintenance.variable.custom.selectedFeatureID == "generate_custom_maintenance_pdf") {
				if (manage_custom_maintenance.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_custom_maintenance_pdf.js"])) {
						if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_custom_maintenance_pdf_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
							mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_custom_maintenance_pdf_" + login_profile.country_code + ".js"]);
						};
						webNavigationController.gotoNextScreen({
							screenID : "manage_custom_maintenance",
							fieldID : "manage_custom_maintenance_child_window",
							nextScreenID : "generate_custom_maintenance_pdf",
							nextScreenName : manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no,
							windowHeight : 620,
							windowWidth : 600,
							execute : generate_custom_maintenance_pdf.constructScreen
						});
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
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_custom_maintenance_wfeventverb_status_change.js","../../s_iscripts/custominfo_setDetail.js"])) {
				var allowedWorkflowArray;
				allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
					transactionType : "ANCILLARY",
					eventVerb : manage_custom_maintenance.variable.custom.selectedWorkflowEventVerb,
					requestCategory : manage_custom_maintenance.variable.custom.selectedRecord.request_category,
					requestType : manage_custom_maintenance.variable.custom.selectedRecord.request_type,
					fromStage : manage_custom_maintenance.variable.custom.selectedRecord.workflow_stage_no,
					fromStatus : manage_custom_maintenance.variable.custom.selectedRecord.request_status,
					currentFeatureId: manage_custom_maintenance.variable.custom.selectedRecord.last_accessed_feature
				});
				manage_custom_maintenance.variable.custom.selectedWorkflowToStage = "";
				manage_custom_maintenance.variable.custom.selectedWorkflowToStatus = "";
				if (allowedWorkflowArray.length != 0) {
					manage_custom_maintenance.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
					manage_custom_maintenance.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
					webNavigationController.gotoNextScreen({
						screenID : "manage_custom_maintenance",
						fieldID : "manage_custom_maintenance_child_window",
						nextScreenID : "manage_custom_maintenance_wfeventverb_status_change",
						nextScreenName : manage_custom_maintenance.variable.custom.nextScreenName,
						execute : manage_custom_maintenance_wfeventverb_status_change.constructScreen
					});
				}
				else {
					alert("Sorry. This feature is unavailable for the selected record.");
					return false;
				}	
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_custom_maintenance_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_custom_maintenance_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_custom_maintenance_content_1").getInputparamXML({
				screenID : "manage_custom_maintenance",
				matchCondition : ["_filter"]
			});
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "#manage_custom_maintenance_report_code",
				p_field_1 : "$manage_custom_maintenance.variable.custom.selectedRecord.asset_id",
				p_field_2 : "$manage_custom_maintenance.variable.custom.selectedRecord.rec_tstamp"
			};
		},
		setSelectedRecord : function () {
			manage_custom_maintenance.variable.custom.selectedRecord = manage_custom_maintenance.variable.custom.grid_1.dataSource.getByUid(manage_custom_maintenance.variable.custom.grid_1.select().data("uid"));
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_custom_maintenance_grid_1_export_btn"){
				return {
					type : "csv",
					template : webWidgetInitializer.variable.customMainParam,
					service : "sp_retrieve_manage_custom_info_list_"+ webWidgetInitializer.variable.customMainParam.replace('manage_custom_maintenance_',''),
					request : "<signature><i_inputparam_xml>" + manage_custom_maintenance.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_custom_maintenance.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml><i_custom_info_code></i_custom_info_code><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_custom_maintenance.variable.custom.grid_1.dataSource.data().length
				};
			}
		},
		workFlowButtonCreation : function (){
			manage_custom_maintenance.variable.custom.datasource_2.read();
			manage_custom_maintenance.variable.custom.selectedDatasource = manage_custom_maintenance.variable.custom.datasource_2.data();
			if(manage_custom_maintenance.variable.custom.selectedDatasource.length > 0){
				for (var i = 0; i < manage_custom_maintenance.variable.custom.selectedDatasource.length; i++){
					$("#manage_custom_maintenance_contextMenu").append("<li id = 'manage_custom_maintenance_" + (manage_custom_maintenance.variable.custom.selectedDatasource[i].p_value_field_1) +"_btn' data-widget-type = 'w_button' data-button-group = 'workflow' data-button-role = "+ (manage_custom_maintenance.variable.custom.selectedDatasource[i].p_value_field_1) +"></li>")
				}
			}
			
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_custom_maintenance_contextMenu").data("kendoContextMenu").open(element);
			manage_custom_maintenance.variable.custom.contextChildElement = $('#manage_custom_maintenance_contextMenu').children();
			for (i = 0; i < manage_custom_maintenance.variable.custom.contextChildElement.length; i++){
				if (manage_custom_maintenance.variable.custom.contextChildElement[i].dataset.buttonGroup == 'workflow'){
					$('#' + screenID + '_'+ manage_custom_maintenance.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').hide();
				}
			}
			manage_custom_maintenance.variable.custom.selectedRecord = manage_custom_maintenance.variable.custom.grid_1.dataSource.getByUid(manage_custom_maintenance.variable.custom.grid_1.select().data("uid"));
			allowedWorkflowArray = mserviceUtilities.getAllowedWorkflowEventVerbs({
					transactionType : "ANCILLARY",
					requestCategory : manage_custom_maintenance.variable.custom.selectedRecord.request_category,
					requestType : manage_custom_maintenance.variable.custom.selectedRecord.request_type,
					fromStage : manage_custom_maintenance.variable.custom.selectedRecord.workflow_stage_no,
					fromStatus : manage_custom_maintenance.variable.custom.selectedRecord.request_status,
					currentFeatureId: manage_custom_maintenance.variable.custom.selectedRecord.last_accessed_feature
				});
				
			for (workFlowLength = 0; workFlowLength < allowedWorkflowArray.length; workFlowLength ++){
				currentFeature  = allowedWorkflowArray[workFlowLength].child_screen_id;
				for (i = 0; i < manage_custom_maintenance.variable.custom.contextChildElement.length; i++){
					if (manage_custom_maintenance.variable.custom.contextChildElement[i].dataset.buttonRole == currentFeature ){
						$('#' + screenID + '_'+ manage_custom_maintenance.variable.custom.contextChildElement[i].dataset.buttonRole + '_btn').show();
						break;
					}
				} 
			}
			$("#manage_custom_maintenance_contextMenu").show();
		}
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 1
				}, {
					contentID : "content_2",
					columnLength : 1
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_custom_maintenance_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_custom_maintenance_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
		},
		custom : {
			customDelete : true,
			generatePDF : false
		}
	}
};
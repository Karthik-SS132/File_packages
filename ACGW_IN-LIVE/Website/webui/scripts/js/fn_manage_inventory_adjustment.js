var manage_inventory_adjustment = {
	constructScreen: function () {
		manage_inventory_adjustment.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
			applicationName: "salesinvoice",
			serviceName: "retrieve_manage_inventory_adjustment_list",
			outputPath: "outputparam_detail",
			api : true,
			pageSize : 50,
			inputParameter : {
				p_inputparam_xml : "manage_inventory_adjustment.customRequirementHandler.getFilterValues()"
			},
			schemaModel: true,
			screenID: "manage_inventory_adjustment",
			dataSourceName: "datasource_1",
			processResponse: true,
			serverPaging : true
		});
	},
	postConstruct : function () {
		manage_inventory_adjustment_filterArea = $("#manage_inventory_adjustment_pane2");
		$("#manage_inventory_adjustment_content_1 span dt").removeClass("term_one");
		$("#manage_inventory_adjustment_content_1 span dt").removeClass("term_two");
		$("#manage_inventory_adjustment_content_1 span dd.colen").html("");
		$("#manage_inventory_adjustment_content_1").find('dt').css("width","120px");
		$("#manage_inventory_adjustment_editor").append("<li id='manage_inventory_adjustment_grid_pager'></li>");
		$("#manage_inventory_adjustment_grid_pager").append($("#manage_inventory_adjustment_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_inventory_adjustment_grid_1").data("kendoGrid").bind("dataBound", manage_inventory_adjustment.customRequirementHandler.gridPager);
		if(manage_inventory_adjustment.variable.custom.autoLoadInd == "true") {
			manage_inventory_adjustment.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_inventory_adjustment_splitter[manage_inventory_adjustment_filterArea.width() > 0 ? "collapse" : "expand"](manage_inventory_adjustment_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_inventory_adjustment_content_1",
					screenID : "manage_inventory_adjustment",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_inventory_adjustment_content_1",
				screenID : "manage_inventory_adjustment",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets: function () {
		manage_inventory_adjustment.variable.custom.grid_1 = $("#manage_inventory_adjustment_grid_1").initializeWGrid({
			screenID: "manage_inventory_adjustment",
			dataSource: manage_inventory_adjustment.variable.custom.datasource_1,
			height : 500,
			pageSize : 50,
			filterable : false,
			sortable : true,
			pageable : false,
			toolbar : false
		});
	   $("#manage_inventory_adjustment_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_inventory_adjustment_editor").kendoMenu();		
		manage_inventory_adjustment_splitter = $("#manage_inventory_adjustment_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_inventory_adjustment.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen: function () {
		manage_inventory_adjustment.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler: {
		crud_btn_click: function (element, event) {
			if (manage_inventory_adjustment.variable.custom.crudIndicator == "R") {
				manage_inventory_adjustment.variable.custom.grid_1.dataSource._skip = 0;
				manage_inventory_adjustment.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_inventory_adjustment_edit.js", "../../s_iscripts/inventory_adjustment_setDetail.js"])) {
					webNavigationController.gotoNextScreen({
						screenID: "manage_inventory_adjustment",
						nextScreenID: "manage_inventory_adjustment_edit",
						nextScreenName: manage_inventory_adjustment.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_inventory_adjustment.variable.custom.miscID == "filters"){
				manage_inventory_adjustment_splitter[manage_inventory_adjustment_filterArea.width() > 0 ? "collapse" : "expand"](manage_inventory_adjustment_filterArea);
			}
			if(manage_inventory_adjustment.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_inventory_adjustment_content_1",
					screenID : "manage_inventory_adjustment",
					matchCondition : ["_filter"]
				});
				$("#manage_inventory_adjustment_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click: function (element, event) {
			if (manage_inventory_adjustment.variable.custom.selectedFeatureID == "manage_user_attachments") {
				if (manage_inventory_adjustment.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments.js"])) {
						manage_user_attachments.variable.standard.configurationParam = "INVENTORY";
						manage_user_attachments.variable.custom.project_task_level_ind = "IV";
						manage_user_attachments.variable.custom.project_id = manage_inventory_adjustment.variable.custom.selectedRecord.txn_status;
						manage_user_attachments.variable.custom.template_id = "";
						manage_user_attachments.variable.custom.task_id = "0";
						manage_user_attachments.variable.custom.project_status_defaultValue = manage_inventory_adjustment.variable.custom.selectedRecord.quotation_status_desc;
						webNavigationController.gotoNextScreen({
							screenID : "manage_inventory_adjustment",
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
			}
		},
		workflow_btn_click : function (element, event) {
			var allowedWorkflowArray;
			if (manage_inventory_adjustment.variable.custom.grid_1.select().length != 0) {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_inventory_adjustment_wfeventverb_status_change.js", "../../s_iscripts/update_invadj_wfeventverb_status_change.js"])){
					allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
							transactionType : "INVADJ",
							eventVerb : manage_inventory_adjustment.variable.custom.selectedWorkflowEventVerb,
							requestCategory : manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_category,
							requestType : manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_type,
							fromStage : manage_inventory_adjustment.variable.custom.selectedRecord.workflow_stage_no,
							fromStatus : manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_status
						});
					manage_inventory_adjustment.variable.custom.selectedWorkflowToStage = "";
					manage_inventory_adjustment.variable.custom.selectedWorkflowToStatus = "";
					if (allowedWorkflowArray.length != 0) {
						manage_inventory_adjustment.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
						manage_inventory_adjustment.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
						webNavigationController.gotoNextScreen({
							screenID : "manage_inventory_adjustment",
							fieldID : "manage_inventory_adjustment_child_window",
							nextScreenID : "manage_inventory_adjustment_wfeventverb_status_change",
							nextScreenName : manage_inventory_adjustment.variable.custom.nextScreenName,
							execute : manage_inventory_adjustment_wfeventverb_status_change.constructScreen
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
			$("#manage_inventory_adjustment_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_inventory_adjustment_contextMenu").show();
		}
	},
	customRequirementHandler: {
		gridPager : function () {
			$("#manage_inventory_adjustment_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_inventory_adjustment_grid_1").find(".k-grid-header").height());
		},
		getFilterValues: function () {
			return $("#manage_inventory_adjustment_content_1").getInputparamXML({
				screenID: "manage_inventory_adjustment",
				matchCondition: ["_filter"]
			});
		},
		setSelectedRecord: function () {
			manage_inventory_adjustment.variable.custom.selectedRecord = manage_inventory_adjustment.variable.custom.grid_1.dataSource.getByUid(manage_inventory_adjustment.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject: function () {
			return {
				p_information_type: "'CUSTMAST'",
				p_field_1: "$manage_inventory_adjustment.variable.custom.selectedRecord.txn_doc_no"
			};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_inventory_adjustment_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_inventory_adjustment",
					service : "sp_retrieve_manage_inventory_adjustment_list",
					request : "<signature><i_inputparam_xml>" + manage_inventory_adjustment.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_inventory_adjustment.variable.custom.grid_1.dataSource.data().length
				};
			}
		}
	},
	variable: {
		standard: {
			reorderParam: [{
					contentID: "content_1",
					columnLength: 3
				}
			],
			exportConfiguration: {
				mode: "single",
				content: [{
						exportType: "grid",
						fieldId: "manage_inventory_adjustment_grid_1",
						dispalyLabel: "Data Export"
					}
				]
			},
			printConfiguration: {
				mode: "single",
				content: [{
						type: "grid",
						fieldId: "manage_inventory_adjustment_grid_1",
						dispalyLabel: "Data Export"
					}
				]
			}
		},
		custom: {}
	}
};
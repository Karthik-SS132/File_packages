var manage_invoice_header = {
	constructScreen : function () {
		manage_invoice_header.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_invoice_list",
				outputPath : "context/outputparam_detail",
				pageSize : 50,
				inputParameter : {
					p_inputparam_xml : "manage_invoice_header.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_invoice_header",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_invoice_header_filterArea = $("#manage_invoice_header_pane2");
		$("#manage_invoice_header_content_1 span dt").removeClass("term_one");
		$("#manage_invoice_header_content_1 span dt").removeClass("term_two");
		$("#manage_invoice_header_content_1 span dd.colen").html("");
		$("#manage_invoice_header_content_1").find('dt').css("width","120px");
		$("#manage_invoice_header_editor").append("<li id='manage_invoice_header_grid_pager'></li>");
		$("#manage_invoice_header_grid_pager").append($("#manage_invoice_header_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_invoice_header_grid_1").data("kendoGrid").bind("dataBound", manage_invoice_header.customRequirementHandler.gridPager);
		if(manage_invoice_header.variable.custom.autoLoadInd == "true") {
			manage_invoice_header.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_invoice_header_splitter[manage_invoice_header_filterArea.width() > 0 ? "collapse" : "expand"](manage_invoice_header_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_invoice_header_content_1",
					screenID : "manage_invoice_header",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_invoice_header_content_1",
				screenID : "manage_invoice_header",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_invoice_header.variable.custom.grid_1 = $("#manage_invoice_header_grid_1").initializeWGrid({
				screenID : "manage_invoice_header",
				dataSource : manage_invoice_header.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_invoice_header_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_invoice_header_editor").kendoMenu();		
		manage_invoice_header_splitter = $("#manage_invoice_header_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_invoice_header.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_invoice_header.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_invoice_header.variable.custom.crudIndicator == "R") {
				manage_invoice_header.variable.custom.grid_1.dataSource._skip = 0;
				manage_invoice_header.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_invoice_detail.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_invoice_header",
						nextScreenID : "manage_invoice_detail",
						nextScreenName : manage_invoice_header.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_invoice_header.variable.custom.miscID == "filters"){
				manage_invoice_header_splitter[manage_invoice_header_filterArea.width() > 0 ? "collapse" : "expand"](manage_invoice_header_filterArea);
			}
			if(manage_invoice_header.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_invoice_header_content_1",
					screenID : "manage_invoice_header",
					matchCondition : ["_filter"]
				});
				$("#manage_invoice_header_filters_btn .k-i-filter").css("color","black");
			}
		},
		workflow_btn_click : function (element, event) {
			var allowedWorkflowArray;
			if (manage_invoice_header.variable.custom.grid_1.select().length != 0) {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_invoice_wfeventverb_status_change.js", "../../s_iscripts/update_invoice_wfeventverb_status_change.js"])) {
					allowedWorkflowArray = mserviceUtilities.getNextWorkflowEventVerbs({
							transactionType : "INVOICE",
							eventVerb : manage_invoice_header.variable.custom.selectedWorkflowEventVerb,
							requestCategory : manage_invoice_header.variable.custom.selectedRecord.invoice_category,
							requestType : manage_invoice_header.variable.custom.selectedRecord.invoice_type,
							fromStage : manage_invoice_header.variable.custom.selectedRecord.workflow_stage_no,
							fromStatus : manage_invoice_header.variable.custom.selectedRecord.invoice_status
						});
					manage_invoice_header.variable.custom.selectedWorkflowToStage = "";
					manage_invoice_header.variable.custom.selectedWorkflowToStatus = "";
					if (allowedWorkflowArray.length != 0) {
						manage_invoice_header.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
						manage_invoice_header.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
						webNavigationController.gotoNextScreen({
							screenID : "manage_invoice_header",
							fieldID : "manage_invoice_header_child_window",
							nextScreenID : "manage_invoice_wfeventverb_status_change",
							nextScreenName : manage_invoice_header.variable.custom.nextScreenName,
							execute : manage_invoice_wfeventverb_status_change.constructScreen
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
		},
		feature_btn_click : function (element, event) {
			if (manage_invoice_header.variable.custom.selectedFeatureID == "manage_user_attachments") {
				if (manage_invoice_header.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments.js"])) {
						manage_user_attachments.variable.standard.configurationParam = "INVOICE";
						manage_user_attachments.variable.custom.project_task_level_ind = "I";
						manage_user_attachments.variable.custom.project_id = manage_invoice_header.variable.custom.selectedRecord.invoice_no;
						manage_user_attachments.variable.custom.template_id = "";
						manage_user_attachments.variable.custom.task_id = "0";
						manage_user_attachments.variable.custom.project_status_defaultValue = mserviceUtilities.getDescriptionForCode("INVOICESTATUS_DESC", manage_invoice_header.variable.custom.selectedRecord.invoice_status, "");
						webNavigationController.gotoNextScreen({
							screenID : "manage_invoice_header",
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
			} else if (manage_invoice_header.variable.custom.selectedFeatureID == "manage_invoice_event_log") {
				if (manage_invoice_header.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_invoice_event_log.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_invoice_header",
							nextScreenID : "manage_invoice_event_log",
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
			} else if (manage_invoice_header.variable.custom.selectedFeatureID == "manage_invoice_view") {
				if (manage_invoice_header.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_invoice_view.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_invoice_header",
							fieldID : "manage_invoice_header_child_window",
							nextScreenID : "manage_invoice_view",
							nextScreenName : manage_invoice_header.variable.custom.selectedRecord.invoice_no,
							windowHeight : 620,
							windowWidth : 600,
							execute : manage_invoice_view.constructScreen
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
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_invoice_header_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_invoice_header_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_invoice_header_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_invoice_header_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_invoice_header_content_1").getInputparamXML({
				screenID : "manage_invoice_header",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_invoice_header.variable.custom.selectedRecord = manage_invoice_header.variable.custom.grid_1.dataSource.getByUid(manage_invoice_header.variable.custom.grid_1.select().data("uid"));
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_invoice_header_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_invoice_header",
					service : "sp_retrieve_manage_invoice_list",
					request : "<signature><i_inputparam_xml>" + manage_invoice_header.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_invoice_header.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_invoice_header.variable.custom.grid_1.dataSource.data().length
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
			importConfiguration : {
				imformationType : 'invoice_header'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_invoice_header_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_invoice_header_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {}
	}
};
var manage_salesinvoice_master = {
	constructScreen : function () {
		manage_salesinvoice_master.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "salesinvoice",
				serviceName : "retrieve_manage_salesinvoice_list",
				outputPath : "context/outputparam_detail",
				pageSize : 50,
				inputParameter : {
					p_inputparam_xml : "manage_salesinvoice_master.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_salesinvoice_master",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_salesinvoice_master_filterArea = $("#manage_salesinvoice_master_pane2");
		$("#manage_salesinvoice_master_content_1 span dt").removeClass("term_one");
		$("#manage_salesinvoice_master_content_1 span dt").removeClass("term_two");
		$("#manage_salesinvoice_master_content_1 span dd.colen").html("");
		$("#manage_salesinvoice_master_content_1").find('dt').css("width","120px");
		$("#manage_salesinvoice_master_editor").append("<li id='manage_salesinvoice_master_grid_pager'></li>");
		$("#manage_salesinvoice_master_grid_pager").append($("#manage_salesinvoice_master_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_salesinvoice_master_grid_1").data("kendoGrid").bind("dataBound", manage_salesinvoice_master.customRequirementHandler.gridPager);
		if(manage_salesinvoice_master.variable.custom.autoLoadInd == "true") {
			manage_salesinvoice_master.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_salesinvoice_master_splitter[manage_salesinvoice_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_salesinvoice_master_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_salesinvoice_master_content_1",
					screenID : "manage_salesinvoice_master",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_salesinvoice_master_content_1",
				screenID : "manage_salesinvoice_master",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_salesinvoice_master.variable.custom.grid_1 = $("#manage_salesinvoice_master_grid_1").initializeWGrid({
				screenID : "manage_salesinvoice_master",
				dataSource : manage_salesinvoice_master.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
	    $("#manage_salesinvoice_master_contextMenu").kendoContextMenu({
			orientation : "vertical",
			target : "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_salesinvoice_master_editor").kendoMenu();		
		manage_salesinvoice_master_splitter = $("#manage_salesinvoice_master_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_salesinvoice_master.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_salesinvoice_master.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_salesinvoice_master.variable.custom.crudIndicator == "R") {
				manage_salesinvoice_master_spares.variable.custom.grid_1.dataSource._skip = 0;
				manage_salesinvoice_master.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_salesinvoice_master_edit.js", "../../s_iscripts/save_manage_salesinvoice.js"])) {
					if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_details_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
						mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_details_" + login_profile.country_code + ".js"]);
					};
					webNavigationController.gotoNextScreen({
						screenID : "manage_salesinvoice_master",
						nextScreenID : "manage_salesinvoice_master_edit",
						nextScreenName : manage_salesinvoice_master.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_salesinvoice_master.variable.custom.miscID == "filters"){
				manage_salesinvoice_master_splitter[manage_salesinvoice_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_salesinvoice_master_filterArea);
			}
			if(manage_salesinvoice_master.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_salesinvoice_master_content_1",
					screenID : "manage_salesinvoice_master",
					matchCondition : ["_filter"]
				});
				$("#manage_salesinvoice_master_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_salesinvoice_master.variable.custom.selectedFeatureID == "generate_salesinvoice_pdf") {
				if (manage_salesinvoice_master.variable.custom.grid_1.select().length != 0) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_generate_salesinvoice_pdf.js"])) {
						if (!mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_details_" + login_profile.client_id + "_" + login_profile.country_code + ".js"])) {
							mserviceUtilities.loadJSScripts(["../scripts/js/fn_taxation_details_" + login_profile.country_code + ".js"]);
						};
						webNavigationController.gotoNextScreen({
							screenID : "manage_salesinvoice_master",
							fieldID : "manage_salesinvoice_master_child_window",
							nextScreenID : "generate_salesinvoice_pdf",
							nextScreenName : manage_salesinvoice_master.variable.custom.selectedRecord.salesinvoice_no,
							windowHeight : 620,
							windowWidth : 600,
							execute : generate_salesinvoice_pdf.constructScreen
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
			if (manage_salesinvoice_master.variable.custom.grid_1.select().length != 0) {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_salesinvoice_wfeventverb_status_change.js", "../../s_iscripts/update_salesinvoice_wfeventverb_status_change.js"])) {
					allowedWorkflowArray = mserviceUtilities.getSalesinvoiceWorkflowEventVerbs({
							eventVerb : manage_salesinvoice_master.variable.custom.selectedWorkflowEventVerb,
							requestCategory : manage_salesinvoice_master.variable.custom.selectedRecord.salesinvoice_category,
							requestType : manage_salesinvoice_master.variable.custom.selectedRecord.salesinvoice_type,
							fromStage : manage_salesinvoice_master.variable.custom.selectedRecord.workflow_stage_no,
							fromStatus : manage_salesinvoice_master.variable.custom.selectedRecord.salesinvoice_status
						});
					manage_salesinvoice_master.variable.custom.selectedWorkflowToStage = "";
					manage_salesinvoice_master.variable.custom.selectedWorkflowToStatus = "";
					if (allowedWorkflowArray.length != 0) {
						manage_salesinvoice_master.variable.custom.selectedWorkflowToStage = allowedWorkflowArray[0].to_workflow_stage;
						manage_salesinvoice_master.variable.custom.selectedWorkflowToStatus = allowedWorkflowArray[0].to_status;
						webNavigationController.gotoNextScreen({
							screenID : "manage_salesinvoice_master",
							fieldID : "manage_salesinvoice_master_child_window",
							nextScreenID : "manage_salesinvoice_wfeventverb_status_change",
							nextScreenName : manage_salesinvoice_master.variable.custom.nextScreenName,
							execute : manage_salesinvoice_wfeventverb_status_change.constructScreen
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
			$("#manage_salesinvoice_master_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_salesinvoice_master_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_salesinvoice_master_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_salesinvoice_master_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_salesinvoice_master_content_1").getInputparamXML({
				screenID : "manage_salesinvoice_master",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_salesinvoice_master.variable.custom.selectedRecord = manage_salesinvoice_master.variable.custom.grid_1.dataSource.getByUid(manage_salesinvoice_master.variable.custom.grid_1.select().data("uid"));
		},
        getExportConfig : function (gridId) {
			if(gridId == "manage_salesinvoice_master_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_salesinvoice_master",
					service : "sp_retrieve_manage_salesinvoice_list",
					request : "<signature><i_inputparam_xml>" + manage_salesinvoice_master.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_salesinvoice_master.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_salesinvoice_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_salesinvoice_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};
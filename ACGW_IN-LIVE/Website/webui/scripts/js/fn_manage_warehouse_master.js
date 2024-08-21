var manage_warehouse_master = {
	constructScreen: function () {
		manage_warehouse_master.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName: "mservice",
				serviceName: "retrieve_manage_warehouse_list",
				outputPath: "context/outputparam",
				pageSize: 50,
				inputParameter: {
					p_inputparam_xml: "manage_warehouse_master.customRequirementHandler.getFilterValues()"
				},
				schemaModel: true,
				screenID: "manage_warehouse_master",
				dataSourceName: "datasource_1",
				processResponse: true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_warehouse_master_filterArea = $("#manage_warehouse_master_pane2");
		$("#manage_warehouse_master_content_1 span dt").removeClass("term_one");
		$("#manage_warehouse_master_content_1 span dt").removeClass("term_two");
		$("#manage_warehouse_master_content_1 span dd.colen").html("");
		$("#manage_warehouse_master_content_1").find('dt').css("width","120px");
		$("#manage_warehouse_master_editor").append("<li id='manage_warehouse_master_grid_pager'></li>");
		$("#manage_warehouse_master_grid_pager").append($("#manage_warehouse_master_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_warehouse_master_grid_1").data("kendoGrid").bind("dataBound", manage_warehouse_master.customRequirementHandler.gridPager);
		if(manage_warehouse_master.variable.custom.autoLoadInd == "true") {
			manage_warehouse_master.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_warehouse_master_splitter[manage_warehouse_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_warehouse_master_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_warehouse_master_content_1",
					screenID : "manage_warehouse_master",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_warehouse_master_content_1",
				screenID : "manage_warehouse_master",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets: function () {
		manage_warehouse_master.variable.custom.grid_1 = $("#manage_warehouse_master_grid_1").initializeWGrid({
				screenID: "manage_warehouse_master",
			    dataSource: manage_warehouse_master.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false

			});
	$("#manage_warehouse_master_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_warehouse_master_editor").kendoMenu();		
		manage_warehouse_master_splitter = $("#manage_warehouse_master_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_warehouse_master.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
    },
	refreshScreen: function () {
		manage_warehouse_master.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler: {
		crud_btn_click: function (element, event) {
			if (manage_warehouse_master.variable.custom.crudIndicator == "R") {
				manage_warehouse_master.variable.custom.grid_1.dataSource._skip = 0;
				manage_warehouse_master.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_warehouse_master_edit.js", "../../s_iscripts/save_manage_warehouse_details.js"])) {
					webNavigationController.gotoNextScreen({
						screenID: "manage_warehouse_master",
						fieldID: "manage_warehouse_master_child_window",
						nextScreenID: "manage_warehouse_master_edit",
						nextScreenName: manage_warehouse_master.variable.custom.nextScreenName,
						execute: manage_warehouse_master_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_warehouse_master.variable.custom.miscID == "filters"){
				manage_warehouse_master_splitter[manage_warehouse_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_warehouse_master_filterArea);
			}
			if(manage_warehouse_master.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_warehouse_master_content_1",
					screenID : "manage_warehouse_master",
					matchCondition : ["_filter"]
				});
				$("#manage_warehouse_master_filters_btn .k-i-filter").css("color","black");
			}
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_warehouse_master_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_warehouse_master_contextMenu").show();
		}
	},
	customRequirementHandler: {
		gridPager : function () {
			$("#manage_warehouse_master_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_warehouse_master_grid_1").find(".k-grid-header").height());
		},
		getFilterValues: function () {
			return $("#manage_warehouse_master_content_1").getInputparamXML({
				screenID: "manage_warehouse_master",
				matchCondition: ["_filter"]
			});
		},
		setSelectedRecord: function () {
			manage_warehouse_master.variable.custom.selectedRecord = manage_warehouse_master.variable.custom.grid_1.dataSource.getByUid(manage_warehouse_master.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject: function () {
			return {
				p_information_type: "'WH_MASTER'",
				p_field_1: "$manage_warehouse_master.variable.custom.selectedRecord.warehouse_id"
			};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_warehouse_master_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_warehouse_master",
					service : "sp_retrieve_manage_warehouse_list",
					request : "<signature><i_inputparam_xml>" + manage_warehouse_master.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_warehouse_master.variable.custom.grid_1.dataSource.data().length
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
						fieldId: "manage_warehouse_master_grid_1",
						dispalyLabel: "Data Export"
					}
				]
			},
			printConfiguration: {
				mode: "single",
				content: [{
						type: "grid",
						fieldId: "manage_warehouse_master_grid_1",
						dispalyLabel: "Data Export"
					}
				]
			}
		},
		custom: {},
	}
};
var manage_equipment_master = {
	constructScreen : function () {
		manage_equipment_master.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
			applicationName : "mservice",
			serviceName : "retrieve_manage_equipment_master_list",
			outputPath : "context/outputparam_detail",
			pageSize : 50,
			inputParameter : {
				p_inputparam_xml : "manage_equipment_master.customRequirementHandler.getFilterValues()"
			},
			schemaModel : true,
			screenID : "manage_equipment_master",
			dataSourceName : "datasource_1",
			processResponse : true,
			serverPaging : true
		});
	},
	postConstruct : function () {
		manage_equipment_master_filterArea = $("#manage_equipment_master_pane2");
		$("#manage_equipment_master_content_1 span dt").removeClass("term_one");
		$("#manage_equipment_master_content_1 span dt").removeClass("term_two");
		$("#manage_equipment_master_content_1 span dd.colen").html("");
		$("#manage_equipment_master_content_1").find('dt').css("width","120px");
		$("#manage_equipment_master_editor").append("<li id='manage_equipment_master_grid_pager'></li>");
		$("#manage_equipment_master_grid_pager").append($("#manage_equipment_master_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_equipment_master_grid_1").data("kendoGrid").bind("dataBound", manage_equipment_master.customRequirementHandler.gridPager);
		if(manage_equipment_master.variable.custom.autoLoadInd == "true") {
			manage_equipment_master.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_equipment_master_splitter[manage_equipment_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_equipment_master_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_equipment_master_content_1",
					screenID : "manage_equipment_master",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_equipment_master_content_1",
				screenID : "manage_equipment_master",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_equipment_master.variable.custom.grid_1 = $("#manage_equipment_master_grid_1").initializeWGrid({
				screenID : "manage_equipment_master",
				dataSource : manage_equipment_master.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_equipment_master_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_equipment_master_editor").kendoMenu();		
		manage_equipment_master_splitter = $("#manage_equipment_master_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_equipment_master.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_equipment_master.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_equipment_master.variable.custom.crudIndicator == "R") {
				manage_equipment_master.variable.custom.grid_1.dataSource._skip = 0;
				manage_equipment_master.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_equipment_master_edit.js", "../../s_iscripts/save_manage_equipment_master.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_equipment_master",
						nextScreenID : "manage_equipment_master_edit",
						nextScreenName : manage_equipment_master.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_equipment_master.variable.custom.miscID == "filters"){
				manage_equipment_master_splitter[manage_equipment_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_equipment_master_filterArea);
			}
			if(manage_equipment_master.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_equipment_master_content_1",
					screenID : "manage_equipment_master",
					matchCondition : ["_filter"]
				});
				$("#manage_equipment_master_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_equipment_master.variable.custom.selectedFeatureID == "manage_link_maintenance_profile") {
				if (manage_equipment_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_link_maintenance_profile.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_equipment_master",
							nextScreenID : "manage_link_maintenance_profile",
							nextScreenName : manage_equipment_master.variable.custom.nextScreenName
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_equipment_master.variable.custom.selectedFeatureID == "manage_equipment_parameter") {
				if (manage_equipment_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_equipment_parameter.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_equipment_master",
							nextScreenID : "manage_equipment_parameter",
							nextScreenName : manage_equipment_master.variable.custom.nextScreenName
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_equipment_master.variable.custom.selectedFeatureID == "manage_preventive_maintenance_rules") {
				if (manage_equipment_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_preventive_maintenance_rules.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_equipment_master",
							nextScreenID : "manage_preventive_maintenance_rules",
							nextScreenName : manage_equipment_master.variable.custom.nextScreenName
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_equipment_master.variable.custom.selectedFeatureID == "manage_equipment_service_contract_template") {
				if (manage_equipment_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_equipment_service_contract_template.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_equipment_master",
							nextScreenID : "manage_equipment_service_contract_template",
							nextScreenName : manage_equipment_master.variable.custom.nextScreenName
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_equipment_master.variable.custom.selectedFeatureID == "manage_equipment_attachments") {
				if (manage_equipment_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_equipment_attachments.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_equipment_master",
							nextScreenID : "manage_equipment_attachments",
							nextScreenName : manage_equipment_master.variable.custom.nextScreenName
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
			$("#manage_equipment_master_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_equipment_master_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_equipment_master_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_equipment_master_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_equipment_master_content_1").getInputparamXML({
				screenID : "manage_equipment_master",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_equipment_master.variable.custom.selectedRecord = manage_equipment_master.variable.custom.grid_1.dataSource.getByUid(manage_equipment_master.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'EQPTMAST'",
				p_field_1 : "$manage_equipment_master.variable.custom.selectedRecord.equipment_id",
				p_field_2 : "$manage_equipment_master.variable.custom.selectedRecord.rec_tstamp"
			};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_equipment_master_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_equipment_master",
					service : "sp_retrieve_manage_equipment_master_list",
					request : "<signature><i_inputparam_xml>" + manage_equipment_master.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_equipment_master.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_equipment_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_equipment_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};
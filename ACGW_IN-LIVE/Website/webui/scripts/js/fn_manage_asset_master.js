var manage_asset_master = {
	constructScreen : function () {
		manage_asset_master.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
			applicationName : "mservice",
			serviceName : "retrieve_manage_asset_master_list",
			outputPath : "context/outputparam",
			pageSize : 50,
			inputParameter : {
				p_inputparam_xml : "manage_asset_master.customRequirementHandler.getFilterValues()"
			},
			schemaModel : true,
			screenID : "manage_asset_master",
			dataSourceName : "datasource_1",
			processResponse : true,
			serverPaging : true
		});
	},
	postConstruct : function () {
		manage_asset_master_filterArea = $("#manage_asset_master_pane2");
		$("#manage_asset_master_content_1 span dt").removeClass("term_one");
		$("#manage_asset_master_content_1 span dt").removeClass("term_two");
		$("#manage_asset_master_content_1 span dd.colen").html("");
		$("#manage_asset_master_content_1").find('dt').css("width","120px");
		$("#manage_asset_master_editor").append("<li id='manage_asset_master_grid_pager'></li>");
		$("#manage_asset_master_grid_pager").append($("#manage_asset_master_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_asset_master_grid_1").data("kendoGrid").bind("dataBound", manage_asset_master.customRequirementHandler.gridPager);
		if(manage_asset_master.variable.custom.autoLoadInd == "true") {
			manage_asset_master.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_asset_master_splitter[manage_asset_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_asset_master_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_asset_master_content_1",
					screenID : "manage_asset_master",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_asset_master_content_1",
				screenID : "manage_asset_master",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_asset_master.variable.custom.grid_1 = $("#manage_asset_master_grid_1").initializeWGrid({
				screenID : "manage_asset_master",
				dataSource : manage_asset_master.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_asset_master_panel_1").kendoPanelBar({
			select : function(e) {
				$("#manage_asset_master_panel_1").data("kendoPanelBar").select().find("span.k-link").css("box-shadow","none");
				$("#manage_asset_master_panel_1").data("kendoPanelBar").select().find("span.k-link").css("background-color","white");
				$("#manage_asset_master_panel_1").data("kendoPanelBar").select().find("span.k-header").css("background-color","#eae8e8");
				$("#manage_asset_master_panel_1").data("kendoPanelBar").select().find("span.k-state-selected").removeClass("k-state-selected");				
			}
		});
		$("#manage_asset_master_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_asset_master_editor").kendoMenu();		
		manage_asset_master_splitter = $("#manage_asset_master_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_asset_master.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_asset_master.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_asset_master.variable.custom.crudIndicator == "R") {
				manage_asset_master.variable.custom.grid_1.dataSource._skip = 0;
				manage_asset_master.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_asset_master_edit.js", "../../s_iscripts/save_manage_asset_master.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_asset_master",
						nextScreenID : "manage_asset_master_edit",
						nextScreenName : manage_asset_master.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_asset_master.variable.custom.miscID == "filters"){
				manage_asset_master_splitter[manage_asset_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_asset_master_filterArea);
			}
			if(manage_asset_master.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_asset_master_content_1",
					screenID : "manage_asset_master",
					matchCondition : ["_filter"]
				});
				$("#manage_asset_master_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_asset_master.variable.custom.selectedFeatureID == "manage_asset_maintenance_history") {
				if (manage_asset_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_asset_maintenance_history.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_asset_master",
							nextScreenID : "manage_asset_maintenance_history",
							nextScreenName : manage_asset_master.variable.custom.nextScreenName
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_asset_master.variable.custom.selectedFeatureID == "manage_asset_service_contract") {
				if (manage_asset_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_asset_service_contract.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_asset_master",
							nextScreenID : "manage_asset_service_contract",
							nextScreenName : manage_asset_master.variable.custom.nextScreenName
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_asset_master.variable.custom.selectedFeatureID == "manage_asset_service_visit_schedule") {
				if (manage_asset_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_asset_service_visit_schedule.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_asset_master",
							nextScreenID : "manage_asset_service_visit_schedule",
							nextScreenName : manage_asset_master.variable.custom.nextScreenName
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_asset_master.variable.custom.selectedFeatureID == "manage_asset_location") {
				if (manage_asset_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_asset_location.js", "../../s_iscripts/custominfo_setDetail.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_asset_master",
							fieldID: "manage_asset_master_child_window",
							nextScreenID : "manage_asset_location",
							nextScreenName : manage_asset_master.variable.custom.nextScreenName,
							execute: manage_asset_location.constructScreen
						});
					} else {
						alert("Sorry. This feature is unavailable. Please contact support desk.");
						return false;
					}
				} else {
					alert("No row has been selected.");
					return false;
				}
			} else if (manage_asset_master.variable.custom.selectedFeatureID == "manage_asset_parameter") {
				if (manage_asset_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_asset_parameter.js", "../../s_iscripts/custominfo_setDetail.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_asset_master",
							fieldID: "manage_asset_master_child_window",
							nextScreenID : "manage_asset_parameter",
							nextScreenName : manage_asset_master.variable.custom.nextScreenName,
							execute: manage_asset_parameter.constructScreen
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
		call_job_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_se.js"])) {
				var nextScreenProperties = $.grep(access_profile.user_functional_access, function (element, index) {
					return element.child_screen_id == "manage_call_register_se";
				});
				manage_call_register_se.variable.custom.linkRefInd = "true";
				webNavigationController.gotoNextScreen({
					screenID : "manage_asset_master",
					nextScreenID : "manage_call_register_se",
					nextScreenName : nextScreenProperties[0].child_feature_display_label
				});
				$("#manage_asset_master").remove();
				for(var index = 0; index < webNavigationController.variable.navigationMap.length; index++){
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_asset_master"){
						webNavigationController.variable.navigationMap.splice(index,1);
					}
					if(webNavigationController.variable.navigationMap[index].screenID == "manage_call_register_se"){
						webNavigationController.variable.navigationMap[index].parentScreenID = "home_container";
					}
				}
				screenID = "manage_call_register_se";
				webNavigationController.buildBreadCrumb();
				$("#manage_call_register_se_call_number_filter").setVal($(element).text());
				manage_call_register_se.variable.custom.grid_1.dataSource.read();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		actions_link_click : function (element,event){
			$("#manage_asset_master_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_asset_master_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_asset_master_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_asset_master_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_asset_master_content_1").getInputparamXML({
				screenID : "manage_asset_master",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_asset_master.variable.custom.selectedRecord = manage_asset_master.variable.custom.grid_1.dataSource.getByUid(manage_asset_master.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'ASSETMAST'",
				p_field_1 : "$manage_asset_master.variable.custom.selectedRecord.asset_id",
				p_field_2 : "$manage_asset_master.variable.custom.selectedRecord.rec_tstamp"
			};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_asset_master_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_asset_master",
					service : "sp_retrieve_manage_asset_master_list",
					request : "<signature><i_inputparam_xml>" + manage_asset_master.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_asset_master.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml></signature>",
					length : manage_asset_master.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_asset_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_asset_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};
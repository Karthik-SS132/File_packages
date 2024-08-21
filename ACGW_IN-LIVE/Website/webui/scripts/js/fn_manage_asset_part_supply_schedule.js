var manage_asset_part_supply_schedule = {
	constructScreen : function () {
		manage_asset_part_supply_schedule.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_manage_custom_info_list",
			outputPath : "outputparam_detail",
			api : true,
			pageSize : 50,
			inputParameter : {
				p_custom_info_code : "'asset_part_supply_schedule'",
				p_inputparam_xml : "manage_asset_part_supply_schedule.customRequirementHandler.getFilterValues()"
			},
			screenID : "manage_asset_part_supply_schedule",
			schemaModel : true,
			dataSourceName : "datasource_1",
			processResponse : true,
			serverPaging : true
		});
	},
	postConstruct : function () {
		manage_asset_part_supply_schedule_filterArea = $("#manage_asset_part_supply_schedule_pane2");
		$("#manage_asset_part_supply_schedule_content_1 span dt").removeClass("term_one");
		$("#manage_asset_part_supply_schedule_content_1 span dt").removeClass("term_two");
		$("#manage_asset_part_supply_schedule_content_1 span dd.colen").html("");
		$("#manage_asset_part_supply_schedule_content_1").find('dt').css("width","120px");
		$("#manage_asset_part_supply_schedule_editor").append("<li id='manage_asset_part_supply_schedule_grid_pager'></li>");
		$("#manage_asset_part_supply_schedule_grid_pager").append($("#manage_asset_part_supply_schedule_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_asset_part_supply_schedule_grid_1").data("kendoGrid").bind("dataBound", manage_asset_part_supply_schedule.customRequirementHandler.gridPager);
		if(manage_asset_part_supply_schedule.variable.custom.autoLoadInd == "true") {
			manage_asset_part_supply_schedule.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_asset_part_supply_schedule_splitter[manage_asset_part_supply_schedule_filterArea.width() > 0 ? "collapse" : "expand"](manage_asset_part_supply_schedule_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_asset_part_supply_schedule_content_1",
					screenID : "manage_asset_part_supply_schedule",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_asset_part_supply_schedule_content_1",
				screenID : "manage_asset_part_supply_schedule",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_asset_part_supply_schedule.variable.custom.grid_1 = $("#manage_asset_part_supply_schedule_grid_1").initializeWGrid({
			screenID : "manage_asset_part_supply_schedule",
			dataSource : manage_asset_part_supply_schedule.variable.custom.datasource_1,
			height : 500,
			pageSize : 50,
			filterable : false,
			sortable : true,
			pageable : false,
			toolbar : false
		});	
		$("#manage_asset_part_supply_schedule_editor").kendoMenu();	
		manage_asset_part_supply_schedule_splitter = $("#manage_asset_part_supply_schedule_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_asset_part_supply_schedule.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_asset_part_supply_schedule.variable.custom.crudIndicator == "R") {
				manage_asset_part_supply_schedule.variable.custom.grid_1.dataSource._skip = 0;
				manage_asset_part_supply_schedule.variable.custom.grid_1.dataSource.pageSize(50);
			}
		},
		misc_btn_click : function (element, event){
			if(manage_asset_part_supply_schedule.variable.custom.miscID == "filters"){
				manage_asset_part_supply_schedule_splitter[manage_asset_part_supply_schedule_filterArea.width() > 0 ? "collapse" : "expand"](manage_asset_part_supply_schedule_filterArea);
			}
			if(manage_asset_part_supply_schedule.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_asset_part_supply_schedule_content_1",
					screenID : "manage_asset_part_supply_schedule",
					matchCondition : ["_filter"]
				});
				$("#manage_asset_part_supply_schedule_filters_btn .k-i-filter").css("color","black");
			}
		}
	},
	linkEventHandler : {
		call_job_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_edit.js"])) {
				manage_call_register = {
					variable : {
						custom : {
							crudIndicator : "V",
							selectedRecord : {
								call_no : $(element).text()
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
					screenID : "manage_asset_part_supply_schedule",
					nextScreenID : "manage_call_register_edit",
					nextScreenName : $(element).text()
				});
				$("#manage_call_register_edit_submit_btn").hide();
				$("#manage_call_register_edit").enableViewMode();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_asset_part_supply_schedule_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_asset_part_supply_schedule_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_asset_part_supply_schedule_content_1").getInputparamXML({
				screenID : "manage_asset_part_supply_schedule",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_asset_part_supply_schedule.variable.custom.selectedRecord = manage_asset_part_supply_schedule.variable.custom.grid_1.dataSource.getByUid(manage_asset_part_supply_schedule.variable.custom.grid_1.select().data("uid"));
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_asset_part_supply_schedule_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_asset_part_supply_schedule",
					service : "sp_retrieve_manage_custom_info_list",
					request : "<signature><i_inputparam_xml>" + manage_asset_part_supply_schedule.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_asset_part_supply_schedule.variable.custom.grid_1.dataSource.data().length + "</take></inputparam>") + "</i_inputparam_xml><i_custom_info_code>asset_part_supply_schedule</i_custom_info_code><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_asset_part_supply_schedule.variable.custom.grid_1.dataSource.data().length
				};
			}
		}
	},
	variable : {
		standard : {},
		custom : {}
	}
};
var manage_asset_service_visit_schedule = {
	constructScreen : function () {
		if (webNavigationController.getPreviousScreenID() != "home_container") {
			manage_asset_service_visit_schedule.variable.custom.asset_id_filter_defaultValue = manage_asset_master.variable.custom.selectedRecord.asset_id;
			manage_asset_service_visit_schedule.variable.custom.asset_id_filter_defaultValueDescription = manage_asset_master.variable.custom.selectedRecord.asset_desc;
		}
		manage_asset_service_visit_schedule.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
			applicationName : "mservice",
			serviceName : "retrieve_manage_asset_service_visit_schedule",
			outputPath : "context/outputparam_detail",
			pageSize : 50,
			inputParameter : {
				p_inputparam_xml : "manage_asset_service_visit_schedule.customRequirementHandler.getFilterValues()"
			},
			schemaModel : true,
			screenID : "manage_asset_service_visit_schedule",
			dataSourceName : "datasource_1",
			processResponse : true,
			serverPaging : true
		});
	},
	postConstruct : function () {
		if (webNavigationController.getPreviousScreenID() != "home_container") {
			$("#manage_asset_service_visit_schedule_retrieve_btn").hide();
			manage_asset_service_visit_schedule.variable.custom.grid_1.dataSource.pageSize(50);
		} else {
			$("#manage_asset_service_visit_schedule_footer").css("display","none");
		}
		manage_asset_service_visit_schedule_filterArea = $("#manage_asset_service_visit_schedule_pane2");
		$("#manage_asset_service_visit_schedule_content_1 span dt").removeClass("term_one");
		$("#manage_asset_service_visit_schedule_content_1 span dt").removeClass("term_two");
		$("#manage_asset_service_visit_schedule_content_1 span dd.colen").html("");
		$("#manage_asset_service_visit_schedule_content_1").find('dt').css("width","120px");
		$("#manage_asset_service_visit_schedule_editor").append("<li id='manage_asset_service_visit_schedule_grid_pager'></li>");
		$("#manage_asset_service_visit_schedule_grid_pager").append($("#manage_asset_service_visit_schedule_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_asset_service_visit_schedule_grid_1").data("kendoGrid").bind("dataBound", manage_asset_service_visit_schedule.customRequirementHandler.gridPager);
		if(manage_asset_service_visit_schedule.variable.custom.autoLoadInd == "true") {
			manage_asset_service_visit_schedule.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_asset_service_visit_schedule_splitter[manage_asset_service_visit_schedule_filterArea.width() > 0 ? "collapse" : "expand"](manage_asset_service_visit_schedule_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_asset_service_visit_schedule_content_1",
					screenID : "manage_asset_service_visit_schedule",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_asset_service_visit_schedule_content_1",
				screenID : "manage_asset_service_visit_schedule",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_asset_service_visit_schedule.variable.custom.grid_1 = $("#manage_asset_service_visit_schedule_grid_1").initializeWGrid({
			screenID : "manage_asset_service_visit_schedule",
			dataSource : manage_asset_service_visit_schedule.variable.custom.datasource_1,
			height : 500,
			pageSize : 50,
			filterable : false,
			sortable : true,
			pageable : false,
			toolbar : false
		});
		$("#manage_asset_service_visit_schedule_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_asset_service_visit_schedule_editor").kendoMenu();		
		manage_asset_service_visit_schedule_splitter = $("#manage_asset_service_visit_schedule_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_asset_service_visit_schedule.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_asset_service_visit_schedule.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_asset_service_visit_schedule.variable.custom.crudIndicator == "R") {
				manage_asset_service_visit_schedule.variable.custom.grid_1.dataSource._skip = 0;
				manage_asset_service_visit_schedule.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_asset_service_visit_schedule_edit.js", "../../s_iscripts/save_manage_asset_service_visit.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_asset_service_visit_schedule",
						nextScreenID : "manage_asset_service_visit_schedule_edit",
						nextScreenName : manage_asset_service_visit_schedule.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_asset_service_visit_schedule.variable.custom.miscID == "filters"){
				manage_asset_service_visit_schedule_splitter[manage_asset_service_visit_schedule_filterArea.width() > 0 ? "collapse" : "expand"](manage_asset_service_visit_schedule_filterArea);
			}
			if(manage_asset_service_visit_schedule.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_asset_service_visit_schedule_content_1",
					screenID : "manage_asset_service_visit_schedule",
					matchCondition : ["_filter"]
				});
				$("#manage_asset_service_visit_schedule_filters_btn .k-i-filter").css("color","black");
			}
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_asset_service_visit_schedule_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_asset_service_visit_schedule_contextMenu").show();
		},
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
					screenID : "manage_asset_service_visit_schedule",
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
			$("#manage_asset_service_visit_schedule_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_asset_service_visit_schedule_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_asset_service_visit_schedule_content_1").getInputparamXML({
				screenID : "manage_asset_service_visit_schedule",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_asset_service_visit_schedule.variable.custom.selectedRecord = manage_asset_service_visit_schedule.variable.custom.grid_1.dataSource.getByUid(manage_asset_service_visit_schedule.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'ASSETSERVVISIT'",
				p_field_1 : "$manage_asset_service_visit_schedule.variable.custom.selectedRecord.asset_id",
				p_field_2 : "$manage_asset_service_visit_schedule.variable.custom.selectedRecord.contract_doc_no",
				p_field_3 : "$manage_asset_service_visit_schedule.variable.custom.selectedRecord.service_visit_no",
			};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_asset_service_visit_schedule_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_asset_service_visit_schedule",
					service : "sp_retrieve_manage_asset_service_visit_schedule",
					request : "<signature><i_inputparam_xml>" + manage_asset_service_visit_schedule.customRequirementHandler.getFilterValues() + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_asset_service_visit_schedule.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_asset_service_visit_schedule_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_asset_service_visit_schedule_grid_1",
						dispalyLabel : "Data Print"
					}
				]
			}
		},
		custom : {}
	}
};
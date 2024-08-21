var manage_code_maintenance = {
	constructScreen : function () {
		manage_code_maintenance.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_manage_code_list",
			outputPath : "context/outputparam_detail",
			pageSize : 50,
			inputParameter : {
				p_country_code_filter : "$login_profile.country_code",
				p_locale_id_filter : "$login_profile.locale_id",
				p_code_type_filter : "#manage_code_maintenance_code_type_filter"
			},
			schemaModel : true,
			screenID : "manage_code_maintenance",
			dataSourceName : "datasource_1",
			processResponse : true
		});
	},
	postConstruct : function () {
		manage_code_maintenance_filterArea = $("#manage_code_maintenance_pane2");
		$("#manage_code_maintenance_content_1 span dt").removeClass("term_one");
		$("#manage_code_maintenance_content_1 span dt").removeClass("term_two");
		$("#manage_code_maintenance_content_1 span dd.colen").html("");
		$("#manage_code_maintenance_content_1").find('dt').css("width","120px");
		$("#manage_code_maintenance_editor").append("<li id='manage_code_maintenance_grid_pager'></li>");
		$("#manage_code_maintenance_grid_pager").append($("#manage_code_maintenance_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_code_maintenance_grid_1").data("kendoGrid").bind("dataBound", manage_code_maintenance.customRequirementHandler.gridPager);
		if(manage_code_maintenance.variable.custom.autoLoadInd == "true") {
			manage_code_maintenance.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_code_maintenance_splitter[manage_code_maintenance_filterArea.width() > 0 ? "collapse" : "expand"](manage_code_maintenance_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_code_maintenance_content_1",
					screenID : "manage_code_maintenance",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_code_maintenance_content_1",
				screenID : "manage_code_maintenance",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		$("#manage_code_maintenance_code_type_filter").initializeWDropdownlist({
			screenID : "manage_code_maintenance",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CODETYPES_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			filterMode : true
		});
		manage_code_maintenance.variable.custom.grid_1 = $("#manage_code_maintenance_grid_1").initializeWGrid({
				screenID : "manage_code_maintenance",
				dataSource : manage_code_maintenance.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_code_maintenance_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_code_maintenance_editor").kendoMenu();		
		manage_code_maintenance_splitter = $("#manage_code_maintenance_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_code_maintenance.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_code_maintenance.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_code_maintenance.variable.custom.crudIndicator == "R") {
				manage_code_maintenance.variable.custom.grid_1.dataSource._skip = 0;
				manage_code_maintenance.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if(manage_code_maintenance.variable.custom.crudIndicator == "A"){
					manage_code_maintenance.variable.custom.nextScreenName = "Add";
				}
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_code_maintenance_edit.js", "../../s_iscripts/save_code_value_detail.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_code_maintenance",
						fieldID : "manage_code_maintenance_child_window",
						nextScreenID : "manage_code_maintenance_edit",
						nextScreenName : manage_code_maintenance.variable.custom.nextScreenName,
						execute : manage_code_maintenance_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_code_maintenance.variable.custom.miscID == "filters"){
				manage_code_maintenance_splitter[manage_code_maintenance_filterArea.width() > 0 ? "collapse" : "expand"](manage_code_maintenance_filterArea);
			}
			if(manage_code_maintenance.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_code_maintenance_content_1",
					screenID : "manage_code_maintenance",
					matchCondition : ["_filter"]
				});
				$("#manage_code_maintenance_filters_btn .k-i-filter").css("color","black");
			}
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_code_maintenance_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_code_maintenance_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_code_maintenance_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_code_maintenance_grid_1").find(".k-grid-header").height());
		},
		setSelectedRecord : function () {
			manage_code_maintenance.variable.custom.selectedRecord = manage_code_maintenance.variable.custom.grid_1.dataSource.getByUid(manage_code_maintenance.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'CODEMAINTENANCE'",
				p_field_1 : "$manage_code_maintenance.variable.custom.selectedRecord.code_type",
				p_field_2 : "$manage_code_maintenance.variable.custom.selectedRecord.code",
				p_field_3 : "$manage_code_maintenance.variable.custom.selectedRecord.rec_tstamp"
			};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_code_maintenance_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_code_maintenance",
					service : "sp_retrieve_manage_code_maintenance_list",
					request : "<signature><i_inputparam_xml>" + manage_code_maintenance.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml></signature>",
					length : manage_code_maintenance.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_code_maintenance_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_code_maintenance_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			datasource_1 : "",
			grid_1 : "",
			nextScreenName : "",
			selectedRecord : "",
			crudIndicator : ""
		},
	}
};
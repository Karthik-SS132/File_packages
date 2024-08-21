var manage_functional_role_employee = {
	constructScreen : function () {
		manage_functional_role_employee.variable.custom.functionalRoleListDataSource = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'FUNCTIONAL_ROLE_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				}
			});
		manage_functional_role_employee.variable.custom.functionalRoleListDataSource.read();
		manage_functional_role_employee.variable.custom.functionalRoleList = manage_functional_role_employee.variable.custom.functionalRoleListDataSource.data();
		manage_functional_role_employee.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_functional_role_employee_list",
				outputPath : "context/outputparam_detail",
				pageSize : 50,
				inputParameter : {
					p_inputparam_xml : "manage_functional_role_employee.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_functional_role_employee",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_functional_role_employee_filterArea = $("#manage_functional_role_employee_pane2");
		$("#manage_functional_role_employee_content_1 span dt").removeClass("term_one");
		$("#manage_functional_role_employee_content_1 span dt").removeClass("term_two");
		$("#manage_functional_role_employee_content_1 span dd.colen").html("");
		$("#manage_functional_role_employee_content_1").find('dt').css("width","120px");
		$("#manage_functional_role_employee_editor").append("<li id='manage_functional_role_employee_grid_pager'></li>");
		$("#manage_functional_role_employee_grid_pager").append($("#manage_functional_role_employee_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_functional_role_employee_grid_1").data("kendoGrid").bind("dataBound", manage_functional_role_employee.customRequirementHandler.gridPager);
		if(manage_functional_role_employee.variable.custom.autoLoadInd == "true") {
			manage_functional_role_employee.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_functional_role_employee_splitter[manage_functional_role_employee_filterArea.width() > 0 ? "collapse" : "expand"](manage_functional_role_employee_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_functional_role_employee_content_1",
					screenID : "manage_functional_role_employee",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_functional_role_employee_content_1",
				screenID : "manage_functional_role_employee",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_functional_role_employee.variable.custom.grid_1 = $("#manage_functional_role_employee_grid_1").initializeWGrid({
				screenID : "manage_functional_role_employee",
				dataSource : manage_functional_role_employee.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
	   $("#manage_functional_role_employee_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_functional_role_employee_editor").kendoMenu();		
		manage_functional_role_employee_splitter = $("#manage_functional_role_employee_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_functional_role_employee.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_functional_role_employee.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_functional_role_employee.variable.custom.crudIndicator == "R") {
				manage_functional_role_employee.variable.custom.grid_1.dataSource._skip = 0;
				manage_functional_role_employee.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_functional_role_employee_edit.js", "../../s_iscripts/save_manage_functional_role_employee.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_functional_role_employee",
						fieldID : "manage_functional_role_employee_child_window",
						nextScreenID : "manage_functional_role_employee_edit",
						nextScreenName : manage_functional_role_employee.variable.custom.nextScreenName,
						execute : manage_functional_role_employee_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
	    misc_btn_click : function (element, event){
			if(manage_functional_role_employee.variable.custom.miscID == "filters"){
				manage_functional_role_employee_splitter[manage_functional_role_employee_filterArea.width() > 0 ? "collapse" : "expand"](manage_functional_role_employee_filterArea);
			}
			if(manage_functional_role_employee.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_functional_role_employee_content_1",
					screenID : "manage_functional_role_employee",
					matchCondition : ["_filter"]
				});
				$("#manage_functional_role_employee_filters_btn .k-i-filter").css("color","black");
			}
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_functional_role_employee_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_functional_role_employee_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_functional_role_employee_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_functional_role_employee_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_functional_role_employee_content_1").getInputparamXML({
				screenID : "manage_functional_role_employee",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_functional_role_employee.variable.custom.selectedRecord = manage_functional_role_employee.variable.custom.grid_1.dataSource.getByUid(manage_functional_role_employee.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'FUNC_ROLE_EMP'",
				p_field_1 : "$manage_functional_role_employee.variable.custom.selectedRecord.emp_id",
				p_field_2 : "$manage_functional_role_employee.variable.custom.selectedRecord.func_role",
				p_field_3 : "$manage_functional_role_employee.variable.custom.selectedRecord.rec_tstamp"
			};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_functional_role_employee_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_functional_role_employee",
					service : "sp_retrieve_manage_functional_role_employee_list",
					request : "<signature><i_inputparam_xml>" + manage_functional_role_employee.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_functional_role_employee.variable.custom.grid_1.dataSource.data().length
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
				imformationType : 'functional_role_employee'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_functional_role_employee_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_functional_role_employee_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};
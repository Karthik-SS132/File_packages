var manage_employee_master = {
	constructScreen : function () {
		manage_employee_master.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_employee_list",
				outputPath : "context/outputparam_detail",
				pageSize : 50,
				inputParameter : {
					p_inputparam_xml : "manage_employee_master.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_employee_master",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_employee_master_filterArea = $("#manage_employee_master_pane2");
		$("#manage_employee_master_content_1 span dt").removeClass("term_one");
		$("#manage_employee_master_content_1 span dt").removeClass("term_two");
		$("#manage_employee_master_content_1 span dd.colen").html("");
		$("#manage_employee_master_content_1").find('dt').css("width","120px");
		$("#manage_employee_master_editor").append("<li id='manage_employee_master_grid_pager'></li>");
		$("#manage_employee_master_grid_pager").append($("#manage_employee_master_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_employee_master_grid_1").data("kendoGrid").bind("dataBound", manage_employee_master.customRequirementHandler.gridPager);
		if(manage_employee_master.variable.custom.autoLoadInd == "true") {
			manage_employee_master.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_employee_master_splitter[manage_employee_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_employee_master_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_employee_master_content_1",
					screenID : "manage_employee_master",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_employee_master_content_1",
				screenID : "manage_employee_master",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_employee_master.variable.custom.grid_1 = $("#manage_employee_master_grid_1").initializeWGrid({
				screenID : "manage_employee_master",
				dataSource : manage_employee_master.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_employee_master_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_employee_master_editor").kendoMenu();		
		manage_employee_master_splitter = $("#manage_employee_master_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_employee_master.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_employee_master.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_employee_master.variable.custom.crudIndicator == "R") {
				manage_employee_master.variable.custom.grid_1.dataSource._skip = 0;
				manage_employee_master.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_employee_master_edit.js", "../../s_iscripts/save_manage_employee.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_employee_master",
						nextScreenID : "manage_employee_master_edit",
						nextScreenName : manage_employee_master.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_employee_master.variable.custom.miscID == "filters"){
				manage_employee_master_splitter[manage_employee_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_employee_master_filterArea);
			}
			if(manage_employee_master.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_employee_master_content_1",
					screenID : "manage_employee_master",
					matchCondition : ["_filter"]
				});
				$("#manage_employee_master_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_employee_master.variable.custom.selectedFeatureID == "activate_or_deactivate_employee") {
				if (manage_employee_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/activate_deactivate_employee.js"])) {
						var activeIndValue,
						confirmationMessage,
						alertMessage,
						returnValue;
						if (manage_employee_master.variable.custom.selectedRecord.status == "IA") {
							activeIndValue = "A";
							confirmationMessage = "Do you want to activate this employee?";
							alertMessage = "Employee activated successfully";
						} else if (manage_employee_master.variable.custom.selectedRecord.status == "A") {
							activeIndValue = "IA";
							confirmationMessage = "Do you want to deactivate this employee?";
							alertMessage = "Employee deactivated successfully";
						}
						if (confirm(confirmationMessage)) {
							returnValue = executeService_activate_deactivate_employee({
									p_employee_id : manage_employee_master.variable.custom.selectedRecord.employee_id,
									p_activate_deactivate_ind : activeIndValue,
									p_rec_tstamp : manage_employee_master.variable.custom.selectedRecord.rec_tstamp
								});
							if (returnValue == "SP001") {
								alert(alertMessage);
								manage_employee_master.variable.custom.grid_1.dataSource.pageSize(50);
							} else {
								alert("Unable to process your request. Please contact support desk.");
							}
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
		}
	},
	linkEventHandler : {
		actions_link_click : function (element,event){
			$("#manage_employee_master_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_employee_master_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_employee_master_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_employee_master_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_employee_master_content_1").getInputparamXML({
				screenID : "manage_employee_master",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_employee_master.variable.custom.selectedRecord = manage_employee_master.variable.custom.grid_1.dataSource.getByUid(manage_employee_master.variable.custom.grid_1.select().data("uid"));
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_employee_master_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_employee_master",
					service : "sp_retrieve_manage_employee_list",
					request : "<signature><i_inputparam_xml>" + manage_employee_master.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip></skip><take></take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_employee_master.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_employee_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_employee_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};
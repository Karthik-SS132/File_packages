var manage_customer_master = {
	constructScreen : function () {
		manage_customer_master.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_customer_master_list",
				outputPath : "context/outputparam",
				pageSize : 50,
				inputParameter : {
					p_inputparam_xml : "manage_customer_master.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_customer_master",
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
		manage_customer_master_filterArea = $("#manage_customer_master_pane2");
		$("#manage_customer_master_content_1 span dt").removeClass("term_one");
		$("#manage_customer_master_content_1 span dt").removeClass("term_two");
		$("#manage_customer_master_content_1 span dd.colen").html("");
		$("#manage_customer_master_content_1").find('dt').css("width","120px");
		$("#manage_customer_master_editor").append("<li id='manage_customer_master_grid_pager'></li>");
		$("#manage_customer_master_grid_pager").append($("#manage_customer_master_grid_1").find(".k-grid-pager")).css("width","350px").css("float","right").children().css("border-top-width","0px");
		$("#manage_customer_master_grid_1").data("kendoGrid").bind("dataBound", manage_customer_master.customRequirementHandler.gridPager);
		if(manage_customer_master.variable.custom.autoLoadInd == "true") {
			manage_customer_master.variable.custom.grid_1.dataSource.pageSize(50);
		}
		setTimeout(function(){
			manage_customer_master_splitter[manage_customer_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_customer_master_filterArea);
			$("#" + screenID).delegate(webWidgetInitializer.variable.widgetSelector, "change", function () {
				mserviceUtilities.resetFilterIndicator({
					contentID : "manage_customer_master_content_1",
					screenID : "manage_customer_master",
					matchCondition : ["_filter"]
				});
			});
			mserviceUtilities.resetFilterIndicator({
				contentID : "manage_customer_master_content_1",
				screenID : "manage_customer_master",
				matchCondition : ["_filter"]
			});
		}, 30);
	},
	initializeWidgets : function () {
		manage_customer_master.variable.custom.grid_1 = $("#manage_customer_master_grid_1").initializeWGrid({
				screenID : "manage_customer_master",
				dataSource : manage_customer_master.variable.custom.datasource_1,
				height : 500,
				pageSize : 50,
				filterable : false,
				sortable : true,
				pageable : false,
				toolbar : false
			});
		$("#manage_customer_master_contextMenu").kendoContextMenu({
			orientation: "vertical",
			target: "[data-widget-type = 'w_link'][data-link-type = 'actions']",
		});
		$("#manage_customer_master_editor").kendoMenu();		
		manage_customer_master_splitter = $("#manage_customer_master_splitter").kendoSplitter({
			panes: [
				{ collapsible: true, size: 330 ,resizable: false },
				{ }
			],
			resize: function(e) {
				manage_customer_master.customRequirementHandler.gridPager();
			}
		}).data("kendoSplitter");
	},
	refreshScreen : function () {
		manage_customer_master.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_customer_master.variable.custom.crudIndicator == "R") {
				manage_customer_master.variable.custom.grid_1.dataSource._skip = 0;
				manage_customer_master.variable.custom.grid_1.dataSource.pageSize(50);
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_master_edit.js", "../../s_iscripts/save_manage_customer_master.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_customer_master",
						nextScreenID : "manage_customer_master_edit",
						nextScreenName : manage_customer_master.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		misc_btn_click : function (element, event){
			if(manage_customer_master.variable.custom.miscID == "filters"){
				manage_customer_master_splitter[manage_customer_master_filterArea.width() > 0 ? "collapse" : "expand"](manage_customer_master_filterArea);
			}
			if(manage_customer_master.variable.custom.miscID == "clear_filters"){
				mserviceUtilities.resetInputparamXML({
					contentID : "manage_customer_master_content_1",
					screenID : "manage_customer_master",
					matchCondition : ["_filter"]
				});
				$("#manage_customer_master_filters_btn .k-i-filter").css("color","black");
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_customer_master.variable.custom.selectedFeatureID == "manage_customer_location") {
				if (manage_customer_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_location.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_customer_master",
							nextScreenID : "manage_customer_location",
							nextScreenName : manage_customer_master.variable.custom.nextScreenName
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
			if (manage_customer_master.variable.custom.selectedFeatureID == "manage_customer_fleet") {
				if (manage_customer_master.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_fleet.js", "../../s_iscripts/custominfo_setDetail.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_customer_master",
							nextScreenID : "manage_customer_fleet",
							nextScreenName : manage_customer_master.variable.custom.nextScreenName
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
			$("#manage_customer_master_contextMenu").data("kendoContextMenu").open(element);
			$("#manage_customer_master_contextMenu").show();
		}
	},
	customRequirementHandler : {
		gridPager : function () {
			$("#manage_customer_master_grid_1").find(".k-grid-content").css("height", 498 - $("#manage_customer_master_grid_1").find(".k-grid-header").height());
		},
		getFilterValues : function () {
			return $("#manage_customer_master_content_1").getInputparamXML({
				screenID : "manage_customer_master",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_customer_master.variable.custom.selectedRecord = manage_customer_master.variable.custom.grid_1.dataSource.getByUid(manage_customer_master.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'CUSTMAST'",
				p_field_1 : "$manage_customer_master.variable.custom.selectedRecord.cust_id"
			};
		}, 
		getExportConfig : function (gridId) {
			if(gridId == "manage_customer_master_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_customer_master",
					service : "sp_retrieve_manage_customer_master_list",
					request : "<signature><i_inputparam_xml>" + manage_customer_master.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_customer_master.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_customer_master.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_customer_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_customer_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};
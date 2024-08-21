var manage_asset_parameter = {
	constructScreen : function () {
		if (webNavigationController.getPreviousScreenID() != "home_container") {
			manage_asset_parameter.variable.custom.asset_id_filter_defaultValue = manage_asset_master.variable.custom.selectedRecord.asset_id;
			manage_asset_parameter.variable.custom.asset_id_filter_defaultValueDescription = manage_asset_master.variable.custom.selectedRecord.asset_desc;
			manage_asset_parameter.variable.custom.asset_id_indicator = true;
		}
		manage_asset_parameter.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_manage_custom_info_list",
			outputPath : "outputparam_detail",
			api : true,
			pageSize : 50,
			inputParameter : {
				p_custom_info_code : "'asset_parameter_list'",
				p_inputparam_xml : "manage_asset_parameter.customRequirementHandler.getFilterValues()"
			},
			screenID : "manage_asset_parameter",
			schemaModel : true,
			dataSourceName : "datasource_1",
			processResponse : true,
			serverPaging : true
		});
	},
	postConstruct : function () {
		if (webNavigationController.getPreviousScreenID() != "home_container") {
			manage_asset_parameter.variable.custom.datasource_1.pageSize(50);
		} else {
			$("#manage_asset_parameter_cancel_btn").hide();
		}
	},
	initializeWidgets : function () {
		manage_asset_parameter.variable.custom.grid_1 = $("#manage_asset_parameter_grid_1").initializeWGrid({
			screenID : "manage_asset_parameter",
			toolbar : "#manage_asset_parameter_grid_1_toolbar_template",
			dataSource : manage_asset_parameter.variable.custom.datasource_1,
			height : 400,
			pageSize : 50
		});
	},
	refreshScreen : function () {
		manage_asset_parameter.variable.custom.grid_1.dataSource.pageSize(50);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_asset_parameter.variable.custom.crudIndicator == "R") {
				manage_asset_parameter.variable.custom.grid_1.dataSource._skip = 0;
				manage_asset_parameter.variable.custom.grid_1.dataSource.pageSize(50);
			} else if (webNavigationController.getPreviousScreenID() != "home_container") {
				
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_asset_parameter_edit.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_asset_parameter",
						fieldID : "manage_asset_parameter_child_window",
						nextScreenID : "manage_asset_parameter_edit",
						nextScreenName : manage_asset_parameter.variable.custom.nextScreenName,
						execute : manage_asset_parameter_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
			else 
			{
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_asset_parameter_edit.js", "../../s_iscripts/custominfo_setDetail.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_asset_parameter",
						fieldID : "manage_asset_parameter_child_window",
						nextScreenID : "manage_asset_parameter_edit",
						nextScreenName : manage_asset_parameter.variable.custom.nextScreenName,
						execute : manage_asset_parameter_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		}
	},
	customRequirementHandler : {
		getFilterValues : function () {
			return $("#manage_asset_parameter_content_1").getInputparamXML({
				screenID : "manage_asset_parameter",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_asset_parameter.variable.custom.selectedRecord = manage_asset_parameter.variable.custom.grid_1.dataSource.getByUid(manage_asset_parameter.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'ASSETPARAMETERLOG'",
				p_field_1 : "$manage_asset_parameter.variable.custom.selectedRecord.asset_id",
				p_field_2 : "$manage_asset_parameter.variable.custom.selectedRecord.rec_tstamp"
			};
		},
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}
			],
			exportConfiguration : {
				mode : 'single',
				content : [{
						exportType : "grid",
						fieldId : "manage_asset_parameter_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : 'single',
				content : [{
						type : "grid",
						fieldId : "manage_asset_parameter_grid_1",
						dispalyLabel : "Data Print"
					}
				]
			}
		},
		custom : {}
	}
};
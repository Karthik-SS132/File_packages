var manage_country_master = {
	constructScreen : function () {
		manage_country_master.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_country_master",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				schemaModel : true,
				screenID : "manage_country_master",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function () {
		manage_country_master.variable.custom.grid_1.dataSource.read();
	},
	initializeWidgets : function () {
		manage_country_master.variable.custom.grid_1 = $("#manage_country_master_grid_1").initializeWGrid({
				screenID : "manage_country_master",
				toolbar : "#manage_country_master_grid_1_toolbar_template",
				dataSource : manage_country_master.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	refreshScreen : function () {
		manage_country_master.variable.custom.grid_1.dataSource.read();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_country_master_edit.js", "../../s_iscripts/save_manage_country_master.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_country_master",
					fieldID : "manage_country_master_child_window",
					nextScreenID : "manage_country_master_edit",
					nextScreenName : manage_country_master.variable.custom.nextScreenName,
					execute : manage_country_master_edit.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function () {
			manage_country_master.variable.custom.selectedRecord = manage_country_master.variable.custom.grid_1.dataSource.getByUid(manage_country_master.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'COUNTRYMAST'",
				p_field_1 : "$manage_country_master.variable.custom.selectedRecord.code"
			};
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
						fieldId : "manage_country_master_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_country_master_grid_1",
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
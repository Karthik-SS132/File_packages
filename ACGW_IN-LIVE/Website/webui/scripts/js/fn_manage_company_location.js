var manage_company_location = {
	constructScreen : function () {
		manage_company_location.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_company_location_list",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_comploc_company_id : "$login_profile.client_id"
				},
				schemaModel : true,
				screenID : "manage_company_location",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function () {
		manage_company_location.variable.custom.grid_1.dataSource.read();
	},
	initializeWidgets : function () {
		manage_company_location.variable.custom.grid_1 = $("#manage_company_location_grid_1").initializeWGrid({
				screenID : "manage_company_location",
				toolbar : "#manage_company_location_grid_1_toolbar_template",
				dataSource : manage_company_location.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	refreshScreen : function () {
		manage_company_location.variable.custom.grid_1.dataSource.read();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_company_location_edit.js", "../../s_iscripts/save_manage_company_location.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_company_location",
					nextScreenID : "manage_company_location_edit",
					nextScreenName : manage_company_location.variable.custom.nextScreenName,
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function () {
			manage_company_location.variable.custom.selectedRecord = manage_company_location.variable.custom.grid_1.dataSource.getByUid(manage_company_location.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'COMPANYLOCATION'",
				p_field_1 : "$manage_company_location.variable.custom.selectedRecord.comp_loc_code"
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
						fieldId : "manage_company_location_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_company_location_grid_1",
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
		}
	}
};

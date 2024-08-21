var manage_dealer_location = {
	constructScreen : function () {
		if (webNavigationController.getPreviousScreenID() != "home_container") {
			manage_dealer_location.variable.custom.dealer_id_filter_defaultValue = manage_dealer_master.variable.custom.selectedRecord.id;
			manage_dealer_location.variable.custom.dealer_id_filter_defaultValueDescription = manage_dealer_master.variable.custom.selectedRecord.short_name;
		}
		manage_dealer_location.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName : "common_modules",
			serviceName : "retrieve_manage_dealer_location_list",
			outputPath : "context/outputparam",
			pageSize : 10,
			inputParameter : {
				p_inputparam_xml : "manage_dealer_location.customRequirementHandler.getFilterValues()"
			},
			schemaModel : true,
			screenID : "manage_dealer_location",
			dataSourceName : "datasource_1",
			processResponse : true
		});
	},
	postConstruct : function () {
		manage_dealer_location.variable.custom.grid_1.dataSource.read();
	},
	initializeWidgets : function () {
		manage_dealer_location.variable.custom.grid_1 = $("#manage_dealer_location_grid_1").initializeWGrid({
			screenID : "manage_dealer_location",
			toolbar : "#manage_dealer_location_grid_1_toolbar_template",
			dataSource : manage_dealer_location.variable.custom.datasource_1,
			height : 400,
			pageSize : 10
		});
	},
	refreshScreen : function () {
		manage_dealer_location.variable.custom.grid_1.dataSource.read();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_dealer_location_edit.js", "../../s_iscripts/save_manage_dealer_location.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_dealer_location",
					nextScreenID : "manage_dealer_location_edit",
					nextScreenName : manage_dealer_location.variable.custom.nextScreenName
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
	},
	customRequirementHandler : {
		getFilterValues : function () {
			return $("#manage_dealer_location_content_1").getInputparamXML({
				screenID : "manage_dealer_location",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_dealer_location.variable.custom.selectedRecord = manage_dealer_location.variable.custom.grid_1.dataSource.getByUid(manage_dealer_location.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'DEALER_LOC_MASTER'",
				p_field_1 : "$manage_dealer_location.variable.custom.selectedRecord.id",
				p_field_2 : "$manage_dealer_location.variable.custom.selectedRecord.location_code",
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
						fieldId : "manage_dealer_location_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_dealer_location_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};
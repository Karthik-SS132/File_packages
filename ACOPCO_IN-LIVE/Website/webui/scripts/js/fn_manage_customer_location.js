var manage_customer_location = {
	constructScreen : function () {
		if (webNavigationController.getPreviousScreenID() != "home_container") {
			manage_customer_location.variable.custom.customer_id_filter_defaultValue = manage_customer_master.variable.custom.selectedRecord.cust_id;
		}
		manage_customer_location.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_customer_loc_list",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "manage_customer_location.customRequirementHandler.getFilterValues()"
				},
				schemaModel : true,
				screenID : "manage_customer_location",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function () {
	if (webNavigationController.getPreviousScreenID() != "home_container") {
			$("#manage_customer_location_retrieve_btn").hide();
			manage_customer_location.variable.custom.datasource_1.read();
		}else {
			$("#manage_customer_location_footer").hide();
		}
	},
	initializeWidgets : function () {
		manage_customer_location.variable.custom.grid_1 = $("#manage_customer_location_grid_1").initializeWGrid({
				screenID : "manage_customer_location",
				toolbar : "#manage_customer_location_grid_1_toolbar_template",
				dataSource : manage_customer_location.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	refreshScreen : function () {
		manage_customer_location.variable.custom.grid_1.dataSource.read();
		if(manage_customer_location.variable.custom.crudIndicator != "D"){
			manage_customer_location.variable.custom.grid_1.dataSource.pageSize(10);
		}
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_customer_location.variable.custom.crudIndicator == "R") {
				manage_customer_location.variable.custom.grid_1.dataSource.read();
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_location_edit.js", "../../s_iscripts/save_manage_customer_loc_details.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_customer_location",
						nextScreenID : "manage_customer_location_edit",
						nextScreenName : manage_customer_location.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_customer_location.variable.custom.selectedFeatureID == "manage_customer_location") {
				if (manage_customer_location.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_customer_location.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_customer_location",
							nextScreenID : "manage_customer_location",
							nextScreenName : manage_customer_location.variable.custom.nextScreenName
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
	customRequirementHandler : {
		getFilterValues : function () {
			return $("#manage_customer_location_content_1").getInputparamXML({
				screenID : "manage_customer_location",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_customer_location.variable.custom.selectedRecord = manage_customer_location.variable.custom.grid_1.dataSource.getByUid(manage_customer_location.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'CUSTLOC'",
				p_field_1 : "$manage_customer_location.variable.custom.selectedRecord.customer_id",
				p_field_2 : "$manage_customer_location.variable.custom.selectedRecord.location_code",
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
						fieldId : "manage_customer_location_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_customer_location_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};
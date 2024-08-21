var manage_financier_location = {
	constructScreen : function () {
		if (webNavigationController.getPreviousScreenID() != "home_container") {
			manage_financier_location.variable.custom.financier_id_filter_defaultValue = manage_financier.variable.custom.selectedRecord.financier_id;
			manage_financier_location.variable.custom.financier_name_filter_defaultValue = manage_financier.variable.custom.selectedRecord.financier_name;
		}
		manage_financier_location.variable.custom.datasource_1 = mserviceUtilities.getTransportPagingDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_custom_info_list",
				outputPath : "outputparam_detail",
				api : true,
				pageSize : 10,
				inputParameter : {
					p_custom_info_code : "'financier_location'",
					p_inputparam_xml : "manage_financier_location.customRequirementHandler.getFilterValues()"
				},
				screenID : "manage_financier_location",
				schemaModel : true,
				dataSourceName : "datasource_1",
				processResponse : true,
				serverPaging : true
			});
	},
	postConstruct : function () {
	if (webNavigationController.getPreviousScreenID() != "home_container") {
			$("#manage_financier_location_retrieve_btn").hide();
			manage_financier_location.variable.custom.datasource_1.read();
		}else {
			$("#manage_financier_location_footer").hide();
		}
	},
	initializeWidgets : function () {
		manage_financier_location.variable.custom.grid_1 = $("#manage_financier_location_grid_1").initializeWGrid({
				screenID : "manage_financier_location",
				toolbar : "#manage_financier_location_grid_1_toolbar_template",
				dataSource : manage_financier_location.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	refreshScreen : function () {
		manage_financier_location.variable.custom.grid_1.dataSource.pageSize(10);
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_financier_location.variable.custom.crudIndicator == "R") {
				manage_financier_location.variable.custom.grid_1.dataSource.read();
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_financier_location_edit.js", "../../s_iscripts/custominfo_setDetail.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_financier_location",
						nextScreenID : "manage_financier_location_edit",
						nextScreenName : manage_financier_location.variable.custom.nextScreenName
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_financier_location.variable.custom.selectedFeatureID == "manage_financier_location") {
				if (manage_financier_location.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_financier_location.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_financier_location",
							nextScreenID : "manage_financier_location",
							nextScreenName : manage_financier_location.variable.custom.nextScreenName
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
			if (manage_financier_location.variable.custom.selectedFeatureID == "manage_financier_contacts_edit") {
				if (manage_financier_location.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_financier_contacts_edit.js", "../../s_iscripts/custominfo_setDetail.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_financier_location",
							nextScreenID : "manage_financier_contacts_edit",
							nextScreenName : manage_financier_location.variable.custom.nextScreenName
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
			return $("#manage_financier_location_content_1").getInputparamXML({
				screenID : "manage_financier_location",
				matchCondition : ["_filter"]
			});
		},
		setSelectedRecord : function () {
			manage_financier_location.variable.custom.selectedRecord = manage_financier_location.variable.custom.grid_1.dataSource.getByUid(manage_financier_location.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'CUSTLOC'",
				p_field_1 : "$manage_financier_location.variable.custom.selectedRecord.customer_id",
				p_field_2 : "$manage_financier_location.variable.custom.selectedRecord.location_code",
			};
		},
		getExportConfig : function (gridId) {
			if(gridId == "manage_financier_location_grid_1_export_btn"){
				return {
					type : "csv",
					template : "manage_financier",
					service : "sp_retrieve_manage_financier_list",
					request : "<signature><i_inputparam_xml>" + manage_financier.customRequirementHandler.getFilterValues().replace("</inputparam>","<skip>0</skip><take>" + manage_financier.variable.custom.grid_1.dataSource.data()[0].total + "</take></inputparam>") + "</i_inputparam_xml><o_retrieve_status></o_retrieve_status></signature>",
					length : manage_financier.variable.custom.grid_1.dataSource.data().length
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
						fieldId : "manage_financier_location_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_financier_location_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};
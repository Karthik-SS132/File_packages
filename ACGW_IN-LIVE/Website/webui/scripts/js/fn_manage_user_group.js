var manage_user_group = {
	constructScreen : function () {
		manage_user_group.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_user_group_list",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				schemaModel : true,
				screenID : "manage_user_group",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function () {
		manage_user_group.variable.custom.grid_1.dataSource.read();
	},
	initializeWidgets : function () {
		manage_user_group.variable.custom.grid_1 = $("#manage_user_group_grid_1").initializeWGrid({
				screenID : "manage_user_group",
				toolbar : "#manage_user_group_grid_1_toolbar_template",
				dataSource : manage_user_group.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	refreshScreen : function () {
		manage_user_group.variable.custom.grid_1.dataSource.read();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_group_edit.js", "../../s_iscripts/save_manage_user_group.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_user_group",
					fieldID : "manage_user_group_child_window",
					nextScreenID : "manage_user_group_edit",
					nextScreenName : manage_user_group.variable.custom.nextScreenName,
					execute : manage_user_group_edit.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		feature_btn_click : function (element, event) {
			if (manage_user_group.variable.custom.selectedFeatureID == "manage_feature_access_profile") {
				if (manage_user_group.variable.custom.selectedRecord != undefined) {
					if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_feature_access_profile.js", "../../s_iscripts/save_manage_fa_profile.js"])) {
						webNavigationController.gotoNextScreen({
							screenID : "manage_user_group",
							nextScreenID : "manage_feature_access_profile",
							nextScreenName : manage_user_group.variable.custom.nextScreenName
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
		setSelectedRecord : function () {
			manage_user_group.variable.custom.selectedRecord = manage_user_group.variable.custom.grid_1.dataSource.getByUid(manage_user_group.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'USERGROUP'",
				p_field_1 : "$manage_user_group.variable.custom.selectedRecord.user_group_id",
				p_field_2 : "$manage_user_group.variable.custom.selectedRecord.rec_tstamp"
			};
		}
	},
	variable : {
		standard : {
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_user_group_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_user_group_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {},
	}
};

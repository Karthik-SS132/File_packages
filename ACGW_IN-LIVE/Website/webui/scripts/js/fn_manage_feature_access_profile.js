var manage_feature_access_profile = {
	constructScreen : function () {
		manage_feature_access_profile.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_fa_profile",
				outputPath : "context/outputparam_detail",
				inputParameter : {
					p_user_group_filter : "$manage_user_group.variable.custom.selectedRecord.user_group_id"
				},
				pageSize : 10,
				schemaModel : true,
				screenID : "manage_feature_access_profile",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function () {
		manage_feature_access_profile.variable.custom.grid_1.dataSource.read();
	},
	initializeWidgets : function () {
		manage_feature_access_profile.variable.custom.grid_1 = $("#manage_feature_access_profile_grid_1").initializeWGrid({
				screenID : "manage_feature_access_profile",
				dataSource : manage_feature_access_profile.variable.custom.datasource_1,
				height : 400,
				pageSize : 10,
				filterable : false,
				selectable : false
			});
		$("#manage_feature_access_profile_user_group_id").initializeWDisplayarea({
			screenID : "manage_feature_access_profile",
			defaultValue : "$manage_feature_access_profile.variable.custom.user_group_id_defaultValue"
		});
		$("#manage_feature_access_profile_user_group_name").initializeWDisplayarea({
			screenID : "manage_feature_access_profile",
			defaultValue : "$manage_feature_access_profile.variable.custom.user_group_name_defaultValue"
		});
	},
	widgetEventHandler : {
		grant_all_access_click : function (element, event) {
			manage_feature_access_profile.variable.custom.selectedRecord = manage_feature_access_profile.variable.custom.grid_1.dataSource.getByUid($(element).parent().parent().data("uid"));
			manage_feature_access_profile.variable.custom.selectedRecord.set("grant_all", $(element).is(":checked").toString());
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_feature_access", $(element).is(":checked").toString());
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_add_access", $(element).is(":checked").toString());
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_edit_access", $(element).is(":checked").toString());
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_view_access", $(element).is(":checked").toString());
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_delete_access", $(element).is(":checked").toString());
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_import_access", $(element).is(":checked").toString());
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_export_access", $(element).is(":checked").toString());
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_print_access", $(element).is(":checked").toString());
		},
		feature_access_click : function (element, event) {
			manage_feature_access_profile.variable.custom.selectedRecord = manage_feature_access_profile.variable.custom.grid_1.dataSource.getByUid($(element).parent().parent().data("uid"));
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_feature_access", $(element).is(":checked").toString());
		},
		add_access_click : function (element, event) {
			manage_feature_access_profile.variable.custom.selectedRecord = manage_feature_access_profile.variable.custom.grid_1.dataSource.getByUid($(element).parent().parent().data("uid"));
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_add_access", $(element).is(":checked").toString());
		},
		edit_access_click : function (element, event) {
			manage_feature_access_profile.variable.custom.selectedRecord = manage_feature_access_profile.variable.custom.grid_1.dataSource.getByUid($(element).parent().parent().data("uid"));
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_edit_access", $(element).is(":checked").toString());
		},
		view_access_click : function (element, event) {
			manage_feature_access_profile.variable.custom.selectedRecord = manage_feature_access_profile.variable.custom.grid_1.dataSource.getByUid($(element).parent().parent().data("uid"));
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_view_access", $(element).is(":checked").toString());
		},
		delete_access_click : function (element, event) {
			manage_feature_access_profile.variable.custom.selectedRecord = manage_feature_access_profile.variable.custom.grid_1.dataSource.getByUid($(element).parent().parent().data("uid"));
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_delete_access", $(element).is(":checked").toString());
		},
		import_access_click : function (element, event) {
			manage_feature_access_profile.variable.custom.selectedRecord = manage_feature_access_profile.variable.custom.grid_1.dataSource.getByUid($(element).parent().parent().data("uid"));
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_import_access", $(element).is(":checked").toString());
		},
		export_access_click : function (element, event) {
			manage_feature_access_profile.variable.custom.selectedRecord = manage_feature_access_profile.variable.custom.grid_1.dataSource.getByUid($(element).parent().parent().data("uid"));
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_export_access", $(element).is(":checked").toString());
		},
		print_access_click : function (element, event) {
			manage_feature_access_profile.variable.custom.selectedRecord = manage_feature_access_profile.variable.custom.grid_1.dataSource.getByUid($(element).parent().parent().data("uid"));
			manage_feature_access_profile.variable.custom.selectedRecord.set("p_print_access", $(element).is(":checked").toString());
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue;
			returnValue = executeService_save_manage_fa_profile({
					inputparam_detail : manage_feature_access_profile.variable.custom.grid_1.dataSource.data()
				});
			if (returnValue == "SP001") {
				alert("Feature Access saved successfully.");
				return true;
			} else {
				alert("Saving of Feature Access failed");
				return false;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_feature_access_profile_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_feature_access_profile_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			user_group_id_defaultValue : manage_user_group.variable.custom.selectedRecord.user_group_id,
			user_group_name_defaultValue : manage_user_group.variable.custom.selectedRecord.user_group_name
		},
	}
};

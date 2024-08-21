var manage_user_attachments = {
	constructScreen : function () {
		manage_user_attachments.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_attached_docs",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_project_task_level_ind : "$manage_user_attachments.variable.custom.project_task_level_ind",
					p_project_id : "$manage_user_attachments.variable.custom.project_id.substring(0,20)",
					p_template_id : "$manage_user_attachments.variable.custom.template_id",
					p_task_id : "$manage_user_attachments.variable.custom.task_id",
				},
				schemaModel : true,
				screenID : "manage_user_attachments",
				dataSourceName : "datasource_1",
				processResponse : true
			});
	},
	postConstruct : function () {
		manage_user_attachments.variable.custom.datasource_1.read();
	},
	refreshScreen : function () {
		manage_user_attachments.variable.custom.grid_1.dataSource.read();
		if(manage_user_attachments.variable.custom.crudIndicator != "D"){
			manage_user_attachments.variable.custom.grid_1.dataSource.pageSize(10);
		}
	},
	initializeWidgets : function () {
		$("#manage_user_attachments_project_id").initializeWDisplayarea({
			screenID : "manage_user_attachments",
			defaultValue : "$manage_user_attachments.variable.custom.project_id"
		});
		$("#manage_user_attachments_project_status").initializeWDisplayarea({
			screenID : "manage_user_attachments",
			defaultValue : "$manage_user_attachments.variable.custom.project_status_defaultValue"
		});
		manage_user_attachments.variable.custom.grid_1 = $("#manage_user_attachments_grid_1").initializeWGrid({
				screenID : "manage_user_attachments",
				toolbar : "#manage_user_attachments_grid_1_toolbar_template",
				dataSource : manage_user_attachments.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_user_attachments.variable.custom.crudIndicator == "D") {
				if (mserviceUtilities.deleteData({
						p_information_type : "'USERATTACHMENTS'",
						p_field_1 : "$manage_user_attachments.variable.custom.selectedRecord.doc_attached_at_txn",
						p_field_2 : "$manage_user_attachments.variable.custom.selectedRecord.txn_ref_no",
						p_field_3 : "$manage_user_attachments.variable.custom.selectedRecord.doc_id",
						p_field_4 : "$manage_user_attachments.variable.custom.selectedRecord.doc_name",
					})) {
					if (mserviceUtilities.deleteFile(mserviceUtilities.getFileUploadPath({
								transactionType : manage_user_attachments.variable.custom.selectedRecord.doc_attached_at_txn,
								async : false,
								referenceNumber : manage_user_attachments.variable.custom.selectedRecord.txn_ref_no
							}) + "/" + manage_user_attachments.variable.custom.selectedRecord.doc_name)) {
						alert("Attachment deleted successfully.");
						manage_user_attachments.refreshScreen();
					}
				}
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_user_attachments_child.js", "../../s_iscripts/save_project_filelist_attachments_master.js"])) {
					if (manage_user_attachments.variable.custom.crudIndicator == "V") {
						manage_user_attachments.variable.custom.attachmentTobeViewed = mserviceUtilities.getFileUploadPath({
								transactionType : manage_user_attachments.variable.custom.selectedRecord.doc_attached_at_txn,
								async : false,
								referenceNumber : manage_user_attachments.variable.custom.selectedRecord.txn_ref_no
							}) + "/" + manage_user_attachments.variable.custom.selectedRecord.doc_name;
						webNavigationController.gotoNextScreen({
							screenID : "manage_user_attachments",
							fieldID : "manage_user_attachments_child_window",
							nextScreenID : "manage_user_attachments_child",
							nextScreenName : manage_user_attachments.variable.custom.nextScreenName,
							windowHeight : 620,
							windowWidth : 900,
							execute : manage_user_attachments_child.constructScreen
						});
					} else {
						webNavigationController.gotoNextScreen({
							screenID : "manage_user_attachments",
							fieldID : "manage_user_attachments_child_window",
							nextScreenID : "manage_user_attachments_child",
							nextScreenName : manage_user_attachments.variable.custom.nextScreenName,
							execute : manage_user_attachments_child.constructScreen
						});
					}
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function () {
			manage_user_attachments.variable.custom.selectedRecord = manage_user_attachments.variable.custom.grid_1.dataSource.getByUid(manage_user_attachments.variable.custom.grid_1.select().data("uid"));
		},
		getDeleteDataObject : function () {
			return {
				p_information_type : "'USERATTACHMENTS'",
				p_field_1 : "$manage_user_attachments.variable.standard.configurationParam",
				p_field_2 : "$manage_user_attachments.variable.custom.project_id",
				p_field_3 : "$manage_user_attachments.variable.custom.selectedRecord.doc_id",
				p_field_4 : "$manage_user_attachments.variable.custom.selectedRecord.doc_name",
			};
		}
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			]
		},
		custom : {
			customDelete : true
		},
	}
};
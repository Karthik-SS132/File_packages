var manage_expdoc_detail_edit = {
	constructScreen : function () {
		manage_expdoc_detail_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_attached_docs",
				outputPath : "context/outputparam_detail",
				pageSize : 10,
				inputParameter : {
					p_project_task_level_ind : "'E'",
					p_project_id : "$manage_expdoc_header.variable.custom.selectedRecord.expdoc_ref_no",
					p_template_id : "'LINEITEM'",
					p_task_id : "$manage_expdoc_detail.variable.custom.selectedRecord.expdoc_sl_no"
				},
				schemaModel : true,
				screenID : "manage_expdoc_detail_edit",
				dataSourceName : "datasource_1",
				processResponse : true
			});
		if (manage_expdoc_detail.variable.custom.crudIndicator == "U" || manage_expdoc_detail.variable.custom.crudIndicator == "V") {
			manage_expdoc_detail_edit.variable.custom.expdoc_head_code_defaultValue = manage_expdoc_detail.variable.custom.selectedRecord.exp_head_code;
			manage_expdoc_detail_edit.variable.custom.expdoc_head_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("EXPENSEHEADCODE_DESC", manage_expdoc_detail.variable.custom.selectedRecord.exp_head_code, "");
			manage_expdoc_detail_edit.variable.custom.expdoc_standard_rate_defaultValue = manage_expdoc_detail.variable.custom.selectedRecord.exp_std_rate;
			manage_expdoc_detail_edit.variable.custom.expdoc_standard_rate_currency_defaultValue = manage_expdoc_detail.variable.custom.selectedRecord.exp_std_rate_currency;
			manage_expdoc_detail_edit.variable.custom.expdoc_standard_rate_currency_defaultValueDescription = mserviceUtilities.getDescriptionForCode("CURRENCYCODE_DESC", manage_expdoc_detail.variable.custom.selectedRecord.exp_std_rate_currency, "");
			manage_expdoc_detail_edit.variable.custom.expdoc_no_of_units_defaultValue = manage_expdoc_detail.variable.custom.selectedRecord.exp_noof_units;
			manage_expdoc_detail_edit.variable.custom.expdoc_amount_defaultValue = kendo.toString(manage_expdoc_detail.variable.custom.selectedRecord.exp_amount, "n") + " " + manage_expdoc_detail.variable.custom.selectedRecord.exp_std_rate_currency;
			manage_expdoc_detail_edit.variable.custom.expdoc_narration_defaultValue = manage_expdoc_detail.variable.custom.selectedRecord.exp_narration;
			manage_expdoc_detail_edit.variable.custom.datasource_1.read();
		} else {
			manage_expdoc_detail_edit.variable.custom.expdoc_amount_defaultValue = kendo.toString(0, "n") + " " + login_profile.currency_code;
		}
	},
	refreshScreen : function () {
		manage_expdoc_detail_edit.variable.custom.grid_1.dataSource.read();
		if(manage_expdoc_detail_edit.variable.custom.crudIndicator != "D"){
			manage_expdoc_detail_edit.variable.custom.grid_1.dataSource.pageSize(10);
		}
	},
	initializeWidgets : function () {
		$("#manage_expdoc_detail_edit_expdoc_number").initializeWDisplayarea({
			screenID : "manage_expdoc_detail_edit",
			defaultValue : "$manage_expdoc_detail_edit.variable.custom.expdoc_number_defaultValue"
		});
		manage_expdoc_detail_edit.variable.custom.expdoc_head_code = $("#manage_expdoc_detail_edit_expdoc_head_code").initializeWDropdownlist({
				screenID : "manage_expdoc_detail_edit",
				dataSource : {
					informationType : "'EXPENSEHEADCODE_LIST'"
				},
				dataTextField : "description",
				dataValueField : "code",
				defaultValue : "$manage_expdoc_detail_edit.variable.custom.expdoc_head_code_defaultValue",
				defaultValueDescription : "$manage_expdoc_detail_edit.variable.custom.expdoc_head_code_defaultValueDescription",
				template : "description"
			});
		$("#manage_expdoc_detail_edit_expdoc_standard_rate").initializeWNumerictextbox({
			screenID : "manage_expdoc_detail_edit",
			minimum : "'1'",
			maximum : "'9999.9999'",
			format : "n4",
			decimals : "4",
			defaultValue : "$manage_expdoc_detail_edit.variable.custom.expdoc_standard_rate_defaultValue"
		});
		$("#manage_expdoc_detail_edit_expdoc_standard_rate_currency").initializeWDropdownlist({
			screenID : "manage_expdoc_detail_edit",
			dataSource : {
				informationType : "'CURRENCYCODE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_expdoc_detail_edit.variable.custom.expdoc_standard_rate_currency_defaultValue",
			defaultValueDescription : "$manage_expdoc_detail_edit.variable.custom.expdoc_standard_rate_currency_defaultValueDescription"
		});
		$("#manage_expdoc_detail_edit_expdoc_no_of_units").initializeWNumerictextbox({
			screenID : "manage_expdoc_detail_edit",
			minimum : "'1'",
			maximum : "'9999999999'",
			defaultValue : "$manage_expdoc_detail_edit.variable.custom.expdoc_no_of_units_defaultValue"
		});
		$("#manage_expdoc_detail_edit_expdoc_amount").initializeWDisplayarea({
			screenID : "manage_expdoc_detail_edit",
			defaultValue : "$manage_expdoc_detail_edit.variable.custom.expdoc_amount_defaultValue"
		});
		$("#manage_expdoc_detail_edit_expdoc_narration").initializeWTextarea({
			screenID : "manage_expdoc_detail_edit",
			maxlength : "1000",
			defaultValue : "$manage_expdoc_detail_edit.variable.custom.expdoc_narration_defaultValue"
		});
		manage_expdoc_detail_edit.variable.custom.grid_1 = $("#manage_expdoc_detail_edit_grid_1").initializeWGrid({
				screenID : "manage_expdoc_detail_edit",
				toolbar : "#manage_expdoc_detail_edit_grid_1_toolbar_template",
				dataSource : manage_expdoc_detail_edit.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
	},
	widgetEventHandler : {
		expdoc_no_of_units_change : function (element, event) {
			manage_expdoc_detail_edit.customRequirementHandler.calculateNetAmount();
		},
		expdoc_no_of_units_spin : function (element, event) {
			manage_expdoc_detail_edit.customRequirementHandler.calculateNetAmount();
		},
		expdoc_standard_rate_change : function (element, event) {
			manage_expdoc_detail_edit.customRequirementHandler.calculateNetAmount();
		},
		expdoc_standard_rate_spin : function (element, event) {
			manage_expdoc_detail_edit.customRequirementHandler.calculateNetAmount();
		},
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_expdoc_detail_edit.variable.custom.crudIndicator == "D") {
				if (mserviceUtilities.deleteData({
						p_information_type : "'USERATTACHMENTS'",
						p_field_1 : "$manage_expdoc_detail_edit.variable.custom.selectedRecord.doc_attached_at_txn",
						p_field_2 : "$manage_expdoc_detail_edit.variable.custom.selectedRecord.txn_ref_no",
						p_field_3 : "$manage_expdoc_detail_edit.variable.custom.selectedRecord.doc_id",
						p_field_4 : "$manage_expdoc_detail_edit.variable.custom.selectedRecord.doc_name",
					})) {
					if (mserviceUtilities.deleteFile(mserviceUtilities.getFileUploadPath({
								transactionType : manage_expdoc_detail_edit.variable.custom.selectedRecord.doc_attached_at_txn,
								async : false,
								referenceNumber : manage_expdoc_detail_edit.variable.custom.selectedRecord.txn_ref_no
							}) + "/" + manage_expdoc_detail_edit.variable.custom.selectedRecord.doc_name)) {
						alert("Attachment deleted successfully.");
						manage_expdoc_detail_edit.refreshScreen();
					}
				}
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_expdoc_detail_edit_attachments.js", "../../s_iscripts/save_project_filelist_attachments_master.js"])) {
					if (manage_expdoc_detail_edit.variable.custom.crudIndicator == "V") {
						manage_expdoc_detail_edit.variable.custom.attachmentTobeViewed = mserviceUtilities.getFileUploadPath({
								transactionType : manage_expdoc_detail_edit.variable.custom.selectedRecord.doc_attached_at_txn,
								async : false,
								referenceNumber : manage_expdoc_detail_edit.variable.custom.selectedRecord.txn_ref_no
							}) + "/" + manage_expdoc_detail_edit.variable.custom.selectedRecord.doc_name;
						webNavigationController.gotoNextScreen({
							screenID : "manage_expdoc_detail_edit",
							fieldID : "manage_expdoc_detail_edit_attachments_window",
							nextScreenID : "manage_expdoc_detail_edit_attachments",
							nextScreenName : manage_expdoc_detail_edit.variable.custom.nextScreenName,
							windowHeight : 620,
							windowWidth : 900,
							execute : manage_expdoc_detail_edit_attachments.constructScreen
						});
					} else {
						webNavigationController.gotoNextScreen({
							screenID : "manage_expdoc_detail_edit",
							fieldID : "manage_expdoc_detail_edit_attachments_window",
							nextScreenID : "manage_expdoc_detail_edit_attachments",
							nextScreenName : manage_expdoc_detail_edit.variable.custom.nextScreenName,
							execute : manage_expdoc_detail_edit_attachments.constructScreen
						});
					}
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		submit_btn_click : function (element, event) {
			var inputparamUdfString, attachmentFileNamesString = [];
			for(var counter = 0; counter < manage_expdoc_detail_edit.variable.custom.grid_1.dataSource.data().length; counter++){
				attachmentFileNamesString.push(manage_expdoc_detail_edit.variable.custom.grid_1.dataSource.data()[counter].doc_name);
			}
			inputparamUdfString = $("#manage_expdoc_detail_edit_content_1").getInputparamXML({
					screenID : "manage_expdoc_detail_edit",
					matchCondition : ["manage_expdoc_detail_edit_udf", "manage_expdoc_detail_edit_product_udf", "manage_expdoc_detail_edit_expdoc_detail"]
				});
			if (manage_expdoc_detail.variable.custom.crudIndicator == "A") {
				manage_expdoc_detail.variable.custom.datasource_1.add({
					expdoc_sl_no : (manage_expdoc_detail.variable.custom.datasource_1.data().length + manage_expdoc_detail.variable.custom.deletedRecords.length + 1).toString(),
					expdoc_ref_no : $("#manage_expdoc_detail_edit_expdoc_number").getVal(),
					exp_head_code : $("#manage_expdoc_detail_edit_expdoc_head_code").getVal(),
					exp_head_code_description : manage_expdoc_detail_edit.variable.custom.expdoc_head_code.dataItem().description,
					exp_narration : $("#manage_expdoc_detail_edit_expdoc_narration").getVal(),
					exp_std_rate : $("#manage_expdoc_detail_edit_expdoc_standard_rate").getVal().toFixed(1),
					exp_std_rate_currency : $("#manage_expdoc_detail_edit_expdoc_standard_rate_currency").getVal(),
					exp_noof_units : $("#manage_expdoc_detail_edit_expdoc_no_of_units").getVal().toFixed(1),
					exp_amount : kendo.parseFloat($("#manage_expdoc_detail_edit_expdoc_amount").getVal()).toFixed(1),
					crud_ind : "C",
					exp_attachments : attachmentFileNamesString.toString(),
					inputparam_detail_udf_xml : inputparamUdfString
				});
			} else if (manage_expdoc_detail.variable.custom.crudIndicator == "U") {
				manage_expdoc_detail.variable.custom.selectedRecord.set("expdoc_ref_no", $("#manage_expdoc_detail_edit_expdoc_number").getVal());
				manage_expdoc_detail.variable.custom.selectedRecord.set("exp_head_code", $("#manage_expdoc_detail_edit_expdoc_head_code").getVal());
				manage_expdoc_detail.variable.custom.selectedRecord.set("exp_head_code_description", manage_expdoc_detail_edit.variable.custom.expdoc_head_code.dataItem().description);
				manage_expdoc_detail.variable.custom.selectedRecord.set("exp_narration", $("#manage_expdoc_detail_edit_expdoc_narration").getVal());
				manage_expdoc_detail.variable.custom.selectedRecord.set("exp_std_rate", $("#manage_expdoc_detail_edit_expdoc_standard_rate").getVal().toFixed(1));
				manage_expdoc_detail.variable.custom.selectedRecord.set("exp_std_rate_currency", $("#manage_expdoc_detail_edit_expdoc_standard_rate_currency").getVal());
				manage_expdoc_detail.variable.custom.selectedRecord.set("exp_noof_units", $("#manage_expdoc_detail_edit_expdoc_no_of_units").getVal().toFixed(1));
				manage_expdoc_detail.variable.custom.selectedRecord.set("exp_amount", kendo.parseFloat($("#manage_expdoc_detail_edit_expdoc_amount").getVal()).toFixed(1));
				manage_expdoc_detail.variable.custom.selectedRecord.set("crud_ind", "U");
				manage_expdoc_detail.variable.custom.selectedRecord.set("exp_attachments", attachmentFileNamesString.toString());
				manage_expdoc_detail.variable.custom.selectedRecord.set("inputparam_detail_udf_xml", inputparamUdfString);
			};
			return true;
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function () {
			manage_expdoc_detail_edit.variable.custom.selectedRecord = manage_expdoc_detail_edit.variable.custom.grid_1.dataSource.getByUid(manage_expdoc_detail_edit.variable.custom.grid_1.select().data("uid"));
		},
		calculateNetAmount : function () {
			var netAmount = 0;
			netAmount = $("#manage_expdoc_detail_edit_expdoc_no_of_units").getVal() * $("#manage_expdoc_detail_edit_expdoc_standard_rate").getVal();
			$("#manage_expdoc_detail_edit_expdoc_amount").setVal(kendo.toString(netAmount, "n") + " " + $("#manage_expdoc_detail_edit_expdoc_standard_rate_currency").getVal());
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			popupIndicator : false,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			expdoc_number_defaultValue : manage_expdoc_header.variable.custom.selectedRecord.expdoc_ref_no,
			customDelete : true
		}
	}
};

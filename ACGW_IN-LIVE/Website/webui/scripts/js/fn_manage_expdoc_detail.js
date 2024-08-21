var manage_expdoc_detail = {
	constructScreen : function () {
		manage_expdoc_detail.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_manage_expense_document_details",
				outputPath : false,
				pageSize : 10,
				inputParameter : {
					p_expense_document_ref_no : "$manage_expdoc_header.variable.custom.selectedRecord.expdoc_ref_no"
				},
				schemaModel : true,
				screenID : "manage_expdoc_detail",
				dataSourceName : "datasource_1",
				processResponse : true,
				parse : manage_expdoc_detail.customRequirementHandler.dataSourceParse
			});
		manage_expdoc_detail.variable.custom.datasource_1.read();
		manage_expdoc_detail.variable.custom.expdoc_number_defaultValue = manage_expdoc_detail.variable.custom.header_1_record.expdoc_ref_no;
		manage_expdoc_detail.variable.custom.expdoc_status_defaultValue = mserviceUtilities.getDescriptionForCode("EXPENSESTATUS_DESC", manage_expdoc_detail.variable.custom.header_1_record.expdoc_status, "");
		manage_expdoc_detail.variable.custom.transaction_ref_number_defaultValue = manage_expdoc_detail.variable.custom.header_1_record.call_jo_proj_ind_desc + "# " + manage_expdoc_detail.variable.custom.header_1_record.call_jo_proj_id;
		manage_expdoc_detail.variable.custom.transaction_ref_number_pe_defaultValue = manage_expdoc_detail.variable.custom.header_1_record.call_jo_proj_ind_desc + "# " + manage_expdoc_detail.variable.custom.header_1_record.udf_analysis_code2;
		manage_expdoc_detail.variable.custom.expdoc_category_defaultValue = manage_expdoc_detail.variable.custom.header_1_record.expdoc_category;
		manage_expdoc_detail.variable.custom.expdoc_category_defaultValueDescription = mserviceUtilities.getDescriptionForCode("EXPENSECATEGORY_DESC", manage_expdoc_detail.variable.custom.header_1_record.expdoc_category, "");
		manage_expdoc_detail.variable.custom.expdoc_type_defaultValue = manage_expdoc_detail.variable.custom.header_1_record.expdoc_type;
		manage_expdoc_detail.variable.custom.expdoc_type_defaultValueDescription = mserviceUtilities.getDescriptionForCode("EXPENSETYPE_DESC", manage_expdoc_detail.variable.custom.header_1_record.expdoc_type, "");
		manage_expdoc_detail.variable.custom.expdoc_net_amount_defaultValue = kendo.toString(kendo.parseFloat(manage_expdoc_detail.variable.custom.header_1_record.net_amount), "n") + " " + login_profile.currency_code;
		manage_expdoc_detail.variable.custom.expdoc_creation_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
					dateString : manage_expdoc_detail.variable.custom.header_1_record.created_on_date
				}), "dd-MM-yyyy");
	},
	postConstruct : function () {
		if (manage_expdoc_header.variable.custom.crudIndicator == "V") {
			$("#manage_expdoc_detail_add_btn").hide();
			$("#manage_expdoc_detail_edit_btn").hide();
			$("#manage_expdoc_detail_delete_btn").hide();
		};
		$("#manage_expdoc_detail_transaction_ref_number").attr("data-widget-type", "w_link");
		$("#manage_expdoc_detail_transaction_ref_number").attr("data-link-type", "call_job_reference");
		$("#manage_expdoc_detail_transaction_ref_number").attr("style", "text-decoration: underline; color: blue; cursor: pointer");
		$("#manage_expdoc_detail_transaction_ref_number_pe").attr("data-widget-type", "w_link");
		$("#manage_expdoc_detail_transaction_ref_number_pe").attr("data-link-type", "call_job_reference_pe");
		$("#manage_expdoc_detail_transaction_ref_number_pe").attr("style", "text-decoration: underline; color: red; cursor: pointer");
	},
	initializeWidgets : function () {
		$("#manage_expdoc_detail_expdoc_number").initializeWDisplayarea({
			screenID : "manage_expdoc_detail",
			defaultValue : "$manage_expdoc_detail.variable.custom.expdoc_number_defaultValue"
		});
		$("#manage_expdoc_detail_expdoc_creation_date").initializeWDisplayarea({
			screenID : "manage_expdoc_detail",
			defaultValue : "$manage_expdoc_detail.variable.custom.expdoc_creation_date_defaultValue"
		});
		$("#manage_expdoc_detail_expdoc_status").initializeWDisplayarea({
			screenID : "manage_expdoc_detail",
			defaultValue : "$manage_expdoc_detail.variable.custom.expdoc_status_defaultValue"
		});
		$("#manage_expdoc_detail_transaction_ref_number").initializeWDisplayarea({
			screenID : "manage_expdoc_detail",
			defaultValue : "$manage_expdoc_detail.variable.custom.transaction_ref_number_defaultValue"
		});
		$("#manage_expdoc_detail_expdoc_category").initializeWDropdownlist({
			screenID : "manage_expdoc_detail",
			dataSource : {
				informationType : "'EXPENSECATEGORY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_expdoc_detail.variable.custom.expdoc_category_defaultValue",
			defaultValueDescription : "$manage_expdoc_detail.variable.custom.expdoc_category_defaultValueDescription",
			childFieldID : "manage_expdoc_detail_expdoc_type",
			template : "description"
		});
		$("#manage_expdoc_detail_expdoc_type").initializeWDropdownlist({
			screenID : "manage_expdoc_detail",
			dataSource : {
				informationType : "'EXPENSETYPE_LIST_LINKED'",
				searchField1 : "#manage_expdoc_detail_expdoc_category"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_expdoc_detail.variable.custom.expdoc_type_defaultValue",
			defaultValueDescription : "$manage_expdoc_detail.variable.custom.expdoc_type_defaultValueDescription",
			template : "description"
		});
		$("#manage_expdoc_detail_expdoc_net_amount").initializeWDisplayarea({
			screenID : "manage_expdoc_detail",
			defaultValue : "$manage_expdoc_detail.variable.custom.expdoc_net_amount_defaultValue"
		});
		$("#manage_expdoc_detail_transaction_ref_number_pe").initializeWDisplayarea({
			screenID : "manage_expdoc_detail",
			defaultValue : "$manage_expdoc_detail.variable.custom.transaction_ref_number_pe_defaultValue"
		});
		manage_expdoc_detail.variable.custom.grid_1 = $("#manage_expdoc_detail_grid_1").initializeWGrid({
				screenID : "manage_expdoc_detail",
				toolbar : "#manage_expdoc_detail_grid_1_toolbar_template",
				dataSource : manage_expdoc_detail.variable.custom.datasource_1,
				height : 400,
				pageSize : 10
			});
		manage_expdoc_detail.variable.custom.grid_1.refresh();
	},
	refreshScreen : function () {
		var detailRecordCounter,
		netAmount;
		netAmount = 0;
		for (detailRecordCounter = 0; detailRecordCounter < manage_expdoc_detail.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
			netAmount += kendo.parseFloat(manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].exp_amount);
		};
		$("#manage_expdoc_detail_expdoc_net_amount").setVal(kendo.toString(kendo.parseFloat(netAmount), "n") + " " + login_profile.currency_code);
		manage_expdoc_detail.variable.custom.grid_1.refresh();
		if(manage_expdoc_detail.variable.custom.crudIndicator != "D"){
			manage_expdoc_detail.variable.custom.grid_1.dataSource.pageSize(10);
		}
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_expdoc_detail.variable.custom.crudIndicator == "D") {
				var netAmount;
				netAmount = kendo.parseFloat($("#manage_expdoc_detail_expdoc_net_amount").getVal()) - kendo.parseFloat(manage_expdoc_detail.variable.custom.selectedRecord.exp_amount);
				$("#manage_expdoc_detail_expdoc_net_amount").setVal(kendo.toString(kendo.parseFloat(netAmount), "n") + " " + login_profile.currency_code);
				manage_expdoc_detail.variable.custom.selectedRecord.set("crud_ind", "D");
				manage_expdoc_detail.variable.custom.deletedRecords.push(manage_expdoc_detail.variable.custom.grid_1.dataSource.remove(manage_expdoc_detail.variable.custom.selectedRecord));
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_expdoc_detail_edit.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_expdoc_detail",
						fieldID : "manage_expdoc_detail_child_window",
						nextScreenID : "manage_expdoc_detail_edit",
						nextScreenName : manage_expdoc_detail.variable.custom.nextScreenName,
						execute : manage_expdoc_detail_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		submit_btn_click : function (element, event) {
			var returnValue,
			inputparamDetail,
			save_manage_expense_document,
			detailRecordCounter;
			inputparamDetail = [];
			if (parseFloat($("#manage_expdoc_detail_expdoc_net_amount").getVal()) == 0) {
				alert("Net amount cannot be null.");
				return false;
			}
			for (detailRecordCounter = 0; detailRecordCounter < manage_expdoc_detail.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
				if (manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].inputparam_detail_udf_xml == undefined) {
					manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].inputparam_detail_udf_xml = "<inputparam></inputparam>";
				};
				inputparamDetail.push({
					p_expdoc_sl_no : manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].expdoc_sl_no,
					p_exp_head_code : manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].exp_head_code,
					p_exp_narration : manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].exp_narration,
					p_exp_std_rate : manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].exp_std_rate,
					p_exp_std_rate_currency : manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].exp_std_rate_currency,
					p_exp_noof_units : manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].exp_noof_units,
					p_exp_amount : manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].exp_amount,
					p_inputparam_detail_udf_xml : manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].inputparam_detail_udf_xml,
					p_crud_ind : manage_expdoc_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].crud_ind
				});
			};
			for (detailRecordCounter = 0; detailRecordCounter < manage_expdoc_detail.variable.custom.deletedRecords.length; detailRecordCounter++) {
				if (manage_expdoc_detail.variable.custom.deletedRecords[detailRecordCounter].inputparam_detail_udf_xml == undefined) {
					manage_expdoc_detail.variable.custom.deletedRecords[detailRecordCounter].inputparam_detail_udf_xml = "<inputparam></inputparam>";
				};
				inputparamDetail.push({
					p_expdoc_sl_no : manage_expdoc_detail.variable.custom.deletedRecords[detailRecordCounter].expdoc_sl_no,
					p_exp_head_code : manage_expdoc_detail.variable.custom.deletedRecords[detailRecordCounter].exp_head_code,
					p_exp_narration : manage_expdoc_detail.variable.custom.deletedRecords[detailRecordCounter].exp_narration,
					p_exp_std_rate : manage_expdoc_detail.variable.custom.deletedRecords[detailRecordCounter].exp_std_rate,
					p_exp_std_rate_currency : manage_expdoc_detail.variable.custom.deletedRecords[detailRecordCounter].exp_std_rate_currency,
					p_exp_noof_units : manage_expdoc_detail.variable.custom.deletedRecords[detailRecordCounter].exp_noof_units,
					p_exp_amount : manage_expdoc_detail.variable.custom.deletedRecords[detailRecordCounter].exp_amount,
					p_inputparam_detail_udf_xml : manage_expdoc_detail.variable.custom.deletedRecords[detailRecordCounter].inputparam_detail_udf_xml,
					p_crud_ind : manage_expdoc_detail.variable.custom.deletedRecords[detailRecordCounter].crud_ind
				});
			};
			save_manage_expense_document = {
					p_expdoc_ref_no : manage_expdoc_detail.variable.custom.header_1_record.expdoc_ref_no,
					p_call_jo_proj_ind : "",
					p_expdoc_category : $("#manage_expdoc_detail_expdoc_category").getVal(),
					p_expdoc_type : $("#manage_expdoc_detail_expdoc_type").getVal(),
					p_inputparam_udf_xml : $("#manage_expdoc_detail_content_1").getInputparamXML({
						screenID : "manage_expdoc_detail",
						matchCondition : ["manage_expdoc_detail_udf"]
					}),
					p_rec_timestamp : manage_expdoc_detail.variable.custom.header_1_record.rec_tstamp,
					p_save_mode : manage_expdoc_header.variable.custom.crudIndicator,
					inputparam_detail : inputparamDetail
				};
			returnValue = executeService_save_manage_expense_document(save_manage_expense_document);
			if (returnValue == "SP001") {
				alert("Expense Document Saved successfully.");
				return true;
			} else {
				alert("Saving of Expense Document Failed.");
				return false;
			}
		}
	},
	linkEventHandler : {
		call_job_reference_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_edit.js"])) {
				manage_call_register = {
					variable : {
						custom : {
							crudIndicator : "V",
							selectedRecord : {
								call_no : manage_expdoc_detail.variable.custom.header_1_record.call_jo_proj_id
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
					screenID : "manage_expdoc_detail",
					nextScreenID : "manage_call_register_edit",
					nextScreenName : manage_expdoc_detail.variable.custom.header_1_record.call_jo_proj_id
				});
				$("#manage_call_register_edit_submit_btn").hide();
				$("#manage_call_register_edit").enableViewMode();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		call_job_reference_pe_link_click : function (element, event) {
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_edit.js"])) {
				manage_call_register = {
					variable : {
						custom : {
							crudIndicator : "V",
							selectedRecord : {
								call_no : manage_expdoc_detail.variable.custom.header_1_record.udf_analysis_code2
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
					screenID : "manage_expdoc_detail",
					nextScreenID : "manage_call_register_edit",
					nextScreenName : manage_expdoc_detail.variable.custom.header_1_record.udf_analysis_code2
				});
				$("#manage_call_register_edit_submit_btn").hide();
				$("#manage_call_register_edit").enableViewMode();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		attachment_reference_link_click : function (element, event) {
			manage_expdoc_detail.variable.custom.attachmentTobeViewed = mserviceUtilities.getFileUploadPath({
					transactionType : "EXPENSE",
					async : false,
					referenceNumber : $(element).attr('data-reference-number')
				}) + "/" + $(element).text();
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_expdoc_detail_edit_child.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_expdoc_detail",
					fieldID : "manage_expdoc_detail_edit_child_window",
					nextScreenID : "manage_expdoc_detail_edit_child",
					nextScreenName : "Expense Attachment",
					windowHeight : 600,
					windowWidth : 900,
					execute : manage_expdoc_detail_edit_child.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact support desk.");
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function () {
			manage_expdoc_detail.variable.custom.selectedRecord = manage_expdoc_detail.variable.custom.grid_1.dataSource.getByUid(manage_expdoc_detail.variable.custom.grid_1.select().data("uid"));
		},
		dataSourceParse : function (response) {
			var parseResponse;
			if (response.document != undefined) {
				if (response.document.ApplicationException == undefined) {
					manage_expdoc_detail.variable.custom.header_1_record = response.document.context.outputparam_header;
					if (response.document.context.outputparam_detail.length != undefined) {
						parseResponse = response.document.context.outputparam_detail;
					} else {
						parseResponse = [response.document.context.outputparam_detail];
					}
				} else {
					parseResponse = response;
				}
			} else {
				parseResponse = response;
			};
			return parseResponse;
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			valueChangeIndicator : false,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}
			],
			importConfiguration : {
				imformationType : 'expdoc_detail'
			},
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_expdoc_detail_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_expdoc_detail_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			customDelete : true,
			deletedRecords : []
		},
	}
};

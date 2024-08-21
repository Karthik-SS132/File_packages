var manage_asset_service_visit_schedule_edit = {
	constructScreen : function () {
		if (login_profile.package_id.match("ALL") == null && login_profile.package_id.match("FCM") == null) {
			manage_asset_service_visit_schedule_edit.variable.custom.call_or_job_lov_code = "ASSETSERVVISITJONO";
			manage_asset_service_visit_schedule_edit.variable.custom.call_or_job_indicator = 'J';
		}
		if (manage_asset_service_visit_schedule.variable.custom.crudIndicator == "U" || manage_asset_service_visit_schedule.variable.custom.crudIndicator == "V") {
			$("#manage_asset_service_visit_schedule_edit_tabstrip").show();
			manage_asset_service_visit_schedule_edit.variable.custom.validServiceDueDateCheck = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "validate_conditions",
					inputParameter : {
						p_condition_name : "'VALID_SERVICE_DUE_DATE_CHECK'",
						p_validation_field_1 : "$manage_asset_service_visit_schedule.variable.custom.selectedRecord.asset_id",
						p_validation_field_2 : "$manage_asset_service_visit_schedule.variable.custom.selectedRecord.contract_doc_no",
						p_validation_field_3 : "$manage_asset_service_visit_schedule.variable.custom.selectedRecord.service_visit_no",
						p_validation_field_4 : "$manage_asset_service_visit_schedule_edit.variable.custom.selectedServiceDueDate",
						p_validation_field_5 : "",
						p_validation_field_6 : "",
						p_validation_field_7 : "",
						p_validation_field_8 : "",
						p_validation_field_9 : "",
						p_validation_field_10 : ""
					}
				});
			manage_asset_service_visit_schedule_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "mservice",
					serviceName : "retrieve_manage_asset_service_visit_details",
					outputPath : "context/outputparam_header",
					inputParameter : {
						p_asset_id : "$manage_asset_service_visit_schedule.variable.custom.selectedRecord.asset_id",
						p_contract_doc_no : "$manage_asset_service_visit_schedule.variable.custom.selectedRecord.contract_doc_no",
						p_service_visit_slno : "$manage_asset_service_visit_schedule.variable.custom.selectedRecord.service_visit_no"
					}
				});
			manage_asset_service_visit_schedule_edit.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'ASSET_SERVICE_SCHEDULE_PARTLIST'</lov_code_type><search_field_1>$manage_asset_service_visit_schedule.variable.custom.selectedRecord.asset_id</search_field_1><search_field_2>$manage_asset_service_visit_schedule.variable.custom.selectedRecord.contract_doc_no</search_field_2><search_field_3>$manage_asset_service_visit_schedule.variable.custom.selectedRecord.service_visit_no</search_field_3></inputparam>"
				}
			});
			manage_asset_service_visit_schedule_edit.variable.custom.datasource_1.read();
			manage_asset_service_visit_schedule_edit.variable.custom.datasource_2.read();
			manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1.at(0);
			manage_asset_service_visit_schedule_edit.variable.custom.customer_id_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.customer_id;
			manage_asset_service_visit_schedule_edit.variable.custom.customer_name_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.customer_name;
			manage_asset_service_visit_schedule_edit.variable.custom.asset_id_defaultValue = manage_asset_service_visit_schedule.variable.custom.selectedRecord.asset_id;
			manage_asset_service_visit_schedule_edit.variable.custom.asset_id_defaultValueDescription = manage_asset_service_visit_schedule.variable.custom.selectedRecord.equipment_desc;
			manage_asset_service_visit_schedule_edit.variable.custom.contract_document_number_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.contract_doc_no;
			manage_asset_service_visit_schedule_edit.variable.custom.service_due_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.service_due_date
					}), "dd-MM-yyyy");
			manage_asset_service_visit_schedule_edit.variable.custom.service_visit_status_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.service_visit_status;
			manage_asset_service_visit_schedule_edit.variable.custom.call_or_job_reference_number_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.call_ref_jo_no;
			manage_asset_service_visit_schedule_edit.variable.custom.actual_service_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.act_service_date
					}), "dd-MM-yyyy");
			manage_asset_service_visit_schedule_edit.variable.custom.internal_comments_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.internal_comments;
			manage_asset_service_visit_schedule_edit.variable.custom.customer_comments_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.customer_comments;
			manage_asset_service_visit_schedule_edit.variable.custom.billable_nonbillable_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.billable_nonbillable_ind;
			manage_asset_service_visit_schedule_edit.variable.custom.currency_code_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.charges_currency_code;
			manage_asset_service_visit_schedule_edit.variable.custom.gross_amount_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.charges_gross_amount;
			manage_asset_service_visit_schedule_edit.variable.custom.discount_amount_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.charges_discount_amount;
			manage_asset_service_visit_schedule_edit.variable.custom.tax_amount_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.charges_tax_amount;
			manage_asset_service_visit_schedule_edit.variable.custom.net_amount_defaultValue = kendo.toString(kendo.parseFloat(manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.charges_net_amount), "n") + " " + manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.charges_currency_code;
			manage_asset_service_visit_schedule_edit.variable.custom.visit_report_template_id_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.visitreport_template;
			manage_asset_service_visit_schedule_edit.variable.custom.visit_report_number_defaultValue = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.visitreport_no;
			manage_asset_service_visit_schedule_edit.variable.custom.call_or_job_field_1 = manage_asset_service_visit_schedule.variable.custom.selectedRecord.asset_id;
			manage_asset_service_visit_schedule_edit.variable.custom.call_or_job_field_2 = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.call_ref_jo_no;
		}
	},
	initializeWidgets : function () {
		manage_asset_service_visit_schedule_edit.variable.custom.tabstrip = $("#manage_asset_service_visit_schedule_edit_tabstrip").kendoTabStrip({
			animation : {
				open : {
					effects : "fadeIn"
				},
			},
		}).data("kendoTabStrip");
		$("#manage_asset_service_visit_schedule_edit_customer_id").initializeWDisplayarea({
			screenID : "manage_asset_service_visit_schedule_edit",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.customer_id_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_customer_name").initializeWDisplayarea({
			screenID : "manage_asset_service_visit_schedule_edit",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.customer_name_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_asset_id").initializeWCombobox({
			screenID : "manage_asset_service_visit_schedule_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'ASSET_LIST_FILTER'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.asset_id_defaultValue",
			defaultValueDescription : "$manage_asset_service_visit_schedule_edit.variable.custom.asset_id_defaultValueDescription",
			childFieldID : "manage_asset_service_visit_schedule_edit_contract_document_number"
		});
		$("#manage_asset_service_visit_schedule_edit_contract_document_number").initializeWDropdownlist({
			screenID : "manage_asset_service_visit_schedule_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'ASSET_SERVICE_CONTRACT_LIST'",
					p_search_field_1 : "#manage_asset_service_visit_schedule_edit_asset_id",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.contract_document_number_defaultValue",
			defaultValueDescription : "$manage_asset_service_visit_schedule_edit.variable.custom.contract_document_number_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_service_due_date").initializeWDatepicker({
			screenID : "manage_asset_service_visit_schedule_edit",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.service_due_date_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_service_visit_status").initializeWDisplayarea({
			screenID : "manage_asset_service_visit_schedule_edit",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.service_visit_status_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_call_or_job_reference_number").initializeWDropdownlist({
			screenID : "manage_asset_service_visit_schedule_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "$manage_asset_service_visit_schedule_edit.variable.custom.call_or_job_lov_code",
					p_search_field_1 : "$manage_asset_service_visit_schedule_edit.variable.custom.call_or_job_field_1",
					p_search_field_2 : "$manage_asset_service_visit_schedule_edit.variable.custom.call_or_job_field_2",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.call_or_job_reference_number_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_actual_service_date").initializeWDisplayarea({
			screenID : "manage_asset_service_visit_schedule_edit",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.actual_service_date_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_internal_comments").initializeWTextarea({
			screenID : "manage_asset_service_visit_schedule_edit",
			maxlength : "1500",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.internal_comments_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_customer_comments").initializeWTextarea({
			screenID : "manage_asset_service_visit_schedule_edit",
			maxlength : "1500",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.customer_comments_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_billable_nonbillable").initializeWDropdownlist({
			screenID : "manage_asset_service_visit_schedule_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CALLBNBIND_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.billable_nonbillable_defaultValue",
			defaultValueDescription : "$manage_asset_service_visit_schedule_edit.variable.custom.billable_nonbillable_defaultValueDescription"
		});
		$("#manage_asset_service_visit_schedule_edit_currency_code").initializeWDropdownlist({
			screenID : "manage_asset_service_visit_schedule_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CURRENCYCODE_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.currency_code_defaultValue",
			defaultValueDescription : "$manage_asset_service_visit_schedule_edit.variable.custom.currency_code_defaultValueDescription"
		});
		$("#manage_asset_service_visit_schedule_edit_gross_amount").initializeWNumerictextbox({
			screenID : "manage_asset_service_visit_schedule_edit",
			minimum : "'0'",
			maximum : "'9999999999'",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.gross_amount_defaultValue"
		});
		manage_asset_service_visit_schedule_edit.variable.custom.discount_amount = $("#manage_asset_service_visit_schedule_edit_discount_amount").initializeWNumerictextbox({
				screenID : "manage_asset_service_visit_schedule_edit",
				minimum : "'0'",
				maximum : "#manage_asset_service_visit_schedule_edit_gross_amount",
				defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.discount_amount_defaultValue"
			});
		$("#manage_asset_service_visit_schedule_edit_tax_amount").initializeWNumerictextbox({
			screenID : "manage_asset_service_visit_schedule_edit",
			minimum : "'0'",
			maximum : "'9999999999'",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.tax_amount_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_net_amount").initializeWDisplayarea({
			screenID : "manage_asset_service_visit_schedule_edit",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.net_amount_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_visit_report_template_id").initializeWDisplayarea({
			screenID : "manage_asset_service_visit_schedule_edit",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.visit_report_template_id_defaultValue"
		});
		$("#manage_asset_service_visit_schedule_edit_visit_report_number").initializeWDisplayarea({
			screenID : "manage_asset_service_visit_schedule_edit",
			defaultValue : "$manage_asset_service_visit_schedule_edit.variable.custom.visit_report_number_defaultValue"
		});
		manage_asset_service_visit_schedule_edit.variable.custom.grid_1 = $("#manage_asset_service_visit_schedule_edit_grid_1").initializeWGrid({
			screenID : "manage_asset_service_visit_schedule_edit",
			toolbar : false,
			dataSource : manage_asset_service_visit_schedule_edit.variable.custom.datasource_2,
			height : 400,
			pageSize : 10,
			filterable : false,
		});
		manage_asset_service_visit_schedule_edit.variable.custom.grid_1.refresh();
	},
	widgetEventHandler : {
		discount_amount_change : function (element, event) {
			manage_asset_service_visit_schedule_edit.customRequirementHandler.calculateNetAmount();
		},
		discount_amount_spin : function (element, event) {
			manage_asset_service_visit_schedule_edit.customRequirementHandler.calculateNetAmount();
		},
		gross_amount_change : function (element, event) {
			manage_asset_service_visit_schedule_edit.customRequirementHandler.calculateNetAmount();
		},
		gross_amount_spin : function (element, event) {
			manage_asset_service_visit_schedule_edit.customRequirementHandler.calculateNetAmount();
		},
		tax_amount_change : function (element, event) {
			manage_asset_service_visit_schedule_edit.customRequirementHandler.calculateNetAmount();
		},
		tax_amount_spin : function (element, event) {
			manage_asset_service_visit_schedule_edit.customRequirementHandler.calculateNetAmount();
		},
		service_due_date_change : function (element, event) {
			if (manage_asset_service_visit_schedule.variable.custom.crudIndicator == "U") {
				if ($("#manage_asset_service_visit_schedule_edit_service_due_date").getVal() != "") {
					manage_asset_service_visit_schedule_edit.variable.custom.selectedServiceDueDate = mserviceUtilities.getDateString($("#manage_asset_service_visit_schedule_edit_service_due_date").getVal(), "yyyy-MM-dd");
					manage_asset_service_visit_schedule_edit.variable.custom.validServiceDueDateCheck.read();
					if (manage_asset_service_visit_schedule_edit.variable.custom.validServiceDueDateCheck.data()[0].p_passfail_ind == "false") {
						alert("This is not a valid service due date. Please select some other date.");
						$("#manage_asset_service_visit_schedule_edit_service_due_date").setVal("");
					}
				}
			}
		}
	},
	customRequirementHandler : {
		calculateNetAmount : function () {
			var netAmount = 0;
			manage_asset_service_visit_schedule_edit.variable.custom.discount_amount.max($("#manage_asset_service_visit_schedule_edit_gross_amount").getVal());
			netAmount = ($("#manage_asset_service_visit_schedule_edit_gross_amount").getVal() - $("#manage_asset_service_visit_schedule_edit_discount_amount").getVal()) + $("#manage_asset_service_visit_schedule_edit_tax_amount").getVal();
			$("#manage_asset_service_visit_schedule_edit_net_amount").setVal(kendo.toString(netAmount, "n") + " " + $("#manage_asset_service_visit_schedule_edit_currency_code").getVal());
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			serviceVisitNumber,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			serviceVisitNumber = "0";
			if (manage_asset_service_visit_schedule.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.rec_tstamp;
				serviceVisitNumber = manage_asset_service_visit_schedule_edit.variable.custom.datasource_1_record.service_visit_no;
			}
			returnValue = executeService_save_manage_asset_service_visit({
					p_asset_id : $("#manage_asset_service_visit_schedule_edit_asset_id").getVal(),
					p_contract_doc_no : $("#manage_asset_service_visit_schedule_edit_contract_document_number").getVal(),
					p_service_visit_slno : serviceVisitNumber,
					p_service_due_date : mserviceUtilities.getDateString($("#manage_asset_service_visit_schedule_edit_service_due_date").getVal(), "yyyy-MM-dd"),
					p_service_visit_status : $("#manage_asset_service_visit_schedule_edit_service_visit_status").getVal(),
					p_call_jo_ind : manage_asset_service_visit_schedule_edit.variable.custom.call_or_job_indicator,
					p_call_jo_ref_no : $("#manage_asset_service_visit_schedule_edit_call_or_job_reference_number").getVal(),
					p_act_service_date : mserviceUtilities.getDateString($("#manage_asset_service_visit_schedule_edit_actual_service_date").getVal(), "yyyy-MM-dd"),
					p_internal_comments : $("#manage_asset_service_visit_schedule_edit_internal_comments").getVal(),
					p_customer_comments : $("#manage_asset_service_visit_schedule_edit_customer_comments").getVal(),
					p_inputparam_udf_xml : $("#manage_asset_service_visit_schedule_edit_content_1").getInputparamXML({
						screenID : "manage_asset_service_visit_schedule_edit",
						matchCondition : ["manage_asset_service_visit_schedule_edit_udf"]
					}),
					p_rec_tstamp : recordTimeStamp,
					p_save_mode : manage_asset_service_visit_schedule.variable.custom.crudIndicator,
					p_billable_nonbillable_ind : $("#manage_asset_service_visit_schedule_edit_billable_nonbillable").getVal(),
					p_charges_gross_amount : $("#manage_asset_service_visit_schedule_edit_gross_amount").getVal().toString(),
					p_charges_discount_amount : $("#manage_asset_service_visit_schedule_edit_discount_amount").getVal().toString(),
					p_charges_tax_amount : $("#manage_asset_service_visit_schedule_edit_tax_amount").getVal().toString(),
					p_charges_net_amount : kendo.parseFloat($("#manage_asset_service_visit_schedule_edit_net_amount").getVal()).toString(),
					p_charges_currency_code : $("#manage_asset_service_visit_schedule_edit_currency_code").getVal(),
				});
			if (returnValue == "SP001") {
				alert("Service Visit has been Successfully Saved");
				return true;
			} else {
				alert("Saving of Service Visit failed");
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
			valueChangeIndicator : false,
		},
		custom : {
			gross_amount_defaultValue : "0",
			discount_amount_defaultValue : "0",
			tax_amount_defaultValue : "0",
			net_amount_defaultValue : kendo.toString(0, "n") + " " + login_profile.currency_code,
			currency_code_defaultValue : login_profile.currency_code,
			service_visit_status_defaultValue : "NS",
			call_or_job_lov_code : "ASSETSERVVISITCALLNUMBER",
			call_or_job_field_1 : "",
			call_or_job_field_2 : "",
			call_or_job_indicator : "C",
			asset_id_defaultValue : manage_asset_service_visit_schedule.variable.custom.asset_id_filter_defaultValue,
			asset_id_defaultValueDescription : manage_asset_service_visit_schedule.variable.custom.asset_id_filter_defaultValueDescription
		}
	}
};
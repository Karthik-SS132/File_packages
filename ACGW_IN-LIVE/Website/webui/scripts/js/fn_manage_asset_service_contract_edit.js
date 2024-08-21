var manage_asset_service_contract_edit = {
	constructScreen : function () {
		manage_asset_service_contract_edit.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				outputPath : "context/outputparam",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'ASSET_CONTRACT_EFFECTIVE_FROM_DATE'</lov_code_type><search_field_1>#manage_asset_service_contract_edit_asset_id</search_field_1></inputparam>"
				},
				screenID : "manage_asset_service_contract_edit",
			});
		if (manage_asset_service_contract.variable.custom.crudIndicator == "U" || manage_asset_service_contract.variable.custom.crudIndicator == "V") {
			manage_asset_service_contract_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "mservice",
					serviceName : "retrieve_manage_asset_contract_detail",
					outputPath : "context/outputparam_header",
					inputParameter : {
						p_asset_id : "$manage_asset_service_contract.variable.custom.selectedRecord.asset_id",
						p_contract_doc_no : "$manage_asset_service_contract.variable.custom.selectedRecord.contract_no"
					}
				});
			manage_asset_service_contract_edit.variable.custom.datasource_1.read();
			manage_asset_service_contract_edit.variable.custom.datasource_1_record = manage_asset_service_contract_edit.variable.custom.datasource_1.at(0);
			manage_asset_service_contract_edit.variable.custom.asset_id_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.asset_id;
			manage_asset_service_contract_edit.variable.custom.asset_id_defaultValueDescription = manage_asset_service_contract_edit.variable.custom.datasource_1_record.asset_id;
			manage_asset_service_contract_edit.variable.custom.contract_type_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.contract_type;
			manage_asset_service_contract_edit.variable.custom.contract_document_number_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.contract_no;
			manage_asset_service_contract_edit.variable.custom.description_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.description;
			manage_asset_service_contract_edit.variable.custom.remarks_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.remarks;
			manage_asset_service_contract_edit.variable.custom.additional_description_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.addn_description;
			manage_asset_service_contract_edit.variable.custom.contract_duration_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.duration;
			manage_asset_service_contract_edit.variable.custom.service_frequency_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.prevm_frequency_value;
			manage_asset_service_contract_edit.variable.custom.effective_from_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_asset_service_contract_edit.variable.custom.datasource_1_record.eff_from_date
					}), "dd-MM-yyyy");
			manage_asset_service_contract_edit.variable.custom.effective_to_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_asset_service_contract_edit.variable.custom.datasource_1_record.eff_to_date
					}), "dd-MM-yyyy");
			manage_asset_service_contract_edit.variable.custom.parts_covered_indicator_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.parts_covered_ind;
			manage_asset_service_contract_edit.variable.custom.labour_covered_indicator_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.labor_covered_ind;
			manage_asset_service_contract_edit.variable.custom.billable_nonbillable_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.billable_nonbillable_ind;
			manage_asset_service_contract_edit.variable.custom.currency_code_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.charges_currency_code;
			manage_asset_service_contract_edit.variable.custom.gross_amount_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.charges_gross_amount;
			manage_asset_service_contract_edit.variable.custom.discount_amount_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.charges_discount_amount;
			manage_asset_service_contract_edit.variable.custom.tax_amount_defaultValue = manage_asset_service_contract_edit.variable.custom.datasource_1_record.charges_tax_amount;
			manage_asset_service_contract_edit.variable.custom.net_amount_defaultValue = kendo.toString(kendo.parseFloat(manage_asset_service_contract_edit.variable.custom.datasource_1_record.charges_net_amount), "n") + " " + manage_asset_service_contract_edit.variable.custom.datasource_1_record.charges_currency_code;
		}
	},
	postConstruct : function () {
		if ((manage_asset_service_contract.variable.custom.crudIndicator == "A") && (manage_asset_service_contract.variable.custom.asset_id_indicator == true)){
			$("#manage_asset_service_contract_edit_asset_id").setVal($("#manage_asset_service_contract_asset_id_filter").getVal());
			$("#manage_asset_service_contract_edit_asset_id").disable();
		}
	},
	initializeWidgets : function () {
		$("#manage_asset_service_contract_edit_asset_id").initializeWCombobox({
			screenID : "manage_asset_service_contract_edit",
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
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.asset_id_defaultValue",
			defaultValueDescription : "$manage_asset_service_contract_edit.variable.custom.asset_id_defaultValueDescription",
		});
		$("#manage_asset_service_contract_edit_contract_type").initializeWDropdownlist({
			screenID : "manage_asset_service_contract_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'ASSET_CONTRACT_TYPE'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.contract_type_defaultValue",
			defaultValueDescription : "$manage_asset_service_contract_edit.variable.custom.contract_type_defaultValueDescription"
		});
		$("#manage_asset_service_contract_edit_contract_document_number").initializeWTextbox({
			screenID : "manage_asset_service_contract_edit",
			maxlength : "40",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.contract_document_number_defaultValue",
			keyField : {
				p_screen_name : "'ASSETCONTRACTTYPE'",
				p_validation_field_1 : "#manage_asset_service_contract_edit_asset_id",
				p_validation_field_2 : "#manage_asset_service_contract_edit_contract_document_number",
				p_validation_field_3 : "",
				p_validation_field_4 : "",
				p_validation_field_5 : "",
				p_validation_field_6 : "",
				p_validation_field_7 : "",
				p_validation_field_8 : "",
				p_validation_field_9 : "",
				p_validation_field_10 : ""
			}
		});
		$("#manage_asset_service_contract_edit_description").initializeWTextarea({
			screenID : "manage_asset_service_contract_edit",
			maxlength : "300",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.description_defaultValue"
		});
		$("#manage_asset_service_contract_edit_remarks").initializeWTextarea({
			screenID : "manage_asset_service_contract_edit",
			maxlength : "300",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.remarks_defaultValue"
		});
		$("#manage_asset_service_contract_edit_additional_description").initializeWTextarea({
			screenID : "manage_asset_service_contract_edit",
			maxlength : "1500",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.additional_description_defaultValue"
		});
		$("#manage_asset_service_contract_edit_contract_duration").initializeWNumerictextbox({
			screenID : "manage_asset_service_contract_edit",
			format : "n0",
			minimum : "'1'",
			maximum : "'999'",
			decimals : "'0'",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.contract_duration_defaultValue"
		});
		$("#manage_asset_service_contract_edit_contract_duration").parent().parent().css("width", "70px");
		$("#manage_asset_service_contract_edit_service_frequency").initializeWNumerictextbox({
			screenID : "manage_asset_service_contract_edit",
			format : "n0",
			minimum : "'0'",
			maximum : "#manage_asset_service_contract_edit_contract_duration",
			decimals : "'0'",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.service_frequency_defaultValue"
		});
		$("#manage_asset_service_contract_edit_service_frequency").parent().parent().css("width", "70px");
		$("#manage_asset_service_contract_edit_effective_from_date").initializeWDatepicker({
			screenID : "manage_asset_service_contract_edit",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.effective_from_date_defaultValue"
		});
		$("#manage_asset_service_contract_edit_effective_to_date").initializeWDatepicker({
			screenID : "manage_asset_service_contract_edit",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.effective_to_date_defaultValue"
		});
		$("#manage_asset_service_contract_edit_parts_covered_indicator").initializeWCheckbox({
			screenID : "manage_asset_service_contract_edit",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.parts_covered_indicator_defaultValue"
		});
		$("#manage_asset_service_contract_edit_labour_covered_indicator").initializeWCheckbox({
			screenID : "manage_asset_service_contract_edit",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.labour_covered_indicator_defaultValue"
		});
		$("#manage_asset_service_contract_edit_billable_nonbillable").initializeWDropdownlist({
			screenID : "manage_asset_service_contract_edit",
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
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.billable_nonbillable_defaultValue",
			defaultValueDescription : "$manage_asset_service_contract_edit.variable.custom.billable_nonbillable_defaultValueDescription"
		});
		$("#manage_asset_service_contract_edit_currency_code").initializeWDropdownlist({
			screenID : "manage_asset_service_contract_edit",
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
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.currency_code_defaultValue",
			defaultValueDescription : "$manage_asset_service_contract_edit.variable.custom.currency_code_defaultValueDescription"
		});
		$("#manage_asset_service_contract_edit_gross_amount").initializeWNumerictextbox({
			screenID : "manage_asset_service_contract_edit",
			minimum : "'0'",
			maximum : "'9999999999'",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.gross_amount_defaultValue"
		});
		manage_asset_service_contract_edit.variable.custom.discount_amount = $("#manage_asset_service_contract_edit_discount_amount").initializeWNumerictextbox({
				screenID : "manage_asset_service_contract_edit",
				minimum : "'0'",
				maximum : "#manage_asset_service_contract_edit_gross_amount",
				defaultValue : "$manage_asset_service_contract_edit.variable.custom.discount_amount_defaultValue"
			});
		$("#manage_asset_service_contract_edit_tax_amount").initializeWNumerictextbox({
			screenID : "manage_asset_service_contract_edit",
			minimum : "'0'",
			maximum : "'9999999999'",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.tax_amount_defaultValue"
		});
		$("#manage_asset_service_contract_edit_net_amount").initializeWDisplayarea({
			screenID : "manage_asset_service_contract_edit",
			defaultValue : "$manage_asset_service_contract_edit.variable.custom.net_amount_defaultValue"
		});
	},
	widgetEventHandler : {
		asset_id_change : function (element, event) {
			if($("#manage_asset_service_contract_edit_asset_id").getVal() != ""){
				manage_asset_service_contract_edit.variable.custom.datasource_2.read();
				$("#manage_asset_service_contract_edit_effective_from_date").setVal(mserviceUtilities.getDateObject({
					dateString : manage_asset_service_contract_edit.variable.custom.datasource_2.data()[0].eff_from_date
				}));
			} else {
				$("#manage_asset_service_contract_edit_effective_from_date").setVal("");
				$("#manage_asset_service_contract_edit_effective_to_date").setVal("");
			}
		},
		contract_duration_change : function (element, event) {
			$("#manage_asset_service_contract_edit_service_frequency").setMax($("#manage_asset_service_contract_edit_contract_duration").getVal());
			$("#manage_asset_service_contract_edit_service_frequency").setVal("0");
			manage_asset_service_contract_edit.customRequirementHandler.calculateEffectiveToDate();
		},
		contract_duration_spin : function (element, event) {
			$("#manage_asset_service_contract_edit_service_frequency").setMax($("#manage_asset_service_contract_edit_contract_duration").getVal());
			$("#manage_asset_service_contract_edit_service_frequency").setVal("0");
			manage_asset_service_contract_edit.customRequirementHandler.calculateEffectiveToDate();
		},
		discount_amount_change : function (element, event) {
			manage_asset_service_contract_edit.customRequirementHandler.calculateNetAmount();
		},
		discount_amount_spin : function (element, event) {
			manage_asset_service_contract_edit.customRequirementHandler.calculateNetAmount();
		},
		effective_from_date_change : function (element, event) {
			if($("#manage_asset_service_contract_edit_asset_id").getVal() != ""){
				var conditionalDatasource;
				conditionalDatasource = mserviceUtilities.getTransportDataSource({
						applicationName : "common_modules",
						serviceName : "validate_conditions",
						inputParameter : {
							p_condition_name : "'IS_THIS_VALID_EFFECTIVE_FROM_DATE_FOR_ASSET_SERVICE_CONTRACT'",
							p_validation_field_1 : "#manage_asset_service_contract_edit_asset_id",
							p_validation_field_2 : "'" + mserviceUtilities.getDateString($("#manage_asset_service_contract_edit_effective_from_date").getVal(), "yyyy-MM-dd") + "'",
							p_validation_field_3 : "",
							p_validation_field_4 : "",
							p_validation_field_5 : "",
							p_validation_field_6 : "",
							p_validation_field_7 : "",
							p_validation_field_8 : "",
							p_validation_field_9 : "",
							p_validation_field_10 : ""
						}
					});
				conditionalDatasource.read();
				if (conditionalDatasource.data()[0].p_passfail_ind == "false") {
					alert("There is already a service contract overlapping this date.");
					manage_asset_service_contract_edit.variable.custom.datasource_2.read();
					$("#manage_asset_service_contract_edit_effective_from_date").setVal(mserviceUtilities.getDateObject({
					dateString : manage_asset_service_contract_edit.variable.custom.datasource_2.data()[0].eff_from_date
				}));
					manage_asset_service_contract_edit.customRequirementHandler.calculateEffectiveToDate();
				} else {
					manage_asset_service_contract_edit.customRequirementHandler.calculateEffectiveToDate();
				}
			}
		},
		gross_amount_change : function (element, event) {
			manage_asset_service_contract_edit.customRequirementHandler.calculateNetAmount();
		},
		gross_amount_spin : function (element, event) {
			manage_asset_service_contract_edit.customRequirementHandler.calculateNetAmount();
		},
		tax_amount_change : function (element, event) {
			manage_asset_service_contract_edit.customRequirementHandler.calculateNetAmount();
		},
		tax_amount_spin : function (element, event) {
			manage_asset_service_contract_edit.customRequirementHandler.calculateNetAmount();
		},
	},
	customRequirementHandler : {
		calculateNetAmount : function () {
			var netAmount = 0;
			manage_asset_service_contract_edit.variable.custom.discount_amount.max($("#manage_asset_service_contract_edit_gross_amount").getVal());
			netAmount = ($("#manage_asset_service_contract_edit_gross_amount").getVal() - $("#manage_asset_service_contract_edit_discount_amount").getVal()) + $("#manage_asset_service_contract_edit_tax_amount").getVal();
			$("#manage_asset_service_contract_edit_net_amount").setVal(kendo.toString(netAmount, "n") + " " + $("#manage_asset_service_contract_edit_currency_code").getVal());
		},
		calculateEffectiveToDate : function () {
			if ($("#manage_asset_service_contract_edit_effective_from_date").getVal() != "" && $("#manage_asset_service_contract_edit_contract_duration").getVal() != "") {
				var effectiveFromDate;
				effectiveFromDate = $("#manage_asset_service_contract_edit_effective_from_date").getVal();
				$("#manage_asset_service_contract_edit_effective_to_date").setVal(new Date(effectiveFromDate.getFullYear(), effectiveFromDate.getMonth() + $("#manage_asset_service_contract_edit_contract_duration").getVal(), effectiveFromDate.getDate() - 1));
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_asset_service_contract.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_asset_service_contract_edit.variable.custom.datasource_1_record.rec_tstamp;
			}
			returnValue = executeService_save_manage_asset_contract({
					p_asset_id : $("#manage_asset_service_contract_edit_asset_id").getVal(),
					p_description : $("#manage_asset_service_contract_edit_description").getVal(),
					p_addn_description : $("#manage_asset_service_contract_edit_additional_description").getVal(),
					p_contract_type : $("#manage_asset_service_contract_edit_contract_type").getVal(),
					p_contract_doc_no : $("#manage_asset_service_contract_edit_contract_document_number").getVal(),
					p_contract_duration : $("#manage_asset_service_contract_edit_contract_duration").getVal().toString(),
					p_remarks : $("#manage_asset_service_contract_edit_remarks").getVal(),
					p_contract_duration_uom : "M",
					p_effective_from_date : mserviceUtilities.getDateString($("#manage_asset_service_contract_edit_effective_from_date").getVal(), "yyyy-MM-dd"),
					p_effective_to_date : mserviceUtilities.getDateString($("#manage_asset_service_contract_edit_effective_to_date").getVal(), "yyyy-MM-dd"),
					p_parts_covered_ind : $("#manage_asset_service_contract_edit_parts_covered_indicator").getVal(),
					p_labor_covered_ind : $("#manage_asset_service_contract_edit_labour_covered_indicator").getVal(),
					p_initial_warranty_ind : "0",
					p_prevm_fcy_uom : "M",
					p_prevm_fcy_no : $("#manage_asset_service_contract_edit_service_frequency").getVal().toString(),
					p_prevm_fcy_mprofile_template_id : "",
					p_inputparam_udf_xml : $("#manage_asset_service_contract_edit_content_1").getInputparamXML({
						screenID : "manage_asset_service_contract_edit",
						matchCondition : ["manage_asset_service_contract_edit_udf"]
					}),
					p_rec_tstamp : recordTimeStamp,
					p_save_mode : manage_asset_service_contract.variable.custom.crudIndicator,
					p_billable_nonbillable_ind : $("#manage_asset_service_contract_edit_billable_nonbillable").getVal(),
					p_charges_gross_amount : $("#manage_asset_service_contract_edit_gross_amount").getVal().toString(),
					p_charges_discount_amount : $("#manage_asset_service_contract_edit_discount_amount").getVal().toString(),
					p_charges_tax_amount : $("#manage_asset_service_contract_edit_tax_amount").getVal().toString(),
					p_charges_net_amount : kendo.parseFloat($("#manage_asset_service_contract_edit_net_amount").getVal()).toString(),
					p_charges_currency_code : $("#manage_asset_service_contract_edit_currency_code").getVal(),
				});
			if (returnValue == "SP001") {
				alert("Asset Service Contract saved successfully.");
				return true;
			} else {
				alert("Saving of Asset service Contract failed");
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
			contract_duration_defaultValue : "12",
			service_frequency_defaultValue : "0"
		}
	}
};

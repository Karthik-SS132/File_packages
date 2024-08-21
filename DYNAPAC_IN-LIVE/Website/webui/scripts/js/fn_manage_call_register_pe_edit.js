var manage_call_register_pe_edit = {
	constructScreen : function () {
		var visitCallLinkType;
		visitCallLinkType = cacheManager.getDataSet({
				informationType : "'VISIT_CALL_LINK_TYPE'"
			});
		if (visitCallLinkType[0] != undefined) {
			manage_call_register_pe_edit.variable.custom.visitCallLinkTypeValue = visitCallLinkType[0].code;
		};
		if (manage_call_register_pe.variable.custom.customerUserDetails != undefined) {
			manage_call_register_pe_edit.variable.custom.customer_id_defaultValue = manage_call_register_pe.variable.custom.customerUserDetails.data()[0].p_value_field_1;
			manage_call_register_pe_edit.variable.custom.customer_location_defaultValue = manage_call_register_pe.variable.custom.customerUserDetails.data()[0].p_value_field_2;
			manage_call_register_pe_edit.variable.custom.customer_contact_name_defaultValue = manage_call_register_pe.variable.custom.customerUserDetails.data()[0].p_value_field_3;
			manage_call_register_pe_edit.variable.custom.customer_contact_number_defaultValue = manage_call_register_pe.variable.custom.customerUserDetails.data()[0].p_description_field_1;
			manage_call_register_pe_edit.variable.custom.customer_contact_email_defaultValue = manage_call_register_pe.variable.custom.customerUserDetails.data()[0].p_description_field_2;
			manage_call_register_pe_edit.variable.custom.company_location_defaultValue = manage_call_register_pe.variable.custom.customerUserDetails.data()[0].p_description_field_3;
		};
		manage_call_register_pe_edit.variable.custom.datasource_5 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					outputPath : "context/outputparam",
					pageSize : 8,
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>'CALL_REGISTER_ACTIONS'</lov_code_type><search_field_1>$manage_call_register_pe.variable.custom.selectedRecord.call_no</search_field_1></inputparam>"
					},
					schemaModel : true,
					screenID : "manage_call_register_pe_edit",
					dataSourceName : "datasource_5",
					processResponse : true
				});
		if (manage_call_register_pe.variable.custom.crudIndicator == "U" || manage_call_register_pe.variable.custom.crudIndicator == "V") {
			manage_call_register_pe_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "mservice",
					serviceName : "retrieve_manage_call_register_details",
					outputPath : "context/outputparam_detail1",
					inputParameter : {
						p_call_ref_no : "$manage_call_register_pe.variable.custom.selectedRecord.call_no"
					}
				});
			manage_call_register_pe_edit.variable.custom.datasource_1.read();
			manage_call_register_pe_edit.variable.custom.datasource_1_record = manage_call_register_pe_edit.variable.custom.datasource_1.at(0);
			manage_call_register_pe_edit.variable.custom.call_category_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.call_category;
			manage_call_register_pe_edit.variable.custom.call_type_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.call_type;
			manage_call_register_pe_edit.variable.custom.customer_id_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.cust_id;
			manage_call_register_pe_edit.variable.custom.customer_location_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.cust_location_code;
			manage_call_register_pe_edit.variable.custom.customer_contact_name_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.cust_contact_name;
			manage_call_register_pe_edit.variable.custom.customer_contact_number_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.cust_contact_no;
			manage_call_register_pe_edit.variable.custom.customer_contact_email_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.cust_contact_email_id;
			manage_call_register_pe_edit.variable.custom.company_location_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.company_location_code;
			manage_call_register_pe_edit.variable.custom.asset_id_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.asset_id;
			manage_call_register_pe_edit.variable.custom.equipment_id_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.equipment_id;
			manage_call_register_pe_edit.variable.custom.contract_doc_number_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.service_contract_doc_no;
			manage_call_register_pe_edit.variable.custom.contract_doc_visit_number_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.service_visit_slno;
			manage_call_register_pe_edit.variable.custom.servicing_org_level_number_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.org_level_no;
			manage_call_register_pe_edit.variable.custom.servicing_org_level_code_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.org_level_code;
			manage_call_register_pe_edit.variable.custom.priority_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.priority_cd;
			manage_call_register_pe_edit.variable.custom.asset_location_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.asset_loc_reported;
			manage_call_register_pe_edit.variable.custom.problem_description_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.prob_desc;
			manage_call_register_pe_edit.variable.custom.additional_description_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.addn_desc;
			manage_call_register_pe_edit.variable.custom.call_mapped_to_functional_role_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.call_mapped_to_func_role;
			manage_call_register_pe_edit.variable.custom.call_mapped_to_employee_id_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.call_mapped_to_emp_id;
			manage_call_register_pe_edit.variable.custom.billable_nonbillable_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.billable_nonbillable_ind;
			manage_call_register_pe_edit.variable.custom.currency_code_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.charges_currency_code;
			manage_call_register_pe_edit.variable.custom.gross_amount_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.charges_gross_amount;
			manage_call_register_pe_edit.variable.custom.discount_amount_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.charges_discount_amount;
			manage_call_register_pe_edit.variable.custom.tax_amount_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.charges_tax_amount;
			manage_call_register_pe_edit.variable.custom.call_number_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.call_no;
			manage_call_register_pe_edit.variable.custom.call_status_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.call_status_desc;
			manage_call_register_pe_edit.variable.custom.net_amount_defaultValue = kendo.toString(kendo.parseFloat(manage_call_register_pe_edit.variable.custom.datasource_1_record.charges_net_amount), "n") + " " + manage_call_register_pe_edit.variable.custom.datasource_1_record.charges_currency_code;
			manage_call_register_pe_edit.variable.custom.call_logged_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_call_register_pe_edit.variable.custom.datasource_1_record.created_on_date,
						hourString : manage_call_register_pe_edit.variable.custom.datasource_1_record.created_on_hour,
						minuteString : manage_call_register_pe_edit.variable.custom.datasource_1_record.created_on_minute
					}), "dd-MM-yyyy HH:mm");
			manage_call_register_pe_edit.variable.custom.assigned_to_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.assigned_to_emp_name;
			manage_call_register_pe_edit.variable.custom.assigned_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_call_register_pe_edit.variable.custom.datasource_1_record.assigned_on_date,
						hourString : manage_call_register_pe_edit.variable.custom.datasource_1_record.assigned_on_hour,
						minuteString : manage_call_register_pe_edit.variable.custom.datasource_1_record.assigned_on_minute
					}), "dd-MM-yyyy HH:mm");
			manage_call_register_pe_edit.variable.custom.scheduled_start_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_call_register_pe_edit.variable.custom.datasource_1_record.sch_start_on_date,
						hourString : manage_call_register_pe_edit.variable.custom.datasource_1_record.sch_start_on_hour,
						minuteString : manage_call_register_pe_edit.variable.custom.datasource_1_record.sch_start_on_minute
					}), "dd-MM-yyyy HH:mm");
			manage_call_register_pe_edit.variable.custom.scheduled_finish_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_call_register_pe_edit.variable.custom.datasource_1_record.sch_finish_on_date,
						hourString : manage_call_register_pe_edit.variable.custom.datasource_1_record.sch_finish_on_hour,
						minuteString : manage_call_register_pe_edit.variable.custom.datasource_1_record.sch_finish_on_minute
					}), "dd-MM-yyyy HH:mm");
			manage_call_register_pe_edit.variable.custom.plan_duration_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.plan_duration + " " + manage_call_register_pe_edit.variable.custom.datasource_1_record.plan_work_uom;
			manage_call_register_pe_edit.variable.custom.plan_work_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.plan_work + " " + manage_call_register_pe_edit.variable.custom.datasource_1_record.plan_work_uom;
			manage_call_register_pe_edit.variable.custom.actual_start_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_call_register_pe_edit.variable.custom.datasource_1_record.act_start_on_date,
						hourString : manage_call_register_pe_edit.variable.custom.datasource_1_record.act_start_on_hour,
						minuteString : manage_call_register_pe_edit.variable.custom.datasource_1_record.act_start_on_minute
					}), "dd-MM-yyyy HH:mm");
			manage_call_register_pe_edit.variable.custom.actual_finish_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_call_register_pe_edit.variable.custom.datasource_1_record.act_finish_on_date,
						hourString : manage_call_register_pe_edit.variable.custom.datasource_1_record.act_finish_on_hour,
						minuteString : manage_call_register_pe_edit.variable.custom.datasource_1_record.act_finish_on_minute
					}), "dd-MM-yyyy HH:mm");
			manage_call_register_pe_edit.variable.custom.actual_duration_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.act_duration + " " + manage_call_register_pe_edit.variable.custom.datasource_1_record.plan_work_uom;
			manage_call_register_pe_edit.variable.custom.actual_work_defaultValue = manage_call_register_pe_edit.variable.custom.datasource_1_record.act_work + " " + manage_call_register_pe_edit.variable.custom.datasource_1_record.plan_work_uom;
			manage_call_register_pe_edit.variable.custom.call_closed_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_call_register_pe_edit.variable.custom.datasource_1_record.closed_on_date,
						hourString : manage_call_register_pe_edit.variable.custom.datasource_1_record.closed_on_hour,
						minuteString : manage_call_register_pe_edit.variable.custom.datasource_1_record.closed_on_minute
					}), "dd-MM-yyyy HH:mm");
			manage_call_register_pe_edit.variable.custom.call_category_defaultValueDescription = manage_call_register_pe_edit.variable.custom.datasource_1_record.call_category_desc;
			manage_call_register_pe_edit.variable.custom.call_type_defaultValueDescription = manage_call_register_pe_edit.variable.custom.datasource_1_record.call_type_desc;
			manage_call_register_pe_edit.variable.custom.customer_id_defaultValueDescription = manage_call_register_pe_edit.variable.custom.datasource_1_record.cust_name;
			manage_call_register_pe_edit.variable.custom.customer_location_defaultValueDescription = manage_call_register_pe_edit.variable.custom.datasource_1_record.cust_location_name;
			manage_call_register_pe_edit.variable.custom.company_location_defaultValueDescription = manage_call_register_pe_edit.variable.custom.datasource_1_record.company_location_name;
			if (manage_call_register_pe_edit.variable.custom.datasource_1_record.asset_id == "" || manage_call_register_pe_edit.variable.custom.datasource_1_record.asset_id == "ZZZ") {
				manage_call_register_pe_edit.variable.custom.asset_id_defaultValueDescription = "";
			} else if (manage_call_register_pe_edit.variable.custom.datasource_1_record.asset_in_warranty_ind == "0") {
				manage_call_register_pe_edit.variable.custom.asset_id_defaultValueDescription = "Out of Warranty";
			} else {
				manage_call_register_pe_edit.variable.custom.asset_id_defaultValueDescription = "In Warranty";
			};
			manage_call_register_pe_edit.variable.custom.equipment_id_defaultValueDescription = manage_call_register_pe_edit.variable.custom.datasource_1_record.equipment_desc;
			manage_call_register_pe_edit.variable.custom.contract_doc_number_defaultValueDescription = manage_call_register_pe_edit.variable.custom.datasource_1_record.service_contract_doc_desc;
			manage_call_register_pe_edit.variable.custom.call_mapped_to_functional_role_defaultValueDescription = manage_call_register_pe_edit.variable.custom.datasource_1_record.call_mapped_func_role_desc;
			manage_call_register_pe_edit.variable.custom.call_mapped_to_employee_id_defaultValueDescription = manage_call_register_pe_edit.variable.custom.datasource_1_record.call_mapped_to_emp_name;
			manage_call_register_pe_edit.variable.custom.billable_nonbillable_defaultValueDescription = manage_call_register_pe_edit.variable.custom.datasource_1_record.billable_nonbillable_ind_desc;
			manage_call_register_pe_edit.variable.custom.currency_code_defaultValueDescription = manage_call_register_pe_edit.variable.custom.datasource_1_record.charges_currency_code_desc;
			if (login_profile.client_id == "titan") {
				if (manage_call_register_pe_edit.variable.custom.equipment_id_defaultValue != "ZZZ") {
					var equipment_id_split = manage_call_register_pe_edit.variable.custom.equipment_id_defaultValue.split("-");
					$("#manage_call_register_pe_edit_udf_equipment_udf_char_1").setVal("");
					$("#manage_call_register_pe_edit_udf_equipment_udf_char_2").setVal("");
					$("#manage_call_register_pe_edit_udf_equipment_udf_char_3").setVal("");
					if (equipment_id_split[0] != undefined) {
						$("#manage_call_register_pe_edit_udf_equipment_udf_char_1").val(equipment_id_split[0]);
					};
					if (equipment_id_split[1] != undefined) {
						$("#manage_call_register_pe_edit_udf_equipment_udf_char_2").val(equipment_id_split[1]);
					};
					if (equipment_id_split[2] != undefined) {
						$("#manage_call_register_pe_edit_udf_equipment_udf_char_3").val(equipment_id_split[2]);
					};
				}
			};
			manage_call_register_pe_edit.variable.custom.datasource_2 = mserviceUtilities.getTransportDataSource({
					applicationName : "mservice",
					serviceName : "retrieve_call_event_log",
					outputPath : "context/outputparam_detail",
					pageSize : 8,
					inputParameter : {
						p_call_ref_no : "$manage_call_register_pe.variable.custom.selectedRecord.call_no"
					},
					schemaModel : true,
					screenID : "manage_call_register_pe_edit",
					dataSourceName : "datasource_2",
					processResponse : true
				});
			manage_call_register_pe_edit.variable.custom.datasource_3 = mserviceUtilities.getTransportDataSource({
					applicationName : "mservice",
					serviceName : "retrieve_call_lead_register",
					outputPath : "context/outputparam_detail",
					pageSize : 8,
					inputParameter : {
						p_call_ref_no : "$manage_call_register_pe.variable.custom.selectedRecord.call_no"
					},
					schemaModel : true,
					screenID : "manage_call_register_pe_edit",
					dataSourceName : "datasource_3",
					processResponse : true
				});
			manage_call_register_pe_edit.variable.custom.datasource_4 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values",
					pageSize : 8,
					inputParameter : {
						p_lov_code : "'CALL_USER_ATTACHMENTS'",
						p_search_field_1 : "$manage_call_register_pe.variable.custom.selectedRecord.call_no",
						p_search_field_2 : "",
						p_search_field_3 : "",
						p_search_field_4 : "",
						p_search_field_5 : ""
					},
					schemaModel : true,
					screenID : "manage_call_register_pe_edit",
					dataSourceName : "datasource_4",
					processResponse : true
				});
		}
	},
	postConstruct : function () {
		if (manage_call_register_pe.variable.custom.crudIndicator == "V") {
			$("#manage_call_register_pe_edit_add_btn").hide();
			$("#manage_call_register_pe_edit_edit_btn").hide();
			$("#manage_call_register_pe_edit_view_btn").hide();
			$("#manage_call_register_pe_edit_delete_btn").hide();
		}
		if (manage_call_register_pe.variable.custom.crudIndicator == "A") {
			$("#manage_call_register_pe_edit_summary_tab").hide();
			$("#manage_call_register_pe_edit_event_log_tab").hide();
			$("#manage_call_register_pe_edit_lead_register_tab").hide();
			$("#manage_call_register_pe_edit_attachments_tab").hide();
			$("#manage_call_register_pe_edit_requirement_entry_tab").show();
			$("#manage_call_register_pe_edit_requirement_entry_tab").click();
		}
	},
	refreshScreen : function () {
		manage_call_register_pe_edit.variable.custom.grid_4.refresh();
		if(manage_call_register_pe_edit.variable.custom.crudIndicator != "D"){
			manage_call_register_pe_edit.variable.custom.grid_4.dataSource.pageSize(8);
		}
	},
	initializeWidgets : function () {
		$("#manage_call_register_pe_edit_call_category").initializeWDropdownlist({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				informationType : "'CALLCATEGORY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.call_category_defaultValue",
			defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.call_category_defaultValueDescription",
			childFieldID : "manage_call_register_pe_edit_call_type"
		});
		$("#manage_call_register_pe_edit_call_type").initializeWDropdownlist({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				informationType : "'CALLTYPE_LIST'",
				searchField1 : "#manage_call_register_pe_edit_call_category"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.call_type_defaultValue",
			defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.call_type_defaultValueDescription"
		});
		$("#manage_call_register_pe_edit_customer_id").initializeWCombobox({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'CUST_SRCH_ON_ASST_AND_EQPT'</lov_code_type><search_field_1>#manage_call_register_pe_edit_asset_id</search_field_1><search_field_2>#manage_call_register_pe_edit_equipment_id</search_field_2><search_field_3>$manage_call_register_pe_edit.variable.custom.customer_id_serverFilterValue</search_field_3></inputparam>"
				},
			},
			dataTextField : "name",
			dataValueField : "id",
			serverFiltering : true,
			defaultValue : "$manage_call_register_pe_edit.variable.custom.customer_id_defaultValue",
			defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.customer_id_defaultValueDescription",
			childFieldID : "manage_call_register_pe_edit_customer_location"
		});
		manage_call_register_pe_edit.variable.custom.customer_location = $("#manage_call_register_pe_edit_customer_location").initializeWCombobox({
				screenID : "manage_call_register_pe_edit",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values",
					inputParameter : {
						p_lov_code : "'CUSTOMERLOCATION_LIST'",
						p_search_field_1 : "#manage_call_register_pe_edit_customer_id",
						p_search_field_2 : "",
						p_search_field_3 : "",
						p_search_field_4 : "",
						p_search_field_5 : ""
					},
				},
				dataTextField : "p_description_field_1",
				dataValueField : "p_value_field_1",
				defaultValue : "$manage_call_register_pe_edit.variable.custom.customer_location_defaultValue",
				defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.customer_location_defaultValueDescription"
			});
		$("#manage_call_register_pe_edit_customer_contact_name").initializeWTextbox({
			screenID : "manage_call_register_pe_edit",
			maxlength : "60",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.customer_contact_name_defaultValue"
		});
		$("#manage_call_register_pe_edit_customer_contact_number").initializeWCombotextbox({
			screenID : "manage_call_register_pe_edit",
			dataSource: {
				informationType: "'COUNTRYDIALCODE_LIST'"
			},
			dataTextField: "description",
			dataValueField: "code",
			template: "description",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.customer_contact_number_defaultValue",
			defaultValueDescription : "$mserviceUtilities.getDescriptionForCode('COUNTRYDIALCODE_LIST',manage_call_register_pe_edit.variable.custom.customer_contact_number_defaultValue.split('-')[0],'')"
		});
		$("#manage_call_register_pe_edit_customer_contact_email").initializeWTextbox({
			screenID : "manage_call_register_pe_edit",
			type : "email",
			maxlength : "60",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.customer_contact_email_defaultValue"
		});
		$("#manage_call_register_pe_edit_company_location").initializeWDropdownlist({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				informationType : "'COMPANYLOCATION_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.company_location_defaultValue",
			defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.company_location_defaultValueDescription"
		});
		manage_call_register_pe_edit.variable.custom.asset_id = $("#manage_call_register_pe_edit_asset_id").initializeWCombobox({
				screenID : "manage_call_register_pe_edit",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>'ASST_SRCH_ON_CUST_AND_EQPT'</lov_code_type><search_field_1>$manage_call_register_pe_edit.variable.custom.asset_id_serverFilterValue</search_field_1><search_field_2>#manage_call_register_pe_edit_equipment_id</search_field_2><search_field_3>#manage_call_register_pe_edit_customer_id</search_field_3></inputparam>"
					},
				},
				dataTextField : "desc",
				dataValueField : "id",
				serverFiltering : true,
				defaultValue : "$manage_call_register_pe_edit.variable.custom.asset_id_defaultValue",
				defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.asset_id_defaultValueDescription",
				childFieldID : "manage_call_register_pe_edit_contract_doc_number"
			});
		manage_call_register_pe_edit.variable.custom.equipment_id = $("#manage_call_register_pe_edit_equipment_id").initializeWCombobox({
				screenID : "manage_call_register_pe_edit",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>'EQPT_SRCH_ON_ASST_AND_CUST'</lov_code_type><search_field_1>#manage_call_register_pe_edit_asset_id</search_field_1><search_field_2>$manage_call_register_pe_edit.variable.custom.equipment_id_serverFilterValue</search_field_2><search_field_3>#manage_call_register_pe_edit_customer_id</search_field_3></inputparam>"
					},
				},
				dataTextField : "desc",
				dataValueField : "id",
				serverFiltering : true,
				defaultValue : "$manage_call_register_pe_edit.variable.custom.equipment_id_defaultValue",
				defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.equipment_id_defaultValueDescription"
			});
		$("#manage_call_register_pe_edit_contract_doc_number").initializeWDropdownlist({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'SERVICECONTRACT_LIST'",
					p_search_field_1 : "#manage_call_register_pe_edit_asset_id",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.contract_doc_number_defaultValue",
			defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.contract_doc_number_defaultValueDescription",
			childFieldID : "manage_call_register_pe_edit_contract_doc_visit_number"
		});
		$("#manage_call_register_pe_edit_contract_doc_visit_number").initializeWDropdownlist({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'SERVICEVISITNO_LIST'",
					p_search_field_1 : "#manage_call_register_pe_edit_asset_id",
					p_search_field_2 : "#manage_call_register_pe_edit_contract_doc_number",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.contract_doc_visit_number_defaultValue"
		});
		$("#manage_call_register_pe_edit_servicing_org_level_number").initializeWDropdownlist({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				informationType : "'ORGLEVELNO_LIST'",
				searchField1 : "$login_profile.employee_org_level_no"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.servicing_org_level_number_defaultValue",
			childFieldID : "manage_call_register_pe_edit_servicing_org_level_code"
		});
		$("#manage_call_register_pe_edit_servicing_org_level_code").initializeWDropdownlist({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				informationType : "'ORGLEVELCODE_LIST'",
				searchField1 : "#manage_call_register_pe_edit_servicing_org_level_number",
				searchField2 : "$login_profile.employee_org_level_code",
				searchField3 : "$login_profile.dealer_code"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.servicing_org_level_code_defaultValue"
		});
		$("#manage_call_register_pe_edit_priority").initializeWDropdownlist({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				informationType : "'CALLPRIORITY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.priority_defaultValue"
		});
		$("#manage_call_register_pe_edit_asset_location").initializeWTextbox({
			screenID : "manage_call_register_pe_edit",
			maxlength : "50",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.asset_location_defaultValue"
		});
		$("#manage_call_register_pe_edit_problem_description").initializeWTextarea({
			screenID : "manage_call_register_pe_edit",
			maxlength : "500",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.problem_description_defaultValue"
		});
		$("#manage_call_register_pe_edit_additional_description").initializeWTextarea({
			screenID : "manage_call_register_pe_edit",
			maxlength : "500",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.additional_description_defaultValue"
		});
		$("#manage_call_register_pe_edit_call_mapped_to_functional_role").initializeWCombobox({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				informationType : "'FUNCROLE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.call_mapped_to_functional_role_defaultValue",
			defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.call_mapped_to_functional_role_defaultValueDescription",
			childFieldID : "manage_call_register_pe_edit_call_mapped_to_employee_id"
		});
		$("#manage_call_register_pe_edit_call_mapped_to_employee_id").initializeWCombobox({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				informationType : "'FUNCROLEEMPLOYEE_LIST'",
				searchField1 : "#manage_call_register_pe_edit_call_mapped_to_functional_role"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.call_mapped_to_employee_id_defaultValue",
			defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.call_mapped_to_employee_id_defaultValueDescription"
		});
		$("#manage_call_register_pe_edit_billable_nonbillable").initializeWDropdownlist({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				informationType : "'CALLBNBIND_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.billable_nonbillable_defaultValue",
			defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.billable_nonbillable_defaultValueDescription"
		});
		$("#manage_call_register_pe_edit_currency_code").initializeWDropdownlist({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				informationType : "'CURRENCYCODE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.currency_code_defaultValue",
			defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.currency_code_defaultValueDescription"
		});
		$("#manage_call_register_pe_edit_gross_amount").initializeWNumerictextbox({
			screenID : "manage_call_register_pe_edit",
			minimum : "'0'",
			maximum : "'9999999999'",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.gross_amount_defaultValue"
		});
		manage_call_register_pe_edit.variable.custom.discount_amount = $("#manage_call_register_pe_edit_discount_amount").initializeWNumerictextbox({
				screenID : "manage_call_register_pe_edit",
				minimum : "'0'",
				maximum : "#manage_call_register_pe_edit_gross_amount",
				defaultValue : "$manage_call_register_pe_edit.variable.custom.discount_amount_defaultValue"
			});
		$("#manage_call_register_pe_edit_tax_amount").initializeWNumerictextbox({
			screenID : "manage_call_register_pe_edit",
			minimum : "'0'",
			maximum : "'9999999999'",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.tax_amount_defaultValue"
		});
		$("#manage_call_register_pe_edit_date_and_time_of_call").initializeWDatetimepicker({
			screenID : "manage_call_register_pe_edit",
			maximum : "NEWDATE",
			defaultValue : "NEWDATE"
		});
		$("#manage_call_register_pe_edit_call_taken_by").initializeWDropdownlist({
			screenID : "manage_call_register_pe_edit",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'USER_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$login_profile.user_id",
			defaultValueDescription : "$manage_call_register_pe_edit.variable.custom.call_taken_by_defaultValueDescription"
		});
		$("#manage_call_register_pe_edit_call_number").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.call_number_defaultValue"
		});
		$("#manage_call_register_pe_edit_call_status").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.call_status_defaultValue"
		});
		$("#manage_call_register_pe_edit_net_amount").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.net_amount_defaultValue"
		});
		$("#manage_call_register_pe_edit_call_logged_date").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.call_logged_date_defaultValue"
		});
		$("#manage_call_register_pe_edit_assigned_to").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.assigned_to_defaultValue"
		});
		$("#manage_call_register_pe_edit_assigned_date").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.assigned_date_defaultValue"
		});
		$("#manage_call_register_pe_edit_scheduled_start_date").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.scheduled_start_date_defaultValue"
		});
		$("#manage_call_register_pe_edit_scheduled_finish_date").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.scheduled_finish_date_defaultValue"
		});
		$("#manage_call_register_pe_edit_plan_duration").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.plan_duration_defaultValue"
		});
		$("#manage_call_register_pe_edit_plan_work").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.plan_work_defaultValue"
		});
		$("#manage_call_register_pe_edit_actual_start_date").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.actual_start_date_defaultValue"
		});
		$("#manage_call_register_pe_edit_actual_finish_date").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.actual_finish_date_defaultValue"
		});
		$("#manage_call_register_pe_edit_actual_duration").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.actual_duration_defaultValue"
		});
		$("#manage_call_register_pe_edit_actual_work").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.actual_work_defaultValue"
		});
		$("#manage_call_register_pe_edit_call_closed_date").initializeWDisplayarea({
			screenID : "manage_call_register_pe_edit",
			defaultValue : "$manage_call_register_pe_edit.variable.custom.call_closed_date_defaultValue"
		});
		$("#manage_call_register_pe_edit_tabstrip").kendoTabStrip();
		manage_call_register_pe_edit.variable.custom.grid_1 = $("#manage_call_register_pe_edit_grid_1").initializeWGrid({
				screenID : "manage_call_register_pe_edit",
				toolbar : false,
				dataSource : manage_call_register_pe_edit.variable.custom.datasource_2,
				height : 300,
				pageSize : 8
			});
		manage_call_register_pe_edit.variable.custom.grid_2 = $("#manage_call_register_pe_edit_grid_2").initializeWGrid({
				screenID : "manage_call_register_pe_edit",
				toolbar : false,
				dataSource : manage_call_register_pe_edit.variable.custom.datasource_3,
				height : 300,
				pageSize : 8
			});
		manage_call_register_pe_edit.variable.custom.grid_3 = $("#manage_call_register_pe_edit_grid_3").initializeWGrid({
				screenID : "manage_call_register_pe_edit",
				toolbar : false,
				dataSource : manage_call_register_pe_edit.variable.custom.datasource_4,
				height : 300,
				pageSize : 8
			});
		manage_call_register_pe_edit.variable.custom.grid_4 = $("#manage_call_register_pe_edit_grid_4").initializeWGrid({
				screenID : "manage_call_register_pe_edit",
				toolbar : "#manage_call_register_pe_edit_grid_4_toolbar_template",
				dataSource : manage_call_register_pe_edit.variable.custom.datasource_5,
				height : 300,
				pageSize : 8
			});
		$("#manage_call_register_pe_edit_grid_1 .k-grid-content").css("height", "232px");
		$("#manage_call_register_pe_edit_grid_2 .k-grid-content").css("height", "232px");
		$("#manage_call_register_pe_edit_grid_3 .k-grid-content").css("height", "232px");
		$("#manage_call_register_pe_edit_grid_4 .k-grid-content").css("height", "232px");
	},
	widgetEventHandler : {
		asset_id_change : function (element, event) {
			var assetContractCheck,
			amountObject;
			if ($("#manage_call_register_pe_edit_asset_id").getVal() != "ZZZ" && $("#manage_call_register_pe_edit_asset_id").getVal() != "") {
				if (manage_call_register_pe_edit.variable.custom.asset_id.dataItem() != undefined) {
					if ($("#manage_call_register_pe_edit_customer_id").getVal() != manage_call_register_pe_edit.variable.custom.asset_id.dataItem().cust_id) {
						$("#manage_call_register_pe_edit_customer_id").setVal(manage_call_register_pe_edit.variable.custom.asset_id.dataItem().cust_id);
					};
					$("#manage_call_register_pe_edit_equipment_id").setVal(manage_call_register_pe_edit.variable.custom.asset_id.dataItem().equip_id);
					$("#manage_call_register_pe_edit_servicing_org_level_number").setVal(manage_call_register_pe_edit.variable.custom.asset_id.dataItem().org_no);
					$("#manage_call_register_pe_edit_servicing_org_level_code").setVal(manage_call_register_pe_edit.variable.custom.asset_id.dataItem().org_code);
					$("#manage_call_register_pe_edit_contract_doc_number").setVal("");
					$("#manage_call_register_pe_edit_contract_doc_visit_number").setVal("");
					$("#manage_call_register_pe_edit_customer_id").disable();
					$("#manage_call_register_pe_edit_equipment_id").disable();
					$("#manage_call_register_pe_edit_servicing_org_level_number").disable();
					$("#manage_call_register_pe_edit_servicing_org_level_code").disable();
					$("#manage_call_register_pe_edit_contract_doc_number").enable();
					$("#manage_call_register_pe_edit_contract_doc_visit_number").enable();
					if (manage_call_register_pe_edit.variable.custom.visitCallLinkTypeValue == "AUTOLINK_ON_CALL_CREATE") {
						assetContractCheck = mserviceUtilities.getTransportDataSource({
								applicationName : "common_modules",
								serviceName : "retrieve_listof_values",
								inputParameter : {
									p_lov_code : "'ASSET_CONTR_CHK_FOR_A_CALL'",
									p_search_field_1 : "#manage_call_register_pe_edit_asset_id",
									p_search_field_2 : "#manage_call_register_pe_edit_customer_id",
									p_search_field_3 : "",
									p_search_field_4 : "",
									p_search_field_5 : ""
								}
							});
						assetContractCheck.read();
						if (assetContractCheck.data()[0] != undefined) {
							if (assetContractCheck.data()[0].p_description_field_3 != "") {
								amountObject = JSON.parse(assetContractCheck.data()[0].p_description_field_3);
								$("#manage_call_register_pe_edit_gross_amount").setVal(amountObject.gross_amt);
								$("#manage_call_register_pe_edit_discount_amount").setVal(amountObject.disc_amt);
								$("#manage_call_register_pe_edit_tax_amount").setVal(amountObject.tax_amt);
								$("#manage_call_register_pe_edit_billable_nonbillable").setVal(amountObject.bill_nonbill_ind);
								$("#manage_call_register_pe_edit_currency_code").setVal(amountObject.currency_code);
								$("#manage_call_register_pe_edit_net_amount").setVal(amountObject.kendo.toString(kendo.parseFloat(amountObject.net_amt), "n") + " " + amountObject.currency_code);
							} else {
								$("#manage_call_register_pe_edit_billable_nonbillable").setVal("");
							};
							if (assetContractCheck.data()[0].p_value_field_2 != "") {
								$("#manage_call_register_pe_edit_contract_doc_number").setVal(assetContractCheck.data()[0].p_value_field_2);
								$("#manage_call_register_pe_edit_contract_doc_number").disable();
								if (assetContractCheck.data()[0].p_value_field_3 != "0") {
									$("#manage_call_register_pe_edit_contract_doc_visit_number").setVal(assetContractCheck.data()[0].p_value_field_3.split("*")[0]);
								} else {
									$("#manage_call_register_pe_edit_contract_doc_visit_number").setVal("");
									$("#manage_call_register_pe_edit_contract_doc_visit_number").disable();
								}
							} else {
								$("#manage_call_register_pe_edit_contract_doc_number").setVal("");
								$("#manage_call_register_pe_edit_contract_doc_number").disable();
								$("#manage_call_register_pe_edit_contract_doc_visit_number").setVal("");
								$("#manage_call_register_pe_edit_contract_doc_visit_number").disable();
							}
						} else {
							$("#manage_call_register_pe_edit_contract_doc_number").setVal("");
							$("#manage_call_register_pe_edit_contract_doc_number").disable();
							$("#manage_call_register_pe_edit_contract_doc_visit_number").setVal("");
							$("#manage_call_register_pe_edit_contract_doc_visit_number").disable();
						}
					}
				}
			} else {
				$("#manage_call_register_pe_edit_servicing_org_level_number").setVal("");
				$("#manage_call_register_pe_edit_servicing_org_level_code").setVal("");
				$("#manage_call_register_pe_edit_contract_doc_number").setVal("");
				$("#manage_call_register_pe_edit_contract_doc_visit_number").setVal("");
				$("#manage_call_register_pe_edit_customer_id").enable();
				$("#manage_call_register_pe_edit_equipment_id").enable();
				$("#manage_call_register_pe_edit_servicing_org_level_number").enable();
				$("#manage_call_register_pe_edit_servicing_org_level_code").enable();
				$("#manage_call_register_pe_edit_contract_doc_number").disable();
				$("#manage_call_register_pe_edit_contract_doc_visit_number").disable();
			}
		},
		customer_location_change : function (element, event) {
			var customerDetails;
			manage_call_register_pe_edit.variable.custom.customerLocationContactName = "";
			manage_call_register_pe_edit.variable.custom.customerLocationContactNumber = "";
			manage_call_register_pe_edit.variable.custom.customerLocationContactEmail = "";
			if ($("#manage_call_register_pe_edit_customer_location").getVal() != "") {
				customerDetails = mserviceUtilities.getTransportDataSource({
						applicationName : "common_modules",
						serviceName : "retrieve_listof_values",
						inputParameter : {
							p_lov_code : "'CUSTOMER_DETAIL_FOR_CALL_REGN'",
							p_search_field_1 : "#manage_call_register_pe_edit_customer_id",
							p_search_field_2 : "#manage_call_register_pe_edit_customer_location",
							p_search_field_3 : "",
							p_search_field_4 : "",
							p_search_field_5 : ""
						}
					});
				customerDetails.read();
				if (customerDetails.data()[0] != undefined) {
					manage_call_register_pe_edit.variable.custom.customerLocationContactName = customerDetails.data()[0].p_value_field_1;
					manage_call_register_pe_edit.variable.custom.customerLocationContactNumber = customerDetails.data()[0].p_value_field_2;
					manage_call_register_pe_edit.variable.custom.customerLocationContactEmail = customerDetails.data()[0].p_value_field_3;
				} else {
					manage_call_register_pe_edit.variable.custom.customerLocationContactName = "";
					manage_call_register_pe_edit.variable.custom.customerLocationContactNumber = "";
					manage_call_register_pe_edit.variable.custom.customerLocationContactEmail = "";
				}
			}
		},
		discount_amount_change : function (element, event) {
			manage_call_register_pe_edit.customRequirementHandler.calculateNetAmount();
		},
		discount_amount_spin : function (element, event) {
			manage_call_register_pe_edit.customRequirementHandler.calculateNetAmount();
		},
		equipment_id_change : function (element, event) {
			if ($("#manage_call_register_pe_edit_asset_id").getVal() == "ZZZ" || $("#manage_call_register_pe_edit_asset_id").getVal() == "") {
				if (manage_call_register_pe_edit.variable.custom.equipment_id.dataItem() != undefined) {
					$("#manage_call_register_pe_edit_servicing_org_level_number").setVal(manage_call_register_pe_edit.variable.custom.equipment_id.dataItem().org_no);
					$("#manage_call_register_pe_edit_servicing_org_level_code").setVal(manage_call_register_pe_edit.variable.custom.equipment_id.dataItem().org_code);
					$("#manage_call_register_pe_edit_servicing_org_level_number").disable();
					$("#manage_call_register_pe_edit_servicing_org_level_code").disable();
					if (login_profile.client_id == "titan") {
						var equipment_id_split = $("#manage_call_register_pe_edit_equipment_id").getVal().split("-");
						$("#manage_call_register_pe_edit_udf_equipment_udf_char_1").val("");
						$("#manage_call_register_pe_edit_udf_equipment_udf_char_2").val("");
						$("#manage_call_register_pe_edit_udf_equipment_udf_char_3").val("");
						if (equipment_id_split[0] != undefined) {
							$("#manage_call_register_pe_edit_udf_equipment_udf_char_1").val(equipment_id_split[0]);
						};
						if (equipment_id_split[1] != undefined) {
							$("#manage_call_register_pe_edit_udf_equipment_udf_char_2").val(equipment_id_split[1]);
						};
						if (equipment_id_split[2] != undefined) {
							$("#manage_call_register_pe_edit_udf_equipment_udf_char_3").val(equipment_id_split[2]);
						}
					}
				} else {
					$("#manage_call_register_pe_edit_servicing_org_level_number").setVal("");
					$("#manage_call_register_pe_edit_servicing_org_level_code").setVal("");
					$("#manage_call_register_pe_edit_servicing_org_level_number").enable();
					$("#manage_call_register_pe_edit_servicing_org_level_code").enable();
				}
			}
		},
		gross_amount_change : function (element, event) {
			manage_call_register_pe_edit.customRequirementHandler.calculateNetAmount();
		},
		gross_amount_spin : function (element, event) {
			manage_call_register_pe_edit.customRequirementHandler.calculateNetAmount();
		},
		tax_amount_change : function (element, event) {
			manage_call_register_pe_edit.customRequirementHandler.calculateNetAmount();
		},
		tax_amount_spin : function (element, event) {
			manage_call_register_pe_edit.customRequirementHandler.calculateNetAmount();
		},
		/*customer_id_change : function (element, event) {
			if (manage_call_register_pe_edit.variable.custom.customer_location.dataSource.data().length == 1) {
				$("#manage_call_register_pe_edit_customer_location").setVal(manage_call_register_pe_edit.variable.custom.customer_location.dataSource.data()[0].p_value_field_1);
			}
		}*/
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if (manage_call_register_pe_edit.variable.custom.crudIndicator == "D") {
				manage_call_register_pe_edit.variable.custom.grid_4.dataSource.remove(manage_call_register_pe_edit.variable.custom.selectedRecord);
				alert("Data deleted successfully.");
			} else if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_requirement_entry_pe.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_call_register_pe_edit",
					fieldID : "manage_call_register_pe_edit_child1_window",
					nextScreenID : "manage_call_requirement_entry_pe",
					nextScreenName : "Requirement Entry",
					execute : manage_call_requirement_entry_pe.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		},
		misc_btn_click : function (element, event){
			if(manage_call_register_pe_edit.variable.custom.miscID == "excel_import"){
				$("#manage_call_register_pe_edit_grid_4").append("<div id = 'manage_call_register_pe_edit_excel_import_window'><div id = 'manage_call_register_pe_edit_excel_import_spreadsheet' style='width: 100%; height: 90%;' ></div></hr><center><button style='margin-top: 2%;' id='manage_call_register_pe_edit_excel_import_submit' class='k-button'>Submit</button></center></div>");
				$("#manage_call_register_pe_edit_excel_import_window").kendoWindow({
					width : (screen.width * 0.60),
					height : (screen.height * 0.65),
					title : "Excel Import",
					visible : false,
					modal : true,
					deactivate : function () {
						this.destroy();
					},
				});
				$("#manage_call_register_pe_edit_excel_import_spreadsheet").kendoSpreadsheet({
					columns: manage_call_register_pe_edit.customRequirementHandler.getSpreadsheetColumns().length,
					rows : 1000,
					sheetsbar: false,
					sheets: [{
						columns: manage_call_register_pe_edit.customRequirementHandler.getSpreadsheetColumns(),
						rows: [{
							cells: manage_call_register_pe_edit.customRequirementHandler.getSpreadsheetRows()
						}]
					}]
				});
				$("#manage_call_register_pe_edit_excel_import_window").data("kendoWindow").center().open();
				$("#manage_call_register_pe_edit_excel_import_spreadsheet .k-tabstrip-wrapper").hide();
				$("#manage_call_register_pe_edit_excel_import_spreadsheet .k-spreadsheet-action-bar").hide();
				for(var i=0; i < manage_call_register_pe_edit.customRequirementHandler.getSpreadsheetRows().length; i++){
					if(manage_call_register_pe_edit.customRequirementHandler.getSpreadsheetRows()[i].format !== "undefined"){
						$("#manage_call_register_pe_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(1,i,1000,0).format(manage_call_register_pe_edit.customRequirementHandler.getSpreadsheetRows()[i].format);
					}
				}
				$("#manage_call_register_pe_edit_excel_import_submit").click(function(){
					var spreadsheetData = $("#manage_call_register_pe_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().toJSON().rows;
					for(var i=0; i < spreadsheetData.length; i++){
						for(var j=0; j <spreadsheetData[i].cells.length; j++){
							if(spreadsheetData[i].cells[j].value != undefined){
								spreadsheetData[i].valid = true;
							}
						}
					};
					var spreadsheetDatasource = $.grep(spreadsheetData,function(data,index){
						return data.valid;
					});
					if(spreadsheetDatasource.length != 1){
						var inputparamXML = "<inputparam><search_field_xml>";
						for(var i=1; i < spreadsheetDatasource.length; i++){
							inputparamXML += "<data><record_index>" + spreadsheetDatasource[i].index + "</record_index>";
							for(var j=0; j < manage_call_register_pe_edit.customRequirementHandler.getSpreadsheetRows().length; j++){
								if(spreadsheetDatasource[i].cells[j] == undefined || spreadsheetDatasource[i].cells[j].value == undefined){
									inputparamXML += "<" + manage_call_register_pe_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">" + '' + "</" + manage_call_register_pe_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">"
								} else {
									inputparamXML += "<" + manage_call_register_pe_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">" + spreadsheetDatasource[i].cells[j].value + "</" + manage_call_register_pe_edit.customRequirementHandler.getSpreadsheetRows()[j].id + ">"
								}
							}
							inputparamXML += "</data>";
						}
						inputparamXML += "</search_field_xml></inputparam>";
						manage_call_register_pe_edit.variable.custom.validationData = mserviceUtilities.getTransportPagingDataSource({
							applicationName : "common_modules",
							serviceName : "retrieve_manage_custom_info_list",
							outputPath : "outputparam_detail",
							api : true,
							pageSize : 50,
							inputParameter : {
								p_custom_info_code : "'requirement_entry_import'",
								p_inputparam_xml : inputparamXML.replace(/\n|\r/g, "")
							},
							screenID : "manage_call_register_pe_edit"
						});
						manage_call_register_pe_edit.variable.custom.validationData.read();
						if(manage_call_register_pe_edit.variable.custom.validationData.data().length != 0){
							var invalidData = $.grep(manage_call_register_pe_edit.variable.custom.validationData.data(),function(data){
								return data.valid_ind == "0"
							});
							var overallData = manage_call_register_pe_edit.variable.custom.validationData.data();
							for(var index=0; index < overallData.length; index++){
								$("#manage_call_register_pe_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(overallData[index].record_index),0,1,$("#manage_call_register_pe_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).background ("white");
								$("#manage_call_register_pe_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(overallData[index].record_index),0,1,$("#manage_call_register_pe_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).validation(null);
							}
							if(invalidData.length != 0){
								for(var counter=0; counter < invalidData.length; counter++){
									$("#manage_call_register_pe_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(invalidData[counter].record_index),0,1,$("#manage_call_register_pe_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).background ("yellow");
									$("#manage_call_register_pe_edit_excel_import_spreadsheet").data("kendoSpreadsheet").activeSheet().range(parseInt(invalidData[counter].record_index),0,1,$("#manage_call_register_pe_edit_excel_import_spreadsheet").data("kendoSpreadsheet").options.columns).validation({
										dataType: "custom",
										from: "AND(LEN(A" + ( parseInt(invalidData[counter].record_index) + 1 ) + ")<0)",
										messageTemplate: invalidData[counter].err_message
									});
								}
								alert("The rows highlighted in the excel are not valid part number or not available in database. Please remove or correct it.");
							} else {
								var spreadsheetArray = manage_call_register_pe_edit.variable.custom.validationData.data();
								var duplicateData = [];
								for(var index=0; index < spreadsheetArray.length; index++){					
									var tempArray = $.grep(manage_call_register_pe_edit.variable.custom.grid_4.dataSource.data(),function(data){
										if((data.item_code == spreadsheetArray[index].item_code) && (data.item_variant_code == spreadsheetArray[index].item_variant_code) && (data.uom_code == spreadsheetArray[index].uom_code)){
											duplicateData.push(data);
										}
									});
								}
								for(var index=0; index < duplicateData.length; index++){
									manage_call_register_pe_edit.variable.custom.grid_4.dataSource.remove(duplicateData[index]);
								}
								for(var index=0; index < spreadsheetArray.length; index++){
									manage_call_register_pe_edit.variable.custom.grid_4.dataSource.add({
										item_code : spreadsheetArray[index].item_code,
										item_variant_code : spreadsheetArray[index].item_variant_code,
										net_quantity : spreadsheetArray[index].net_quantity,
										uom_code : spreadsheetArray[index].uom_code,
										std_rate : spreadsheetArray[index].std_rate,
										gross_amount : (parseFloat(spreadsheetArray[index].net_quantity) * parseFloat(spreadsheetArray[index].std_rate)).toString(),
										currency_code : spreadsheetArray[index].currency_code,
										requirement : "",
										item_code_description : spreadsheetArray[index].item_code_description,
										item_variant_code_description : spreadsheetArray[index].item_variant_code_description,
										last_update_timestamp : "00000000-0000-0000-0000-000000000000",
										uom_code_description : spreadsheetArray[index].uom_code_description,
										currency_code_description : spreadsheetArray[index].currency_code_description,
										action_type : "PARTREQ"
									});
								}
								$("#manage_call_register_pe_edit_excel_import_window").data("kendoWindow").close();
							}
						} else {
							alert("Please Contact your support desk.");
						}
					} else {
						alert("No record to perform Import.");
					}
				});	
			}
		},
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			contractVisitDocNumber,
			returnValue,
			inputString,
			requirementEntryString;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			contractVisitDocNumber = "0";
			if (manage_call_register_pe.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_call_register_pe_edit.variable.custom.datasource_1_record.rec_tstamp;
			};
			if ($("#manage_call_register_pe_edit_contract_doc_visit_number").getVal() != "") {
				contractVisitDocNumber = $("#manage_call_register_pe_edit_contract_doc_visit_number").getVal();
			};
			if (login_profile.user_group_type == "LU") {
				if ($("#manage_call_register_pe_edit_udf_analysis_code3").getVal() == "ACCR") {
					$("#manage_call_register_pe_edit_servicing_org_level_number").setVal("3");
					$("#manage_call_register_pe_edit_servicing_org_level_code").setVal("CRS");
				} else {
					$("#manage_call_register_pe_edit_servicing_org_level_number").setVal("2");
					$("#manage_call_register_pe_edit_servicing_org_level_code").setVal($("#manage_call_register_pe_edit_udf_analysis_code3").getVal());
				}
			};
			inputString = $("#manage_call_register_pe_edit_content_1").getInputparamXML({
					screenID : "manage_call_register_pe_edit",
					matchCondition : ["manage_call_register_pe_edit_udf","manage_call_register_pe_edit_call_register","manage_call_register_pe_edit_product_udf"]
				});
			requirementEntryString = "<requirementEntry>";
			if (manage_call_register_pe_edit.variable.custom.grid_4 != undefined) {
				for (var index = 0; index < manage_call_register_pe_edit.variable.custom.grid_4.dataSource.data().length; index++) {
					requirementEntryString += "<data><item_code>" + manage_call_register_pe_edit.variable.custom.grid_4.dataSource.data()[index].item_code + "</item_code><item_variant_code>" + manage_call_register_pe_edit.variable.custom.grid_4.dataSource.data()[index].item_variant_code + "</item_variant_code><uom_code>" + manage_call_register_pe_edit.variable.custom.grid_4.dataSource.data()[index].uom_code + "</uom_code><quantity>" + manage_call_register_pe_edit.variable.custom.grid_4.dataSource.data()[index].net_quantity + "</quantity><std_rate>" + manage_call_register_pe_edit.variable.custom.grid_4.dataSource.data()[index].std_rate + "</std_rate><gross_amount>" + manage_call_register_pe_edit.variable.custom.grid_4.dataSource.data()[index].gross_amount + "</gross_amount><requirement>" + manage_call_register_pe_edit.variable.custom.grid_4.dataSource.data()[index].requirement + "</requirement><action_type>" + manage_call_register_pe_edit.variable.custom.grid_4.dataSource.data()[index].action_type + "</action_type><action_category>" + manage_call_register_pe_edit.variable.custom.grid_4.dataSource.data()[index].action_type + "</action_category></data>";
				}
			};
			requirementEntryString += "</requirementEntry>";
			returnValue = executeService_save_manage_call_register({
					p_customer_id : $("#manage_call_register_pe_edit_customer_id").getVal(),
					p_asset_id : $("#manage_call_register_pe_edit_asset_id").getVal(),
					p_asset_location_reported : $("#manage_call_register_pe_edit_asset_location").getVal(),
					p_problem_description : $("#manage_call_register_pe_edit_problem_description").getVal(),
					p_priority_code : $("#manage_call_register_pe_edit_priority").getVal(),
					p_customer_contact_name : $("#manage_call_register_pe_edit_customer_contact_name").getVal(),
					p_call_logged_by_userid : $("#manage_call_register_pe_edit_call_taken_by").getVal(),
					p_call_logged_on_date : mserviceUtilities.getDateString($("#manage_call_register_pe_edit_date_and_time_of_call").getVal(), "yyyy-MM-dd"),
					p_call_logged_on_hour : mserviceUtilities.getDateString($("#manage_call_register_pe_edit_date_and_time_of_call").getVal(), "HH"),
					p_call_logged_on_minute : mserviceUtilities.getDateString($("#manage_call_register_pe_edit_date_and_time_of_call").getVal(), "mm"),
					p_customer_location_code : $("#manage_call_register_pe_edit_customer_location").getVal(),
					p_company_location_code : $("#manage_call_register_pe_edit_company_location").getVal(),
					p_organogram_level_no : $("#manage_call_register_pe_edit_servicing_org_level_number").getVal(),
					p_organogram_level_code : $("#manage_call_register_pe_edit_servicing_org_level_code").getVal(),
					p_call_category : $("#manage_call_register_pe_edit_call_category").getVal(),
					p_call_type : $("#manage_call_register_pe_edit_call_type").getVal(),
					p_additional_description : $("#manage_call_register_pe_edit_additional_description").getVal(),
					p_customer_contact_no : $("#manage_call_register_pe_edit_customer_contact_number").getVal(),
					p_customer_contact_email_id : $("#manage_call_register_pe_edit_customer_contact_email").getVal(),
					p_inputparam_udf_xml : inputString.replace("</inputparam>", requirementEntryString + "</inputparam>"),
					p_save_mode : manage_call_register_pe.variable.custom.crudIndicator,
					p_rec_timestamp : recordTimeStamp,
					p_service_call_ref_no : $("#manage_call_register_pe_edit_call_number").getVal(),
					p_billable_nonbillable_ind : $("#manage_call_register_pe_edit_billable_nonbillable").getVal(),
					p_charges_gross_amount : $("#manage_call_register_pe_edit_gross_amount").getVal().toString(),
					p_charges_discount_amount : $("#manage_call_register_pe_edit_discount_amount").getVal().toString(),
					p_charges_tax_amount : $("#manage_call_register_pe_edit_tax_amount").getVal().toString(),
					p_charges_net_amount : kendo.parseFloat($("#manage_call_register_pe_edit_net_amount").getVal()).toString(),
					p_charges_currency_code : $("#manage_call_register_pe_edit_currency_code").getVal(),
					p_contract_doc_no : $("#manage_call_register_pe_edit_contract_doc_number").getVal(),
					p_contract_visit_no : contractVisitDocNumber,
					p_equipment_id : $("#manage_call_register_pe_edit_equipment_id").getVal(),
					p_call_mapped_to_func_role : $("#manage_call_register_pe_edit_call_mapped_to_functional_role").getVal(),
					p_call_mapped_to_employee_id : $("#manage_call_register_pe_edit_call_mapped_to_employee_id").getVal()
				});
			if (returnValue.updateStatus == "SP001") {
				manage_call_register_pe.variable.custom.acopcocallRefNo = returnValue.referenceNumber;
				alert("Enquiry Saved successfully. Your Enquiry reference number is " + returnValue.referenceNumber);
				return true;
			} else {
				alert("Saving of Enquiry Failed");
				return false;
			}
		}
	},
	linkEventHandler : {
		event_log_tab_link_click : function (element, event) {
			var recordCounter;
			if (manage_call_register_pe_edit.variable.custom.callEventLogTabOpened == false) {
				manage_call_register_pe_edit.variable.custom.callEventLogTabOpened = true;
				manage_call_register_pe_edit.variable.custom.datasource_2.read();
				for (recordCounter = 0; recordCounter < manage_call_register_pe_edit.variable.custom.datasource_2.data().length; recordCounter++) {
					if (manage_call_register_pe_edit.variable.custom.datasource_2.data()[recordCounter].latitude != "" && manage_call_register_pe_edit.variable.custom.datasource_2.data()[recordCounter].longitude != "") {
						manage_call_register_pe_edit.customRequirementHandler.getMyAddress(manage_call_register_pe_edit.variable.custom.datasource_2.data()[recordCounter].latitude, manage_call_register_pe_edit.variable.custom.datasource_2.data()[recordCounter].longitude, recordCounter);
					} else {
						manage_call_register_pe_edit.variable.custom.datasource_2.data()[recordCounter].set("event_address", "");
					}
				}
			}
		},
		lead_register_tab_link_click : function (element, event) {
			if (manage_call_register_pe_edit.variable.custom.leadRegisterTabOpened == false) {
				manage_call_register_pe_edit.variable.custom.leadRegisterTabOpened = true;
				manage_call_register_pe_edit.variable.custom.datasource_3.read();
			}
		},
		call_attachment_reference_link_click : function (element, event) {
			manage_call_register_pe_edit.variable.custom.attachmentTobeViewed = mserviceUtilities.getFileUploadPath({
					transactionType : "CALL",
					async : false,
					referenceNumber : manage_call_register_pe.variable.custom.selectedRecord.call_no
				}) + "/" + $(element).text();
			if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_call_register_pe_edit_child.js"])) {
				webNavigationController.gotoNextScreen({
					screenID : "manage_call_register_pe_edit",
					fieldID : "manage_call_register_pe_edit_child_window",
					nextScreenID : "manage_call_register_pe_edit_child",
					nextScreenName : "Call Attachment",
					windowHeight : 600,
					windowWidth : 900,
					execute : manage_call_register_pe_edit_child.constructScreen
				});
			} else {
				alert("Sorry. This feature is unavailable. Please contact support desk.");
			}
		},
		attachments_tab_link_click : function (element, event) {
			if (manage_call_register_pe_edit.variable.custom.attachmentsTabOpened == false) {
				manage_call_register_pe_edit.variable.custom.attachmentsTabOpened = true;
				manage_call_register_pe_edit.variable.custom.datasource_4.read();
			}
		},
		requirement_entry_tab_link_click : function (element, event) {
			if (manage_call_register_pe_edit.variable.custom.requirementEntryTabOpened == false) {
				manage_call_register_pe_edit.variable.custom.requirementEntryTabOpened = true;
				if(manage_call_register_pe.variable.custom.crudIndicator != "A"){
					manage_call_register_pe_edit.variable.custom.datasource_5.read();
				}
			}
		}
	},
	customRequirementHandler : {
		calculateNetAmount : function () {
			var netAmount = 0;
			manage_call_register_pe_edit.variable.custom.discount_amount.max($("#manage_call_register_pe_edit_gross_amount").getVal());
			netAmount = ($("#manage_call_register_pe_edit_gross_amount").getVal() - $("#manage_call_register_pe_edit_discount_amount").getVal()) + $("#manage_call_register_pe_edit_tax_amount").getVal();
			$("#manage_call_register_pe_edit_net_amount").setVal(kendo.toString(netAmount, "n") + " " + $("#manage_call_register_pe_edit_currency_code").getVal());
		},
		getMyAddress : function (latitude, longitude, index) {
			var geocoder,
			latitudeLongitude;
			geocoder = new google.maps.Geocoder();
			latitudeLongitude = new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
			geocoder.geocode({
				'latLng' : latitudeLongitude
			}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					manage_call_register_pe_edit.variable.custom.datasource_2.data()[index].set("event_address", results[0].formatted_address);
				} else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
					setTimeout(function () {
						manage_call_register_pe_edit.customRequirementHandler.getMyAddress(latitude, longitude, index);
					}, 2000);
				}
			});
		},
		setSelectedRecord : function () {
			manage_call_register_pe_edit.variable.custom.selectedRecord = manage_call_register_pe_edit.variable.custom.grid_4.dataSource.getByUid(manage_call_register_pe_edit.variable.custom.grid_4.select().data("uid"));
		},
		getSpreadsheetRows : function () {
			var currentConfig,
			configurationParamNode,
			spreadsheetNode,
			rowNodes,
			fieldNodes,
			cellArray = [];
			currentConfig = webConfigurationEngine.getUiConfigurationObject("manage_call_register_pe_edit");
			if (currentConfig != undefined) {
				configurationParamNode = currentConfig.configuration.getElementsByTagName("ui_configuration")[0];
				if (configurationParamNode != undefined) {
					spreadsheetNode = configurationParamNode.getElementsByTagName("spreadsheet")[0];
					if (spreadsheetNode != undefined) {
						rowNodes = spreadsheetNode.getElementsByTagName("rows")[0];
						if (rowNodes != undefined) {
							fieldNodes = rowNodes.getElementsByTagName("field");
							if (fieldNodes != undefined) {
								for(index=0; index < fieldNodes.length; index++){
									var rowObject = {};
									var attribute = fieldNodes.item(index);
									for (var counter = 0; counter < attribute.childElementCount; counter++) {
										if(attribute.childNodes[counter].nodeName == "enable"){
											rowObject[attribute.childNodes[counter].nodeName] = eval(attribute.childNodes[counter].childNodes[0].nodeValue);
										} else {
											rowObject[attribute.childNodes[counter].nodeName] = attribute.childNodes[counter].childNodes[0].nodeValue;
										}
									}
									cellArray.push(rowObject);
								}
							}
						}
					}
				}
			}
			return cellArray;
		},
		getSpreadsheetColumns : function () {
			var currentConfig,
			configurationParamNode,
			spreadsheetNode,
			columnNodes,
			fieldNodes,
			columnArray = [];
			currentConfig = webConfigurationEngine.getUiConfigurationObject("manage_call_register_pe_edit");
			if (currentConfig != undefined) {
				configurationParamNode = currentConfig.configuration.getElementsByTagName("ui_configuration")[0];
				if (configurationParamNode != undefined) {
					spreadsheetNode = configurationParamNode.getElementsByTagName("spreadsheet")[0];
					if (spreadsheetNode != undefined) {
						columnNodes = spreadsheetNode.getElementsByTagName("columns")[0];
						if (columnNodes != undefined) {
							fieldNodes = columnNodes.getElementsByTagName("field");
							if (fieldNodes != undefined) {
								for(index=0; index < fieldNodes.length; index++){
									var rowObject = {};
									var attribute = fieldNodes.item(index);
									for (var counter = 0; counter < attribute.childElementCount; counter++) {
										if(attribute.childNodes[counter].nodeName == "width"){
											rowObject[attribute.childNodes[counter].nodeName] = parseInt(attribute.childNodes[counter].childNodes[0].nodeValue);
										} else {
											rowObject[attribute.childNodes[counter].nodeName] = attribute.childNodes[counter].childNodes[0].nodeValue;
										}
									}
									columnArray.push(rowObject);
								}
							}
						}
					}
				}
			}
			return columnArray;
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}, {
					contentID : "content_2",
					columnLength : 3
				}
			],
			valueChangeIndicator : false,
		},
		custom : {
			callEventLogTabOpened : false,
			leadRegisterTabOpened : false,
			attachmentsTabOpened : false,
			requirementEntryTabOpened : false,
			gross_amount_defaultValue : "0",
			discount_amount_defaultValue : "0",
			tax_amount_defaultValue : "0",
			net_amount_defaultValue : kendo.toString(0, "n") + " " + login_profile.currency_code,
			currency_code_defaultValue : login_profile.currency_code,
			call_taken_by_defaultValueDescription : login_profile.title + ". " + login_profile.first_name + " " + login_profile.middle_name + " " + login_profile.last_name,
			customer_id_serverFilterValue : "",
			asset_id_serverFilterValue : "",
			equipment_id_serverFilterValue : "",
			customDelete : true
		}
	}
};
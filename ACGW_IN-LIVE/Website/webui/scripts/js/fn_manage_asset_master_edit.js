var manage_asset_master_edit = {
	constructScreen : function () {
		if (manage_asset_master.variable.custom.crudIndicator == "U" || manage_asset_master.variable.custom.crudIndicator == "V") {
			manage_asset_master_edit.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "mservice",
					serviceName : "retrieve_manage_asset_master_details",
					outputPath : "context/outputparam/asset_detail",
					inputParameter : {
						p_asset_id : "$manage_asset_master.variable.custom.selectedRecord.asset_id"
					}
				});
			manage_asset_master_edit.variable.custom.datasource_1.read();
			manage_asset_master_edit.variable.custom.datasource_1_record = manage_asset_master_edit.variable.custom.datasource_1.at(0);
			manage_asset_master_edit.variable.custom.equipment_id_defaultValue = manage_asset_master_edit.variable.custom.datasource_1_record.equipment_id;
			manage_asset_master_edit.variable.custom.equipment_id_defaultValueDescription = manage_asset_master_edit.variable.custom.datasource_1_record.asset_desc;
			manage_asset_master_edit.variable.custom.customer_id_defaultValue = manage_asset_master_edit.variable.custom.datasource_1_record.customer_id;
			manage_asset_master_edit.variable.custom.customer_id_defaultValueDescription = manage_asset_master_edit.variable.custom.datasource_1_record.customer_name;
			manage_asset_master_edit.variable.custom.servicing_org_level_number_defaultValue = manage_asset_master_edit.variable.custom.datasource_1_record.servicing_org_level_no;
			manage_asset_master_edit.variable.custom.servicing_org_level_code_defaultValue = manage_asset_master_edit.variable.custom.datasource_1_record.servicing_org_level_code;
			manage_asset_master_edit.variable.custom.installation_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_asset_master_edit.variable.custom.datasource_1_record.installation_date
					}), "dd-MM-yyyy");
			manage_asset_master_edit.variable.custom.asset_id_defaultValue = manage_asset_master_edit.variable.custom.datasource_1_record.asset_id;
			manage_asset_master_edit.variable.custom.asset_location_code_defaultValue = manage_asset_master_edit.variable.custom.datasource_1_record.asset_loc_code;
			manage_asset_master_edit.variable.custom.locator_layout_defaultValue = manage_asset_master_edit.variable.custom.datasource_1_record.locator_layout;
			manage_asset_master_edit.variable.custom.asset_status_defaultValue = "0";
			if (manage_asset_master_edit.variable.custom.datasource_1_record.asset_status == "IA") {
				manage_asset_master_edit.variable.custom.asset_status_defaultValue = "1";
			};
			if(manage_asset_master_edit.variable.custom.datasource_1_record.lastcheck_call_jo_id == ""){
				manage_asset_master_edit.variable.custom.lastcheck_call_or_job_ref_no_defaultValue = "";
			}else{
				manage_asset_master_edit.variable.custom.lastcheck_call_or_job_ref_no_defaultValue = manage_asset_master_edit.variable.custom.datasource_1_record.lastcheck_call_jo_ind + " : " + manage_asset_master_edit.variable.custom.datasource_1_record.lastcheck_call_jo_id;
			}
			manage_asset_master_edit.variable.custom.lastcheck_date_defaultValue = mserviceUtilities.getDateString(mserviceUtilities.getDateObject({
						dateString : manage_asset_master_edit.variable.custom.datasource_1_record.lastcheck_date
					}), "dd-MM-yyyy");
			manage_asset_master_edit.variable.custom.lastcheck_value_defaultValue = manage_asset_master_edit.variable.custom.datasource_1_record.lastcheck_value + " " + manage_asset_master_edit.variable.custom.datasource_1_record.lastcheck_value_uom;
		}
	},
	postConstruct : function () {
		$("#manage_asset_master_edit_lastcheck_call_or_job_ref_no").attr("data-widget-type", "w_link");
		$("#manage_asset_master_edit_lastcheck_call_or_job_ref_no").attr("data-link-type", "call_job_reference");
		$("#manage_asset_master_edit_lastcheck_call_or_job_ref_no").attr("style", "text-decoration: underline; color: blue; cursor: pointer");
		if ((login_profile.client_id == "schwing" || login_profile.client_id == "dschwing" || login_profile.client_id == "ischwing" || login_profile.client_id == "uschwing") && (manage_asset_master.variable.custom.crudIndicator != "A")){
			$("#manage_asset_master_edit_cmr_group").after("<hr></br></br>");
			$("#manage_asset_master_edit_udf_date_3_group").after("<hr></br></br>");
			$("#manage_asset_master_edit_type_of_application_group").after("<hr></br></br>");
			$("#manage_asset_master_edit_bill_to_email_id_group").after("<hr></br></br>");
			$("#manage_asset_master_edit_site_to_email_id_group").after("<hr></br></br>");
			$("#manage_asset_master_edit_contract_visit_frequency_group").after("<hr></br></br>");
			
		}
		
	},
	initializeWidgets : function () {
		manage_asset_master_edit.variable.custom.customer_id = $("#manage_asset_master_edit_customer_id").initializeWCombobox({
				screenID : "manage_asset_master_edit",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>'CUSTOMER_LIST_SEARCH_WO_ZZZ'</lov_code_type><search_field_1>$manage_asset_master_edit.variable.custom.customer_id_serverFilterValue</search_field_1></inputparam>"
					},
				},
				dataTextField : "name",
				dataValueField : "id",
				serverFiltering: true,
				defaultValue : "$manage_asset_master_edit.variable.custom.customer_id_defaultValue",
				defaultValueDescription : "$manage_asset_master_edit.variable.custom.customer_id_defaultValueDescription"
			});
		manage_asset_master_edit.variable.custom.equipment_id = $("#manage_asset_master_edit_equipment_id").initializeWCombobox({
				screenID : "manage_asset_master_edit",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values_for_searchcondition",
					inputParameter : {
						p_inputparam_xml : "<inputparam><lov_code_type>'EQUIPMENT_LIST_SEARCH_WO_ZZZ'</lov_code_type><search_field_1>$manage_asset_master_edit.variable.custom.equipment_id_serverFilterValue</search_field_1></inputparam>"
					},
				},
				dataTextField : "desc",
				dataValueField : "id",
				serverFiltering: true,
				defaultValue : "$manage_asset_master_edit.variable.custom.equipment_id_defaultValue",
				defaultValueDescription : "$manage_asset_master_edit.variable.custom.equipment_id_defaultValueDescription"
			});
		manage_asset_master_edit.variable.custom.servicing_org_level_number = $("#manage_asset_master_edit_servicing_org_level_number").initializeWDropdownlist({
				screenID : "manage_asset_master_edit",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values",
					inputParameter : {
						p_lov_code : "'ORGLEVELNO_LIST'",
						p_search_field_1 : "",
						p_search_field_2 : "",
						p_search_field_3 : "",
						p_search_field_4 : "",
						p_search_field_5 : ""
					},
				},
				dataTextField : "p_description_field_1",
				dataValueField : "p_value_field_1",
				defaultValue : "$manage_asset_master_edit.variable.custom.servicing_org_level_number_defaultValue",
				childFieldID : "manage_asset_master_edit_servicing_org_level_code"
			});
		manage_asset_master_edit.variable.custom.servicing_org_level_code = $("#manage_asset_master_edit_servicing_org_level_code").initializeWDropdownlist({
				screenID : "manage_asset_master_edit",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values",
					inputParameter : {
						p_lov_code : "'ORGLEVELCODE_LIST'",
						p_search_field_1 : "#manage_asset_master_edit_servicing_org_level_number",
						p_search_field_2 : "",
						p_search_field_3 : "",
						p_search_field_4 : "",
						p_search_field_5 : ""
					},
				},
				dataTextField : "p_description_field_1",
				dataValueField : "p_value_field_1",
				defaultValue : "$manage_asset_master_edit.variable.custom.servicing_org_level_code_defaultValue"
			});
		$("#manage_asset_master_edit_asset_id").initializeWTextbox({
			screenID : "manage_asset_master_edit",
			maxlength : "30",
			defaultValue : "$manage_asset_master_edit.variable.custom.asset_id_defaultValue",
			keyField : {
				p_screen_name : "'ASSETID'",
				p_validation_field_1 : "#manage_asset_master_edit_asset_id",
				p_validation_field_2 : "",
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
		$("#manage_asset_master_edit_asset_location_code").initializeWTextbox({
			screenID : "manage_asset_master_edit",
			maxlength : "50",
			defaultValue : "$manage_asset_master_edit.variable.custom.asset_location_code_defaultValue"
		});
		$("#manage_asset_master_edit_locator_layout").initializeWTextbox({
			screenID : "manage_asset_master_edit",
			maxlength : "30",
			defaultValue : "$manage_asset_master_edit.variable.custom.locator_layout_defaultValue"
		});
		manage_asset_master_edit.variable.custom.installation_date = $("#manage_asset_master_edit_installation_date").initializeWDatepicker({
				screenID : "manage_asset_master_edit",
				maximum : "NEWDATE",
				defaultValue : "$manage_asset_master_edit.variable.custom.installation_date_defaultValue"
			});
		$("#manage_asset_master_edit_asset_status").initializeWCheckbox({
			screenID : "manage_asset_master_edit",
			defaultValue : "$manage_asset_master_edit.variable.custom.asset_status_defaultValue"
		});
		$("#manage_asset_master_edit_lastcheck_call_or_job_ref_no").initializeWDisplayarea({
			screenID : "manage_asset_master_edit",
			defaultValue : "$manage_asset_master_edit.variable.custom.lastcheck_call_or_job_ref_no_defaultValue"
		});
		$("#manage_asset_master_edit_lastcheck_date").initializeWDisplayarea({
			screenID : "manage_asset_master_edit",
			defaultValue : "$manage_asset_master_edit.variable.custom.lastcheck_date_defaultValue"
		});
		$("#manage_asset_master_edit_lastcheck_value").initializeWDisplayarea({
			screenID : "manage_asset_master_edit",
			defaultValue : "$manage_asset_master_edit.variable.custom.lastcheck_value_defaultValue"
		});
	},
	widgetEventHandler : {
		/*equipment_id_change : function (element, event) {
			if (manage_asset_master_edit.variable.custom.equipment_id.dataItem() != undefined) {
				$("#manage_asset_master_edit_servicing_org_level_number").setVal(manage_asset_master_edit.variable.custom.equipment_id.dataItem().org_no);
				$("#manage_asset_master_edit_servicing_org_level_code").setVal(manage_asset_master_edit.variable.custom.equipment_id.dataItem().org_code);
			} else {
				$("#manage_asset_master_edit_servicing_org_level_number").setVal("");
				$("#manage_asset_master_edit_servicing_org_level_code").setVal("");
			}
		}*/
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var recordTimeStamp,
			assetStatusValue,
			returnValue;
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			assetStatusValue = "A";
			if ($("#manage_asset_master_edit_asset_status").getVal() == "1") {
				assetStatusValue = "IA";
			};
			if (manage_asset_master.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_asset_master_edit.variable.custom.datasource_1_record.rec_tstamp;
			};
			returnValue = executeService_save_manage_asset_master({
					p_asset_id : $("#manage_asset_master_edit_asset_id").getVal(),
					p_equipment_id : $("#manage_asset_master_edit_equipment_id").getVal(),
					p_customer_id : $("#manage_asset_master_edit_customer_id").getVal(),
					p_asset_location_code : $("#manage_asset_master_edit_asset_location_code").val(),
					p_locator_layout : $("#manage_asset_master_edit_locator_layout").val(),
					p_installation_date : mserviceUtilities.getDateString($("#manage_asset_master_edit_installation_date").getVal(), "yyyy-MM-dd"),
					p_org_level_no : $("#manage_asset_master_edit_servicing_org_level_number").getVal() == "" ? "0" : $("#manage_asset_master_edit_servicing_org_level_number").getVal(),
					p_org_level_code : $("#manage_asset_master_edit_servicing_org_level_code").getVal(),
					p_asset_status : assetStatusValue,
					p_inputparam_udf_xml : $("#manage_asset_master_edit_content_1").getInputparamXML({
						screenID : "manage_asset_master_edit",
						matchCondition : ["manage_asset_master_edit_udf","manage_asset_master_edit_product_udf","manage_asset_master_edit_asset_master"]
					}),
					p_rec_tstamp : recordTimeStamp,
					p_save_mode : manage_asset_master.variable.custom.crudIndicator,
				});
				console.log(returnValue);
			if (returnValue == "SP001") {
				alert("Asset Details saved successfully.");
				return true;
			} else {
				alert("Saving of Asset Details failed");
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
								call_no : manage_asset_master.variable.custom.selectedRecord.lastcheck_call_jo_id
							}
						}
					}
				};
				webNavigationController.gotoNextScreen({
					screenID : "manage_asset_master_edit",
					nextScreenID : "manage_call_register_edit",
					nextScreenName : manage_asset_master.variable.custom.selectedRecord.lastcheck_call_jo_id
				});
				$("#manage_call_register_edit_submit_btn").hide();
				$("#manage_call_register_edit").enableViewMode();
			} else {
				alert("Sorry. This feature is unavailable. Please contact your support desk.");
				return false;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 3
				}
			],
			valueChangeIndicator : false,
		},
		custom : {},
	}
};

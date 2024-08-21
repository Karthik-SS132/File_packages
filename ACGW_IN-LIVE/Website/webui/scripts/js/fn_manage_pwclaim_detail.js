var manage_pwclaim_detail = {
	constructScreen : function () {
		manage_pwclaim_detail.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName : "mservice",
			serviceName : "retrieve_manage_pwclaim_details",
			outputPath : false,
			pageSize : 10,
			inputParameter : {
				p_pwclaim_ref_no : "$manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no"
			},
			schemaModel : true,
			screenID : "manage_pwclaim_detail",
			dataSourceName : "datasource_1",
			pPWCLAIMessResponse : true,
			parse : manage_pwclaim_detail.customRequirementHandler.dataSourceParse
		});
		manage_pwclaim_detail.variable.custom.datasource_1.read();
		manage_pwclaim_detail.variable.custom.pwclaim_category_defaultValueDescription = mserviceUtilities.getDescriptionForCode("PWCLAIMCATEGORY_LIST", manage_pwclaim_detail.variable.custom.header_1_record.pwclaim_category, "");
		manage_pwclaim_detail.variable.custom.pwclaim_type_defaultValueDescription = mserviceUtilities.getDescriptionForCode("PWCLAIMTYPE_LIST", manage_pwclaim_detail.variable.custom.header_1_record.pwclaim_type, "");
		manage_pwclaim_detail.variable.custom.pwclaim_status_defaultValue = mserviceUtilities.getDescriptionForCode("PWCLAIMSTATUS_LIST", manage_pwclaim_detail.variable.custom.header_1_record.pwclaim_status, "");
		manage_pwclaim_detail.variable.custom.org_level_no_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELNO_LIST", manage_pwclaim_detail.variable.custom.header_1_record.org_level_no, "");
		manage_pwclaim_detail.variable.custom.org_level_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("ORGLEVELCODE_LIST", manage_pwclaim_detail.variable.custom.header_1_record.org_level_code, "");
		manage_pwclaim_detail.variable.custom.company_location_code_defaultValueDescription = mserviceUtilities.getDescriptionForCode("COMPANYLOCATION_LIST", manage_pwclaim_detail.variable.custom.header_1_record.company_location_code, "");
		manage_pwclaim_detail.variable.custom.transaction_ref_number_defaultValue = manage_pwclaim_detail.variable.custom.header_1_record.call_jo_proj_ind_desc + "# " + manage_pwclaim_detail.variable.custom.header_1_record.call_jo_proj_id;
	},
	postConstruct : function () {
		$("#manage_pwclaim_detail_content_1").css("width","100%");
		$("#manage_pwclaim_detail_content_1").find('dd.value').css("width","15%");
		$("#manage_pwclaim_detail_content_1").find('dt').css("width","15%");
		$("#manage_pwclaim_detail_content_2").find("hr").remove();
		$("#manage_pwclaim_detail_content_2").find('dt').css("width","50%");
		if (manage_pwclaim_header.variable.custom.crudIndicator == "V") {
			$("#manage_pwclaim_detail_parts_add_btn").hide();
			$("#manage_pwclaim_detail_parts_edit_btn").hide();
			$("#manage_pwclaim_detail_parts_delete_btn").hide();
		}
		$("#manage_pwclaim_detail_submit_btn").click(function(){
			if(!manage_pwclaim_detail.variable.custom.validator.validate()){
				alert("Please fill all the mandatory fields.");
				return false;
			}
		});
	},
	initializeWidgets : function () {
		manage_pwclaim_detail.variable.custom.tabstrip = $("#manage_pwclaim_detail_tabstrip").kendoTabStrip({
				animation : {
					open : {
						effects : "fadeIn"
					},
				},
			}).data("kendoTabStrip");
		$("#manage_pwclaim_detail_pwclaim_no").initializeWDisplayarea({
			screenID : "manage_pwclaim_detail",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.pwclaim_ref_no",
		});
		$("#manage_pwclaim_detail_pwclaim_status").initializeWDisplayarea({
			screenID : "manage_pwclaim_detail",
			defaultValue : "$manage_pwclaim_detail.variable.custom.pwclaim_status_defaultValue"
		});
		$("#manage_pwclaim_detail_pwclaim_date").initializeWDatepicker({
			screenID : "manage_pwclaim_detail",
			minimum : "$manage_pwclaim_detail.variable.custom.header_1_record.created_on_date",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.created_on_date",
		});
		$("#manage_pwclaim_detail_pwclaim_category").initializeWDropdownlist({
			screenID : "manage_pwclaim_detail",
			dataSource : {
				informationType : "'PWCLAIMCATEGORY_LIST'",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_pwclaim_detail_pwclaim_type",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.pwclaim_category",
			defaultValueDescription : "$manage_pwclaim_detail.variable.custom.pwclaim_category_defaultValueDescription"
		});
		$("#manage_pwclaim_detail_pwclaim_type").initializeWDropdownlist({
			screenID : "manage_pwclaim_detail",
			dataSource : {
				informationType : "'PWCLAIMTYPE_LIST_LINKED'",
				searchField1 : "#manage_pwclaim_detail_pwclaim_category",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.pwclaim_type",
			defaultValueDescription : "$manage_pwclaim_detail.variable.custom.pwclaim_type_defaultValueDescription"
		});
		$("#manage_pwclaim_detail_company_location").initializeWDropdownlist({
			screenID : "manage_pwclaim_detail",
			dataSource : {
				informationType : "'COMPANYLOCATION_LIST'",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.company_location_code",
			defaultValueDescription : "$manage_pwclaim_detail.variable.custom.company_location_code_defaultValueDescription"
		});
		$("#manage_pwclaim_detail_org_level_no").initializeWDropdownlist({
			screenID : "manage_pwclaim_detail",
			dataSource : {
				informationType : "'ORGLEVELNO_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_pwclaim_detail_org_level_code",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.org_level_no",
			defaultValueDescription : "$manage_pwclaim_detail.variable.custom.org_level_no_defaultValueDescription"
		});
		$("#manage_pwclaim_detail_org_level_code").initializeWDropdownlist({
			screenID : "manage_pwclaim_detail",
			dataSource : {
				informationType : "'ORGLEVELCODE_LIST'",
				searchField1 : "#manage_pwclaim_detail_org_level_no",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.org_level_code",
			defaultValueDescription : "$manage_pwclaim_detail.variable.custom.org_level_code_defaultValueDescription"
		});	
		$("#manage_pwclaim_detail_customer_id").initializeWCombobox({
			screenID : "manage_pwclaim_detail",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'CUSTOMER_LIST_SEARCH_WO_ZZZ'</lov_code_type><search_field_1>$manage_pwclaim_detail.variable.custom.customer_id_serverFilterValue</search_field_1></inputparam>"
				},
			},
			dataTextField : "name",
			dataValueField : "id",
			childFieldID : "manage_pwclaim_detail_customer_location",
			serverFiltering : true,
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.customer_id",
			defaultValueDescription : "$manage_pwclaim_detail.variable.custom.header_1_record.customer_id_desc",
		});
		$("#manage_pwclaim_detail_customer_location").initializeWCombobox({
				screenID : "manage_pwclaim_detail",
				dataSource : {
					informationType : "'CUSTOMERLOCATION_LIST_LINKED'",
					searchField1 : "#manage_pwclaim_detail_customer_id",
				},
				dataTextField : "description",
				dataValueField : "code",
				serverFiltering : true,
				defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.customer_location_code",
				defaultValueDescription : "$manage_pwclaim_detail.variable.custom.header_1_record.customer_location_desc"
			});
		$("#manage_pwclaim_detail_asset_id").initializeWCombobox({
			screenID : "manage_pwclaim_detail",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'ASSET_LIST_WO_ZZZ'</lov_code_type><search_field_1>$manage_pwclaim_detail.variable.custom.asset_id_serverFilterValue</search_field_1></inputparam>"
				},
			},
			dataTextField : "desc",
			dataValueField : "id",
			serverFiltering : true,
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.asset_id",
			defaultValueDescription : "$manage_pwclaim_detail.variable.custom.header_1_record.asset_id",
		});
		$("#manage_pwclaim_detail_equipment_id").initializeWCombobox({
			screenID : "manage_pwclaim_detail",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'EQUIPMENT_LIST_SEARCH_WO_ZZZ'</lov_code_type><search_field_1>$manage_pwclaim_detail.variable.custom.equipment_id_serverFilterValue</search_field_1></inputparam>"
				},
			},
			dataTextField : "desc",
			dataValueField : "id",
			serverFiltering : true,
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.equipment_id",
			defaultValueDescription : "$manage_pwclaim_detail.variable.custom.header_1_record.equipment_id",
		});
		$("#manage_pwclaim_detail_date_of_failure").initializeWDatepicker({
			screenID : "manage_pwclaim_detail",
			minimum : "$manage_pwclaim_detail.variable.custom.header_1_record.failure_date",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.failure_date",
		});
		$("#manage_pwclaim_detail_running_hours").initializeWNumerictextbox({
			screenID : "manage_pwclaim_detail",
			minimum : "'0'",
			maximum : "'9999999999'",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.running_hours",
		});
		$("#manage_pwclaim_detail_primary_failed_part").initializeWCombobox({
			screenID : "manage_pwclaim_detail",
			dataSource : {
				informationType : "'ITEMCODE_LIST'",
				searchField1 : "$manage_pwclaim_detail.variable.custom.primary_failed_part_serverFilterValue",
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			childFieldID : "manage_pwclaim_detail_primary_failed_part_variant",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.primary_failed_part",
			defaultValueDescription : "$manage_pwclaim_detail.variable.custom.header_1_record.primary_failed_part_desc",
		});
		$("#manage_pwclaim_detail_primary_failed_part_variant").initializeWDropdownlist({
			screenID : "manage_pwclaim_detail",
			dataSource : {
				informationType : "'ITEMVARIANTCODE_LIST_LINKED'",
				searchField1 : "#manage_pwclaim_detail_primary_failed_part",
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.primary_failed_part_variant",
			defaultValueDescription : "$manage_pwclaim_detail.variable.custom.header_1_record.primary_failed_part_variant_desc",
		});
		$("#manage_pwclaim_detail_failure_description").initializeWTextarea({
			screenID : "manage_pwclaim_detail",
			maxlength : "600",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.failure_description",
		});
		$("#manage_pwclaim_detail_failure_reason").initializeWTextarea({
			screenID : "manage_pwclaim_detail",
			maxlength : "600",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.failure_reason",
		});
		$("#manage_pwclaim_detail_action_tobe_taken").initializeWTextarea({
			screenID : "manage_pwclaim_detail",
			maxlength : "600",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.action_tobe_taken",
		});
		$("#manage_pwclaim_detail_failure_category").initializeWCombobox({
			screenID : "manage_pwclaim_detail",
			dataSource : {
				informationType : "'PWCLAIMFAILURECATG_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_pwclaim_detail.variable.custom.header_1_record.failure_category",
			defaultValueDescription : "$manage_pwclaim_detail.variable.custom.header_1_record.failure_category_desc"
		});
		manage_pwclaim_detail.variable.custom.grid_1 = $("#manage_pwclaim_detail_grid_1").initializeWGrid({
				screenID : "manage_pwclaim_detail",
				toolbar : "#manage_pwclaim_detail_grid_1_toolbar_template",
				dataSource : manage_pwclaim_detail.variable.custom.datasource_1,
				height : 480,
				pageSize : 10,
				filterable : false,
			});
		manage_pwclaim_detail.variable.custom.grid_1.refresh();
	},
	buttonEventHandler : {
		crud_btn_click : function (element, event) {
			if(manage_pwclaim_detail.variable.custom.crudIndicator == "D"){
				if (manage_pwclaim_detail.variable.custom.selectedRecord != undefined) {
					manage_pwclaim_detail.variable.custom.grid_1.dataSource.remove(manage_pwclaim_detail.variable.custom.selectedRecord);
					alert("Data deleted successfully.");
				}
			} else {
				if (mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_pwclaim_detail_edit.js"])) {
					webNavigationController.gotoNextScreen({
						screenID : "manage_pwclaim_detail_edit",
						fieldID : "manage_pwclaim_detail_edit_window",
						nextScreenID : "manage_pwclaim_detail_edit",
						nextScreenName : manage_pwclaim_detail.variable.custom.nextScreenName,
						execute : manage_pwclaim_detail_edit.constructScreen
					});
				} else {
					alert("Sorry. This feature is unavailable. Please contact your support desk.");
					return false;
				}
			}
		},
		submit_btn_click : function (element, event) {
			var returnValue,
			recordTimeStamp,
			inputparamDetail1,
			inputparamDetail2,
			detailRecordCounter,
			questionCodeString,
			questionCodeObject,
			questionCodeArray;
			inputparamDetail1 = [];
			inputparamDetail2 = [];
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_pwclaim_header.variable.custom.crudIndicator == "U") {
				recordTimeStamp = manage_pwclaim_header.variable.custom.selectedRecord.rec_tstamp;
			};
			for (detailRecordCounter = 0; detailRecordCounter < manage_pwclaim_detail.variable.custom.grid_1.dataSource.data().length; detailRecordCounter++) {
				var inputparamDetailUDF = "<inputparam>";
				for(key in manage_pwclaim_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter]) {
					if(key.includes("udf")) {
						inputparamDetailUDF += "<" + key + ">" + manage_pwclaim_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter][key] + "</" + key + ">";
					}
				}
				inputparamDetailUDF += "</inputparam>";
				inputparamDetail1.push({
					p_pwclaim_detail1_sl_no : (detailRecordCounter + 1).toString(),
					p_pwclaim_detail1_coref_xml : "<item_code>" + manage_pwclaim_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_code + "</item_code><item_variant_code>" + manage_pwclaim_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].item_variant_code + "</item_variant_code><quantity>" + parseFloat(manage_pwclaim_detail.variable.custom.grid_1.dataSource.data()[detailRecordCounter].quantity).toFixed(2) + "</quantity>",
					p_pwclaim_detail1_udf_xml : inputparamDetailUDF,
					p_pwclaim_detail1_crud_ind : manage_pwclaim_header.variable.custom.crudIndicator
				});
			};
			questionCodeString = $("#manage_pwclaim_detail_content_2").getInputparamJSON({
				screenID : "manage_pwclaim_header",
				matchCondition : ["manage_pwclaim_detail_question"]
			});
			questionCodeObject = JSON.parse(questionCodeString);
			questionCodeArray = $("#manage_pwclaim_detail_content_2").find("label");
			for (var questionCodeCounter = 0; questionCodeCounter < questionCodeArray.length; questionCodeCounter++){
				inputparamDetail2.push({
					p_pwclaim_detail2_sl_no : (questionCodeCounter + 1 ).toString(),
					p_pwclaim_detail2_coref_xml : "<code>question_" + (questionCodeCounter + 1 ) +"</code><value>" + questionCodeObject["question_" + (questionCodeCounter + 1 ) +"_value"] + "</value>" + ((questionCodeObject["question_" + (questionCodeCounter + 1 ) +"_value_hour"] !== undefined ) ? ("<value_hour>" + questionCodeObject["question_" + (questionCodeCounter + 1 ) +"_value_hour"] + "</value_hour>") : ("")) +  ((questionCodeObject["question_" + (questionCodeCounter + 1 ) +"_value_minute"] !== undefined ) ? ("<value_minute>" + questionCodeObject["question_" + (questionCodeCounter + 1 ) +"_value_minute"] + "</value_minute>") : ("")),
					p_pwclaim_detail2_udf_xml : "<inputparam></inputparam>",
					p_pwclaim_detail2_crud_ind : manage_pwclaim_header.variable.custom.crudIndicator
				});
			};
			returnValue = executeService_save_manage_pwclaim({
					p_pwclaim_ref_no : $("#manage_pwclaim_detail_pwclaim_no").getVal(),
					p_pwclaim_header_coref_xml : "<call_jo_proj_id>" + manage_pwclaim_detail.variable.custom.header_1_record.call_jo_proj_id + "</call_jo_proj_id><call_jo_proj_ind>" + manage_pwclaim_detail.variable.custom.header_1_record.call_jo_proj_ind + "</call_jo_proj_ind><pwclaim_date>" + mserviceUtilities.getDateString($("#manage_pwclaim_detail_pwclaim_date").getVal(), "yyyy-MM-dd") + "</pwclaim_date><pwclaim_category>" + $("#manage_pwclaim_detail_pwclaim_category").getVal() + "</pwclaim_category><pwclaim_type>" + $("#manage_pwclaim_detail_pwclaim_type").getVal() + "</pwclaim_type><company_location>" + $("#manage_pwclaim_detail_company_location").getVal() + "</company_location><org_level_no>" + $("#manage_pwclaim_detail_org_level_no").getVal() + "</org_level_no><org_level_code>" + $("#manage_pwclaim_detail_org_level_code").getVal() + "</org_level_code><customer_id>" + $("#manage_pwclaim_detail_customer_id").getVal() + "</customer_id><customer_location>" + $("#manage_pwclaim_detail_customer_location").getVal() + "</customer_location><asset_id>" + $("#manage_pwclaim_detail_asset_id").getVal() + "</asset_id><equipment_id>" + $("#manage_pwclaim_detail_equipment_id").getVal() + "</equipment_id><date_of_failure>" + mserviceUtilities.getDateString($("#manage_pwclaim_detail_date_of_failure").getVal(), "yyyy-MM-dd") + "</date_of_failure><running_hours>" + $("#manage_pwclaim_detail_running_hours").getVal() + "</running_hours><primary_failed_part>" + $("#manage_pwclaim_detail_primary_failed_part").getVal() + "</primary_failed_part><primary_failed_part_variant>" + $("#manage_pwclaim_detail_primary_failed_part_variant").getVal() + "</primary_failed_part_variant><failure_description>" + $("#manage_pwclaim_detail_failure_description").getVal() + "</failure_description><failure_reason>" + $("#manage_pwclaim_detail_failure_reason").getVal() + "</failure_reason><action_tobe_taken>" + $("#manage_pwclaim_detail_action_tobe_taken").getVal() + "</action_tobe_taken><failure_category>" + $("#manage_pwclaim_detail_failure_category").getVal() + "</failure_category>",
					p_pwclaim_header_udf_xml : $("#manage_pwclaim_detail_content_1").getInputparamXML({
						screenID : "manage_pwclaim_detail",
						matchCondition : ["manage_pwclaim_detail_udf"]
					}),
					p_rec_timestamp : recordTimeStamp,
					p_save_mode : manage_pwclaim_header.variable.custom.crudIndicator,
					inputparam_detail1 : inputparamDetail1,
					inputparam_detail2 : inputparamDetail2
				});
			if (returnValue.update_status == "SP001") {
				alert("FOC Details is saved successfully");
				return true;
			} else {
				alert("Saving of FOC Details Failed");
				return false;
			}
		}
	},
	customRequirementHandler : {
		setSelectedRecord : function () {
			manage_pwclaim_detail.variable.custom.selectedRecord = manage_pwclaim_detail.variable.custom.grid_1.dataSource.getByUid(manage_pwclaim_detail.variable.custom.grid_1.select().data("uid"));
		},
		dataSourceParse : function (response) {
			var parseResponse;
			if (response.document != undefined) {
				if (response.document.ApplicationException == undefined) {
					manage_pwclaim_detail.variable.custom.header_1_record = response.document.context.outputparam_header;
					if (response.document.context.outputparam_detail2 != undefined) {
						if (response.document.context.outputparam_detail2.length != undefined) {
							manage_pwclaim_detail.variable.custom.header_2_record = response.document.context.outputparam_detail2;
						} else {
							manage_pwclaim_detail.variable.custom.header_2_record = [response.document.context.outputparam_detail2];
						}
					};
					if (response.document.context.outputparam_detail1 != undefined) {
						if (response.document.context.outputparam_detail1.length != undefined) {
							parseResponse = response.document.context.outputparam_detail1;
						} else {
							parseResponse = [response.document.context.outputparam_detail1];
						}
					} else {
						parseResponse = [];
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
				},{
					contentID : "content_2",
					columnLength : 2
				}
			],
			exportConfiguration : {
				mode : "single",
				content : [{
						exportType : "grid",
						fieldId : "manage_pwclaim_detail_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			},
			printConfiguration : {
				mode : "single",
				content : [{
						type : "grid",
						fieldId : "manage_pwclaim_detail_grid_1",
						dispalyLabel : "Data Export"
					}
				]
			}
		},
		custom : {
			customDelete : true
		}
	}
};
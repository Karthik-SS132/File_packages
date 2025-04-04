var manage_call_requirement_entry_sa = {
	constructScreen : function () {
		manage_call_requirement_entry_sa.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				outputPath : "context/outputparam",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'GET_PRODUCT_RATE_ACTION'</lov_code_type><search_field_1>#manage_call_requirement_entry_sa_item_code</search_field_1><search_field_2>#manage_call_requirement_entry_sa_item_variant_code</search_field_2><search_field_3>#manage_call_requirement_entry_sa_uom</search_field_3><search_field_4>'SA'</search_field_4></inputparam>"
				},
				screenID : "manage_call_requirement_entry_sa",
			});
		if (manage_call_register_sa_edit.variable.custom.crudIndicator == "U" || manage_call_register_sa_edit.variable.custom.crudIndicator == "V") {
			manage_call_requirement_entry_sa.variable.custom.headerRecord = manage_call_register_sa_edit.variable.custom.selectedRecord;
		}
	},
	postConstruct : function () {
		if (manage_call_register_sa_edit.variable.custom.crudIndicator == "A") {
			$("#manage_call_requirement_entry_sa_standard_rate").setVal("0.00");
			$("#manage_call_requirement_entry_sa_amount").setVal("0.00");
		}
	},
	initializeWidgets : function () {
		$("#manage_call_requirement_entry_sa_action_category").initializeWDropdownlist({
			screenID : "manage_call_requirement_entry_sa",
			dataSource : {
				informationType : "'ACTIONCATEGORY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_call_requirement_entry_sa_action_type",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.action_category",
			defaultValueDescription : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.action_category"
		});
		$("#manage_call_requirement_entry_sa_action_type").initializeWDropdownlist({
			screenID : "manage_call_requirement_entry_sa",
			dataSource : {
				informationType : "'ACTIONTYPE_LIST_LINKED'",
				searchField1 : "#manage_call_requirement_entry_sa_action_category",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.action_type",
			defaultValueDescription : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.action_type",
		});
		$("#manage_call_requirement_entry_sa_equipment_category").initializeWDropdownlist({
			screenID : "manage_call_requirement_entry_sa",
			dataSource : {
				informationType : "'EQUIPMENTCATEGORY_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_call_requirement_entry_sa_equipment_type, manage_call_requirement_entry_sa_equipment_id",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.equipment_category",
			defaultValueDescription : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.equipment_category_description",
		});
		$("#manage_call_requirement_entry_sa_equipment_type").initializeWDropdownlist({
			screenID : "manage_call_requirement_entry_sa",
			dataSource : {
				informationType : "'EQUIPMENTTYPE_LIST_LINKED'",
				searchField1 : "#manage_call_requirement_entry_sa_equipment_category",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_call_requirement_entry_sa_equipment_id",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.equipment_type",
			defaultValueDescription : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.equipment_type_description",
		});
		$("#manage_call_requirement_entry_sa_equipment_id").initializeWDropdownlist({
			screenID : "manage_call_requirement_entry_sa",
			dataSource : {
				informationType : "'EQUIPMENT_ITEM_LINK_LIST'",
				searchField1 : "$manage_call_requirement_entry_sa.variable.custom.equipment_id_serverFilterValue",
				searchField2 : "#manage_call_requirement_entry_sa_equipment_category",
				searchField3 : "#manage_call_requirement_entry_sa_equipment_type"
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			minLength : 2,
			template : "description",
			childFieldID : "manage_call_requirement_entry_sa_item_code",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.equipment_id",
			defaultValueDescription : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.equipment_id_description",
		});
		$("#manage_call_requirement_entry_sa_item_code").initializeWDropdownlist({
			screenID : "manage_call_requirement_entry_sa",
			dataSource : {
				informationType : "'ITEMCODE_LIST'",
				searchField1 : "$manage_call_requirement_entry_sa.variable.custom.item_code_serverFilterValue",
				searchField2 : "#manage_call_register_sa_edit_call_category",
				searchField3 : "'EQUIPMENT_ITEM_LINK'",
				searchField4 : "#manage_call_requirement_entry_sa_equipment_id"
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			minLength : 2,
			template : "description",
			childFieldID : "manage_call_requirement_entry_sa_item_variant_code,manage_call_requirement_entry_sa_uom",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.item_code",
			defaultValueDescription : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.item_code_description",
		});
		$("#manage_call_requirement_entry_sa_item_variant_code").initializeWDropdownlist({
			screenID : "manage_call_requirement_entry_sa",
			dataSource : {
				informationType : "'ITEMVARIANTCODE_LIST_LINKED'",
				searchField1 : "#manage_call_requirement_entry_sa_item_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_call_requirement_entry_sa_uom",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.item_variant_code",
			defaultValueDescription : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.item_variant_code_description",
		});
		$("#manage_call_requirement_entry_sa_uom").initializeWDropdownlist({
			screenID : "manage_call_requirement_entry_sa",
			dataSource : {
				informationType : "'GET_ITEM_UOM'",
				searchField1 : "#manage_call_requirement_entry_sa_item_code",
				searchField2 : "#manage_call_requirement_entry_sa_item_variant_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.uom_code",
			defaultValueDescription : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.uom_code_description",
		});
		manage_call_requirement_entry_sa.variable.custom.quantity = $("#manage_call_requirement_entry_sa_quantity").initializeWNumerictextbox({
				screenID : "manage_call_requirement_entry_sa",
				format : "n0",
				minimum : "'1'",
				defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.net_quantity",
			});
		manage_call_requirement_entry_sa.variable.custom.standard_rate = $("#manage_call_requirement_entry_sa_standard_rate").initializeWDisplayarea({
				screenID : "manage_call_requirement_entry_sa",
				defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.std_rate",
			});
		$("#manage_call_requirement_entry_sa_amount").initializeWDisplayarea({
			screenID : "manage_call_requirement_entry_sa",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.gross_amount",
		});
		$("#manage_call_requirement_entry_sa_requirement").initializeWTextarea({
			screenID : "manage_call_requirement_entry_sa",
			maxlength : "500",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.requirement",
		});
		$("#manage_call_requirement_entry_sa_additional_information").initializeWTextarea({
			screenID : "manage_call_requirement_entry_sa",
			maxlength : "500",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.additional_information",
		});
		$("#manage_call_requirement_entry_sa_currency_code").initializeWDropdownlist({
			screenID : "manage_call_requirement_entry_sa",
			dataSource : {
				informationType : "'CURRENCYCODE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.currency_code",
			defaultValueDescription : "$manage_call_requirement_entry_sa.variable.custom.headerRecord.currency_code_description"
		});
	},
	customRequirementHandler : {
		partValidation : function () {
			var keyValidation = manage_call_register_sa_edit.variable.custom.grid_4.dataSource.data();
			for (var i = 0; i < keyValidation.length; i++) {
				if (keyValidation[i].uom_code == $("#manage_call_requirement_entry_sa_uom").getVal() && keyValidation[i].item_code == $("#manage_call_requirement_entry_sa_item_code").getVal()) {
					alert("Part Details already exists.");
					$("#manage_call_requirement_entry_sa_uom").setVal("");
				}
			}
		}
	},
	widgetEventHandler : {
		item_code_change : function (element, event) {
			if ($("#manage_call_requirement_entry_sa_uom").getVal() == "") {
				$("#manage_call_requirement_entry_sa_quantity").setVal("");
				$("#manage_call_requirement_entry_sa_standard_rate").setVal("0.00");
				$("#manage_call_requirement_entry_sa_amount").setVal("0.00");
			}
			manage_call_requirement_entry_sa.customRequirementHandler.partValidation();
		},
		uom_change : function (element, event) {
			manage_call_requirement_entry_sa.customRequirementHandler.partValidation();
			if ($("#manage_call_requirement_entry_sa_item_code").getVal() != "" && $("#manage_call_requirement_entry_sa_uom").getVal() != "") {
				manage_call_requirement_entry_sa.variable.custom.datasource_1.read();
				if (manage_call_requirement_entry_sa.variable.custom.datasource_1.data().length == 0) {
					$("#manage_call_requirement_entry_sa_standard_rate").setVal("0.00");
				} else {
					manage_call_requirement_entry_sa.variable.custom.standardRate = manage_call_requirement_entry_sa.variable.custom.datasource_1.data();
					$("#manage_call_requirement_entry_sa_standard_rate").setVal(parseFloat(manage_call_requirement_entry_sa.variable.custom.standardRate[0].std_rate).toFixed(2));
					var amount = ((parseFloat(manage_call_requirement_entry_sa.variable.custom.standardRate[0].std_rate).toFixed(2)) * $("#manage_call_requirement_entry_sa_quantity").getVal());
					$("#manage_call_requirement_entry_sa_amount").setVal(parseFloat(amount).toFixed(2));
				}
			} else {
				$("#manage_call_requirement_entry_sa_quantity").setVal("");
				$("#manage_call_requirement_entry_sa_standard_rate").setVal("0.00");
				$("#manage_call_requirement_entry_sa_amount").setVal("0.00");
			}
		},
		quantity_change : function (element, event) {
			if ($("#manage_call_requirement_entry_sa_item_code").getVal() != "" && $("#manage_call_requirement_entry_sa_uom").getVal() != "") {
				manage_call_requirement_entry_sa.variable.custom.datasource_1.read();
				manage_call_requirement_entry_sa.variable.custom.standardRate = manage_call_requirement_entry_sa.variable.custom.datasource_1.data();
				var amount = ((parseFloat(manage_call_requirement_entry_sa.variable.custom.standardRate[0].std_rate).toFixed(2)) * $("#manage_call_requirement_entry_sa_quantity").getVal());
				$("#manage_call_requirement_entry_sa_amount").setVal(parseFloat(amount).toFixed(2));
			} else {
				$("#manage_call_requirement_entry_sa_amount").setVal("0.00");
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			if (($("#manage_call_requirement_entry_sa_amount").getVal() != "0.00") && ($("#manage_call_requirement_entry_sa_amount").getVal() > "0")) {
				if (manage_call_register_sa_edit.variable.custom.crudIndicator == "A") {
					var keyValidation = manage_call_register_sa_edit.variable.custom.grid_4.dataSource.data();
					for (var i = 0; i < keyValidation.length; i++) {
						if (keyValidation[i].item_code == $("#manage_call_requirement_entry_sa_item_code").getVal()) {
							alert("Part already exists.");
							$("#manage_call_requirement_entry_sa_item_code").setVal("");
							$("#manage_call_requirement_entry_sa_uom").setVal("");
							return false;
						}
					}
					var inputObject = JSON.parse($("#manage_call_requirement_entry_sa_content_1").getInputparamJSON({
						screenID : "manage_call_requirement_entry_sa",
						matchCondition : ["manage_call_requirement_entry_sa_udf","manage_call_requirement_entry_sa_product_udf","manage_call_requirement_entry_sa_requirement_entry"]
					}));
					inputObject.equipment_category = $("#manage_call_requirement_entry_sa_equipment_category").getVal();
					inputObject.equipment_type = $("#manage_call_requirement_entry_sa_equipment_type").getVal();
					inputObject.equipment_id = $("#manage_call_requirement_entry_sa_equipment_id").getVal();
					inputObject.item_code = $("#manage_call_requirement_entry_sa_item_code").getVal();
					inputObject.item_variant_code = $("#manage_call_requirement_entry_sa_item_variant_code").getVal();
					inputObject.net_quantity = $("#manage_call_requirement_entry_sa_quantity").getVal().toString();
					inputObject.uom_code = $("#manage_call_requirement_entry_sa_uom").getVal();
					inputObject.std_rate = ($("#manage_call_requirement_entry_sa_standard_rate").getVal()).toString();
					inputObject.gross_amount = $("#manage_call_requirement_entry_sa_amount").getVal();
					inputObject.currency_code = $("#manage_call_requirement_entry_sa_currency_code").getVal();
					inputObject.requirement = $("#manage_call_requirement_entry_sa_requirement").getVal();
					inputObject.additional_information = $("#manage_call_requirement_entry_sa_additional_information").getVal();					
					inputObject.equipment_category_description = mserviceUtilities.getDescriptionForCode("EQUIPMENTCATEGORY_LIST", $("#manage_call_requirement_entry_sa_equipment_category").getVal(), "");
					inputObject.equipment_type_description = mserviceUtilities.getDescriptionForCode("EQUIPMENTTYPE_LIST", $("#manage_call_requirement_entry_sa_equipment_type").getVal(), "");
					inputObject.equipment_id_description = mserviceUtilities.getDescriptionForCode("EQUIPMENT_ITEM_LINK_LIST", $("#manage_call_requirement_entry_sa_equipment_id").getVal(), "");
					inputObject.item_code_description = mserviceUtilities.getDescriptionForCode("PRODUCTCODE_LIST", $("#manage_call_requirement_entry_sa_item_code").getVal(), "");
					inputObject.item_variant_code_description = mserviceUtilities.getDescriptionForCode("PRODUCTVARIANTCODE_LIST", $("#manage_call_requirement_entry_sa_item_variant_code").getVal(), "");
					inputObject.last_update_timestamp = "00000000-0000-0000-0000-000000000000";
					inputObject.uom_code_description = mserviceUtilities.getDescriptionForCode("PRODUCTUOM_LIST", $("#manage_call_requirement_entry_sa_uom").getVal(), "");
					inputObject.currency_code_description = mserviceUtilities.getDescriptionForCode("CURRENCYCODE_LIST", $("#manage_call_requirement_entry_sa_currency_code").getVal(), "");
					inputObject.action_category = $("#manage_call_requirement_entry_sa_action_category").getVal();
					inputObject.action_type = $("#manage_call_requirement_entry_sa_action_type").getVal();
					manage_call_register_sa_edit.variable.custom.grid_4.dataSource.add(inputObject);
					if (login_profile.client_id == "xcmg"){
						manage_call_requirement_entry_sa.variable.standard.problem_desc = mserviceUtilities.getDescriptionForCode("EQUIPMENTTYPE_LIST", $('#manage_call_requirement_entry_sa_equipment_type').getVal(), "")+"-"+$('#manage_call_requirement_entry_sa_equipment_id').getVal()+"["+$('#manage_call_requirement_entry_sa_item_code').getVal()+"-"+ $('#manage_call_requirement_entry_sa_quantity').getVal()+"Nos]";
						$('#manage_call_register_sa_edit_problem_description').setVal(manage_call_requirement_entry_sa.variable.standard.problem_desc);
					}
				} else {
					var inputObject = JSON.parse($("#manage_call_requirement_entry_sa_content_1").getInputparamJSON({
						screenID : "manage_call_requirement_entry_sa",
						matchCondition : ["manage_call_requirement_entry_sa_udf","manage_call_requirement_entry_sa_product_udf", "manage_call_requirement_entry_sa_requirement_entry"]
					}));
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("equipment_category", $("#manage_call_requirement_entry_sa_equipment_category").getVal());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("equipment_type", $("#manage_call_requirement_entry_sa_equipment_type").getVal());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("equipment_id", $("#manage_call_requirement_entry_sa_equipment_id").getVal());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("item_code", $("#manage_call_requirement_entry_sa_item_code").getVal());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("item_variant_code", $("#manage_call_requirement_entry_sa_item_variant_code").getVal());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("net_quantity", $("#manage_call_requirement_entry_sa_quantity").getVal().toString());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("uom_code", $("#manage_call_requirement_entry_sa_uom").getVal());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("std_rate", ($("#manage_call_requirement_entry_sa_standard_rate").getVal()).toString());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("gross_amount", $("#manage_call_requirement_entry_sa_amount").getVal());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("currency_code", $("#manage_call_requirement_entry_sa_currency_code").getVal());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("requirement", $("#manage_call_requirement_entry_sa_requirement").getVal());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("additional_information", $("#manage_call_requirement_entry_sa_additional_information").getVal());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("equipment_category_description", mserviceUtilities.getDescriptionForCode("EQUIPMENTCATEGORY_LIST", $("#manage_call_requirement_entry_sa_equipment_category").getVal(), ""));
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("equipment_type_description", mserviceUtilities.getDescriptionForCode("EQUIPMENTTYPE_LIST", $("#manage_call_requirement_entry_sa_equipment_type").getVal(), ""));
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("equipment_id_description", mserviceUtilities.getDescriptionForCode("EQUIPMENT_ITEM_LINK_LIST", $("#manage_call_requirement_entry_sa_equipment_id").getVal(), ""));
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("item_code_description", mserviceUtilities.getDescriptionForCode("PRODUCTCODE_LIST", $("#manage_call_requirement_entry_sa_item_code").getVal(), ""));
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("item_variant_code_description", mserviceUtilities.getDescriptionForCode("PRODUCTVARIANTCODE_LIST", $("#manage_call_requirement_entry_sa_item_variant_code").getVal(), ""));
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("last_update_timestamp", manage_call_requirement_entry_sa.variable.custom.headerRecord.last_update_timestamp);
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("uom_code_description", mserviceUtilities.getDescriptionForCode("PRODUCTUOM_LIST", $("#manage_call_requirement_entry_sa_uom").getVal(), ""));
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("currency_code_description", mserviceUtilities.getDescriptionForCode("CURRENCYCODE_LIST", $("#manage_call_requirement_entry_sa_currency_code").getVal(), ""));
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("action_category", $("#manage_call_requirement_entry_sa_action_category").getVal());
					manage_call_requirement_entry_sa.variable.custom.headerRecord.set("action_type", $("#manage_call_requirement_entry_sa_action_type").getVal());
					for(key in inputObject) { 
						manage_call_requirement_entry_sa.variable.custom.headerRecord.set(key,inputObject[key]);
					}
					if (login_profile.client_id == "xcmg"){
						manage_call_requirement_entry_sa.variable.standard.problem_desc = mserviceUtilities.getDescriptionForCode("EQUIPMENTTYPE_LIST", $('#manage_call_requirement_entry_sa_equipment_type').getVal(), "")+"-"+$('#manage_call_requirement_entry_sa_equipment_id').getVal()+"["+$('#manage_call_requirement_entry_sa_item_code').getVal()+"-"+ $('#manage_call_requirement_entry_sa_quantity').getVal()+"Nos]";
						$('#manage_call_register_sa_edit_problem_description').setVal(manage_call_requirement_entry_sa.variable.standard.problem_desc);
					}
				}
				alert("Requirement Entry is saved successfully.");
				return true;
			} else {
				alert("Invalid Amount.");
				return false;
			}
		},
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			valueChangeIndicator : false,
			popupIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {},
	}
};
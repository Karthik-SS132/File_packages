var manage_call_requirement_entry = {
	constructScreen : function () {
		manage_call_requirement_entry.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				outputPath : "context/outputparam",
				pageSize : 10,
				inputParameter : {
					p_inputparam_xml : "<inputparam><lov_code_type>'GET_PRODUCT_RATE_ACTION'</lov_code_type><search_field_1>#manage_call_requirement_entry_item_code</search_field_1><search_field_2>#manage_call_requirement_entry_item_variant_code</search_field_2><search_field_3>#manage_call_requirement_entry_uom</search_field_3></inputparam>"
				},
				screenID : "manage_call_requirement_entry",
			});
		if (manage_call_register_edit.variable.custom.crudIndicator == "U" || manage_call_register_edit.variable.custom.crudIndicator == "V") {
			manage_call_requirement_entry.variable.custom.headerRecord = manage_call_register_edit.variable.custom.selectedRecord;
		}
	},
	postConstruct : function () {
		if (manage_call_register_edit.variable.custom.crudIndicator == "A") {
			$("#manage_call_requirement_entry_standard_rate").setVal("0.00");
			$("#manage_call_requirement_entry_amount").setVal("0.00");
		}
	},
	initializeWidgets : function () {
		$("#manage_call_requirement_entry_item_code").initializeWCombobox({
			screenID : "manage_call_requirement_entry",
			dataSource : {
				informationType : "'PRODUCTCODE_LIST'",
				searchField1 : "$manage_call_requirement_entry.variable.custom.item_code_serverFilterValue",
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			childFieldID : "manage_call_requirement_entry_item_variant_code,manage_call_requirement_entry_uom",
			defaultValue : "$manage_call_requirement_entry.variable.custom.headerRecord.item_code",
			defaultValueDescription : "$manage_call_requirement_entry.variable.custom.headerRecord.item_code_description",
		});
		$("#manage_call_requirement_entry_item_variant_code").initializeWCombobox({
			screenID : "manage_call_requirement_entry",
			dataSource : {
				informationType : "'PRODUCTVARIANTCODE_LIST_LINKED'",
				searchField1 : "#manage_call_requirement_entry_item_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			childFieldID : "manage_call_requirement_entry_uom",
			defaultValue : "$manage_call_requirement_entry.variable.custom.headerRecord.item_variant_code",
			defaultValueDescription : "$manage_call_requirement_entry.variable.custom.headerRecord.item_variant_code_description",
		});
		$("#manage_call_requirement_entry_uom").initializeWDropdownlist({
			screenID : "manage_call_requirement_entry",
			dataSource : {
				informationType : "'GET_PRODUCT_UOM'",
				searchField1 : "#manage_call_requirement_entry_item_code",
				searchField2 : "#manage_call_requirement_entry_item_variant_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_call_requirement_entry.variable.custom.headerRecord.uom_code",
			defaultValueDescription : "$manage_call_requirement_entry.variable.custom.headerRecord.uom_code_description",
		});
		manage_call_requirement_entry.variable.custom.quantity = $("#manage_call_requirement_entry_quantity").initializeWNumerictextbox({
				screenID : "manage_call_requirement_entry",
				format : "n2",
				minimum : "'0'",
				defaultValue : "$manage_call_requirement_entry.variable.custom.headerRecord.net_quantity",
			});
		manage_call_requirement_entry.variable.custom.standard_rate = $("#manage_call_requirement_entry_standard_rate").initializeWDisplayarea({
				screenID : "manage_call_requirement_entry",
				defaultValue : "$manage_call_requirement_entry.variable.custom.headerRecord.std_rate",
			});
		$("#manage_call_requirement_entry_amount").initializeWDisplayarea({
			screenID : "manage_call_requirement_entry",
			defaultValue : "$manage_call_requirement_entry.variable.custom.headerRecord.gross_amount",
		});
		$("#manage_call_requirement_entry_requirement").initializeWTextarea({
			screenID : "manage_call_requirement_entry",
			defaultValue : "$manage_call_requirement_entry.variable.custom.headerRecord.requirement",
		});
		$("#manage_call_requirement_entry_currency_code").initializeWDropdownlist({
			screenID : "manage_call_requirement_entry",
			dataSource : {
				informationType : "'CURRENCYCODE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_call_requirement_entry.variable.custom.headerRecord.currency_code",
			defaultValueDescription : "$manage_call_requirement_entry.variable.custom.headerRecord.currency_code_description"
		});
	},
	customRequirementHandler : {
		partValidation : function () {
			var keyValidation = manage_call_register_edit.variable.custom.grid_4.dataSource.data();
			for (var i = 0; i < keyValidation.length; i++) {
				if (keyValidation[i].uom_code == $("#manage_call_requirement_entry_uom").getVal() && keyValidation[i].item_code == $("#manage_call_requirement_entry_item_code").getVal()) {
					alert("Part Details already exists.");
					$("#manage_call_requirement_entry_uom").setVal("");
				}
			}
		}
	},
	widgetEventHandler : {
		item_code_change : function (element, event) {
			if ($("#manage_call_requirement_entry_uom").getVal() == "") {
				$("#manage_call_requirement_entry_quantity").setVal("");
				$("#manage_call_requirement_entry_standard_rate").setVal("0.00");
				$("#manage_call_requirement_entry_amount").setVal("0.00");
			}
			manage_call_requirement_entry.customRequirementHandler.partValidation();
		},
		uom_change : function (element, event) {
			manage_call_requirement_entry.customRequirementHandler.partValidation();
			if ($("#manage_call_requirement_entry_item_code").getVal() != "" && $("#manage_call_requirement_entry_uom").getVal() != "") {
				manage_call_requirement_entry.variable.custom.datasource_1.read();
				if (manage_call_requirement_entry.variable.custom.datasource_1.data().length == 0) {
					$("#manage_call_requirement_entry_standard_rate").setVal("0.00");
				} else {
					manage_call_requirement_entry.variable.custom.standardRate = manage_call_requirement_entry.variable.custom.datasource_1.data();
					$("#manage_call_requirement_entry_standard_rate").setVal(parseFloat(manage_call_requirement_entry.variable.custom.standardRate[0].std_rate).toFixed(2));
					var amount = ((parseFloat(manage_call_requirement_entry.variable.custom.standardRate[0].std_rate).toFixed(2)) * $("#manage_call_requirement_entry_quantity").getVal());
					$("#manage_call_requirement_entry_amount").setVal(parseFloat(amount).toFixed(2));
					manage_call_requirement_entry.variable.custom.actionType = manage_call_requirement_entry.variable.custom.standardRate[0].action_type;
				}
			} else {
				$("#manage_call_requirement_entry_quantity").setVal("");
				$("#manage_call_requirement_entry_standard_rate").setVal("0.00");
				$("#manage_call_requirement_entry_amount").setVal("0.00");
			}
		},
		quantity_change : function (element, event) {
			if ($("#manage_call_requirement_entry_item_code").getVal() != "" && $("#manage_call_requirement_entry_uom").getVal() != "") {
				manage_call_requirement_entry.variable.custom.datasource_1.read();
				manage_call_requirement_entry.variable.custom.standardRate = manage_call_requirement_entry.variable.custom.datasource_1.data();
				var amount = ((parseFloat(manage_call_requirement_entry.variable.custom.standardRate[0].std_rate).toFixed(2)) * $("#manage_call_requirement_entry_quantity").getVal());
				$("#manage_call_requirement_entry_amount").setVal(parseFloat(amount).toFixed(2));
				manage_call_requirement_entry.variable.custom.actionType = manage_call_requirement_entry.variable.custom.standardRate[0].action_type;
			} else {
				$("#manage_call_requirement_entry_amount").setVal("0.00");
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			if (($("#manage_call_requirement_entry_amount").getVal() != "0.00") && ($("#manage_call_requirement_entry_amount").getVal() > "0")) {
				if (manage_call_register_edit.variable.custom.crudIndicator == "A") {
					var keyValidation = manage_call_register_edit.variable.custom.grid_4.dataSource.data();
					for (var i = 0; i < keyValidation.length; i++) {
						if (keyValidation[i].item_code == $("#manage_call_requirement_entry_item_code").getVal()) {
							alert("Part already exists.");
							$("#manage_call_requirement_entry_item_code").setVal("");
							$("#manage_call_requirement_entry_uom").setVal("");
							return false;
						}
					}
					manage_call_register_edit.variable.custom.grid_4.dataSource.add({
						item_code : $("#manage_call_requirement_entry_item_code").getVal(),
						item_variant_code : $("#manage_call_requirement_entry_item_variant_code").getVal(),
						net_quantity : $("#manage_call_requirement_entry_quantity").getVal().toString(),
						uom_code : $("#manage_call_requirement_entry_uom").getVal(),
						std_rate : ($("#manage_call_requirement_entry_standard_rate").getVal()).toString(),
						gross_amount : $("#manage_call_requirement_entry_amount").getVal(),
						currency_code : $("#manage_call_requirement_entry_currency_code").getVal(),
						requirement : $("#manage_call_requirement_entry_requirement").getVal(),
						item_code_description : mserviceUtilities.getDescriptionForCode("PRODUCTCODE_LIST", $("#manage_call_requirement_entry_item_code").getVal(), ""),
						item_variant_code_description : mserviceUtilities.getDescriptionForCode("PRODUCTVARIANTCODE_LIST", $("#manage_call_requirement_entry_item_variant_code").getVal(), ""),
						last_update_timestamp : "00000000-0000-0000-0000-000000000000",
						uom_code_description : mserviceUtilities.getDescriptionForCode("PRODUCTUOM_LIST", $("#manage_call_requirement_entry_uom").getVal(), ""),
						currency_code_description : mserviceUtilities.getDescriptionForCode("CURRENCYCODE_LIST", $("#manage_call_requirement_entry_currency_code").getVal(), ""),
						action_type : manage_call_requirement_entry.variable.custom.actionType
					});
				} else {
					manage_call_requirement_entry.variable.custom.headerRecord.set("item_code", $("#manage_call_requirement_entry_item_code").getVal());
					manage_call_requirement_entry.variable.custom.headerRecord.set("item_variant_code", $("#manage_call_requirement_entry_item_variant_code").getVal());
					manage_call_requirement_entry.variable.custom.headerRecord.set("net_quantity", $("#manage_call_requirement_entry_quantity").getVal().toString());
					manage_call_requirement_entry.variable.custom.headerRecord.set("uom_code", $("#manage_call_requirement_entry_uom").getVal());
					manage_call_requirement_entry.variable.custom.headerRecord.set("std_rate", ($("#manage_call_requirement_entry_standard_rate").getVal()).toString());
					manage_call_requirement_entry.variable.custom.headerRecord.set("gross_amount", $("#manage_call_requirement_entry_amount").getVal());
					manage_call_requirement_entry.variable.custom.headerRecord.set("currency_code", $("#manage_call_requirement_entry_currency_code").getVal());
					manage_call_requirement_entry.variable.custom.headerRecord.set("requirement", $("#manage_call_requirement_entry_requirement").getVal());
					manage_call_requirement_entry.variable.custom.headerRecord.set("item_code_description", mserviceUtilities.getDescriptionForCode("PRODUCTCODE_LIST", $("#manage_call_requirement_entry_item_code").getVal(), ""));
					manage_call_requirement_entry.variable.custom.headerRecord.set("item_variant_code_description", mserviceUtilities.getDescriptionForCode("PRODUCTVARIANTCODE_LIST", $("#manage_call_requirement_entry_item_variant_code").getVal(), ""));
					manage_call_requirement_entry.variable.custom.headerRecord.set("last_update_timestamp", manage_call_requirement_entry.variable.custom.headerRecord.last_update_timestamp);
					manage_call_requirement_entry.variable.custom.headerRecord.set("uom_code_description", mserviceUtilities.getDescriptionForCode("PRODUCTUOM_LIST", $("#manage_call_requirement_entry_uom").getVal(), ""));
					manage_call_requirement_entry.variable.custom.headerRecord.set("currency_code_description", mserviceUtilities.getDescriptionForCode("CURRENCYCODE_LIST", $("#manage_call_requirement_entry_currency_code").getVal(), ""));
					manage_call_requirement_entry.variable.custom.headerRecord.set("action_type", manage_call_requirement_entry.variable.custom.actionType);
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

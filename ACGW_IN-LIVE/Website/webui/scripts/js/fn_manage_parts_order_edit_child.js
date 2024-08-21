var manage_parts_order_edit_child = {
	constructScreen : function () {
		if (manage_parts_order_edit.variable.custom.crudIndicator == "U" || manage_parts_order_edit.variable.custom.crudIndicator == "V") {
			manage_parts_order_edit_child.variable.custom.header_1_record = manage_parts_order_edit.variable.custom.selectedRecord;
		}
	},
	initializeWidgets : function () {
		$("#manage_parts_order_edit_child_item_code").initializeWCombobox({
			screenID : "manage_parts_order_edit_child",
			dataSource : {
				informationType : "'ITEMCODE_LIST'",
				searchField1 : "$manage_parts_order_edit_child.variable.custom.item_code_serverFilterValue",
				searchField2 : "$manage_parts_order_edit_child.variable.custom.itemIndicator"
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			childFieldID : "manage_parts_order_edit_child_item_variant_code,manage_parts_order_edit_child_uom",
			defaultValue : "$manage_parts_order_edit_child.variable.custom.header_1_record.item_code",
			defaultValueDescription : "$manage_parts_order_edit_child.variable.custom.header_1_record.item_description",
		});
		manage_parts_order_edit_child.variable.custom.item_variant_code = $("#manage_parts_order_edit_child_item_variant_code").initializeWDropdownlist({
			screenID : "manage_parts_order_edit_child",
			dataSource : {
				informationType : "'ITEMVARIANTCODE_LIST_LINKED'",
				searchField1 : "#manage_parts_order_edit_child_item_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			childFieldID : "manage_parts_order_edit_child_uom",
			defaultValue : "$manage_parts_order_edit_child.variable.custom.header_1_record.item_variant_code",
			defaultValueDescription : "$manage_parts_order_edit_child.variable.custom.header_1_record.variant_description",
		});
		$("#manage_parts_order_edit_child_uom").initializeWDropdownlist({
			screenID : "manage_parts_order_edit_child",
			dataSource : {
				informationType : "'GET_ITEM_UOM'",
				searchField1 : "#manage_parts_order_edit_child_item_code",
				searchField2 : "#manage_parts_order_edit_child_item_variant_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_parts_order_edit_child.variable.custom.header_1_record.uom_code",
			defaultValueDescription : "$manage_parts_order_edit_child.variable.custom.header_1_record.uom_code_description",
		});
		manage_parts_order_edit_child.variable.custom.quantity = $("#manage_parts_order_edit_child_quantity").initializeWNumerictextbox({
			screenID : "manage_parts_order_edit_child",
			format : "n2",
			minimum : "'1'",
			defaultValue : "$manage_parts_order_edit_child.variable.custom.header_1_record.order_quantity"
		});
		$("#manage_parts_order_edit_child_addn_description").initializeWTextbox({
			screenID : "manage_parts_order_edit_child",
			maxlength : "500",
			defaultValue : "$manage_parts_order_edit_child.variable.custom.header_1_record.addn_description",
		});
	},
	customRequirementHandler : {
		partValidation : function () {
			var keyValidation = manage_parts_order_edit.variable.custom.grid_1.dataSource.data();
			for (var i = 0; i < keyValidation.length; i++) {
				if (keyValidation[i].uom_code == $("#manage_parts_order_edit_child_uom").getVal() && keyValidation[i].item_code == $("#manage_parts_order_edit_child_item_code").getVal()) {
					alert("Part Details already exists.");
					$("#manage_parts_order_edit_child_uom").setVal("");
				}
			}
		}
	},
	widgetEventHandler : {
		item_code_change : function (element, event) {
			if ($("#manage_parts_order_edit_child_uom").getVal() == "") {
				$("#manage_parts_order_edit_child_quantity").setVal("");
			}
		},
		uom_change : function (element, event) {
			manage_parts_order_edit_child.customRequirementHandler.partValidation();
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			if (($("#manage_parts_order_edit_child_quantity").getVal() != 0) && ($("#manage_parts_order_edit_child_quantity").getVal() > 0)) {
				if (manage_parts_order_edit.variable.custom.crudIndicator == "A") {
						var inputObject = JSON.parse($("#manage_parts_order_edit_child_content_1").getInputparamJSON({
						screenID : "manage_parts_order_edit_child",
						matchCondition : ["manage_parts_order_edit_child_udf","manage_parts_order_edit_child_product_udf"]
						}));
						inputObject.parts_order_item_sl_no = (manage_parts_order_edit.variable.custom.grid_1.dataSource.data().length + 1).toString(),
						inputObject.item_code = $("#manage_parts_order_edit_child_item_code").getVal(),
						inputObject.item_variant_code = $("#manage_parts_order_edit_child_item_variant_code").getVal(),
						inputObject.order_quantity = $("#manage_parts_order_edit_child_quantity").getVal().toString(),
						inputObject.shipped_quantity = "0.00",
						inputObject.received_quantity = "0.00",
						inputObject.uom_code = $("#manage_parts_order_edit_child_uom").getVal(),
						inputObject.item_description = mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_parts_order_edit_child_item_code").getVal(), ""),
						inputObject.variant_description = mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_parts_order_edit_child_item_variant_code").getVal(), ""),
						inputObject.addn_description = $("#manage_parts_order_edit_child_addn_description").getVal()
						inputObject.last_update_timestamp = "00000000-0000-0000-0000-000000000000";
					manage_parts_order_edit.variable.custom.grid_1.dataSource.add(inputObject);
					alert("Item detail is saved successfully.");
					return true;
				
				} else if (manage_parts_order_edit.variable.custom.crudIndicator == "U") {
						var inputObject = JSON.parse($("#manage_parts_order_edit_child_content_1").getInputparamJSON({
						screenID : "manage_parts_order_edit_child",
						matchCondition : ["manage_parts_order_edit_child_udf","manage_parts_order_edit_child_product_udf"]
						}));
					manage_parts_order_edit_child.variable.custom.header_1_record.set("item_code", $("#manage_parts_order_edit_child_item_code").getVal());
					manage_parts_order_edit_child.variable.custom.header_1_record.set("item_variant_code", $("#manage_parts_order_edit_child_item_variant_code").getVal());
					manage_parts_order_edit_child.variable.custom.header_1_record.set("order_quantity", $("#manage_parts_order_edit_child_quantity").getVal().toString());
					manage_parts_order_edit_child.variable.custom.header_1_record.set("shipped_quantity", "0.00");
					manage_parts_order_edit_child.variable.custom.header_1_record.set("received_quantity", "0.00");
					manage_parts_order_edit_child.variable.custom.header_1_record.set("uom_code", $("#manage_parts_order_edit_child_uom").getVal());
					manage_parts_order_edit_child.variable.custom.header_1_record.set("item_description", mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_parts_order_edit_child_item_code").getVal(), ""));
					manage_parts_order_edit_child.variable.custom.header_1_record.set("variant_description", mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_parts_order_edit_child_item_variant_code").getVal(), ""));
					manage_parts_order_edit_child.variable.custom.header_1_record.set("addn_description", $("#manage_parts_order_edit_child_addn_description").getVal());
						for(key in inputObject) { 
						manage_parts_order_edit_child.variable.custom.header_1_record.set(key,inputObject[key]);
					}
					alert("Item detail is saved successfully.");
					return true;
				}
			} else {
				alert("Invalid Quantity.");
				return false;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			popupIndicator : true,
			valueChangeIndicator : false,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			customDelete : true,
			itemIndicator : ""
		}
	}
};
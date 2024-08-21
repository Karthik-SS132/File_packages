var manage_customer_gst_edit = {
	constructScreen : function () {
		if (manage_customer_gst.variable.custom.crudIndicator == "U" || manage_customer_gst.variable.custom.crudIndicator == "V") {
			manage_customer_gst_edit.variable.custom.headerRecord = manage_customer_gst.variable.custom.selectedRecord;
		}
	},
	initializeWidgets : function () {
		$("#manage_customer_gst_edit_item_code").initializeWSearchbox({
			screenID : "manage_customer_gst_edit",
			dataSource : {
				informationType : "'ITEMCODE_LIST'",
				searchField1 : "$manage_customer_gst_edit.variable.custom.item_code_serverFilterValue"
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			minLength : 2,
			childFieldID : "manage_customer_gst_edit_item_variant_code,manage_customer_gst_edit_charge_code",
			defaultValue : "$manage_customer_gst_edit.variable.custom.headerRecord.item_code",
			defaultValueDescription : "$manage_customer_gst_edit.variable.custom.headerRecord.item_description"
		});
		manage_customer_gst_edit.variable.custom.item_variant_code = $("#manage_customer_gst_edit_item_variant_code").initializeWDropdownlist({
			screenID : "manage_customer_gst_edit",
			dataSource : {
				informationType : "'ITEMVARIANTCODE_LIST_LINKED'",
				searchField1 : "#manage_customer_gst_edit_item_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			childFieldID : "manage_customer_gst_edit_charge_code",
			defaultValue : "$manage_customer_gst_edit.variable.custom.headerRecord.item_variant_code",
			defaultValueDescription : "$manage_customer_gst_edit.variable.custom.headerRecord.variant_description"
		});
		$("#manage_customer_gst_edit_item_hsn_code").initializeWDisplayarea({
			screenID : "manage_customer_gst_edit",
			defaultValue : "$manage_customer_gst_edit.variable.custom.headerRecord.hsn_code"
		});
		$("#manage_customer_gst_edit_gst_code").initializeWDisplayarea({
			screenID : "manage_customer_gst_edit"
		});
		$("#manage_customer_gst_edit_charge_code").initializeWDropdownlist({
			screenID : "manage_customer_gst_edit",
			dataSource : {
				informationType : "'GSTCODE_LIST_LINKED_WITH_ITEM'",
				searchField1 : "#manage_customer_gst_edit_item_code",
				searchField2 : "#manage_customer_gst_edit_item_variant_code"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_customer_gst_edit.variable.custom.headerRecord.charge_code",
			defaultValueDescription : "$manage_customer_gst_edit.variable.custom.headerRecord.charge_code"
		});
	},
	customRequirementHandler : {
		partValidation : function () {
			var keyValidation = manage_customer_gst.variable.custom.grid_1.dataSource.data();
			for (var i = 0; i < keyValidation.length; i++) {
				if ((keyValidation[i].item_code == $("#manage_customer_gst_edit_item_code").getVal()) && (keyValidation[i].item_variant_code == $("#manage_customer_gst_edit_item_variant_code").getVal())) {
					alert("Part Details already exists.");
					$("#manage_customer_gst_edit_item_variant_code").setVal("");
				}
			}
		}
	},
	widgetEventHandler : {
		item_code_change : function (element, event) {
			manage_customer_gst_edit.customRequirementHandler.partValidation();
		},
		item_variant_code_change : function (element, event) {
			manage_customer_gst_edit.customRequirementHandler.partValidation();
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			if(manage_customer_gst.variable.custom.crudIndicator == "A"){
				manage_customer_gst.variable.custom.grid_1.dataSource.add({
					sl_no : (manage_customer_gst.variable.custom.grid_1.dataSource.data().length + 1).toString(),
					item_code : $("#manage_customer_gst_edit_item_code").getVal(),
					item_variant_code : $("#manage_customer_gst_edit_item_variant_code").getVal(),
					hsn_code : $("#manage_customer_gst_edit_item_hsn_code").getVal(),
					charge_code : $("#manage_customer_gst_edit_charge_code").getVal(),
					item_description : mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_customer_gst_edit_item_code").getVal(), ""),
					variant_description : mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_customer_gst_edit_item_variant_code").getVal(), "")
				});
			} else {
				manage_customer_gst_edit.variable.custom.headerRecord.set("item_code", $("#manage_customer_gst_edit_item_code").getVal());
				manage_customer_gst_edit.variable.custom.headerRecord.set("item_variant_code", $("#manage_customer_gst_edit_item_variant_code").getVal());
				manage_customer_gst_edit.variable.custom.headerRecord.set("hsn_code", $("#manage_customer_gst_edit_item_hsn_code").getVal());
				manage_customer_gst_edit.variable.custom.headerRecord.set("charge_code", $("#manage_customer_gst_edit_charge_code").getVal());
				manage_customer_gst_edit.variable.custom.headerRecord.set("item_description",  mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_customer_gst_edit_item_code").getVal(), ""));
				manage_customer_gst_edit.variable.custom.headerRecord.set("variant_description", mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_customer_gst_edit_item_variant_code").getVal(), ""));
			}
			alert("Customer GST detail is saved successfully.");
			return true;
		}
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
		custom : {
			customDelete : true
		}
	}
};
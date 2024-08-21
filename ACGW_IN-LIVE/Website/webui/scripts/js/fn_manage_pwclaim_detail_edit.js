var manage_pwclaim_detail_edit = {
	constructScreen : function () {
		if ((manage_pwclaim_detail.variable.custom.crudIndicator == "U") || (manage_pwclaim_detail.variable.custom.crudIndicator == "V")){
			manage_pwclaim_detail_edit.variable.custom.header_record = manage_pwclaim_detail.variable.custom.selectedRecord;
		}
	},
	initializeWidgets : function () {
		$("#manage_pwclaim_detail_edit_item_code").initializeWCombobox({
			screenID : "manage_pwclaim_detail_edit",
			dataSource : {
				informationType : "'ITEMCODE_LIST'",
				searchField1 : "$manage_pwclaim_detail_edit.variable.custom.item_code_serverFilterValue",
			},
			dataTextField : "description",
			dataValueField : "code",
			serverFiltering : true,
			childFieldID : "manage_pwclaim_detail_edit_item_variant_code",
			defaultValue : "$manage_pwclaim_detail_edit.variable.custom.header_record.item_code",
			defaultValueDescription : "$manage_pwclaim_detail_edit.variable.custom.header_record.item_description",
		});
		$("#manage_pwclaim_detail_edit_item_variant_code").initializeWDropdownlist({
			screenID : "manage_pwclaim_detail_edit",
			dataSource : {
				informationType : "'ITEMVARIANTCODE_LIST_LINKED'",
				searchField1 : "#manage_pwclaim_detail_edit_item_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			defaultValue : "$manage_pwclaim_detail_edit.variable.custom.header_record.item_variant_code",
			defaultValueDescription : "$manage_pwclaim_detail_edit.variable.custom.header_record.variant_description",
		});
		manage_pwclaim_detail_edit.variable.custom.quantity = $("#manage_pwclaim_detail_edit_quantity").initializeWNumerictextbox({
			screenID : "manage_pwclaim_detail_edit",
			format : "n2",
			minimum : "'1'",
			defaultValue : "$manage_pwclaim_detail_edit.variable.custom.header_record.quantity",
		});
	},
	refreshScreen : function () {
		manage_pwclaim_detail.variable.custom.grid_1.dataSource.pageSize(10);
	},
	widgetEventHandler : {
		item_code_change: function (element, event) {
			var keyValidation = manage_pwclaim_detail.variable.custom.datasource_1.data();
			for (var i = 0; i < keyValidation.length; i++) {
				if (keyValidation[i].item_code == $("#manage_pwclaim_detail_edit_item_code").getVal()) {
					alert("Data already exists.");
					$("#manage_pwclaim_detail_edit_item_code").setVal("");
					$("#manage_pwclaim_detail_edit_quantity").setVal("");
				}
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			if (manage_pwclaim_detail.variable.custom.crudIndicator == "A") {
				var inputObject = JSON.parse($("#manage_pwclaim_detail_edit_content_1").getInputparamJSON({
					screenID : "manage_pwclaim_detail_edit",
					matchCondition : ["manage_pwclaim_detail_edit_udf","manage_pwclaim_detail_edit_product_udf"]
				}));
				inputObject.item_code = $("#manage_pwclaim_detail_edit_item_code").getVal(),
				inputObject.item_variant_code = $("#manage_pwclaim_detail_edit_item_variant_code").getVal(),
				inputObject.quantity = $("#manage_pwclaim_detail_edit_quantity").getVal().toString();
				inputObject.item_description = mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_pwclaim_detail_edit_item_code").getVal(), "");
				inputObject.variant_description = mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_pwclaim_detail_edit_item_variant_code").getVal(), "");
				manage_pwclaim_detail.variable.custom.datasource_1.add(inputObject);
			} else if (manage_pwclaim_detail.variable.custom.crudIndicator == "U") {
				var inputObject = JSON.parse($("#manage_pwclaim_detail_edit_content_1").getInputparamJSON({
					screenID : "manage_pwclaim_detail_edit",
					matchCondition : ["manage_pwclaim_detail_edit_udf","manage_pwclaim_detail_edit_product_udf"]
				}));
				manage_pwclaim_detail_edit.variable.custom.header_record.set("item_code", $("#manage_pwclaim_detail_edit_item_code").getVal());
				manage_pwclaim_detail_edit.variable.custom.header_record.set("item_variant_code", $("#manage_pwclaim_detail_edit_item_variant_code").getVal());
				manage_pwclaim_detail_edit.variable.custom.header_record.set("item_description", mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_pwclaim_detail_edit_item_code").getVal(), ""));
				manage_pwclaim_detail_edit.variable.custom.header_record.set("variant_description", mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_pwclaim_detail_edit_item_variant_code").getVal(), ""));
				manage_pwclaim_detail_edit.variable.custom.header_record.set("quantity", $("#manage_pwclaim_detail_edit_quantity").getVal());
				for(key in inputObject) { 
					manage_pwclaim_detail_edit.variable.custom.header_record.set(key,inputObject[key]);
				}
			};
			return true;
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			popupIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {}
	}
};
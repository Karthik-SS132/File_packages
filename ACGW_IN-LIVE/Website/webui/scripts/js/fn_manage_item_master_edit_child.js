var manage_item_master_edit_child = {
    constructScreen: function () {
        return true;
    },
    initializeWidgets: function () {
        $("#manage_item_master_edit_child_uom_code").initializeWDropdownlist({
            screenID: "manage_item_master_edit_child",
            dataSource: {
                informationType: "'ITEMUOM_LIST'"
            },
            dataTextField: "description",
            dataValueField: "code",
            template: "description"
        });
        $("#manage_item_master_edit_child_std_rate").initializeWNumerictextbox({
            screenID: "manage_item_master_edit_child",
            minimum: "'1.00'",
            maximum: "'9999999.99'",
            format: "n2",
        });
		$("#manage_item_master_edit_child_purchase_amt_or_perc_ind").initializeWDropdownlist({
            screenID: "manage_item_master_edit_child",
            dataSource :[{"description": "Amount", "code": "A"}, {"description": "Percentage", "code": "P"}],
			dataTextField : "description",
			dataValueField : "code",
			template : "description"
        });
		$("#manage_item_master_edit_child_purchase_amt_or_perc").initializeWNumerictextbox({
            screenID: "manage_item_master_edit_child",
            minimum: "'1.00'",
            maximum: "'9999999.99'",
            format: "n2",
        });
        $("#manage_item_master_edit_child_currency_code").initializeWDropdownlist({
            screenID: "manage_item_master_edit_child",
            dataSource: {
                informationType: "'CURRENCYCODE_LIST'"
            },
            dataTextField: "description",
            dataValueField: "code",
            template: "description"
        });
        $("#manage_item_master_edit_child_reorder_level").initializeWNumerictextbox({
            screenID: "manage_item_master_edit_child",
            minimum: "'1.00'",
            maximum: "'9999999.99'",
            format: "n2"
        });
        $("#manage_item_master_edit_child_eoq").initializeWNumerictextbox({
            screenID: "manage_item_master_edit_child",
            minimum: "'1.00'",
            maximum: "'9999999.99'",
            format: "n2"
        });
    },
    widgetEventHandler: {
        uom_code_change: function (element, event) {
            var keyValidation = manage_item_master_edit.variable.custom.datasource_1.data();
            for (var i = 0; i < keyValidation.length; i++) {
                if (keyValidation[i].uom_code == $("#manage_item_master_edit_child_uom_code").getVal()) {
                    alert("Data already exists.");
                    $("#manage_item_master_edit_child_uom_code").setVal("");
                }
            }
        },
		purchase_amt_or_perc_ind_change: function (element, event) {
			if($("#manage_item_master_edit_child_purchase_amt_or_perc_ind").getVal() == ""){
				$("#manage_item_master_edit_child_purchase_amt_or_perc").setVal("");
			} else if($("#manage_item_master_edit_child_purchase_amt_or_perc_ind").getVal() == "P"){
				$("#manage_item_master_edit_child_purchase_amt_or_perc").data("kendoNumericTextBox").max("100");
				if($("#manage_item_master_edit_child_purchase_amt_or_perc").getVal() > "100.00"){
					$("#manage_item_master_edit_child_purchase_amt_or_perc").setVal("100");
				}
			} else {
				$("#manage_item_master_edit_child_purchase_amt_or_perc").data("kendoNumericTextBox").max("9999999999")
			}
		}
    },
    buttonEventHandler: {
        submit_btn_click: function (element, event) {
			var inputObject = JSON.parse($("#manage_item_master_edit_child_content_1").getInputparamJSON({
				screenID : "manage_item_master_edit_child",
				matchCondition : ["manage_item_master_edit_child_udf","manage_item_master_edit_child_product_udf"]
			}));
			inputObject.uom_code =  $("#manage_item_master_edit_child_uom_code").getVal();
			inputObject.std_rate = ($("#manage_item_master_edit_child_std_rate").getVal()).toString();
			inputObject.currency_code = $("#manage_item_master_edit_child_currency_code").getVal();
			inputObject.reorder_level = ($("#manage_item_master_edit_child_reorder_level").getVal()).toFixed(2);
			inputObject.eoq = ($("#manage_item_master_edit_child_eoq").getVal()).toFixed(2);
			inputObject.uom_code_description = mserviceUtilities.getDescriptionForCode("ITEMUOM_LIST", $("#manage_item_master_edit_child_uom_code").getVal(), "");
			inputObject.purchase_amt_or_perc_ind = $("#manage_item_master_edit_child_purchase_amt_or_perc_ind").getVal();
			inputObject.purchase_amt_or_perc = ($("#manage_item_master_edit_child_purchase_amt_or_perc").getVal()).toString();
            manage_item_master_edit.variable.custom.grid_1.dataSource.add(inputObject);
            return true;
        }
    },
    variable: {
        standard: {
            screenEditableIndicator: true,
            valueChangeIndicator: false,
            popupIndicator: true,
            reorderParam: [{
                    contentID: "content_1",
                    columnLength: 2
                }
            ],
        },
        custom: {},
    }
};

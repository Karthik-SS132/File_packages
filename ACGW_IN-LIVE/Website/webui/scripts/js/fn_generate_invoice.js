var generate_invoice = {
	constructScreen : function () {
		generate_invoice.variable.custom.invoice_net_amount_defaultValue = kendo.toString(0, "n") + " " + login_profile.currency_code;
		generate_invoice.variable.custom.creation_date_defaultValue = mserviceUtilities.getDateString(new Date(), "dd-MM-yyyy");
	},
	initializeWidgets : function () {
		$("#generate_invoice_creation_date").initializeWDisplayarea({
			screenID : "generate_invoice",
			defaultValue : "$generate_invoice.variable.custom.creation_date_defaultValue"
		});
		$("#generate_invoice_invoice_net_amount").initializeWDisplayarea({
			screenID : "generate_invoice",
			defaultValue : "$generate_invoice.variable.custom.invoice_net_amount_defaultValue"
		});
		generate_invoice.variable.custom.expdoc_list = $("#generate_invoice_expdoc_list").initializeWMultiselect({
				screenID : "generate_invoice",
				dataSource : {
					applicationName : "common_modules",
					serviceName : "retrieve_listof_values",
					inputParameter : {
						p_lov_code : "'GENINVOICE_EXPDOC_LIST'",
						p_search_field_1 : "$login_profile.dealer_code",
						p_search_field_2 : "",
						p_search_field_3 : "",
						p_search_field_4 : "",
						p_search_field_5 : ""
					},
				},
				dataTextField : "p_description_field_1",
				dataValueField : "p_value_field_1"
			});
	},
	widgetEventHandler : {
		expdoc_list_change : function (element, event) {
			var netAmount = 0,
			expdocList,
			expdocCounter,
			currentExpdoc,
			valueList = [];
			expdocList = $("#generate_invoice_expdoc_list").getVal();
			if (expdocList.length > 10) {
				expdocList.pop();
				alert("Selection restricted to 10 docs.");				
				$("#generate_invoice_expdoc_list").setVal(expdocList);
			} else {
				for (expdocCounter = 0; expdocCounter < expdocList.length; expdocCounter++) {
					if (expdocList[expdocCounter] != "") {
						currentExpdoc = $.grep(generate_invoice.variable.custom.expdoc_list.dataSource.data(), function (element, index) {
								return element.p_value_field_1 == expdocList[expdocCounter];
							})[0];
						netAmount += parseFloat(currentExpdoc.p_description_field_1);
					}
				};
				$("#generate_invoice_invoice_net_amount").setVal(kendo.toString(netAmount, "n") + " " + login_profile.currency_code);
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue;
			returnValue = executeService_generate_invoice({
					p_expense_doc_no_string : $("#generate_invoice_expdoc_list").getVal().join()
				});
			if (returnValue == "SP001") {
				alert("Invoice generated successfully for the given expense documents.");
				return true;
			} else {
				alert("Generation of Invoice failed.");
				return false;
			}
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
		custom : {},
	}
};
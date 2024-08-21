/*function fn_taxation_customer_order_service_spares_load() {
	if (manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data().length == 0 ) {
		$("#manage_customer_order_master_service_spares_edit_seller_code").enable();
		$("#manage_customer_order_master_service_spares_edit_seller_location").enable();
		$("#manage_customer_order_master_service_spares_edit_buyer_code").enable();
		$("#manage_customer_order_master_service_spares_edit_buyer_location").enable();
		$("#manage_customer_order_master_service_spares_edit_consignee_code").enable();
		$("#manage_customer_order_master_service_spares_edit_consignee_location").enable();
	} else {
		$("#manage_customer_order_master_service_spares_edit_seller_code").disable();
		$("#manage_customer_order_master_service_spares_edit_seller_location").disable();
		$("#manage_customer_order_master_service_spares_edit_buyer_code").disable();
		$("#manage_customer_order_master_service_spares_edit_buyer_location").disable();
		$("#manage_customer_order_master_service_spares_edit_consignee_code").disable();
		$("#manage_customer_order_master_service_spares_edit_consignee_location").disable();
	}
}*/

function fn_taxation_customer_order_service_spares_add_click() {
	var taxationDatasource = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS'</lov_code_type><search_field_1>#manage_customer_order_master_service_spares_edit_child_item_code</search_field_1><search_field_2>#manage_customer_order_master_service_spares_edit_child_item_variant_code</search_field_2><search_field_3>#manage_customer_order_master_service_spares_edit_buyer_code</search_field_3></inputparam>"
		}
	});
	var stateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_customer_order_master_service_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
		}
	});
	taxationDatasource.read();
	stateType.read();
	if (manage_customer_order_master_service_spares_edit.variable.custom.sellerAddressObject.state == manage_customer_order_master_service_spares_edit.variable.custom.buyerAddressObject.state) {
		if (stateType.data()[0].state_type == "UT") {
			var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
				return data.charge_code != "IGST" && data.charge_code != "SGST"
			});
		} else {
			var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
				return data.charge_code != "IGST" && data.charge_code != "UTGST"
			});
		}
	} else {
		var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
			return data.charge_code == "IGST"
		});
	}
	var discountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal() && data.charge_code == "DISCOUNT";
	});
	if (discountData.length != 0) {
		var discountValue = discountData[0].amount;
	} else {
		var discountValue = "0.00";
	}
	var applicableAmount = parseFloat($("#manage_customer_order_master_service_spares_edit_child_amount").getVal()) - parseFloat(discountValue);
	for (i = 0; i < hsnGstValues.length; i++) {
		var addObject = {
			item_code: $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal(),
			item_variant_code: $("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal(),
			item_description: mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_item_code").getVal(), ""),
			variant_description: mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_item_variant_code").getVal(), ""),
			charge_sl_no: (manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
			addl_charge_ind: hsnGstValues[i].addl_charge_ind,
			charge_category : hsnGstValues[i].charge_category,
			charge_type : hsnGstValues[i].charge_type,
			charge_code: hsnGstValues[i].charge_code,
			percentage_amount_ind: "P",
			percentage: hsnGstValues[i].applicable_percentage,
			applicable_on_amount: (applicableAmount).toString(),
			amount: ((parseFloat(applicableAmount) * parseFloat(hsnGstValues[i].applicable_percentage)) / 100).toString(),
			currency_code: $("#manage_customer_order_master_service_spares_edit_currency_code").getVal(),
			last_update_timestamp: "00000000-0000-0000-0000-000000000000",
			addl_charge_desc: hsnGstValues[i].addl_charge_desc,
			charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", hsnGstValues[i].charge_category, ""),
			charge_description: hsnGstValues[i].charge_description,
			percentage_amount_ind_description: "Percentage"
		};
		manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
	}
	
	var addlDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
		});
		var discountAmount = 0.00;
		if (overallDiscountData.length != 0) {
			for(var index = 0; index < overallDiscountData.length; index++){
				discountAmount += parseFloat(overallDiscountData[index].amount);
			}
		}
		
		var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
		if (addlDiscountData.length != 0) {
			for (i = 0; i < addlDiscountData.length; i++) {
				if(addlDiscountData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
					addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
					addlDiscountData[i].set("amount", amount);
				} else {
					if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
						addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
					}
				}
			}
		}						
	}
}

function fn_taxation_customer_order_service_spares_tax_add_click() {
	if($("#manage_customer_order_master_service_spares_edit_child_taxdetails_tax_discount_indicator").getVal() == "A"){
		var addlchargstaxationDatasource = mserviceUtilities.getTransportDataSource({
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_searchcondition",
			outputPath: "context/outputparam",
			pageSize: 10,
			inputParameter: {
				p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS_ADDLCHRGS'</lov_code_type><search_field_1>#manage_customer_order_master_service_spares_edit_child_taxdetails_item_code</search_field_1><search_field_2>#manage_customer_order_master_service_spares_edit_child_taxdetails_item_variant_code</search_field_2><search_field_3>#manage_customer_order_master_service_spares_edit_child_taxdetails_tax_discount_category</search_field_3><search_field_4>#manage_customer_order_master_service_spares_edit_buyer_code</search_field_4></inputparam>"
			}
		});
		var addlchargsstateType = mserviceUtilities.getTransportDataSource({
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_searchcondition",
			outputPath: "context/outputparam",
			pageSize: 10,
			inputParameter: {
				p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_customer_order_master_service_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
			}
		});
		addlchargstaxationDatasource.read();
		addlchargsstateType.read();
		if (manage_customer_order_master_service_spares_edit.variable.custom.sellerAddressObject.state == manage_customer_order_master_service_spares_edit.variable.custom.buyerAddressObject.state) {
			if (addlchargsstateType.data()[0].state_type == "UT") {
				var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
					return data.charge_code != "IGST" && data.charge_code != "SGST"
				});
			} else {
				var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
					return data.charge_code != "IGST" && data.charge_code != "UTGST"
				});
			}
		} else {
			var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
				return data.charge_code == "IGST"
			});
		}
		for (i = 0; i < addlchargshsnGstValues.length; i++) {
			var addObject = {
				item_code: $("#manage_customer_order_master_service_spares_edit_child_taxdetails_item_code").getVal(),
				item_variant_code: $("#manage_customer_order_master_service_spares_edit_child_taxdetails_item_variant_code").getVal(),
				item_description: mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_taxdetails_item_code").getVal(), ""),
				variant_description: mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_customer_order_master_service_spares_edit_child_taxdetails_item_variant_code").getVal(), ""),
				charge_sl_no: (manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
				addl_charge_ind: addlchargshsnGstValues[i].addl_charge_ind,
				charge_category : addlchargshsnGstValues[i].charge_category,
				charge_type : addlchargshsnGstValues[i].charge_type,
				charge_code: addlchargshsnGstValues[i].charge_code,
				percentage_amount_ind: "P",
				percentage: addlchargshsnGstValues[i].applicable_percentage,
				applicable_on_amount: $("#manage_customer_order_master_service_spares_edit_child_taxdetails_tax_discount_amount").getVal(),
				amount: ((parseFloat($("#manage_customer_order_master_service_spares_edit_child_taxdetails_tax_discount_amount").getVal()) * parseFloat(addlchargshsnGstValues[i].applicable_percentage)) / 100).toString(),
				currency_code: $("#manage_customer_order_master_service_spares_edit_currency_code").getVal(),
				last_update_timestamp: "00000000-0000-0000-0000-000000000000",
				addl_charge_desc: addlchargshsnGstValues[i].addl_charge_desc,
				charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", addlchargshsnGstValues[i].charge_category, ""),
				charge_description: addlchargshsnGstValues[i].charge_description,
				percentage_amount_ind_description: "Percentage"
			};
			manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
		}
	}
	
	if(($("#manage_customer_order_master_service_spares_edit_child_taxdetails_item_code").getVal() == "OVERALL") && ($("#manage_customer_order_master_service_spares_edit_child_taxdetails_tax_discount_indicator").getVal() == "D") && ($("#manage_customer_order_master_service_spares_edit_child_taxdetails_tax_discount_code").getVal() == "DISCOUNT")){

		var addlDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
		});
		if(addlDiscountData.length != 0){
			var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
				return data;
			});
			var taxAmount = 0.00;
			if (overallTaxAmount.length != 0) {
				for(var index = 0; index < overallTaxAmount.length; index++){
					taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
				}
			}
			
			var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat($("#manage_customer_order_master_service_spares_edit_child_taxdetails_tax_discount_amount").getVal());
			if (addlDiscountData.length != 0) {
				for (i = 0; i < addlDiscountData.length; i++) {
					if(addlDiscountData[i].percentage_amount_ind == "P"){
						var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
						addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
						addlDiscountData[i].set("amount", amount);
					} else {
						if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
							addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
						}
					}
				}
			}						
		}
	}
}

function fn_taxation_customer_order_service_spares_edit_click() {
	var addlDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
		});
		var discountAmount = 0.00;
		if (overallDiscountData.length != 0) {
			for(var index = 0; index < overallDiscountData.length; index++){
				discountAmount += parseFloat(overallDiscountData[index].amount);
			}
		}
		
		var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
		if (addlDiscountData.length != 0) {
			for (i = 0; i < addlDiscountData.length; i++) {
				if(addlDiscountData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
					addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
					addlDiscountData[i].set("amount", amount);
				} else {
					if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
						addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
					}
				}
			}
		}						
	}
}

function fn_taxation_customer_order_service_spares_tax_edit_click() {
	if(($("#manage_customer_order_master_service_spares_edit_child_taxdetails_item_code").getVal() == "OVERALL") && ($("#manage_customer_order_master_service_spares_edit_child_taxdetails_tax_discount_indicator").getVal() == "D") && ($("#manage_customer_order_master_service_spares_edit_child_taxdetails_tax_discount_code").getVal() == "DISCOUNT")){

		var addlDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
		});
		if(addlDiscountData.length != 0){
			var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
				return data;
			});
			var taxAmount = 0.00;
			if (overallTaxAmount.length != 0) {
				for(var index = 0; index < overallTaxAmount.length; index++){
					taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
				}
			}
			
			var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat($("#manage_customer_order_master_service_spares_edit_child_taxdetails_tax_discount_amount").getVal());
			if (addlDiscountData.length != 0) {
				for (i = 0; i < addlDiscountData.length; i++) {
					if(addlDiscountData[i].percentage_amount_ind == "P"){
						var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
						addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
						addlDiscountData[i].set("amount", amount);
					} else {
						if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
							addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
						}
					}
				}
			}						
		}
	}
}

function fn_taxation_customer_order_service_spares_delete_click() {
	var addlDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
		});
		var discountAmount = 0.00;
		if (overallDiscountData.length != 0) {
			for(var index = 0; index < overallDiscountData.length; index++){
				discountAmount += parseFloat(overallDiscountData[index].amount);
			}
		}
		
		var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
		if (addlDiscountData.length != 0) {
			for (i = 0; i < addlDiscountData.length; i++) {
				if(addlDiscountData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
					addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
					addlDiscountData[i].set("amount", amount);
				} else {
					if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
						addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
					}
				}
			}
		}						
	}
}

function fn_taxation_customer_order_service_spares_tax_delete_click() {
	var addlDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
		});
		var discountAmount = 0.00;
		if (overallDiscountData.length != 0) {
			for(var index = 0; index < overallDiscountData.length; index++){
				discountAmount += parseFloat(overallDiscountData[index].amount);
			}
		}
		
		var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
		if (addlDiscountData.length != 0) {
			for (i = 0; i < addlDiscountData.length; i++) {
				if(addlDiscountData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
					addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
					addlDiscountData[i].set("amount", amount);
				} else {
					if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
						addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
					}
				}
			}
		}						
	}
}

function fn_taxation_customer_order_service_spares_location_change() {
	
	if(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data().length != 0){
		for(var index=0; index < manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data().length; index++){
			
			var lineItemTaxData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code && data.charge_category == "STD" && data.addl_charge_ind == "T";
			});
			for(var j=0; j < lineItemTaxData.length; j++){
				manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.remove(lineItemTaxData[j]);
			}
			
			var taxationDatasource = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS'</lov_code_type><search_field_1>'" + manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code +"'</search_field_1><search_field_2>'" + manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_variant_code + "'</search_field_2><search_field_3>#manage_customer_order_master_service_spares_edit_buyer_code</search_field_3></inputparam>"
				}
			});
			var stateType = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_customer_order_master_service_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
				}
			});
			taxationDatasource.read();
			stateType.read();
			if (manage_customer_order_master_service_spares_edit.variable.custom.sellerAddressObject.state == manage_customer_order_master_service_spares_edit.variable.custom.buyerAddressObject.state) {
				if (stateType.data()[0].state_type == "UT") {
					var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
						return data.charge_code != "IGST" && data.charge_code != "SGST"
					});
				} else {
					var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
						return data.charge_code != "IGST" && data.charge_code != "UTGST"
					});
				}
			} else {
				var hsnGstValues = $.grep(taxationDatasource.data(), function (data) {
					return data.charge_code == "IGST"
				});
			}
			var discountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code && data.charge_code == "DISCOUNT";
			});
			if (discountData.length != 0) {
				var discountValue = discountData[0].amount;
			} else {
				var discountValue = "0.00";
			}
			var applicableAmount = parseFloat(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].gross_amount) - parseFloat(discountValue);
			for (i = 0; i < hsnGstValues.length; i++) {
				var addObject = {
					item_code: manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code,
					item_variant_code: manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_variant_code,
					item_description: mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code, ""),
					variant_description: mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data()[index].item_code, ""),
					charge_sl_no: (manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
					addl_charge_ind: hsnGstValues[i].addl_charge_ind,
					charge_category : hsnGstValues[i].charge_category,
					charge_type : hsnGstValues[i].charge_type,
					charge_code: hsnGstValues[i].charge_code,
					percentage_amount_ind: "P",
					percentage: hsnGstValues[i].applicable_percentage,
					applicable_on_amount: (applicableAmount).toString(),
					amount: ((parseFloat(applicableAmount) * parseFloat(hsnGstValues[i].applicable_percentage)) / 100).toString(),
					currency_code: $("#manage_customer_order_master_service_spares_edit_currency_code").getVal(),
					last_update_timestamp: "00000000-0000-0000-0000-000000000000",
					addl_charge_desc: hsnGstValues[i].addl_charge_desc,
					charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", hsnGstValues[i].charge_category, ""),
					charge_description: hsnGstValues[i].charge_description,
					percentage_amount_ind_description: "Percentage"
				};
				manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
			}
		}
		
		for (var index = 0; index < manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length; index++) {
			manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
		};
		manage_customer_order_master_service_spares_edit.refreshScreen();
	}
	var addlChargesData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.addl_charge_ind == "A";
	});
	
	if(addlChargesData.length != 0){
		for(var index=0; index < addlChargesData.length; index++){
			var addlChargesTaxData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == addlChargesData[index].item_code && data.charge_category == addlChargesData[index].charge_category && data.addl_charge_ind == "T";
			});
			for(var j=0; j < addlChargesTaxData.length; j++){
				manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.remove(addlChargesTaxData[j]);
			}
			
			var addlchargstaxationDatasource = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'GET_HSNGST_TAX_DETAILS_ADDLCHRGS'</lov_code_type><search_field_1>'" + addlChargesData[index].item_code + "'</search_field_1><search_field_2>'" + addlChargesData[index].item_variant_code + "'</search_field_2><search_field_3>'" + addlChargesData[index].charge_category + "'</search_field_3><search_field_4>#manage_customer_order_master_service_spares_edit_buyer_code</search_field_4></inputparam>"
				}
			});
			var addlchargsstateType = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values_for_searchcondition",
				outputPath: "context/outputparam",
				pageSize: 10,
				inputParameter: {
					p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$manage_customer_order_master_service_spares_edit.variable.custom.sellerAddressObject.state</search_field_1></inputparam>"
				}
			});
			addlchargstaxationDatasource.read();
			addlchargsstateType.read();
			if (manage_customer_order_master_service_spares_edit.variable.custom.sellerAddressObject.state == manage_customer_order_master_service_spares_edit.variable.custom.buyerAddressObject.state) {
				if (addlchargsstateType.data()[0].state_type == "UT") {
					var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
						return data.charge_code != "IGST" && data.charge_code != "SGST"
					});
				} else {
					var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
						return data.charge_code != "IGST" && data.charge_code != "UTGST"
					});
				}
			} else {
				var addlchargshsnGstValues = $.grep(addlchargstaxationDatasource.data(), function (data) {
					return data.charge_code == "IGST"
				});
			}
			for (i = 0; i < addlchargshsnGstValues.length; i++) {
				var addObject = {
					item_code: addlChargesData[index].item_code,
					item_variant_code: addlChargesData[index].item_variant_code,
					item_description: mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", addlChargesData[index].item_code, ""),
					variant_description: mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", addlChargesData[index].item_variant_code, ""),
					charge_sl_no: (manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
					addl_charge_ind: addlchargshsnGstValues[i].addl_charge_ind,
					charge_category : addlchargshsnGstValues[i].charge_category,
					charge_type : addlchargshsnGstValues[i].charge_type,
					charge_code: addlchargshsnGstValues[i].charge_code,
					percentage_amount_ind: "P",
					percentage: addlchargshsnGstValues[i].applicable_percentage,
					applicable_on_amount: addlChargesData[index].amount,
					amount: ((parseFloat(addlChargesData[index].amount) * parseFloat(addlchargshsnGstValues[i].applicable_percentage)) / 100).toString(),
					currency_code: $("#manage_customer_order_master_service_spares_edit_currency_code").getVal(),
					last_update_timestamp: "00000000-0000-0000-0000-000000000000",
					addl_charge_desc: addlchargshsnGstValues[i].addl_charge_desc,
					charge_category_desc : mserviceUtilities.getDescriptionForCode("CHARGECATEGORY_LIST", addlchargshsnGstValues[i].charge_category, ""),
					charge_description: addlchargshsnGstValues[i].charge_description,
					percentage_amount_ind_description: "Percentage"
				};
				manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.add(addObject);
			}
		}
		
		for (var index = 0; index < manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data().length; index++) {
			manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data()[index].set("charge_sl_no", (index + 1).toString());
		};
		manage_customer_order_master_service_spares_edit.refreshScreen();
	}
	
	var overallDiscount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
	});
	
	if(overallDiscount.length != 0){
						
		var taxOnTaxConfig = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.configurationData, function(data) {
			return data.parent_code != "";
		});
		var taxOnTaxData =[];
		if(taxOnTaxConfig.length != 0){
			var taxDataConfig = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
			var taxData =[];
			for(var index=0; index < taxDataConfig.length; index++){
				for(var counter=0; counter < taxOnTaxConfig.length; counter++){
					if((taxDataConfig[index].charge_code == taxOnTaxConfig[counter].charge_code) && (taxDataConfig[index].addl_charge_ind == taxOnTaxConfig[counter].charge_ind) && (taxDataConfig[index].charge_category == taxOnTaxConfig[counter].charge_category)){
						taxDataConfig[index].parent_code = taxOnTaxConfig[counter].parent_code;
						taxOnTaxData.push(taxDataConfig[index]);
					} else {
						taxData.push(taxDataConfig[index]);
					}
				}
			}
		} else {
			var taxData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
		}

		if (taxData.length != 0) {
			for (i = 0; i < taxData.length; i++) {
				var itemGrossAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data.item_code == taxData[i].item_code;
				});
				var itemGross = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data;
				});
				var overallAmount = 0.00;
				for(var index = 0; index <  itemGross.length; index++){
					overallAmount += parseFloat( itemGross[index].gross_amount);
				}
				var applicableAmount = parseFloat(itemGrossAmount[0].gross_amount) - ((parseFloat(itemGrossAmount[0].gross_amount) * (parseFloat(overallDiscount[0].amount) * 100 / overallAmount))/100);
				if(taxData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(taxData[i].percentage) * parseFloat(applicableAmount)) / 100).toString();
					taxData[i].set("applicable_on_amount", (applicableAmount).toString());
					taxData[i].set("amount", amount);
				} else {
					if(parseFloat(taxData[i].amount) > applicableAmount){
						taxData[i].set("amount", applicableAmount);
					}
				}
			}
		}

		if(taxOnTaxData.length != 0){
			var taxDataUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code != "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
			for(var index=0; index < taxDataUpdated.length; index++){
				for(var counter=0; counter < taxOnTaxData.length; counter++){
					if((taxDataUpdated[index].charge_code == taxOnTaxData[counter].charge_code) && (taxDataUpdated[index].addl_charge_ind == taxOnTaxData[counter].addl_charge_ind) && (taxDataUpdated[index].charge_category == taxOnTaxData[counter].charge_category)){
						var taxOnTaxUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD" && data.charge_code == taxOnTaxData[counter].parent_code;
						});
						if(taxOnTaxUpdated.length != 0){
							if(taxDataUpdated[index].percentage_amount_ind == "P"){
								var amount = ((parseFloat(taxDataUpdated[index].percentage) * parseFloat(taxOnTaxUpdated[0].amount)) / 100).toString();
								taxDataUpdated[index].set("applicable_on_amount", (taxOnTaxUpdated[0].amount).toString());
								taxDataUpdated[index].set("amount", amount);
							} else {
								taxDataUpdated[index].set("amount", parseFloat(taxOnTaxUpdated[0].amount));
							}
						}
					}
				}
			}
		}
		
		var taxOnTaxConfigOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.configurationData, function(data) {
			return data.parent_code != "";
		});

		var taxOnTaxDataOverall =[];
		if(taxOnTaxConfigOverall.length != 0){
			var taxDataOverallConfigOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
			var taxDataOverall =[];
			for(var index=0; index < taxDataOverallConfigOverall.length; index++){
				for(var counter=0; counter < taxOnTaxConfigOverall.length; counter++){
					if((taxDataOverallConfigOverall[index].charge_code == taxOnTaxConfigOverall[counter].charge_code) && (taxDataOverallConfigOverall[index].addl_charge_ind == taxOnTaxConfigOverall[counter].charge_ind) && (taxDataOverallConfigOverall[index].charge_category == taxOnTaxConfigOverall[counter].charge_category)){
						taxDataOverallConfigOverall[index].parent_code = taxOnTaxConfigOverall[counter].parent_code;
						taxOnTaxDataOverall.push(taxDataOverallConfigOverall[index]);
					} else {
						taxDataOverall.push(taxDataOverallConfigOverall[index]);
					}
				}
			}
		} else {
			var taxDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
		}
		var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		var applicableAmount = parseFloat(taxAmount) - parseFloat(overallDiscount[0].amount);
		if (taxDataOverall.length != 0) {
			for (i = 0; i < taxDataOverall.length; i++) {
				if(taxDataOverall[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(taxDataOverall[i].percentage) * parseFloat(applicableAmount)) / 100).toString();
					taxDataOverall[i].set("applicable_on_amount", (applicableAmount).toString());
					taxDataOverall[i].set("amount", amount);
				} else {
					if(parseFloat(taxDataOverall[i].amount) > applicableAmount){
						taxDataOverall[i].set("amount", applicableAmount);
					}
				}
			}
		}

		if(taxOnTaxDataOverall.length != 0){
			var taxDataOverallUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD";
			});
			for(var index=0; index < taxDataOverallUpdated.length; index++){
				for(var counter=0; counter < taxOnTaxDataOverall.length; counter++){
					if((taxDataOverallUpdated[index].charge_code == taxOnTaxDataOverall[counter].charge_code) && (taxDataOverallUpdated[index].addl_charge_ind == taxOnTaxDataOverall[counter].addl_charge_ind) && (taxDataOverallUpdated[index].charge_category == taxOnTaxDataOverall[counter].charge_category)){
						var taxOnTaxUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
							return data.item_code == "OVERALL" && data.charge_code != "DISCOUNT" && data.charge_category == "STD" && data.charge_code == taxOnTaxDataOverall[counter].parent_code;
						});
						if(taxOnTaxUpdated.length != 0){
							if(taxDataOverallUpdated[index].percentage_amount_ind == "P"){
								var amount = ((parseFloat(taxDataOverallUpdated[index].percentage) * parseFloat(taxOnTaxUpdated[0].amount)) / 100).toString();
								taxDataOverallUpdated[index].set("applicable_on_amount", (taxOnTaxUpdated[0].amount).toString());
								taxDataOverallUpdated[index].set("amount", amount);
							} else {
								taxDataOverallUpdated[index].set("amount", parseFloat(taxOnTaxUpdated[0].amount));
							}
						}
					}
				}
			}
		}

		var addlChargeData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
		});
		if (addlChargeData.length != 0) {
			for (i = 0; i < addlChargeData.length; i++) {
				var itemGrossAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data.item_code == taxData[i].item_code;
				});
				var itemGross = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
					return data;
				});
				var overallAmount = 0.00;
				for(var index = 0; index <  itemGross.length; index++){
					overallAmount += parseFloat( itemGross[index].gross_amount);
				}
				var addlChargeApplicableAmount = parseFloat(itemGrossAmount[0].gross_amount) - ((parseFloat(itemGrossAmount[0].gross_amount) * (parseFloat(overallDiscount[0].amount) * 100 / overallAmount))/100);
				if(addlChargeData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlChargeData[i].percentage) * parseFloat(addlChargeApplicableAmount)) / 100).toString();
					addlChargeData[i].set("applicable_on_amount", (addlChargeApplicableAmount).toString());
					addlChargeData[i].set("amount", amount);
				} else {
					if(parseFloat(addlChargeData[i].amount) > addlChargeApplicableAmount){
						addlChargeData[i].set("amount", addlChargeApplicableAmount);
					}
				}
			}
		}

		var addlChargeDataUpdated = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code != "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
		});		
		if(addlChargeDataUpdated.length != 0){		
			for(var i=0; i < addlChargeDataUpdated.length; i++){	
				var addlTaxData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
					return data.item_code == addlChargeDataUpdated[i].item_code && data.addl_charge_ind == "T" && data.charge_category == addlChargeDataUpdated[i].charge_category;
				});
				if(addlTaxData.length != 0){
					for (var j = 0; j < addlTaxData.length; j++) {
						if(addlTaxData[j].percentage_amount_ind == "P"){
							var addlTaxAmount = ((parseFloat(addlTaxData[j].percentage) * parseFloat(addlChargeDataUpdated[i].amount)) / 100).toString();
							addlTaxData[j].set("applicable_on_amount", addlChargeDataUpdated[i].amount);
							addlTaxData[j].set("amount", addlTaxAmount);
						} else {
							if(parseFloat(addlTaxData[j].amount) > parseFloat(addlChargeDataUpdated[i].amount)){
								addlTaxData[j].set("amount", addlChargeDataUpdated[i].amount);
							}
						}
					}
				}
			}
		}

		var addlChargeDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
		});
		if(addlChargeDataOverall.length != 0){
			var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(), function(data){
				return data;
			});
			var taxAmount = 0.00;
			if (overallTaxAmount.length != 0) {
				for(var index = 0; index < overallTaxAmount.length; index++){
					taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
				}
			}
			
			var addlChargeApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(overallDiscount[0].amount);
			if (addlChargeDataOverall.length != 0) {
				for (i = 0; i < addlChargeDataOverall.length; i++) {
					if(addlChargeDataOverall[i].percentage_amount_ind == "P"){
						var amount = ((parseFloat(addlChargeDataOverall[i].percentage) * parseFloat(addlChargeApplicableOverallAmount)) / 100).toString();
						addlChargeDataOverall[i].set("applicable_on_amount", (addlChargeApplicableOverallAmount).toString());
						addlChargeDataOverall[i].set("amount", amount);
					} else {
						if(parseFloat(addlChargeDataOverall[i].amount) > addlChargeApplicableOverallAmount){
							addlChargeDataOverall[i].set("amount", addlChargeApplicableOverallAmount);
						}
					}
				}
			}
			
			var addlChargeDataUpdatedOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
				return data.item_code == "OVERALL" && data.addl_charge_ind == "A" && data.charge_category != "STD";
			});		
				
			if(addlChargeDataUpdatedOverall.length != 0){	
				for(i=0; i < addlChargeDataUpdatedOverall.length; i++){	
					var addlTaxDataOverall = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
						return data.item_code == addlChargeDataUpdatedOverall[i].item_code && data.addl_charge_ind == "T" && data.charge_category == addlChargeDataUpdatedOverall[i].charge_category;
					});
					if(addlTaxDataOverall.length != 0){
						for (j = 0; j < addlTaxDataOverall.length; j++) {
							if(addlTaxDataOverall[j].percentage_amount_ind == "P"){
								var addlTaxAmount = ((parseFloat(addlTaxDataOverall[j].percentage) * parseFloat(addlChargeDataUpdatedOverall[i].amount)) / 100).toString();
								addlTaxDataOverall[j].set("applicable_on_amount", addlChargeDataUpdatedOverall[i].amount);
								addlTaxDataOverall[j].set("amount", addlTaxAmount);
							} else {
								if(parseFloat(addlTaxDataOverall[j].amount) > parseFloat(addlChargeDataUpdatedOverall[i].amount)){
									addlTaxDataOverall[j].set("amount", addlChargeDataUpdatedOverall[i].amount);
								}
							}
						}
					}
				}
			}						
		}
	}
	
	var addlDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
		return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "OEMDISC";
	});
	if(addlDiscountData.length != 0){
		var overallTaxAmount = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_1.dataSource.data(),function(data){
			return data;
		});
		var taxAmount = 0.00;
		if (overallTaxAmount.length != 0) {
			for(var index = 0; index < overallTaxAmount.length; index++){
				taxAmount += parseFloat(overallTaxAmount[index].gross_amount);
			}
		}
		
		var overallDiscountData = $.grep(manage_customer_order_master_service_spares_edit.variable.custom.grid_2.dataSource.data(), function (data) {
			return data.item_code == "OVERALL" && data.addl_charge_ind == "D" && data.charge_code == "DISCOUNT";
		});
		var discountAmount = 0.00;
		if (overallDiscountData.length != 0) {
			for(var index = 0; index < overallDiscountData.length; index++){
				discountAmount += parseFloat(overallDiscountData[index].amount);
			}
		}
		
		var addlDiscountDataApplicableOverallAmount = parseFloat(taxAmount) - parseFloat(discountAmount);
		if (addlDiscountData.length != 0) {
			for (i = 0; i < addlDiscountData.length; i++) {
				if(addlDiscountData[i].percentage_amount_ind == "P"){
					var amount = ((parseFloat(addlDiscountData[i].percentage) * parseFloat(addlDiscountDataApplicableOverallAmount)) / 100).toString();
					addlDiscountData[i].set("applicable_on_amount", (addlDiscountDataApplicableOverallAmount).toString());
					addlDiscountData[i].set("amount", amount);
				} else {
					if(parseFloat(addlDiscountData[i].amount) > addlDiscountDataApplicableOverallAmount){
						addlDiscountData[i].set("amount", addlDiscountDataApplicableOverallAmount);
					}
				}
			}
		}						
	}
	
}

function fn_taxation_customer_order_service_spares_generate_draft() {
	var stateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state</search_field_1></inputparam>"
		}
	});
	var consigneeStateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state</search_field_1></inputparam>"
		}
	});
	var buyerStateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state</search_field_1></inputparam>"
		}
	});
	if(generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info != undefined){
		var taxDisplayArray = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info, function (data, index) {
			return data.record_type == "D";
		});
		var taxTotalData = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info, function (data, index) {
			return data.record_type == "S";
		});
	}	
	stateType.read();
	consigneeStateType.read();
	buyerStateType.read();
	var sellerAddress = generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_1;
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2 != ""){
		sellerAddress = sellerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_3 != ""){
		sellerAddress = sellerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_3;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_pincode != ""){
			sellerAddress = sellerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + "-" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_pincode;
		} else {
			sellerAddress = sellerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city;
		}
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc != ""){
		sellerAddress = sellerAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc != ""){
			sellerAddress = sellerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc;
		} else {
			sellerAddress = sellerAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc;
		}
	}
	var buyerAddress = generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_1;
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_2 != ""){
		buyerAddress = buyerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_2;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_3 != ""){
		buyerAddress = buyerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_3;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_pincode != ""){
			buyerAddress = buyerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city + "-" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_pincode;
		} else {
			buyerAddress = buyerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city;
		}
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc != ""){
		buyerAddress = buyerAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc != ""){
			buyerAddress = buyerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc;
		} else {
			buyerAddress = buyerAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc;
		}
	}
	var consigneeAddress = generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_1;
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_2 != ""){
		consigneeAddress = consigneeAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_2;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_3 != ""){
		consigneeAddress = consigneeAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_3;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_pincode != ""){
			consigneeAddress = consigneeAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city + "-" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_pincode;
		} else {
			consigneeAddress = consigneeAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city;
		}
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc != ""){
		consigneeAddress = consigneeAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc != ""){
			consigneeAddress = consigneeAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc;
		} else {
			consigneeAddress = consigneeAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc;
		}
	}
	var content = '<div id = "generate_customer_order_spares_pdf_content" style = "width:539px; font-size: small;position:relative;">';
	content += '<div style="position:absolute;opacity: 0.10;font-size: 150px;margin-top:300px;transform: rotate(300deg);">DRAFT</div>';
	content += '<div style = "text-align: center; margin-bottom:3px;" >';
	content += '<span style = "font-weight: bold;" >ORDER ACCEPTANCE</span>';
	content += '</div>';
	content += '<table width = "100%" style="border : 1px solid; table-layout: fixed; word-wrap: break-word; font-size: x-small;">';
	content += '<tr style = "vertical-align:top;">';
	content += '<td style = "font-size: small; padding-left: 2px; padding-bottom: 2px; border-right: 1px solid; border-bottom: 1px solid;" rowspan = "2" colspan = "46"><div><span style = "font-weight: bold;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + '</span></br><span style="font-weight: bold;">Authorized dealer of Kirloskar Pneumatics Co Ltd.</span></br>' + sellerAddress + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">Contact #</span>: ' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_contact_no + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">E-Mail Id</span>: ' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_email_id + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">GSTIN #</span>: ' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].product_udf_char_1 + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">State Code</span>: ' + stateType.data()[0].state_number + '</div></td>';
	content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div><span style = "font-weight: bold;">Customer Order No</span><div style = "float:right;"></div></div></br><div><span>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_no + '</span><div style = "float:right;"><span></span></div></div></td>';
	content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px; " colspan = "27"><div><span style = "font-weight: bold;">Dated</span></div></br><div><span>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_date + '</span></div></td>';
	content += '</tr>';
	content += '<tr style = "vertical-align:top;">';
	content += '<td style = "border-right: 1px solid;border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div><span style = "font-weight: bold;">Mode / Terms of Payment</span></div></br><div><span>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].payment_terms + '</span></div></td>';
	content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div><span style = "font-weight: bold;">Terms of Delivery</span></div></br><div><span>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].delivery_terms + '</span></div></td>';
	content += '</tr>';	
	content += '<tr style = "vertical-align:top;">';
	content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" rowspan = "2" colspan = "46"><div><span style = "font-weight: bold;">Bill To</span></br><span>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_id_desc + '</span></br>' + buyerAddress + '</br>' + '<span style="font-weight: bold; display: inline-block; width: 75px;">GSTIN #</span>: ' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_gst_no + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">State Code</span>: ' + buyerStateType.data()[0].state_number + '</div></td>';
	content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div><span style = "font-weight: bold;">Despatched Through</span></div></br><div><span>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].despatch_mode_road_rail + '</span></div></td>';
	content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div><span style = "font-weight: bold;">Remarks</span></div></br><div><span>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_summary_comments + '</span></div></td>';
	content += '</tr>';
	content += '<tr style = "vertical-align:top;">';
	content += '<td style = "border-right: 1px solid;border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div><span style = "font-weight: bold;">Place of Despatch</span></div></br><div><span>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].place_of_despatch + '</span></div></td>';
	content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div><span style = "font-weight: bold;">Destination</span></div></br><div><span>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].destination + '</span></div></td>';
	content += '</tr>';
	content += '<tr style = "height:90px;vertical-align:top;">';
	content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" colspan = "46"><div><span style = "font-weight: bold;">Ship To</span></br> <span>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_id_desc + '</span></br>' + consigneeAddress + '</br>' + '<span style="font-weight: bold; display: inline-block; width: 75px;">GSTIN #</span>: ' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_gst_no + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">State Code</span>: ' + consigneeStateType.data()[0].state_number + '</div></td>';
	content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "54"><div style = "font-size: small;"><span style = "font-weight: bold;">Terms and Conditions</span></br><span style = "white-space: pre-wrap;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_terms_conditions + '</span></div></td>';
	content += '</tr>';
	content += '<tr style = "text-align:center;">';
	content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "4" >Sl</br>No</td>';
	content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "30">Description of Goods</td>';
	content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "10">HSN Code</td>';
	content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "5">GST Rate</td>';
	content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "10">Quantity</td>';
	content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "17" >Rate</td>';
	content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "7" >per</td>';
	content += '<td style = "font-weight: bold; border-bottom: 1px solid;" colspan = "17">Amount</td>';
	content += '</tr>';
	for (var index in generate_customer_order_spares_pdf.variable.custom.outputparam_detail) {
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_sl_no + '</td>';
		if(generate_customer_order_spares_pdf.variable.custom.outputparam_item_addninfo != undefined){
			var itemData =  generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code;
			var accessoryDetail = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_item_addninfo, function (accessoryInfo, index) {
				if (accessoryInfo.customer_order_item_code == itemData) {
					return accessoryInfo;
				}
			});
			if(accessoryDetail.length != 0){
				var accessoryString = " [ "; 
				for(counter = 0; counter < accessoryDetail.length; counter++){ 
					accessoryString += (counter+1) + "." + accessoryDetail[counter].accessory_item_description + "</br>";
				}
				accessoryString = accessoryString.substring(0, accessoryString.length - 5) + " ]";
				content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; padding-left : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</br>' + accessoryString + '<div style = "padding-bottom : 5px;"></div></td>';
			} else {
				content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; padding-left : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + '<div style = "padding-bottom : 5px;"></div></td>';
			}
		} else {
			content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; padding-left : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + '<div style = "padding-bottom : 5px;"></div></td>';
		}
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; padding-left : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].product_udf_char_1 + '</td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; padding-left : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].gst_tax_rate + '%</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].net_quantity + '</td>';
		content += '<td colspan = "17"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;padding-right : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].std_rate + '</td>';
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].uom_code + '</td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].gross_amount) + '</td>';
		content += '</tr>';
		var itemCode = generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code;
		for (var indicator = parseInt(index) + 1; indicator < generate_customer_order_spares_pdf.variable.custom.outputparam_detail.length; indicator++) {
			if (itemCode == generate_customer_order_spares_pdf.variable.custom.outputparam_detail[indicator].item_code) {
				itemCode = "";
			}
		}
		var lineitemArray = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail, function (lineitemTaxDetails, index) {
			if ((lineitemTaxDetails.item_code != "OVERALL") && (lineitemTaxDetails.item_code == itemCode) && (lineitemTaxDetails.charge_subcode != "CGST") && (lineitemTaxDetails.charge_subcode != "UTGST") && (lineitemTaxDetails.charge_subcode != "SGST") && (lineitemTaxDetails.charge_subcode != "IGST")) {
				return lineitemTaxDetails;
			}
		});
		for (var index in lineitemArray) {
			content += '<tr style = "height:20px;">';
			content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
			content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + lineitemArray[index].charge_description;
			if (lineitemArray[index].percentage_amount_ind == "P") {
				content += ' (%)';
			} else {
				content += ' (Amt)';
			}
			content += '</td>';
			content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
			content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
			content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
			if (lineitemArray[index].percentage_amount_ind == "A") {
				content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + lineitemArray[index].amount + '</td>';
			} else {
				content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + lineitemArray[index].percentage + '</td>';
			}
			content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
			content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + '</td>';
			content += '</tr>';
		}
	}
	var overallItemArray = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (lineitemTaxDetails, index) {
			if ((lineitemTaxDetails.item_code == "OVERALL") && (lineitemTaxDetails.charge_subcode != "CGST") && (lineitemTaxDetails.charge_subcode != "UTGST") && (lineitemTaxDetails.charge_subcode != "SGST") && (lineitemTaxDetails.charge_subcode != "IGST") && (lineitemTaxDetails.charge_code != "OEMDISC")) {
				return lineitemTaxDetails;
			}
		});
	for (var index in overallItemArray) {
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">OVERALL ' + overallItemArray[index].charge_description;
		if (overallItemArray[index].percentage_amount_ind == "P") {
			content += ' (%)';
		} else {
			content += ' (Amt)';
		}
		content += '</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		if (overallItemArray[index].percentage_amount_ind == "A") {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallItemArray[index].amount + '</td>';
		} else {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallItemArray[index].percentage + '</td>';
		}
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		if (overallItemArray[index].charge_code == "DISCOUNT") {
			content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">- ' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(overallItemArray[index].amount) + '</td>';
		} else {
			content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(overallItemArray[index].amount) + '</td>';
		}
		content += '</tr>';
	}
	if((generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info != undefined) && (taxTotalData.length != 0)){
		if (generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state == generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state) {
			content += '<tr style = "height:20px;">';
			content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
			content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">CGST</td>';
			content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
			content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
			content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
			content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;"></td>';
			content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].cgst_tax_amount) + '</td>';
			content += '</tr>';
			content += '<tr style = "height:20px;">';
			content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
			if(stateType.data()[0].state_type == "UT"){
				content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">UTGST</td>';
			} else {
				content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">SGST</td>';
			}
			content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
			content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
			content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
			content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;"></td>';
			content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].sgst_utgst_tax_amount) + '</td>';
			content += '</tr>';
		} else {
			content += '<tr style = "height:20px;">';
			content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
			content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">IGST</td>';
			content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
			content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
			content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
			content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;"></td>';
			content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].igst_tax_amount) + '</td>';
			content += '</tr>';
		}
	}
	var overallItemArray = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (lineitemTaxDetails, index) {
			if ((lineitemTaxDetails.item_code == "OVERALL") && (lineitemTaxDetails.charge_subcode != "CGST") && (lineitemTaxDetails.charge_subcode != "UTGST") && (lineitemTaxDetails.charge_subcode != "SGST") && (lineitemTaxDetails.charge_subcode != "IGST") && (lineitemTaxDetails.charge_code == "OEMDISC")) {
				return lineitemTaxDetails;
			}
		});
	for (var index in overallItemArray) {
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">OVERALL ' + overallItemArray[index].charge_description;
		if (overallItemArray[index].percentage_amount_ind == "P") {
			content += ' (%)';
		} else {
			content += ' (Amt)';
		}
		content += '</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		if (overallItemArray[index].percentage_amount_ind == "A") {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallItemArray[index].amount + '</td>';
		} else {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallItemArray[index].percentage + '</td>';
		}
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">- ' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(overallItemArray[index].amount) + '</td>';
		content += '</tr>';
	}
	content += '<tr style = "height:30px;">';
	content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid;"></td>';
	content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid;"></td>';
	content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid;"></td>';
	content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid;"></td>';
	content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid;"></td>';
	content += '<td colspan = "17"  style = "padding-top : 2px;border-right: 1px solid;"></td>';
	content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid;"></td>';
	content += '<td colspan = "17"></td>';
	content += '</tr>';
	content += '<tr style = "height:20px;">';
	content += '<td colspan = "4"  style = "padding-top : 2px; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;" ></td>';
	content += '<td colspan = "30" style = "padding-top : 2px; text-align:right; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;padding-right : 2px; font-weight: bold;">Total</td>';
	content += '<td colspan = "10" style = "padding-top : 2px; text-align:right; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;padding-right : 2px;"></td>';
	content += '<td colspan = "5" style = "padding-top : 2px; text-align:right; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;padding-right : 2px;"></td>';
	content += '<td colspan = "10" style = "padding-top : 2px; text-align:right; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;"></td>';
	content += '<td colspan = "17"  style = "padding-top : 2px; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;"></td>';
	content += '<td colspan = "7"  style = "padding-top : 2px; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;"></td>';
	content += '<td colspan = "17" style = "padding-top : 2px; text-align:right; font-weight: bold; border-bottom: 1px solid; border-top: 1px solid;padding-right : 2px;">' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_net_amount) + '</td>';
	content += '</tr>';
	content += '<tr>';
	content += '<td colspan = "100" style = "border-bottom-style: hidden; padding-left : 2px;" >Amount Chargeable (in words)<span style = "float:right;">E.&O.E </span></td>';
	content += '</tr>';
	content += '<tr>';
	content += '<td colspan = "100" style = "border-bottom-style: hidden; font-weight: bold; padding-left : 2px;">' + generate_customer_order_spares_pdf.customRequirementHandler.wordFormat(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_net_amount, generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + '</td>';
	content += '</tr>';
	content += '<tr style = "height:30px;">';
	content += '<td colspan = "100" ></td>';
	content += '</tr>';
	if((generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info != undefined) && (taxTotalData.length != 0)){
		if (generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state == generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state) {
			var totalAmountInWords = Math.round(parseFloat(taxTotalData[0].cgst_tax_amount) + parseFloat(taxTotalData[0].sgst_utgst_tax_amount)).toString();
			content += '<tr style = "border-top: 1px solid; text-align:center;">';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "40" rowspan = "2">HSN/SAC Code</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "12" rowspan = "2">Taxable Value</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "24">Central Tax</td>';
			if(stateType.data()[0].state_type == "UT"){
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "24" >Union Territory Tax</td>';
			} else {
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "24" >State Tax</td>';
			}
			content += '</tr>';
			content += '<tr style = "text-align:center;">';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "12">Rate</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "12" >Amount</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "12">Rate</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "12" >Amount</td>';
			content += '</tr>';
			for (var index in taxDisplayArray) {
				content += '<tr>';
				content += '<td style = "border-right: 1px solid; text-align:left; padding-left: 2px; padding-top: 2px;" colspan = "40">' + taxDisplayArray[index].hsn_sac_code + '</td>';
				content += '<td style = "border-right: 1px solid; text-align:right; padding-right: 2px; padding-top: 2px;" colspan = "12">' + taxDisplayArray[index].taxable_value + '</td>';
				content += '<td style = "border-right: 1px solid; text-align:right; padding-right: 2px; padding-top: 2px;" colspan = "12">' + taxDisplayArray[index].cgst_tax_rate + '%</td>';
				content += '<td style = "border-right: 1px solid; text-align:right; padding-right: 2px; padding-top: 2px;" colspan = "12" >' + taxDisplayArray[index].cgst_tax_amount + '</td>';
				content += '<td style = "border-right: 1px solid; text-align:right; padding-right: 2px; padding-top: 2px;" colspan = "12">' + taxDisplayArray[index].sgst_utgst_tax_rate + '%</td>';
				content += '<td style = "border-right: 1px solid; text-align:right; padding-right: 2px; padding-top: 2px;" colspan = "12" >' + taxDisplayArray[index].sgst_utgst_tax_amount + '</td>';
				content += '</tr>';
			}
			content += '<tr style = "height:5px;">';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "40"></td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "12"></td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "12"></td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "12" ></td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "12"></td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "12" ></td>';
			content += '</tr>';
			content += '<tr style = "height:20px;">';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;" colspan = "40">Total</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;" colspan = "12">' + taxTotalData[0].taxable_value + '</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "12"></td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;" colspan = "12" >' + taxTotalData[0].cgst_tax_amount + '</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "12"></td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;" colspan = "12" >' + taxTotalData[0].sgst_utgst_tax_amount + '</td>';
			content += '</tr>';
		} else {
			var totalAmountInWords = Math.round(parseFloat(taxTotalData[0].igst_tax_amount)).toString();
			content += '<tr style = "border-top: 1px solid; text-align:center;">';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "40" rowspan = "2">HSN/SAC Code</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "12" rowspan = "2">Taxable Value</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "48">Integrated Tax</td>';
			content += '</tr>';
			content += '<tr style = "text-align:center;">';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "24">Rate</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; font-weight: bold;" colspan = "24" >Amount</td>';
			content += '</tr>';
			for (var index in taxDisplayArray) {
				content += '<tr>';
				content += '<td style = "border-right: 1px solid; text-align:left; padding-left: 2px; padding-top: 2px;" colspan = "40">' + taxDisplayArray[index].hsn_sac_code + '</td>';
				content += '<td style = "border-right: 1px solid; text-align:right; padding-right: 2px; padding-top: 2px;" colspan = "12">' + taxDisplayArray[index].taxable_value + '</td>';
				content += '<td style = "border-right: 1px solid; text-align:right; padding-right: 2px; padding-top: 2px;" colspan = "24">' + taxDisplayArray[index].igst_tax_rate + '%</td>';
				content += '<td style = "border-right: 1px solid; text-align:right; padding-right: 2px; padding-top: 2px;" colspan = "24" >' + taxDisplayArray[index].igst_tax_amount + '</td>';
			}
			content += '<tr style = "height:5px;">';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "40"></td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "12"></td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "24"></td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "24" ></td>';
			content += '</tr>';
			content += '<tr style = "height:20px;">';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;" colspan = "40">Total</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;" colspan = "12">' + taxTotalData[0].taxable_value + '</td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "24"></td>';
			content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;" colspan = "24" >' + taxTotalData[0].igst_tax_amount + '</td>';
			content += '</tr>';
		}

		content += '<tr>';
		content += '<td colspan = "100" style = "border-bottom-style: hidden; padding-left : 2px;" >Tax Amount (in words):</br><span style = "font-weight: bold;">' + generate_customer_order_spares_pdf.customRequirementHandler.wordFormat(totalAmountInWords, generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + '</span></td>';
		content += '</tr>';
		content += '<tr style = "height:10px;">';
		content += '<td colspan = "100" ></td>';
		content += '</tr>';
	}
	content += '<tr style = "padding:2px;">';
	content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;"></td>';
	content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;"></td>';
	content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden;"></td>';
	content += '<td colspan = "50" style = "border-bottom-style: hidden; border-left-style: hidden; font-weight: bold;">Companys Bank Details</td>';
	content += '</tr>';
	content += '<tr style = "padding:2px;">';
	content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;"></td>';
	content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;"></td>';
	content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden;"></td>';
	content += '<td colspan = "18" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">Bank Name</td>';
	content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
	content += '<td colspan = "30" style = "border-bottom-style: hidden;border-left-style: hidden;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code1 + '</td>';
	content += '</tr>';
	content += '<tr style = "padding:2px;">';
	content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;"></td>';
	content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;"></td>';
	content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden;"></td>';
	content += '<td colspan = "18" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">A/c No</td>';
	content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
	content += '<td colspan = "30" style = "border-bottom-style: hidden;border-left-style: hidden;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code2 + '</td>';
	content += '</tr>';
	content += '<tr style = "padding:2px;">';
	content += '<td colspan = "50" style = "border-bottom-style: hidden; padding-left : 2px;"><span style = "border-bottom : 1px solid; padding:1px; font-weight: bold;">Declaration</span></td>';
	content += '<td colspan = "18" style = "border-left-style: hidden; font-weight: bold;">Branch & IFS Code</td>';
	content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
	var amber = " & ";
	if (generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 == "") {
		var amber = "";
	}
	content += '<td colspan = "30" style = "border-left-style: hidden;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code3 + amber + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 + '</td>';
	content += '</tr>';
	content += '<tr style = "padding:2px;">';
	content += '<td colspan = "50" rowspan = "2" style = "border-bottom-style: hidden;padding-left : 2px;padding-bottom : 2px;padding-top : 4px;">Certified that the particulars given above are true & </br> correct & the amount indicated represents the price</br>actually charged & that there is no flow of additional</br> consideration directly or indirectly from the buyer.</td>';
	content += '<td colspan = "50" style = "border-left: 1px solid; border-top: 1px solid; border-bottom-style: hidden;text-align: end;vertical-align: top; font-weight: bold;padding-right : 2px;">for ' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + '</td>';
	content += '</tr>';
	content += '<tr style = "padding:2px;">';
	content += '<td colspan = "50" style = "padding-bottom:2px; border-left: 1px solid; border-bottom-style: hidden;text-align: end;vertical-align: bottom;padding-right : 2px; font-weight: bold;">Authorized Signatory</td>';
	content += '</tr>';
	content += '<tr style = "padding:2px;">';
	content += '<td colspan = "100" ></td>';
	content += '</tr>';
	content += '</table>';
	content += '<div style = "margin-top:2px;text-align: center; font-size: x-small; text-transform: uppercase;">SUBJECT TO ' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + ' JURISDICTION</div>';
	content += '<div style = "margin-top:2px;text-align: center; font-size: x-small;">This is a Computer Generated Customer Order and does not require signature.</div>';
	content += '</div>';
	return content;
	
}

function fn_taxation_customer_order_service_spares_generate_pdf (){
	var stateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state</search_field_1></inputparam>"
		}
	});
	var consigneeStateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state</search_field_1></inputparam>"
		}
	});
	var buyerStateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state</search_field_1></inputparam>"
		}
	});
	if(generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info != undefined){
		var taxDisplayArray = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info, function (data, index) {
			return data.record_type == "D";
		});
		var taxTotalData = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info, function (data, index) {
			return data.record_type == "S";
		});
	}
	stateType.read();
	consigneeStateType.read();
	buyerStateType.read();
	var sellerAddress = generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_1;
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2 != ""){
		sellerAddress = sellerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_3 != ""){
		sellerAddress = sellerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_3;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_pincode != ""){
			sellerAddress = sellerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + "-" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_pincode;
		} else {
			sellerAddress = sellerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city;
		}
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc != ""){
		sellerAddress = sellerAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc != ""){
			sellerAddress = sellerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc;
		} else {
			sellerAddress = sellerAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc;
		}
	}
	var buyerAddress = generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_1;
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_2 != ""){
		buyerAddress = buyerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_2;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_3 != ""){
		buyerAddress = buyerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_3;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_pincode != ""){
			buyerAddress = buyerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city + "-" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_pincode;
		} else {
			buyerAddress = buyerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city;
		}
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc != ""){
		buyerAddress = buyerAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc != ""){
			buyerAddress = buyerAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc;
		} else {
			buyerAddress = buyerAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc;
		}
	}
	var consigneeAddress = generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_1;
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_2 != ""){
		consigneeAddress = consigneeAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_2;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_3 != ""){
		consigneeAddress = consigneeAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_3;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_pincode != ""){
			consigneeAddress = consigneeAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city + "-" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_pincode;
		} else {
			consigneeAddress = consigneeAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city;
		}
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc != ""){
		consigneeAddress = consigneeAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc;
	}
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc != ""){
		if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc != ""){
			consigneeAddress = consigneeAddress + "," + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc;
		} else {
			consigneeAddress = consigneeAddress + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc;
		}
	}
	var content = "<!DOCTYPE html><html><head>";
	content += "<style>table { page-break-after:auto }tr { page-break-inside:avoid; page-break-after:auto } thead { display:table-header-group }tfoot { display:table-footer-group }</style>";
	content += "</head><body>";
	content += "<div style='width:1000px; font-size: large;'>";
	content += "<mserviceheader>";
	if (generate_customer_order_spares_pdf.variable.custom.imageData1 != undefined) {
		content += "<img style = 'margin-left:6px; width: 100px; height: 50px; vertical-align: -20px;' src =" + generate_customer_order_spares_pdf.variable.custom.imageData1 + "/>";
	} else {
		content += "<img style = 'margin-left:6px; width: 100px; height: 50px; vertical-align: -20px;' src =" + "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC" + "/>";
	}
	content += "<span style='font-weight: bold;margin-left: 275px; height:50px; text-align: center; font-size: large;'>ORDER ACCEPTANCE</span>";
	/*if (generate_customer_order_spares_pdf.variable.custom.imageData2 != undefined) {
		content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;float:right;' src =" + generate_customer_order_spares_pdf.variable.custom.imageData2 + "/>";
	}*/
	content += "<hr style='margin-left:6px; margin-bottom:5px;'/>";
	content += "</mserviceheader>";
	content += "<div style='padding-top:10px;'>";
	content += "<table width='100%' border='1px' style='table-layout: fixed; word-wrap: break-word; font-size: large;border-collapse:collapse;'>";
	content += "<tr style='vertical-align:top;'>";
	content += "<td style='font-size: large; padding-left: 2px; padding-bottom: 2px;'rowspan='2'colspan='46'><div><span style='font-weight: bold;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + "</span></br><span style='font-weight: bold;'>Authorized dealer of Kirloskar Pneumatics Co Ltd.</span></br>" + sellerAddress + "</br><span style='font-weight: bold; display: inline-block; width: 90px;'>Contact #</span>: " + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_contact_no + "</br><span style='font-weight: bold; display: inline-block; width: 90px;'>E-Mail Id</span>: " + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_email_id + "</br><span style='font-weight: bold; display: inline-block; width: 90px;'>GSTIN #</span>: " + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].product_udf_char_1 + "</br><span style='font-weight: bold; display: inline-block; width: 90px;'>State Code</span>: " + stateType.data()[0].state_number + "</div></td>";
	content += "<td style=' padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Customer Order No</span></div></br><div>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_no + "</div></td>";
	content += "<td style=' padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Dated</span></div></br><div>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_date + "</div></td>";
	content += "</tr>";
	content += "<tr style='vertical-align:top;'>";
	content += "<td style='padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Mode/Terms of Payment</span></div></br><div>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].payment_terms + "</div></td>";
	content += "<td style='padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Terms of Delivery</span></div></br><div>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].delivery_terms + "</div></td>";
	content += "</tr>";
	content += "<tr style='vertical-align:top;'>";
	content += "<td style='font-size: large;padding-left: 2px; padding-bottom: 2px;' rowspan='2' colspan='46'><div><span style='font-weight: bold;'>Bill To</span></br><span>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_id_desc + "</span></br>" + buyerAddress + "</br>" + "<span style='font-weight: bold; display: inline-block; width: 90px;'>GSTIN #</span>: " + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_gst_no + "</br><span style='font-weight: bold; display: inline-block; width: 90px;'>State Code</span>: " + buyerStateType.data()[0].state_number + "</div></td>";
	content += "<td style='padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Despatched Through</span></div></br><div>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].despatch_mode_road_rail + "</div></td>";
	content += "<td style='padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Remarks</span></div></br><div>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_summary_comments + "</div></td>";
	content += "</tr>";
	content += "<tr style='vertical-align:top;'>";
	content += "<td style='padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Place of Despatch</span></div></br><div>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].place_of_despatch + "</div></td>";
	content += "<td style='padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Destination</span></div></br><div>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].destination + "</div></td>";
	content += "</tr>";
	content += "<tr style='height:90px;vertical-align:top;'>";
	content += "<td style='font-size: large;padding-left: 2px; padding-bottom: 2px;' colspan='46'><div><span style='font-weight: bold;'>Ship To</span></br><span>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_id_desc + "</span></br>" +consigneeAddress + "</br>" + "<span style='font-weight: bold; display: inline-block; width: 90px;'>GSTIN #</span>: " + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_gst_no + "</br><span style='font-weight: bold; display: inline-block; width: 90px;'>State Code</span>: " + consigneeStateType.data()[0].state_number + "</div></td>";
	content += "<td style=' padding-left: 2px; padding-bottom: 2px;' colspan='54'><div style='font-size: large;'><span style='font-weight: bold;'>Terms and Conditions</span></br><span style='white-space: pre-wrap;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_terms_conditions + "</span></div></td>";
	content += "</tr>";
	content += "</table>";
	content += "<table width='100%'border='1px'style='table-layout: fixed; word-wrap: break-word; font-size: large;border-collapse:collapse;'>";
	content += "<thead style='margin-bottom:5px;margin-top:10px;'>";
	content += "<tr style='height:10px;'></tr>";
	content += "<tr style='text-align:center;'>";
	content += "<th style='font-weight: bold;' colspan='4'>Sl</br>No</td>";
	content += "<th style='font-weight: bold;' colspan='30'>Description of Goods</td>";
	content += "<th style='font-weight: bold;' colspan='10'>HSN Code</td>";
	content += "<th style='font-weight: bold;' colspan='5'>GST Rate</td>";
	content += "<th style='font-weight: bold;' colspan='10'>Quantity</td>";
	content += "<th style='font-weight: bold;' colspan='17'>Rate</td>";
	content += "<th style='font-weight: bold;' colspan='7'>per</td>";
	content += "<th style='font-weight: bold;' colspan='17'>Amount</td>";
	content += "</tr>";
	content += "</thead>";
	for (var index in generate_customer_order_spares_pdf.variable.custom.outputparam_detail) {
		content += "<tr style = 'height:20px;'>";
		content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_sl_no + "</td>";
		if(generate_customer_order_spares_pdf.variable.custom.outputparam_item_addninfo != undefined){
			var itemData =  generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code;
			var accessoryDetail = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_item_addninfo, function (accessoryInfo, index) {
				if (accessoryInfo.customer_order_item_code == itemData) {
					return accessoryInfo;
				}
			});
			if(accessoryDetail.length != 0){
				var accessoryString = "<ul>"; 
				for(counter = 0; counter < accessoryDetail.length; counter++){ 
					accessoryString += "<li>" + accessoryDetail[counter].accessory_item_description + "</li>";
				}
				accessoryString = accessoryString + "</ul>";
				content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden; padding-left : 2px;'><span>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</span>&nbsp; along with</br>' + accessoryString + "<div style = 'padding-bottom : 5px;'></div></td>";
			} else {
				content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden; padding-left : 2px;'><span>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + "</span><div style = 'padding-bottom : 5px;'></div></td>";
			}
		} else {
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden; padding-left : 2px;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + "<div style = 'padding-bottom : 5px;'></div></td>";
		}		 
		content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].product_udf_char_1 + "</td>";
		content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].gst_tax_rate + "%</td>";
		content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].net_quantity + "</td>";
		content += "<td colspan = '17'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;padding-right : 2px;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].std_rate + "</td>";
		content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].uom_code + "</td>";
		content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].gross_amount) + "</td>";
		content += "</tr>";
		if(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
			var itemCode = generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code;
			for(var indicator = parseInt(index) + 1; indicator < generate_customer_order_spares_pdf.variable.custom.outputparam_detail.length;indicator++){
				if(itemCode == generate_customer_order_spares_pdf.variable.custom.outputparam_detail[indicator].item_code){
					itemCode = "";
				} 
			}
			var lineitemArray = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail,function(lineitemTaxDetails,index){
				if((lineitemTaxDetails.item_code != "OVERALL") && (lineitemTaxDetails.item_code == itemCode) && (lineitemTaxDetails.charge_subcode != "CGST") && (lineitemTaxDetails.charge_subcode != "UTGST") && (lineitemTaxDetails.charge_subcode != "SGST") && (lineitemTaxDetails.charge_subcode != "IGST")){
					return lineitemTaxDetails;
				}
			});
			for (var index in lineitemArray) {
				content += "<tr style = 'height:20px;'>";
				content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
				content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + lineitemArray[index].charge_description;
				if (lineitemArray[index].percentage_amount_ind == 'P') {
					content += " (%)";
				} else {
					content += " (Amt)";
				}
				content += "</td>";
				content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
				content += "<td colspan = '5'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
				content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
				if (lineitemArray[index].percentage_amount_ind == 'A') {
					content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + lineitemArray[index].amount + "</td>";
				} else {
					content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + lineitemArray[index].percentage + "</td>";
				}
				content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
				content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + "</td>";
				content += "</tr>";
			}
		}
		content += "<tr style='height:5px;'>";
		content += "<td colspan='4'  style='padding-top : 2px; border-bottom-style: hidden;'/>";
		content += "<td colspan='30' style='padding-top : 2px; border-bottom-style: hidden;'/>";
		content += "<td colspan='10' style='padding-top : 2px; border-bottom-style: hidden;'/>";
		content += "<td colspan='5'  style='padding-top : 2px; border-bottom-style: hidden;'/>";
		content += "<td colspan='10'  style='padding-top : 2px; border-bottom-style: hidden;'/>";
		content += "<td colspan='17' style='padding-top : 2px; border-bottom-style: hidden;'/>";
		content += "<td colspan='7'  style='padding-top : 2px; border-bottom-style: hidden;'/>";
		content += "<td colspan='17' style='padding-top : 2px; border-bottom-style: hidden;'/></br>";
		content += "</tr>";
	}
	if(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
		generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail,function(overallTaxDetails,index){
			if((overallTaxDetails.item_code == "OVERALL") && (overallTaxDetails.charge_subcode != "CGST") && (overallTaxDetails.charge_subcode != "UTGST") && (overallTaxDetails.charge_subcode != "SGST") && (overallTaxDetails.charge_subcode != "IGST") && (overallTaxDetails.charge_code != "OEMDISC")){
				return overallTaxDetails;
			}
		});
		for (var index in generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall) {
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>OVERALL " + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].charge_description;
			if (generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'P') {
				content += " (%)";
			} else {
				content += " (Amt)";
			}
			content += "</td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '5'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			if (generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'A') {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount + "</td>";
			} else {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage + "</td>";
			}
			content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			if (generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].charge_code == 'DISCOUNT') {
				content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>- " + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount) + "</td>";
			} else {
				content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount) + "</td>";
			}
			content += "</tr>";
		}
	}
	if((generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info != undefined) && (taxTotalData.length != 0)){
		if (generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state == generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state) {
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>CGST</td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].cgst_tax_amount) + "</td>";
			content += "</tr>";
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			if(stateType.data()[0].state_type == 'UT'){
				content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>UTGST</td>";
			} else {
				content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>SGST</td>";
			}
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].sgst_utgst_tax_amount) + "</td>";
			content += "</tr>";
		} else {
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>IGST</td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].igst_tax_amount) + "</td>";
			content += "</tr>";
		}
	}
	if(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
		generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail,function(overallTaxDetails,index){
			if((overallTaxDetails.item_code == "OVERALL") && (overallTaxDetails.charge_subcode != "CGST") && (overallTaxDetails.charge_subcode != "UTGST") && (overallTaxDetails.charge_subcode != "SGST") && (overallTaxDetails.charge_subcode != "IGST") && (overallTaxDetails.charge_code == "OEMDISC")){
				return overallTaxDetails;
			}
		});
		for (var index in generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall) {
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>OVERALL " + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].charge_description;
			if (generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'P') {
				content += " (%)";
			} else {
				content += " (Amt)";
			}
			content += "</td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '5'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			if (generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'A') {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount + "</td>";
			} else {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage + "</td>";
			}
			content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>- " + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount) + "</td>";
			content += "</tr>";
		}
	}
	content += "<tr style='height:30px;'>";
	content += "<td colspan='4'  style='padding-top : 2px;'/>";
	content += "<td colspan='30' style='padding-top : 2px;'/>";
	content += "<td colspan='10' style='padding-top : 2px;'/>";
	content += "<td colspan='5'  style='padding-top : 2px;'/>";
	content += "<td colspan='10'  style='padding-top : 2px;'/>";
	content += "<td colspan='17' style='padding-top : 2px;'/>";
	content += "<td colspan='7'  style='padding-top : 2px;'/>";
	content += "<td colspan='17' style='padding-top : 2px;'/>";
	content += "</tr>";
	content += "<tr style='height:20px;'>";
	content += "<td colspan='4'  style='padding-top : 2px; '/>";
	content += "<td colspan='30' style='padding-top : 2px; text-align:right; padding-right : 2px; font-weight: bold;'>Total</td>";
	content += "<td colspan='10' style='padding-top : 2px; '/>";
	content += "<td colspan='5'  style='padding-top : 2px; '/>";
	content += "<td colspan='10'  style='padding-top : 2px; '/>";
	content += "<td colspan='17' style='padding-top : 2px; '/>";
	content += "<td colspan='7'  style='padding-top : 2px; '/>";
	content += "<td colspan='17' style='padding-top : 2px; text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_net_amount) + "</td>";
	content += "</tr>";
	content += "<tfoot style='margin-bottom:5px;'>";
	content += "<tr>";
	content += "<td style='border-bottom-style: hidden' colspan='100'></td>";
	content += "</tr>";
	content += "</tfoot>";
	content += "</table>";
	content += "<table width='100%' border='1px' style='table-layout: fixed; word-wrap: break-word; font-size: large;border-collapse:collapse;'>";
	content += "<tr>";
	content += "<td colspan='100' style='border-top-style: hidden; border-bottom-style: hidden; padding-left : 2px;'>Amount Chargeable(in words)<span style='float:right;'>E.&O.E</span></td>";
	content += "</tr>";
	content += "<tr>";
	content += "<td colspan='100' style='border-bottom-style: hidden; font-weight: bold; padding-left : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.wordFormat(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_net_amount, generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + "</td>";
	content += "</tr>";
	content += "<tr style='height:30px; border-bottom-style: hidden;'>";
	content += "<td colspan='100'/>";
	content += "</tr>";
	content += "<tr style='height:2px;'>";
	content += "<td style=' border-bottom: 1px solid;'colspan='100'/>";
	content += "</tr>";
	content += "</table>";
	if((generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info != undefined) && (taxTotalData.length != 0)){
		if (generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state == generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_state) {
			var totalAmountInWords = Math.round(parseFloat(taxTotalData[0].cgst_tax_amount) + parseFloat(taxTotalData[0].sgst_utgst_tax_amount)).toString();
			content += "<table width='100%' border='1px' style='page-break-inside:avoid; padding-top:10px; table-layout: fixed; word-wrap: break-word; font-size: large;border-collapse:collapse;'>";
			content += "<thead>";
			content += "<tr style='height:10px;'></tr>";
			content += "<tr style='text-align:center;'>";
			content += "<th style='border-bottom: 1px solid; font-weight: bold;' colspan='40'rowspan='2'>HSN/SAC Code</th>";
			content += "<th style='border-bottom: 1px solid; font-weight: bold;' colspan='12'rowspan='2'>Taxable Value</th>";
			content += "<td style = ' border-bottom: 1px solid; font-weight: bold;' colspan = '24'>Central Tax</td>";
			if(stateType.data()[0].state_type == 'UT'){
				content += "<td style = ' border-bottom: 1px solid; font-weight: bold;' colspan = '24' >Union Territory Tax</td>";
			} else {
				content += "<td style = ' border-bottom: 1px solid; font-weight: bold;' colspan = '24' >State Tax</td>";
			}
			content += "</tr>";
			content += "<tr style = 'text-align:center;'>";
			content += "<td style = 'border-bottom: 1px solid; font-weight: bold;' colspan = '12'>Rate</td>";
			content += "<td style = 'border-bottom: 1px solid; font-weight: bold;' colspan = '12' >Amount</td>";
			content += "<td style = 'border-bottom: 1px solid; font-weight: bold;' colspan = '12'>Rate</td>";
			content += "<td style = 'border-bottom: 1px solid; font-weight: bold;' colspan = '12' >Amount</td>";
			content += "</tr>";
			content += "</thead>";
			for (var index in taxDisplayArray) {
				content += "<tr>";
				content += "<td style = 'border-bottom-style: hidden; text-align:left; padding-left: 2px; padding-top: 2px;' colspan = '40'>" + taxDisplayArray[index].hsn_sac_code + "</td>";
				content += "<td style = 'border-bottom-style: hidden; text-align:right; padding-right: 2px; padding-top: 2px;' colspan = '12'>" + taxDisplayArray[index].taxable_value + "</td>";
				content += "<td style = 'border-bottom-style: hidden; text-align:right; padding-right: 2px; padding-top: 2px;' colspan = '12'>" + taxDisplayArray[index].cgst_tax_rate + "%</td>";
				content += "<td style = 'border-bottom-style: hidden; text-align:right; padding-right: 2px; padding-top: 2px;' colspan = '12' >" + taxDisplayArray[index].cgst_tax_amount + "</td>";
				content += "<td style = 'border-bottom-style: hidden; text-align:right; padding-right: 2px; padding-top: 2px;' colspan = '12'>" + taxDisplayArray[index].sgst_utgst_tax_rate + "%</td>";
				content += "<td style = 'border-bottom-style: hidden; text-align:right; padding-right: 2px; padding-top: 2px;' colspan = '12' >" + taxDisplayArray[index].sgst_utgst_tax_amount + "</td>";
				content += "</tr>";
			}
			content += "<tr style = 'height:5px;'>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '40'></td>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '12'></td>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '12'></td>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '12' ></td>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '12'></td>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '12' ></td>";
			content += "</tr>";
			content += "<tr style = 'height:20px;'>";
			content += "<td style = 'border-bottom: 1px solid;text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;' colspan = '40'>Total</td>";
			content += "<td style = 'border-bottom: 1px solid; text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;' colspan = '12'>" + taxTotalData[0].taxable_value + "</td>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '12'></td>";
			content += "<td style = 'border-bottom: 1px solid; text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;' colspan = '12' >" + taxTotalData[0].cgst_tax_amount + "</td>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '12'></td>";
			content += "<td style = 'border-bottom: 1px solid; text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;' colspan = '12' >" + taxTotalData[0].sgst_utgst_tax_amount + "</td>";
			content += "</tr>";
		} else {
			var totalAmountInWords = Math.round(parseFloat(taxTotalData[0].igst_tax_amount)).toString();
			content += "<table width='100%' border='1px' style='page-break-inside:avoid; padding-top:10px; table-layout: fixed; word-wrap: break-word; font-size: large;border-collapse:collapse;'>";
			content += "<thead>";
			content += "<tr style='height:10px;'></tr>";
			content += "<tr style='text-align:center;'>";
			content += "<th style='border-bottom: 1px solid; font-weight: bold;' colspan='40'rowspan='2'>HSN/SAC Code</th>";
			content += "<th style='border-bottom: 1px solid; font-weight: bold;' colspan='12'rowspan='2'>Taxable Value</th>";
			content += "<td style = 'border-bottom: 1px solid; font-weight: bold;' colspan = '48'>Integrated Tax</td>";
			content += "</tr>";
			content += "<tr style = 'text-align:center;'>";
			content += "<td style = 'border-bottom: 1px solid; font-weight: bold;' colspan = '24'>Rate</td>";
			content += "<td style = 'border-bottom: 1px solid; font-weight: bold;' colspan = '24' >Amount</td>";
			content += "</tr>";
			content += "</thead>";
			for (var index in taxDisplayArray) {
				content += "<tr>";
				content += "<td style = 'border-bottom-style: hidden;text-align:left; padding-left: 2px; padding-top: 2px;' colspan = '40'>" + taxDisplayArray[index].hsn_sac_code + "</td>";
				content += "<td style = 'border-bottom-style: hidden;text-align:right; padding-right: 2px; padding-top: 2px;' colspan = '12'>" + taxDisplayArray[index].taxable_value + "</td>";
				content += "<td style = 'border-bottom-style: hidden;text-align:right; padding-right: 2px; padding-top: 2px;' colspan = '24'>" + taxDisplayArray[index].igst_tax_rate + "%</td>";
				content += "<td style = 'border-bottom-style: hidden;text-align:right; padding-right: 2px; padding-top: 2px;' colspan = '24' >" + taxDisplayArray[index].igst_tax_amount + "</td>";
			}
			content += "<tr style = 'height:5px;'>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '40'></td>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '12'></td>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '24'></td>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '24'></td>";
			content += "</tr>";
			content += "<tr style = 'height:20px;'>";
			content += "<td style = 'border-bottom: 1px solid;text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;' colspan = '40'>Total</td>";
			content += "<td style = 'border-bottom: 1px solid; text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;' colspan = '12'>" + taxTotalData[0].taxable_value + "</td>";
			content += "<td style = 'border-bottom: 1px solid;' colspan = '24'></td>";
			content += "<td style = 'border-bottom: 1px solid; text-align:right; padding-top: 2px; padding-right: 2px; font-weight: bold;' colspan = '24' >" + taxTotalData[0].igst_tax_amount + "</td>";
			content += "</tr>";
		}
		content += "<tr>";
		content += "<td colspan = '100' style = 'border-bottom-style: hidden; padding-left : 2px;' >Tax Amount (in words):</br><span style = 'font-weight: bold;'>" + generate_customer_order_spares_pdf.customRequirementHandler.wordFormat(totalAmountInWords, generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + "</span></td>";
		content += "</tr>";
		content += "<tr style='height:20px;'>";
		content += "<td style=' border-bottom: 1px solid;'colspan='100'/>";
		content += "</tr>";
		content += "</table>";
	}
	content += "<table width='100%' border='1px' style='page-break-inside:avoid; padding-top:10px; table-layout: fixed; word-wrap: break-word; font-size: large;border-collapse:collapse;'>";
	content += "<tr style='height:10px;'></tr>";
	content += "<tr style='height:150px;border-bottom-style: hidden;'>";
	content += "<td colspan='100'/>";
	content += "</tr>";
	content += "<tr style='padding:2px;'>";
	content += "<td colspan='24' style='border-bottom-style: hidden; padding-left : 2px;'/>";
	content += "<td colspan='2'  style='border-bottom-style: hidden;border-left-style: hidden;'/>";
	content += "<td colspan='24' style='border-bottom-style: hidden;border-left-style: hidden;'/>";
	content += "<td colspan='50' style='border-bottom-style: hidden; border-left-style: hidden; font-weight: bold;'>Companys Bank Details</td>";
	content += "</tr>";
	content += "<tr style='padding:2px;'>";
	content += "<td colspan='24' style='border-bottom-style: hidden; padding-left : 2px;'/>";
	content += "<td colspan='2'  style='border-bottom-style: hidden;border-left-style: hidden;'/>";
	content += "<td colspan='24' style='border-bottom-style: hidden;border-left-style: hidden;'/>";
	content += "<td colspan='18' style='border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>Bank Name</td>";
	content += "<td colspan='2'  style='border-bottom-style: hidden;border-left-style: hidden; border-right-style: hidden;'>:</td>";
	content += "<td colspan='30' style='border-bottom-style: hidden;border-left-style: hidden; '>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code1 + "</td>";
	content += "</tr>";
	content += "<tr style='padding:2px;'>";
	content += "<td colspan='24' style='border-bottom-style: hidden; padding-left : 2px;'/>";
	content += "<td colspan='2'  style='border-bottom-style: hidden;border-left-style: hidden;'/>";
	content += "<td colspan='24' style='border-bottom-style: hidden;border-left-style: hidden;'/>";
	content += "<td colspan='18' style='border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>A/c No</td>";
	content += "<td colspan='2'  style='border-bottom-style: hidden;border-left-style: hidden; border-right-style: hidden;'>:</td>";
	content += "<td colspan='30' style='border-bottom-style: hidden;border-left-style: hidden;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code2 + "</td>";
	content += "</tr>";
	content += "<tr style='padding:2px;'>";
	content += "<td colspan='50' style='border-bottom-style: hidden; padding-left : 2px;'><span style='border-bottom : 1px solid; padding:1px; font-weight: bold;'>Declaration</span></td>";
	content += "<td colspan='18' style='border-left-style: hidden; font-weight: bold;'>Branch&IFS Code</td>";
	content += "<td colspan='2'  style='border-bottom-style: hidden;border-left-style: hidden; border-right-style: hidden;'>:</td>";
	var amber = " & ";
	if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 == ""){
		var amber = "";
	}
	content += "<td colspan='30' style='border-left-style: hidden;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code3 + amber + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 + "</td>";
	content += "</tr>";
	content += "<tr style='padding:2px;'>";
	content += "<td colspan='50' rowspan='2'style='border-bottom-style: hidden;padding-left : 2px;padding-bottom : 2px;padding-top : 4px;'>Certified that the particulars given above are true&</br>correct&the amount indicated represents the price</br>actually charged&that there is no flow of additional</br>consideration directly or indirectly from the buyer.</td>";
	content += "<td colspan='50' style='border-bottom-style: hidden;text-align: end;vertical-align: top; font-weight: bold;padding-right : 2px;'>for " + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + "</td>";
	content += "</tr>";
	content += "<tr style='padding:2px;'>";
	content += "<td colspan='50' style='padding-bottom:2px;  border-bottom-style: hidden;text-align: end;vertical-align: bottom;padding-right : 2px; font-weight: bold;'>Authorized Signatory</td>";
	content += "</tr>";
	content += "<tr style='padding:2px;'>";
	content += "<td colspan='100'/>";
	content += "</tr>";
	content += "</table>";
	content += "</div>";
	content += "<mservicefooter>";
	content += "<hr style='margin-left:6px;' />";
	content += "<div style='margin-top:2px;text-align: center; font-size: large;text-transform: uppercase;'>SUBJECT TO " + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + " JURISDICTION</div>";
	content += "<div style='margin-top:2px;text-align: center; font-size: large;'>This is a Computer Generated Customer Order and does not require signature.</div>";
	content += "<div style='text-align:right'>Page: <span class='page'>1</span>&#160; of &#160;<span class='topage'>1</div>";
	content += "</mservicefooter>";
	content += "</div></body></html>";
	return content;
}
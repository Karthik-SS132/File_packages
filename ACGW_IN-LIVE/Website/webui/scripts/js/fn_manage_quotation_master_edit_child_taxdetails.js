var manage_quotation_master_edit_child_taxdetails = {
	constructScreen : function () {
		if (manage_quotation_master_edit.variable.custom.crudIndicator == "U" || manage_quotation_master_edit.variable.custom.crudIndicator == "V") {
			manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord = manage_quotation_master_edit.variable.custom.selectedRecord;
		}
	},
	postConstruct : function () {
		if(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data().length == 0){
			manage_quotation_master_edit.variable.custom.itemCode.dataSource.filter({logic:"or",filters : [{field: "code",value: "OVERALL", operator: "eq"}]});
		} else {
			var arrayFilter = [{
					field: "code",
					value: "OVERALL",
					operator: "eq"
				}];
			for ( var index = 0; index < manage_quotation_master_edit.variable.custom.grid_1.dataSource.data().length; index++){
				var objFilter = {
					field: "code",
					value: manage_quotation_master_edit.variable.custom.grid_1.dataSource.data()[index].item_code,
					operator: "eq"
				}
				arrayFilter.push(objFilter);
			}
			manage_quotation_master_edit.variable.custom.itemCode.dataSource.filter({logic:"or",filters : arrayFilter});
		}
		if (manage_quotation_master_edit.variable.custom.crudIndicator == "A") {
			$("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
			$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal("0.00");
		}
		if (manage_quotation_master_edit.variable.custom.crudIndicator == "U" || manage_quotation_master_edit.variable.custom.crudIndicator == "V") {
			if(manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.item_code == "OVERALL") {
				if(manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_ind == "T"){
					var discountData = $.grep(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data(),function(data) {
						return data.item_code == manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.item_code&& data.charge_code == "DISCOUNT";
					});
					if(discountData.length != 0){
						var grossAmount = (parseFloat($("#manage_quotation_master_edit_partsAmount").text()) - parseFloat(discountData[0].amount)).toString();
						$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal(grossAmount); 
						$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(grossAmount);
						$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(grossAmount);
					} else {
						$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal($("#manage_quotation_master_edit_partsAmount").text());
						$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max($("#manage_quotation_master_edit_partsAmount").text());
						$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max($("#manage_quotation_master_edit_partsAmount").text());
					}
				} else {
					$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal($("#manage_quotation_master_edit_partsAmount").text());
					$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max($("#manage_quotation_master_edit_partsAmount").text());
					$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max($("#manage_quotation_master_edit_partsAmount").text());
				}
			} else {
				if(manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_ind == "T"){
					var discountData = $.grep(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data(),function(data) {
						return data.item_code == manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.item_code&& data.charge_code == "DISCOUNT";
					});
					if(discountData.length != 0){
						var itemGrossAmount = $.grep(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data(),function(keyValidation,index){
							if (keyValidation.item_code == $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal()) {
								return keyValidation;	
							} 
						});
						var lineItemAmount = 0.00;
						for(var index = 0; index < itemGrossAmount.length; index++){
							lineItemAmount += parseFloat(itemGrossAmount[index].gross_amount);
						}
						var grossAmount = (parseFloat(lineItemAmount) - parseFloat(discountData[0].amount)).toString();
						$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal(grossAmount); 
						$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(grossAmount);
						$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(grossAmount);
					} else {
						var itemGrossAmount = $.grep(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data(),function(keyValidation,index){
							if (keyValidation.item_code == $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal()) {
								return keyValidation;	
							} 
						});
						var lineItemAmount = 0.00;
						for(var index = 0; index < itemGrossAmount.length; index++){
							lineItemAmount += parseFloat(itemGrossAmount[index].gross_amount);
						}
						$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal(lineItemAmount.toFixed(2));
						$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
						$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
					}
				} else {
					var itemGrossAmount = $.grep(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data(),function(keyValidation,index){
						if (keyValidation.item_code == $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal()) {
							return keyValidation;	
						} 
					});
					var lineItemAmount = 0.00;
					for(var index = 0; index < itemGrossAmount.length; index++){
						lineItemAmount += parseFloat(itemGrossAmount[index].gross_amount);
					}
					$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal(lineItemAmount.toFixed(2));
					$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
					$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
				}
			}
			if(manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.percentage_amount_ind == "P"){
				$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount_group").show();
				$("#manage_quotation_master_edit_child_taxdetails_percentage_group").show();
			} else {
				$("#manage_quotation_master_edit_child_taxdetails_amount_group").show();				
			}
		}
		if(login_profile.itemlevel_tax_ind == "0"){
			$("#manage_quotation_master_edit_child_taxdetails_item_code").setVal("OVERALL");
			$("#manage_quotation_master_edit_child_taxdetails_item_code_group").hide();
		} else {
			$("#manage_quotation_master_edit_child_taxdetails_item_code_group").show();
		}
		if(login_profile.item_variant_ind == "0"){
			$("#manage_quotation_master_edit_child_taxdetails_item_variant_code_group").hide();
		} else {
			$("#manage_quotation_master_edit_child_taxdetails_item_variant_code_group").show();
		}
	},
	initializeWidgets : function () {
		manage_quotation_master_edit.variable.custom.itemCode = $("#manage_quotation_master_edit_child_taxdetails_item_code").initializeWDropdownlist({
			screenID : "manage_quotation_master_edit_child_taxdetails",
			dataSource : {
				informationType : "'ITEMCODE_CHARGE_LIST'",
			},
			dataTextField : "description",
			dataValueField : "code",
			//template : "description",
			childFieldID : "manage_quotation_master_edit_child_taxdetails_item_variant_code,manage_quotation_master_edit_child_taxdetails_tax_discount_indicator,manage_quotation_master_edit_child_taxdetails_tax_discount_code",
			defaultValue : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.item_code",
			defaultValueDescription : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.item_description",
		});
		$("#manage_quotation_master_edit_child_taxdetails_item_variant_code").initializeWDropdownlist({
			screenID : "manage_quotation_master_edit_child_taxdetails",
			dataSource : {
				informationType : "'ITEMVARIANTCODE_CHARGE_LIST_LINKED'",
				searchField1 : "#manage_quotation_master_edit_child_taxdetails_item_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			//template : "description",
			defaultValue : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.item_variant_code",
			defaultValueDescription : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.variant_description",
		});
		$("#manage_quotation_master_edit_child_taxdetails_gross_amount").initializeWDisplayarea({
			screenID : "manage_quotation_master_edit_child_taxdetails",
		});
		$("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").initializeWDropdownlist({
			screenID : "manage_quotation_master_edit_child_taxdetails",
			dataSource : {
				informationType : "'CHARGETYPE_LIST_LINKED'",
				searchField1 : "#manage_quotation_master_edit_child_taxdetails_item_code",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			childFieldID : "manage_quotation_master_edit_child_taxdetails_tax_discount_code,manage_quotation_master_edit_child_taxdetails_percentage_amount_indicator",
			defaultValue : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_ind",
			defaultValueDescription : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.addl_charge_desc",
		});
		$("#manage_quotation_master_edit_child_taxdetails_tax_discount_code").initializeWDropdownlist({
			screenID : "manage_quotation_master_edit_child_taxdetails",
			dataSource : {
				informationType : "'CHARGECODE_LIST_LINKED'",
				searchField1 : "#manage_quotation_master_edit_child_taxdetails_item_code",
				searchField2 : "#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.charge_code",
			defaultValueDescription : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.charge_description",
		});
		$("#manage_quotation_master_edit_child_taxdetails_percentage_amount_indicator").initializeWDropdownlist({
			screenID : "manage_quotation_master_edit_child_taxdetails",
			dataSource : {
				informationType : "'PERCENTAMTINDICATOR_LIST_LINKED'",
				searchField1 : "#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator",
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.percentage_amount_ind",
			defaultValueDescription : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.percentage_amount_ind_description",
		});
		$("#manage_quotation_master_edit_child_taxdetails_percentage").initializeWNumerictextbox({
			screenID : "manage_quotation_master_edit_child_taxdetails",
			minimum : "'0'",
			maximum : "'100'",
			defaultValue : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.percentage",
			format : "n2"
		});
		$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").initializeWNumerictextbox({
			screenID : "manage_quotation_master_edit_child_taxdetails",
			minimum : "'0'",
			defaultValue : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.applicable_on_amount",
			format : "n2"
		});
		$("#manage_quotation_master_edit_child_taxdetails_amount").initializeWNumerictextbox({
			screenID : "manage_quotation_master_edit_child_taxdetails",
			minimum : "'0'",
			defaultValue : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.amount",
			format : "n2"
		});
		$("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").initializeWDisplayarea({
			screenID : "manage_quotation_master_edit_child_taxdetails",
			defaultValue : "$manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.amount",
		});
	},
	customRequirementHandler : {
		taxDiscountValidation : function () {
			var keyValidation = manage_quotation_master_edit.variable.custom.grid_2.dataSource.data();
			for (var i = 0; i < keyValidation.length; i++) {
				if (keyValidation[i].item_code == $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal() &&keyValidation[i].charge_code == $("#manage_quotation_master_edit_child_taxdetails_tax_discount_code").getVal() && keyValidation[i].addl_charge_ind == $("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").getVal()) {
					alert("Tax or Discount Details already exists.");
					$("#manage_quotation_master_edit_child_taxdetails_tax_discount_code").setVal("");
				}
			}
		}
	},
	widgetEventHandler : {
		item_code_change : function (element, event) {
			$("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").setVal("");
			if ($("#manage_quotation_master_edit_child_taxdetails_item_code").getVal() == "OVERALL") {
				$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal($("#manage_quotation_master_edit_partsAmount").text());
				$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max($("#manage_quotation_master_edit_partsAmount").text());
				$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max($("#manage_quotation_master_edit_partsAmount").text());
			} else {
				var itemGrossAmount = $.grep(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data(),function(keyValidation,index){
					if (keyValidation.item_code == $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal()) {
						return keyValidation;						
					} 
				});
				if (itemGrossAmount.length == "0") {
					$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal("0.00");
					$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max("0.00");
					$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max("0.00");
				} else {
					var lineItemAmount = 0.00;
					for(var index = 0; index < itemGrossAmount.length; index++){
						lineItemAmount += parseFloat(itemGrossAmount[index].gross_amount);
					}
					$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal(lineItemAmount.toFixed(2));
					$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
					$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
				}
			} 
		},
		tax_discount_indicator_change : function (element, event) {
			manage_quotation_master_edit_child_taxdetails.customRequirementHandler.taxDiscountValidation();
			if($("#manage_quotation_master_edit_child_taxdetails_item_code").getVal() != "OVERALL"){
				if($("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").getVal() == "T"){
					var discountData = $.grep(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data(),function(data) {
						return data.item_code == $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal() && data.charge_code == "DISCOUNT";
					});
					if(discountData.length != 0){
						var grossAmount = (parseFloat($("#manage_quotation_master_edit_child_taxdetails_gross_amount").getVal()) - parseFloat(discountData[0].amount)).toString();
						$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal(grossAmount); 
						$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(grossAmount);		
						$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(grossAmount);
					}
				} else {
					var itemGrossAmount = $.grep(manage_quotation_master_edit.variable.custom.grid_1.dataSource.data(),function(keyValidation,index){
						if (keyValidation.item_code == $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal()) {
							return keyValidation;						
						} 
					});
					if (itemGrossAmount.length == "0") {
						$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal("0.00");
						$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max("0.00");
						$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max("0.00");
					} else {
						var lineItemAmount = 0.00;
						for(var index = 0; index < itemGrossAmount.length; index++){
							lineItemAmount += parseFloat(itemGrossAmount[index].gross_amount);
						}
						$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal(lineItemAmount.toFixed(2));
						$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
						$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(lineItemAmount.toFixed(2));
					}
				}
			} else {
				if($("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").getVal() == "T"){
					var discountData = $.grep(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data(),function(data) {
						return data.item_code == $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal() && data.charge_code == "DISCOUNT";
					});
					if(discountData.length != 0){
						var grossAmount = (parseFloat($("#manage_quotation_master_edit_child_taxdetails_gross_amount").getVal()) - parseFloat(discountData[0].amount)).toString();
						$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal(grossAmount); 
						$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max(grossAmount);		
						$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max(grossAmount);
					}
				} else {
					$("#manage_quotation_master_edit_child_taxdetails_gross_amount").setVal($("#manage_quotation_master_edit_partsAmount").text());
					$("#manage_quotation_master_edit_child_taxdetails_amount").data("kendoNumericTextBox").max($("#manage_quotation_master_edit_partsAmount").text());
					$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").data("kendoNumericTextBox").max($("#manage_quotation_master_edit_partsAmount").text());
				}
				if($("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").getVal() == "D"){
					var discountData = $.grep(manage_quotation_master_edit.variable.custom.grid_2.dataSource.data(),function(data) {
						return data.item_code == $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal() && data.addl_charge_ind == "T";
					});
					if(discountData.length != 0){
						alert("Overall Item has tax applied so discount is not allowed.To provide discount delete the tax entry and proceed.");
						$("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").setVal("");
					}
				}
			}
		},
		tax_discount_code_change : function (element, event) {
			manage_quotation_master_edit_child_taxdetails.customRequirementHandler.taxDiscountValidation();
		},
		percentage_amount_indicator_change : function (element, event) {
			if ($("#manage_quotation_master_edit_child_taxdetails_percentage_amount_indicator").getVal() != "") {
				if ($("#manage_quotation_master_edit_child_taxdetails_percentage_amount_indicator").getVal() == "A") {
					$("#manage_quotation_master_edit_child_taxdetails_percentage_group").hide();
					$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount_group").hide();
					$("#manage_quotation_master_edit_child_taxdetails_amount_group").show();
					$("#manage_quotation_master_edit_child_taxdetails_percentage").setVal("");
					$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").setVal("");
					$("#manage_quotation_master_edit_child_taxdetails_amount").setVal("");
					$("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
				} else if ($("#manage_quotation_master_edit_child_taxdetails_percentage_amount_indicator").getVal() == "P") {
					$("#manage_quotation_master_edit_child_taxdetails_percentage_group").show();
					$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount_group").show();
					$("#manage_quotation_master_edit_child_taxdetails_amount_group").hide();
					$("#manage_quotation_master_edit_child_taxdetails_percentage").setVal("");
					$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").setVal("");
					$("#manage_quotation_master_edit_child_taxdetails_amount").setVal("");
					$("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
				}
			} else {
				$("#manage_quotation_master_edit_child_taxdetails_percentage_group").hide();
				$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount_group").hide();
				$("#manage_quotation_master_edit_child_taxdetails_amount_group").hide();
				$("#manage_quotation_master_edit_child_taxdetails_percentage").setVal("");
				$("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").setVal("");
				$("#manage_quotation_master_edit_child_taxdetails_amount").setVal("");
				$("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
			}
		},
		amount_change : function (element, event) {
			$("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").setVal(parseFloat($("#manage_quotation_master_edit_child_taxdetails_amount").getVal()).toFixed(2));
		},
		percentage_change : function (element, event) {
			if ($("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").getVal() == "") {
				$("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
			} else {
				var applicableAmount = parseFloat($("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").getVal());
				var percentage = parseFloat($("#manage_quotation_master_edit_child_taxdetails_percentage").getVal());
				var taxDiscountAmount = (applicableAmount * percentage) / 100;
				$("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").setVal(parseFloat(taxDiscountAmount).toFixed(2));
			}
		},
		applicable_on_amount_change : function (element, event) {
			if ($("#manage_quotation_master_edit_child_taxdetails_percentage").getVal() == "") {
				$("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").setVal("0.00");
			} else {
				var applicableAmount = parseFloat($("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").getVal());
				var percentage = parseFloat($("#manage_quotation_master_edit_child_taxdetails_percentage").getVal());
				var taxDiscountAmount = (applicableAmount * percentage) / 100;
				$("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").setVal(parseFloat(taxDiscountAmount).toFixed(2));
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			if ($("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").getVal() != "0.00") {
				if (manage_quotation_master_edit.variable.custom.crudIndicator == "A") {
					var percentageValue,
					applicableAmountValue;
					if ($("#manage_quotation_master_edit_child_taxdetails_percentage").getVal() == "" && $("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").getVal() == "") {
						percentageValue = "0.00";
						applicableAmountValue = "0.00";
					} else {
						percentageValue = $("#manage_quotation_master_edit_child_taxdetails_percentage").getVal().toString();
						applicableAmountValue = $("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").getVal().toString();
					}
					manage_quotation_master_edit.variable.custom.grid_2.dataSource.add({
						item_code : $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal(),
						item_variant_code : $("#manage_quotation_master_edit_child_taxdetails_item_variant_code").getVal(),
						item_description : mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal(), ""),
						variant_description : mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_quotation_master_edit_child_taxdetails_item_variant_code").getVal(), ""),
						charge_sl_no : (manage_quotation_master_edit.variable.custom.grid_2.dataSource.data().length + 1).toString(),
						addl_charge_ind : $("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").getVal(),
						charge_code : $("#manage_quotation_master_edit_child_taxdetails_tax_discount_code").getVal(),
						percentage_amount_ind : $("#manage_quotation_master_edit_child_taxdetails_percentage_amount_indicator").getVal(),
						percentage : percentageValue,
						applicable_on_amount : applicableAmountValue,
						amount : ($("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").getVal()).toString(),
						currency_code : $("#manage_quotation_master_edit_currency_code").getVal(),
						last_update_timestamp : "00000000-0000-0000-0000-000000000000",
						addl_charge_desc : mserviceUtilities.getDescriptionForCode("CHARGETYPE_LIST", $("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").getVal(), ""),
						charge_description : mserviceUtilities.getDescriptionForCode("CHARGECODE_LIST", $("#manage_quotation_master_edit_child_taxdetails_tax_discount_code").getVal(), ""),
						percentage_amount_ind_description : mserviceUtilities.getDescriptionForCode("PERCENTAMTINDICATOR_LIST", $("#manage_quotation_master_edit_child_taxdetails_percentage_amount_indicator").getVal(), "")
					});
				} else {
					var percentageValue,
					applicableAmountValue;
					if ($("#manage_quotation_master_edit_child_taxdetails_percentage").getVal() == "" && $("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").getVal() == "") {
						percentageValue = "0.00";
						applicableAmountValue = "0.00";
					} else {
						percentageValue = $("#manage_quotation_master_edit_child_taxdetails_percentage").getVal().toString();
						applicableAmountValue = $("#manage_quotation_master_edit_child_taxdetails_applicable_on_amount").getVal().toString();
					}
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("item_code", $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal());
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("item_variant_code", $("#manage_quotation_master_edit_child_taxdetails_item_variant_code").getVal());
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("item_description", mserviceUtilities.getDescriptionForCode("ITEMCODE_LIST", $("#manage_quotation_master_edit_child_taxdetails_item_code").getVal(), ""));
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("variant_description", mserviceUtilities.getDescriptionForCode("ITEMVARIANTCODE_LIST", $("#manage_quotation_master_edit_child_taxdetails_item_variant_code").getVal(), ""));
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("charge_sl_no", manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.charge_sl_no);
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("addl_charge_ind", $("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").getVal());
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("charge_code", $("#manage_quotation_master_edit_child_taxdetails_tax_discount_code").getVal());
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("percentage_amount_ind", $("#manage_quotation_master_edit_child_taxdetails_percentage_amount_indicator").getVal());
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("percentage", percentageValue);
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("applicable_on_amount", applicableAmountValue);
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("amount", ($("#manage_quotation_master_edit_child_taxdetails_tax_discount_amount").getVal()).toString());
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("currency_code", $("#manage_quotation_master_edit_currency_code").getVal());
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("last_update_timestamp", manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.last_update_timestamp);
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("addl_charge_desc", mserviceUtilities.getDescriptionForCode("CHARGETYPE_LIST", $("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").getVal(), ""));
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("charge_description", mserviceUtilities.getDescriptionForCode("CHARGECODE_LIST", $("#manage_quotation_master_edit_child_taxdetails_tax_discount_code").getVal(), ""));
					manage_quotation_master_edit_child_taxdetails.variable.custom.headerRecord.set("percentage_amount_ind_description", mserviceUtilities.getDescriptionForCode("PERCENTAMTINDICATOR_LIST", $("#manage_quotation_master_edit_child_taxdetails_percentage_amount_indicator").getVal(), ""));
				}
				if ($("#manage_quotation_master_edit_child_taxdetails_tax_discount_indicator").getVal() == "D") {
					alert("Discount details is saved successfully.");
				} else {
					alert("Tax details is saved successfully.");
				}
				return true;
			} else {
				alert("Empty amount cannot be added.");
				return false;
			}
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
		custom : {}
	}
};
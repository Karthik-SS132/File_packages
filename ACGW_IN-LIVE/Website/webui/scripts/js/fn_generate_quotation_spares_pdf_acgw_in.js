function fn_generate_quotation_spares_pdf_generate_draft() {
	var stateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state</search_field_1></inputparam>"
		}
	});
	var consigneeStateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state</search_field_1></inputparam>"
		}
	});
	var buyerStateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state</search_field_1></inputparam>"
		}
	});
	if(generate_quotation_spares_pdf.variable.custom.outputparam_addn_info != undefined){
		var taxDisplayArray = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_addn_info, function (data, index) {
			return data.record_type == "D";
		});
		var taxTotalData = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_addn_info, function (data, index) {
			return data.record_type == "S";
		});
	}	
	stateType.read();
	consigneeStateType.read();
	buyerStateType.read();
	var sellerAddress = generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_1;
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2 != ""){
		sellerAddress = sellerAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_3 != ""){
		sellerAddress = sellerAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_3;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_city != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_pincode != ""){
			sellerAddress = sellerAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + "-" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_pincode;
		} else {
			sellerAddress = sellerAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_city;
		}
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc != ""){
		sellerAddress = sellerAddress + "</br>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc != ""){
			sellerAddress = sellerAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc;
		} else {
			sellerAddress = sellerAddress + "</br>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc;
		}
	}
	var buyerAddress = generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_1;
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_2 != ""){
		buyerAddress = buyerAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_2;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_3 != ""){
		buyerAddress = buyerAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_3;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_pincode != ""){
			buyerAddress = buyerAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city + "-" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_pincode;
		} else {
			buyerAddress = buyerAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city;
		}
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc != ""){
		buyerAddress = buyerAddress + "</br>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc != ""){
			buyerAddress = buyerAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc;
		} else {
			buyerAddress = buyerAddress + "</br>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc;
		}
	}
	var consigneeAddress = generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_1;
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_2 != ""){
		consigneeAddress = consigneeAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_2;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_3 != ""){
		consigneeAddress = consigneeAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_3;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_pincode != ""){
			consigneeAddress = consigneeAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city + "-" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_pincode;
		} else {
			consigneeAddress = consigneeAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city;
		}
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc != ""){
		consigneeAddress = consigneeAddress + "</br>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc != ""){
			consigneeAddress = consigneeAddress + "," + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc;
		} else {
			consigneeAddress = consigneeAddress + "</br>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc;
		}
	}
	var content = '<div id = "generate_quotation_spares_pdf_content" style = "width:539px; font-size: small;position:relative;">';
	content += '<div style="position:absolute;opacity: 0.10;font-size: 150px;margin-top:300px;transform: rotate(300deg);">DRAFT</div>';
	content += '<div style = "text-align: center; margin-bottom:3px;" >';
	content += '<span style = "font-weight: bold;" >QUOTATION</span>';
	content += '</div>';
	content += '<table width = "100%" style="border : 1px solid; table-layout: fixed; word-wrap: break-word; font-size: x-small;">';
	content += '<tr style = "vertical-align:top;">';
	content += '<td style = "font-size: small; padding-left: 2px; padding-bottom: 2px; border-right: 1px solid; border-bottom: 1px solid;" rowspan = "2" colspan = "46"><div><span style = "font-weight: bold;">' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + '</span></br><span style="font-weight: bold;">ACGW</span></br>' + sellerAddress + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">Contact #</span>: ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_contact_no + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">E-Mail Id</span>: ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_email_id + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">GSTIN #</span>: ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].product_udf_char_1 + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">State Code</span>: ' + stateType.data()[0].state_number + '</div></td>';
	content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div><span style = "font-weight: bold;">Quotation No</span><div style = "float:right;"></div></div></br><div><span>' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].quotation_no + '</span><div style = "float:right;"><span></span></div></div></td>';
	content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px; " colspan = "27"><div><span style = "font-weight: bold;">Dated</span></div></br><div><span>' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].quotation_date + '</span></div></td>';
	content += '</tr>';
	content += '<tr style = "vertical-align:top;">';
	content += '<tr style = "vertical-align:top;">';
	content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" rowspan = "2" colspan = "46"><div><span style = "font-weight: bold;">Bill To</span></br><span>' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_id_desc + '</span></br>' + buyerAddress + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">Contact</span>: ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_contact_person + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">Contact #</span>: ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_mobile_no + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">E-Mail Id</span>: ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_email_id + '</br>' + '<span style="font-weight: bold; display: inline-block; width: 75px;">GSTIN #</span>: ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_gst_no + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">State Code</span>: ' + buyerStateType.data()[0].state_number + '</div></td>';
	content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div><span style = "font-weight: bold;">Despatched Through</span></div></br><div><span>' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].despatch_mode_road_rail + '</span></div></td>';
	content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div><span style = "font-weight: bold;">Validity</span></div></br><div><span>' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].quotation_validity_date + '</span></div></td>';
	content += '</tr>';
	content += '<tr style = "vertical-align:top;">';
	content += '<td style = "border-right: 1px solid;border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div><span style = "font-weight: bold;">Place of Despatch</span></div></br><div><span>' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].place_of_despatch + '</span></div></td>';
	content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div><span style = "font-weight: bold;">Destination</span></div></br><div><span>' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_location_desc + '</span></div></td>';
	content += '</tr>';
	content += '<tr style = "height:90px;vertical-align:top;">';
	content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" colspan = "100"><div><span style = "font-weight: bold;">Ship To</span></br> <span>' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_id_desc + '</span></br>' + consigneeAddress + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">Contact</span>: ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_contact_person + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">Contact #</span>: ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_mobile_no + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">E-Mail Id</span>: ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_email_id + '</br>' + '<span style="font-weight: bold; display: inline-block; width: 75px;">GSTIN #</span>: ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_gst_no + '</br><span style="font-weight: bold; display: inline-block; width: 75px;">State Code</span>: ' + consigneeStateType.data()[0].state_number + '</div></td>';
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
	var basicTotal = 0;
	var subTotal = 0;
	var taxableTotal = 0;
	var overallSubTotal = 0;
	for (var index in generate_quotation_spares_pdf.variable.custom.outputparam_detail) {
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_sl_no + '</td>';
		if(generate_quotation_spares_pdf.variable.custom.outputparam_item_addninfo != undefined){
			var itemData =  generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_code;
			var accessoryDetail = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_item_addninfo, function (accessoryInfo, index) {
				if (accessoryInfo.quotation_item_code == itemData) {
					return accessoryInfo;
				}
			});
			if(accessoryDetail.length != 0){
				var accessoryString = " [ "; 
				for(counter = 0; counter < accessoryDetail.length; counter++){ 
					accessoryString += (counter+1) + "." + accessoryDetail[counter].accessory_item_description + "</br>";
				}
				accessoryString = accessoryString.substring(0, accessoryString.length - 5) + " ]";
				content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; padding-left : 2px;">' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</br>' + accessoryString + '<div style = "padding-bottom : 5px;"></div></td>';
			} else {
				content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; padding-left : 2px;">' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_description + '<div style = "padding-bottom : 5px;"></div></td>';
			}
		} else {
			content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; padding-left : 2px;">' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_description + '<div style = "padding-bottom : 5px;"></div></td>';
		}
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; padding-left : 2px;">' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].product_udf_char_1 + '</td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; padding-left : 2px;">' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].gst_tax_rate + '%</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].net_quantity + '</td>';
		content += '<td colspan = "17"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;padding-right : 2px;">' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].std_rate + '</td>';
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].uom_code + '</td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].gross_amount) + '</td>';
		content += '</tr>';
		basicTotal = basicTotal + parseFloat(generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].gross_amount);
		var itemCode = generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_code;
		for (var indicator = parseInt(index) + 1; indicator < generate_quotation_spares_pdf.variable.custom.outputparam_detail.length; indicator++) {
			if (itemCode == generate_quotation_spares_pdf.variable.custom.outputparam_detail[indicator].item_code) {
				itemCode = "";
			}
		}
		var lineitemArray = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail, function (lineitemTaxDetails, index) {
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
			if(lineitemArray[index].charge_code == "DISCOUNT"){
				content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden; text-align:right; padding-right : 2px;">- ' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + '</td>';
				basicTotal = basicTotal - parseFloat(lineitemArray[index].amount);
			} else {
				content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden; text-align:right; padding-right : 2px;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + '</td>';
				basicTotal = basicTotal + parseFloat(lineitemArray[index].amount);
			}
			content += '</tr>';
		}
	}
	var overallDiscountRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC") && (data.charge_code != "KLCESS") && (data.charge_code != "TCS") && (data.charge_code == "DISCOUNT")) {
				return data;
			}
		});
	var overallAddlnChargesRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC")  && (data.charge_code != "KLCESS")  && (data.charge_code != "TCS")  && (data.charge_code != "DISCOUNT")) {
				return data;
			}
		});
	if(!(overallDiscountRecord.length == 0 && overallAddlnChargesRecord.length == 0)){
		content += '<tr style = "height:2px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;"></td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;"></td>';
		content += '</tr>';
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;">Basic Total</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 4px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(basicTotal.toFixed(2)) + '</td>';
		content += '</tr>';
		content += '<tr style = "height:2px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;"></td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px; border-bottom-style: hidden; text-align:right; padding-right : 2px;"></td>';
		content += '</tr>';
	}	
	var overallItemDisc = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC") && (data.charge_code != "KLCESS") && (data.charge_code != "TCS") && (data.charge_code == "DISCOUNT")) {
				return data;
			}
		});
	for (var index in overallItemDisc) {
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + overallItemDisc[index].charge_description;
		if (overallItemDisc[index].percentage_amount_ind == "P") {
			content += ' (%)';
		} else {
			content += ' (Amt)';
		}
		content += '</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		if (overallItemDisc[index].percentage_amount_ind == "A") {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallItemDisc[index].amount + '</td>';
		} else {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallItemDisc[index].percentage + '</td>';
		}
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">- ' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(overallItemDisc[index].amount) + '</td>';
		subTotal = subTotal + parseFloat(overallItemDisc[index].amount);
		content += '</tr>';
	}
	var overallItemDiscRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC") && (data.charge_code != "KLCESS") && (data.charge_code != "TCS") && (data.charge_code == "DISCOUNT")) {
				return data;
			}
		});
	var overallItemAddnChargesRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC")  && (data.charge_code != "KLCESS")  && (data.charge_code != "TCS")  && (data.charge_code != "DISCOUNT")) {
				return data;
			}
		});
	if(overallItemDiscRecord.length !=0 && overallItemAddnChargesRecord.length !=0){
		content += '<tr style = "height:2px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;"></td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;"></td>';
		content += '</tr>';
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;">Sub Total</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 4px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat((basicTotal - subTotal).toFixed(2)) + '</td>';
		content += '</tr>';
		content += '<tr style = "height:2px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;"></td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px; border-bottom-style: hidden; text-align:right; padding-right : 2px;"></td>';
		content += '</tr>';
	}
	var overallItemAddnCharges = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC")  && (data.charge_code != "KLCESS")  && (data.charge_code != "TCS")  && (data.charge_code != "DISCOUNT")) {
				return data;
			}
		});
	for (var index in overallItemAddnCharges) {
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + overallItemAddnCharges[index].charge_description;
		if (overallItemAddnCharges[index].percentage_amount_ind == "P") {
			content += ' (%)';
		} else {
			content += ' (Amt)';
		}
		content += '</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		if (overallItemAddnCharges[index].percentage_amount_ind == "A") {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallItemAddnCharges[index].amount + '</td>';
		} else {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallItemAddnCharges[index].percentage + '</td>';
		}
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(overallItemAddnCharges[index].amount) + '</td>';
		taxableTotal = taxableTotal + parseFloat(overallItemAddnCharges[index].amount);
		content += '</tr>';
	}
	content += '<tr style = "height:2px;">';
	content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
	content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;"></td>';
	content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
	content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
	content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
	content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
	content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
	content += '<td colspan = "17" style = "padding-top : 2px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;"></td>';
	content += '</tr>';
	content += '<tr style = "height:20px;">';
	content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
	content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;">Total Taxable Value</td>';
	content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
	content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
	content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
	content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
	content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
	content += '<td colspan = "17" style = "padding-top : 4px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat((basicTotal + taxableTotal - subTotal).toFixed(2)) + '</td>';
	content += '</tr>';
	content += '<tr style = "height:2px;">';
	content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
	content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;"></td>';
	content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
	content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
	content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
	content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
	content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
	content += '<td colspan = "17" style = "padding-top : 2px; border-bottom-style: hidden; text-align:right; padding-right : 2px;"></td>';
	content += '</tr>';
	if((generate_quotation_spares_pdf.variable.custom.outputparam_addn_info != undefined) && (taxTotalData.length != 0)){
		if (generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state == generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state) {
			content += '<tr style = "height:20px;">';
			content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
			content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">CGST</td>';
			content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
			content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
			content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
			content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;"></td>';
			content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].cgst_tax_amount) + '</td>';
			overallSubTotal = overallSubTotal + parseFloat(taxTotalData[0].cgst_tax_amount);
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
			content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].sgst_utgst_tax_amount) + '</td>';
			overallSubTotal = overallSubTotal + parseFloat(taxTotalData[0].sgst_utgst_tax_amount);
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
			content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].igst_tax_amount) + '</td>';
			overallSubTotal = overallSubTotal + parseFloat(taxTotalData[0].igst_tax_amount);
			content += '</tr>';
		}
	}
	var overallOEMDiscountRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "OEMDISC")) {
				return data;
			}
		});
	var overallCESSRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "KLCESS")) {
				return data;
			}
		});
	var overallTCSRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "TCS")) {
				return data;
			}
		});
	if(!(overallOEMDiscountRecord.length == 0 && overallCESSRecord.length == 0 && overallTCSRecord.length == 0)){
		content += '<tr style = "height:2px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;"></td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;"></td>';
		content += '</tr>';
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;">Sub Total</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 4px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat((overallSubTotal + basicTotal + taxableTotal - subTotal).toFixed(2)) + '</td>';
		content += '</tr>';
		content += '<tr style = "height:2px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;"></td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px; border-bottom-style: hidden; text-align:right; padding-right : 2px;"></td>';
		content += '</tr>';
	}
	var overallCESS = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "KLCESS")) {
				return data;
			}
		});
	for (var index in overallCESS) {
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + overallCESS[index].charge_description;
		if (overallCESS[index].percentage_amount_ind == "P") {
			content += ' (%)';
		} else {
			content += ' (Amt)';
		}
		content += '</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		if (overallCESS[index].percentage_amount_ind == "A") {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallCESS[index].amount + '</td>';
		} else {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallCESS[index].percentage + '</td>';
		}
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(overallCESS[index].amount) + '</td>';
		content += '</tr>';
	}
	var overallTCS = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "TCS")) {
				return data;
			}
		});
	for (var index in overallTCS) {
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + overallTCS[index].charge_description;
		if (overallTCS[index].percentage_amount_ind == "P") {
			content += ' (%)';
		} else {
			content += ' (Amt)';
		}
		content += '</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		if (overallTCS[index].percentage_amount_ind == "A") {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallTCS[index].amount + '</td>';
		} else {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallTCS[index].percentage + '</td>';
		}
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(overallTCS[index].amount) + '</td>';
		content += '</tr>';
	}
	var overallOEMDiscount = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "OEMDISC")) {
				return data;
			}
		});
	for (var index in overallOEMDiscount) {
		content += '<tr style = "height:20px;">';
		content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
		content += '<td colspan = "30" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;">' + overallOEMDiscount[index].charge_description;
		if (overallOEMDiscount[index].percentage_amount_ind == "P") {
			content += ' (%)';
		} else {
			content += ' (Amt)';
		}
		content += '</td>';
		content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "5" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; padding-right : 2px;"></td>';
		content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		if (overallOEMDiscount[index].percentage_amount_ind == "A") {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallOEMDiscount[index].amount + '</td>';
		} else {
			content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + overallOEMDiscount[index].percentage + '</td>';
		}
		content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
		content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;">- ' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(overallOEMDiscount[index].amount) + '</td>';
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
	content += '<td colspan = "17" style = "padding-top : 2px; text-align:right; font-weight: bold; border-bottom: 1px solid; border-top: 1px solid;padding-right : 2px;">' + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount) + '</td>';
	content += '</tr>';
	content += '<tr>';
	content += '<td colspan = "100" style = "border-bottom-style: hidden; padding-left : 2px;" >Amount Chargeable (in words)<span style = "float:right;">E.&O.E </span></td>';
	content += '</tr>';
	content += '<tr>';
	content += '<td colspan = "100" style = "border-bottom-style: hidden; font-weight: bold; padding-left : 2px;">' + generate_quotation_spares_pdf.customRequirementHandler.wordFormat(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount, generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + '</td>';
	content += '</tr>';
	content += '<tr style = "height:30px;">';
	content += '<td colspan = "100" ></td>';
	content += '</tr>';
	if((generate_quotation_spares_pdf.variable.custom.outputparam_addn_info != undefined) && (taxTotalData.length != 0)){
		if (generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state == generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state) {
			var totalAmountInWords = parseFloat(parseFloat(taxTotalData[0].cgst_tax_amount) + parseFloat(taxTotalData[0].sgst_utgst_tax_amount)).toFixed(2);
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
			var totalAmountInWords = parseFloat(parseFloat(taxTotalData[0].igst_tax_amount)).toFixed(2);
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
		content += '<td colspan = "100" style = "border-bottom-style: hidden; padding-left : 2px;" >Tax Amount (in words):</br><span style = "font-weight: bold;">' + generate_quotation_spares_pdf.customRequirementHandler.wordFormat(totalAmountInWords, generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + '</span></td>';
		content += '</tr>';
		content += '<tr style = "height:10px;">';
		content += '<td colspan = "100" ></td>';
		content += '</tr>';
	}
	
	content += '<tr style = "padding:2px;">';
	content += '<td colspan = "100" style = "border-bottom-style: hidden; padding-left : 2px;"><span style = "border-bottom : 1px solid; padding:1px; font-weight: bold;">Declaration</span></td>';
	
	content += '</tr>';
	content += '<tr style = "padding:2px;">';
	content += '<td colspan = "50" rowspan = "2" style = "border-bottom-style: hidden;padding-left : 2px;padding-bottom : 2px;padding-top : 4px;">Certified that the particulars given above are true & </br> correct & the amount indicated represents the price</br>actually charged & that there is no flow of additional</br> consideration directly or indirectly from the buyer.</td>';
	content += '<td colspan = "50" style = "border-left: 1px solid; border-top: 1px solid; border-bottom-style: hidden;text-align: end;vertical-align: top; font-weight: bold;padding-right : 2px;">for ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + '</td>';
	content += '</tr>';
	content += '<tr style = "padding:2px;">';
	content += '<td colspan = "50" style = "padding-bottom:2px; border-left: 1px solid; border-bottom-style: hidden;text-align: end;vertical-align: bottom;padding-right : 2px; font-weight: bold;">Authorized Signatory</td>';
	content += '</tr>';
	content += '<tr style = "padding:2px;">';
	content += '<td colspan = "100" ></td>';
	content += '</tr>';
	content += '</table>';
	content += '<div style = "margin-top:2px;text-align: center; font-size: x-small; text-transform: uppercase;">SUBJECT TO ' + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + ' JURISDICTION</div>';
	content += '<div style = "margin-top:2px;text-align: center; font-size: x-small;">This is a Computer Generated Quotation and does not require signature.</div>';
	content += '</div>';
	return content;
	
}

function fn_generate_quotation_spares_pdf_generate_pdf (){
	var stateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state</search_field_1></inputparam>"
		}
	});
	var consigneeStateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state</search_field_1></inputparam>"
		}
	});
	var buyerStateType = mserviceUtilities.getTransportDataSource({
		applicationName: "common_modules",
		serviceName: "retrieve_listof_values_for_searchcondition",
		outputPath: "context/outputparam",
		pageSize: 10,
		inputParameter: {
			p_inputparam_xml: "<inputparam><lov_code_type>'STATE_TYPE'</lov_code_type><search_field_1>$generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state</search_field_1></inputparam>"
		}
	});
	if(generate_quotation_spares_pdf.variable.custom.outputparam_addn_info != undefined){
		var taxDisplayArray = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_addn_info, function (data, index) {
			return data.record_type == "D";
		});
		var taxTotalData = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_addn_info, function (data, index) {
			return data.record_type == "S";
		});
	}
	stateType.read();
	consigneeStateType.read();
	buyerStateType.read();
	var sellerAddress = generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_1;
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2 != ""){
		sellerAddress = sellerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_3 != ""){
		sellerAddress = sellerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_3;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_city != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_pincode != ""){
			sellerAddress = sellerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + "-" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_pincode;
		} else {
			sellerAddress = sellerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_city;
		}
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc != ""){
		sellerAddress = sellerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state_desc != ""){
			sellerAddress = sellerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc;
		} else {
			sellerAddress = sellerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_country_desc;
		}
	}
	var buyerAddress = generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_1;
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_2 != ""){
		buyerAddress = buyerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_2;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_3 != ""){
		buyerAddress = buyerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_3;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_pincode != ""){
			buyerAddress = buyerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city + "-" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_pincode;
		} else {
			buyerAddress = buyerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city;
		}
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc != ""){
		buyerAddress = buyerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state_desc != ""){
			buyerAddress = buyerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc;
		} else {
			buyerAddress = buyerAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_country_desc;
		}
	}
	var consigneeAddress = generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_1;
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_2 != ""){
		consigneeAddress = consigneeAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_2;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_3 != ""){
		consigneeAddress = consigneeAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_address_line_3;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_pincode != ""){
			consigneeAddress = consigneeAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city + "-" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_pincode;
		} else {
			consigneeAddress = consigneeAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_city;
		}
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc != ""){
		consigneeAddress = consigneeAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc;
	}
	if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc != ""){
		if(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_state_desc != ""){
			consigneeAddress = consigneeAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc;
		} else {
			consigneeAddress = consigneeAddress + ", " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_country_desc;
		}
	}
	var content = "<!DOCTYPE html><html><head>";
	content += "<style>table { page-break-inside:auto; page-break-after:auto; } tr { page-break-inside:avoid; page-break-after:auto; } thead { display:table-header-group; } tfoot { display:table-footer-group; }</style>";
	content += "</head><body>";
	content += "<div style='width:100%; font-size: medium; height:65px'>";
	content += "<mserviceheader>";
	
	content += "<span style='font-weight: bold;margin-left: 275px; height:50px; text-align: center; font-size: medium;'>QUOTATION</span>";
	if (generate_quotation_spares_pdf.variable.custom.imageData2 != undefined) {
		content += "<img style = 'height: 30px;float:right;' src =" + generate_quotation_spares_pdf.variable.custom.imageData2 + "/>";
	} else {
		content += "<img style = 'height: 30px;float:right;' src =" + "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC" + "/>";
	}
	content += "<br/>";
	content += "<hr style='margin-left:6px; margin-bottom:5px;'/>";
	content += "<div style='margin-left:7px;'>";
	content += "<table width='100%' border='1px' style='table-layout: fixed; word-wrap: break-word; font-size: medium;border-collapse:collapse;'>";
	content += "<tr style='vertical-align:top;'>";
	content += "<td style='font-size: medium; padding-left: 2px; padding-bottom: 2px;'colspan='46'><div><span style='font-weight: bold;'>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + "</span></br><span style='font-weight: bold;'>ACGW</span></div></td>";
	content += "<td style=' padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Quotation No</span></div><div>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].quotation_no + "</div></td>";
	content += "<td style=' padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Dated</span></div><div>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].quotation_date + "</div></td>";
	content += "</tr>";
	content += "</table>";
	content += "</div>";
	content += "</mserviceheader>";
	content += "<div style='padding-top:10px;'>";
	content += "<table width='100%' border='1px' style='table-layout: fixed; word-wrap: break-word; font-size: medium;border-collapse:collapse;'>";
	content += "<tr style='vertical-align:top;'>";
	content += "<td style='font-size: medium; padding-left: 2px; padding-bottom: 2px;' colspan='100'><div><span style='font-weight: bold;'>" + "Address" + "</span></br>" + sellerAddress + " " + "<span style='font-weight: bold; display: inline-block; width: 90px;'>( State Code</span>: " + stateType.data()[0].state_number + " )</br><span style='font-weight: bold; display: inline-block; width: 90px;'>GSTIN #</span>: " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].product_udf_char_1 + "</div></td>";
	
	content += "</tr>";
	content += "<tr style='vertical-align:top;'>";
	content += "<td style='font-size: medium;padding-left: 2px; padding-bottom: 2px;' rowspan='2' colspan='46'><div><span style='font-weight: bold;'>Bill To</span></br><span style='font-size: large;'>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_id_desc + "</span></br>" + buyerAddress + " " + "<span style='font-weight: bold; display: inline-block; width: 90px;'>( State Code</span>: " + buyerStateType.data()[0].state_number + " )</br><span style='font-weight: bold; display: inline-block; width: 90px;'>Contact</span>: " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_contact_person + "</br><span style='font-weight: bold; display: inline-block; width: 90px;'>Contact #</span>: " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_mobile_no + "</br><span style='font-weight: bold; display: inline-block; width: 90px;'>E-Mail Id</span>: " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_email_id + "</br>" + "<span style='font-weight: bold; display: inline-block; width: 90px;'>GSTIN #</span>: " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_gst_no + "</div></td>";
	content += "<td style='padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Despatched Through</span></div><div>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].despatch_mode_road_rail + "</div></td>";
	content += "<td style='padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Validity</span></div><div>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].quotation_validity_date + "</div></td>";
	content += "</tr>";
	content += "<tr style='vertical-align:top;'>";
	content += "<td style='padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Place of Despatch</span></div><div>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].place_of_despatch + "</div></td>";
	content += "<td style='padding-left: 2px; padding-bottom: 2px;' colspan='27'><div><span style='font-weight: bold;'>Destination</span></div><div>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_location_desc + "</div></td>";
	content += "</tr>";
	content += "<tr style='height:90px;vertical-align:top;'>";
	content += "<td style='font-size: medium;padding-left: 2px; padding-bottom: 2px;' colspan='100'><div><span style='font-weight: bold;'>Ship To</span></br><span style='font-size: large;'>" + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_id_desc + "</span></br>" + consigneeAddress + " " + "<span style='font-weight: bold; display: inline-block; width: 90px;'>( State Code</span>: " + consigneeStateType.data()[0].state_number + " )</br><span style='font-weight: bold; display: inline-block; width: 90px;'>Contact</span>: " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_contact_person + "</br><span style='font-weight: bold; display: inline-block; width: 90px;'>Contact #</span>: " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_mobile_no + "</br><span style='font-weight: bold; display: inline-block; width: 90px;'>E-Mail Id</span>: " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_email_id + "</br>" + "<span style='font-weight: bold; display: inline-block; width: 90px;'>GSTIN #</span>: " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].consignee_gst_no + "</div></td>";
	content += "</tr>";
	content += "</table>";
	content += "<table width='100%'border='1px'style='table-layout: fixed; word-wrap: break-word; font-size: medium;border-collapse:collapse;'>";
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
	var basicTotal = 0;
	var subTotal = 0;
	var taxableTotal = 0;
	var overallSubTotal = 0;
	for (var index in generate_quotation_spares_pdf.variable.custom.outputparam_detail) {
		content += "<tr style = 'height:20px;'>";
		content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>" + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_sl_no + "</td>";
		if(generate_quotation_spares_pdf.variable.custom.outputparam_item_addninfo != undefined){
			var itemData =  generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_code;
			var accessoryDetail = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_item_addninfo, function (accessoryInfo, index) {
				if (accessoryInfo.quotation_item_code == itemData) {
					return accessoryInfo;
				}
			});
			if(accessoryDetail.length != 0){
				content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden; padding-left : 2px;'><span>" + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_description + "</span>&nbsp; along with</br>" + "<div style = 'padding-bottom : 5px;'></div></td>";
			} else {
				content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden; padding-left : 2px;'><span>" + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_description + "</span><div style = 'padding-bottom : 5px;'></div></td>";
			}
		} else {
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden; padding-left : 2px;'>" + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_description + "<div style = 'padding-bottom : 5px;'></div></td>";
		}		 
		content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].product_udf_char_1 + "</td>";
		content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].gst_tax_rate + "%</td>";
		content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].net_quantity + "</td>";
		content += "<td colspan = '17'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;padding-right : 2px;'>" + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].std_rate + "</td>";
		content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>" + generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].uom_code + "</td>";
		content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].gross_amount) + "</td>";
		content += "</tr>";
		if(generate_quotation_spares_pdf.variable.custom.outputparam_item_addninfo != undefined){
			var itemData =  generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_code;
			var accessoryDetail = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_item_addninfo, function (accessoryInfo, index) {
				if (accessoryInfo.quotation_item_code == itemData) {
					return accessoryInfo;
				}
			});
			if(accessoryDetail.length != 0){
				for(counter = 0; counter < accessoryDetail.length; counter++){ 
					content += "<tr>";
					content += "<td colspan = '4'style = 'border-bottom-style: hidden;'></td>";
					content += "<td colspan = '30' style = 'border-bottom-style: hidden; text-indent: -2em; padding-left: 30px;'><span style = 'padding-left: 15px;'>&#8226; &nbsp;&nbsp;</span><span>" + accessoryDetail[counter].accessory_item_description + "</span></td>";
					content += "<td colspan = '10' style = 'border-bottom-style: hidden;'></td>";
					content += "<td colspan = '5' style = 'border-bottom-style: hidden;'></td>";
					content += "<td colspan = '10' style = 'border-bottom-style: hidden;'></td>";
					content += "<td colspan = '17'style = 'border-bottom-style: hidden;'></td>";
					content += "<td colspan = '7'style = 'border-bottom-style: hidden;'></td>";
					content += "<td colspan = '17' style = 'border-bottom-style: hidden;'></td>";
					content += "</tr>";
				}
			}
		}
		basicTotal = basicTotal + parseFloat(generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].gross_amount);
		if(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
			var itemCode = generate_quotation_spares_pdf.variable.custom.outputparam_detail[index].item_code;
			for(var indicator = parseInt(index) + 1; indicator < generate_quotation_spares_pdf.variable.custom.outputparam_detail.length;indicator++){
				if(itemCode == generate_quotation_spares_pdf.variable.custom.outputparam_detail[indicator].item_code){
					itemCode = "";
				} 
			}
			var lineitemArray = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail,function(lineitemTaxDetails,index){
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
				if(lineitemArray[index].charge_code == "DISCOUNT"){
					content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>- " + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + "</td>";
					basicTotal = basicTotal - parseFloat(lineitemArray[index].amount);
				} else {
					content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + "</td>";
					basicTotal = basicTotal + parseFloat(lineitemArray[index].amount);
				}
				content += "</tr>";
			}
		}
	}
	if(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
		var overallDiscountRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC") && (data.charge_code != "KLCESS") && (data.charge_code != "TCS") && (data.charge_code == "DISCOUNT")) {
				return data;
			}
		});
		var overallAddlnChargesRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
				if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC")  && (data.charge_code != "KLCESS") && (data.charge_code != "TCS")  && (data.charge_code != "DISCOUNT")) {
					return data;
				}
			});
		if(!(overallDiscountRecord.length == 0 && overallAddlnChargesRecord.length == 0)){
			content += "<tr style = 'height:2px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'></td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;'></td>";
			content += "</tr>";
			content += "<tr style = 'height:2px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'>Basic Total</td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 4px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(basicTotal.toFixed(2)) + "</td>";
			content += "</tr>";
			content += "<tr style = 'height:2px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'></td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden; text-align:right; padding-right : 2px;'></td>";
			content += "</tr>";
		}
		var overallItemDisc = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC") && (data.charge_code != "KLCESS") && (data.charge_code != "TCS") && (data.charge_code == "DISCOUNT")) {
				return data;
			}
		});
		for (var index in overallItemDisc) {
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + overallItemDisc[index].charge_description;
			if (overallItemDisc[index].percentage_amount_ind == 'P') {
				content += " (%)";
			} else {
				content += " (Amt)";
			}
			content += "</td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '5'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			if (overallItemDisc[index].percentage_amount_ind == 'A') {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + overallItemDisc[index].amount + "</td>";
			} else {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + overallItemDisc[index].percentage + "</td>";
			}
			content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>- " + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(overallItemDisc[index].amount) + "</td>";
			subTotal = subTotal + parseFloat(overallItemDisc[index].amount);
			content += "</tr>";
		}
		var overallItemDiscRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC") && (data.charge_code != "KLCESS") && (data.charge_code != "TCS") && (data.charge_code == "DISCOUNT")) {
					return data;
				}
			});
		var overallItemAddnChargesRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
				if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC")  && (data.charge_code != "KLCESS")  && (data.charge_code != "TCS")  && (data.charge_code != "DISCOUNT")) {
					return data;
				}
			});
		if(overallItemDiscRecord.length !=0 && overallItemAddnChargesRecord.length !=0){
			content += "<tr style = 'height:2px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'></td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;'></td>";
			content += "</tr>";
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'>Sub Total</td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 4px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat((basicTotal - subTotal).toFixed(2)) + "</td>";
			content += "</tr>";
			content += "<tr style = 'height:2px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'></td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden; text-align:right; padding-right : 2px;'></td>";
			content += "</tr>";
		}
		var overallItemAddnCharges = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code != "OEMDISC")  && (data.charge_code != "KLCESS") && (data.charge_code != "TCS")  && (data.charge_code != "DISCOUNT")) {
				return data;
			}
		});
		for (var index in overallItemAddnCharges) {
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + overallItemAddnCharges[index].charge_description;
			if (overallItemAddnCharges[index].percentage_amount_ind == 'P') {
				content += " (%)";
			} else {
				content += " (Amt)";
			}
			content += "</td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '5'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			if (overallItemAddnCharges[index].percentage_amount_ind == 'A') {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + overallItemAddnCharges[index].amount + "</td>";
			} else {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + overallItemAddnCharges[index].percentage + "</td>";
			}
			content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(overallItemAddnCharges[index].amount) + "</td>";
			taxableTotal = taxableTotal + parseFloat(overallItemAddnCharges[index].amount);
			content += "</tr>";
		}
		content += "<tr style = 'height:2px;'>";
		content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
		content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'></td>";
		content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
		content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
		content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
		content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
		content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
		content += "<td colspan = '17' style = 'padding-top : 2px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;'></td>";
		content += "</tr>";
		content += "<tr style = 'height:20px;'>";
		content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
		content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'>Total Taxable Value</td>";
		content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
		content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
		content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
		content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
		content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
		content += "<td colspan = '17' style = 'padding-top : 4px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat((basicTotal + taxableTotal - subTotal).toFixed(2)) + "</td>";
		content += "</tr>";
		content += "<tr style = 'height:2px;'>";
		content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
		content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'></td>";
		content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
		content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
		content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
		content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
		content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
		content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden; text-align:right; padding-right : 2px;'></td>";
		content += "</tr>";		
	}
	if((generate_quotation_spares_pdf.variable.custom.outputparam_addn_info != undefined) && (taxTotalData.length != 0)){
		if (generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state == generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state) {
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>CGST</td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].cgst_tax_amount) + "</td>";
			overallSubTotal = overallSubTotal + parseFloat(taxTotalData[0].cgst_tax_amount);
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
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].sgst_utgst_tax_amount) + "</td>";
			overallSubTotal = overallSubTotal + parseFloat(taxTotalData[0].sgst_utgst_tax_amount);
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
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(taxTotalData[0].igst_tax_amount) + "</td>";
			overallSubTotal = overallSubTotal + parseFloat(taxTotalData[0].igst_tax_amount);
			content += "</tr>";
		}
	}
	if(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
		var overallOEMDiscountRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "OEMDISC")) {
					return data;
				}
			});
		var overallCESSRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
				if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "KLCESS")) {
					return data;
				}
			});
		var overallTCSRecord = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
				if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "TCS")) {
					return data;
				}
			});
		if(!(overallOEMDiscountRecord.length == 0 && overallCESSRecord.length == 0 && overallTCSRecord.length == 0)){
			content += "<tr style = 'height:2px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'></td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;'></td>";
			content += "</tr>";
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'>Sub Total</td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 4px; text-align:right; padding-right : 2px; font-weight: bold; border: 1px solid black;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat((overallSubTotal + basicTotal + taxableTotal - subTotal).toFixed(2)) + "</td>";
			content += "</tr>";
			content += "<tr style = 'height:2px;'>";
			content += "<td colspan = '4'  style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px; font-weight: bold;'></td>";
			content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '5' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'></td>";
			content += "<td colspan = '10'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '7'  style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden; text-align:right; padding-right : 2px;'></td>";
			content += "</tr>";
		}
		var overallCESS = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "KLCESS")) {
				return data;
			}
		});
		for (var index in overallCESS) {
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + overallCESS[index].charge_description;
			if (overallCESS[index].percentage_amount_ind == 'P') {
				content += " (%)";
			} else {
				content += " (Amt)";
			}
			content += "</td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '5'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			if (overallCESS[index].percentage_amount_ind == 'A') {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + overallCESS[index].amount + "</td>";
			} else {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + overallCESS[index].percentage + "</td>";
			}
			content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(overallCESS[index].amount) + "</td>";
			content += "</tr>";
		}
		var overallTCS = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "TCS")) {
				return data;
			}
		});
		for (var index in overallTCS) {
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + overallTCS[index].charge_description;
			if (overallTCS[index].percentage_amount_ind == 'P') {
				content += " (%)";
			} else {
				content += " (Amt)";
			}
			content += "</td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '5'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			if (overallTCS[index].percentage_amount_ind == 'A') {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + overallTCS[index].amount + "</td>";
			} else {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + overallTCS[index].percentage + "</td>";
			}
			content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(overallTCS[index].amount) + "</td>";
			content += "</tr>";
		}
		var overallOEMDiscount = $.grep(generate_quotation_spares_pdf.variable.custom.outputparam_taxdetail_overall, function (data, index) {
			if ((data.item_code == "OVERALL") && (data.charge_subcode != "CGST") && (data.charge_subcode != "UTGST") && (data.charge_subcode != "SGST") && (data.charge_subcode != "IGST") && (data.charge_code == "OEMDISC")) {
				return data;
			}
		});
		for (var index in overallOEMDiscount) {
			content += "<tr style = 'height:20px;'>";
			content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
			content += "<td colspan = '30' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; padding-right : 2px;'>" + overallOEMDiscount[index].charge_description;
			if (overallOEMDiscount[index].percentage_amount_ind == 'P') {
				content += " (%)";
			} else {
				content += " (Amt)";
			}
			content += "</td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '5'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			if (overallOEMDiscount[index].percentage_amount_ind == 'A') {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + overallOEMDiscount[index].amount + "</td>";
			} else {
				content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + overallOEMDiscount[index].percentage + "</td>";
			}
			content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
			content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; padding-right : 2px;'>- " + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(overallOEMDiscount[index].amount) + "</td>";
			content += "</tr>";
		}
	}
	content += "<tr style='height:2px;'>";
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
	content += "<td colspan='17' style='padding-top : 2px; text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_quotation_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount) + "</td>";
	content += "</tr>";
	content += "<tfoot style='margin-bottom:5px;'>";
	content += "<tr>";
	content += "<td style='border-bottom-style: hidden' colspan='100'></td>";
	content += "</tr>";
	content += "</tfoot>";
	content += "</table>";
	content += "<table width='100%' border='1px' style='table-layout: fixed; word-wrap: break-word; font-size: medium;border-collapse:collapse;'>";
	content += "<tr>";
	content += "<td colspan='100' style='border-top-style: hidden; border-bottom-style: hidden; padding-left : 2px;'>Amount Chargeable(in words)<span style='float:right;'>E.&O.E</span></td>";
	content += "</tr>";
	content += "<tr>";
	content += "<td colspan='100' style='border-bottom-style: hidden; font-weight: bold; padding-left : 2px;'>" + generate_quotation_spares_pdf.customRequirementHandler.wordFormat(generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount, generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + "</td>";
	content += "</tr>";
	content += "<tr style='height:2px; border-bottom-style: hidden;'>";
	content += "<td colspan='100'/>";
	content += "</tr>";
	content += "<tr style='height:2px;'>";
	content += "<td style=' border-bottom: 1px solid;'colspan='100'/>";
	content += "</tr>";
	content += "</table>";
	if((generate_quotation_spares_pdf.variable.custom.outputparam_addn_info != undefined) && (taxTotalData.length != 0)){
		if (generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].buyer_state == generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_state) {
			var totalAmountInWords = parseFloat(parseFloat(taxTotalData[0].cgst_tax_amount) + parseFloat(taxTotalData[0].sgst_utgst_tax_amount)).toFixed(2);
			content += "<table width='100%' border='1px' style='page-break-inside:avoid; padding-top:10px; table-layout: fixed; word-wrap: break-word; font-size: medium;border-collapse:collapse;'>";
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
			var totalAmountInWords = parseFloat(parseFloat(taxTotalData[0].igst_tax_amount)).toFixed(2);
			content += "<table width='100%' border='1px' style='page-break-inside:avoid; padding-top:10px; table-layout: fixed; word-wrap: break-word; font-size: medium;border-collapse:collapse;'>";
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
		content += "<td colspan = '100' style = 'border-bottom-style: hidden; padding-left : 2px;' >Tax Amount (in words):</br><span style = 'font-weight: bold;'>" + generate_quotation_spares_pdf.customRequirementHandler.wordFormat(totalAmountInWords, generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + "</span></td>";
		content += "</tr>";
		content += "<tr style='height:2px;'>";
		content += "<td style=' border-bottom: 1px solid;'colspan='100'/>";
		content += "</tr>";
		content += "</table>";
	}
	content += "<table width='100%' border='1px' style='page-break-inside:avoid; padding-top:10px; table-layout: fixed; word-wrap: break-word; font-size: medium;border-collapse:collapse;'>";
	
	

	content += "<tr style='padding:2px;'>";
	content += "<td colspan='50' rowspan='2'style='border-bottom-style: hidden;padding-left : 2px;padding-bottom : 2px;padding-top : 4px;'><b>Terms and Conditions:</b> </br> Taxes : Extra as applicable </br> TCS/TDS :- Applicable at the time of Dispatch w.e.f. 01.07.2021 respectively. </br> Lead Time : 6 to 8 weeks from receipt of Purchase Order </br> Warranty - One year from Invoice date. </br> Outstanding Payment: If there is any outstanding, we will not be able to process any new order </br> LATE DELIVERY / PENALTY CLAUSE :- Late Delivery / Penalty Clause is NOT APPLICABLE for spares order. </br> Late payment clause: We may levy reasonable compensation for each week of delay on account of Customers inability to release payment as per agreed Payment Terms. </br> Retention Payment wherever applicable: 10 % immediately against I&C or 60 days from the date of Invoice whichever is earlier </br> Parts Verification: Parts verification to be done within 30 days of material receipt </br> </br> <b>Declaration:</b> <br/> Certified that the particulars given above are true & correct </br> & the amount indicated represents the price actually charged & that there is no flow of additional consideration directly or indirectly from the buyer.</td>";
	content += "<td colspan='50' style='border-bottom-style: hidden;text-align: end;vertical-align: top; font-weight: bold;padding-right : 2px;'> " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + "</td>";
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
	content += "<div style='margin-top:2px;text-align: center; font-size: medium;text-transform: uppercase;'>SUBJECT TO " + generate_quotation_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + " JURISDICTION</div>";
	content += "<div style='margin-top:2px;text-align: center; font-size: medium;'>This is a Computer Generated Quotation and does not require signature.</div>";
	content += "<div style='text-align:right'>Page: <span class='page'>1</span>&#160; of &#160;<span class='topage'>1</div>";
	content += "</mservicefooter>";
	content += "</div></body></html>";
	return content;
}
 
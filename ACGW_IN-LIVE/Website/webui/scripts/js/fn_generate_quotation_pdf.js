var generate_quotation_pdf = {
	constructScreen : function () {
		generate_quotation_pdf.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "salesinvoice",
				serviceName : "retrieve_quotation_detail_for_docgen",
				pageSize : 10,
				inputParameter : {
					quotation_no : "$manage_quotation_master.variable.custom.selectedRecord.quotation_no"
				},
				processResponse : true,
				outputPath : false,
				parse : generate_quotation_pdf.customRequirementHandler.dataSourceParse
			});
		generate_quotation_pdf.variable.custom.datasource_1.read();
		$("#generate_quotation_pdf").attr("style", "height: 90%; width: 100%;");

		if (manage_quotation_master.variable.custom.selectedRecord.quotation_status == "AP") {
			$("#generate_quotation_pdf_header_1").attr("style", "height: 100%; width: 100%;").html("<div style ='height:100%;width:100%'>" + "<embed style ='height:100%;width:100%' src='/content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/quotation_attachments/" + manage_quotation_master.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + "/" + manage_quotation_master.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf" + "?state=" + new Date().getTime() + "'" + "</div>");
		} else {
			$('#generate_quotation_pdf_header_1').attr("style", "height: 100%; width: 100%; overflow-y: scroll;").html("<div>" + generate_quotation_pdf.customRequirementHandler.getInvoiceContent() + "</div>");
		}
	},
	customRequirementHandler : {
		dataSourceParse : function (response) {
			myData = response;
			if (response.document.context.outputparam_addn_info != undefined) {
				if (response.document.context.outputparam_addn_info.length != undefined) {
					generate_quotation_pdf.variable.custom.outputparam_addn_info = response.document.context.outputparam_addn_info;
				} else {
					generate_quotation_pdf.variable.custom.outputparam_addn_info = [response.document.context.outputparam_addn_info];
				}
			};
			if (response.document.context.outputparam_taxdetail != undefined) {
				if (response.document.context.outputparam_taxdetail.length != undefined) {
					generate_quotation_pdf.variable.custom.outputparam_taxdetail = response.document.context.outputparam_taxdetail;
				} else {
					generate_quotation_pdf.variable.custom.outputparam_taxdetail = [response.document.context.outputparam_taxdetail];
				}
			};
			if (response.document.context.outputparam_detail != undefined) {
				if (response.document.context.outputparam_detail.length != undefined) {
					generate_quotation_pdf.variable.custom.outputparam_detail = response.document.context.outputparam_detail;
				} else {
					generate_quotation_pdf.variable.custom.outputparam_detail = [response.document.context.outputparam_detail];
				}
			};
			return [response.document.context.outputparam_header];
		},
		getInvoiceContent : function () {
			generate_quotation_pdf.variable.custom.outputparam_taxdetail_overall = $.grep(generate_quotation_pdf.variable.custom.outputparam_taxdetail,function(overallTaxDetails,index){
				if(overallTaxDetails.item_code == "OVERALL"){
					return overallTaxDetails;
				}
			});
			if(typeof(fn_taxation_quotation_generate_draft) === "function"){
				return fn_taxation_quotation_generate_draft();	
			} else {
				var content = '<div id = "generate_quotation_pdf_content" style = "width:539px; font-size: small;">';
				content += '<div style="position:absolute;opacity: 0.10;font-size: 150px;margin-top:200px;transform: rotate(300deg);">DRAFT</div>';
				content += '<div style = "text-align: center; margin-bottom:3px;" >';
				content += '<span style = "font-weight: bold;" >COMMERCIAL / TAX QUOTATION</span>';
				content += '</div>';
				content += '<table width = "100%" style="border : 1px solid; table-layout: fixed; word-wrap: break-word; font-size: x-small;">';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "font-size: small; padding-left: 2px; padding-bottom: 2px; border-right: 1px solid; border-bottom: 1px solid;" rowspan = "3" colspan = "46"><div><span style = "font-weight: bold;">' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + '</span></br>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].seller_address_line_1 + '</br>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2 + '</br>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].seller_city + '</br>Contact : ' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].seller_contact_no + '</br>E-Mail &nbsp; : ' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].seller_email_id + '</div></td>';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Quotation No<div style = "float:right;"></div></div></br><div><span style = "font-weight: bold";>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].quotation_no + '</span><div style = "float:right;"><span style = "font-weight: bold";></span></div></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px; " colspan = "27"><div>Dated</div></br><div><span style = "font-weight: bold;">' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].quotation_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Delivery Note</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Mode / Terms of Payment</div></br><div><span style = "font-weight: bold;">' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].payment_terms + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Supplier Ref</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Other Reference(s)</div></br><div><span style = "font-weight: bold";>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].other_reference + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" rowspan = "3" colspan = "46"><div>Consignee</br> <span style = "font-weight: bold";>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].consignee_id_desc + '</span></div></td>';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Buyers Order No</div></br><div> <span style = "font-weight: bold";>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].buyer_reference + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Dated</div></br><div><span style = "font-weight: bold";>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].buyer_reference_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Despatch Document No</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Dated</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Despatched Through</div></br><div> <span style = "font-weight: bold";>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].despatch_mode_road_rail + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Destination</div></br><div> <span style = "font-weight: bold";>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].destination + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "height:90px;vertical-align:top;">';
				content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" colspan = "46"><div>Buyer </br> <span style = "font-weight: bold";>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].buyer_id_desc + '</span></br>' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].buyer_city + '</div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "54"><div style = "font-size: small;">Terms and Conditions</br><span style = "font-weight:bold; white-space: pre-wrap;">' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].quotation_terms_conditions + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "text-align:center;">';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "4" >Sl</br>No</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "45">Description of Goods</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "9">Quantity</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "15" >Rate</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "5" >per</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "7" >Disc.%</td>';
				content += '<td style = "border-bottom: 1px solid;" colspan = "15">Amount</td>';
				content += '</tr>';
				for (var index in generate_quotation_pdf.variable.custom.outputparam_detail) {
					content += '<tr style = "height:20px;">';
					content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + generate_quotation_pdf.variable.custom.outputparam_detail[index].item_sl_no + '</td>';
					content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;">' + generate_quotation_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_quotation_pdf.variable.custom.outputparam_detail[index].item_description + '</td>';
					content += '<td colspan = "9" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_quotation_pdf.variable.custom.outputparam_detail[index].net_quantity + '</td>';
					content += '<td colspan = "15"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;padding-right : 2px;">' + generate_quotation_pdf.variable.custom.outputparam_detail[index].std_rate + '</td>';
					content += '<td colspan = "5"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + generate_quotation_pdf.variable.custom.outputparam_detail[index].uom_code + '</td>';
					content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;"></td>';
					content += '<td colspan = "15" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_quotation_pdf.customRequirementHandler.numberFormat(generate_quotation_pdf.variable.custom.outputparam_detail[index].gross_amount) + '</td>';
					content += '</tr>';
					var itemCode = generate_quotation_pdf.variable.custom.outputparam_detail[index].item_code;
					for(var indicator = parseInt(index) + 1; indicator < generate_quotation_pdf.variable.custom.outputparam_detail.length;indicator++){
						if(itemCode == generate_quotation_pdf.variable.custom.outputparam_detail[indicator].item_code){
							itemCode = "";
						} 
					}
					var lineitemArray = $.grep(generate_quotation_pdf.variable.custom.outputparam_taxdetail,function(lineitemTaxDetails,index){
						if((lineitemTaxDetails.item_code != "OVERALL") && (lineitemTaxDetails.item_code == itemCode)){
							return lineitemTaxDetails;
						}
					});
					for (var index in lineitemArray) {
						content += '<tr style = "height:20px;">';
						content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
						content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + lineitemArray[index].charge_code + '</td>';
						content += '<td colspan = "9"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
						if (lineitemArray[index].percentage_amount_ind == "A") {
							content += '<td colspan = "15" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + lineitemArray[index].amount + '</td>';
						} else {
							content += '<td colspan = "15" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + lineitemArray[index].percentage + '</td>';
						}
						content += '<td colspan = "5"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
						if (lineitemArray[index].percentage_amount_ind == "P") {
							content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">%</td>';
						} else {
							content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">Amt</td>';
						}
						content += '<td colspan = "15" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_quotation_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + '</td>';
						content += '</tr>';
					}
				}
				for (var index in generate_quotation_pdf.variable.custom.outputparam_taxdetail_overall) {
					content += '<tr style = "height:20px;">';
					content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
					content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">OVERALL ' + generate_quotation_pdf.variable.custom.outputparam_taxdetail_overall[index].charge_code + '</td>';
					content += '<td colspan = "9"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
					if (generate_quotation_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == "A") {
						content += '<td colspan = "15" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + generate_quotation_pdf.variable.custom.outputparam_taxdetail_overall[index].amount + '</td>';
					} else {
						content += '<td colspan = "15" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + generate_quotation_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage + '</td>';
					}
					content += '<td colspan = "5"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
					if (generate_quotation_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == "P") {
						content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">%</td>';
					} else {
						content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">Amt</td>';
					}
					content += '<td colspan = "15" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_quotation_pdf.customRequirementHandler.numberFormat(generate_quotation_pdf.variable.custom.outputparam_taxdetail_overall[index].amount) + '</td>';
					content += '</tr>';
				}
				content += '<tr style = "height:30px;">';
				content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid;"></td>';
				content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid;"></td>';
				content += '<td colspan = "9" style = "padding-top : 2px;border-right: 1px solid;"></td>';
				content += '<td colspan = "15"  style = "padding-top : 2px;border-right: 1px solid;"></td>';
				content += '<td colspan = "5"  style = "padding-top : 2px;border-right: 1px solid;"></td>';
				content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid;"></td>';
				content += '<td colspan = "15"></td>';
				content += '</tr>';
				content += '<tr style = "height:20px;">';
				content += '<td colspan = "4"  style = "padding-top : 2px; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;" ></td>';
				content += '<td colspan = "45" style = "padding-top : 2px; text-align:right; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;padding-right : 2px;">Total</td>';
				content += '<td colspan = "9" style = "padding-top : 2px; text-align:right; font-weight: bold; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;"></td>';
				content += '<td colspan = "15"  style = "padding-top : 2px; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;"></td>';
				content += '<td colspan = "5"  style = "padding-top : 2px; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;"></td>';
				content += '<td colspan = "7"  style = "padding-top : 2px; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;"></td>';
				content += '<td colspan = "15" style = "padding-top : 2px; text-align:right; font-weight: bold; border-bottom: 1px solid; border-top: 1px solid;padding-right : 2px;">' + generate_quotation_pdf.customRequirementHandler.numberFormat(generate_quotation_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount) + '</td>';
				content += '</tr>';
				content += '<tr>';
				content += '<td colspan = "100" style = "border-bottom-style: hidden; padding-left : 2px;" >Amount Chargeable (in words)<span style = "float:right;">E.&O.E </span></td>';
				content += '</tr>';
				content += '<tr>';
				content += '<td colspan = "100" style = "border-bottom-style: hidden; font-weight: bold; padding-left : 2px;">' + generate_quotation_pdf.customRequirementHandler.wordFormat(generate_quotation_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount, generate_quotation_pdf.variable.custom.datasource_1.data()[0].currency_code) + '</td>';
				content += '</tr>';
				content += '<tr style = "height:60px; border-bottom-style: hidden;">';
				content += '<td colspan = "100" ></td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;">Companys VAT TIN</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].udf_char_1 + '</td>';
				content += '<td colspan = "50" style = "border-bottom-style: hidden; border-left-style: hidden;">Companys Bank Details</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;">Companys CST NO</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].udf_char_2 + '</td>';
				content += '<td colspan = "18" style = "border-bottom-style: hidden;border-left-style: hidden;">Bank Name</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "30" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code1 + '</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;">Companys Service Tax No.</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].udf_char_3 + '</td>';
				content += '<td colspan = "18" style = "border-bottom-style: hidden;border-left-style: hidden;">A/c No</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "30" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code2 + '</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "50" style = "border-bottom-style: hidden; padding-left : 2px;"><span style = "border-bottom : 1px solid; padding:1px;">Declaration</span></td>';
				content += '<td colspan = "18" style = "border-left-style: hidden;">Branch & IFS Code</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				var amber = " & ";
				if(generate_quotation_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 == ""){
					var amber = "";
				} 
				content += '<td colspan = "30" style = "border-left-style: hidden; font-weight: bold;">' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code3 + amber + generate_quotation_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 + '</td>';			
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "50" rowspan = "2" style = "border-bottom-style: hidden;padding-left : 2px;padding-bottom : 2px;padding-top : 4px;">Certified that the particulars given above are true & </br> correct & the amount indicated represents the price</br>actually charged & that there is no flow of additional</br> consideration directly or indirectly from the buyer.</td>';
				content += '<td colspan = "50" style = "border-left: 1px solid; border-top: 1px solid; border-bottom-style: hidden;text-align: end;vertical-align: top; font-weight: bold;padding-right : 2px;">for ' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + '</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "50" style = "padding-bottom:2px; border-left: 1px solid; border-bottom-style: hidden;text-align: end;vertical-align: bottom;padding-right : 2px;">Authorized Signatory</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "100" ></td>';
				content += '</tr>';
				content += '</table>';
				content += '<div style = "margin-top:2px;text-align: center; font-size: x-small; text-transform: uppercase;">SUBJECT TO ' + generate_quotation_pdf.variable.custom.datasource_1.data()[0].seller_city + ' JURISDICTION</div>';
				content += '<div style = "margin-top:2px;text-align: center; font-size: x-small;">This is a Computer Generated Quotation</div>';
				content += '</div>';
				return content;
			}
		},
		numberFormat : function (amount) {
			var currency,
			lastThreeDigits,
			remainingDigits,
			result,
			decimalValue = "";
			if (amount.indexOf(".") > 0) {
				decimalValue = amount.substring(amount.indexOf("."), amount.length);
			}
			currency = (Math.floor(amount)).toString();
			lastThreeDigits = currency.substring(currency.length - 3);
			remainingDigits = currency.substring(0, currency.length - 3);
			if (remainingDigits != "") {
				lastThreeDigits = "," + lastThreeDigits;
			}
			result = remainingDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreeDigits + decimalValue;
			return result.replace(/\s+/g, " ");
		},
		wordFormat : function (amount, currencyType) {
			if (parseInt(amount) == 0) {
				return currencyType + " Zero";
			} else if (parseInt(amount) < 0) {
				return "Negative amount";
			} else {
				var value = amount.split(".");
				if (value[0].length >= 10) {
					return "Amount too high to convert";
				} else {
					if (currencyType == "INR") {
						return currencyType + generate_quotation_pdf.customRequirementHandler.rupeestoWords(value[0]);
					} else {
						return currencyType + generate_quotation_pdf.customRequirementHandler.dollarstoWords(value[0]);
					}
				}
			}
		},
		rupeestoWords : function (rupees) {
			var splitDigit,
			onesDigit,
			tensDigit,
			hundredsDigit,
			inWords = [],
			result = "",
			inwordsIndex = 0;
			onesDigit = ["Zero", " One", " Two", " Three", " Four", " Five", " Six", " Seven", " Eight", " Nine"];
			tensDigit = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
			hundredsDigit = ['dummy', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];
			splitDigit = rupees.split("").reverse();
			for (var index = 0; index < splitDigit.length; index++) {
				switch (index) {
				case 0:
					if (splitDigit[index] == 0 || splitDigit[index + 1] == 1) {
						inWords[inwordsIndex] = '';
					} else {
						inWords[inwordsIndex] = onesDigit[splitDigit[index]];
					}
					inWords[inwordsIndex] = inWords[inwordsIndex] + ' Only';
					break;
				case 1:
					tens_complication();
					break;
				case 2:
					if (splitDigit[index] == 0) {
						inWords[inwordsIndex] = '';
					} else if (splitDigit[index - 1] != 0 && splitDigit[index - 2] != 0) {
						inWords[inwordsIndex] = onesDigit[splitDigit[index]] + ' Hundred and';
					} else {
						inWords[inwordsIndex] = onesDigit[splitDigit[index]] + ' Hundred';
					}
					break;
				case 3:
					if (splitDigit[index] == 0 || splitDigit[index + 1] == 1) {
						inWords[inwordsIndex] = '';
					} else {
						inWords[inwordsIndex] = onesDigit[splitDigit[index]];
					}
					if (splitDigit[index + 1] != 0 || splitDigit[index] > 0) {
						inWords[inwordsIndex] = inWords[inwordsIndex] + " Thousand";
					}
					break;
				case 4:
					tens_complication();
					break;
				case 5:
					if (splitDigit[index] == 0 || splitDigit[index + 1] == 1) {
						inWords[inwordsIndex] = '';
					} else {
						inWords[inwordsIndex] = onesDigit[splitDigit[index]];
					}
					if (splitDigit[index + 1] != 0 || splitDigit[index] > 0) {
						inWords[inwordsIndex] = inWords[inwordsIndex] + " Lakh";
					}
					break;
				case 6:
					tens_complication();
					break;
				case 7:
					if (splitDigit[index] == 0 || splitDigit[index + 1] == 1) {
						inWords[inwordsIndex] = '';
					} else {
						inWords[inwordsIndex] = onesDigit[splitDigit[index]];
					}
					inWords[inwordsIndex] = inWords[inwordsIndex] + " Crore";
					break;
				case 8:
					tens_complication();
					break;
				default:
					break;
				}
				inwordsIndex++;
			}
			function tens_complication() {
				if (splitDigit[index] == 0) {
					inWords[inwordsIndex] = '';
				} else if (splitDigit[index] == 1) {
					inWords[inwordsIndex] = tensDigit[splitDigit[index - 1]];
				} else {
					inWords[inwordsIndex] = hundredsDigit[splitDigit[index]];
				}
			}
			inWords.reverse();
			for (var index = 0; index < inWords.length; index++) {
				result += inWords[index];
			}
			return result.replace(/\s+/g, ' ');
		},
		dollarstoWords : function (dollars) {
			var onesDigit,
			tensDigit,
			hundredsDigit,
			thousandsDigit,
			splitDigit,
			result = "",
			indicator = 0;
			onesDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
			tensDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
			hundredsDigit = ["Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
			thousandsDigit = ["", "Thousand", "Million", "Billion", "Trillion"];
			splitDigit = dollars.split("");
			for (var index = 0; index < dollars.length; index++) {
				if ((dollars.length - index) % 3 == 2) {
					if (splitDigit[index] == "1") {
						result += tensDigit[Number(splitDigit[index + 1])] + " ";
						index++;
						indicator = 1;
					} else if (splitDigit[index] != 0) {
						result += hundredsDigit[splitDigit[index] - 2] + " ";
						indicator = 1;
					}
				} else if (splitDigit[index] != 0) {
					result += onesDigit[splitDigit[index]] + " ";
					if ((dollars.length - index) % 3 == 0)
						result += "hundred ";
					indicator = 1;
				}
				if ((dollars.length - index) % 3 == 1) {
					if (indicator)
						result += thousandsDigit[(dollars.length - index - 1) / 3] + " ";
					indicator = 0;
				}
			}
			result = result + "Only";
			return result.replace(/\s+/g, ' ');
		}
	},
	variable : {
		standard : {
			popupIndicator : true
		},
		custom : {
			outputparam_addn_info : [],
			outputparam_detail : [],
			outputparam_taxdetail : [],
		},
	}
};
var generate_customer_order_spares_pdf = {
	constructScreen : function () {
		generate_customer_order_spares_pdf.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "salesinvoice",
				serviceName : "retrieve_customer_order_detail_for_docgen",
				pageSize : 10,
				inputParameter : {
					customer_order_no : "$manage_customer_order_master_spares.variable.custom.selectedRecord.customer_order_no"
				},
				processResponse : true,
				outputPath : false,
				parse : generate_customer_order_spares_pdf.customRequirementHandler.dataSourceParse
			});
		generate_customer_order_spares_pdf.variable.custom.datasource_2 = new kendo.data.DataSource({
				transport : {
					read : {
						url : mserviceUtilities.getWebserverpath() + "common/components/convertHtml2Pdf/ConvertHtml2PDFWeb.aspx",
						dataType : "json",
						method : "post",
						contentType : "application/json;charset=utf-8",
						async : false,
						complete : function (data, response) {
							if (response == "success") {
								generate_customer_order_spares_pdf.variable.custom.response = JSON.parse(data.responseText);
							}
						}
					},
					parameterMap : function () {
						return mserviceUtilities.getTransportParameter({
							inputparam : {
								p_input_html_string : "$generate_customer_order_spares_pdf.customRequirementHandler.getInvoicePdfContent()",
								p_output_file_path : "'content_store\\" + login_profile.client_id + "\\" + login_profile.country_code + "\\customer_order_attachments\\" + manage_customer_order_master_spares.variable.custom.selectedRecord.customer_order_no.replace(/\//g, "-") + "'",
								p_output_file_name : "'" + manage_customer_order_master_spares.variable.custom.selectedRecord.customer_order_no.replace(/\//g, "-") + ".pdf'"
							}
						})
					},
				},
				schema : {
					parse : function (response) {
						return [response];
					}
				}
			});
		generate_customer_order_spares_pdf.variable.custom.datasource_1.read();
		$("#generate_customer_order_spares_pdf").attr("style", "height: 90%; width: 100%;");		
		if (manage_customer_order_master_spares.variable.custom.customer_order_generatePDF == "true") {
			generate_customer_order_spares_pdf.variable.custom.datasource_2.read();
			if (generate_customer_order_spares_pdf.variable.custom.response.status == "success") {
				$("#generate_customer_order_spares_pdf_header_1").attr("style", "height: 100%; width: 100%;").html("<div style ='height:100%;width:100%'>" + "<embed style ='height:100%;width:100%' src='/content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/customer_order_attachments/" + manage_customer_order_master_spares.variable.custom.selectedRecord.customer_order_no.replace(/\//g, "-") + "/" + manage_customer_order_master_spares.variable.custom.selectedRecord.customer_order_no.replace(/\//g, "-") + ".pdf" + "?state=" + new Date().getTime() + "'" + "</div>");
			} else {
				mserviceUtilities.deleteFile("customer_order_attachments/" + manage_customer_order_master_spares.variable.custom.selectedRecord.customer_order_no.replace(/\//g, "-") + "/" + manage_customer_order_master_spares.variable.custom.selectedRecord.customer_order_no.replace(/\//g, "-") + ".pdf");
				alert("Please contact your support desk.");
				return false;
			}
		} else {
			$('#generate_customer_order_spares_pdf_header_1').attr("style", "height: 100%; width: 100%; overflow-y: scroll;").html("<div>" + generate_customer_order_spares_pdf.customRequirementHandler.getInvoiceDraftContent() + "</div>");
		}
	},
	customRequirementHandler : {
		dataSourceParse : function (response) {
			if (response.document.context.outputparam_addn_info != undefined) {
				if (response.document.context.outputparam_addn_info.length != undefined) {
					generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info = response.document.context.outputparam_addn_info;
				} else {
					generate_customer_order_spares_pdf.variable.custom.outputparam_addn_info = [response.document.context.outputparam_addn_info];
				}
			};
			if (response.document.context.outputparam_item_addninfo != undefined) {
				if (response.document.context.outputparam_item_addninfo.length != undefined) {
					generate_customer_order_spares_pdf.variable.custom.outputparam_item_addninfo = response.document.context.outputparam_item_addninfo;
				} else {
					generate_customer_order_spares_pdf.variable.custom.outputparam_item_addninfo = [response.document.context.outputparam_item_addninfo];
				}
			};
			if (response.document.context.outputparam_taxdetail != undefined) {
				if (response.document.context.outputparam_taxdetail.length != undefined) {
					generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail = response.document.context.outputparam_taxdetail;
				} else {
					generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail = [response.document.context.outputparam_taxdetail];
				}
			};
			if (response.document.context.outputparam_detail != undefined) {
				if (response.document.context.outputparam_detail.length != undefined) {
					generate_customer_order_spares_pdf.variable.custom.outputparam_detail = response.document.context.outputparam_detail;
				} else {
					generate_customer_order_spares_pdf.variable.custom.outputparam_detail = [response.document.context.outputparam_detail];
				}
			};
			return [response.document.context.outputparam_header];
		},
		getInvoiceDraftContent : function () {
			generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail,function(overallTaxDetails,index){
				if(overallTaxDetails.item_code == "OVERALL"){
					return overallTaxDetails;
				}
			});
			if(typeof(fn_generate_customer_order_spares_pdf_generate_draft) === "function"){
				return fn_generate_customer_order_spares_pdf_generate_draft();	
			} else {
				var content = '<div id = "generate_customer_order_spares_pdf_content" style = "width:539px; font-size: small;">';
				content += '<div style="position:absolute;opacity: 0.10;font-size: 150px;margin-top:200px;transform: rotate(300deg);">DRAFT</div>';
				content += '<div style = "text-align: center; margin-bottom:3px;" >';
				content += '<span style = "font-weight: bold;" >COMMERCIAL / TAX Customer Order</span>';
				content += '</div>';
				content += '<table width = "100%" style="border : 1px solid; table-layout: fixed; word-wrap: break-word; font-size: x-small;">';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "font-size: small; padding-left: 2px; padding-bottom: 2px; border-right: 1px solid; border-bottom: 1px solid;" rowspan = "3" colspan = "46"><div><span style = "font-weight: bold;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + '</span></br>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_1 + '</br>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2 + '</br>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + '</br>Contact : ' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_contact_no + '</br>E-Mail &nbsp; : ' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_email_id + '</div></td>';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Customer Order No<div style = "float:right;"></div></div></br><div><span style = "font-weight: bold";>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_no + '</span><div style = "float:right;"><span style = "font-weight: bold";></span></div></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px; " colspan = "27"><div>Dated</div></br><div><span style = "font-weight: bold;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Delivery Note</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Mode / Terms of Payment</div></br><div><span style = "font-weight: bold;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].payment_terms + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Supplier Ref</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Other Reference(s)</div></br><div><span style = "font-weight: bold";>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].other_reference + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" rowspan = "3" colspan = "46"><div>Consignee</br> <span style = "font-weight: bold";>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_id_desc + '</span></div></td>';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Buyers Order No</div></br><div> <span style = "font-weight: bold";>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_reference + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Dated</div></br><div><span style = "font-weight: bold";>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_reference_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Despatch Document No</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Dated</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Despatched Through</div></br><div> <span style = "font-weight: bold";>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].despatch_mode_road_rail + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Destination</div></br><div> <span style = "font-weight: bold";>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].destination + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "height:90px;vertical-align:top;">';
				content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" colspan = "46"><div>Buyer </br> <span style = "font-weight: bold";>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_id_desc + '</span></br>' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city + '</div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "54"><div style = "font-size: small;">Terms and Conditions</br><span style = "font-weight:bold; white-space: pre-wrap;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_terms_conditions + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "text-align:center;">';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "4" >Sl</br>No</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "45">Description of Goods</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "10">Quantity</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "17" >Rate</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "7" >per</td>';
				content += '<td style = "border-bottom: 1px solid;" colspan = "17">Amount</td>';
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
							content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</br>' + accessoryString + '</td>';
						} else {
							content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</td>';
						}
					} else {
						content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</td>';
					}
					
					content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].net_quantity + '</td>';
					content += '<td colspan = "17"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;padding-right : 2px;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].std_rate + '</td>';
					content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].uom_code + '</td>';
					content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].gross_amount) + '</td>';
					content += '</tr>';
					var itemCode = generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code;
					for(var indicator = parseInt(index) + 1; indicator < generate_customer_order_spares_pdf.variable.custom.outputparam_detail.length;indicator++){
						if(itemCode == generate_customer_order_spares_pdf.variable.custom.outputparam_detail[indicator].item_code){
							itemCode = "";
						} 
					}
					var lineitemArray = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail,function(lineitemTaxDetails,index){
						if((lineitemTaxDetails.item_code != "OVERALL") && (lineitemTaxDetails.item_code == itemCode)){
							return lineitemTaxDetails;
						}
					});
					for (var index in lineitemArray) {
						content += '<tr style = "height:20px;">';
						content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
						content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + lineitemArray[index].charge_description;
						if (lineitemArray[index].percentage_amount_ind == "P") {
							content += ' (%)';
						} else {
							content += ' (Amt)';
						}
						content += '</td>';
						content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
						if (lineitemArray[index].percentage_amount_ind == "A") {
							content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + lineitemArray[index].amount + '</td>';
						} else {
							content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + lineitemArray[index].percentage + '</td>';
						}
						content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
						content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + '</td>';
						content += '</tr>';
					}
				}
				for (var index in generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall) {
					content += '<tr style = "height:20px;">';
					content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
					content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">OVERALL ' + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].charge_description;
					if (generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == "P") {
						content += ' (%)';
					} else {
						content += ' (Amt)';
					}
					content += '</td>';
					content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
					if (generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == "A") {
						content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount + '</td>';
					} else {
						content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage + '</td>';
					}
					content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
					content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount) + '</td>';
					content += '</tr>';
				}
				content += '<tr style = "height:30px;">';
				content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid;"></td>';
				content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid;"></td>';
				content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid;"></td>';
				content += '<td colspan = "17"  style = "padding-top : 2px;border-right: 1px solid;"></td>';
				content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid;"></td>';
				content += '<td colspan = "17"></td>';
				content += '</tr>';
				content += '<tr style = "height:20px;">';
				content += '<td colspan = "4"  style = "padding-top : 2px; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;" ></td>';
				content += '<td colspan = "45" style = "padding-top : 2px; text-align:right; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;padding-right : 2px;">Total</td>';
				content += '<td colspan = "10" style = "padding-top : 2px; text-align:right; font-weight: bold; border-right: 1px solid; border-bottom: 1px solid; border-top: 1px solid;"></td>';
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
				content += '<tr style = "height:60px; border-bottom-style: hidden;">';
				content += '<td colspan = "100" ></td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;">Companys VAT TIN</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_char_1 + '</td>';
				content += '<td colspan = "50" style = "border-bottom-style: hidden; border-left-style: hidden;">Companys Bank Details</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;">Companys CST NO</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_char_2 + '</td>';
				content += '<td colspan = "18" style = "border-bottom-style: hidden;border-left-style: hidden;">Bank Name</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "30" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code1 + '</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;">Companys Service Tax No.</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_char_3 + '</td>';
				content += '<td colspan = "18" style = "border-bottom-style: hidden;border-left-style: hidden;">A/c No</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "30" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code2 + '</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "50" style = "border-bottom-style: hidden; padding-left : 2px;"><span style = "border-bottom : 1px solid; padding:1px;">Declaration</span></td>';
				content += '<td colspan = "18" style = "border-left-style: hidden;">Branch & IFS Code</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				var amber = " & ";
				if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 == ""){
					var amber = "";
				} 
				content += '<td colspan = "30" style = "border-left-style: hidden; font-weight: bold;">' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code3 + amber + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 + '</td>';			
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "50" rowspan = "2" style = "border-bottom-style: hidden;padding-left : 2px;padding-bottom : 2px;padding-top : 4px;">Certified that the particulars given above are true & </br> correct & the amount indicated represents the price</br>actually charged & that there is no flow of additional</br> consideration directly or indirectly from the buyer.</td>';
				content += '<td colspan = "50" style = "border-left: 1px solid; border-top: 1px solid; border-bottom-style: hidden;text-align: end;vertical-align: top; font-weight: bold;padding-right : 2px;">for ' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + '</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "50" style = "padding-bottom:2px; border-left: 1px solid; border-bottom-style: hidden;text-align: end;vertical-align: bottom;padding-right : 2px;">Authorized Signatory</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "100" ></td>';
				content += '</tr>';
				content += '</table>';
				content += '<div style = "margin-top:2px;text-align: center; font-size: x-small; text-transform: uppercase;">SUBJECT TO ' + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + ' JURISDICTION</div>';
				content += '<div style = "margin-top:2px;text-align: center; font-size: x-small;">This is a Computer Generated Customer Order</div>';
				content += '</div>';
				return content;
			}
		},
		getInvoicePdfContent : function () {
			generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail,function(overallTaxDetails,index){
				if(overallTaxDetails.item_code == "OVERALL"){
					return overallTaxDetails;
				}
			});
			$.ajax({
				url : mserviceUtilities.getWebserverpath() + "common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_id + ".txt",
				async : false,
				cache : false
			}).done(function (data) {
				generate_customer_order_spares_pdf.variable.custom.imageData1 = data;
			});
			$.ajax({
				url : mserviceUtilities.getWebserverpath() + "common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + login_profile.client_id + ".txt",
				async : false,
				cache : false
			}).done(function (data) {
				generate_customer_order_spares_pdf.variable.custom.imageData2 = data;
			});
			if(typeof(fn_generate_customer_order_spares_pdf_generate_pdf) === "function"){
				return fn_generate_customer_order_spares_pdf_generate_pdf();	
			} else {
				var content = "<!DOCTYPE html><html><head>";
				content += "<style>table { page-break-after:auto }tr { page-break-inside:avoid; page-break-after:auto } thead { display:table-header-group }tfoot { display:table-footer-group }</style>";
				content += "</head><body>";
				content += "<div style='width:1000px; font-size: large;'>";
				content += "<div style = 'margin-bottom:3px;'>";
				if (generate_customer_order_spares_pdf.variable.custom.imageData1 != undefined) {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;' src =" + generate_customer_order_spares_pdf.variable.custom.imageData1 + "/>";
				} else {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;' src =" + "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC" + "/>";
				}
				content += "<span style = 'font-weight: bold;margin-left: 250px;' >COMMERCIAL / TAX CUSTOMERORDER</span>";
				if (generate_customer_order_spares_pdf.variable.custom.imageData2 != undefined) {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;float:right;' src =" + generate_customer_order_spares_pdf.variable.custom.imageData2 + "/>";
				}
				content += "</div>";
				content += "<table width = '100%' border = '1px' style='table-layout: fixed; word-wrap: break-word; font-size: large;border-collapse:collapse;'>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = 'font-size: large; padding-left: 2px; padding-bottom: 2px;' rowspan = '3' colspan = '46'><div><span style = 'font-weight: bold;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + "</span></br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_1 + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2 + "</br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + "</br>Contact : " + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_contact_no + "</br>E-Mail &nbsp; : " + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_email_id + "</div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Customer Order No<div style = 'float:right;'></div></div></br><div><span style = 'font-weight: bold';>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_no + "</span><div style = 'float:right;'><span style = 'font-weight: bold';></span></div></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Dated</div></br><div><span style = 'font-weight: bold;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_date + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Delivery Note</div></br><div><span style = 'font-weight: bold';></span></div></td>";
				content += "<td style = 'padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Mode / Terms of Payment</div></br><div><span style = 'font-weight: bold;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].payment_terms + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Supplier Ref</div></br><div><span style = 'font-weight: bold';></span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Other Reference(s)</div></br><div><span style = 'font-weight: bold';>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].other_reference + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = 'font-size: large;padding-left: 2px; padding-bottom: 2px; ' rowspan = '3' colspan = '46'><div>Consignee</br> <span style = 'font-weight: bold';>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].consignee_id_desc + "</span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Buyers Order No</div></br><div> <span style = 'font-weight: bold';>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_reference + "</span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Dated</div></br><div><span style = 'font-weight: bold';>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_reference_date + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Despatch Document No</div></br><div><span style = 'font-weight: bold';></span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Dated</div></br><div><span style = 'font-weight: bold';></span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Despatched Through</div></br><div> <span style = 'font-weight: bold';>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].despatch_mode_road_rail + "</span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Destination</div></br><div> <span style = 'font-weight: bold';>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].destination + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'height:90px;vertical-align:top;'>";
				content += "<td style = 'font-size: large;padding-left: 2px; padding-bottom: 2px; ' colspan = '46'><div>Buyer </br> <span style = 'font-weight: bold';>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_id_desc + "</span></br>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city + "</div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '54'><div style = 'font-size: large;'>Terms and Conditions</br><span style = 'font-weight:bold; white-space: pre-wrap;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_terms_conditions + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'text-align:center;'>";
				content += "<td style = ' ' colspan = '4' >Sl</br>No</td>";
				content += "<td style = ' ' colspan = '45'>Description of Goods</td>";
				content += "<td style = ' ' colspan = '10'>Quantity</td>";
				content += "<td style = ' ' colspan = '17' >Rate</td>";
				content += "<td style = ' ' colspan = '7' >per</td>";
				content += "<td style = '' colspan = '17'>Amount</td>";
				content += "</tr>";
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
							var accessoryString = " [ "; 
							for(counter = 0; counter < accessoryDetail.length; counter++){ 
								accessoryString += (counter+1) + "." + accessoryDetail[counter].accessory_item_description + "</br>";
							}
							accessoryString = accessoryString.substring(0, accessoryString.length - 5) + " ]";
							content += "<td colspan = '45' style = 'padding-top : 2px; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</br>' + accessoryString + "</td>";
						} else {
							content += "<td colspan = '45' style = 'padding-top : 2px; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + "</td>";
						}
					} else {
						content += "<td colspan = '45' style = 'padding-top : 2px; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_description + "</td>";
					}
					content += "<td colspan = '10' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].net_quantity + "</td>";
					content += "<td colspan = '17'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;padding-right : 2px;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].std_rate + "</td>";
					content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].uom_code + "</td>";
					content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].gross_amount) + "</td>";
					content += "</tr>";
					if(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
						var itemCode = generate_customer_order_spares_pdf.variable.custom.outputparam_detail[index].item_code;
						for(var indicator = parseInt(index) + 1; indicator < generate_customer_order_spares_pdf.variable.custom.outputparam_detail.length;indicator++){
							if(itemCode == generate_customer_order_spares_pdf.variable.custom.outputparam_detail[indicator].item_code){
								itemCode = "";
							} 
						}
						var lineitemArray = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail,function(lineitemTaxDetails,index){
							if((lineitemTaxDetails.item_code != "OVERALL") && (lineitemTaxDetails.item_code == itemCode)){
								return lineitemTaxDetails;
							}
						});
						for (var index in lineitemArray) {
							content += "<tr style = 'height:20px;'>";
							content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
							content += "<td colspan = '45' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + lineitemArray[index].charge_description;
							if (lineitemArray[index].percentage_amount_ind == 'P') {
								content += " (%)";
							} else {
								content += " (Amt)";
							}
							content += "</td>";
							content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
							if (lineitemArray[index].percentage_amount_ind == 'A') {
								content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + lineitemArray[index].amount + "</td>";
							} else {
								content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + lineitemArray[index].percentage + "</td>";
							}
							content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
							content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + "</td>";
							content += "</tr>";
						}
					}
				}
				if(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
					generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall = $.grep(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail,function(overallTaxDetails,index){
						if(overallTaxDetails.item_code == "OVERALL"){
							return overallTaxDetails;
						}
					});
					for (var index in generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall) {
						content += "<tr style = 'height:20px;'>";
						content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
						content += "<td colspan = '45' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>OVERALL " + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].charge_description;
						if (generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'P') {
							content += " (%)";
						} else {
							content += " (Amt)";
						}
						content += "</td>";
						content += "<td colspan = '10'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
						if (generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'A') {
							content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount + "</td>";
						} else {
							content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage + "</td>";
						}
						content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
						content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount) + "</td>";
						content += "</tr>";
					}
				}
				content += "<tr style = 'height:30px;'>";
				content += "<td colspan = '4'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '45' style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '10' style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '17'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '7'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '17'></td>";
				content += "</tr>";
				content += "<tr style = 'height:20px;'>";
				content += "<td colspan = '4'style = 'padding-top : 2px; ' ></td>";
				content += "<td colspan = '45' style = 'padding-top : 2px; text-align:right; padding-right : 2px;'>Total</td>";
				content += "<td colspan = '10' style = 'padding-top : 2px; text-align:right; font-weight: bold; '></td>";
				content += "<td colspan = '17'style = 'padding-top : 2px; '></td>";
				content += "<td colspan = '7'style = 'padding-top : 2px; '></td>";
				content += "<td colspan = '17' style = 'padding-top : 2px; text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.numberFormat(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_net_amount) + "</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = 'border-bottom-style: hidden; padding-left : 2px;' >Amount Chargeable (in words)<span style = 'float:right;'>E.&O.E </span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = 'border-bottom-style: hidden; font-weight: bold; padding-left : 2px;'>" + generate_customer_order_spares_pdf.customRequirementHandler.wordFormat(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].customer_order_net_amount, generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + "</td>";
				content += "</tr>";
				content += "<tr style = 'height:60px; border-bottom-style: hidden;'>";
				content += "<td colspan = '100' ></td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden; padding-left : 2px;'>Companys VAT TIN</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_char_1 + "</td>";
				content += "<td colspan = '50' style = 'border-bottom-style: hidden; border-left-style: hidden;'>Companys Bank Details</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden; padding-left : 2px;'>Companys CST NO</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_char_2 + "</td>";
				content += "<td colspan = '18' style = 'border-bottom-style: hidden;border-left-style: hidden;'>Bank Name</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				content += "<td colspan = '30' style = 'border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code1 + "</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden; padding-left : 2px;'>Companys Service Tax No.</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_char_3 + "</td>";
				content += "<td colspan = '18' style = 'border-bottom-style: hidden;border-left-style: hidden;'>A/c No</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				content += "<td colspan = '30' style = 'border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code2 + "</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '50' style = 'border-bottom-style: hidden; padding-left : 2px;'><span style = 'border-bottom : 1px solid; padding:1px;'>Declaration</span></td>";
				content += "<td colspan = '18' style = 'border-left-style: hidden;'>Branch & IFS Code</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				var amber = "&";
				if(generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 == ""){
					var amber = "";
				}
				content += "<td colspan = '30' style = 'border-left-style: hidden; font-weight: bold;'>" + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code3 + amber + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 + "</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '50' rowspan = '2' style = 'border-bottom-style: hidden;padding-left : 2px;padding-bottom : 2px;padding-top : 4px;'>Certified that the particulars given above are true & </br> correct & the amount indicated represents the price</br>actually charged & that there is no flow of additional</br> consideration directly or indirectly from the buyer.</td>";
				content += "<td colspan = '50' style = 'border-bottom-style: hidden;text-align: end;vertical-align: top; font-weight: bold;padding-right : 2px;'>for " + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + "</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '50' style = 'padding-bottom:2px;  border-bottom-style: hidden;text-align: end;vertical-align: bottom;padding-right : 2px;'>Authorized Signatory</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '100' ></td>";
				content += "</tr>";
				content += "</table>";
				content += "<div style = 'margin-top:2px;text-align: center; font-size: large;text-transform: uppercase;'>SUBJECT TO " + generate_customer_order_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + " JURISDICTION</div>";
				content += "<div style = 'margin-top:2px;text-align: center; font-size: large;'>This is a Computer Generated Customer Order</div>";
				content += "</div></body></html>";
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
						return currencyType + generate_customer_order_spares_pdf.customRequirementHandler.rupeestoWords(amount);
					} else {
						return currencyType + generate_customer_order_spares_pdf.customRequirementHandler.dollarstoWords(value[0]);
					}
				}
			}
		},
		rupeestoWords : function (rupees) {
			/* var splitDigit,
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
			return result.replace(/\s+/g, ' ');*/
			function baseValueConversion(amount){
				var words = new Array();
				words[0] = 'Zero';words[1] = 'One';words[2] = 'Two';words[3] = 'Three';words[4] = 'Four';words[5] = 'Five';words[6] = 'Six';words[7] = 'Seven';words[8] = 'Eight';words[9] = 'Nine';words[10] = 'Ten';words[11] = 'Eleven';words[12] = 'Twelve';words[13] = 'Thirteen';words[14] = 'Fourteen';words[15] = 'Fifteen';words[16] = 'Sixteen';words[17] = 'Seventeen';words[18] = 'Eighteen';words[19] = 'Nineteen';words[20] = 'Twenty';words[30] = 'Thirty';words[40] = 'Forty';words[50] = 'Fifty';words[60] = 'Sixty';words[70] = 'Seventy';words[80] = 'Eighty';words[90] = 'Ninety';var op;
				amount = amount.toString();
				var atemp = amount.split(".");
				var number = atemp[0].split(",").join("");
				var n_length = number.length;
				var words_string = "";
				if(n_length <= 9){
					var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
					var received_n_array = new Array();
					for (var i = 0; i < n_length; i++){
						received_n_array[i] = number.substr(i, 1);
					}
					for (var i = 9 - n_length, j = 0; i < 9; i++, j++){
						n_array[i] = received_n_array[j];
					}
					for (var i = 0, j = 1; i < 9; i++, j++){
						if(i == 0 || i == 2 || i == 4 || i == 7){
							if(n_array[i] == 1){
								n_array[j] = 10 + parseInt(n_array[j]);
								n_array[i] = 0;
							}
						}
					}
					value = "";
					for (var i = 0; i < 9; i++){
						if(i == 0 || i == 2 || i == 4 || i == 7){
							value = n_array[i] * 10;
						} else {
							value = n_array[i];
						}
						if(value != 0){
							words_string += words[value] + " ";
						}
						if((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)){
							words_string += "Crores ";
						}
						if((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)){
							words_string += "Lakhs ";
						}
						if((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)){
							words_string += "Thousand ";
						}
						if(i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)){
							words_string += "Hundred ";
						} else if(i == 6 && value != 0){
							words_string += "Hundred ";
						}
					}
					words_string = words_string.split(" ").join(" ");
				}
				return words_string;
			}
			function decimalValueConversion(n){
				nums = n.toString().split('.')
				var whole = baseValueConversion(nums[0])
				if(nums[1]==null)nums[1]=0;
				if(nums[1].length == 1 )nums[1]=nums[1]+'0';
				if(nums[1].length> 2){nums[1]=nums[1].substring(2,length - 1)}
				if(nums.length == 2){
					if(nums[0]<=9){nums[0]=nums[0]*10} else {nums[0]=nums[0]};
					var fraction = baseValueConversion(nums[1])
					if(whole=='' && fraction==''){op= ' Zero only';}
					if(whole=='' && fraction!=''){op= ' ' + fraction + 'Paisa only';}
					if(whole!='' && fraction==''){op= ' ' + whole + 'only';} 
					if(whole!='' && fraction!=''){op= ' ' + whole + 'and ' + fraction + 'Paisa only';}
					amt=rupees;
					if(amt > 999999999.99){op='The amount is too big to convert';}
					if(isNaN(amt) == true ){op='Amount in number appears to be incorrect. Please Check.';}
					return op;
				}
			}
			return decimalValueConversion(Math.round(rupees*100)/100);
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
var generate_quotation_service_spares_pdf = {
	constructScreen : function () {
		generate_quotation_service_spares_pdf.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "salesinvoice",
				serviceName : "retrieve_quotation_detail_for_docgen",
				pageSize : 10,
				inputParameter : {
					quotation_no : "$manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no"
				},
				processResponse : true,
				outputPath : false,
				parse : generate_quotation_service_spares_pdf.customRequirementHandler.dataSourceParse
			});
		generate_quotation_service_spares_pdf.variable.custom.datasource_2 = new kendo.data.DataSource({
			transport : {
				read : {
					url : mserviceUtilities.getWebserverpath() + "common/components/convertHtml2Pdf/ConvertHtml2PDFWeb.aspx",
					dataType : "json",
					method : "post",
					contentType : "application/json;charset=utf-8",
					async : false,
					complete : function (data, response) {
						if (response == "success") {
							generate_quotation_service_spares_pdf.variable.custom.response = JSON.parse(data.responseText);
						}
					}
				},
				parameterMap : function () {
					return mserviceUtilities.getTransportParameter({
						inputparam : {
							p_input_html_string : "$generate_quotation_service_spares_pdf.customRequirementHandler.getInvoicePdfContent()",
							p_output_file_path : "'content_store\\" + login_profile.client_id + "\\" + login_profile.country_code + "\\quotation_attachments\\" + manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + "'",
							p_output_file_name : "'" + manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf'"
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
		generate_quotation_service_spares_pdf.variable.custom.datasource_1.read();
		$("#generate_quotation_service_spares_pdf").attr("style", "height: 90%; width: 100%;");
		if (manage_quotation_master_service_spares.variable.custom.quotation_generatePDF == "true") {
			generate_quotation_service_spares_pdf.variable.custom.datasource_2.read();
			if (generate_quotation_service_spares_pdf.variable.custom.response.status == "success") {
				
				$("#generate_quotation_service_spares_pdf_header_1").attr("style", "height: 100%; width: 100%;").html("<div style ='height:100%;width:100%'>" + "<embed style ='height:100%;width:100%' src='/content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/quotation_attachments/" + manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + "/" + manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf" + "?state=" + new Date().getTime() + "'" + "</div>");
				
				generate_quotation_service_spares_pdf.variable.custom.projectId = manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no;
				generate_quotation_service_spares_pdf.variable.custom.templateId = manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no;
				generate_quotation_service_spares_pdf.variable.custom.datasource_3 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_attached_docs",
					outputPath : "context/outputparam_detail",
					inputParameter : {
						p_project_task_level_ind : "'Q'",
						p_project_id : "$generate_quotation_service_spares_pdf.variable.custom.projectId",
						p_template_id : "''",
						p_task_id : "'0'",
					}
				});
				generate_quotation_service_spares_pdf.variable.custom.datasource_3.read();
				var attachedDocs = $.grep(generate_quotation_service_spares_pdf.variable.custom.datasource_3.data(), function (data) {
					return data.doc_name == manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf";
				});
				if(attachedDocs.length == 0){
					if (mserviceUtilities.loadJSScripts(["../../s_iscripts/save_project_filelist_attachments_master.js"])) {
						var returnValue = executeService_save_project_filelist_attachments_master({
							p_project_id : manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no.substring(0,20),
							p_task_id : "0",
							p_attach_level_ind : "Q",
							inputparam_filelist : [{
								p_file_category : "P",
								p_file_type : "P",
								p_file_name : manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf",
								p_closure_report_ind : "false",
							}],
							p_inputparam_xml : "<inputparam><udf_char_1>" + manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no+ "</udf_char_1></inputparam>"
						});
						if (returnValue == "SP001") {
							return true;
						} else if (returnValue == false) {
							mserviceUtilities.deleteFile("quotation_attachments/" + manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + "/" + manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf");
							alert("Please contact your support desk.");
							return false;
						}
					} else {
						alert("Please contact your support desk.");
						return false;
					}
				}
				
			} else {
				mserviceUtilities.deleteFile("quotation_attachments/" + manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + "/" + manage_quotation_master_service_spares.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf");
				alert("Please contact your support desk.");
				return false;
			}
		} else {
			$('#generate_quotation_service_spares_pdf_header_1').attr("style", "height: 100%; width: 100%; overflow-y: scroll;").html("<div>" + generate_quotation_service_spares_pdf.customRequirementHandler.getInvoiceDraftContent() + "</div>");
		}
	},
	customRequirementHandler : {
		dataSourceParse : function (response) {
			myData = response;
			if (response.document.context.outputparam_addn_info != undefined) {
				if (response.document.context.outputparam_addn_info.length != undefined) {
					generate_quotation_service_spares_pdf.variable.custom.outputparam_addn_info = response.document.context.outputparam_addn_info;
				} else {
					generate_quotation_service_spares_pdf.variable.custom.outputparam_addn_info = [response.document.context.outputparam_addn_info];
				}
			};
			if (response.document.context.outputparam_item_addninfo != undefined) {
				if (response.document.context.outputparam_item_addninfo.length != undefined) {
					generate_quotation_service_spares_pdf.variable.custom.outputparam_item_addninfo = response.document.context.outputparam_item_addninfo;
				} else {
					generate_quotation_service_spares_pdf.variable.custom.outputparam_item_addninfo = [response.document.context.outputparam_item_addninfo];
				}
			};
			if (response.document.context.outputparam_taxdetail != undefined) {
				if (response.document.context.outputparam_taxdetail.length != undefined) {
					generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail = response.document.context.outputparam_taxdetail;
				} else {
					generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail = [response.document.context.outputparam_taxdetail];
				}
			};
			if (response.document.context.outputparam_detail != undefined) {
				if (response.document.context.outputparam_detail.length != undefined) {
					generate_quotation_service_spares_pdf.variable.custom.outputparam_detail = response.document.context.outputparam_detail;
				} else {
					generate_quotation_service_spares_pdf.variable.custom.outputparam_detail = [response.document.context.outputparam_detail];
				}
			};
			return [response.document.context.outputparam_header];
		},
		getInvoiceDraftContent : function () {
			generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall = $.grep(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail,function(overallTaxDetails,index){
				if(overallTaxDetails.item_code == "OVERALL"){
					return overallTaxDetails;
				}
			});
			if(typeof(fn_taxation_quotation_service_spares_generate_draft) === "function"){
				return fn_taxation_quotation_service_spares_generate_draft();	
			} else {
				var content = '<div id = "generate_quotation_service_spares_pdf_content" style = "width:539px; font-size: small;">';
				content += '<div style="position:absolute;opacity: 0.10;font-size: 150px;margin-top:200px;transform: rotate(300deg);">DRAFT</div>';
				content += '<div style = "text-align: center; margin-bottom:3px;" >';
				content += '<span style = "font-weight: bold;" >COMMERCIAL / TAX QUOTATION</span>';
				content += '</div>';
				content += '<table width = "100%" style="border : 1px solid; table-layout: fixed; word-wrap: break-word; font-size: x-small;">';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "font-size: small; padding-left: 2px; padding-bottom: 2px; border-right: 1px solid; border-bottom: 1px solid;" rowspan = "3" colspan = "46"><div><span style = "font-weight: bold;">' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + '</span></br>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_1 + '</br>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].seller_address_line_2 + '</br>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + '</br>Contact : ' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].seller_contact_no + '</br>E-Mail &nbsp; : ' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].seller_email_id + '</div></td>';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Quotation No<div style = "float:right;"></div></div></br><div><span style = "font-weight: bold";>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_no + '</span><div style = "float:right;"><span style = "font-weight: bold";></span></div></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px; " colspan = "27"><div>Dated</div></br><div><span style = "font-weight: bold;">' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Delivery Note</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Mode / Terms of Payment</div></br><div><span style = "font-weight: bold;">' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].payment_terms + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Supplier Ref</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Other Reference(s)</div></br><div><span style = "font-weight: bold";>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].other_reference + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" rowspan = "3" colspan = "46"><div>Consignee</br> <span style = "font-weight: bold";>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].consignee_id_desc + '</span></div></td>';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Buyers Order No</div></br><div> <span style = "font-weight: bold";>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_reference + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Dated</div></br><div><span style = "font-weight: bold";>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_reference_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Despatch Document No</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Dated</div></br><div><span style = "font-weight: bold";></span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Despatched Through</div></br><div> <span style = "font-weight: bold";>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].despatch_mode_road_rail + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Destination</div></br><div> <span style = "font-weight: bold";>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].destination + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "height:90px;vertical-align:top;">';
				content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" colspan = "46"><div>Buyer </br> <span style = "font-weight: bold";>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_id_desc + '</span></br>' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city + '</div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "54"><div style = "font-size: small;">Terms and Conditions</br><span style = "font-weight:bold; white-space: pre-wrap;">' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_terms_conditions + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "text-align:center;">';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "4" >Sl</br>No</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "45">Description of Goods</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "10">Quantity</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "17" >Rate</td>';
				content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "7" >per</td>';
				content += '<td style = "border-bottom: 1px solid;" colspan = "17">Amount</td>';
				content += '</tr>';
				for (var index in generate_quotation_service_spares_pdf.variable.custom.outputparam_detail) {
					content += '<tr style = "height:20px;">';
					content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_sl_no + '</td>';
					
					if(generate_quotation_service_spares_pdf.variable.custom.outputparam_item_addninfo != undefined){
						var itemData =  generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code;
						var accessoryDetail = $.grep(generate_quotation_service_spares_pdf.variable.custom.outputparam_item_addninfo, function (accessoryInfo, index) {
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
							content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;">' + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</br>' + accessoryString + '</td>';
						} else {
							content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;">' + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</td>';
						}
					} else {
						content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;">' + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</td>';
					}
					
					content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].net_quantity + '</td>';
					content += '<td colspan = "17"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;padding-right : 2px;">' + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].std_rate + '</td>';
					content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].uom_code + '</td>';
					content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].gross_amount) + '</td>';
					content += '</tr>';
					var itemCode = generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code;
					for(var indicator = parseInt(index) + 1; indicator < generate_quotation_service_spares_pdf.variable.custom.outputparam_detail.length;indicator++){
						if(itemCode == generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[indicator].item_code){
							itemCode = "";
						} 
					}
					var lineitemArray = $.grep(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail,function(lineitemTaxDetails,index){
						if((lineitemTaxDetails.item_code != "OVERALL") && (lineitemTaxDetails.item_code == itemCode)){
							return lineitemTaxDetails;
						}
					});
					for (var index in lineitemArray) {
						content += '<tr style = "height:20px;">';
						content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
						content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + lineitemArray[index].charge_description;
						if (lineitemArray[index].percentage_amount_ind == 'P') {
							content += " (%)";
						} else {
							content += " (Amt)";
						}
						content += '</td>';
						content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
						if (lineitemArray[index].percentage_amount_ind == "A") {
							content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + lineitemArray[index].amount + '</td>';
						} else {
							content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + lineitemArray[index].percentage + '</td>';
						}
						content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
						content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + '</td>';
						content += '</tr>';
					}
				}
				for (var index in generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall) {
					content += '<tr style = "height:20px;">';
					content += '<td colspan = "4"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden"></td>';
					content += '<td colspan = "45" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">OVERALL ' + generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].charge_description;
					if (generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'P') {
						content += " (%)";
					} else {
						content += " (Amt)";
					}
					content += '</td>';
					content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
					if (generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == "A") {
						content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount + '</td>';
					} else {
						content += '<td colspan = "17" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;">' + generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage + '</td>';
					}
					content += '<td colspan = "7"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right;"></td>';
					content += '<td colspan = "17" style = "padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount) + '</td>';
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
				content += '<td colspan = "17" style = "padding-top : 2px; text-align:right; font-weight: bold; border-bottom: 1px solid; border-top: 1px solid;padding-right : 2px;">' + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount) + '</td>';
				content += '</tr>';
				content += '<tr>';
				content += '<td colspan = "100" style = "border-bottom-style: hidden; padding-left : 2px;" >Amount Chargeable (in words)<span style = "float:right;">E.&O.E </span></td>';
				content += '</tr>';
				content += '<tr>';
				content += '<td colspan = "100" style = "border-bottom-style: hidden; font-weight: bold; padding-left : 2px;">' + generate_quotation_service_spares_pdf.customRequirementHandler.wordFormat(generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount, generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + '</td>';
				content += '</tr>';
				content += '<tr style = "height:60px; border-bottom-style: hidden;">';
				content += '<td colspan = "100" ></td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;">Companys VAT TIN</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].udf_char_1 + '</td>';
				content += '<td colspan = "50" style = "border-bottom-style: hidden; border-left-style: hidden;">Companys Bank Details</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;">Companys CST NO</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].udf_char_2 + '</td>';
				content += '<td colspan = "18" style = "border-bottom-style: hidden;border-left-style: hidden;">Bank Name</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "30" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code1 + '</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "24" style = "border-bottom-style: hidden; padding-left : 2px;">Companys Service Tax No.</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "24" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].udf_char_3 + '</td>';
				content += '<td colspan = "18" style = "border-bottom-style: hidden;border-left-style: hidden;">A/c No</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				content += '<td colspan = "30" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code2 + '</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "50" style = "border-bottom-style: hidden; padding-left : 2px;"><span style = "border-bottom : 1px solid; padding:1px;">Declaration</span></td>';
				content += '<td colspan = "18" style = "border-left-style: hidden;">Branch & IFS Code</td>';
				content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
				var amber = " & ";
				if(generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 == ""){
					var amber = "";
				} 
				content += '<td colspan = "30" style = "border-left-style: hidden; font-weight: bold;">' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code3 + amber + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code4 + '</td>';			
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "50" rowspan = "2" style = "border-bottom-style: hidden;padding-left : 2px;padding-bottom : 2px;padding-top : 4px;">Certified that the particulars given above are true & </br> correct & the amount indicated represents the price</br>actually charged & that there is no flow of additional</br> consideration directly or indirectly from the buyer.</td>';
				content += '<td colspan = "50" style = "border-left: 1px solid; border-top: 1px solid; border-bottom-style: hidden;text-align: end;vertical-align: top; font-weight: bold;padding-right : 2px;">for ' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].seller_id_desc + '</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "50" style = "padding-bottom:2px; border-left: 1px solid; border-bottom-style: hidden;text-align: end;vertical-align: bottom;padding-right : 2px;">Authorized Signatory</td>';
				content += '</tr>';
				content += '<tr style = "padding:2px;">';
				content += '<td colspan = "100" ></td>';
				content += '</tr>';
				content += '</table>';
				content += '<div style = "margin-top:2px;text-align: center; font-size: x-small; text-transform: uppercase;">SUBJECT TO ' + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].seller_city + ' JURISDICTION</div>';
				content += '<div style = "margin-top:2px;text-align: center; font-size: x-small;">This is a Computer Generated Quotation</div>';
				content += '</div>';
				return content;
			}
		},
		getInvoicePdfContent : function () {
			$.ajax({
				url : mserviceUtilities.getWebserverpath() + "common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].seller_id + ".txt",
				async : false,
				cache : false
			}).done(function (data) {
				generate_quotation_service_spares_pdf.variable.custom.imageData1 = data;
			});
			$.ajax({
				url : mserviceUtilities.getWebserverpath() + "common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + login_profile.client_id + ".txt",
				async : false,
				cache : false
			}).done(function (data) {
				generate_quotation_service_spares_pdf.variable.custom.imageData2 = data;
			});
			if(typeof(fn_taxation_quotation_service_spares_generate_pdf) === "function"){
				return fn_taxation_quotation_service_spares_generate_pdf();	
			} else {
				var content = "<!DOCTYPE html><html><head>";
				content += '<table width = "100%" style="table-layout: fixed word-wrap: break-word font-size: x-small">';
content += '<tr>';
				if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'PAM K') {
					content += '<td colspan="100" style="text-align:left; padding:2%;  font-weight:bold; font-size:20px;color:#b30404">';
					content += 'SERVICE QUOTATION <br/> ';
					content += '</td>';
				}else if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'PAM T') {
					content += '<td colspan="100" style="text-align:left; padding:2%;  font-weight:bold; font-size:20px;color:#b30404">';
					content += 'SERVICE QUOTATION <br/> ';
					content += '</td>';
				}else if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'APT') {
					content += '<td colspan="100" style="text-align:left; padding:2%;  font-weight:bold; font-size:20px;color:#b30404">';
					content += 'SERVICE QUOTATION <br/> 01.09.2018 I CFT-FT-24';
					content += '</td>';
				} else {
					content += '<td colspan="100" style="text-align:left; padding:2%;  font-weight:bold; font-size:20px;color:#b30404">';
					content += 'SERVICE QUOTATION';
					content += '</td>';
				}
				
				content += '<td colspan="100" style="text-align:right;padding-bottom:20px">';
				content += '<img width="144px" height="83px" src ="data:image/png;base64,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" />';	
				content += '</td>';
				content += '</tr>';
				content += '</table>';
				content += "<table width = '100%' border = '1px' style='table-layout: fixed; word-wrap: break-word; font-size: large;border-collapse:collapse;'>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "</tr>";
				content += "<tr style = 'height:90px;vertical-align:top;'>";
				content += "<td style = 'font-size: large;padding:1%; ' colspan = '50'><div><b>M/s.</b> <span style = 'font-weight: bold';>" + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_id_desc + "</span></br><b>" + generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_city +"<br>"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].buyer_address_line_1+"</b></div><span><b> KIND ATTENTION Mr. : &nbsp;"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].customer_contact_name+"</b></span><br/><br/><span><b> EQUIPMENT NO. MODEL : &nbsp;"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].equipment_category+"</b></span></td>";
				content += "<td colspan='50' style='font-family:Helvetica; padding:2%; text-align:left; font-weight:bold; 	font-size:12px;'><br/><br/><br/>QUOTE &nbsp;&nbsp;NO &nbsp;:&nbsp;&nbsp;&nbsp;<span style='font-size:15px;'>"+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_no +"</span> <br/><br/><br/><span style='font-size:15px;'> DATE&nbsp;&emsp;&emsp;: &nbsp;"+ generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_date +"</span>";
				content += "</td>";
				content += "</tr>";
				content += "<tr style = 'text-align:center;'>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '4' ><b>Sl</br>No</b></td>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '46'><b>Machine Description</b></td>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '9'><b>Total No.</b></td>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '17' ><b>Rate in INR</b></td>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '7' ><b>per</b></td>";
				content += "<td style = 'background-color:#db2d27; color:#ffffff;'  colspan = '17'><b>Amount in INR</b></td>";
				content += "</tr>";
				for (var index in generate_quotation_service_spares_pdf.variable.custom.outputparam_detail) {
					content += "<tr style = 'height:20px;'>";
					content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_sl_no + "</td>";
					
					if(generate_quotation_service_spares_pdf.variable.custom.outputparam_item_addninfo != undefined){
						var itemData =  generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code;
						var accessoryDetail = $.grep(generate_quotation_service_spares_pdf.variable.custom.outputparam_item_addninfo, function (accessoryInfo, index) {
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
							content += "<td colspan = '46' style = 'padding-top : 2px; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_description + '</br>' + accessoryString + "</td>";
						} else {
							content += "<td colspan = '46' style = 'padding-top : 2px; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_description + "</td>";
						}
					} else {
						content += "<td colspan = '46' style = 'padding-top : 2px; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code + " - " + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_description + "</td>";
					}
					
					content += "<td colspan = '9' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].net_quantity + "</td>";
					content += "<td colspan = '17'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].std_rate + "</td>";
					content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].uom_code + "</td>";
					content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].gross_amount) + "</td>";
					content += "</tr>";
					if(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
						var itemCode = generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[index].item_code;
						for(var indicator = parseInt(index) + 1; indicator < generate_quotation_service_spares_pdf.variable.custom.outputparam_detail.length;indicator++){
							if(itemCode == generate_quotation_service_spares_pdf.variable.custom.outputparam_detail[indicator].item_code){
								itemCode = "";
							} 
						}
						var lineitemArray = $.grep(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail, function(lineitemTaxDetails,index){
							if((lineitemTaxDetails.item_code != "OVERALL") && (lineitemTaxDetails.item_code == itemCode)){
								return lineitemTaxDetails;
							}
						});
						for (var index in lineitemArray) {
							content += "<tr style = 'height:20px;'>";
							content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
							content += "<td colspan = '46' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + lineitemArray[index].charge_description; 
							if (lineitemArray[index].percentage_amount_ind == 'P') {
								content += " (%)";
							} else {
								content += " (Amt)";
							}
							content += "</td>";
							content += "<td colspan = '9'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
							if (lineitemArray[index].percentage_amount_ind == 'A') {
								content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + lineitemArray[index].amount + "</td>";
							} else {
								content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + lineitemArray[index].percentage + "</td>";
							}
							content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
							content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(lineitemArray[index].amount) + "</td>";
							content += "</tr>";
						}
					}
				}
				if(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail != undefined){
					generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall = $.grep(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail, function(overallTaxDetails,index){
						if(overallTaxDetails.item_code == "OVERALL"){
							return overallTaxDetails;
						}
					});
					for (var index in generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall) {
						content += "<tr style = 'height:20px;'>";
						content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
						content += "<td colspan = '46' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>OVERALL " + generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].charge_description;
						if (generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'P') {
							content += " (%)";
						} else {
							content += " (Amt)";
						}
						content += "</td>";
						content += "<td colspan = '9'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
						if (generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'A') {
							content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount + "</td>";
						} else {
							content += "<td colspan = '17' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].percentage + "</td>";
						}
						content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
						content += "<td colspan = '17' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_service_spares_pdf.variable.custom.outputparam_taxdetail_overall[index].amount) + "</td>";
						content += "</tr>";
					}
				}
				content += "<tr style = 'height:30px;'>";
				content += "<td colspan = '4'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '46' style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '9' style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '17'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '7'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '17'></td>";
				content += "</tr>";
				content += "<tr style = 'height:20px;'>";
				content += "<td colspan = '4'style = 'padding-top : 2px; ' ></td>";
				content += "<td colspan = '46' style = 'padding-top : 2px; text-align:right; padding-right : 2px;'>Total</td>";
				content += "<td colspan = '9' style = 'padding-top : 2px; text-align:right; font-weight: bold; '></td>";
				content += "<td colspan = '17'style = 'padding-top : 2px; '></td>";
				content += "<td colspan = '7'style = 'padding-top : 2px; '></td>";
				content += "<td colspan = '17' style = 'padding-top : 2px; text-align:right; font-weight: bold;padding-right : 2px;'>" + generate_quotation_service_spares_pdf.customRequirementHandler.numberFormat(generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount) + "</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = 'border-bottom-style: hidden;' >&nbsp;&nbsp;Amount Chargeable (in words)</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style =  font-weight: bold;'>&nbsp;&nbsp;" + generate_quotation_service_spares_pdf.customRequirementHandler.wordFormat(generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_net_amount, generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].currency_code) + "</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:center; padding-left : 2px;' ><b>Annexure I (Commercial terms and conditions)</b><span style = 'float:center;'></span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:left; padding-left : 2px;' ><div style='padding : 1%;'><b>Basic Visit Charges On Weekly off/ Holiday :</b>&nbsp;If our Mechanical/Electrical/Process/Programing Engineer is required to work on weekly off / Public holiday then the above mentioned services visit rates will be two times than the standard service visit rates as mentioned above.<br/><b>Travel Charges :</b>&nbsp;Air Travelling charges will be applicable at actuals if engineer needs to travel for more than 8 to 10 hours  by surface to reach your site. <br/><b>Period of work :</b>&nbsp;At actual. (Will commence only after receipt of Purchase Order).<br/><b>Validity &nbsp;:&nbsp;<b/>Three months from Date of Quotation</div></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:center; padding-left : 2px;' ><b>Annexure II (Technical terms and conditions)</b><span style = 'float:center;'></span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:left; padding-left : 2px;' ><div style='padding : 1%;'>Servicing of m/c will be done only after receiving of purchase order.<br/>Date of servicing of machine must be communicated atleast in 1 week advance.<br/>Machine which is to be serviced must be free from production with all necessary tools & Gauges.<br/>Any worn out/new spares required during the servicing of this machine will be provided against separate purchase order for spares.<br/>Specify the exact billing address and machine sr. no on purchase order with contact details.<br/>One maintenance  person for Mech. Work</div></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:center; padding-left : 2px;' ><b>Annexure III (Commercial terms and conditions)</b><span style = 'float:center;'></span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:left; padding-left : 2px;'<br/>&nbsp;<b>Terms & Conditions  : </b>&nbsp;"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].quotation_terms_conditions+"<br/><br/>&nbsp;<b>Payment  Terms&emsp; &emsp;  :</b>&nbsp;"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].payment_terms+"<br/><br/>&nbsp;<b>SAC Code&nbsp;&emsp;&emsp;&emsp;&emsp; : </b>&nbsp;"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].product_udf_char_3+"<br/><br/><span style = 'float:center;'></span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = text-align:left; padding-left : 2px;' ><br/><br/><br/>&nbsp;&nbsp;<b>Authorised Signatory</b><span style = 'float:center;'></span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '35' style = text-align:left;' ><div style='padding : 1%;'>Regd. Office<br/>1001, Dalamal House, Nariman Point, Mumbai - 400 021, India.<br/>Phone : +91 22 2287 2557-2559</div></td>";
				content += "<td colspan = '30' style = text-align:left;' ><div></div></td>";
				content += "<td colspan = '35' style = text-align:left;' ><div style='padding : 1%;'>"+generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].bu_address+"<br/>CINNo.:U24239MH1972PTC015632 <br/>";
				if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'PAM K') {
					content += "GST No. : 27AAACP4776H1Z6</div></td>";
				}else if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'PAM T') {
					content += "GST No. : 27AAACP4776H1Z6</div></td>";
				}else if (generate_quotation_service_spares_pdf.variable.custom.datasource_1.data()[0].business_unit == 'APT') {
					content += "GST No. : 27AABCP6380Q1ZQ</div></td>";
				} else {
					content += "GST No. : </div></td>";
				}
				content += "</tr>";
				content += "</table>";
				content += "<div style = 'margin-top:2px;text-align: center; font-size: large;'>This is a Computer Generated Service Quotation</div>";
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
						return currencyType + generate_quotation_service_spares_pdf.customRequirementHandler.rupeestoWords(value[0]);
					} else {
						return currencyType + generate_quotation_service_spares_pdf.customRequirementHandler.dollarstoWords(value[0]);
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
			outputparam_taxdetail : []
		},
	}
};
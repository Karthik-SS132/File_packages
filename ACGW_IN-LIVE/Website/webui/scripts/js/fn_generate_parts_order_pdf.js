var generate_parts_order_pdf = {
	constructScreen : function () {
		generate_parts_order_pdf.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "salesinvoice",
				serviceName : "retrieve_parts_order_detail_for_docgen",
				pageSize : 10,
				inputParameter : {
					parts_order_no : "$manage_parts_order.variable.custom.selectedRecord.parts_order_no"
				},
				processResponse : true,
				outputPath : false,
				parse : generate_parts_order_pdf.customRequirementHandler.dataSourceParse
			});
		generate_parts_order_pdf.variable.custom.datasource_2 = new kendo.data.DataSource({
				transport : {
					read : {
						url : mserviceUtilities.getWebserverpath() + "common/components/convertHtml2Pdf/ConvertHtml2PDFWeb.aspx",
						dataType : "json",
						method : "post",
						contentType : "application/json;charset=utf-8",
						async : false,
						complete : function (data, response) {
							if (response == "success") {
								generate_parts_order_pdf.variable.custom.response = JSON.parse(data.responseText);
							}
						}
					},
					parameterMap : function () {
						return mserviceUtilities.getTransportParameter({
							inputparam : {
								p_input_html_string : "$generate_parts_order_pdf.customRequirementHandler.getPartsOrderPdfContent()",
								p_output_file_path : "'content_store\\" + login_profile.client_id + "\\" + login_profile.country_code + "\\parts_order_attachments\\" + manage_parts_order.variable.custom.selectedRecord.parts_order_no.replace(/\//g, "-") + "'",
								p_output_file_name : "'" + manage_parts_order.variable.custom.selectedRecord.parts_order_no.replace(/\//g, "-") + ".pdf'"
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
		generate_parts_order_pdf.variable.custom.datasource_1.read();
		$("#generate_parts_order_pdf").attr("style", "height: 90%; width: 100%;");		
		if (manage_parts_order.variable.custom.parts_order_generatePDF == "true") {
			generate_parts_order_pdf.variable.custom.datasource_2.read();
			if (generate_parts_order_pdf.variable.custom.response.status == "success") {
				$("#generate_parts_order_pdf_header_1").attr("style", "height: 100%; width: 100%;").html("<div style ='height:100%;width:100%'>" + "<embed style ='height:100%;width:100%' src='/content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/parts_order_attachments/" + manage_parts_order.variable.custom.selectedRecord.parts_order_no.replace(/\//g, "-") + "/" + manage_parts_order.variable.custom.selectedRecord.parts_order_no.replace(/\//g, "-") + ".pdf" + "?state=" + new Date().getTime() + "'" + "</div>");
			} else {
				mserviceUtilities.deleteFile("parts_order_attachments/" + manage_parts_order.variable.custom.selectedRecord.parts_order_no.replace(/\//g, "-") + "/" + manage_parts_order.variable.custom.selectedRecord.parts_order_no.replace(/\//g, "-") + ".pdf");
				alert("Please contact your support desk.");
				return false;
			}
		} else {
			$('#generate_parts_order_pdf_header_1').attr("style", "height: 100%; width: 100%; overflow-y: scroll;").html("<div>" + generate_parts_order_pdf.customRequirementHandler.getPartsOrderDraftContent() + "</div>");
		}
	},
	customRequirementHandler : {
		dataSourceParse : function (response) {
			if (response.document.context.outputparam_detail != undefined) {
				if (response.document.context.outputparam_detail.length != undefined) {
					generate_parts_order_pdf.variable.custom.outputparam_detail = response.document.context.outputparam_detail;
					
				} else {
					generate_parts_order_pdf.variable.custom.outputparam_detail = [response.document.context.outputparam_detail];
				}
			};
			if (response.document.context.outputparam_addn_info != undefined) {
				if (response.document.context.outputparam_addn_info.length != undefined) {
					generate_parts_order_pdf.variable.custom.outputparam_addn_info = response.document.context.outputparam_addn_info;
					
				} else {
					generate_parts_order_pdf.variable.custom.outputparam_addn_info = [response.document.context.outputparam_addn_info];
				}
			};
			return [response.document.context.outputparam_header];
		},
		getPartsOrderDraftContent : function () {
			if(typeof(fn_generate_parts_order_pdf_generate_draft) === "function"){
				return fn_generate_parts_order_pdf_generate_draft();	
			} else {
				var content = '<div id = "generate_parts_order_pdf_content" style = "width:539px; font-size: small;">';
				content += '<div style="position:absolute;opacity: 0.10;font-size: 150px;margin-top:200px;transform: rotate(300deg);">DRAFT</div>';
				content += '<div style = "text-align: center; margin-bottom:3px;" >';
				content += '<span style = "font-weight: bold;" >Parts Order</span>';
				content += '</div>';
				content += '<table width = "100%" style="border : 1px solid; table-layout: fixed; word-wrap: break-word; font-size: small;">';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Parts Order No</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].parts_order_no + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50"><div>Parts Order Date </div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].sparts_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Parts Order Category</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].parts_category + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50"><div>Parts Order Type</div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].parts_type + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Reason Ref Code</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].parts_order_reason_code + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50"><div>Reason Ref No</div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].parts_order_reason_ref_no + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>WC Category</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].pwc_category + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50"><div>WC Type</div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].pwc_type + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Call Ref No</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].call_ref_no + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50"><div> Call creation date</div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].call_creation_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Call Type</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].call_type + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50" rowspan = "2"><div>Comments</div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].summary_comments + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Asset Id</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].asset_id + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;border-bottom-style: " colspan = "50"><div>Customer Details</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].customer_name + '</span></div><br/><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].customer_address_line_1 + '</span></div><br/><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].customer_address_line_2 + '</span></div><br/><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].customer_address_line_3 + '</span></div><br/><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].customer_city + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;border-bottom-style: " colspan = "50"><div>Dealer Details</div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].dealer_name + '</span></div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].dealer_address_line_1 + '</span></div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].dealer_address_line_2 + '</span></div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].dealer_address_line_3 + '</span></div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].dealer_city + '</span></div></td>';
				content += '</tr></table><br/><br/><br/>';
				if(generate_parts_order_pdf.variable.custom.outputparam_detail.length != 0){
					content += '<table width = "100%" style="border : 1px solid; table-layout: fixed; word-wrap: break-word; font-size: x-small;"><tr style = "text-align:center;height:20px;">';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "10" >Sl.No</td>';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "55">Description of Goods</td>';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "10" >Quantity</td>';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; border-right-style: ;" colspan = "12" >Availability Status</td>';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; border-right-style: ;" colspan = "13" >Date</td>';
					content += '</tr>';
					for (var index in generate_parts_order_pdf.variable.custom.outputparam_detail) {
						content += '<tr style = "height:20px;">';
						content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style:  ;text-align:center;">' + generate_parts_order_pdf.variable.custom.outputparam_detail[index].item_sl_no + '</td>';
						content += '<td colspan = "55" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style:  ; font-weight: bold;padding-left : 2px;">' + generate_parts_order_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_parts_order_pdf.variable.custom.outputparam_detail[index].item_description + '</td>';
						content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style:  ;text-align:center; font-weight: bold;padding-right : 2px;">' + parseInt(generate_parts_order_pdf.variable.custom.outputparam_detail[index].order_quantity)+'-'+ generate_parts_order_pdf.variable.custom.outputparam_detail[index].uom_code  + '</td>';
						content += '<td colspan = "12" style = "padding-top : 2px;border-right: 1px solid; border-right-style:  ;text-align:center; font-weight: bold;padding-right : 2px;">' + generate_parts_order_pdf.variable.custom.outputparam_detail[index].availability +'</td>';
						content += '<td colspan = "13" style = "padding-top : 2px;border-right: 1px solid; border-right-style:  ;text-align:center; font-weight: bold;padding-right : 2px;">' + generate_parts_order_pdf.variable.custom.outputparam_detail[index].availability_date+ '</td>';
						content += '</tr>';
					}
					content += '</table><br/>';
				}
				if(generate_parts_order_pdf.variable.custom.outputparam_addn_info.length != 0){
					content += '<span class="page-break"><br/></span>';
					content += '<table style = "font-size: x-small; font-family: Times New Roman; table-layout: fixed; width: 539px; word-wrap: break-word; margin-top: 10px;">';
					content += "<tr style = 'vertical-align: middle; padding-top: 5px; padding-bottom: 5px; font-weight: bold; text-decoration: underline;'><td>Approval Summary</td></tr>";
					for (var index in generate_parts_order_pdf.variable.custom.outputparam_addn_info) {
						content += '<tr>';
						content += '<td style = "vertical-align: middle; padding-top: 5px; padding-bottom: 5px;">' + 'Claim : ' + generate_parts_order_pdf.variable.custom.outputparam_addn_info[index].parts_order_no + ' - ' + generate_parts_order_pdf.variable.custom.outputparam_addn_info[index].workflow_date + ' - ' + generate_parts_order_pdf.variable.custom.outputparam_addn_info[index].workflow_action + '</td>';
						content += '</tr>';
					};
					content += '</table>';
				}
				content += '</div>';
				return content;
			}
		},
		getPartsOrderPdfContent : function () {
			$.ajax({
				url : mserviceUtilities.getWebserverpath() + "common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].org_level_code + ".txt",
				async : false,
				cache : false
			}).done(function (data) {
				generate_parts_order_pdf.variable.custom.imageData1 = data;
			});
			$.ajax({
				url : mserviceUtilities.getWebserverpath() + "common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + login_profile.client_id + ".txt",
				async : false,
				cache : false
			}).done(function (data) {
				generate_parts_order_pdf.variable.custom.imageData2 = data;
			});
			if(typeof(fn_generate_parts_order_pdf_generate_pdf) === "function"){
				return fn_generate_parts_order_pdf_generate_pdf();	
			} else {
				var content = "<html><body><div style = 'width:1000px; font-size: large;'>";
				content += "<div style = 'margin-bottom:3px;'>";
				if (generate_parts_order_pdf.variable.custom.imageData1 != undefined) {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;' src =" + generate_parts_order_pdf.variable.custom.imageData1 + "/>";
				} else {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;' src =" + "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC" + "/>";
				}
				content += "<span style = 'font-weight: bold;margin-left: 250px;' >Parts Order</span>";
				if (generate_parts_order_pdf.variable.custom.imageData2 != undefined) {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;float:right;' src =" + generate_parts_order_pdf.variable.custom.imageData2 + "/>";
				}
				content += "</div>";
				content += '<table width = "100%" style="border : 1px solid; table-layout: fixed; word-wrap: break-word; font-size: small;">';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Parts Order No</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].parts_order_no + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50"><div>Parts Order Date </div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].sparts_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Parts Order Category</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].parts_category + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50"><div>Parts Order Type </div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].parts_type + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Reason Ref Code</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].parts_order_reason_code + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50"><div>Reason Ref No</div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].parts_order_reason_ref_no + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>WC Category</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].pwc_category + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50"><div>WC Type</div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].pwc_type + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Call Ref No</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].call_ref_no + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50"><div> Call creation date</div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].call_creation_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Call Type</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].call_type + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "50" rowspan = "2"><div>Comments</div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].summary_comments + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "50"><div>Asset Id</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].asset_id + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;height:40px">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;border-bottom-style: hidden" colspan = "50"><div>Customer Details</div></br><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].customer_name + '</span></div><br/><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].customer_address_line_1 + '</span></div><br/><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].customer_address_line_2 + '</span></div><br/><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].customer_address_line_3 + '</span></div><br/><div><span style = "font-weight: bold";>' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].customer_city + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;border-bottom-style: hidden" colspan = "50"><div>Dealer Details</div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].dealer_name + '</span></div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].dealer_address_line_1 + '</span></div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].dealer_address_line_2 + '</span></div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].dealer_address_line_3 + '</span></div></br><div><span style = "font-weight: bold;">' + generate_parts_order_pdf.variable.custom.datasource_1.data()[0].dealer_city + '</span></div></td>';
				content += '</tr></table><br/><br/><br/>';
				if(generate_parts_order_pdf.variable.custom.outputparam_detail.length != 0){
					content += '<table width = "100%" style="border : 1px solid; table-layout: fixed; word-wrap: break-word; font-size: small;"><tr style = "text-align:center;height:20px;">';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "10" >Sl.No</td>';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "55">Description of Goods</td>';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "10" >Quantity</td>';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; border-right-style: ;" colspan = "12" >Availability Status</td>';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid; border-right-style: hidden ;" colspan = "13" >Date</td>';
					content += '</tr>';
					for (var index in generate_parts_order_pdf.variable.custom.outputparam_detail) {
						content += '<tr style = "height:20px;">';
						content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style:  ;text-align:center;">' + generate_parts_order_pdf.variable.custom.outputparam_detail[index].item_sl_no + '</td>';
						content += '<td colspan = "55" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style:  ; font-weight: bold;padding-left : 2px;">' + generate_parts_order_pdf.variable.custom.outputparam_detail[index].item_code + ' - ' + generate_parts_order_pdf.variable.custom.outputparam_detail[index].item_description + '</td>';
						content += '<td colspan = "10" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style:  ;text-align:center; font-weight: bold;padding-right : 2px;">' + parseInt(generate_parts_order_pdf.variable.custom.outputparam_detail[index].order_quantity)+'-'+ generate_parts_order_pdf.variable.custom.outputparam_detail[index].uom_code  + '</td>';
						content += '<td colspan = "12" style = "padding-top : 2px;border-right: 1px solid; border-right-style:  ;text-align:center; font-weight: bold;padding-right : 2px;">' + generate_parts_order_pdf.variable.custom.outputparam_detail[index].availability +'</td>';
						content += '<td colspan = "13" style = "padding-top : 2px;border-right: 1px solid; border-right-style: hidden  ;text-align:center; font-weight: bold;padding-right : 2px;">' + generate_parts_order_pdf.variable.custom.outputparam_detail[index].availability_date+ '</td>';
						content += '</tr>';
					}
					content += '</table><br/>';
				}
				if(generate_parts_order_pdf.variable.custom.outputparam_addn_info.length != 0){
					content += '<span class="page-break"><br/></span>';
					content += '<table style = "font-size: x-small; font-family: Times New Roman; table-layout: fixed; width: 539px; word-wrap: break-word; margin-top: 10px;">';
					content += "<tr style = 'vertical-align: middle; padding-top: 5px; padding-bottom: 5px; font-weight: bold; text-decoration: underline;'><td>Approval Summary</td></tr>";
					for (var index in generate_parts_order_pdf.variable.custom.outputparam_addn_info) {
						content += '<tr>';
						content += '<td style = "vertical-align: middle; padding-top: 5px; padding-bottom: 5px;">' + 'Claim : ' + generate_parts_order_pdf.variable.custom.outputparam_addn_info[index].parts_order_no + ' - ' + generate_parts_order_pdf.variable.custom.outputparam_addn_info[index].workflow_date + ' - ' + generate_parts_order_pdf.variable.custom.outputparam_addn_info[index].workflow_action + '</td>';
						content += '</tr>';
					};
					content += '</table>';
				}
				content += '</div>';
				return content;
			}
		}
	},
	variable : {
		standard : {
			popupIndicator : true
		},
		custom : {
			outputparam_detail : [],
			outputparam_addn_info : []
		},
	}
};
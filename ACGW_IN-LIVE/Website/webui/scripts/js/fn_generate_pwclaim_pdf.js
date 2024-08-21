var generate_pwclaim_pdf = {
	constructScreen : function () {
		generate_pwclaim_pdf.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
			applicationName : "mservice",
			serviceName : "retrieve_manage_pwclaim_details_for_docgen",
			pageSize : 10,
			inputParameter : {
				p_pwclaim_ref_no : "$manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no"
			},
			processResponse : true,
			outputPath : false,
			parse : generate_pwclaim_pdf.customRequirementHandler.dataSourceParse
		});
		generate_pwclaim_pdf.variable.custom.datasource_2 = new kendo.data.DataSource({
			transport : {
				read : {
					url : mserviceUtilities.getWebserverpath() + "common/components/convertHtml2Pdf/ConvertHtml2PDFWeb.aspx",
					dataType : "json",
					method : "post",
					contentType : "application/json;charset=utf-8",
					async : false,
					complete : function (data, response) {
						if (response == "success") {
							generate_pwclaim_pdf.variable.custom.response = JSON.parse(data.responseText);
						}
					}
				},
				parameterMap : function () {
					return mserviceUtilities.getTransportParameter({
						inputparam : {
							p_input_html_string : "$generate_pwclaim_pdf.customRequirementHandler.getPwclaimPdfContent()",
							p_output_file_path : "'content_store\\" + login_profile.client_id + "\\" + login_profile.country_code + "\\pwclaim_attachments\\" + manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no.replace(/\//g, "-") + "'",
							p_output_file_name : "'" + manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no.replace(/\//g, "-") + ".pdf'"
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
		generate_pwclaim_pdf.variable.custom.datasource_1.read();
		$("#generate_pwclaim_pdf").attr("style", "height: 90%; width: 100%;");
		if (manage_pwclaim_header.variable.custom.pwclaim_generatePDF == "true") {
			generate_pwclaim_pdf.variable.custom.datasource_2.read();
			if (generate_pwclaim_pdf.variable.custom.response.status == "success") {
				$("#generate_pwclaim_pdf_header_1").attr("style", "height: 100%; width: 100%;").html("<div style ='height:100%;width:100%'>" + "<embed style ='height:100%;width:100%' src='/content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/pwclaim_attachments/" + manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no.replace(/\//g, "-") + "/" + manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no.replace(/\//g, "-") + ".pdf" + "?state=" + new Date().getTime() + "'" + "</div>");
			} else {
				mserviceUtilities.deleteFile("pwclaim_attachments/" + manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no.replace(/\//g, "-") + "/" + manage_pwclaim_header.variable.custom.selectedRecord.pwclaim_ref_no.replace(/\//g, "-") + ".pdf");
				alert("Please contact your support desk.");
				return false;
			}
		} else {
			$('#generate_pwclaim_pdf_header_1').attr("style", "height: 100%; width: 100%; overflow-y: scroll;").html("<div>" + generate_pwclaim_pdf.customRequirementHandler.getPwclaimDraftContent() + "</div>");
		}
	},
	customRequirementHandler : {
		dataSourceParse : function (response) {
			myData = response;
			if (response.document.context.outputparam_detail1 != undefined) {
				if (response.document.context.outputparam_detail1.length != undefined) {
					generate_pwclaim_pdf.variable.custom.outputparam_detail1 = response.document.context.outputparam_detail1;
					
				} else {
					generate_pwclaim_pdf.variable.custom.outputparam_detail1 = [response.document.context.outputparam_detail1];
				}
			};
			if (response.document.context.outputparam_detail2 != undefined) {
				if (response.document.context.outputparam_detail2.length != undefined) {
					generate_pwclaim_pdf.variable.custom.outputparam_detail2 = response.document.context.outputparam_detail2;
				} else {
					generate_pwclaim_pdf.variable.custom.outputparam_detail2 = [response.document.context.outputparam_detail2];
				}
			};
			if (response.document.context.outputparam_detail3 != undefined) {
				if (response.document.context.outputparam_detail3.length != undefined) {
					generate_pwclaim_pdf.variable.custom.outputparam_detail3 = response.document.context.outputparam_detail3;
				} else {
					generate_pwclaim_pdf.variable.custom.outputparam_detail3 = [response.document.context.outputparam_detail3];
				}
			};	
			return [response.document.context.outputparam_header];
		},
		getPwclaimDraftContent : function () {
			if(typeof(fn_generate_pwclaim_pdf_generate_draft) === "function"){
				return fn_generate_pwclaim_pdf_generate_draft();	
			} else {
				var content = '<div id = "generate_pwclaim_pdf_content" style = "width:539px; font-size: small;">';
				content += '<div style="position:absolute;opacity: 0.10;font-size: 150px;margin-top:200px;transform: rotate(300deg);">DRAFT</div>';
				content += '<div style = "text-align: center; margin-bottom:3px;" >';
				content += '<span style = "font-weight: bold;" >WC (Warranty Claim)</span>';
				content += '</div>';
				content += '<table width = "100%" style="border : 1px solid; table-layout: fixed; word-wrap: break-word; font-size: x-small;">';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "font-size: small; padding-left: 2px; padding-bottom: 2px; border-right: 1px solid; border-bottom: 1px solid;" rowspan = "4" colspan = "46"><div><span style = "font-weight: bold;">' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].customer_id_desc + '</span></br>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].customer_location_desc + '</div></td>';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Warranty Claim No<div style = "float:right;"></div></div></br><div><span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].pwclaim_ref_no + '</span><div style = "float:right;"><span style = "font-weight: bold";></span></div></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px; " colspan = "27"><div>Dated</div></br><div><span style = "font-weight: bold;">' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].pwclaim_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Category / Type</div></br><div><span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].pwclaim_category +' /  '+generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].pwclaim_type + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Goodwill Reason</div></br><div><span style = "font-weight: bold;">' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code3 + '</span></div></td>';
				content += '</tr>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Machine Sr.No</div></br><div><span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].asset_id + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Model Id</div></br><div><span style = "font-weight: bold;">' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].equipment_id + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Running Hours</div></br><div><span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].running_hours + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Loading Hours</div></br><div><span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].udf_float_1 + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" rowspan = "3" colspan = "46"><div>Dealer</br> <span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].org_level_code + '</span></div></td>';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Zone</div></br><div> <span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].company_location_code + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Failure Date</div></br><div><span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].failure_date + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Primary Failed Part</div></br><div><span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].primary_failed_part+ '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Failure Category</div></br><div><span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].failure_category + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Division</div></br><div> <span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code1 + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>WC Belongs To</div></br><div> <span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code2 + '</span></div></td>';
				content += '</tr>';
				content += '<tr style = "height:90px;vertical-align:top;">';
				content += '<td style = "font-size: small;  padding-left: 2px; padding-bottom: 2px;  border-right: 1px solid; border-bottom: 1px solid;" colspan = "46"><div>Failure Description with reason </br> <span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].failure_description + '</span></br>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].failure_reason + '</div></td>';
				content += '<td style = "border-bottom: 1px solid; padding-left: 2px; padding-bottom: 2px;" colspan = "54"><div style = "font-size: small;">Actions to be Taken</br><span style = "font-weight:bold; white-space: pre-wrap;">' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].action_tobe_taken + '</span></div></td>';
				content += '</tr>';
				if(generate_pwclaim_pdf.variable.custom.outputparam_detail1.length != 0){
					content += '<tr style = "text-align:center;height:20px;">';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "10" >Sl.No</td>';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "65">Description of Goods</td>';
					content += '<td style = "border-right: 1px solid; border-bottom: 1px solid;" colspan = "25" >Quantity</td>';
					content += '</tr>';
					for (var index in generate_pwclaim_pdf.variable.custom.outputparam_detail1) {
						content += '<tr style = "height:20px;">';
						content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + generate_pwclaim_pdf.variable.custom.outputparam_detail1[index].pwclaim_sl_no + '</td>';
						content += '<td colspan = "65" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;">' + generate_pwclaim_pdf.variable.custom.outputparam_detail1[index].item_code + ' - ' + generate_pwclaim_pdf.variable.custom.outputparam_detail1[index].item_description + '</td>';
						content += '<td colspan = "25" style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;">' + parseInt(generate_pwclaim_pdf.variable.custom.outputparam_detail1[index].quantity) + '</td>';
						content += '</tr>';
					}
					content += '<tr style = "height:10px;">';
					content += '<td colspan = "10"  style = "padding-top : 2px;border-right: 1px solid; border-bottom: 1px solid;"></td>';
					content += '<td colspan = "65" style = "padding-top : 2px;border-right: 1px solid; border-bottom: 1px solid;"></td>';
					content += '<td colspan = "25"  style = "padding-top : 2px;border-right: 1px solid; border-bottom: 1px solid;"></td>';
					content += '</tr>';
					content += '<tr style = "height:20px; border-bottom-style: hidden;">';
					content += '<td colspan = "100" ></td>';
					content += '</tr>';
				}
				if(generate_pwclaim_pdf.variable.custom.outputparam_detail2 != 0){
					var questionCode;
					$.ajax({
						url : mserviceUtilities.getWebserverpath() + "webui/configuration/label/label_manage_pwclaim_detail_" + login_profile.client_id + "_in_" + login_profile.locale_id + ".xml",
						async : false,
						cache : false
					}).done(function (data) {
						 questionCode = data;
					});
					for (var index in generate_pwclaim_pdf.variable.custom.outputparam_detail2) {
						if(index == 0 || index == 1 || index == 2){
							if(generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].response_details == "1"){
								generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].response_details = "Yes";
							} else if(generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].response_details == "0"){
								generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].response_details = "No";
							}
						}
						content += '<tr style = "padding:2px;">';
						content += '<td colspan = "50" style = "border-bottom-style: hidden; padding-left : 2px;">' + questionCode.childNodes[0].getElementsByTagName( generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].question_code + "_value")[0].textContent + '</td>';
						content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
						content += '<td colspan = "48" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].response_details + '</td>';
						content += '</tr>';
					};
					content += '<tr style = "height:10px;">';
					content += '<td colspan = "100" ></td>';
					content += '</tr>';
				}
				content += '</table>';
				if(generate_pwclaim_pdf.variable.custom.outputparam_detail3.length != 0){
					content += '<span class="page-break"><br/></span>';
					content += '<table style = "font-size: xx-small; font-family: Times New Roman; table-layout: fixed; width: 539px; word-wrap: break-word; margin-top: 10px;">';
					content += "<tr style = 'vertical-align: middle; padding-top: 5px; padding-bottom: 5px; font-weight: bold; text-decoration: underline;'><td>Approval Summary</td></tr>";
					for (var index in generate_pwclaim_pdf.variable.custom.outputparam_detail3) {
						content += '<tr>';
						content += '<td style = "vertical-align: middle; padding-top: 5px; padding-bottom: 5px;">' + 'Claim : ' + generate_pwclaim_pdf.variable.custom.outputparam_detail3[index].pwclaim_ref_no + ' - ' + generate_pwclaim_pdf.variable.custom.outputparam_detail3[index].workflow_date + ' - ' + generate_pwclaim_pdf.variable.custom.outputparam_detail3[index].workflow_action + '</td>';
						content += '</tr>';
					};
					content += '</table>';
				}
				content += '</div>';
				return content;
			}
		},
		getPwclaimPdfContent : function () {
			$.ajax({
				url : mserviceUtilities.getWebserverpath() + "common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].org_level_code + ".txt",
				async : false,
				cache : false
			}).done(function (data) {
				generate_pwclaim_pdf.variable.custom.imageData1 = data;
			});
			$.ajax({
				url : mserviceUtilities.getWebserverpath() + "common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + login_profile.client_id + ".txt",
				async : false,
				cache : false
			}).done(function (data) {
				generate_pwclaim_pdf.variable.custom.imageData2 = data;
			});
			if(typeof(fn_generate_pwclaim_pdf_generate_pdf) === "function"){
				return fn_generate_pwclaim_pdf_generate_pdf();	
			} else {
				var content = "<html><body><div style = 'width:1000px; font-size: large;'>";
				content += "<div style = 'margin-bottom:3px;'>";
				if (generate_pwclaim_pdf.variable.custom.imageData1 != undefined) {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;' src =" + generate_pwclaim_pdf.variable.custom.imageData1 + "/>";
				} else {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;' src =" + "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC" + "/>";
				}
				content += "<span style = 'font-weight: bold;margin-left: 250px;' >WC (Warranty Claim) </span>";
				if (generate_pwclaim_pdf.variable.custom.imageData2 != undefined) {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;float:right;' src =" + generate_pwclaim_pdf.variable.custom.imageData2 + "/>";
				}
				content += "</div>";
				content += "<table width = '100%' border = '1pt' style='table-layout: fixed; word-wrap: break-word; font-size: large;border-collapse:collapse;'>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = 'font-size: large; padding-left: 2px; padding-bottom: 2px; ' rowspan = '4' colspan = '46'><div><span style = 'font-weight: bold;'>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].customer_id_desc + "</span></br>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].customer_location_desc + "</div></td>";
				content += "<td style = 'padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Warranty Claim No<div style = 'float:right;'></div></div></br><div><span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].pwclaim_ref_no + "</span><div style = 'float:right;'><span style = 'font-weight: bold';></span></div></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Dated</div></br><div><span style = 'font-weight: bold;'>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].pwclaim_date + "</span></div></td>";
				content += "</tr>";
				content += '</tr>';
				content += '<tr style = "vertical-align:top;">';
				content += '<td style = "border-right: 1px solid; padding-left: 2px; padding-bottom: 2px; border-bottom: 1px solid;" colspan = "27"><div>Category / Type</div></br><div><span style = "font-weight: bold";>' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].pwclaim_category +' /  '+generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].pwclaim_type + '</span></div></td>';
				content += '<td style = "border-bottom: 1px solid;padding-left: 2px; padding-bottom: 2px;" colspan = "27"><div>Goodwill Reason</div></br><div><span style = "font-weight: bold;">' + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code3 + '</span></div></td>';
				content += '</tr>';
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = 'padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Machine Sr.No</div></br><div><span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].asset_id + "</span></div></td>";
				content += "<td style = 'padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Model Id</div></br><div><span style = 'font-weight: bold;'>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].equipment_id + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = 'padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Running Hours</div></br><div><span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].running_hours + "</span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Loading Hours</div></br><div><span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].udf_float_1 + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = 'font-size: large;  padding-left: 2px; padding-bottom: 2px;  ' rowspan = '3' colspan = '46'><div>Dealer</br> <span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].org_level_code + "</span></div></td>";
				content += "<td style = 'padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Zone</div></br><div> <span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].company_location_code + "</span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Failure Date</div></br><div><span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].failure_date + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = 'padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Primary Failed Part</div></br><div><span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].primary_failed_part+ "</span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Failure Category</div></br><div><span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].failure_category + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = 'padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Division</div></br><div> <span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code1 + "</span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>WC Belongs To</div></br><div> <span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].udf_analysis_code2 + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'height:90px;vertical-align:top;'>";
				content += "<td style = 'font-size: large;  padding-left: 2px; padding-bottom: 2px;  ' colspan = '46'><div>Failure Description with reason </br> <span style = 'font-weight: bold';>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].failure_description + "</span></br>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].failure_reason + "</div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '54'><div style = 'font-size: large;'>Actions to be Taken</br><span style = 'font-weight:bold; white-space: pre-wrap;'>" + generate_pwclaim_pdf.variable.custom.datasource_1.data()[0].action_tobe_taken + "</span></div></td>";
				content += "</tr>";
				if(generate_pwclaim_pdf.variable.custom.outputparam_detail1.length != 0){
					content += "<tr style = 'text-align:center;height:20px;'>";
					content += "<td style = '' colspan = '10' >Sl.No</td>";
					content += "<td style = '' colspan = '65'>Description of Goods</td>";
					content += "<td style = '' colspan = '25' >Quantity</td>";
					content += "</tr>";
					for (var index in generate_pwclaim_pdf.variable.custom.outputparam_detail1) {
						content += "<tr style = 'height:20px;'>";
						content += "<td colspan = '10'  style = 'padding-top : 2px;border-bottom-style: hidden;text-align:center;'>" + generate_pwclaim_pdf.variable.custom.outputparam_detail1[index].pwclaim_sl_no + "</td>";
						content += "<td colspan = '65' style = 'padding-top : 2px;border-bottom-style: hidden; font-weight: bold;padding-left : 2px;'>" + generate_pwclaim_pdf.variable.custom.outputparam_detail1[index].item_code + " - " + generate_pwclaim_pdf.variable.custom.outputparam_detail1[index].item_description + "</td>";
						content += "<td colspan = '25' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + parseInt(generate_pwclaim_pdf.variable.custom.outputparam_detail1[index].quantity) + "</td>";
						content += "</tr>";
					}
					content += "<tr style = 'height:30px;'>";
					content += "<td colspan = '10'  style = 'padding-top : 2px;'></td>";
					content += "<td colspan = '65' style = 'padding-top : 2px;'></td>";
					content += "<td colspan = '25'  style = 'padding-top : 2px;'></td>";
					content += "</tr>";
					content += "<tr style = 'height:20px; border-bottom-style: hidden;'>";
					content += "<td colspan = '100' ></td>";
					content += "</tr>";
				}
				if(generate_pwclaim_pdf.variable.custom.outputparam_detail2.length != 0){
					var questionCode;
					$.ajax({
						url : mserviceUtilities.getWebserverpath() + "webui/configuration/label/label_manage_pwclaim_detail_" + login_profile.client_id + "_in_" + login_profile.locale_id + ".xml",
						async : false,
						cache : false
					}).done(function (data) {
						 questionCode = data;
					});
					for (var index in generate_pwclaim_pdf.variable.custom.outputparam_detail2) {
						if(index == 0 || index == 1 || index == 2){
							if(generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].response_details == "1"){
								generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].response_details = "Yes";
							} else if(generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].response_details == "0"){
								generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].response_details = "No";
							}
						}
						content += '<tr style = "padding:2px;">';
						content += '<td colspan = "50" style = "border-bottom-style: hidden; padding-left : 2px;">' + questionCode.childNodes[0].getElementsByTagName( generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].question_code + "_value")[0].textContent + '</td>';
						content += '<td colspan = "2" style = "border-bottom-style: hidden;border-left-style: hidden;">:</td>';
						content += '<td colspan = "48" style = "border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;">' + generate_pwclaim_pdf.variable.custom.outputparam_detail2[index].response_details + '</td>';
						content += '</tr>';
					};
					content += "<tr style = 'height:10px;'>";
					content += "<td colspan = '100' ></td>";
					content += "</tr>";
				}
				content += "</table>";
				if(generate_pwclaim_pdf.variable.custom.outputparam_detail3.length != 0){
					content += "<span class='page-break'><br/></span>";
					content += "<table style = 'font-size: large; table-layout: fixed; width: 100%; word-wrap: break-word; margin-top: 10px;'>";
					content += '<tr style = "vertical-align: middle; padding-top: 5px; padding-bottom: 5px; font-weight: bold; text-decoration: underline;"><td>Approval Summary</td></tr>';
					for (var index in generate_pwclaim_pdf.variable.custom.outputparam_detail3) {
						content += "<tr>";
						content += "<td style = 'vertical-align: middle; padding-top: 5px; padding-bottom: 5px;'>" + "Claim : " + generate_pwclaim_pdf.variable.custom.outputparam_detail3[index].pwclaim_ref_no + " - " + generate_pwclaim_pdf.variable.custom.outputparam_detail3[index].workflow_date + " - " + generate_pwclaim_pdf.variable.custom.outputparam_detail3[index].workflow_action + "</td>";
						content += "</tr>";
					};
					content += "</table>";
				}
				content += "</div>";
				return content;
			}
		}
	},
	variable : {
		standard : {
			popupIndicator : true
		},
		custom : {
			outputparam_detail1 : [],
			outputparam_detail3 : [],
			outputparam_detail2 : [],
		},
	}
};
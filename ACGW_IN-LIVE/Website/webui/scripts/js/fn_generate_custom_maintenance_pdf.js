var generate_custom_maintenance_pdf = {
	constructScreen : function () {
		generate_custom_maintenance_pdf.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
					applicationName : "common_modules",
					serviceName : "retrieve_manage_custom_info_detail",
					outputPath : false,
					api : true,
					pageSize : 10,
					inputParameter : {
						p_custom_info_code : "webWidgetInitializer.variable.customMainParam.replace('manage_custom_maintenance_','').concat('_docgen')",
						p_custom_info_ref_no1 : "$manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no",
						p_custom_info_ref_no2 : ""
					},
					schemaModel : true,
					screenID : "generate_custom_maintenance_pdf",
					dataSourceName : "datasource_1",
					processResponse : true,
					parse : generate_custom_maintenance_pdf.customRequirementHandler.dataSourceParse
				});
		generate_custom_maintenance_pdf.variable.custom.datasource_2 = new kendo.data.DataSource({
			transport : {
				read : {
					url : mserviceUtilities.getWebserverpath() + "common/components/convertHtml2Pdf/ConvertHtml2PDFWeb.aspx",
					dataType : "json",
					method : "post",
					contentType : "application/json;charset=utf-8",
					async : false,
					complete : function (data, response) {
						if (response == "success") {
							generate_custom_maintenance_pdf.variable.custom.response = JSON.parse(data.responseText);
						}
					}
				},
				parameterMap : function () {
					return mserviceUtilities.getTransportParameter({
						inputparam : {
							p_input_html_string : "$generate_custom_maintenance_pdf.customRequirementHandler.getPdfContent()",
							p_output_file_path : "'content_store\\" + login_profile.client_id + "\\" + login_profile.country_code + "\\custom_maintenance_attachments\\" + manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no + "'",
							p_output_file_name : "'" + manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no + ".pdf'"
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
		generate_custom_maintenance_pdf.variable.custom.datasource_1.read();
		$("#generate_custom_maintenance_pdf").attr("style", "height: 90%; width: 100%;");
		if (manage_custom_maintenance.variable.custom.generatePDF == "true") {
			generate_custom_maintenance_pdf.variable.custom.datasource_2.read();
			if (generate_custom_maintenance_pdf.variable.custom.response.status == "success") {
				$("#generate_custom_maintenance_pdf_header_1").attr("style", "height: 100%; width: 100%;").html("<div style ='height:100%;width:100%'>" + "<embed style ='height:100%;width:100%' src='/content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/custom_maintenance_attachments/" + manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no + "/" + manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no + ".pdf" + "?state=" + new Date().getTime() + "'" + "</div>");
			} else {
				mserviceUtilities.deleteFile("custom_maintenance_attachments/" + manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no + "/" + manage_custom_maintenance.variable.custom.selectedRecord.request_ref_no + ".pdf");
				alert("Please contact your support desk.");
				return false;
			}
		} else {
			$('#generate_custom_maintenance_pdf_header_1').attr("style", "height: 100%; width: 100%; overflow-y: scroll;").html("<div>" + generate_custom_maintenance_pdf.customRequirementHandler.getDraftContent() + "</div>");
		}
	},
	customRequirementHandler : {
		dataSourceParse : function (response) {
			var parseResponse;
			if (response != undefined) {
				if (response.ApplicationException == undefined) {
					if(response.outputparam_header.p_custom_info_header_json != ""){
						generate_custom_maintenance_pdf.variable.custom.header_1_record = JSON.parse(response.outputparam_header.p_custom_info_header_json);
					}
					if (response.outputparam_detail != undefined) {
						if (response.outputparam_detail.length != undefined) {
							var detailInfo = response.outputparam_detail ; 
							parseResponse = [];
							for (index = 0; index < detailInfo.length; index++) {
								for (key in detailInfo[index]) {
									parseResponse.push(JSON.parse(detailInfo[index][key]));
								}
							}
						}
					} else {
						parseResponse = [];
					}
				} else {
					parseResponse = response;
				}
			} else {
				parseResponse = response;
			};
			return parseResponse;
		},
		getDraftContent : function () {
			if(typeof(fn_generate_custom_maintenance_pdf_generate_draft) === "function"){
				return fn_generate_custom_maintenance_pdf_generate_draft();	
			} else {
				var content = "<!DOCTYPE html>";
				content += "<html>";
				content += "<head>";
				content += "<style>table { page-break-inside:auto; page-break-after:auto; width: 100%; table-layout: fixed; line-height: 2em;} tr { page-break-inside:avoid; page-break-after:auto; } thead { display:table-header-group; } tfoot { display:table-footer-group; }</style>";
				content += "</head>";
				content += "<body>";
				content += "<div style='width:1000px; font-size: medium;'>";
				content += "<table border='1' width='100%' style='table-layout: fixed; width: 100%; word-wrap: break-word; font-size: medium;border-collapse:collapse;'>";
				content += "<tr>";
				content += "<td colspan='100' style='text-align: center;'>TRAVELLING EXPENSES STATEMENT</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='100' style='text-align: right;'>" + mserviceUtilities.getDateString(new Date(manage_custom_maintenance.variable.custom.selectedRecord.created_on_date),"MM/dd/yyyy") + "</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Emp Code</td>";
				content += "<td colspan='20'>" + manage_custom_maintenance.variable.custom.selectedRecord.created_by_employee_id + "</td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Name</td>";
				content += "<td colspan='20'>" + manage_custom_maintenance.variable.custom.selectedRecord.created_by_employee_name + "</td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Designation</td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Department</td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Place Visited</td>";
				var detailRecordForTA = $.grep(generate_custom_maintenance_pdf.variable.custom.datasource_1.data(), function (data, index) {
						return data.action_type == "TA";
					});
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + detailRecordForTA[0].udf_char_2 + "</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>From:</td>";
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + mserviceUtilities.getDateString(new Date(detailRecordForTA[0].udf_date_1),"MM/dd/yyyy") + "</td>";
					content += "<td colspan='20'>" + mserviceUtilities.getDateString(new Date(detailRecordForTA[0].udf_date_4),"MM/dd/yyyy") + "</td>";
					const date1 = new Date(detailRecordForTA[0].udf_date_1);
					const date2 = new Date(detailRecordForTA[0].udf_date_4);
					const diffTime = Math.abs(date2 - date1);
					const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
					content += "<td colspan='20'>" + diffDays + " Days</td>";
				} else {
					content += "<td colspan='20'></td>";
					content += "<td colspan='20'></td>";
					content += "<td colspan='20'></td>";
				};
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Time of Departure:</td>";
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + detailRecordForTA[0].udf_date_1_hour + ":" + detailRecordForTA[0].udf_date_1_minute + ":00" + ((parseInt(detailRecordForTA[0].udf_date_1_hour) < 13) ? "AM" : "PM") + "</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				content += "<td colspan='20'>Time of Arrival:</td>";
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + detailRecordForTA[0].udf_date_2_hour + ":" + detailRecordForTA[0].udf_date_2_minute + ":00" + ((parseInt(detailRecordForTA[0].udf_date_2_hour) < 13) ? "AM" : "PM") + "</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + ((parseFloat(detailRecordForTA[0].udf_date_2_hour + "." + detailRecordForTA[0].udf_date_2_minute)) - (parseFloat(detailRecordForTA[0].udf_date_1_hour + "." + detailRecordForTA[0].udf_date_1_minute))) + " Hours</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Time of Departure:</td>";
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + detailRecordForTA[0].udf_date_3_hour + ":" + detailRecordForTA[0].udf_date_3_minute + ":00" + ((parseInt(detailRecordForTA[0].udf_date_3_hour) < 13) ? "AM" : "PM") + "</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				content += "<td colspan='20'>Time of Arrival:</td>";
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + detailRecordForTA[0].udf_date_4_hour + ":" + detailRecordForTA[0].udf_date_4_minute + ":00" + ((parseInt(detailRecordForTA[0].udf_date_4_hour) < 13) ? "AM" : "PM") + "</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + ((parseFloat(detailRecordForTA[0].udf_date_4_hour + "." + detailRecordForTA[0].udf_date_4_minute)) - (parseFloat(detailRecordForTA[0].udf_date_3_hour + "." + detailRecordForTA[0].udf_date_3_minute))) + " Hours</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				content += "</tr>";
				content += "<tr></tr>";
				content += "<tr></tr>";
				content += "<tr></tr>";
				content += "<tr>";
				content += "<td style='text-align:center;' colspan='5'>S.NO.</td>";
				content += "<td style='text-align:center;' colspan='25'>Particulars *</td>";
				content += "<td style='text-align:center;' colspan='15'>Paid By Company</td>";
				content += "<td style='text-align:center;' colspan='10'>Paid By Self</td>";
				content += "<td style='text-align:center;' colspan='10'>Total</td>";
				content += "<td style='text-align:center;' colspan='10'>Excess Expn on Actual</td>";
				content += "<td style='text-align:center;' colspan='25'>Remarks</td>";
				content += "</tr>";
				for (var index in generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData) {;
					content += "<tr>";
					content += "<td colspan='5'>" + (parseInt(index) + 1) + "</td>";
					content += "<td colspan='25'>" + mserviceUtilities.getDescriptionForCode('TADAACTIONTYPE_LIST', generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].action_type, '') + "</td>";
					content += "<td style='text-align:right;' colspan='15'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_2 + "</td>";
					content += "<td style='text-align:right;' colspan='10'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_3 + "</td>";
					content += "<td style='text-align:right;' colspan='10'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_4 + "</td>";
					content += "<td colspan='10'></td>";
					content += "<td colspan='25'></td>";
					content += "</tr>";
				};
				var paidByCompanySum = 0; 
				var paidBySelfSum = 0; 
				var totalSum = 0; 
				for(var index=0; index < generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData.length; index++){
					paidByCompanySum += parseFloat(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_2) 
					paidBySelfSum += parseFloat(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_3) 
					totalSum += parseFloat(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_4) 
				};
				content += "<tr>";
				content += "<td colspan='5'></td>";
				content += "<td style='text-align:right;' colspan='25'>TOTAL</td>";
				content += "<td style='text-align:right;' colspan='15'>" + paidByCompanySum.toFixed(2) + "</td>";
				content += "<td style='text-align:right;' colspan='10'>" + paidBySelfSum.toFixed(2) + "</td>";
				content += "<td style='text-align:right;' colspan='10'>" + totalSum.toFixed(2) + "</td>";
				content += "<td colspan='10'></td>";
				content += "<td colspan='25'></td>";
				content += "</tr>";
				content += "</table>";
				content += "</div>";
				content += "</body>";
				content += "</html>";
				return content;
			}
		},
		getPdfContent : function () {
			if(typeof(fn_generate_custom_maintenance_pdf_generate_pdf) === "function"){
				return fn_generate_custom_maintenance_pdf_generate_pdf();	
			} else {
				var content = "<!DOCTYPE html>";
				content += "<html>";
				content += "<head>";
				content += "<style>table { page-break-inside:auto; page-break-after:auto; width: 100%; table-layout: fixed; line-height: 2em;} tr { page-break-inside:avoid; page-break-after:auto; } thead { display:table-header-group; } tfoot { display:table-footer-group; }</style>";
				content += "</head>";
				content += "<body>";
				content += "<div style='width:1000px; font-size: medium;'>";
				content += "<table border='1' width='100%' style='table-layout: fixed; width: 100%; word-wrap: break-word; font-size: medium;border-collapse:collapse;'>";
				content += "<tr>";
				content += "<td colspan='100' style='text-align: center;'>TRAVELLING EXPENSES STATEMENT</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='100' style='text-align: right;'>" + mserviceUtilities.getDateString(new Date(manage_custom_maintenance.variable.custom.selectedRecord.created_on_date),"MM/dd/yyyy") + "</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Emp Code</td>";
				content += "<td colspan='20'>" + manage_custom_maintenance.variable.custom.selectedRecord.created_by_employee_id + "</td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Name</td>";
				content += "<td colspan='20'>" + manage_custom_maintenance.variable.custom.selectedRecord.created_by_employee_name + "</td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Designation</td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Department</td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Place Visited</td>";
				var detailRecordForTA = $.grep(generate_custom_maintenance_pdf.variable.custom.datasource_1.data(), function (data, index) {
						return data.action_type == "TA";
					});
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + detailRecordForTA[0].udf_char_2 + "</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>From:</td>";
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + mserviceUtilities.getDateString(new Date(detailRecordForTA[0].udf_date_1),"MM/dd/yyyy") + "</td>";
					content += "<td colspan='20'>" + mserviceUtilities.getDateString(new Date(detailRecordForTA[0].udf_date_4),"MM/dd/yyyy") + "</td>";
					const date1 = new Date(detailRecordForTA[0].udf_date_1);
					const date2 = new Date(detailRecordForTA[0].udf_date_4);
					const diffTime = Math.abs(date2 - date1);
					const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
					content += "<td colspan='20'>" + diffDays + " Days</td>";
				} else {
					content += "<td colspan='20'></td>";
					content += "<td colspan='20'></td>";
					content += "<td colspan='20'></td>";
				};
				content += "<td colspan='20'></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Time of Departure:</td>";
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + detailRecordForTA[0].udf_date_1_hour + ":" + detailRecordForTA[0].udf_date_1_minute + ":00" + ((parseInt(detailRecordForTA[0].udf_date_1_hour) < 13) ? "AM" : "PM") + "</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				content += "<td colspan='20'>Time of Arrival:</td>";
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + detailRecordForTA[0].udf_date_2_hour + ":" + detailRecordForTA[0].udf_date_2_minute + ":00" + ((parseInt(detailRecordForTA[0].udf_date_2_hour) < 13) ? "AM" : "PM") + "</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + ((parseFloat(detailRecordForTA[0].udf_date_2_hour + "." + detailRecordForTA[0].udf_date_2_minute)) - (parseFloat(detailRecordForTA[0].udf_date_1_hour + "." + detailRecordForTA[0].udf_date_1_minute))) + " Hours</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan='20'>Time of Departure:</td>";
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + detailRecordForTA[0].udf_date_3_hour + ":" + detailRecordForTA[0].udf_date_3_minute + ":00" + ((parseInt(detailRecordForTA[0].udf_date_3_hour) < 13) ? "AM" : "PM") + "</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				content += "<td colspan='20'>Time of Arrival:</td>";
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + detailRecordForTA[0].udf_date_4_hour + ":" + detailRecordForTA[0].udf_date_4_minute + ":00" + ((parseInt(detailRecordForTA[0].udf_date_4_hour) < 13) ? "AM" : "PM") + "</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				if(detailRecordForTA.length != 0){
					content += "<td colspan='20'>" + ((parseFloat(detailRecordForTA[0].udf_date_4_hour + "." + detailRecordForTA[0].udf_date_4_minute)) - (parseFloat(detailRecordForTA[0].udf_date_3_hour + "." + detailRecordForTA[0].udf_date_3_minute))) + " Hours</td>";
				} else {
					content += "<td colspan='20'></td>";
				};
				content += "</tr>";
				content += "<tr></tr>";
				content += "<tr></tr>";
				content += "<tr></tr>";
				content += "<tr>";
				content += "<td style='text-align:center;' colspan='5'>S.NO.</td>";
				content += "<td style='text-align:center;' colspan='25'>Particulars *</td>";
				content += "<td style='text-align:center;' colspan='15'>Paid By Company</td>";
				content += "<td style='text-align:center;' colspan='10'>Paid By Self</td>";
				content += "<td style='text-align:center;' colspan='10'>Total</td>";
				content += "<td style='text-align:center;' colspan='10'>Excess Expn on Actual</td>";
				content += "<td style='text-align:center;' colspan='25'>Remarks</td>";
				content += "</tr>";
				for (var index in generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData) {;
					content += "<tr>";
					content += "<td colspan='5'>" + (parseInt(index) + 1) + "</td>";
					content += "<td colspan='25'>" + mserviceUtilities.getDescriptionForCode('TADAACTIONTYPE_LIST', generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].action_type, '') + "</td>";
					content += "<td style='text-align:right;' colspan='15'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_2 + "</td>";
					content += "<td style='text-align:right;' colspan='10'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_3 + "</td>";
					content += "<td style='text-align:right;' colspan='10'>" + generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_4 + "</td>";
					content += "<td colspan='10'></td>";
					content += "<td colspan='25'></td>";
					content += "</tr>";
				};
				var paidByCompanySum = 0; 
				var paidBySelfSum = 0; 
				var totalSum = 0; 
				for(var index=0; index < generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData.length; index++){
					paidByCompanySum += parseFloat(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_2) 
					paidBySelfSum += parseFloat(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_3) 
					totalSum += parseFloat(generate_custom_maintenance_pdf.variable.custom.datasource_1._pristineData[index].udf_float_4) 
				};
				content += "<tr>";
				content += "<td colspan='5'></td>";
				content += "<td style='text-align:right;' colspan='25'>TOTAL</td>";
				content += "<td style='text-align:right;' colspan='15'>" + paidByCompanySum.toFixed(2) + "</td>";
				content += "<td style='text-align:right;' colspan='10'>" + paidBySelfSum.toFixed(2) + "</td>";
				content += "<td style='text-align:right;' colspan='10'>" + totalSum.toFixed(2) + "</td>";
				content += "<td colspan='10'></td>";
				content += "<td colspan='25'></td>";
				content += "</tr>";
				content += "</table>";
				content += "</div>";
				content += "</body>";
				content += "</html>";
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
		custom : {},
	}
};
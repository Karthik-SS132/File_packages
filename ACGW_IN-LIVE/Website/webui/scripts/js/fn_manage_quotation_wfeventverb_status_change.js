var manage_quotation_wfeventverb_status_change = {
	constructScreen : function () {
		manage_quotation_wfeventverb_status_change.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName : "salesinvoice",
				serviceName : "retrieve_quotation_detail_for_docgen",
				pageSize : 10,
				inputParameter : {
					quotation_no : "$manage_quotation_master.variable.custom.selectedRecord.quotation_no"
				},
				processResponse : true,
				outputPath : false,
				parse : manage_quotation_wfeventverb_status_change.customRequirementHandler.dataSourceParse
			});
		manage_quotation_wfeventverb_status_change.variable.custom.datasource_2 = new kendo.data.DataSource({
				transport : {
					read : {
						url : mserviceUtilities.getWebserverpath() + "common/components/convertHtml2Pdf/ConvertHtml2PDFWeb.aspx",
						dataType : "json",
						method : "post",
						contentType : "application/json;charset=utf-8",
						async : false,
						complete : function (data, response) {
							if (response == "success") {
								manage_quotation_wfeventverb_status_change.variable.custom.response = JSON.parse(data.responseText);
							}
						}
					},
					parameterMap : function () {
						return mserviceUtilities.getTransportParameter({
							inputparam : {
								p_input_html_string : "$manage_quotation_wfeventverb_status_change.customRequirementHandler.getInvoiceContent()",
								p_output_file_path : "'content_store\\" + login_profile.client_id + "\\" + login_profile.country_code + "\\quotation_attachments\\" + manage_quotation_master.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + "'",
								p_output_file_name : "'" + manage_quotation_master.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf'"
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
	},
	initializeWidgets : function () {
		$("#manage_quotation_wfeventverb_status_change_quotation_number").initializeWDisplayarea({
			screenID : "manage_quotation_wfeventverb_status_change",
			defaultValue : "$manage_quotation_wfeventverb_status_change.variable.custom.quotation_number_defaultValue"
		});
		$("#manage_quotation_wfeventverb_status_change_quotation_status").initializeWDisplayarea({
			screenID : "manage_quotation_wfeventverb_status_change",
			defaultValue : "$manage_quotation_wfeventverb_status_change.variable.custom.quotation_status_defaultValue"
		});
		$("#manage_quotation_wfeventverb_status_change_to_stage").initializeWDropdownlist({
			screenID : "manage_quotation_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'QUOTATIONTOSTAGE'",
					p_search_field_1 : "$manage_quotation_master.variable.custom.selectedRecord.quotation_category",
					p_search_field_2 : "$manage_quotation_master.variable.custom.selectedRecord.workflow_stage_no",
					p_search_field_3 : "$manage_quotation_master.variable.custom.selectedRecord.quotation_status",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_quotation_master.variable.custom.selectedWorkflowToStage",
			childFieldID : "manage_quotation_wfeventverb_status_change_to_status"
		});
		$("#manage_quotation_wfeventverb_status_change_to_status").initializeWDropdownlist({
			screenID : "manage_quotation_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'QUOTATIONTOSTATUS'",
					p_search_field_1 : "$manage_quotation_master.variable.custom.selectedRecord.quotation_category",
					p_search_field_2 : "$manage_quotation_master.variable.custom.selectedRecord.workflow_stage_no",
					p_search_field_3 : "$manage_quotation_master.variable.custom.selectedRecord.quotation_status",
					p_search_field_4 : "#manage_quotation_wfeventverb_status_change_to_stage",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_quotation_master.variable.custom.selectedWorkflowToStatus",
			childFieldID : "manage_quotation_wfeventverb_status_change_reason_code"
		});
		$("#manage_quotation_wfeventverb_status_change_comments").initializeWTextarea({
			screenID : "manage_quotation_wfeventverb_status_change",
			maxlength : "1000"
		});
		$("#manage_quotation_wfeventverb_status_change_to_employee_id").initializeWCombobox({
			screenID : "manage_quotation_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'CALLASSIGNTO_LIST'",
					p_search_field_1 : "",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1"
		});
		$("#manage_quotation_wfeventverb_status_change_reason_code").initializeWDropdownlist({
			screenID : "manage_quotation_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "manage_quotation_wfeventverb_status_change.customRequirementHandler.getReasonCodeInputparamXML()"
				},
			},
			dataTextField : "description",
			dataValueField : "code"
		});
		$("#manage_quotation_wfeventverb_status_change_attachment").initializeWAttachment({
			screenID : "manage_quotation_wfeventverb_status_change"
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var selectedReasonCode,
			inputParamXMLString,
			inputParamXMLString1,
			inputParamXMLString2,
			inputParamXMLString3,
			attachmentXML,
			fileListCounter,
			update_quotation_wfeventverb_status_change,
			uploadStatus,
			returnValue;
			selectedReasonCode = "",
			inputParamXMLString1 = "",
			inputParamXMLString2 = "",
			inputParamXMLString3 = "",
			attachmentXML = "";
			inputParamXMLString = $("#manage_quotation_wfeventverb_status_change_content_1").getInputparamXML({
					screenID : "manage_quotation_wfeventverb_status_change",
					matchCondition : ["manage_quotation_wfeventverb_status_change_quotation_header", "manage_quotation_wfeventverb_status_change_quotation_detail"]
				}).match(/.{1,4500}/g);
			if (inputParamXMLString[0] != undefined) {
				inputParamXMLString1 = inputParamXMLString[0];
			}
			if (inputParamXMLString[1] != undefined) {
				inputParamXMLString2 = inputParamXMLString[1];
			}
			if (inputParamXMLString[2] != undefined) {
				inputParamXMLString3 = inputParamXMLString[2];
			}
			attachmentXML += "<attachment_xml>";
			for (fileListCounter = 0; fileListCounter < manage_quotation_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
				attachmentXML += "<attachment>";
				attachmentXML += "<file_name>" + getXmlString(manage_quotation_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileName) + "</file_name>";
				attachmentXML += "<file_category>" + getXmlString(manage_quotation_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileCategory) + "</file_category>";
				attachmentXML += "<file_type>" + getXmlString(manage_quotation_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileType) + "</file_type>";
				attachmentXML += "</attachment>";
			}
			attachmentXML += "</attachment_xml>";
			update_quotation_wfeventverb_status_change = {
				p_quotation_no : manage_quotation_master.variable.custom.selectedRecord.quotation_no,
				p_wfeventverb_id : manage_quotation_master.variable.custom.selectedWorkflowEventVerb,
				p_event_date : mserviceUtilities.getDateString(new Date(), "yyyy-MM-dd"),
				p_event_hour : mserviceUtilities.getDateString(new Date(), "HH"),
				p_event_minute : mserviceUtilities.getDateString(new Date(), "mm"),
				p_from_wf_stage_no : manage_quotation_master.variable.custom.selectedRecord.workflow_stage_no,
				p_to_wf_stage_no : $("#manage_quotation_wfeventverb_status_change_to_stage").getVal(),
				p_from_wf_status : manage_quotation_master.variable.custom.selectedRecord.quotation_status,
				p_to_wf_status : $("#manage_quotation_wfeventverb_status_change_to_status").getVal(),
				p_channel_id : "WEB",
				p_by_employee_id : login_profile.emp_id,
				p_to_employee_id_string : $("#manage_quotation_wfeventverb_status_change_to_employee_id").getVal(),
				p_reason_code : $("#manage_quotation_wfeventverb_status_change_reason_code").getVal(),
				p_comments : $("#manage_quotation_wfeventverb_status_change_comments").getVal(),
				p_attachment_xml : attachmentXML,
				p_inputparam_xml1 : inputParamXMLString1,
				p_inputparam_xml2 : inputParamXMLString2,
				p_inputparam_xml3 : inputParamXMLString3,
				p_rec_tstamp : manage_quotation_master.variable.custom.selectedRecord.rec_tstamp,
				p_save_mode : "A"
			};
			if (manage_quotation_wfeventverb_status_change.variable.custom.attachedFilesList.length != 0) {
				uploadStatus = 0;
				for (fileListCounter = 0; fileListCounter < manage_quotation_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
					uploadStatus += mserviceUtilities.uploadFile(mserviceUtilities.getFileUploadPath({
							transactionType : "QUOTATION",
							async : false,
							referenceNumber : manage_quotation_master.variable.custom.selectedRecord.quotation_ref_no
						}), manage_quotation_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].file);
				}
				if (uploadStatus == manage_quotation_wfeventverb_status_change.variable.custom.attachedFilesList.length) {
					returnValue = executeService_update_quotation_wfeventverb_status_change(update_quotation_wfeventverb_status_change);
					if (returnValue == "SP001") {
						alert("Quotation " + manage_quotation_master.variable.custom.nextScreenName + " Successfully Done.");
						return true;
					} else if (returnValue == false) {
						for (fileListCounter = 0; fileListCounter < manage_quotation_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
							mserviceUtilities.deleteFile(mserviceUtilities.getFileUploadPath({
									transactionType : "QUOTATION",
									async : false,
									referenceNumber : manage_quotation_master.variable.custom.selectedRecord.quotation_ref_no
								}) + "/" + manage_quotation_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileName);
						}
						return false;
					}
				} else {
					alert("Uploading of files Failed");
					return false;
				}
			} else {
				if ($("#manage_quotation_wfeventverb_status_change_to_status").getVal() == "AP") {
					manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.read();
					manage_quotation_wfeventverb_status_change.variable.custom.datasource_2.read();
					if (manage_quotation_wfeventverb_status_change.variable.custom.response.status == "success") {
						update_quotation_wfeventverb_status_change.p_attachment_xml = "<attachment_xml><attachment><file_name>" + manage_quotation_master.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf" + "</file_name><file_category>P</file_category><file_type></file_type></attachment></attachment_xml>";
						returnValue = executeService_update_quotation_wfeventverb_status_change(update_quotation_wfeventverb_status_change);
						if (returnValue.update_status == "SP001") {
							alert("Quotation " + manage_quotation_master.variable.custom.nextScreenName + " Successfully Done.");
							return true;
						} else {
							mserviceUtilities.deleteFile("quotation_attachments/" + manage_quotation_master.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + "/" + manage_quotation_master.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf");
							return false;
						}
					} else {
						mserviceUtilities.deleteFile("quotation_attachments/" + manage_quotation_master.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + "/" + manage_quotation_master.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf");
						alert("Quotation cannot be approved due to pdf generation failure.");
						return false;
					}
				} else {
					returnValue = executeService_update_quotation_wfeventverb_status_change(update_quotation_wfeventverb_status_change);
					if (returnValue.update_status == "SP001") {
						alert("Quotation " + manage_quotation_master.variable.custom.nextScreenName + " Successfully Done.");
						return true;
					} else {
						mserviceUtilities.deleteFile("quotation_attachments/" + manage_quotation_master.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + "/" + manage_quotation_master.variable.custom.selectedRecord.quotation_no.replace(/\//g, "-") + ".pdf");
						return false;
					}
				}

			}
		}
	},
	customRequirementHandler : {
		dataSourceParse : function (response) {
			myData = response;
			if (response.document.context.outputparam_addn_info != undefined) {
				if (response.document.context.outputparam_addn_info.length != undefined) {
					manage_quotation_wfeventverb_status_change.variable.custom.outputparam_addn_info = response.document.context.outputparam_addn_info;
				} else {
					manage_quotation_wfeventverb_status_change.variable.custom.outputparam_addn_info = [response.document.context.outputparam_addn_info];
				}
			};
			if (response.document.context.outputparam_taxdetail != undefined) {
				if (response.document.context.outputparam_taxdetail.length != undefined) {
					manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail = response.document.context.outputparam_taxdetail;
				} else {
					manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail = [response.document.context.outputparam_taxdetail];
				}
			};
			if (response.document.context.outputparam_detail != undefined) {
				if (response.document.context.outputparam_detail.length != undefined) {
					manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail = response.document.context.outputparam_detail;
				} else {
					manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail = [response.document.context.outputparam_detail];
				}
			};
			return [response.document.context.outputparam_header];
		},
		getReasonCodeInputparamXML : function () {
			return "<inputparam><lov_code_type>QUOTATION_STATUSCHANGE_REASONCODES</lov_code_type><search_field_1>" + manage_quotation_master.variable.custom.selectedWorkflowEventVerb + "</search_field_1><search_field_2>" + $("#manage_quotation_wfeventverb_status_change_to_stage").getVal() + "</search_field_2><search_field_3>" + $("#manage_quotation_wfeventverb_status_change_to_status").getVal() + "</search_field_3></inputparam>";
		},
		getInvoiceContent : function () {
			$.ajax({
				url : mserviceUtilities.getWebserverpath() + "common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].seller_id + ".txt",
				async : false,
				cache : false
			}).done(function (data) {
				manage_quotation_wfeventverb_status_change.variable.custom.imageData1 = data;
			});
			$.ajax({
				url : mserviceUtilities.getWebserverpath() + "common/images/" + login_profile.client_id + "/" + login_profile.country_code + "/" + login_profile.client_id + ".txt",
				async : false,
				cache : false
			}).done(function (data) {
				manage_quotation_wfeventverb_status_change.variable.custom.imageData2 = data;
			});
			if(typeof(fn_taxation_quotation_generate_pdf) === "function"){
				return fn_taxation_quotation_generate_pdf();	
			} else {
				var content = "<html><body><div style = 'width:1000px; font-size: large;'>";
				content += "<div style = 'margin-bottom:3px;'>";
				if (manage_quotation_wfeventverb_status_change.variable.custom.imageData1 != undefined) {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;' src =" + manage_quotation_wfeventverb_status_change.variable.custom.imageData1 + "/>";
				} else {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;' src =" + "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEX///+nxBvIAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC" + "/>";
				}
				content += "<span style = 'font-weight: bold;margin-left: 250px;' >COMMERCIAL / TAX QUOTATION</span>";
				if (manage_quotation_wfeventverb_status_change.variable.custom.imageData2 != undefined) {
					content += "<img style = 'width: 100px; height: 50px; vertical-align: -20px;float:right;' src =" + manage_quotation_wfeventverb_status_change.variable.custom.imageData2 + "/>";
				}
				content += "</div>";
				content += "<table width = '100%' border = '1px' style='table-layout: fixed; word-wrap: break-word; font-size: large;border-collapse:collapse;'>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = 'font-size: large; padding-left: 2px; padding-bottom: 2px;' rowspan = '3' colspan = '46'><div><span style = 'font-weight: bold;'>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].seller_id_desc + "</span></br>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].seller_address_line_1 + "</br>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].seller_address_line_2 + "</br>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].seller_city + "</br>Contact : " + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].seller_contact_no + "</br>E-Mail &nbsp; : " + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].seller_email_id + "</div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Quotation No<div style = 'float:right;'></div></div></br><div><span style = 'font-weight: bold';>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].quotation_no + "</span><div style = 'float:right;'><span style = 'font-weight: bold';></span></div></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Dated</div></br><div><span style = 'font-weight: bold;'>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].quotation_date + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Delivery Note</div></br><div><span style = 'font-weight: bold';></span></div></td>";
				content += "<td style = 'padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Mode / Terms of Payment</div></br><div><span style = 'font-weight: bold;'>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].payment_terms + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Supplier Ref</div></br><div><span style = 'font-weight: bold';></span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Other Reference(s)</div></br><div><span style = 'font-weight: bold';>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].other_reference + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = 'font-size: large;padding-left: 2px; padding-bottom: 2px; ' rowspan = '3' colspan = '46'><div>Consignee</br> <span style = 'font-weight: bold';>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].consignee_id_desc + "</span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Buyers Order No</div></br><div> <span style = 'font-weight: bold';>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].buyer_reference + "</span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Dated</div></br><div><span style = 'font-weight: bold';>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].buyer_reference_date + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Despatch Document No</div></br><div><span style = 'font-weight: bold';></span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Dated</div></br><div><span style = 'font-weight: bold';></span></div></td>";
				content += "</tr>";
				content += "<tr style = 'vertical-align:top;'>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px; ' colspan = '27'><div>Despatched Through</div></br><div> <span style = 'font-weight: bold';>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].despatch_mode_road_rail + "</span></div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '27'><div>Destination</div></br><div> <span style = 'font-weight: bold';>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].destination + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'height:90px;vertical-align:top;'>";
				content += "<td style = 'font-size: large;padding-left: 2px; padding-bottom: 2px; ' colspan = '46'><div>Buyer </br> <span style = 'font-weight: bold';>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].buyer_id_desc + "</span></br>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].buyer_city + "</div></td>";
				content += "<td style = ' padding-left: 2px; padding-bottom: 2px;' colspan = '54'><div style = 'font-size: large;'>Terms and Conditions</br><span style = 'font-weight:bold; white-space: pre-wrap;'>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].quotation_terms_conditions + "</span></div></td>";
				content += "</tr>";
				content += "<tr style = 'text-align:center;'>";
				content += "<td style = ' ' colspan = '4' >Sl</br>No</td>";
				content += "<td style = ' ' colspan = '45'>Description of Goods</td>";
				content += "<td style = ' ' colspan = '9'>Quantity</td>";
				content += "<td style = ' ' colspan = '15' >Rate</td>";
				content += "<td style = ' ' colspan = '5' >per</td>";
				content += "<td style = ' ' colspan = '7' >Disc.%</td>";
				content += "<td style = '' colspan = '15'>Amount</td>";
				content += "</tr>";
				for (var index in manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail) {
					content += "<tr style = 'height:20px;'>";
					content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>" + manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail[index].item_sl_no + "</td>";
					content += "<td colspan = '45' style = 'padding-top : 2px; border-bottom-style: hidden; font-weight: bold;padding-left : 2px;'>" + manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail[index].item_code + " - " + manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail[index].item_description + "</td>";
					content += "<td colspan = '9' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail[index].net_quantity + "</td>";
					content += "<td colspan = '15'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;padding-right : 2px;'>" + manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail[index].std_rate + "</td>";
					content += "<td colspan = '5'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>" + manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail[index].uom_code + "</td>";
					content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'></td>";
					content += "<td colspan = '15' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + manage_quotation_wfeventverb_status_change.customRequirementHandler.numberFormat(manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail[index].gross_amount) + "</td>";
					content += "</tr>";
					if(manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail != undefined){
						var itemCode = manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail[index].item_code;
						for(var indicator = parseInt(index) + 1; indicator < manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail.length;indicator++){
							if(itemCode == manage_quotation_wfeventverb_status_change.variable.custom.outputparam_detail[indicator].item_code){
								itemCode = "";
							} 
						}
						var lineitemArray = $.grep(manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail,function(lineitemTaxDetails,index){
							if((lineitemTaxDetails.item_code != "OVERALL") && (lineitemTaxDetails.item_code == itemCode)){
								return lineitemTaxDetails;
							}
						});
						for (var index in lineitemArray) {
							content += "<tr style = 'height:20px;'>";
							content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
							content += "<td colspan = '45' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + lineitemArray[index].charge_code + "</td>";
							content += "<td colspan = '9'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
							if (lineitemArray[index].percentage_amount_ind == 'A') {
								content += "<td colspan = '15' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + lineitemArray[index].amount + "</td>";
							} else {
								content += "<td colspan = '15' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + lineitemArray[index].percentage + "</td>";
							}
							content += "<td colspan = '5'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
							if (lineitemArray[index].percentage_amount_ind == 'P') {
								content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>%</td>";
							} else {
								content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>Amt</td>";
							}
							content += "<td colspan = '15' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + manage_quotation_wfeventverb_status_change.customRequirementHandler.numberFormat(lineitemArray[index].amount) + "</td>";
							content += "</tr>";
						}
					}
				}
				if(manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail != undefined){
					manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail_overall = $.grep(manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail,function(overallTaxDetails,index){
						if(overallTaxDetails.item_code == "OVERALL"){
							return overallTaxDetails;
						}
					});
					for (var index in manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail_overall) {
						content += "<tr style = 'height:20px;'>";
						content += "<td colspan = '4'style = 'padding-top : 2px; border-bottom-style: hidden'></td>";
						content += "<td colspan = '45' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>OVERALL " + manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail_overall[index].charge_code + "</td>";
						content += "<td colspan = '9'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
						if (manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'A') {
							content += "<td colspan = '15' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail_overall[index].amount + "</td>";
						} else {
							content += "<td colspan = '15' style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'>" + manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail_overall[index].percentage + "</td>";
						}
						content += "<td colspan = '5'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:right;'></td>";
						if (manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail_overall[index].percentage_amount_ind == 'P') {
							content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>%</td>";
						} else {
							content += "<td colspan = '7'style = 'padding-top : 2px; border-bottom-style: hidden;text-align:center;'>Amt</td>";
						}
						content += "<td colspan = '15' style = 'padding-top : 2px;border-bottom-style: hidden;text-align:right; font-weight: bold;padding-right : 2px;'>" + manage_quotation_wfeventverb_status_change.customRequirementHandler.numberFormat(manage_quotation_wfeventverb_status_change.variable.custom.outputparam_taxdetail_overall[index].amount) + "</td>";
						content += "</tr>";
					}
				}
				content += "<tr style = 'height:30px;'>";
				content += "<td colspan = '4'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '45' style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '9' style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '15'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '5'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '7'style = 'padding-top : 2px;'></td>";
				content += "<td colspan = '15'></td>";
				content += "</tr>";
				content += "<tr style = 'height:20px;'>";
				content += "<td colspan = '4'style = 'padding-top : 2px; ' ></td>";
				content += "<td colspan = '45' style = 'padding-top : 2px; text-align:right; padding-right : 2px;'>Total</td>";
				content += "<td colspan = '9' style = 'padding-top : 2px; text-align:right; font-weight: bold; '></td>";
				content += "<td colspan = '15'style = 'padding-top : 2px; '></td>";
				content += "<td colspan = '5'style = 'padding-top : 2px; '></td>";
				content += "<td colspan = '7'style = 'padding-top : 2px; '></td>";
				content += "<td colspan = '15' style = 'padding-top : 2px; text-align:right; font-weight: bold;padding-right : 2px;'>" + manage_quotation_wfeventverb_status_change.customRequirementHandler.numberFormat(manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].quotation_net_amount) + "</td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = 'border-bottom-style: hidden; padding-left : 2px;' >Amount Chargeable (in words)<span style = 'float:right;'>E.&O.E </span></td>";
				content += "</tr>";
				content += "<tr>";
				content += "<td colspan = '100' style = 'border-bottom-style: hidden; font-weight: bold; padding-left : 2px;'>" + manage_quotation_wfeventverb_status_change.customRequirementHandler.wordFormat(manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].quotation_net_amount, manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].currency_code) + "</td>";
				content += "</tr>";
				content += "<tr style = 'height:60px; border-bottom-style: hidden;'>";
				content += "<td colspan = '100' ></td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden; padding-left : 2px;'>Companys VAT TIN</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].udf_char_1 + "</td>";
				content += "<td colspan = '50' style = 'border-bottom-style: hidden; border-left-style: hidden;'>Companys Bank Details</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden; padding-left : 2px;'>Companys CST NO</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].udf_char_2 + "</td>";
				content += "<td colspan = '18' style = 'border-bottom-style: hidden;border-left-style: hidden;'>Bank Name</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				content += "<td colspan = '30' style = 'border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].udf_analysis_code1 + "</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden; padding-left : 2px;'>Companys Service Tax No.</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				content += "<td colspan = '24' style = 'border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].udf_char_3 + "</td>";
				content += "<td colspan = '18' style = 'border-bottom-style: hidden;border-left-style: hidden;'>A/c No</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				content += "<td colspan = '30' style = 'border-bottom-style: hidden;border-left-style: hidden; font-weight: bold;'>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].udf_analysis_code2 + "</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '50' style = 'border-bottom-style: hidden; padding-left : 2px;'><span style = 'border-bottom : 1px solid; padding:1px;'>Declaration</span></td>";
				content += "<td colspan = '18' style = 'border-left-style: hidden;'>Branch & IFS Code</td>";
				content += "<td colspan = '2' style = 'border-bottom-style: hidden;border-left-style: hidden;'>:</td>";
				var amber = "&";
				if(manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].udf_analysis_code4 == ""){
					var amber = "";
				}
				content += "<td colspan = '30' style = 'border-left-style: hidden; font-weight: bold;'>" + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].udf_analysis_code3 + amber + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].udf_analysis_code4 + "</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '50' rowspan = '2' style = 'border-bottom-style: hidden;padding-left : 2px;padding-bottom : 2px;padding-top : 4px;'>Certified that the particulars given above are true & </br> correct & the amount indicated represents the price</br>actually charged & that there is no flow of additional</br> consideration directly or indirectly from the buyer.</td>";
				content += "<td colspan = '50' style = 'border-bottom-style: hidden;text-align: end;vertical-align: top; font-weight: bold;padding-right : 2px;'>for " + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].seller_id_desc + "</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '50' style = 'padding-bottom:2px;  border-bottom-style: hidden;text-align: end;vertical-align: bottom;padding-right : 2px;'>Authorized Signatory</td>";
				content += "</tr>";
				content += "<tr style = 'padding:2px;'>";
				content += "<td colspan = '100' ></td>";
				content += "</tr>";
				content += "</table>";
				content += "<div style = 'margin-top:2px;text-align: center; font-size: large;text-transform: uppercase;'>SUBJECT TO " + manage_quotation_wfeventverb_status_change.variable.custom.datasource_1.data()[0].seller_city + " JURISDICTION</div>";
				content += "<div style = 'margin-top:2px;text-align: center; font-size: large;'>This is a Computer Generated Quotation</div>";
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
						return currencyType + manage_quotation_wfeventverb_status_change.customRequirementHandler.rupeestoWords(value[0]);
					} else {
						return currencyType + manage_quotation_wfeventverb_status_change.customRequirementHandler.dollarstoWords(value[0]);
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
			screenEditableIndicator : true,
			popupIndicator : true,
			configurationParam : manage_quotation_master.variable.custom.selectedWorkflowEventVerb,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			quotation_number_defaultValue : manage_quotation_master.variable.custom.selectedRecord.quotation_no,
			quotation_status_defaultValue : manage_quotation_master.variable.custom.selectedRecord.quotation_status_desc,
			attachedFilesList : [],
		}
	}
};
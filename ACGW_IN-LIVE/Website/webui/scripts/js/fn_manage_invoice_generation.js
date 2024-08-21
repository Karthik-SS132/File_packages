var manage_invoice_generation = {
	constructScreen : function () {
		manage_invoice_generation.variable.custom.datasource_1 = mserviceUtilities.getTransportDataSource({
				applicationName: "common_modules",
				serviceName: "retrieve_listof_values",
				outputPath: "context/outputparam",
				pageSize: 1,
				inputParameter : {
					p_lov_code : "'VALID_INVOICENO_AMOUNT_CHECK'",
					p_search_field_1 : "$manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no",
					p_search_field_2 : "",
					p_search_field_3 : "",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
				screenID: "manage_invoice_generation",
			});
			manage_invoice_generation.variable.custom.datasource_1.read();
			manage_invoice_generation.variable.custom.selectedDatasource = manage_invoice_generation.variable.custom.datasource_1.data();
			for (var i = 0; i < manage_invoice_generation.variable.custom.selectedDatasource.length; i++) {
				manage_invoice_generation.variable.custom.quoted_value +=  parseInt (manage_invoice_generation.variable.custom.selectedDatasource[i].p_value_field_3);
			}
			if (manage_invoice_generation.variable.custom.quoted_value == 0)
				manage_invoice_generation.variable.custom.max_defaultValue = parseInt(manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_net_amount);
			else 
			manage_invoice_generation.variable.custom.max_defaultValue = parseInt(manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_net_amount)- parseInt(manage_invoice_generation.variable.custom.quoted_value);
		
			
	},
	postConstruct : function(){
		if ((manage_invoice_generation.variable.custom.selectedDatasource.length != 0) && (manage_invoice_generation.variable.custom.selectedDatasource != undefined)){
			$('#manage_invoice_generation_table').attr("style", "height: 100%; width: 100%;").html("<br/><br/><div>" + manage_invoice_generation.customRequirementHandler.getInvoiceDraftContent() +"</div><br/>");
		}
		
	},
	initializeWidgets : function () {
		$("#manage_invoice_generation_customer_order_number").initializeWDisplayarea({
			screenID : "manage_invoice_generation",
			defaultValue : "$manage_invoice_generation.variable.custom.customer_order_number_defaultValue"
		});
		$("#manage_invoice_generation_customer_order_status").initializeWDisplayarea({
			screenID : "manage_invoice_generation",
			defaultValue : "$manage_invoice_generation.variable.custom.customer_order_status_defaultValue"
		});
		$("#manage_invoice_generation_invoice_no").initializeWTextbox({
			screenID : "manage_invoice_generation",
			maxlength : "50",
			defaultValue : "$manage_invoice_generation.variable.custom.asset_location_defaultValue"
		});
		$("#manage_invoice_generation_invoice_date").initializeWDatepicker({
			screenID : "manage_invoice_generation",
			maximum : "NEWDATE",
			defaultValue : "NEWDATE"
		});
		$("#manage_invoice_generation_invoice_amount").initializeWNumerictextbox({
			screenID : "manage_invoice_generation",
			format : "n2",
			minimum : "1",
			maximum : "$manage_invoice_generation.variable.custom.max_defaultValue"
		});
		$("#manage_invoice_generation_currency_code").initializeWDropdownlist({
			screenID : "manage_invoice_generation",
			dataSource : {
				informationType : "'CURRENCYCODE_LIST'"
			},
			dataTextField : "description",
			dataValueField : "code",
			template : "description",
			defaultValue : "$manage_invoice_generation.variable.custom.currency_code",
			defaultValueDescription : "$manage_invoice_generation.variable.custom.currency_code_defaultValueDescription"
		});
		$("#manage_invoice_generation_comments").initializeWTextarea({
			screenID : "manage_invoice_generation",
			maxlength : "1000"
		});
		
		$("#manage_invoice_generation_attachment").initializeWAttachment({
			screenID : "manage_invoice_generation"
		});
	},
	widgetEventHandler: {
		invoice_no_change: function (element, event) {
			var noValidation = manage_invoice_generation.variable.custom.selectedDatasource;
			for (var i = 0; i < noValidation.length; i++) {
				if (noValidation[i].p_value_field_1 == $("#manage_invoice_generation_invoice_no").getVal()) {
					alert("Invoice no already Generated.");
					$("#manage_invoice_generation_invoice_no").setVal("");
				}
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue,
			recordTimeStamp,
			inputparamDetail,
			attachmentXML = "",
			inputparamDetail = [],
			update_customer_order_invoice_generation,
			recordTimeStamp = manage_customer_order_master_service_spares.variable.custom.selectedRecord.rec_tstamp;
			attachmentXML += "<attachment_xml>";
			for (fileListCounter = 0; fileListCounter < manage_invoice_generation.variable.custom.attachedFilesList.length; fileListCounter++) {
				attachmentXML += "<attachment>";
				attachmentXML += "<file_name>" + getXmlString(manage_invoice_generation.variable.custom.attachedFilesList[fileListCounter].fileName) + "</file_name>";
				attachmentXML += "<file_category>" + getXmlString(manage_invoice_generation.variable.custom.attachedFilesList[fileListCounter].fileCategory) + "</file_category>";
				attachmentXML += "<file_type>" + getXmlString(manage_invoice_generation.variable.custom.attachedFilesList[fileListCounter].fileType) + "</file_type>";
				attachmentXML += "</attachment>";
			}
			attachmentXML += "</attachment_xml>";
			
			 update_customer_order_invoice_generation = {
				p_custom_info_code : "invoice_generation",
				p_custom_info_ref_no1: manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no,
				p_custom_info_ref_no2: "",
				p_inputparam_header_xml : "<inputparam_header><inputparam><customer_order_number>" + $("#manage_invoice_generation_customer_order_number").getVal() + "</customer_order_number><customer_order_status>" + $("#manage_invoice_generation_customer_order_status").getVal() + "</customer_order_status><invoice_no>" + $("#manage_invoice_generation_invoice_no").getVal() + "</invoice_no><invoice_date>"+ mserviceUtilities.getDateString($("#manage_invoice_generation_invoice_date").getVal(), "yyyy-MM-dd")+"</invoice_date><invoice_amount>" + $("#manage_invoice_generation_invoice_amount").getVal() + "</invoice_amount><currency_code>" + $("#manage_invoice_generation_currency_code").getVal() + "</currency_code></inputparam>"+attachmentXML+"</inputparam_header>",
				p_rec_timestamp : recordTimeStamp,
				p_save_mode : "U",
				inputparam_detail : ""
			 };
			if (manage_invoice_generation.variable.custom.attachedFilesList.length != 0) {
				uploadStatus = 0;
				for (fileListCounter = 0; fileListCounter < manage_invoice_generation.variable.custom.attachedFilesList.length; fileListCounter++) {
					uploadStatus += mserviceUtilities.uploadFile(mserviceUtilities.getFileUploadPath({
							transactionType : "CUSTOMERORDER",
							async : false,
							referenceNumber : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no
						}), manage_invoice_generation.variable.custom.attachedFilesList[fileListCounter].file);
				}
				if (uploadStatus == manage_invoice_generation.variable.custom.attachedFilesList.length) {
					returnValue =  common_modules_custominfo_setDetail.invokeAPI(update_customer_order_invoice_generation);
					if (returnValue.update_status == "SP001") {
						alert("Customer Order " + manage_customer_order_master_service_spares.variable.custom.nextScreenName + " Successfully Done.");
						return true;
					} else if (returnValue == false) {
						for (fileListCounter = 0; fileListCounter < manage_invoice_generation.variable.custom.attachedFilesList.length; fileListCounter++) {
							mserviceUtilities.deleteFile(mserviceUtilities.getFileUploadPath({
									transactionType : "CUSTOMERORDER",
									async : false,
									referenceNumber : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no
								}) + "/" + manage_invoice_generation.variable.custom.attachedFilesList[fileListCounter].fileName);
						}
						return false;
					}
				} else {
					alert("Uploading of files Failed");
					return false;
				}
			} else {
				returnValue = common_modules_custominfo_setDetail.invokeAPI(update_customer_order_invoice_generation);
				if (returnValue.update_status == "SP001") {
					alert("Customer Order " + manage_customer_order_master_service_spares.variable.custom.nextScreenName + " Successfully Done.");
					return true;
				} else {
					return false;
				}
			}
			
			
			
		}
		/* 
		submit_btn_click : function (element, event) {
			var selectedReasonCode,
			inputParamXMLString,
			inputParamXMLString1,
			inputParamXMLString2,
			inputParamXMLString3,
			attachmentXML,
			fileListCounter,
			update_customer_order_wfeventverb_status_change,
			uploadStatus,
			returnValue;
			selectedReasonCode = "",
			inputParamXMLString1 = "",
			inputParamXMLString2 = "",
			inputParamXMLString3 = "",
			attachmentXML = "";
			inputParamXMLString = $("#manage_invoice_generation_content_1").getInputparamXML({
					screenID : "manage_invoice_generation",
					matchCondition : ["manage_invoice_generation_customer_order_header", "manage_invoice_generation_customer_order_detail"]
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
			for (fileListCounter = 0; fileListCounter < manage_invoice_generation.variable.custom.attachedFilesList.length; fileListCounter++) {
				attachmentXML += "<attachment>";
				attachmentXML += "<file_name>" + getXmlString(manage_invoice_generation.variable.custom.attachedFilesList[fileListCounter].fileName) + "</file_name>";
				attachmentXML += "<file_category>" + getXmlString(manage_invoice_generation.variable.custom.attachedFilesList[fileListCounter].fileCategory) + "</file_category>";
				attachmentXML += "<file_type>" + getXmlString(manage_invoice_generation.variable.custom.attachedFilesList[fileListCounter].fileType) + "</file_type>";
				attachmentXML += "</attachment>";
			}
			attachmentXML += "</attachment_xml>";
			update_customer_order_wfeventverb_status_change = {
				p_customer_order_no : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no,
				p_wfeventverb_id : manage_customer_order_master_service_spares.variable.custom.selectedWorkflowEventVerb,
				p_event_date : mserviceUtilities.getDateString(new Date(), "yyyy-MM-dd"),
				p_event_hour : mserviceUtilities.getDateString(new Date(), "HH"),
				p_event_minute : mserviceUtilities.getDateString(new Date(), "mm"),
				p_from_wf_stage_no : manage_customer_order_master_service_spares.variable.custom.selectedRecord.workflow_stage_no,
				p_to_wf_stage_no : $("#manage_invoice_generation_to_stage").getVal(),
				p_from_wf_status : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_status,
				p_to_wf_status : $("#manage_invoice_generation_to_status").getVal(),
				p_channel_id : "WEB",
				p_by_employee_id : login_profile.emp_id,
				p_to_employee_id_string : $("#manage_invoice_generation_to_employee_id").getVal(),
				p_reason_code : $("#manage_invoice_generation_reason_code").getVal(),
				p_comments : $("#manage_invoice_generation_comments").getVal(),
				p_attachment_xml : attachmentXML,
				p_inputparam_xml1 : inputParamXMLString1,
				p_inputparam_xml2 : inputParamXMLString2,
				p_inputparam_xml3 : inputParamXMLString3,
				p_rec_tstamp : manage_customer_order_master_service_spares.variable.custom.selectedRecord.rec_tstamp,
				p_save_mode : "A"
			};
			if (manage_invoice_generation.variable.custom.attachedFilesList.length != 0) {
				uploadStatus = 0;
				for (fileListCounter = 0; fileListCounter < manage_invoice_generation.variable.custom.attachedFilesList.length; fileListCounter++) {
					uploadStatus += mserviceUtilities.uploadFile(mserviceUtilities.getFileUploadPath({
							transactionType : "CUSTOMERORDER",
							async : false,
							referenceNumber : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_ref_no
						}), manage_invoice_generation.variable.custom.attachedFilesList[fileListCounter].file);
				}
				if (uploadStatus == manage_invoice_generation.variable.custom.attachedFilesList.length) {
					returnValue = executeService_update_customer_order_wfeventverb_status_change(update_customer_order_wfeventverb_status_change);
					if (returnValue == "SP001") {
						alert("Customer Order " + manage_customer_order_master_service_spares.variable.custom.nextScreenName + " Successfully Done.");
						return true;
					} else if (returnValue == false) {
						for (fileListCounter = 0; fileListCounter < manage_invoice_generation.variable.custom.attachedFilesList.length; fileListCounter++) {
							mserviceUtilities.deleteFile(mserviceUtilities.getFileUploadPath({
									transactionType : "CUSTOMERORDER",
									async : false,
									referenceNumber : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_ref_no
								}) + "/" + manage_invoice_generation.variable.custom.attachedFilesList[fileListCounter].fileName);
						}
						return false;
					}
				} else {
					alert("Uploading of files Failed");
					return false;
				}
			} else {
				returnValue = executeService_update_customer_order_wfeventverb_status_change(update_customer_order_wfeventverb_status_change);
				if (returnValue.update_status == "SP001") {
					alert("Customer Order " + manage_customer_order_master_service_spares.variable.custom.nextScreenName + " Successfully Done.");
					return true;
				} else {
					return false;
				}
			}
		} */
	},
	customRequirementHandler : {
		getInvoiceDraftContent : function (){
			var content ="";
			content += '<table border="1"   style="width: 735px; table-layout:fixed; border-collapse:collapse;">';
			content += '<tr style = "text-align:center;">';
			content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "6" >Sl</br>No</td>';
			content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "28">Order No</td>';
			content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "28">invoice no</td>';
			content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "15">Invoice Date</td>';
			content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid;" colspan = "15">Invoice Amount</td>';
			content += '<td style = "font-weight: bold; border-right: 1px solid; border-bottom: 1px solid; border-right-style: hidden" colspan = "8" >Rate</td>';
			
			
			content += '</tr>';
			for (var i = 0; i< manage_invoice_generation.variable.custom.selectedDatasource.length; i++) {
				content += '<tr style = "height:20px;">';
				content += '<td colspan = "6"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + parseInt(i+1)  + '</td>';
				content += '<td colspan = "28"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no  + '</td>';
				content += '<td colspan = "28"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + manage_invoice_generation.variable.custom.selectedDatasource[i].p_value_field_1 + '</td>';
				content += '<td colspan = "15"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' + manage_invoice_generation.variable.custom.selectedDatasource[i].p_value_field_2 + '</td>';
				content += '<td colspan = "15"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden;text-align:center;">' +  manage_invoice_generation.variable.custom.selectedDatasource[i].p_value_field_3+ '</td>';
				content += '<td colspan = "8"  style = "padding-top : 2px;border-right: 1px solid; border-bottom-style: hidden; border-right-style: hidden; text-align:center;">' +  manage_invoice_generation.variable.custom.selectedDatasource[i].p_description_field_1+ '</td>';
				content += '</tr>';
			}
			content += '</table>';
			return content;
			
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			popupIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			customer_order_number_defaultValue : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_no,
			customer_order_status_defaultValue : manage_customer_order_master_service_spares.variable.custom.selectedRecord.customer_order_status_desc,
			attachedFilesList : [],
			quoted_value : 0
		}
	}
};
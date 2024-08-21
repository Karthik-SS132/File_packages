var manage_inventory_adjustment_wfeventverb_status_change = {
	constructScreen : function () {
		return true;
	},
	initializeWidgets : function () {
		$("#manage_inventory_adjustment_wfeventverb_status_change_inv_adj_no").initializeWDisplayarea({
			screenID : "manage_inventory_adjustment_wfeventverb_status_change",
			defaultValue : "$manage_inventory_adjustment_wfeventverb_status_change.variable.custom.inv_adj_no_defaultValue"
		});
		$("#manage_inventory_adjustment_wfeventverb_status_change_inv_adj_status").initializeWDisplayarea({
			screenID : "manage_inventory_adjustment_wfeventverb_status_change",
			defaultValue : "$manage_inventory_adjustment_wfeventverb_status_change.variable.custom.inv_adj_status_defaultValue"
		});
		$("#manage_inventory_adjustment_wfeventverb_status_change_to_stage").initializeWDropdownlist({
			screenID : "manage_inventory_adjustment_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'INVADJTOSTAGE'",
					p_search_field_1 : "$manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_category",
					p_search_field_2 : "$manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_wf_stage_no",
					p_search_field_3 : "$manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_status",
					p_search_field_4 : "",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_inventory_adjustment.variable.custom.selectedWorkflowToStage",
			childFieldID : "manage_inventory_adjustment_wfeventverb_status_change_to_status"
		});
		$("#manage_inventory_adjustment_wfeventverb_status_change_to_status").initializeWDropdownlist({
			screenID : "manage_inventory_adjustment_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values",
				inputParameter : {
					p_lov_code : "'INVADJTOSTATUS'",
					p_search_field_1 : "$manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_category",
					p_search_field_2 : "$manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_wf_stage_no",
					p_search_field_3 : "$manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_status",
					p_search_field_4 : "#manage_inventory_adjustment_wfeventverb_status_change_to_stage",
					p_search_field_5 : ""
				},
			},
			dataTextField : "p_description_field_1",
			dataValueField : "p_value_field_1",
			defaultValue : "$manage_inventory_adjustment.variable.custom.selectedWorkflowToStatus",
			childFieldID : "manage_inventory_adjustment_wfeventverb_status_change_reason_code"
		});
		$("#manage_inventory_adjustment_wfeventverb_status_change_comments").initializeWTextarea({
			screenID : "manage_inventory_adjustment_wfeventverb_status_change",
			maxlength : "1000"
		});
		$("#manage_inventory_adjustment_wfeventverb_status_change_to_employee_id").initializeWCombobox({
			screenID : "manage_inventory_adjustment_wfeventverb_status_change",
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
		$("#manage_inventory_adjustment_wfeventverb_status_change_reason_code").initializeWDropdownlist({
			screenID : "manage_inventory_adjustment_wfeventverb_status_change",
			dataSource : {
				applicationName : "common_modules",
				serviceName : "retrieve_listof_values_for_searchcondition",
				inputParameter : {
					p_inputparam_xml : "manage_inventory_adjustment_wfeventverb_status_change.customRequirementHandler.getReasonCodeInputparamXML()"
				},
			},
			dataTextField : "description",
			dataValueField : "code"
		});
		$("#manage_inventory_adjustment_wfeventverb_status_change_attachment").initializeWAttachment({
			screenID : "manage_inventory_adjustment_wfeventverb_status_change"
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
			update_invadj_wfeventverb_status_change,
			uploadStatus,
			returnValue;
			selectedReasonCode = "",
			inputParamXMLString1 = "",
			inputParamXMLString2 = "",
			inputParamXMLString3 = "",
			attachmentXML = "";
			inputParamXMLString = $("#manage_inventory_adjustment_wfeventverb_status_change_content_1").getInputparamXML({
					screenID : "manage_inventory_adjustment_wfeventverb_status_change",
					matchCondition : ["manage_inventory_adjustment_wfeventverb_status_change_inv_adj"]
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
			for (fileListCounter = 0; fileListCounter < manage_inventory_adjustment_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
				attachmentXML += "<attachment>";
				attachmentXML += "<file_name>" + getXmlString(manage_inventory_adjustment_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileName) + "</file_name>";
				attachmentXML += "<file_category>" + getXmlString(manage_inventory_adjustment_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileCategory) + "</file_category>";
				attachmentXML += "<file_type>" + getXmlString(manage_inventory_adjustment_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileType) + "</file_type>";
				attachmentXML += "</attachment>";
			}
			attachmentXML += "</attachment_xml>";
			update_invadj_wfeventverb_status_change = {
				p_inv_adj_ref_no : manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_no,
				p_wfeventverb_id : manage_inventory_adjustment.variable.custom.selectedWorkflowEventVerb,
				p_event_date : mserviceUtilities.getDateString(new Date(), "yyyy-MM-dd"),
				p_event_hour : mserviceUtilities.getDateString(new Date(), "HH"),
				p_event_minute : mserviceUtilities.getDateString(new Date(), "mm"),
				p_from_wf_stage_no : manage_inventory_adjustment.variable.custom.selectedRecord.workflow_stage_no,
				p_to_wf_stage_no : $("#manage_inventory_adjustment_wfeventverb_status_change_to_stage").getVal(),
				p_from_wf_status : manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_status,
				p_to_wf_status : $("#manage_inventory_adjustment_wfeventverb_status_change_to_status").getVal(),
				p_channel_id : "WEB",
				p_by_employee_id : login_profile.emp_id,
				p_to_employee_id_string : $("#manage_inventory_adjustment_wfeventverb_status_change_to_employee_id").getVal(),
				p_reason_code : $("#manage_inventory_adjustment_wfeventverb_status_change_reason_code").getVal(),
				p_comments : $("#manage_inventory_adjustment_wfeventverb_status_change_comments").getVal(),
				p_attachment_xml : attachmentXML,
				p_inputparam_xml1 : inputParamXMLString1,
				p_inputparam_xml2 : inputParamXMLString2,
				p_inputparam_xml3 : inputParamXMLString3,
				p_rec_tstamp : manage_inventory_adjustment.variable.custom.selectedRecord.rec_tstamp,
				p_save_mode : "A"
			};
			if (manage_inventory_adjustment_wfeventverb_status_change.variable.custom.attachedFilesList.length != 0) {
				uploadStatus = 0;
				for (fileListCounter = 0; fileListCounter < manage_inventory_adjustment_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
					uploadStatus += mserviceUtilities.uploadFile(mserviceUtilities.getFileUploadPath({
							transactionType : "INVADJ",
							async : false,
							referenceNumber : manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_ref_no
						}), manage_inventory_adjustment_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].file);
				}
				if (uploadStatus == manage_inventory_adjustment_wfeventverb_status_change.variable.custom.attachedFilesList.length) {
					returnValue = executeService_update_invadj_wfeventverb_status_change(update_invadj_wfeventverb_status_change);
					if (returnValue.update_status == "SP001") {
						alert("Parts Order Document " + manage_inventory_adjustment.variable.custom.nextScreenName + " Successfully Done.");
						return true;
					} else if (returnValue == false) {
						for (fileListCounter = 0; fileListCounter < manage_inventory_adjustment_wfeventverb_status_change.variable.custom.attachedFilesList.length; fileListCounter++) {
							mserviceUtilities.deleteFile(mserviceUtilities.getFileUploadPath({
									transactionType : "INVADJ",
									async : false,
									referenceNumber : manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_ref_no
								}) + "/" + manage_inventory_adjustment_wfeventverb_status_change.variable.custom.attachedFilesList[fileListCounter].fileName);
						}
						return false;
					}
				} else {
					alert("Uploading of files Failed");
					return false;
				}
			} else {
				returnValue = executeService_update_invadj_wfeventverb_status_change(update_invadj_wfeventverb_status_change);
				if (returnValue.update_status == "SP001") {
					alert("Inventory Adjustment " + manage_inventory_adjustment.variable.custom.nextScreenName + " Successfully Done.");
					return true;
				} else {
					return false;
				}
			}
		}
	},
	customRequirementHandler : {
		getReasonCodeInputparamXML : function () {
			return "<inputparam><lov_code_type>INVADJ_STATUSCHANGE_REASONCODES</lov_code_type><search_field_1>" + manage_inventory_adjustment.variable.custom.selectedWorkflowEventVerb + "</search_field_1><search_field_2>" + $("#manage_inventory_adjustment_wfeventverb_status_change_to_stage").getVal() + "</search_field_2><search_field_3>" + $("#manage_inventory_adjustment_wfeventverb_status_change_to_status").getVal() + "</search_field_3></inputparam>";
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			popupIndicator : true,
			configurationParam : manage_inventory_adjustment.variable.custom.selectedWorkflowEventVerb,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			inv_adj_no_defaultValue : manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_no,
			inv_adj_status_defaultValue : manage_inventory_adjustment.variable.custom.selectedRecord.inv_adj_status_desc,
			attachedFilesList : []
		}
	}
};
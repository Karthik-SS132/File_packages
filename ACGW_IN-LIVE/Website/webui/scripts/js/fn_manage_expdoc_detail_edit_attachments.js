var manage_expdoc_detail_edit_attachments = {
	constructScreen : function () {
		if (manage_expdoc_detail_edit.variable.custom.crudIndicator == "V") {
			$("#manage_expdoc_detail_edit_attachments_header_1").hide();
			$("#manage_expdoc_detail_edit_attachments_submit_btn").hide();
			$("#manage_expdoc_detail_edit_attachments").attr("style", "height: 90%; width: 100%;");
			$('#manage_expdoc_detail_edit_attachments').prepend("<embed src='../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_expdoc_detail_edit.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime() + "' style='height: 100%; width: 100%;'></embed>");
		} else if (manage_expdoc_detail_edit.variable.custom.crudIndicator == "A") {
			$("#manage_expdoc_detail_edit_attachments_download_btn").hide();
		}
	},
	initializeWidgets : function () {
		$("#manage_expdoc_detail_edit_attachments_attachment").initializeWAttachment({
			screenID : "manage_expdoc_detail_edit_attachments"
		});
	},
	buttonEventHandler : {
		misc_btn_click : function (element, event) {
			var anchor;
			anchor = $("<a>").attr("href", "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_expdoc_detail_edit.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime()).attr("download", manage_expdoc_detail_edit.variable.custom.attachmentTobeViewed.split("/")[2]).appendTo("#manage_expdoc_detail_edit_attachments");
			anchor[0].click();
			anchor.remove();
		},
		submit_btn_click : function (element, event) {
			var returnValue,
			fileListCounter,
			attachedFilesList,
			uploadStatus;
			if (manage_expdoc_detail_edit_attachments.variable.custom.attachedFilesList.length != 0) {
				attachedFilesList = [];
				uploadStatus = 0;
				for (fileListCounter = 0; fileListCounter < manage_expdoc_detail_edit_attachments.variable.custom.attachedFilesList.length; fileListCounter++) {
					attachedFilesList.push({
						p_file_category : manage_expdoc_detail_edit_attachments.variable.custom.attachedFilesList[fileListCounter].fileCategory,
						p_file_type : manage_expdoc_detail_edit_attachments.variable.custom.attachedFilesList[fileListCounter].fileType,
						p_file_name : manage_expdoc_detail_edit_attachments.variable.custom.attachedFilesList[fileListCounter].fileName,
						p_closure_report_ind : "false",
					});
					uploadStatus += mserviceUtilities.uploadFile(mserviceUtilities.getFileUploadPath({
							transactionType : "EXPENSE",
							async : false,
							referenceNumber : manage_expdoc_header.variable.custom.selectedRecord.expdoc_ref_no
						}), manage_expdoc_detail_edit_attachments.variable.custom.attachedFilesList[fileListCounter].file);
				};
				if (uploadStatus == manage_expdoc_detail_edit_attachments.variable.custom.attachedFilesList.length) {
					var attachmentSourceRefId, inputparamXML = $("#manage_expdoc_detail_edit_attachments_content_1").getInputparamXML({
								screenID : "manage_expdoc_detail_edit_attachments",
								matchCondition : ["manage_expdoc_detail_edit_attachments_udf","manage_expdoc_detail_edit_attachments_udf_product_udf"]
							});
					if (manage_expdoc_detail.variable.custom.crudIndicator == "A") {
						attachmentSourceRefId = (manage_expdoc_detail.variable.custom.datasource_1.data().length + manage_expdoc_detail.variable.custom.deletedRecords.length + 1).toString();
					} else {
						attachmentSourceRefId = manage_expdoc_detail.variable.custom.selectedRecord.expdoc_sl_no;
					}
					returnValue = executeService_save_project_filelist_attachments_master({
							p_project_id : manage_expdoc_header.variable.custom.selectedRecord.expdoc_ref_no,
							p_task_id : "0",
							p_attach_level_ind : "E",
							inputparam_filelist : attachedFilesList,
							p_inputparam_xml : inputparamXML.replace("</inputparam>","<attachment_source_ref_code>LINEITEM</attachment_source_ref_code><attachment_source_ref_id>" + attachmentSourceRefId +"</attachment_source_ref_id></inputparam>")
						});
					if (returnValue == "SP001") {
						alert("Files uploaded successfully");
						return true;
					} else if (returnValue == false) {
						for (fileListCounter = 0; fileListCounter < manage_expdoc_detail_edit_attachments.variable.custom.attachedFilesList.length; fileListCounter++) {
							mserviceUtilities.deleteFile(mserviceUtilities.getFileUploadPath({
									transactionType : "EXPENSE",
									async : false,
									referenceNumber : manage_expdoc_header.variable.custom.selectedRecord.expdoc_ref_no
								}) + "/" + manage_expdoc_detail_edit_attachments.variable.custom.attachedFilesList[fileListCounter].fileName);
						};
						alert("Uploading of files Failed");
						return false;
					}
				} else {
					alert("Uploading of files Failed");
					return false;
				}
			} else {
				alert("Please select atleast one file befor you submit.");
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			popupIndicator : true,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 1
				}
			],
		},
		custom : {
			attachedFilesList : []
		}
	}
};
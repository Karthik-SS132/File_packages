var manage_user_attachments_child = {
	constructScreen : function () {
		if (manage_user_attachments.variable.custom.crudIndicator == "V") {
			$("#manage_user_attachments_child_header_1").hide();
			$("#manage_user_attachments_child_submit_btn").hide();
			$("#manage_user_attachments_child").attr("style", "height: 90%; width: 100%;");
			if(manage_user_attachments.variable.custom.attachmentTobeViewed.endsWith(".heic")){
				$("#manage_user_attachments_child").find("hr").hide();
				$("#manage_user_attachments_child_footer").hide();
				fetch("../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_user_attachments.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime())
				.then((res) => res.blob())
				.then((blob) => heic2any({
						blob
					}))
				.then((conversionResult) => {
					var convertedImageUrl = URL.createObjectURL(conversionResult);
					$('#manage_user_attachments_child').prepend(`<center style="height: 100%;"><img src="${convertedImageUrl}" style="height: 100%;"></img></center>`);
					$("#manage_user_attachments_child").find("hr").show();
					$("#manage_user_attachments_child_footer").show();
				})
				.catch((e) => {
					if(e.message == "ERR_USER Image is already browser readable: image/jpeg"){
					fetch("../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_user_attachments.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime())
					.then((res) => res.blob())
					.then((blob) => {
						URL.revokeObjectURL(blob);
						blob = blob.slice(0, blob.size, "image/jpeg");
						var convertedImageUrl = URL.createObjectURL(blob);
						$('#manage_user_attachments_child').prepend(`<center style="height: 100%;"><img src="${convertedImageUrl}" style="height: 100%;"></img></center>`);
						$("#manage_user_attachments_child").find("hr").show();
						$("#manage_user_attachments_child_footer").show();
					})
				} else {
					alert(e.message);
				}
				});
			} else {
				$('#manage_user_attachments_child').prepend("<embed src='../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_user_attachments.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime() + "' style='height: 100%; width: 100%;'></embed>");
			}
		} else if (manage_user_attachments.variable.custom.crudIndicator == "A") {
			$("#manage_user_attachments_child_download_btn").hide();
		}
	},
	initializeWidgets : function () {
		$("#manage_user_attachments_child_attachment").initializeWAttachment({
			screenID : "manage_user_attachments_child"
		});
		$("#manage_user_attachments_child_closure_report_indicator").initializeWCheckbox({
			screenID : "manage_user_attachments_child"
		});
		$("#manage_user_attachments_child_udf_char_1").initializeWDisplayarea({
			screenID : "manage_user_attachments_child",
			defaultValue : "$manage_user_attachments.variable.custom.project_id"
		});
	},
	buttonEventHandler : {
		misc_btn_click : function (element, event) {
			if(manage_user_attachments.variable.custom.attachmentTobeViewed.endsWith(".heic")){
				fetch("../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_user_attachments.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime())
				.then((res) => res.blob())
				.then((blob) => heic2any({
						blob
					}))
				.then((conversionResult) => {
					var convertedImageUrl = URL.createObjectURL(conversionResult);
					$('#manage_user_attachments_child').append(`<a href="${convertedImageUrl}"></a>`);
					$('#manage_user_attachments_child a').attr("download", manage_user_attachments.variable.custom.selectedRecord.doc_name.replace(".heic",".jpg"));
					$('#manage_user_attachments_child a')[0].click();
					$('#manage_user_attachments_child a').remove();
				})
				.catch((e) => {
					if(e.message == "ERR_USER Image is already browser readable: image/jpeg"){
						fetch("../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_user_attachments.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime())
						.then((res) => res.blob())
						.then((blob) => {
							blob = blob.slice(0, blob.size, "image/jpeg");
							var convertedImageUrl = URL.createObjectURL(blob);
							$('#manage_user_attachments_child').append(`<a href="${convertedImageUrl}"></a>`);
							$('#manage_user_attachments_child a').attr("download", manage_user_attachments.variable.custom.selectedRecord.doc_name.replace(".heic",".jpg"));
							$('#manage_user_attachments_child a')[0].click();
							$('#manage_user_attachments_child a').remove();
						})
					} else {
						alert(e.message);
					}
				});
			} else {
				var anchor;
				anchor = $("<a>").attr("href", "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_user_attachments.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime()).attr("download", manage_user_attachments.variable.custom.selectedRecord.doc_name).appendTo("#manage_user_attachments_child");
				anchor[0].click();
				anchor.remove();
			}
		},
		submit_btn_click : function (element, event) {
			var returnValue,
			fileListCounter,
			attachedFilesList,
			uploadStatus;
			if (manage_user_attachments_child.variable.custom.attachedFilesList.length != 0) {
				attachedFilesList = [];
				uploadStatus = 0;
				for (fileListCounter = 0; fileListCounter < manage_user_attachments_child.variable.custom.attachedFilesList.length; fileListCounter++) {
					attachedFilesList.push({
						p_file_category : manage_user_attachments_child.variable.custom.attachedFilesList[fileListCounter].fileCategory,
						p_file_type : manage_user_attachments_child.variable.custom.attachedFilesList[fileListCounter].fileType,
						p_file_name : manage_user_attachments_child.variable.custom.attachedFilesList[fileListCounter].fileName,
						p_closure_report_ind : $("#manage_user_attachments_child_closure_report_indicator").is(":checked").toString(),
					});
					uploadStatus += mserviceUtilities.uploadFile(mserviceUtilities.getFileUploadPath({
							transactionType : manage_user_attachments.variable.standard.configurationParam,
							async : false,
							referenceNumber : manage_user_attachments.variable.custom.project_id.replace(/\//g, "-")
						}), manage_user_attachments_child.variable.custom.attachedFilesList[fileListCounter].file);
				};
				if (uploadStatus == manage_user_attachments_child.variable.custom.attachedFilesList.length) {
					returnValue = executeService_save_project_filelist_attachments_master({
							p_project_id : manage_user_attachments.variable.custom.project_id.substring(0,20),
							p_task_id : manage_user_attachments.variable.custom.task_id,
							p_attach_level_ind : manage_user_attachments.variable.custom.project_task_level_ind,
							inputparam_filelist : attachedFilesList,
							p_inputparam_xml : $("#manage_user_attachments_child_content_1").getInputparamXML({
								screenID : "manage_user_attachments_child",
								matchCondition : ["manage_user_attachments_child_udf","manage_user_attachments_product_udf"]
							})
						});
					if (returnValue == "SP001") {
						alert("Files uploaded successfully");
						return true;
					} else if (returnValue == false) {
						for (fileListCounter = 0; fileListCounter < manage_user_attachments_child.variable.custom.attachedFilesList.length; fileListCounter++) {
							mserviceUtilities.deleteFile(mserviceUtilities.getFileUploadPath({
									transactionType : manage_user_attachments.variable.standard.configurationParam,
									async : false,
									referenceNumber : manage_user_attachments.variable.custom.project_id
								}) + "/" + manage_user_attachments_child.variable.custom.attachedFilesList[fileListCounter].fileName);
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
			configurationParam : manage_user_attachments.variable.standard.configurationParam,
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
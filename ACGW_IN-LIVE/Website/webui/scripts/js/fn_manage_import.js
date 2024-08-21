var manage_import = {
	constructScreen : function () {
		return true;
	},
	initializeWidgets : function () {
		$("#manage_import_attachment").initializeWAttachment({
			screenID : "manage_import",
			multiple : false,
			validateFileSize : false
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var uploadPath = mserviceUtilities.getFileUploadPath({
					transactionType : "IMPORT",
					async : false,
					referenceNumber : login_profile.guid_val
				});
			var iObj = {
				p_import_client : "web",
				p_filename : manage_import.variable.custom.attachedFilesList[0].fileName,
				p_fileextn : manage_import.variable.custom.attachedFilesList[0].fileExtension,
				p_filepath : "content_store" + "/" + login_profile.client_id + "/" + login_profile.country_code + "/" + uploadPath,
				p_inputparam_xml : $("#manage_import_content_1").getInputparamXML({
					screenID : "manage_import",
					matchCondition : ["manage_import_custom_field"]
				}),
				p_information_type : manage_import.variable.custom.informationType
			};
			var uploadStatus = mserviceUtilities.uploadFile(uploadPath, manage_import.variable.custom.attachedFilesList[0].file);
			if (uploadStatus == 1) {
				var returnVal = executeService_upload_data(iObj);
				if (returnVal == "SP001") {
					alert("Import successfully done.");
					return true;
				} else if (returnVal == false) {
					mserviceUtilities.deleteFile(uploadPath + "/" + manage_import.variable.custom.attachedFilesList[0].file);
					alert("Import failed.");
					return false;
				}
			} else {
				alert("Uploading of files Failed");
				return false;
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

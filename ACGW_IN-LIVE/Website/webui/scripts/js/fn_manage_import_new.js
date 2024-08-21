var manage_import_new = {
	constructScreen : function () {
		return true;
	},
	postConstruct : function () {
		manage_import_new.variable.custom.import_code.setDataSource(JSON.parse("[" + manage_import_new.variable.custom.importCodeDatasource + "]"));
	},
	initializeWidgets : function () {
			manage_import_new.variable.custom.import_code = $("#manage_import_new_import_code").initializeWDropdownlist({
				screenID : "manage_import_new",
				dataSource : [],
				dataTextField : "description",
				dataValueField : "code",
				template : "description"
			});
		$("#manage_import_new_attachment").initializeWAttachment({
			screenID : "manage_import_new",
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
			if (manage_import_new.variable.custom.attachedFilesList[0] !== undefined) {
				var iObj = {
					p_import_client : "web",
					p_filename : manage_import_new.variable.custom.attachedFilesList[0].fileName,
					p_fileextn : manage_import_new.variable.custom.attachedFilesList[0].fileExtension,
					p_filepath : "content_store" + "/" + login_profile.client_id + "/" + login_profile.country_code + "/" + uploadPath,
					p_inputparam_xml : $("#manage_import_new_content_2").getInputparamXML({
						screenID : "manage_import_new",
						matchCondition : ["_filter"]
					}),
					p_information_type : $("#manage_import_new_import_code").getVal()
				};
				var uploadStatus = mserviceUtilities.uploadFile(uploadPath, manage_import_new.variable.custom.attachedFilesList[0].file);
				if (uploadStatus == 1) {
					var returnVal = executeService_upload_data(iObj);
					if (returnVal == "SP001") {
						alert("Import successfully done.");
						return true;
					} else if (returnVal == false) {
						mserviceUtilities.deleteFile(uploadPath + "/" + manage_import_new.variable.custom.attachedFilesList[0].file);
						alert("Import failed.");
						return false;
					}
				} else {
					alert("Uploading of files Failed");
					return false;
				}
			} else {
				alert("Choose a file to import");
			}
		}
	},
	widgetEventHandler : {
		import_code_change : function (element, event) {
		   $("#manage_import_new_screen_title,#manage_import_new_content_2").html("");
			if ($("#manage_import_new_import_code").getVal() == "") {
				manage_import_new.variable.standard.configurationParam = "manage_import_new_default";
				$("#manage_import_new_content_2").next().hide();
				$("#manage_import_new_import_code_lbl").text("");
				$("#manage_import_new_import_code_lbl").append("<span class = 'required'>*</span>");
			} else {
				manage_import_new.variable.standard.configurationParam = $("#manage_import_new_import_code").getVal();
				$("#manage_import_new_content_2").next().show();
			};
			$("#manage_import_new").createConfiguredFields(manage_import_new.variable.standard.configurationParam);
			$("#manage_import_new").applyConfiguredLabels(manage_import_new.variable.standard.configurationParam);
			$("#manage_import_new").reorderScreenFields(manage_import_new.variable.standard.reorderParam, manage_import_new.variable.standard.configurationParam);
		}
	},
	variable : {
		standard : {
			reorderParam : [{
					contentID : "content_1",
					columnLength : 1
				}, {
					contentID : "content_2",
					columnLength : 3
				}
			],
			configurationParam : "manage_import_new_default"
		},		
		custom : {
			attachedFilesList : []
		}
	}
};
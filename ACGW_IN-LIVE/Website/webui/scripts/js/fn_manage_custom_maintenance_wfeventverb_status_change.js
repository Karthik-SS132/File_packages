var manage_custom_maintenance_wfeventverb_status_change = {
	constructScreen : function () {
		return true;
	},
	postConstruct : function () {
		$('div.k-widget.k-window').css("left","450px");
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var inputParamXMLString,
			returnValue,
			recordTimeStamp,
			inputparamDetail,
			detailRecordCounter;
			inputparamDetail = [];
			inputParamXMLString1 = "",
			attachmentXML = "",
			inputParamXMLString2 = "",
			inputParamXMLString3 = "";
			recordTimeStamp = "00000000-0000-0000-0000-000000000000";
			if (manage_custom_maintenance.variable.custom.crudIndicator != "A") {
				recordTimeStamp = manage_custom_maintenance.variable.custom.selectedRecord.rec_tstamp;
			};
			returnValue = common_modules_custominfo_setDetail.invokeAPI({
				p_custom_info_code : webWidgetInitializer.variable.customMainParam.replace("manage_custom_maintenance_",""),
				p_custom_info_ref_no1: "workflow",
				p_custom_info_ref_no2: "",
				p_inputparam_header_xml : $("#manage_custom_maintenance_wfeventverb_status_change_content_1").getInputparamXML({
					screenID : "manage_custom_maintenance_wfeventverb_status_change"
				}),
				p_rec_timestamp : recordTimeStamp,
				p_save_mode : "W",
				inputparam_detail : inputparamDetail
			});
			if (returnValue.update_status == "SP001") {
				alert(manage_custom_maintenance.variable.custom.nextScreenName + " Successfully Done.");
				return true;
			} else {
				return false;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			popupIndicator : true,
			configurationParam : manage_custom_maintenance.variable.custom.selectedWorkflowEventVerb,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 2
				}
			],
		},
		custom : {
			attachedFilesList : []
		}
	}
};

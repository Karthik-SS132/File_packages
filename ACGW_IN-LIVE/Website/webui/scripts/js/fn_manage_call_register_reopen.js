function fn_manage_call_register_reopen() {
	value_changed_ind = false;
	/* DROP DOWN LIST INITIALIZATION - REOPEN REASON */
	manage_call_register_reopen_reason = InitializeKendoDropDownList({
		fieldID: "manage_call_register_reopen_reason",
		dataSource: {
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_codes",
			inputParameter: {
				p_lov_code_type: "CALLHLDREASON",
				p_search_field_1: "",
				p_search_field_2: ""
			}
		},
		dataTextField: "p_code_value_description",
		dataValueField: "p_code_value",
		filterMode: false
	});
	
	/* DATE TIME PICKER INITIALIZATION - REOPEN DATE AND TIME */
	$("#manage_call_register_reopen_date_and_time").kendoDateTimePicker(
	{
		format: "dd-MM-yyyy HH:mm",
		value: new Date()
	});
	manage_call_register_reopen_date_and_time = $("#manage_call_register_reopen_date_and_time").data("kendoDateTimePicker");
	manage_call_register_reopen_date_and_time.enable(false);
	
	$("#manage_call_register_reopen_submit_btn").click(function() {
		fn_manage_call_register_reopen_submit_btn_click();
	});	
	$("#manage_call_register_reopen_cancel_btn").click(function() {
		fn_manage_call_register_reopen_cancel_btn_click();
	});	
	$("#manage_call_register_reopen input,textarea").on("change", function() {
		value_changed_ind = true;
	});
	
	AttachValidationRules("manage_call_register_reopen");
	ApplyConfiguredLabels("manage_call_register_reopen");
}

function fn_manage_call_register_reopen_submit_btn_click() {
	var validator = $("#manage_call_register_reopen").data("kendoValidator");
	if (validator.validate()) {
		var reopenDateTime = $("#manage_call_register_reopen_date_and_time").val();
		var reopenDateTimeSplit = reopenDateTime.split(" ");
		var reopenDateSplit = reopenDateTimeSplit[0].split("-");
		var reopenTimeSplit = reopenDateTimeSplit[1].split(":");
		var reopenReasonCode = "";
		if ($("#manage_call_register_reopen_reason").val() != "---Select---") {
			reopenReasonCode = $("#manage_call_register_reopen_reason").val();
		}
		var update_call_status_change_object = {
			p_call_ref_no: call_register_reopen_call_no,
			p_comments: $("#manage_call_register_reopen_comments").val().replace(/\n/g, "\\n"),
			p_event_date: reopenDateSplit[2] + "-" + reopenDateSplit[1] + "-" + reopenDateSplit[0],
			p_event_hour: reopenTimeSplit[0],
			p_event_minute: reopenTimeSplit[1],
			p_reason_code: reopenReasonCode,
			p_from_wf_stage_no: "4",
			p_to_wf_stage_no: "3",
			p_from_wf_status: "WC",
			p_to_wf_status: "I",
			p_inputparam_xml1: "",
			p_inputparam_xml2: "",
			p_inputparam_xml3: "",
			p_rec_tstamp: "00000000-0000-0000-0000-000000000000"
		};
		
		var returnValue = executeService_update_call_status_change(update_call_status_change_object);
		if (returnValue == "SP001") {
			alert("Call Reopened Successfully");
			fn_manage_call_register_refresh();
			$("#openkendowindow").data("kendoWindow").close();
		}
		else {
			alert("Call Reopen Failed");
		}
	}
}

function fn_manage_call_register_reopen_cancel_btn_click() {
	if (value_changed_ind == true) {
		if (confirm("You have modified one or more values on the form. Do you want to cancel the changes.")) {
			$("#openkendowindow").data("kendoWindow").close();
		}				 
	} 
	else {
		$("#openkendowindow").data("kendoWindow").close();
	}
}
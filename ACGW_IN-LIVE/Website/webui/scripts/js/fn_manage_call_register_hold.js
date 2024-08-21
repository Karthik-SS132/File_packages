function fn_manage_call_register_hold() {
	value_changed_ind = false;
	/* DROP DOWN LIST INITIALIZATION - HOLD REASON */
	manage_call_register_hold_reason = InitializeKendoDropDownList({
		fieldID: "manage_call_register_hold_reason",
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
	
	/* DATE TIME PICKER INITIALIZATION - HOLD DATE AND TIME */
	$("#manage_call_register_hold_date_and_time").kendoDateTimePicker(
	{
		format: "dd-MM-yyyy HH:mm",
		value: new Date()
	});
	manage_call_register_hold_date_and_time = $("#manage_call_register_hold_date_and_time").data("kendoDateTimePicker");
	manage_call_register_hold_date_and_time.enable(false);
	
	$("#manage_call_register_hold_submit_btn").click(function() {
		fn_manage_call_register_hold_submit_btn_click();
	});	
	$("#manage_call_register_hold_cancel_btn").click(function() {
		fn_manage_call_register_hold_cancel_btn_click();
	});	
	$("#manage_call_register_hold input,textarea").on("change", function() {
		value_changed_ind = true;
	});
	
	AttachValidationRules("manage_call_register_hold");
	ApplyConfiguredLabels("manage_call_register_hold");
}

function fn_manage_call_register_hold_submit_btn_click() {
	var validator = $("#manage_call_register_hold").data("kendoValidator");
	if (validator.validate()) {
		var holdDateTime = $("#manage_call_register_hold_date_and_time").val();
		var holdDateTimeSplit = holdDateTime.split(" ");
		var holdDateSplit = holdDateTimeSplit[0].split("-");
		var holdTimeSplit = holdDateTimeSplit[1].split(":");
		var holdReasonCode = "";
		if ($("#manage_call_register_hold_reason").val() != "---Select---") {
			holdReasonCode = $("#manage_call_register_hold_reason").val();
		}
		var update_call_status_change_object = {
			p_call_ref_no: call_register_hold_call_no,
			p_comments: $("#manage_call_register_hold_comments").val().replace(/\n/g, "\\n"),
			p_event_date: holdDateSplit[2] + "-" + holdDateSplit[1] + "-" + holdDateSplit[0],
			p_event_hour: holdTimeSplit[0],
			p_event_minute: holdTimeSplit[1],
			p_reason_code: holdReasonCode,
			p_from_wf_stage_no: "3",
			p_to_wf_stage_no: "3",
			p_from_wf_status: "I",
			p_to_wf_status: "HO",
			p_inputparam_xml1: "",
			p_inputparam_xml2: "",
			p_inputparam_xml3: "",
			p_rec_tstamp: "00000000-0000-0000-0000-000000000000"
		};
		
		var returnValue = executeService_update_call_status_change(update_call_status_change_object);
		if (returnValue == "SP001") {
			alert("Call Put On Hold Successfully");
			fn_manage_call_register_refresh();
			$("#openkendowindow").data("kendoWindow").close();
		}
		else {
			alert("Call Hold Failed");
		}
	}
}

function fn_manage_call_register_hold_cancel_btn_click() {
	if (value_changed_ind == true) {
		if (confirm("You have modified one or more values on the form. Do you want to cancel the changes.")) {
			$("#openkendowindow").data("kendoWindow").close();
		}				 
	} 
	else {
		$("#openkendowindow").data("kendoWindow").close();
	}
}
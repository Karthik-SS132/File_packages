function fn_manage_call_status_change() {
	value_changed_ind = false;
		
	$("#manage_call_status_change_from_stage").text(selected_call_register_grid_record.workflow_stage_no_desc);
	$("#manage_call_status_change_from_status").text(selected_call_register_grid_record.call_status_desc);
	
	call_to_status_dataSource =  new kendo.data.DataSource();
	
	/* DROP DOWN LIST INITIALIZATION - TO STAGE */
	manage_call_status_change_to_stage = InitializeKendoDropDownList({
		fieldID: "manage_call_status_change_to_stage",
		dataSource: {
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values",
			inputParameter: {
				p_lov_code: "CALLTOSTAGE",
				p_search_field_1: selected_call_register_grid_record.call_category,
				p_search_field_2: selected_call_register_grid_record.workflow_stage_no,
				p_search_field_3: selected_call_register_grid_record.call_status,
				p_search_field_4: "",
				p_search_field_5: ""
			},
		},
		dataTextField: "p_description_field_1",
		dataValueField: "p_value_field_1",
		filterMode: false,
		events: {
			change: "fn_manage_call_status_change_to_stage_event_change"
		}
	});
	
	/* DROP DOWN LIST INITIALIZATION - TO STATUS */
	manage_call_status_change_to_status = InitializeKendoDropDownList({
		fieldID: "manage_call_status_change_to_status",
		dataSource: call_to_status_dataSource,
		dataTextField: "p_description_field_1",
		dataValueField: "p_value_field_1",
		filterMode: false
	});
	manage_call_status_change_to_status.enable(false);
	
	/* DATE TIME PICKER INITIALIZATION - EVENT DATE AND TIME */
	$("#manage_call_status_change_date_and_time").kendoDateTimePicker({
		format: "dd-MM-yyyy HH:mm",
		value: new Date()
	});
	manage_call_status_change_date_and_time = $("#manage_call_status_change_date_and_time").data("kendoDateTimePicker");
	manage_call_status_change_date_and_time.enable(false);
	
	$("#manage_call_status_change_submit_btn").click(function() {
		fn_manage_call_status_change_submit_btn_click();
	});	
	$("#manage_call_status_change_cancel_btn").click(function() {
		fn_manage_call_status_change_cancel_btn_click();
	});	
	$("#manage_call_status_change input,textarea").on("change", function() {
		value_changed_ind = true;
	});
	
	AttachValidationRules("manage_call_status_change");
	ApplyConfiguredLabels("manage_call_status_change");
}

function fn_manage_call_status_change_submit_btn_click() {
	var validator = $("#manage_call_status_change").data("kendoValidator");
	if (validator.validate()) {
		var statusChangeDateTime = $("#manage_call_status_change_date_and_time").val();
		var statusChangeDateTimeSplit = statusChangeDateTime.split(" ");
		var statusChangeDateSplit = statusChangeDateTimeSplit[0].split("-");
		var statusChangeTimeSplit = statusChangeDateTimeSplit[1].split(":");
		
		var update_call_status_change_object = {
			p_call_ref_no: selected_call_register_grid_record.call_no,
			p_comments: $("#manage_call_status_change_comments").val().replace(/\n/g, "\\n"),
			p_event_date: statusChangeDateSplit[2] + "-" + statusChangeDateSplit[1] + "-" + statusChangeDateSplit[0],
			p_event_hour: statusChangeTimeSplit[0],
			p_event_minute: statusChangeTimeSplit[1],
			p_reason_code: "",
			p_from_wf_stage_no: selected_call_register_grid_record.workflow_stage_no,
			p_to_wf_stage_no: selected_call_register_grid_record.workflow_stage_no,
			p_from_wf_status: selected_call_register_grid_record.call_status,
			p_to_wf_status: manage_call_status_change_to_status.value(),
			p_rec_tstamp: "00000000-0000-0000-0000-000000000000"
		};
		
		var returnValue = executeService_update_call_status_change(update_call_status_change_object);
		if (returnValue == "SP001") {
			alert("Call Status Changed Successfully");
			fn_manage_call_register_refresh();
			$("#openkendowindow").data("kendoWindow").close();
		}
		else {
			alert("Call Status Change Failed");
		}
	}
}

function fn_manage_call_status_change_cancel_btn_click() {
	if (value_changed_ind == true) {
		if (confirm("You have modified one or more values on the form. Do you want to cancel the changes.")) {
			$("#openkendowindow").data("kendoWindow").close();
		}				 
	}
	else {
		$("#openkendowindow").data("kendoWindow").close();
	}
}

function fn_manage_call_status_change_to_stage_event_change() {
	if (manage_call_status_change_to_stage.value() != "" && manage_call_status_change_to_stage.value() != "---Select---") {
		manage_call_status_change_to_status.enable(true);
		var retrieve_listof_values_object = {
			p_lov_code: "CALLTOSTATUS",
			p_search_field_1: selected_call_register_grid_record.call_category,
			p_search_field_2: selected_call_register_grid_record.workflow_stage_no,
			p_search_field_3: selected_call_register_grid_record.call_status,
			p_search_field_4: manage_call_status_change_to_stage.value(),
			p_search_field_5: ""
		};
		var call_to_status_array = executeService_retrieve_listof_values(retrieve_listof_values_object);		
		call_to_status_dataSource.data(call_to_status_array);
		manage_call_status_change_to_status.setDataSource(call_to_status_dataSource);
		manage_call_status_change_to_status.value("");
		$(".display_description[data-for='manage_call_status_change_to_status']").text("");
	}
	else {
		manage_call_status_change_to_status.value("");
		$(".display_description[data-for='manage_call_status_change_to_status']").text("");
		manage_call_status_change_to_status.enable(false);		
		var call_to_status_array = [];
		call_to_status_dataSource.data(call_to_status_array);
		manage_call_status_change_to_status.setDataSource(call_to_status_dataSource);
	}
}
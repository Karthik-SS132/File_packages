function fn_manage_call_status_event_log() {
	value_changed_ind = false;
	file_object = "";
	manage_call_status_event_log_reason_default_value = "";
	
	var retrieve_call_event_log_object = {
		p_call_ref_no: selected_call_register_grid_record.call_no
	};
	var manage_call_event_log_details = executeService_retrieve_call_event_log(retrieve_call_event_log_object);
	var manage_call_event_log_details_xml = loadXMLString(manage_call_event_log_details.replace(/\\n/g, "\n"));
	manage_call_status_event_log_datasource_1 = InitializeDataSource(manage_call_event_log_details_xml, 10, "list/event_log");
	
	var closedEventRecord = $.grep(manage_call_status_event_log_datasource_1.data(), function(element, index) {return element.to_status == "WC"});	
	
	if (closedEventRecord.length != 0) {
		if (closedEventRecord[0].cause_code != undefined) {
			manage_call_status_event_log_reason_default_value = closedEventRecord[0].cause_code;
		}
		if (closedEventRecord[0].comments != undefined) {
			$("#manage_call_status_event_log_comments").val(closedEventRecord[0].comments);
		}
		if (closedEventRecord[0].attachment_reference != undefined) {
			$("#manage_call_status_event_log_previous_attachment").text(closedEventRecord[0].attachment_reference);
		}
		else {
			$("#manage_call_status_event_log_previous_attachment_group").hide();
		}
	}
	else {
		$("#manage_call_status_event_log_previous_attachment_group").hide();
	}
	
	/* DROP DOWN LIST INITIALIZATION - REASON CODE */
	manage_call_status_event_log_reason = InitializeKendoDropDownList({
		fieldID: "manage_call_status_event_log_reason",
		dataSource: {
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_codes",
			inputParameter: {
				p_lov_code_type: "CALLCAUSE",
				p_search_field_1: "",
				p_search_field_2: ""
			}
		},
		dataTextField: "p_code_value_description",
		dataValueField: "p_code_value",
		defaultValue: manage_call_status_event_log_reason_default_value,
		filterMode: false
	});
	
	/* KENDO UPLOAD INITIALIZATION - ATTACHMENTS */
	$("#manage_call_status_event_log_attachments").kendoUpload({
		multiple: false,
		select: function(e) {
			$.each(e.files, function () {
				file_object = document.getElementById('manage_call_status_event_log_attachments').files[0];
			});
		}
	});
	manage_call_status_event_log_attachments = $("#manage_call_status_event_log_attachments").data("kendoUpload");
	
	var manage_call_status_event_log_attachments = $("#manage_call_status_event_log_attachments").data("kendoUpload");
	$("#manage_call_status_event_log_attachments").closest(".k-upload").find("span").text("Choose file");
	$('#manage_call_status_event_log_attachments').parent().css('width','100px');	
	
	$("#manage_call_status_event_log_submit_btn").click(function() {
		fn_manage_call_status_event_log_submit_btn_click();
	});	
	$("#manage_call_status_event_log_cancel_btn").click(function() {
		fn_manage_call_status_event_log_cancel_btn_click();
	});	
	
	$("#manage_call_status_event_log input,textarea").on("change", function() {
		value_changed_ind = true;
	});

	AddCustomFields("manage_call_status_event_log");
	AttachValidationRules("manage_call_status_event_log");
	ApplyConfiguredLabels("manage_call_status_event_log");
}

function fn_manage_call_status_event_log_submit_btn_click() {
	var validator = $("#manage_call_status_event_log").data("kendoValidator");
	if (validator.validate()) {
		var selectedFromStage = "3", selectedFromStatus = "I", selectedToStage = "4", selectedToStatus = "WC";
		if (manage_call_status_event_log_reason.value() == "---Select---") {
			manage_call_status_event_log_reason.value("");
		}
		
		if (login_profile.user_group_type == "CU") {
			selectedFromStage = "0";
			selectedFromStatus = "";
			selectedToStage = "1";
			selectedToStatus = "O";
		}
		
		var update_call_status_event_log_object = {
			p_call_ref_no: selected_call_register_grid_record.call_no,
			p_from_stage: selectedFromStage,
			p_from_status: selectedFromStatus,
			p_to_stage: selectedToStage,
			p_to_status: selectedToStatus,
			p_closure_comments: $("#manage_call_status_event_log_comments").val().replace(/\n/g, "\\n"),
			p_cause_code: manage_call_status_event_log_reason.value(),
			p_document_no: "",
			p_rec_tstamp: "00000000-0000-0000-0000-000000000000"
		};
		
		if (file_object != "") {
			var uploadStatus = KendoFileUpload("scall_attachments/" + selected_call_register_grid_record.call_no, file_object);
			if (uploadStatus == 1) {
				update_call_status_event_log_object.p_attachment_reference = file_object.name;
				var returnValue = executeService_update_call_status_event_log(update_call_status_event_log_object);
				if (returnValue == "SP001") {					
					alert("Updates added Successfully");
					if ($("#manage_call_status_event_log_previous_attachment").text() != "") {
						FileDelete("scall_attachments/" + selected_call_register_grid_record.call_no + "/" + $("#manage_call_status_event_log_previous_attachment").text());
					}
					fn_manage_call_register_refresh();					
					$("#openkendowindow").data("kendoWindow").close();
				}
				else if (returnValue == false) {
					alert("Updates adding Failed.");
					FileDelete("scall_attachments/" + selected_call_register_grid_record.call_no + "/" + file_object.name);
					$("#openkendowindow").data("kendoWindow").close();
				}
			}
			else {
				alert("File Upload Failed");
				$("#openkendowindow").data("kendoWindow").close();
			}
		}
		else {
			update_call_status_event_log_object.p_attachment_reference = "";
			var returnValue = executeService_update_call_status_event_log(update_call_status_event_log_object);
			if (returnValue == "SP001") {				
				alert("Updates added Successfully");
				fn_manage_call_register_refresh();
				$("#openkendowindow").data("kendoWindow").close();
			}
		}
	}
}

function fn_manage_call_status_event_log_cancel_btn_click() {
	if (value_changed_ind == true) {
		if (confirm("You have modified one or more values on the form. Do you want to cancel the changes.")) {
			$("#openkendowindow").data("kendoWindow").close();
		}				 
	}
	else {
		$("#openkendowindow").data("kendoWindow").close();
	}
}
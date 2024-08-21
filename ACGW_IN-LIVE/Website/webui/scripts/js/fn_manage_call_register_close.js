function fn_manage_call_register_close() {
	value_changed_ind = false;
	file_object = "";	
	var currentDate = new Date();
	var date = currentDate.getDate();
	var month = (currentDate.getMonth() + 1);
	var year = currentDate.getFullYear();
	if (date < 10) {
		date = "0" + date;
	}		
	if (month < 10) {
		month = "0" + month;
	}
	var hours = currentDate.getHours();
	var minutes = currentDate.getMinutes();
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
		
	$("#manage_call_register_close_close_date_and_time").text(date + "-" + month + "-" + year + " " + hours + ":" + minutes);	
	
	/* DROP DOWN LIST INITIALIZATION - CUSTOMER ID */
	manage_call_register_close_reason = InitializeKendoDropDownList({
		fieldID: "manage_call_register_close_reason",
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
		filterMode: false
	});
	
	/* KENDO UPLOAD INITIALIZATION - ATTACHMENTS */
	$("#manage_call_register_close_attachments").kendoUpload({
		multiple: false,
		select: function(e) {
			$.each(e.files, function () {
				file_object = document.getElementById('manage_call_register_close_attachments').files[0];
			});
		}
	});
	var manage_call_register_close_attachments = $("#manage_call_register_close_attachments").data("kendoUpload");
	$("#manage_call_register_close_attachments").closest(".k-upload").find("span").text("Choose file");
	$('#manage_call_register_close_attachments').parent().css('width','100px');
	
	$("#manage_call_register_close_submit_btn").click(function() {
		fn_manage_call_register_close_submit_btn_click();
	});	
	$("#manage_call_register_close_cancel_btn").click(function() {
		fn_manage_call_register_close_cancel_btn_click();
	});	
	$("#manage_call_register_close_closure_comments, #manage_call_register_close_reason, #manage_call_register_close_attachments").on("change", function() {
		value_changed_ind = true;
	});
	
	AddCustomFields("manage_call_register_close");	
	AttachValidationRules("manage_call_register_close");
	ApplyConfiguredLabels("manage_call_register_close");	
}

function fn_manage_call_register_close_submit_btn_click() {
	var validator = $("#manage_call_register_close").data("kendoValidator");
	if (validator.validate()) {
		var callCauseCode = "";
		if ($("#manage_call_register_close_reason").val() != "---Select---") {
			callCauseCode = $("#manage_call_register_close_reason").val();
		}
		
		var close_call_register_object = {
			p_call_ref_no: call_register_call_no,
			p_closure_comments: $("#manage_call_register_close_closure_comments").val().replace(/\n/g, "\\n"),
			p_closure_date: getCurrentDate().slice(0, 10),
			p_closure_hour: new Date().getHours(),
			p_closure_minute: new Date().getMinutes(),
			p_cause_code: callCauseCode,
			p_closure_document_no: "",
			p_rec_tstamp: "00000000-0000-0000-0000-000000000000",
			p_inputparam_udf_xml: SaveCustomFields("manage_call_register_close_header_1")
		};		
		
		if (file_object != "") {
			var uploadStatus = KendoFileUpload("scall_attachments/" + call_register_call_no, file_object);
			if (uploadStatus == 1) {
				close_call_register_object.p_closure_attachment_reference = file_object.name;
				var returnValue = executeService_close_call_register(close_call_register_object)
				if (returnValue == "SP001") {					
					alert("Call Closed Successfully");
					fn_manage_call_register_refresh();
					$("#openkendowindow").data("kendoWindow").close();
				}
				else if (returnValue == false) {
					alert("Call Close Failed.");
					FileDelete("scall_attachments/" + p_service_call_ref_no + "/" + file_object.name);
					$("#openkendowindow").data("kendoWindow").close();
				}
			}
			else {
				alert("File Upload Failed");
				$("#openkendowindow").data("kendoWindow").close();
			}
		}
		else {
			close_call_register_object.p_closure_attachment_reference = "";
			var returnValue = executeService_close_call_register(close_call_register_object);
			if (returnValue == "SP001") {				
				alert("Call Closed Successfully");
				fn_manage_call_register_refresh();
				$("#openkendowindow").data("kendoWindow").close();
			}
		}
	}
}

function fn_manage_call_register_close_cancel_btn_click() {
	if (value_changed_ind == true) {
		if (confirm("You have modified one or more values on the form. Do you want to cancel the changes.")) {
			$("#openkendowindow").data("kendoWindow").close();
		}				 
	}
	else {
		$("#openkendowindow").data("kendoWindow").close();
	}
}
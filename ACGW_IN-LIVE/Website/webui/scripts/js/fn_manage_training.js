function fn_manage_training_loadScripts() {
	return LoadJSScripts([ "./webui/scripts/js/fn_manage_training_child.js"]);
}

function fn_manage_training() {
	$("img.manage_training_store_user_training").attr("src", "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/Videos/StoreuserWf.png");
	
	$("img.manage_training_maintenance_engg_training").attr("src", "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/Videos/MaintenanceEnggWf.png");
	
	$("img.manage_training_timecard_training").attr("src", "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/Videos/TimecardWf.png");
	
	$("img.manage_training_parts_entry_quotation").attr({"src": "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/images/parts_enquiry.jpg"});
	
	$("img.manage_training_service_call_work_flow").attr({"src": "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/images/service_call.png"});
	
	$("img.manage_training_visit_work_flow").attr({"src": "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/images/visit_call.png"});
	
	$("img.manage_training_warranty_expense_claim_work_flow").attr({"src": "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/images/expense_claim.jpg"});
	
	$(".manage_training_store_user_training").click(function(e) {
		fn_manage_training_store_user_training_click();
	});
	
	$(".manage_training_maintenance_engg_training").click(function(e) {
		fn_manage_training_maintenance_engg_training_click();
	});
	
	$(".manage_training_timecard_training").click(function(e) {
		fn_manage_training_timecard_training_click();
	});
	
	$(".manage_training_parts_entry_quotation").click(function(e) {
		fn_manage_training_parts_entry_quotation_click();
	});
	
	$(".manage_training_service_call_work_flow").click(function(e) {
		fn_manage_training_service_call_work_flow_click();
	});
	
	$(".manage_training_visit_work_flow").click(function(e) {
		fn_manage_training_visit_work_flow_click();
	});
	
	$(".manage_training_warranty_expense_claim_work_flow").click(function(e) {
		fn_manage_training_warranty_expense_claim_work_flow_click();
	});
	
	/* CLIENT SPECIFIC CONDITIONS */
	if (login_profile.client_id == "mvgl" || login_profile.client_id == "vivid") {
		$(".manage_training_store_user_training").hide();
		$(".manage_training_maintenance_engg_training").hide();
	}
	else if (login_profile.client_id == "titan") {
		$(".manage_training_timecard_training").hide();
	}
}

/* BUTTON PRE CLICK EVENTS */
function fn_manage_training_store_user_training_click() {
	if (LoadJSScripts([ "./webui/scripts/js/fn_manage_training_child.js"])) {
		displayLabel = 'Store User';
		trainingVideoSource = "content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/Videos/StoreuserWf.mp4";
		trainingVideoType = "video/mp4";
		$.get('manage_training_child.html', function(data) {							
			$("#manage_training").hide();
			$("#container").append(data);
			fn_manage_training_child();
		});
	}
	else {
		alert("Sorry. This feature is unavailable. Please contact support desk.");
	}
}

function fn_manage_training_maintenance_engg_training_click() {
	if (LoadJSScripts([ "./webui/scripts/js/fn_manage_training_child.js"])) {
		displayLabel = 'Maintenance Engineer';
		trainingVideoSource = "content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/Videos/MaintenanceEnggWf.mp4";
		trainingVideoType = "video/mp4";
		$.get('manage_training_child.html', function(data) {							
			$("#manage_training").hide();
			$("#container").append(data);
			fn_manage_training_child();
		});
	}
	else {
		alert("Sorry. This feature is unavailable. Please contact support desk.");
	}
}

function fn_manage_training_timecard_training_click() {
	if (LoadJSScripts([ "./webui/scripts/js/fn_manage_training_child.js"])) {
		displayLabel = 'Timecard';
		trainingVideoSource = "content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/Videos/TimecardWf.mp4";
		trainingVideoType = "video/mp4";
		$.get('manage_training_child.html', function(data) {							
			$("#manage_training").hide();
			$("#container").append(data);
			fn_manage_training_child();
		});
	}
	else {
		alert("Sorry. This feature is unavailable. Please contact support desk.");
	}
}

function fn_manage_training_parts_entry_quotation_click() {
	var type = "displayPDF";
	var path = "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/pdf/MService Parts Enquiry Quotation Handbook.pdf";
	if (LoadJSScripts([ "./webui/scripts/js/fn_manage_training_child.js"])) {
		displayLabel = 'Parts Enquiry Quotation';
		$.get('manage_training_child.html', function(data) {							
			$("#manage_training").hide();
			$("#container").append(data);
			fn_manage_training_child(type, path);
		});
	}
	else {
		alert("Sorry. This feature is unavailable. Please contact support desk.");
	}
}

function fn_manage_training_service_call_work_flow_click() {
	var type = "displayPDF";
	var path = "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/pdf/ACGW-Work flows-Handbook.pdf";
	if (LoadJSScripts([ "./webui/scripts/js/fn_manage_training_child.js"])) {
		displayLabel = 'Service workflow Handbook';
		$.get('manage_training_child.html', function(data) {							
			$("#manage_training").hide();
			$("#container").append(data);
			fn_manage_training_child(type, path);
		});
	}
	else {
		alert("Sorry. This feature is unavailable. Please contact support desk.");
	}
}

function fn_manage_training_visit_work_flow_click() {
	var type = "displayPDF";
	var path = "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/pdf/MService Visit Work flow Handbook.pdf";
	if (LoadJSScripts([ "./webui/scripts/js/fn_manage_training_child.js"])) {
		displayLabel = 'Parts Enquiry Quotation';
		$.get('manage_training_child.html', function(data) {							
			$("#manage_training").hide();
			$("#container").append(data);
			fn_manage_training_child(type, path);
		});
	}
	else {
		alert("Sorry. This feature is unavailable. Please contact support desk.");
	}
}

function fn_manage_training_warranty_expense_claim_work_flow_click() {
	var type = "displayPDF";
	var path = "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/training/pdf/MService Expense Claim Work Flow Handbook.pdf";
	if (LoadJSScripts([ "./webui/scripts/js/fn_manage_training_child.js"])) {
		displayLabel = 'Parts Enquiry Quotation';
		$.get('manage_training_child.html', function(data) {							
			$("#manage_training").hide();
			$("#container").append(data);
			fn_manage_training_child(type, path);
		});
	}
	else {
		alert("Sorry. This feature is unavailable. Please contact support desk.");
	}
}
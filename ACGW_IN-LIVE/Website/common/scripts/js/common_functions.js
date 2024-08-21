// Function to get details on the device, browser details of the user
function getUserAccessInfo() {
	var userAgent = navigator.userAgent;
	var isiPad = userAgent.match(/(iPad)/i);
	var isiPhone = userAgent.match(/(iPhone)/i);
	var isAndroid = userAgent.match(/(Android)/i);
	var isiPod = userAgent.match(/(iPod)/i);
	var iswebOS = userAgent.match(/(webOS)/i);
	var iswinOS = userAgent.match(/(Windows Phone OS)/i);

	login_profile.useragent = navigator.userAgent;

	if (isiPad)
		login_profile.device = 'iPad';
	else if (isiPhone)
		login_profile.device = 'iPhone';
	else if (isAndroid) {
		login_profile.device = 'Android';
		if (userAgent.match(/(Android 1.)/i))
			login_profile.opsys_version = '1.x';
		if (userAgent.match(/(Android 2.)/i))
			login_profile.opsys_version = '2.x';
		if (userAgent.match(/(Android 3.)/i))
			login_profile.opsys_version = '3.x';
		if (userAgent.match(/(Android 4.)/i))
			login_profile.opsys_version = '4.x';
		if (userAgent.match(/(Android 4.4.)/i))
			login_profile.opsys_version = '4.4.x';
	} else if (isiPod)
		login_profile.device = 'iPod';
	else if (iswebOS)
		login_profile.device = 'webOS';
	else if (iswinOS)
		login_profile.device = 'iswinOS';
	else
		login_profile.device = 'Desktop';

	//note: userAgent in IE7 WinXP returns: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727)

	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
		//test for MSIE x.x;
		var ieversion = new Number(RegExp.$1); // capture x.x portion and store as a number
		if (ieversion >= 9)
			login_profile.browser = "IE9 or above";
		else if (ieversion >= 8)
			login_profile.browser = "IE8 or above";
		else if (ieversion >= 7)
			login_profile.browser = "IE7.x";
		else if (ieversion >= 6)
			login_profile.browser = "IE6.x";
		else if (ieversion >= 5)
			login_profile.browser = "IE5.x";
	} else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
		//Note: userAgent in FF2.0.0.13 WinXP returns: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13

		//test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
		var ffversion = new Number(RegExp.$1); // capture x.x portion and store as a number
		if (ffversion >= 5)
			login_profile.browser = "FF 5.x or above";
		else if (ffversion >= 4)
			login_profile.browser = "FF 4.x or above";
		else if (ffversion >= 3)
			login_profile.browser = "FF 3.x or above";
		else if (ffversion >= 2)
			login_profile.browser = "FF 2.x";
		else if (ffversion >= 1)
			login_profile.browser = "FF 1.x";
	} else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
		//Note: userAgent in Opera9.24 WinXP returns: Opera/9.24 (Windows NT 5.1; U; en)
		//         userAgent in Opera 8.5 (identified as IE) returns: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1) Opera 8.50 [en]
		//         userAgent in Opera 8.5 (identified as Opera) returns: Opera/8.50 (Windows NT 5.1; U) [en]
		//test for Opera/x.x or Opera x.x (ignoring remaining decimal places);
		var oprversion = new Number(RegExp.$1); // capture x.x portion and store as a number
		if (oprversion >= 10)
			login_profile.browser = "Opera 10.x or above";
		else if (oprversion >= 9)
			login_profile.browser = "Opera 9.x";
		else if (oprversion >= 8)
			login_profile.browser = "Opera 8.x";
		else if (oprversion >= 7)
			login_profile.browser = "Opera 7.x";
	}
}

function getQuerystring(key, default_) {
	if (default_ == null)
		default_ = "";
	key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if (qs == null)
		return default_;
	else
		return qs[1];
}

function getCurrentDate() {
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var second = today.getSeconds();
	if (date < 10) {
		date = "0" + date;
	}
	if (month < 10) {
		month = "0" + month;
	}
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minute < 10) {
		minute = "0" + minute;
	}
	if (second < 10) {
		second = "0" + second
	}
	return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

function userSessionLogout() {
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();
	var hour = today.getHours();
	var minute = today.getMinutes();
	if (date < 10) {
		date = "0" + date;
	}
	if (month < 10) {
		month = "0" + month;
	}
	if (hour < 10) {
		hour = "0" + hour;
	}
	if (minute < 10) {
		minute = "0" + minute;
	}

	logout_date = year + "-" + month + "-" + date;
	logout_hour = hour;
	logout_minute = minute;

	$.cachedScript("../../s_iscripts/signout_user.js")
	.done(function (script, textStatus) {
		var logoutSuccess = executeService_signout_user();
		if (logoutSuccess == 0) {
			window.location.href = "../../index.html" + "?" + "client_id=" + login_profile.client_id;
			initSessionContext();
			alert('You have been successfully logged out');
		}
	});
}
function initSessionContext() {
	login_profile = new Object();
	login_profile.login_date = "";
	login_profile.login_hour = "";
	login_profile.login_minute = "";
	login_profile.login_second = "";
	login_profile.user_id = "";
	login_profile.title = "";
	login_profile.first_name = "";
	login_profile.middle_name = "";
	login_profile.last_name = "";
	login_profile.guid_val = "";
	login_profile.protocol = "";
	login_profile.client_id = "";
	/* castrol, msvtest, schwingstetter, jcbmadurai */
	login_profile.app_mode = "";
	/* MOBILE_NATIVE , MOBILE_BROWSER, WEB_BROWSER */
	login_profile.application_root = "";
	login_profile.domain_name = "";
	/* eg. selfservit.net , mservice.in */
	login_profile.portno = "";
	/* Default port 80 */
	login_profile.network_mode = "";
	/*online or offline */
	login_profile.project_id = "";
	login_profile.locale_id = "";
	login_profile.country_code = "";
	login_profile.project_type = "";
	login_profile.software_product = "";
	login_profile.software_product_version = "";
	login_profile.software_product_subversion = "";
	login_profile.timezone_id = "";
	login_profile.location_code = "";
	login_profile.currency_code = "";
	login_profile.last_login_date = "";
	login_profile.last_login_hour = "";
	login_profile.last_login_minute = "";
	login_profile.user_group_id = "";
	login_profile.user_group_type = "";
	login_profile.photo_reference = "";
	login_profile.useragent = "";
	login_profile.device = "";
	login_profile.opsys = "";
	login_profile.opsys_version = "";
	login_profile.browser = "";
	login_profile.def_pwd_ind = "";
	login_profile.guid_val = '';
	login_profile.print_grid_header = "";
	login_profile.print_datasource_list = "";
	login_profile.section_data = "";
	login_profile.file_upload_or_delete_status = 0;
	login_profile.upload_file_name = "";
	login_profile.package_id = "";
	login_profile.ws_portno = "";
	login_profile.dealer_code = "";
	login_profile.dealer_org_level_no = "";
	login_profile.dealer_org_level_code = "";
	login_profile.employee_org_level_no = "";
	login_profile.employee_org_level_code = "";

	access_profile = new Object();
	access_profile.user_functional_access = [/*{
		parent_feature_group : "",
		child_feature_id_or_group : "",
		child_feature_id_or_group_ind : "",
		parent_group_display_label : "",
		parent_level_no : "",
		parent_display_order :"",
		child_feature_display_label : "",
		child_level_no : "",
		child_display_order : "",
		child_screen_id : "",
		channel_id : "",
		feature_access : "",
		add_access :"",
		edit_access : "",
		delete_access : "",
		view_access : "",
		export_access : "",
		print_access : "",
		import_access : "",
		menu_display_ind: ""
		}*/
	];

	access_profile.user_data_access = [{
			access_to_info_type : "",
			access_for_event : "",
			level1_code : "",
			level2_code : "",
			level3_code : "",
			level4_code : "",
			level5_code : "",
			location_code : "",
			request_category : "",
			request_type : ""
		}
	];

	access_profile.data_access_panel = [{
			access_to_info_type : "",
			org_level_no : "",
			org_level_code : "",
			location_code : "",
			request_category : "",
			request_type : ""
		}
	];

	job_profile = new Object();
	job_profile.job_id = "";
	job_profile.narration = "";
	job_profile.customer_name = "";
	job_profile.customer_location = "";
	job_profile.asset_no = "";
	job_profile.eqpt_desc = "";
	job_profile.template_id = "";

	jobtask_profile = new Object();
	jobtask_profile.task_id = "";

	project_profile = new Object();
	project_profile.project_id = "";
	project_profile.template_id = "";

	task_profile = new Object();
	task_profile.task_id = "";

	navigation_map = new Object();
	navigation_map = [];
	navigation_map.push({
		screenID : 'home',
		parentScreenID : 'home',
		DisplayLabel : "Home"
	});

	// This only accessible in web browser -Edited by gopi 22-05-13
	var web_browser = navigator.userAgent.match(/(webOS)/i);

	if (web_browser) {
		Object.preventExtensions(login_profile);
		Object.preventExtensions(job_profile);
		Object.preventExtensions(task_profile);
		Object.preventExtensions(jobtask_profile);
		Object.preventExtensions(navigation_map);
		Object.preventExtensions(access_profile);
		Object.preventExtensions(project_profile);
		Object.preventExtensions(data_access_profile);
	}
}

function enable_or_disable_Gridbutton() {
	for (i = 0; i < access_profile.user_functional_access.length; i++) {
		if (access_profile.user_functional_access[i].child_screen_id == screenName) {
			if (access_profile.user_functional_access[i].add_access == "false") {
				eval('$(' + '"' + '#' + screenName + '_add_btn' + '"' + ')' + '.attr' + '(' + '"disabled"' + ',' + 'true' + ')');
				//alert(screenName)
				$(".k-grid-add").hide();
			} else if (access_profile.user_functional_access[i].add_access == "true") {

				eval('$(' + '"' + '#' + screenName + '_add_btn' + '"' + ')' + '.attr' + '(' + '"disabled"' + ',' + 'false' + ')');

			}
			if (access_profile.user_functional_access[i].edit_access == "false") {

				eval('$(' + '"' + '#' + screenName + '_edit_btn' + '"' + ')' + '.attr' + '(' + '"disabled"' + ',' + 'true' + ')');
				/*length=eval(screenName+"_grid"+".dataSource.data().length");
				$(".k-grid-edit").hide();

				eval( "$('."+screenName+"_update_button').hide()");
				//$('.details-button.k-grid-Update').hide();
				if((length != 0 && editable == true) ){
				eval(screenName+"_grid"+".closeCell()");
				}*/
			} else if (access_profile.user_functional_access[i].edit_access == "true") {
				eval('$(' + '"' + '#' + screenName + '_edit_btn' + '"' + ')' + '.attr' + '(' + '"disabled"' + ',' + 'false' + ')');
			}

			if (access_profile.user_functional_access[i].view_access == "false") {
				eval('$(' + '"' + '#' + screenName + '_view_btn' + '"' + ')' + '.attr' + '(' + '"disabled"' + ',' + 'true' + ')');
			} else if (access_profile.user_functional_access[i].view_access == "true") {

				eval('$(' + '"' + '#' + screenName + '_view_btn' + '"' + ')' + '.attr' + '(' + '"disabled"' + ',' + 'false' + ')');

			}
			if (access_profile.user_functional_access[i].delete_access == "false") {
				eval('$(' + '"' + '#' + screenName + '_delete_btn' + '"' + ')' + '.attr' + '(' + '"disabled"' + ',' + 'true' + ')');
				$(".k-grid-delete").hide();
				eval("$('." + screenName + "_delete_button').hide()");
				//$(".delete-button.k-grid-Delete").hide();

			} else if (access_profile.user_functional_access[i].delete_access == "true") {
				eval('$(' + '"' + '#' + screenName + '_delete_btn' + '"' + ')' + '.attr' + '(' + '"disabled"' + ',' + 'false' + ')');

			}
		}
	}
}

function enable_or_disable_Approvebutton(info, ev, lvlno, lvlcode, rc, rt) {

	var otherLevelEvalExpression = '';

	for (var lvlno_ctr = parseInt(lvlno) + 1; lvlno_ctr < parseInt(login_profile.no_of_org_level); lvlno_ctr++) {

		if (otherLevelEvalExpression != '')
			otherLevelEvalExpression += '&&';

		otherLevelEvalExpression = ' access_profile.user_data_access[i].level' + lvlno_ctr + '_code == \'ALL\' ';
	}

	for (var i = 0; i < access_profile.user_data_access.length; i++) {
		if (access_profile.user_data_access[i].access_for_event == ev && access_profile.user_data_access[i].access_to_info_type == info) {
			if (otherLevelEvalExpression == '') {
				if (eval('access_profile.user_data_access[i].level' + lvlno + '_code') == lvlcode
					 && access_profile.user_data_access[i].location_code == login_profile.location_code
					 && access_profile.user_data_access[i].request_category == rc
					 && (access_profile.user_data_access[i].request_type == rt)) //equating exact values
				{
					return true;
				} else if (eval('access_profile.user_data_access[i].level' + lvlno + '_code') == lvlcode
					 && access_profile.user_data_access[i].location_code == login_profile.location_code
					 && access_profile.user_data_access[i].request_category == rc
					 && (access_profile.user_data_access[i].request_type == rt || access_profile.user_data_access[i].request_type == 'ALL')) {
					return true;
				} else if (eval('access_profile.user_data_access[i].level' + lvlno + '_code') == lvlcode
					 && access_profile.user_data_access[i].location_code == login_profile.location_code
					 && (access_profile.user_data_access[i].request_category == rc || access_profile.user_data_access[i].request_category == 'ALL')
					 && (access_profile.user_data_access[i].request_type == rt || access_profile.user_data_access[i].request_type == 'ALL')) {
					return true;
				} else if (eval('access_profile.user_data_access[i].level' + lvlno + '_code') == lvlcode
					 && (access_profile.user_data_access[i].location_code == login_profile.location_code || access_profile.user_data_access[i].location_code == 'ALL')
					 && (access_profile.user_data_access[i].request_category == rc || access_profile.user_data_access[i].request_category == 'ALL')
					 && (access_profile.user_data_access[i].request_type == rt || access_profile.user_data_access[i].request_type == 'ALL')) {
					return true;
				} else if ((eval('access_profile.user_data_access[i].level' + lvlno + '_code') == lvlcode || eval('access_profile.user_data_access[i].level' + lvlno + '_code') == 'ALL')
					 && (access_profile.user_data_access[i].location_code == login_profile.location_code || access_profile.user_data_access[i].location_code == 'ALL')
					 && (access_profile.user_data_access[i].request_category == rc || access_profile.user_data_access[i].request_category == 'ALL')
					 && (access_profile.user_data_access[i].request_type == rt || access_profile.user_data_access[i].request_type == 'ALL')) {
					return true;
				}
			} else {
				if (eval('access_profile.user_data_access[i].level' + lvlno + '_code') == lvlcode
					 && eval(otherLevelEvalExpression)
					 && access_profile.user_data_access[i].location_code == login_profile.location_code
					 && access_profile.user_data_access[i].request_category == rc
					 && (access_profile.user_data_access[i].request_type == rt)) //equating exact values
				{
					return true;
				} else if (eval('access_profile.user_data_access[i].level' + lvlno + '_code') == lvlcode
					 && eval(otherLevelEvalExpression)
					 && access_profile.user_data_access[i].location_code == login_profile.location_code
					 && access_profile.user_data_access[i].request_category == rc
					 && (access_profile.user_data_access[i].request_type == rt || access_profile.user_data_access[i].request_type == 'ALL')) {
					return true;
				} else if (eval('access_profile.user_data_access[i].level' + lvlno + '_code') == lvlcode
					 && eval(otherLevelEvalExpression)
					 && access_profile.user_data_access[i].location_code == login_profile.location_code
					 && (access_profile.user_data_access[i].request_category == rc || access_profile.user_data_access[i].request_category == 'ALL')
					 && (access_profile.user_data_access[i].request_type == rt || access_profile.user_data_access[i].request_type == 'ALL')) {
					return true;
				} else if (eval('access_profile.user_data_access[i].level' + lvlno + '_code') == lvlcode
					 && eval(otherLevelEvalExpression)
					 && (access_profile.user_data_access[i].location_code == login_profile.location_code || access_profile.user_data_access[i].location_code == 'ALL')
					 && (access_profile.user_data_access[i].request_category == rc || access_profile.user_data_access[i].request_category == 'ALL')
					 && (access_profile.user_data_access[i].request_type == rt || access_profile.user_data_access[i].request_type == 'ALL')) {
					return true;
				} else if ((eval('access_profile.user_data_access[i].level' + lvlno + '_code') == lvlcode || eval('access_profile.user_data_access[i].level' + lvlno + '_code') == 'ALL')
					 && eval(otherLevelEvalExpression)
					 && (access_profile.user_data_access[i].location_code == login_profile.location_code || access_profile.user_data_access[i].location_code == 'ALL')
					 && (access_profile.user_data_access[i].request_category == rc || access_profile.user_data_access[i].request_category == 'ALL')
					 && (access_profile.user_data_access[i].request_type == rt || access_profile.user_data_access[i].request_type == 'ALL')) {
					return true;
				}

			}
		}
	}
}

function buildBreadCrumb() {
	//var buildBreadCrumb = '<label id="home_bc">Home</label>';
	var buildBreadCrumb = '';

	for (var i = 0; i < navigation_map.length; i++) {
		if (i > 0) {
			buildBreadCrumb += '&nbsp;&gt;&nbsp;';
		}
		buildBreadCrumb += '<label id="' + navigation_map[i].screenID + '_bc">' + navigation_map[i].DisplayLabel + '</label>';
	}
	$('#breadcrumb .left').html(buildBreadCrumb);
}
function resetNavigationMap() {
	navigation_map = [];
	navigation_map.push({
		screenID : 'home_container',
		parentScreenID : 'home',
		DisplayLabel : 'Home'
	});
	buildBreadCrumb();
}
function AddToNavigationMap(divID, screenID, displayLabel, parentElement) {
	navigation_map.push
	({
		screenID : screenID,
		parentScreenID : parentElement,
		DisplayLabel : displayLabel
	});
	buildBreadCrumb();
}
function RemoveFromNavigationMap() {
	var last_navigation_map_index = navigation_map.length - 1;
	navigation_map.splice(last_navigation_map_index);
	buildBreadCrumb();
	var last_navigation_map_index = navigation_map.length - 1;
	screenID = navigation_map[last_navigation_map_index].screenID;
	parentScreenID = navigation_map[last_navigation_map_index].parentScreenID;
	displayLabel = navigation_map[last_navigation_map_index].DisplayLabel;
	divID = navigation_map[last_navigation_map_index].screenID;
}
function assignScreenName(divID, screenID, displayLabel, parentElement) {
	parentScreenID = screenID;
}

function removeScreen(divID, screenId, displayLabel, parentElement) {
	if (screenID == "track_employee_geolocation" || screenID == "manage_inventory_losses_edit" || screenID == "manage_stock_inquiry_linked_dispatches" || screenID == "manage_dispatch_note_linked_grns" || screenID == "manage_goods_receipt_note_edit" || screenID == "manage_users" || screenID == "manage_dispatch_note_edit" || screenID == "manage_call_register_edit" || screenID == "manage_asset_master_edit" || screenID == "manage_equipment_master_edit" || screenID == "manage_preventive_maintenance_rules" || screenID == "manage_equipment_parameter" || screenID == "manage_link_maintenance_profile" || screenID == "manage_equipment_service_contract_template" || screenID == "manage_asset_maintenance_history" || screenID == "manage_customer_master_edit" || screenID == "manage_customer_location" || screenID == "manage_customer_location_edit" || screenID == "manage_company_location_edit" || screenID == "manage_invoice_edit" || screenID == "manage_invoice_despatch" || screenID == "manage_invoice_despatch_edit" || screenID == "manage_invoice_outstanding" || screenID == "manage_invoice_annexure" || screenID == "manage_invoice_addn_info" || screenID == "view_calendar" || screenID == "manage_asset_service_visit_schedule" || screenID == "manage_asset_service_visit_schedule_edit" || screenID == "manage_asset_service_contract" || screenID == "manage_asset_service_contract_edit" || screenID == "manage_collection_entry_manage_collection_invoice" || screenID == "manage_call_resource_update" || screenID == "manage_call_sparepart_update" || screenID == "manage_equipment_service_contract_template_edit" || screenID == "manage_supplier_location" || screenID == "manage_supplier_location_edit" || screenID == "manage_inventory_receipt_adjustment" || screenID == "manage_inventory_issue_adjustment" || screenID == "manage_inventory_warehouse_adjustment" || screenID == "manage_inventory_opening_balance_adjustment" || screenID == "manage_invoice_adjustment_annexure" || screenID == "manage_employee_master_edit" || screenID == "manage_item_master_edit" || screenID == 'manage_item_master_rate' || screenID == "manage_resourcelist_master_edit" || screenID == "manage_partlist_template_master_edit" || screenID == "manage_feature_access_profile") {
		var navigationMapLastChild = $.grep(navigation_map, function (element, index) {
				return index == navigation_map.length - 1;
			});
		$("#" + navigationMapLastChild[0].screenID).remove();
		$("#" + navigationMapLastChild[0].parentScreenID).show();
		RemoveFromNavigationMap();
	} else {
		$("#" + screenID).remove();
		screenID = parentScreenID;
		$('#container').load(parentScreenID + '.html', function () {
			eval("fn_" + screenID + "()");
		});
		RemoveFromNavigationMap();
	}
}

function isValidSession() {
	var myRegExp = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}?/;

	if (login_profile.guid_val == '7e9c274d-1c4b-4234-9eec-4f90971f998b')
		return 1 
		else {
			if (myRegExp.test(login_profile.guid_val) == false)
				return 1;
			else
				return 0;
		}

}
function sessionTimeOut() {
	t_out_edit = $("#t_out");
	if (!t_out_edit.data("kendoWindow"))
		t_out_edit.kendoWindow({
			width : "450px",
			draggable : false,
			height : "100px",
			title : false,
			modal : true,
			resizable : false
		});
	t_out_edit.data("kendoWindow").content("Your session has been timedout due to inactivity. Do you want to extend your session?<br/><center><button id='t_out_ok'>Ok</button><button id='t_out_cancel'>Cancel</button></center>");
	t_out_edit.data("kendoWindow").open();
	t_out_edit.data("kendoWindow").center();

	$('#t_out_ok').on('click', function () {
		resetTimer();
		clearTimeout(sesTime);
		t_out_edit.data("kendoWindow").close();
	});

	$('#t_out_cancel').on('click', function () {
		userSessionLogout();
	});

	sesTime = setTimeout(function () {
			clearTimeout(sesTime);
			userSessionLogout();
		}, 900000); //logs out after 15 minutes of inactivity
}
var sessionTimer;

function resetTimer() {

	clearTimeout(sessionTimer);
	if (login_profile.client_id == "gimpex") {
		sessionTimer = setTimeout(sessionTimeOut, 1800000) //logs out when 30 minutes of inactivity
	} else {
		sessionTimer = setTimeout(sessionTimeOut, 3600000) //logs out when 60 minutes of inactivity
	}
}

function setCookie(exdays) {
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "; expires=" + expdate.toGMTString();

	var c_value = escape(client_id + '_' + country_code_val + '_' + document.getElementById('username').value);
	document.cookie = "selfservit_credo=" + c_value + expires;
}

function getCookie() {
	var i,
	x,
	y,
	ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == "selfservit_credo") {
			cookie_values = y.split("_");
			cookie_companyid = cookie_values[0];
			cookie_countrycode = cookie_values[1];
			cookie_userid = cookie_values[2];
			$('#rememberme').prop('checked', true);
		}
	}
}

function checkCookie() {
	getCookie();
	if (cookie_companyid != "") {
		clientid = cookie_companyid;
		country_code_val = cookie_countrycode;
		document.getElementById('username').value = cookie_userid;
	}
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var position = cookie.indexOf("=");
        var name = position > -1 ? cookie.substr(0, position) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function loadXMLDoc(filename) {
	if (window.ActiveXObject) {
		xhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} else {
		xhttp = new XMLHttpRequest();
	}
	xhttp.open("GET", filename, false);
	try {
		xhttp.responseType = "msxml-document"
	} catch (err) {}
	// Helping IE11
	xhttp.send("");
	return xhttp.responseXML;
}

function loadXMLString(xmlstring) {
	// var es_xmlstring =xmlstring.replace("&", "&amp;");
	var es_xmlstring = xmlstring.replace(/&/g, "&amp;");
	if (window.DOMParser) {
		var xmlDoc;
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(es_xmlstring, 'text/xml');
	} else // IE
	{
		var xmlDoc;
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.loadXML(es_xmlstring);
	}
	return xmlDoc;
}

function loadHtml(filename) {
	if (window.ActiveXObject) {
		xhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} else {
		xhttp = new XMLHttpRequest();
	}
	xhttp.open("GET", filename, false);
	try {
		xhttp.responseType = "msxml-document"
	} catch (err) {}
	// Helping IE11
	xhttp.send("");
	return xhttp.responseText;
}

function loadXSLDoc(dname, company_id, country_code) {
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET", dname + '_' + company_id + '_' + country_code + '.xsl', false);
	xhttp.send();
	if (xhttp.status == 0 || xhttp.status == 404) {
		xhttp.open("GET", dname + '_' + company_id + '.xsl', false);
		xhttp.send();
		if (xhttp.status == 0 || xhttp.status == 404) {
			xhttp.open("GET", dname + '.xsl', false);
			xhttp.send();
		}
	}
	return xhttp.responseXML;
}
function loadJSScripts(jsScripts) {
	jsLoadSuccess = 0;

	for (jsScriptNo = 0; jsScriptNo < jsScripts.length; jsScriptNo++) {
		$.cachedScript(login_profile.protocol + '//' + window.location.host + '/' + jsScripts[jsScriptNo]).fail(function (jqxhr, settings, exception) {
			jsLoadSuccess = 1;
		})

		if (jsLoadSuccess == 1)
			break;
	};
	if (jsLoadSuccess == 1) {
		return 1;
	}
}
function LoadJSScripts(jsScripts) {
	var jsLoadSuccess = true;
	for (var jsScriptNo = 0; jsScriptNo < jsScripts.length; jsScriptNo++) {
		$.cachedScript(jsScripts[jsScriptNo]).fail(function (jqxhr, settings, exception) {
			jsLoadSuccess = false;
		})
		if (!jsLoadSuccess) {
			break;
		}
	};
	return jsLoadSuccess;
}

function duplication_removel(arr, column, noofcolumns, columnlist) {
	new_array = [];

	for (i = 0; i < arr.length; i++) {
		if (i > 0) {
			break;
		};
		var insertstring = "{";

		//new_array[i] = new Array(noofcolumns);

		for (m = 0; m < columnlist.length; m++) {
			if (m > 0)
				insertstring += ',';
			insertstring += '"' + columnlist[m][2].column_name + '" : "' + arr[i][columnlist[m][2].column_name] + '"';
		}

		if (insertstring != "{")
			insertstring += "}";

		var obj = '[' + insertstring + ']';
		var all_arr = $.parseJSON(obj);
		for (var z = 0; z < all_arr.length; z++) {
			new_array.push(all_arr[z]);
		};

		for (j = i + 1; j < arr.length; j++) {
			var insertstring2 = "{";
			if (arr[i][column] != arr[j][column]) {
				var value = 0;
				for (k = 0; k < new_array.length; k++) {
					if (arr[j][column] == new_array[k][column]) {
						value = 1;
					}
				}
				if (value == 0) {
					//new_array[i] = new Array(noofcolumns);

					for (m1 = 0; m1 < columnlist.length; m1++) {
						if (m1 > 0)
							insertstring2 += ',';
						insertstring2 += '"' + columnlist[m1][2].column_name + '" : "' + arr[j][columnlist[m1][2].column_name] + '"';
					}

					if (insertstring2 != "{")
						insertstring2 += "}";

					var obj1 = '[' + insertstring2 + ']';
					var all_arr1 = $.parseJSON(obj1);
					for (var q = 0; q < all_arr1.length; q++) {
						new_array.push(all_arr1[q]);
					};
				}
			}
		}
	}
	return new_array;
}
function XMLtoString(elem) {
	var serialized;
	try {
		// XMLSerializer exists in current Mozilla browsers
		serializer = new XMLSerializer();
		serialized = serializer.serializeToString(elem);
	} catch (e) {
		// Internet Explorer has a different approach to serializing XML
		serialized = elem.xml;
	}
	return serialized;
}

function lang_conversion() {
	var language = 'ch-ch';

	if (language == 'ar-ar') {
		//document.body.direction = 'rtl';
		$.mobile.activePage[0].style.direction = 'rtl';
		/*for ul li right to left alignment
		$.mobile.activePage[0].children[1].childNodes[2].children[0].children[0].style.text-Align = 'right';*/
	}

	array = new Array();
	array[0] = new Array(2);
	counter = 0;
	for (i = 0; i < $.mobile.activePage[0].childNodes[3].children.length; i++) {
		if ($.mobile.activePage[0].childNodes[3].children[i].localName == "label") {
			//v = document.body.childNodes[i].innerHTML;
			var v = $.mobile.activePage[0].childNodes[3].children[i].innerHTML;
			var v_id = $.mobile.activePage[0].childNodes[3].children[i].id;
			array[counter] = new Array();
			array[counter][0] = v;
			array[counter][1] = v_id;
			counter++;
			//j++;
		}
	}
	xml = loadXMLDoc("../xsl/mptrak_label_selfservit_lang.xml");
	//path="/Screens/ScreenName/LabelName[2]/language";
	for (i = 0; i < array.length; i++) {
		//alert(array[i][0]);
		path = "//LabelName[@id=\'" + array[i][0] + "\']/Language[@id=\'" + language + "\']";
		//code for IE
		if (window.ActiveXObject) {
			xml.setProperty("SelectionLanguage", "XPath");
			var nodes = xml.selectNodes(path);

			for (i = 0; i < nodes.length; i++) {
				//alert(nodes.length);
				//alert(nodes[i].childNodes[0].nodeValue);
				//document.write("<br />");
			}
		}
		// code for Mozilla, Firefox, Opera, etc.
		else if (document.implementation && document.implementation.createDocument) {
			var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
			var result = nodes.iterateNext();
			while (result) {
				//document.write("<br />");
				//document.getElementById($.mobile.activePage[0].childNodes[3].children[i].id).innerHTML=result.childNodes[0].nodeValue;
				document.getElementById(array[i][1]).innerHTML = result.childNodes[0].nodeValue;
				result = nodes.iterateNext();
			}
		}
	}
}
function error_msg_lang_conversion() {
	//$('#login_error_msg').show();
	// alert("in");
	xml = loadXMLDoc("../../s_iscripts/mptrak_label_selfservit_lang.xml");
	value_array = new Array();
	for (i = 0; i < new_array.length; i++) {

		path = "//LabelName[@id=\'" + new_array[i] + "\']/Language[@id='ch-ch']";
		alert(path + ' : path');
		//code for IE
		if (window.ActiveXObject) {
			xml.setProperty("SelectionLanguage", "XPath");
			var nodes = xml.selectNodes(path);

			for (i = 0; i < nodes.length; i++) {
				document.write("<br />");
			}
		}
		// code for Mozilla, Firefox, Opera, etc.
		else if (document.implementation && document.implementation.createDocument) {

			var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);

			var result = nodes.iterateNext();
			while (result) {

				value_array[i] = result.childNodes[0].nodeValue;
				result = nodes.iterateNext();

			}
		}

	}
	return value_array;
}
screen_name = "";
function lang_conversion_web() {
	var language = '';

	if (language == 'ar-ar') {
		//document.body.direction = 'rtl';
		$.mobile.activePage[0].style.direction = 'rtl';
		/*for ul li right to left alignment
		$.mobile.activePage[0].children[1].childNodes[2].children[0].children[0].style.text-Align = 'right';*/
	}

	counter = 0;

	label_array = document.getElementsByTagName("label");
	button_array = document.getElementsByTagName("button");
	lang_array = new Array();
	for (var i = 0; i < label_array.length; i++) {

		if (label_array[i].innerText != "") {
			if (label_array[i].id != "") {
				lang_array[counter] = new Array();
				lang_array[counter][0] = label_array[i].innerText;
				lang_array[counter][1] = label_array[i].id;
				counter++;
			}
		}
	}
	for (var i = 0; i < button_array.length; i++) {
		if (button_array[i].innerText != "") {
			if (button_array[i].id != "") {
				lang_array[counter] = new Array();
				lang_array[counter][0] = button_array[i].innerText;
				lang_array[counter][1] = button_array[i].id;
				counter++;
			}
		}
	}

	xml = loadXMLDoc("../../../s_iscripts/mptrak_label_selfservit_lang.xml");

	//path="/Screens/ScreenName/LabelName[2]/language";
	for (i = 0; i < lang_array.length; i++) {
		path = "//LabelName[@id=\'" + lang_array[i][0] + "\']/Language[@id=\'" + login_profile.locale_id + "\']";
		//code for IE

		if (window.ActiveXObject) {
			//xml.setProperty("SelectionLanguage","XPath");
			//var nodes=xml.selectNodes(path);

			//for (i=0;i<nodes.length;i++)
			//{
			//alert(nodes.length);
			//alert(nodes[i].childNodes[0].nodeValue);
			//document.write("<br />");
			//}
		}
		// code for Mozilla, Firefox, Opera, etc.
		else if (document.implementation && document.implementation.createDocument) {

			var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
			var result = nodes.iterateNext();
			while (result) {
				//alert(lang_array[i][1]+"="+result.childNodes[0].nodeValue);
				//document.write("<br />");
				//document.getElementById($.mobile.activePage[0].childNodes[3].children[i].id).innerHTML=result.childNodes[0].nodeValue;
				//eval(document.getElementById(lang_array[i][1]).innerHTML=result.childNodes[0].nodeValue);
				document.getElementById(lang_array[i][1]).innerText = result.childNodes[0].nodeValue;
				result = nodes.iterateNext();
			}
		}
	}

	if (screen_name == "JO UPDATE") {
		for (var i = 0; i < acc_jolist_data.length; i++) {

			path = "//LabelName[@id=\'" + acc_jolist_data[i].text + "\']/Language[@id=\'" + login_profile.locale_id + "\']";

			if (window.ActiveXObject) {
				//xml.setProperty("SelectionLanguage","XPath");
				//var nodes=xml.selectNodes(path);

				//for (i=0;i<nodes.length;i++)
				//{
				//}
			}
			// code for Mozilla, Firefox, Opera, etc.
			else if (document.implementation && document.implementation.createDocument) {

				var nodes = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);
				var result = nodes.iterateNext();
				while (result) {

					acc_jolist_data[i].text = result.childNodes[0].nodeValue;

					result = nodes.iterateNext();
				}
			}
		}
	}
}

function positionFooter() {
	var footerHeight = 0,
	$footer = $("footer");
	footerHeight = $footer.height();

	if (($(document.body).height() + (footerHeight)) < $(window).height()) {
		//must stick to bottom
		$footer.css({
			position : "fixed",
			bottom : 0,
			left : 0,
			right : 0
		})
	} else {
		$footer.attr("style", "");
	}
}
function validatePhNo(id, val) {
	var filter = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	if (val != "") {
		if (filter.test(val)) {
			return true;
		} else {
			alert('Phone Number is invalid');
			$('#' + id).val("");
			$('#' + id).focus();
		}
	}
}

function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}

	return true;
}

function validateEmail(id, val) {
	var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{0,4}$/;
	if (val != "") {
		if (filter.test(val)) {
			return true;
		} else {
			alert('Email Id is invalid');
			$('#' + id).val("");
			$('#' + id).focus();
		}
	}
}

function IsValidDateType(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		if (charCode != 45)
			return false;

	return true;
}

function DateValidation(input, id) {
	var reg = /(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\d\d/;
	if (input != "") {
		if (!input.match(reg)) {
			alert("Please enter date in (dd-mm-yyyy) format");
			$("#" + id).val("");
			$("#" + id).focus();
		}
	}
}
Date.prototype.getWeek = function () {
	var onejan = new Date(this.getFullYear(), 0, 1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

function LoadYearFilter() {
	var current_date = new Date();
	var current_year = current_date.getFullYear();
	year_filter_array = [{
			code : "Current",
			description : "Current",
			text : "Current",
			value : "Current"
		}, {
			code : "Previous",
			description : "Previous",
			text : "Previous",
			value : "Previous"
		}
	];
	for (var i = -3; i <= 3; i++) {
		year_filter_array.push({
			code : (current_year + i).toString(),
			description : (current_year + i).toString(),
			value : (current_year + i).toString(),
			text : (current_year + i).toString()
		});
	}
	return year_filter_array;
}

function LoadQuarterFilter() {
	var quarter_filter_array = [{
			code : "Current",
			description : "Current",
			text : "Current",
			value : "Current"
		}, {
			code : "Previous",
			description : "Previous",
			text : "Previous",
			value : "Previous"
		}, {
			code : "1",
			description : "1",
			value : "1",
			text : "1"
		}, {
			code : "2",
			description : "2",
			value : "2",
			text : "2"
		}, {
			code : "3",
			description : "3",
			value : "3",
			text : "3"
		}, {
			code : "4",
			description : "4",
			value : "4",
			text : "4"
		}
	];
	return quarter_filter_array;
}

function LoadMonthFilter() {
	var month_filter_array = [{
			code : "Current",
			description : "Current",
			text : "Current",
			value : "Current"
		}, {
			code : "Previous",
			description : "Previous",
			text : "Previous",
			value : "Previous"
		}, {
			code : "1",
			description : "January",
			value : "1",
			text : "January"
		}, {
			code : "2",
			description : "February",
			value : "2",
			text : "February"
		}, {
			code : "3",
			description : "March",
			value : "3",
			text : "March"
		}, {
			code : "4",
			description : "April",
			value : "4",
			text : "April"
		}, {
			code : "5",
			description : "May",
			value : "5",
			text : "May"
		}, {
			code : "6",
			description : "June",
			value : "6",
			text : "June"
		}, {
			code : "7",
			description : "July",
			value : "7",
			text : "July"
		}, {
			code : "8",
			description : "August",
			value : "8",
			text : "August"
		}, {
			code : "9",
			description : "September",
			value : "9",
			text : "September"
		}, {
			code : "10",
			description : "October",
			value : "10",
			text : "October"
		}, {
			code : "11",
			description : "November",
			value : "11",
			text : "November"
		}, {
			code : "12",
			description : "December",
			value : "12",
			text : "December"
		}
	];
	return month_filter_array;
}
function LoadWeekOfMonthFilter() {
	var d = new Date();
	var current_year = new Date(d.getFullYear(), 0, 1);
	var next_year = new Date((d.getFullYear() + 1), 0, 1);
	var array = [];
	if (current_year.getDay() != 0) {
		var firstWeek_lastDay = (6 - current_year.getDay()) + 2;
		week_no = 1;
		array = [{
				code : "Current",
				description : "Current",
				text : "Current",
				value : "Current"
			}, {
				code : "Previous",
				description : "Previous",
				text : "Previous",
				value : "Previous"
			}, {
				code : week_no,
				description : firstWeek_lastDay + "-" + "01" + "-" + current_year.getFullYear(),
				value : week_no,
				text : firstWeek_lastDay + "-" + "01" + "-" + current_year.getFullYear()
			}
		];
	} else {
		firstWeek_lastDay = 1;
		week_no = 1;
		array = [{
				code : "Current",
				description : "Current",
				text : "Current",
				value : "Current"
			}, {
				code : "Previous",
				description : "Previous",
				text : "Previous",
				value : "Previous"
			}, {
				code : week_no,
				description : firstWeek_lastDay + "-" + "01" + "-" + current_year.getFullYear(),
				value : week_no,
				text : firstWeek_lastDay + "-" + "01" + "-" + current_year.getFullYear()
			}
		];
	}
	var no_of_days = firstWeek_lastDay + 7;
	for (var i = 0; i < 60; i++) {
		if (new Date(d.getFullYear(), 0, (no_of_days)) < next_year) {
			var week_no = week_no + 1;

			var week_date = new Date(d.getFullYear(), 0, (no_of_days));
			no_of_days += 7;
			var date = week_date.getDate();
			var month = (week_date.getMonth() + 1);
			if (week_date.getDate() < 10) {
				date = "0" + week_date.getDate();
			}
			if (week_date.getMonth() + 1 < 10) {
				month = "0" + (week_date.getMonth() + 1);
			}

			array.push({
				code : week_no,
				description : date + "-" + month + "-" + week_date.getFullYear(),
				value : week_no,
				text : date + "-" + month + "-" + week_date.getFullYear(),
			});
		}
	}

	if (date < 31) {
		array.push({
			code : 53,
			description : '31' + "-" + month + "-" + week_date.getFullYear(),
			value : 53,
			text : '31' + "-" + month + "-" + week_date.getFullYear(),
		});

	}
	return array;
}
function allowstring(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode
	if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123))
		return true;

	return false;
}

function NavigateScreen(screenName) {
	$('#container').load(screenName + '.html', function () {
		eval('fn_' + screenName + '()');
	});
}

function ConvertToOption(opt_arr) {
	var code_list_data = "<option value=''>Choose one...</option>";
	for (i = 0; i < opt_arr.length; i++) {
		code_list_data += "<option value='" + opt_arr[i].value + "'>"+ opt_arr[i].text + "</option>";
	}
	return code_list_data;
}

/* DATA ENTRY RESTRICTION SECTION -- BEGIN */
function AllowAlphabetsOnly(e) {
	var charCode = (e.which) ? e.which : event.keyCode;
	if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
		return true;
	}
	return false;
}
function AllowAlphabetsAndSpaceOnly(e) {
	var charCode = (e.which) ? e.which : event.keyCode;
	if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode == 32)) {
		return true;
	}
	return false;
}
function AllowNumbersOnly(e) {
	var charCode = (e.which) ? e.which : event.keyCode;
	if ((charCode >= 48 && charCode <= 57)) {
		return true;
	}
	return false;
}
/* DATA ENTRY RESTRICTION SECTION -- END */

/* Mobile Validation - Begin*/
function jquery_mobile_validator() {
	var no_of_input_fields = $.mobile.activePage.find(':input').length;
	for (var i = 0; i < no_of_input_fields; i++) {
		if ($.mobile.activePage.find(':input')[i].required == true) {
			if ($.mobile.activePage.find(':input')[i].value == '') {
				alert('Please Fill All The Details.');
				return false;
			} else {
				return true;
			}
		}
	}
}
/* Mobile Validation - End*/

/* Mobile Mandatory Fields - Start*/
$(document).on('pageshow', function () {
	if (typeof $.mobile.activePage != 'undefined') {
		var no_of_input_fields = $.mobile.activePage.find(':input').length;
		for (var i = 0; i < no_of_input_fields; i++) {
			if ($.mobile.activePage.find(':input')[i].required == true) {
				//label_text = $.mobile.activePage.find(':input')[i].parentNode.previousSibling.innerHTML;
				label_text = $.mobile.activePage.find(':input')[i].labels[0].innerHTML;
				$.mobile.activePage.find(':input')[i].labels[0].innerHTML = label_text + ' <span style="color:red;">*</span>'; //sets red star along with the label text
			}
		}
	}
});
/* Mobile Mandatory Fields - End*/

function validatingValuesInComboBox(id_reference, array_name, value_field, current_value) {
	var indicator = false;
	for (var i = 0; i < array_name.length; i++) {
		if (array_name[i][value_field] == current_value) {
			indicator = true;
		}
	}
	if (indicator == false) {
		alert("This is not valid value");
		id_reference.value("");
		return false;
	}
}
function SummaryAndSeriesData(screenID) {
	var summary_and_series_data = new Object();
	var summary_by_data = [];
	var series_by_data = [];
	xmlnode = xmlDocREPORT.childNodes[0].getElementsByTagName(screenID)[0];

	if (xmlnode.getElementsByTagName("summary_by")[0] != undefined) {
		summary_fields = xmlnode.getElementsByTagName("summary_by")[0].getElementsByTagName("fields");
		for (var i = 0; i < summary_fields.length; i++) {
			var obj = {};
			obj.text = summary_fields[i].getElementsByTagName("textDesc")[0].childNodes[0].nodeValue;
			obj.value = summary_fields[i].getElementsByTagName("valueDesc")[0].childNodes[0].nodeValue;
			if(summary_fields[i].getElementsByTagName("display")[0] != undefined)
			{
				obj.display = summary_fields[i].getElementsByTagName("display")[0].childNodes[0].nodeValue;
			}
			else
			{
				obj.display = "";
			}
			summary_by_data.push(obj);
		}
	}
	if (xmlnode.getElementsByTagName("series_by")[0] != undefined) {
		series_fields = xmlnode.getElementsByTagName("series_by")[0].getElementsByTagName("fields");
		for (var i = 0; i < series_fields.length; i++) {
			var obj1 = {};
			obj1.text = series_fields[i].getElementsByTagName("textDesc")[0].childNodes[0].nodeValue;
			obj1.value = series_fields[i].getElementsByTagName("valueDesc")[0].childNodes[0].nodeValue;
			series_by_data.push(obj1);
		}
	}
	summary_and_series_data = {
		summary : summary_by_data,
		series : series_by_data,
	};
	return summary_and_series_data;

}

$(document).on('pageshow', function () {
	// Feature Access for mobile
	if (typeof $.mobile.activePage != 'undefined') {
		for (var i = 0; i < access_profile.user_functional_access.length; i++) {
			if ($(this).children().find('#' + access_profile.user_functional_access[i].child_screen_id + '_btn').length != 0) {
				if (access_profile.user_functional_access[i].feature_access == "true") {
					$(this).children().find('#' + access_profile.user_functional_access[i].child_screen_id + '_btn').show();
				}
			}
		}
	}
})
.on('pagebeforecreate',function() {
	//back button and panel change for iphone
	if(login_profile.device == "iPhone")
	{
		$("[data-icon=bars]").css("left","90%");
		$("[data-role=panel]").attr("data-position","right");
		for(var i=0; i<$("[data-role=panel] ul li").length; i++) {
			if($("[data-role=panel] ul li")[i].textContent == "Logout") {
				$("[data-role=panel] ul li")[i].remove();
			}
		}
	}
});
// *************** Gimpex Inventory ***************
var gimpexInventory = {
	months : [{
			"calendar_month" : "1",
			"description" : "January",
			"financial_month" : "10"
		}, {
			"calendar_month" : "2",
			"description" : "February",
			"financial_month" : "11"
		}, {
			"calendar_month" : "3",
			"description" : "March",
			"financial_month" : "12"
		}, {
			"calendar_month" : "4",
			"description" : "April",
			"financial_month" : "1"
		}, {
			"calendar_month" : "5",
			"description" : "May",
			"financial_month" : "2"
		}, {
			"calendar_month" : "6",
			"description" : "June",
			"financial_month" : "3"
		}, {
			"calendar_month" : "7",
			"description" : "July",
			"financial_month" : "4"
		}, {
			"calendar_month" : "8",
			"description" : "August",
			"financial_month" : "5"
		}, {
			"calendar_month" : "9",
			"description" : "September",
			"financial_month" : "6"
		}, {
			"calendar_month" : "10",
			"description" : "October",
			"financial_month" : "7"
		}, {
			"calendar_month" : "11",
			"description" : "November",
			"financial_month" : "8"
		}, {
			"calendar_month" : "12",
			"description" : "December",
			"financial_month" : "9"
		}
	],
	loadFiles : function () {
		//Load next allowable financial year and month service
		$.cachedScript(window.location.protocol + '//' + window.location.host + '/s_iscripts/get_next_allowable_months.js').fail(function (jqxhr, settings, exception) {
			alert('Unable to load required files');
			return;
		});
	},
	getInventoryFinancialYearMonth : function () {
		gimpexInventory.loadFiles();
		var inventoryFinancialYearMonth = {};
		var inventoryFinancialYearMonth_datasource = [];
		var historyFinancialYearMonth = ConvertXMLStringToJSONArray(executeService_retrieve_listof_values_for_searchcondition({
					p_inputparam_xml : "<inputparam><lov_code>INVFISCALYEARMONTHLIST</lov_code><search_field_1></search_field_1><search_field_2></search_field_2></inputparam>"
				}));
		var nextAllowableFinancialYearMonth = executeService_get_next_allowable_months();

		for (var i = 0; i < historyFinancialYearMonth.length; i++) {
			inventoryFinancialYearMonth_datasource.push(historyFinancialYearMonth[i]);
		}
		for (var i = 0; i < nextAllowableFinancialYearMonth.length; i++) {
			inventoryFinancialYearMonth_datasource.push(nextAllowableFinancialYearMonth[i]);
		}
		//FINANCIAL YEAR
		var financialYear = [];
		for (var i = 0; i < inventoryFinancialYearMonth_datasource.length; i++) {
			var ind = 0;
			for (var j = i + 1; j < inventoryFinancialYearMonth_datasource.length; j++) {
				if (inventoryFinancialYearMonth_datasource[i].fiscal_year == inventoryFinancialYearMonth_datasource[j].fiscal_year) {
					ind = 1;
				}
			}
			if (ind == 0) {
				financialYear.push({
					fiscal_year : inventoryFinancialYearMonth_datasource[i].fiscal_year,
					description : inventoryFinancialYearMonth_datasource[i].fiscal_year, //LIKE 2014-15
					code : inventoryFinancialYearMonth_datasource[i].fiscal_year.substr(2) //LIKE 14-15
				});
			}
		}
		inventoryFinancialYearMonth.financialYear = financialYear;

		//FINANCIAL MONTH
		var financialMonth = [];
		for (var i = 0; i < inventoryFinancialYearMonth_datasource.length; i++) {
			for (var j = 0; j < gimpexInventory.months.length; j++) {
				if (parseInt(inventoryFinancialYearMonth_datasource[i].month) == parseInt(gimpexInventory.months[j].financial_month)) {
					financialMonth.push({
						calendar_month : gimpexInventory.months[j].calendar_month,
						fiscal_year : inventoryFinancialYearMonth_datasource[i].fiscal_year.substr(2), //LIKE 2014-15
						code : gimpexInventory.months[j].financial_month,
						description : gimpexInventory.months[j].description
					});
				}
			}
		}
		inventoryFinancialYearMonth.financialMonth = financialMonth;
		return inventoryFinancialYearMonth;
	},
	isAllowableFinancialYearMonth : function (object) {
		var accessPermission = false;
		var nextAllowableFinancialYearMonth = [];
		nextAllowableFinancialYearMonth = executeService_get_next_allowable_months();
		for (var i = 0; i < nextAllowableFinancialYearMonth.length; i++) {
			if (nextAllowableFinancialYearMonth[i].fiscal_year == object.financialYear.fiscal_year && nextAllowableFinancialYearMonth[i].month == object.month.code) {
				accessPermission = true;
			}
		}
		return accessPermission;
	},
	getAllowableFinancialDate : function () {
		var month,
		year,
		nextAllowableFinancialYearMonth,
		allwableFinancialDate = {};
		nextAllowableFinancialYearMonth = executeService_get_next_allowable_months();
		month = parseInt(nextAllowableFinancialYearMonth[0].month);
		year = parseInt(nextAllowableFinancialYearMonth[0].fiscal_year.split("-")[0]);
		if (month > 9) {
			year = year + 1;
		}
		for (var i = 0; i < gimpexInventory.months.length; i++) {
			if (parseInt(nextAllowableFinancialYearMonth[0].month) == parseInt(gimpexInventory.months[i].financial_month)) {
				month = parseInt(gimpexInventory.months[i].calendar_month);
			}
		}
		allwableFinancialDate.openingDate = new Date(year, month - 1);

		month = parseInt(nextAllowableFinancialYearMonth[nextAllowableFinancialYearMonth.length - 1].month);
		year = parseInt(nextAllowableFinancialYearMonth[nextAllowableFinancialYearMonth.length - 1].fiscal_year.split("-")[0]);
		if (month > 9) {
			year = year + 1;
		}
		for (var i = 0; i < gimpexInventory.months.length; i++) {
			if (parseInt(nextAllowableFinancialYearMonth[nextAllowableFinancialYearMonth.length - 1].month) == parseInt(gimpexInventory.months[i].financial_month)) {
				month = parseInt(gimpexInventory.months[i].calendar_month);
			}
		}
		allwableFinancialDate.closingDate = new Date(year, month, 0);
		return allwableFinancialDate;
	},
	getNextAllowableFinancialYearMonth : function () {
		var nextAllowableMonths = {};

		gimpexInventory.loadFiles();
		nextAllowableMonths_datasource = executeService_get_next_allowable_months();
		//FINANCIAL YEAR
		var financialYear = [];
		for (var i = 0; i < nextAllowableMonths_datasource.length; i++) {
			var ind = 0;
			for (var j = i + 1; j < nextAllowableMonths_datasource.length; j++) {
				if (nextAllowableMonths_datasource[i].fiscal_year == nextAllowableMonths_datasource[j].fiscal_year) {
					ind = 1;
				}
			}
			if (ind == 0) {
				financialYear.push({
					fiscal_year : nextAllowableMonths_datasource[i].fiscal_year,
					description : nextAllowableMonths_datasource[i].fiscal_year, //LIKE 2014-15
					code : nextAllowableMonths_datasource[i].fiscal_year.substr(2) //LIKE 14-15
				});
			}
		}
		nextAllowableMonths.financialYear = financialYear;

		//FINANCIAL MONTH
		var financialMonth = [];
		for (var i = 0; i < nextAllowableMonths_datasource.length; i++) {
			for (var j = 0; j < gimpexInventory.months.length; j++) {
				if (parseInt(nextAllowableMonths_datasource[i].month) == parseInt(gimpexInventory.months[j].financial_month)) {
					financialMonth.push({
						calendar_month : gimpexInventory.months[j].calendar_month,
						fiscal_year : nextAllowableMonths_datasource[i].fiscal_year.substr(2), //LIKE 2014-15
						code : gimpexInventory.months[j].financial_month,
						description : gimpexInventory.months[j].description
					});
				}
			}
		}
		nextAllowableMonths.financialMonth = financialMonth;
		return nextAllowableMonths;
	}
}
function fn_get_next_allowable_months() {
	var year_month_date_config = {};
	$.cachedScript(window.location.protocol + '//' + window.location.host + '/s_iscripts/get_next_allowable_months.js').done(function (script, textStatus) {

		/* DATASOURCE */
		get_next_allowable_months_datasource = executeService_get_next_allowable_months();

		/* FINANCIAL  YEAR */
		var f_year = [];
		for (var i = 0; i < get_next_allowable_months_datasource.length; i++) {
			var ind = 0;
			for (var j = i + 1; j < get_next_allowable_months_datasource.length; j++) {
				if (get_next_allowable_months_datasource[i].fiscal_year == get_next_allowable_months_datasource[j].fiscal_year) {
					ind = 1;
				}
			}
			if (ind == 0) {
				f_year.push({
					fiscal_year : get_next_allowable_months_datasource[i].fiscal_year,
					description : get_next_allowable_months_datasource[i].fiscal_year,
					code : get_next_allowable_months_datasource[i].fiscal_year.substr(2)
				});
			}
		}
		year_month_date_config.f_year = f_year;

		/* FINANCIAL MONTH */
		var months = [{
				"value" : "1",
				"description" : "January"
			}, {
				"value" : "2",
				"description" : "February"
			}, {
				"value" : "3",
				"description" : "March"
			}, {
				"value" : "4",
				"description" : "April"
			}, {
				"value" : "5",
				"description" : "May"
			}, {
				"value" : "6",
				"description" : "June"
			}, {
				"value" : "7",
				"description" : "July"
			}, {
				"value" : "8",
				"description" : "August"
			}, {
				"value" : "9",
				"description" : "September"
			}, {
				"value" : "10",
				"description" : "October"
			}, {
				"value" : "11",
				"description" : "November"
			}, {
				"value" : "12",
				"description" : "December"
			}
		];
		var f_month = [];
		for (var i = 0; i < get_next_allowable_months_datasource.length; i++) {
			var f_value = parseInt(get_next_allowable_months_datasource[i].month);
			var calr_month = parseInt(get_next_allowable_months_datasource[i].month);
			if (f_value < 10) {
				f_value = f_value + 2;
			} else {
				f_value = f_value - 10;
			}
			f_month.push({
				calendar_month : months[f_value].value,
				month : calr_month,
				month_desc : months[f_value].description,
				fiscal_year : get_next_allowable_months_datasource[i].fiscal_year
			});
		}
		year_month_date_config.f_month = f_month;

		/* Opening Date */
		var opening_date = "";
		if (parseInt(f_month[0].calendar_month) < 4) {
			opening_date = new Date("20" + f_month[0].fiscal_year.substr(5, 2) + "-" + f_month[0].calendar_month + "-" + "1");
		} else {
			opening_date = new Date("20" + f_month[0].fiscal_year.substr(2, 2) + "-" + f_month[0].calendar_month + "-" + "1");
		}
		year_month_date_config.f_opening_date = opening_date;

		/* Closing Date */
		var closing_date = "";
		if (parseInt(f_month[f_month.length - 1].calendar_month) < 4) {
			if (parseInt(f_month[f_month.length - 1].calendar_month) == 2) {
				closing_date = new Date("20" + f_month[f_month.length - 1].fiscal_year.substr(5, 2) + "-" + f_month[f_month.length - 1].calendar_month + "-" + "28");
			} else if (parseInt(f_month[f_month.length - 1].calendar_month) % 2 == 0) {
				closing_date = new Date("20" + f_month[f_month.length - 1].fiscal_year.substr(5, 2) + "-" + f_month[f_month.length - 1].calendar_month + "-" + "30");
			} else {
				closing_date = new Date("20" + f_month[f_month.length - 1].fiscal_year.substr(5, 2) + "-" + f_month[f_month.length - 1].calendar_month + "-" + "31");
			}
		} else {
			if (parseInt(f_month[f_month.length - 1].calendar_month) == 2) {
				closing_date = new Date("20" + f_month[f_month.length - 1].fiscal_year.substr(2, 2) + "-" + f_month[f_month.length - 1].calendar_month + "-" + "28");
			} else if (parseInt(f_month[f_month.length - 1].calendar_month) % 2 == 0) {
				closing_date = new Date("20" + f_month[f_month.length - 1].fiscal_year.substr(2, 2) + "-" + f_month[f_month.length - 1].calendar_month + "-" + "30");
			} else {
				closing_date = new Date("20" + f_month[f_month.length - 1].fiscal_year.substr(2, 2) + "-" + f_month[f_month.length - 1].calendar_month + "-" + "31");
			}
		}
		year_month_date_config.f_closing_date = closing_date;
	});
	return year_month_date_config;
}
function fn_datepicker_val(dt_id) {
	var dt = eval('$("#' + dt_id + '").val()');
	if (dt != "") {
		var cdt = dt.split("-");
		return cdt[2] + "-" + cdt[1] + "-" + cdt[0];
	} else {
		return "";
	}
}

//Loading spinner - Mobile
//$(document).ajaxStart(function () {
	/*$('.ui-loader').css('display', 'block');
	$('.overlay').show();*/
	//spinner.show();
//})
//.ajaxStop(function () {
	/*$('.ui-loader').css('display', 'none');
	$('.overlay').hide();*/
	//spinner.hide();
//})
//.ajaxError(function () {
	/*$('.ui-loader').css('display', 'none');
	$('.overlay').hide();*/
	//spinner.hide();
//});
if(typeof $.mobile != 'undefined')
{
	//Company Logo
	$.ajax({
		url : './mobileui/images/PNG/company_logo.png',
		success : function () {
			$(document).on("pagecreate", function () {
				$('.company_logo').attr('src', 'file:///sdcard/mservice/images/application_package/company_logo.png')
			});
		}
	});
}
//Allow Only Numbers wherever class number is used - Mobile
$(document).delegate(".number", "keydown", function (event) {
	if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
		// Allow: Ctrl+A
		(event.keyCode == 65 && event.ctrlKey === true) ||

		// Allow: home, end, left, right
		(event.keyCode >= 35 && event.keyCode <= 39)) {
		return;
	} else {
		// Ensure that it is a number and stop the keypress
		if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
			event.preventDefault();
		}
	}
});
function generate_notification(type, layout, text) {
	var n = noty({
			text : text,
			type : type,
			dismissQueue : true,
			timeout : 7000,
			layout : layout,
			theme : 'defaultTheme'
		});
}
function update_registration_id(registrationDetails) {
	var serviceDetails = "",
	returnStatus = 0;

	serviceDetails += "<inputparam>";
	serviceDetails += "<user_id>" + registrationDetails.user_id + "</user_id>";
	serviceDetails += "<employee_id>" + registrationDetails.employee_id + "</employee_id>";
	serviceDetails += "<registration_id>" + registrationDetails.registration_id + "</registration_id>";
	serviceDetails += "<platform>" + registrationDetails.platform + "</platform>";
	serviceDetails += "</inputparam>";

	var xmlhttp;

	if (window.ActiveXObject) //Code for IE
	{
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} else if (window.XMLHttpRequest) //Code for other browsers like FIREFOX/OPERA
	{
		xmlhttp = new XMLHttpRequest();
	}
	try {
		xmlhttp.open("POST", getWebserverpath() + "/common/components/PushNotification/update_registration_id.aspx", false);
		xmlhttp.setRequestHeader("Content-Type", "text/xml");
		xmlhttp.send(serviceDetails);
		if (xmlhttp.responseText == "SP001") {
			returnStatus = 1;
		}
	} catch (err) {
		alert("Error encountered during service execution");
	}

	return returnStatus;
}
function convertXmlToHtml(xml, xsl) {
	// code for IE
	if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
		ex = xml.transformNode(xsl);
		return ex;
	}
	// code for Chrome, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument) {
		xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(xsl);
		resultDocument = xsltProcessor.transformToFragment(xml, document);
		return resultDocument;
	}
}
/*********************************************************** Object below for client validation service ************************************************/
cvs = {
	applicationBaseDirectory : "mservice",
	cvsTargetURL : "",
	functionalAccessPkgDirectory : "client_functional_access_package",
	functionalConfigurationPkgDirectory : "client_functional_configuration_package",
	refreshFunctionalAccessPkg : function (obj) {
		nativeFileSystem.readFile({
			filePath : cvs.applicationBaseDirectory + "/" + cvs.functionalAccessPkgDirectory + "/" + obj.client_id + "/" + obj.country_code + "/last_change_timestamp.xml",
			decryptInd : false,
			success : function (xml_txt) { // If the file exists
				var timestampXmlDoc = loadXMLString(xml_txt);
				var lastSavedTimeStamp = timestampXmlDoc.getElementsByTagName("client_functional_access_package_last_change_timestamp")[0].childNodes[0].nodeValue;
				if (obj.timeStamp != lastSavedTimeStamp) {
					var zip_package_object = {
						zip_folder_path : cvs.functionalAccessPkgDirectory + "/" + obj.client_id + "/" + obj.country_code,
						zip_file_name : cvs.functionalAccessPkgDirectory + "_" + obj.client_id + "_" + obj.country_code + "_" + obj.timeStamp,
					};
					var zip_package_response = executeService_zip_package(zip_package_object); // generate zip
					if (zip_package_response == "true") {
						nativeFileSystem.deleteDirectory({
							directoryPath : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path,
							success : function () {
								cvs.downloadAndUnzip({
									download_url : cvs.cvsTargetURL + "temp/" + zip_package_object.zip_file_name + ".zip",
									local_url : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path + "/" + zip_package_object.zip_file_name + ".zip",
									unzipDestination : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path,
									success : function () {
										if (typeof obj.success == "function") {
											obj.success();
										} else {
											eval(obj.success + "();");
										}
									},
									failure : function () {
										if (typeof obj.failure == "function") {
											obj.failure();
										} else {
											eval(obj.failure + "();");
										}
									}
								});
							},
							failure : function () {
								cvs.downloadAndUnzip({
									download_url : cvs.cvsTargetURL + "temp/" + zip_package_object.zip_file_name + ".zip",
									local_url : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path + "/" + zip_package_object.zip_file_name + ".zip",
									unzipDestination : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path,
									success : function () {
										if (typeof obj.success == "function") {
											obj.success();
										} else {
											eval(obj.success + "();");
										}
									},
									failure : function () {
										if (typeof obj.failure == "function") {
											obj.failure();
										} else {
											eval(obj.failure + "();");
										}
									}
								});
							}
						});
					} else {
						if (typeof obj.failure == "function") {
							obj.failure();
						} else {
							eval(obj.failure + "();");
						}
					}
				} else {
					if (typeof obj.success == "function") {
						obj.success();
					} else {
						eval(obj.success + "();");
					}
				}
			},
			failure : function (evt) { // download package
				var zip_package_object = {
					zip_folder_path : cvs.functionalAccessPkgDirectory + "/" + obj.client_id + "/" + obj.country_code,
					zip_file_name : cvs.functionalAccessPkgDirectory + "_" + obj.client_id + "_" + obj.country_code + "_" + obj.timeStamp,
				};
				var zip_package_response = executeService_zip_package(zip_package_object); // generate zip
				if (zip_package_response == "true") {
					cvs.downloadAndUnzip({
						download_url : cvs.cvsTargetURL + "temp/" + zip_package_object.zip_file_name + ".zip",
						local_url : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path + "/" + zip_package_object.zip_file_name + ".zip",
						unzipDestination : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path,
						success : function () {
							if (typeof obj.success == "function") {
								obj.success();
							} else {
								eval(obj.success + "();");
							}
						},
						failure : function () {
							if (typeof obj.failure == "function") {
								obj.failure();
							} else {
								eval(obj.failure + "();");
							}
						}
					});
				} else {
					if (typeof obj.failure == "function") {
						obj.failure();
					} else {
						eval(obj.failure + "();");
					}
				}
			}
		});
	},
	refreshFunctionalConfigurationPkg : function (obj) {
		nativeFileSystem.readFile({
			filePath : cvs.applicationBaseDirectory + "/" + cvs.functionalConfigurationPkgDirectory + "/" + obj.client_id + "/" + obj.country_code + "/last_change_timestamp.xml",
			decryptInd : false,
			success : function (xml_txt) { // If the file exists
				var timestampXmlDoc = loadXMLString(xml_txt);
				var lastSavedTimeStamp = timestampXmlDoc.getElementsByTagName("client_functional_configuration_package_last_change_timestamp")[0].childNodes[0].nodeValue;
				if (obj.timeStamp != lastSavedTimeStamp) {
					var zip_package_object = {
						zip_folder_path : cvs.functionalConfigurationPkgDirectory + "/" + obj.client_id + "/" + obj.country_code,
						zip_file_name : cvs.functionalConfigurationPkgDirectory + "_" + obj.client_id + "_" + obj.country_code + "_" + obj.timeStamp,
					};
					var zip_package_response = executeService_zip_package(zip_package_object); // generate zip
					if (zip_package_response == "true") {
						nativeFileSystem.deleteDirectory({
							directoryPath : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path,
							success : function () {
								cvs.downloadAndUnzip({
									download_url : cvs.cvsTargetURL + "temp/" + zip_package_object.zip_file_name + ".zip",
									local_url : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path + "/" + zip_package_object.zip_file_name + ".zip",
									unzipDestination : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path,
									success : function () {
										if (typeof obj.success == "function") {
											obj.success();
										} else {
											eval(obj.success + "();");
										}
									},
									failure : function () {
										if (typeof obj.failure == "function") {
											obj.failure();
										} else {
											eval(obj.failure + "();");
										}
									}
								});
							},
							failure : function () {
								cvs.downloadAndUnzip({
									download_url : cvs.cvsTargetURL + "temp/" + zip_package_object.zip_file_name + ".zip",
									local_url : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path + "/" + zip_package_object.zip_file_name + ".zip",
									unzipDestination : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path,
									success : function () {
										if (typeof obj.success == "function") {
											obj.success();
										} else {
											eval(obj.success + "();");
										}
									},
									failure : function () {
										if (typeof obj.failure == "function") {
											obj.failure();
										} else {
											eval(obj.failure + "();");
										}
									}
								});
							}
						});
					} else {
						if (typeof obj.failure == "function") {
							obj.failure();
						} else {
							eval(obj.failure + "();");
						}
					}
				} else {
					if (typeof obj.success == "function") {
						obj.success();
					} else {
						eval(obj.success + "();");
					}
				}
			},
			failure : function (evt) { // download package
				var zip_package_object = {
					zip_folder_path : cvs.functionalConfigurationPkgDirectory + "/" + obj.client_id + "/" + obj.country_code,
					zip_file_name : cvs.functionalConfigurationPkgDirectory + "_" + obj.client_id + "_" + obj.country_code + "_" + obj.timeStamp,
				};
				var zip_package_response = executeService_zip_package(zip_package_object); // generate zip
				if (zip_package_response == "true") {
					cvs.downloadAndUnzip({
						download_url : cvs.cvsTargetURL + "temp/" + zip_package_object.zip_file_name + ".zip",
						local_url : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path + "/" + zip_package_object.zip_file_name + ".zip",
						unzipDestination : cvs.applicationBaseDirectory + "/" + zip_package_object.zip_folder_path,
						success : function () {
							if (typeof obj.success == "function") {
								obj.success();
							} else {
								eval(obj.success + "();");
							}
						},
						failure : function () {
							if (typeof obj.failure == "function") {
								obj.failure();
							} else {
								eval(obj.failure + "();");
							}
						}
					});
				} else {
					if (typeof obj.failure == "function") {
						obj.failure();
					} else {
						eval(obj.failure + "();");
					}
				}
			}
		});
	},
	downloadAndUnzip : function (obj) {
		nativeFileSystem.downloadFile({ // download
			urlPath : obj.download_url,
			filePath : obj.local_url,
			success : function (filepath) {
				nativeFileSystem.unZip({
					source : filepath,
					destination : obj.unzipDestination,
					success : function () {
						if (typeof obj.success == "function") {
							obj.success();
						} else {
							eval(obj.success + "();");
						}
					},
					failure : function () {
						if (typeof obj.failure == "function") {
							obj.failure();
						} else {
							eval(obj.failure + "();");
						}
					}
				});
			},
			failure : function (evt) {
				if (typeof obj.failure == "function") {
					obj.failure();
				} else {
					eval(obj.failure + "();");
				}
			}
		});
	},
	get_timestamp_and_client_functional_access_package : function (obj) {
		/*** Retrieve Last Change Timestamp ***/
		var retrieve_last_change_timestamp_object = {
			client_id : obj.client_id,
			country_code : obj.country_code
		};
		last_change_timestamp_response = executeService_retrieve_last_change_timestamp(retrieve_last_change_timestamp_object);
		if (last_change_timestamp_response.length > 0) {
			/*** Refresh Functional Access Package ***/
			cvs.refreshFunctionalAccessPkg({
				client_id : obj.client_id,
				country_code : obj.country_code,
				timeStamp : last_change_timestamp_response[0].client_functional_access_package_last_change_timestamp,
				success : function () {
					nativeFileSystem.readFile({
						filePath : cvs.applicationBaseDirectory + "/" + cvs.functionalAccessPkgDirectory + "/" + obj.client_id + "/" + obj.country_code + "/client_functional_access.xml",
						decryptInd : false,
						success : function (functional_access_package_xml) {
							var client_functional_access = loadXMLString(functional_access_package_xml);
							
							login_profile.protocol = client_functional_access.getElementsByTagName('protocol_type')[0].childNodes[0].nodeValue; // protocol_type
							login_profile.portno = client_functional_access.getElementsByTagName('port_no')[0].childNodes[0].nodeValue; //portno
							login_profile.domain_name = client_functional_access.getElementsByTagName('domain_name')[0].childNodes[0].nodeValue; //domain_name
							login_profile.ws_portno = client_functional_access.getElementsByTagName('ws_portno')[0].childNodes[0].nodeValue; //websocket_server_portno
							
							setWebSocketport();
							
							obj.success();
						},
						failure : function() {
							obj.failure();
						}
					});
				},
				failure : function () {
					if (typeof obj.failure == "function") {
						obj.failure('Refresh of functional access package failed.');
					} else {
						eval(obj.failure + "('Refresh of functional access package failed.');");
					}
				}
			});
		} else {
			if (typeof obj.failure == "function") {
				obj.failure('Retrieval of client package timestamp failed.');
			} else {
				eval(obj.failure + "('Retrieval of client package timestamp failed.');");
			}
		}
	},
	get_client_functional_configuration_package : function(obj) {
		/*** Refresh Functional Configuration Package ***/
		cvs.refreshFunctionalConfigurationPkg({
			client_id : obj.client_id,
			country_code : obj.country_code,
			timeStamp : last_change_timestamp_response[0].client_functional_configuration_package_last_change_timestamp,
			success : function () {
				obj.success();
			},
			failure : function () {
				if (typeof obj.failure == "function") {
					obj.failure('Refresh of functional configuration package failed.');
				} else {
					eval(obj.failure + "('Refresh of functional configuration package failed.');");
				}
			}
		});
	},
	updateCVSURL : function(obj) {
		var returnValue = false;
		var clients = application_settings.getElementsByTagName("configuration")[0].getElementsByTagName('cvsSection')[0].getElementsByTagName('client');
		for(var i=0; i<clients.length; i++)
		{
			if(clients[i].getAttribute('id') == obj.client_id && clients[i].getAttribute('country_code') == obj.country_code)
			{
				cvs.cvsTargetURL = 'http://' + clients[i].getAttribute('domain_url') + ':' + clients[i].getAttribute('port_no') +'/';
				returnValue = true;
				break;
			}
		}
		return returnValue;
	}
};
/*********************************************************** Object below for GPS ************************************************/
gps = {
	requestGPSAccurecyTimer : 0,
	requestGPSAccurecyInterval : 0,
	getLastKnownLocation : function(obj) {
		nativeFileSystem.readFile({
			filePath : "mservice/LastKnownGpsLocation.txt",
			decryptInd : false,
			success : function (location_string) {
				var location = JSON.parse(location_string);
				if (typeof obj.success == "function") {
					obj.success({lat : parseFloat(location.lat).toFixed(7),lon : parseFloat(location.lon).toFixed(7)});
				} else {
					eval(obj.success + "('" + {lat : parseFloat(location.lat).toFixed(7),lon : parseFloat(location.lon).toFixed(7)} + "');");
				}
			},failure : function (evt) {
				if (typeof obj.failure == "function") {
					obj.failure(evt);
				} else {
					eval(obj.failure + "(" + evt + ");");
				}
			}
		});
	},
	requestGPSAccurecy : function(obj) {
		gps.requestGPSAccurecyInterval = obj.interval;
		requestGPS = function() {
			clearInterval(gps.requestGPSAccurecyTimer);
			navigator.geolocation.getCurrentPosition(function(result) {
			}, function(err) {
				clearInterval(gps.requestGPSAccurecyTimer);
				cordova.plugins.locationAccuracy.request(function(success) {
					gps.requestGPSAccurecyTimer = setInterval(requestGPS,gps.requestGPSAccurecyInterval);
				}, function(error) {
					if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
						cordova.plugins.diagnostic.switchToLocationSettings();
					}
					else {
						navigator.app.exitApp();
					}
				}, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
			}, { timeout: 5000, enableHighAccuracy: true });
		};
		gps.requestGPSAccurecyTimer = setInterval(requestGPS,1000);
	}
};
/*********************************************************** Object below for Application ************************************************/
app = {
	verify : function(appParameter) {
		var validateClientReturnStatus = app.validateClient({
				client_id : appParameter.client_id,
				country_code : appParameter.country_code
			});
		if (validateClientReturnStatus) {
			cvs.get_timestamp_and_client_functional_access_package({
				client_id : appParameter.client_id,
				country_code : appParameter.country_code,
				success : function () {
					var validateDeviceReturnStatus = app.validateDevice({
							client_id : appParameter.client_id,
							country_code : appParameter.country_code,
							user_id : appParameter.user_id,
							device_id : device.uuid
						});
					if (validateDeviceReturnStatus) {
						var authenticateUserReturnStatus = app.authenticateUser({
								client_id : appParameter.client_id,
								country_code : appParameter.country_code,
								user_id : appParameter.user_id,
								password : appParameter.password
							});
						if (authenticateUserReturnStatus == true) {
							cvs.get_client_functional_configuration_package({
								client_id : appParameter.client_id,
								country_code : appParameter.country_code,
								success : function () {
									appParameter.success();
								},
								failure : function (obj) {
									appParameter.failure("CONFIGURATION_PACKAGE_DOWNLOAD_FAILED");
								}
							});
						} else {
							appParameter.failure("INVALID_USERNAME_PASSWORD");
						}
					} else {
						appParameter.failure("INVALID_DEVICE");
					}
				},
				failure : function (obj) {
					appParameter.failure("ACCESS_PAKAGE_DOWNLOAD_FAILED");
				}
			});
		} else {
			appParameter.failure("INVALID_CLIENT_COUNTRY_CODE");
		}
	},
	initialize : function () {
		app.preIntialize();
		nativeFileSystem.readFile({
			filePath : "mservice/user.txt",
			decryptInd : false,
			success : function (user) {
				if (user != "") {
					user = JSON.parse(user);
					app.verify({
						client_id : user.client_id,
						country_code : user.country_code,
						local_id : "en-us",
						user_id : user.user_id,
						password : decryptData(user.password),
						success : function() {
							if (login_profile.def_pwd_ind == "Y") {
								$.mobile.changePage("mobileui/html/change_pwd.html", {
									transition : "none"
								});
							} else {
								$.mobile.changePage("mobileui/html/home.html", {
									transition : "none"
								});
							}
						},
						failure : function(error) {
							$.mobile.changePage('mobileui/html/signin.html', {
								transition : "none"
							});
						}
					});
				} else {
					$.mobile.changePage('mobileui/html/signin.html', {
						transition : "none"
					});
				}
			},
			failure : function (evt) {
				$.mobile.changePage('mobileui/html/signin.html', {
					transition : "none"
				});
			}
		});
	},
	reInitialize : function() {
		app.initialize();
	},
	preIntialize : function() {
		getUserAccessInfo();
		login_profile.app_mode = "MOBILE_NATIVE";
		login_profile.network_mode = "online";
		gps.requestGPSAccurecy({ interval : 10000 });
		$("body").delegate("#nav-panel","panelbeforeopen", function(e) {
			$("#logged_in_user").text(login_profile.title + "." + login_profile.first_name  + " " + login_profile.middle_name + " " + login_profile.last_name);
		});
		app.bindEvent();
	},
	bindEvent : function () {
		document.addEventListener("backbutton", function (e) {
			e.preventDefault();
			if ($.mobile.activePage.is('#signin') || $.mobile.activePage.is('#home')) {
				app.minimize();
			}
			else if($.mobile.activePage.is('#change_password') && login_profile.def_pwd_ind == "Y") {
				app.minimize();
			}
			else {
				navigator.app.backHistory();
			}
			if ($.mobile.activePage.is('#manage_call_register_wfeventverb_status_change')) {
				mobileConfigurationEngine.var.call_details_loadIndicator = false;
			}
		}, false);
		document.addEventListener("resume", function () {
			if (!$.mobile.activePage.is('#signin')) {
				if(!app.validateSession()) {
					app.reInitialize();
				}
			}
		}, false);
	},
	validateClient : function (validateClientParameter) {
		var validateClientReturnStatus = false;
		var cvsReturnStatus = cvs.updateCVSURL({
				client_id : validateClientParameter.client_id,
				country_code : validateClientParameter.country_code
			});
		if (cvsReturnStatus == true) {
			var validateClientServiceResponse = executeService_validateclient({
					client_id : validateClientParameter.client_id,
					country_code : validateClientParameter.country_code
				});
			if (validateClientServiceResponse == "true") {
				validateClientReturnStatus = true;
			}
		}
		return validateClientReturnStatus;
	},
	validateSession : function () {
		var validateSessionReturnStatus = false;
		validate_session_DataSource = new kendo.data.DataSource({
			pageSize : 10,
			transport : {
				read : {
					async : false,
					type : "POST",
					dataType : 'json',
					contentType : "application/json; charset=utf-8",
					url : getWebserverpath() + "api/security/validate_session",
					complete : function (data, textstatus) {
						try {
							validateSessionReturnStatus = validate_session_DataSource.data()[0].p_valid_session_ind;
						}
						catch(e) {
							validateSessionReturnStatus = false;
						}
					}
				},
				parameterMap : function (data, type) {
					return mserviceUtilities.getRestAPIParameter();
				}
			},
			schema : {
				parse : function (response) {
					return [JSON.parse(response).outputparam];
				}
			}
		});
		validate_session_DataSource.read();
		return validateSessionReturnStatus;
	},
	validateDevice : function (validateDeviceParameter) {
		var validateDeviceReturnStatus = false;
		validate_device_DataSource = new kendo.data.DataSource({
			pageSize : 10,
			transport : {
				read : {
					async : false,
					type : "POST",
					dataType : 'json',
					contentType : "application/json; charset=utf-8",
					url : getWebserverpath() + "api/security/validate_device",
					complete : function (data, textstatus) {
						try {
							validateDeviceReturnStatus = validate_device_DataSource.data()[0].p_valid_device_ind;
						}
						catch(e) {
							validateDeviceReturnStatus = false;
						}
					}
				},
				parameterMap : function (data, type) {
					return '{"contextElement":{"sessionIdField":"088825c3-cce8-48f9-92e7-14872b0b8b13","userIdField":"' + validateDeviceParameter.user_id + '","client_idField":"' + validateDeviceParameter.client_id + '","locale_idField":"en-us","country_codeField":"' + validateDeviceParameter.country_code + '","inputparamElement":{"p_device_idField":"' + validateDeviceParameter.device_id + '","p_company_idField":"' + validateDeviceParameter.client_id + '","p_country_codeField":"' + validateDeviceParameter.country_code + '"}}}'; ;
				}
			},
			schema : {
				parse : function (response) {
					return [JSON.parse(response).outputparam];
				}
			}
		});
		validate_device_DataSource.read();
		return validateDeviceReturnStatus;
	},
	authenticateUser : function (authenticateUserParameter) {
		var authenticateUserReturnStatus = false;
		authenticate_user_DataSource = new kendo.data.DataSource({
			pageSize : 10,
			transport : {
				read : {
					async : false,
					type : "POST",
					dataType : 'json',
					contentType : "application/json; charset=utf-8",
					url : getWebserverpath() + "api/security/authenticate_user",
					complete : function (data, textstatus) {
						try {
							var authenticateUserData = authenticate_user_DataSource.data()[0];
							if(authenticateUserData.ApplicationException == null) {
				
								access_profile.user_functional_access = [];
								
								login_profile.login_date = getCurrentDate().slice(0,10);
								login_profile.login_hour = getCurrentDate().slice(11,13);
								login_profile.login_minute = getCurrentDate().slice(14,16);
								login_profile.login_second = getCurrentDate().slice(17,19);
								login_profile.user_id = authenticateUserParameter.user_id;
								login_profile.client_id = authenticateUserData.auth_response_login_profile.p_client_id;
								login_profile.locale_id = authenticateUserData.auth_response_login_profile.p_locale_id;
								login_profile.guid_val = authenticateUserData.auth_response_login_profile.p_guid;
								login_profile.country_code = authenticateUserData.auth_response_login_profile.p_country_id;
								login_profile.def_pwd_ind = authenticateUserData.auth_response_login_profile.p_default_passwd_ind;
								login_profile.date_display_format = authenticateUserData.auth_response_login_profile.p_date_display_format;
								login_profile.software_product = authenticateUserData.auth_response_login_profile.p_software_product;
								login_profile.software_product_version = authenticateUserData.auth_response_login_profile.p_software_product_version;
								login_profile.software_product_subversion = authenticateUserData.auth_response_login_profile.p_software_product_subversion;
								login_profile.timezone_id = authenticateUserData.auth_response_login_profile.p_timezone_id;
								login_profile.location_code= authenticateUserData.auth_response_login_profile.p_location_code;
								login_profile.currency_code = authenticateUserData.auth_response_login_profile.p_currency_code;
								login_profile.last_login_date = authenticateUserData.auth_response_login_profile.p_last_login_date;
								login_profile.last_login_hour = authenticateUserData.auth_response_login_profile.p_last_login_hour;
								login_profile.last_login_minute = authenticateUserData.auth_response_login_profile.p_last_login_minute;
								login_profile.user_group_id = authenticateUserData.auth_response_login_profile.p_user_group_id;
								login_profile.photo_reference = authenticateUserData.auth_response_login_profile.p_photo_reference;
								login_profile.title = authenticateUserData.auth_response_login_profile.p_title;
								login_profile.first_name = authenticateUserData.auth_response_login_profile.p_first_name;
								login_profile.middle_name = authenticateUserData.auth_response_login_profile.p_middle_name;
								login_profile.last_name = authenticateUserData.auth_response_login_profile.p_last_name;
								login_profile.no_of_org_level = authenticateUserData.auth_response_login_profile.p_company_noof_levels;
								login_profile.emp_id = authenticateUserData.auth_response_login_profile.p_employee_id;
								login_profile.package_id = authenticateUserData.auth_response_login_profile.p_package_id;
								login_profile.user_group_type = authenticateUserData.auth_response_login_profile.p_user_group_type;
								login_profile.dealer_code = authenticateUserData.auth_response_login_profile.p_dealer_code;
								login_profile.dealer_org_level_no = authenticateUserData.auth_response_login_profile.p_dealer_org_level_no;
								login_profile.dealer_org_level_code = authenticateUserData.auth_response_login_profile.p_dealer_org_level_code;
								login_profile.employee_org_level_no = authenticateUserData.auth_response_login_profile.p_employee_org_level_no;
								login_profile.employee_org_level_code = authenticateUserData.auth_response_login_profile.p_employee_org_level_code;
								
								if(authenticateUserData.auth_response_fa_profile != null) {
									for(var fa_profile_count = 0; fa_profile_count < authenticateUserData.auth_response_fa_profile.length; fa_profile_count++) {
										access_profile.user_functional_access.push({
											 parent_feature_group: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_parent_feature_group,
											 child_feature_id_or_group: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_child_feature_id_or_group, 
											 child_feature_id_or_group_ind: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_child_feature_id_or_group_ind, 
											 parent_group_display_label: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_parent_group_display_label, 
											 parent_level_no: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_parent_level_no,
											 parent_display_order: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_parent_display_order, 
											 child_feature_display_label: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_child_feature_display_label,
											 child_level_no: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_child_level_no,
											 child_display_order: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_child_display_order,
											 child_screen_id: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_child_screen_id, 
											 channel_id : authenticateUserData.auth_response_fa_profile[fa_profile_count].p_channel_id,
											 feature_access: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_feature_access.toString(), 
											 add_access: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_add_access.toString(),
											 edit_access: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_edit_access.toString(),
											 delete_access: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_delete_access.toString(), 
											 view_access: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_view_access.toString(), 
											 export_access: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_export_access.toString(), 
											 print_access: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_print_access.toString(), 
											 import_access: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_import_access.toString(),
											 menu_display_ind: authenticateUserData.auth_response_fa_profile[fa_profile_count].p_menu_display_ind.toString()
										});
									}
								}
								
								if(authenticateUserData.auth_response_wf_access_profile != null) {
									for(var wf_access_profile_count = 0; wf_access_profile_count < authenticateUserData.auth_response_wf_access_profile.length; wf_access_profile_count++) {
										access_profile.user_data_access.push({
											access_to_info_type: authenticateUserData.auth_response_wf_access_profile[wf_access_profile_count].p_access_to_info_type,				
											access_for_event: authenticateUserData.auth_response_wf_access_profile[wf_access_profile_count].p_access_for_event,
											level1_code: authenticateUserData.auth_response_wf_access_profile[wf_access_profile_count].p_level1_code, 
											level2_code: authenticateUserData.auth_response_wf_access_profile[wf_access_profile_count].p_level2_code, 
											level3_code: authenticateUserData.auth_response_wf_access_profile[wf_access_profile_count].p_level3_code, 
											level4_code: authenticateUserData.auth_response_wf_access_profile[wf_access_profile_count].p_level4_code,
											level5_code: authenticateUserData.auth_response_wf_access_profile[wf_access_profile_count].p_level5_code, 
											location_code: authenticateUserData.auth_response_wf_access_profile[wf_access_profile_count].p_location_code,
											request_category: authenticateUserData.auth_response_wf_access_profile[wf_access_profile_count].p_request_category, 
											request_type: authenticateUserData.auth_response_wf_access_profile[wf_access_profile_count].p_request_type
										});
									}
								}
								
								if(authenticateUserData.auth_response_da_panel != null) {
									for(var da_panel_count = 0; da_panel_count < authenticateUserData.auth_response_da_panel.length; da_panel_count++){
										access_profile.data_access_panel.push(
										{
											access_to_info_type: authenticateUserData.auth_response_da_panel[da_panel_count].p_access_to_info_type,
											org_level_no: authenticateUserData.auth_response_da_panel[da_panel_count].p_org_level_no,
											org_level_code: authenticateUserData.auth_response_da_panel[da_panel_count].p_org_level_code,
											location_code: authenticateUserData.auth_response_da_panel[da_panel_count].p_location_code,
											request_category: authenticateUserData.auth_response_da_panel[da_panel_count].p_request_category,
											request_type: authenticateUserData.auth_response_da_panel[da_panel_count].p_request_type
										});
									}
								}
								authenticateUserReturnStatus = true;
								app.pre_home();
							}
						}
						catch(e) {
							authenticateUserReturnStatus = false;
						}
					}
				},
				parameterMap : function (data, type) {
					var context = '{';
						context += '"contextElement":{';
							context += '"sessionIdField":"' + '7e9c274d-1c4b-4234-9eec-4f90971f998b' + '",';
							context += '"userIdField":"' + 'signin' + '",';
							context += '"client_idField":"' + authenticateUserParameter.client_id + '",';
							context += '"locale_idField":"en-us",';
							context += '"country_codeField":"' + 'in' + '",';
							context += '"auth_requestElement":{';
								context += '"p_company_idField":"' + authenticateUserParameter.client_id + '",';
								context += '"p_country_codeField":"' + authenticateUserParameter.country_code + '",';
								context += '"p_user_idField":"' + authenticateUserParameter.user_id + '",';
								context += '"p_passwdField":"' + authenticateUserParameter.password + '",';
								context += '"p_deviceField":"' + login_profile.device + '",';
								context += '"p_browserField":"' + login_profile.browser + '",';
								context += '"p_ip_addressField":"' + '' + '",';
								context += '"p_channel_idField":"' + login_profile.app_mode.split('_')[0] + '"';
							context += '}';
						context += '}';
					context += '}';
					return context;
				}
			},
			schema : {
				parse : function (response) {
					return [JSON.parse(response)];
				}
			}
		});
		authenticate_user_DataSource.read();
		return authenticateUserReturnStatus;
	},
	pre_home : function () {	
		dashboard_feature_ctr = 0;
		dashboard_feature = [{
				'feature_id' : 'MASSMAINTHIST'
			}, {
				'feature_id' : 'MCALLLOGIN'
			}, {
				'feature_id' : 'MCALLSEARCH'
			}, {
				'feature_id' : 'MJOBORDERS'
			}, {
				'feature_id' : 'MMYCALLS'
			}, {
				'feature_id' : 'MPUNCHINOUT'
			}, {
				'feature_id' : 'MSTKINQ'
			}, {
				'feature_id' : 'MTIMECARD'
			}, {
				'feature_id' : 'MGEOLOCATION'
			}, {
				'feature_id' : 'MMYPROJ'
			}, {
				'feature_id' : 'MREPORTS'
			}, {
				'feature_id' : 'MSCHEDULER'
			}
		];
		
		for (var i = 0; i < access_profile.user_functional_access.length; i++) {
			if (access_profile.user_functional_access[i].child_feature_id_or_group_ind == 'F') {
				for (var j = 0; j < dashboard_feature.length; j++) {
					if (access_profile.user_functional_access[i].child_feature_id_or_group == dashboard_feature[j].feature_id) {
						if (access_profile.user_functional_access[i].feature_access == "true") {
							dashboard_feature_ctr++;
							functional_child_screen_id = access_profile.user_functional_access[i].child_screen_id;
						}
					}
				}
			}
		}
	},
	minimize : function() {
		navigator.Backbutton.goHome(function() {console.log('success');}, function() {console.log('fail');});
	}
};
/*********************************************************** Object below for Spinner ************************************************/
spinner = {
	show : function (parameter) {
		var title = null,
		message = null;
		if (typeof(parameter) != "undefined") {
			if (typeof(parameter.title) != "undefined") {
				title = parameter.title;
			}
			if (typeof(parameter.message) != "undefined") {
				message = parameter.message;
			}
		}	
		//window.plugins.spinnerDialog.show(title,message, true); //Native Spinner Show
		$.mobile.loader().show(); // jquery mobile spinner
	},
	hide : function () {
		//window.plugins.spinnerDialog.hide();	//Native Spinner Hide
		$.mobile.loader().hide();
	}
};
/*********************************************************** Object below for Push Notification ************************************************/
pushNotification = {
	initialize : function() {
		window.plugins.pushNotification.register(function(success) {
			alert('Callback Success! Result = '+ success);
		}, function(error) {
			alert('error');
		},
		{
			"senderID":"1047829426067",
			"ecb":"onNotificationGCM"
		});
	}
};
function onNotificationGCM(e) {
	switch (e.event) {
	case 'registered':
		if (e.regid.length > 0) {
			alert('regis/id = '+e.regid);
			var userAgent = navigator.userAgent;
			var platform = '';
			if(userAgent.match(/(iPad)/i) || userAgent.match(/(iPhone)/i)) {
				platform = 'IOS';
			}
			else if(userAgent.match(/(Android)/i)) {
				platform = 'Android';
			}
			else if(userAgent.match(/(Windows Phone)/i)) {
				platform = 'Windows';
			}
			
			/*var registrationDetails = new Object();
			registrationDetails.user_id = login_profile.user_id;
			registrationDetails.employee_id = login_profile.emp_id;
			registrationDetails.device_id = device.model + "-" + device.version + "-" + device.uuid;
			registrationDetails.registration_id = e.regid;
			registrationDetails.platform = platform;
			update_registration_id(registrationDetails);*/
		}
		break;
	case 'message':
		// this is the actual push notification. its format depends on the data model from the push server
		//alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
		alert(e.message);
		break;
	case 'error':
		alert('GCM error = ' + e.msg);
		break;
	default:
		alert('An unknown GCM event has occurred');
		break;
	}
}
/*********************************************************** Object below for My Call List ************************************************/
mycalls = {
	parentFeatureID : ""
};
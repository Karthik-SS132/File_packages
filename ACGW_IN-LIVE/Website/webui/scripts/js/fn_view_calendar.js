function fn_view_calendar()
{
	assignScreenName(divID, screenID);
	screenID = 'view_calendar';
	divID = screenID;
	//$("#"+parentScreenID).remove();
	AddToNavigationMap(divID, screenID, displayLabel,  parentScreenID);
	//initial_screen_load_ind = 1;
	screenChangeInd = 1;
	
	/* DROPDOWNLIST INITIALIZATION - Service Manager */
	view_calendar_service_manager_filter = InitializeKendoComboBox({
		fieldID : "view_calendar_service_manager_filter",
		dataSource : {
			applicationName : "common_modules",
			serviceName : "retrieve_listof_values_for_codes",
			inputParameter : {
				p_lov_code_type : "CALL_REPORTINGTO_LIST",
				p_search_field_1 : "",
				p_search_field_2 : ""
			}
		},
		dataTextField : "p_code_value_description",
		dataValueField : "p_code_value",
		filterMode : false,
		events:
		{
			change: "view_calendar_service_manager_filter_event_change"
		}
	});
	
	/* DROPDOWNLIST INITIALIZATION - Service Engineer */
	/*view_calendar_service_engineer_filter = InitializeKendoDropDownList({
		fieldID : "view_calendar_service_engineer_filter",
		dataSource : {
			applicationName : "common_modules",
			serviceName : "retrieve_listof_values_for_codes",
			inputParameter : {
				p_lov_code_type : "SCALL_ASSIGNTO_LIST",
				p_search_field_1 : "",
				p_search_field_2 : ""
			}
		},
		dataTextField : "p_code_value_description",
		dataValueField : "p_code_value",
		filterMode : false
	});*/
	
	//Color For First 12 Employees
	resources_color = ["#6eb3fa","#f58a8a","#56ca85","#ff00ff","#c7d0e1","#c7a0e1","#c8deaf","#f73455","#f734f4","#dcf6f4","#dc58cc"];
	
	//Kendo Multi Select - Service Engineer
	$("#view_calendar_service_engineer_filter").kendoMultiSelect({
		dataTextField: "p_description_field_1",
		dataValueField: "p_value_field_1",
		change: function()
				{
					var taglist = $('#view_calendar_service_engineer_filter_taglist').find('li');
					var taglist_len = $('#view_calendar_service_engineer_filter_taglist').find('li').length;
					for(var i=0; i<taglist_len; i++)
					{
						$('#view_calendar_service_engineer_filter_taglist').find('li')[i].style.backgroundColor = resources_color[i];
					}
				}
	});
	view_calendar_service_engineer_filter = $("#view_calendar_service_engineer_filter").data("kendoMultiSelect");
	
	//From DatePicker
	$("#view_calendar_from_date_filter").kendoDatePicker({
		format:"dd-MM-yyyy",
		value:new Date(),
		change: function() {
			view_calendar_to_date_filter.min(view_calendar_from_date_filter.value());
		}
	}).attr('readonly','readonly');
	var view_calendar_from_date_filter = $("#view_calendar_from_date_filter").data("kendoDatePicker");
	
	//To Datepicker
	$("#view_calendar_to_date_filter").kendoDatePicker({
		format:"dd-MM-yyyy",
		value:new Date(),
		change: function() {
			view_calendar_from_date_filter.max(view_calendar_to_date_filter.value())
		}
	}).attr('readonly','readonly');
	var view_calendar_to_date_filter = $("#view_calendar_to_date_filter").data("kendoDatePicker");
	
	//Calendar Scheduler
	$("#view_calendar_scheduler").kendoScheduler({
		date : new Date(),
		workDayStart: new Date("2014/1/1 00:00"),
		workDayEnd: new Date("2014/1/1 23:59"),
		editable : {
			template : $("#view_calendar_se_avl_editor").html(),
			destroy: false,
			move: false,
			create: false,
			resize: false
		},
		footer:false,
		views : [
			/*{type:"day", startTime: new Date("2014/6/6 08:00"),
      endTime: new Date("2014/6/6 19:00")},*/ //doesnt shade, just hides
			"day",
			//{ type: "workWeek", selected: true },
			{ type: "month", selected: true },
			{ type: "week", workWeekEnd: 0},
			{type:"agenda", eventTemplate: $("#view_calendar_se_avl_agenda-event-template").html() }
		],
        resources: [
            {
                field: "ownerId",
                title: "Owner",
                dataSource: []
            }
        ],		eventTemplate : $("#view_calendar_se_avl_event-template").html(),
		edit : function (e) {
			$('.k-scheduler-update').css('display', 'none');
			$('.k-scheduler-cancel').css('display', 'none');
			$('.k-edit-buttons').css('display', 'none');

			var scheduler_uid = this._editor.container[0].attributes[0].nodeValue;
			//var scheduler_uid = this._editContainer[0].attributes[0].nodeValue;	//	old version
			var scheduler_model = se_availability_dSource.getByUid(scheduler_uid);	//	new version
			//console.log(scheduler_model);
			if(scheduler_model.type == 'SC')
			{
				$('#atr1').css('display', 'block').val(scheduler_model.customer);
				$('#lbl_atr1').text('Customer :').parent().css('display', 'block');
				$('#customer_name').css('display', 'block').val(scheduler_model.customer_name);
				$('#lbl_customer_name').text('Customer Name:').parent().css('display', 'block');
				$('#address').css('display', 'block').val(scheduler_model.customer_loc_address);
				$('#lbl_address').text('Address:').parent().css('display', 'block');
				$('#atr2').css('display', 'block').val(scheduler_model.asset_id);
				$('#lbl_atr2').text('Asset :').parent().css('display', 'block');
				$('#atr3').css('display', 'block').val(scheduler_model.equipment_id);
				$('#lbl_atr3').text('Equipment :').parent().css('display', 'block');
				$('#atr4').css('display', 'block').val(scheduler_model.priority);
				$('#lbl_atr4').text('Priority :').parent().css('display', 'block');
				if(typeof scheduler_model.call_logged != 'undefined')
				{
					//$('#atr7').css('display', 'block').kendoDateTimePicker().val(scheduler_model.call_logged);
					$('#atr7').css('display', 'block').val(scheduler_model.call_logged);
				}
				else
				{
					$('#atr7').css('display', 'block').val('');
				}
				$('#lbl_atr7').text('Call Logged:').parent().css('display', 'block');
			}
			else if(scheduler_model.type == 'NAVL')
			{
				e.preventDefault();
			}
		}
	});
	view_calendar_scheduler = $("#view_calendar_scheduler").data("kendoScheduler");
	
		mserviceUtilities.loadJSScripts(["../../s_iscripts/retrieve_calendar.js"]);																	
	//Retrieve button - Click
	$('#view_calendar_retrieve_btn').on('click', function () {
		se_scheduler_array = [];
		se_scheduler_array_2 = [];
		
		se_schedule_from_date1 = $("#view_calendar_from_date_filter").val().split('-');
		se_schedule_from_date = se_schedule_from_date1[2]+'-'+se_schedule_from_date1[1]+'-'+se_schedule_from_date1[0];
		
		se_schedule_to_date1 = $("#view_calendar_to_date_filter").val().split('-');
		se_schedule_to_date = se_schedule_to_date1[2]+'-'+se_schedule_to_date1[1]+'-'+se_schedule_to_date1[0];
		
		if(view_calendar_service_engineer_filter.value() != '')
		{
			srvc_engineer_val = view_calendar_service_engineer_filter.value();
		}
		else
		{
			srvc_engineer_val = [];
			srvc_engineer_val[0] = view_calendar_service_manager_filter.value();
		}
		calendar_info_type = "CALL";
		if(srvc_engineer_val != '')
		{
			var calendar_object = executeService_retrieve_calendar();
			
			calendar_object_detail_1 = loadXMLString(calendar_object.detail_1);
			calendar_object_detail_3 = loadXMLString(calendar_object.detail_3);
			
			calendar_detail_1_dSource = new kendo.data.DataSource({
				data : calendar_object_detail_1,
				pageSize : 10,
				schema : {
					type : "xml",
					data : "list/allocation_list",
					model : {
						fields : {
							call_no : "call_no/text()",
							call_type : "call_type/text()",
							call_sub_type : "call_sub_type/text()",							
							cust_id : "cust_id/text()",
							customer_name: "customer_name/text()",
							customer_loc_address: "customer_loc_address/text()",
							equipment_id : "equipment_id/text()",
							asset_id : "asset_id/text()",
							equipment_id : "equipment_id/text()",
							priority_cd : "priority_cd/text()",
							prob_desc : "prob_desc/text()",
							sch_act_date_ind : "sch_act_date_ind/text()",
							call_logged_on_date : "call_logged_on_date/text()",
							call_logged_on_time : "call_logged_on_time/text()",
							call_status : "call_status/text()",
							assigned_to_emp_id : "assigned_to_emp_id/text()",
							assigned_to_emp_name : "assigned_to_emp_name/text()",
							start_date : "start_date/text()",
							start_hour : "start_hour/text()",
							start_minute : "start_minute/text()",
							finish_date : "finish_date/text()",
							finish_hour : "finish_hour/text()",
							finish_minute : "finish_minute/text()"
						}
					}
				}
			});
			calendar_detail_1_dSource.read();
			calendar_data = calendar_detail_1_dSource.data();
			
			for (var i = 0; i < calendar_data.length; i++) {
				if(calendar_data[i].sch_act_date_ind == 'S')
				{
					se_scheduler_array.push({
						id : i+1,
						type : "SC",
						title : calendar_data[i].call_no,
						start : new Date(calendar_data[i].start_date + " " + calendar_data[i].start_hour+":"+calendar_data[i].start_minute),
						end : new Date(calendar_data[i].finish_date + " " + calendar_data[i].finish_hour+":"+ calendar_data[i].finish_minute),
						assigned_to : calendar_data[i].assigned_to_emp_id +" - "+ calendar_data[i].assigned_to_emp_name,
						ownerId: calendar_data[i].assigned_to_emp_id,
						equipment_id : calendar_data[i].equipment_id,
						asset_id : calendar_data[i].asset_id,
						customer : calendar_data[i].cust_id,
						call_status : calendar_data[i].call_status,
						call_type : calendar_data[i].call_type,
						call_sub_type : calendar_data[i].call_sub_type,
						customer_name : calendar_data[i].customer_name,
						customer_loc_address : calendar_data[i].customer_loc_address,
						prob_desc : calendar_data[i].prob_desc,
						priority : calendar_data[i].priority_cd,
						call_logged : calendar_data[i].call_logged_on_date + " " + calendar_data[i].call_logged_on_time,
						image : "../images/cancel_18.png"
					});
				}
				else if(calendar_data[i].sch_act_date_ind == 'A')
				{
					se_scheduler_array.push({
						id : i+1,
						type : "SC",
						title : calendar_data[i].call_no,
						start : new Date(calendar_data[i].start_date + " " + calendar_data[i].start_hour+":"+calendar_data[i].start_minute),
						end : new Date(calendar_data[i].finish_date + " " + calendar_data[i].finish_hour+":"+ calendar_data[i].finish_minute),
						assigned_to : calendar_data[i].assigned_to_emp_id +" - "+ calendar_data[i].assigned_to_emp_name,
						ownerId: calendar_data[i].assigned_to_emp_id,
						equipment_id : calendar_data[i].equipment_id,
						asset_id : calendar_data[i].asset_id,
						customer : calendar_data[i].cust_id,
						call_status : calendar_data[i].call_status,
						call_type : calendar_data[i].call_type,
						call_sub_type : calendar_data[i].call_sub_type,
						customer_name : calendar_data[i].customer_name,
						customer_loc_address : calendar_data[i].customer_loc_address,
						prob_desc : calendar_data[i].prob_desc,
						priority : calendar_data[i].priority_cd,
						call_logged : calendar_data[i].call_logged_on_date + " " + calendar_data[i].call_logged_on_time,
						image : "../images/cancel_18.png"
					});
				}
				else if(calendar_data[i].sch_act_date_ind == 'CO')
				{
					se_scheduler_array.push({
						id : i+1,
						type : "SC",
						title : calendar_data[i].call_no,
						start : new Date(calendar_data[i].start_date + " " + calendar_data[i].start_hour+":"+calendar_data[i].start_minute),
						end : new Date(calendar_data[i].finish_date + " " + calendar_data[i].finish_hour+":"+ calendar_data[i].finish_minute),
						assigned_to : calendar_data[i].assigned_to_emp_id +" - "+ calendar_data[i].assigned_to_emp_name,
						ownerId: calendar_data[i].assigned_to_emp_id,
						equipment_id : calendar_data[i].equipment_id,
						asset_id : calendar_data[i].asset_id,
						customer : calendar_data[i].cust_id,
						call_status : calendar_data[i].call_status,
						call_type : calendar_data[i].call_type,
						call_sub_type : calendar_data[i].call_sub_type,
						customer_name : calendar_data[i].customer_name,
						customer_loc_address : calendar_data[i].customer_loc_address,
						prob_desc : calendar_data[i].prob_desc,
						priority : calendar_data[i].priority_cd,
						call_logged : calendar_data[i].call_logged_on_date + " " + calendar_data[i].call_logged_on_time,
						image : "../images/tick_18.png"
					});
				}
				else if(calendar_data[i].sch_act_date_ind == 'CL')
				{
					se_scheduler_array.push({
						id : i+1,
						type : "SC",
						title : calendar_data[i].call_no,
						start : new Date(calendar_data[i].start_date + " " + calendar_data[i].start_hour+":"+calendar_data[i].start_minute),
						end : new Date(calendar_data[i].finish_date + " " + calendar_data[i].finish_hour+":"+ calendar_data[i].finish_minute),
						assigned_to : calendar_data[i].assigned_to_emp_id +" - "+ calendar_data[i].assigned_to_emp_name,
						ownerId: calendar_data[i].assigned_to_emp_id,
						equipment_id : calendar_data[i].equipment_id,
						asset_id : calendar_data[i].asset_id,
						customer : calendar_data[i].cust_id,
						call_status : calendar_data[i].call_status,
						call_type : calendar_data[i].call_type,
						call_sub_type : calendar_data[i].call_sub_type,
						customer_name : calendar_data[i].customer_name,
						customer_loc_address : calendar_data[i].customer_loc_address,
						prob_desc : calendar_data[i].prob_desc,
						priority : calendar_data[i].priority_cd,
						call_logged : calendar_data[i].call_logged_on_date + " " + calendar_data[i].call_logged_on_time,
						image : "../images/tick_18.png"
					});
				}
				else if(calendar_data[i].sch_act_date_ind == 'I')
				{
					se_scheduler_array.push({
						id : i+1,
						type : "SC",
						title : calendar_data[i].call_no,
						start : new Date(calendar_data[i].start_date + " " + calendar_data[i].start_hour+":"+calendar_data[i].start_minute),
						end : new Date(calendar_data[i].finish_date + " " + calendar_data[i].finish_hour+":"+ calendar_data[i].finish_minute),
						assigned_to : calendar_data[i].assigned_to_emp_id +" - "+ calendar_data[i].assigned_to_emp_name,
						ownerId: calendar_data[i].assigned_to_emp_id,
						equipment_id : calendar_data[i].equipment_id,
						asset_id : calendar_data[i].asset_id,
						customer : calendar_data[i].cust_id,
						call_status : calendar_data[i].call_status,
						call_type : calendar_data[i].call_type,
						call_sub_type : calendar_data[i].call_sub_type,
						customer_name : calendar_data[i].customer_name,
						customer_loc_address : calendar_data[i].customer_loc_address,
						prob_desc : calendar_data[i].prob_desc,
						priority : calendar_data[i].priority_cd,
						call_logged : calendar_data[i].call_logged_on_date + " " + calendar_data[i].call_logged_on_time,
						image : "../images/progress_bar_18.png"
					});
				}
				else if(calendar_data[i].sch_act_date_ind == 'HO')
				{
					se_scheduler_array.push({
						id : i+1,
						type : "SC",
						title : calendar_data[i].call_no,
						start : new Date(calendar_data[i].start_date + " " + calendar_data[i].start_hour+":"+calendar_data[i].start_minute),
						end : new Date(calendar_data[i].finish_date + " " + calendar_data[i].finish_hour+":"+ calendar_data[i].finish_minute),
						assigned_to : calendar_data[i].assigned_to_emp_id +" - "+ calendar_data[i].assigned_to_emp_name,
						ownerId: calendar_data[i].assigned_to_emp_id,
						equipment_id : calendar_data[i].equipment_id,
						asset_id : calendar_data[i].asset_id,
						customer : calendar_data[i].cust_id,
						call_status : calendar_data[i].call_status,
						call_type : calendar_data[i].call_type,
						call_sub_type : calendar_data[i].call_sub_type,
						customer_name : calendar_data[i].customer_name,
						customer_loc_address : calendar_data[i].customer_loc_address,
						prob_desc : calendar_data[i].prob_desc,
						priority : calendar_data[i].priority_cd,
						call_logged : calendar_data[i].call_logged_on_date + " " + calendar_data[i].call_logged_on_time,
						image : "../images/onhold_bar_18.png"
					});
				}
			}

			calendar_detail_2_dSource = new kendo.data.DataSource({
				data : calendar_object_detail_3,
				pageSize : 10,
				schema : {
					type : "xml",
					data : "list/navl",
					model : {
						fields : {
							navl_code_type : "navl_code_type/text()",
							employee_id : "employee_id/text()",
							navl_date : "navl_date/text()",
							navl_from_hr : "navl_from_hr/text()",
							navl_to_hr : "navl_to_hr/text()"
						}
					}
				}
			});
			calendar_detail_2_dSource.read();
			calendar_data_2 = calendar_detail_2_dSource.data();
			
			for (var i = 0; i < calendar_data_2.length; i++) {
				se_scheduler_array.push({
					id : calendar_data.length+i+1,
					title : calendar_data_2[i].navl_code_type,
					ownerId: calendar_data_2[i].employee_id,
					assigned_to: calendar_data_2[i].employee_id,
					type:"NAVL",
					start : new Date(calendar_data_2[i].navl_date + " " + calendar_data_2[i].navl_from_hr+":00"),
					end : new Date(calendar_data_2[i].navl_date + " " + calendar_data_2[i].navl_to_hr+":00"),
					image : ""
				});
			}
			se_availability_dSource = new kendo.data.SchedulerDataSource({
							data : se_scheduler_array
						});
			view_calendar_scheduler.setDataSource(se_availability_dSource);
			
			//Setting the resources
			resources_dataSource = new kendo.data.DataSource();
			//resources_color = ["#6eb3fa","#f58a8a","#56ca85","#ff00ff","#c7d0e1"];
			for(var i=0; i<srvc_engineer_val.length; i++)
			{
				resources_dataSource.data().push({text:srvc_engineer_val[i], value:srvc_engineer_val[i], color:resources_color[i]});
			}
			view_calendar_scheduler.resources[0].dataSource = resources_dataSource;
			
			view_calendar_scheduler.date(new Date(se_schedule_from_date));	// setting the date of the calendar to FROM DATE of the datepicker
			view_calendar_scheduler.options.min = new Date(se_schedule_from_date);	// setting the min date of the calendar to FROM DATE of the datepicker
			view_calendar_scheduler.options.max = new Date(se_schedule_to_date);	// setting the max date of the calendar to TO DATE of the datepicker
			view_calendar_scheduler.refresh();
		}
		else
		{
			alert('Please select a service engineer from assigned to filter');
		}
	});
}
	function fn_view_calendar_loadScripts(){
	return true;
}									
function view_calendar_service_manager_filter_event_change()
{
	//Multi select - Service Engineer
	view_calendar_service_engineer_filter.value('');
	
	var retrieve_listof_values_object = new Object();
	retrieve_listof_values_object.p_lov_code = "CALL_ASSIGNEES_FOR_REPO_MGR";
	retrieve_listof_values_object.p_search_field_1 = view_calendar_service_manager_filter.value();
	retrieve_listof_values_object.p_search_field_2 = "";
	retrieve_listof_values_object.p_search_field_3 = "";
	retrieve_listof_values_object.p_search_field_4 = "";
	retrieve_listof_values_object.p_search_field_5 = "";

	view_calendar_service_engineer_filter.setDataSource(executeService_retrieve_listof_values(retrieve_listof_values_object));
}
function fn_manage_timecard_entry_loadScripts()
{
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [ 
						"../../s_iscripts/retrieve_timecard_entry_list.js",
						"../../s_iscripts/save_timecard_entry.js",
						"../../s_iscripts/retrieve_listof_values.js",
						"../../s_iscripts/retrieve_joborder_task_list.js",
						//	"./webui/scripts/js/fn_manage_timecard_entry_child.js",
					  ];				
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);	
	if (loadRetStatus == 1)		return false;
	return true;
}

function fn_manage_timecard_entry()
{

	task_id_dataSource = []; 
	task_id="";
	
	function startChange()
	{
		
		var startDate = manage_timecard_entry_from_date_filter.value(),
		endDate = manage_timecard_entry_to_date_filter.value();
		
		if (startDate) {
			startDate = new Date(startDate);
			startDate.setDate(startDate.getDate());
			manage_timecard_entry_to_date_filter.min(startDate);
			manage_timecard_entry_scheduler.date(new Date(startDate))
		//	manage_timecard_entry_scheduler.options.min = new Date(startDate);
			if($('#manage_timecard_entry_to_date_filter').val() == "")
			{
				manage_timecard_entry_to_date_filter.value(new Date(startDate));
				console.log(manage_timecard_entry_from_date_filter.value() +","+ manage_timecard_entry_to_date_filter.value());
				
			}
			else if(startDate > endDate)
			{
				manage_timecard_entry_to_date_filter.value('');
			}
			
			
			
		} else if (endDate) {
			manage_timecard_entry_from_date_filter.max(new Date(endDate));
		} else {
			endDate = new Date();
			manage_timecard_entry_from_date_filter.max(endDate);
			manage_timecard_entry_to_date_filter.min(endDate);
		}
		
		if(manage_timecard_entry_from_date_filter.value().getTime() == manage_timecard_entry_to_date_filter.value().getTime())
		{
			
			$('.manage_timecard_entry_scheduler_cls .k-view-week').hide();
			$('.manage_timecard_entry_scheduler_cls .k-view-month').hide();
		}
		else
		{
			$('.manage_timecard_entry_scheduler_cls .k-view-week').show();
			$('.manage_timecard_entry_scheduler_cls .k-view-month').show();
		}
	}

	function endChange() {
		var endDate = manage_timecard_entry_to_date_filter.value(),
		startDate = manage_timecard_entry_from_date_filter.value();

		if (endDate) {
			endDate = new Date(endDate);
			endDate.setDate(endDate.getDate());
			//manage_timecard_entry_from_date_filter.max(endDate);
			//manage_timecard_entry_scheduler.options.max = new Date(endDate);
		} else if (startDate) {
			manage_timecard_entry_to_date_filter.min(new Date(startDate));
		} else {
			endDate = new Date();
			//manage_timecard_entry_from_date_filter.max(endDate);
			manage_timecard_entry_to_date_filter.min(endDate);
		}
		
		if(manage_timecard_entry_from_date_filter.value().getTime() == manage_timecard_entry_to_date_filter.value().getTime())
		{
			
			$('.manage_timecard_entry_scheduler_cls .k-view-week').hide();
			$('.manage_timecard_entry_scheduler_cls .k-view-month').hide();
		}
		else
		{
			$('.manage_timecard_entry_scheduler_cls .k-view-week').show();
			$('.manage_timecard_entry_scheduler_cls .k-view-month').show();
		}
	}

	 manage_timecard_entry_from_date_filter = $("#manage_timecard_entry_from_date_filter").kendoDatePicker({
		format: "dd-MM-yyyy",
		change: startChange
	}).data("kendoDatePicker");

	 manage_timecard_entry_to_date_filter = $("#manage_timecard_entry_to_date_filter").kendoDatePicker({
		format: "dd-MM-yyyy",
		change: endChange
	}).data("kendoDatePicker");

	manage_timecard_entry_from_date_filter.max(manage_timecard_entry_to_date_filter.value());
	manage_timecard_entry_to_date_filter.min(manage_timecard_entry_from_date_filter.value());

	/* DROPDOWNLIST INITIALIZATION - Service Manager */
	manage_timecard_entry_service_manager_filter = InitializeKendoComboBox({
		fieldID : "manage_timecard_entry_service_manager_filter",
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
			change: "manage_timecard_entry_service_manager_filter_event_change"
		}
	});

	
	//Kendo Multi Select - Service Engineer
	$("#manage_timecard_entry_service_engineer_filter").kendoMultiSelect({
		dataTextField: "p_description_field_1",
		dataValueField: "p_value_field_1",
		change: function()
		{
			str = "";
			for(var i=0;i<manage_timecard_entry_service_engineer_filter.dataItems().length;i++){
				
				if(i != manage_timecard_entry_service_engineer_filter.dataItems().length-1)
				{
					str=str+manage_timecard_entry_service_engineer_filter.dataItems()[i].p_description_field_1+",";
				}
				else
				{
					str=str+manage_timecard_entry_service_engineer_filter.dataItems()[i].p_description_field_1;
				}
			}$(".display_description[data-for=manage_timecard_entry_service_engineer_filter]").text(str)
			
		}
	});
	general_desc_ds_temp  = new kendo.data.DataSource();
	general_desc_ds_temp.data([]);
	manage_timecard_entry_service_engineer_filter = $("#manage_timecard_entry_service_engineer_filter").data("kendoMultiSelect");
	general_desc_ds_input_param = "<p_lov_code_type>"+"TIMEALLOCTYPECD"+"</p_lov_code_type>"+"<p_search_field_1></p_search_field_1>"+"<p_search_field_2></p_search_field_2>";
	general_desc_ds = new kendo.data.DataSource(
	{
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'xml',
				contentType: "application/xml; charset=utf-8",	
				url: GetTransportUrlForReport("common_modules", "retrieve_listof_values_for_codes", "context/outputparam"),
				complete:function()
				{
					$("#general_desc").data("kendoDropDownList").dataSource.data(general_desc_ds.data());
				}
			},
			parameterMap: function(data, type)
			{
				if (type == "read")
				{
					return GetTransportParameterForReport(general_desc_ds_input_param);
				}
			}
		},
		schema: 
		{
			type:"xml",
			data:"document/outputparam",
			model: 
			{
				fields: 
				{
					p_code_value:"p_code_value/text()",
					p_code_value_description: "p_code_value_description/text()",
				}
			}
		}
	});	
	//general_desc_ds.read();
	
	alloc_to_project_scall_ind_temp  = new kendo.data.DataSource();
	alloc_to_project_scall_ind_temp.data([]);
	alloc_to_project_scall_ind = $("#alloc_to_project_scall_ind").data("kendoDropDownList");
	alloc_to_project_scall_ind_input_param = "<p_lov_code_type>"+"TIMEALLOCTOCD"+"</p_lov_code_type>"+"<p_search_field_1></p_search_field_1>"+"<p_search_field_2></p_search_field_2>";
	alloc_to_project_scall_ind = new kendo.data.DataSource(
	{
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'xml',
				contentType: "application/xml; charset=utf-8",	
				url: GetTransportUrlForReport("common_modules", "retrieve_listof_values_for_codes", "context/outputparam"),
				complete:function()
				{
					$("#alloc_to_project_scall_ind").data("kendoDropDownList").dataSource.data(alloc_to_project_scall_ind.data());
				}
			},
			parameterMap: function(data, type)
			{
				if (type == "read")
				{
					return GetTransportParameterForReport(alloc_to_project_scall_ind_input_param);
				}
			}
		},
		schema: 
		{
			type:"xml",
			data:"document/outputparam",
			model: 
			{
				fields: 
				{
					p_code_value:"p_code_value/text()",
					p_code_value_description: "p_code_value_description/text()",
				}
			}
		}
	});
	
	/*call_ref_no_ds = new kendo.data.DataSource(
	{
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'xml',
				contentType: "application/xml; charset=utf-8",	
				url: GetTransportUrlForReport("mservice", "retrieve_call_list_details", "context/outputparam_detail"),
			},
			parameterMap: function(data, type)
			{
				if (type == "read")
				{
					arr=$("#manage_timecard_entry_service_engineer_filter").val();
					var emp_id = "ALL";
					if(arr.length > 0)
					{
						var emp_id = "";
					}
					for(var i =0; i<arr.length;i++)
					{
						if(i != arr.length-1)
						{
							 emp_id =emp_id + arr[i]+",";
						}
						else
						{
							emp_id =emp_id+ arr[i];
						}
					}
					return GetTransportParameterForReport("<p_inputparam_xml>"+ getXmlString("<assigned_to_emp_id_filter>"+ emp_id+"</assigned_to_emp_id_filter>")+"</p_inputparam_xml>");
				}
			}
		},
		schema: 
		{
			type:"xml",
			data:"document/outputparam_detail",
			model: 
			{
				fields: 
				{
					call_no:"call_no/text()",
				}
			}
		}
	});	*/
	//call_ref_no_ds.read();
	
	emp_id_ds = new kendo.data.DataSource(
	{
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'xml',
				contentType: "application/xml; charset=utf-8",	
				url: GetTransportUrlForReport("common_modules", "retrieve_listof_values_for_codes", "context/outputparam"),
			},
			parameterMap: function(data, type)
			{
				if (type == "read")
				{
					return GetTransportParameterForReport(
				"<p_lov_code_type>"+'EMPLOYEELIST'+"</p_lov_code_type>"+"<p_search_field_1>"+''+"</p_search_field_1>"+"<p_search_field_2>"+''+"</p_search_field_2>");
				}
			}
		},
		schema: 
		{
			type:"xml",
			data:"document/outputparam",
			model: 
			{
				fields: 
				{
					p_code_value:"p_code_value/text()",
					p_code_value_description:"p_code_value_description/text()"
				}
			}
		}
	});	
	emp_id_ds.read();
	
	/*project_id_ds = new kendo.data.DataSource(
	{
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'xml',
				contentType: "application/xml; charset=utf-8",	
				url: GetTransportUrlForReport("mservice", "retrieve_joborder_list", "context/outputparam_detail"),
			},
			parameterMap: function(data, type)
			{
				if (type == "read")
				{
					arr=$("#manage_timecard_entry_service_engineer_filter").val();
					var emp_id = "ALL";
					if(arr.length > 0)
					{
						var emp_id = "";
					}
					for(var i =0; i<arr.length;i++)
					{
						if(i != arr.length-1)
						{
							 emp_id =emp_id + arr[i]+",";
						}
						else
						{
							emp_id =emp_id+ arr[i];
						}
					}
					return GetTransportParameterForReport("<p_task_owner_id>"+emp_id+"</p_task_owner_id>");
				}
			}
		},
		schema: 
		{
			type:"xml",
			data:"document/outputparam_detail/job",
			model: 
			{
				fields: 
				{
					jobid:"jobid/text()",
					description:"description/text()"
				}
			}
		}
	});	*/
	//project_id_ds.read();
	$("#manage_timecard_entry_retrieve_btn").on("click",function()
	{
		if($("#manage_timecard_entry_service_engineer_filter").val() == null || $("#manage_timecard_entry_service_manager_filter").val() == ""|| $("#manage_timecard_entry_from_date_filter").val() == "" ||$("#manage_timecard_entry_to_date_filter").val() == "")
		{
			alert("Select all the fields to retrieve .");
			return false;
		}
		manage_timecard_entry_datasource_1.read();
	});
	
	manage_timecard_entry_datasource_1 = new kendo.data.DataSource(
	{
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'xml',
				contentType: "application/xml; charset=utf-8",	
				url: GetTransportUrlForReport("common_modules", "retrieve_timecard_entry_list", "context/outputparam_detail"),
				complete: function(data, textstatus)
				{
					//var returnValue = ProcessTransportResponse(data, textstatus);
					scheduler_data = manage_timecard_entry_datasource_1.data();
					scheduler_array=[];resource_data = [];temp=[];
					counter = 1;
					for (var i = 0; i < scheduler_data.length; i++) {
						
						if( scheduler_data[i].alloc_to_project_scall_ind == "G") 
						{
							var heading =scheduler_data[i].alloc_to_type_code+" - "+ scheduler_data[i].timespent_in_minutes+"(mins)";
						}
						else if( scheduler_data[i].alloc_to_project_scall_ind == "S" || scheduler_data[i].alloc_to_project_scall_ind == "C")
						{
							var heading =scheduler_data[i].call_ref_no+" - "+ scheduler_data[i].timespent_in_minutes+"(mins)";
						}
						else if( scheduler_data[i].alloc_to_project_scall_ind == "T")
						{
							var heading =scheduler_data[i].project_id+" - "+ scheduler_data[i].timespent_in_minutes+"(mins)";
						}
						else
						{	var heading =scheduler_data[i].alloc_to_type_code+" - "+ scheduler_data[i].timespent_in_minutes+"(mins)";
						}
						counter++;
						scheduler_array.push({
							id:counter,
							alloc_to_project_scall_ind : scheduler_data[i].alloc_to_project_scall_ind,
							project_id : scheduler_data[i].project_id,
							task_id: scheduler_data[i].task_id,
							call_ref_no: scheduler_data[i].call_ref_no,
							assigned_to_emp_id: scheduler_data[i].employee_id,
							assigned_to_emp_name: scheduler_data[i].employee_id_description,
							shift_no:scheduler_data[i].shift_no,
							start : new Date(scheduler_data[i].work_date + " " + scheduler_data[i].start_hour+":"+scheduler_data[i].start_minute),
							end : new Date(scheduler_data[i].work_date + " " + scheduler_data[i].finish_hour+":"+scheduler_data[i].finish_minute),
							title: heading,
							general_desc: scheduler_data[i].alloc_to_type_code,
							timespent_in_minutes: scheduler_data[i].timespent_in_minutes+" min",
							rec_tstamp:scheduler_data[i].rec_tstamp,
						});
						
						$.each(scheduler_data,function(key,value){
							if($.inArray(value.employee_id,temp) == -1)
							{
								temp.push(value.employee_id);
								resource_data.push({text:value.employee_id_description, value:value.employee_id});
							}
							
						});
					}
					scheduler_ds = new kendo.data.SchedulerDataSource({
							data : scheduler_array
					});
					manage_timecard_entry_scheduler.setDataSource(scheduler_ds);
					if(resource_data.length > 0)
					{
						manage_timecard_entry_scheduler.resources[0].dataSource.data(resource_data);
					}
					manage_timecard_entry_scheduler.view(manage_timecard_entry_scheduler.view().name);
					manage_timecard_entry_scheduler.refresh();
					
				}
			},
			parameterMap: function(data, type)
			{
				
				if (type == "read")
				{
					
					if($("#manage_timecard_entry_service_engineer_filter").val() != null)
					{
						arr=$("#manage_timecard_entry_service_engineer_filter").val();
					
						var resource_value = "";
						for(var i =0; i<arr.length;i++)
						{
							if(i != arr.length-1)
							{
								 resource_value =resource_value + arr[i]+",";
							}
							else
							{
								resource_value =resource_value+ arr[i];
							}
						}
					}
					
				
					input_xml="<p_location_code_filter>"+"ALL"+"</p_location_code_filter>"+
					"<p_shift_id_filter>"+"ALL"+"</p_shift_id_filter>"+
					"<p_emp_id_filter>"+resource_value+"</p_emp_id_filter>"+
					"<p_project_scall_ind_filter>"+"ALL"+"</p_project_scall_ind_filter>"+
					"<p_project_id_filter>"+"ALL"+"</p_project_id_filter>"+
					"<p_task_id_filter>"+"ALL"+"</p_task_id_filter>"+
					"<p_service_call_ref_no_filter>"+"ALL"+"</p_service_call_ref_no_filter>"+
					"<p_from_date_filter>"+$("#manage_timecard_entry_from_date_filter").val().substr(6,4)+"-"+$("#manage_timecard_entry_from_date_filter").val().substr(3,2)+"-"+$("#manage_timecard_entry_from_date_filter").val().substr(0,2)+"</p_from_date_filter>"+
					"<p_to_date_filter>"+$("#manage_timecard_entry_to_date_filter").val().substr(6,4)+"-"+$("#manage_timecard_entry_to_date_filter").val().substr(3,2)+"-"+$("#manage_timecard_entry_to_date_filter").val().substr(0,2)+"</p_to_date_filter>";
					
					return GetTransportParameterForReport(input_xml);
				}
			}
		},
		schema: 
		{
			type:"xml",
			data:"document/outputparam_detail",
			model: 
			{
				fields: 
				{
					alloc_to_project_scall_ind:"alloc_to_project_scall_ind/text()",
					project_id: "project_id/text()",
					task_id: "task_id/text()",
					call_ref_no: "call_ref_no/text()",
					employee_id: "employee_id/text()",
					employee_id_description: {field:"employee_id_description/text()",codeType: "EMPLOYEE", codeField: "employee_id"},
					shift_no: "shift_no/text()",
					work_date: "work_date/text()",
					start_hour: "start_hour/text()",
					start_minute: "start_minute/text()",
					finish_hour: "finish_hour/text()",
					finish_minute: "finish_minute/text()",
					timespent_in_minutes: "timespent_in_minutes/text()",
					alloc_to_type_code: "alloc_to_type_code/text()",
					rec_tstamp: "rec_tstamp/text()",
				}
			},
			parse: function (response)
			{
				return GetDescriptionFieldsForDataSource(response, manage_timecard_entry_datasource_1);
			}
		}
	});	
//	manage_timecard_entry_datasource_1.read();

	
	
	$("#manage_timecard_entry_scheduler").kendoScheduler({
        date: new Date(),
		workDayStart: new Date("2014-01-01 00:00"),
		workDayEnd: new Date("2014-01-01 23:59"),
		min: new Date("1900-01-01"),
		editable : {
			template : $("#manage_timecard_entry_template").html(),
			destroy: true,
			move: false,
			create: true,
			resize: false,
			//update:false
		},
		footer:false,
      //  height: 600,
        views: [
            "day",
			//{ type: "week", workWeekEnd: 0},
          // { type: "workWeek", selected: true },
            "week",
			"month",
			"agenda"
        ],
       // timezone: "Etc/UTC",
		selectable:true,
		
		group: {
            resources: ["Employee"],
            orientation: "vertical"
        },
		resources:[{
			field:'assigned_to_emp_id',
			name:"Employee",
			dataSource: [{text:"",value:""}],
			title: "Employees"
		}],
		edit:function(e)
		{
			$("#assigned_to_emp_id").data("kendoComboBox").options.dataTextField = "p_code_value_description";
			
			$(".datepicker_icon_hide span.k-icon.k-i-calendar").hide();
			$(".datepicker_icon_hide.k-input").attr('disabled','disabled')
			
			selected_day = e.event.start;
			
			if((selected_day.getMonth()+1)< 10)
			{
				month_view = "0"+(selected_day.getMonth()+1);
			}
			else
			{
				month_view = (selected_day.getMonth()+1);
			}
			if((selected_day.getDate())< 10)
			{
				day_view = "0"+(selected_day.getDate());
			}
			else
			{
				day_view = (selected_day.getDate());
			}
			single_day_value = selected_day.getFullYear()+"-"+month_view+"-"+day_view;
			alloc_to_project_scall_ind.read();
			if(e.event.alloc_to_project_scall_ind == "G")
			{
				general_desc_ds_input_param = "<p_lov_code_type>"+"TIMEALLOCTYPECD"+"</p_lov_code_type>"+"<p_search_field_1></p_search_field_1>"+"<p_search_field_2></p_search_field_2>";
				general_desc_ds.read();
				$("#div_general_dec").show();
				$("#div_call_no").hide();
				$("#div_jo_no").hide();
				$("#general_desc").attr("required");
				$("#call_ref_no").removeAttr("required","required");
				$("#project_id").removeAttr("required","required");
				$("#task_id").removeAttr("required","required");
				//$('#alloc_to_project_scall_ind').data("kendoDropdownList").value("Group");
			}
			else if(e.event.alloc_to_project_scall_ind == "S")
			{
				//$("#div_general_dec").hide();
				$("#div_call_no").show();
				$("#div_jo_no").hide();
				$("#call_ref_no").attr("required");
				$("#project_id").removeAttr("required","required");
				//$("#general_desc").removeAttr("required","required");
				general_desc_ds_input_param = "<p_lov_code_type>"+"TIMEALLOCTYPECDCALL"+"</p_lov_code_type>"+"<p_search_field_1></p_search_field_1>"+"<p_search_field_2></p_search_field_2>";
				general_desc_ds.read();
				
				$("#task_id").removeAttr("required","required");
			}
			else if(e.event.alloc_to_project_scall_ind == "T")
			{
				$("#div_general_dec").hide();
				$("#div_call_no").hide();
				$("#div_jo_no").show();
				$("#project_id").attr("required");
				$("#task_id").attr("required");
				$("#call_ref_no").removeAttr("required","required");
				$("#general_desc").removeAttr("required","required");
				
				job_profile.job_id  = $("#project_id").val();
				var valuehtml = executeService_retrieve_joborder_task_list();
				if (valuehtml.header == '1')
				{
					//return false;
				}
				jobtask_timecard_xml=loadXMLString(valuehtml.detail);
				jobtask_list_data = [];
				jobtask_timecard_len = jobtask_timecard_xml.getElementsByTagName("jobtask").length;
				for(var i=0; i<jobtask_timecard_len; i++)
				{
					task_list = jobtask_timecard_xml.getElementsByTagName("jobtask")[i];
					jobtask_list_data.push({
										description : task_list.getElementsByTagName("taskdescription")[0].childNodes[0].nodeValue,
										code : task_list.getElementsByTagName("taskid")[0].childNodes[0].nodeValue
					});
				}
				$("#task_id").data("kendoComboBox").dataSource.data(jobtask_list_data);
			}
			if( e.event.rec_tstamp != undefined)
			{
				$('a.k-button.k-primary.k-scheduler-update').hide();
				//$('#alloc_to_project_scall_ind').data("kendoDropdownList").value("Group");
				$("#alloc_to_project_scall_ind").data("kendoDropDownList").enable(false);
				$("#general_desc").data("kendoDropDownList").enable(false);
				$("#task_id").data("kendoComboBox").enable(false);
				$("#assigned_to_emp_id").data("kendoComboBox").enable(false);
				$("#start").data("kendoDateTimePicker").enable(false);
				$("#end").data("kendoDateTimePicker").enable(false);
				//$("#timespent_in_minutes").attr("disabled","disabled").css({backgroundColor:"#F5F5F5"});
				$("#call_ref_no").attr("disabled","disabled").css({backgroundColor:"#F5F5F5"});
				$("#project_id").attr("disabled","disabled").css({backgroundColor:"#F5F5F5"});
				
			}
			
			//time_diff_for_from_to_time();		// creating error not needed here
			$("#call_ref_no").on("blur",function()
			{
				
				if ($(this).val() != "") {
					screenname="TIMECARDENTRY_CALL";validation_field_1=$(this).val().trim();validation_field_2="";
					validation_field_3="";validation_field_4="";validation_field_5="";validation_field_6="";validation_field_7="";
					validation_field_8="";validation_field_9="";validation_field_10="";
					var task_valid_ind  = executeService_validate_key_field();
					
					if(task_valid_ind == 'false')
					{
						alert("Invalid Call reference no.");
						$("#call_ref_no").val('');
						return true;
					}
				}
			});
			$("#project_id").on("blur",function()
			{
				if ($(this).val() != "") {
					screenname="TIMECARDENTRY_JO";validation_field_1=$(this).val();validation_field_2="";
					validation_field_3="";validation_field_4="";validation_field_5="";validation_field_6="";validation_field_7="";
					validation_field_8="";validation_field_9="";validation_field_10="";
					var task_valid_ind  = executeService_validate_key_field();
					if(task_valid_ind == 'false')
					{
						alert("Invalid Project Id.");
						$("#project_id").val('');
						return false;
					}
					job_profile.job_id  = $("#project_id").val();
					var valuehtml = executeService_retrieve_joborder_task_list();
					if (valuehtml.header == '1')
					{
						//return false;
					}
					jobtask_timecard_xml=loadXMLString(valuehtml.detail);
					jobtask_list_data = [];
					jobtask_timecard_len = jobtask_timecard_xml.getElementsByTagName("jobtask").length;
					for(var i=0; i<jobtask_timecard_len; i++)
					{
						task_list = jobtask_timecard_xml.getElementsByTagName("jobtask")[i];
						jobtask_list_data.push({
											description : task_list.getElementsByTagName("taskdescription")[0].childNodes[0].nodeValue,
											code : task_list.getElementsByTagName("taskid")[0].childNodes[0].nodeValue
						});
					}
					$("#task_id").data("kendoComboBox").dataSource.data(jobtask_list_data);
				}
			
				
			});
			validator = $("#manage_timecard_entry_validator").kendoValidator().data("kendoValidator");
			
			if(e.event.alloc_to_project_scall_ind != undefined){
				/* */setTimeout(function(){
					$("#manage_timecard_entry_validator dd").first().hide();
					$("#manage_timecard_entry_validator dt").first().hide();
				}, 10);
				
				/* */
			}
		},
		save:function(e)
		{
			if(validator.validate())
			{
				if($("#alloc_to_project_scall_ind").val() == "G")
					{
						alloc_type_code = $("#general_desc").val();
					}
					else if($("#alloc_to_project_scall_ind").val() == "S")
					{
						alloc_type_code = $("#general_desc").val();;
					}
					else if($("#alloc_to_project_scall_ind").val() == "T")
					{
						alloc_type_code = "";
					}
				project_scall_ind_filter = $("#alloc_to_project_scall_ind").val();
				job_profile.job_id = $("#project_id").val();
				job_profile.template_id = "";
				if($("#task_id").val() == "")
				{
					jobtask_profile.task_id = "0";
				}
				else
				{
					jobtask_profile.task_id = $("#task_id").val();
				}
				scall_ref_no = $("#call_ref_no").val();
				timecard_employee_id = $("#assigned_to_emp_id").val();
				
			
				//entry_dt = $('[name="start"]').val().substr(0,10).split("/");
				p_entry_date = single_day_value;
				FromHr =$('[name="start"]').val().substr(11,2);
				FromMin = $('[name="start"]').val().substr(14,2);
				ToHr =$('[name="end"]').val().substr(11,2);
				ToMin =$('[name="end"]').val().substr(14,2);
				if( e.event.rec_tstamp == undefined)
				{
					header_rec_timestamp = "00000000-0000-0000-0000-000000000000";
					save_mode = "A";
				}
				else
				{
					header_rec_timestamp =  e.event.rec_tstamp;
					save_mode = "U";
				}
				
				var update_status = executeService_save_timecard_entry();
				if(update_status == "SP001")
				{
					if($("#manage_timecard_entry_service_engineer_filter").val() == null || $("#manage_timecard_entry_service_manager_filter").val() == ""|| $("#manage_timecard_entry_from_date_filter").val() == "" ||$("#manage_timecard_entry_to_date_filter").val() == "")
					{
						//alert("Select all the header fields to retrieve .");
						return false;
					}
					manage_timecard_entry_datasource_1.read();
				}
			}
			else
			{
				alert("Fill all the mandatory fields");
			}
		},
		change:function(e)
		{
			$('.k-icon.k-si-close').hide();
		},
		remove:function(e)
		{
			if(manage_timecard_entry_scheduler.view().name == "agenda")
			{
				e.preventDefault();
			}
			if( ($("#alloc_to_project_scall_ind").val() == "G") || ($("#alloc_to_project_scall_ind").val() == "S")){
				alloc_type_code = $("#general_desc").val();
			}
			else 
			alloc_type_code = "";
			project_scall_ind_filter = $("#alloc_to_project_scall_ind").val();
			job_profile.job_id = $("#project_id").val();
			job_profile.template_id = "";
			if($("#task_id").val() == "")
			{
				jobtask_profile.task_id = "0";
			}
			else
			{
				jobtask_profile.task_id = $("#task_id").val();
			}
			scall_ref_no = $("#call_ref_no").val();
			timecard_employee_id =$("#assigned_to_emp_id").val();
			//entry_dt = $('[name="start"]').val().substr(0,10).split("/");
			p_entry_date = single_day_value;
			FromHr =$('[name="start"]').val().substr(11,2);
			FromMin = $('[name="start"]').val().substr(14,2);
			ToHr =$('[name="end"]').val().substr(11,2);
			ToMin =$('[name="end"]').val().substr(14,2);
			header_rec_timestamp =  e.event.rec_tstamp;
			save_mode = "D";
			var update_status = executeService_save_timecard_entry();
			
			if(update_status == "SP001")
			{
				if($("#manage_timecard_entry_service_engineer_filter").val() == null || $("#manage_timecard_entry_service_manager_filter").val() == ""|| $("#manage_timecard_entry_from_date_filter").val() == "" ||$("#manage_timecard_entry_to_date_filter").val() == "")
				{
					//alert("Select all the header fields to retrieve .");
					return false;
				}
				manage_timecard_entry_datasource_1.read();
			}
		},
		dataBound: function(e) {
			 manage_timecard_entry_scheduler = $("#manage_timecard_entry_scheduler").data("kendoScheduler");
			$(".manage_timecard_entry_scheduler_cls .k-event-template").css('color','black');
		}
    });
	
	 manage_timecard_entry_scheduler.bind("navigate",function(e)
	 {
		
		current_date = e.date;
		if((current_date.getMonth()+1)< 10)
		{
			month = "0"+(current_date.getMonth()+1);
		}
		else
		{
			month = (current_date.getMonth()+1);
		}
		if((current_date.getDate())< 10)
		{
			currentday = "0"+(current_date.getDate());
		}
		else
		{
			currentday = (current_date.getDate());
		}
		if($("#manage_timecard_entry_service_engineer_filter").val() == null || $("#manage_timecard_entry_service_manager_filter").val() == ""|| $("#manage_timecard_entry_from_date_filter").val() == "" ||$("#manage_timecard_entry_to_date_filter").val() == "")
		{
			//alert("Select all the header fields to retrieve .");
			return false;
		}
		manage_timecard_entry_datasource_1.read();
	 
	 });
}
function alloc_to_project_scall_ind_change()
{
			if($("#alloc_to_project_scall_ind").val() == "G")
			{
				general_desc_ds_input_param = "<p_lov_code_type>"+"TIMEALLOCTYPECD"+"</p_lov_code_type>"+"<p_search_field_1></p_search_field_1>"+"<p_search_field_2></p_search_field_2>";
				general_desc_ds.read();
				$("#div_general_dec").show();
				$("#div_call_no").hide();
				$("#div_jo_no").hide();
				$("#general_desc").attr("required");
				$("#call_ref_no").removeAttr("required","required");
				$("#project_id").removeAttr("required","required");
				$("#task_id").removeAttr("required","required");
				$("#call_ref_no").val("");
				$("#project_id").val("");
				$("#task_id").data("kendoComboBox").value('');
			}
			else if($("#alloc_to_project_scall_ind").val() == "S")
			{
				general_desc_ds_input_param = "<p_lov_code_type>"+"TIMEALLOCTYPECDCALL"+"</p_lov_code_type>"+"<p_search_field_1></p_search_field_1>"+"<p_search_field_2></p_search_field_2>";
				general_desc_ds.read();
				$("#div_general_dec").show();
				$("#div_call_no").show();
				$("#div_jo_no").hide();
				$("#call_ref_no").attr("required",'required');
				$("#project_id").removeAttr("required","required");
				$("#task_id").removeAttr("required","required");
				$("#project_id").val("");
				$("#task_id").data("kendoComboBox").value('');
			}
			else if($("#alloc_to_project_scall_ind").val() == "T")
			{
				general_desc_ds_input_param = "<p_lov_code_type>"+"TIMEALLOCTYPECDJOB"+"</p_lov_code_type>"+"<p_search_field_1></p_search_field_1>"+"<p_search_field_2></p_search_field_2>";
				general_desc_ds.read();
				$("#div_general_dec").show();
				$("#div_call_no").hide();
				$("#div_jo_no").show();
				$("#project_id").attr("required",'required');
				$("#task_id").attr("required");
				$("#call_ref_no").removeAttr("required","required");
				$("#call_ref_no").val("");
				//$("#general_desc").removeAttr("required","required");
			}
			
}

function fn_assigned_to_emp_id_event_change()
{

	if($('#assigned_to_emp_id').data('kendoComboBox').value() == "")
	{
		$("#assigned_to_emp_name").text('');
	}
	else
	{
		$("#assigned_to_emp_name").text($('#assigned_to_emp_id').data('kendoComboBox').dataItem().p_code_value_description);
	}
}
function start_change(e)
{
	//time_diff_for_from_to_time();
	$('#end').data('kendoDateTimePicker').min($('#start').val());
}
function end_change(e)
{
	//time_diff_for_from_to_time();
	$('#start').data('kendoDateTimePicker').max($('#end').val());
}
/*function time_diff_for_from_to_time(e)
{
	
	from_time = $('[name="start"]').val().substr(11,5);
	to_time = $('[name="end"]').val().substr(11,5);
	if(from_time != '' && to_time !='')
	{
		if(from_time > to_time)
		{
			//$('[name="start"]').val("");
			$('[name="end"]').val("");
			$('[name="timespent_in_minutes"]').text('');
			alert('Start time cannot be greater than or same as End time.');
		}
		else
		{
			FromHr =$('[name="start"]').val().substr(11,2);
			FromMin = $('[name="start"]').val().substr(14,2);
			ToHr =$('[name="end"]').val().substr(11,2);
			ToMin =$('[name="end"]').val().substr(14,2);
			
			var timecardFrom_dur = new Date(selected_day.getFullYear(),selected_day.getMonth(),selected_day.getDate(),parseInt(FromHr),parseInt(FromMin));
			var timecardTo_dur = new Date(selected_day.getFullYear(),selected_day.getMonth(),selected_day.getDate(),ToHr,ToMin);
			
			var diff = Math.abs((timecardFrom_dur.getTime() - timecardTo_dur.getTime())/1000);
			var minutes_dur = Math.floor(diff/60);
			var hour = Math.floor(minutes_dur/60);
			var minute = minutes_dur%60;
			
			$('[name="timespent_in_minutes"]').text(minutes_dur+' min');
		}
	}
}*/

function manage_timecard_entry_service_manager_filter_event_change()
{
	//Multi select - Service Engineer
	manage_timecard_entry_service_engineer_filter.value('');
	
	var retrieve_listof_values_object = new Object();
	retrieve_listof_values_object.p_lov_code = "CALL_ASSIGNEES_FOR_REPO_MGR";
	retrieve_listof_values_object.p_search_field_1 = manage_timecard_entry_service_manager_filter.value();
	retrieve_listof_values_object.p_search_field_2 = "";
	retrieve_listof_values_object.p_search_field_3 = "";
	retrieve_listof_values_object.p_search_field_4 = "";
	retrieve_listof_values_object.p_search_field_5 = "";

	manage_timecard_entry_service_engineer_filter.setDataSource(executeService_retrieve_listof_values(retrieve_listof_values_object));
}


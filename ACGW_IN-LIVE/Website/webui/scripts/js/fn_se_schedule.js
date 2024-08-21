function fn_se_schedule_loadScripts() {
	retrieve_jo_list_ind = "";
	var jsScriptsToLoad = [];
	jsScriptsToLoad = ["../../s_iscripts/retrieve_manage_service_call_list.js",
		"../../s_iscripts/retrieve_joborder_list.js",
		"../../s_iscripts/retrieve_manage_service_call_details.js",
		"../../s_iscripts/retrieve_listof_service_managers.js",
		"../../s_iscripts/retrieve_listof_service_engineers.js",
	];
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);
	if (loadRetStatus == 1)
		return false;
	return true;
}
function fn_se_schedule() {
	/*serv_engg_list=[];
	serc_mngr_data = [{sm_empid:'ALL',sm_name:'ALL'}];
	srvc_engg_data=[{service_engineer_name:"ALL",service_engineer_emp_id:"ALL",service_manager_emp_id:"ALL"}];

	executeService_retrieve_listof_service_managers();
	executeService_retrieve_listof_service_engineers();

	var a='sm_empid';
	var collist = [];
	collist[0] = new Array(2);
	collist[1] = new Array(2);

	collist[0].push({column_name:'sm_empid',column_index:'1'});
	collist[1].push({column_name:'sm_name',column_index:'5'});
	serc_mngr_data=duplication_removel(serc_mngr_data,a, 2, collist);

	service_engg_dS=new kendo.data.DataSource({data:srvc_engg_data});

	$("#se_schedule_service_manager").kendoDropDownList({
	dataTextField: "sm_name",
	dataValueField: "sm_empid",
	dataSource:serc_mngr_data,
	template:'${data.sm_empid}'+'-'+'${data.sm_name}',
	close: function(){
	var se_manager = this.value();

	service_engg_dS.filter({
	field: "service_manager_emp_id",
	operator: "eq",
	value: se_manager
	});
	$("#se_schedule_service_engineer").data('kendoDropDownList').enable(true);
	}
	});

	$("#se_schedule_service_engineer").kendoDropDownList({
	dataTextField: "service_engineer_name",
	dataValueField: "service_engineer_emp_id",
	dataSource:service_engg_dS,
	enable:false,
	template:'${data.service_engineer_emp_id}'+'-'+'${data.service_engineer_name}',
	change: function() {*/
	/*eng_fil = 'var filter = {logic: "or",filters: [';
	var engg_filter = this.value();
	for(var i=0; i<engg_filter.length; i++)
{
	eng_fil += '{ field: "assigned_to_emp_id", operator: "eq", value: "'+engg_filter[i]+'" },';
	}
	eng_fil += ']};';
	eval(eng_fil);
	scheduler = $("#scheduler").data("kendoScheduler");

	scheduler.dataSource.filter(filter);*/
	/* }
	});

	se_schedule_service_manager_dd = $("#se_schedule_service_manager").data('kendoDropDownList');
	se_schedule_service_engineer_dd = $("#se_schedule_service_engineer").data('kendoDropDownList');*/

	/* DROPDOWNLIST INITIALIZATION - Employee */
	se_schedule_service_engineer = InitializeKendoDropDownList({
		fieldID : "se_schedule_service_engineer",
		dataSource : {
			applicationName : "common_modules",
			serviceName : "retrieve_listof_values_for_codes",
			inputParameter : {
				p_lov_code_type : "CALL_ASSIGNTO_LIST",
				p_search_field_1 : "",
				p_search_field_2 : ""
			}
		},
		dataTextField : "p_code_value_description",
		dataValueField : "p_code_value",
		filterMode : false,
		events : {
			change : "se_schedule_service_engineer_change"
		}
	});

	//se_availability_dSource = new kendo.data.SchedulerDataSource([]);
	se_scheduler_array = [];

	$('#se_schedule_retrieve_btn').on('click', function () {
		se_scheduler_array = [];
		customer_id = 'ALL';
		equipment_id = 'ALL';
		asset_id = 'ALL';
		asset_location = 'ALL';
		priority_code = 'ALL';
		call_logged_by_user = 'ALL';
		srvc_org_level_no_val = 'ALL';
		srvc_org_level_cd_val = 'ALL';
		srvc_engineer_val = se_schedule_service_engineer_dd.value();
		se_manager_val = se_schedule_service_manager_dd.value();
		status_code_val = 'ALL';

		var s_c_list = executeService_retrieve_manage_service_call_list();

		if (s_c_list == '1') {
			return 1;
		} else {
			sc_list = loadXMLString(s_c_list);

			scall_dSource = new kendo.data.DataSource({
					data : sc_list,
					pageSize : 10,
					schema : {
						// specify the the schema is XML
						type : "xml",
						// the XML element which represents a single data record
						data : "list/scall",
						// define the model - the object which will represent a single data record
						model : {
							// configure the fields of the object
							fields : {
								// the "title" field is mapped to the text of the "title" XML element
								slno : "slno/text()",
								s_call_no : "s_call_no/text()",
								cust_id : "cust_id/text()",
								equipment_id : "equipment_id/text()",
								asset_id : "asset_id/text()",
								priority_cd : "priority_cd/text()",
								cust_contact : "cust_contact/text()",
								call_logged_user_id : "call_logged_user_id/text()",
								call_logged_on_date : "call_logged_on_date/text()",
								call_logged_on_time : "call_logged_on_time/text()",
								s_call_status : "s_call_status/text()",
								s_call_status_desc : "s_call_status_desc/text()",
								assigned_to_name : "assigned_to_name/text()",
								assigned_to_emp_id : "assigned_to_emp_id/text()",
								jo_no : "jo_no/text()",
								jo_creation_date : "jo_creation_date/text()"
							}
						}
					}
				});
			scall_dSource.read();
			servicecall_avl_data = scall_dSource.data();

			for (var i = 0; i < servicecall_avl_data.length; i++) {
				se_scheduler_array.push({
					id : servicecall_avl_data[i].slno,
					type : "SC",
					title : servicecall_avl_data[i].s_call_no,
					start : new Date(servicecall_avl_data[i].call_logged_on_date + " " + servicecall_avl_data[i].call_logged_on_time),
					end : new Date(servicecall_avl_data[i].call_logged_on_date + " " + servicecall_avl_data[i].call_logged_on_time),
					assigned_to : servicecall_avl_data[i].assigned_to_emp_id,
					image : "../images/service_call_24.png"
				});
			}
		}
		var value = executeService_retrieve_joborder_list();

		if (value.header == 'SP001') {
			return 1;
		} else {
			jo_list = loadXMLString(value.detail);

			jo_dSource = new kendo.data.DataSource({
					data : jo_list,
					pageSize : 10,
					schema : {
						// specify the the schema is XML
						type : "xml",
						// the XML element which represents a single data record
						data : "list/job",
						// define the model - the object which will represent a single data record
						model : {
							// configure the fields of the object
							fields : {
								// the "title" field is mapped to the text of the "title" XML element
								// job-slno: "job-slno/text()",//throws error cause of hyphen '-'
								jobid : "jobid/text()",
								rag : "rag/text()",
								description : "description/text()",
								customer : "customer/text()",
								assetlocation : "assetlocation/text()",
								asset : "asset/text()",
								equipmentdesc : "equipmentdesc/text()",
								jo_status : "jo_status/text()",
								template_id : "template_id/text()",
								p_st_dt : "p_st_dt/text()",
								p_st_hr : "p_st_hr/text()",
								p_st_min : "p_st_min/text()",
								p_fin_dt : "p_fin_dt/text()",
								p_fin_hr : "p_fin_hr/text()",
								p_fin_min : "p_fin_min/text()",
								a_st_dt : "a_st_dt/text()",
								a_st_hr : "a_st_hr/text()",
								a_st_min : "a_st_min/text()",
								a_fin_dt : "a_fin_dt/text()",
								a_fin_hr : "a_fin_hr/text()",
								a_fin_min : "a_fin_min/text()",
								e_st_dt : "e_st_dt/text()",
								e_st_hr : "e_st_hr/text()",
								e_st_min : "e_st_min/text()",
								e_fin_dt : "e_fin_dt/text()",
								e_fin_hr : "e_fin_hr/text()",
								e_fin_min : "e_fin_min/text()",
								smanager_emp_id : "smanager_emp_id/text()",
								sengineer_emp_id : "sengineer_emp_id/text()"
							}
						}
					}
				});
			jo_dSource.read();
			jo_avl_data = jo_dSource.data();

			for (var i = 0; i < jo_avl_data.length; i++) {
				if (jo_avl_data[i].jo_status != 'C') {
					se_scheduler_array.push({
						id : jo_avl_data[i].jobid,
						type : "JO",
						title : jo_avl_data[i].jobid,
						start : new Date(jo_avl_data[i].p_st_dt + " " + jo_avl_data[i].p_st_hr + ":" + jo_avl_data[i].p_st_min),
						end : new Date(jo_avl_data[i].p_fin_dt + " " + jo_avl_data[i].p_fin_hr + ":" + jo_avl_data[i].p_fin_min),
						assigned_to : jo_avl_data[i].sengineer_emp_id,
						image : "../images/job_order_24.png"
					});
				}
			}
		}
		se_availability_dSource = new kendo.data.SchedulerDataSource({
				data : se_scheduler_array
			});
		se_scheduler.setDataSource(se_availability_dSource);

		/*eng_fil = 'var filter = {logic: "and",filters: [';
		for(var i=0; i<engg_filter.length; i++){
		eng_fil += '{ field: "assigned_to", operator: "eq", value: "'+srvc_engineer_val+'" },{ field: "assigned_to", operator: "neq", value: "" }';
		}
		eng_fil += ']};';
		eval(eng_fil);*/

		var filter = {
			logic : "or",
			filters :
			[{
					operator : "eq",
					field : "assigned_to",
					value : srvc_engineer_val
				}, {
					operator : "neq",
					field : "assigned_to",
					value : ''
				}
			]
		};

		se_scheduler.dataSource.filter(filter);
	});
	$("#se_scheduler").kendoScheduler({
		date : new Date(),
		editable : {
			template : $("#se_avl_editor").html()
		},
		views : [
			"day", {
				type : "month",
				selected : true
			},
			"week",
			"agenda"
		],
		eventTemplate : $("#se_avl_event-template").html(),
		edit : function () {
			$('.k-scheduler-update').css('display', 'none');
			$('.k-scheduler-cancel').css('display', 'none');
			$('.k-edit-buttons').css('display', 'none');

			var scheduler_uid = this._editContainer[0].attributes[0].nodeValue;
			var scheduler_model = se_availability_dSource.getByUid(scheduler_uid);
			if (scheduler_model.type == 'SC') {
				console.log(this._editContainer[0].children);
				slctd_srvc_call_no = scheduler_model.title;
				/*scall_details = executeService_retrieve_manage_service_call_details();

				serv_call_details = loadXMLString(scall_details);
				scall_Details_dSource = new kendo.data.DataSource({
						data : serv_call_details,
						schema : {
							// specify the the schema is XML
							type : "xml",
							// the XML element which represents a single data record
							data : "list/scall_detail",
							// define the model - the object which will represent a single data record
							model : {
								// configure the fields of the object
								fields : {
									// the "title" field is mapped to the text of the "title" XML element
									cust_id : "cust_id/text()",
									equipment_id : "equipment_id/text()",
									asset_id : "asset_id/text()",
									asset_loc_reported : "asset_loc_reported/text()",
									priority_cd : "priority_cd/text()",
									cust_contact : "cust_contact/text()",
									call_logged_user_id : "call_logged_user_id/text()",
									call_logged_on_date : "call_logged_on_date/text()",
									call_logged_on_time : "call_logged_on_time/text()",
									prob_desc : "prob_desc/text()",
									s_call_status : "s_call_status/text()",
									serv_org_level_no : "serv_org_level_no/text()",
									serv_org_level_code : "serv_org_level_code/text()",
									s_call_status_desc : "s_call_status_desc/text()",
									jo_no : "jo_no/text()",
									jo_creation_status : "jo_creation_status/text()",
									rec_tstamp : "rec_tstamp/text()",
									jo_creation_date : "jo_creation_date/text()"
								}
							}
						}

					});
				scall_Details_dSource.read();*/
				/* MANAGE SE SCHEDULAR DATASOURCE 2 */
	se_scheduler_datasource_2 = new kendo.data.DataSource(
	{
		pageSize: 10,
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'json',
				contentType: "application/json; charset=utf-8",				
				url: GetTransportUrl("mservice","retrieve_manage_service_call_details","context/outputparam_detail"),
				complete: function(data, textstatus)
				{
					var returnValue = ProcessTransportResponse(data, textstatus);
					
					scall_details_data = se_scheduler_datasource_2.data()[0];
					$('#atr1').css('display', 'block').val(scall_details_data.cust_id);
					$('#lbl_atr1').css('display', 'block').text('Customer :');
					$('#atr2').css('display', 'block').val(scall_details_data.cust_contact);
					$('#lbl_atr2').css('display', 'block').text('Contact :');
					$('#atr3').css('display', 'block').val(scall_details_data.asset_id);
					$('#lbl_atr3').css('display', 'block').text('Asset :');
					$('#atr4').css('display', 'block').val(scall_details_data.equipment_id);
					$('#lbl_atr4').css('display', 'block').text('Equipment :');
					$('#atr5').css('display', 'block').val(scall_details_data.asset_loc_reported);
					$('#lbl_atr5').css('display', 'block').text('Location :');
					$('#atr6').css('display', 'block').val(scall_details_data.serv_org_level_no);
					$('#lbl_atr6').css('display', 'block').text('Org. Level :');
					$('#atr7').css('display', 'block').val(scall_details_data.serv_org_level_code);
					$('#lbl_atr7').css('display', 'block').text('Org. Level Code :');
					$('#atr8').css('display', 'block').val(scall_details_data.priority_cd);
					$('#lbl_atr8').css('display', 'block').text('Priority :');
					$('#atr9').css('display', 'block').val(scall_details_data.prob_desc);
					$('#lbl_atr9').css('display', 'block').text('Problem :');
					$('#atr10').css('display', 'block').val(scall_details_data.call_logged_user_id);
					$('#lbl_atr10').css('display', 'block').text('Call Logged By :');
					$('#atr11').css('display', 'block').val(scall_details_data.s_call_status_desc);
					$('#lbl_atr11').css('display', 'block').text('Status :');
				}
			},
			parameterMap: function(data, type) 
			{	
				if (type == "read") 
				{	
					test_data = data;
					return GetTransportParameter({inputparam:
					{
						p_service_call_ref_no: slctd_srvc_call_no
					}});
				}
			}
		},
		schema: 
		{
			model: 
			{
				id: "cust_id",
				fields: 
				{
					cust_id : {editable: true},
					equipment_id : {editable: true},
					asset_id : {editable: true},
					asset_loc_reported : {editable: true},
					priority_cd : {editable: true},
					cust_contact : {editable: true},
					call_logged_user_id : {editable: true},
					call_logged_on_date : {editable: true},
					call_logged_on_time : {editable: true},
					prob_desc : {editable: true},
					s_call_status : {editable: true},
					serv_org_level_no : {editable: true},
					serv_org_level_code : {editable: true},
					s_call_status_desc : {editable: true},
					jo_no : {editable: true},
					jo_creation_status : {editable: true},
					rec_tstamp : {editable: true},
					jo_creation_date : {editable: true}
				}
			}
		}
	});		
		se_scheduler_datasource_2.read();
				//scall_details_data = scall_Details_dSource.at(0);
				
			} else if (scheduler_model.type == 'JO') {
				upd_jOrder_ind = '';
				job_profile.job_id = scheduler_model.title;
				for (var i = 0; i < jo_avl_data.length; i++) {
					if (jo_avl_data[i].jobid == scheduler_model.title) {
						job_profile.template_id = jo_avl_data[i].template_id;
						var asset = jo_avl_data[i].asset;
						var equipmentdesc = jo_avl_data[i].equipmentdesc;
						/*	}
						}

						joborder_s_det = executeService_retrieve_manage_jo_details();
						if (joborder_s_det == '1') {
						return 1;
						}
						newjo_detail1 = loadXMLString(joborder_s_det.detail);
						jo_details_dsource = new kendo.data.DataSource({
						data: newjo_detail1,
						pageSize: 10,
						schema: {
						type: "xml",
						data: "list/task",
						model: {
						fields: {
						task_id: "task_id/text()",
						task_code: "task_code/text()",
						task_description: "task_description/text()",
						plan_duration: "plan_duration/text()",
						plan_duration_uom: "plan_duration_uom/text()",
						uom_desc: "uom_desc/text()",
						noof_resources: "noof_resources/text()",
						predecessors: "predecessors/text()",
						task_owner: "task_owner/text()",
						act_start_date:"act_start_date/text()",
						act_start_hour:"act_start_hour/text()",
						act_start_minute: "act_start_minute/text()",
						act_finish_hour:"act_finish_hour/text()",
						act_finish_date:"act_finish_date/text()",
						act_finish_minute:"act_finish_minute/text()",
						sch_start_date:"sch_start_date/text()",
						sch_start_hour:"sch_start_hour/text()",
						sch_start_minute:"sch_start_minute/text()",
						sch_finish_hour:"sch_finish_hour/text()",
						sch_finish_date: "sch_finish_date/text()",
						sch_finish_minute:"act_start_hour/text()",
						}
						}
						}
						});
						jo_details_dsource.read();
						jo_details_data = jo_details_dsource.at(0);
						 */
						$('#atr1').css('display', 'block').val(jo_avl_data[i].description);
						$('#lbl_atr1').css('display', 'block').text('Description :');
						$('#atr2').css('display', 'block').val(jo_avl_data[i].customer);
						$('#lbl_atr2').css('display', 'block').text('Customer :');
						$('#atr3').css('display', 'block').val(jo_avl_data[i].asset);
						$('#lbl_atr3').css('display', 'block').text('Asset :');
						$('#atr4').css('display', 'block').val(jo_avl_data[i].equipmentdesc);
						$('#lbl_atr4').css('display', 'block').text('Equipment :');
						$('#atr5').css('display', 'block').val(jo_avl_data[i].assetlocation);
						$('#lbl_atr5').css('display', 'block').text('Location :');
						$('#atr6').css('display', 'block').val(jo_avl_data[i].template_id);
						$('#lbl_atr6').css('display', 'block').text('Template ID:');
						$('#atr7').css('display', 'block').val(jo_avl_data[i].jo_status);
						$('#lbl_atr7').css('display', 'block').text('JO Status :');
						$('#lbl_atr8').parent().hide();
						$('#lbl_atr9').parent().hide();
						$('#lbl_atr10').parent().hide();
						$('#lbl_atr11').parent().hide();
					}
				}
			}
		}
	});
	se_scheduler = $("#se_scheduler").data("kendoScheduler");
}
function se_schedule_service_engineer_change() {
	se_scheduler_array = [];
	/*customer_id = 'ALL';
	equipment_id = 'ALL';
	asset_id = 'ALL';
	asset_location = 'ALL';
	priority_code = 'ALL';
	call_logged_by_user = 'ALL';
	srvc_org_level_no_val = 'ALL';
	srvc_org_level_cd_val = 'ALL';*/
	srvc_engineer_val = se_schedule_service_engineer.value();
	//se_manager_val = se_schedule_service_manager_dd.value();
	/*se_manager_val = '';
	status_code_val = 'ALL';*/

	/*var s_c_list = executeService_retrieve_manage_service_call_list();

	if (s_c_list == '1') {
		return 1;
	} else {
		sc_list = loadXMLString(s_c_list);

		scall_dSource = new kendo.data.DataSource({
				data : sc_list,
				pageSize : 10,
				schema : {
					// specify the the schema is XML
					type : "xml",
					// the XML element which represents a single data record
					data : "list/scall",
					// define the model - the object which will represent a single data record
					model : {
						// configure the fields of the object
						fields : {
							// the "title" field is mapped to the text of the "title" XML element
							slno : "slno/text()",
							s_call_no : "s_call_no/text()",
							cust_id : "cust_id/text()",
							equipment_id : "equipment_id/text()",
							asset_id : "asset_id/text()",
							priority_cd : "priority_cd/text()",
							cust_contact : "cust_contact/text()",
							call_logged_user_id : "call_logged_user_id/text()",
							call_logged_on_date : "call_logged_on_date/text()",
							call_logged_on_time : "call_logged_on_time/text()",
							s_call_status : "s_call_status/text()",
							s_call_status_desc : "s_call_status_desc/text()",
							assigned_to_name : "assigned_to_name/text()",
							assigned_to_emp_id : "assigned_to_emp_id/text()",
							jo_no : "jo_no/text()",
							jo_creation_date : "jo_creation_date/text()"
						}
					}
				}
			});
		scall_dSource.read();
		servicecall_avl_data = scall_dSource.data();*/
	/* MANAGE SE SCHEDULAR DATASOURCE 1 */
	se_scheduler_datasource_1 = new kendo.data.DataSource(
	{
		pageSize: 10,
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'json',
				contentType: "application/json; charset=utf-8",				
				url: GetTransportUrl("mservice","retrieve_manage_service_call_list","context/outputparam_detail"),
				complete: function(data, textstatus)
				{
					var returnValue = ProcessTransportResponse(data, textstatus);
					for (var i = 0; i < se_scheduler_datasource_1.data().length; i++) {
						se_scheduler_array.push({
							id : se_scheduler_datasource_1.data()[i].slno,
							type : "SC",
							title : se_scheduler_datasource_1.data()[i].s_call_no,
							start : new Date(se_scheduler_datasource_1.data()[i].call_logged_on_date + " " + se_scheduler_datasource_1.data()[i].call_logged_on_time),
							end : new Date(se_scheduler_datasource_1.data()[i].call_logged_on_date + " " + se_scheduler_datasource_1.data()[i].call_logged_on_time),
							assigned_to : se_scheduler_datasource_1.data()[i].assigned_to_emp_id,
							image : "../images/service_call_24.png"
						});
					}
					se_availability_dSource = new kendo.data.SchedulerDataSource({
						data : se_scheduler_array
					});
					se_scheduler.setDataSource(se_availability_dSource);
				}
			},
			parameterMap: function(data, type) 
			{	
				if (type == "read") 
				{	
					test_data = data;
					return GetTransportParameter({inputparam:
					{
						p_customer_id_filter: "ALL",
						p_equipment_id_filter: "ALL",
						p_asset_id_filter: "ALL",
						p_asset_location_code_filter: "ALL",
						p_priority_code_filter: "ALL",
						p_call_logged_by_userid_filter: "ALL",
						p_org_level_no_filter: "ALL",
						p_org_level_code_filter: "ALL",
						p_assigned_to_empid_filter: srvc_engineer_val,
						p_reporting_to_empid_filter: "ALL",
						p_mapped_to_empid_filter: "ALL",
						p_status_filter: "ALL"
					}});
				}
			}
		},
		schema: 
		{
			model: 
			{
				id: "s_call_no",
				fields: 
				{
					slno: {editable: true},
					s_call_no: {editable: true},
					cust_id: {editable: true},
					equipment_id: {editable: true},
					asset_id: {editable: true},
					priority_cd: {editable: true},
					cust_contact: {editable: true},
					call_logged_user_id: {editable: true},
					call_logged_on_date: {editable: true},
					call_logged_on_time: {editable: true},
					prob_desc: {editable: true},
					s_call_status: {editable: true},
					s_call_status_desc: {editable: true},
					assigned_to_name: {editable: true},
					jo_no: {editable: true},
					jo_creation_date: {editable: true},
					assigned_to_emp_id: {editable: true},
					jo_status: {editable: true}
				}
			}
		}
	});		
		se_scheduler_datasource_1.read();
		/*console.log(se_scheduler_datasource_1);
		servicecall_avl_data = se_scheduler_datasource_1.data();
		console.log(servicecall_avl_data);*/
		
	//}
	/*var value = executeService_retrieve_joborder_list();

	if (value.header == 'SP001') {
		return 1;
	} else {
		jo_list = loadXMLString(value.detail);

		jo_dSource = new kendo.data.DataSource({
				data : jo_list,
				pageSize : 10,
				schema : {
					// specify the the schema is XML
					type : "xml",
					// the XML element which represents a single data record
					data : "list/job",
					// define the model - the object which will represent a single data record
					model : {
						// configure the fields of the object
						fields : {
							// the "title" field is mapped to the text of the "title" XML element
							// job-slno: "job-slno/text()",//throws error cause of hyphen '-'
							jobid : "jobid/text()",
							rag : "rag/text()",
							description : "description/text()",
							customer : "customer/text()",
							assetlocation : "assetlocation/text()",
							asset : "asset/text()",
							equipmentdesc : "equipmentdesc/text()",
							jo_status : "jo_status/text()",
							template_id : "template_id/text()",
							p_st_dt : "p_st_dt/text()",
							p_st_hr : "p_st_hr/text()",
							p_st_min : "p_st_min/text()",
							p_fin_dt : "p_fin_dt/text()",
							p_fin_hr : "p_fin_hr/text()",
							p_fin_min : "p_fin_min/text()",
							a_st_dt : "a_st_dt/text()",
							a_st_hr : "a_st_hr/text()",
							a_st_min : "a_st_min/text()",
							a_fin_dt : "a_fin_dt/text()",
							a_fin_hr : "a_fin_hr/text()",
							a_fin_min : "a_fin_min/text()",
							e_st_dt : "e_st_dt/text()",
							e_st_hr : "e_st_hr/text()",
							e_st_min : "e_st_min/text()",
							e_fin_dt : "e_fin_dt/text()",
							e_fin_hr : "e_fin_hr/text()",
							e_fin_min : "e_fin_min/text()",
							smanager_emp_id : "smanager_emp_id/text()",
							sengineer_emp_id : "sengineer_emp_id/text()"
						}
					}
				}
			});
		jo_dSource.read();
		jo_avl_data = jo_dSource.data();

		for (var i = 0; i < jo_avl_data.length; i++) {
			if (jo_avl_data[i].jo_status != 'C') {
				se_scheduler_array.push({
					id : jo_avl_data[i].jobid,
					type : "JO",
					title : jo_avl_data[i].jobid,
					start : new Date(jo_avl_data[i].p_st_dt + " " + jo_avl_data[i].p_st_hr + ":" + jo_avl_data[i].p_st_min),
					end : new Date(jo_avl_data[i].p_fin_dt + " " + jo_avl_data[i].p_fin_hr + ":" + jo_avl_data[i].p_fin_min),
					assigned_to : jo_avl_data[i].sengineer_emp_id,
					image : "../images/job_order_24.png"
				});
			}
		}
	}*/
	

	/*eng_fil = 'var filter = {logic: "and",filters: [';
	for(var i=0; i<engg_filter.length; i++){
	eng_fil += '{ field: "assigned_to", operator: "eq", value: "'+srvc_engineer_val+'" },{ field: "assigned_to", operator: "neq", value: "" }';
	}
	eng_fil += ']};';
	eval(eng_fil);*/

	var filter = {
		logic : "or",
		filters :
		[{
				operator : "eq",
				field : "assigned_to",
				value : srvc_engineer_val
			}, {
				operator : "neq",
				field : "assigned_to",
				value : ''
			}
		]
	};

	se_scheduler.dataSource.filter(filter);
}
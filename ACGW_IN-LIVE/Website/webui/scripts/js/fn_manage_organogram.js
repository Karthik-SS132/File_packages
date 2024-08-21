function fn_manage_organogram_loadScripts() {
	return LoadJSScripts(["../../s_iscripts/retrieve_manage_organogram.js", "../../s_iscripts/save_manage_organogram_level.js", "../../s_iscripts/save_manage_organogram_supervisor.js"]);
}

function fn_manage_organogram() {
	/* VALIDATING LEVEL CODE */
	$("#manage_organogram_level_code").on('blur',function() {	   
		if($(this).val() != "") {
			var selectedObject = manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid"));
			var task_valid_ind = ValidateKeyField("manage_organogram_level_code", "ORGANOGRAM", "Level " + selectedObject.levelNumber, $(this).val());
			
		}
	});
	
	fn_manage_organogram_refresh();
	
	/* INITIALIZING KENDO SPLITTER */
	$("#manage_organogram_splitter").kendoSplitter({
		panes: [{
			collapsible: false,
			size: "200px",
			resizable: false
		}, {
			collapsible: false,
			resizable: false
		}]
	});
	
	/* INITIALIZING KENDO TREE VIEW */
	$("#manage_organogram_splitter_left_pane").kendoTreeView({
		dataSource: manage_organogram_dataSource_1,
		change: fn_manage_organogram_splitter_left_pane_event_change
	});
	manage_organogram_splitter_left_pane = $("#manage_organogram_splitter_left_pane").data("kendoTreeView");	
	
	/* GRID INITIALIZATION */
	var temp_array = new kendo.data.ObservableArray([]);
	var manage_organogram_datasource_2_temp =  new kendo.data.DataSource({data : temp_array, pageSize : 10});		
	manage_organogram_grid_1 = InitializeKendoGrid({
		sectionID: "manage_organogram_detail_1",
		toolbar: false,
		dataSource: manage_organogram_datasource_2_temp,
		height: 400,
		pageSize: 10,
		selectable: false
	});
	
	/* DROP DOWN LIST INITIALIZATION - HEAD EMPLOYEE ID */
	manage_organogram_head_employee_id = InitializeKendoComboBox({
		fieldID: "manage_organogram_head_employee_id",
		dataSource: {
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_codes",
			inputParameter: {
				p_lov_code_type : "EMPLOYEELIST",
				p_search_field_1 : "",
				p_search_field_2 : ""
			}
		},
		dataTextField: "p_code_value_description",
		dataValueField: "p_code_value",
		filterMode: false
	});
	
	/* DROP DOWN LIST INITIALIZATION - SUPERVISOR ID */
	manage_organogram_supervisor_id = InitializeKendoComboBox({
		fieldID: "manage_organogram_supervisor_id",
		dataSource: {
			applicationName: "common_modules",
			serviceName: "retrieve_listof_values_for_codes",
			inputParameter: {
				p_lov_code_type : "EMPLOYEELIST",
				p_search_field_1 : "",
				p_search_field_2 : ""
			}
		},
		dataTextField: "p_code_value_description",
		dataValueField: "p_code_value",
		filterMode: false
	});
	
	$("#manage_organogram_save_btn").click(function() {
		fn_manage_organogram_save_btn_click();
	});
	
	$("#manage_organogram_delete_btn").click(function() {
		fn_manage_organogram_delete_btn_click();
	});
	
	AttachValidationRules("manage_organogram");
	ApplyConfiguredLabels("manage_organogram");
	
	$("#organogram_details").hide();
	$("#supervisor_details").hide();
	$("#button_collection").hide();
	$("#manage_organogram_grid_1").hide();
}

function fn_manage_organogram_splitter_left_pane_event_change() {
	var selectedObject = manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid"));
	$("#organogram_details").hide();
	$("#supervisor_details").hide();
	$("#button_collection").hide();
	$("#manage_organogram_grid_1").hide();
	$(".k-invalid-msg").hide();
	
	if (selectedObject.type == "LEVEL") {
		/* MANAGING RIGHT PANE DISPLAY */
		$("#organogram_details").show();
		$("#button_collection").show();		
		$("#manage_organogram_supervisor_id").val("NA");
		$('.display_description[data-for = "manage_organogram_head_employee_id"]').text('');
		if (!selectedObject.text.match("ADD")) {
			$("#manage_organogram_save_btn").show();
			$("#manage_organogram_delete_btn").show();
			$("#manage_organogram_level_code").val(selectedObject.levelCode).attr('disabled','disabled').css({backgroundColor:"#F5F5F5"});
			$("#manage_organogram_level_description").val(selectedObject.text);
			manage_organogram_head_employee_id.value(selectedObject.headEmployeeID);
			
			$("#manage_organogram_grid_1").show();
			fn_manage_organogram_view_employee_list();
		}
		else {
			$("#manage_organogram_save_btn").show();
			$("#manage_organogram_delete_btn").hide();			
			$("#manage_organogram_level_code").val("").attr('disabled', false).css({backgroundColor:"#FFFFFF"});
			$("#manage_organogram_level_description").val("");
			manage_organogram_head_employee_id.value("");
		}
	}
	else if (selectedObject.type == "SUPERVISOR") {
		/* MANAGING RIGHT PANE DISPLAY */
		$("#supervisor_details").show();
		$("#button_collection").show();
		$("#manage_organogram_level_code").val("NA");
		$("#manage_organogram_level_description").val("NA");
		$("#manage_organogram_head_employee_id").val("NA");
		$('.display_description[data-for = "manage_organogram_supervisor_id"]').text('');
		if (!selectedObject.text.match("ADD")) {
			$("#manage_organogram_save_btn").hide();
			$("#manage_organogram_delete_btn").show();
			manage_organogram_supervisor_id.value(selectedObject.text);
			manage_organogram_supervisor_id.enable(false);
			
			$("#manage_organogram_grid_1").show();
			fn_manage_organogram_view_employee_list();
		}
		else {
			$("#manage_organogram_save_btn").show();
			$("#manage_organogram_delete_btn").hide();
			manage_organogram_supervisor_id.value("");
			manage_organogram_supervisor_id.enable(true);
		}
	}
}

function fn_manage_organogram_view_employee_list() {
	var temp_array = new kendo.data.ObservableArray([]);
	var manage_organogram_datasource_2_temp =  new kendo.data.DataSource({data : temp_array, pageSize : 10});
	manage_organogram_grid_1.setDataSource(manage_organogram_datasource_2_temp);
	
	/* LOADING ORGANOGRAM EMPLOYEE GRID */
	var selectedObject = manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid"));
	var retrieve_listof_values_object = {
		p_lov_code: "",
		p_search_field_1: "",
		p_search_field_2: "",
		p_search_field_3: "",
		p_search_field_4: "",
		p_search_field_5: ""
	};
	if (selectedObject.type == "LEVEL") {
		retrieve_listof_values_object.p_lov_code = "ORGLEVELEMPLOYEELIST";
		retrieve_listof_values_object.p_search_field_1 = selectedObject.levelNumber.toString();
		retrieve_listof_values_object.p_search_field_2 = selectedObject.levelCode;
	}
	else if (selectedObject.type == "SUPERVISOR") {
		retrieve_listof_values_object.p_lov_code = "ORGSUPVSREMPLOYEELIST";
		retrieve_listof_values_object.p_search_field_1 = selectedObject.levelNumber.toString();
		retrieve_listof_values_object.p_search_field_2 = selectedObject.parentNode().parentNode().levelCode;
		retrieve_listof_values_object.p_search_field_3 = selectedObject.value;		
	}
	
	var employeeList = executeService_retrieve_listof_values(retrieve_listof_values_object);
	if (employeeList.length == 0) {
		alert ("No records found.");		
	}
	else {
		var manage_organogram_datasource_2 =  new kendo.data.DataSource({data : employeeList, pageSize : 10});		
		manage_organogram_grid_1.setDataSource(manage_organogram_datasource_2);
	}
}

function fn_manage_organogram_save_btn_click() {
	var selectedObject = manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid"));
		
	if ($("#manage_organogram").data("kendoValidator").validate()) {
		if (selectedObject.type == "LEVEL") {
			var save_manage_organogram_level_object = {
				p_level1_code: "",
				p_level2_code: "",
				p_level3_code: "",
				p_level4_code: "",
				p_level5_code: "",
				p_level_no: selectedObject.levelNumber,
				p_level_code: $("#manage_organogram_level_code").val(),
				p_level_head_emp_id: $("#manage_organogram_head_employee_id").val(),
				p_level_code_description: $("#manage_organogram_level_description").val()
			};
			
			if (selectedObject.levelNumber == 2) {
				save_manage_organogram_level_object.p_level1_code = selectedObject.parentNode().levelCode;
			}
			else if (selectedObject.levelNumber == 3) {
				save_manage_organogram_level_object.p_level1_code = selectedObject.parentNode().parentNode().levelCode;
				save_manage_organogram_level_object.p_level2_code = selectedObject.parentNode().levelCode;
			}
			else if (selectedObject.levelNumber == 4) {
				save_manage_organogram_level_object.p_level1_code = selectedObject.parentNode().parentNode().parentNode().levelCode;
				save_manage_organogram_level_object.p_level2_code = selectedObject.parentNode().parentNode().levelCode;
				save_manage_organogram_level_object.p_level3_code = selectedObject.parentNode().levelCode;
			}
			else if (selectedObject.levelNumber == 5) {
				save_manage_organogram_level_object.p_level1_code = selectedObject.parentNode().parentNode().parentNode().parentNode().levelCode;
				save_manage_organogram_level_object.p_level2_code = selectedObject.parentNode().parentNode().parentNode().levelCode;
				save_manage_organogram_level_object.p_level3_code = selectedObject.parentNode().parentNode().levelCode;
				save_manage_organogram_level_object.p_level4_code = selectedObject.parentNode().levelCode;
			}
			
			if (selectedObject.text.match("ADD")) {
				save_manage_organogram_level_object.p_save_mode = "A";
			}
			else {
				save_manage_organogram_level_object.p_save_mode = "U";
			}
			
			var returnValue = executeService_save_manage_organogram_level(save_manage_organogram_level_object);
			if (returnValue == "SP001") {
				alert("Organogram Level Detail Saved Successfully");
				//fn_manage_organogram_refresh();
				//manage_organogram_splitter_left_pane.setDataSource(manage_organogram_dataSource_1);
				//$("#organogram_details").hide();
				//$("#supervisor_details").hide();
				//$("#button_collection").hide();
				//$("#manage_organogram_grid_1").hide();
				if(selectedObject.crudIndicator != 'R')
				{
					manage_organogram_splitter_left_pane.insertBefore({text:$('#manage_organogram_level_description').val()},manage_organogram_splitter_left_pane.select());
					
					manage_organogram_splitter_left_pane.select(manage_organogram_splitter_left_pane.select().prev());
					
					manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).type = 'LEVEL';
					manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).levelNumber = selectedObject.levelNumber;
					manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).levelCode = $('#manage_organogram_level_code').val();
					manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).crudIndicator = 'R';
					manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).value = $('#manage_organogram_level_code').val();
					manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).headEmployeeID = manage_organogram_head_employee_id.dataItem().p_code_value;
					
					var supervisorNode= manage_organogram_splitter_left_pane.append({text:"Supervisor"},manage_organogram_splitter_left_pane.select());
					
					manage_organogram_splitter_left_pane.select (supervisorNode);
					// manage_organogram_splitter_left_pane.select (manage_organogram_splitter_left_pane.select().children('ul').children('li') );
					var newNode = manage_organogram_splitter_left_pane.append({text:"ADD"},manage_organogram_splitter_left_pane.select());
				//	 manage_organogram_splitter_left_pane.select (manage_organogram_splitter_left_pane.select().children('ul').children('li') );
					manage_organogram_splitter_left_pane.select(newNode);
					
					
					//manage_organogram_splitter_left_pane.select(manage_organogram_splitter_left_pane.select().next());
					var parent = manage_organogram_splitter_left_pane.parent(manage_organogram_splitter_left_pane.select());
					
					manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).levelNumber = manage_organogram_splitter_left_pane.text(manage_organogram_splitter_left_pane.parent(parent));
					manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).type = 'SUPERVISOR';
					manage_organogram_splitter_left_pane.select(manage_organogram_splitter_left_pane.select().next());
				}
				else
				{
					manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).text = $('#manage_organogram_level_description').val();
					manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).headEmployeeID = manage_organogram_head_employee_id.dataItem().p_code_value;
					manage_organogram_splitter_left_pane.findByUid(manage_organogram_splitter_left_pane.select().data("uid")).find(".k-in.k-state-selected").text($('#manage_organogram_level_description').val());
					
				}
				fn_manage_organogram_refresh();
				manage_organogram_splitter_left_pane.dataSource.view();
				
			}
			else {
				alert("Failed to Save the Organogram Level Detail");
			}
		}
		else if (selectedObject.type == "SUPERVISOR") {
			if($("#manage_organogram_supervisor_id").val() != "") {
				var selectedObject = manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid"));
				var task_valid_ind = ValidateKeyField("manage_organogram_supervisor_id", "ORGANOGRAM_SUPERVISOR", "Level " + selectedObject.levelNumber, $("#manage_organogram_supervisor_id").val());
				if (task_valid_ind == "true") {
					manage_organogram_supervisor_id.value("");
					$('.display_description[data-for = "manage_organogram_supervisor_id"]').text('');
					return false;
				}
			}
			var save_manage_organogram_supervisor_object = {
				p_level1_code: "",
				p_level2_code: "",
				p_level3_code: "",
				p_level4_code: "",
				p_level5_code: "",
				p_level_no: selectedObject.levelNumber,
				p_level_code: selectedObject.parentNode().parentNode().levelCode,
				p_supervisor_emp_id: $("#manage_organogram_supervisor_id").val(),
				p_save_mode: "A"
			};
			
			if (selectedObject.levelNumber == 2) {
				save_manage_organogram_supervisor_object.p_level1_code = selectedObject.parentNode().parentNode().parentNode().levelCode;
			}
			else if (selectedObject.levelNumber == 3) {
				save_manage_organogram_supervisor_object.p_level1_code = selectedObject.parentNode().parentNode().parentNode().parentNode().levelCode;
				save_manage_organogram_supervisor_object.p_level2_code = selectedObject.parentNode().parentNode().parentNode().levelCode;
			}
			else if (selectedObject.levelNumber == 4) {
				save_manage_organogram_supervisor_object.p_level1_code = selectedObject.parentNode().parentNode().parentNode().parentNode().parentNode().levelCode;
				save_manage_organogram_supervisor_object.p_level2_code = selectedObject.parentNode().parentNode().parentNode().parentNode().levelCode;
				save_manage_organogram_supervisor_object.p_level3_code = selectedObject.parentNode().parentNode().parentNode().levelCode;
			}
			else if (selectedObject.levelNumber == 5) {
				save_manage_organogram_supervisor_object.p_level1_code = selectedObject.parentNode().parentNode().parentNode().parentNode().parentNode().parentNode().levelCode;
				save_manage_organogram_supervisor_object.p_level2_code = selectedObject.parentNode().parentNode().parentNode().parentNode().parentNode().levelCode;
				save_manage_organogram_supervisor_object.p_level3_code = selectedObject.parentNode().parentNode().parentNode().parentNode().levelCode;
				save_manage_organogram_supervisor_object.p_level4_code = selectedObject.parentNode().parentNode().parentNode().levelCode;
			}
			
			var returnValue = executeService_save_manage_organogram_supervisor(save_manage_organogram_supervisor_object);
			if (returnValue == "SP001") {
				alert("Supervisor Detail Saved Successfully");

				//manage_organogram_splitter_left_pane.setDataSource(manage_organogram_dataSource_1);
				//$("#organogram_details").hide();
				//$("#supervisor_details").hide();
				//$("#button_collection").hide();
				//$("#manage_organogram_grid_1").hide();
				manage_organogram_splitter_left_pane.insertBefore({text:manage_organogram_supervisor_id.dataItem().p_code_value_description},manage_organogram_splitter_left_pane.select());
				var parent = manage_organogram_splitter_left_pane.parent(manage_organogram_splitter_left_pane.select());
				manage_organogram_splitter_left_pane.select(manage_organogram_splitter_left_pane.select().prev());
				manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).type = manage_organogram_splitter_left_pane.text(parent).toUpperCase();
				manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).levelNumber = selectedObject.levelNumber;
				manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).supervisorCrudIndicator = 'R';
				manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid")).value = $("#manage_organogram_supervisor_id").val();;
		
				fn_manage_organogram_refresh();
				manage_organogram_splitter_left_pane.dataSource.view();
				manage_organogram_splitter_left_pane.select(manage_organogram_splitter_left_pane.select().next());
			}
			else {
				alert("Failed to Save the Supervisor Detail");
			}		
		}
	}
}

function fn_manage_organogram_delete_btn_click() {
	if (confirm("Do you want to delete this record ?")) {
		selectedObject = manage_organogram_splitter_left_pane.dataSource.getByUid(manage_organogram_splitter_left_pane.select().data("uid"));
		selectedObject.load();
		if (selectedObject.type == "LEVEL") {
			if (selectedObject.items[1] == undefined || selectedObject.items[1].levelCode == undefined) {
				selectedObject.items[0].load();
				if (selectedObject.items[0].items[0].text == "ADD") {
					var returnValue = DeleteData("ORGLEVELCODE", selectedObject.levelNumber.toString(), selectedObject.levelCode);
					if (returnValue == 'SP001') {
						alert('Organogram Level Deleted Successfully');
						manage_organogram_splitter_left_pane.remove(manage_organogram_splitter_left_pane.select());
						fn_manage_organogram_refresh();
						manage_organogram_splitter_left_pane.dataSource.view();
						//manage_organogram_splitter_left_pane.setDataSource(manage_organogram_dataSource_1);
						$("#organogram_details").hide();
						$("#supervisor_details").hide();
						$("#button_collection").hide();
						$("#manage_organogram_grid_1").hide();
					}					
				}
				else {
					alert("This Level Code cannot be deleted because it has one or more supervisors linked to it.");
				}
			}
			else {
				alert("This Level Code cannot be deleted because it has one or more child levels linked to it.");
			}
		}
		else if (selectedObject.type == "SUPERVISOR") {
			if (manage_organogram_grid_1.dataSource.data().length == 0) {
				var returnValue = DeleteData("ORGSUPERVISOR", selectedObject.parentNode().parentNode().levelNumber.toString(), selectedObject.parentNode().parentNode().levelCode, selectedObject.text);
				if (returnValue == 'SP001') {
					alert('Supervisor Deleted Successfully');
					fn_manage_organogram_refresh();
				    manage_organogram_splitter_left_pane.remove(manage_organogram_splitter_left_pane.select());
					//manage_organogram_splitter_left_pane.setDataSource(manage_organogram_dataSource_1);
					$("#organogram_details").hide();
					$("#supervisor_details").hide();
					$("#button_collection").hide();
					$("#manage_organogram_grid_1").hide();
				}
			}
			else {
				alert("This Supervisor cannot be deleted because he/she has one or more employee linked to him/her.");
			}
		}
	}	
}

function fn_manage_organogram_refresh() {
	/* RETRIEVING ORGANOGRAM DETAILS */
	var organogramDetails = executeService_retrieve_manage_organogram();	
	var noOfOrgLevels = organogramDetails.noOfOrgLevels;
	
	/* MANAGE ORGANOGRAM DATA SOURCE 1 */
	manage_organogram_dataSource_1 = new kendo.data.HierarchicalDataSource({
		data: organogramDetails.organogramData
	});
}
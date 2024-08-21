function fn_manage_escalation_matrix_loadScripts()
{
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [  "../../s_iscripts/retrieve_listof_task_uom.js",
						 "../../s_iscripts/retrieve_manage_escalation_matrix.js",
						 "../../s_iscripts/save_manage_escalation_matrix.js",
						 "../../s_iscripts/retrieve_listof_org_levels.js",
						 "../../s_iscripts/retrieve_listof_org_level_codes.js",
						 "../../s_iscripts/retrieve_listof_escalation_interval_uom.js",
					//	 "../../s_iscripts/retrieve_listof_employees.js"
					  ];
				
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);
	
	if (loadRetStatus == 1)		return false;
	
	return true;
}
function fn_manage_escalation_matrix()
{
	screenChangeInd='';
	save_mode="";
	org_entity_type=[];
	org_lvl_code_arr=[];
	org_lvlcodes_data=[];
	list_of_org_entities=[];
	esc_metrics_array=new kendo.data.ObservableArray([]);
	selected_esc_rowmodel=0;
	selected_row=0;
	esc_dsource= new kendo.data.DataSource();
	
	list_of_codes = [];
	esc_for_type_array=GetListOfValues(false,"ESCMATRIXTYPE");
	$("#escltn_for_type").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "text",
		dataValueField: "value",
		dataSource:esc_for_type_array ,
		template:'${data.value}'+'-'+'${data.text}',
		change:function()
		{
			$('#manage_escalation_matrix_add').show();
			$('#manage_escalation_matrix_edit').show();
			$('#manage_escalation_matrix_delete').show();
		
			escalation_for_type=$("#escltn_for_type").val();
			escalation_metrics_list_xml=executeService_retrieve_manage_escalation_matrix();
			if (escalation_metrics_list_xml == '1') {
				return 1;
			}
			escalation_metrics_list = loadXMLString(escalation_metrics_list_xml);
			dsource = new kendo.data.DataSource({
			data: escalation_metrics_list,
			pageSize: 10,
			schema: {
				type: "xml",
				data: "list/escalation_record",

				model: {
					fields: {

						type: "type/text()",
						level_id:"level_id/text()",
						esc_id_type: "esc_id_type/text()",
						esc_org_lvl_no: "esc_org_lvl_no/text()",
						esc_id_code: "esc_id_code/text()",
						elapsed_time_since_sla: "elapsed_time_since_sla/text()",
						elapsed_time_uom: "elapsed_time_uom/text()",
						notification_mode: "notification_mode/text()",
						
					}
				}
			}
			
			});
		dsource.read(); 
		
		esc_metrics_array=dsource.data();
		esc_dsource.data(esc_metrics_array);save_mode
		if(esc_metrics_array.length != 0)
		{
			save_mode="U";
		}
		else
		{
			save_mode="A";
		}
		enable_or_disable_Gridbutton();	
		}
		
		});
			esc_dsource = new kendo.data.DataSource({
										autoSync:true,
										data: esc_metrics_array,
										pageSize: 10,
										schema: {
										model: {
											
												fields: {
														type: { editable: false},
														level_id:{ editable: false},
														esc_id_type:{ editable: false},
														esc_org_lvl_no:{ editable: false},
														esc_id_code: { editable: false},
														elapsed_time_since_sla: { editable: false},
														elapsed_time_uom: { editable: false},
														notification_mode:{ editable: false},
														}
												}
												}
										});

		$("#escalation_metrics_grid").kendoGrid({
                        dataSource: esc_dsource,
                        pageable: true,
                        height: 400,
						sortable: true,
                        selectable:"row",
						toolbar: kendo.template($("#escalation-template").html()),
                        columns: [
                        { field:"level_id", title: "Escalation Order ", width: "100px",template:'# if (kendo.toString(level_id) == "") {# #} else {# ${ level_id} #}#' },
						{ field:"esc_id_type", title: "Type", width: "100px",template:'# if (kendo.toString(esc_id_type) == "") {# #} else {# ${ esc_id_type} #}#' },
						{ field:"esc_org_lvl_no", title:"Level NO",  width: "100px" ,template:'# if (kendo.toString(esc_org_lvl_no) == "") {# #} else {# ${ esc_org_lvl_no} #}#'},
						{ field: "esc_id_code", title:"Code",  width: "100px",template:'# if (kendo.toString(esc_id_code) == "") {# #} else {# ${ esc_id_code} #}#' },
						{ field:"elapsed_time_since_sla", title: "Elapsed time since sla", width: "100px" ,template:'# if (kendo.toString(elapsed_time_since_sla) == "") {# #} else {# ${ elapsed_time_since_sla}  ${elapsed_time_uom} #}#'},
						{ field:"notification_mode", title: "Mode", width: "100px",template:'# if (kendo.toString(notification_mode) == "") {# #} else {# ${ notification_mode} #}#' },
						],
						change:function()
						{
						        selected_row=this.select();
						        esc_selected_uid = selected_row.data("uid");
							    selected_esc_rowmodel =esc_dsource.getByUid(esc_selected_uid);
								
						}
								
			});
		
			escalation_metrics_grid =	$("#escalation_metrics_grid").data("kendoGrid");
			$('#manage_escalation_matrix_add').hide();
			$('#manage_escalation_matrix_edit').hide();
			$('#manage_escalation_matrix_delete').hide();
		
	employee_datasource = new kendo.data.DataSource(
	{
		pageSize: 10,
		transport: 
		{
			read: 
			{
				type: "POST",
				dataType: 'json',
				contentType: "application/json; charset=utf-8",				
				url: GetTransportUrl("common_modules","retrieve_listof_employees","context/outputparam"),
				complete: function(data, textstatus)
				{
					var returnValue = ProcessTransportResponse(data, textstatus);
				}
			},
			parameterMap: function(data, type) 
			{	
				return GetTransportParameter({inputparam:{p_org_level_no_filter:"ALL",p_org_level_code_filter:"ALL",p_location_code_filter:"ALL",p_supervisor_emp_id_filter:"ALL"}});
			}
		}
	});
	
	employee_datasource.read();		
			
		$("#manage_escalation_matrix_delete").on('click',function()
		{
		if ( selected_row == 0)
			alert('No Row has been selected');
		else
		{
		
		var isClose = confirm("Are you sure you want to delete the record?");
		if (isClose == true)
		{		
			var deleterow = esc_dsource.getByUid( esc_selected_uid );
			esc_dsource.remove(deleterow);
			j=1;
			for(i=0;i<esc_metrics_array.length;i++)
			{

				var count =j;
				esc_metrics_array[i].level_id =count ;
				
				j++;
			}

			escalation_metrics_grid.dataSource.data(esc_metrics_array);
			selected_esc_rowmodel=0;
		}
		} 
	});
			
	$("#manage_escalation_matrix_add").on("click",function()
	{
		isScreenEditable=true;
		edit_type = 'A';
		value_changed_ind = false;
		
		div_manage_escalation_metrics_child = InitializeKendoWindow(
			{
				fieldID: 'div_manage_escalation_metrics_child',
				windowTitle: 'Escalation Metrics -Add',
				windowHeight: 400,
				windowWidth: 550,
				screenID: 'manage_escalation_matrix_child'
			});

	}); 
	$("#manage_escalation_matrix_edit").on("click",function()
	{
		if (selected_esc_rowmodel == 0)
	    {
		   alert('No Row has been selected');
		}
		else
		{
		  isScreenEditable=true;
		edit_type = 'U';
		value_changed_ind = false;
		div_manage_escalation_metrics_child = InitializeKendoWindow(
			{
				fieldID: 'div_manage_escalation_metrics_child',
				windowTitle: 'Escalation Metrics -Edit',
				windowHeight: 400,
				windowWidth: 550,
				screenID: 'manage_escalation_matrix_child'
			});
		}

	}); 
	
	$("#manage_escalation_matrix_cancel").on("click",function()
	{
	
	  isScreenEditable=false;
	});
	$("#manage_escalation_matrix_submit").on("click",function()
	{
	
	  isScreenEditable=false;
		if(esc_metrics_array.length != 0)
		{
				esc_save_mode = save_mode;
				escltn_for_type=$("#escltn_for_type").val();
				executeService_save_manage_escalation_matrix();
				
				if(esc_update_status == "SP001")
				{
					alert("Data Updated Successfully");
				}
		}
	});
}


function fn_manage_escalation_matrix_child()
{
	if(edit_type == "A")
	{
		$('#escltn_level_id').text(esc_metrics_array.length+1);	
	}
	employee_data=[];
	list_data = employee_datasource.data();
	for(var i=0;i<list_data.length;i++)
	{
		employee_data.push({
			value : list_data[i].emp_id,
			text : list_data[i].emp_name,
		});
	}
	esc_id_type_array=GetListOfValues(false,"NOTIFY_RECIDTYPE");
	$("#escltn_id_type").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "text",
		dataValueField: "value",
		dataSource:esc_id_type_array ,
		template:'${data.value}'+'-'+'${data.text}',
		change:function()
		{
			if(this.value() == "SU")
			{	
				escltn_level_no.value("");
				escltn_id_code.enable(true);
				escltn_level_no.enable(false);
				$("#span_esc_levelno").hide();
				$("#span_escltn_id_code").show();
				escltn_id_code.value("");
				esc_id_code_array=GetListOfValues(false,"SUPVSR");
				escltn_id_code.dataSource.data(esc_id_code_array);
				escltn_id_code.value("");
				$("#escltn_level_no").removeAttr("required");
				$("#escltn_id_code").attr("required","required");
			}
			else if(this.value() == "OR")
			{
				escltn_level_no.enable(true);
				escltn_id_code.enable(false);
				escltn_id_code.value("");
				$("#span_esc_levelno").show();
				$("#span_escltn_id_code").hide();
				$("#escltn_level_no").attr("required","required");
				$("#escltn_id_code").removeAttr("required") ;
			}
			else if(this.value() == "EI")
			{
				escltn_id_code.enable(true);
				escltn_level_no.enable(false);
				escltn_level_no.value("");
				$("#span_esc_levelno").hide();
				$("#span_escltn_id_code").show();
				escltn_id_code.value("");
				escltn_id_code.dataSource.data(employee_data);
				escltn_id_code.value("");
				$("#escltn_level_no").removeAttr("required");
				$("#escltn_id_code").attr("required","required");
			}	
			else
			{
				escltn_id_code.enable(false);
				escltn_level_no.enable(false);
				escltn_id_code.value("");
				escltn_level_no.value("");
				$("#span_esc_levelno").hide();
				$("#span_escltn_id_code").hide();
				$("#escltn_level_no").removeAttr("required");
				$("#escltn_id_code").removeAttr("required");
			}
		}
	});
	escltn_id_type=$("#escltn_id_type").data("kendoDropDownList");
	
	org_levels_data = [];
	executeService_retrieve_listof_org_levels();
	$("#escltn_level_no").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "level_name",
		dataValueField: "level_id",
		dataSource:org_levels_data ,
		template:'${data.level_id}'+'-'+'${data.level_name}',
		change:function()
		{
			esc_id_code_array = [];	
			org_entity_type =this.value();
			executeService_retrieve_listof_org_level_codes();
			for(i=0;i<org_lvl_code_arr.length;i++)
			{
				esc_id_code_array.push({
					value:org_lvl_code_arr[i][0],
					text:org_lvl_code_arr[i][1]
			});
			}
		escltn_id_code.dataSource.data(esc_id_code_array);
		escltn_id_code.enable(true);
		escltn_id_code.value("");
	
		}
	});
	escltn_level_no=$("#escltn_level_no").data("kendoDropDownList");
	escltn_level_no.enable(false);
	esc_id_code_array=[{value:"SUPVSR1",text:"SUPERVISOR1"},{value:"SUPVSR2",text:"SUPERVISOR2"},{value:"SUPVSR3",text:"SUPERVISOR3"}]
	$("#escltn_id_code").kendoComboBox({
		optionLabel:"---Select---",
		dataTextField: "text",
		dataValueField: "value",
		dataSource:esc_id_code_array ,
		template:'${data.value}'+'-'+'${data.text}',
		change:function()
		{
			for(var i=0;i<esc_metrics_array.length;i++)
			{
				if(esc_metrics_array[i].esc_id_type == $("#escltn_id_type").val()  && esc_metrics_array[i].esc_id_code == this.value()
				&& selected_esc_rowmodel['esc_id_type'] != $("#escltn_id_type").val() && selected_esc_rowmodel['esc_id_code'] != this.value())
				{
					alert("List is already exist.Add new one");
					escltn_id_code.value("");
				}
			
			}		
		}
		
	});
	escltn_id_code=$("#escltn_id_code").data("kendoComboBox");
	$("#escltn_id_code").bind('blur',function()
	{
		if(escltn_id_code.dataItem() == undefined && escltn_id_code.value() != "")
		{
			alert("Changes are not allowed");
			escltn_id_code.value("");
		}
	});
	escltn_id_code.enable(false);
	
	esc_mode=[{value:"EMAIL",text:"EMAIL"},{value:"SMS",text:"SMS"},{value:"APP ALERT",text:"APP ALERT"}]
	$("#escltn_mode").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "text",
		dataValueField: "value",
		dataSource:esc_mode ,
		//template:'${data.value}'+'-'+'${data.text}'
	});
		escltn_mode=$("#escltn_mode").data("kendoDropDownList");
		
	$("#escltn_time").kendoNumericTextBox({min:1});
	escltn_time=$("#escltn_time").data("kendoNumericTextBox");
	
	escalation_uom_data = [];
	 executeService_retrieve_listof_escalation_interval_uom();
	$("#escltn_time_uom").kendoDropDownList({
		index: 1,
		dataTextField: "description",
		dataValueField: "uom",
		dataSource: escalation_uom_data,
		template:"${data.uom}"+"-"+"${data.description}",
	});
	escltn_time_uom=$("#escltn_time_uom").data("kendoDropDownList");
	
	
	if(edit_type == "U")
	{
					
			escltn_id_code.value(selected_esc_rowmodel['esc_id_code']);
			escltn_id_type.value(selected_esc_rowmodel['esc_id_type']);
			$("#escltn_level_id").text(selected_esc_rowmodel['level_id']);
			escltn_level_no.value(selected_esc_rowmodel['esc_org_lvl_no']);
			escltn_mode.value(selected_esc_rowmodel['notification_mode']);
			escltn_time_uom.value(selected_esc_rowmodel['elapsed_time_uom']);
			escltn_time.value(selected_esc_rowmodel['elapsed_time_since_sla']);
			
			
			if(selected_esc_rowmodel['esc_id_type'] == "SU")
			{
			escltn_level_no.enable(false);escltn_level_no.value("");
			$("#span_esc_levelno").hide();
			}
			else if(selected_esc_rowmodel['esc_id_type'] == "OR")
			{
			esc_id_code_array=[];
			org_lvl_code_arr=[];
			org_entity_type =selected_esc_rowmodel['esc_org_lvl_no'];
			executeService_retrieve_listof_org_level_codes();
			for(i=0;i<org_lvl_code_arr.length;i++)
			{
				esc_id_code_array.push({
					value:org_lvl_code_arr[i][0],
					text:org_lvl_code_arr[i][1]
			});
			}
			escltn_id_code.dataSource.data(esc_id_code_array);
			escltn_level_no.enable();
			$("#span_esc_levelno").show();
			}
			else if(selected_esc_rowmodel['esc_id_type']  == "EI")
			{
			escltn_level_no.enable(false);escltn_level_no.value("");
			$("#span_esc_levelno").hide();
			escltn_id_code.dataSource.data(employee_data);
			}
	
					
	
	}
	

	manage_escalation_metrics_child_valid = $("#manage_escalation_metrics_child_valid").kendoValidator().data("kendoValidator");
	
	$("#manage_escalation_matrix_child_submit").on("click",function()
	{
		 isScreenEditable=false;
		esc_update_status="";
		if (manage_escalation_metrics_child_valid.validate()) 
		{
		

			
			 if($("#escltn_id_type").val() == "OR")
			{
				if($("#escltn_level_no").val() == "")
				{
					alert("Fill the mandatory fields");
					return false;
				}
			
			}
			
		
			if(edit_type == "A")
			{
				for(var i=0;i<esc_metrics_array.length;i++)
					{
					if(esc_metrics_array[i].esc_id_type == $("#escltn_id_type").val()  && esc_metrics_array[i].esc_id_code == $("#escltn_id_code").val() )
					{
						alert("List is already exist.Add new one");
						return false;
					}
			
				}
				if($("#escltn_id_type").val() != "OR")
				{
					$("#escltn_level_no").val() == 0;
				}
				esc_dsource.add({ 	
					
						level_id: $("#escltn_level_id").text(),
						esc_id_type:$("#escltn_id_type").val(),
						esc_org_lvl_no:$("#escltn_level_no").val(),
						esc_id_code:  $("#escltn_id_code").val(),
						elapsed_time_since_sla:$("#escltn_time").val(),
						elapsed_time_uom : $("#escltn_time_uom").val(),
						notification_mode : $("#escltn_mode").val(),
					   
				});
				alert("Data added Successfully");
			
				div_manage_escalation_metrics_child.close();
			}
			if(edit_type == "U")
			{
				selected_esc_rowmodel.set('level_id',$("#escltn_level_id").text());
				selected_esc_rowmodel.set('esc_id_type',$("#escltn_id_type").val());
				selected_esc_rowmodel.set('esc_org_lvl_no',$("#escltn_level_no").val());
				selected_esc_rowmodel.set('esc_id_code',$("#escltn_id_code").val());	
				selected_esc_rowmodel.set('elapsed_time_since_sla',$("#escltn_time").val());
				selected_esc_rowmodel.set('elapsed_time_uom',$("#escltn_time_uom").val());
				selected_esc_rowmodel.set('notification_mode',$("#escltn_mode").val());
				
				
				div_manage_escalation_metrics_child.close();
					alert("Data Updated Successfully");
			}
			
			
		}
	});
	
	
	$('#manage_escalation_matrix_child_cancel').on('click',function()
	  {
		  isScreenEditable=false;
	    if (value_changed_ind == true)
		{
		  var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
		  if (isClose == true)
				div_manage_escalation_metrics_child.close();
				 
				
		} 
        else
		{
				div_manage_escalation_metrics_child.close();
				div_manage_escalation_metrics_child.close();
		}
		
	  });
	  
	  $('#escltn_id_code, #escltn_id_type  ,#escltn_level_no, #escltn_time ,#escltn_time_uom,#escltn_empid,#escltn_mode').on('change', function()
	  {
	    value_changed_ind = true;	
	  });
}
function fn_manage_escalation_matrix_PreImport()
{
	return true;
}
function fn_manage_escalation_matrix_PostImport()
{
	return true;
}
function fn_manage_escalation_matrix_PreExport()
{
	exportConfiguration = {
		mode:'single',
		content:[{
			exportType:"grid",
			fieldId:"escalation_metrics_grid",
			dispalyLabel:"Data Export"
		}]
	};
	return exportConfiguration;
}
function fn_manage_escalation_matrix_PostExport()
{
	return true;
}
function fn_manage_escalation_matrix_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"escalation_metrics_grid",
			dispalyLabel:"Data Print"
		}]
	};
	return printConfiguration;
}
function fn_manage_escalation_matrix_PostPrint()
{
	return true;
}
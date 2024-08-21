function fn_manage_scall_sla_loadScripts()
{
	var jsScriptsToLoad = [];
	jsScriptsToLoad = [  "../../s_iscripts/retrieve_manage_sla_master.js",
						 "../../s_iscripts/retrieve_listof_values_for_codes.js",
						 "../../s_iscripts/retrieve_listof_scall_priority_codes.js",
						 "../../s_iscripts/retrieve_customer_list.js",
						 "../../s_iscripts/save_manage_sla_master.js"
					  ];
				
	var loadRetStatus = loadJSScripts(jsScriptsToLoad);
	
	if (loadRetStatus == 1)		return false;
	
	return true;
}
function fn_manage_scall_sla()
{
	screenChangeInd='';
	isScreenEditable = true;
	sla_master_ind = "C";
	slctdmsla = 0;
	
	scall_sla_grid_retrieval();
	
	customer_data = [];
	executeService_retrieve_customer_list();	
		
    $("#manage_scall_sla_grid").kendoGrid({
                       dataSource: msla_dSource,
						navigatable: true,
                        pageable: true,
						scrollable: true,
                        height: 450,
						sortable: true,
						selectable: true,
						toolbar: kendo.template($("#manage_scall_sla-template").html()),
                        columns: [
							{ field:"priority_cd", title: "Priority", width: "27px", template:'#if (kendo.toString(priority_cd) =="") {# #} else {# ${priority_cd}#}#'},
							{ field:"cust_id", title: "Customer<br/> Code", width: "25px"},
							{ field:"cust_name", title: "Customer<br/> Name", width: "42px", template:'#if (kendo.toString(cust_id) =="ALL") {# ALL #} else if (kendo.toString(cust_id) =="") {#  #} else {for(i=0;i<customer_data.length;i++){if(customer_data[i].customer_id == cust_id){ custName = customer_data[i].customer_name;break;}else{custName = "";}} {# ${custName} #}}#'},
                            { field:"eff_from_date", title: "Effective <br/>From Date", width: "35px", template:'# if ( eff_from_date =="") {# #} else  { # ${kendo.toString(new Date(eff_from_date) ,cultureInfo.calendar.patterns.d)} # } #'},
							{ field:"eff_to_date", title: "Effective<br/> To Date", width: "30px", template:'# if ( eff_to_date =="") {# #} else  {  # ${kendo.toString(new Date(eff_to_date) ,cultureInfo.calendar.patterns.d)} #} #'},
							{ field:"sla_interval", title: "SLA", width: "35px",template:'#if (kendo.toString(sla_interval) =="") {# #} else {# ${sla_interval}#}#'},
                            { field:"sla_uom_code", title: "UOM", width: "30px",template:'#if (kendo.toString(sla_uom_code) =="") {# #} else {# ${sla_uom_code}#}#'},
						   ],
						editable:false,
						change: function()
						{
							slctdmsla=this.select();
							slctdmsla_uid = slctdmsla.data("uid");
							slctdmsla_model = msla_dSource.getByUid(slctdmsla_uid);
						}							
    });
	manage_scall_sla_grid= $("#manage_scall_sla_grid").data("kendoGrid");
	enable_or_disable_Gridbutton();
	
	msla_dSrc = msla_dSource.data();
		
	$('#manage_scall_sla_add_btn').on('click',function()
	{	
		save_mode_ind = "A";
		isScreenEditable = true;
		value_changed_ind = false;
		sla_rec_tstamp="00000000-0000-0000-0000-000000000000";
		manage_scall_sla_edit = $("#manage_scall_sla_edit_child"); 
			
		    manage_scall_sla_edit.kendoWindow({
			    width: "600px",
                actions: ["Close"],
				draggable: false,
				height: "400px",
				modal: true,
				resizable: false,
				close: onScallSlaClose,
				refresh: onScallSlaRefresh,
				title: "Service Call SLA - Add"
            }).data("kendoWindow");
				
		manage_scall_sla_edit.data("kendoWindow").refresh("manage_scall_sla_edit.html");			
		manage_scall_sla_edit.data("kendoWindow").title("Service Call SLA - Add");	
		manage_scall_sla_edit.data("kendoWindow").open();
		manage_scall_sla_edit.data("kendoWindow").center();
		
	});
	
	$('#manage_scall_sla_edit_btn').on('click',function()
	{
		if (slctdmsla == 0)
			alert('No Row has been selected');
		else
		{ 
			save_mode_ind = "U";
			isScreenEditable = true;
			value_changed_ind = false;
			sla_rec_tstamp = slctdmsla_model['rec_tstamp'];
			manage_scall_sla_edit = $("#manage_scall_sla_edit_child"); 
				
				manage_scall_sla_edit.kendoWindow({
					width: "600px",
					actions: ["Close"],
					draggable: false,
					height: "400px",
					modal: true,
					resizable: false,
					close: onScallSlaClose,
					refresh: onScallSlaRefresh,
					title: "Service Call SLA - Edit"
				}).data("kendoWindow");
					
			manage_scall_sla_edit.data("kendoWindow").refresh("manage_scall_sla_edit.html");			
			manage_scall_sla_edit.data("kendoWindow").title("Service Call SLA - Edit");	
			manage_scall_sla_edit.data("kendoWindow").open();
			manage_scall_sla_edit.data("kendoWindow").center();
		}
	});
	$('#manage_scall_sla_delete_btn').on('click',function()
	{	
		if (slctdmsla == 0)
			alert('No Row has been selected');
		else
		{
			var isClose = confirm("Are you sure you want to delete the record?");
		    if (isClose == true)
		    {
				save_mode_ind = "D";
				isScreenEditable = false;
				update_status="";
				sla_rec_tstamp = slctdmsla_model['rec_tstamp'];
				category = "NA";
				type="NA";
				cust_id = slctdmsla_model['cust_id'];
				priority_cd = slctdmsla_model['priority_cd'];
				eff_from_date = slctdmsla_model['eff_from_date'];
				eff_to_date = slctdmsla_model['eff_to_date'];	
				sla_interval = slctdmsla_model['sla_interval'];
				sla_uom_code = slctdmsla_model['sla_uom_code'];
				executeService_save_manage_sla_master();
				if(update_status == "P")
				{
					var deleterow_msla = msla_dSource.getByUid(slctdmsla_uid);
					msla_dSource.remove(deleterow_msla);
				}
			}
		}
	});
}
function onScallSlaRefresh()
{
	try
	{
		fn_manage_scall_sla_edit();
	}
	catch(err)
	{
		alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
	}
}
function onScallSlaClose()
{
	$('#manage_scall_sla_edit').remove();
}
function fn_manage_scall_sla_edit()
{
	manage_scall_sla_edit_validator = $("#manage_scall_sla_edit").kendoValidator().data("kendoValidator");
	
	scall_priority_data = [{text:"ALL",value:"ALL"}];
	executeService_retrieve_listof_scall_priority_codes();
	customer_data = [{customer_name:"ALL",customer_id:"ALL"}];
	executeService_retrieve_customer_list();
	list_of_codes = [];
	var scall_uom = GetListOfValues(false,'CALLSLAUOM');
	
	var manage_scall_sla_edit_priority_dd = $("#manage_scall_sla_edit_priority").kendoDropDownList({
		optionLabel:"--select--",
		dataTextField:"text",
		dataValueField:"value",
		dataSource:scall_priority_data,
		template:'${data.value}'+'-'+'${data.text}'
	});
	
	var manage_scall_sla_edit_customer_code_dd = $("#manage_scall_sla_edit_customer_code").kendoDropDownList({
		optionLabel:"--select--",
		dataTextField:"customer_id",
		dataValueField:"customer_name",
		dataSource:customer_data,
		template:'${data.customer_id}'+'-'+'${data.customer_name}',
		close:function()
		{
			var customer_name = this.value();
			$('#manage_scall_sla_edit_customer_name').val(customer_name);
		}
	});

	var manage_scall_sla_edit_uom_dd = $("#manage_scall_sla_edit_uom").kendoDropDownList({
		optionLabel:"--select--",
		dataTextField: "text",
		dataValueField: "value",
		dataSource:scall_uom,
		template:'${data.value}'+'-'+'${data.text}'
	});
	var manage_scall_sla_edit_sla_ntb = $("#manage_scall_sla_edit_sla").kendoNumericTextBox({
		min: 1
	});
	var manage_scall_sla_edit_eff_to_date_dp  = $("#manage_scall_sla_edit_eff_to_date").kendoDatePicker({
		format:"dd-MM-yyyy",
		value:new Date(),
		min:new Date()
	});
	var manage_scall_sla_edit_eff_from_date_dp  = $("#manage_scall_sla_edit_eff_from_date").kendoDatePicker({
		format:"dd-MM-yyyy",
		value:new Date(),
		close:function()
		{
			var eff_from_date = this.value();
			var mn_scall_sla_eff_to_date = $("#manage_scall_sla_edit_eff_to_date").data("kendoDatePicker");
			if(eff_from_date >= new Date())
			{
				mn_scall_sla_eff_to_date.min(eff_from_date);
				mn_scall_sla_eff_to_date.value(eff_from_date);
			}
			else
			{
				mn_scall_sla_eff_to_date.min(new Date());
				mn_scall_sla_eff_to_date.value(new Date());
			}
		}
	});
	var manage_scall_sla_edit_customer_code = $("#manage_scall_sla_edit_customer_code").data("kendoDropDownList");
	var manage_scall_sla_edit_priority = $("#manage_scall_sla_edit_priority").data("kendoDropDownList");
	var manage_scall_sla_edit_uom = $("#manage_scall_sla_edit_uom").data("kendoDropDownList");
	var manage_scall_sla_edit_sla = $("#manage_scall_sla_edit_sla").data("kendoNumericTextBox");
	var manage_scall_sla_edit_eff_from_date = $("#manage_scall_sla_edit_eff_from_date").data("kendoDatePicker");
	var manage_scall_sla_edit_eff_to_date = $("#manage_scall_sla_edit_eff_to_date").data("kendoDatePicker");
	if(save_mode_ind == 'U')
	{
		for(i=0;i<customer_data.length;i++)
		{
			if(customer_data[i].customer_id == slctdmsla_model['cust_id'])
			{
				custName = customer_data[i].customer_name;
				break;
			}
		}
		
		var eff_from_date_g = slctdmsla_model['eff_from_date'];
		eff_from_date_g = eff_from_date_g.split('-');
		var eff_from_date_val = eff_from_date_g[2]+'-'+eff_from_date_g[1]+'-'+eff_from_date_g[0];
		
		var eff_to_date_g = slctdmsla_model['eff_to_date'];
		eff_to_date_g = eff_to_date_g.split('-');
		var eff_to_date_val = eff_to_date_g[2]+'-'+eff_to_date_g[1]+'-'+eff_to_date_g[0];
			
		manage_scall_sla_edit_priority.value(slctdmsla_model['priority_cd']);
		manage_scall_sla_edit_customer_code.text(slctdmsla_model['cust_id']);
		$('#manage_scall_sla_edit_customer_name').val(custName);
		manage_scall_sla_edit_uom.value(slctdmsla_model['sla_uom_code']);
		manage_scall_sla_edit_sla.value(slctdmsla_model['sla_interval']);
		manage_scall_sla_edit_eff_from_date.value(eff_from_date_val);
		manage_scall_sla_edit_eff_from_date.enable(false);
		manage_scall_sla_edit_eff_to_date.value(eff_to_date_val);
		manage_scall_sla_edit_eff_to_date.enable(false);
		manage_scall_sla_edit_priority.enable(false);
		manage_scall_sla_edit_customer_code.enable(false);
	}
	
	$('#manage_scall_sla_edit_ok_btn').click(function(e)
	{
		e.preventDefault();
		
			if(manage_scall_sla_edit_validator.validate())
			{
				if (value_changed_ind == true)
				{
					category= "NA";
					type="NA";
					cust_id = manage_scall_sla_edit_customer_code.text();
					priority_cd = manage_scall_sla_edit_priority_dd.val();
					var eff_from_date1 = manage_scall_sla_edit_eff_from_date_dp.val();
					eff_from_date1 = eff_from_date1.split('-');
					eff_from_date = eff_from_date1[2]+'-'+eff_from_date1[1]+'-'+eff_from_date1[0];
					var eff_to_date1 = manage_scall_sla_edit_eff_to_date_dp.val();
					eff_to_date1 = eff_to_date1.split('-');
					eff_to_date = eff_to_date1[2]+'-'+eff_to_date1[1]+'-'+eff_to_date1[0];
					sla_interval = $('#manage_scall_sla_edit_sla').val();
					sla_uom_code = manage_scall_sla_edit_uom_dd.val();
	
					if(save_mode_ind == 'A')
					{
						for(var i=0; i<msla_dSrc.length; i++)
						{
							if(cust_id == msla_dSrc[i].cust_id  && priority_cd == msla_dSrc[i].priority_cd)
							{
								if(new Date(eff_from_date) <= new Date(msla_dSrc[i].eff_to_date) || new Date(eff_to_date) <= new Date(msla_dSrc[i].eff_to_date))
								{
									alert('Cannot insert a duplicate record.');
									return false;
								}
							}
						}
						executeService_save_manage_sla_master();
						manage_scall_sla_edit.data("kendoWindow").close();
					}
					else if(save_mode_ind == 'U')
					{
						for(var i=0; i<msla_dSrc.length; i++)
						{
							if(slctdmsla_uid != msla_dSrc[i].uid)
							{
								if(cust_id == msla_dSrc[i].cust_id  && priority_cd == msla_dSrc[i].priority_cd)
								{
									if(new Date(eff_from_date1) <= new Date(msla_dSrc[i].eff_to_date) || new Date(eff_to_date1) <= new Date(msla_dSrc[i].eff_to_date))
									{
										alert('Cannot insert a duplicate record.');
										return false;
									}
								}
							}
						}
						executeService_save_manage_sla_master();
						manage_scall_sla_edit.data("kendoWindow").close();
					}
					isScreenEditable = false;
					scall_sla_grid_retrieval();
					manage_scall_sla_grid.dataSource = msla_dSource;
					manage_scall_sla_grid.refresh();
				}
				else
				{
					alert('No changes done.');
					isScreenEditable = false;
					manage_scall_sla_edit.data("kendoWindow").close();
				}
			}
			else
			{
				alert('Please fill all the details.');
			}
	});
	$('#manage_scall_sla_edit_cancel_btn').click(function(e)
	{
		e.preventDefault();
		if (value_changed_ind == true)
		{
			var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
			if (isClose == true)
				isScreenEditable = false;
				manage_issue_sla_edit.data("kendoWindow").close();
		}  
		else
		isScreenEditable = false;
		manage_scall_sla_edit.data("kendoWindow").close();
	});
	$('#manage_scall_sla_edit_priority, #manage_scall_sla_edit_customer_code, #manage_scall_sla_edit_eff_from_date, #manage_scall_sla_edit_eff_to_date, #manage_scall_sla_edit_sla, #manage_scall_sla_edit_uom').on('change', function()
	{
	    value_changed_ind = true;	
	});
}
function scall_sla_grid_retrieval()
{
	msla_dSrc =new kendo.data.ObservableArray([]);
	ret_m_sla = executeService_retrieve_manage_sla_master();
	if (ret_m_sla == '1')
	{
		return 1;
	}
	m_sla_list=loadXMLString(ret_m_sla);
	
	m_sla_dSource = new kendo.data.DataSource({
						data: m_sla_list,
						pageSize:10,
                        schema: {
                            // specify the the schema is XML
                            type: "xml",
                            // the XML element which represents a single data record
                            data: "list/sla",
                            // define the model - the object which will represent a single data record
                            model: {
                                // configure the fields of the object
                                fields: {
                                    // the "title" field is mapped to the text of the "title" XML element
                                    category: "category/text()",
                                    type: "type/text()",
									cust_id: "cust_id/text()",
                                    priority_cd: "priority_cd/text()",
                                    eff_from_date: "eff_from_date/text()",
                                    eff_to_date: "eff_to_date/text()",
                                    sla_interval: "sla_interval/text()",
                                    sla_uom_code: "sla_uom_code/text()",
                                    rec_tstamp: "rec_tstamp/text()",
									cust_name: ""
								    } 
							}
                        }
    });
	m_sla_dSource.read();
	msla_dSource_obj = m_sla_dSource.data();
	msla_dSrc = m_sla_dSource.data();
	msla_dSource = new kendo.data.DataSource({
										autoSync:true,
										data: msla_dSrc,
										pageSize: 10,
										schema: {
										model: {
												id:"category",
												fields: {
														category:  { editable: false },
														type: { editable: false},
														cust_id: { editable: false},
														priority_cd: { editable: false},
														eff_from_date: { editable: false},
														eff_to_date: { editable: false},
														sla_interval: {editable: false},
														sla_uom_code: { editable: false},
														cust_name: {editable: false, nullable: false}
														}
												}
												}
	});
	for (i=0; i< msla_dSource_obj.length; i++)
	{		
		msla_dSource.add({"category": msla_dSource_obj[i].category,
							"type": msla_dSource_obj[i].type,
							"cust_id": msla_dSource_obj[i].cust_id,
							"priority_cd": msla_dSource_obj[i].priority_cd,
							"eff_from_date": msla_dSource_obj[i].eff_from_date,
							"eff_to_date": msla_dSource_obj[i].eff_to_date,
							"sla_interval": msla_dSource_obj[i].sla_interval,
							"sla_uom_code": msla_dSource_obj[i].sla_uom_code,
							"cust_name": msla_dSource_obj[i].cust_name,
							"rec_tstamp": msla_dSource_obj[i].rec_tstamp
		});
	}
}
function fn_manage_scall_sla_PreImport()
{
	return true;
}
function fn_manage_scall_sla_PostImport()
{
	return true;
}
function fn_manage_scall_sla_PreExport()
{
	exportConfiguration = {
		mode:'single',
		content:[{
			exportType:"grid",
			fieldId:"manage_scall_sla_grid",
			dispalyLabel:"Data Export"
		}]
	};
	return exportConfiguration;
}
function fn_manage_scall_sla_PostExport()
{
	return true;
}
function fn_manage_scall_sla_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"manage_scall_sla_grid",
			dispalyLabel:"Data Print"
		}]
	};
	return printConfiguration;
}
function fn_manage_scall_sla_PostPrint()
{
	return true;
}
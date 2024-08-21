function fn_manage_equipment_parameter()
{
	isScreenEditable = true;
	screenChangeInd = "1";
	assignScreenName(divID, screenID);
	screenID = 'manage_equipment_parameter';
	divID = screenID;
	//$("#"+parentScreenID).remove();
	AddToNavigationMap(divID, screenID, displayLabel,  parentScreenID);
	
	

	$('#eq_id').val(selected_equipment_model['equipment_id']).attr('disabled','disabled');
	$('#eq_desc').val(selected_equipment_model['description']).attr('disabled','disabled');
		var temp_array = new kendo.data.ObservableArray([]);

	var dSource = new kendo.data.DataSource({data: temp_array});
	selected_eqparam_rowmodel=0;
	$("#grid_paramlist").kendoGrid({
                        dataSource:dSource,
                        pageable: true,
						scrollable: true,
                        height: 400,
						sortable: true,
						selectable: true,
						toolbar: kendo.template($("#eq-param-template").html()),
                        columns: [
                            { field:"param_code", title: "Parameter", width: "100px" },
							{ field:"description", title: "Description", width: "100px" },
							{ field:"uom_code", title: "UOM", width: "100px"},
                            { field:"incr_or_lclucl_ind", title: "Parameter Type", width: "100px"},
                            { field:"lcl_value", title: "LCL", width: "100px"},
                            { field:"ucl_value", title: "UCL", width: "100px"},
							{ field:"increment_value", title: "Incremental value", width: "100px"},
						   ],
							change: function()
							{
								selected_eqparam=this.select();
								selected_eqparam_uid = selected_eqparam.data("uid");
								selected_eqparam_rowmodel = dSource.getByUid(selected_eqparam_uid);
							} 						
    });
	grid_paramlist = $("#grid_paramlist").data("kendoGrid"); 
	manage_equipment_parameter_list();
	$("#eq_param_add").on('click',function()
	{
		edit_type = 'A';
		value_changed_ind = false;
		isScreenEditable = true;
		eq_parameter_child_window= $("#eq_parameter_child");
			eq_parameter_child_window.kendoWindow({
						    width: "900px",
                            actions: ["Close"],
							draggable: false,
							height: "400px",
							modal: true,
							resizable: false,
							close: onequipmentParamClose,
							refresh: onequipmentParamRefresh
            });
		eq_parameter_child_window.data("kendoWindow").center();				
		eq_parameter_child_window.data("kendoWindow").refresh("manage_equipment_parameter_child.html");
		eq_parameter_child_window .data("kendoWindow").title("Parameters -Add");						  
		eq_parameter_child_window.data("kendoWindow").open();
			
		
	});
	$("#eq_param_delete").on('click', function () {
		if (selected_eqparam_rowmodel == 0) 
			alert('No Row has been selected');
		else 
		{
			eq_param_update_status=0;
			var isClose = confirm("Are you sure you want to delete the record?");
			if (isClose == true) {
				edit_type = 'D';
				eqparam_edit_type=edit_type;
				param_code=   selected_eqparam_rowmodel['param_code']
				param_description=  selected_eqparam_rowmodel['description']
				param_uom_code=  selected_eqparam_rowmodel['uom_code']
				incr_or_lclucl_ind=  selected_eqparam_rowmodel['incr_or_lclucl_ind']
				lcl_value =selected_eqparam_rowmodel['lcl_value']
				ucl_value=  selected_eqparam_rowmodel['ucl_value']
				increment_value = selected_eqparam_rowmodel['increment_value']
				param_rec_tstamp=selected_eqparam_rowmodel['rec_tstamp'];
				executeService_save_manage_equipment_parameters();
				var deleterow = dSource.getByUid(selected_eqparam_uid);
				if(eq_param_update_status == 1)
				{
					dSource.remove(deleterow);
					alert("Equipment parameter is deleted successfully");
				}
				selected_eqparam_rowmodel = 0;
			}
			
		} 
	});

	$("#eq_param_edit").on('click',function()
	{
		if (selected_eqparam_rowmodel == 0) 
			alert('No Row has been selected');
		else
		{
			edit_type = 'U';
			isScreenEditable = true;
			eq_parameter_child_window= $("#eq_parameter_child");
				eq_parameter_child_window.kendoWindow({
						    width: "900px",
                            actions: ["Close"],
							draggable: false,
							height: "300px",
							modal: true,
							resizable: false,
							close: onequipmentParamClose,
							refresh: onequipmentParamRefresh
				});
			eq_parameter_child_window.data("kendoWindow").center();					
			eq_parameter_child_window.data("kendoWindow").refresh("manage_equipment_parameter_child.html");
			eq_parameter_child_window .data("kendoWindow").title("Parameters -Edit");						  
			eq_parameter_child_window.data("kendoWindow").open();		
		}
	});
}
function manage_equipment_parameter_list()
{
	eq_param_list_xml=executeService_retrieve_manage_equipment_parameters();
	if (eq_param_list_xml == '1')
	{
		return 1;
	}			
		
	eq_param_list_xml=loadXMLString(eq_param_list_xml);
	
	dSource= new kendo.data.DataSource({
				data: eq_param_list_xml,
				pageSize: 10,
						   schema: {
						   type: "xml",
						   data: "list/equipment_param",
						   model: {
							   fields: {
									param_code: "param_code/text()",
									description:  "description/text()",
									uom_code: "uom_code/text()",
									incr_or_lclucl_ind: "incr_or_lclucl_ind/text()",
									lcl_value : "lcl_value/text()",
									ucl_value: "ucl_value/text()",
									increment_value:  "increment_value/text()",
									rec_tstamp: "rec_tstamp/text()",
								   
									  }
							}
						}
							
	});
	dSource.read();
	eqparam_array=dSource.data();
	grid_paramlist.dataSource.data(eqparam_array);

}
function onequipmentParamRefresh()
{
	try
	{
		fn_manage_equipment_parameter_child();
	}
	catch(err)
	{
		alert('E_LO_1005: Unable to load required files. Please contact your support desk.');
		eq_parameter_child_window.data("kendoWindow").close();
	}
}
function onequipmentParamClose()
{
	$('#manage_equipment_parameter_child').remove();
}
function fn_manage_equipment_parameter_PreImport()
{
	return true;
}
function fn_manage_equipment_parameter_PostImport()
{
	return true;
}
function fn_manage_equipment_parameter_PreExport()
{
	exportConfiguration = {
		mode:'single',
		content:[{
			exportType:"grid",
			fieldId:"grid_paramlist",
			dispalyLabel:"Data Export"
		}]
	};
	return exportConfiguration;
}
function fn_manage_equipment_parameter_PostExport()
{
	return true;
}
function fn_manage_equipment_parameter_PrePrint()
{
	printConfiguration = {
		mode:'single',
		content:[{
			type:"grid",
			fieldId:"grid_paramlist",
			dispalyLabel:"Data Print"
		}]
	};
	return printConfiguration;
}
function fn_manage_equipment_parameter_PostPrint()
{
	return true;
}
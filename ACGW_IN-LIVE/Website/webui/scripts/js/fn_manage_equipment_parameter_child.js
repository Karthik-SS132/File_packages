function fn_manage_equipment_parameter_child()
{
	var value_changed_ind=false;
	eqparam_validator = $("#eqparam_validator").kendoValidator().data("kendoValidator");
	eq_param_uom_list=[];
	executeService_retrieve_listof_eqparam_uom();
	$("#parameter_uom").kendoDropDownList({
		optionLabel: "---select---",
		dataTextField: "desc",
		dataValueField: "uom",
		dataSource: eq_param_uom_list,
		template:"${data.uom}"+"-"+"${data.desc}",
	});
	parameter_uom=$("#parameter_uom").data("kendoDropDownList");
	parameter_array=[{text:"LCL and UCL Value",value:"LU"},{text:"Incremental Value",value:"I"}]
	$("#indicator").kendoDropDownList({
		optionLabel: "---select---",
		dataTextField: "text",
		dataValueField: "value",
		dataSource: parameter_array,
		template:"${data.value}"+"-"+"${data.text}",
		change:function()
		{
			if(this.text() == "LCL and UCL Value")
			{
				$('#incremental_value').data("kendoNumericTextBox").enable(false);
				$('#lcl_value').data("kendoNumericTextBox").enable(true);
				$('#ucl_value').data("kendoNumericTextBox").enable(true);
				$('#incremental_value').data("kendoNumericTextBox").value("");
				$('#span_incr_value').hide();$('#span_lcl_value').show();$('#span_ucl_value').show();
			}
			else if(this.text() == "Incremental Value")
			{
				$('#incremental_value').data("kendoNumericTextBox").enable(true);
				$('#lcl_value').data("kendoNumericTextBox").enable(false);
				$('#ucl_value').data("kendoNumericTextBox").enable(false);
				$('#lcl_value').data("kendoNumericTextBox").value("");
				$('#ucl_value').data("kendoNumericTextBox").value("");
				$('#span_incr_value').show();$('#span_lcl_value').hide();$('#span_ucl_value').hide();
			}
			else
			{
			$('#span_incr_value').hide();$('#span_lcl_value').hide();$('#span_ucl_value').hide();
			}
	
		}
	});
	indicator=$("#indicator").data("kendoDropDownList");
	$('#lcl_value').kendoNumericTextBox({min:1,max:9999,decimals:4,step:1.0000});
	$('#ucl_value').kendoNumericTextBox();
	$('#incremental_value').kendoNumericTextBox();
	if ( edit_type == 'U')
	{
		$('#parameter').val(selected_eqparam_rowmodel['param_code']);
		$('#parameter_desc').val(selected_eqparam_rowmodel['description']);
		
        parameter_uom.value(selected_eqparam_rowmodel['uom_code']);
		indicator_value=selected_eqparam_rowmodel['incr_or_lclucl_ind'].trim()
        indicator.value(indicator_value);
		lcl_value = $("#lcl_value").data("kendoNumericTextBox");
        lcl_value.value(selected_eqparam_rowmodel['lcl_value']);
		ucl_value = $("#ucl_value").data("kendoNumericTextBox");
        ucl_value.value(selected_eqparam_rowmodel['ucl_value']);
		if(selected_eqparam_rowmodel['incr_or_lclucl_ind'] == "LU")
		{
			$('#lcl_value').data("kendoNumericTextBox").enable(true);
			$('#ucl_value').data("kendoNumericTextBox").enable(true);
			$('#span_lcl_value').show();$('#span_ucl_value').show();
			$('#incremental_value').data("kendoNumericTextBox").enable(false);$('#span_incr_value').hide();
		}
		else
		{
			$('#lcl_value').data("kendoNumericTextBox").enable(false);
			$('#ucl_value').data("kendoNumericTextBox").enable(false);
			$('#span_lcl_value').hide();$('#span_ucl_value').hide();
			$('#incremental_value').data("kendoNumericTextBox").enable(true);$('#span_incr_value').show();
		}
		incremental_value = $("#incremental_value").data("kendoNumericTextBox");
        incremental_value.value(selected_eqparam_rowmodel['increment_value']);

	}
	 
	$('#eq_parameter_child_ok').on("click",function()
	{	
		eq_param_update_status=0;
		if(eqparam_validator.validate() && value_changed_ind == true)
		{
			isScreenEditable = false;
			eqparam_edit_type=edit_type;
			if (edit_type == 'U')
			{	
				param_code=   $("#parameter").val();
				param_description=  $("#parameter_desc").val();
				param_uom_code=   $("#parameter_uom").val();
				incr_or_lclucl_ind=  $("#indicator").val();
				lcl_value = $("#lcl_value").val();
				ucl_value=  $("#ucl_value").val();
				increment_value = $("#incremental_value").val();
				param_rec_tstamp=selected_eqparam_rowmodel['rec_tstamp'];
	
				executeService_save_manage_equipment_parameters();
				if(eq_param_update_status == 1)
				{
					selected_eqparam_rowmodel.set("param_code",  $("#parameter").val());
					selected_eqparam_rowmodel.set("description",  $("#parameter_desc").val());
					selected_eqparam_rowmodel.set("uom_code", $("#parameter_uom").val());
					selected_eqparam_rowmodel.set("incr_or_lclucl_ind", $("#indicator").val());
					selected_eqparam_rowmodel.set("lcl_value", $("#lcl_value").val());
					selected_eqparam_rowmodel.set("ucl_value", $("#ucl_value").val());
					selected_eqparam_rowmodel.set("increment_value", $("#incremental_value").val());
				
					alert("Parameter item is updated successfully");
					manage_equipment_parameter_list();
					eq_parameter_child_window.data("kendoWindow").close();
				}
			}
			if(edit_type == 'A')
			{
				param_code=   $("#parameter").val();
				param_description=  $("#parameter_desc").val();
				param_uom_code=   $("#parameter_uom").val();
				incr_or_lclucl_ind=  $("#indicator").val();
				lcl_value = $("#lcl_value").val();
				ucl_value=  $("#ucl_value").val();
				increment_value = $("#incremental_value").val();
				param_rec_tstamp="00000000-0000-0000-0000-000000000000";
				executeService_save_manage_equipment_parameters();
				if(eq_param_update_status == 1)
				{
					dSource.add({
							param_code:   $("#parameter").val(),
							description:  $("#parameter_desc").val(),
							uom_code:   $("#parameter_uom").val(),
							incr_or_lclucl_ind: indicator.value(),
							lcl_value : $("#lcl_value").val(),
							ucl_value:  $("#ucl_value").val(),
							increment_value : $("#incremental_value").val(),
							rec_tstamp:"00000000-0000-0000-0000-000000000000",
					});
					alert("Parameter item is added successfully");
					manage_equipment_parameter_list();
					eq_parameter_child_window.data("kendoWindow").close();
				}
			} 
		}
	});
	$('#eq_parameter_child_cancel').on("click",function()
	{
		isScreenEditable = false;
		if (value_changed_ind == true) 
		{
			var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
			if (isClose == true) 
			eq_parameter_child_window.data("kendoWindow").close();
		} 
		else 
			eq_parameter_child_window.data("kendoWindow").close();
	});
	$('#lcl_value,#ucl_value,#incremental_value,#indicator,#parameter_uom,#parameter').on("change",function()
	{
		value_changed_ind=true;
	});
}
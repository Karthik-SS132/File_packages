function fn_manage_warehouse_master_child()
{
	/* VARIABLE INITIALIZATION */
	validator = $("#manage_warehouse_master_child").kendoValidator().data("kendoValidator");	
	value_changed_ind="";
		
	/* KEY FIELD VALIDATION */
	validation_field_1="";
	validation_field_2="";
	validation_field_3="";
	validation_field_4="";
	validation_field_5="";
	validation_field_6="";
	validation_field_7="";
	validation_field_8="";
	validation_field_9="";
	validation_field_10="";	
	$("#mwmc_warehouse_id").on('blur',function()
	{
		task_valid_ind="";
		if($(this).val() != "")
		{
			screenname="WAREHOUSEMASTER";
			validation_field_1 = $(this).val();
			executeService_validate_key_field();
			if(task_valid_ind == "true")
			{
				alert("Warehouse Id is already available.Please Enter new Warehouse Id");
				$('#mwmc_warehouse_id').val("");
				$('#mwmc_warehouse_id').focus();
			}
		}
	});
		
	/* SET UP FOR ADD SCREEN */
	if (save_mode == "A")
	{
		
		rec_tstamp = "00000000-0000-0000-0000-000000000000";
	}	
		
	/* SET UP FOR EDIT SCREEN */
	if (save_mode == "U")
	{	
		warehouse_id = selected_model['wh_id'];
		warehouse_master_detail = executeService_retrieve_manage_warehouse_details();
		warehouse_master_detail_xml = loadXMLString(warehouse_master_detail);
		manage_warehouse_master_child_datasource = new kendo.data.DataSource(
		{
			data : warehouse_master_detail_xml,
			pageSize : 10,
			schema : 
			{
				type : "xml",
				data : "list/warehouse_detl",
				model :
				{
					fields :
					{
						wh_id : "wh_id/text()",
						wh_name : "wh_name/text()",
						wh_type : "wh_type/text()",
						wh_loc_code : "wh_loc_code/text()",
						rec_tstamp : "rec_tstamp/text()",
					}
				},
			},
		});
		manage_warehouse_master_child_datasource.read();
		record = manage_warehouse_master_child_datasource.at(0);
		$("#mwmc_warehouse_id").val(record.wh_id).attr('disabled','disabled');
		$("#mwmc_warehouse_name").val(record.wh_name);
		$("#mwmc_warehouse_type").val(record.wh_type);
		$("#mwmc_warehouse_loc_code").val(record.wh_loc_code);
		rec_tstamp = record.rec_tstamp;
	}
	
	/* TEST FOR DATA MODIFICATION */
	$("#mwmc_warehouse_id,#mwmc_warehouse_name,#mwmc_warehouse_type,#mwmc_warehouse_loc_code").on("change",function()
	{
		value_changed_ind=true;
	});
	
	/* CANCEL BUTTON CLICK */
	$("#mwmc_cancel_btn").click(function()
	{
		if (value_changed_ind == true)
		{
			var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
			if (isClose == true)
			{
				window1.data("kendoWindow").close();
			}				 
		} 
		else
		{
			window1.data("kendoWindow").close();				
		}
	});
	
	/* SUBMIT BUTTON CLICK */
	$("#mwmc_submit_btn").click(function()
	{		
		if(validator.validate())
		{
			return_value  = executeService_save_manage_warehouse_details();		
			window1.data("kendoWindow").close();
			fn_refresh_grid();
		}
		else
		{
			alert("Please fill all the fields that are mandatory.");
		}
	});
}
function  fn_manage_equipment_attachments_lists()
{
	att_lists_validator = $("#att_lists_child1").kendoValidator().data("kendoValidator");
	
	$("#att_type").kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "list_name",
		dataValueField: "list_type",
		dataSource:list_types_data,
		change:function() {
			if(this.value() != "")
			{
				list_type = this.value();
				list_id_data = [];
				executeService_retrieve_listof_list_ids();
				$("#att_listid").data("kendoComboBox").dataSource.data(list_id_data);
				$("#att_listid").data("kendoComboBox").value("");
				$("#att_listdes").val("");
			}
			else
			{
				$("#att_listid").data("kendoComboBox").value("");
				$("#att_listdes").val("");
			}
		}
		});
		att_type = $("#att_type").data("kendoDropDownList");
		list_id_data = [];
		
		
		att_listid = InitializeKendoComboBox(
		{
			fieldID: "att_listid",
			dataSource: [],
			/*{
				applicationName: "mservice",
				serviceName: "retrieve_listof_wh_code",
			},*/
			events: 
			{
				change: "fn_att_listid_change",
				
			},
			//defaultValue: manage_call_sparepart_update_child_wh_code_default_value,
			dataTextField: "description",
			dataValueField: "list_id",
			filterMode: false
		});
		
	/*	$("#att_listid").kendoComboBox({
			placeholder: "Select",
			filter: "startswith",
			dataTextField: "list_id",
			dataValueField: "list_id",
			dataSource: list_id_data,
			change:function() {
				if(this.value() != "")
				{
					for(i=0;i< manage_equipment_attachments_data.length;i++)
					{
			 
						if( manage_equipment_attachments_data[i].list_type == $("#att_type").val() && manage_equipment_attachments_data[i].list_id == $("#att_listid").val())
						{  
							alert("The selected combination is already available.Choose new one");
							$("#att_listid").data("kendoComboBox").value("");
							$("#att_listdes").val("");
							return false;
							
						}
					}
				
					for(i=0;i< list_id_data.length;i++)
					{
			 
						if( list_id_data[i].list_id== $("#att_listid").val())
						{  
							break;
						}
					}
					if($("#att_listid").val()== "")
					{
						$("#att_listdes").val("");
					}
					else
						$("#att_listdes").val( list_id_data[i].description);
				}
				else
				{
					$("#att_listdes").val("");
				}
			}
        });*/
		
		
		$("#manage_equipment_attachments_lists_ok").on('click',function ()
		{
			isScreenEditable=false;
			if(att_lists_validator.validate() )
			{
				manage_equipment_attachments_eqpt_id = selected_equipment_model['equipment_id'];
				manage_equipment_attachments_list_type = att_type.value();
				manage_equipment_attachments_list_id =  $("#att_listid").data("kendoComboBox").text();
				manage_equipment_attachments_save_mode ="A";
				var update_status = executeService_save_manage_equipment_list_attachment();
				if(update_status == "SP001")
				{
					manage_equipment_attachments_datasource_1.add({
						list_type : att_type.value(),
						list_id : $("#att_listid").data("kendoComboBox").text(),
						list_name : $("#att_listdes").val(),	
					});
					alert('Attached List added successfully');
				}	
				
				attl_edit.close();
				
			}	
		});

	$('#manage_equipment_attachments_lists_cancel').on('click',function()
	{
		isScreenEditable=false;
		if (attl_value_changed_ind == true)
		{
			  var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
			  if (isClose == true)
					attl_edit.close();
		}  
		else
				attl_edit.close();
	});
		
	$('#att_type, #att_listid, #att_evt_ind, #att_listdes').on('change', function()
	{
			attl_value_changed_ind = true;	
	});
}
function fn_att_listid_change()
{
	if($("#att_listid").val() != "")
				{
					for(i=0;i< manage_equipment_attachments_data.length;i++)
					{
			 
						if( manage_equipment_attachments_data[i].list_type == $("#att_type").val() && manage_equipment_attachments_data[i].list_id == $("#att_listid").val())
						{  
							alert("The selected combination is already available.Choose new one");
							$("#att_listid").data("kendoComboBox").value("");
							$("#att_listdes").val("");
							return false;
							
						}
					}
				
					for(i=0;i< list_id_data.length;i++)
					{
			 
						if( list_id_data[i].list_id== $("#att_listid").val())
						{  
							break;
						}
					}
					if($("#att_listid").val()== "")
					{
						$("#att_listdes").val("");
					}
					else
						$("#att_listdes").val( list_id_data[i].description);
				}
				else
				{
					$("#att_listdes").val("");
				}
}
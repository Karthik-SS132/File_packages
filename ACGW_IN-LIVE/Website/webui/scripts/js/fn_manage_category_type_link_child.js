function fn_manage_category_type_link_child()
{
	$('#category').kendoDropDownList
	({
		optionLabel:"---Select---",
		dataTextField: "desc",
		dataValueField: "code",
		dataSource: category_array,
		template:"${data.code}"+"-"+"${data.desc}",
		change: function () 
		{
			category_code=this.value();
			for(var i=0;i<category_link_details_data.length;i++)
			{
				//if(category_link_details_data[i].uid != selected_model['uid'])
				//{
					if(category_link_details_data[i].category == $('#category').val && category_link_details_data[i].type == $('#type').val())
					{
						alert("The chosen value is already available");
						this.value("");
						$('#category_desc').val("");
						return false;
					}
				//}
			}
			
			for(i=0;i<category_array.length;i++)
			{
				if(category_array[i].code == this.value())
				{
					break;
				}
			}
			category_desc_value= category_array[i].desc; 
			$('#category_desc').val(category_desc_value);
		
		}
	});
	category=$('#category').data("kendoDropDownList");
	$('#type').kendoDropDownList({
		optionLabel:"---Select---",
		dataTextField: "desc",
		dataValueField: "code",
		dataSource: type_array,
		template:"${data.code}"+"-"+"${data.desc}",
		change: function () 
		{
			type_code=this.value();
			for(var i=0;i<category_link_details_data.length;i++)
			{
				//if(category_link_details_data[i].uid != selected_model['uid'])
				//{
					if(category_link_details_data[i].category == $('#category').val() && category_link_details_data[i].type == $('#type').val())
					{
						alert("The chosen value is already available");
						this.value("");
						$('#type_desc').val("");
						return false;
					}
				//}
			}
				
			for(i=0;i<type_array.length;i++)
			{
				if(type_array[i].code == this.value())
				{
					break;
				}
			}
			type_desc_value= type_array[i].desc; 
			$('#type_desc').val(type_desc_value);
			
		}
	});
	type=$('#type').data("kendoDropDownList");
	$('#category_desc').attr("disabled","disabled");
	$('#type_desc').attr("disabled","disabled");
	
	
	if(edit_type == "U")
	{
		category.value(selected_model['category']);
		
		for(i=0;i<type_array.length;i++)
			{
				if(category_array[i].code == selected_model['category'])
				{
					$('#category_desc').val(category_array[i].desc);
				}
			}
		type.value(selected_model['type']);
		for(i=0;i<type_array.length;i++)
			{
				if(type_array[i].code == selected_model['type'])
				{
					$('#type_desc').val(type_array[i].desc);
				}
			}
		
	}
	
	manage_category_type_link_child = $("#manage_category_type_link_child").kendoValidator().data("kendoValidator");
	$('#manage_category_type_link_child_submit').on('click',function()
	{
		if(manage_category_type_link_child.validate())
		{
			if(edit_type == "U")
			{
				selected_model.set("category",$('#category').val());
				selected_model.set("category_desc",$('#category_desc').val());
				selected_model.set("type",$('#type').val());
				selected_model.set("type_desc",$('#type_desc').val());
				alert("Data updated successfully");
			}
			if(edit_type == "A")
			{
				manage_category_type_link_datasource_1.add({ 	
						category:$("#category").val(),
						category_desc: $("#category_desc").val(),
						type: $("#type").val(),
						type_desc: $("#type_desc").val(),
				});
				alert("Data added successfully");
			}
			manage_category_type_link_child_window.data("kendoWindow").close();
		}
	});
	
	
	$('#manage_category_type_link_child_cancel').on('click',function()
	  {
		isScreenEditable = false;
	    if (value_changed_ind == true)
		{
			var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
			if (isClose == true)
				manage_category_type_link_child_window.data("kendoWindow").close();
				 
		} 
        else
		{
				manage_category_type_link_child_window.data("kendoWindow").close();
				
		}
		
	  });
	  
	  $('#category, #type').on('change', function()
	  {
	    value_changed_ind = true;	
	  });

}
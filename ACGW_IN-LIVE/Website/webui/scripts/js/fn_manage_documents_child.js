function fn_manage_documents_child()
{
	//Variable Declaration
	p_file_id = "";
	p_file_name = "";
	p_file_category = "";
	p_file_type = "";
	p_file_path = "";
	p_rec_tstamp = "00000000-0100-6F1E-0000-000000000000";
	file_obj = "";
	
	manage_documents_child_validator = $("#manage_documents_child_validator").kendoValidator().data("kendoValidator");	
	value_changed_ind = false;
	
	//File Categories DropDown List
	manage_documents_child_file_category = $("#manage_documents_child_file_category").kendoDropDownList({
	optionLabel: "- - - Select - - -",
    dataTextField: "file_catg_description",
    dataValueField: "file_category",
    dataSource:catg_type_data.slice(1),
	change: function() {
			p_file_category = this.value();
			p_file_type = "";
			var tmp_type_file_list = [];
			value_changed_ind = true;
			if(p_file_category !="")
			{
				for(type_file = 0;type_file < type_file_data.length;type_file++)
				{
					if(type_file_data[type_file].file_category == p_file_category)
					{
						tmp_type_file_list.push({file_type_description:type_file_data[type_file].file_type_description,file_type:type_file_data[type_file].file_type});
					}
				}
				manage_documents_child_file_type.dataSource.data(tmp_type_file_list);
				manage_documents_child_file_type.value("");
			}
			else
			{
				manage_documents_child_file_type.value("");
				manage_documents_child_file_type.dataSource.data(tmp_type_file_list);
			}
		}
	}).data("kendoDropDownList");
	
	//File Type DropDown List
	manage_documents_child_file_type = $("#manage_documents_child_file_type").kendoDropDownList({
		optionLabel: "- - - Select - - -",
		dataTextField: "file_type_description",
		dataValueField: "file_type",
		dataSource:tmp_type_file_data.slice(1),
		change: function() {
				p_file_type = this.value();
				value_changed_ind = true;
			}
	}).data("kendoDropDownList");
	
	// File Upload
	manage_documents_child_file = $("#manage_documents_child_file").kendoUpload({
		multiple: false,
		select: function(e) {
			$.each(e.files, function (index, value) 
			{
				file_obj = document.getElementById('manage_documents_child_file').files[0];
				p_file_name = file_obj.name;
				p_file_path = login_profile.client_id + "/" + login_profile.country_code + "/docstore/" + p_file_name;
				$('#manage_documents_child_file_path').text(p_file_path);
			});
		}
	}).data("kendoUpload");
	$("#manage_documents_child_file").closest(".k-upload").find("span").text("Choose file");
	$('#manage_documents_child_file').parent().css('width','100px');
	
	/* SET UP FOR ADD SCREEN */
	if (p_save_mode == "A")
	{
		$('#manage_documents_child_validator').children('li').eq(0).hide();
		$('#manage_documents_child_validator').children('li').eq(1).hide();
		$('#manage_documents_child_file_path').text(login_profile.client_id + "/" + login_profile.country_code + "/docstore/");
	}
	
	/* SET UP FOR EDIT SCREEN */
	if (p_save_mode == "U")
	{
		manage_documents_file_details=executeService_retrieve_manage_file_detail();
		if (manage_documents_file_details == '1')
		{
			return 1;
		}
		manage_documents_file_details_xml=loadXMLString(manage_documents_file_details);
		manage_documents_file_details_datasource = new kendo.data.DataSource({
			data: manage_documents_file_details_xml,
			schema: {
				type: "xml",
				data: "list/file_detail",
				model: {
					fields: {
						file_id:"file_id/text()",
						file_name:"file_name/text()",
						file_category:"file_category/text()",
						file_type:"file_type/text()",
						file_path:"file_path/text()"
						}
					}
				},
			pageSize: 10
		});
		manage_documents_file_details_datasource.read();
		manage_documents_file_details_datasource_data=manage_documents_file_details_datasource.at(0);
		
		p_file_id = manage_documents_file_details_datasource_data.file_id;
		p_file_name = manage_documents_file_details_datasource_data.file_name;
		p_file_category = manage_documents_file_details_datasource_data.file_category;
		p_file_type = manage_documents_file_details_datasource_data.file_type;
		p_file_path = manage_documents_file_details_datasource_data.file_path;
		p_rec_tstamp = "00000000-0100-6F1E-0000-000000000000";
		
		$('#manage_documents_child_file_id').text(p_file_id);
		$('#manage_documents_child_file_name').text(p_file_name);
		manage_documents_child_file_category.value(p_file_category);
		var tmp_type_file_list = [];
		for(type_file = 0;type_file < type_file_data.length;type_file++)
		{
			if(type_file_data[type_file].file_category == p_file_category)
			{
				tmp_type_file_list.push({file_type_description:type_file_data[type_file].file_type_description,file_type:type_file_data[type_file].file_type});
			}
		}
		manage_documents_child_file_type.dataSource.data(tmp_type_file_list);
		manage_documents_child_file_type.value(p_file_type);
		$('#manage_documents_child_file_path').text(p_file_path);
		$('#manage_documents_child_file').attr("disabled","disabled");
		$('#manage_documents_child_validator').children('li').eq(5).hide();
	}
	
	/* SUBMIT BUTTON CLICK */
	$("#manage_documents_child_submit").click(function()
	{		
		if(manage_documents_child_validator.validate())
		{
			if(p_save_mode == "A")
			{
				if(file_obj != "")
				{
					var status = KendoFileUpload("docstore",file_obj);
					if(status == 1)
					{
						var ex_status = executeService_save_manage_file_detail();
						if(ex_status != "SP010")
						{
							FileDelete("docstore/"+file_obj.name);
						}
						else
						{
							retrieve_click_identifier = 0;
							fn_refresh_manage_documents_grid();
						}
						manage_documents_child.data("kendoWindow").close();
						
					}
				}
				else
				{
					alert("please select file.");
				}
			}
			else if(p_save_mode == "U")
			{
				if (value_changed_ind == true)
				{
					var ex_status = executeService_save_manage_file_detail();
					if(ex_status == "SP010")
					{
						retrieve_click_identifier = 0;
						fn_refresh_manage_documents_grid();
					}
					manage_documents_child.data("kendoWindow").close();
				}
				else
				{
					alert('No changes done');
					manage_documents_child.data("kendoWindow").close();
				}
			}
		}
		else
		{
			alert("Please fill all the fields that are mandatory.");
		}
	});
	
	/* CANCEL BUTTON CLICK */
	$('#manage_documents_child_cancel').on('click',function()
	{
		isScreenEditable=false;
	    if (value_changed_ind == true)
		{
		  var isClose = confirm("You have modified one or more values on the form. Do you want to cancel the changes");
		  if (isClose == true)
			manage_documents_child.data("kendoWindow").close();
		}  
		else
		{
			manage_documents_child.data("kendoWindow").close();
		}
	});
}
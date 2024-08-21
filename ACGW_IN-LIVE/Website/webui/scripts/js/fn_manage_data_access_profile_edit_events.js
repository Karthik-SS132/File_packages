function fn_manage_data_access_profile_edit_change_event()
{
	if(access_for_Event == 'APPROVE-JO')
	{
		/*jo_category_data = [];
		executeService_retrieve_listof_jo_category();*/
		code_type = 'DPRQCATG';
		//search_field_1 = access_for_Event;
		search_field_2 = '';
		//list_of_codes = [{code:'ALL',description:'ALL'}];
		executeService_retrieve_listof_values_for_codes();
		
		/*manage_data_access_profile_edit_category_dd.enable(true);
		manage_data_access_profile_edit_category_dd.setDataSource(list_of_codes);*/
		if($("#lbl_manage_data_access_profile_edit_type").find('span').length == 0)
		{
			$("#lbl_manage_data_access_profile_edit_type").append('<span class="required">*</span>');
		}
	}
	else if(access_for_Event == 'APPROVE-INVADJ')
	{
		/*txn_type_list = [];
		executeService_retrieve_listof_inv_rectadj_txntypes();*/
		code_type = 'DPRQTYPE';
		//search_field_1 = access_for_Event;
		search_field_2 = '';
		//list_of_codes = [{code:'ALL',description:'ALL'}];
		executeService_retrieve_listof_values_for_codes();
		
		/*manage_data_access_profile_edit_category_dd.setDataSource(list_of_codes);
		manage_data_access_profile_edit_category_dd.enable(true);*/
		$("#manage_data_access_profile_edit_type").data('kendoDropDownList').value('');
		$("#manage_data_access_profile_edit_type").data('kendoDropDownList').enable(false);
		$("#lbl_manage_data_access_profile_edit_type").find('span').remove();
	}
}
function fn_manage_data_access_profile_edit_close_event(req_cat_val)
{
	if(access_for_Event == 'APPROVE-JO')
			{
				if (req_cat_val) 
				{
					//code_type = 'DPRQTYPE';
					//search_field_1 = "APPROVE-JO";
					//search_field_2 = req_cat_val;
					//list_of_codes = [{code:'ALL',description:'ALL'}];
					executeService_retrieve_listof_values_for_codes();
					
					jo_type_data_dS=new kendo.data.DataSource({data:list_of_codes});
					
					$("#manage_data_access_profile_edit_type").data('kendoDropDownList').enable(true);
					$("#manage_data_access_profile_edit_type").data('kendoDropDownList').setDataSource(jo_type_data_dS);
				} 
				else 
				{
					$("#manage_data_access_profile_edit_type").data('kendoDropDownList').value('');
					$("#manage_data_access_profile_edit_type").data('kendoDropDownList').enable(false);
				}
			}
			else if(access_for_Event == 'APPROVE-INVADJ')
			{
				$("#manage_data_access_profile_edit_type").data('kendoDropDownList').value('');
				$("#manage_data_access_profile_edit_type").data('kendoDropDownList').enable(false);
			}
}
function fn_manage_data_access_profile_edit_editing_event(manage_data_access_profile_edit_type_dd,manage_data_access_profile_edit_category_dd)
{
	//populating Request Category Dropdownlist
		if(selected_daprof_rowmodel.access_for_event == 'APPROVE-JO')
		{
			/*jo_category_data = [];
			executeService_retrieve_listof_jo_category();*/
			code_type = 'DPRQCATG';
			//search_field_1 = access_for_Event;
			access_for_Event = selected_daprof_rowmodel.access_for_event;
			search_field_1 = selected_daprof_rowmodel.access_for_event;
			search_field_2 = '';
			list_of_codes = [{code:'ALL',description:'ALL'}];
			executeService_retrieve_listof_values_for_codes();
			
			manage_data_access_profile_edit_category_dd.enable(true);
			manage_data_access_profile_edit_category_dd.setDataSource(list_of_codes);
			manage_data_access_profile_edit_type_dd.enable(true);

			code_type = 'DPRQTYPE';
			var req_cat_val = selected_daprof_rowmodel.request_category;
			search_field_2 = req_cat_val;
			list_of_codes = [{code:'ALL',description:'ALL'}];
			
			fn_manage_data_access_profile_edit_close_event(req_cat_val);
			if($("#lbl_manage_data_access_profile_edit_type").find('span').length == 0)
			{
				$("#lbl_manage_data_access_profile_edit_type").append('<span class="required">*</span>');
			}
		}
		else if(selected_daprof_rowmodel.access_for_event == 'APPROVE-INVADJ')
		{
			/*txn_type_list = [];
			executeService_retrieve_listof_inv_rectadj_txntypes();*/
			code_type = 'DPRQTYPE';
			search_field_1 = selected_daprof_rowmodel.access_for_event;
			search_field_2 = '';
			list_of_codes = [];
			executeService_retrieve_listof_values_for_codes();
			
			manage_data_access_profile_edit_category_dd.setDataSource(list_of_codes);
			manage_data_access_profile_edit_category_dd.enable(true);
			manage_data_access_profile_edit_type_dd.value('');
			manage_data_access_profile_edit_type_dd.enable(false);
			$("#lbl_manage_data_access_profile_edit_type").find('span').remove();
		}
		
}
DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_enquiry_search_quote_dynapac]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_enquiry_search_quote_dynapac] 
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id], 
    @i_custom_info_code [uddt_varchar_60], 
    @i_inputparam_xml [uddt_nvarchar_max], 
    @o_retrieve_status [uddt_varchar_5] OUTPUT
AS
BEGIN


	select '' as custom_info_list,
		'{' +
			'"code":"' + a.call_ref_no + '",' +
			 '"description":"' + isnull(a.customer_name,'')+','+isnull(cl.address_line_1,'') +','+isnull(cl.city,'')+'-'+isnull(a.problem_description,'')+'"'+
		'}'
	as o_custom_info_json
	from call_register a, customer_location cl, call_assignment ca
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = cl.company_id
				and a.country_code = cl.country_code
				and a.customer_id = cl.customer_id
				and a.call_category = 'SA'
				and a.call_status not in ('A','AU','AQ','CN','CL','OW','OL')
				and a.company_id = ca.company_id
				and a.country_code = ca.country_code
				and a.call_ref_no = ca.call_ref_no
				and ca.resource_emp_id 
								in (select employee_id from users u 
								where u.company_id = @i_client_id
								and u.country_code = @i_country_code
								and u.user_id  = @i_user_id)
	/*and (
		cu.customer_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
		or
		a.call_ref_no like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
		*/
				
			
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

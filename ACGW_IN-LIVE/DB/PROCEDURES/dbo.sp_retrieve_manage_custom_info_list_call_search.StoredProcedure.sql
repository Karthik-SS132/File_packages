IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_call_search')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_call_search]
END
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_call_search]    Script Date: 23-01-2024 18:46:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_call_search] 
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

	declare @p_call_category varchar(3), @p_logged_organogram_code nvarchar(30), @p_employee_id  nvarchar(12),
	@p_filter_text nvarchar(10)


	create table #inputparams 
	(
		paramname varchar(50) not null,
		paramval varchar(50) null
	)


	if (@i_inputparam_xml = '') 
	begin 
		set @i_inputparam_xml = '{}' 
	end

	insert #inputparams 
	(
		paramname, 
		paramval
	)
	select [key], [value]
	from openjson(@i_inputparam_xml)

	update #inputparams
	set paramval = null 
	where paramval = 'ALL'
		or paramval = ''


	select @p_call_category = paramval 
	from #inputparams 
	where paramname = 'category'
    select @p_filter_text = paramval 
	from #inputparams 
	where paramname = 'filter_text'



	select @p_logged_organogram_code = organogram_level_code 
				from employee a
					where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.employee_id in (select employee_id from users
										  where company_id = @i_client_id
												and country_code = @i_country_code
												and user_id = @i_user_id
				    )

   select @p_employee_id=employee_id from users
							where company_id = @i_client_id
												and country_code = @i_country_code
												and user_id = @i_user_id
	
	select '' as custom_info_list,
		'{' +
			'"code":"' + a.call_ref_no+ '",' +
			'"description":"' + a.call_ref_no +' - '+ 
									(select customer_name 
										from customer 
											where company_id = @i_client_id
											and country_code = @i_country_code
											and customer_id = a.customer_id
									)+ '"' +
		'}'
	as o_custom_info_json
	from call_register a, call_assignment b
	where a.company_id = @i_client_id
	and a.country_code = @i_country_code
	and a.company_id = b.company_id
	and a.company_id= b.company_id
	and a.call_category = 'SE'
	and a.call_status in ('A','I')
	and a.call_ref_no= b.call_ref_no
	and b.resource_emp_id=  @p_employee_id
	and b.primary_resource_ind=1
	and a.call_ref_no like '%'+@p_filter_text+'%'
	--and a.organogram_level_code = @p_logged_organogram_code
	
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END

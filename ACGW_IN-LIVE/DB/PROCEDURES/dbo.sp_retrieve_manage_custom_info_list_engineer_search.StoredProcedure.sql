IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_engineer_search')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_engineer_search]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_engineer_search] 
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

	declare @p_call_category varchar(3),
	@p_logged_organogram_code nvarchar(30)


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

	select @p_logged_organogram_code = organogram_level_code 
				from employee a
					where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.employee_id in (select employee_id from users
										  where company_id = @i_client_id
												and country_code = @i_country_code
												and user_id = @i_user_id
										)

		          

	
	select '' as custom_info_list,
		'{' +
			'"code":"' + a.employee_id+ '",' +
			'"description":"' + a.first_name +' '+isnull(a.last_name,'') +' - ['+ u.user_id +']'+ '"' +
		'}'
	as o_custom_info_json
	from employee a, users u
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.employee_id = u.employee_id
		and a.employee_status = 'A'
		and u.user_group_id = 'SEENG'
		and a.organogram_level_code  = isnull(@p_logged_organogram_code,'')
		
	EXCEPT
	
		select '' as custom_info_list,
		'{' +
			'"code":"' + a.employee_id+ '",' +
			'"description":"' + a.first_name +' '+isnull(a.last_name,'') +' - ['+ u.user_id +']'+ '"' +
		'}'
	as o_custom_info_json
	from employee a, users u
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.employee_id = u.employee_id
		and u.user_id = @i_user_id

	
	
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END


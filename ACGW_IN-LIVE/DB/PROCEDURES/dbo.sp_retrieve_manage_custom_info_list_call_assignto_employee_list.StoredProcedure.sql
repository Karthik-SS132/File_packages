IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_call_assignto_employee_list')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_call_assignto_employee_list]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_call_assignto_employee_list] 
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
			'"emp_id":"' + b.employee_id + '",' +
			'"emp_name":"' + c.title + ' ' + c.first_name + ' ' + ISNULL(c.middle_name, '') + ' ' + c.last_name + '"' +
		'}'
	as o_custom_info_json
	from assignto_functional_role a, functional_role_employee b, employee c
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.assign_typecode = 'CALL'
		and a.company_id = b.company_id
		and a.country_code = b.country_code
		and a.functional_role_id = b.functional_role_id
		and b.company_id = c.company_id
		and b.country_code = c.country_code
		and b.employee_id = c.employee_id
		and c.employee_status = 'A'
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

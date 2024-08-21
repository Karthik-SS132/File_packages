DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_state_list_dynapac]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_state_list_dynapac] 
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
				'"code":"' + s.state_code + '",' +
				'"description":"' + s.state + '",' +
				'"parent_code":"' + s.country_code + '",' +
				'"parent_id":"' + (select country_code from country where country_code = s.country_code) + '"' +
			'}'
		as o_custom_info_json /* unicode string */
		from state s
		where s.country_code = @i_country_code
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

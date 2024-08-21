DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_customerloc_list_dynapac]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_customerloc_list_dynapac] 
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
				'"code":"' + cl.location_code + '",' +
				'"description":"' + cl.location_name_long + '",' +
				'"parent_code":"' + c.customer_id + '",' +
				'"parent_id":"' + c.customer_id + '"' +
			'}'
		as o_custom_info_json /* unicode string */
		from customer_location cl,customer c
		where cl.company_id = @i_client_id
			and cl.country_code = @i_country_code
			and c.company_id = @i_client_id
			and c.country_code = @i_country_code
			and cl.company_id = c.company_id
			and cl.country_code = c.country_code
			and cl.customer_id = c.customer_id
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

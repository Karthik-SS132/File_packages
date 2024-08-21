DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_equipmentlist_dynapac]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_equipmentlist_dynapac] 
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
				'"code":"' + a.type_code_value + '",' +
				'"description":"' +  dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'EQUIPTYPE',a.type_code_value) + '",' +
				'"parent_code":"' + ISNULL(a.category_code_value, '') + '",' +
				'"parent_id":"' + ISNULL(a.category_code_value, '') + '"' +
			'}' as o_custom_info_json
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'EC'
		
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

﻿DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_eqsalecompetitor_dynapac]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_eqsalecompetitor_dynapac] 
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
				'"code":"' + a.field_value1 + '",' +
				'"description":"' + a.field_value1 + '",' +
				'"parent_code":"' + ISNULL(a.field_value2, '') + '",' +
				'"parent_id":"' + ISNULL(a.field_value2, '') + '"' +
			'}' as o_custom_info_json
		from product_customization_field_value_mapping a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.value_mapping_code = 'EQSALECOMPETITOR'
			
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
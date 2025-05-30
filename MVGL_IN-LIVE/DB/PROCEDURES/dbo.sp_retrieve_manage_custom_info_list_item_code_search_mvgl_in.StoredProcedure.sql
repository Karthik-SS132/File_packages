﻿DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_item_code_search_mvgl_in]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_item_code_search_mvgl_in] 
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

	
	select distinct '' as custom_info_list,
			'{' +
				'"code":"' + item_code + '",' +
				'"description":"' + item_description + '",' +
				'"search":"' +item_code +'-'+ item_description + '"' +
			'}' as o_custom_info_json
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END



GO

﻿DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_user_list_dynapac]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_user_list_dynapac] 
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
			'"code":"' + isnull(a.first_name,'')+''+isnull(a.middle_name,'') +'-'+isnull(a.last_name,'') + '",' +
			'"description":"'+ isnull(a.first_name,'')+''+isnull(a.middle_name,'') +'-'+isnull(a.last_name,'') + '"' +
		'}'
	as o_custom_info_json
	from visitor a 
	where a.company_id = @i_client_id 
		  and a.country_code = @i_country_code
		  and a.visitor_status = 'A'
		  
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
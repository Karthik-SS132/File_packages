﻿IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_user_attachment_path')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_user_attachment_path]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_user_attachment_path] 
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
			'"transaction_type":"' + 'CALL' + '",' +
			'"path":"' + a.code + '"' +
		'}'
	as o_custom_info_json
	from code_table a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.code_type = 'CALLATTACHPATH'
	union
	select '' as custom_info_list,
		'{' +			
			'"transaction_type":"' + 'EXPENSE' + '",' +
			'"path":"' + a.code + '"' +
		'}'
	as o_custom_info_json
	from code_table a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.code_type = 'EXPDOCATTACHPATH'
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
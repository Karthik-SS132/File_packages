DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_mserviceAI_attachmentList]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_mserviceAI_attachmentList] 
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

	declare @p_transaction_type varchar(30),
		@p_transaction_ref_no varchar(30)

	select @p_transaction_type = isnull(json_value(@i_inputparam_xml, '$.msgBody.custom.trans_type'), '')
	select @p_transaction_ref_no = isnull(json_value(@i_inputparam_xml, '$.msgBody.custom.transaction_ref_no'), '')

	if (@p_transaction_type = 'CALL')
	begin

		select top(1) '' as custom_info_list,
			'{' +
				'"type":"' + attachment_file_type + '",' +
				'"name":"' + attachment_file_name + '",' +
				'"src":"' + replace(attachment_file_path, '\', '\\') + '\\\\' + attachment_file_name + '"' +
			'}'
		as o_custom_info_json
		from call_user_attachments
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @p_transaction_ref_no
		order by attachment_file_sysgen_id desc
	
	end
	
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

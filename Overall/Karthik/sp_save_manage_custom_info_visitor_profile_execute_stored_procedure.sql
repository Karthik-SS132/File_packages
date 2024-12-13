
DECLARE	@return_value int,
		@o_outputparam_detail_xml uddt_nvarchar_max,
		@o_update_status uddt_varchar_5,
		@i_error_msg uddt_nvarchar_max,
		@data sp_save_manage_custom_info_custom_info_detail

SELECT	@o_outputparam_detail_xml = ''
SELECT	@o_update_status = ''
SELECT	@i_error_msg = ''

insert @data (i_custom_info_detail_sl_no, i_custom_info_detail_inputparam_detail_xml, i_custom_info_detail_crud_ind)
select 1, '', ''



EXEC	@return_value = [dbo].[sp_save_manage_custom_info_visitor_profile]
		@i_session_id = '7E5851F3-B36A-408E-A0DA-49167A058B65',
		@i_user_id = 'cappvisitor',
		@i_client_id = 'liugong',
		@i_locale_id = 'en-us',
		@i_country_code = 'in',
		@i_custom_info_code = 'visitor_profile',
		@i_custom_info_ref_no1 = '',
		@i_custom_info_ref_no2 = '',
		@i_inputparam_header_xml = '{"first_name":"mgen","last_name":"t","mobile_no":"+91-9876598765","email_id":"test.com","org_name":"test","org_address":"test"}',
		@i_rec_timestamp = '00000000-0000-0000-0000-000000000000',
		@i_save_mode = 'A',
		@o_outputparam_detail_xml = @o_outputparam_detail_xml OUTPUT,
		@o_update_status = @o_update_status OUTPUT,
		@custom_info_detail = @data,
		@i_error_msg = @i_error_msg OUTPUT

SELECT	@o_outputparam_detail_xml as N'@o_outputparam_detail_xml',
		@o_update_status as N'@o_update_status',
		@i_error_msg as N'@i_error_msg'

SELECT	'Return Value' = @return_value

GO

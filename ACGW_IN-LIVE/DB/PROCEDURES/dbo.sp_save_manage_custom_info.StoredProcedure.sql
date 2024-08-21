IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info] 
   @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_custom_info_code [uddt_varchar_60], 
    @i_custom_info_ref_no1 [uddt_nvarchar_60], 
    @i_custom_info_ref_no2 [uddt_nvarchar_60], 
    @i_inputparam_header_xml [uddt_nvarchar_max], 
    @i_rec_timestamp [uddt_uid_timestamp], 
    @i_save_mode [uddt_varchar_1], 
	@o_outputparam_detail_xml [uddt_nvarchar_max] OUTPUT,													  
    @o_update_status [uddt_varchar_5] OUTPUT, 
	@custom_info_detail [sp_save_manage_custom_info_custom_info_detail] READONLY,
    @errorNo [errorno] OUTPUT
AS
BEGIN
    /*
     * Function to save custom info
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;


    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
															     @o_outputparam_detail_xml = '' /* unicode string */
         @o_update_status = '' /* string */
         @errorNo = ''	/* string */
     */

    /*
     * List of errors associated to this stored procedure. Use the text of the error
     * messages printed below as a guidance to set appropriate error number to @errorNo inside the procedure.
     * E_UP_005 - Update Failure : Record updated by another user. Please Retry the retrieval of the record and update.
     * E_UP_251 - Failed saving Information
     * 
     * Use the following SQL statement to set @errorNo:
     * SET @errorNo = 'One of the error numbers associated to this procedure as per list above'
     */

	declare @p_SQLString nvarchar(max) ,	
			@p_ParmDefinition nvarchar(max),
			@p_error_msg nvarchar(max)

	set @o_update_status = ''
	set @errorNo = ''
	set @o_outputparam_detail_xml = ''							   

	
	if exists ( 
		select 1 from sys.objects
		where type = 'P' 
			and name = 'sp_save_manage_custom_info_' + @i_custom_info_code + '_' + @i_client_id + '_' + @i_country_code
	)
	begin

		set @p_SQLString = 'execute ' + 'sp_save_manage_custom_info_' + @i_custom_info_code + '_' + @i_client_id + '_' + @i_country_code +
			N'	@i_session_id, 
				@i_user_id, 
				@i_client_id, 
				@i_locale_id, 
				@i_country_code,
				@i_custom_info_code, 
				@i_custom_info_ref_no1, 
				@i_custom_info_ref_no2, 
				@i_inputparam_header_xml, 
				@i_rec_timestamp, 
				@i_save_mode, 
				@o_outputparam_detail_xml OUTPUT,					 
				@o_update_status OUTPUT, 
				@custom_info_detail,
				@i_error_msg OUTPUT';

		set @p_ParmDefinition = N'@i_session_id [sessionid], 
			@i_user_id [userid], 
			@i_client_id [uddt_client_id], 
			@i_locale_id [uddt_locale_id], 
			@i_country_code [uddt_country_code], 
			@i_custom_info_code [uddt_varchar_60], 
			@i_custom_info_ref_no1 [uddt_nvarchar_60], 
			@i_custom_info_ref_no2 [uddt_nvarchar_60], 
			@i_inputparam_header_xml [uddt_nvarchar_max], 
			@i_rec_timestamp [uddt_uid_timestamp], 
			@i_save_mode [uddt_varchar_1], 
		   @o_outputparam_detail_xml [uddt_nvarchar_max] OUTPUT,						
			@o_update_status [uddt_varchar_5] OUTPUT, 
			@custom_info_detail [sp_save_manage_custom_info_custom_info_detail] READONLY,
			@i_error_msg [uddt_nvarchar_max] OUTPUT';

		execute sp_executesql @p_SQLString, @p_ParmDefinition,
			@i_session_id = @i_session_id, 
			@i_user_id = @i_user_id, 
			@i_client_id = @i_client_id, 
			@i_locale_id = @i_locale_id, 
			@i_country_code = @i_country_code,
			@i_custom_info_code = @i_custom_info_code, 
			@i_custom_info_ref_no1 = @i_custom_info_ref_no1, 
			@i_custom_info_ref_no2 = @i_custom_info_ref_no2, 
			@i_inputparam_header_xml = @i_inputparam_header_xml, 
			@i_rec_timestamp = @i_rec_timestamp, 
			@i_save_mode = @i_save_mode, 
			@o_outputparam_detail_xml = @o_outputparam_detail_xml OUTPUT,		
			@o_update_status = @o_update_status OUTPUT, 
			@custom_info_detail = @custom_info_detail,
			@i_error_msg = @p_error_msg OUTPUT

	end
	else if exists ( 
		select 1 from sys.objects
		where type = 'P' 
			and name = 'sp_save_manage_custom_info_' + @i_custom_info_code + '_' + @i_client_id
	)
	begin

		set @p_SQLString = 'execute ' + 'sp_save_manage_custom_info_' + @i_custom_info_code + '_' + @i_client_id +
			N'	@i_session_id, 
				@i_user_id, 
				@i_client_id, 
				@i_locale_id, 
				@i_country_code,
				@i_custom_info_code, 
				@i_custom_info_ref_no1, 
				@i_custom_info_ref_no2, 
				@i_inputparam_header_xml, 
				@i_rec_timestamp, 
				@i_save_mode, 
				@o_outputparam_detail_xml OUTPUT,					 
				@o_update_status OUTPUT, 
				@custom_info_detail,
				@i_error_msg OUTPUT';

		set @p_ParmDefinition = N'@i_session_id [sessionid], 
			@i_user_id [userid], 
			@i_client_id [uddt_client_id], 
			@i_locale_id [uddt_locale_id], 
			@i_country_code [uddt_country_code], 
			@i_custom_info_code [uddt_varchar_60], 
			@i_custom_info_ref_no1 [uddt_nvarchar_60], 
			@i_custom_info_ref_no2 [uddt_nvarchar_60], 
			@i_inputparam_header_xml [uddt_nvarchar_max], 
			@i_rec_timestamp [uddt_uid_timestamp], 
			@i_save_mode [uddt_varchar_1], 
			@o_outputparam_detail_xml [uddt_nvarchar_max] OUTPUT,							
			@o_update_status [uddt_varchar_5] OUTPUT, 
			@custom_info_detail [sp_save_manage_custom_info_custom_info_detail] READONLY,
			@i_error_msg [uddt_nvarchar_max] OUTPUT';

		execute sp_executesql @p_SQLString, @p_ParmDefinition,
			@i_session_id = @i_session_id, 
			@i_user_id = @i_user_id, 
			@i_client_id = @i_client_id, 
			@i_locale_id = @i_locale_id, 
			@i_country_code = @i_country_code,
			@i_custom_info_code = @i_custom_info_code, 
			@i_custom_info_ref_no1 = @i_custom_info_ref_no1, 
			@i_custom_info_ref_no2 = @i_custom_info_ref_no2, 
			@i_inputparam_header_xml = @i_inputparam_header_xml, 
			@i_rec_timestamp = @i_rec_timestamp, 
			@i_save_mode = @i_save_mode, 
			@o_outputparam_detail_xml = @o_outputparam_detail_xml OUTPUT,	
			@o_update_status = @o_update_status OUTPUT, 
			@custom_info_detail = @custom_info_detail,
			@i_error_msg = @p_error_msg OUTPUT

	end
	else if exists ( 
		select 1 from sys.objects
		where type = 'P' 
			and name = 'sp_save_manage_custom_info_' + @i_custom_info_code
	)
	begin

		set @p_SQLString = 'execute ' + 'sp_save_manage_custom_info_' + @i_custom_info_code +
			N'	@i_session_id, 
				@i_user_id, 
				@i_client_id, 
				@i_locale_id, 
				@i_country_code,
				@i_custom_info_code, 
				@i_custom_info_ref_no1, 
				@i_custom_info_ref_no2, 
				@i_inputparam_header_xml, 
				@i_rec_timestamp, 
				@i_save_mode, 
				@o_outputparam_detail_xml OUTPUT,					 
				@o_update_status OUTPUT, 
				@custom_info_detail,
				@i_error_msg OUTPUT';

		set @p_ParmDefinition = N'@i_session_id [sessionid], 
			@i_user_id [userid], 
			@i_client_id [uddt_client_id], 
			@i_locale_id [uddt_locale_id], 
			@i_country_code [uddt_country_code], 
			@i_custom_info_code [uddt_varchar_60], 
			@i_custom_info_ref_no1 [uddt_nvarchar_60], 
			@i_custom_info_ref_no2 [uddt_nvarchar_60], 
			@i_inputparam_header_xml [uddt_nvarchar_max], 
			@i_rec_timestamp [uddt_uid_timestamp], 
			@i_save_mode [uddt_varchar_1], 
			@o_outputparam_detail_xml [uddt_nvarchar_max] OUTPUT,						
			@o_update_status [uddt_varchar_5] OUTPUT, 
			@custom_info_detail [sp_save_manage_custom_info_custom_info_detail] READONLY,
			@i_error_msg [uddt_nvarchar_max] OUTPUT';		

		execute sp_executesql @p_SQLString, @p_ParmDefinition,
			@i_session_id = @i_session_id, 
			@i_user_id = @i_user_id, 
			@i_client_id = @i_client_id, 
			@i_locale_id = @i_locale_id, 
			@i_country_code = @i_country_code,
			@i_custom_info_code = @i_custom_info_code, 
			@i_custom_info_ref_no1 = @i_custom_info_ref_no1, 
			@i_custom_info_ref_no2 = @i_custom_info_ref_no2, 
			@i_inputparam_header_xml = @i_inputparam_header_xml, 
			@i_rec_timestamp = @i_rec_timestamp, 
			@i_save_mode = @i_save_mode, 
			@o_outputparam_detail_xml = @o_outputparam_detail_xml OUTPUT,		
			@o_update_status = @o_update_status OUTPUT, 
			@custom_info_detail = @custom_info_detail,
			@i_error_msg = @p_error_msg OUTPUT

	end
	else
	begin
		select @p_error_msg = 'custom info code does not exists'
	end

	if len(@p_error_msg) > 0
	begin
		raiserror(@p_error_msg, 16, 1)
	end

    SET NOCOUNT OFF;
END


GO

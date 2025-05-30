/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_validate_security_code]    Script Date: 9/14/2022 3:51:16 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_save_manage_custom_info_validate_security_code]
GO
/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_validate_security_code]    Script Date: 9/14/2022 3:51:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_validate_security_code] 
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
    @i_error_msg [uddt_nvarchar_max] OUTPUT
AS
BEGIN	

	/* INPUT STRUCTURE */
	--{
	--	"purpose_code":"AUTHUSER",
	--	"security_code":"******"
	--}

	declare @p_purpose_code varchar(60),
		@p_security_code varchar(6)

	select @p_purpose_code = json_value(@i_inputparam_header_xml, '$.purpose_code')
	select @p_security_code = json_value(@i_inputparam_header_xml, '$.security_code')

	if not exists 
	(
		select 1 from security_code_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id
			and purpose_code = @p_purpose_code
			and validation_status is null
	)
	begin

		set @i_error_msg = '{"code":"error_invalid_details"}'
		return

	end

	if not exists
	(
		select 1 from security_code_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id
			and purpose_code = @p_purpose_code
			and validation_status is null
			and datediff(second, code_generated_on_datetime, sysdatetimeoffset()) < expiry_in_seconds
	)
	begin

		update security_code_log
		set validation_datetime = sysdatetimeoffset(),
			validation_status = 'E'
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id
			and purpose_code = @p_purpose_code
			and validation_status is null

		if @@ROWCOUNT = 0
		begin
			set @i_error_msg = '{"code":"error_update_security_code_log"}'
			return
		end

		set @o_outputparam_detail_xml = '{"code":"error_security_code_expired"}'
		set @o_update_status = 'SP001'
		return

	end

	if not exists
	(
		select 1 from security_code_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id
			and purpose_code = @p_purpose_code
			and validation_status is null
			and datediff(second, code_generated_on_datetime, sysdatetimeoffset()) < expiry_in_seconds
			and security_code = @p_security_code
	)
	begin

		set @i_error_msg = '{"code":"error_incorrect_security_code"}'
		return

	end

	update security_code_log
	set validation_datetime = sysdatetimeoffset(),
		validation_status = 'S'
	where company_id = @i_client_id
		and country_code = @i_country_code
		and user_id = @i_user_id
		and purpose_code = @p_purpose_code
		and validation_status is null
		and datediff(second, code_generated_on_datetime, sysdatetimeoffset()) < expiry_in_seconds
		and security_code = @p_security_code

	if @@ROWCOUNT = 0
	begin
		set @i_error_msg = '{"code":"error_update_security_code_log"}'
		return
	end
	
	set @o_update_status = 'SP001'
				
END
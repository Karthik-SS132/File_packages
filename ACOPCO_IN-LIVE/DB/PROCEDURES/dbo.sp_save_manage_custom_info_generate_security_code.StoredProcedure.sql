/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_generate_security_code]    Script Date: 7/26/2023 6:33:43 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_save_manage_custom_info_generate_security_code]
GO
/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_generate_security_code]    Script Date: 7/26/2023 6:33:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_generate_security_code] 
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
	--	"purpose_code":"AUTHUSER"
	--}

	declare @p_purpose_code varchar(60),
		@p_expiry_in_seconds tinyint,
		@p_security_code varchar(6),
		@p_notification_xml nvarchar(max),
		@p_notification_id int,
		@p_notification_event_code nvarchar(60),
		@p_package_id varchar(15),
		@p_app_id varchar(60),
		@p_app_name varchar(60),
		@p_name nvarchar(160)

	select @p_purpose_code = json_value(@i_inputparam_header_xml, '$.purpose_code')
	select @p_app_id = json_value(@i_inputparam_header_xml, '$.app_id')

	/* UPDATE THE EXPIRED SECURITY CODE FOR THE USER AND PURPOSE CODES */
	if exists 
	(
		select 1 from security_code_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id
			and purpose_code = @p_purpose_code
			and validation_status is null
			and datediff(second, code_generated_on_datetime, sysdatetimeoffset()) > expiry_in_seconds
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

	end


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

		/* INSERT THE NEW SECURITY CODE */
		select @p_expiry_in_seconds = config_value1 
		from company_configuration_matrix
		where company_id = @i_client_id
			and country_code = @i_country_code
			and config_code = 'SECURITY_CODE_EXPIRY_INTERVAL_IN_SEC'
			and config_sub_code = @p_purpose_code

			select @p_expiry_in_seconds
		select @p_package_id = package_id
		from company_subscription
		where company_id = @i_client_id
			and country_code = @i_country_code

		select @p_app_name = subscription_code5
		from company_subscription_matrix
		where company_id = @i_client_id
			and country_code = @i_country_code
			and subscription_code1 = 'APPVERSION'
			and subscription_code2 = @p_app_id

		select @p_name = title + '.' + first_name + ' ' + isnull(middle_name, '') + ' ' + last_name
		from employee
		where company_id =  @i_client_id
			and country_code = @i_country_code
			and employee_id = (
				select employee_id 
				from users
				where company_id =  @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)


		if (@p_expiry_in_seconds is null)
		begin
			set @i_error_msg = '{"code":"invalid_expiry_interval"}'
			return
		end

		select @p_security_code = left(cast(rand() * 1000000000 + 999999 as int), 6)

		insert security_code_log
		(
			company_id,
			country_code,
			user_id,
			security_code,
			purpose_code,
			expiry_in_seconds,
			code_generated_on_datetime,
			last_update_id
		)
		select @i_client_id,
			@i_country_code,
			@i_user_id,
			@p_security_code,
			@p_purpose_code,
			@p_expiry_in_seconds,
			sysdatetimeoffset(),
			@i_user_id

		if @@ROWCOUNT = 0
		begin
			set @i_error_msg = '{"code":"error_generating_the_code"}'
			return
		end

		select @p_notification_xml = '<notification_info>' + 
				'<security_code>' + @p_security_code + '</security_code>' +
				'<purpose_code>' + @p_purpose_code + '</purpose_code>' + 
				'<app_name>' + @p_app_name + '</app_name>' +
				'<valid_mins>' + convert(varchar(3), @p_expiry_in_seconds/60) + '</valid_mins>' + 
				'<package_id>' + @p_package_id + '</package_id>' +
				'<name>' + @p_name + '</name>' +
			'</notification_info>'
		select @p_notification_event_code = @p_purpose_code + '_SECURITY_CODE'
	 	 
 		execute sp_log_new_notification  
			@i_session_id, 
			@i_user_id, 
			@i_client_id, 
	   		@i_locale_id, 
			@i_country_code, 
			@p_notification_event_code,
			@p_notification_xml, 
			@i_user_id, 
			@p_notification_id OUTPUT
	   		
	   		if @p_notification_id = 0
	   		begin
	   			set @i_error_msg = '{"code":"error_creating_notification"}'
				return
	   		end

	end
	else
	begin

		
		/* INSERT THE NEW SECURITY CODE */
		select @p_expiry_in_seconds = config_value1 
		from company_configuration_matrix
		where company_id = @i_client_id
			and country_code = @i_country_code
			and config_code = 'SECURITY_CODE_EXPIRY_INTERVAL_IN_SEC'
			and config_sub_code = @p_purpose_code

		select @p_package_id = package_id
		from company_subscription
		where company_id = @i_client_id
			and country_code = @i_country_code

		select @p_app_name = subscription_code5
		from company_subscription_matrix
		where company_id = @i_client_id
			and country_code = @i_country_code
			and subscription_code1 = 'APPVERSION'
			and subscription_code2 = @p_app_id

		select @p_name = title + '.' + first_name + ' ' + isnull(middle_name, '') + ' ' + last_name
		from employee
		where company_id =  @i_client_id
			and country_code = @i_country_code
			and employee_id = (
				select employee_id 
				from users
				where company_id =  @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)


		/* SEND THE NOT EXPRED SECURITY_CODE AGAIN */
		select @p_security_code = security_code
		from security_code_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id
			and purpose_code = @p_purpose_code
			and validation_status is null
		order by code_generated_on_datetime desc

		select @p_notification_xml = '<notification_info>' + 
				'<security_code>' + @p_security_code + '</security_code>' +
				'<purpose_code>' + @p_purpose_code + '</purpose_code>' + 
				'<app_name>' + @p_app_name + '</app_name>' +
				'<valid_mins>' + convert(varchar(3), @p_expiry_in_seconds/60) + '</valid_mins>' + 
				'<package_id>' + @p_package_id + '</package_id>' +
				'<name>' + @p_name + '</name>' +
			'</notification_info>'
		select @p_notification_event_code = @p_purpose_code + '_SECURITY_CODE'
	 	 
 		execute sp_log_new_notification  
			@i_session_id, 
			@i_user_id, 
			@i_client_id, 
	   		@i_locale_id, 
			@i_country_code, 
			@p_notification_event_code,
			@p_notification_xml, 
			@i_user_id, 
			@p_notification_id OUTPUT
	   		
	   		if @p_notification_id = 0
	   		begin
	   			set @i_error_msg = '{"code":"error_creating_notification"}'
				return
	   		end

	end

	set @o_update_status = 'SP001'
				
END
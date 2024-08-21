/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_device_profile]    Script Date: 3/31/2023 10:48:17 AM ******/
DROP PROCEDURE  IF EXISTS [dbo].[sp_save_manage_custom_info_device_profile]
GO
/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_device_profile]    Script Date: 3/31/2023 10:48:18 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_device_profile]
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
	
	/* DECLARING THE VARIABLES */
	declare @p_device_id varchar(100),
		@p_app_id varchar(50),
		@p_app_version nvarchar(50),
		@p_employee_id nvarchar(12),
		@p_channel_id varchar(10),
		@p_device_platform varchar(50),
		@p_model nvarchar(50),
		@p_manufacturer nvarchar(50),
		@p_device_version nvarchar(50),
		@p_visitor_id varchar(20),
		@p_user_id nvarchar(12)

	
	/* GETTING THE INPUTPARAMETER VARIABLE VALUES */
	select @p_device_id = json_value(@i_inputparam_header_xml, '$.device_id')
	select @p_app_id = json_value(@i_inputparam_header_xml, '$.app_id')
	select @p_app_version = json_value(@i_inputparam_header_xml, '$.app_version')
	select @p_channel_id = json_value(@i_inputparam_header_xml, '$.channel_id')
	select @p_device_platform = json_value(@i_inputparam_header_xml, '$.platform')
	select @p_model = json_value(@i_inputparam_header_xml, '$.model')
	select @p_manufacturer = json_value(@i_inputparam_header_xml, '$.manufacturer')
	select @p_device_version = json_value(@i_inputparam_header_xml, '$.device_version')
	select @p_visitor_id = json_value(@i_inputparam_header_xml, '$.visitor_id')


	/* GETTING THE EMPLOYEE ID AND USER ID */
	if (@p_visitor_id = '')
	begin

		select @p_user_id = @i_user_id
		
		select @p_employee_id = employee_id
		from users
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id

	end
	else
	begin

		select @p_user_id = @p_visitor_id

		select @p_employee_id = 'VISITOR'

	end


	if exists 
	(
		select 1 from device_register
		where company_id = @i_client_id
			and country_code = @i_country_code
			and device_id = @p_device_id
			and app_id = @p_app_id
	)
	begin

		update device_register
		set user_id = @p_user_id,
			employee_id = @p_employee_id,
			channel_id = @p_channel_id,
			app_version = @p_app_version,			
			active_ind = 1,
			device_platform = @p_device_platform,
			model = @p_model,
			manufacturer = @p_manufacturer, 
			device_version = @p_device_version, 
			last_update_id = @i_user_id
		where company_id = @i_client_id
			and country_code = @i_country_code
			and device_id = @p_device_id
			and app_id = @p_app_id

		if (@@ROWCOUNT = 0)
		begin

			set @i_error_msg = '{"code":"error_device_update"}'
			return

		end

	end
	else
	begin

		insert device_register
		(
			company_id,
			country_code,
			device_id,
			app_id,
			app_version,
			user_id,
			employee_id,
			active_ind,
			channel_id,
			device_platform,
			model,
			manufacturer, 
			device_version, 
			last_update_id
		)
		select @i_client_id,
			@i_country_code,
			@p_device_id,
			@p_app_id,
			@p_app_version,
			@p_user_id,
			@p_employee_id,
			1,
			@p_channel_id,
			@p_device_platform,
			@p_model,
			@p_manufacturer,
			@p_device_version,
			@i_user_id

		if (@@ROWCOUNT = 0)
		begin

			set @i_error_msg = '{"code":"error_device_insert"}'
			return

		end

	end

		
	set @o_update_status = 'SP001'

END
GO

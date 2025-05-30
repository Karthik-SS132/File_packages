IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_visitor_profile')
BEGIN
/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_visitor_profile]    Script Date: 5/12/2023 5:58:17 PM ******/
	DROP PROCEDURE IF EXISTS [dbo].[sp_save_manage_custom_info_visitor_profile]
END
GO
/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_visitor_profile]    Script Date: 5/12/2023 5:58:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_visitor_profile]
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
	declare @p_first_name nvarchar(50), 
		@p_last_name nvarchar(50),
		@p_mobile_no varchar(20), 
		@p_email_id nvarchar(60), 
		@p_organisation_name nvarchar(100),
		@p_organisation_address nvarchar(300),
		@p_org_level_no tinyint,
		@p_org_level_code nvarchar(15), 
		@p_default_locale varchar(5), 
		@p_timezone_id tinyint,
		@p_location_code nvarchar(8), 
		@p_customer_id nvarchar(15),
		@p_default_password varchar(255),
		@p_notification_xml nvarchar(1500),
		@p_notification_id int


	/* GETTING THE INPUTPARAMETER VARIABLE VALUES */
	select @p_first_name = json_value(@i_inputparam_header_xml, '$.first_name')
	select @p_last_name = json_value(@i_inputparam_header_xml, '$.last_name')
	select @p_mobile_no = json_value(@i_inputparam_header_xml, '$.mobile_no')
	select @p_email_id = json_value(@i_inputparam_header_xml, '$.email_id')
	select @p_organisation_name = json_value(@i_inputparam_header_xml, '$.org_name')
	select @p_organisation_address = json_value(@i_inputparam_header_xml, '$.org_address')

	
	/* GETTING THE ORGANOGRAM DETAILS */
	select @p_org_level_no = 1,
		@p_org_level_code = level1_code 
	from level1_code
	where company_id = @i_client_id
		and country_code = @i_country_code


	/* GETTING THE COMPANY LOCATION DETAILS */
	select @p_location_code = location_code,
		@p_default_locale = default_locale_id,
		@p_timezone_id = timezone_id
	from company_location
	where company_id = @i_client_id
		and country_code = @i_country_code
		and location_code = 'CHN'

	
	if not exists 
	(
		select 1 from visitor
		where company_id = @i_client_id
			and country_code = @i_country_code
			and contact_mobile_no = @p_mobile_no
	)
	begin

		/* CREATE VISITOR RECORD */
		insert visitor 
		(
			company_id, 
			country_code, 
			first_name, 
			last_name,
			title, 
			visitor_status, 
			organogram_level_no, 
			organogram_level_code,
			organisation_name,
			organisation_address,
			location_code, 
			contact_mobile_no, 
			email_id, 
			default_locale_id,
			default_timezone_id, 
			last_update_id
		)
		select @i_client_id, 
			@i_country_code, 
			@p_first_name, 
			@p_last_name,
			'Mr/Mrs', 
			'A', 
			@p_org_level_no, 
			@p_org_level_code,
			@p_organisation_name,
			@p_organisation_address,
			@p_location_code, 
			@p_mobile_no, 
			@p_email_id, 
			@p_default_locale,
			@p_timezone_id, 
			@i_user_id

		if (@@ROWCOUNT = 0)
		begin
		
			select @i_error_msg = '{"code":"error_visitor_insert"}'
			return

		end

	end
	else
	begin

		update visitor
		set first_name = @p_first_name,
			last_name = @p_last_name,
			email_id = @p_email_id
		where company_id = @i_client_id
			and country_code = @i_country_code
			and contact_mobile_no = @p_mobile_no

		if (@@ROWCOUNT = 0)
		begin
		
			select @i_error_msg = '{"code":"error_visitor_insert"}'
			return

		end

	end


	if not exists 
	(
		select 1 from customer_location_contacts
		where company_id = @i_client_id
			and country_code = @i_country_code
			and contact_phone_no = @p_mobile_no	
	)
	begin

		if (isnull(@p_first_name, '') != '')
		begin

			/* SEND EMAIL TO CO ORDINATOR */
			select @p_notification_xml = '<notification_info>'+
				'<first_name>' + isnull(@p_first_name, '') + '</first_name>' +
				'<last_name>' + isnull(@p_last_name, '') + '</last_name>' +
				'<mobile_no>' + isnull(@p_mobile_no, '') + '</mobile_no>' +
				'<email_id>' + isnull(@p_email_id, '') + '</email_id>' +
				'<org_name>' + isnull(@p_organisation_name, '') + '</org_name>' +
				'<org_address>' + isnull(@p_organisation_address, '') + '</org_address>' +
				'<contact_exist>' +'false'+ '</contact_exist>' +
				'</notification_info>'	
			
 			execute sp_log_new_notification  
				@i_session_id, 
				@i_user_id, 
				@i_client_id, 
	   			@i_locale_id, 
				@i_country_code, 
				'VISITOR_PROFILE',
				@p_notification_xml, 
				@i_user_id, 
				@p_notification_id OUTPUT
	   		
			if @p_notification_id = 0
			begin
	   			set @i_error_msg = 'error_sending_notification'
				return
			end

		end

		set @o_update_status = 'SP001'
		return

	end


	if not exists 
	(
		select 1 from employee
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id = ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no))))
			 
	)
	begin

		/* CREATE EMPLOYEE RECORD FOR THE GIVEN MOBILE NUMBER */
		insert employee 
		(
			company_id, 
			country_code, 
			employee_id, 
			first_name, 
			middle_name, 
			last_name, 
			title, 
			location_code,
			organogram_level_no, 
			organogram_level_code, 
			supervisor_emp_id, 
			employee_status,
			contact_mobile_no, 
			email_id, 
			photo_reference, 
			last_update_id
		)
		select @i_client_id, 
			@i_country_code, 
			ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no)))), 
			@p_first_name,
			'', 
			@p_last_name, 
			'Mr/Mrs', 
			@p_location_code,
			@p_org_level_no, 
			@p_org_level_code, 
			'', 
			'A',
			@p_mobile_no, 
			@p_email_id, 
			'', 
			@i_user_id

		if (@@ROWCOUNT = 0)
		begin

			set @i_error_msg = '{"code":"error_employee_insert"}'
			return

		end

		/* CREATE FUNCTIONAL ROLE RECORD FOR THE GIVEN MOBILE NUMBER */
		insert functional_role_employee
		(
			company_id, 
			country_code, 
			functional_role_id, 
			employee_id,
			reporting_to_functional_role_id, 
			reporting_to_employee_id,
			mapped_to_functional_role_id, 
			mapped_to_employee_id,
			last_update_id
		)
		select @i_client_id, 
			@i_country_code, 
			'CUST_OWNER', 
			ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no)))), 
			'', 
			'', 
			'', 
			'', 
			@i_user_id

		if (@@ROWCOUNT = 0)	
		begin

			set @i_error_msg = 'error_functional_role_insert'
			return

		end

	end

	if not exists 
	(
		select 1 from users 
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no)))) 
	)
	begin

		/* GET THE NEW PASSWORD FOR THE USER ID */
		set @p_default_password = ''

		execute sp_pick_new_password 
			@i_client_id, 
			@i_user_id, 
			@i_country_code, 
			'', 
			@p_default_password OUTPUT
	

		/* CREATE USER RECORD FOR THE GIVEN MOBILE NUMBER */
		insert users
		(
			company_id, 
			country_code, 
			user_id, 
			employee_id, 
			login_password, 
			default_password_ind, 
			user_group_id,
			active_ind, 
			default_locale_id, 
			default_timezone_id,
			last_update_id
		)
		select @i_client_id, 
			@i_country_code, 
			ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no)))), 
			ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no)))),
			@p_default_password, 
			'Y', 
			'custowner', 
			0, 
			@p_default_locale, 
			@p_timezone_id,
			@i_user_id

		if (@@ROWCOUNT = 0)
		begin	

			set @i_error_msg = 'error_user_insert'
			return

		end

	end
								 
	if not exists 
	(
		select 1 from customer_user_mapping  
		where company_id = @i_client_id
			and country_code = @i_country_code				 
			and user_id = ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no))))
	)
	begin	

		/* MAP THE USER ID TO THE CUSTOMER ID */
		insert customer_user_mapping 					 
		(				
			company_id, 
			country_code, 
			customer_id,
			customer_location_code, 
			user_id, 
			last_update_id
		)
		select @i_client_id, 
			@i_country_code, 
			customer_id, 
			location_code, 
			ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no)))), 
			@i_user_id
		from customer_location
		where company_id = @i_client_id
			and country_code = @i_country_code
			and customer_id in 
			(
				select customer_id 
				from customer_location_contacts
				where company_id = @i_client_id
					and country_code = @i_country_code
					and contact_phone_no = @p_mobile_no
					or contact_phone_no = ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no))))
			)
				
		if (@@ROWCOUNT = 0)
		begin			
	
			set @i_error_msg = 'error_customer_mapping'
			return
	
		end	

	end
	
	if not exists 
	(
		select 1 from customer_user_mapping_to_assets
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id = ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no))))
	)
	begin
	
		/* MAP THE USER ID TO THE CUSTOMER ASSETS */				
		insert customer_user_mapping_to_assets
		(
			company_id, 
			country_code, 
			customer_id,
			customer_location_code, 
			employee_id,
			equipment_category, 
			equipment_type, 
			equipment_id,
			asset_id, 
			last_update_id
		)
		select @i_client_id, 
			@i_country_code, 
			customer_id,
			'ALL', 
			ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no)))),
			b.equipment_category, 
			b.equipment_type, 
			a.equipment_id, 
			a.asset_id, 
			@i_user_id
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.customer_id in 
			(
				select customer_id 
				from customer_location_contacts
				where company_id = @i_client_id
					and country_code = @i_country_code
					and contact_phone_no = @p_mobile_no
					or contact_phone_no = ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no))))
			)
			and a.asset_status = 'A'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id		
			
	end	

	if exists 
	(
		select 1 from users 
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = ltrim(rtrim(SUBSTRING(@p_mobile_no,CHARINDEX('-',@p_mobile_no)+1,LEN(@p_mobile_no)))) 
			and active_ind = 0
	)
	begin

		if (isnull(@p_first_name, '') != '')
		begin

			/* SEND EMAIL TO CO ORDINATOR */
			select @p_notification_xml = '<notification_info>'+
				'<first_name>' + isnull(@p_first_name, '') + '</first_name>' +
				'<last_name>' + isnull(@p_last_name, '') + '</last_name>' +
				'<mobile_no>' + isnull(@p_mobile_no, '') + '</mobile_no>' +
				'<email_id>' + isnull(@p_email_id, '') + '</email_id>' +
				'<org_name>' + isnull(@p_organisation_name, '') + '</org_name>' +
				'<org_address>' + isnull(@p_organisation_address, '') + '</org_address>' +
				'<contact_exist>' +  'true' + '</contact_exist>' +
				'</notification_info>'	
			
	
 			execute sp_log_new_notification  
				@i_session_id, 
				@i_user_id, 
				@i_client_id, 
	   			@i_locale_id, 
				@i_country_code, 
				'VISITOR_PROFILE',
				@p_notification_xml, 
				@i_user_id, 
				@p_notification_id OUTPUT
	   		
			if @p_notification_id = 0
			begin
	   			set @i_error_msg = 'error_sending_notification'
				return
			end

		end	

	end
 													
	set @o_update_status = 'SP001'
		
END


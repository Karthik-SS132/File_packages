DROP PROCEDURE IF EXISTS[dbo].[sp_save_manage_custom_info_update_profile]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_update_profile] 
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
		@p_middle_name nvarchar(50),
		@p_last_name nvarchar(50), 
		@p_mobile_no nvarchar(50), 
		@p_email_id nvarchar(50),
		@p_visitor_id varchar(20),
		@p_language nvarchar(15)
	

	/* GETTING THE INPUTPARAMETER VARIABLE VALUES */
	select @p_first_name = json_value(@i_inputparam_header_xml, '$.profile_firstname')
	select @p_middle_name = json_value(@i_inputparam_header_xml, '$.profile_middlename')
	select @p_last_name = json_value(@i_inputparam_header_xml, '$.profile_lastname')
	select @p_mobile_no = json_value(@i_inputparam_header_xml, '$.profile_mobile_no')
	select @p_email_id = json_value(@i_inputparam_header_xml, '$.profile_email_id')
	select @p_language = json_value(@i_inputparam_header_xml, '$.my_language')
	select @p_visitor_id = json_value(@i_inputparam_header_xml, '$.visitor_id')


	if(@p_visitor_id is null or @p_visitor_id = '')
	begin

		if @p_language is null
		begin

			update employee
			set first_name = isnull(@p_first_name, first_name),
				middle_name = isnull(@p_middle_name, middle_name),
				last_name = isnull(@p_last_name, last_name),
				contact_mobile_no = isnull(@p_mobile_no, contact_mobile_no),
				email_id = isnull(@p_email_id, email_id)
			where company_id = @i_client_id
				and country_code = @i_country_code
				and employee_id = 
				(
					select employee_id 
					from users
					where company_id = @i_client_id
						and country_code = @i_country_code
						and user_id = @i_user_id
				)

			if (@@ROWCOUNT = 0)
			begin
				set @i_error_msg = '{"code":"error_profile_update"}'
				return
			end

		end
		else
		begin
			
			update users
			set default_locale_id = @p_language
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = @i_user_id

			if (@@ROWCOUNT = 0)
			begin
				set @i_error_msg = '{"code":"error_language_update"}'
				return
			end

		end

	end
	else
	begin

		update visitor
		set first_name = isnull(@p_first_name, first_name),
			middle_name = isnull(@p_middle_name, middle_name),
			last_name = isnull(@p_last_name, last_name),
			contact_mobile_no = isnull(@p_mobile_no, contact_mobile_no),
			email_id = isnull(@p_email_id, email_id),
			default_locale_id = isnull(@p_language, default_locale_id)
		where company_id = @i_client_id
			and country_code = @i_country_code
			and visitor_id = @p_visitor_id

		if (@@ROWCOUNT = 0)
		begin
		
			if (@p_language is null)
			begin				
				set @i_error_msg = '{"code":"error_profile_update"}'
				return				
			end
			else
			begin			
				set @i_error_msg = '{"code":"error_language_update"}'
				return			
			end
			
		end

	end	

	set @o_update_status = 'SP001'
		
END
GO

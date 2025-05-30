/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_delete_my_account]    Script Date: 2/15/2023 12:12:08 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_save_manage_custom_info_delete_my_account_dynapac]
GO
/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_delete_my_account]    Script Date: 2/15/2023 12:12:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_delete_my_account_dynapac]
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

	declare @p_visitor_id int,
		@p_employee_id nvarchar(12)

	if (@i_user_id = 'cappvisitor')
	begin

		select @p_visitor_id = json_value(@i_inputparam_header_xml, '$.visitor_id')

		if exists 
		(
			select 1 from visitor
			where company_id = @i_client_id
				and country_code = @i_country_code
				and visitor_id = @p_visitor_id			
		)
		begin

			delete visitor
			where company_id = @i_client_id
				and country_code = @i_country_code
				and visitor_id = @p_visitor_id

			if (@@ROWCOUNT = 0)
			begin
		
				select @i_error_msg = '{"code":"error_delete_profile"}'
				return

			end

		end
		else
		begin

			select @i_error_msg = '{"code":"error_invalid_profile"}'
			return

		end

	end
	else
	begin

		if exists 
		(
			select 1 from users
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = @i_user_id			
		)
		begin

			select @p_employee_id = employee_id 
			from users
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = @i_user_id	

			update employee
			set employee_status = 'IA'
			where company_id = @i_client_id
				and country_code = @i_country_code
				and employee_id = @p_employee_id

			if (@@ROWCOUNT = 0)
			begin
		
				select @i_error_msg = '{"code":"error_delete_profile"}'
				return

			end


			delete users
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = @i_user_id

			if (@@ROWCOUNT = 0)
			begin
		
				select @i_error_msg = '{"code":"error_delete_profile"}'
				return

			end

			if exists
			(
				select 1 from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)
			begin

				delete from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id

				if (@@ROWCOUNT = 0)
				begin
		
					select @i_error_msg = '{"code":"error_delete_profile"}'
					return

				end

			end

			if exists
			(
				select 1 from customer_user_mapping_to_assets
				where company_id = @i_client_id
					and country_code = @i_country_code
					and employee_id = @p_employee_id
			)
			begin

				delete from customer_user_mapping_to_assets
				where company_id = @i_client_id
					and country_code = @i_country_code
					and employee_id = @p_employee_id

				if (@@ROWCOUNT = 0)
				begin
		
					select @i_error_msg = '{"code":"error_delete_profile"}'
					return

				end

			end


		end
		else
		begin

			select @i_error_msg = '{"code":"error_invalid_profile"}'
			return

		end

	end

	set @o_update_status = 'SP001'
		
END
GO

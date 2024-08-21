IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_acg_call_logging_form')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_acg_call_logging_form]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_acg_call_logging_form] 
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
	
	/* MODIFY THE INPUT HEADER TO ADD THE LAST ACCESS INFO */
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_id', 'acg_call_logging_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_name', 'Service call logging')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.allow_new_txn', '0')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.modify_last_access', '1')	
	

	/* DECLARE THE PROGRAM VARIABLES */
	declare @p_sysdatetimeoffset datetimeoffset(7),@p_customer_req [uddt_nvarchar_1000], @p_additional_info [uddt_nvarchar_1000], @p_customer_company_name [uddt_nvarchar_60],
			@p_machine_location [uddt_nvarchar_60],@p_state_code [uddt_nvarchar_60], @p_district_code [uddt_nvarchar_60], 
			@p_organogram_level_no [uddt_tinyint], @p_organogram_level_code [uddt_nvarchar_15], @p_call_mapped_to_employee_id [uddt_employee_id],
			@p_call_logged_on_date [uddt_date],@p_call_logged_on_hour [uddt_hour], @p_call_logged_on_minute [uddt_minute],
			@p_current_datetime varchar(20), @p_assigned_on_date varchar(10), @p_assigned_on_hour varchar(2),@p_assigned_on_minute varchar(2),
			@p_assigned_on_second varchar(2), @p_org_lvl_code nvarchar(15), @p_company_location_code nvarchar(8),@p_call_category nvarchar(100), 
			@p_call_type nvarchar(100), @p_asset_id nvarchar(30),@p_call_subtype nvarchar(100),@p_equipment_id nvarchar(30), @p_contract_doc_number nvarchar(30), 
			@p_contract_doc_visit_number nvarchar(30), @p_customer_id nvarchar(15), @p_customer_loc_code nvarchar(8), @p_customer_contact_number varchar (20), @p_customer_contact_name nvarchar(60),
			@p_customer_contact_email nvarchar(60), @p_user_group_id_v varchar(15), @p_employee_id nvarchar(12), @p_org_lvl_no varchar(1),
			@p_org_no int, @p_org_code nvarchar(30), @p_state_name nvarchar(30), @p_district_name nvarchar(30), @p_dealer_id nvarchar(20),
			@p_udf_xml varchar(1000), @o_service_call_ref_no nvarchar(20),@p_assigned_to_emp_id nvarchar(12),@p_transaction_ref_no varchar(30),
			@p_notification_xml varchar(1000),@p_notification_id int,@p_company_loc_name nvarchar(20)

	/* ASSIGN THE VALUES TO THE DECLARED VARIABLES */
	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset
	(
		@i_client_id, 
		@i_country_code, 
		@i_user_id
	)
	
			select @p_current_datetime= SYSDATETIMEOFFSET()

			select @p_assigned_on_date =  replace((convert(varchar, cast(SYSDATETIMEOFFSET() as date),4)),'.',''),
				@p_assigned_on_hour = SUBSTRING(@p_current_datetime, 12,2),
				@p_assigned_on_minute = SUBSTRING(@p_current_datetime,15,2),
				@p_assigned_on_second = SUBSTRING(@p_current_datetime,18,2)

			select @p_transaction_ref_no = json_value(@i_inputparam_header_xml, '$.transaction_ref_no')
			select @p_call_category = json_value(@i_inputparam_header_xml, '$.call_category_savedetails')	
			select @p_machine_location = json_value(@i_inputparam_header_xml, '$.machine_location_savedetails')
			select @p_asset_id = json_value(@i_inputparam_header_xml, '$.asset_id_savedetails')
			select @p_equipment_id = json_value(@i_inputparam_header_xml, '$.equipment_id_savedetails')
			select @p_contract_doc_number = json_value(@i_inputparam_header_xml, '$.contract_doc_number_savedetails')
			select @p_contract_doc_visit_number = json_value(@i_inputparam_header_xml, '$.contract_doc_visit_number_savedetails')
			select @p_customer_id = json_value(@i_inputparam_header_xml, '$.customer_id_savedetails')
			select @p_customer_loc_code = json_value(@i_inputparam_header_xml, '$.customer_loc_savedetails')
			select @p_state_code = json_value(@i_inputparam_header_xml, '$.state_code_savedetails')
			select @p_district_code = json_value(@i_inputparam_header_xml, '$.district_code_savedetails')
			select @p_call_type = json_value(@i_inputparam_header_xml, '$.call_type_savedetails')
			select @p_call_subtype = json_value(@i_inputparam_header_xml, '$.call_subtype_savedetails')
			select @p_customer_company_name = json_value(@i_inputparam_header_xml, '$.customer_company_name')
			select @p_additional_info = json_value(@i_inputparam_header_xml, '$.additional_info_savedetails')
			select @p_customer_req = json_value(@i_inputparam_header_xml, '$.customer_req_savedetails')
			select @p_customer_contact_number = json_value(@i_inputparam_header_xml, '$.customer_contact_number_savedetails')
			select @p_customer_contact_name = json_value(@i_inputparam_header_xml, '$.customer_contact_name_savedetails')
			select @p_customer_contact_email = json_value(@i_inputparam_header_xml, '$.customer_contact_email_savedetails')
			select @p_organogram_level_no = organogram_level_no from employee, users where users.user_id=@i_user_id and employee.employee_id=users.employee_id
			select @p_organogram_level_code = organogram_level_code from employee, users where users.user_id=@i_user_id and employee.employee_id=users.employee_id
			select @p_call_mapped_to_employee_id = employee.employee_id from employee, users where users.user_id=@i_user_id and employee.employee_id=users.employee_id
			select @p_call_logged_on_date = CONVERT(date, getdate())
			select @p_call_logged_on_hour = DATEPART(hour, GETDATE())
			select @p_call_logged_on_minute = DATEPART(minute, GETDATE())

			select @p_user_group_id_v = user_group_id
			from users
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = @i_user_id

			if (@p_call_category = 'SE')
			begin
				select @p_employee_id = employee_id,
					   @p_org_lvl_no = organogram_level_no,
					   @p_org_lvl_code = organogram_level_code,
					   @p_company_location_code = location_code
						  from employee
						  where company_id = @i_client_id
							and country_code = @i_country_code
							and employee_id = (
								select employee_id from users
								where company_id = @i_client_id
									and country_code = @i_country_code
									and user_id = @i_user_id
							)
			end
			
			select @p_assigned_to_emp_id = @p_employee_id
		  
		    select @p_udf_xml = '<inputparam>
									<assigned_to_emp_id>' + isnull(@p_assigned_to_emp_id, '') + '</assigned_to_emp_id>
									<contract_doc_number>' + isnull (@p_contract_doc_number, '') + '</contract_doc_number>
									<contract_doc_visit_number>' + isnull (@p_contract_doc_visit_number, '') + '</contract_doc_visit_number>
									<call_register_sch_start_date>'+ isnull(json_value(@i_inputparam_header_xml, '$.sch_start_date_savedetails'),'') +'</call_register_sch_start_date>
									<call_register_sch_start_date_hour>'+ isnull(json_value(@i_inputparam_header_xml, '$.sch_start_date_hour_savedetails'),'') +'</call_register_sch_start_date_hour>
									<call_register_sch_start_date_minute>'+ isnull(json_value(@i_inputparam_header_xml, '$.sch_start_date_minute_savedetails'),'') +'</call_register_sch_start_date_minute>	
									<call_register_sch_finish_date>'+ isnull(json_value(@i_inputparam_header_xml, '$.sch_finish_date_savedetails'),'') +'</call_register_sch_finish_date>
									<call_register_sch_finish_date_hour>'+ isnull(json_value(@i_inputparam_header_xml, '$.sch_finish_date_hour_savedetails'),'') +'</call_register_sch_finish_date_hour>
									<call_register_sch_finish_date_minute>'+ isnull(json_value(@i_inputparam_header_xml, '$.sch_finish_date_minute_savedetails'),'') +'</call_register_sch_finish_date_minute>
									<udf_char_1>' + isnull (@p_state_code,'') +'</udf_char_1>
									<udf_char_2>' + isnull (@p_district_code, '')+ '</udf_char_2>
									<udf_char_3>' + isnull (@p_call_subtype, '') + '</udf_char_3>
									<channel>mobile</channel>
								</inputparam>'
								  
			select @p_notification_xml = '<notification_info>'+
										'<cust_id>'+isnull(@p_customer_id,'')+'</cust_id>'+
										'<cust_contact_name>'+isnull(substring(@p_customer_contact_name,1,20),'') +'</cust_contact_name>'+
										'<cust_contact_no>'+isnull(@p_customer_contact_number,'') +'</cust_contact_no>'+
										'<cust_contact_email>'+isnull(@p_customer_contact_email,'')+'</cust_contact_email>'+
										'<asset_id>'+ISNULL(@p_asset_id,'')+'</asset_id>'+
										'<call_type>'+isnull(@p_call_type,'')+'</call_type>'+
										'</notification_info>'
		
		if not exists(select 1 from call_register
				where company_id = @i_client_id
					and country_code	= @i_country_code
					and asset_id		= @p_asset_id
					and call_status not in ('HO', 'CO', 'CL'))
		begin

			if @p_call_type = 'INSTCOMM'
				begin
					if exists(select 1 from asset_master 
								where company_id = @i_client_id
									and country_code = @i_country_code
									and asset_id = @p_asset_id
									and isnull(installation_date,'') = '')
					begin
						EXEC sp_save_manage_call_register
						@i_client_id , 
						@i_country_code , 
						@i_session_id , 
						@i_user_id, 
						@i_locale_id, 
						@p_customer_id, 
						@p_asset_id, 
						@p_machine_location, 
						@p_equipment_id, 
						@p_customer_req,
						'MED', 
						@i_user_id,
						@p_call_logged_on_date, 
						@p_call_logged_on_hour, 
						@p_call_logged_on_minute,
						@p_customer_loc_code, 
						@p_organogram_level_no, 
						@p_organogram_level_code, 
						@p_call_category, 
						@p_call_type, 
						@p_additional_info, 
						@p_company_location_code,
						@p_customer_contact_name,
						@p_customer_contact_number,
						@p_customer_contact_email,
						'NB', 
						'0', 
						'0', 
						'0', 
						'0', 
						'INR', 
						@p_contract_doc_number, 
						'0', 
						'', 
						@p_call_mapped_to_employee_id, 
						@p_udf_xml,
						'A', 
						'00000000-0000-0000-0000-000000000000', 
						@o_update_status OUTPUT, 
						@o_service_call_ref_no OUTPUT,  
						@i_error_msg OUTPUT
			
						update call_register 
						set expected_closure_date = SYSDATETIMEOFFSET()
						where call_ref_no = @o_service_call_ref_no
						and company_id = @i_client_id
						and country_code = @i_country_code

						update call_register_actions
						set call_ref_no = @o_service_call_ref_no
						where company_id = @i_client_id
							and country_code = @i_country_code
							and call_ref_no = @p_transaction_ref_no
					end
				end
	  
			else
			
			
				if exists(select 1 from asset_master
							where company_id = @i_client_id
								and country_code = @i_country_code
								and asset_id = @p_asset_id
								and isnull(installation_date,'') != '')
				begin

				
						EXEC sp_save_manage_call_register
						@i_client_id , 
						@i_country_code , 
						@i_session_id , 
						@i_user_id, 
						@i_locale_id, 
						@p_customer_id, 
						@p_asset_id, 
						@p_machine_location, 
						@p_equipment_id, 
						@p_customer_req,
						'MED', 
						@i_user_id,
						@p_call_logged_on_date, 
						@p_call_logged_on_hour, 
						@p_call_logged_on_minute,
						@p_customer_loc_code, 
						@p_organogram_level_no, 
						@p_organogram_level_code, 
						@p_call_category, 
						@p_call_type, 
						@p_additional_info, 
						@p_company_location_code,
						@p_customer_contact_name,
						@p_customer_contact_number,
						@p_customer_contact_email,
						'NB', 
						'0', 
						'0', 
						'0', 
						'0', 
						'INR', 
						@p_contract_doc_number, 
						'0', 
						'', 
						@p_call_mapped_to_employee_id, 
						@p_udf_xml,
						'A', 
						'00000000-0000-0000-0000-000000000000', 
						@o_update_status OUTPUT, 
						@o_service_call_ref_no OUTPUT,  
						@i_error_msg OUTPUT
		
						update call_register 
						set expected_closure_date = SYSDATETIMEOFFSET()
						where call_ref_no = @o_service_call_ref_no
						and company_id = @i_client_id
						and country_code = @i_country_code

						update call_register_actions
						set call_ref_no = @o_service_call_ref_no
						where company_id = @i_client_id
							and country_code = @i_country_code
							and call_ref_no = @p_transaction_ref_no
				end
		end
		else
			begin
			
				execute sp_log_new_notification  @i_session_id, @i_user_id  , @i_client_id , 
					  @i_locale_id , @i_country_code , 'CALL_LOGGING_EMAIL' ,@p_notification_xml, @i_user_id, @p_notification_id OUTPUT
					
					if @p_notification_id = 0
					begin	
						set @i_error_msg = 'E_UP_089'
						return
					end
					else
					begin
						set @o_update_status='SP001'
					end
			end		
		end

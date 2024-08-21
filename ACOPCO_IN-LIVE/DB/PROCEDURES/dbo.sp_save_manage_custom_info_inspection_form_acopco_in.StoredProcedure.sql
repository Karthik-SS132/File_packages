/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_inspection_form_acopco_in]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_inspection_form_acopco_in')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_inspection_form_acopco_in]
END


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_inspection_form_acopco_in] 
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
	
	/* DECLARE THE PROGRAM VARIABLES */
	declare	@p_sysdatetimeoffset datetimeoffset(7),
		@p_transaction_type varchar(20),
		@p_transaction_ref_no varchar(30),
		@p_file_category varchar(2),
		@p_file_type varchar(2),
		@p_file_name nvarchar(60),
		@p_file_path nvarchar(60),
		@p_file_extension varchar(10),
		@p_closure_report_indicator bit,
		@p_screen_id varchar(30), 
		@p_screen_name varchar(30), 
		@p_recorn_refurb_savedetails varchar(30), 
		@p_allow_new_txn bit,		
		@p_notification_xml nvarchar(max), 
		@p_inputparam_xml xml,
		@p_notification_id int, 
		@p_attachments_string nvarchar(max),
		@p_modify_last_access bit,
		@p_from_wf_stage_no tinyint, 
		@p_from_call_status varchar(2),
		@p_event_date varchar(10),
		@p_event_hour varchar(2),
		@p_event_minute varchar(2),
		@p_event_second varchar(2),
		@p_event_latitude varchar(10),
		@p_event_longitude varchar(10),
		@p_event_date_time_offset datetimeoffset(7),
		@p_by_employee_id nvarchar(12),
		@p_feature_id varchar(15)

	
	
	/* ASSIGN THE VALUES TO THE DECLARED VARIABLES */
	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset
	(
		@i_client_id, 
		@i_country_code, 
		@i_user_id
	)
	
	select @p_transaction_type = json_value(@i_inputparam_header_xml, '$.transaction_type')
	select @p_transaction_ref_no = json_value(@i_inputparam_header_xml, '$.transaction_ref_no')
	select @p_file_category = json_value(@i_inputparam_header_xml, '$.file_category')
	select @p_file_type = json_value(@i_inputparam_header_xml, '$.file_type')
	select @p_file_name = json_value(@i_inputparam_header_xml, '$.file_name')
	select @p_file_path = json_value(@i_inputparam_header_xml, '$.file_path')
	select @p_closure_report_indicator = convert(bit, isnull(json_value(@i_inputparam_header_xml, '$.closure_report_indicator'), ''))
	select @p_screen_id = json_value(@i_inputparam_header_xml, '$.screen_id')
	select @p_screen_name = json_value(@i_inputparam_header_xml, '$.screen_name')
	select @p_allow_new_txn = convert(bit, isnull(json_value(@i_inputparam_header_xml, '$.allow_new_txn'), ''))
	select @p_modify_last_access = convert(bit, isnull(json_value(@i_inputparam_header_xml, '$.modify_last_access'), ''))
	select @p_event_date = json_value(@i_inputparam_header_xml, '$.event_date')
	select @p_event_hour = json_value(@i_inputparam_header_xml, '$.event_hour')
	select @p_event_minute = json_value(@i_inputparam_header_xml, '$.event_minute')
	select @p_event_second = json_value(@i_inputparam_header_xml, '$.event_second')
	select @p_event_latitude = json_value(@i_inputparam_header_xml, '$.event_latitude')
	select @p_event_longitude = json_value(@i_inputparam_header_xml, '$.event_longitude')
	
	select @p_recorn_refurb_savedetails = json_value(@i_inputparam_header_xml, '$.recorn_refurb_savedetails')
	
	create table #recomm_spare_details
	(
		part_no int null,
		part_desc nvarchar(50) null,
		part_qnty int null,
		addi_info nvarchar(500) null
	)
	insert #recomm_spare_details
	(
		part_no, 
		part_desc,
		part_qnty,
		addi_info
	)
	select part_no,part_desc,part_qnty,addi_info from OPENJSON(@i_inputparam_header_xml,'$.recomondSpare') 
	with (
	part_no int '$.rsPartNum',
	part_desc nvarchar(50) '$.rsPartDesc',
	part_qnty int '$.rsQuntUnit',
	addi_info nvarchar(500) '$.addi_info'
	)
	
					
	/* MODIFY THE INPUT HEADER TO ADD THE LAST ACCESS INFO */
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_id', 'inspection_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_name', 'inspection_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.allow_new_txn', '1')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.modify_last_access', '1')
	
	
	if @p_file_name like '%inspection_form%'
			begin

				declare @o_new_call_ref_no nvarchar(10)

				declare @p_user_group_id_insp varchar(15), @p_customer_id_insp varchar(15), @p_asset_id_insp nvarchar(30), @p_equipment_id_insp nvarchar(30),
					@p_problem_description_insp nvarchar(1000),@p_customer_contact_name_insp nvarchar(60), @p_customer_contact_no_insp nvarchar(20),
					@p_customer_contact_email_insp nvarchar(60), @p_logged_on_date_insp varchar(10),
					@p_logged_on_hour_insp varchar(2), @p_logged_on_minute_insp varchar(2), @p_udf_xml_insp varchar(1000),
					@p_org_lvl_no_insp varchar(1), @p_org_lvl_code_insp nvarchar(15), @p_company_location_code_insp nvarchar(8),
					@p_employee_id_insp nvarchar(12), @p_customer_location_code_insp nvarchar(10), 
					@p_closure_date_insp varchar(10), @p_assigned_to_emp_id_insp nvarchar(12),@p_followup_fraq_insp nvarchar(12), @p_update_status_insp varchar(5),
					@p_call_ref_no_insp nvarchar(20), @p_error_no_insp varchar(15), @p_sell_to_state nvarchar(60), @p_sell_to_district nvarchar(20),
					@p_customer_name_insp nvarchar(500),@p_customer_address_insp nvarchar(500),@p_customer_city_insp nvarchar(500),
					@p_priority_code_insp nvarchar (5),@p_customer_state_code_insp nvarchar(10),  @p_distict_insp nvarchar(20),  @p_designation_insp nvarchar(60)

			
					insert into call_register_actions
						(company_id,country_code,call_ref_no,action_category,action_type,product_code,product_sub_code,requirement,no_of_units,uom_code,additional_information) 
						select @i_client_id,@i_country_code,@p_transaction_ref_no,'PARTRECOMM','PARTRECOMM',part_no,'NA',part_desc,part_qnty,'Nos',NULL
						from #recomm_spare_details where part_desc !=''
		
			
						select @p_customer_id_insp = customer_id,@p_asset_id_insp = asset_id, @p_equipment_id_insp = equipment_id,
								@p_problem_description_insp = problem_description, @p_org_lvl_code_insp =  organogram_level_code, 
								@p_org_lvl_no_insp = organogram_level_no, @p_company_location_code_insp = company_location_code,
								@p_customer_contact_name_insp =  customer_contact_name, @p_customer_contact_no_insp =  customer_contact_no,
								@p_customer_contact_email_insp = customer_contact_email_id, @p_customer_location_code_insp = customer_location_code,
								@p_customer_name_insp = customer_name , @p_customer_address_insp = customer_address,
								@p_customer_city_insp = customer_city , @p_priority_code_insp = priority_code
						from call_register
						where company_id = @i_client_id
							and country_code = @i_country_code
							and call_ref_no = @p_transaction_ref_no

						select @p_user_group_id_insp = user_group_id
						from users
						where company_id = @i_client_id
						and country_code = @i_country_code
						and user_id = @i_user_id

						select @p_employee_id_insp = fr.mapped_to_employee_id
						from functional_role_employee fr
						where  fr.company_id = @i_client_id
						and  fr.country_code = @i_country_code
						and  fr.employee_id = (select employee_id
												from users
												where company_id = @i_client_id
												and country_code = @i_country_code
												and user_id = @i_user_id) 

						select @p_logged_on_date_insp = json_value(@i_inputparam_header_xml, '$.event_date')
						select @p_logged_on_hour_insp = json_value(@i_inputparam_header_xml, '$.event_hour')
						select @p_logged_on_minute_insp = json_value(@i_inputparam_header_xml, '$.event_minute')
					
						select @p_assigned_to_emp_id_insp = @p_employee_id_insp
		 
						select @p_udf_xml_insp = '<inputparam>
														<call_register_expected_closure_date>' + isnull(@p_closure_date_insp, '') + '</call_register_expected_closure_date>
														<assigned_to_emp_id>' + isnull(@p_assigned_to_emp_id_insp, '') + '</assigned_to_emp_id>
														<udf_analysis_code1>' + isnull(@p_followup_fraq_insp, '') + '</udf_analysis_code1>
														<udf_char_1>' + isnull(@p_sell_to_state, '') + '</udf_char_1>
														<udf_char_2>' + isnull(@p_sell_to_district, '') + '</udf_char_2>
														<udf_char_10>' + isnull(@p_designation_insp, '') + '</udf_char_10>
														<channel>mobile</channel>
													</inputparam>'

				
						if exists (select 1 from  call_register_actions 
										where company_id = @i_client_id
											 and country_code = @i_country_code
											 and action_category = 'PARTREQ'
											 and call_ref_no = @p_transaction_ref_no)
						begin

						DECLARE @codevalue nvarchar(30),@asset_id nvarchar(30)
			select @codevalue = json_value(@i_inputparam_header_xml, '$.asset_location_savedetails')

			select @asset_id = asset_id  from call_register
						where company_id = @i_client_id
							and country_code = @i_country_code
							and call_ref_no= @p_transaction_ref_no


			if (@asset_id != 'ZZZ')
			begin
				update asset_master set latitude = SUBSTRING(@codevalue, 0,CHARINDEX(',', @codevalue)),
						longitude = SUBSTRING(@codevalue, CHARINDEX(',', @codevalue) + 1,len(@codevalue) )
						where company_id = @i_client_id
							and country_code = @i_country_code
							and asset_id = @asset_id


					 if (@@ROWCOUNT = 0)
					  begin
							set @i_error_msg = 'E_UP_024'
							return
					  end 

			end
	
			     
						 /* cursor for seperate enquiry for each line item */

						 DECLARE @p_product_code   nvarchar(30),
								@p_no_of_units numeric(10,2), @p_uom_code varchar(12)

							DECLARE cursor_enquiry CURSOR
							FOR SELECT product_code, no_of_units, uom_code
								FROM  call_register_actions 
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and action_category = 'PARTREQ'
							  and call_ref_no = @p_transaction_ref_no
							  and sys_gen_call_ref_no is null

							OPEN cursor_enquiry;

							FETCH NEXT FROM cursor_enquiry INTO 
								@p_product_code, @p_no_of_units, @p_uom_code;

							WHILE @@FETCH_STATUS = 0
							BEGIN
							
								 execute sp_save_manage_call_register @i_client_id, @i_country_code, @i_session_id, @i_user_id, @i_locale_id, 
											@p_customer_id_insp, @p_asset_id_insp, '', @p_equipment_id_insp,
											'Ref. Requirement', @p_priority_code_insp, @i_user_id, @p_logged_on_date_insp, @p_logged_on_hour_insp, @p_logged_on_minute_insp,
											@p_customer_location_code_insp, @p_org_lvl_no_insp, @p_org_lvl_code_insp, 'PE', 'PARTENQ',
											'', @p_company_location_code_insp, @p_customer_contact_name_insp, @p_customer_contact_no_insp, @p_customer_contact_email_insp,
											'NB', '0', '0', '0', '0', 'INR', '', '0', '', '', @p_udf_xml_insp,
											'A','00000000-0000-0000-0000-000000000000', @p_update_status_insp output, @p_call_ref_no_insp output, @p_error_no_insp output
		
					
								 /* Updating additional value*/
				  
								  update call_register 
								  set customer_name  = @p_customer_name_insp, 
									  customer_address = @p_customer_address_insp,
									  customer_city = @p_customer_city_insp, 
									  source_code_category = 'VISIT',
									  udf_char_8 = 'Inspection Visit'
									  
								  where company_id = @i_client_id
									and country_code = @i_country_code 
									and call_ref_no = @p_call_ref_no_insp
									

								/* Relationship */
								update call_register_actions
								set sys_gen_call_ref_no = @p_call_ref_no_insp
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and call_ref_no = @p_transaction_ref_no
								  and product_code = @p_product_code

								/* Copy the data */

								  insert into call_register_actions 
								(
								 company_id,country_code, call_ref_no, 
								 action_category, action_type,
								 product_code, product_sub_code, 
								 requirement,additional_information,
								 no_of_units, uom_code,
								 udf_char_1, udf_char_2, udf_char_3, udf_char_4, 
								 udf_bit_1, udf_bit_2, udf_bit_3, udf_bit_4, 
								 udf_float_1, udf_float_2, udf_float_3, udf_float_4,
								 udf_date_1, udf_date_2, udf_date_3, udf_date_4,
								 udf_analysis_code1, udf_analysis_code2, udf_analysis_code3, udf_analysis_code4,
								 last_update_id,sys_gen_call_ref_no
								 
								)
								select company_id,country_code, @p_call_ref_no_insp, 
										action_category, 'PARTREQ',
										 product_code, product_sub_code, 
										requirement, additional_information,
										no_of_units, uom_code,
										 udf_char_1, udf_char_2, udf_char_3, udf_char_4, 
										 udf_bit_1, udf_bit_2, udf_bit_3, udf_bit_4, 
										 udf_float_1, udf_float_2, udf_float_3, udf_float_4,
										 udf_date_1, udf_date_2, udf_date_3, udf_date_4,
										 udf_analysis_code1, udf_analysis_code2, udf_analysis_code3, udf_analysis_code4,
										@p_by_employee_id,@p_transaction_ref_no
										
								from call_register_actions 
								where company_id = @i_client_id
								  and country_code = @i_country_code 
								  and call_ref_no = @p_transaction_ref_no
								  and product_code  = @p_product_code
										  

								 update call_register
								  set problem_description =  '['+@p_product_code+'-'+ cast(cast(@p_no_of_units as int) as varchar(10))+ ' '+ @p_uom_code+']',
									  additional_information = ''
								  where company_id = @i_client_id
									and country_code = @i_country_code
									and call_ref_no = @p_call_ref_no_insp
									 

								FETCH NEXT FROM cursor_enquiry INTO 
								 @p_product_code, @p_no_of_units, @p_uom_code;
						
								END;

							CLOSE cursor_enquiry;

							DEALLOCATE cursor_enquiry;

							end
			


						if (@p_recorn_refurb_savedetails = 'REFURB')
						begin

							declare @p_update_status_ref varchar(5),
							@p_call_ref_no_ref nvarchar(20), @p_error_no_ref varchar(15)

							execute sp_save_manage_call_register @i_client_id, @i_country_code, @i_session_id, @i_user_id, @i_locale_id, 
											@p_customer_id_insp, @p_asset_id_insp, '', @p_equipment_id_insp,
											'Ref. Requirement', @p_priority_code_insp, @i_user_id, @p_logged_on_date_insp, @p_logged_on_hour_insp, @p_logged_on_minute_insp,
											@p_customer_location_code_insp, @p_org_lvl_no_insp, @p_org_lvl_code_insp, 'PE', 'REFURB',
											'', @p_company_location_code_insp, @p_customer_contact_name_insp, @p_customer_contact_no_insp, @p_customer_contact_email_insp,
											'NB', '0', '0', '0', '0', 'INR', '', '0', '', '', @p_udf_xml_insp,
											'A','00000000-0000-0000-0000-000000000000', @p_update_status_ref output, @p_call_ref_no_ref output, @p_error_no_ref output

								/* Part details entry in source ref no */

								insert into call_register_actions 
								 (
								  company_id,country_code, call_ref_no, 
								  action_category, action_type,
								  product_code, product_sub_code, 
								  requirement,
								  no_of_units, uom_code,sys_gen_call_ref_no,
								  last_update_id
								 )
								select @i_client_id,@i_country_code,@p_transaction_ref_no,
										'PARTREQ', 'PARTREQ',
										 '888888', 'NA', 
										 'Refurbishment',
										  '1', 'NOS',@p_call_ref_no_ref,
										  @i_user_id
								
								update call_register 
								  set udf_char_8 = 'Inspection Visit'
									where company_id = @i_client_id
									and country_code = @i_country_code 
									and call_ref_no = @p_call_ref_no_ref

								/* Part details entry in new ref no */

								 insert into call_register_actions 
								 (
								  company_id,country_code, call_ref_no, 
								  action_category, action_type,
								  product_code, product_sub_code, 
								  requirement,
								  no_of_units, uom_code,
								  last_update_id,
								  sys_gen_call_ref_no
								 )
								select @i_client_id,@i_country_code, @p_call_ref_no_ref, 
										'PARTREQ', 'PARTREQ',
										 '888888', 'NA', 
										 'Refurbishment',
										  '1', 'NOS',
										  @i_user_id,
										  @p_transaction_ref_no

								 
			
						end

						if (@p_recorn_refurb_savedetails = 'RECON')
						begin

							declare @p_update_status_rec varchar(5),
							@p_call_ref_no_rec nvarchar(20), @p_error_no_rec varchar(15)

							execute sp_save_manage_call_register @i_client_id, @i_country_code, @i_session_id, @i_user_id, @i_locale_id, 
											@p_customer_id_insp, @p_asset_id_insp, '', @p_equipment_id_insp,
											'Ref. Requirement', @p_priority_code_insp, @i_user_id, @p_logged_on_date_insp, @p_logged_on_hour_insp, @p_logged_on_minute_insp,
											@p_customer_location_code_insp, @p_org_lvl_no_insp, @p_org_lvl_code_insp, 'PE', 'RECON',
											'', @p_company_location_code_insp, @p_customer_contact_name_insp, @p_customer_contact_no_insp, @p_customer_contact_email_insp,
											'NB', '0', '0', '0', '0', 'INR', '', '0', '', '', @p_udf_xml_insp,
											'A','00000000-0000-0000-0000-000000000000', @p_update_status_rec output, @p_call_ref_no_rec output, @p_error_no_rec output


								/* Part details entry in source ref no */

								 insert into call_register_actions 
								 (
								  company_id,country_code, call_ref_no, 
								  action_category, action_type,
								  product_code, product_sub_code, 
								  requirement,
								  no_of_units, uom_code,sys_gen_call_ref_no,
								  last_update_id
								 )
								select @i_client_id,@i_country_code, @p_transaction_ref_no, 
										'PARTREQ', 'PARTREQ',
										 '999999', 'NA', 
										 'Reconditioning',
										  '1', 'NA',@p_call_ref_no_rec,
										  @i_user_id
										  
								update call_register 
								  set udf_char_8 = 'Inspection Visit'
									where company_id = @i_client_id
									and country_code = @i_country_code 
									and call_ref_no = @p_call_ref_no_rec

								/* Part details entry in new ref no */

								 insert into call_register_actions 
								 (
								  company_id,country_code, call_ref_no, 
								  action_category, action_type,
								  product_code, product_sub_code, 
								  requirement,
								  no_of_units, uom_code,
								  last_update_id,
								  sys_gen_call_ref_no
								 )
								select @i_client_id,@i_country_code, @p_call_ref_no_rec, 
										'PARTREQ', 'PARTREQ',
										 '999999', 'NA', 
										 'Reconditioning',
										  '1', 'NA',
										  @i_user_id,
										  @p_transaction_ref_no
		
							end


			end
			
			
	/* SAVE THE DIGITAL REPORT  */
	execute sp_save_manage_custom_info_digital_report 
		@i_session_id, 
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
		@i_error_msg OUTPUT
					
END


GO

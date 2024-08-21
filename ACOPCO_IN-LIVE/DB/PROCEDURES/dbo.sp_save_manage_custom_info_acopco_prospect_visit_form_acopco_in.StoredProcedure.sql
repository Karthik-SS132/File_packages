/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_acopco_prospect_visit_form_acopco_in]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_acopco_prospect_visit_form_acopco_in')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_acopco_prospect_visit_form_acopco_in]
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_acopco_prospect_visit_form_acopco_in] 
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
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_id', 'acopco_prospect_visit_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_name', 'acopco_prospect_visit_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.allow_new_txn', '1')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.modify_last_access', '1')
	
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
		@p_allow_new_txn bit,		
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
	select @p_transaction_ref_no = @i_user_id+'_'+json_value(@i_inputparam_header_xml, '$.event_date')+'_'+json_value(@i_inputparam_header_xml, '$.event_second')
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
	
	select @p_by_employee_id = employee_id 
	from users
	where company_id = @i_client_id 
		and country_code = @i_country_code
		and user_id =@i_user_id

		declare @p_usr_type varchar(15), @p_cust_id varchar(15), @p_cust_id_new varchar(15), @p_ast_id nvarchar(30), @p_equipmnt_id nvarchar(30),
			@p_problem_desc nvarchar(1000),@p_cust_name nvarchar(500),@p_cust_contact_name nvarchar(60), @p_cust_contact_no nvarchar(20),
			@p_customer_contact_email nvarchar(60), @p_logged_on_date varchar(10),@p_cust_address nvarchar(500),@p_cust_city nvarchar(500),
			@p_logged_on_hour varchar(2), @p_logged_on_minute varchar(2), @p_udf_xml varchar(1000),
			@p_org_lvl_no varchar(1), @p_org_lvl_code nvarchar(15), @p_company_loc_code nvarchar(8),
			@p_employee_id nvarchar(12), @p_customer_location_code nvarchar(10), @p_requested_date varchar(10), @p_assigned_to_emp_id nvarchar(12),
			@p_call_ref_no nvarchar(20), @p_enquiry_tag nvarchar(20), @p_designation nvarchar(60),
			@p_priority_code varchar(5), @p_lead_classification  nvarchar(60),  @p_customer_state_code nvarchar(10), @p_enquiry_tag_quote nvarchar(20),
			@p_cust_id_gen  varchar(15), @p_pincode varchar(20), @p_distict nvarchar(20), @p_closure_date varchar(10), @p_followup_date varchar(10),
			@p_problem_description nvarchar(1000),@p_dealer_code_oemref nvarchar(20)

			select @p_usr_type =json_value(@i_inputparam_header_xml, '$.user_type_savedetails') 
			select @p_cust_id =json_value(@i_inputparam_header_xml, '$.customer_id_savedetails')
			select @p_cust_name =json_value(@i_inputparam_header_xml, '$.customer_name_savedetails')
			select @p_cust_address =json_value(@i_inputparam_header_xml, '$.address_new_savedetails')
			select @p_cust_city =json_value(@i_inputparam_header_xml, '$.city_new_savedetails')
			select @p_ast_id =json_value(@i_inputparam_header_xml, '$.asset_id')				
			select @p_cust_contact_name =json_value(@i_inputparam_header_xml, '$.cust_contact_person_savedetails')
			select @p_cust_contact_no =json_value(@i_inputparam_header_xml, '$.phone_no_savedetails')
			select @p_customer_contact_email =json_value(@i_inputparam_header_xml, '$.email_id_savedetails')
			select @p_requested_date =json_value(@i_inputparam_header_xml, '$.requested_date')
			select @p_logged_on_date =json_value(@i_inputparam_header_xml, '$.event_date')
			select @p_logged_on_hour =json_value(@i_inputparam_header_xml, '$.event_hour')
			select @p_logged_on_minute =json_value(@i_inputparam_header_xml, '$.event_minute')
			select @p_problem_description =json_value(@i_inputparam_header_xml, '$.purpose')
			select @p_enquiry_tag =json_value(@i_inputparam_header_xml, '$.enquiry_tag_savedetails')
			select @p_enquiry_tag_quote =json_value(@i_inputparam_header_xml, '$.enquiry_tag_quote_savedetails')
			select @p_designation =json_value(@i_inputparam_header_xml, '$.designation_savedetails')
			select @p_pincode =json_value(@i_inputparam_header_xml, '$.pincode_savedetails')
			select @p_distict =json_value(@i_inputparam_header_xml, '$.dist_new_savedetails')
			select @p_dealer_code_oemref =json_value(@i_inputparam_header_xml, '$.dealer_id_savedetails')

			select @p_employee_id = employee_id,
				   @p_org_lvl_no = organogram_level_no,
				   @p_org_lvl_code = organogram_level_code,
				   @p_company_loc_code = location_code
					  from employee
					  where company_id = @i_client_id
						and country_code = @i_country_code
						and employee_id = (
							select employee_id from users
							where company_id = @i_client_id
								and country_code = @i_country_code
								and user_id = @i_user_id
						)
					
			select @p_equipmnt_id = equipment_id
					from asset_master
					where company_id = @i_client_id
						and country_code = @i_country_code
						and asset_id = @p_ast_id
		
			/* select the customer details based on the type of visit */
			if @p_usr_type in ('PROSVISIT','COMPVISIT') 
			begin 		

				select @p_cust_contact_name =json_value(@i_inputparam_header_xml, '$.cust_contact_person_new_savedetails')
				select @p_cust_name =json_value(@i_inputparam_header_xml, '$.customer_name_new_savedetails')
				select @p_cust_address =json_value(@i_inputparam_header_xml, '$.address_new_savedetails')
				select @p_cust_city =json_value(@i_inputparam_header_xml, '$.city_new_savedetails')
				select @p_cust_contact_no =json_value(@i_inputparam_header_xml, '$.phone_no_new_savedetails')
				select @p_customer_state_code =json_value(@i_inputparam_header_xml, '$.state_new_savedetails')
				select @p_cust_id_new =json_value(@i_inputparam_header_xml, '$.customer_id_new_savedetails')

				/* Check if the provided customer name and address already exists */
			
				if not exists ( select 1 from customer
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and customer_name = @p_cust_name
								  and address_line_1 + isnull(address_line_2,'')+ isnull(address_line_3,'')
										= @p_cust_address
								  and isnull(city,'') = @p_cust_city
								  and state_code = @p_customer_state_code 
								 )			
				begin

				/*New customer creation */
				execute sp_save_manage_customer_master @i_session_id,@i_user_id,@i_client_id,@i_locale_id,@i_country_code,
													   '', @p_cust_name,@p_cust_address,'','',@p_cust_city,
													   @p_customer_state_code,'in',@p_pincode,'','','','',@p_cust_contact_name,
													   @p_cust_contact_no,@p_customer_contact_email, '','','',
														'<inputparam></inputparam>','00000000-0000-0000-0000-000000000000','A',
														@p_cust_id_gen output, @o_update_status output, @i_error_msg output
             
				set @p_cust_id = @p_cust_id_gen
   
				update customer
				set prospect_ind = 1
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and customer_id = @p_cust_id
			
				end
				else
				begin

					select @p_cust_id = customer_id
					from customer
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and customer_name = @p_cust_name
					  and address_line_1 + isnull(address_line_2,'')+ isnull(address_line_3,'')
										= @p_cust_address
					  and isnull(city,'') = @p_cust_city
					  and state_code = @p_customer_state_code 

					select @p_customer_location_code =isnull(( select location_code
					from customer_location
					where company_id = @i_client_id
						and country_code = @i_country_code
						and customer_id = @p_cust_id
						and head_office_ind = 1
						),'ZZZ')

				end
			end
			else if @p_usr_type in ('DEMOVISIT','MSMNTVISIT','FINVISIT','LEADFOLWUP')
			begin 
				select @p_cust_id = customer_id, @p_ast_id = asset_id, @p_equipmnt_id   = equipment_id,
					   @p_problem_description = problem_description, @p_customer_location_code = customer_location_code,
					   @p_company_loc_code =  company_location_code, @p_cust_contact_name = customer_contact_name ,
					   @p_cust_contact_no = customer_contact_no, @p_customer_contact_email = customer_contact_email_id,
					   @p_cust_name = customer_name, @p_cust_address = customer_address, @p_cust_city   = customer_city,
					   @p_lead_classification = lead_classification, @p_distict = customer_district_code, @p_designation = udf_char_10,
					   @p_closure_date = expected_closure_date, @p_followup_date = followup_date
								from call_register 
									where company_id = @i_client_id
									   and country_code = @i_country_code
										and call_ref_no = @p_enquiry_tag       
			end
			else if @p_usr_type in ('QFOLWUP')
			begin 
				select @p_cust_id = customer_id, @p_ast_id = asset_id, @p_equipmnt_id   = equipment_id,
					   @p_problem_description = problem_description, @p_customer_location_code = customer_location_code,
					   @p_company_loc_code =  company_location_code, @p_cust_contact_name = customer_contact_name ,
					   @p_cust_contact_no = customer_contact_no, @p_customer_contact_email = customer_contact_email_id,
					   @p_cust_name = customer_name, @p_cust_address = customer_address, @p_cust_city   = customer_city,
					   @p_lead_classification = lead_classification, @p_distict = customer_district_code, @p_designation = udf_char_10,
					   @p_closure_date = expected_closure_date, @p_followup_date = followup_date
								from call_register 
									where company_id = @i_client_id
									   and country_code = @i_country_code
										and call_ref_no = @p_enquiry_tag_quote       
			end

			select @p_customer_location_code =isnull(( select location_code
					from customer_location
					where company_id = @i_client_id
						and country_code = @i_country_code
						and customer_id = @p_cust_id
						and head_office_ind = 1
						),'ZZZ')
		
			 select @p_assigned_to_emp_id = @p_employee_id
		  
		   select @p_udf_xml = '<inputparam>
									<call_register_expected_closure_date>' + isnull(@p_closure_date, '') + '</call_register_expected_closure_date>
									<call_register_expected_closure_date_hour>00</call_register_expected_closure_date_hour>
	                                <call_register_expected_closure_date_minute>00</call_register_expected_closure_date_minute>
									<call_register_followup_date>' + isnull(@p_followup_date, '') + '</call_register_followup_date>
									<call_register_followup_date_hour>00</call_register_followup_date_hour>
	                                <call_register_followup_date_minute>00</call_register_followup_date_minute>
									<assigned_to_emp_id>' + isnull(@p_assigned_to_emp_id, '') + '</assigned_to_emp_id>
									<udf_char_10>' + isnull(@p_designation, '') + '</udf_char_10>
									<channel>mobile</channel>
								</inputparam>'

			/* template for call ref no */ 
			set @p_call_ref_no = @p_transaction_ref_no



			execute sp_save_manage_call_register @i_client_id, @i_country_code, @i_session_id, @i_user_id, @i_locale_id, 
							@p_cust_id, @p_ast_id, '', @p_equipmnt_id,
							@p_problem_description, 'LOW', @i_user_id, @p_logged_on_date, @p_logged_on_hour, @p_logged_on_minute,
							@p_customer_location_code, @p_org_lvl_no, @p_org_lvl_code, 'VI', @p_usr_type,
							'', @p_company_loc_code, @p_cust_contact_name, @p_cust_contact_no, @p_customer_contact_email,
							'NB', 0, 0, 0, 0, 'INR', '', '0', '', '', @p_udf_xml,
							'L','00000000-0000-0000-0000-000000000000', @o_update_status output, @p_call_ref_no output, @i_error_msg output
						

						set @o_outputparam_detail_xml = '{"ref_no":"' + @p_call_ref_no + '"}'
						set @o_update_status = 'SP001'
						

				  /* Updating additional value*/
						update call_register set
							  customer_name  = @p_cust_name, customer_address = @p_cust_address,
							  customer_city = @p_cust_city, 
							  customer_state_code = @p_customer_state_code, customer_district_code = @p_distict,
							   udf_char_4 = @p_dealer_code_oemref
									  where company_id = @i_client_id
										and country_code = @i_country_code 
										and call_ref_no = @p_call_ref_no

				 if @p_usr_type in ('DEMOVISIT','MSMNTVISIT','FINVISIT','QFOLWUP','LEADFOLWUP')
				 begin 
					insert into call_register_actions
					(company_id,country_code,call_ref_no,
					action_category,action_type,product_code,
					product_sub_code,no_of_units,uom_code,
					requirement,last_update_id )
					select @i_client_id, @i_country_code, @p_enquiry_tag,
						   @p_usr_type,@p_usr_type,@p_call_ref_no ,'NA'  ,0 ,
						   'NA' ,'NA',@p_by_employee_id
				   
				 end
				 else  if @p_usr_type in ('QFOLWUP')
				 begin 
					insert into call_register_actions
					(company_id,country_code,call_ref_no,
					action_category,action_type,product_code,
					product_sub_code,no_of_units,uom_code,
					requirement,last_update_id )
					select @i_client_id, @i_country_code, @p_enquiry_tag_quote,
						   @p_usr_type,@p_usr_type,@p_call_ref_no ,'NA'  ,0 ,
						   'NA' ,'NA',@p_by_employee_id
				   
				 end 

				 /* To avoid pdf view */

				 delete call_user_attachments 
							where  company_id = @i_client_id
										and country_code = @i_country_code 
										and attachment_file_name like '%acopco_prospect_visit%' 
										and  call_ref_no = @p_transaction_ref_no
		
	
					
END



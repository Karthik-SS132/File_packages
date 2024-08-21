/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_acopco_sa_enquiry_form_acopco_in]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_acopco_sa_enquiry_form_acopco_in')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_acopco_sa_enquiry_form_acopco_in]
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_acopco_sa_enquiry_form_acopco_in] 
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
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_id', 'acopco_sa_enquiry_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_name', 'acopco_sa_enquiry_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.allow_new_txn', '1')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.modify_last_access', '1')
	
	/* DECLARE THE PROGRAM VARIABLES */
	declare	@p_sysdatetimeoffset datetimeoffset(7),
		@p_transaction_type varchar(20),
		@p_transaction_ref_no varchar(100),
		@p_call_ref_no varchar(50),
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
		@p_feature_id varchar(15),
		@folder_path [nvarchar](max),
		@json NVARCHAR(MAX),
		@p_inputparam_xml	XML,
		@p_nbfc nvarchar(100), 
		@p_pvt_bank nvarchar(100), 
		@p_nationalized_bank nvarchar(100), 
	    @p_bg varchar(15), @p_lc varchar(15),
		@p_customer_type varchar(15),
		@p_customer_segment varchar(15), 
		@p_ownsrc varchar(15),
		@p_dbFinance varchar(15),
		@p_OpenJSON_insert  [nvarchar](max)

	
	
	/* ASSIGN THE VALUES TO THE DECLARED VARIABLES */
	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset
	(
		@i_client_id, 
		@i_country_code, 
		@i_user_id
	)
	select @p_call_ref_no = json_value(@i_inputparam_header_xml, '$.transaction_ref_no')
	select @p_transaction_type = json_value(@i_inputparam_header_xml, '$.transaction_type')
	select @p_call_ref_no = @i_user_id+'_'+json_value(@i_inputparam_header_xml, '$.event_date')+'_'+json_value(@i_inputparam_header_xml, '$.event_second')
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

	create table #fleetdata
	(
	fleet_category [nvarchar](30)not null,
	fleet_model [nvarchar](30)not null,
	fleet_quantity [nvarchar](30)not null,
	fleet_oem [nvarchar](500) not null
	)

	create table #part_temp
	(
	p_equipment_category [nvarchar](35)not null,
	p_equipment_type     [nvarchar](35)not null,
	p_equipment_id       [nvarchar](30)not null,
	p_part_no			 [nvarchar](30)	not null,
	p_part_desc			 [nvarchar](500) not null,	
	p_part_qty			 [nvarchar](12)	not null,
	p_call_no			 [nvarchar](30)	not null,
	p_file_name			 [nvarchar](500) not null, 
	p_spm_ok_notok		 [nvarchar](50)	not null, 
	p_udf_char_1		 [nvarchar](60)  null,
	p_udf_char_2		 [nvarchar](100)  null,
	p_comments_block_1	 [nvarchar](max) null,
	p_comments_block_2	 [nvarchar](max) null,
	p_udf_analysis_code1 [nvarchar](50) null,
	p_udf_analysis_code2 [nvarchar](50) null,
	p_udf_analysis_code3 [nvarchar](50) null
	)

	create table #contact
	(
		contact_name nvarchar(50) null,
		contact_phone_no nvarchar(50) null,
		contact_email_id nvarchar(50) null
	)
	insert #contact
	(
		contact_name, 
		contact_phone_no,
		contact_email_id
	)
	select isnull(contact_name,''),isnull(contact_phone_no,''),isnull(contact_email_id,'') from OPENJSON(@i_inputparam_header_xml,'$.contact') 
	with (
	contact_name nvarchar(50) '$.cust_name_savedetails',
	contact_phone_no nvarchar(50) '$.contact_phone_no',
	contact_email_id nvarchar(50) '$.contact_email_id'
	)

			
					declare @p_en_customer_id varchar(15), @p_en_asset_id nvarchar(30), @p_en_equipment_id nvarchar(30),
						@p_en_problem_description nvarchar(1000),@p_en_customer_name nvarchar(500),@p_en_customer_contact_name nvarchar(60), @p_en_customer_contact_no nvarchar(20),
						@p_en_customer_contact_email nvarchar(60), @p_en_logged_on_date varchar(10),@p_en_customer_address nvarchar(500),@p_en_customer_city nvarchar(500),
						@p_en_logged_on_hour varchar(2), @p_en_logged_on_minute varchar(2), @p_en_udf_xml varchar(1000),
						@p_en_org_lvl_no varchar(1), @p_en_org_lvl_code nvarchar(15), @p_en_company_location_code nvarchar(8),
						@p_en_employee_id nvarchar(12), @p_en_customer_location_code nvarchar(10), @p_en_assigned_to_emp_id nvarchar(12),
						@p_en_update_status varchar(5), @p_en_call_ref_no nvarchar(20), @p_en_error_no varchar(15),  @p_en_distict nvarchar(20), 
						 @p_en_leadsource nvarchar(50), @p_en_leadsubsource nvarchar(50), @p_en_state nvarchar(20),@p_en_city nvarchar(20), @p_dealer_id varchar(15),
						 @i_customer_id_gen varchar(15),@p_customer_id varchar(15), @p_customer_name nvarchar(500) , @p_customer_address nvarchar(500),@p_customer_city nvarchar(25), @p_customer_state nvarchar(10),
					@p_pincode varchar(20), @p_customer_contact_name nvarchar(60), @p_customer_contact_no nvarchar(20),@p_customer_contact_email nvarchar(60)

						select @p_en_customer_id = json_value(@i_inputparam_header_xml, '$.cust_id_savedetails')
						select @p_en_logged_on_date = json_value(@i_inputparam_header_xml, '$.event_date')
						select @p_en_logged_on_hour = json_value(@i_inputparam_header_xml, '$.event_hour')
						select @p_en_logged_on_minute = json_value(@i_inputparam_header_xml, '$.event_minute')
						select @p_en_leadsource = json_value(@i_inputparam_header_xml, '$.call_register_source_code_category_savedetails')
						select @p_en_leadsubsource = json_value(@i_inputparam_header_xml, '$.call_register_source_code_type_savedetails')
						select @p_en_state = json_value(@i_inputparam_header_xml, '$.meeting_state_savedetails')
						select @p_en_city = json_value(@i_inputparam_header_xml, '$.meeting_city_savedetails')
						select @p_en_distict = json_value(@i_inputparam_header_xml, '$.meeting_district_savedetails')

						select @folder_path = 'H:\inetpub\wwwroot\'+@i_client_id+'\content_store\'+@i_client_id+'\in\call_attachments\'+@p_transaction_ref_no+'\'++replace(@p_file_name,'.pdf','.json')
						create table #json_table (bulkcolumn nvarchar(max))
						select @p_OpenJSON_insert ='Insert into #json_table(bulkcolumn)select bulkcolumn From openrowset(bulk '''+@folder_path+''', SINGLE_CLOB)as datasource'
						exec(@p_OpenJSON_insert)

						select @json = bulkcolumn from #json_table

						select @p_inputparam_xml = CAST(@json as XML)
				
						insert unstructured_document
						(
							company_id, country_code, parentkey1_type, parentkey1_value, parentkey2_type, parentkey2_value,
							 file_name, file_path, file_xml, last_update_id, last_update_on_datetime
						) 
						select @i_client_id, @i_country_code, 'Visit', 
								@p_call_ref_no,null, null, replace(@p_file_name,'.pdf','.json'),@p_file_path,
								@p_inputparam_xml,'system',sysdatetimeoffset() 
			
						insert #part_temp
							(p_equipment_category,p_equipment_type,p_equipment_id,p_part_no,p_part_desc,p_part_qty,p_call_no,p_file_name,
							 p_spm_ok_notok,p_udf_char_1,p_udf_char_2,p_comments_block_1,p_comments_block_2)
						SELECT isnull(equipment_category,''),isnull(equipment_type,''),isnull(equipment_id,''),isnull(part_no,''),isnull(part_desc,''),
						isnull(required_quantity,''),isnull(@p_call_ref_no,''),isnull(@p_file_name,''),1,isnull(application_industry,''),isnull(model_des,''),isnull(dealdetails,''),isnull(accessories,'')
						FROM OPENJSON(@json,'$.partsDetails') 
						WITH (
							equipment_category NVARCHAR(30) '$.equipment_category',
							equipment_type NVARCHAR(30) '$.equipment_type',
							equipment_id NVARCHAR(30) '$.model',
							part_no NVARCHAR(30) '$.model',
							part_desc nvarchar(500) '$.partDesc',
							required_quantity NVARCHAR(12) '$.required_quantity',
							application_industry nvarchar(60) '$.application_industry',
							model_des nvarchar(100) '$.model_des',
							dealdetails nvarchar(max) '$.dealdetails',
							accessories nvarchar(max) '$.accessories'
						 );

					update #part_temp
						set p_equipment_category = equipment_category ,
							p_equipment_type = equipment_type,
							p_part_no = item_code
						from equipment_item_link
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and link_type = 'EQPARTNO'
						  and equipment_id in (select  p_equipment_id from #part_temp)
	
			  
						update #part_temp
						set p_udf_analysis_code1 = isnull(json_value(@json, '$.nbfc'),''),
							p_udf_analysis_code2 = isnull(json_value(@json, '$.pvt'),''),
							p_udf_analysis_code3 = isnull(json_value(@json, '$.national'),'')

						IF not exists (select 1 from call_register_actions   
										  where  company_id			= @i_client_id
										  and    country_code		= @i_country_code
										  and	 call_ref_no		= @p_call_ref_no
										  )
							begin
								insert into call_register_actions
								(company_id,country_code,call_ref_no,action_category,action_type,product_group_code,product_sub_group_code,product_category,product_code,product_sub_code,requirement,
								no_of_units,uom_code,udf_char_1,udf_char_2,comments_block_1,additional_information,last_update_id,udf_analysis_code1,udf_analysis_code2,udf_analysis_code3)
								select @i_client_id,@i_country_code,p_call_no,'PARTREQ','SALESVTPL',p_equipment_category,p_equipment_type,p_equipment_id,
								p_part_no,'EQUIPMENT',isnull(p_udf_char_2,''),p_part_qty,'NOS',p_udf_char_1,p_udf_char_2,p_comments_block_1,p_comments_block_2,@p_by_employee_id,p_udf_analysis_code1,
								p_udf_analysis_code2,p_udf_analysis_code3
									from #part_temp
									where p_file_name like '%acopco_flup_mtng_repo_form%' 
									and p_call_no not in (select call_ref_no from call_register_actions)

							end

						if (@p_en_customer_id = 'NEW PROSPECT')
						begin
							select @p_customer_name = json_value(@i_inputparam_header_xml, '$.customer_name_new_savedetails'),
							@p_customer_address = json_value(@i_inputparam_header_xml, '$.addr_line_savedetails'),
							@p_customer_city	= json_value(@i_inputparam_header_xml, '$.meeting_city_savedetails'),
							@p_customer_state	= json_value(@i_inputparam_header_xml, '$.meeting_state_savedetails'),
							@p_pincode			= json_value(@i_inputparam_header_xml, '$.pincode_savedetails'),
							@p_customer_contact_name   = (select top(1)contact_name from #contact),
							@p_customer_contact_no     = (select top(1)contact_phone_no from #contact),
							@p_customer_contact_email  = (select top(1)contact_email_id from #contact)
							from unstructured_document
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and parentkey1_type = 'Visit'
								  and parentkey1_value = @p_call_ref_no

						if not exists ( select 1 from customer
											where company_id = @i_client_id
											  and country_code = @i_country_code
											  and customer_name = @p_customer_name
											  and address_line_1 + isnull(address_line_2,'')+ isnull(address_line_3,'')
													= @p_customer_address
											  and isnull(city,'') = @p_customer_city
											  and state_code = @p_customer_state 
											 )			
							begin

							/*New customer creation */
							execute sp_save_manage_customer_master @i_session_id,@i_user_id,@i_client_id,@i_locale_id,@i_country_code,
																   '', @p_customer_name,@p_customer_address,'','',@p_customer_city,
																   @p_customer_state,@i_country_code,@p_pincode,'','','','',@p_customer_contact_name,
																   @p_customer_contact_no,@p_customer_contact_email, '','','',
																	'<inputparam></inputparam>','00000000-0000-0000-0000-000000000000','A',
																	@p_customer_id output, @o_update_status output, @i_error_msg output
             
							set @i_customer_id_gen = @p_customer_id
   
							update customer
							set prospect_ind = 1
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and customer_id = @p_customer_id
			
							end
						set @p_en_customer_id = @i_customer_id_gen
						end

						if ((select product_code from  call_register_actions 
											where company_id = @i_client_id
												 and country_code = @i_country_code
												 and action_category = 'PARTREQ'
												 and call_ref_no = @p_call_ref_no) != '')
						begin

							select @p_en_employee_id = employee_id,
								   @p_en_org_lvl_no = organogram_level_no,
								   @p_en_org_lvl_code = organogram_level_code,
								   @p_en_company_location_code = location_code
									  from employee
									  where company_id = @i_client_id
										and country_code = @i_country_code
										and employee_id = (
											select employee_id from users
											where company_id = @i_client_id
												and country_code = @i_country_code
												and user_id = @i_user_id
										)
					
							select @p_en_equipment_id = equipment_id
									from asset_master
									where company_id = @i_client_id
										and country_code = @i_country_code
										and asset_id = @p_en_asset_id
				
							select @p_en_customer_location_code =isnull(( select location_code
									from customer_location
									where company_id = @i_client_id
										and country_code = @i_country_code
										and customer_id = @p_en_customer_id
										and head_office_ind = 1
										),'ZZZ')

							select  @p_en_customer_contact_name    =  isnull(contact_person_1,''),
									 @p_en_customer_contact_email  = contact_person_1_email_id,
									 @p_en_customer_contact_no    = contact_person_1_mobile_no
													 from customer
													where company_id = @i_client_id
														and country_code = @i_country_code
														and customer_id = @p_en_customer_id


							/* picking the employee for assingment */

						set @p_en_assigned_to_emp_id = @p_en_employee_id

		  
					   select @p_en_udf_xml = '<inputparam>
												<assigned_to_emp_id>' + isnull(@p_en_assigned_to_emp_id, '') + '</assigned_to_emp_id>
												<call_register_source_code_category>' + isnull(@p_en_leadsource, '') + '</call_register_source_code_category>
												<call_register_source_code_type>' + isnull(@p_en_leadsubsource, '') + '</call_register_source_code_type>
												<channel>mobile</channel>
											</inputparam>'

						/* template for call ref no */ 
						set @p_en_call_ref_no = @p_call_ref_no

						execute sp_save_manage_call_register @i_client_id, @i_country_code, @i_session_id, @i_user_id, @i_locale_id, 
										@p_en_customer_id, @p_en_asset_id, '', @p_en_equipment_id,
										@p_en_problem_description, 'HOT', @i_user_id, @p_en_logged_on_date, @p_en_logged_on_hour, @p_en_logged_on_minute,
										@p_en_customer_location_code, @p_en_org_lvl_no, @p_en_org_lvl_code, 'SA', 'EQUIPENQRY',
										'', @p_en_company_location_code, @p_en_customer_contact_name, @p_en_customer_contact_no, @p_en_customer_contact_email,
										'NB', 0, 0, 0, 0, 'INR', '', '0', '', '', @p_en_udf_xml,
										'L','00000000-0000-0000-0000-000000000000', @p_en_update_status output, @p_en_call_ref_no output, @p_en_error_no output
         
							  /* Updating additional value*/
									update call_register set
										  customer_state_code = @p_en_state, customer_district_code = @p_en_distict,
										  customer_city = @p_en_city
												  where company_id = @i_client_id
													and country_code = @i_country_code 
													and call_ref_no = @p_en_call_ref_no

									update call_register
									set problem_description = (select isnull(dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'EQUIPTYPE',ca.product_sub_group_code),'')
									+'-'+ ca.product_category+ '['+ca.product_code+'-'+ cast(cast(ca.no_of_units as int) as varchar(10))+ ' '+ ca.uom_code+']')
									from call_register cr, call_register_actions ca
									where cr.company_id = @i_client_id
									and cr.country_code = @i_country_code
									and cr.company_id = ca.company_id
									and ca.country_code = ca.country_code
									and cr.call_ref_no = ca.call_ref_no
									and ca.action_category = 'PARTREQ'
									and cr.call_ref_no = @p_en_call_ref_no
							end

						select @p_nbfc =  isnull(json_value(@json, '$.nbfc'),''),
							@p_pvt_bank =  isnull(json_value(@json, '$.pvt'),''),
							@p_nationalized_bank =   isnull(json_value(@json, '$.national'),''),
							@p_bg = isnull(json_value(@json, '$.bg'),''),
							@p_lc = isnull(json_value(@json, '$.lc'),''),
							@p_dbFinance = isnull(json_value(@json, '$.dbFinance'),''),
							@p_ownsrc = isnull(json_value(@json, '$.ownsource'),''),
							@p_customer_segment = isnull(json_value(@json, '$.sales_customer_segment'),''),
							@p_customer_type = isnull(json_value(@json, '$.sales_customer_type'),'')

						select @p_nbfc = isnull((select financier_id from financier where financier_name = @p_nbfc),'NA')
						select @p_pvt_bank = isnull((select financier_id from financier where financier_name = @p_pvt_bank),'NA')
						select @p_nationalized_bank = isnull((select financier_id from financier where financier_name = @p_nationalized_bank),'NA')

						select @p_bg  = (case 
										  when @p_bg = 1 then (select financier_id from financier where financier_category = 'BG')
										  else @p_bg
									  end)

						select @p_lc  = (case 
										  when @p_lc = 1 then (select financier_id from financier where financier_category = 'LC')
										  else @p_lc
									  end)

						select @p_ownsrc  = (case 
										  when @p_ownsrc = 1 then (select financier_id from financier where financier_category = 'OS')
										  else @p_ownsrc
									  end)

						select @p_dbFinance  = (case 
										  when @p_dbFinance = 1 then (select financier_id from financier where financier_category = 'DB')
										  else @p_dbFinance
									  end)

						if @p_nbfc != 'NA'
						  begin

							 insert into call_register_actions
							  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
							  select @i_client_id, @i_country_code, @p_call_ref_no, 'FINANCIER', 'SALESLEAD',@p_nbfc, 'NA','NBFC','NBFC', @i_user_id
						  end

						  if @p_pvt_bank != 'NA'
						  begin
							  insert into call_register_actions
							  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
							  select @i_client_id, @i_country_code, @p_call_ref_no, 'FINANCIER', 'SALESLEAD',@p_pvt_bank, 'NA','PVTBK','PVTBK', @i_user_id

						  end

						  if @p_nationalized_bank != 'NA'
						  begin

							  insert into call_register_actions
							  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
							  select @i_client_id, @i_country_code, @p_call_ref_no, 'FINANCIER', 'SALESLEAD',@p_nationalized_bank, 'NA','PSB','PSB', @i_user_id

						  end

						  if @p_bg != '0'
						  begin

						  insert into call_register_actions
						  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
						  select @i_client_id, @i_country_code, @p_call_ref_no, 'FINANCIER', 'SALESLEAD',@p_bg, 'NA','BG','BG', @i_user_id

						  end
		  
						  if @p_lc != '0'
						  begin

						  insert into call_register_actions
						  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
						  select @i_client_id, @i_country_code, @p_call_ref_no, 'FINANCIER', 'SALESLEAD',@p_lc, 'NA','LC','LC', @i_user_id

						  end

						  if @p_ownsrc != '0'
						  begin

							insert into call_register_actions
						  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
						  select @i_client_id, @i_country_code, @p_call_ref_no, 'FINANCIER', 'SALESLEAD',@p_ownsrc, 'NA','OS','OS', @i_user_id

						  end

						   if @p_dbFinance != '0'
						  begin

							insert into call_register_actions
						  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
						  select @i_client_id, @i_country_code, @p_call_ref_no, 'FINANCIER', 'SALESLEAD',@p_dbFinance, 'NA','DB','DB', @i_user_id

						  end

						insert #fleetdata
						(
						  fleet_category, 
						  fleet_model,
						  fleet_quantity,
						  fleet_oem
						)
						select isnull(fleet_category,'NA'),isnull(fleet_model,'NA'),isnull(fleet_quantity,'NA')
						,isnull(fleet_oem,'NA')
						from OPENJSON(@json,'$.existing_fleet_list') 
						with (
						fleet_category nvarchar(50) '$.fleet_category',
						fleet_model nvarchar(50) '$.fleet_model',
						fleet_quantity nvarchar(50) '$.fleet_quantity',
						fleet_oem nvarchar(50) '$.fleet_oem'
						)
					
						insert into asset_master_competitor 
						(company_id, country_code, fleet_category, fleet_type,model, no_of_units, oem, customer_id, 
						creation_date,application_segment,comments_block_1, created_by_emp_id, last_update_id)
						select 
						@i_client_id, @i_country_code,fleet_category,fleet_category,fleet_model,fleet_quantity,fleet_oem,
						(select customer_id from call_register where call_ref_no = @p_call_ref_no),
						sysdatetimeoffset(),
						@p_customer_segment,@p_customer_segment,@i_user_id,@i_user_id
						from #fleetdata

						declare @p_generated_ticket_no nvarchar(30),
						@p_expected_closure_date datetimeoffset(7), @p_next_followup_date datetimeoffset(7), @p_action_type varchar(30)

						create table #call_list (call_ref_no varchar(20))


						set @p_action_type = (select call_type from call_register
																where company_id = @i_client_id
																	and country_code = @i_country_code
																	and call_ref_no = @p_call_ref_no)

						if (@p_action_type = 'LEADFOLWUP')
						begin
							 insert into #call_list
								select sys_gen_call_ref_no from call_register_actions 
																where company_id = @i_client_id
																	and country_code = @i_country_code
																	and call_ref_no = @p_call_ref_no 
																	and sys_gen_call_ref_no is not null

							 insert into #call_list
								 select call_ref_no from call_register_actions 
															   where company_id = @i_client_id
																	and country_code = @i_country_code
																	 and  product_code = @p_call_ref_no 
																	 and action_category  = 'LEADFOLWUP'
					   end 
					   else if (@p_action_type = 'EQUIPENQRY')
					   begin 
								insert into #call_list
								select distinct call_ref_no from call_register_actions
																where company_id = @i_client_id
																	and country_code = @i_country_code
																	and call_ref_no = @p_call_ref_no 

					   end
					   else
					   begin 
							  insert into #call_list
								  select distinct sys_gen_call_ref_no
										   from call_register_actions
											  where company_id = @i_client_id
													and country_code = @i_country_code
													and call_ref_no = @p_call_ref_no
													and sys_gen_call_ref_no is not null

					   end




				declare get_generated_tickets cursor for

				select call_ref_no from #call_list where call_ref_no is not null		 

				open get_generated_tickets
	
				fetch get_generated_tickets into @p_generated_ticket_no

	
				while (@@FETCH_STATUS = 0)
				begin    

					select @p_expected_closure_date = convert(datetimeoffset(7), json_value(@json, '$.date_of_closure'),121),
							@p_next_followup_date = convert(datetimeoffset(7), json_value(@json, '$.next_followup_date'),121)
					from unstructured_document
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and parentkey1_type = 'Visit'
					  and parentkey1_value = @p_call_ref_no

					update call_register 
					set expected_closure_date = @p_expected_closure_date,
						followup_date = @p_next_followup_date
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and call_ref_no = @p_generated_ticket_no

					update call_register
					set priority_code = (case datediff(mm, sysdatetimeoffset(), expected_closure_date)
										when 0 then 'HOT'
										when 1 then 'WRM'
										else 'CLD'
										end)
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and call_ref_no = @p_generated_ticket_no

	  
					fetch get_generated_tickets into @p_generated_ticket_no
	
				end

				close get_generated_tickets
	
				deallocate get_generated_tickets

		select @o_update_status = 'SP001'		
					
END



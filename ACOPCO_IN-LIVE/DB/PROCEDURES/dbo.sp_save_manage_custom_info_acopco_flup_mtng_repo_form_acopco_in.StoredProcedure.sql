/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_acopco_flup_mtng_repo_form_acopco_in]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_acopco_flup_mtng_repo_form_acopco_in')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_acopco_flup_mtng_repo_form_acopco_in]
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_acopco_flup_mtng_repo_form_acopco_in] 
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
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_id', 'acopco_flup_mtng_repo_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_name', 'acopco_flup_mtng_repo_form')
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
		@p_feature_id varchar(15),
		@folder_path [nvarchar](max),
		@json NVARCHAR(MAX),
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

	select @p_by_employee_id = employee_id 
	from users
	where company_id = @i_client_id 
		and country_code = @i_country_code
		and user_id =@i_user_id
	

	if @p_file_name like '%acopco_flup_mtng_repo%' 
		begin 
			  
			
				declare  @p_source_call_ref_no nvarchar(20), @p_frt_record_seqNo varchar(30), @p_noof_records int,
				         @p_flup_customer_id varchar(15), @p_flup_priority_code nvarchar (5), @p_flup_logged_on_date varchar(10),
						 @p_flup_logged_on_hour varchar(2), @p_flup_logged_on_minute varchar(2),@p_flup_customer_location_code nvarchar(10),
						 @p_flup_org_lvl_no varchar(1), @p_flup_org_lvl_code nvarchar(15), @p_flup_company_location_code nvarchar(8),
						 @p_flup_customer_contact_name nvarchar(60),@p_flup_customer_contact_no nvarchar(20), @p_flup_customer_contact_email nvarchar(20),
						 @p_flup_udf_xml varchar(1000),  @p_flup_update_status varchar(5), @p_flup_call_ref_no nvarchar(20), @p_flup_error_no varchar(15), 
						 @p_flup_customer_name nvarchar(500),@p_flup_customer_address nvarchar(500),@p_flup_customer_city nvarchar(500), 
						 @p_flup_customer_state_code nvarchar(10),  @p_flup_distict nvarchar(20),  @p_flup_designation nvarchar(60),
						 @p_flup_assigned_to_emp_id varchar(15),@p_designation_v varchar(15),@p_flup_problem_description nvarchar (200)
								
				
			select @folder_path = 'C:\inetpub\wwwroot\'+@i_client_id+'\content_store\'+@i_client_id+'\in\call_attachments\'+@p_transaction_ref_no+'\'++replace(@p_file_name,'.pdf','.json')
			create table #json_table (bulkcolumn nvarchar(max))
			select @p_OpenJSON_insert ='Insert into #json_table(bulkcolumn)select bulkcolumn From openrowset(bulk '''+@folder_path+''', SINGLE_CLOB)as datasource'
			exec(@p_OpenJSON_insert)

			select @json = bulkcolumn from #json_table

			select @p_closure_date_v = json_value(@json, '$.date_of_closure')
					select @p_followup_fraq_v = json_value(@json, '$.next_followup_date')
					select @p_sell_to_state_v = json_value(@json, '$.meeting_state')
					select @p_sell_to_district_v = json_value(@json, '$.meeting_district')

			insert #part_temp
				(p_equipment_category,p_equipment_type,p_equipment_id,p_part_no,p_part_desc,p_part_qty,p_call_no,p_file_name,
				 p_spm_ok_notok,p_udf_char_1,p_udf_char_2,p_comments_block_1,p_comments_block_2)
			SELECT isnull(equipment_category,''),isnull(equipment_type,''),isnull(equipment_id,''),isnull(part_no,''),isnull(part_desc,''),
			isnull(required_quantity,''),isnull(@p_transaction_ref_no,''),isnull(@p_file_name,''),1,isnull(application_industry,''),isnull(model_des,''),isnull(dealdetails,''),isnull(accessories,'')
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
							  and	 call_ref_no		= @p_transaction_ref_no
							  )
				begin
					insert into call_register_actions
					(company_id,country_code,call_ref_no,action_category,action_type,product_group_code,product_sub_group_code,product_category,product_code,product_sub_code,requirement,
					no_of_units,uom_code,udf_char_1,udf_char_2,comments_block_1,additional_information,last_update_id,udf_analysis_code1,udf_analysis_code2,udf_analysis_code3)
					select @i_client_id,@i_country_code,p_call_no,'PARTREQ','SALESVTPL',p_equipment_category,p_equipment_type,p_equipment_id,
					p_part_no,'EQUIPMENT',isnull(p_udf_char_2,''),p_part_qty,'NOS',p_udf_char_1,p_udf_char_2,p_comments_block_1,p_comments_block_2,@p_by_employee_id,p_udf_analysis_code1,
					p_udf_analysis_code2,p_udf_analysis_code3
						from #part_temp
						where p_file_name like '%acopco_flup_mtng_repo%' 
						and p_call_no not in (select call_ref_no from call_register_actions)

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

			insert into call_register_actions
			(company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
			select @i_client_id,@i_country_code,@p_transaction_ref_no,'FINANCIER','SALESVISIT',
					(select financier_id from financier where financier_name in (select fleet_category from #fleetdata)), 
					'NA',
					(select financier_category from financier where financier_name in (select fleet_category from #fleetdata)),
					(select financier_category from financier where financier_name  in (select fleet_category from #fleetdata)),
					@i_user_id
					
			insert unstructured_document
			(
				company_id, country_code, parentkey1_type, parentkey1_value, parentkey2_type, parentkey2_value,
				 file_name, file_path, file_xml, last_update_id, last_update_on_datetime
			) 
			select @i_client_id, @i_country_code, 'Visit', 
					@p_transaction_ref_no,null, null, replace(@p_file_name,'.pdf','.json'),@folder_path,
					@json,'system',sysdatetimeoffset() 

				set @p_source_call_ref_no = (select top (1) call_ref_no  from call_register_actions  
				                                     where company_id = @i_client_id
					                                 and country_code = @i_country_code
													 and product_code = @p_transaction_ref_no
													 order by action_seqno desc )
 
				delete call_register_actions where call_ref_no = @p_source_call_ref_no and action_type = 'SALESLEAD' 

				set @p_noof_records  = (select count(product_category)
				                                from call_register_actions 
				                                    where company_id = @i_client_id
												        and country_code = @i_country_code 
													    and call_ref_no = @p_transaction_ref_no
													     and action_type = 'SALESVTPL'
											) 
                
				
				  set @p_frt_record_seqNo  = (select top(1) action_seqno 
				                                 from call_register_actions 
												    where company_id = @i_client_id
												       and country_code = @i_country_code 
													   and call_ref_no = @p_transaction_ref_no
													    and action_type = 'SALESVTPL'
													    order by action_seqno asc 
											)

                     
				    /* first requirement to insert into source enquiry */
				     insert into call_register_actions 
					  (company_id,country_code, call_ref_no, action_category, action_type,
					   product_code, product_sub_code, requirement,no_of_units, uom_code,
					   udf_char_1, udf_char_2, product_group_code,product_sub_group_code,product_category, additional_information, comments_block_1, comments_block_2)

				       select company_id,country_code, @p_source_call_ref_no, action_category, 'SALESLEAD',
					   product_code, product_sub_code, requirement,no_of_units, uom_code,udf_char_1, udf_char_2,
					   product_group_code, product_sub_group_code, product_category, additional_information, comments_block_1,comments_block_2
						          from call_register_actions where company_id = @i_client_id
												 and country_code = @i_country_code 
													and call_ref_no = @p_transaction_ref_no
													and action_type = 'SALESVTPL'
													and action_seqno = @p_frt_record_seqNo


						insert into call_register_actions
		                          (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
								   select @i_client_id, @i_country_code, @p_source_call_ref_no, action_category, 'SALESLEAD',product_code, product_sub_code,product_group_code, product_sub_group_code,@i_user_id
								   from call_register_actions 
								       where company_id = @i_client_id
										  and country_code = @i_country_code 
										  and call_ref_no = @p_transaction_ref_no
										  and action_category = 'FINANCIER'

						select 	@p_flup_problem_description = (select (select  dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'EQUIPTYPE',product_sub_group_code)) +'-'+ product_category + 
						                                         '['+product_code+'-'+ cast(cast(no_of_units as int) as varchar(10))+ ' '+ uom_code+']' )
						                                            from call_register_actions 
																	 where company_id = @i_client_id
												                      and country_code = @i_country_code 
																	  and call_ref_no = @p_transaction_ref_no
																	  and action_type = 'SALESVTPL'
																	  and action_seqno = @p_frt_record_seqNo



                           update call_register
						   set problem_description = @p_flup_problem_description
						    where company_id = @i_client_id
						         and country_code = @i_country_code 
								 and call_ref_no = @p_source_call_ref_no


							/* form comments from visit report */
									insert call_status_event_log
									(
										company_id, country_code, call_ref_no,
										channel_id, eventverb_id,
										from_wf_stage_no, to_wf_stage_no,
										event_date, to_status, from_status,
										by_employee_id, comments, last_update_id
									)
									select @i_client_id, @i_country_code, @p_source_call_ref_no,
											channel_id, eventverb_id,
											from_wf_stage_no, to_wf_stage_no,
											event_date, to_status, from_status,
											by_employee_id, comments, last_update_id

											from call_status_event_log 
											where company_id = @i_client_id
											and country_code = @i_country_code
											and call_ref_no  = @p_transaction_ref_no
											and eventverb_id like '%acopco_flup_mtng_repo%'


                      
						

                     /* end */

					 if (@p_noof_records > 1)
					 begin

                        select @p_flup_logged_on_date = @p_event_date
						select @p_flup_logged_on_hour = @p_event_hour
						select @p_flup_logged_on_minute = @p_event_minute

						 select @p_flup_customer_id= customer_id, @p_flup_org_lvl_code =  organogram_level_code, 
								   @p_flup_org_lvl_no = organogram_level_no, @p_flup_company_location_code = company_location_code,
								   @p_flup_customer_contact_name =  customer_contact_name, @p_flup_customer_contact_no =  customer_contact_no,
								   @p_flup_customer_contact_email = customer_contact_email_id, @p_flup_customer_location_code = customer_location_code,
								   @p_flup_customer_name = customer_name , @p_flup_customer_address = customer_address,
								   @p_flup_customer_city = customer_city , @p_flup_priority_code= priority_code,
								   @p_flup_customer_state_code = customer_state_code, @p_flup_distict = customer_district_code, @p_flup_designation = udf_char_10
							from call_register
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and call_ref_no = @p_transaction_ref_no

							  	
						  select @p_flup_assigned_to_emp_id = @p_by_employee_id
		 
						  select @p_flup_udf_xml = '<inputparam>
															<assigned_to_emp_id>' + isnull(@p_flup_assigned_to_emp_id, '') + '</assigned_to_emp_id>
															<udf_char_10>' + isnull(@p_designation_v, '') + '</udf_char_10>
															<channel>mobile</channel>
														</inputparam>'
			     



					 /* cursor for seperate enquiry for each line item of followup visit*/

						DECLARE @p_flup_product_code   nvarchar(30),
								@p_flup_no_of_units numeric(10,2), @p_flup_uom_code varchar(12),
								@p_flup_product_group_code nvarchar(15), @p_flup_product_sub_group_code nvarchar(15),
								@p_flup_product_category nvarchar(30)

							DECLARE cursor_enquiry CURSOR
							FOR SELECT isnull(product_group_code,''), isnull(product_sub_group_code,''), isnull(product_category,''), 
										product_code, no_of_units, uom_code
								FROM  call_register_actions 
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and call_ref_no = @p_transaction_ref_no
							  and action_type = 'SALESVTPL'
							  and action_seqno != @p_frt_record_seqNo


							OPEN cursor_enquiry;

							FETCH NEXT FROM cursor_enquiry INTO 
								@p_flup_product_group_code, @p_flup_product_sub_group_code, @p_flup_product_category, 
								@p_flup_product_code, @p_flup_no_of_units, @p_flup_uom_code;

							WHILE @@FETCH_STATUS = 0
							BEGIN
							

								 execute sp_save_manage_call_register @i_client_id, @i_country_code, @i_session_id, @i_user_id, @i_locale_id, 
											@p_flup_customer_id, 'ZZZ', '', 'ZZZ',
											'Ref. Requirement', @p_flup_priority_code, @i_user_id, @p_flup_logged_on_date, @p_flup_logged_on_hour, @p_flup_logged_on_minute,
											@p_flup_customer_location_code, @p_flup_org_lvl_no, @p_flup_org_lvl_code, 'SA', 'SA',
											'', @p_flup_company_location_code, @p_flup_customer_contact_name, @p_flup_customer_contact_no, @p_flup_customer_contact_email,
											'NB', '0', '0', '0', '0', 'INR', '', '0', '', '', @p_flup_udf_xml,
											'A','00000000-0000-0000-0000-000000000000', @p_flup_update_status output, @p_flup_call_ref_no output, @p_flup_error_no output

		
					
								 /* Updating additional value*/
				  
								  update call_register 
								  set customer_name  = @p_flup_customer_name, 
									  customer_address = @p_flup_customer_address,
									  customer_city = @p_flup_customer_city, 
									  customer_state_code =  @p_flup_customer_state_code, 
									  source_code_category = 'VISIT',
									  source_sub_code = 'VISIT'
								  where company_id = @i_client_id
									and country_code = @i_country_code 
									and call_ref_no = @p_flup_call_ref_no

								/* Relationship */
								update call_register_actions
								set sys_gen_call_ref_no = @p_flup_call_ref_no
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and call_ref_no = @p_transaction_ref_no
								  and product_code = @p_flup_product_code

								/* Copy the data */

								  insert into call_register_actions 
								(
								 company_id,country_code, call_ref_no, 
								 action_category, action_type,
								 product_group_code, product_sub_group_code, 
								 product_category, product_code, product_sub_code, 
								 requirement,additional_information,
								 comments_block_1, comments_block_2, comments_block_3,
								 no_of_units, uom_code,
								 udf_char_1, udf_char_2, udf_char_3, udf_char_4, 
								 udf_bit_1, udf_bit_2, udf_bit_3, udf_bit_4, 
								 udf_float_1, udf_float_2, udf_float_3, udf_float_4,
								 udf_date_1, udf_date_2, udf_date_3, udf_date_4,
								 udf_analysis_code1, udf_analysis_code2, udf_analysis_code3, udf_analysis_code4,
								 last_update_id
								)
								select company_id,country_code, @p_flup_call_ref_no, 
										action_category, 'SALESLEAD',
										product_group_code, product_sub_group_code,
										product_category, product_code, product_sub_code, 
										requirement, additional_information,
										comments_block_1, comments_block_2, comments_block_3,
										no_of_units, uom_code,
										 udf_char_1, udf_char_2, udf_char_3, udf_char_4, 
										 udf_bit_1, udf_bit_2, udf_bit_3, udf_bit_4, 
										 udf_float_1, udf_float_2, udf_float_3, udf_float_4,
										 udf_date_1, udf_date_2, udf_date_3, udf_date_4,
										 udf_analysis_code1, udf_analysis_code2, udf_analysis_code3, udf_analysis_code4,
										@p_by_employee_id
								from call_register_actions 
								where company_id = @i_client_id
								  and country_code = @i_country_code 
								  and call_ref_no = @p_transaction_ref_no
								  and product_code  = @p_flup_product_code


								  
						insert into call_register_actions
		                          (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
								   select @i_client_id, @i_country_code, @p_flup_call_ref_no, action_category, 'SALESLEAD',product_code, product_sub_code,product_group_code, product_sub_group_code,@i_user_id
								   from call_register_actions 
								       where company_id = @i_client_id
										  and country_code = @i_country_code 
										  and call_ref_no = @p_transaction_ref_no
										  and action_category = 'FINANCIER'


								  /* form comments from visit report */
									insert call_status_event_log
									(
										company_id, country_code, call_ref_no,
										channel_id, eventverb_id,
										from_wf_stage_no, to_wf_stage_no,
										event_date, to_status, from_status,
										by_employee_id, comments, last_update_id
									)
									select @i_client_id, @i_country_code, @p_flup_call_ref_no,
											channel_id, eventverb_id,
											from_wf_stage_no, to_wf_stage_no,
											event_date, to_status, from_status,
											by_employee_id, comments, last_update_id

											from call_status_event_log 
											where company_id = @i_client_id
											and country_code = @i_country_code
											and call_ref_no  = @p_transaction_ref_no
											and eventverb_id like '%Meeting Report PL%'



								  update call_register
								  set problem_description =  (select  dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'EQUIPTYPE',@p_flup_product_sub_group_code)) +'-'+ @p_flup_product_category+ '['+@p_flup_product_code+'-'+ cast(cast(@p_flup_no_of_units as int) as varchar(10))+ ' '+ @p_flup_uom_code+']',
									  additional_information = ''
								  where company_id = @i_client_id
									and country_code = @i_country_code
									and call_ref_no = @p_flup_call_ref_no


							FETCH NEXT FROM cursor_enquiry INTO 
								@p_flup_product_group_code, @p_flup_product_sub_group_code, @p_flup_product_category, 
								@p_flup_product_code, @p_flup_no_of_units, @p_flup_uom_code;
					
							END;

					CLOSE cursor_enquiry;

					DEALLOCATE cursor_enquiry;
	
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

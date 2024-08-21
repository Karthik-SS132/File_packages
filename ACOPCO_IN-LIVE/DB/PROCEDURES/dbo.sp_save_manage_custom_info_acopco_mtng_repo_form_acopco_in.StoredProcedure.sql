/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_acopco_mtng_repo_form_acopco_in]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_acopco_mtng_repo_form_acopco_in')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_acopco_mtng_repo_form_acopco_in]
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_acopco_mtng_repo_form_acopco_in] 
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
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_id', 'acopco_mtng_repo_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_name', 'acopco_mtng_repo_form')
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

	/* To create sa call with details of visist form */

		if @p_file_name like '%acopco_mtng_repo%'
		begin 
             
			 declare @p_user_group_id_v varchar(15), @p_customer_id_v varchar(15), @p_asset_id_v nvarchar(30), @p_equipment_id_v nvarchar(30),
					@p_problem_description_v nvarchar(1000),@p_customer_contact_name_v nvarchar(60), @p_customer_contact_no_v nvarchar(20),
					@p_customer_contact_email_v nvarchar(60), @p_logged_on_date_v varchar(10),
					@p_logged_on_hour_v varchar(2), @p_logged_on_minute_v varchar(2), @p_udf_xml_v varchar(1000),
					@p_org_lvl_no_v varchar(1), @p_org_lvl_code_v nvarchar(15), @p_company_location_code_v nvarchar(8),
					@p_employee_id_v nvarchar(12), @p_customer_location_code_v nvarchar(10), 
					@p_closure_date_v varchar(10), @p_assigned_to_emp_id_v nvarchar(12),@p_followup_fraq_v nvarchar(12), @p_update_status_v varchar(5),
					@p_call_ref_no_v nvarchar(20), @p_error_no_v varchar(15), @p_sell_to_state_v nvarchar(60), @p_sell_to_district_v nvarchar(20),
					@p_customer_name_v nvarchar(500),@p_customer_address_v nvarchar(500),@p_customer_city_v nvarchar(500), 
					@p_priority_code_v nvarchar (5),@p_customer_state_code_v nvarchar(10),  @p_distict_v nvarchar(20),  @p_designation_v nvarchar(60)


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
					select @i_client_id,@i_country_code,p_call_no,'PARTREQ','SALESVISIT',p_equipment_category,p_equipment_type,p_equipment_id,
					p_part_no,'EQUIPMENT',isnull(p_udf_char_2,''),p_part_qty,'NOS',p_udf_char_1,p_udf_char_2,p_comments_block_1,p_comments_block_2,@p_by_employee_id,p_udf_analysis_code1,
					p_udf_analysis_code2,p_udf_analysis_code3
						from #part_temp
						where p_file_name like '%acopco_flup_mtng_repo%' 
						and p_call_no not in (select call_ref_no from call_register_actions)

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
				  select @i_client_id, @i_country_code, @p_transaction_ref_no, 'FINANCIER', 'SALESLEAD',@p_nbfc, 'NA','NBFC','NBFC', @i_user_id
			  end

			  if @p_pvt_bank != 'NA'
			  begin
				  insert into call_register_actions
				  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
				  select @i_client_id, @i_country_code, @p_transaction_ref_no, 'FINANCIER', 'SALESLEAD',@p_pvt_bank, 'NA','PVTBK','PVTBK', @i_user_id

			  end

			  if @p_nationalized_bank != 'NA'
			  begin

				  insert into call_register_actions
				  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
				  select @i_client_id, @i_country_code, @p_transaction_ref_no, 'FINANCIER', 'SALESLEAD',@p_nationalized_bank, 'NA','PSB','PSB', @i_user_id

			  end

			  if @p_bg != '0'
			  begin

			  insert into call_register_actions
			  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
			  select @i_client_id, @i_country_code, @p_transaction_ref_no, 'FINANCIER', 'SALESLEAD',@p_bg, 'NA','BG','BG', @i_user_id

			  end
		  
			  if @p_lc != '0'
			  begin

			  insert into call_register_actions
			  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
			  select @i_client_id, @i_country_code, @p_transaction_ref_no, 'FINANCIER', 'SALESLEAD',@p_lc, 'NA','LC','LC', @i_user_id

			  end

			  if @p_ownsrc != '0'
			  begin

				insert into call_register_actions
			  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
			  select @i_client_id, @i_country_code, @p_transaction_ref_no, 'FINANCIER', 'SALESLEAD',@p_ownsrc, 'NA','OS','OS', @i_user_id

			  end

			   if @p_dbFinance != '0'
			  begin

				insert into call_register_actions
			  (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
			  select @i_client_id, @i_country_code, @p_transaction_ref_no, 'FINANCIER', 'SALESLEAD',@p_dbFinance, 'NA','DB','DB', @i_user_id

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
			(select customer_id from call_register where call_ref_no = @p_transaction_ref_no),
			sysdatetimeoffset(),
			@p_customer_segment,@p_customer_segment,@i_user_id,@i_user_id
			from #fleetdata
				
				if exists (select product_code from  call_register_actions 
								where company_id = @i_client_id
									 and country_code = @i_country_code
									 and action_category = 'PARTREQ'
									 and call_ref_no = @p_transaction_ref_no
									 and product_code != ''
									 and no_of_units != 0)
				begin
						  select @p_customer_id_v = customer_id,@p_asset_id_v = asset_id, @p_equipment_id_v = equipment_id,
								   @p_problem_description_v = problem_description, @p_org_lvl_code_v =  organogram_level_code, 
								   @p_org_lvl_no_v = organogram_level_no, @p_company_location_code_v = company_location_code,
								   @p_customer_contact_name_v =  customer_contact_name, @p_customer_contact_no_v =  customer_contact_no,
								   @p_customer_contact_email_v = customer_contact_email_id, @p_customer_location_code_v = customer_location_code,
								   @p_customer_name_v = customer_name , @p_customer_address_v = customer_address,
								   @p_customer_city_v = customer_city , @p_priority_code_v = priority_code,
								   @p_customer_state_code_v = customer_state_code, @p_distict_v = customer_district_code, @p_designation_v = udf_char_10
							from call_register
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and call_ref_no = @p_transaction_ref_no

							select @p_employee_id_v = employee_id,
									@p_user_group_id_v = user_group_id
							from users
							where company_id = @i_client_id
							and country_code = @i_country_code
							and user_id = @i_user_id

							select @p_logged_on_date_v = json_value(@i_inputparam_header_xml, '$.event_date')
							select @p_logged_on_hour_v = json_value(@i_inputparam_header_xml, '$.event_hour')
							select @p_logged_on_minute_v = json_value(@i_inputparam_header_xml, '$.event_minute')
					
						  select @p_assigned_to_emp_id_v = @p_employee_id_v
		 
						  select @p_udf_xml_v = '<inputparam>
															<call_register_expected_closure_date>' + isnull(@p_closure_date_v, '') + '</call_register_expected_closure_date>
															<assigned_to_emp_id>' + isnull(@p_assigned_to_emp_id_v, '') + '</assigned_to_emp_id>
															<udf_analysis_code1>' + isnull(@p_followup_fraq_v, '') + '</udf_analysis_code1>
															<udf_char_1>' + isnull(@p_sell_to_state_v, '') + '</udf_char_1>
															<udf_char_2>' + isnull(@p_sell_to_district_v, '') + '</udf_char_2>
															<udf_char_10>' + isnull(@p_designation_v, '') + '</udf_char_10>
															<channel>mobile</channel>
														</inputparam>'
			     
						 /* cursor for seperate enquiry for each line item */

						 DECLARE @p_eq_product_code   nvarchar(30),
								@p_ep_no_of_units numeric(10,2), @p_eq_uom_code varchar(12),
								@p_product_group_code nvarchar(15), @p_product_sub_group_code nvarchar(15),
								@p_product_category nvarchar(30)

							DECLARE cursor_enquiry CURSOR
							FOR SELECT isnull(product_group_code,''), isnull(product_sub_group_code,''), isnull(product_category,''), 
										product_code, no_of_units, uom_code
								FROM  call_register_actions 
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and action_category = 'PARTREQ'
							  and call_ref_no = @p_transaction_ref_no

							OPEN cursor_enquiry;

							FETCH NEXT FROM cursor_enquiry INTO 
								@p_product_group_code, @p_product_sub_group_code, @p_product_category, 
								@p_eq_product_code, @p_ep_no_of_units, @p_eq_uom_code;

							WHILE @@FETCH_STATUS = 0
							BEGIN
							
								 execute sp_save_manage_call_register @i_client_id, @i_country_code, @i_session_id, @i_user_id, @i_locale_id, 
											@p_customer_id_v, @p_asset_id_v, '', @p_equipment_id_v,
											'Ref. Requirement', @p_priority_code_v, @i_user_id, @p_logged_on_date_v, @p_logged_on_hour_v, @p_logged_on_minute_v,
											@p_customer_location_code_v, @p_org_lvl_no_v, @p_org_lvl_code_v, 'SA', 'SALES',
											'', @p_company_location_code_v, @p_customer_contact_name_v, @p_customer_contact_no_v, @p_customer_contact_email_v,
											'NB', '0', '0', '0', '0', 'INR', '', '0', '', '', @p_udf_xml_v,
											'A','00000000-0000-0000-0000-000000000000', @o_update_status output, @p_call_ref_no_v output, @i_error_msg output
		
					
								 /* Updating additional value*/
				  
								  update call_register 
								  set customer_name  = @p_customer_name_v, 
									  customer_address = @p_customer_address_v,
									  customer_city = @p_customer_city_v, 
									  customer_district_code =  @p_distict_v,
									  customer_state_code =  @p_customer_state_code_v, 
									  source_code_category = 'VISIT',
									  source_sub_code = 'VISIT'
								  where company_id = @i_client_id
									and country_code = @i_country_code 
									and call_ref_no = @p_call_ref_no_v


								/* form comments from visit report */
									insert call_status_event_log
									(
										company_id, country_code, call_ref_no,
										channel_id, eventverb_id,
										from_wf_stage_no, to_wf_stage_no,
										event_date, to_status, from_status,
										by_employee_id, comments, last_update_id
									)
									select @i_client_id, @i_country_code, @p_call_ref_no_v,
											channel_id, eventverb_id,
											from_wf_stage_no, to_wf_stage_no,
											event_date, to_status, from_status,
											by_employee_id, comments, last_update_id

											from call_status_event_log 
											where company_id = @i_client_id
											and country_code = @i_country_code
											and call_ref_no  = @p_transaction_ref_no
											and eventverb_id like '%acopco_mtng_repo%'
									

								/* Relationship */
								update call_register_actions
								set sys_gen_call_ref_no = @p_call_ref_no_v
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and call_ref_no = @p_transaction_ref_no
								  and product_code = @p_eq_product_code

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
								select company_id,country_code, @p_call_ref_no_v, 
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
								  and product_code  = @p_eq_product_code


								 insert into call_register_actions
		                          (company_id, country_code,	call_ref_no, action_category, action_type, product_code, product_sub_code,product_group_code, product_sub_group_code, last_update_id)
								   select @i_client_id, @i_country_code, @p_call_ref_no_v, action_category, 'SALESLEAD',product_code, product_sub_code,product_group_code, product_sub_group_code,@i_user_id
								   from call_register_actions 
								       where company_id = @i_client_id
										  and country_code = @i_country_code 
										  and call_ref_no = @p_transaction_ref_no
										  and action_category = 'FINANCIER'
										  

								 update call_register
								  set problem_description = (select  dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'EQUIPTYPE',@p_product_sub_group_code)) 
								  +'-'+ @p_product_category+ '['+@p_eq_product_code+'-'+ cast(cast(@p_ep_no_of_units as int) as varchar(10))+ ' '+ @p_eq_uom_code+']',
									  additional_information = ''
								  where company_id = @i_client_id
									and country_code = @i_country_code
									and call_ref_no = @p_call_ref_no_v
									 

							FETCH NEXT FROM cursor_enquiry INTO 
								@p_product_group_code, @p_product_sub_group_code, @p_product_category, 
								@p_eq_product_code, @p_ep_no_of_units, @p_eq_uom_code;
					
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

/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_mserviceAI]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_mserviceAI')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_mserviceAI]
END
																														
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Generic function to retrieve list
 */
CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_mserviceAI]
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

	declare	@p_sysdatetimeoffset datetimeoffset(7),
		@p_inputparam_header_xml nvarchar(max),
		@p_transaction_type varchar(20),
		@p_transaction_ref_no varchar(30),
		@p_new_sequence_no varchar(30),
		@p_eventverb varchar(30),
		@p_eventchange varchar(5),
		@p_employee_id nvarchar(12),
		@p_assigned_to_employee_id nvarchar(12),		
		@p_assigned_to_employee_name nvarchar(100),
		@p_user_id nvarchar(12),
		@p_event_date varchar(10),
		@p_event_hour varchar(2),
		@p_event_minute varchar(2),
		@p_event_second varchar(2),
		@p_event_latitude varchar(10),
		@p_event_longitude varchar(10),
		@p_link_event nvarchar(60),
		@p_inclusive_event nvarchar(60)


	declare @p_request_category varchar(10),
		@p_request_type nvarchar(10),
		@p_organogram_level_no tinyint,
		@p_organogram_level_code nvarchar(15),
		@p_company_location_code nvarchar(8),
		@p_current_wf_stage_no tinyint,
		@p_current_wf_status varchar(2),
		@p_from_wf_stage_no tinyint, 
		@p_from_wf_status varchar(2),
		@p_to_wf_stage_no tinyint, 
		@p_to_wf_status varchar(2),
		@p_customer_id nvarchar(15),
		@p_customer_location_code nvarchar(10),
		@p_cust_contact_person_1 nvarchar(60),
		@p_cust_contact_person_1_mobile_no varchar(20),
		@p_cust_contact_person_1_email_id nvarchar(60),
		@p_dealer_id nvarchar(20),
		@p_dealer_location_code nvarchar(8),
		@p_call_inputparam nvarchar(max),
		@p_logged_on_date varchar(10),
		@p_logged_on_hour varchar(2),
		@p_logged_on_minute varchar(2),
		@p_update_status varchar(10),
		@p_enquiry_call_ref_no nvarchar(30),
		@p_service_call_ref_no nvarchar(30),
		@p_error_no varchar(10),
		@p_call_category varchar(10), 
		@p_call_type nvarchar(10),
		@p_call_created_by_employee_id nvarchar(12),		
		@p_call_created_by_employee_name nvarchar(100),
		@p_entity_type varchar(2),
		@p_asset_id nvarchar(30), 
		@p_equipment_id nvarchar(30),
		@p_problem_description nvarchar(max),
		@p_survey_ref_no nvarchar(30),
		@r_update_status varchar(5), 
		@r_errorNo varchar(10)

	/* GET THE SYSTEM DATE TIME BASED ON USER TIMEZONE */
	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset
	(
		@i_client_id, 
		@i_country_code, 
		@i_user_id
	)

	/* GET THE INPUT DETAILS FROM MESSAGE PAYLOAD */
	select @p_eventverb = json_value(@i_inputparam_header_xml, '$.action.eventverb')
	select @p_eventchange = json_value(@i_inputparam_header_xml, '$.action.eventchange')
	select @p_user_id = json_value(@i_inputparam_header_xml, '$.msgBody.from.id')
	select @p_transaction_type = json_value(@i_inputparam_header_xml, '$.action.transaction_type')
	select @p_request_category = json_value(@i_inputparam_header_xml, '$.action.request_category')
	select @p_request_type = json_value(@i_inputparam_header_xml, '$.action.request_type')
	select @p_link_event = json_value(@i_inputparam_header_xml, '$.action.link_event')
	select @p_inclusive_event = json_value(@i_inputparam_header_xml, '$.action.inclusive_event')


	/* GET THE EMPLOYEE AND ENTITY DETAILS OF THE REQUESTOR */
	select @p_employee_id = b.employee_id,
		@p_organogram_level_no = b.organogram_level_no,
		@p_organogram_level_code = b.organogram_level_code
	from users a, employee b
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.user_id = @i_user_id
		and b.company_id = a.company_id
		and b.country_code = a.country_code
		and b.employee_id = a.employee_id

	select @p_entity_type = entity_type
	from entity_organogram_mapping
	where company_id = @i_client_id
		and country_code = @i_country_code
		and organogram_level_no = @p_organogram_level_no
		and organogram_level_code = @p_organogram_level_code
	
	if (@p_entity_type = 'C')
	begin

		select @p_customer_id = customer_id,
			@p_customer_location_code = customer_location_code
		from customer_user_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @p_user_id

		select @p_cust_contact_person_1 = contact_person_1,
			@p_cust_contact_person_1_email_id = contact_person_1_email_id,
			@p_cust_contact_person_1_mobile_no = contact_person_1_mobile_no
		from customer_location
		where company_id = @i_client_id
			and country_code = @i_country_code
			and customer_id = @p_customer_id
			and location_code = @p_customer_location_code

		if (json_value(@i_inputparam_header_xml, '$.msgBody.custom.asset_id') != '')
		begin
			select top(1) @p_organogram_level_no = servicing_org_level_no, 
				@p_organogram_level_code = servicing_org_level_code
			from asset_master 
			where company_id = @i_client_id
				and country_code = @i_country_code
				and customer_id in (select customer_id
									from customer_user_mapping
									where company_id = @i_client_id
										and country_code = @i_country_code
										and user_id = @p_user_id) 
				and asset_status = 'A'
				and asset_id = json_value(@i_inputparam_header_xml, '$.msgBody.custom.asset_id')
		end

		if (json_value(@i_inputparam_header_xml, '$.msgBody.actionPath') = '@SPAREACTION')
		begin
			if not exists (select 1 from asset_master 
						where company_id = @i_client_id
							and country_code = @i_country_code
							and customer_id in (select customer_id
												from customer_user_mapping
												where company_id = @i_client_id
													and country_code = @i_country_code
													and user_id = @p_user_id) 
							and asset_status = 'A'
							and servicing_org_level_no != '3')
			begin
				if exists (select 1 from asset_master 
						where company_id = @i_client_id
							and country_code = @i_country_code
							and customer_id in (select customer_id
												from customer_user_mapping
												where company_id = @i_client_id
													and country_code = @i_country_code
													and user_id = @p_user_id) 
							and asset_status = 'A'
							and servicing_org_level_no = '3')
				begin
					select top(1) @p_organogram_level_no = servicing_org_level_no, 
						@p_organogram_level_code = servicing_org_level_code
					from asset_master 
					where company_id = @i_client_id
						and country_code = @i_country_code
						and customer_id in (select customer_id
											from customer_user_mapping
											where company_id = @i_client_id
												and country_code = @i_country_code
												and user_id = @p_user_id) 
						and asset_status = 'A'
						and servicing_org_level_no = '3'
				end
			end
		end
		
	end

	if exists (select 1 from dealer_organogram_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and organogram_level_no = @p_organogram_level_no
			and organogram_level_code = @p_organogram_level_code)
	begin

		select @p_dealer_id = dealer_id
		from dealer_organogram_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and organogram_level_no = @p_organogram_level_no
			and organogram_level_code = @p_organogram_level_code

		if @p_dealer_id is null
		begin
			set @i_error_msg = '{"code":"failed_getting_dealer"}'
			return
		end

		select top(1) @p_company_location_code = company_location_code
		from dealer_company_location_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and dealer_id = @p_dealer_id

		if @p_company_location_code is null
		begin
			set @i_error_msg = '{"code":"failed_getting_company_location"}'
			return
		end

		select @p_assigned_to_employee_id = employee_id
		from dealer_mapping_to_employee
		where company_id = @i_client_id
			and country_code = @i_country_code
			and mapping_purpose_code = 'CALLAUTOASSIGNMENT'
			and request_category = 'CALL'
			and request_type = 'CALL'
			and dealer_id = @p_dealer_id
			and dealer_location_code = 'ALL'
			and equipment_category = 'ALL'
			and equipment_type = 'ALL'

		if @p_assigned_to_employee_id is null
		begin
			set @i_error_msg = '{"code":"failed_getting_assignee"}'
			return
		end

	end
	
	if not exists (select 1 from dealer_organogram_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and organogram_level_no = @p_organogram_level_no
			and organogram_level_code = @p_organogram_level_code)
	begin

		select top(1) @p_assigned_to_employee_id = b.employee_id ,
			@p_company_location_code = b.location_code
		from users a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.employee_id = a.employee_id
			and a.user_group_id = 'SECORD'

		if @p_assigned_to_employee_id is null
		begin
			set @i_error_msg = '{"code":"failed_getting_assignee"}'
			return
		end

		if @p_company_location_code is null
		begin
			set @i_error_msg = '{"code":"failed_getting_company_location"}'
			return
		end

	end

	if (@p_transaction_type = 'CONTENTUPDATE')
	begin
		if (@p_eventverb = 'CONTENTUPDATE')
		begin
			select @i_inputparam_header_xml = json_modify (
				@i_inputparam_header_xml, 
				'$.msgBody.custom.problem_desc', 
				json_value(@i_inputparam_header_xml, '$.msgBody.content')
			)
		end
	end else if (@p_transaction_type = 'ANCILLARY')
	begin

		if (@p_eventverb = 'OPEN')
		begin

			execute sp_create_new_sequence_no @i_session_id, @i_client_id, @i_user_id, @i_locale_id, @i_country_code,'ANCILLARY',
			 @p_request_category, @p_request_type, 'NA','NA', 'NA', @p_new_sequence_no OUTPUT

			if @p_new_sequence_no = '0'
			begin
				set @i_error_msg = '{"code":"failed_creating_seq_number"}'
				return
			end
		 
			set @p_transaction_ref_no = dbo.fn_client_specific_stamping_request_ref_no(@i_client_id,@i_country_code,'ANCILLARY',@p_request_category,@p_request_type,@p_new_sequence_no)
			 
			if ( @p_transaction_ref_no = '')
			begin
				set @i_error_msg = '{"code":"failed_creating_ref_number"}'
				return
			end

			insert ancillary_request_register (
				company_id, country_code, request_ref_no, request_category, request_type, request_wf_stage_no,
				request_status, customer_id, customer_location_code, company_location_code, organogram_level_no,
				organogram_level_code, requirement, priority_code, customer_contact_no, customer_contact_name, 
				customer_contact_email_id, system_user_generation_ind, created_by_employee_id, created_on_date,
				billable_nonbillable_ind, charges_currency_code, charges_discount_amount, charges_gross_amount,
				charges_net_amount, charges_tax_amount, last_update_id
			)
			select @i_client_id, @i_country_code, @p_transaction_ref_no, @p_request_category,@p_request_type,
			2,'A', @p_customer_id, @p_customer_location_code, @p_company_location_code, @p_organogram_level_no, @p_organogram_level_code,
			'','MED', @p_cust_contact_person_1_mobile_no, @p_cust_contact_person_1, @p_cust_contact_person_1_email_id,
			'U',@p_employee_id, SYSDATETIMEOFFSET(), '','',0.0000,0.0000,0.0000,0.0000, 'system'

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"failed_creating_ancillary_request"}'
				return
			end

			insert ancillary_request_status_event_log
			(
				company_id, country_code, request_ref_no, channel_id, eventverb_id, from_wf_stage_no,
				to_wf_stage_no, event_date, to_status, from_status, by_employee_id, to_employee_id_string,
				last_update_id
			)
			select @i_client_id, @i_country_code, @p_transaction_ref_no, 'WEB', 'OPEN', 0,
					1, SYSDATETIMEOFFSET(), 'O', '', @p_employee_id, '',
					@i_user_id

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"failed_creating_ancillary_event_log"}'
				return
			end

			insert ancillary_request_status_event_log
			(
				company_id, country_code, request_ref_no, channel_id, eventverb_id, from_wf_stage_no,
				to_wf_stage_no, event_date, to_status, from_status, by_employee_id, to_employee_id_string,
				last_update_id
			)
			select @i_client_id, @i_country_code, @p_transaction_ref_no, 'WEB', 'ASSIGN', 1,
					2, SYSDATETIMEOFFSET(), 'A', 'O', @p_employee_id, @p_assigned_to_employee_id,
					@i_user_id

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"failed_creating_ancillary_event_log"}'
				return
			end

			insert ancillary_request_assignment
			(
				company_id, country_code, request_ref_no,
				resource_emp_id, primary_resource_ind, assigned_on_date,
				last_update_id
			)
			select @i_client_id, @i_country_code, @p_transaction_ref_no,
					@p_assigned_to_employee_id, 1, SYSDATETIMEOFFSET(), 
					@i_user_id

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"failed_creating_ancillary_assignment"}'
				return
			end

			insert ancillary_request_register_actions 
			(
				company_id,
				country_code,
				request_ref_no,
				action_category,
				action_type,
				product_code,
				product_sub_code,
				last_update_id
			)
			select @i_client_id, 
				@i_country_code,
				@p_transaction_ref_no,
				'CONVERSATIONREF',
				'CONVERSATIONREF',
				substring(json_value(@i_inputparam_header_xml, '$.msgBody.subKey'), 1, 30),
				substring(json_value(@i_inputparam_header_xml, '$.msgBody.subKey'), 31, 60),
				@i_user_id

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"failed_creating_ancillary_actions"}'
				return
			end

			select @i_inputparam_header_xml = json_modify (
				@i_inputparam_header_xml, 
				'$.msgBody.custom.transaction_ref_no', 
				@p_transaction_ref_no
			)

			select @p_assigned_to_employee_id = resource_emp_id 
			from ancillary_request_assignment
			where company_id = @i_client_id
				and country_code = @i_country_code
				and request_ref_no = @p_transaction_ref_no
				and primary_resource_ind = 1

			if (@p_assigned_to_employee_id is not null)
			begin

				select @p_assigned_to_employee_name = title + first_name + ' ' + last_name
				from employee
				where company_id = @i_client_id
					and country_code = @i_country_code
					and employee_id = @p_assigned_to_employee_id

				select @i_inputparam_header_xml = json_modify (
					@i_inputparam_header_xml, 
					'$.msgBody.custom.asgn_emp_id', 
					@p_assigned_to_employee_id
				)

				select @i_inputparam_header_xml = json_modify (
					@i_inputparam_header_xml, 
					'$.msgBody.custom.asgn_emp_name', 
					@p_assigned_to_employee_name
				)

			end

			if @p_link_event = 'ENQAGAINSTCAMPGN'
			begin

				select @p_call_category = 'PE', @p_call_type = 'PARTENQ'
				select @p_logged_on_date = convert(varchar(10),SYSDATETIMEOFFSET(),120)
				select @p_logged_on_hour = substring(convert(varchar(10),SYSDATETIMEOFFSET(),108),1,2)
				select @p_logged_on_minute = substring(convert(varchar(10),SYSDATETIMEOFFSET(),108),4,2)
				select @p_problem_description = isnull(json_value(@i_inputparam_header_xml, '$.msgBody.custom.problem_desc'), '')
				set @p_call_inputparam = '<inputparam><call_register_source_code_category>'+'CAMPGN'+'</call_register_source_code_category><call_register_source_code>'+isnull(json_value(@i_inputparam_header_xml, '$.msgBody.custom.trans_ref_no'), '')+'</call_register_source_code></inputparam>'

				if @p_dealer_id is not null
				begin
					select @p_call_created_by_employee_id = employee_id
					from dealer_mapping_to_employee
					where company_id = @i_client_id
						and country_code = @i_country_code
						and mapping_purpose_code = 'CALLAUTOASSIGNMENT'
						and request_category = 'CALL'
						and request_type = 'CALL'
						and dealer_id = @p_dealer_id
						and dealer_location_code = 'ALL'
						and equipment_category = 'ALL'
						and equipment_type = 'ALL'
				end
				else
				begin
					select top(1) @p_call_created_by_employee_id = b.employee_id
					from users a, employee b
					where a.company_id = @i_client_id
						and a.country_code = @i_country_code
						and b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.employee_id = a.employee_id
						and a.user_group_id = 'SECORD'
				end
			
				execute sp_save_manage_call_register @i_client_id, @i_country_code, @i_session_id, @p_call_created_by_employee_id, @i_locale_id, 
						@p_customer_id, 'ZZZ', '', 'ZZZ', @p_problem_description, 'MED', @p_call_created_by_employee_id,
						@p_logged_on_date, @p_logged_on_hour, @p_logged_on_minute, @p_customer_location_code, @p_organogram_level_no,
						@p_organogram_level_code, @p_call_category,	@p_call_type,'', @p_company_location_code,
						@p_cust_contact_person_1, @p_cust_contact_person_1_mobile_no, @p_cust_contact_person_1_email_id, 'NB',
						0,0,0,0,'INR','','', '','', @p_call_inputparam,
						'A','00000000-0000-0000-0000-000000000000',
						@p_update_status OUTPUT, @p_enquiry_call_ref_no OUTPUT, @p_error_no OUTPUT

				if @p_error_no != ''
				begin
					set @i_error_msg = '{"code":"failed_creating_enquiry"}'
					return
				end	

				select @i_inputparam_header_xml = json_modify (
					@i_inputparam_header_xml, 
					'$.msgBody.custom.enquiry_call_ref_no', 
					@p_enquiry_call_ref_no
				)

				insert campaign_register_actions 
				(
					company_id,
					country_code,
					request_ref_no,
					action_category,
					action_type,
					product_code,
					product_sub_code,
					sys_gen_request_ref_no,
					last_update_id
				)
				select @i_client_id, 
					@i_country_code,
					isnull(json_value(@i_inputparam_header_xml, '$.msgBody.custom.trans_ref_no'), ''),
					'LINK',
					'ENQAGAINSTCAMPGN',
					'NA',
					'NA',
					@p_enquiry_call_ref_no,
					@i_user_id

				if @@ROWCOUNT = 0
				begin
					set @i_error_msg = '{"code":"error_campaign_register_action"}'
					return
				end

				insert campaign_register_actions 
				(
					company_id,
					country_code,
					request_ref_no,
					action_category,
					action_type,
					product_code,
					product_sub_code,
					sys_gen_request_ref_no,
					last_update_id
				)
				select @i_client_id, 
					@i_country_code,
					isnull(json_value(@i_inputparam_header_xml, '$.msgBody.custom.trans_ref_no'), ''),
					'LINK',
					'QUERYAGAINSTCAMPGN',
					'NA',
					'NA',
					@p_transaction_ref_no,
					@i_user_id

				if @@ROWCOUNT = 0
				begin
					set @i_error_msg = '{"code":"error_campaign_register_action"}'
					return
				end

				insert ancillary_request_register_actions 
				(
					company_id,
					country_code,
					request_ref_no,
					action_category,
					action_type,
					product_code,
					product_sub_code,
					sys_gen_request_ref_no,
					last_update_id
				)
				select @i_client_id, 
					@i_country_code,
					@p_transaction_ref_no,
					'LINK',
					'ENQAGAINSTQUERY',
					'NA',
					'NA',
					@p_enquiry_call_ref_no,
					@i_user_id

				if @@ROWCOUNT = 0
				begin
					set @i_error_msg = '{"code":"error_ancillary_action"}'
					return
				end

			end

			if @p_link_event = 'ENQAGAINSTQUERY'
			begin

				select @p_call_category = 'PE', @p_call_type = 'PARTENQ'
				select @p_logged_on_date = convert(varchar(10),SYSDATETIMEOFFSET(),120)
				select @p_logged_on_hour = substring(convert(varchar(10),SYSDATETIMEOFFSET(),108),1,2)
				select @p_logged_on_minute = substring(convert(varchar(10),SYSDATETIMEOFFSET(),108),4,2)
				set @p_call_inputparam = '<inputparam><call_register_source_code_category>'+'CQM'+'</call_register_source_code_category><call_register_source_code>'+@p_transaction_ref_no+'</call_register_source_code></inputparam>'

				select @p_asset_id = isnull(json_value(@i_inputparam_header_xml, '$.msgBody.custom.cqmEquipCatg'), '')

				select @p_problem_description = long_description
				from code_table_mlingual_translation 
				where company_id = @i_client_id
					and country_code = @i_country_code
					and code_type = 'CQMEQUIPCATG'
					and code = isnull(json_value(@i_inputparam_header_xml, '$.msgBody.custom.cqmEquipCatg'), '')

				select @p_problem_description = @p_problem_description + '\n' + isnull(json_value(@i_inputparam_header_xml, '$.msgBody.custom.problem_desc'), '')

				if @p_dealer_id is not null
				begin
					select @p_call_created_by_employee_id = employee_id
					from dealer_mapping_to_employee
					where company_id = @i_client_id
						and country_code = @i_country_code
						and mapping_purpose_code = 'CALLAUTOASSIGNMENT'
						and request_category = 'CALL'
						and request_type = 'CALL'
						and dealer_id = @p_dealer_id
						and dealer_location_code = 'ALL'
						and equipment_category = 'ALL'
						and equipment_type = 'ALL'
				end
				else
				begin
					select top(1) @p_call_created_by_employee_id = b.employee_id
					from users a, employee b
					where a.company_id = @i_client_id
						and a.country_code = @i_country_code
						and b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.employee_id = a.employee_id
						and a.user_group_id = 'SECORD'
				end
			
				execute sp_save_manage_call_register @i_client_id, @i_country_code, @i_session_id, @p_call_created_by_employee_id, @i_locale_id, 
						@p_customer_id, 'ZZZ', '', 'ZZZ', @p_problem_description, 'MED', @p_call_created_by_employee_id,
						@p_logged_on_date, @p_logged_on_hour, @p_logged_on_minute, @p_customer_location_code, @p_organogram_level_no,
						@p_organogram_level_code, @p_call_category,	@p_call_type,'', @p_company_location_code,
						@p_cust_contact_person_1, @p_cust_contact_person_1_mobile_no, @p_cust_contact_person_1_email_id, 'NB',
						0,0,0,0,'INR','','', '','', @p_call_inputparam,
						'A','00000000-0000-0000-0000-000000000000',
						@p_update_status OUTPUT, @p_enquiry_call_ref_no OUTPUT, @p_error_no OUTPUT

				if @p_error_no != ''
				begin
					set @i_error_msg = '{"code":"failed_creating_enquiry"}'
					return
				end	

				select @i_inputparam_header_xml = json_modify (
					@i_inputparam_header_xml, 
					'$.msgBody.custom.enquiry_call_ref_no', 
					@p_enquiry_call_ref_no
				)

				insert ancillary_request_register_actions 
				(
					company_id,
					country_code,
					request_ref_no,
					action_category,
					action_type,
					product_code,
					product_sub_code,
					sys_gen_request_ref_no,
					last_update_id
				)
				select @i_client_id, 
					@i_country_code,
					@p_transaction_ref_no,
					'LINK',
					'ENQAGAINSTQUERY',
					'NA',
					'NA',
					@p_enquiry_call_ref_no,
					@i_user_id

				if @@ROWCOUNT = 0
				begin
					set @i_error_msg = '{"code":"error_ancillary_action"}'
					return
				end

			end

			if @p_link_event = 'SERVAGAINSTQUERY'
			begin
				
				select @p_call_category = 'SE', @p_call_type = isnull(json_value(@i_inputparam_header_xml, '$.action.link_type'), '')
				select @p_logged_on_date = convert(varchar(10),SYSDATETIMEOFFSET(),120)
				select @p_logged_on_hour = substring(convert(varchar(10),SYSDATETIMEOFFSET(),108),1,2)
				select @p_logged_on_minute = substring(convert(varchar(10),SYSDATETIMEOFFSET(),108),4,2)
				select @p_problem_description = isnull(json_value(@i_inputparam_header_xml, '$.msgBody.custom.problem_desc'), '')
				select @p_asset_id = isnull(json_value(@i_inputparam_header_xml, '$.msgBody.custom.asset_id'), 'ZZZ')
				select @p_call_inputparam = '<inputparam><call_register_source_code_category>'+'CQM'+'</call_register_source_code_category><call_register_source_code>'+@p_transaction_ref_no+'</call_register_source_code></inputparam>'

				if @p_dealer_id is not null
				begin
					select @p_call_created_by_employee_id = employee_id
					from dealer_mapping_to_employee
					where company_id = @i_client_id
						and country_code = @i_country_code
						and mapping_purpose_code = 'CALLAUTOASSIGNMENT'
						and request_category = 'CALL'
						and request_type = 'CALL'
						and dealer_id = @p_dealer_id
						and dealer_location_code = 'ALL'
						and equipment_category = 'ALL'
						and equipment_type = 'ALL'
				end
				else
				begin
					select top(1) @p_call_created_by_employee_id = a.user_id
					from users a, employee b
					where a.company_id = @i_client_id
						and a.country_code = @i_country_code
						and b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.employee_id = a.employee_id
						and a.user_group_id = 'SECORD'
				end
			
				select @p_equipment_id = equipment_id from asset_master 
				where company_id = @i_client_id
					and country_code = @i_country_code
					and asset_id = @p_asset_id

				execute sp_save_manage_call_register @i_client_id, @i_country_code, @i_session_id, @p_call_created_by_employee_id, @i_locale_id, 
						@p_customer_id, @p_asset_id, '', @p_equipment_id, @p_problem_description, 'MED', @p_call_created_by_employee_id,
						@p_logged_on_date, @p_logged_on_hour, @p_logged_on_minute, @p_customer_location_code, @p_organogram_level_no,
						@p_organogram_level_code, @p_call_category,	@p_call_type,'', @p_company_location_code,
						@p_cust_contact_person_1, @p_cust_contact_person_1_mobile_no, @p_cust_contact_person_1_email_id, 'NB',
						0,0,0,0,'INR','','', '','', @p_call_inputparam,
						'A','00000000-0000-0000-0000-000000000000',
						@p_update_status OUTPUT, @p_service_call_ref_no OUTPUT, @p_error_no OUTPUT

				if @p_error_no != ''
				begin
					set @i_error_msg = @p_call_created_by_employee_id+'{"code":"failed_creating_service"}'
					return
				end	

				select @i_inputparam_header_xml = json_modify (
					@i_inputparam_header_xml, 
					'$.msgBody.custom.service_call_ref_no', 
					@p_service_call_ref_no
				)

				insert ancillary_request_register_actions 
				(
					company_id,
					country_code,
					request_ref_no,
					action_category,
					action_type,
					product_code,
					product_sub_code,
					sys_gen_request_ref_no,
					last_update_id
				)
				select @i_client_id, 
					@i_country_code,
					@p_transaction_ref_no,
					'LINK',
					'SERVAGAINSTQUERY',
					'NA',
					'NA',
					@p_service_call_ref_no,
					@i_user_id

				if @@ROWCOUNT = 0
				begin
					set @i_error_msg = '{"code":"error_ancillary_action"}'
					return
				end

			end

			select @i_inputparam_header_xml = json_modify (
				@i_inputparam_header_xml, 
				'$.msgBody.custom.trans_type', 
				'ANCILLARY'
			)

			select @i_inputparam_header_xml = json_modify (
				@i_inputparam_header_xml, 
				'$.msgBody.custom.inclusive_event', 
				@p_inclusive_event
			)

		end
		else if (@p_eventverb = 'GENERATEPE')
		begin

			select @p_transaction_ref_no = json_value(@i_inputparam_header_xml, '$.msgBody.custom.transaction_ref_no')
			select @p_call_category = 'PE', @p_call_type = 'PARTENQ'
			select @p_logged_on_date = convert(varchar(10),SYSDATETIMEOFFSET(),120)
			select @p_logged_on_hour = substring(convert(varchar(10),SYSDATETIMEOFFSET(),108),1,2)
			select @p_logged_on_minute = substring(convert(varchar(10),SYSDATETIMEOFFSET(),108),4,2)
			select @p_problem_description = isnull(json_value(@i_inputparam_header_xml, '$.msgBody.custom.problem_desc'), '')
			set @p_call_inputparam = '<inputparam><call_register_source_code_category>'+'CQM'+'</call_register_source_code_category><call_register_source_code>'+@p_transaction_ref_no+'</call_register_source_code></inputparam>'

			if @p_dealer_id is not null
			begin
				select @p_call_created_by_employee_id = employee_id
				from dealer_mapping_to_employee
				where company_id = @i_client_id
					and country_code = @i_country_code
					and mapping_purpose_code = 'CALLAUTOASSIGNMENT'
					and request_category = 'CALL'
					and request_type = 'CALL'
					and dealer_id = @p_dealer_id
					and dealer_location_code = 'ALL'
					and equipment_category = 'ALL'
					and equipment_type = 'ALL'
			end
			else
			begin
				select top(1) @p_call_created_by_employee_id = b.employee_id
				from users a, employee b
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and b.company_id = a.company_id
					and b.country_code = a.country_code
					and b.employee_id = a.employee_id
					and a.user_group_id = 'SECORD'
			end

			select @p_customer_id = customer_id,
				@p_customer_location_code = customer_location_code,
				@p_cust_contact_person_1 = customer_contact_name,
				@p_cust_contact_person_1_mobile_no = customer_contact_no,
				@p_cust_contact_person_1_email_id = customer_contact_email_id
			from ancillary_request_register
			where company_id = @i_client_id
				and country_code = @i_country_code
				and request_ref_no = @p_transaction_ref_no
			
			execute sp_save_manage_call_register @i_client_id, @i_country_code, @i_session_id, @p_call_created_by_employee_id, @i_locale_id, 
					@p_customer_id, 'ZZZ', '', 'ZZZ', @p_problem_description, 'MED', @p_call_created_by_employee_id,
					@p_logged_on_date, @p_logged_on_hour, @p_logged_on_minute, @p_customer_location_code, @p_organogram_level_no,
					@p_organogram_level_code, @p_call_category,	@p_call_type,'', @p_company_location_code,
					@p_cust_contact_person_1, @p_cust_contact_person_1_mobile_no, @p_cust_contact_person_1_email_id, 'NB',
					0,0,0,0,'INR','','', '','', @p_call_inputparam,
					'A','00000000-0000-0000-0000-000000000000',
					@p_update_status OUTPUT, @p_enquiry_call_ref_no OUTPUT, @p_error_no OUTPUT

			if @p_error_no != ''
			begin
				set @i_error_msg = '{"code":"failed_creating_enquiry"}'
				return
			end	

			select @i_inputparam_header_xml = json_modify (
				@i_inputparam_header_xml, 
				'$.msgBody.custom.enquiry_call_ref_no', 
				@p_enquiry_call_ref_no
			)

			update ancillary_request_register
			set request_wf_stage_no = 3, request_status = 'I'
			where company_id = @i_client_id
				and country_code = @i_country_code
				and request_ref_no = @p_transaction_ref_no

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"failed_creating_ancillary_request"}'
				return
			end

			insert ancillary_request_status_event_log
			(
				company_id, country_code, request_ref_no, channel_id, eventverb_id, from_wf_stage_no,
				to_wf_stage_no, event_date, to_status, from_status, by_employee_id, to_employee_id_string,
				last_update_id
			)
			select @i_client_id, @i_country_code, @p_transaction_ref_no, 'WEB', 'COMPLETE', 2,
					3, SYSDATETIMEOFFSET(), 'A', 'I', @p_employee_id, '',
					@i_user_id

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"failed_creating_ancillary_event_log"}'
				return
			end

			select @i_inputparam_header_xml = json_modify (
				@i_inputparam_header_xml, 
				'$.msgBody.custom.transaction_ref_no', 
				@p_transaction_ref_no
			)

			select @p_assigned_to_employee_id = resource_emp_id 
			from ancillary_request_assignment
			where company_id = @i_client_id
				and country_code = @i_country_code
				and request_ref_no = @p_transaction_ref_no
				and primary_resource_ind = 1

			if (@p_assigned_to_employee_id is not null)
			begin

				select @p_assigned_to_employee_name = title + first_name + ' ' + last_name
				from employee
				where company_id = @i_client_id
					and country_code = @i_country_code
					and employee_id = @p_assigned_to_employee_id

				select @i_inputparam_header_xml = json_modify (
					@i_inputparam_header_xml, 
					'$.msgBody.custom.asgn_emp_id', 
					@p_assigned_to_employee_id
				)

				select @i_inputparam_header_xml = json_modify (
					@i_inputparam_header_xml, 
					'$.msgBody.custom.asgn_emp_name', 
					@p_assigned_to_employee_name
				)

			end 

		end
		else if (@p_eventverb = 'COMPLETE')
		begin

			select @p_transaction_ref_no = json_value(@i_inputparam_header_xml, '$.msgBody.custom.transaction_ref_no')

			update ancillary_request_register
			set request_wf_stage_no = 3, request_status = 'CO'
			where company_id = @i_client_id
				and country_code = @i_country_code
				and request_ref_no = @p_transaction_ref_no

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"failed_updating_ancillary_request"}'
				return
			end

			if exists (select 1 from call_register
						where company_id = @i_client_id
							and country_code = @i_country_code
							and call_ref_no = json_value(@i_inputparam_header_xml, '$.msgBody.custom.service_call_ref_no'))
			begin

				update call_register
				set additional_information = json_value(@i_inputparam_header_xml, '$.msgBody.custom.COMPLETE_comments')
				where company_id = @i_client_id
					and country_code = @i_country_code
					and call_ref_no = json_value(@i_inputparam_header_xml, '$.msgBody.custom.service_call_ref_no')
				
				if @@ROWCOUNT = 0
				begin
					set @i_error_msg = '{"code":"failed_updating_call_register"}'
					return
				end

			end

			insert ancillary_request_status_event_log
			(
				company_id, country_code, request_ref_no, channel_id, eventverb_id, from_wf_stage_no,
				to_wf_stage_no, event_date, from_status,to_status, by_employee_id, to_employee_id_string,
				last_update_id
			)
			select @i_client_id, @i_country_code, @p_transaction_ref_no, 'WEB', 'COMPLETE', 2,
					3, SYSDATETIMEOFFSET(), 'A', 'CO', @p_employee_id, '',
					@i_user_id

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"failed_creating_ancillary_event_log"}'
				return
			end

			select @i_inputparam_header_xml = json_modify (
				@i_inputparam_header_xml, 
				'$.msgBody.custom.transaction_ref_no', 
				@p_transaction_ref_no
			)

			select @p_assigned_to_employee_id = resource_emp_id 
			from ancillary_request_assignment
			where company_id = @i_client_id
				and country_code = @i_country_code
				and request_ref_no = @p_transaction_ref_no
				and primary_resource_ind = 1

			if (@p_assigned_to_employee_id is not null)
			begin

				select @p_assigned_to_employee_name = title + first_name + ' ' + last_name
				from employee
				where company_id = @i_client_id
					and country_code = @i_country_code
					and employee_id = @p_assigned_to_employee_id

				select @i_inputparam_header_xml = json_modify (
					@i_inputparam_header_xml, 
					'$.msgBody.custom.asgn_emp_id', 
					@p_assigned_to_employee_id
				)

				select @i_inputparam_header_xml = json_modify (
					@i_inputparam_header_xml, 
					'$.msgBody.custom.asgn_emp_name', 
					@p_assigned_to_employee_name
				)

			end 

		end
		else if (@p_eventverb = 'CLOSE')
		begin

			select @p_transaction_ref_no = json_value(@i_inputparam_header_xml, '$.msgBody.custom.transaction_ref_no')

			execute sp_generate_customer_survey 
				@i_session_id, 
				@i_user_id, 
				@i_client_id, 
				@i_locale_id, 
				@i_country_code,
				@p_transaction_ref_no,
				@p_survey_ref_no OUTPUT, 
				@r_update_status OUTPUT,
				@r_errorNo OUTPUT

			if (@r_errorNo != '')
			begin
				set @i_error_msg = '{"code":"error_generate_customer_feed_back"}'
				return
			end

			select @p_inputparam_header_xml = '{' +
				'"overall_feedback":"' + isnull(json_value(@i_inputparam_header_xml, '$.msgBody.custom.overall_feedback'), '') + '"' +
			'}'


			execute sp_save_manage_custom_info_customer_survey
				@i_session_id, 
				@i_user_id, 
				@i_client_id, 
				@i_locale_id, 
				@i_country_code, 
				@i_custom_info_code, 
				@p_survey_ref_no, 
				@i_custom_info_ref_no2, 
				@p_inputparam_header_xml,
				@i_rec_timestamp,
				@i_save_mode,
				@o_outputparam_detail_xml OUTPUT,  
				@o_update_status OUTPUT, 
				@custom_info_detail,
				@i_error_msg OUTPUT

			if @o_update_status != 'SP001'
			begin
				set @i_error_msg = '{"code":"error_workflow_update"}'
				return
			end

			update ancillary_request_register
			set request_wf_stage_no = 3, request_status = 'CL',closed_on_date = SYSDATETIMEOFFSET()
			where company_id = @i_client_id
				and country_code = @i_country_code
				and request_ref_no = @p_transaction_ref_no

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"failed_creating_ancillary_request"}'
				return
			end

			insert ancillary_request_status_event_log
			(
				company_id, country_code, request_ref_no, channel_id, eventverb_id, from_wf_stage_no,
				to_wf_stage_no, event_date, to_status, from_status, by_employee_id, to_employee_id_string,
				last_update_id
			)
			select @i_client_id, @i_country_code, @p_transaction_ref_no, 'WEB', 'CLOSE', 3,
					3, SYSDATETIMEOFFSET(), 'CO', 'CL', @p_employee_id, '',
					@i_user_id

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"failed_creating_ancillary_event_log"}'
				return
			end

			select @i_inputparam_header_xml = json_modify (
				@i_inputparam_header_xml, 
				'$.msgBody.custom.transaction_ref_no', 
				@p_transaction_ref_no
			)

			select @p_assigned_to_employee_id = resource_emp_id 
			from ancillary_request_assignment
			where company_id = @i_client_id
				and country_code = @i_country_code
				and request_ref_no = @p_transaction_ref_no
				and primary_resource_ind = 1

			if (@p_assigned_to_employee_id is not null)
			begin

				select @p_assigned_to_employee_name = title + first_name + ' ' + last_name
				from employee
				where company_id = @i_client_id
					and country_code = @i_country_code
					and employee_id = @p_assigned_to_employee_id

				select @i_inputparam_header_xml = json_modify (
					@i_inputparam_header_xml, 
					'$.msgBody.custom.asgn_emp_id', 
					@p_assigned_to_employee_id
				)

				select @i_inputparam_header_xml = json_modify (
					@i_inputparam_header_xml, 
					'$.msgBody.custom.asgn_emp_name', 
					@p_assigned_to_employee_name
				)

			end 

		end

	end

	select @o_outputparam_detail_xml = @i_inputparam_header_xml

	set @o_update_status = 'SP001'

END





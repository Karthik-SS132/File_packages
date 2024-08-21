
DROP PROCEDURE IF EXISTS[dbo].[sp_save_manage_custom_info_call_status_change_se]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_call_status_change_se] 
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
		@p_screen_id varchar(30), 
		@p_screen_name varchar(30), 
		@p_allow_new_txn bit,		
		@p_modify_last_access bit,
		@p_channel_id varchar(20),
		@p_eventverb_id varchar(60),
		@p_from_wf_stage_no tinyint, 
		@p_from_wf_status varchar(2),
		@p_to_wf_stage_no tinyint, 
		@p_to_wf_status varchar(2),
		@p_comments nvarchar(1000),
		@p_reason_code nvarchar(50),
		@p_to_employee_id_string nvarchar(255),
		@p_event_date varchar(10),
		@p_event_hour varchar(2),
		@p_event_minute varchar(2),
		@p_event_second varchar(2),
		@p_event_latitude varchar(10),
		@p_event_longitude varchar(10),
		@p_event_date_time_offset datetimeoffset(7),
		@p_by_employee_id nvarchar(12),
		@p_mapped_to_employee_id nvarchar(12),
		@p_feature_id varchar(15),
		@p_request_category varchar(10),
		@p_request_type nvarchar(10),
		@p_organogram_level_no tinyint,
		@p_organogram_level_code nvarchar(15),
		@p_company_location_code nvarchar(8),
		@p_current_wf_stage_no tinyint,
		@p_current_wf_status varchar(2),
		@p_event_id int,
		@p_asset_id nvarchar(30),
		@p_act_finish_date datetimeoffset(7),
		@p_contract_doc_no nvarchar(40),
		@p_call_category varchar(10),
		@p_contract_type nvarchar(20),
		@p_update_status varchar(10),
		@p_service_visit_slno tinyint,
		@p_errorNo varchar(10),
		@p_survey_ref_no nvarchar(30), 
		@r_update_status varchar(5), 
		@r_errorNo varchar(10)

	
	/* ASSIGN THE VALUES TO THE DECLARED VARIABLES */
	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset
	(
		@i_client_id, 
		@i_country_code, 
		@i_user_id
	)
	
	select @p_transaction_type = json_value(@i_inputparam_header_xml, '$.transaction_type')
	select @p_transaction_ref_no = json_value(@i_inputparam_header_xml, '$.transaction_ref_no')
	select @p_screen_id = json_value(@i_inputparam_header_xml, '$.screen_id')
	select @p_screen_name = json_value(@i_inputparam_header_xml, '$.screen_name')
	select @p_allow_new_txn = convert(bit, isnull(json_value(@i_inputparam_header_xml, '$.allow_new_txn'), ''))
	select @p_modify_last_access = convert(bit, isnull(json_value(@i_inputparam_header_xml, '$.modify_last_access'), ''))
	select @p_channel_id = json_value(@i_inputparam_header_xml, '$.channel_id')
	select @p_eventverb_id = json_value(@i_inputparam_header_xml, '$.eventverb_id')
	select @p_from_wf_stage_no = convert(tinyint, json_value(@i_inputparam_header_xml, '$.from_wf_stage_no'))
	select @p_from_wf_status = json_value(@i_inputparam_header_xml, '$.from_wf_status')
	select @p_to_wf_stage_no = convert(tinyint, json_value(@i_inputparam_header_xml, '$.to_wf_stage_no'))
	select @p_to_wf_status = json_value(@i_inputparam_header_xml, '$.to_wf_status')
	select @p_comments = json_value(@i_inputparam_header_xml, '$.comments')
	select @p_reason_code = json_value(@i_inputparam_header_xml, '$.reason_code')
	select @p_to_employee_id_string = json_value(@i_inputparam_header_xml, '$.to_employee_id')
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
		and user_id = @i_user_id

	select @p_event_date_time_offset = todatetimeoffset
	(
		convert
		(
			datetimeoffset, 
			@p_event_date + ' ' + @p_event_hour + ':' + @p_event_minute + ':' + @p_event_second + '.000', 
			121
		),
		'+05:30'
	)

	/* ATTACHMENT LIST TO BE PROCESSED */

		-- section goes here


	/* GET THE APPLICABLE CUSTOM FIELDS TO BE UPDATED */
	create table #applicable_custom_fields
	(
		field_type varchar(50) not null,
		applicable bit not null
	)
	
	insert #applicable_custom_fields
	(
		field_type, 
		applicable
	)
	select field_type, 
		applicable
	from product_customization_data_field_reference
	where company_id = @i_client_id
		and country_code = @i_country_code
		and information_type = 'CALL_REGISTER'


	/* GET THE CURRENT DETAILS OF THE CALL */
	select @p_request_category = call_category,
		@p_request_type = call_type,
		@p_current_wf_stage_no = call_wf_stage_no,
		@p_current_wf_status = call_status,
		@p_organogram_level_no = organogram_level_no,
		@p_organogram_level_code = organogram_level_code,
		@p_company_location_code = company_location_code		
	from call_register
	where company_id = @i_client_id
		and country_code = @i_country_code
		and call_ref_no = @p_transaction_ref_no


	/* GET THE VALID WORKFLOW DATA FOR THE CURRENT DETAILS OF THE CALL */
	if (@p_eventverb_id != 'STATUSCHANGE')
	begin
    
		select  @p_from_wf_stage_no = from_workflow_stage,
			@p_from_wf_status = from_status,
			@p_to_wf_stage_no = to_workflow_stage,
			@p_to_wf_status = to_status 
		from workflow_eventverb_list
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code  = 'CALL'
			and request_category in ('ALL', @p_request_category)
			and request_type in ('ALL', @p_request_type)
			and eventverb_id = @p_eventverb_id
			and from_workflow_stage = @p_current_wf_stage_no
			and from_status = @p_current_wf_status

	end		  
	else
	begin

		select  @p_from_wf_stage_no = from_workflow_stage,
			@p_from_wf_status = from_status,
			@p_to_wf_stage_no = to_workflow_stage,
			@p_to_wf_status = to_status 
		from workflow_status_link
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code  = 'CALL'
			and request_category = @p_request_category
			and request_type in ('ALL', @p_request_type)
			and from_workflow_stage = @p_from_wf_stage_no 
			and from_status = @p_from_wf_status
			and to_workflow_stage = @p_to_wf_stage_no
			and to_status = @p_to_wf_status

	end


	/* CHECK THE VALIDITY OF THE CALL */
	if not exists 
	( 
		select 1 from call_register
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @p_transaction_ref_no
			and call_wf_stage_no = @p_from_wf_stage_no
			and call_status = @p_from_wf_status
	)
	begin
		set @i_error_msg = '{"code":"error_invalid_call_ref_no"}'
		return
	end  
 

	/* CHECK THE VALIDITY OF THE EVENTVERB */
	if (@p_eventverb_id != 'STATUSCHANGE') and not exists 
	(
		select 1 from workflow_eventverb_list
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code  = 'CALL'
			and request_category in ('ALL', @p_request_category)
			and request_type in ('ALL', @p_request_type)
			and from_workflow_stage = @p_from_wf_stage_no 
			and from_status = @p_from_wf_status
			and to_workflow_stage = @p_to_wf_stage_no
			and to_status = @p_to_wf_status
			and eventverb_id = @p_eventverb_id
	)
	begin
		set @i_error_msg = '{"code":"error_invalid_workflow_action"}'
		return
	end

	if (@p_eventverb_id = 'STATUSCHANGE') and not exists 
	(
		select 1 from workflow_status_link
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code  = 'CALL'
			and request_category = @p_request_category
			and request_type in ('ALL', @p_request_type)
			and from_workflow_stage = @p_from_wf_stage_no 
			and from_status = @p_from_wf_status
			and to_workflow_stage = @p_to_wf_stage_no
			and to_status = @p_to_wf_status
	)
	begin
		set @i_error_msg = '{"code":"error_invalid_workflow_action"}'
		return
	end

	
	/* UPDATE CALL REGISTER CUSTOM FIELDS */
	update call_register
	set udf_char_1 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_char_1')
			when 1 then
			(
				isnull(json_value(@i_inputparam_header_xml, '$.call_register_udf_char_1'), udf_char_1)
			)
			else null
		end,
		udf_char_2 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_char_2')
			when 1 then
			(
				isnull(json_value(@i_inputparam_header_xml, '$.call_register_udf_char_2'), udf_char_2)
			)
			else null
		end,
		udf_char_3 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_char_3')
			when 1 then
			(
				isnull(json_value(@i_inputparam_header_xml, '$.call_register_udf_char_3'), udf_char_3)
			)
			else null
		end,
		udf_char_4 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_char_4')
			when 1 then
			(
				isnull(json_value(@i_inputparam_header_xml, '$.call_register_udf_char_4'), udf_char_4)
			)
			else null
		end,
		udf_float_1 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_float_1')
			when 1 then
			(
				isnull(cast(json_value(@i_inputparam_header_xml, '$.call_register_udf_float_1') as float), udf_float_1)
			)
			else null
		end,
		udf_float_2 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_float_2')
			when 1 then
			(
				isnull(cast(json_value(@i_inputparam_header_xml, '$.call_register_udf_float_2') as float), udf_float_2)
			)
			else null
		end,
		udf_float_3 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_float_3')
			when 1 then
			(
				isnull(cast(json_value(@i_inputparam_header_xml, '$.call_register_udf_float_3') as float), udf_float_3)
			)
			else null
		end,
		udf_float_4 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_float_4')
			when 1 then
			(
				isnull(cast(json_value(@i_inputparam_header_xml, '$.call_register_udf_float_4') as float), udf_float_4)
			)
			else null
		end,
		udf_bit_1 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_bit_1')
			when 1 then
			(
				isnull(cast(json_value(@i_inputparam_header_xml, '$.call_register_udf_bit_1') as bit), udf_bit_1)
			)
			else null
		end,
		udf_bit_2 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_bit_2')
			when 1 then
			(
				isnull(cast(json_value(@i_inputparam_header_xml, '$.call_register_udf_bit_2') as bit), udf_bit_2)
			)
			else null
		end,
		udf_bit_3 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_bit_3')
			when 1 then
			(
				isnull(cast(json_value(@i_inputparam_header_xml, '$.call_register_udf_bit_3') as bit), udf_bit_3)
			)
			else null
		end,
		udf_bit_4 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_bit_4')
			when 1 then
			(
				isnull(cast(json_value(@i_inputparam_header_xml, '$.call_register_udf_bit_4') as bit), udf_bit_4)
			)
			else null
		end,
		udf_date_1 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_date_1')
			when 1 then
			(
				isnull
				(
					(
						select todatetimeoffset
						(
							convert
							(
								datetimeoffset,
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_1')) + ' ' + 
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_1_hour')) + ':' + 
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_1_minute'))	+ ':00',
								120
							), 
							'+05:30'
						)
					), udf_date_1
				)
			)
			else null
		end,
		udf_date_2 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_date_2')
			when 1 then
			(
				isnull
				(
					(
						select todatetimeoffset
						(
							convert
							(
								datetimeoffset,
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_2')) + ' ' + 
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_2_hour')) + ':' + 
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_2_minute'))	+ ':00',
								120
							), 
							'+05:30'
						)
					), udf_date_2
				)
			)
			else null
		end,
		udf_date_3 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_date_3')
			when 1 then
			(
				isnull
				(
					(
						select todatetimeoffset
						(
							convert
							(
								datetimeoffset,
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_3')) + ' ' + 
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_3_hour')) + ':' + 
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_3_minute'))	+ ':00',
								120
							), 
							'+05:30'
						)
					), udf_date_3
				)
			)
			else null
		end,
		udf_date_4 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_date_4')
			when 1 then
			(
				isnull
				(
					(
						select todatetimeoffset
						(
							convert
							(
								datetimeoffset,
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_4')) + ' ' + 
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_4_hour')) + ':' + 
								(json_value(@i_inputparam_header_xml, '$.call_register_udf_date_4_minute'))	+ ':00',
								120
							), 
							'+05:30'
						)
					), udf_date_4
				)
			)
			else null
		end,
		udf_analysis_code1 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_analysis_code1')
			when 1 then
			(
				isnull(json_value(@i_inputparam_header_xml, '$.call_register_udf_analysis_code1'), udf_analysis_code1)
			)
			else null
		end,
		udf_analysis_code2 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_analysis_code2')
			when 1 then
			(
				isnull(json_value(@i_inputparam_header_xml, '$.call_register_udf_analysis_code2'), udf_analysis_code2)
			)
			else null
		end,
		udf_analysis_code3 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_analysis_code3')
			when 1 then
			(
				isnull(json_value(@i_inputparam_header_xml, '$.call_register_udf_analysis_code3'), udf_analysis_code3)
			)
			else null
		end,
		udf_analysis_code4 = 
		case (select applicable from #applicable_custom_fields where field_type = 'udf_analysis_code4')
			when 1 then
			(
				isnull(json_value(@i_inputparam_header_xml, '$.call_register_udf_analysis_code4'), udf_analysis_code4)
			)
			else null
		end,
		last_update_id = @i_user_id
	where company_id = @i_client_id
		and country_code = @i_country_code
		and call_ref_no = @p_transaction_ref_no

	if @@ROWCOUNT = 0
	begin
		set @i_error_msg = '{"code":"error_update_call_register_udf_fields"}'
		return
	end 


	/* INSERT CALL STATUS EVENT LOG DATA */
	insert call_status_event_log
	(
		company_id, 
		country_code, 
		call_ref_no,
		channel_id,
		eventverb_id,
		from_wf_stage_no,
		to_wf_stage_no,
		event_date, 
		to_status, 
		from_status,
		by_employee_id, 
		to_employee_id_string,
		comments, 
		reason_code,
		lattitude_value,
		longitude_value,
		last_update_id
	)
	select @i_client_id, 
		@i_country_code, 
		@p_transaction_ref_no,
		@p_channel_id,
		@p_eventverb_id,
		@p_from_wf_stage_no,
		@p_to_wf_stage_no,
		@p_event_date_time_offset, 
		@p_to_wf_status, 
		@p_from_wf_status,
		@p_by_employee_id,
		@p_to_employee_id_string, 
		@p_comments,
		@p_reason_code,
		@p_event_latitude,
		@p_event_longitude,
		@i_user_id

	if @@ROWCOUNT = 0
	begin
		set @i_error_msg = '{"code":"error_insert_call_status_event_log_fields"}'
		return
	end

	set @p_event_id = @@IDENTITY


	/* CUSTOM LOGIC SPECIFIC TO THE EVENTVERB */
	if (@p_eventverb_id = 'START')
	begin
		  
		if @p_by_employee_id in 
		( 
			select resource_emp_id 
			from call_assignment
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_transaction_ref_no
				and primary_resource_ind = 1
		)
		begin

			/* UPDATE RESOURCE UTILIZATION LOG FOR CURRENT ASSIGNEE */
			insert call_resource_utilisation_log
			(
				company_id, 
				country_code, 
				call_ref_no, 
				resource_emp_id, 
				from_date, 
				last_update_id
			)
			select @i_client_id, 
				@i_country_code, 
				@p_transaction_ref_no, 
				resource_emp_id,
				@p_event_date_time_offset,
				@i_user_id
			from call_assignment
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_transaction_ref_no
				and primary_resource_ind = 1
				  
			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"error_insert_resource_utilization_log"}'
				return
			end		

		end
		else
		begin  
			
			/* UPDATE RESOURCE UTILIZATION LOG FOR ALL ASSIGNEES */
			insert call_resource_utilisation_log
			(
				company_id, 
				country_code, 
				call_ref_no, 
				resource_emp_id, 
				from_date, 
				last_update_id
			)
			select @i_client_id, 
				@i_country_code, 
				@p_transaction_ref_no, 
				@p_by_employee_id,
				@p_event_date_time_offset,
				@i_user_id
				
			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"error_insert_resource_utilization_log"}'
				return
			end			
			
		end

		/* UPDATE CALL REGISTER FOR EARLY START */ 
		if 
		( 
			select act_start_date 
			from call_register
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_transaction_ref_no
		) is null
		begin

			update call_register	
			set	call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				act_start_date = @p_event_date_time_offset,
				last_update_id = @i_user_id
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_transaction_ref_no

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"error_update_call_register_for_start"}'
				return
			end

		end	
		
	end
	else if (@p_eventverb_id = 'WORKCOMPLETE')
	begin
			  
		if @p_by_employee_id in 
		( 
			select resource_emp_id 
			from call_assignment
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_transaction_ref_no
				and primary_resource_ind = 1
		)
		begin

			update call_resource_utilisation_log
			set to_date =  @p_event_date_time_offset,
				last_update_id = @i_user_id
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_transaction_ref_no
				and resource_emp_id = @p_by_employee_id
				and to_date is null
				  			  
			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"error_update_call_register_for_workcomplete"}'
				return
			end

		end  
		else
		begin
		
			update call_resource_utilisation_log
			set to_date = @p_event_date_time_offset,
				last_update_id = @i_user_id
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_transaction_ref_no
				and to_date is null

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"error_update_call_register_for_workcomplete"}'
				return
			end

		end

	end
	else if @p_eventverb_id = 'HOLD'
		begin
		
			update call_register	
			set	call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @p_transaction_ref_no

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"error_update_call_register_for_hold"}'
				return
			end

	end
	else if @p_eventverb_id = 'RELEASEHOLD'
		begin
		
			update call_register	
			set	call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @p_transaction_ref_no

			if @@ROWCOUNT = 0
			begin
				set @i_error_msg = '{"code":"error_update_call_register_for_releasehold"}'
				return
			end
		
	end	
	else if @p_eventverb_id = 'REJECTCALL'
	begin
	
		if @p_by_employee_id in 
		( 
			select resource_emp_id from call_assignment
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_transaction_ref_no
				and primary_resource_ind = 1
		)
		begin

			select @p_mapped_to_employee_id = mapped_to_employee_id 
			from functional_role_employee
			where company_id = @i_client_id
				and country_code = @i_country_code
				and employee_id = @p_by_employee_id

			if (@p_mapped_to_employee_id is not null and @p_mapped_to_employee_id != '')
			begin

				update call_status_event_log
				set to_employee_id_string = @p_mapped_to_employee_id
				where company_id = @i_client_id
					and country_code = @i_country_code
					and call_ref_no = @p_transaction_ref_no
					and event_id = @p_event_id

				if @@ROWCOUNT = 0
				begin
					set @i_error_msg = '{"code":"error_update_call_status_event_log_for_rejectcall"}'
					return
				end

				update call_assignment
				set primary_resource_ind = 0
				where company_id = @i_client_id
					and country_code = @i_country_code
					and call_ref_no = @p_transaction_ref_no
					and resource_emp_id = @p_by_employee_id
					and primary_resource_ind = 1

				if @@ROWCOUNT = 0
				begin
					set @i_error_msg = '{"code":"error_update_call_assignment_for_rejectcall"}'
					return
				end

				insert call_assignment
				(
					company_id, 
					country_code, 
					call_ref_no,
					resource_emp_id, 
					primary_resource_ind, 
					assigned_on_date, 
					last_update_id
				)
				select @i_client_id, 
					@i_country_code, 
					@p_transaction_ref_no,
					@p_mapped_to_employee_id, 
					1, 
					@p_event_date, 
					@i_user_id

				if @@ROWCOUNT = 0
				begin
					set @i_error_msg = '{"code":"error_insert_call_assignment_for_rejectcall"}'
					return
				end

				update call_register	
				set	call_wf_stage_no = @p_to_wf_stage_no,
					call_status = @p_to_wf_status,
					last_update_id = @i_user_id
				where company_id = @i_client_id
					and country_code = @i_country_code
					and call_ref_no = @p_transaction_ref_no
			  			  
				if @@ROWCOUNT = 0
				begin
					set @i_error_msg = '{"code":"error_update_call_register_for_rejectcall"}'
					return
				end
				
			end
			else
			begin
				set @i_error_msg = '{"code":"error_getting_mapped_to_employee_for_rejectcall"}'
				return
			end
			
		end
		else
		begin
			set @i_error_msg = '{"code":"error_invalid_assignee_for_rejectcall"}'
			return
		end
		  
	end
	else if (@p_eventverb_id = 'COMPLETE')
	begin

		update call_register	
		set call_wf_stage_no = @p_to_wf_stage_no,
			call_status = @p_to_wf_status,
			act_finish_date = 
			( 
				select max(to_date) 
				from call_resource_utilisation_log
				where company_id = @i_client_id
					and country_code = @i_country_code
					and call_ref_no = @p_transaction_ref_no
			),
			actual_work = round
			(
				(
					( 
						select sum(datediff(minute, from_date, to_date))
						from call_resource_utilisation_log
						where company_id = @i_client_id
							and country_code = @i_country_code
							and call_ref_no = @p_transaction_ref_no
					) * 1.00
				) / 60, 1
			),
			last_update_id = @i_user_id
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @p_transaction_ref_no

		if @@ROWCOUNT = 0
		begin
			set @i_error_msg = '{"code":"error_update_call_register_for_complete"}'
			return
		end
		  	

		update call_register	
		set actual_duration = round((datediff(minute, act_start_date, act_finish_date) * 1.00) / 60, 1),
			last_update_id = @i_user_id
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @p_transaction_ref_no

		if @@ROWCOUNT = 0
		begin
			set @i_error_msg = '{"code":"error_update_call_register_for_complete"}'
			return
		end

		select @p_asset_id = asset_id,
			@p_act_finish_date = act_finish_date,
			@p_contract_doc_no = service_contract_doc_no,
			@p_call_category = call_category
		from call_register
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @p_transaction_ref_no
				
		if @p_call_category = 'SE'
		begin

			select @p_contract_type = ''
				
			if @p_contract_doc_no != ''
			begin
				
				select @p_contract_type = contract_type
				from asset_service_contract
				where company_id = @i_client_id
					and country_code = @i_country_code
					and asset_id = @p_asset_id
					and contract_doc_no = @p_contract_doc_no
					  
			end 
						  

			/* UPDATE INSTALLATION DATE FOR COMMISSIONING CALL WITH ASSET ID */
			if exists 
			( 
				select 1 from call_register
				where company_id = @i_client_id
					and country_code = @i_country_code
					and call_ref_no = @p_transaction_ref_no
					and call_type = 'COMM'
			) 			  
			begin

				if (@p_asset_id != 'ZZZ')
				begin 	
				
					if exists 
					( 
						select 1 from asset_master
						where company_id = @i_client_id
							and country_code = @i_country_code
							and asset_id = @p_asset_id
							and installation_date is null
					)
					begin

						if @p_contract_doc_no = 'INITIALWARRANTY'
						begin
						
							update asset_master
							set installation_date = @p_act_finish_date,
								last_update_id = @i_user_id
							where company_id = @i_client_id
								and country_code = @i_country_code
								and asset_id = @p_asset_id
					
							if @@ROWCOUNT = 0
							begin
								set @i_error_msg = '{"code":"error_update_asset_master_installation_date_for_complete"}'
								return				
							end
					
							update asset_service_contract
							set effective_from_date = @p_act_finish_date,
								effective_to_date = dateadd(dd, -1, dateadd(mm, contract_duration, @p_act_finish_date)),
								last_update_id = @i_user_id
							where company_id = @i_client_id
								and country_code = @i_country_code
								and asset_id = @p_asset_id
								and contract_doc_no = 'INITIALWARRANTY'
					
							if @@ROWCOUNT = 0
							begin
								set @i_error_msg = '{"code":"error_update_asset_service_contract_for_complete"}'
								return				
							end
							
							update asset_service_schedule
							set	service_visit_status = 'CO',	
								service_due_date = @p_act_finish_date,
								act_service_date = @p_act_finish_date,
								call_jo_ind = 'C',
								call_ref_jo_no = @p_transaction_ref_no,
								last_update_id = @i_user_id
							where company_id = @i_client_id
								and country_code = @i_country_code
								and asset_id = @p_asset_id
								and contract_doc_no = @p_contract_doc_no
								and service_visit_slno = 0
						
							if @@ROWCOUNT = 0
							begin
								set @i_error_msg = '{"code":"error_update_asset_service_schedule_for_complete"}'
								return				
							end
						

							/* RECALCULATE NEXT VISTI DATES */
							execute sp_update_asset_service_schedule_cascade_dates 
								@i_client_id, 
								@i_country_code, 
								@i_user_id, 
								@p_asset_id, 
								'INITIALWARRANTY', 
								0,	
								@p_update_status OUTPUT, 
								@p_errorno OUTPUT
				
							if @p_errorNo != ''
							begin
								set @i_error_msg = '{"code":"error_failed_recalibrating_asset_service_schedule_for_complete"}'
								return
							end
					   
						end
						else
						begin
							set @i_error_msg = '{"code":"error_asset_is_not_under_inital_warranty_for_complete"}'
							return									   
						end				  

					end
					else
					begin
						set @i_error_msg = '{"code":"error_asset_is_already_installed_for_complete"}'
						return									   		
					end

				end

			end	
			else
			begin

				if (@p_asset_id != 'ZZZ')
				begin 		
						
					if exists 
					(
						select 1 from asset_service_schedule
						where company_id = @i_client_id
							and country_code = @i_country_code
							and call_jo_ind = 'C'
							and call_ref_jo_no = @p_transaction_ref_no
					)
					begin
						
						select @p_service_visit_slno = service_visit_slno
						from asset_service_schedule
						where company_id = @i_client_id
							and country_code = @i_country_code
							and call_jo_ind = 'C'
							and call_ref_jo_no = @p_transaction_ref_no
							  
						update asset_service_schedule
						set service_visit_status = 'CO',
							act_service_date = @p_act_finish_date,
							last_update_id = @i_user_id
						where company_id = @i_client_id
							and country_code = @i_country_code
							and call_jo_ind = 'C'
							and call_ref_jo_no = @p_transaction_ref_no
							
						if @@ROWCOUNT = 0
						begin
							set @i_error_msg = '{"code":"error_update_asset_service_schedule_for_complete"}'
							return									   		
						end
								
						if @p_contract_type = 'IW'
						begin

							/* CASCADE TO NEXT VISTI DATES */
							execute sp_update_asset_service_schedule_cascade_dates 
								@i_client_id, 
								@i_country_code, 
								@i_user_id , 
								@p_asset_id, 
								@p_contract_doc_no, 
								@p_service_visit_slno,	
								@p_update_status OUTPUT, 
								@p_errorno OUTPUT
						
							if @p_errorNo != ''
							begin
								set @i_error_msg = '{"code":"error_failed_cascade_dates_to_asset_service_schedule_for_complete"}'
								return									   		
							end

						end
				
					end

				end
					
			end
			  	
			/* UPDATE ASSET ORGANOGRAM */
			if isnull(@p_asset_id, 'ZZZ') != 'ZZZ'
			begin

				update asset_master
				set servicing_org_level_code = @p_organogram_level_code,
					servicing_org_level_no = @p_organogram_level_no
				where company_id = @i_client_id
					and country_code = @i_country_code
					and asset_id = @p_asset_id
						  
				if @@ROWCOUNT = 0
				begin
					set @i_error_msg = '{"code":"error_update_asset_master_for_complete"}'
					return									   		
				end

			end  

		end			  
		

		/*GENERATE CUSTOMER SURVEY RECORD */				 
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

	end

	if exists (select 1 from @custom_info_detail)
	begin

		execute sp_save_manage_custom_info_user_attachments 
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

		if @o_update_status != 'SP001'
		begin
			set @i_error_msg = '{"code":"error_user_attachment"}'
			return
		end

	end

	/* UPDATE EMPLOYEE LAST ACCESS INFO */		
	set @p_allow_new_txn = 1
		
	if (@p_eventverb_id = 'START')
	begin
		set @p_allow_new_txn = 0
	end
	else if (@p_eventverb_id in ('WORKCOMPLETE','COMPLETE','CLOSE','HOLD', 'ASSIGN', 'REASSIGN','SAVEFORASSIGN','PROGRESSUPDATE','REJECTCALL'))
	begin
		set @p_allow_new_txn = 1
	end
	else if (@p_eventverb_id in ('RELEASEHOLD'))
	begin
		set @p_allow_new_txn = 0
	end
	else
	begin
		set @p_allow_new_txn = 0
	end

	select @p_feature_id = feature_id
	from company_feature
	where company_id = @i_client_id
		and country_code = @i_country_code
		and screen_id = @p_eventverb_id
		and channel_id = @p_channel_id
		  
	execute sp_update_employee_lastaccess_info 
		@i_client_id, 
		@i_country_code, 
		@i_session_id, 
		@i_user_id, 
		@i_locale_id, 
		@p_by_employee_id,
		'C',
		@p_transaction_ref_no,
		'0',
		@p_feature_id,
		@p_allow_new_txn,
		@p_channel_id,
		@o_update_status OUTPUT	

	if @o_update_status = 'ERROR'
	begin
		set @i_error_msg = '{"code":"error_failed_updating_employee_last_access_info"}'
		return
	end

	/* GENERATE NOTIFICATION LOG DATA */
	if 
	( 
		(
			select count(*) from call_register
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_transaction_ref_no
				and call_wf_stage_no = 4
				and call_status = 'CO'
		) = 1 
	)
	begin
		
		/* Determine if there are any events configured in notification rules */	
		declare @p_notification_event_code_1 nvarchar(60),
			@p_notification_event_code_2 nvarchar(60),
			@p_notification_event_code_3 nvarchar(60),
			@p_notification_event_code_4 nvarchar(60),
			@p_notification_event_code_5 nvarchar(60),
			@p_notification_xml nvarchar(max),
			@p_notification_id int
				
		select @p_request_category = call_category,
			@p_request_type = call_type,
			@p_organogram_level_no = organogram_level_no,
			@p_organogram_level_code = organogram_level_code,
			@p_company_location_code = company_location_code		
		from call_register
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @p_transaction_ref_no
	  
		select @p_notification_event_code_1 = isnull(@p_notification_event_code_1,isnull(notification_event_code_1,'')),
			@p_notification_event_code_2 = isnull(@p_notification_event_code_2,isnull(notification_event_code_2,'')),
			@p_notification_event_code_3 = isnull(@p_notification_event_code_3,isnull(notification_event_code_3,'')),
			@p_notification_event_code_4 = isnull(@p_notification_event_code_4,isnull(notification_event_code_4,'')),
			@p_notification_event_code_5 = isnull(@p_notification_event_code_5, isnull(notification_event_code_5,''))	
		from company_notification_rules
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code = 'CALL'
			and transaction_subtype_code = 'CALL'
			and request_category = @p_request_category 
			and request_type = 'ALL'
			and company_location_code = 'ALL'
			and organogram_level_no =  'ALL'
			and organogram_level_code= 'ALL'
			and attachment_type = 'W'
			and to_wf_stage = 4
			and to_wf_status = 'CO'

	  	
		select @p_notification_event_code_1 = isnull(@p_notification_event_code_1,isnull(notification_event_code_1,'')),
			@p_notification_event_code_2 = isnull(@p_notification_event_code_2,isnull(notification_event_code_2,'')),
			@p_notification_event_code_3 = isnull(@p_notification_event_code_3,isnull(notification_event_code_3,'')),
			@p_notification_event_code_4 = isnull(@p_notification_event_code_4,isnull(notification_event_code_4,'')),
			@p_notification_event_code_5 = isnull(@p_notification_event_code_5, isnull(notification_event_code_5,''))	
		from company_notification_rules
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code = 'CALL'
			and transaction_subtype_code = 'CALL'
			and request_category = @p_request_category 
			and request_type = @p_request_type
			and company_location_code = 'ALL'
			and organogram_level_no =  'ALL'
			and organogram_level_code= 'ALL'
			and attachment_type = 'W'
			and to_wf_stage = 4
			and to_wf_status = 'CO'


		select @p_notification_event_code_1 = isnull(@p_notification_event_code_1,isnull(notification_event_code_1,'')),
			@p_notification_event_code_2 = isnull(@p_notification_event_code_2,isnull(notification_event_code_2,'')),
			@p_notification_event_code_3 = isnull(@p_notification_event_code_3,isnull(notification_event_code_3,'')),
			@p_notification_event_code_4 = isnull(@p_notification_event_code_4,isnull(notification_event_code_4,'')),
			@p_notification_event_code_5 = isnull(@p_notification_event_code_5, isnull(notification_event_code_5,''))	
		from company_notification_rules
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code = 'CALL'
			and transaction_subtype_code = 'CALL'
			and request_category = @p_request_category 
			and request_type = @p_request_type
			and company_location_code = @p_company_location_code
			and organogram_level_no =  'ALL'
			and organogram_level_code= 'ALL'
			and attachment_type = 'W'
			and to_wf_stage = 4
			and to_wf_status = 'CO'


		select @p_notification_event_code_1 = isnull(@p_notification_event_code_1,isnull(notification_event_code_1,'')),
			@p_notification_event_code_2 = isnull(@p_notification_event_code_2,isnull(notification_event_code_2,'')),
			@p_notification_event_code_3 = isnull(@p_notification_event_code_3,isnull(notification_event_code_3,'')),
			@p_notification_event_code_4 = isnull(@p_notification_event_code_4,isnull(notification_event_code_4,'')),
			@p_notification_event_code_5 = isnull(@p_notification_event_code_5, isnull(notification_event_code_5,''))	
		from company_notification_rules
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code = 'CALL'
			and transaction_subtype_code = 'CALL'
			and request_category = @p_request_category 
			and request_type = @p_request_type
			and company_location_code = @p_company_location_code
			and organogram_level_no =  @p_organogram_level_no
			and organogram_level_code= 'ALL'
			and attachment_type = 'W'
			and to_wf_stage = 4
			and to_wf_status = 'CO'

	
		select @p_notification_event_code_1 = isnull(@p_notification_event_code_1,isnull(notification_event_code_1,'')),
			@p_notification_event_code_2 = isnull(@p_notification_event_code_2,isnull(notification_event_code_2,'')),
			@p_notification_event_code_3 = isnull(@p_notification_event_code_3,isnull(notification_event_code_3,'')),
			@p_notification_event_code_4 = isnull(@p_notification_event_code_4,isnull(notification_event_code_4,'')),
			@p_notification_event_code_5 = isnull(@p_notification_event_code_5, isnull(notification_event_code_5,''))	
		from company_notification_rules
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code = 'CALL'
			and transaction_subtype_code = 'CALL'
			and request_category = @p_request_category 
			and request_type = @p_request_type
			and company_location_code = @p_company_location_code
			and organogram_level_no =  @p_organogram_level_no
			and organogram_level_code= @p_organogram_level_code
			and attachment_type = 'W'
			and to_wf_stage = 4
			and to_wf_status = 'CO'


		if isnull(@p_notification_event_code_1,'') != ''
		begin
	
			if exists 
			( 
				select 1 from company_notification a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.notification_event_code = @p_notification_event_code_1
					and active_ind = 1
			)
			begin
		
				select @p_notification_xml = '<notification_info>'+
					'<call_no>'+@p_transaction_ref_no+'</call_no>'+
					'<call_type>'+
						case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLTYPE'
						and f.code = a.call_type)
						when 1 then
						(select e.short_description 
						from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLTYPE'
						and e.code = a.call_type)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLTYPE'
						and g.code = a.call_type)
						end 
					+'</call_type>'+
					'<cust_id>'+isnull(c.customer_id,'')+'</cust_id>'+
					'<cust_name>'+isnull(substring(c.customer_name,1,50),'') +'</cust_name>'+
					'<cust_contact_name>'+isnull(substring(a.customer_contact_name,1,50),'') +'</cust_contact_name>'+
					'<cust_contact_no>'+isnull(a.customer_contact_no,'') +'</cust_contact_no>'+
					'<cust_contact_email_id>'+ISNULL(a.customer_contact_email_id,'')+'</cust_contact_email_id>'+
					'<description>'+isnull(a.problem_description,'')+'</description>'+
					'<call_logged_on_date>'+CONVERT(varchar(17),a.created_on_date,113)+'</call_logged_on_date>'+
					'<udf_char_1>'+isnull(a.udf_char_1,'')+'</udf_char_1>'+												 
					'<udf_char_2>'+isnull(a.udf_char_2,'')+'</udf_char_2>'+												 
					'<udf_char_3>'+isnull(a.udf_char_3,'')+'</udf_char_3>'+												 
					'<udf_char_4>'+isnull(a.udf_char_4,'')+'</udf_char_4>'+												 
					'<udf_bit_1>'+isnull(cast(a.udf_bit_1 as varchar(1)),'')+'</udf_bit_1>'+												 
					'<udf_bit_2>'+isnull(cast(a.udf_bit_2 as varchar(1)),'')+'</udf_bit_2>'+												 
					'<udf_bit_3>'+isnull(cast(a.udf_bit_3 as varchar(1)),'')+'</udf_bit_3>'+												 
					'<udf_bit_4>'+isnull(cast(a.udf_bit_4 as varchar(1)),'')+'</udf_bit_4>'+												 
					'<udf_float_1>'+isnull(cast(a.udf_float_1 as varchar(14)),'')+'</udf_float_1>'+												 
					'<udf_float_2>'+isnull(cast(a.udf_float_2 as varchar(14)),'')+'</udf_float_2>'+												 
					'<udf_float_3>'+isnull(cast(a.udf_float_3 as varchar(14)),'')+'</udf_float_3>'+												 
					'<udf_float_4>'+isnull(cast(a.udf_float_4 as varchar(14)),'')+'</udf_float_4>'+												 
					'<udf_date_1>'+isnull(CONVERT(varchar(20),a.udf_date_1,100),'')+'</udf_date_1>'+												 
					'<udf_date_2>'+isnull(CONVERT(varchar(20),a.udf_date_2,100),'')+'</udf_date_2>'+												 
					'<udf_date_3>'+isnull(CONVERT(varchar(20),a.udf_date_3,100),'')+'</udf_date_3>'+												 
					'<udf_date_4>'+isnull(CONVERT(varchar(20),a.udf_date_4,100),'')+'</udf_date_4>'+												 
					'<udf_analysis_code1>'+isnull(a.udf_analysis_code1,'')+'</udf_analysis_code1>'+												 
					'<udf_analysis_code2>'+isnull(a.udf_analysis_code2,'')+'</udf_analysis_code2>'+												 
					'<udf_analysis_code3>'+isnull(a.udf_analysis_code3,'')+'</udf_analysis_code3>'+												 
					'<udf_analysis_code4>'+isnull(a.udf_analysis_code4,'')+'</udf_analysis_code4>'+												 
					'<support_desk_no>Service Coordinator</support_desk_no>'+
					'</notification_info>'		
				from call_register a left outer join customer c
				on a.company_id = c.company_id
					and a.country_code = c.country_code
					and a.customer_id = c.customer_id
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.call_ref_no = @p_transaction_ref_no
	
				execute sp_log_new_notification  @i_session_id, @i_user_id  , @i_client_id , 
					@i_locale_id , @i_country_code , @p_notification_event_code_1 ,@p_notification_xml, @i_user_id, @p_notification_id OUTPUT
		
				if @p_notification_id = 0
				begin
					return
				end
		
			end
		end
	
		if isnull(@p_notification_event_code_2,'') != ''
		begin
	
			if exists 
			( 
				select 1 from company_notification a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.notification_event_code = @p_notification_event_code_2
					and active_ind = 1
			)
			begin
		
				select @p_notification_xml = '<notification_info>'+
					'<call_no>'+@p_transaction_ref_no+'</call_no>'+
					'<call_type>'+
						case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLTYPE'
						and f.code = a.call_type)
						when 1 then
						(select e.short_description 
						from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLTYPE'
						and e.code = a.call_type)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLTYPE'
						and g.code = a.call_type)
						end 
					+'</call_type>'+
					'<cust_id>'+isnull(c.customer_id,'')+'</cust_id>'+
					'<cust_name>'+isnull(substring(c.customer_name,1,50),'') +'</cust_name>'+
					'<cust_contact_name>'+isnull(substring(a.customer_contact_name,1,50),'') +'</cust_contact_name>'+
					'<cust_contact_no>'+isnull(a.customer_contact_no,'') +'</cust_contact_no>'+
					'<cust_contact_email_id>'+ISNULL(a.customer_contact_email_id,'')+'</cust_contact_email_id>'+
					'<description>'+isnull(a.problem_description,'')+'</description>'+
					'<call_logged_on_date>'+CONVERT(varchar(17),a.created_on_date,113)+'</call_logged_on_date>'+
					'<udf_char_1>'+isnull(a.udf_char_1,'')+'</udf_char_1>'+												 
					'<udf_char_2>'+isnull(a.udf_char_2,'')+'</udf_char_2>'+												 
					'<udf_char_3>'+isnull(a.udf_char_3,'')+'</udf_char_3>'+												 
					'<udf_char_4>'+isnull(a.udf_char_4,'')+'</udf_char_4>'+												 
					'<udf_bit_1>'+isnull(cast(a.udf_bit_1 as varchar(1)),'')+'</udf_bit_1>'+												 
					'<udf_bit_2>'+isnull(cast(a.udf_bit_2 as varchar(1)),'')+'</udf_bit_2>'+												 
					'<udf_bit_3>'+isnull(cast(a.udf_bit_3 as varchar(1)),'')+'</udf_bit_3>'+												 
					'<udf_bit_4>'+isnull(cast(a.udf_bit_4 as varchar(1)),'')+'</udf_bit_4>'+												 
					'<udf_float_1>'+isnull(cast(a.udf_float_1 as varchar(14)),'')+'</udf_float_1>'+												 
					'<udf_float_2>'+isnull(cast(a.udf_float_2 as varchar(14)),'')+'</udf_float_2>'+												 
					'<udf_float_3>'+isnull(cast(a.udf_float_3 as varchar(14)),'')+'</udf_float_3>'+												 
					'<udf_float_4>'+isnull(cast(a.udf_float_4 as varchar(14)),'')+'</udf_float_4>'+												 
					'<udf_date_1>'+isnull(CONVERT(varchar(20),a.udf_date_1,100),'')+'</udf_date_1>'+												 
					'<udf_date_2>'+isnull(CONVERT(varchar(20),a.udf_date_2,100),'')+'</udf_date_2>'+												 
					'<udf_date_3>'+isnull(CONVERT(varchar(20),a.udf_date_3,100),'')+'</udf_date_3>'+												 
					'<udf_date_4>'+isnull(CONVERT(varchar(20),a.udf_date_4,100),'')+'</udf_date_4>'+												 
					'<udf_analysis_code1>'+isnull(a.udf_analysis_code1,'')+'</udf_analysis_code1>'+												 
					'<udf_analysis_code2>'+isnull(a.udf_analysis_code2,'')+'</udf_analysis_code2>'+												 
					'<udf_analysis_code3>'+isnull(a.udf_analysis_code3,'')+'</udf_analysis_code3>'+												 
					'<udf_analysis_code4>'+isnull(a.udf_analysis_code4,'')+'</udf_analysis_code4>'+												 
					'<support_desk_no>Service Coordinator</support_desk_no>'+
					'</notification_info>'	
				from call_register a left outer join customer c
				on a.company_id = c.company_id
					and a.country_code = c.country_code
					and a.customer_id = c.customer_id
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.call_ref_no = @p_transaction_ref_no
	
				execute sp_log_new_notification  @i_session_id, @i_user_id  , @i_client_id , 
				@i_locale_id , @i_country_code , @p_notification_event_code_2 ,@p_notification_xml, @i_user_id, @p_notification_id OUTPUT
		
				if @p_notification_id = 0
				begin
					return
				end
		
			end
		end

		if isnull(@p_notification_event_code_3,'') != ''
		begin
	
			if exists 
			( 
				select 1 from company_notification a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.notification_event_code = @p_notification_event_code_3
					and active_ind = 1
			)
			begin
		
				select @p_notification_xml = '<notification_info>'+
					'<call_no>'+cast(@p_transaction_ref_no as varchar(5))+'</call_no>'+
					'<call_type>'+
						case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLTYPE'
						and f.code = a.call_type)
						when 1 then
						(select e.short_description 
						from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLTYPE'
						and e.code = a.call_type)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLTYPE'
						and g.code = a.call_type)
						end 
					+'</call_type>'+
					'<cust_id>'+isnull(c.customer_id,'')+'</cust_id>'+
					'<cust_name>'+isnull(substring(c.customer_name,1,50),'') +'</cust_name>'+
					'<cust_contact_name>'+isnull(substring(a.customer_contact_name,1,50),'') +'</cust_contact_name>'+
					'<cust_contact_no>'+isnull(a.customer_contact_no,'') +'</cust_contact_no>'+
					'<cust_contact_email_id>'+ISNULL(a.customer_contact_email_id,'')+'</cust_contact_email_id>'+
					'<description>'+isnull(a.problem_description,'')+'</description>'+
					'<call_logged_on_date>'+CONVERT(varchar(17), a.created_on_date,113)+'</call_logged_on_date>'+
					'<udf_char_1>'+isnull(a.udf_char_1,'')+'</udf_char_1>'+												 
					'<udf_char_2>'+isnull(a.udf_char_2,'')+'</udf_char_2>'+												 
					'<udf_char_3>'+isnull(a.udf_char_3,'')+'</udf_char_3>'+												 
					'<udf_char_4>'+isnull(a.udf_char_4,'')+'</udf_char_4>'+												 
					'<udf_bit_1>'+isnull(cast(a.udf_bit_1 as varchar(1)),'')+'</udf_bit_1>'+												 
					'<udf_bit_2>'+isnull(cast(a.udf_bit_2 as varchar(1)),'')+'</udf_bit_2>'+												 
					'<udf_bit_3>'+isnull(cast(a.udf_bit_3 as varchar(1)),'')+'</udf_bit_3>'+												 
					'<udf_bit_4>'+isnull(cast(a.udf_bit_4 as varchar(1)),'')+'</udf_bit_4>'+												 
					'<udf_float_1>'+isnull(cast(a.udf_float_1 as varchar(14)),'')+'</udf_float_1>'+												 
					'<udf_float_2>'+isnull(cast(a.udf_float_2 as varchar(14)),'')+'</udf_float_2>'+												 
					'<udf_float_3>'+isnull(cast(a.udf_float_3 as varchar(14)),'')+'</udf_float_3>'+												 
					'<udf_float_4>'+isnull(cast(a.udf_float_4 as varchar(14)),'')+'</udf_float_4>'+												 
					'<udf_date_1>'+isnull(CONVERT(varchar(20),a.udf_date_1,100),'')+'</udf_date_1>'+												 
					'<udf_date_2>'+isnull(CONVERT(varchar(20),a.udf_date_2,100),'')+'</udf_date_2>'+												 
					'<udf_date_3>'+isnull(CONVERT(varchar(20),a.udf_date_3,100),'')+'</udf_date_3>'+												 
					'<udf_date_4>'+isnull(CONVERT(varchar(20),a.udf_date_4,100),'')+'</udf_date_4>'+												 
					'<udf_analysis_code1>'+isnull(a.udf_analysis_code1,'')+'</udf_analysis_code1>'+												 
					'<udf_analysis_code2>'+isnull(a.udf_analysis_code2,'')+'</udf_analysis_code2>'+												 
					'<udf_analysis_code3>'+isnull(a.udf_analysis_code3,'')+'</udf_analysis_code3>'+												 
					'<udf_analysis_code4>'+isnull(a.udf_analysis_code4,'')+'</udf_analysis_code4>'+												 
					'<support_desk_no>Service Coordinator</support_desk_no>'+
				'</notification_info>'	
				from call_register a left outer join customer c
				on a.company_id = c.company_id
					and a.country_code = c.country_code
					and a.customer_id = c.customer_id
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.call_ref_no = @p_transaction_ref_no
	
				execute sp_log_new_notification  @i_session_id, @i_user_id  , @i_client_id , 
				@i_locale_id , @i_country_code , @p_notification_event_code_3 ,@p_notification_xml, @i_user_id, @p_notification_id OUTPUT
		
				if @p_notification_id = 0
				begin
					return
				end
		
			end
		end


		if isnull(@p_notification_event_code_4,'') != ''
		begin
	
			if exists 
			(
				select 1 from company_notification a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.notification_event_code = @p_notification_event_code_4
					and active_ind = 1
			)
			begin
		
				select @p_notification_xml = '<notification_info>'+
					'<call_no>'+cast(@p_transaction_ref_no as varchar(5))+'</call_no>'+
					'<call_type>'+
						case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLTYPE'
						and f.code = a.call_type)
						when 1 then
						(select e.short_description 
						from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLTYPE'
						and e.code = a.call_type)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLTYPE'
						and g.code = a.call_type)
						end 
					+'</call_type>'+
					'<cust_id>'+isnull(c.customer_id,'')+'</cust_id>'+
					'<cust_name>'+isnull(substring(c.customer_name,1,50),'') +'</cust_name>'+
					'<cust_contact_name>'+isnull(substring(a.customer_contact_name,1,50),'') +'</cust_contact_name>'+
					'<cust_contact_no>'+isnull(a.customer_contact_no,'') +'</cust_contact_no>'+
					'<cust_contact_email_id>'+ISNULL(a.customer_contact_email_id,'')+'</cust_contact_email_id>'+
					'<description>'+isnull(a.problem_description,'')+'</description>'+
					'<call_logged_on_date>'+CONVERT(varchar(17), a.created_on_date,113)+'</call_logged_on_date>'+
					'<udf_char_1>'+isnull(a.udf_char_1,'')+'</udf_char_1>'+												 
					'<udf_char_2>'+isnull(a.udf_char_2,'')+'</udf_char_2>'+												 
					'<udf_char_3>'+isnull(a.udf_char_3,'')+'</udf_char_3>'+												 
					'<udf_char_4>'+isnull(a.udf_char_4,'')+'</udf_char_4>'+												 
					'<udf_bit_1>'+isnull(cast(a.udf_bit_1 as varchar(1)),'')+'</udf_bit_1>'+												 
					'<udf_bit_2>'+isnull(cast(a.udf_bit_2 as varchar(1)),'')+'</udf_bit_2>'+												 
					'<udf_bit_3>'+isnull(cast(a.udf_bit_3 as varchar(1)),'')+'</udf_bit_3>'+												 
					'<udf_bit_4>'+isnull(cast(a.udf_bit_4 as varchar(1)),'')+'</udf_bit_4>'+												 
					'<udf_float_1>'+isnull(cast(a.udf_float_1 as varchar(14)),'')+'</udf_float_1>'+												 
					'<udf_float_2>'+isnull(cast(a.udf_float_2 as varchar(14)),'')+'</udf_float_2>'+												 
					'<udf_float_3>'+isnull(cast(a.udf_float_3 as varchar(14)),'')+'</udf_float_3>'+												 
					'<udf_float_4>'+isnull(cast(a.udf_float_4 as varchar(14)),'')+'</udf_float_4>'+												 
					'<udf_date_1>'+isnull(CONVERT(varchar(20),a.udf_date_1,100),'')+'</udf_date_1>'+												 
					'<udf_date_2>'+isnull(CONVERT(varchar(20),a.udf_date_2,100),'')+'</udf_date_2>'+												 
					'<udf_date_3>'+isnull(CONVERT(varchar(20),a.udf_date_3,100),'')+'</udf_date_3>'+												 
					'<udf_date_4>'+isnull(CONVERT(varchar(20),a.udf_date_4,100),'')+'</udf_date_4>'+												 
					'<udf_analysis_code1>'+isnull(a.udf_analysis_code1,'')+'</udf_analysis_code1>'+												 
					'<udf_analysis_code2>'+isnull(a.udf_analysis_code2,'')+'</udf_analysis_code2>'+												 
					'<udf_analysis_code3>'+isnull(a.udf_analysis_code3,'')+'</udf_analysis_code3>'+												 
					'<udf_analysis_code4>'+isnull(a.udf_analysis_code4,'')+'</udf_analysis_code4>'+												 
					'<support_desk_no>Service Coordinator</support_desk_no>'+
					'</notification_info>'	
				from call_register a left outer join customer c
				on a.company_id = c.company_id
					and a.country_code = c.country_code
					and a.customer_id = c.customer_id
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.call_ref_no = @p_transaction_ref_no
	
				execute sp_log_new_notification  @i_session_id, @i_user_id  , @i_client_id , 
				@i_locale_id , @i_country_code , @p_notification_event_code_4 ,@p_notification_xml, @i_user_id, @p_notification_id OUTPUT
		
				if @p_notification_id = 0
				begin
					return
				end
		
			end
		end


		if isnull(@p_notification_event_code_5,'') != ''
		begin
	
			if exists 
			( 
				select 1 from company_notification a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.notification_event_code = @p_notification_event_code_5
					and active_ind = 1
			)
			begin
		
				select @p_notification_xml = '<notification_info>'+
					'<call_no>'+cast(@p_transaction_ref_no as varchar(5))+'</call_no>'+
					'<call_type>'+
						case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLTYPE'
						and f.code = a.call_type)
						when 1 then
						(select e.short_description 
						from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLTYPE'
						and e.code = a.call_type)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLTYPE'
						and g.code = a.call_type)
						end 
					+'</call_type>'+
					'<cust_id>'+isnull(c.customer_id,'')+'</cust_id>'+
					'<cust_name>'+isnull(substring(c.customer_name,1,50),'') +'</cust_name>'+
					'<cust_contact_name>'+isnull(substring(a.customer_contact_name,1,50),'') +'</cust_contact_name>'+
					'<cust_contact_no>'+isnull(a.customer_contact_no,'') +'</cust_contact_no>'+
					'<cust_contact_email_id>'+ISNULL(a.customer_contact_email_id,'')+'</cust_contact_email_id>'+
					'<description>'+isnull(a.problem_description,'')+'</description>'+
					'<call_logged_on_date>'+CONVERT(varchar(17), a.created_on_date, 113)+'</call_logged_on_date>'+
					'<udf_char_1>'+isnull(a.udf_char_1,'')+'</udf_char_1>'+												 
					'<udf_char_2>'+isnull(a.udf_char_2,'')+'</udf_char_2>'+												 
					'<udf_char_3>'+isnull(a.udf_char_3,'')+'</udf_char_3>'+												 
					'<udf_char_4>'+isnull(a.udf_char_4,'')+'</udf_char_4>'+												 
					'<udf_bit_1>'+isnull(cast(a.udf_bit_1 as varchar(1)),'')+'</udf_bit_1>'+												 
					'<udf_bit_2>'+isnull(cast(a.udf_bit_2 as varchar(1)),'')+'</udf_bit_2>'+												 
					'<udf_bit_3>'+isnull(cast(a.udf_bit_3 as varchar(1)),'')+'</udf_bit_3>'+												 
					'<udf_bit_4>'+isnull(cast(a.udf_bit_4 as varchar(1)),'')+'</udf_bit_4>'+												 
					'<udf_float_1>'+isnull(cast(a.udf_float_1 as varchar(14)),'')+'</udf_float_1>'+												 
					'<udf_float_2>'+isnull(cast(a.udf_float_2 as varchar(14)),'')+'</udf_float_2>'+												 
					'<udf_float_3>'+isnull(cast(a.udf_float_3 as varchar(14)),'')+'</udf_float_3>'+												 
					'<udf_float_4>'+isnull(cast(a.udf_float_4 as varchar(14)),'')+'</udf_float_4>'+												 
					'<udf_date_1>'+isnull(CONVERT(varchar(20),a.udf_date_1,100),'')+'</udf_date_1>'+												 
					'<udf_date_2>'+isnull(CONVERT(varchar(20),a.udf_date_2,100),'')+'</udf_date_2>'+												 
					'<udf_date_3>'+isnull(CONVERT(varchar(20),a.udf_date_3,100),'')+'</udf_date_3>'+												 
					'<udf_date_4>'+isnull(CONVERT(varchar(20),a.udf_date_4,100),'')+'</udf_date_4>'+												 
					'<udf_analysis_code1>'+isnull(a.udf_analysis_code1,'')+'</udf_analysis_code1>'+												 
					'<udf_analysis_code2>'+isnull(a.udf_analysis_code2,'')+'</udf_analysis_code2>'+												 
					'<udf_analysis_code3>'+isnull(a.udf_analysis_code3,'')+'</udf_analysis_code3>'+												 
					'<udf_analysis_code4>'+isnull(a.udf_analysis_code4,'')+'</udf_analysis_code4>'+												 
					'<support_desk_no>Service Coordinator</support_desk_no>'+
					'</notification_info>'	
				from call_register a left outer join customer c
				on a.company_id = c.company_id
					and a.country_code = c.country_code
					and a.customer_id = c.customer_id
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.call_ref_no = @p_transaction_ref_no
	
				execute sp_log_new_notification  @i_session_id, @i_user_id  , @i_client_id , 
				@i_locale_id , @i_country_code , @p_notification_event_code_5 ,@p_notification_xml, @i_user_id, @p_notification_id OUTPUT
		
				if @p_notification_id = 0
				begin
					return
				end
		
			end
		end
  
	end
	
	set @o_update_status = 'SP001'

END
GO

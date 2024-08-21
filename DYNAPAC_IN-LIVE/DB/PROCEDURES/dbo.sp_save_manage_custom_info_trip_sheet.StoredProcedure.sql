DROP PROCEDURE IF EXISTS[dbo].[sp_save_manage_custom_info_trip_sheet] 
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_trip_sheet] 
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
		@p_transaction_type varchar(20),
		@p_transaction_ref_no varchar(30),
		@p_employee_id nvarchar(12),
		@p_trip_start_finish_indicator varchar(2),
		@p_trip_start_date varchar(10),
		@p_trip_start_time_hour varchar(2),
		@p_trip_start_time_minute varchar(2),
		@p_trip_start_time_second varchar(2),
		@p_trip_start_latitude varchar(10),
		@p_trip_start_longitude varchar(10),
		@p_trip_finish_date varchar(10),
		@p_trip_finish_time_hour varchar(2),
		@p_trip_finish_time_minute varchar(2),
		@p_trip_finish_time_second varchar(2),
		@p_trip_distance varchar(10),
		@p_event_date varchar(10),
		@p_event_hour varchar(2),
		@p_event_minute varchar(2),
		@p_event_second varchar(2),
		@p_event_latitude varchar(10),
		@p_event_longitude varchar(10),
		@p_trip_start_date_time_offset datetimeoffset(7),
		@p_trip_finish_date_time_offset datetimeoffset(7),
		@p_trip_for_indicator varchar(2),
		@p_trip_sequence_no int,
		@p_pathway_points_string varchar(600),
		@p_from_wf_stage_no tinyint,
		@p_from_call_status varchar(2),
		@p_allow_newtxn_ind bit, 
		@p_feature_id varchar(15),
		@p_screen_id varchar(15)


	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset
	(
		@i_client_id, 
		@i_country_code, 
		@i_user_id
	)


	select @p_transaction_type = json_value(@i_inputparam_header_xml, '$.transaction_type')
	select @p_transaction_ref_no = json_value(@i_inputparam_header_xml, '$.transaction_ref_no')
	select @p_employee_id = json_value(@i_inputparam_header_xml, '$.employee_id')
	select @p_trip_start_finish_indicator = json_value(@i_inputparam_header_xml, '$.trip_start_finish_indicator')
	select @p_trip_start_date = json_value(@i_inputparam_header_xml, '$.trip_start_date')
	select @p_trip_start_time_hour = json_value(@i_inputparam_header_xml, '$.trip_start_time_hour')
	select @p_trip_start_time_minute = json_value(@i_inputparam_header_xml, '$.trip_start_time_minute')
	select @p_trip_start_time_second = json_value(@i_inputparam_header_xml, '$.trip_start_time_second')
	select @p_trip_start_latitude = json_value(@i_inputparam_header_xml, '$.trip_start_latitude')
	select @p_trip_start_longitude = json_value(@i_inputparam_header_xml, '$.trip_finish_longitude')
	select @p_trip_finish_date = json_value(@i_inputparam_header_xml, '$.trip_finish_date')
	select @p_trip_finish_time_hour = json_value(@i_inputparam_header_xml, '$.trip_finish_time_hour')
	select @p_trip_finish_time_minute = json_value(@i_inputparam_header_xml, '$.trip_finish_time_minute')
	select @p_trip_finish_time_second = json_value(@i_inputparam_header_xml, '$.trip_finish_time_second')
	select @p_event_date = json_value(@i_inputparam_header_xml, '$.event_date')
	select @p_event_hour = json_value(@i_inputparam_header_xml, '$.event_hour')
	select @p_event_minute = json_value(@i_inputparam_header_xml, '$.event_minute')
	select @p_event_second = json_value(@i_inputparam_header_xml, '$.event_second')
	select @p_event_latitude = json_value(@i_inputparam_header_xml, '$.event_latitude')
	select @p_event_longitude = json_value(@i_inputparam_header_xml, '$.event_longitude')

	select @p_trip_for_indicator = 
		case (@p_transaction_type)
			when 'CALL' then 'C'
			else ''
		end

	select @p_from_wf_stage_no = call_wf_stage_no,
		@p_from_call_status = call_status 
	from call_register
	where company_id = @i_client_id
		and country_code = @i_country_code
		and call_ref_no = @p_transaction_ref_no


	if (@p_trip_start_finish_indicator = 'TS')
	begin
		
		/* SET THE TRIP START DATE TIME OFFSET */
		if (@p_trip_start_date is not null)
		begin

			select @p_trip_start_date_time_offset = todatetimeoffset
			(
				convert
				(
					datetimeoffset, 
					@p_trip_start_date + ' ' + @p_trip_start_time_hour + ':' + @p_trip_start_time_minute + ':' + @p_trip_start_time_second + '.000', 
					121
				),
				'+05:30'
			)

		end
		else
		begin

			select @p_trip_start_date_time_offset = todatetimeoffset
			(
				convert
				(
					datetimeoffset, 
					@p_event_date + ' ' + @p_event_hour + ':' + @p_event_minute + ':' + @p_event_second + '.000', 
					121
				),
				'+05:30'
			)

		end


		/* INSERT THE DATA INTO TRIP SHEET TABLE */
		insert trip_sheet
		(
			company_id, 
			country_code,
			employee_id, 
			trip_for_ind,
			project_id, 
			task_id,
			call_ref_no,
			trip_start_datetime,
			start_lattitude_value,
			start_longitude_value,		
			last_update_id
		)
		select @i_client_id, 
			@i_country_code,
			@p_employee_id, 
			@p_trip_for_indicator,
			'',
			'0',
			@p_transaction_ref_no,
			@p_trip_start_date_time_offset,
			@p_event_latitude,
			@p_event_longitude,				
			@i_user_id

		if @@rowcount = 0
		begin
			set @i_error_msg = '{"code":"error_trip_sheet"}'
			return
		end


		/* INSERT THE DATA INTO CALL STATUS EVENT LOG TABLE */
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
			lattitude_value,
			longitude_value,
			last_update_id
		)
		select @i_client_id, 
			@i_country_code, 
			@p_transaction_ref_no,
			'MOBILE',
			'Trip Start',
			@p_from_wf_stage_no,
			@p_from_wf_stage_no,
			@p_trip_start_date_time_offset, 
			@p_from_call_status, 
			@p_from_call_status,
			@p_employee_id,
			@p_event_latitude,
			@p_event_longitude,
			@i_user_id

		if @@rowcount = 0
		begin
			set @i_error_msg = '{"code":"error_trip_sheet"}'
			return
		end

	end
	else
	begin

		/* SET THE TRIP SEQUENCE NUMBER */
		select @p_trip_sequence_no = max(trip_seqno) 
		from trip_sheet
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id = @p_employee_id
			and project_id = ''
			and task_id = '0'
			and call_ref_no = @p_transaction_ref_no


		/* SET THE TRIP FINISH DATE TIME OFFSET */
		if (@p_trip_start_date is not null)
		begin

			select @p_trip_finish_date_time_offset = todatetimeoffset
			(
				convert
				(
					datetimeoffset, 
					@p_trip_finish_date + ' ' + @p_trip_finish_time_hour + ':' + @p_trip_finish_time_minute + ':' + @p_trip_finish_time_second + '.000', 
					121
				),
				'+05:30'
			)

		end
		else
		begin

			select @p_trip_finish_date_time_offset = todatetimeoffset
			(
				convert
				(
					datetimeoffset, 
					@p_event_date + ' ' + @p_event_hour + ':' + @p_event_minute + ':' + @p_event_second + '.000', 
					121
				),
				'+05:30'
			)

		end


		/* UPDATE THE DATA INTO TRIP SHEET TABLE */
		update trip_sheet
		set trip_finish_datetime = @p_trip_finish_date_time_offset,
			finish_lattitude_value = @p_event_latitude,
			finish_longitude_value = @p_event_longitude,
			distance_in_kms = @p_trip_distance,
			path_way_points_string = @p_pathway_points_string,
			last_update_id = @i_user_id
		where company_id = @i_client_id
			and country_code = @i_country_code
			and trip_seqno = @p_trip_sequence_no

		if @@rowcount = 0
		begin
			set @i_error_msg = '{"code":"error_trip_sheet"}'
			return
		end


		/* INSERT THE DATA INTO CALL STATUS EVENT LOG TABLE */
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
			comments,
			lattitude_value,
			longitude_value,
			last_update_id
		)
		select @i_client_id, 
			@i_country_code, 
			@p_transaction_ref_no,
			'MOBILE',
			'Trip Finish',
			@p_from_wf_stage_no,
			@p_from_wf_stage_no,
			@p_trip_finish_date_time_offset, 
			@p_from_call_status, 
			@p_from_call_status,
			@p_employee_id,
			'Distance - ' + isnull(@p_trip_distance, '') + ' Kms.',
			@p_event_latitude,
			@p_event_longitude,
			@i_user_id

		if @@rowcount = 0
		begin
			set @i_error_msg = '{"code":"error_trip_sheet"}'
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


	/* UPDATE EMPLOYEE LAST ACCESS INFO DATA */		
	set @p_screen_id = ''

	if (@p_trip_start_finish_indicator = 'TS')
	begin

		set @p_allow_newtxn_ind = 0
		set @p_screen_id = 'trip_start'

	end
	else if (@p_trip_start_finish_indicator = 'TF')
	begin

		set @p_allow_newtxn_ind = 1
		set @p_screen_id = 'trip_finish'

	end
		
	if (@p_screen_id != '')
	begin

		select @p_feature_id = feature_id
		from company_feature
		where company_id = @i_client_id
			and country_code = @i_country_code
			and screen_id = @p_screen_id
			and channel_id = 'Mobile'
			  
		execute sp_update_employee_lastaccess_info 
			@i_client_id , 
			@i_country_code , 
			@i_session_id , 
			@i_user_id , 
			@i_locale_id , 
			@p_employee_id ,
			@p_trip_for_indicator,
			@p_transaction_ref_no ,
			'0',
			@p_feature_id,
			@p_allow_newtxn_ind,
			'MOBILE',
			@o_update_status output

		if @o_update_status = 'ERROR'
		begin
			set @i_error_msg = '{"code":"error_employee_last_access_info_update"}'
			return
		end

	end


	/* GENERATE NOTIFICATION LOG DATA */
	if 
	( 
		(
			select count(*) from trip_sheet
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_transaction_ref_no
		) = 1 
	)
	begin
		
		/* Determine if there are any events configured in notification rules */	
		declare @p_request_category varchar(10),
			@p_request_type nvarchar(10),
			@p_organogram_level_no tinyint,
			@p_organogram_level_code nvarchar(15),
			@p_company_location_code nvarchar(8),
			@p_notification_event_code_1 nvarchar(60),
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
			and attachment_type = 'A'
			and time_interval_from_code = @p_trip_start_finish_indicator
	  	
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
			and attachment_type = 'A'
			and time_interval_from_code = @p_trip_start_finish_indicator

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
			and attachment_type = 'A'
			and time_interval_from_code = @p_trip_start_finish_indicator

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
			and attachment_type = 'A'
			and time_interval_from_code = @p_trip_start_finish_indicator
	
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
			and attachment_type = 'A'
			and time_interval_from_code = @p_trip_start_finish_indicator

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

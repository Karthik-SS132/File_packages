DROP PROCEDURE IF EXISTS[dbo].[sp_save_manage_custom_info_digital_report] 
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_digital_report] 
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

	select @p_file_extension = substring
	(
		ltrim(rtrim(@p_file_name)), 
		len(ltrim(rtrim(@p_file_name))) - charindex('.', reverse(ltrim(rtrim(@p_file_name)))) + 1, 
		len(ltrim(rtrim(@p_file_name)))
	)

	select @p_by_employee_id = employee_id
	from users
	where company_id = @i_client_id
		and country_code = @i_country_code
		and user_id = @i_user_id


	/* CHECK WHETHER THE FILE EXTENSION IS ALLOWED */
	if not exists 
	( 
		select 1 
		from category_type_link
		where company_id = @i_client_id
			and country_code = @i_country_code
			and link_type = 'FA'
			and category_code_type = 'FILECATG'
			and category_code_value = @p_file_category
			and type_code_type = 'FILEEXTNALLOWED'
			and type_code_value = @p_file_extension
	)
	begin
		set @i_error_msg = '{"code":"invalid_file_extension"}'
		return
	end
	
	
	if (@p_transaction_type = 'CALL')
	begin

		if (@p_file_path is null)
		begin

			/* GET THE FILE PATH */
			select @p_file_path = code
			from code_table
			where company_id = @i_client_id
				and country_code = @i_country_code
				and code_type = 'CALLATTACHPATH'

		end


		/* INSERT CALL USER ATTACHMENT */
		insert call_user_attachments
		(
			company_id, 
			country_code, 
			call_ref_no,
			attachment_file_category, 
			attachment_file_type, 
			attachment_file_name, 
			attachment_file_path, 
			closure_report_ind,
			last_update_id
		)
		select @i_client_id, 
			@i_country_code,
			@p_transaction_ref_no, 
			@p_file_category, 
			@p_file_type, 
			@p_file_name, 
			@p_file_path, 
			@p_closure_report_indicator, 
			@i_user_id

		if @@rowcount = 0
		begin
			set @i_error_msg = '{"code":"error_user_attachments_insert"}'
			return
		end


		update call_user_attachments
		set attachment_file_id = attachment_file_category + attachment_file_type + replace(str(attachment_file_sysgen_id, 5, 0), ' ', '0')
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @p_transaction_ref_no
			and attachment_file_name = @p_file_name

		if @@rowcount = 0
		begin
			set @i_error_msg = '{"code":"error_user_attachments_update"}'
			return
		end


		/* INSERT CALL STATUS EVENT LOG */
		select @p_from_wf_stage_no = call_wf_stage_no,
			@p_from_call_status = call_status 
		from call_register
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @p_transaction_ref_no
			
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
			'Mobile', 
			@p_screen_name,
			@p_from_wf_stage_no, 
			@p_from_wf_stage_no,
			@p_event_date_time_offset, 
			@p_from_call_status, 
			@p_from_call_status,
			@p_by_employee_id, 
			@p_event_latitude,
			@p_event_longitude,
			@i_user_id

		if @@rowcount = 0
		begin
			set @i_error_msg = '{"code":"error_call_status_event_log_insert"}'
			return
		end


		/* UPDATE EMPLOYEE LAST ACCESS INFO DATA */
		if @p_modify_last_access = 1
		begin

			select @p_feature_id = feature_id
			from company_feature
			where company_id = @i_client_id
				and country_code = @i_country_code
				and screen_id = @p_screen_id
				and channel_id = 'Mobile'						
					  
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
				'MOBILE',
				@o_update_status output	

			if @o_update_status = 'ERROR'
			begin
				set @i_error_msg = '{"code":"error_employee_last_access_info_update"}'
				return
			end

		end
		
	end

	set @o_update_status = 'SP001'

END
GO

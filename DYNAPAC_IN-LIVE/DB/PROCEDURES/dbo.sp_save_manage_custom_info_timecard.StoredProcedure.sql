DROP PROCEDURE [dbo].[sp_save_manage_custom_info_timecard]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_timecard]
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
    @o_update_status [uddt_varchar_5] OUTPUT, 
	@custom_info_detail [sp_save_manage_custom_info_custom_info_detail] READONLY,
    @i_error_msg [uddt_nvarchar_max] OUTPUT
AS
BEGIN
	
		declare @p_inputparam_header_xml xml, @p_project_scall_ind [uddt_varchar_1], @p_project_id [uddt_project_id], @p_template_id [uddt_template_id], @p_task_id [uddt_task_id], @p_scall_ref_no [uddt_nvarchar_20], @p_employee_id [uddt_employee_id], @p_entry_date [uddt_date], @p_from_hour [uddt_hour], @p_from_minute [uddt_minute], @p_to_hour [uddt_hour], @p_to_minute [uddt_minute], @p_alloc_type_code [uddt_nvarchar_20], @p_header_rec_timestamp [uddt_uid_timestamp], @p_save_mode [uddt_varchar_1],@p_comments nvarchar(500), @p_error_no varchar(15)

		set @p_inputparam_header_xml = CAST(@i_inputparam_header_xml as xml)
	
		create table #inputparam_header_data (
			paramname varchar(50) not null,
			paramval varchar(500) not null
		)
  
		insert #inputparam_header_data (
			paramname, 
			paramval
		)
		select  nodes.value('local-name(.)', 'varchar(500)'),
			nodes.value('(.)[1]', 'varchar(500)')
		from @p_inputparam_header_xml.nodes('/inputparam/*') as Tbl(nodes)

		select @p_project_scall_ind = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_project_scall_ind'
		select @p_project_id = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_project_id'		
		select @p_template_id = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_template_id'		
		select @p_task_id = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_task_id'
		select @p_scall_ref_no = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_scall_ref_no'
		select @p_employee_id = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_employee_id'
		select @p_entry_date = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_entry_date'
		select @p_from_hour = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_from_hour'
		select @p_from_minute = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_from_minute'
		select @p_to_hour = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_to_hour'
		select @p_to_minute = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_to_minute'
		select @p_alloc_type_code = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_alloc_type_code'
		select @p_header_rec_timestamp = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_header_rec_timestamp'
		select @p_save_mode = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_save_mode'
		select @p_comments = ltrim(rtrim(paramval)) from #inputparam_header_data where paramname = 'p_comments'

		
		declare @p_time_spent_in_minutes int

	if @p_save_mode = 'A'
	begin
	
		if not exists ( select 1 from timecard
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and employee_id = @p_employee_id
						  and allocated_to_ind = @p_project_scall_ind
						  and allocated_to_type_code = @p_alloc_type_code
						  and project_id like @p_project_id
						  and task_id = Cast(@p_task_id as int)
						  and DATEDIFF(dd, work_date, CONVERT(datetimeoffset, @p_entry_date, 121)) = 0
						  and start_hour = CAST(@p_from_hour as tinyint)
						  and start_minute = CAST(@p_from_minute as tinyint)
						  and finish_hour = CAST(@p_to_hour as tinyint)
						  and finish_minute = CAST(@p_to_hour as tinyint) )
		begin

			/* Check if there is an entry with overlaping time*/
						
			/* calculate time spent in mnutes */
			
			select @p_time_spent_in_minutes = cast( DATEDIFF(MINUTE, 
			convert(datetimeoffset, @p_entry_date+ ' '+@p_from_hour+':'+@p_from_minute+':'+'00.000', 121),
			convert(datetimeoffset, @p_entry_date+ ' '+@p_to_hour+':'+@p_to_minute+':'+'00.000', 121)) as int)
			
			/* Need to determine shift no  - pending */
			
			insert timecard
			(
				company_id, country_code, employee_id, work_date, shift_no, start_hour, start_minute,
				finish_hour, finish_minute, time_spent_in_mins, allocated_to_ind,
				allocated_to_type_code, project_id, task_id, call_ref_no, last_update_id, comments 
			)
			select @i_client_id, @i_country_code, @p_employee_id, CONVERT(datetimeoffset, @p_entry_date, 121), 
					1, @p_from_hour, @p_from_minute, 
					@p_to_hour, @p_to_minute, @p_time_spent_in_minutes, @p_project_scall_ind,
					@p_alloc_type_code, @p_project_id, @p_task_id, 
					@p_scall_ref_no, @i_user_id, @p_comments
			
			if @@ROWCOUNT = 0
			begin
				set @p_error_no = 'E_UP_071'
				return
			end		
				
		end
		else
		begin
			set @p_error_no = 'E_UP_071'
			return
		end
	end	
		set @o_update_status = 'SP001'
		
END
GO

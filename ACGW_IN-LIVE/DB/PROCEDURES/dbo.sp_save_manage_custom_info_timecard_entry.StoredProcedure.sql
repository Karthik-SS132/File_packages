IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_timecard_entry')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_timecard_entry]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_timecard_entry]
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
	
	declare @p_entry_date varchar(10),
		@p_from_time_hour varchar(2),
		@p_from_time_minute varchar(2),
		@p_from_time_second varchar(2),
		@p_to_time_hour varchar(2),
		@p_to_time_minute varchar(2),
		@p_to_time_second varchar(2),
		@p_allocated_to_ind varchar(1),
		@p_allocated_to_type_code nvarchar(20),
		@p_call_ref_no nvarchar(30), 
		@p_allocated_to_type_code_call nvarchar(20),
		@p_comments nvarchar(500),
		@p_employee_id nvarchar(12),
		@p_channel_id varchar(10),
		@p_event_latitude varchar(10),
		@p_event_longitude varchar(10),
		@p_from_date_time datetimeoffset,
		@p_to_date_time datetimeoffset,
		@p_time_spent_in_minutes int


	/* GETTING THE INPUT PARAMETERS TO BE USED FURTHER IN THE PROGRAM */
	select @p_entry_date = json_value(@i_inputparam_header_xml, '$.entry_date')
	select @p_from_time_hour = json_value(@i_inputparam_header_xml, '$.from_time_hour')
	select @p_from_time_minute = json_value(@i_inputparam_header_xml, '$.from_time_minute')
	select @p_from_time_second = json_value(@i_inputparam_header_xml, '$.from_time_second')
	select @p_to_time_hour = json_value(@i_inputparam_header_xml, '$.to_time_hour')
	select @p_to_time_minute = json_value(@i_inputparam_header_xml, '$.to_time_minute')
	select @p_to_time_second = json_value(@i_inputparam_header_xml, '$.to_time_second')
	select @p_allocated_to_ind = json_value(@i_inputparam_header_xml, '$.allocated_to_ind')
	select @p_allocated_to_type_code = json_value(@i_inputparam_header_xml, '$.allocated_to_type_code')
	select @p_call_ref_no = json_value(@i_inputparam_header_xml, '$.call_ref_no')
	select @p_allocated_to_type_code_call = json_value(@i_inputparam_header_xml, '$.allocated_to_type_code_call')	
	select @p_comments = json_value(@i_inputparam_header_xml, '$.comments')
	select @p_employee_id = json_value(@i_inputparam_header_xml, '$.employee_id')
	select @p_channel_id = json_value(@i_inputparam_header_xml, '$.channel_id')
	select @p_event_latitude = json_value(@i_inputparam_header_xml, '$.event_latitude')
	select @p_event_longitude = json_value(@i_inputparam_header_xml, '$.event_longitude')


	select @p_from_date_time = convert(datetimeoffset, convert(varchar(10), @p_entry_date, 121) + ' ' + 
		case len(cast(@p_from_time_hour as varchar(2)))
			when 1 then '0' + cast(@p_from_time_hour as varchar(2))
			else cast(@p_from_time_hour as varchar(2))
		end + ':' +
		case len(cast(@p_from_time_minute as varchar(2)))
			when 1 then '0' + cast(@p_from_time_minute as varchar(2))
			else cast(@p_from_time_minute as varchar(2))
		end + ':' + 
		case len(cast(@p_from_time_second as varchar(2)))
			when 1 then '0' + cast(@p_from_time_second as varchar(2))
			else cast(@p_from_time_second as varchar(2))
		end + '.000', 121)

	select @p_to_date_time = convert(datetimeoffset, convert(varchar(10), @p_entry_date, 121) + ' ' + 
		case len(cast(@p_to_time_hour as varchar(2)))
			when 1 then '0' + cast(@p_to_time_hour as varchar(2))
			else cast(@p_to_time_hour as varchar(2))
		end + ':' +
		case len(cast(@p_to_time_minute as varchar(2)))
			when 1 then '0' + cast(@p_to_time_minute as varchar(2))
			else cast(@p_to_time_minute as varchar(2))
		end + ':' + 
		case len(cast(@p_to_time_second as varchar(2)))
			when 1 then '0' + cast(@p_to_time_second as varchar(2))
			else cast(@p_to_time_second as varchar(2))
		end + '.000', 121)


	if (datediff(second, @p_from_date_time, @p_to_date_time) > 0)
	begin

		if not exists 
		(
			select 1
			from timecard
			where company_id = @i_client_id
				and country_code = @i_country_code
				and employee_id = @p_employee_id
				and allocated_to_ind != 'A'
				and 
				(
					(
						@p_from_date_time between
						(
							convert(datetimeoffset, 
								convert(varchar(10), work_date, 121) + ' ' + 
								convert(varchar(2), start_hour) + ':' + 
								convert(varchar(2), start_minute) + ':' + '00.000', 121
							)
						)
						and 
						(
							dateadd(minute, -1, 
								convert(datetimeoffset, 
									convert(varchar(10), work_date, 121) + ' ' + 
									convert(varchar(2), finish_hour) + ':' + 
									convert(varchar(2), finish_minute) + ':' + '00.000', 121
								)
							)
						)
					) 
					or
					(
						@p_to_date_time between
						(
							dateadd(minute, 1, 
								convert(datetimeoffset, 
									convert(varchar(10), work_date, 121) + ' ' + 
									convert(varchar(2), start_hour) + ':' + 
									convert(varchar(2), start_minute) + ':' + '00.000', 121
								)
							)
						)
						and 
						(
							convert(datetimeoffset, 
								convert(varchar(10), work_date, 121) + ' ' + 
								convert(varchar(2), finish_hour) + ':' + 
								convert(varchar(2), finish_minute) + ':' + '00.000', 121
							)
						)
					)
				)
		)
		begin

			/* DETERMINE THE ALLOCATED TO INDICATOR AND TYPE CODE */
			if (@p_allocated_to_ind = 'S')
			begin

				select @p_allocated_to_ind = 'C'
				select @p_allocated_to_type_code = @p_allocated_to_type_code_call

			end
			else
			begin

				select @p_allocated_to_ind = 'G'
				select @p_call_ref_no = ''

			end


			/* DETERMINE THE TIME SPENT IN MNUTES */
			select @p_time_spent_in_minutes = datediff(minute, @p_from_date_time, @p_to_date_time)


			/* INSERT THE TIMECARD ENTRY */
			insert timecard
			(
				company_id, 
				country_code, 
				employee_id, 
				work_date, 				
				start_hour, 
				start_minute,
				finish_hour, 
				finish_minute, 
				time_spent_in_mins, 
				shift_no, 
				allocated_to_ind,
				allocated_to_type_code, 
				comments,
				project_id, 
				task_id, 
				call_ref_no, 				
				start_lattitude_value,
				start_longitude_value,
				finish_lattitude_value,
				finish_longitude_value,
				last_update_id				
			)
			select @i_client_id, 
				@i_country_code, 
				@p_employee_id, 
				convert(datetimeoffset, @p_entry_date, 121),
				@p_from_time_hour,
				@p_from_time_minute,
				@p_to_time_hour,
				@p_to_time_minute,
				@p_time_spent_in_minutes,
				1, 
				@p_allocated_to_ind,
				@p_allocated_to_type_code,
				@p_comments,
				'',
				0,
				@p_call_ref_no,
				@p_event_latitude,
				@p_event_longitude,
				@p_event_latitude,
				@p_event_longitude,
				@i_user_id

			if (@@ROWCOUNT = 0)
			begin
				set @i_error_msg = '{"code":"error_insert_timecard"}'
				return
			end
		end
		else
		begin
			set @i_error_msg = '{"code":"error_entry_exits"}'
			return
		end
	end
	else
	begin
		set @i_error_msg = '{"code":"error_from_time_is_not_valid"}'
		return
	end

	set @o_update_status = 'SP001'
		
END
GO



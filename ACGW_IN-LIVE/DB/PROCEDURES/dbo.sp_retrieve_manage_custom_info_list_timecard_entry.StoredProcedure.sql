/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_timecard_entry]    Script Date: 9/22/2023 3:47:26 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_timecard_entry')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_timecard_entry]
END
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_timecard_entry]    Script Date: 9/22/2023 3:47:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_timecard_entry] 
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id],
	@i_custom_info_code [uddt_varchar_60], 
    @i_inputparam_xml [uddt_nvarchar_max], 
    @o_retrieve_status [uddt_varchar_5] OUTPUT
AS
BEGIN

	declare @p_employee_id nvarchar(12)

	select @p_employee_id = employee_id
	from users
	where company_id = @i_client_id
		and country_code = @i_country_code
		and user_id = @i_user_id
	
	select '' as custom_info_list,
		'{' +
			'"project_id":"' + isnull(project_id, '') + '",' +
			'"task_id":"' + cast(isnull(task_id, 0) as varchar(5)) + '",' +
			'"call_ref_no":"' + isnull(call_ref_no, '') + '",' +
			'"employee_id":"' + employee_id + '",' +
			'"shift_no":"' + cast(shift_no as varchar(2)) + '",' +
			'"work_date":"' + substring(convert(varchar(10), work_date, 121), 1, 10) + '",' +
			'"start_hour":"' + 
				case len(cast(start_hour as varchar(2)))
					when 1 then '0' + cast(start_hour as varchar(2))
					else cast(start_hour as varchar(2))
				end + '",' +
			'"start_minute":"' + 
				case len(cast(start_minute as varchar(2)))
					when 1 then '0' + cast(start_minute as varchar(2))
					else cast(start_minute as varchar(2))
				end + '",' +
			'"finish_hour":"' + 
				case len(cast(finish_hour as varchar(2)))
					when 1 then '0' + cast(finish_hour as varchar(2))
					else cast(finish_hour as varchar(2))
				end + '",' +
			'"finish_minute":"' + 
				case len(cast(finish_minute as varchar(2)))
					when 1 then '0' + cast(finish_minute as varchar(2))
					else cast(finish_minute as varchar(2))
				end + '",' +
			'"timespent_in_minutes":"' + cast(isnull(time_spent_in_mins, 0) as varchar(5)) + '",' +
			'"allocated_to_ind":"' + allocated_to_ind + '",' +			
			'"allocated_to_type_code":"' + allocated_to_type_code + '",' +
			'"comments":"' + isnull(comments, '') + '"' +
		'}'
	as o_custom_info_json
	from timecard
	where company_id = @i_client_id
		and country_code = @i_country_code
		and employee_id = @p_employee_id
		and convert(varchar(10), work_date, 121) = convert(varchar(10), sysdatetimeoffset(), 121)
		and allocated_to_ind != 'A'
		order by start_hour asc, start_minute asc

	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_punchinout]   Script Date: 3/31/2023 10:48:17 AM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_save_manage_custom_info_punchinout]
GO
/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_punchinout]   Script Date: 3/31/2023 10:48:18 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_punchinout] 
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
		@p_work_date char(10),
		@p_punchin_hour char(2),
		@p_punchin_minute char(2),
		@p_punchin_lattitude_value varchar(20),
		@p_punchin_longitude_value varchar(20),
		@p_punchout_hour char(2),
		@p_punchout_minute char(2),
		@p_punchout_lattitude_value varchar(20),
		@p_punchout_longitude_value varchar(20)


	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset
	(
		@i_client_id, 
		@i_country_code, 
		@i_user_id
	)


	select @p_work_date = json_value(@i_inputparam_header_xml, '$.work_date')
	select @p_punchin_hour = json_value(@i_inputparam_header_xml, '$.punchin_hour')
	select @p_punchin_minute = json_value(@i_inputparam_header_xml, '$.punchin_minute')
	select @p_punchin_lattitude_value = json_value(@i_inputparam_header_xml, '$.punchin_lattitude_value')
	select @p_punchin_longitude_value = json_value(@i_inputparam_header_xml, '$.punchin_longitude_value')
	select @p_punchout_hour = json_value(@i_inputparam_header_xml, '$.punchout_hour')
	select @p_punchout_minute = json_value(@i_inputparam_header_xml, '$.punchout_minute')
	select @p_punchout_lattitude_value = json_value(@i_inputparam_header_xml, '$.punchout_lattitude_value')
	select @p_punchout_longitude_value = json_value(@i_inputparam_header_xml, '$.punchout_longitude_value')


	if not exists 
	( 
		select 1 from timecard
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id = @i_custom_info_ref_no1
			and convert(varchar(10), work_date, 121) = @p_work_date
			and allocated_to_type_code = 'PUNCH-INOUT'
	)
	begin
			
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
			shift_no, 
			allocated_to_ind,
			allocated_to_type_code,
			start_lattitude_value,
			start_longitude_value,
			finish_lattitude_value,
			finish_longitude_value,
			last_update_id
		)
		select @i_client_id, 
			@i_country_code,
			@i_custom_info_ref_no1, 
			convert(datetimeoffset(7), @p_work_date, 121),
			@p_punchin_hour,
			@p_punchin_minute,
			@p_punchout_hour,
			@p_punchout_minute,
			1, 
			'A',
			'PUNCH-INOUT',
			@p_punchin_lattitude_value,
			@p_punchin_longitude_value,
			@p_punchout_lattitude_value,
			@p_punchout_longitude_value,
			@i_user_id

		if @@rowcount = 0
		begin
			set @i_error_msg = '{"code":"error_punchin"}'
			return
		end
			
	end
	else
	begin
		
		update timecard
		set finish_hour = @p_punchout_hour,
			finish_minute = @p_punchout_minute,
			finish_lattitude_value = @p_punchout_lattitude_value,
			finish_longitude_value = @p_punchout_longitude_value,
			time_spent_in_mins = cast
			( 
				datediff
				(
					minute, 
					(
						convert(datetimeoffset, convert(varchar(10), work_date, 120) + ' ' + 
						case len(cast(start_hour as varchar(2)))
							when 1 then '0' + cast(start_hour as varchar(2))
							else cast(start_hour as varchar(2))
						end + ':' +
						case len(cast(start_minute as varchar(2)))
							when 1 then '0' + cast(start_minute as varchar(2))
							else cast(start_minute as varchar(2))
						end + ':' + '00.000', 121)
					),
					(
						convert(datetimeoffset, convert(varchar(10), work_date, 120) + ' ' + 
						@p_punchout_hour + ':' + 
						@p_punchout_minute + ':' + '00.000', 121)
					)
				) as int
			)					
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id = @i_custom_info_ref_no1
			and convert(varchar(10), work_date, 121) = @p_work_date
			and allocated_to_ind = 'A'
			and allocated_to_type_code = 'PUNCH-INOUT'

		if @@rowcount = 0
		begin
			set @i_error_msg = '{"code":"error_punchout"}'
			return
		end
			
	end

	set @o_update_status = 'SP001'

END
GO

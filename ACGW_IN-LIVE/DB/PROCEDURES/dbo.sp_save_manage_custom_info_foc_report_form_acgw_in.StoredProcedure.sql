/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_foc_report_form_acgw_in]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_foc_report_form_acgw_in')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_foc_report_form_acgw_in]
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_foc_report_form_acgw_in] 
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
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_id', 'foc_report_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_name', 'Free Of Cost Report')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.allow_new_txn', '1')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.modify_last_access', '1')
	
	/* DECLARE THE PROGRAM VARIABLES */
	declare	@p_sysdatetimeoffset datetimeoffset(7),
		@p_transaction_type varchar(20),
		@p_transaction_ref_no varchar(30),
		@data sp_save_manage_custom_info_custom_info_detail,
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
		@p_to_employee_id_string varchar(15)

	
	
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

			select @p_by_employee_id = employee_id
		from users
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and user_id = @i_user_id	

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

	if @p_file_name like '%foc_report_form%'
		begin	
			
			
create table #part_temp
	(
		p_item_part int null,
		p_desc nvarchar(50) null,
		p_qty int null,
	)
	insert #part_temp
	(
		p_item_part, 
		p_desc,
		p_qty
	)
	select p_item_part,p_desc,p_qty from OPENJSON(@i_inputparam_header_xml,'$.part_required') 
	with (
	p_item_part int '$.item_part_savedetails',
	p_desc nvarchar(50) '$.desc_savedetails',
	p_qty int '$.qty_savedetails'
	)

		declare @corrective_action nvarchar(500),
					@route_analysis nvarchar(500),@p_depart_respond nvarchar(500)
				
			select @corrective_action = json_value(@i_inputparam_header_xml, '$.capa_rca_savedetails')
			select @route_analysis = json_value(@i_inputparam_header_xml, '$.action_savedetails')
			select @p_depart_respond = json_value(@i_inputparam_header_xml, '$.depart_respond_savedetails')
			
			insert into call_register_actions
					(company_id,country_code,call_ref_no,action_category,action_type,product_code,product_sub_code,requirement,no_of_units,uom_code) 
						select @i_client_id,@i_country_code,@p_transaction_ref_no,'PWCPART','PWCPART',p_item_part,p_desc,'NA',p_qty,'Nos'
						from #part_temp 
								
			

				update call_register_actions
						set comments_block_1 = @corrective_action,
						comments_block_2 = @route_analysis,
						comments_block_3 = @p_depart_respond
						where company_id = @i_client_id
							and country_code = @i_country_code
							and call_ref_no	 = @p_transaction_ref_no

		declare @p_blm varchar(20), @p_assigned_to_emp_id nvarchar(12)

			select @p_blm = am.servicing_org_level_code
			from asset_master am, call_register cr
			where am.company_id = @i_client_id
				and am.country_code = @i_country_code
				and am.asset_id = cr.asset_id
				and am.company_id = cr.company_id
				and am.country_code = cr.country_code
				and cr.call_ref_no = @p_transaction_ref_no

			select top(1) @p_assigned_to_emp_id = p.field_value1
					from employee e, product_customization_field_value_mapping p
					where e.company_id = @i_client_id
					  and e.country_code = @i_country_code
					  and e.employee_id = p.field_value1
					  and e.employee_status = 'A'
					  and e.company_id = p.company_id
					  and e.country_code = p.country_code
					  and p.field_name1 = @p_blm
					  and p.value_mapping_code = 'BU'

		if exists ( select 1 from call_register
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and call_ref_no = @p_transaction_ref_no)    /* Change Hold Status */
		begin  
			declare @p_event_date_for_autoassign datetimeoffset(7),					
					@p_inputparam_xml1 nvarchar(max),
					@p_record_timestamp varchar(36),
					@p_update_status varchar(5)

			select @p_record_timestamp = cast(convert(uniqueidentifier,cast(last_update_timestamp as binary)) as varchar(36))	
				from call_register
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @p_transaction_ref_no
		
			select @p_event_date_for_autoassign = DATEADD(minute, 2,sysdatetimeoffset())

			select @p_event_date = CONVERT(varchar(10),@p_event_date_for_autoassign,120)
			select @p_event_hour = substring(CONVERT(varchar(10),@p_event_date_for_autoassign,108),1,2)
			select @p_event_minute = substring(CONVERT(varchar(10),@p_event_date_for_autoassign,108),4,2)
		
			select @p_inputparam_xml1 = '{"date":"'+@p_event_date+'","time_hour":"'+@p_event_hour+'","time_minute":"'+@p_event_minute+'","time_second":"'+@p_event_second+'","comments":"","eventverb_id":"HOLD","from_wf_stage_no":"3","from_wf_status":"I","to_wf_stage_no":"3","to_wf_status":"HO","allow_new_transaction":"true","modify_last_transaction":"true","transaction_type":"CALL","transaction_ref_no":"'+@p_transaction_ref_no+'","channel_id":"mobile","event_date":"'+@p_event_date+'","event_hour":"'+@p_event_hour+'","event_minute":"'+@p_event_minute+'","event_second":"'+@p_event_second+'","event_latitude":"","event_longitude":""}'

			execute sp_save_manage_custom_info @i_session_id,@i_user_id,@i_client_id,@i_locale_id,@i_country_code,'call_status_change_se','','',@p_inputparam_xml1,
			@p_record_timestamp,'A','',@p_update_status OUTPUT,@data, @i_error_msg OUTPUT					
					

				if @o_update_status != 'SP001'
				begin
					select @i_error_msg = 'E_UP_024'
					return
				end

		end

		end


END



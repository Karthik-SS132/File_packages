DROP PROCEDURE IF EXISTS[dbo].[sp_save_manage_custom_info_customer_survey]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_customer_survey] 
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
	
	/* DECLARING THE VARIABLES */
	declare	@p_sysdatetimeoffset datetimeoffset(7),
		@p_overall_feedback int, 
		@p_feedback_ref_id int


	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset
	(
		@i_client_id, 
		@i_country_code, 
		@i_user_id
	)


	/* GETTING THE INPUTPARAMETER VARIABLE VALUES */
	select @p_overall_feedback = json_value(@i_inputparam_header_xml, '$.overall_feedback')

	if exists 
	(
		select 1 from customer_feedback_detail
		where company_id = @i_client_id
			and country_code = @i_country_code
			and activity_ref_no = @i_custom_info_ref_no1
	)
	begin			

		set @i_error_msg = '{"code":"error_feedback_exists"}'
		return

	end


	/* INSERT SUMMARY DATA */
	insert customer_feedback_summary 
	(
		company_id, 
		country_code, 
		activity_ref_no, 
		feedback_date,
		overall_summary_code, 
		overall_summary_code_value,
		summary_code1, 
		summary_code1_value,
		summary_code2, 
		summary_code2_value,
		summary_code3, 
		summary_code3_value,
		summary_code4, 
		summary_code4_value,
		summary_code5, 
		summary_code5_value,
		last_update_id
	)
	select @i_client_id, 
		@i_country_code, 
		@i_custom_info_ref_no1, 
		@p_sysdatetimeoffset,
		'NPS', 
		@p_overall_feedback, 
		'S1', 
		'',
		'S2', 
		'',
		'S3', 
		'',
		'S4', 
		'',
		'S5', 
		'',
		@i_user_id

	if @@ROWCOUNT = 0
	begin

		set @i_error_msg = '{"code":"error_summary_insert"}'
		return

	end


	select @p_feedback_ref_id = feedback_ref_id 
	from customer_feedback_summary
	where company_id = @i_client_id
		and country_code = @i_country_code
		and activity_ref_no = @i_custom_info_ref_no1


	/* INSERT DETAIL DATA */
	insert customer_feedback_detail 
	(
		company_id, 
		country_code, 
		activity_ref_no, 
		feedback_ref_no,
		question_code, 
		question_response_value, 
		last_update_id
	)
	select @i_client_id, 
		@i_country_code, 
		@i_custom_info_ref_no1, 
		@p_feedback_ref_id,
		[key], 
		[value], 
		@i_user_id
	from openjson(@i_inputparam_header_xml)
			
	if @@ROWCOUNT = 0
	begin

		set @i_error_msg = '{"code":"error_detail_insert"}'
		return

	end
					
				
	update ancillary_request_register	
	set	request_wf_stage_no = 4,
		request_status = 'CO',
		last_update_id = @i_user_id
	where company_id = @i_client_id
		and country_code = @i_country_code
		and request_ref_no = @i_custom_info_ref_no1

	if @@ROWCOUNT = 0
	begin

		set @i_error_msg = '{"code":"error_register_update"}'
		return

	end
	

	set @o_update_status = 'SP001'
		
END
GO

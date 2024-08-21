IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_digital_report_notification')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_digital_report_notification]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_digital_report_notification]
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
		@p_transaction_ref_no varchar(30),
		@p_customer_email_id nvarchar(100),
		@p_attachments_string nvarchar(max),
		@p_notification_xml nvarchar(max),
		@p_notification_id int

	
	/* ASSIGN THE VALUES TO THE DECLARED VARIABLES */
	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset
	(
		@i_client_id, 
		@i_country_code, 
		@i_user_id
	)
		
	select @p_transaction_ref_no = json_value(@i_inputparam_header_xml, '$.transaction_ref_no')
	select @p_customer_email_id = json_value(@i_inputparam_header_xml, '$.customer_email_id')
	select @p_attachments_string = json_value(@i_inputparam_header_xml, '$.attachments_string')

	
	/* GENERATE THE NOTIFICATION XML */
	select @p_notification_xml = 
		'<notification_info>' +
			'<call_no>' + @p_transaction_ref_no + '</call_no>' +
			'<call_type>' + dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'CALLTYPE', a.call_type) + '</call_type>' +
			'<call_status>' + a.call_status + '</call_status>' +
			'<call_status_desc>' + dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'CALLSTATUS', a.call_status) +  '</call_status_desc>' +
			'<workflow_stage_no>' + convert(varchar(3), a.call_wf_stage_no) + '</workflow_stage_no>' +
			'<workflow_stage_no_desc>' + 
				isnull
				(
					(
						select x.description 
						from workflow_stage_master x
						where x.company_id = @i_client_id
							and x.country_code = @i_country_code
							and x.transaction_type_code = 'CALL'
							and x.request_category = a.call_category
							and x.workflow_stage_no = a.call_wf_stage_no
					), ''
				) + 
			'</workflow_stage_no_desc>' +
			'<cust_id>' + isnull(c.customer_id, '') + '</cust_id>' +
			'<cust_name>' + isnull(substring(c.customer_name, 1, 20), '') + '</cust_name>' +
			'<cust_contact_name>' + isnull(substring(a.customer_contact_name, 1, 20), '') + '</cust_contact_name>' +
			'<cust_contact_no>' + isnull(a.customer_contact_no, '') + '</cust_contact_no>' +
			'<call_logged_on_date>' + convert(varchar(20), a.created_on_date, 100) + '</call_logged_on_date>' +
			'<call_act_finish_date>' + isnull(convert(varchar(20), act_finish_date, 100), '') + '</call_act_finish_date>' +
			'<description>' + isnull(a.problem_description, '') + '</description>' +
			'<call_closed_by_name>' +
				(
					select isnull
					(
						(
							select c1.title + '.' + c1.first_name + ' ' + isnull(c1.middle_name, '') + ' ' + c1.last_name
							from call_register a1, call_assignment b1, employee c1
							where a1.company_id = @i_client_id
								and a1.country_code = @i_country_code
								and a1.call_ref_no = @p_transaction_ref_no
								and a1.company_id = b1.company_id
								and a1.country_code = b1.country_code
								and b1.call_ref_no = @p_transaction_ref_no
								and b1.primary_resource_ind = 1
								and b1.company_id = c1.company_id
								and b1.country_code = c1.country_code
								and b1.resource_emp_id = c1.employee_id
						), ''
					)
				) + 					
			'</call_closed_by_name>' +
			'<call_closed_by_emp_contact_no>' +
				(
					select isnull
					(
						(
							select c2.contact_mobile_no
							from call_register a2, call_assignment b2, employee c2
							where a2.company_id = @i_client_id
								and a2.country_code = @i_country_code
								and a2.call_ref_no = @p_transaction_ref_no
								and a2.company_id = b2.company_id
								and a2.country_code = b2.country_code
								and a2.call_ref_no = b2.call_ref_no
								and b2.primary_resource_ind = 1
								and b2.company_id = c2.company_id
								and b2.country_code = c2.country_code
								and b2.resource_emp_id = c2.employee_id
						), ''
					)
				) +
			'</call_closed_by_emp_contact_no>' +									
			'<call_closed_by_emp_contact_email>' +
				(
					select isnull
					(
						(
							select c2.email_id
							from call_register a2, call_assignment b2, employee c2
							where a2.company_id = @i_client_id
								and a2.country_code = @i_country_code
								and a2.call_ref_no = @p_transaction_ref_no
								and a2.company_id = b2.company_id
								and a2.country_code = b2.country_code
								and a2.call_ref_no = b2.call_ref_no
								and b2.primary_resource_ind = 1
								and b2.company_id = c2.company_id
								and b2.country_code = c2.country_code
								and b2.resource_emp_id = c2.employee_id
						), ''
					)
				) + 
			'</call_closed_by_emp_contact_email>' +									
			'<additional_information>' + isnull(a.additional_information, '') + '</additional_information>' +
			'<cust_contact_email_id>' + isnull(@p_customer_email_id, '') + '</cust_contact_email_id>' +
			'<asset_id>' + isnull(asset_id, '') + '</asset_id>' +
			'<attachments>' + isnull(@p_attachments_string, '') + '</attachments>' +
			'<support_desk_no>Service Coordinator</support_desk_no>' +
		'</notification_info>'			
	from call_register a left outer join customer c
	on a.company_id = c.company_id
		and a.country_code = c.country_code
		and a.customer_id = c.customer_id
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.call_ref_no = @p_transaction_ref_no
					
					
	execute sp_log_new_notification  
		@i_session_id, 
		@i_user_id, 
		@i_client_id, 
		@i_locale_id, 
		@i_country_code, 
		'CALL_EMAIL_FSR_PDF',
		@p_notification_xml, 
		@i_user_id, 
		@p_notification_id OUTPUT

					
	if @p_notification_id = 0
	begin	

		set @i_error_msg = '{"code":"error_notification_log"}'
		return

	end
	
	set @o_update_status = 'SP001'

END

GO

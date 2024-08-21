/****** Object:  StoredProcedure [dbo].[sp_save_manage_custom_info_geninscc425_form_dynapac_in]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_geninscc425_form_dynapac_in')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_geninscc425_form_dynapac_in]
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_geninscc425_form_dynapac_in] 
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
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_id', 'geninscc425_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.screen_name', 'geninscc425_form')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.allow_new_txn', '1')
	select @i_inputparam_header_xml = json_modify(@i_inputparam_header_xml, '$.modify_last_access', '1')
	
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
	
	
	
	if (@p_file_name like '%geninscc425_form%')
		begin
			
			declare @p_attachments_string nvarchar(max),@p_notification_xml nvarchar(max),@p_notification_id int

			if @p_file_name != ''
								select @p_attachments_string = @p_attachments_string+
															'<attachment>'+@p_file_name+'</attachment>'

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
										'<call_status>'+a.call_status+'</call_status>'+
									   '<call_status_desc>'+
   										case (select 1 from code_table_mlingual_translation f
												where f.company_id = @i_client_id
												  and f.country_code = @i_country_code
												  and f.locale_id = @i_locale_id
												  and f.code_type = 'CALLSTATUS'
												  and f.code = a.call_status)
											when 1 then
											(select e.long_description 
												from code_table_mlingual_translation e
											where e.company_id = @i_client_id
											  and e.country_code = @i_country_code
											  and e.locale_id = @i_locale_id
											  and e.code_type = 'CALLSTATUS'
											  and e.code = a.call_status)
											else
											(select g.long_description from code_table_mlingual_translation g
											where g.company_id = @i_client_id
											  and g.country_code = @i_country_code
											  and g.locale_id = 'ALL'
											  and g.code_type = 'CALLSTATUS'
											  and g.code = a.call_status)
										 end +
										'</call_status_desc>'+
									   '<workflow_stage_no>' + convert(varchar(3), a.call_wf_stage_no) + '</workflow_stage_no>' +
										'<workflow_stage_no_desc>' + 
											isnull((
												select x.description 
												from workflow_stage_master x
												where x.company_id = @i_client_id
													and x.country_code = @i_country_code
													and x.transaction_type_code = 'CALL'
													and x.request_category = a.call_category
													and x.workflow_stage_no = a.call_wf_stage_no ), '') + 
										'</workflow_stage_no_desc>' +
										'<cust_id>'+isnull(c.customer_id,'')+'</cust_id>'+
										'<cust_name>'+isnull(substring(c.customer_name,1,20),'') +'</cust_name>'+
										'<cust_contact_name>'+isnull(substring(a.customer_contact_name,1,20),'') +'</cust_contact_name>'+
										'<cust_contact_no>'+isnull(a.customer_contact_no,'') +'</cust_contact_no>'+
										'<cust_contact_email_id>'+isnull(a.customer_contact_email_id,'') +'</cust_contact_email_id>'+
										'<call_logged_on_date>'+CONVERT(varchar(20),a.created_on_date,100)+'</call_logged_on_date>'+
										'<call_act_finish_date>'+isnull(convert(varchar(20),act_finish_date,100),'')
												+'</call_act_finish_date>'+
										'<description>'+isnull(a.problem_description,'')+'</description>'+
										'<call_closed_by_name>'+
													(select isnull((select c1.title+'.'+c1.first_name+' '+isnull(c1.middle_name,'')+' '+c1.last_name
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
													  and b1.resource_emp_id = c1.employee_id),''))	  					
												+'</call_closed_by_name>'+
												'<call_closed_by_emp_contact_no>'+
													(select isnull((select c2.contact_mobile_no
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
													  and b2.resource_emp_id = c2.employee_id),''))	  					
												+'</call_closed_by_emp_contact_no>'+									
												'<call_closed_by_emp_contact_email>'+
													(select isnull((select c2.email_id
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
													  and b2.resource_emp_id = c2.employee_id),''))	  					
												+'</call_closed_by_emp_contact_email>'+									
										'<additional_information>'+isnull(a.additional_information,'')+'</additional_information>'+												 
										--'<cust_contact_email_id>'+ISNULL(@p_customer_email_id,'')+'</cust_contact_email_id>'+
										'<asset_id>'+ISNULL(asset_id,'')+'</asset_id>'+
										'<attachments>'+
										isnull(@p_attachments_string,'')+
										'</attachments>'+
										'<support_desk_no>Service Coordinator</support_desk_no>'+
										'</notification_info>'			
					  from call_register a
					  left outer join customer c
					  on a.company_id = c.company_id
						and a.country_code = c.country_code
						and a.customer_id = c.customer_id
					  where a.company_id = @i_client_id
						and a.country_code = @i_country_code
						and a.call_ref_no = @p_transaction_ref_no

				execute sp_log_new_notification  @i_session_id, @i_user_id  , @i_client_id , 
				@i_locale_id , @i_country_code , 'CALL_EMAIL_425_PDF' ,@p_notification_xml, @i_user_id, @p_notification_id OUTPUT	
				if @p_notification_id = 0
						begin	
							set @i_error_msg = 'E_UP_089'
							return
						end	
						
		end


	
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
					
END


GO

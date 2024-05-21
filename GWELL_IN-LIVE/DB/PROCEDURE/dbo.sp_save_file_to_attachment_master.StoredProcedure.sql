DROP PROCEDURE IF EXISTS [dbo].[sp_save_file_to_attachment_master]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
 * Function to save the attached files
 */
CREATE PROCEDURE [dbo].[sp_save_file_to_attachment_master]
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id], 
    @i_project_id [uddt_project_id], 
    @i_task_id [uddt_task_id], 
    @i_attach_level_ind [uddt_varchar_2], 
    @i_inputparam_xml [uddt_nvarchar_max], 
    @i_file_category [uddt_varchar_2], 
    @i_file_type [uddt_varchar_2], 
    @i_file_name [uddt_nvarchar_60], 
    @i_closure_report_ind [uddt_bit], 
    @o_update_status [uddt_varchar_5] OUTPUT,
    @errorNo [errorno] OUTPUT
AS
BEGIN
    /*
     * Input:projectid,taskid,project task level indicator
     * Input detail:list of attached files
     * Logic: Saves the documents with the given project id,task id and project task level indicator
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_update_status = '' /* string */
         @errorNo = ''	/* string */
     */

    /*
     * List of errors associated to this stored procedure. Use the text of the error
     * messages printed below as a guidance to set appropriate error number to @errorNo inside the procedure.
     * E_UP_024 - Save Attachments Failed
     * 
     * Use the following SQL statement to set @errorNo:
     * SET @errorNo = 'One of the error numbers associated to this procedure as per list above'
     */


		declare @p_project_status CHAR(1), @p_attachment_file_path nvarchar(100), @p_feature_id varchar(15),
			@p_screen_id varchar(30), @p_file_name varchar(500), @p_allow_newtxn_ind bit,
			@p_screen_name varchar(30), @p_modify_last_access bit,
			@p_by_employee_id nvarchar(12), @p_notification_xml nvarchar(max), @p_inputparam_xml xml,
			@p_notification_id int, @p_customer_email_id nvarchar(100),
			@p_attachments_string nvarchar(max), @p_from_wf_stage_no tinyint, @p_from_call_status varchar(2),
			@p_event_date datetimeoffset(7), @p_online_offline_ind varchar(1) 

		set @p_inputparam_xml = CAST(@i_inputparam_xml as XML)
		
			
		create table #input_params (
			paramname varchar(50) not null,
			paramval nvarchar(60) null
		)
		
  
		insert #input_params (
			paramname, paramval
		)
		SELECT nodes.value('local-name(.)', 'varchar(50)'),
			nodes.value('(.)[1]', 'varchar(50)')
		FROM @p_inputparam_xml.nodes('/inputparam/*') AS Tbl(nodes)
		
	  
		select @p_online_offline_ind = paramval 
		from #input_params
		where paramname = 'online_offline_ind'
		
		select @p_by_employee_id = employee_id
		from users
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id
		
		
		if(@i_attach_level_ind = 'C')
		begin

			/* Update attachments - multi attachment insert - pending - Chak 4.Mar.15 */
			if @i_file_name != ''
			begin

				select @p_attachment_file_path = code
				from code_table
				where company_id = @i_client_id
					and country_code = @i_country_code
					and code_type = 'CALLATTACHPATH'

				if not exists ( select 1 from category_type_link b
								where b.company_id = @i_client_id
									and b.country_code = @i_country_code
									and b.link_type = 'FA'
									and b.category_code_type = 'FILECATG'
									and b.category_code_value = @i_file_category
									and b.type_code_type = 'FILEEXTNALLOWED'
									and b.type_code_value = 
									substring(ltrim(rtrim(@i_file_name)),len(ltrim(rtrim(@i_file_name))) - charindex('.', reverse(ltrim(rtrim(@i_file_name))))+1, LEN(ltrim(rtrim(@i_file_name)))))
				begin
					select @errorNo = 'E_UP_024'
					return
				end

				insert call_user_attachments
					(company_id, country_code, call_ref_no,
					attachment_file_category, attachment_file_type, 
					attachment_file_name, attachment_file_path, closure_report_ind,last_update_id)
				select @i_client_id, @i_country_code,
					@i_project_id, 
					@i_file_category, @i_file_type, @i_file_name, 
					@p_attachment_file_path, @i_closure_report_ind, @i_user_id

				update call_user_attachments
				set attachment_file_id = attachment_file_category+attachment_file_type+REPLACE(str(attachment_file_sysgen_id,5,0),' ','0')
				where company_id = @i_client_id
					and country_code = @i_country_code
					and call_ref_no = @i_project_id
					and attachment_file_name = @i_file_name 

				if @@ROWCOUNT = 0
				begin
					set @errorNo = 'E_UP_024'
					return
				end
				
				
				select @p_file_name = @i_file_name 
								
				if (CHARINDEX('_jsa', @p_file_name) > 0)
				begin
					select @p_screen_id = 'jsa_form'
					set @p_screen_name = 'JSA Form'
					set @p_allow_newtxn_ind = 0
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_eicl', @p_file_name) > 0)
				begin
					select @p_screen_id = 'eicl_form'
					set @p_screen_name = 'EICL Form'
					set @p_allow_newtxn_ind = 0
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_fir', @p_file_name) > 0)
				begin
					select @p_screen_id = 'field_inspection_form'
					set @p_screen_name = 'Field Inspection Form'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end				
				else if (CHARINDEX('_camc', @p_file_name) > 0)
				begin
					select @p_screen_id = 'camc_form'
					set @p_screen_name = 'New FSR Form'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 0
				end
				else if (CHARINDEX('_comm_fsr', @p_file_name) > 0)
				begin
					select @p_screen_id = 'comm_fsr_form'
					set @p_screen_name = 'Commissioning FSR Form'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_failure_analysis_report', @p_file_name) > 0)
				begin
					select @p_screen_id = 'failure_analysis_report'
					set @p_screen_name = 'Failure Analysis Report'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_comm', @p_file_name) > 0)
				begin
					select @p_screen_id = 'comm_form'
					set @p_screen_name = 'Commissioning Form'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_ig_visit', @p_file_name) > 0)
				begin
					select @p_screen_id = 'ig_visit_form'
					set @p_screen_name = 'IG Visit Form'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_spm', @p_file_name) > 0)
				begin
					select @p_screen_id = 'spm_form'
					set @p_screen_name = 'SPM Report'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_visit_report', @p_file_name) > 0)
				begin
					select @p_screen_id = 'visit_report_form'
					set @p_screen_name = 'Visit Report'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_fsr_form', @p_file_name) > 0)
				begin
					select @p_screen_id = 'fsr_form'
					set @p_screen_name = 'Field Service Form'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_fsr', @p_file_name) > 0)
				begin
					select @p_screen_id = 'field_service_form'
					set @p_screen_name = 'Field Service Form'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 0
				end
				else if (CHARINDEX('_water_test', @p_file_name) > 0)
				begin
					select @p_screen_id = 'water_test_form'
					set @p_screen_name = 'Water Test Report'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_service_report_thermax', @p_file_name) > 0)
				begin
					select @p_screen_id = 'service_report_thermax_form'
					set @p_screen_name = 'Thermax - Service Report'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_service_report_sterling', @p_file_name) > 0)
				begin
					select @p_screen_id = 'service_report_sterling_form'
					set @p_screen_name = 'Sterling - Service Report'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_AII_report_acopco', @p_file_name) > 0)
				begin
					select @p_screen_id = 'AII_report_acopco_form'
					set @p_screen_name = 'AII Report'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_AIP_report_acopco', @p_file_name) > 0)
				begin
					select @p_screen_id = 'AIP_report_acopco_form'
					set @p_screen_name = 'AIP Report'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_SPM_check_report', @p_file_name) > 0)
				begin
					select @p_screen_id = 'SPM_check_report_form'
					set @p_screen_name = 'SPM Check Report'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else if (CHARINDEX('_sales_flow', @p_file_name) > 0)
				begin
					select @p_screen_id = 'sales_flow_form'
					set @p_screen_name = 'Sales Flow Form'
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				else
				begin
					select @p_screen_id = ''
					set @p_allow_newtxn_ind = 1
					set @p_modify_last_access = 1
				end
				
				if @p_screen_id != ''
				begin
				
					select @p_from_wf_stage_no = call_wf_stage_no,
						   @p_from_call_status = call_status 
					from call_register
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and call_ref_no = @i_project_id					
					    	
					if @p_online_offline_ind = 'F'
					begin
						set @p_event_date = CONVERT(datetimeoffset, 
							(select paramval from #input_params where paramname = 'event_date') + ' ' + 
							(select paramval from #input_params where paramname = 'event_hour') + ':' + 
							(select paramval from #input_params where paramname = 'event_minute') + ':00.000', 121)
					end
					else
					begin
						set @p_event_date = SYSDATETIMEOFFSET()
					end
				
					insert call_status_event_log
					(
						company_id, country_code, call_ref_no,
						channel_id, eventverb_id,
						from_wf_stage_no, to_wf_stage_no,
						event_date, to_status, from_status,
						by_employee_id, last_update_id
					)
					select @i_client_id, @i_country_code, @i_project_id,
							'Mobile', @p_screen_name,
							@p_from_wf_stage_no, @p_from_wf_stage_no,
							@p_event_date, @p_from_call_status, @p_from_call_status,
							@p_by_employee_id, @i_user_id								
					
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
								@i_project_id,
								'0',
								@p_feature_id,
								@p_allow_newtxn_ind,
								'MOBILE',
								@o_update_status OUTPUT	

						if @o_update_status = 'ERROR'
						begin
							set @errorNo = 'E_UP_024'
							return
						end
					end
				end
			end

		end

		if @i_file_name like '%_FSR%'
			or
			@i_file_name like '%_FIR%'
			or
			@i_file_name like '%_camc%'
			or
			@i_file_name like '%_visit_report_form%'
		begin
			
			select @p_customer_email_id = 	paramval 
			from #input_params 
			where paramname = 'customer_email_id'
			
			select @p_file_name = 'call_attachments/'+@i_project_id+'/'+@i_file_name

			select @p_attachments_string = '<attachment>'+@p_file_name+'</attachment>'
			
			if @i_file_name like '%_FSR%'
				or
				@i_file_name like '%_camc%'
				or
			    @i_file_name like '%_visit_report_form%'
			begin
			
				if exists ( select attachment_file_name 
							from call_user_attachments
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and call_ref_no = @i_project_id
							  and attachment_file_sysgen_id =
								(
								select max(b.attachment_file_sysgen_id)
								from call_user_attachments b
								where b.company_id = @i_client_id
								  and b.country_code = @i_country_code
								  and b.call_ref_no = @i_project_id
								  and b.attachment_file_name like '%_jsa.pdf'
								  
								) 
							)
				begin
							select @p_file_name = ''
							
							select @p_file_name = 'call_attachments/'+@i_project_id+'/'+attachment_file_name 
							from call_user_attachments
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and call_ref_no = @i_project_id
							  and attachment_file_sysgen_id =
								(
								select max(b.attachment_file_sysgen_id)
								from call_user_attachments b
								where b.company_id = @i_client_id
								  and b.country_code = @i_country_code
								  and b.call_ref_no = @i_project_id
								  and b.attachment_file_name like '%_jsa.pdf'
								  
								) 
							
							if @p_file_name != ''
								select @p_attachments_string = @p_attachments_string+
															'<attachment>'+@p_file_name+'</attachment>'
				
				end
			end
			 select @p_notification_xml = '<notification_info>'+
										'<call_no>'+@i_project_id+'</call_no>'+
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
													  and a1.call_ref_no = @i_project_id
													  and a1.company_id = b1.company_id
													  and a1.country_code = b1.country_code
													  and b1.call_ref_no = @i_project_id
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
													  and a2.call_ref_no = @i_project_id
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
													  and a2.call_ref_no = @i_project_id
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
						and a.call_ref_no = @i_project_id
					
					
					execute sp_log_new_notification  @i_session_id, @i_user_id  , @i_client_id , 
					  @i_locale_id , @i_country_code , 'CALL_EMAIL_VR_PDF' ,@p_notification_xml, @i_user_id, @p_notification_id OUTPUT
					
					if @p_notification_id = 0
					begin	
						set @errorNo = 'E_UP_089'
						return
					end			
		end
		
		if @i_file_name like '%_feedback%'
		begin
			if not exists (
				select 1 from customer_feedback_detail
				where company_id = @i_client_id
					and country_code	 = @i_country_code
					and activity_ref_no	 = @i_project_id
			)
			begin
				declare @p_question_response_value int,
				@p_assign_to_emp_id nvarchar(12)

				create table #input_params_feedback (
					paramname varchar(50) not null,
					paramval nvarchar(1000) null
				)
		
				insert #input_params_feedback (
					paramname, paramval
				)
				SELECT nodes.value('local-name(.)', 'varchar(50)'),
					nodes.value('(.)[1]', 'varchar(1000)')
				FROM @p_inputparam_xml.nodes('/feedback_form/service_feedback/*') AS Tbl(nodes)
				
				insert #input_params_feedback (
					paramname, paramval
				)
				SELECT nodes.value('local-name(.)', 'varchar(50)'),
					nodes.value('(.)[1]', 'varchar(1000)')
				FROM @p_inputparam_xml.nodes('/feedback_form/commissioning/*') AS Tbl(nodes)
				
				select @p_question_response_value = paramval  from #input_params_feedback where paramname = 'loyaltyslideroverallslider'

				insert customer_feedback_summary (
					company_id, country_code, activity_ref_no, feedback_date,
					overall_summary_code, overall_summary_code_value,
					summary_code1, summary_code1_value,
					summary_code2, summary_code2_value,
					summary_code3, summary_code3_value,
					summary_code4, summary_code4_value,
					summary_code5, summary_code5_value,
					last_update_id
				)
				select @i_client_id, @i_country_code, @i_project_id, SYSDATETIMEOFFSET(),
					'NPS', @p_question_Response_value, 
					'S1', '',
					'S2', '',
					'S3', '',
					'S4', '',
					'S5', '',
					@i_user_id

				insert customer_feedback_detail (
					company_id, country_code, activity_ref_no, feedback_ref_no,
					question_code, question_response_value, last_update_id
				)
				select @i_client_id, @i_country_code, @i_project_id, 
					(
						select feedback_ref_id from customer_feedback_summary
						where company_id = @i_client_id
							and country_code = @i_country_code
							and activity_ref_no = @i_project_id
					),
					paramname, paramval, @i_user_id
				from #input_params_feedback		
				

						/* For Notification */
						select @p_assign_to_emp_id = 
								(select top(1) resource_emp_id 
										from  call_assignment 
											where call_ref_no = @i_project_id order by assigned_on_date asc)



						 select @p_notification_xml = '<notification_info>'+
									'<call_no>'+@i_project_id+'</call_no>'+
									'<responsiveslider>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'responsiveslider'),'')
									+'</responsiveslider>'+
									  '<communicationslider>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'communicationslider'),'')
									+'</communicationslider>'+
									  '<preparationslider>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'preparationslider'),'')
									+'</preparationslider>'+
									'<durationslider>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'durationslider'),'')
									+'</durationslider>'+
									'<qualityslider>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'qualityslider'),'')
									+'</qualityslider>'+
									'<invoiceaccuracyslider>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'invoiceaccuracyslider'),'')
									+'</invoiceaccuracyslider>'+
									'<loyaltyslideroverallslider>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'loyaltyslideroverallslider'),'')
									+'</loyaltyslideroverallslider>'+
									'<loyaltysliderrepurshaseslider>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'loyaltysliderrepurshaseslider'),'')
									+'</loyaltysliderrepurshaseslider>'+
									'<responsive_below>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'responsive_below'),'')
									+'</responsive_below>'+
									'<communication_below>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'communication_below'),'')
									+'</communication_below>'+
									'<preparation_below>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'preparation_below'),'')
									+'</preparation_below>'+
										'<invoiceaccuracy_below>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'invoiceaccuracy_below'),'')
									+'</invoiceaccuracy_below>'+
										'<loyaltysliderrepurshase_below>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'loyaltysliderrepurshase_below'),'')
									+'</loyaltysliderrepurshase_below>'+
										'<loyaltysliderreferralslider>'+
											isnull((select paramval  from #input_params_feedback where paramname = 'loyaltysliderreferralslider'),'')
									+'</loyaltysliderreferralslider>'+
									'<assigned_to_emp_id>'+
											isnull(@p_assign_to_emp_id	,'')  					
									+'</assigned_to_emp_id>'+
									'<assigned_to_emp_name>'+
									isnull((
										select title+' '+first_name+' '+last_name
										from employee b
										where b.company_id = @i_client_id
										  and b.country_code = @i_country_code
										  and b.employee_id = @p_assign_to_emp_id
									),'')
									+'</assigned_to_emp_name>'+
									'<assigned_to_emp_contact_no>'+
									isnull((
										select b2.contact_mobile_no
										from employee b2
										where b2.company_id = @i_client_id
										  and b2.country_code = @i_country_code
										  and b2.employee_id = @p_assign_to_emp_id	
									),'')
									+'</assigned_to_emp_contact_no>'+												 
									'<support_desk_no>Service Coordinator</support_desk_no>'+
									'</notification_info>'	

							execute sp_log_new_notification  @i_session_id, @i_user_id  , @i_client_id , 
						    @i_locale_id , @i_country_code , 'CALL_FEEDBACK_EMAIL' ,@p_notification_xml, @i_user_id, @p_notification_id OUTPUT
				
						if exists (
									select 1 from ancillary_request_register
									where company_id = @i_client_id
										and country_code	 = @i_country_code
										and request_ref_no = 'CS'+@i_project_id
										and request_wf_stage_no = '1'
										and request_status = 'O'
									)
									begin
										if (@p_question_Response_value < 7)
											begin
												update ancillary_request_register	
												set	request_status = 'AC',
													udf_date_1 = SYSDATETIMEOFFSET(),
													last_update_id = @i_user_id
												where company_id = @i_client_id
												and country_code = @i_country_code
												and request_ref_no = 'CS'+@i_project_id
												
												insert ancillary_request_status_event_log
												(
													company_id, country_code, request_ref_no,
													channel_id,
													eventverb_id,
													from_wf_stage_no,
													to_wf_stage_no,
													event_date, to_status, from_status,
													by_employee_id, 
													to_employee_id_string,
													comments, 
													reason_code,
													lattitude_value,
													longitude_value,
													last_update_id
												)
												select @i_client_id, @i_country_code, 'CS'+@i_project_id,
														'WEB',
														'ACTIONREQUIRED',
														'1',
														'1',
														SYSDATETIMEOFFSET(), 
														'AC', 'O',
														'',
														'', 
														isnull((select paramval  from #input_params_feedback where paramname = 'additional_comments'),''),
														'',
														'',
														'',
														@i_user_id
											end
										else
											begin
												update ancillary_request_register	
												set	request_wf_stage_no = 2,
													request_status = 'CL',
													udf_date_1 = SYSDATETIMEOFFSET(),
													last_update_id = @i_user_id
												where company_id = @i_client_id
												and country_code = @i_country_code
												and request_ref_no = 'CS'+@i_project_id  
												
												insert ancillary_request_status_event_log
												(
													company_id, country_code, request_ref_no,
													channel_id,
													eventverb_id,
													from_wf_stage_no,
													to_wf_stage_no,
													event_date, to_status, from_status,
													by_employee_id, 
													to_employee_id_string,
													comments, 
													reason_code,
													lattitude_value,
													longitude_value,
													last_update_id
												)
												select @i_client_id, @i_country_code, 'CS'+@i_project_id,
														'WEB',
														'CLOSE',
														'1',
														'1',
														SYSDATETIMEOFFSET(), 
														'CL', 'O',
														'',
														'', 
														isnull((select paramval  from #input_params_feedback where paramname = 'additional_comments'),''),
														'',
														'',
														'',
														@i_user_id
											end
										end		
									else
										begin
											set @errorNo = 'E_UP_024'
											return
										end
					/* End */

			end
			else
			begin
				set @errorNo = 'E_UP_024'
				return
			end
		end

		select @o_update_status = 'SP001'		

    SET NOCOUNT OFF;
END






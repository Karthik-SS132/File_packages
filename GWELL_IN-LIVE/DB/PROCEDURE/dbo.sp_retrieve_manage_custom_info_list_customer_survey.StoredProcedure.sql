/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_customer_survey]    Script Date: 15/2/2023 10:48:00 AM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_customer_survey')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_customer_survey]
END
GO
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_customer_survey]    Script Date: 15/2/2023 10:48:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of custom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_customer_survey]
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
    /*
     * Function to retrieve list of ciustom info records
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_retrieve_status = '' /* string */
     */

    /*
    -- The following SQL snippet illustrates selection of result sets expected from this stored procedure: 
    
    -- Result set 1: custom_info_list

    SELECT
        '' as custom_info_list, /* dummy column aliased by result set name */
        '' as o_custom_info_json /* unicode string */
    FROM <Table name>
    */

	
	declare @p_inputparam_xml xml, @p_skip varchar(10), @p_take varchar(10),
	@o_udf_char_1 bit,	@o_udf_char_2 bit,	@o_udf_char_3 bit,	@o_udf_char_4  bit,
	@o_udf_bit_1 bit,	@o_udf_bit_2 bit,	@o_udf_bit_3 bit,	@o_udf_bit_4 bit,
	@o_udf_float_1 bit,	@o_udf_float_2 bit,	@o_udf_float_3 bit,	@o_udf_float_4 bit,
	@o_udf_date_1 bit,	@o_udf_date_2 bit,	@o_udf_date_3  bit,	@o_udf_date_4  bit,
	@o_udf_analysis_code1 bit,	@o_udf_analysis_code2 bit,	@o_udf_analysis_code3 bit,
	@o_udf_analysis_code4 bit,
	@p_offset_count int, @p_rowcount int,@p_employee_id varchar(30),@p_user_group_id varchar(30),
	@p_organogram_level_code nvarchar(15),@p_date_type_filter varchar(2)

		select @p_employee_id = u.employee_id from users u where
											u.company_id = @i_client_id
											and u.country_code = @i_country_code
											and u.user_id = @i_user_id
		select @p_user_group_id = ug.user_group_id from users ug where
											ug.company_id = @i_client_id
											and ug.country_code = @i_country_code
											and ug.user_id = @i_user_id
		select @p_organogram_level_code = e.organogram_level_code from employee e where
											e.company_id = @i_client_id
											and e.country_code = @i_country_code
											and e.employee_id = @p_employee_id

	set @p_inputparam_xml = CAST(@i_inputparam_xml as XML)

		create table #inputparams
	(
		paramname varchar(50) not null,
		paramval varchar(50) null
	)

	insert #inputparams
	(
		paramname, 
		paramval
	)
	select nodes.value('local-name(.)', 'varchar(50)'),
		nodes.value('(.)[1]', 'varchar(50)')
	from @p_inputparam_xml.nodes('/inputparam/*') as Tbl(nodes)


	update #inputparams
	set paramval = null 
	where paramval = 'ALL'
		or paramval = ''
	
	update #inputparams
     set paramval = null
     where paramname in ( 'from_date_filter','to_date_filter')
       and paramval = null
	
	

	select @p_date_type_filter = paramval from #inputparams where paramname = 'date_type_filter'
	
	if @p_date_type_filter is null set @p_date_type_filter = '%'													 

	select @p_skip = paramval from #inputparams where paramname = 'skip'

	select @p_take = paramval from #inputparams where paramname = 'take'


	if 	@p_skip = '%' select @p_skip = 0
	if  @p_take = '%' select @p_take = 0
	
	select @p_offset_count = @p_skip

	if @p_take = 0
		select @p_rowcount = count(*) 
		from ancillary_request_register
		where company_id = @i_client_id
			and country_code = @i_country_code
	else
		select @p_rowcount = cast(@p_take as int)



			select '' as custom_info_list,
					'{' +
					'"total":"'+ convert(varchar(12), count(*) over()) +'",'+
					'"cust_id":"'+ isnull(a.customer_id,'ZZZ')+'",'+
					'"cust_name":"'+ 
					  isnull(( select customer_name 
					  from customer c1
					  where c1.company_id = @i_client_id
						and c1.country_code = @i_country_code
						and c1.customer_id = a.customer_id),'')+'",'+
						'"equipt_id":"'+isnull(c.equipment_id,'')+'",'+
					 isnull((select '"equipment_group":"'+ISNULL(eq.equipment_category,'')+'",'+
					'"equipment_sub_group":"'+ ISNULL(eq.equipment_type,'') + '",'
				  from equipment eq, vt_call_register c
				  where eq.company_id = c.company_id
				   and  eq.country_code	= c.country_code
				   and  eq.equipment_id	= c.equipment_id
				   and c.call_ref_no = a.job_order_no
				), 
				'"equipment_group":"", "equipment_sub_group":"",') +
					'"asst_id":"'+c.asset_id+'",'+
					'"call_type":"'+c.call_type+'",'+
					'"call_type_description":"'+ isnull( (
							case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CALLTYPE'
								and f.code = call_type)
							when 1 then
							(select e.long_description 
							from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'CALLTYPE'
								and e.code = call_type)
							else
							(select g.long_description from code_table_mlingual_translation g
							where g.company_id = @i_client_id
								and g.country_code = @i_country_code
								and g.locale_id = 'ALL'
								and g.code_type = 'CALLTYPE'
								and g.code = call_type)
							end),'asas') +'",'+	   
				   '"request_ref_no":"'+a.request_ref_no+'",'+ 
				   '"request_category":"'+a.request_category+'",'+
				   '"request_category_desc":"'+ (
					case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLCATG'
						and f.code = request_category)
					when 1 then
					(select e.long_description 
					from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLCATG'
						and e.code = request_category)
					else
					(select g.long_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLCATG'
						and g.code = request_category)
					end) +'",'+
			   '"request_type":"'+a.request_type+'",'+
			   '"asset_id":"'+isnull(a.udf_char_1,'')+'",'+
			   '"equipment_id":"'+isnull(a.udf_char_2,'')+'",'+
			   '"problem_desc":"'+isnull(a.requirement,'')+'",'+
				'"request_type_desc":"'+ (
					case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLTYPE'
						and f.code = request_type)
					when 1 then
					(select e.long_description 
					from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLTYPE'
						and e.code = request_type)
					else
					(select g.long_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLTYPE'
						and g.code = request_type)
					end) +'",'+
				   '"request_status":"'+a.request_status+'",'+
				   '"billable_nonbillable_ind":"'+a.billable_nonbillable_ind+'",'+
				   '"call_status_desc":"'+
	   				case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
							  and f.country_code = @i_country_code
							  and f.locale_id = @i_locale_id
							  and f.code_type = 'CALLSTATUS'
							  and f.code = a.request_status)
						when 1 then
						(select e.long_description 
							from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						  and e.country_code = @i_country_code
						  and e.locale_id = @i_locale_id
						  and e.code_type = 'CALLSTATUS'
						  and e.code = a.request_status)
						else
						(select g.long_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						  and g.country_code = @i_country_code
						  and g.locale_id = 'ALL'
						  and g.code_type = 'CALLSTATUS'
						  and g.code = a.request_status)
					 end +
					'",'+
				   '"workflow_stage_no":"' + convert(varchar(3), a.request_wf_stage_no) + '",' +
				   '"workflow_stage_no_desc":"' + 
						isnull((
							select x.description 
							from workflow_stage_master x
							where x.company_id = @i_client_id
								and x.country_code = @i_country_code
								and x.transaction_type_code = 'CALL'
								and x.request_category = a.request_category
								and x.workflow_stage_no = a.request_wf_stage_no ), '') + 
					'",' +
				   '"priority_cd":"'+a.priority_code+'",'+
				   '"cust_contact_name":"'+isnull(a.customer_contact_name,'')+'",'+
				   '"cust_contact_no":"'+isnull(a.customer_contact_no,'')+'",'+
				   '"cust_contact_email":"'+isnull(a.customer_contact_email_id,'')+'",'+
				   '"company_location_code":"'+isnull(a.company_location_code,'')+'",'+
				   '"org_level_no":"'+ cast(a.organogram_level_no as varchar(3))+'",'+
				   '"org_level_code":"'+isnull(a.organogram_level_code,'') +'",'+
				   '"created_employee":"'+isnull((select e.first_name+' '+e.last_name from employee e
								where e.company_id = @i_client_id
								and e.country_code  = @i_country_code
								and e.employee_id = a.created_by_employee_id) ,'') +'",'+
				   '"created_by_employee_id":"'+isnull(a.created_by_employee_id,'')+'",'+
				   '"created_by_employee_name":"'+ISNULL(
										( select c1.first_name+' '+c1.last_name
											from employee c1
											where c1.company_id = @i_client_id
											  and c1.country_code = @i_country_code
											  and c1.employee_id = a.created_by_employee_id),'')+'",'+
		  
				   '"created_on_date":"'+isnull(CONVERT(varchar(10),a.created_on_date,120),'')+'",'+
				   '"closed_on_date":"'+isnull(CONVERT(varchar(10),a.closed_on_date,120),'')+'",'+
				   '"created_on_hour":"'+isnull(substring(CONVERT(varchar(10),a.created_on_date,108),1,2),'')+'",'+
				   '"created_on_minute":"'+isnull(substring(CONVERT(varchar(10),a.created_on_date,108),4,2),'')+'",'+       
				   '"sch_start_on_date":"'+isnull(CONVERT(varchar(10),a.sch_start_date,120),'')+'",'+
				   '"sch_start_on_hour":"'+isnull(substring(CONVERT(varchar(10),a.sch_start_date,108),1,2),'')+'",'+
				   '"sch_start_on_minute":"'+isnull(substring(CONVERT(varchar(10),a.sch_start_date,108),4,2),'')+'",'+       
				   '"sch_finish_on_date":"'+isnull(CONVERT(varchar(10),a.sch_finish_date,120),'')+'",'+
				   '"sch_finish_on_hour":"'+isnull(substring(CONVERT(varchar(10),a.sch_finish_date,108),1,2),'')+'",'+
				   '"sch_finish_on_minute":"'+isnull(substring(CONVERT(varchar(10),a.sch_finish_date,108),4,2),'')+'",'+       
				   '"act_start_on_date":"'+isnull(CONVERT(varchar(10),a.act_start_date,120),'')+'",'+
				   '"act_start_on_hour":"'+isnull(substring(CONVERT(varchar(10),a.act_start_date,108),1,2),'')+'",'+
				   '"act_start_on_minute":"'+isnull(substring(CONVERT(varchar(10),a.act_start_date,108),4,2),'')+'",'+       
				   '"act_finish_on_date":"'+isnull(CONVERT(varchar(10),a.act_finish_date,120),'')+'",'+
				   '"act_finish_on_hour":"'+isnull(substring(CONVERT(varchar(10),a.act_finish_date,108),1,2),'')+'",'+
				   '"act_finish_on_minute":"'+isnull(substring(CONVERT(varchar(10),a.act_finish_date,108),4,2),'')+'",'+      
				   '"plan_duration":"'+isnull(CAST(a.plan_duration as varchar(8)),'')+'",'+
				   '"plan_duration_uom":"'+isnull(CAST(a.plan_duration_uom as varchar(3)),'')+'",'+
				   '"plan_work":"'+isnull(CAST(a.plan_work as varchar(8)),'')+'",'+
				   '"plan_work_uom":"'+isnull(CAST(a.plan_work_uom as varchar(3)),'')+'",'+
				   '"act_duration":"'+isnull(CAST(a.actual_duration as varchar(8)),'')+'",'+
				   '"act_work":"'+isnull(CAST(a.actual_work as varchar(8)),'')+'",'+
				   '"job_order_no":"'+isnull(a.job_order_no,'')+'",'+
				   '"no_response_count":"'+ isnull(CAST((select count(eventverb_id) From ancillary_request_status_event_log
															where company_id = @i_client_id
															and country_code = @i_country_code
															and request_ref_no = a.request_ref_no
															and eventverb_id = 'NORESPONSE')as varchar(3)),'0')+'",'+
				   '"call_category":"'+ isnull(( select cr.call_category From call_register cr
															where cr.company_id = @i_client_id
															and cr.country_code = @i_country_code
															and cr.call_ref_no = a.job_order_no),'')+'",'+
				   '"call_status":"'+ isnull(( select cr.call_status From call_register cr
															where cr.company_id = @i_client_id
															and cr.country_code = @i_country_code
															and cr.call_ref_no = a.job_order_no),'')
												+'",'+
				   '"call_act_finish_on_date":"'+ isnull(( select isnull(CONVERT(varchar(10),cr.act_finish_date,120),'') From call_register cr
															where cr.company_id = @i_client_id
															and cr.country_code = @i_country_code
															and cr.call_ref_no = a.job_order_no),'')
												+'",'+
				   '"feedback_submit_date":"'+isnull(CONVERT(varchar(10),a.udf_date_1,120),'')+'",'+
				   '"additional_information":"'+ISNULL(a.additional_information,'')+'",'+
				isnull((case isnull(cast((select MAX(b2.assigned_on_date )
									from ancillary_request_assignment b2
									where b2.company_id = @i_client_id
									and b2.country_code = @i_country_code
									and b2.request_ref_no = a.request_ref_no	) as varchar(30)),'')
									  
							
				 when '' then '"assigned_to_emp_id":"","assigned_to_emp_name":"","assignee_mapped_to_emp_id":"","assigneee_reporting_to_emp_id":"",'
				 else ( select top(1) '"assigned_to_emp_id":"'+isnull(b1.resource_emp_id,'')+'",'+
									  '"assigned_to_emp_name":"'+ISNULL(
										( select c.title+' '+c.first_name+' '+c.last_name
											from employee c
											where c.company_id = @i_client_id
											  and c.country_code = @i_country_code
											  and c.employee_id = b1.resource_emp_id),'')+'",'+
										'"assignee_mapped_to_emp_id":"'+
												isnull( (select isnull(x.mapped_to_employee_id,'')
													from functional_role_employee x
													where x.company_id = @i_client_id
													  and x.country_code = @i_country_code
													  and x.employee_id = b1.resource_emp_id
												),'')+'",'+
										'"assigneee_reporting_to_emp_id":"'+
											isnull( (select isnull(y.reporting_to_employee_id,'')
												from functional_role_employee y
												where y.company_id = @i_client_id
												  and y.country_code = @i_country_code
												  and y.employee_id = b1.resource_emp_id
											),'')+'",'
						from ancillary_request_assignment b1
						where b1.company_id = @i_client_id
						  and b1.country_code = @i_country_code
						  and b1.request_ref_no = a.request_ref_no
						  and b1.primary_resource_ind = 1
						  and b1. assigned_on_date = (select MAX(b2.assigned_on_date )
									from ancillary_request_assignment b2
									where b2.company_id = @i_client_id
									and b2.country_code = @i_country_code
									and b2.request_ref_no = a.request_ref_no	)
						)
				 end
				 ),'"assigned_to_emp_id":"","assigned_to_emp_name":"","assignee_mapped_to_emp_id":"","assigneee_reporting_to_emp_id":"",')+
			    '"call_mapped_to_emp_id":"'+ISNULL(a.call_mapped_to_employee_id,'')+'",'+
				'"additional_comments":"'+ISNULL((select question_response_value
													from customer_feedback_detail
													where company_id = @i_client_id
														and country_code = @i_country_code
														and 'CS'+ activity_ref_no = request_ref_no
														and question_code = 'additional_comments'),'')+'",'+
				'"cust_type":"'+isnull ((SELECT 
													CASE 
														WHEN question_response_value  BETWEEN 7 AND 10 THEN 'Promoter'
														WHEN question_response_value BETWEEN 5 AND 7 THEN 'Neutral'
														WHEN question_response_value  BETWEEN 0 AND 5 THEN 'Detractor'
														ELSE ''
													END
												FROM customer_feedback_detail cfd
												where cfd.company_id = @i_client_id
													and cfd.country_code = @i_country_code
													and 'CS'+cfd.activity_ref_no = a.request_ref_no
													and cfd.question_code = 'overall_feedback'),'')+'",'+
				
				(case 
					(select 1 from ancillary_request_status_event_log arse
							where arse.company_id = @i_client_id
								and arse.country_code = @i_country_code
								and arse.request_ref_no = a.request_ref_no
								and arse.eventverb_id = 'ACTIONREQUIRED') 
				when 1 then 
				'"anc_req_evt_log_comments":"'+ISNULL((select arse.comments from ancillary_request_status_event_log arse
															where arse.company_id = @i_client_id
																and arse.country_code = @i_country_code
																and arse.request_ref_no = a.request_ref_no
																and arse.eventverb_id = 'CLOSE'),'')+'",'
				else '"anc_req_evt_log_comments":"'+ '' +'",' end)+
				(case
					(select 1 from ancillary_request_status_event_log arse
							where arse.company_id = @i_client_id
								and arse.country_code = @i_country_code
								and arse.request_ref_no = a.request_ref_no
								and arse.eventverb_id = 'ACTIONREQUIRED') 
				when 1 then
				   '"anc_req_evt_log_date":"'+isnull(CONVERT(varchar(10),(select arse.event_date from ancillary_request_status_event_log arse
															where arse.company_id = @i_client_id
																and arse.country_code = @i_country_code
																and arse.request_ref_no = a.request_ref_no
																and arse.eventverb_id = 'CLOSE'),120),'')+'",'+
				   '"anc_req_evt_log_hour":"'+isnull(substring(CONVERT(varchar(10),(select arse.event_date from ancillary_request_status_event_log arse
															where arse.company_id = @i_client_id
																and arse.country_code = @i_country_code
																and arse.request_ref_no = a.request_ref_no
																and arse.eventverb_id = 'CLOSE'),108),1,2),'')+'",'+
				   '"anc_req_evt_log_minute":"'+isnull(substring(CONVERT(varchar(10),(select arse.event_date from ancillary_request_status_event_log arse
															where arse.company_id = @i_client_id
																and arse.country_code = @i_country_code
																and arse.request_ref_no = a.request_ref_no
																and arse.eventverb_id = 'CLOSE'),108),4,2),'')+'",'
				else '"anc_req_evt_log_date":"'+ '' +'",'+
					 '"anc_req_evt_log_hour":"'+ '' +'",'+
					 '"anc_req_evt_log_minute":"'+ '' +'",'end)+								 
       			'"asset_in_warranty_ind":"'+cast(ISNULL(a.asset_in_warranty_ind,0) as varchar(1))+'",'+
				(case @o_udf_char_1 when 1 then '"udf_char_1":"'+ISNULL(a.udf_char_1,'')+'",' else '' end)+
				(case @o_udf_char_2 when 1 then '"udf_char_2":"'+ISNULL(a.udf_char_2,'')+'",' else '' end)+
				(case @o_udf_char_3 when 1 then '"udf_char_3":"'+ISNULL(a.udf_char_3,'')+'",' else '' end)+
				(case @o_udf_char_4 when 1 then '"udf_char_4":"'+ISNULL(a.udf_char_4,'')+'",' else '' end)+ 
				 '"rec_tstamp":"'+cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))+'"'+
				   '}'
			  as o_custom_info_json
			from ancillary_request_register a,call_register c
			  where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = c.company_id
				and a.country_code = c.country_code
				and a.job_order_no = c.call_ref_no
				and a.request_category = 'CS'
				and a.request_ref_no like 
				isnull( (select '%'+paramval+'%' from #inputparams where paramname = 'call_number_filter') , a.request_ref_no)
				and a.company_location_code like 
				isnull( (select '%'+paramval+'%' from #inputparams where paramname = 'company_location_filter') , a.company_location_code)
				and (isnull((select paramval from #inputparams where paramname = 'equipment_category_filter'),'%') = '%'
			or
			isnull(c.equipment_id,'') like (select b.equipment_id 
			 from equipment b
			 where b.company_id = @i_client_id
			   and b.country_code = @i_country_code
			   and b.equipment_id = c.equipment_id
			   and b.equipment_category = isnull((select paramval from #inputparams where paramname = 'equipment_category_filter'), b.equipment_id)
			))
		and (isnull((select paramval from #inputparams where paramname = 'equipment_type_filter'),'%') = '%'
			or
			isnull(c.equipment_id,'') like (select b.equipment_id 
			 from equipment b
			 where b.company_id = @i_client_id
			   and b.country_code = @i_country_code
			   and b.equipment_id = c.equipment_id
			   and b.equipment_type = isnull((select paramval from #inputparams where paramname = 'equipment_type_filter'), b.equipment_id)
			))
				and a.request_status like 
				isnull( (select '%'+paramval+'%' from #inputparams where paramname = 'call_status_filter') , a.request_status)
				and (isnull((select paramval from #inputparams where paramname = 'feedback_submit_date_filter'),'%') = '%'
					or
					isnull(a.udf_date_1,'') like 
					isnull((select '%'+paramval+'%' from #inputparams where paramname = 'feedback_submit_date_filter'), '')
					)
				and (isnull((select paramval from #inputparams where paramname = 'call_act_finish_on_date_filter'),'%') = '%'
					or
					isnull(a.job_order_no,'') in (select b.call_ref_no 
					 from call_register b
					 where b.company_id = @i_client_id
					   and b.country_code = @i_country_code
					   and isnull(b.act_finish_date,'') like isnull((select '%'+paramval+'%' from #inputparams where paramname = 'call_act_finish_on_date_filter'),'')
					))
				and (cast(a.organogram_level_no as varchar(2))+a.organogram_level_code 
					  = (case isnull((select paramval from #inputparams where paramname = 'dealer_code_filter') , '')	
						 when '' then cast(a.organogram_level_no as varchar(2))+a.organogram_level_code
						 when '%' then cast(a.organogram_level_no as varchar(2))+a.organogram_level_code
						 else ( select cast(d1.organogram_level_no as varchar(2))+d1.organogram_level_code
								from dealer_organogram_mapping d1
								where d1.company_id = @i_client_id
								  and d1.country_code = @i_country_code
								  and d1.dealer_id = isnull((select paramval from #inputparams where paramname = 'dealer_code_filter') , ''))
						 end))				

						 AND
						  (
				@p_date_type_filter in ( '%', '')
				  or			  
				  (
					  @p_date_type_filter = 'CF'
					  and
						 (
						  c.act_finish_date between isnull((select convert(datetimeoffset(7),paramval+ ' 00:00:00',120) 
									from #inputparams where paramname = 'from_date_filter'), c.act_finish_date)
									and
									isnull((select convert(datetimeoffset(7),paramval+ ' 23:59:00',120) 
									from #inputparams where paramname = 'to_date_filter'), c.act_finish_date)						  
						 )
				  )
				 or			  
				  (
					  (@p_date_type_filter = 'FS'
					  and
						 (
						  a.udf_date_1 between isnull((select convert(datetimeoffset(7),paramval+ ' 00:00:00',120) 
									from #inputparams where paramname = 'from_date_filter'), a.udf_date_1)
									and
									isnull((select convert(datetimeoffset(7),paramval+ ' 23:59:00',120) 
									from #inputparams where paramname = 'to_date_filter'), a.udf_date_1)						  
						 )
						)
					)
				 or			  
				  (
					  (@p_date_type_filter = 'AF'
					  and
						 (
						  c.act_finish_date between (dateadd(day,-15,SYSDATETIMEOFFSET()))
									and
									dateadd(day,-8,SYSDATETIMEOFFSET())				  
						 )
						)
					)	
			)
				order by a.created_on_date desc
				--offset @p_offset_count rows fetch next @p_rowcount  rows only
	     

    SET NOCOUNT OFF;
END
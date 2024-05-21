/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_detail_customer_survey]    Script Date: 3/10/2020 6:37:40 AM ******/
DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_detail_customer_survey]
GO
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_detail_customer_survey]    Script Date: 3/10/2020 6:37:41 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
 * Retrieves custom info detail
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_detail_customer_survey]
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id], 
    @i_custom_info_code [uddt_varchar_60], 
    @i_custom_info_ref_no1 [uddt_nvarchar_60], 
    @i_custom_info_ref_no2 [uddt_nvarchar_60], 
    @o_custom_info_header_json [uddt_nvarchar_max] OUTPUT
AS
BEGIN
    /*
     * Retrieves custom info detail
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    -- The following code raises a 'Not implemented' error. Remove this code after implementing this procedure.
    --RAISERROR( N'Procedure ''sp_retrieve_manage_custom_info_detail'' is yet to be implemented', 15, 1)

    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_custom_info_header_json = '' /* unicode string */
     */

    /*
    -- The following SQL snippet illustrates selection of result sets expected from this stored procedure: 
    
    -- Result set 1: custom_info_detail_json

    SELECT
        '' as custom_info_detail_json, /* dummy column aliased by result set name */
        '' as o_custom_info_json /* unicode string */
    FROM <Table name>
    */
	set @o_custom_info_header_json = ''

	select 	@o_custom_info_header_json =
		'{'+
			'"customer_id":"'+isnull(a.customer_id,'')+'",'+
			'"customer_location_code":"'+isnull(a.customer_location_code,'')+'",'+
			'"cust_name":"'+ 
					  isnull(( select customer_name 
					  from customer c1
					  where c1.company_id = @i_client_id
						and c1.country_code = @i_country_code
						and c1.customer_id = a.customer_id),'')+'",'+
		   '"request_no":"'+a.request_ref_no+'",'+
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
		   '"request_status_desc":"'+
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
		   '"org_level_code":"'+a.organogram_level_code +'",'+
		   '"created_by_employee_id":"'+isnull(a.created_by_employee_id,'')+'",'+
	       '"created_by_employee_name":"'+ISNULL(
								( select c1.first_name+' '+c1.last_name
									from employee c1
									where c1.company_id = @i_client_id
									  and c1.country_code = @i_country_code
									  and c1.employee_id = a.created_by_employee_id),'')+'",'+
		   '"created_on_date":"'+isnull(CONVERT(varchar(10),a.created_on_date,120),'')+'",'+
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
		   '"requirement":"'+isnull(a.requirement,'')+'",'+
		   '"job_order_no":"'+isnull(a.job_order_no,'')+'",'+
			'"running_hrs":"'+ISNULL(a.additional_information,'')+'"'+
		'}'
	from ancillary_request_register a
	where  company_id			=  @i_client_id
		and country_code		=  @i_country_code
		and request_ref_no       = @i_custom_info_ref_no1
		

	select '' as custom_info_detail_json,
		'{' +
			'"last_update_timestamp":"'+ cast(convert(uniqueidentifier,cast(last_update_timestamp as binary)) as varchar(36))+'"'+
		'}'
	as  o_custom_info_json
	from ancillary_request_register
	where  company_id			=  @i_client_id
		and country_code		=  @i_country_code
		and request_ref_no       = @i_custom_info_ref_no1
		
	

    SET NOCOUNT OFF;
END

DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_customer_survey]
GO
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_customer_survey]    Script Date: 11/24/2023 12:14:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

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

	declare @p_list_type varchar(10), 
		@p_search_string nvarchar(1000)

	
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
	select [key], [value]
	from openjson(@i_inputparam_xml)

	update #inputparams
	set paramval = null 
	where paramval = 'ALL'
		or paramval = ''


	select @p_list_type = paramval 
	from #inputparams 
	where paramname = 'list_type'

	select @p_search_string = paramval 
	from #inputparams 
	where paramname = 'search_string'	
		

	create table #transaction_list 
	(
		company_id varchar(20),
		country_code varchar(5),
		ref_no nvarchar(20),
		id int,
		category varchar(10),
		type nvarchar(10),
		wf_stage tinyint,
		status varchar(2),
		priority_code varchar(3),
		company_loc_code nvarchar(8),
		asset_id nvarchar(30),
		asset_location_reported nvarchar(50),
		equipment_id nvarchar(30),
		feedback_ind varchar(1),
		problem_desc nvarchar(1000),
		additional_desc nvarchar(1000),
		customer_contact_name nvarchar(60),
		customer_contact_no nvarchar(20),
		customer_contact_email nvarchar(60),
		customer_id varchar(15),
		customer_location_code varchar(10),
		created_on_date datetimeoffset(7),
		closed_on_date datetimeoffset(7),
		sch_start_date datetimeoffset(7),
		sch_finish_date datetimeoffset(7),
		act_start_date datetimeoffset(7),
		act_finish_date datetimeoffset(7),
		assigned_to_emp_id nvarchar(12),
		assigned_on_date datetimeoffset(7),
		created_by_emp_id nvarchar(12),				
		rec_tstamp varchar(100),
		comments nvarchar(1000),
		transaction_type varchar(1)
	)

	if (@p_list_type = 'OPEN')
	begin

		/* LOAD CUSTOMER SURVEY RECORDS */
		insert #transaction_list 
		(
			company_id, 
			country_code, 
			ref_no, 
			id,
			category, 
			type, 
			wf_stage, 
			status,
			priority_code, 
			company_loc_code, 
			asset_id, 
			asset_location_reported,  
			equipment_id, 
			problem_desc, 
			additional_desc, 
			customer_contact_name, 
			customer_contact_no, 
			customer_contact_email, 
			customer_id, 
			customer_location_code,
			created_on_date, 
			closed_on_date, 
			sch_start_date, 
			sch_finish_date, 
			act_start_date, 
			act_finish_date, 
			created_by_emp_id, 
			rec_tstamp, 
			transaction_type
		)
		select a.company_id, 
			a.country_code, 
			a.request_ref_no, 
			a.request_id,
			a.request_category, 
			a.request_type, 
			a.request_wf_stage_no, 
			a.request_status,
			a.priority_code, 
			a.company_location_code, 
			'', 
			'',
			'', 
			a.requirement, 
			a.additional_information, 
			a.customer_contact_name,
			a.customer_contact_no, 
			a.customer_contact_email_id, 
			a.customer_id, 
			a.customer_location_code,
			a.created_on_date, 
			a.closed_on_date, 
			a.sch_start_date, 
			a.sch_finish_date,
			a.act_start_date, 
			a.act_finish_date, 
			a.created_by_employee_id, 
			a.last_update_timestamp,
			'A'
		from ancillary_request_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.request_category = 'CS'
			and a.request_status != 'CO'
			and a.request_ref_no like N'%' + isnull(@p_search_string, N'') + N'%'		

	end
	else if (@p_list_type = 'CLOSED')
	begin
	
		/* LOAD CUSTOMER SURVEY RECORDS */
		insert #transaction_list 
		(
			company_id, 
			country_code, 
			ref_no, 
			id,
			category, 
			type, 
			wf_stage, 
			status,
			priority_code, 
			company_loc_code, 
			asset_id, 
			asset_location_reported,  
			equipment_id, 
			problem_desc, 
			additional_desc, 
			customer_contact_name, 
			customer_contact_no, 
			customer_contact_email, 
			customer_id, 
			customer_location_code,
			created_on_date, 
			closed_on_date, 
			sch_start_date, 
			sch_finish_date, 
			act_start_date, 
			act_finish_date, 
			created_by_emp_id, 
			rec_tstamp, 
			transaction_type
		)
		select a.company_id, 
			a.country_code, 
			a.request_ref_no, 
			a.request_id,
			a.request_category, 
			a.request_type, 
			a.request_wf_stage_no, 
			a.request_status,
			a.priority_code, 
			a.company_location_code, 
			'', 
			'',
			'', 
			a.requirement, 
			a.additional_information, 
			a.customer_contact_name,
			a.customer_contact_no, 
			a.customer_contact_email_id, 
			a.customer_id, 
			a.customer_location_code,
			a.created_on_date, 
			a.closed_on_date, 
			a.sch_start_date, 
			a.sch_finish_date,
			a.act_start_date, 
			a.act_finish_date, 
			a.created_by_employee_id, 
			a.last_update_timestamp,
			'A'
		from ancillary_request_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.request_category = 'CS'
			and a.request_status = 'CO'
			and a.request_ref_no like N'%' + isnull(@p_search_string, N'') + N'%'		
			
	end


	/* UPDATE ASSIGNEE DETAILS FOR CALL REGISTER*/
	update #transaction_list
	set assigned_to_emp_id = a.resource_emp_id,
		assigned_on_date = a.assigned_on_date
	from call_assignment a
	where a.company_id = #transaction_list.company_id
		and a.country_code = #transaction_list.country_code
		and a.call_ref_no = #transaction_list.ref_no
		and a.primary_resource_ind = 1
		and #transaction_list.transaction_type = 'C'


	/* UPDATE LATEST COMMENT FOR CALL REGISTER*/
	update #transaction_list
	set comments = a.comments
	from call_status_event_log a
	where a.company_id = #transaction_list.company_id
		and a.country_code = #transaction_list.country_code
		and a.call_ref_no = #transaction_list.ref_no
		and a.eventverb_id = 'CUSTOMERPROGRESSUPDATE'
		and #transaction_list.transaction_type = 'C'

		
	
	select
        '' as custom_info_list,
        '{' +
			'"call_no":"' + a.ref_no + '",' +
			'"call_category":"' + a.category + '",' +
			'"call_category_desc":"' + dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'CALLCATG', a.category) + '",'+
			'"call_type":"' + a.type + '",' + 
			'"call_type_desc":"' + dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'CALLTYPE', a.type) + '",' +
			'"call_wf_stage":"' + convert(varchar(2), a.wf_stage) + '",' +
			'"call_wf_stage_desc":"' +
				isnull((
					select isnull(description,'') 
					from workflow_stage_master
					where company_id = a.company_id
						and country_code = a.country_code
						and transaction_type_code = 'CALL'
						and request_category = a.category
						and workflow_stage_no = a.wf_stage
				),'') + '",' + 
			'"call_status":"' + a.status + '",' +
			'"call_status_desc":"'+ dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'CALLSTATUS', a.status) + '",' +
			'"priority_cd":"' + a.priority_code + '",' +
			'"company_location_code":"' + a.company_loc_code + '",' +
			'"company_location_name":"' +
				isnull((
					select location_name_short 
					from company_location
					where company_id = a.company_id
						and country_code = a.country_code
						and location_code = a.company_loc_code),'') + '",' +
			'"asset_id":"' + isnull(a.asset_id, '') + '",' +
			'"installation_date":"' + 
				isnull(convert(varchar(10), (
					select installation_date from asset_master
					where company_id = a.company_id
						and country_code = a.country_code
						and asset_id = a.asset_id
					), 120), '') + '",' +
			'"asset_loc_reported":"' + isnull(a.asset_location_reported,'') + '",' +
			'"equipment_id":"' + isnull(a.equipment_id,'') + '",' +
			(
				isnull((select '"equipment_desc":"' + isnull(description, '') + '",' +
					'"equipment_category":"' + isnull(equipment_category,'') + '",' +
					'"equipment_type":"' + isnull(equipment_type,'') + '",'
				from equipment
				where company_id = a.company_id
					and country_code = a.country_code
					and equipment_id = a.equipment_id), 
				'"equipment_desc":"","equipment_category":"","equipment_type":"",')
			) +
			'"feedback_ind":"' + (
				case (a.status)
				when 'CO' then (
					case (
						select 1 from customer_feedback_summary
						where company_id = a.company_id
							and country_code = a.country_code
							and activity_ref_no = a.ref_no
					)
					when 1 then '2'
					else '1'
					end
				)
				else '0'
				end
			) + '",' +
			'"problem_description":"' + isnull(a.problem_desc, '') + '",' +
			'"addn_desc":"' + isnull(a.additional_desc,  '') + '",' +
			'"comments":"' + isnull(a.comments, '') + '",' +
			'"cust_contact_name":"' + isnull(a.customer_contact_name,'') + '",' +
			'"cust_contact_no":"' + isnull(a.customer_contact_no,'') + '",' +
			'"cust_contact_email_id":"' + isnull(a.customer_contact_email,'') + '",' +
			'"customer_id":"' + isnull(a.customer_id,'') + '",' +
			'"customer_name":"' + 
				isnull((
					select customer_name 
					from customer
					where company_id = a.company_id
						and country_code = a.country_code
						and customer_id = a.customer_id), '') + '",' +
			'"cust_location_code":"' + isnull(a.customer_location_code, '') + '",' +
			(
				case isnull(a.customer_location_code, '')
				when 'ZZZ' then (
					select '"customer_address_line_1":"",'+
						'"customer_address_line_2":"",'+
						'"customer_address_line_3":"",'+
						'"customer_city":"",'+
						'"customer_state":"",'+
						'"customer_pincode":"",'+
						'"customer_country":"",'
				)
				when '' then (
					select '"customer_address_line_1":"",'+
						'"customer_address_line_2":"",'+
						'"customer_address_line_3":"",'+
						'"customer_city":"",'+
						'"customer_state":"",'+
						'"customer_pincode":"",'+
						'"customer_country":"",'
				)
				else (
					select '"customer_address_line_1":"' + b.address_line_1 + '",' +
						'"customer_address_line_2":"' + isnull(b.address_line_2,'') + '",' +
						'"customer_address_line_3":"' + isnull(b.address_line_3,'') + '",' +
						'"customer_city":"' + b.city + '",' +
						'"customer_state":"' + (
							select state
							from state
							where state_code = b.state_code
								and country_code = b.country_code
						) + '",' +
						'"customer_pincode":"' + pincode + '",' +
						'"customer_country":"' + (
							select country_name
							from country
							where country_code = b.country_code
						) + '",'
					from customer_location b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.customer_id = a.customer_id
						and b.location_code = a.customer_location_code
				) end
			) +			
			'"created_on_date":"' + isnull(convert(varchar(10),a.created_on_date,120),'') + '",' +
			'"created_on_hour":"' + isnull(substring(convert(varchar(10),a.created_on_date,108),1,2),'') + '",' +
			'"created_on_minute":"' + isnull(substring(convert(varchar(10),a.created_on_date,108),4,2),'') + '",' +
			'"closed_on_date":"' + isnull(convert(varchar(10),a.closed_on_date,120),'') + '",' +
			'"closed_on_hour":"' + isnull(substring(convert(varchar(10),a.closed_on_date,108),1,2),'') + '",' +
			'"closed_on_minute":"' + isnull(substring(convert(varchar(10),a.closed_on_date,108),4,2),'') + '",' +       
			'"sch_start_on_date":"' + isnull(convert(varchar(10),a.sch_start_date,120),'') + '",' +
			'"sch_start_on_hour":"' + isnull(substring(convert(varchar(10),a.sch_start_date,108),1,2),'') + '",' +
			'"sch_start_on_minute":"' + isnull(substring(convert(varchar(10),a.sch_start_date,108),4,2),'') + '",' +       
			'"sch_finish_on_date":"' + isnull(convert(varchar(10),a.sch_finish_date,120),'') + '",' +
			'"sch_finish_on_hour":"' + isnull(substring(convert(varchar(10),a.sch_finish_date,108),1,2),'') + '",' +
			'"sch_finish_on_minute":"' + isnull(substring(convert(varchar(10),a.sch_finish_date,108),4,2),'') + '",' + 
			'"act_start_on_date":"' + isnull(convert(varchar(10),a.act_start_date,120),'') + '",' +
			'"act_start_on_hour":"' + isnull(substring(convert(varchar(10),a.act_start_date,108),1,2),'') + '",' +
			'"act_start_on_minute":"' + isnull(substring(convert(varchar(10),a.act_start_date,108),4,2),'') + '",' +       
			'"act_finish_on_date":"' + isnull(convert(varchar(10),a.act_finish_date,120),'') + '",' +
			'"act_finish_on_hour":"' + isnull(substring(convert(varchar(10),a.act_finish_date,108),1,2),'') + '",' +
			'"act_finish_on_minute":"' + isnull(substring(convert(varchar(10),a.act_finish_date,108),4,2),'') + '",' + 
			'"assigned_to_emp_id":"' + isnull(a.assigned_to_emp_id, '') + '",' +
			'"assigned_to_emp_name":"' + isnull((
				select title + ' ' + first_name + ' ' + last_name
				from employee
				where company_id = a.company_id
					and country_code = a.country_code
					and employee_id = a.assigned_to_emp_id
			), '') + '",' +
			'"assigned_to_user_id":"' + isnull((
				select user_id
				from users
				where company_id = a.company_id
					and country_code = a.country_code
					and employee_id = a.assigned_to_emp_id
			), '') + '",' +
			'"assigned_on_date":"' + isnull(convert(varchar(10),a.assigned_on_date,120),'') + '",' +
			'"assigned_on_hour":"' + isnull(substring(convert(varchar(10),a.assigned_on_date,108),1,2),'') + '",' +
			'"assigned_on_minute":"' + isnull(substring(convert(varchar(10),a.assigned_on_date,108),4,2),'') + '",' +
			'"created_by_emp_id":"' + a.created_by_emp_id + '",' +
			'"created_by_emp_name":"' + isnull((
				select title + ' ' + first_name + ' ' + last_name
				from employee
				where company_id = a.company_id
					and country_code = a.country_code
					and employee_id = a.created_by_emp_id
			), '') + '",' +
			'"created_by_user_id":"' + (
				select user_id
				from users
				where company_id = a.company_id
					and country_code = a.country_code
					and employee_id = a.created_by_emp_id
			) + '",' +
			'"rec_tstamp":"' + cast(convert(uniqueidentifier,cast(a.rec_tstamp as binary)) as varchar(36)) + '"' +
		'}' as o_custom_info_json
    from #transaction_list a
	order by a.created_on_date desc

END
GO
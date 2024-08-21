DROP PROCEDURE IF EXISTS [dbo].[sp_retrieve_manage_custom_info_list_my_notice_board]
GO
																																		
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_my_notice_board] 
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

	/* INPUTPARAM STRUCTURE */		
	--{
	--	"transaction_type_filter":"CALL", 
	--	"request_ref_no_filter":"ALL", 
	--	"request_category_filter":"ALL", 
	--	"request_type_filter":"ALL", 
	--	"request_status_filter":"ALL"
	--}


	/* DECLARING VARIABLES */
	declare @p_transaction_type_filter varchar(30),
		@p_request_category_filter varchar(10),
		@p_request_type_filter nvarchar(10),
		@p_request_status_filter nvarchar(50),
		@p_request_ref_no_filter varchar(30),
		@p_employee_id nvarchar(12),
		@p_employee_org_level_no tinyint,
		@p_employee_org_level_code nvarchar(15),
		@p_entity_type varchar(2)


	create table #inputparams 
	(
		paramname varchar(50) not null,
		paramval varchar(50) null
	)


	if (@i_inputparam_xml = '') 
	begin 
		set @i_inputparam_xml = '{}' 
	end

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

	
	/* GETTING THE INPUT PARAMETERS TO BE USED FURTHER IN THE PROGRAM FROM THE REQUEST */
	select @p_transaction_type_filter = paramval
	from #inputparams 
	where paramname = 'transaction_type_filter'

	select @p_request_ref_no_filter = paramval
	from #inputparams 
	where paramname = 'request_ref_no_filter'

	select @p_request_category_filter = paramval
	from #inputparams 
	where paramname = 'request_category_filter'

	select @p_request_type_filter = paramval
	from #inputparams 
	where paramname = 'request_type_filter'

	select @p_request_status_filter = paramval
	from #inputparams 
	where paramname = 'request_status_filter'

	
	/* GET THE EMPLOYEE AND ENTITY DETAILS OF THE REQUESTOR */
	select @p_employee_id = b.employee_id,
		@p_employee_org_level_no = b.organogram_level_no,
		@p_employee_org_level_code = b.organogram_level_code
	from users a, employee b
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.user_id = @i_user_id
		and b.company_id = a.company_id
		and b.country_code = a.country_code
		and b.employee_id = a.employee_id

	select @p_entity_type = entity_type
	from entity_organogram_mapping
	where company_id = @i_client_id
		and country_code = @i_country_code
		and organogram_level_no = @p_employee_org_level_no
		and organogram_level_code = @p_employee_org_level_code


	/* CREATING THE TEMPORARY TABLE FOR HOLDING THE DATA TO BE PROCESSED */
	create table #transaction_list 
	(
		company_id varchar(20),
		country_code varchar(5),		
		transaction_type varchar(20),
		ref_no nvarchar(30),
		id int,
		category varchar(10),
		category_desc nvarchar(60),
		type nvarchar(10),
		type_desc nvarchar(60),
		wf_stage tinyint,
		wf_stage_desc nvarchar(60),
		status varchar(2),
		status_desc nvarchar(60),
		priority_code varchar(3),
		company_loc_code nvarchar(8),
		asset_id nvarchar(30),
		asset_location_reported nvarchar(50),
		equipment_id nvarchar(30),
		feedback_ind varchar(1),
		feedback_value varchar(1),
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
		assignee_locale_id nvarchar(10),
		last_stage_indication varchar(5),
		last_status_indication varchar(5),
		event_log_data nvarchar(max),
		user_attachments_data nvarchar(max),
		chat_ref_no varchar(50),
		chat_receipients nvarchar(max)
	)

	/* CREATING THE TEMPORARY TABLE FOR HOLDING THE TRANSACTION EVENT LOG DATA */
	create table #transaction_event_log_list
	(
		ref_no nvarchar (30),
		event_log_data nvarchar(max)
	)


	/* CREATING THE TEMPORARY TABLE FOR HOLDING THE TRANSACTION ATTACHMENTS DATA */
	create table #transaction_attachments_list
	(
		ref_no nvarchar (30),
		user_attachments_data nvarchar(max)
	)

	/* GET THE RECORDS BASED ON THE ENTITY TYPE */
	if (@p_entity_type = 'C') --CUSTOMER
	begin

		if exists 
		(
			select 1 from string_split(isnull(@p_transaction_type_filter, 'CALL'), ',') 
			where ltrim(rtrim(value)) = 'CALL'
		)
		begin
		
			/* LOADING CALL REGISTER RECORDS */
			insert #transaction_list 
			(
				company_id, 
				country_code, 
				ref_no, 
				id,
				category,
				category_desc,
				type, 
				type_desc,
				wf_stage, 
				wf_stage_desc,
				status,
				status_desc,
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
				last_stage_indication, 
				last_status_indication, 
				transaction_type,
				chat_ref_no,
				chat_receipients
			)
			select a.company_id, 
				a.country_code, 
				a.call_ref_no, 
				a.call_id,
				a.call_category,
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'CALLCATG', a.call_category),
				a.call_type,
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'CALLTYPE', a.call_type),
				a.call_wf_stage_no,
				isnull((
					select isnull(description,'') 
					from workflow_stage_master
					where company_id = a.company_id
						and country_code = a.country_code
						and transaction_type_code = 'CALL'
						and request_category = a.call_category
						and workflow_stage_no = a.call_wf_stage_no
				),''),
				a.call_status,
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'CALLSTATUS', a.call_status),
				a.priority_code, 
				a.company_location_code, 
				a.asset_id, 
				a.asset_location_code_reported,
				a.equipment_id, 
				a.problem_description, 
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
				'false', 
				'false', 
				'CALL',
				(
					select product_code + product_sub_code 
					from call_register_actions
					where company_id = a.company_id
						and country_code = a.country_code
						and call_ref_no = a.call_ref_no
						and action_category = 'CONVERSATIONREF'
						and action_type = 'CONVERSATIONREF'),
				(
					select string_agg ('@' + c.user_id, ',')  
					from call_assignment b, users c
					where b.company_id = a.company_id 
						and b.country_code = a.country_code
						and b.call_ref_no = a.call_ref_no
						and c.company_id = b.company_id
						and c.country_code = b.country_code
						and c.employee_id = b.resource_emp_id			   
				)
			from call_register a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.call_category in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_category_filter, a.call_category), ',')
				) 
				and a.call_type in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_type_filter, a.call_type), ',')
				)
				and a.call_status in 
				(
					select ltrim(rtrim(value)) 
					from string_split(isnull(@p_request_status_filter, a.call_status), ',')
				)
				and a.call_ref_no in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_ref_no_filter, a.call_ref_no), ',')
				)
				and 
				(
					(
						(
							a.asset_id is not null
								and a.asset_id != ''
								and a.asset_id != 'ZZZ'
						)
						and a.asset_id in 
						(
							select asset_id 
							from customer_user_mapping_to_assets
							where company_id = @i_client_id
								and country_code = @i_country_code
								and employee_id = @p_employee_id
						)
					)
					or 
					(
						(
							a.asset_id is null
								or a.asset_id = ''
								or a.asset_id = 'ZZZ'
						) 
						and 
						(
							a.created_by_employee_id = @p_employee_id
						)
					)
				)
				
		end

		if exists 
		(
			select 1 from string_split(isnull(@p_transaction_type_filter, 'ANCILLARY'), ',') 
			where ltrim(rtrim(value)) = 'ANCILLARY'
		)
		begin

			/* LOADING ANCILLARY REQUEST REGISTER RECORDS */
			insert #transaction_list 
			(
				company_id, 
				country_code, 
				ref_no, 
				id,
				category,
				category_desc,
				type, 
				type_desc,
				wf_stage, 
				wf_stage_desc,
				status,
				status_desc,
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
				last_stage_indication, 
				last_status_indication, 
				transaction_type,
				chat_ref_no,
				chat_receipients
			)
			select a.company_id, 
				a.country_code, 
				a.request_ref_no, 
				a.request_id,
				a.request_category,
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'ANCILLARYCATG', a.request_category),
				a.request_type, 
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'ANCILLARYTYPE', a.request_type),
				a.request_wf_stage_no, 
				isnull((
					select isnull(description,'') 
					from workflow_stage_master
					where company_id = a.company_id
						and country_code = a.country_code
						and transaction_type_code = 'ANCILLARY'
						and request_category = a.request_category
						and workflow_stage_no = a.request_wf_stage_no
				),''),
				a.request_status,
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'ANCILLARYSTATUS', a.request_status),
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
				'false', 
				'false', 
				'ANCILLARY',
				(
					select product_code + product_sub_code 
					from ancillary_request_register_actions
					where company_id = a.company_id
						and country_code = a.country_code
						and request_ref_no = a.request_ref_no
						and action_category = 'CONVERSATIONREF'
						and action_type = 'CONVERSATIONREF'),
				(
					select string_agg ('@' + c.user_id, ',')  
					from ancillary_request_assignment b, users c
					where b.company_id = a.company_id 
						and b.country_code = a.country_code
						and b.request_ref_no = a.request_ref_no
						and c.company_id = b.company_id
						and c.country_code = b.country_code
						and c.employee_id = b.resource_emp_id
				)					   
			from ancillary_request_register a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.request_category in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_category_filter, a.request_category), ',')
				) 
				and a.request_type in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_type_filter, a.request_type), ',')
				)
				and a.request_status in 
				(
					select ltrim(rtrim(value)) 
					from string_split(isnull(@p_request_status_filter, a.request_status), ',')
				)
				and a.request_ref_no in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_ref_no_filter, a.request_ref_no), ',')
				)
				and a.created_by_employee_id = @p_employee_id

		end

	end
	else if (@p_entity_type = 'O' or @p_entity_type = 'D') --OEM ENGINEER / DLR
	begin

		if exists 
		(
			select 1 from string_split(isnull(@p_transaction_type_filter, 'CALL'), ',') 
			where ltrim(rtrim(value)) = 'CALL'
		)
		begin
		
			/* LOADING CALL REGISTER RECORDS */
			insert #transaction_list 
			(
				company_id, 
				country_code, 
				ref_no, 
				id,
				category,
				category_desc,
				type, 
				type_desc,
				wf_stage, 
				wf_stage_desc,
				status,
				status_desc,
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
				last_stage_indication, 
				last_status_indication, 
				transaction_type,
				chat_ref_no,
				chat_receipients
			)
			select a.company_id, 
				a.country_code, 
				a.call_ref_no, 
				a.call_id,
				a.call_category,
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'CALLCATG', a.call_category),
				a.call_type,
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'CALLTYPE', a.call_type),
				a.call_wf_stage_no,
				isnull((
					select isnull(description,'') 
					from workflow_stage_master
					where company_id = a.company_id
						and country_code = a.country_code
						and transaction_type_code = 'CALL'
						and request_category = a.call_category
						and workflow_stage_no = a.call_wf_stage_no
				),''),
				a.call_status,
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'CALLSTATUS', a.call_status),
				a.priority_code, 
				a.company_location_code, 
				a.asset_id, 
				a.asset_location_code_reported,
				a.equipment_id, 
				a.problem_description, 
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
				'false', 
				'false', 
				'CALL',
				(
					select product_code + product_sub_code 
					from call_register_actions
					where company_id = a.company_id
						and country_code = a.country_code
						and call_ref_no = a.call_ref_no
						and action_category = 'CONVERSATIONREF'
						and action_type = 'CONVERSATIONREF'),
				(
					select string_agg ('@' + c.user_id, ',')  
					from call_assignment b, users c
					where b.company_id = a.company_id 
						and b.country_code = a.country_code
						and b.call_ref_no = a.call_ref_no
						and c.company_id = b.company_id
						and c.country_code = b.country_code
						and c.employee_id = b.resource_emp_id		   
				)
			from call_register a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.call_category in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_category_filter, a.call_category), ',')
				) 
				and a.call_type in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_type_filter, a.call_type), ',')
				)
				and a.call_status in 
				(
					select ltrim(rtrim(value)) 
					from string_split(isnull(@p_request_status_filter, a.call_status), ',')
				)
				and a.call_ref_no in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_ref_no_filter, a.call_ref_no), ',')
				)
				and a.call_ref_no in 
				(
					select distinct x.call_ref_no 
					from call_assignment x
					where x.company_id = a.company_id
						and x.country_code = a.country_code
						and x.resource_emp_id = @p_employee_id
						and x.primary_resource_ind = 1
				)
				and 
				(
					a.closed_on_date is null 
					or datediff(hour, a.closed_on_date, sysdatetimeoffset()) < 24
				)
				
		end

		if exists 
		(
			select 1 from string_split(isnull(@p_transaction_type_filter, 'ANCILLARY'), ',') 
			where ltrim(rtrim(value)) = 'ANCILLARY'
		)
		begin

			/* LOADING ANCILLARY REQUEST REGISTER RECORDS */
			insert #transaction_list 
			(
				company_id, 
				country_code, 
				ref_no, 
				id,
				category,
				category_desc,
				type, 
				type_desc,
				wf_stage, 
				wf_stage_desc,
				status,
				status_desc,
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
				last_stage_indication, 
				last_status_indication, 
				transaction_type,
				chat_ref_no,
				chat_receipients
			)
			select a.company_id, 
				a.country_code, 
				a.request_ref_no, 
				a.request_id,
				a.request_category,
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'ANCILLARYCATG', a.request_category),
				a.request_type, 
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'ANCILLARYTYPE', a.request_type),
				a.request_wf_stage_no, 
				isnull((
					select isnull(description,'') 
					from workflow_stage_master
					where company_id = a.company_id
						and country_code = a.country_code
						and transaction_type_code = 'ANCILLARY'
						and request_category = a.request_category
						and workflow_stage_no = a.request_wf_stage_no
				),''),
				a.request_status,
				dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'ANCILLARYSTATUS', a.request_status),
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
				'false', 
				'false', 
				'ANCILLARY',
				(
					select product_code + product_sub_code 
					from ancillary_request_register_actions
					where company_id = a.company_id
						and country_code = a.country_code
						and request_ref_no = a.request_ref_no
						and action_category = 'CONVERSATIONREF'
						and action_type = 'CONVERSATIONREF'),
				(
					select string_agg ('@' + c.user_id, ',')  
					from ancillary_request_assignment b, users c
					where b.company_id = a.company_id 
						and b.country_code = a.country_code
						and b.request_ref_no = a.request_ref_no
						and c.company_id = b.company_id
						and c.country_code = b.country_code
						and c.employee_id = b.resource_emp_id			   
				)
			from ancillary_request_register a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.request_category in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_category_filter, a.request_category), ',')
				) 
				and a.request_type in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_type_filter, a.request_type), ',')
				)
				and a.request_status in 
				(
					select ltrim(rtrim(value)) 
					from string_split(isnull(@p_request_status_filter, a.request_status), ',')
				)
				and a.request_ref_no in 
				(
					select ltrim(rtrim(value))  
					from string_split(isnull(@p_request_ref_no_filter, a.request_ref_no), ',')
				)
				/* and a.request_ref_no in 
				(
					select distinct x.request_ref_no 
					from ancillary_request_assignment x
					where x.company_id = a.company_id
						and x.country_code = a.country_code
						and x.resource_emp_id = @p_employee_id
						and x.primary_resource_ind = 1
				)
				and 
				(
					a.closed_on_date is null 
					or datediff(hour, a.closed_on_date, sysdatetimeoffset()) < 24
				) */

		end

	end


	/* UPDATE CALL SPECIFIC INFORMATION IN TRANSACTION LIST */
	if exists 
	(
		select 1 from string_split(isnull(@p_transaction_type_filter, 'CALL'), ',') 
		where ltrim(rtrim(value)) = 'CALL'
	)
	begin

		/* LOADING CALL STATUS EVENT LOG RECORDS */
		insert #transaction_event_log_list
		(
			ref_no,
			event_log_data
		)
		select a.ref_no,
			'{' +
				'"event_date":"' + convert(varchar(10), b.event_date, 120) + '",' +
				'"event_hour":"' + substring(convert(varchar(10), b.event_date, 108), 1, 2) + '",' +
				'"event_minute":"' + substring(convert(varchar(10), b.event_date, 108), 4, 2) + '",' +
				'"channel_id":"' + b.channel_id + '",' +
				'"from_stage":"' + convert(varchar(3), b.from_wf_stage_no) + '",' +
				'"from_stage_desc":"' + isnull
					(
						(
							select x.description 
							from workflow_stage_master x
							where x.company_id = b.channel_id
								and x.country_code = b.country_code
								and x.transaction_type_code = 'CALL'
								and x.request_category = a.category
								and x.workflow_stage_no = b.from_wf_stage_no 
						), ''
					) + '",' +
				'"to_stage":"' + convert(varchar(3), b.to_wf_stage_no) + '",' +
				'"to_stage_desc":"' + isnull
					(
						(
							select x.description 
							from workflow_stage_master x
							where x.company_id = b.channel_id
								and x.country_code = b.country_code
								and x.transaction_type_code = 'CALL'
								and x.request_category = a.category
								and x.workflow_stage_no = b.to_wf_stage_no 
						), ''
					) + '",' +
				'"from_status":"' + b.from_status + '",' +
				'"from_status_desc":"' + dbo.code_description
					(
						a.company_id, 
						a.country_code, 
						@i_locale_id, 
						'CALLSTATUS', 
						b.from_status
					) + '",' +
				'"to_status":"' + b.to_status + '",' +
				'"to_status_desc":"' + dbo.code_description
					(
						a.company_id, 
						a.country_code, 
						@i_locale_id, 
						'CALLSTATUS', 
						b.to_status
					) + '",' +
				'"event_verb_id":"' + b.eventverb_id + '"' +
			'}'
		from #transaction_list a, call_status_event_log b
		where a.transaction_type = 'CALL'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.call_ref_no = a.ref_no
			

		update #transaction_list
		set event_log_data = 
		(
			select string_agg
			(
				isnull(a.event_log_data, ''), ','
			)
			from #transaction_event_log_list a
			where a.ref_no = #transaction_list.ref_no
			group by a.ref_no
		)


		/* LOADING CALL USER ATTACHMENTS RECORDS */
		insert #transaction_attachments_list
		(
			ref_no,
			user_attachments_data
		)
		select a.ref_no,
			'{' +
				'"attached_at_transaction":"' + 'CALL' + '",' +
				'"category":"' + b.attachment_file_category + '",' +
				'"type":"' + b.attachment_file_type + '",' +
				'"id":"' + b.attachment_file_id + '",' +
				'"name":"' + b.attachment_file_name + '",' +
				'"extension":"' + right(b.attachment_file_name, charindex('.', reverse(b.attachment_file_name))) + '",' +
				'"path":"' + b.attachment_file_path + '"' +
			'}'
		from #transaction_list a, call_user_attachments b
		where a.transaction_type = 'CALL'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.call_ref_no = a.ref_no

		update #transaction_list
		set user_attachments_data = 
		(
			select string_agg
			(
				isnull(a.user_attachments_data, ''), ','
			)
			from #transaction_attachments_list a
			where a.ref_no = #transaction_list.ref_no
			group by a.ref_no
		)


		/* UPDATING ASSIGNEE DETAILS FOR CALL REGISTER*/
		update #transaction_list
		set assigned_to_emp_id = a.resource_emp_id,
			assigned_on_date = a.assigned_on_date
		from call_assignment a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and #transaction_list.transaction_type = 'CALL'
			and a.call_ref_no = #transaction_list.ref_no
			and a.primary_resource_ind = 1


		/* UPDATING LATEST COMMENT FOR CALL REGISTER*/
		update #transaction_list
		set comments = a.comments
		from call_status_event_log a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and #transaction_list.transaction_type = 'CALL'
			and a.call_ref_no = #transaction_list.ref_no
			and a.eventverb_id = 'CUSTOMERPROGRESSUPDATE'	


		/* UPDATING LAST STAGE INDICATION FOR CALL REGISTER */
		update #transaction_list
		set last_stage_indication = 'true'
		from workflow_stage_master a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and #transaction_list.transaction_type = 'CALL'
			and a.transaction_type_code = 'CALL'
			and a.last_stage_ind = 1
			and a.request_category = 'ALL'
			and a.workflow_stage_no = #transaction_list.wf_stage

		update #transaction_list
		set last_stage_indication = 'true'
		from workflow_stage_master a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and #transaction_list.transaction_type = 'CALL'
			and a.transaction_type_code = 'CALL'
			and a.last_stage_ind = 1
			and a.request_category = #transaction_list.category
			and a.workflow_stage_no = #transaction_list.wf_stage
	

		/* UPDATING LAST STATUS INDICATION FOR CALL REGISTER */
		update #transaction_list
		set last_status_indication = 'true'
		from workflow_status_master a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and #transaction_list.transaction_type = 'CALL'
			and a.transaction_type_code = 'CALL'
			and a.last_status_ind = 1
			and a.request_category = 'ALL'
			and a.status_code = #transaction_list.status

		update #transaction_list
		set last_status_indication = 'true'
		from workflow_status_master a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and #transaction_list.transaction_type = 'CALL'
			and a.transaction_type_code = 'CALL'
			and a.last_status_ind = 1
			and a.request_category = #transaction_list.category
			and a.status_code = #transaction_list.status

	end

	/* UPDATE ANCILLARY SPECIFIC INFORMATION IN TRANSACTION LIST */
	if exists 
	(
		select 1 from string_split(isnull(@p_transaction_type_filter, 'ANCILLARY'), ',') 
		where ltrim(rtrim(value)) = 'ANCILLARY'
	)
	begin

		/* LOADING ANCILLARY STATUS EVENT LOG RECORDS */
		insert #transaction_event_log_list
		(
			ref_no,
			event_log_data
		)
		select a.ref_no,
			'{' +
				'"event_date":"' + convert(varchar(10), b.event_date, 120) + '",' +
				'"event_hour":"' + substring(convert(varchar(10), b.event_date, 108), 1, 2) + '",' +
				'"event_minute":"' + substring(convert(varchar(10), b.event_date, 108), 4, 2) + '",' +
				'"channel_id":"' + b.channel_id + '",' +
				'"from_stage":"' + convert(varchar(3), b.from_wf_stage_no) + '",' +
				'"from_stage_desc":"' + isnull
					(
						(
							select x.description 
							from workflow_stage_master x
							where x.company_id = b.channel_id
								and x.country_code = b.country_code
								and x.transaction_type_code = 'ANCILLARY'
								and x.request_category = a.category
								and x.workflow_stage_no = b.from_wf_stage_no 
						), ''
					) + '",' +
				'"to_stage":"' + convert(varchar(3), b.to_wf_stage_no) + '",' +
				'"to_stage_desc":"' + isnull
					(
						(
							select x.description 
							from workflow_stage_master x
							where x.company_id = b.channel_id
								and x.country_code = b.country_code
								and x.transaction_type_code = 'ANCILLARY'
								and x.request_category = a.category
								and x.workflow_stage_no = b.to_wf_stage_no 
						), ''
					) + '",' +
				'"from_status":"' + b.from_status + '",' +
				'"from_status_desc":"' + dbo.code_description
					(
						a.company_id, 
						a.country_code, 
						@i_locale_id, 
						'ANCILLARYSTATUS', 
						b.from_status
					) + '",' +
				'"to_status":"' + b.to_status + '",' +
				'"to_status_desc":"' + dbo.code_description
					(
						a.company_id, 
						a.country_code, 
						@i_locale_id, 
						'ANCILLARYSTATUS', 
						b.to_status
					) + '",' +
				'"event_verb_id":"' + b.eventverb_id + '"' +
			'}'
		from #transaction_list a, ancillary_request_status_event_log b
		where a.transaction_type = 'ANCILLARY'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.request_ref_no = a.ref_no
			

		update #transaction_list
		set event_log_data = 
		(
			select string_agg
			(
				isnull(a.event_log_data, ''), ','
			)
			from #transaction_event_log_list a
			where a.ref_no = #transaction_list.ref_no
			group by a.ref_no
		)


		/* LOADING ANCILLARY USER ATTACHMENTS RECORDS */
		insert #transaction_attachments_list
		(
			ref_no,
			user_attachments_data
		)
		select a.ref_no,
			'{' +
				'"attached_at_transaction":"' + 'ANCILLARY' + '",' +
				'"category":"' + b.attachment_file_category + '",' +
				'"type":"' + b.attachment_file_type + '",' +
				'"id":"' + b.attachment_file_id + '",' +
				'"name":"' + b.attachment_file_name + '",' +
				'"extension":"' + right(b.attachment_file_name, charindex('.', reverse(b.attachment_file_name))) + '",' +
				'"path":"' + b.attachment_file_path + '"' +
			'}'
		from #transaction_list a, ancillary_request_user_attachments b
		where a.transaction_type = 'ANCILLARY'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.request_ref_no = a.ref_no

		update #transaction_list
		set user_attachments_data = 
		(
			select string_agg
			(
				isnull(a.user_attachments_data, ''), ','
			)
			from #transaction_attachments_list a
			where a.ref_no = #transaction_list.ref_no
			group by a.ref_no
		)


		/* UPDATING ASSIGNEE DETAILS FOR ANCILLARY REQUEST REGISTER*/
		update #transaction_list
		set assigned_to_emp_id = a.resource_emp_id,
			assigned_on_date = a.assigned_on_date
		from ancillary_request_assignment a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and #transaction_list.transaction_type = 'ANCILLARY'
			and a.request_ref_no = #transaction_list.ref_no
			and a.primary_resource_ind = 1


		/* UPDATING LATEST COMMENT FOR ANCILLARY REQUEST REGISTER*/
		update #transaction_list
		set comments = a.comments
		from ancillary_request_status_event_log a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and a.request_ref_no = #transaction_list.ref_no
			and a.eventverb_id = 'CUSTOMERPROGRESSUPDATE'
			and #transaction_list.transaction_type = 'ANCILLARY'


		/* UPDATING LAST STAGE INDICATION FOR ANCILLARY REQUEST REGISTER */
		update #transaction_list
		set last_stage_indication = 'true'
		from workflow_stage_master a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and #transaction_list.transaction_type = 'ANCILLARY'
			and a.transaction_type_code = 'ANCILLARY'
			and a.last_stage_ind = 1
			and a.request_category = 'ALL'
			and a.workflow_stage_no = #transaction_list.wf_stage

		update #transaction_list
		set last_stage_indication = 'true'
		from workflow_stage_master a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and #transaction_list.transaction_type = 'ANCILLARY'
			and a.transaction_type_code = 'ANCILLARY'
			and a.last_stage_ind = 1
			and a.request_category = #transaction_list.category
			and a.workflow_stage_no = #transaction_list.wf_stage	


		/* UPDATING LAST STATUS INDICATION FOR ANCILLARY REQUEST REGISTER */
		update #transaction_list
		set last_status_indication = 'true'
		from workflow_status_master a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and #transaction_list.transaction_type = 'ANCILLARY'
			and a.transaction_type_code = 'ANCILLARY'
			and a.last_status_ind = 1
			and a.request_category = 'ALL'
			and a.status_code = #transaction_list.status

		update #transaction_list
		set last_status_indication = 'true'
		from workflow_status_master a
		where a.company_id = #transaction_list.company_id
			and a.country_code = #transaction_list.country_code
			and #transaction_list.transaction_type = 'ANCILLARY'
			and a.transaction_type_code = 'ANCILLARY'
			and a.last_status_ind = 1
			and a.request_category = #transaction_list.category
			and a.status_code = #transaction_list.status

	end


	/* SELECTING THE LIST TO BE SENT TO THE REQUESTER */
	select
        '' as custom_info_list,
        '{' +
			'"request_ref_no":"' + a.ref_no + '",' +
			'"request_category":"' + a.category + '",' +
			'"request_category_desc":"' + a.category_desc + '",'+
			'"request_type":"' + a.type + '",' + 
			'"request_type_desc":"' + a.type_desc + '",' +
			'"request_wf_stage":"' + convert(varchar(2), a.wf_stage) + '",' +
			'"request_wf_stage_desc":"' + a.wf_stage_desc + '",' + 
			'"request_status":"' + a.status + '",' +
			'"request_status_desc":"'+ a.status_desc + '",' +
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
					select installation_date 
					from asset_master
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
			'"feedback_value":"' + 
				isnull((
					select overall_summary_code_value 
					from customer_feedback_summary
					where company_id = a.company_id
						and country_code = a.country_code
						and activity_ref_no = 'CS' + a.ref_no
				), '0') + '",' +
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
					isnull(
						(
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
						), 
						'"customer_address_line_1":"",'+
						'"customer_address_line_2":"",'+
						'"customer_address_line_3":"",'+
						'"customer_city":"",'+
						'"customer_state":"",'+
						'"customer_pincode":"",'+
						'"customer_country":"",'
					)
				) end
			) +			
			'"created_on_date":"' + isnull(convert(varchar(10),a.created_on_date,120),'') + '",' +
			'"created_on_hour":"' + isnull(substring(convert(varchar(10),a.created_on_date,108),1,2),'') + '",' +
			'"created_on_minute":"' + isnull(substring(convert(varchar(10),a.created_on_date,108),4,2),'') + '",' +
			'"assigned_on_date":"' + isnull(convert(varchar(10),a.assigned_on_date,120),'') + '",' +
			'"assigned_on_hour":"' + isnull(substring(convert(varchar(10),a.assigned_on_date,108),1,2),'') + '",' +
			'"assigned_on_minute":"' + isnull(substring(convert(varchar(10),a.assigned_on_date,108),4,2),'') + '",' +
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
			(				
				isnull 
				(
					(
						select '"assigned_to_emp_name":"' + title + ' ' + first_name + ' ' + last_name + '",' +
							'"assigned_to_emp_title":"' + title + '",' +
							'"assigned_to_emp_first_name":"' + first_name + '",' +
							'"assigned_to_emp_last_name":"' + last_name + '",' +
							'"assigned_to_emp_contact_no":"' + isnull(contact_mobile_no, '') + '",' +
							'"assigned_to_emp_contact_email":"' + isnull(email_id, '') + '",'
						from employee
						where company_id = a.company_id
							and country_code = a.country_code
							and employee_id = a.assigned_to_emp_id
					),
					(
						'"assigned_to_emp_name":"",' +
						'"assigned_to_emp_title":"",' +
						'"assigned_to_emp_first_name":"",' +
						'"assigned_to_emp_last_name":"",' +
						'"assigned_to_emp_contact_no":"",' +
						'"assigned_to_emp_contact_email":"",'
					)
				)					
			) +
			'"assigned_to_user_id":"' + isnull((
				select user_id
				from users
				where company_id = a.company_id
					and country_code = a.country_code
					and employee_id = a.assigned_to_emp_id
			), '') + '",' +
			'"assigned_to_emp_device_id":"' + isnull((
				select top(1) device_id 
				from device_register
				where company_id = a.company_id
					and country_code = a.country_code
					and employee_id = a.assigned_to_emp_id
					and app_id = (
						select top(1) subscription_code2
						from company_subscription_matrix
						where company_id = a.company_id
							and country_code = a.country_code
							and subscription_code1 = 'APPVERSION'
					)
					and active_ind = 1
			), '') + '",'+
			'"created_by_emp_id":"' + a.created_by_emp_id + '",' +
			(				
				isnull 
				(
					(
						select '"created_by_emp_name":"' + title + ' ' + first_name + ' ' + last_name + '",' +
							'"created_by_emp_title":"' + title + '",' +
							'"created_by_emp_first_name":"' + first_name + '",' +
							'"created_by_emp_last_name":"' + last_name + '",' +
							'"created_by_emp_contact_no":"' + isnull(contact_mobile_no, '') + '",' +
							'"created_by_emp_contact_email":"' + isnull(email_id, '') + '",'
						from employee
						where company_id = a.company_id
							and country_code = a.country_code
							and employee_id = a.created_by_emp_id
					),
					(
						'"created_by_emp_name":"",' +
						'"created_by_emp_title":"",' +
						'"created_by_emp_first_name":"",' +
						'"created_by_emp_last_name":"",' +
						'"created_by_contact_no":"",' +
						'"created_by_contact_email":"",'
					)
				)				
			) +
			'"created_by_user_id":"' + (
				select user_id
				from users
				where company_id = a.company_id
					and country_code = a.country_code
					and employee_id = a.created_by_emp_id
			) + '",' +	
			'"created_by_emp_device_id":"' + isnull((
				select top(1) device_id 
				from device_register
				where company_id = a.company_id
					and country_code = a.country_code
					and employee_id = a.created_by_emp_id
					and app_id = (
						select top(1) subscription_code2
						from company_subscription_matrix
						where company_id = a.company_id
							and country_code = a.country_code
							and subscription_code1 = 'APPVERSION'
					)
					and active_ind = 1
			), '') + '",'+
			'"last_stage_indication":"' + a.last_stage_indication + '",' +
			'"last_status_indication":"' + a.last_status_indication + '",' +
			'"last_refreshed_on_date":"' + isnull(convert(varchar(10), sysdatetimeoffset(), 120), '') + '",' +
			'"last_refreshed_on_hour":"' + isnull(substring(convert(varchar(10), sysdatetimeoffset(), 108), 1, 2),'') + '",' +
			'"last_refreshed_on_minute":"' + isnull(substring(convert(varchar(10), sysdatetimeoffset(), 108), 4, 2),'') + '",' +       
			'"last_accessed_feature":"' + isnull((
				select feature_id   
				from company_feature
				where company_id = a.company_id
					and country_code = a.country_code
					and channel_id = 'mobile'
					and screen_id = 
					(
						case(a.transaction_type)
							when 'CALL' then 
							(
								select top(1) eventverb_id
								from call_status_event_log
								where company_id = a.company_id
									and country_code = a.country_code
									and call_ref_no = a.ref_no
								order by event_id desc
							)
							when 'ANCILLARY' then 
							(
								select top(1) eventverb_id
								from ancillary_request_status_event_log
								where company_id = a.company_id
									and country_code = a.country_code
									and request_ref_no = a.ref_no
								order by event_id desc
							)
							else ''
						end
					)
			), '') + '",' +
			'"chat_ref_no":"' + isnull(chat_ref_no, '') + '",' +
			'"chat_receipients":"' + isnull(chat_receipients, '') + '",' +
			'"event_log":[' + isnull(a.event_log_data, '') + '],' +
			'"attachments":[' + isnull(a.user_attachments_data, '') + '],' +
			dbo.fn_get_client_specific_fields_for_my_activities(
				@i_client_id,
				@i_country_code,
				@i_session_id,
				@i_user_id,
				@i_locale_id,
				a.ref_no,
				a.transaction_type
			) +  
			'"rec_tstamp":"' + cast(convert(uniqueidentifier,cast(a.rec_tstamp as binary)) as varchar(36)) + '"' +
		'}' as o_custom_info_json
    from #transaction_list a
	order by a.created_on_date desc

END

  

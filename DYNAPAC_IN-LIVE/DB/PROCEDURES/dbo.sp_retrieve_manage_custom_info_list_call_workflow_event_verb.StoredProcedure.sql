DROP PROCEDURE IF EXISTS [dbo].[sp_retrieve_manage_custom_info_list_call_workflow_event_verb]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_call_workflow_event_verb] 
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
	
	declare @p_call_category varchar(30)

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
			

	select @p_call_category = paramval 
	from #inputparams 
	where paramname = 'call_category'
		
	
	select '' as custom_info_list,
		'{' +
			'"req_catg":"' + request_category + '",' +
			'"req_type":"' + request_type + '",' +
			'"from_wf_stage":"' + cast(from_workflow_stage as varchar(3)) + '",' +
			'"from_wf_status":"' + from_status + '",' +
			'"to_wf_stage":"' + CAST(to_workflow_stage as varchar(3)) + '",' +
			'"to_wf_status":"' + to_status + '",' +
			'"to_wf_status_desc":"'+ dbo.code_description(@i_client_id, @i_country_code, @i_locale_id, 'CALLSTATUS', to_status) + '",' +
			'"event_verb":"' + eventverb_id + '"' +
		'}'
	as o_custom_info_json
	from workflow_eventverb_list
	where company_id = @i_client_id
		and country_code = @i_country_code
		and transaction_type_code = 'CALL'
		and (request_category = isnull(@p_call_category, request_category)
		or request_category = 'ALL')
	union all
	select '' as custom_info_list,
		'{' +
			'"req_catg":"' + request_category + '",' +
			'"req_type":"' + request_type + '",' +
			'"from_wf_stage":"' + cast(from_workflow_stage as varchar(3)) + '",' +
			'"from_wf_status":"' + from_status + '",' +
			'"to_wf_stage":"' + CAST(to_workflow_stage as varchar(3)) + '",' +
			'"to_wf_status":"' + to_status + '",' +
			'"to_wf_status_desc":"'+ dbo.code_description(@i_client_id, @i_country_code, @i_locale_id, 'CALLSTATUS', to_status) + '",' +
			'"event_verb":"' + 'STATUSCHANGE' + '"' +
		'}'
	as o_custom_info_json
	from workflow_status_link b
	where b.company_id = @i_client_id
		and b.country_code = @i_country_code
		and b.transaction_type_code = 'CALL'
		and (b.request_category = isnull(@p_call_category, b.request_category)
		or b.request_category = 'ALL')
		and b.request_category + b.request_type + 
			cast(b.from_workflow_stage as varchar(3)) + b.from_status + 
			cast(b.to_workflow_stage as varchar(3)) + b.to_status 
			not in ( 
				select c.request_category + c.request_type +
					cast(c.from_workflow_stage as varchar(3)) + c.from_status +
					cast(c.to_workflow_stage as varchar(3)) + c.to_status
				from workflow_eventverb_list c
				where c.company_id = @i_client_id
					and c.country_code = @i_country_code
					and c.transaction_type_code = 'CALL'
		  	)					

	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

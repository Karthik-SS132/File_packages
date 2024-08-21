/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_workflow_event_verb]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_workflow_event_verb')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_workflow_event_verb]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
 * Function to retrieve list of custom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_workflow_event_verb] 
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
	--request_type
	--request_category
	--transaction_type
	declare @p_request_type varchar(30), 
		@p_request_category varchar(30), 
		@p_transaction_type varchar(30),
		@p_channel varchar(10)

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

	select @p_transaction_type = paramval 
	from #inputparams 
	where paramname = 'transaction_type'	
	
	select @p_request_category = paramval 
	from #inputparams 
	where paramname = 'request_category'

	select @p_request_type = paramval 
	from #inputparams 
	where paramname = 'request_type'
	select @p_channel = paramval 
	from #inputparams 
	where paramname = 'channel'	

	select @p_channel = isnull(@p_channel, 'mobile')										 
	select '' as custom_info_list,
		'{' +
			'"req_catg":"' + request_category + '",' +
			'"req_type":"' + request_type + '",' +
			'"from_wf_stage":"' + cast(from_workflow_stage as varchar(3)) + '",' +
			'"from_wf_status":"' + from_status + '",' +
			'"to_wf_stage":"' + CAST(to_workflow_stage as varchar(3)) + '",' +
			'"to_wf_status":"' + to_status + '",' +
			'"to_wf_status_desc":"'+ dbo.code_description(@i_client_id, @i_country_code, @i_locale_id, 'CALLSTATUS', to_status) + '",' +
			'"event_verb":"' + eventverb_id + '",' +
			'"feature_id":"' + isnull((
				select feature_id
				from company_feature
				where company_id = @i_client_id
					and country_code = @i_country_code
					and screen_id = eventverb_id
					and channel_id = @p_channel
			), '') + '"' +
		'}'
	as o_custom_info_json
	from workflow_eventverb_list
	where company_id = @i_client_id
		and country_code = @i_country_code
		and transaction_type_code = isnull(@p_transaction_type, transaction_type_code)
		and (request_category = isnull(@p_request_category, request_category)
		or request_category = 'ALL')
		and (request_type = isnull(@p_request_type, request_type)
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
			'"event_verb":"' + 'STATUSCHANGE' + '",' +
			'"feature_id":"' + isnull((
				select feature_id
				from company_feature
				where company_id = @i_client_id
					and country_code = @i_country_code
					and screen_id = 'STATUSCHANGE'
					and channel_id = @p_channel
			), '') + '"' +
		'}'
	as o_custom_info_json
	from workflow_status_link b
	where b.company_id = @i_client_id
		and b.country_code = @i_country_code
		and b.transaction_type_code = isnull(@p_transaction_type, b.transaction_type_code)
		and (b.request_type = isnull(@p_request_type, b.request_type)
		or b.request_category = 'ALL')
		and (b.request_category = isnull(@p_request_category, b.request_category)
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
					and c.transaction_type_code = isnull(@p_transaction_type, c.transaction_type_code)
		  	)					

	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END


GO

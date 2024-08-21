/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_company_feature_access_order]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_company_feature_access_order')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_company_feature_access_order]
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
 * Function to retrieve list of custom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_company_feature_access_order] 
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
	declare @p_request_type varchar(30)
	declare @p_request_category varchar(30)
	declare @p_transaction_type varchar(30)

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
	
	select '' as custom_info_list,
		'{' +
			'"req_catg":"' + request_category + '",' +
			'"req_type":"' + request_type + '",' +
			'"req_stage":"' + convert(varchar(1), request_wf_stage_no) + '",' +
			'"req_status":"' + request_wf_status + '",' +
			'"from_feature_id":"' + current_feature_id + '",' +
			'"to_feature_id":"' + next_feature_id + '"' +
		'}'
	as o_custom_info_json
	from company_feature_access_order
	where company_id = @i_client_id
		and country_code = @i_country_code
		and transaction_type_code = isnull(@p_transaction_type, transaction_type_code)
		and (request_type = isnull(@p_request_type, request_type)
		or request_category = 'ALL')
		and (request_category = isnull(@p_request_category, request_category)
		or request_category = 'ALL')
		and next_feature_id !='MUSERATTACH'
		and current_feature_id !='MUSERATTACH'

	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

DROP PROCEDURE IF EXISTS [dbo].[sp_retrieve_manage_custom_info_list_mserviceAI_suggestionList]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_mserviceAI_suggestionList] 
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

	declare @p_suggestion_list_type nvarchar(50)


	/* GET THE INPUT DETAILS FROM MESSAGE PAYLOAD */
	select @p_suggestion_list_type = isnull(json_value(@i_inputparam_xml, '$.suggestionList.listType'), '')


	if (@p_suggestion_list_type = 'WORKFLOW') --SUGGESTION LIST TO RETURN NEXT ACTION
	begin

		declare @p_workflow_transaction_type varchar(30),
			@p_workflow_transaction_ref_no varchar(30),
			@p_workflow_request_category varchar(10),
			@p_workflow_request_type nvarchar(10),
			@p_workflow_from_wf_stage tinyint,
			@p_workflow_from_status varchar(2)

			
		select @p_workflow_transaction_type = isnull(json_value(@i_inputparam_xml, '$.msgBody.custom.trans_type'), '')
		select @p_workflow_transaction_ref_no = isnull(json_value(@i_inputparam_xml, '$.msgBody.custom.transaction_ref_no'), '')

		if (@p_workflow_transaction_type = 'CALL') --GETTING REQUEST INFO FOR THE CALL REQUEST
		begin

			select @p_workflow_request_category = call_category,
				@p_workflow_request_type = call_type,
				@p_workflow_from_wf_stage = call_wf_stage_no,
				@p_workflow_from_status = call_status
			from call_register
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_workflow_transaction_ref_no

		end
		else if (@p_workflow_transaction_type = 'ANCILLARY') --GETTING REQUEST INFO FOR THE ANCILLARY REQUEST
		begin

			select @p_workflow_request_category = request_category,
				@p_workflow_request_type = request_type,
				@p_workflow_from_wf_stage = request_wf_stage_no,
				@p_workflow_from_status = request_status
			from ancillary_request_register
			where company_id = @i_client_id
				and country_code = @i_country_code
				and request_ref_no = @p_workflow_transaction_ref_no

		end


		/* GETTING THE NEXT ACTIONS FOR CURRENT STAGE AND STATUS */
		if not exists --CATEGORY -> EXACT MATCH AND TYPE -> EXACT MATCH
		(
			select 1 from workflow_eventverb_list
			where company_id = @i_client_id
				and country_code = @i_country_code
				and transaction_type_code = @p_workflow_transaction_type
				and request_category = @p_workflow_request_category
				and request_type = @p_workflow_request_type
				and from_workflow_stage = @p_workflow_from_wf_stage
				and from_status = @p_workflow_from_status	
		)
		begin

			select @p_workflow_request_type = 'ALL'

			if not exists --CATEGORY -> EXACT MATCH AND TYPE -> ALL
			(
				select 1 from workflow_eventverb_list
				where company_id = @i_client_id
					and country_code = @i_country_code
					and transaction_type_code = @p_workflow_transaction_type
					and request_category = @p_workflow_request_category
					and request_type = @p_workflow_request_type
					and from_workflow_stage = @p_workflow_from_wf_stage
					and from_status = @p_workflow_from_status	
			)
			begin

				select @p_workflow_request_category = 'ALL'

			end

		end


		select  '' as custom_info_list,
		'{' +
			'"title":"' + dbo.code_description(company_id, country_code, @i_locale_id, ('WFLOWEVERB' + @p_workflow_transaction_type), eventverb_id) + '",' +
			'"value":"' + '@' + lower(eventverb_id) + '",' +
			'"suggestionGroup":"' + @p_suggestion_list_type + '",' +
			'"custom":' + 
			'{' + 
				'"eventverb":"' + lower(eventverb_id) + '"' +
			'}' +
		'}' as o_custom_info_json
		from workflow_eventverb_list
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code = @p_workflow_transaction_type
			and request_category = @p_workflow_request_category
			and request_type = @p_workflow_request_type
			and from_workflow_stage = @p_workflow_from_wf_stage
			and from_status = @p_workflow_from_status

	end
	else if (@p_suggestion_list_type = 'CQMEQUIPCATG')
	begin

		select  '' as custom_info_list,
		'{' +
			'"title":"' + dbo.code_description(company_id, country_code, @i_locale_id,'CQMEQUIPCATG', code) + '",' +
			'"value":"' + '@CQMEQUIPCATG' + '",' +
			'"custom":' + 
			'{' + 
				'"cqmEquipCatg":"' + code + '"' +
			'}' +
		'}' as o_custom_info_json
		from code_table
		where company_id = @i_client_id
			and country_code = @i_country_code
			and code_type = 'CQMEQUIPCATG'

	end
	else if (@p_suggestion_list_type = 'CQMEQUIPMODELCRANE')
	begin

		select  '' as custom_info_list,
		'{' +
			'"title":"' + dbo.code_description(company_id, country_code, @i_locale_id,'CQMEQUIPMODELCRANE', code) + '",' +
			'"value":"' + '@CQMEQUIPMODELCRANE' + '",' +
			'"custom":' + 
			'{' + 
				'"cqmEuipModelCrane":"' + code + '"' +
			'}' +
		'}' as o_custom_info_json
		from code_table
		where company_id = @i_client_id
			and country_code = @i_country_code
			and code_type = 'CQMEQUIPMODELCRANE'

	end
	else if (@p_suggestion_list_type = 'CQMEQUIPMODELEXCA')
	begin

		select  '' as custom_info_list,
		'{' +
			'"title":"' + dbo.code_description(company_id, country_code, @i_locale_id,'CQMEQUIPMODELEXCA', code) + '",' +
			'"value":"' + '@CQMEQUIPMODELEXCA' + '",' +
			'"custom":' + 
			'{' + 
				'"cqmEquipModelExca":"' + code + '"' +
			'}' +
		'}' as o_custom_info_json
		from code_table
		where company_id = @i_client_id
			and country_code = @i_country_code
			and code_type = 'CQMEQUIPMODELEXCA'

	end
	else if (@p_suggestion_list_type = 'CUST_USER_MAPPED_ASSET_LIST')
	begin

		select  '' as custom_info_list,
		'{' +
			'"title":"' + asset_id + ' [' + equipment_id + '] ' + '",' +
			'"value":"' + '@ASSETID' + '",' +
			'"custom":' + 
			'{' + 
				'"asset_id":"' + asset_id + '"' +
			'}' +
		'}' as o_custom_info_json
		from customer_user_mapping_to_assets
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id in (select employee_id from users where company_id = @i_client_id and country_code = @i_country_code and user_id = @i_user_id)

	end

	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'acgw'

select @p_country_code = 'in'


if not exists (select 1 from workflow_eventverb_list where company_id = 'acgw' and country_code = 'in' and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and request_type = 'ALL' and from_workflow_stage = 2 and from_status = 'A' and to_workflow_stage = 3 and to_status = 'CO' and eventverb_id = 'COMPLETE')
	begin
		insert into workflow_eventverb_list (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, eventverb_id,lcl_value,ucl_value,last_update_id)  
		select 'acgw', 'in', 'ANCILLARY', 'QU', 'ALL', 2, 'A', 3, 'CO', 'COMPLETE','NA','NA', 'system'
	end
	
	if not exists (select 1 from workflow_eventverb_list where company_id = 'acgw' and country_code = 'in' and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and request_type = 'ALL' and from_workflow_stage = 3 and from_status = 'CO' and to_workflow_stage = 3 and to_status = 'CL' and eventverb_id = 'CLOSE')
	begin
		insert into workflow_eventverb_list (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, eventverb_id,lcl_value,ucl_value, last_update_id)  
		select 'acgw', 'in', 'ANCILLARY', 'QU', 'ALL', 3, 'CO', 3, 'CL', 'CLOSE','NA','NA', 'system'
	end

delete from workflow_eventverb_list where company_id = 'acgw' and country_code = 'in'  and transaction_type_code = 'ANCILLARY' and request_category = 'CS'

insert workflow_eventverb_list (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, eventverb_id,lcl_value,ucl_value,last_update_id) 
select 'acgw', 'in', 'ANCILLARY', 'CS', 'ALL', 1, 'O', 2, 'A', 'ASSIGN','NA','NA', 'system'

insert workflow_eventverb_list (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, eventverb_id,lcl_value,ucl_value,last_update_id) 
select 'acgw', 'in', 'ANCILLARY', 'CS', 'ALL', 2, 'A', 2, 'A', 'ASSIGN','NA','NA', 'system'

insert workflow_eventverb_list (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, eventverb_id,lcl_value,ucl_value,last_update_id) 
select 'acgw', 'in', 'ANCILLARY', 'CS', 'ALL', 2, 'A', 3, 'I', 'PLACECALL','NA','NA', 'system'

insert workflow_eventverb_list (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, eventverb_id,lcl_value,ucl_value,last_update_id) 
select 'acgw', 'in', 'ANCILLARY', 'CS', 'ALL', 2, 'A', 4, 'CO', 'CAPTUREFEEDBACK','NA','NA', 'system'

insert workflow_eventverb_list (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, eventverb_id,lcl_value,ucl_value,last_update_id) 
select 'acgw', 'in', 'ANCILLARY', 'CS', 'ALL', 3, 'I', 3, 'I', 'PLACECALL','NA','NA', 'system'

insert workflow_eventverb_list (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, eventverb_id,lcl_value,ucl_value,last_update_id) 
select 'acgw', 'in', 'ANCILLARY', 'CS', 'ALL', 3, 'I', 4, 'CO', 'CAPTUREFEEDBACK','NA','NA','system'


if exists (select 1 from company_master where company_id = @p_company_id and ho_country_code = @p_country_code)
begin
	if not exists 
	(
		select 1 from company_feature 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and feature_id = 'MHMMYSERVFIL'
	)
	begin
		insert company_feature 
		(
			company_id, 
			country_code, 
			feature_id,
			feature_name,
			feature_display_label,
			program_reference,
			menu_display_ind,
			screen_id,
			channel_id,
			last_update_id
		) 	
		select @p_company_id,
			@p_country_code,
			'MHMMYSERVFIL',
			'My Service Call Filter',
			'My Service Call Filter',
			'NULL',
			'0',
			'my_service_call_filter',
			'mobile',
			'system'		
	end

	if not exists 
	(
		select 1 from company_feature 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and feature_id = 'MHMMYSERVREF'
	)
	begin
		insert company_feature 
		(
			company_id, 
			country_code, 
			feature_id,
			feature_name,
			feature_display_label,
			program_reference,
			menu_display_ind,
			screen_id,
			channel_id,
			last_update_id
		) 	
		select @p_company_id,
			@p_country_code,
			'MHMMYSERVREF',
			'My Service Call Refresh',
			'My Service Call Refresh',
			'NULL',
			'1',
			'my_service_call_refresh',
			'mobile',
			'system'		
	end

end


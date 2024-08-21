declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'mvgl'

select @p_country_code = 'in'


if not exists (select 1 from workflow_status_link where company_id = 'mvgl' and country_code = 'in' and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and request_type = 'ALL' and from_workflow_stage = 2 and from_status = 'A' and to_workflow_stage = 3 and to_status = 'CO')
	begin
		insert into workflow_status_link (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, last_update_id)   
		select 'mvgl', 'in', 'ANCILLARY', 'QU', 'ALL', 2, 'A', 3, 'CO', 'system'
	end
	
	if not exists (select 1 from workflow_status_link where company_id = 'mvgl' and country_code = 'in' and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and request_type = 'ALL' and from_workflow_stage = 3 and from_status = 'CO' and to_workflow_stage = 3 and to_status = 'CL')
	begin
		insert into workflow_status_link (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, last_update_id)   
		select 'mvgl', 'in', 'ANCILLARY', 'QU', 'ALL', 3, 'CO', 3, 'CL', 'system'
	end
delete from workflow_status_link where company_id = 'mvgl' and country_code = 'in'  and transaction_type_code = 'ANCILLARY' and request_category = 'CS'

insert workflow_status_link (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, last_update_id) 
select 'mvgl', 'in', 'ANCILLARY', 'CS', 'ALL', 1, 'O', 2, 'A', 'system'

insert workflow_status_link (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, last_update_id) 
select 'mvgl', 'in', 'ANCILLARY', 'CS', 'ALL', 2, 'A', 3, 'I', 'system'	

insert workflow_status_link (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, last_update_id) 
select 'mvgl', 'in', 'ANCILLARY', 'CS', 'ALL', 3, 'I', 4, 'CO', 'system'	


if not exists (select 1 from workflow_status_link where company_id = 'mvgl' and country_code = 'in' 
and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and request_type = 'ALL' 
and from_workflow_stage = 1 and from_status = 'O' and to_workflow_stage = 2 and to_status = 'A')
	begin
		insert into workflow_status_link (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, last_update_id)   
		select 'mvgl', 'in', 'ANCILLARY', 'QU', 'ALL', 1, 'O', 2, 'A', 'system'
	end


if not exists (select 1 from workflow_status_link where company_id = 'mvgl' and country_code = 'in' 
and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and request_type = 'ALL' 
and from_workflow_stage = 2 and from_status = 'A' and to_workflow_stage = 3 and to_status = 'I')
	begin
		insert into workflow_status_link (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, last_update_id)   
		select 'mvgl', 'in', 'ANCILLARY', 'QU', 'ALL', 2, 'A', 3, 'I', 'system'
	end
	

if not exists (select 1 from workflow_status_link where company_id = 'mvgl' and country_code = 'in' 
and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and request_type = 'ALL' 
and from_workflow_stage = 3 and from_status = 'I' and to_workflow_stage = 4 and to_status = 'CO')
	begin
		insert into workflow_status_link (company_id, country_code, transaction_type_code, request_category, request_type, from_workflow_stage, from_status, to_workflow_stage, to_status, last_update_id)   
		select 'mvgl', 'in', 'ANCILLARY', 'QU', 'ALL', 3, 'I', 4, 'CO', 'system'
	end
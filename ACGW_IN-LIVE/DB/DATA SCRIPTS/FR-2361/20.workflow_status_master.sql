If not exists (select 1 from workflow_status_master where company_id = 'acgw' and country_code = 'in' and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and status_code = 'CL')
	begin
	
		insert into workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)  
		select 'acgw', 'in', 'ANCILLARY', 'QU', 'CL', 0, 1, 'system'
		
	end

If not exists (select 1 from workflow_status_master where company_id = 'acgw' and country_code = 'in' and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and status_code = 'CO')
	begin
	
		insert into workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)  
		select 'acgw', 'in', 'ANCILLARY', 'QU', 'CO', 0, 1, 'system'
		
	end

	
delete from workflow_status_master where company_id = 'acgw' and country_code = 'in'  and transaction_type_code = 'ANCILLARY' and request_category = 'CS'

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'acgw', 'in', 'ANCILLARY', 'CS', 'A', 0, 0, 'system' 

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'acgw', 'in', 'ANCILLARY', 'CS', 'CO', 0, 1, 'system' 

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'acgw', 'in', 'ANCILLARY', 'CS', 'I', 0, 0, 'system' 

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'acgw', 'in', 'ANCILLARY', 'CS', 'O', 1, 0, 'system' 

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'acgw', 'in', 'ANCILLARY', 'CS', 'CL', 0, 1, 'system' 
	

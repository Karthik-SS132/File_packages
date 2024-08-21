declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'mvgl'

select @p_country_code = 'in'


If not exists (select 1 from workflow_status_master where company_id = 'mvgl' and country_code = 'in' and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and status_code = 'CL')
	begin
	
		insert into workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)  
		select 'mvgl', 'in', 'ANCILLARY', 'QU', 'CL', 0, 1, 'system'
		
	end

If not exists (select 1 from workflow_status_master where company_id = 'mvgl' and country_code = 'in' 
and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and status_code = 'A')
	begin
	
		insert into workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)  
		select 'mvgl', 'in', 'ANCILLARY', 'QU', 'A', 0, 0, 'system'
		
	end
	

If not exists (select 1 from workflow_status_master where company_id = 'mvgl' and country_code = 'in' 
and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and status_code = 'CO')
	begin
	
		insert into workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)  
		select 'mvgl', 'in', 'ANCILLARY', 'QU', 'CO', 0, 1, 'system'
		
	end

If not exists (select 1 from workflow_status_master where company_id = 'mvgl' and country_code = 'in' 
and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and status_code = 'I')
	begin
	
		insert into workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)  
		select 'mvgl', 'in', 'ANCILLARY', 'QU', 'I', 0, 0, 'system'
		
	end

If not exists (select 1 from workflow_status_master where company_id = 'mvgl' and country_code = 'in' 
and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and status_code = 'O')
	begin
	
		insert into workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)  
		select 'mvgl', 'in', 'ANCILLARY', 'QU', 'O', 1, 0, 'system'
		
	end
	
	
delete from workflow_status_master where company_id = 'mvgl' and country_code = 'in'  and transaction_type_code = 'ANCILLARY' and request_category = 'CS'

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'mvgl', 'in', 'ANCILLARY', 'CS', 'A', 0, 0, 'system' 

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'mvgl', 'in', 'ANCILLARY', 'CS', 'CO', 0, 1, 'system' 

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'mvgl', 'in', 'ANCILLARY', 'CS', 'I', 0, 0, 'system' 

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'mvgl', 'in', 'ANCILLARY', 'CS', 'O', 1, 0, 'system' 
	

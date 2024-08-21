declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'acopco'

select @p_country_code = 'in'


If not exists (select 1 from workflow_status_master where company_id = 'acopco' and country_code = 'in' and transaction_type_code = 'ANCILLARY' and request_category = 'QU' and status_code = 'CL')
	begin
	
		insert into workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)  
		select 'acopco', 'in', 'ANCILLARY', 'QU', 'CL', 0, 1, 'system'
		
	end
	
delete from workflow_status_master where company_id = 'acopco' and country_code = 'in'  and transaction_type_code = 'ANCILLARY' and request_category = 'CS'

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'acopco', 'in', 'ANCILLARY', 'CS', 'A', 0, 0, 'system' 

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'acopco', 'in', 'ANCILLARY', 'CS', 'CO', 0, 1, 'system' 

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'acopco', 'in', 'ANCILLARY', 'CS', 'I', 0, 0, 'system' 

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'acopco', 'in', 'ANCILLARY', 'CS', 'O', 1, 0, 'system' 
	

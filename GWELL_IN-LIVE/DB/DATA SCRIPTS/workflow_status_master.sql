declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'gwell'

select @p_country_code = 'in'


delete from workflow_status_master where company_id = 'gwell' and country_code = 'in'  and transaction_type_code = 'ANCILLARY' and request_category = 'CS'

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'gwell', 'in', 'ANCILLARY', 'CS', 'AC', 0, 0, 'system' 

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'gwell', 'in', 'ANCILLARY', 'CS', 'CL', 0, 1, 'system'

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'gwell', 'in', 'ANCILLARY', 'CS', 'NR', 0, 0, 'system'

insert workflow_status_master (company_id, country_code, transaction_type_code, request_category, status_code, first_status_ind, last_status_ind, last_update_id)
select 'gwell', 'in', 'ANCILLARY', 'CS', 'O', 1, 0, 'system' 


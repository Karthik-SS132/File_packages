declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'gwell'

select @p_country_code = 'in'


delete from workflow_stage_master where company_id = 'gwell' and country_code = 'in' and transaction_type_code = 'ANCILLARY' and request_category = 'CS'

insert workflow_stage_master (company_id, country_code, transaction_type_code, request_category, workflow_stage_no, description, first_stage_ind, last_stage_ind, last_update_id) 
select 'gwell', 'in', 'ANCILLARY', 'CS', 1, 'CREATION', 1, 0, 'system' 

insert workflow_stage_master (company_id, country_code, transaction_type_code, request_category, workflow_stage_no, description, first_stage_ind, last_stage_ind, last_update_id) 
select 'gwell', 'in', 'ANCILLARY', 'CS', 2, 'CLOSURE', 0, 1, 'system' 


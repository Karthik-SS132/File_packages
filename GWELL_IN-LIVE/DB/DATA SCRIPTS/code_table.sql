declare @p_company_id varchar(20), @p_country_code varchar(5)

set @p_company_id = 'gwell'

set @p_country_code = 'in'


delete from code_table where company_id = 'gwell' and country_code = 'in' and code_type in ('NORESPONSECSCD')

Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'gwell','in','NORESPONSECSCD','NP','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'gwell','in','NORESPONSECSCD','NR','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'gwell','in','NORESPONSECSCD','WN','system'



delete from code_table where company_id = 'gwell' and country_code = 'in' and code_type in ('CALLSTATUS') and code='AC'

Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'gwell','in','CALLSTATUS','AC','system'
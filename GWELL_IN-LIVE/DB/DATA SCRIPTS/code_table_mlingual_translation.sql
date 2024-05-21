declare @p_company_id varchar(20), @p_country_code varchar(5)

set @p_company_id = 'gwell'

set @p_country_code = 'in'


delete from code_table_mlingual_translation where company_id = 'gwell' and country_code = 'in' and code_type = 'NORESPONSECSCD'

Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'gwell','in','NORESPONSECSCD','NP','ALL','Not Picking the Phone','Not Picking the Phone','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'gwell','in','NORESPONSECSCD','NR','ALL','Not Reachable','Not Reachable','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'gwell','in','NORESPONSECSCD','WN','ALL','Wrong Number','Wrong Number','system'



delete from code_table_mlingual_translation where company_id = 'gwell' and country_code = 'in' and code_type = 'CALLSTATUS' and code='AC'

Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'gwell','in','CALLSTATUS','AC','ALL','Action Required','Action Required','system'
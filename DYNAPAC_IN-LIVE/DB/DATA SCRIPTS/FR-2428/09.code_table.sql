declare @p_company_id varchar(20), @p_country_code varchar(5)

set @p_company_id = 'dynapac'

set @p_country_code = 'in'


delete from code_table where company_id = 'dynapac' and country_code = 'in' and code_type in ('CQMEQUIPCATG')

Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','AC','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','AL','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','AM','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','CE','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','PT','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','WS','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','WE','system'

delete from code_table where company_id='dynapac' and country_code='in' and code_type='EQUIPOEM'

insert code_table(company_id,country_code,code_type,code,last_update_id)
select 'dynapac','in','EQUIPOEM','dynapac','system'


delete from code_table where company_id = 'dynapac' and country_code = 'in' and code_type = 'ANCILLARYSTATUS'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'ANCILLARYSTATUS', 'O', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'ANCILLARYSTATUS', 'A', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'ANCILLARYSTATUS', 'I', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'ANCILLARYSTATUS', 'CO', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'ANCILLARYSTATUS', 'CL', 'system'

delete from code_table where company_id = 'dynapac' and country_code = 'in' and code_type = 'WFLOWEVERBANCILLARY'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'WFLOWEVERBANCILLARY', 'CLOSE', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'WFLOWEVERBANCILLARY', 'COMPLETE', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'WFLOWEVERBANCILLARY', 'GENERATEPE', 'system'


delete from code_table where company_id = 'dynapac' and country_code = 'in' and code_type = 'CUSTCONTCATG'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'CUSTCONTCATG', 'OWNER', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'CUSTCONTCATG', 'SITEINCHG', 'system'

delete from code_table where company_id = 'dynapac' and country_code = 'in' and code_type = 'CUSTCONTTYPE'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'CUSTCONTTYPE', 'OWNER', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'CUSTCONTTYPE', 'SITEINCHG', 'system'

delete from code_table where company_id = 'dynapac' and country_code = 'in' and code_type = 'ANCILLARYATTACHPATH'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'dynapac', 'in', 'ANCILLARYATTACHPATH', 'ancillary_attachments', 'system'



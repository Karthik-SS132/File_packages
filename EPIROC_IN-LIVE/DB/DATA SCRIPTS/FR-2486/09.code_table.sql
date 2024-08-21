declare @p_company_id varchar(20), @p_country_code varchar(5)

set @p_company_id = 'epiroc'

set @p_country_code = 'in'




delete from code_table where company_id='epiroc' and country_code='in' and code_type='EQUIPOEM'

insert code_table(company_id,country_code,code_type,code,last_update_id)
select 'epiroc','in','EQUIPOEM','epiroc','system'


delete from code_table where company_id = 'epiroc' and country_code = 'in' and code_type = 'ANCILLARYSTATUS'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'ANCILLARYSTATUS', 'O', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'ANCILLARYSTATUS', 'A', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'ANCILLARYSTATUS', 'I', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'ANCILLARYSTATUS', 'CO', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'ANCILLARYSTATUS', 'CL', 'system'

delete from code_table where company_id = 'epiroc' and country_code = 'in' and code_type = 'WFLOWEVERBANCILLARY'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'WFLOWEVERBANCILLARY', 'CLOSE', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'WFLOWEVERBANCILLARY', 'COMPLETE', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'WFLOWEVERBANCILLARY', 'GENERATEPE', 'system'


delete from code_table where company_id = 'epiroc' and country_code = 'in' and code_type = 'CUSTCONTCATG'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'CUSTCONTCATG', 'OWNER', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'CUSTCONTCATG', 'SITEINCHG', 'system'

delete from code_table where company_id = 'epiroc' and country_code = 'in' and code_type = 'CUSTCONTTYPE'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'CUSTCONTTYPE', 'OWNER', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'CUSTCONTTYPE', 'SITEINCHG', 'system'

delete from code_table where company_id = 'epiroc' and country_code = 'in' and code_type = 'ANCILLARYATTACHPATH'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'epiroc', 'in', 'ANCILLARYATTACHPATH', 'ancillary_attachments', 'system'



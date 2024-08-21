declare @p_company_id varchar(20), @p_country_code varchar(5)

set @p_company_id = 'acopco'

set @p_country_code = 'in'


delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'ANCILLARYSTATUS'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'ANCILLARYSTATUS', 'O', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'ANCILLARYSTATUS', 'A', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'ANCILLARYSTATUS', 'I', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'ANCILLARYSTATUS', 'CO', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'ANCILLARYSTATUS', 'CL', 'system'

delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'WFLOWEVERBANCILLARY'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'WFLOWEVERBANCILLARY', 'CLOSE', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'WFLOWEVERBANCILLARY', 'COMPLETE', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'WFLOWEVERBANCILLARY', 'GENERATEPE', 'system'


delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'CUSTCONTCATG'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'CUSTCONTCATG', 'OWNER', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'CUSTCONTCATG', 'SITEINCHG', 'system'

delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'CUSTCONTTYPE'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'CUSTCONTTYPE', 'OWNER', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'CUSTCONTTYPE', 'SITEINCHG', 'system'

delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'ANCILLARYATTACHPATH'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'ANCILLARYATTACHPATH', 'ancillary_attachments', 'system'

delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'EQUIPOEM'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'EQUIPOEM', 'atlascopco', 'system'

delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type in ('CQMEQUIPMODELLT')

Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'acopco','in','CQMEQUIPMODELLT','BLT','system'

Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'acopco','in','CQMEQUIPMODELLT','DLT','system'

Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'acopco','in','CQMEQUIPMODELLT','ELT','system'


delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'CUSTCONTCATG'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'CUSTCONTCATG', 'OWNER', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'CUSTCONTCATG', 'SITEINCHG', 'system'

delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'CUSTCONTTYPE'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'CUSTCONTTYPE', 'OWNER', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'CUSTCONTTYPE', 'SITEINCHG', 'system'


delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'EQUIPOEM'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'EQUIPOEM', 'ACCT', 'system'




delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'EQUIPCATG'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'EQUIPCATG', 'Acopco', 'system'

delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'EQUIPCATG'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'EQUIPCATG', 'CUMMINS', 'system'


delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'EQUIPCATG'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'EQUIPCATG', 'GENSET', 'system'

delete from code_table where company_id = 'acopco' and country_code = 'in' and code_type = 'EQUIPCATG'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'acopco', 'in', 'EQUIPCATG', 'APW', 'system'
declare @p_company_id varchar(20), @p_country_code varchar(5)

set @p_company_id = 'dynapac'

set @p_country_code = 'in'


delete from code_table_mlingual_translation where company_id = 'dynapac' and country_code = 'in' and code_type = 'CQMEQUIPCATG'

Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','AC','ALL','Accessories','Accessories','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','AL','ALL','Air line network','Air line network','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','AM','ALL','Air motor solutions','Air motor solutions','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','CE','ALL','Cordless & Electric tools','Cordless & Electric tools','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','PT','ALL','Pneumatic tools','Pneumatic tools','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','WS','ALL','Workplace solution','Workplace solution','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac','in','CQMEQUIPCATG','WE','ALL','Workshop equipment','Workshop equipment','system'



delete from code_table_mlingual_translation where company_id='dynapac' and country_code='in' and code_type='EQUIPOEM'

insert code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description,long_description,last_update_id)
select 'dynapac','in','EQUIPOEM','dynapac','ALL','DPartner','DPartner','system'


delete from code_table_mlingual_translation where company_id = 'dynapac' and country_code = 'in' and code_type = 'ANCILLARYSTATUS'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'ANCILLARYSTATUS', 'O', 'ALL', 'Open', 'Open', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'ANCILLARYSTATUS', 'A', 'ALL', 'Assigned', 'Assigned', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'ANCILLARYSTATUS', 'I', 'ALL', 'Inprogress', 'Inprogress', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'ANCILLARYSTATUS', 'CO', 'ALL', 'Completed', 'Completed', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'ANCILLARYSTATUS', 'CL', 'ALL', 'Closed', 'Closed', 'system'

delete from code_table_mlingual_translation where company_id = 'dynapac' and country_code = 'in' and code_type = 'WFLOWEVERBANCILLARY'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'WFLOWEVERBANCILLARY', 'CLOSE', 'ALL', 'Close', 'Close', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'WFLOWEVERBANCILLARY', 'COMPLETE', 'ALL', 'Complete', 'Complete', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'WFLOWEVERBANCILLARY', 'GENERATEPE', 'ALL', 'Generate Parts Enquiry', 'Generate Parts Enquiry', 'system'


delete from code_table_mlingual_translation where company_id = 'dynapac' and country_code = 'in' and code_type = 'CUSTCONTCATG'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'CUSTCONTCATG', 'OWNER', 'ALL', 'Owner', 'Owner', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'CUSTCONTCATG', 'SITEINCHG', 'ALL', 'Site Incharge', 'Site Incharge', 'system'



delete from code_table_mlingual_translation where company_id = 'dynapac' and country_code = 'in' and code_type = 'CUSTCONTTYPE'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'CUSTCONTTYPE', 'OWNER', 'ALL', 'Owner', 'Owner', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'CUSTCONTTYPE', 'SITEINCHG', 'ALL', 'Site Incharge', 'Site Incharge', 'system'



delete from code_table_mlingual_translation where company_id = 'dynapac' and country_code = 'in' and code_type = 'ANCILLARYATTACHPATH'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'dynapac', 'in', 'ANCILLARYATTACHPATH', 'ancillary_attachments', 'ALL', 'Ancillary Attachment Path', 'Ancillary Attachment Path', 'system'


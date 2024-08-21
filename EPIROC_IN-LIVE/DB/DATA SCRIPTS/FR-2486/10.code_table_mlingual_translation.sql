declare @p_company_id varchar(20), @p_country_code varchar(5)

set @p_company_id = 'epiroc'

set @p_country_code = 'in'




delete from code_table_mlingual_translation where company_id='epiroc' and country_code='in' and code_type='EQUIPOEM'

insert code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description,long_description,last_update_id)
select 'epiroc','in','EQUIPOEM','epiroc','ALL','Atlas Copco India','Atlas Copco India','system'


delete from code_table_mlingual_translation where company_id = 'epiroc' and country_code = 'in' and code_type = 'ANCILLARYSTATUS'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'ANCILLARYSTATUS', 'O', 'ALL', 'Open', 'Open', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'ANCILLARYSTATUS', 'A', 'ALL', 'Assigned', 'Assigned', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'ANCILLARYSTATUS', 'I', 'ALL', 'Inprogress', 'Inprogress', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'ANCILLARYSTATUS', 'CO', 'ALL', 'Completed', 'Completed', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'ANCILLARYSTATUS', 'CL', 'ALL', 'Closed', 'Closed', 'system'

delete from code_table_mlingual_translation where company_id = 'epiroc' and country_code = 'in' and code_type = 'WFLOWEVERBANCILLARY'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'WFLOWEVERBANCILLARY', 'CLOSE', 'ALL', 'Close', 'Close', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'WFLOWEVERBANCILLARY', 'COMPLETE', 'ALL', 'Complete', 'Complete', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'WFLOWEVERBANCILLARY', 'GENERATEPE', 'ALL', 'Generate Parts Enquiry', 'Generate Parts Enquiry', 'system'


delete from code_table_mlingual_translation where company_id = 'epiroc' and country_code = 'in' and code_type = 'CUSTCONTCATG'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'CUSTCONTCATG', 'OWNER', 'ALL', 'Owner', 'Owner', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'CUSTCONTCATG', 'SITEINCHG', 'ALL', 'Site Incharge', 'Site Incharge', 'system'



delete from code_table_mlingual_translation where company_id = 'epiroc' and country_code = 'in' and code_type = 'CUSTCONTTYPE'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'CUSTCONTTYPE', 'OWNER', 'ALL', 'Owner', 'Owner', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'CUSTCONTTYPE', 'SITEINCHG', 'ALL', 'Site Incharge', 'Site Incharge', 'system'



delete from code_table_mlingual_translation where company_id = 'epiroc' and country_code = 'in' and code_type = 'ANCILLARYATTACHPATH'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'epiroc', 'in', 'ANCILLARYATTACHPATH', 'ancillary_attachments', 'ALL', 'Ancillary Attachment Path', 'Ancillary Attachment Path', 'system'


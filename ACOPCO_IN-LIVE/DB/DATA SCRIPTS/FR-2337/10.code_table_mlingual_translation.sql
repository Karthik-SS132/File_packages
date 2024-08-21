declare @p_company_id varchar(20), @p_country_code varchar(5)

set @p_company_id = 'acopco'

set @p_country_code = 'in'


delete from code_table_mlingual_translation where company_id = 'acopco' and country_code = 'in' and code_type = 'ANCILLARYSTATUS'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'ANCILLARYSTATUS', 'O', 'ALL', 'Open', 'Open', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'ANCILLARYSTATUS', 'A', 'ALL', 'Assigned', 'Assigned', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'ANCILLARYSTATUS', 'I', 'ALL', 'Inprogress', 'Inprogress', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'ANCILLARYSTATUS', 'CO', 'ALL', 'Completed', 'Completed', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'ANCILLARYSTATUS', 'CL', 'ALL', 'Closed', 'Closed', 'system'

delete from code_table_mlingual_translation where company_id = 'acopco' and country_code = 'in' and code_type = 'WFLOWEVERBANCILLARY'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'WFLOWEVERBANCILLARY', 'CLOSE', 'ALL', 'Close', 'Close', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'WFLOWEVERBANCILLARY', 'COMPLETE', 'ALL', 'Complete', 'Complete', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'WFLOWEVERBANCILLARY', 'GENERATEPE', 'ALL', 'Generate Parts Enquiry', 'Generate Parts Enquiry', 'system'


delete from code_table_mlingual_translation where company_id = 'acopco' and country_code = 'in' and code_type = 'CUSTCONTCATG'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'CUSTCONTCATG', 'OWNER', 'ALL', 'Owner', 'Owner', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'CUSTCONTCATG', 'SITEINCHG', 'ALL', 'Site Incharge', 'Site Incharge', 'system'



delete from code_table_mlingual_translation where company_id = 'acopco' and country_code = 'in' and code_type = 'CUSTCONTTYPE'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'CUSTCONTTYPE', 'OWNER', 'ALL', 'Owner', 'Owner', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'CUSTCONTTYPE', 'SITEINCHG', 'ALL', 'Site Incharge', 'Site Incharge', 'system'



delete from code_table_mlingual_translation where company_id = 'acopco' and country_code = 'in' and code_type = 'ANCILLARYATTACHPATH'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'ANCILLARYATTACHPATH', 'ancillary_attachments', 'ALL', 'Ancillary Attachment Path', 'Ancillary Attachment Path', 'system'

delete from code_table_mlingual_translation where company_id = 'acopco' and country_code = 'in' and code_type = 'EQUIPOEM'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'EQUIPOEM', 'atlascopco', 'ALL', 'Atlascopco', 'Atlascopco', 'system'

delete from code_table_mlingual_translation where company_id = 'acopco' and country_code = 'in' and code_type = 'EQUIPCATG'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'EQUIPCATG', 'Acopco', 'ALL', 'Acopco', 'Acopco', 'system'


insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'EQUIPCATG', 'CUMMINS', 'ALL', 'CUMMINS', 'CUMMINS', 'system'


insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'EQUIPCATG', 'GENSET', 'ALL', 'GENSET', 'GENSET', 'system'


insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'EQUIPCATG', 'APW', 'ALL', 'APW', 'APW', 'system'


delete from code_table_mlingual_translation where company_id = 'acopco' and country_code = 'in' and code_type = 'CUSTCONTCATG'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'CUSTCONTCATG', 'OWNER', 'ALL', 'Owner', 'Owner', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'CUSTCONTCATG', 'SITEINCHG', 'ALL', 'Site Incharge', 'Site Incharge', 'system'



delete from code_table_mlingual_translation where company_id = 'acopco' and country_code = 'in' and code_type = 'CUSTCONTTYPE'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'CUSTCONTTYPE', 'OWNER', 'ALL', 'Owner', 'Owner', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'CUSTCONTTYPE', 'SITEINCHG', 'ALL', 'Site Incharge', 'Site Incharge', 'system'

delete from code_table_mlingual_translation where company_id = 'acopco' and country_code = 'in' and code_type = 'EQUIPOEM'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'EQUIPOEM', 'ACCT', 'ALL', 'Atlas Copco', 'Atlas Copco', 'system'

delete from code_table_mlingual_translation where company_id = 'acopco' and country_code = 'in' and code_type = 'CQMEQUIPMODELLT'


insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'CQMEQUIPMODELLT', 'BLT', 'ALL', 'Battery light', 'Battery light', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'CQMEQUIPMODELLT', 'DLT', 'ALL', 'Diesel light', 'Diesel light', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'acopco', 'in', 'CQMEQUIPMODELLT', 'ELT', 'ALL', 'Electric light', 'Electric light', 'system'

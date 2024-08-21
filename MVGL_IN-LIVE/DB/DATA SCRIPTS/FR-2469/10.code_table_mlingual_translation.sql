declare @p_company_id varchar(20), @p_country_code varchar(5)

set @p_company_id = 'mvgl'

set @p_country_code = 'in'


delete from code_table_mlingual_translation where company_id = 'mvgl' and country_code = 'in' and code_type = 'CQMEQUIPCATG'

Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','RC','ALL','Refrigeration Compressors','Refrigeration Compressors','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','AC','ALL','Air-Conditioning Compressors','Air-Conditioning Compressors','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','IP','ALL','Industrial Pumps','Industrial Pumps','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','OE','ALL','Oil Engines','Oil Engines','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','AS','ALL','Automation Solutions','Automation Solutions','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','PQ','ALL','Power Quality Solution','Power Quality Solution','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','SE','ALL','Sensors & Encoders','Sensors & Encoders','system'
Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','VS','ALL','Valves Solutions','Valves Solutions','system'



delete from code_table_mlingual_translation where company_id='mvgl' and country_code='in' and code_type='EQUIPOEM'

insert code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description,long_description,last_update_id)
select 'mvgl','in','EQUIPOEM','mvgl','ALL','Multivista Global Limited','Multivista Global Limited','system'


delete from code_table_mlingual_translation where company_id = 'mvgl' and country_code = 'in' and code_type = 'ANCILLARYSTATUS'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'ANCILLARYSTATUS', 'O', 'ALL', 'Open', 'Open', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'ANCILLARYSTATUS', 'A', 'ALL', 'Assigned', 'Assigned', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'ANCILLARYSTATUS', 'I', 'ALL', 'Inprogress', 'Inprogress', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'ANCILLARYSTATUS', 'CO', 'ALL', 'Completed', 'Completed', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'ANCILLARYSTATUS', 'CL', 'ALL', 'Closed', 'Closed', 'system'

delete from code_table_mlingual_translation where company_id = 'mvgl' and country_code = 'in' and code_type = 'WFLOWEVERBANCILLARY'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'WFLOWEVERBANCILLARY', 'CLOSE', 'ALL', 'Close', 'Close', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'WFLOWEVERBANCILLARY', 'COMPLETE', 'ALL', 'Complete', 'Complete', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'WFLOWEVERBANCILLARY', 'GENERATEPE', 'ALL', 'Generate Parts Enquiry', 'Generate Parts Enquiry', 'system'


delete from code_table_mlingual_translation where company_id = 'mvgl' and country_code = 'in' and code_type = 'CUSTCONTCATG'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'CUSTCONTCATG', 'OWNER', 'ALL', 'Owner', 'Owner', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'CUSTCONTCATG', 'SITEINCHG', 'ALL', 'Site Incharge', 'Site Incharge', 'system'



delete from code_table_mlingual_translation where company_id = 'mvgl' and country_code = 'in' and code_type = 'CUSTCONTTYPE'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'CUSTCONTTYPE', 'OWNER', 'ALL', 'Owner', 'Owner', 'system'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'CUSTCONTTYPE', 'SITEINCHG', 'ALL', 'Site Incharge', 'Site Incharge', 'system'



delete from code_table_mlingual_translation where company_id = 'mvgl' and country_code = 'in' and code_type = 'ANCILLARYATTACHPATH'

insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
select 'mvgl', 'in', 'ANCILLARYATTACHPATH', 'ancillary_attachments', 'ALL', 'Ancillary Attachment Path', 'Ancillary Attachment Path', 'system'


	IF NOT EXISTS (select 1 from code_table_mlingual_translation where company_id = 'mvgl' and country_code = 'in' and code_type='EMPTITLE' and code='Mr/Ms' )
	BEGIN

		Insert into code_table_mlingual_translation(company_id, country_code, code_type, code, locale_id, short_description, long_description, last_update_id)
		select 'mvgl', 'in', 'EMPTITLE', 'Mr/Ms', 'ALL', 'Mr/Ms', 'Mr/Ms', 'system'

	END
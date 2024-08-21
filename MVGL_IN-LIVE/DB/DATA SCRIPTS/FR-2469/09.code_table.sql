declare @p_company_id varchar(20), @p_country_code varchar(5)

set @p_company_id = 'mvgl'

set @p_country_code = 'in'


delete from code_table where company_id = 'mvgl' and country_code = 'in' and code_type in ('CQMEQUIPCATG')

Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','RC','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','AC','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','IP','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','OE','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','AS','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','PQ','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','SE','system'
Insert into code_table (company_id, country_code, code_type, code, last_update_id)
select 'mvgl','in','CQMEQUIPCATG','VS','system'

delete from code_table where company_id='mvgl' and country_code='in' and code_type='EQUIPOEM'

insert code_table(company_id,country_code,code_type,code,last_update_id)
select 'mvgl','in','EQUIPOEM','mvgl','system'


delete from code_table where company_id = 'mvgl' and country_code = 'in' and code_type = 'ANCILLARYSTATUS'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'ANCILLARYSTATUS', 'O', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'ANCILLARYSTATUS', 'A', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'ANCILLARYSTATUS', 'I', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'ANCILLARYSTATUS', 'CO', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'ANCILLARYSTATUS', 'CL', 'system'

delete from code_table where company_id = 'mvgl' and country_code = 'in' and code_type = 'WFLOWEVERBANCILLARY'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'WFLOWEVERBANCILLARY', 'CLOSE', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'WFLOWEVERBANCILLARY', 'COMPLETE', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'WFLOWEVERBANCILLARY', 'GENERATEPE', 'system'


delete from code_table where company_id = 'mvgl' and country_code = 'in' and code_type = 'CUSTCONTCATG'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'CUSTCONTCATG', 'OWNER', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'CUSTCONTCATG', 'SITEINCHG', 'system'

delete from code_table where company_id = 'mvgl' and country_code = 'in' and code_type = 'CUSTCONTTYPE'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'CUSTCONTTYPE', 'OWNER', 'system'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'CUSTCONTTYPE', 'SITEINCHG', 'system'

delete from code_table where company_id = 'mvgl' and country_code = 'in' and code_type = 'ANCILLARYATTACHPATH'

insert into code_table(company_id, country_code, code_type, code, last_update_id)
select 'mvgl', 'in', 'ANCILLARYATTACHPATH', 'ancillary_attachments', 'system'


	IF NOT EXISTS (select 1 from code_table where company_id='mvgl' and country_code='in' and code_type='EMPTITLE' and code='Mr/Ms' )
	BEGIN

		Insert into code_table(company_id, country_code, code_type, code, last_update_id)
		select 'mvgl', 'in', 'EMPTITLE', 'Mr/Ms', 'system'
	END

declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'dynapac'

select @p_country_code = 'in'


delete from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and user_group_id = 'SCOORD-OEM' and feature_id = 'MNGCUSCON'

/* INSERT QUERY NO: 1 */
INSERT INTO functional_access_profile(company_id, country_code, user_group_id, feature_id, feature_access, add_access, edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
VALUES
(
'dynapac', 'in', 'SCOORD-OEM', 'MNGCUSCON', 1, 1, 1, 1, 0, 0, 0, 0, 'system'
);

delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMPRODINFO' and user_group_id='appvisitor'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'appvisitor', N'MHMPRODINFO', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMPRODINFO' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'custowner', N'MHMPRODINFO', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id = 'MHMPRODINFO'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','MHMPRODINFO','1','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'

delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMMYASSET' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'custowner', N'MHMMYASSET', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMMACHINELIFE' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'custowner', N'MHMMACHINELIFE', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMHOME' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'custowner', N'MHMHOME', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMACTOPEN' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'custowner', N'MHMACTOPEN', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMACTCLOSED' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'custowner', N'MHMACTCLOSED', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MUSERATTACHMENT' and user_group_id='DLR_SENGG'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'DLR_SENGG', N'MUSERATTACHMENT', 1, 1, 1, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where feature_id like 'CPORT%'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','CPORTACTCLOSED','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','CPORTACTLOGGING','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','CPORTACTOPEN','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','CPORTDASH','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','CPORTMYMACHINES','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','CPORTNB','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','CPORTPRODINFO','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','CPORTTIMELINE','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'

update functional_access_profile
set feature_access = 1
where feature_id in ('CPORTPRODINFO')
and company_id = 'dynapac' and country_code = 'in'

update functional_access_profile
set feature_access = 1
where feature_id in ('CPORTTIMELINE','CPORTMYMACHINES','CPORTACTOPEN','CPORTACTLOGGING','CPORTACTCLOSED')
and user_group_id = 'custowner'
and company_id = 'dynapac' and country_code = 'in'

update functional_access_profile
set feature_access = 1,add_access=1
where feature_id in ('CPORTACTLOGGING')
and user_group_id = 'custowner'
and company_id = 'dynapac' and country_code = 'in'


update functional_access_profile
set feature_access = 1
where feature_id in ('CPORTACTOPEN','CPORTACTCLOSED')
and user_group_id in ('SCOORD-OEM','SCOORD-DLR')
and company_id = 'dynapac' and country_code = 'in'


delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMACTOPEN' and user_group_id='SCOORD-DLR'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'SCOORD-DLR', N'MHMACTOPEN', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMACTCLOSED' and user_group_id='SCOORD-DLR'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'SCOORD-DLR', N'MHMACTCLOSED', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMACTOPEN' and user_group_id='SCOORD-OEM'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'SCOORD-OEM', N'MHMACTOPEN', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMACTCLOSED' and user_group_id='SCOORD-OEM'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'SCOORD-OEM', N'MHMACTCLOSED', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MCALCOMPLETE' and user_group_id='SCOORD-OEM'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'SCOORD-OEM', N'MCALCOMPLETE', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MCALCLOSE' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id])
VALUES (N'dynapac', N'in', N'custowner', N'MCALCLOSE', 1, 0, 0, 0, 0, 0, 0, 0, N'system')



delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='CALCLOSE1' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id])
VALUES (N'dynapac', N'in', N'custowner', N'CALCLOSE1', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='CALCLOSE1' and user_group_id='SCOORD-DLR'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'SCOORD-DLR', N'CALCLOSE1', 0, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='CALCLOSE1' and user_group_id='SCOORD-OEM'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'SCOORD-OEM', N'CALCLOSE1', 0, 0, 0, 0, 0, 0, 0, 0, N'system')


DELETE from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id = 'MUSERATTACH'

	Insert into functional_access_profile (user_group_id, company_id, country_code, feature_access, add_access,
	edit_access, view_access, delete_access, export_access, print_access, import_access,feature_id, last_update_id)
	select user_group_id, company_id,country_code,feature_access,add_access,edit_access,view_access,delete_access,
	export_access,print_access,import_access,'MUSERATTACH','system'
	from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id='MUSERATTACHMENT'
	
	
IF EXISTS (select 1 from functional_access_profile  where company_id=@p_company_id and country_code=@p_country_code and feature_id ='MNGUSRS' and user_group_id='SCOORD-DLR' and feature_access = 0)
	BEGIN
			update functional_access_profile 
			set feature_access = 1
			where company_id=@p_company_id and country_code=@p_country_code and feature_id ='MNGUSRS' 
			and user_group_id='SCOORD-DLR' and feature_access = 0
	END
	
IF EXISTS (select 1 from functional_access_profile  where company_id=@p_company_id and country_code=@p_country_code and feature_id ='ACTDACTUSER' and user_group_id='SCOORD-DLR' and feature_access = 0)
	BEGIN
			update functional_access_profile 
			set feature_access = 1
			where company_id=@p_company_id and country_code=@p_country_code and feature_id ='ACTDACTUSER' 
			and user_group_id='SCOORD-DLR' and feature_access = 0
	END
	
DELETE from functional_access_profile where company_id='dynapac' and country_code='in' and feature_id='MHMPUNCHINOUT' and user_group_id='DLR_SENGG'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'dynapac', N'in', N'DLR_SENGG', N'MHMPUNCHINOUT', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id = 'MHMMYSERVCALL'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','MHMMYSERVCALL','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'dynapac' and country_code = 'in' and feature_id='MHMMYSERVCALL' and user_group_id in (	select user_group_id from functional_access_profile
where company_id = 'dynapac' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access=1)



delete from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id = 'MHMMYSERVFIL'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','MHMMYSERVFIL','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'dynapac' and country_code = 'in' and feature_id='MHMMYSERVFIL' and user_group_id in (	select user_group_id from functional_access_profile
where company_id = 'dynapac' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access=1)




delete from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id = 'MHMMYSERVREF'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','MHMMYSERVREF','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'dynapac' and country_code = 'in' and feature_id='MHMMYSERVREF' and user_group_id in (	select user_group_id from functional_access_profile
where company_id = 'dynapac' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access=1)




delete from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id = 'MHMMYVISITCALL'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','MHMMYVISITCALL','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'dynapac' and country_code = 'in' and feature_id='MHMMYVISITCALL' and user_group_id in (	select user_group_id from functional_access_profile
where company_id = 'dynapac' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access=1)



delete from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id = 'MHMMYVISITFIL'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','MHMMYVISITFIL','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'dynapac' and country_code = 'in' and feature_id='MHMMYVISITFIL' and user_group_id in (	select user_group_id from functional_access_profile
where company_id = 'dynapac' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access=1)




delete from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id = 'MHMMYVISITREF'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','MHMMYVISITREF','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'dynapac' and country_code = 'in' and feature_id='MHMMYVISITREF' and user_group_id in (	select user_group_id from functional_access_profile
where company_id = 'dynapac' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access=1)



delete from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id = 'MHMMYSERVICALL'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','MHMMYSERVICALL','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'dynapac' and country_code = 'in' and feature_id='MHMMYSERVICALL' and user_group_id in (	select user_group_id from functional_access_profile
where company_id = 'dynapac' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access=1)

delete from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id = 'MHMMYSERVIFIL'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','MHMMYSERVIFIL','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'dynapac' and country_code = 'in' and feature_id='MHMMYSERVIFIL' and user_group_id in (	select user_group_id from functional_access_profile
where company_id = 'dynapac' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access=1)



delete from functional_access_profile where company_id = 'dynapac' and country_code = 'in' and feature_id = 'MHMMYSERVIREF'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'dynapac','in','MHMMYSERVIREF','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'dynapac' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'dynapac' and country_code = 'in' and feature_id='MHMMYSERVIREF' and user_group_id in (	select user_group_id from functional_access_profile
where company_id = 'dynapac' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access=1)

declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'mvgl'

select @p_country_code = 'in'


delete from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and user_group_id = 'cc_scoord' and feature_id = 'MNGCUSCON'

/* INSERT QUERY NO: 1 */
INSERT INTO functional_access_profile(company_id, country_code, user_group_id, feature_id, feature_access, add_access, edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
VALUES
(
'mvgl', 'in', 'cc_scoord', 'MNGCUSCON', 1, 1, 1, 1, 0, 0, 0, 0, 'system'
);

delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MHMPRODINFO' and user_group_id='appvisitor'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'appvisitor', N'MHMPRODINFO', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MHMPRODINFO' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'custowner', N'MHMPRODINFO', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and feature_id = 'MHMPRODINFO'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','MHMPRODINFO','1','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'

delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MHMMYASSET' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'custowner', N'MHMMYASSET', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MHMMACHINELIFE' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'custowner', N'MHMMACHINELIFE', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MHMHOME' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'custowner', N'MHMHOME', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MHMACTOPEN' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'custowner', N'MHMACTOPEN', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MHMACTCLOSED' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'custowner', N'MHMACTCLOSED', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MUSERATTACHMENT' and user_group_id='DLR_SENGG'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'DLR_SENGG', N'MUSERATTACHMENT', 1, 1, 1, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where feature_id like 'CPORT%'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','CPORTACTCLOSED','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','CPORTACTLOGGING','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','CPORTACTOPEN','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','CPORTDASH','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','CPORTMYMACHINES','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','CPORTNB','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','CPORTPRODINFO','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','CPORTTIMELINE','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'

update functional_access_profile
set feature_access = 1
where feature_id in ('CPORTPRODINFO')
and company_id = 'mvgl' and country_code = 'in'

update functional_access_profile
set feature_access = 1
where feature_id in ('CPORTTIMELINE','CPORTMYMACHINES','CPORTACTOPEN','CPORTACTLOGGING','CPORTACTCLOSED')
and user_group_id = 'custowner'
and company_id = 'mvgl' and country_code = 'in'

update functional_access_profile
set feature_access = 1,add_access=1
where feature_id in ('CPORTACTLOGGING')
and user_group_id = 'custowner'
and company_id = 'mvgl' and country_code = 'in'


update functional_access_profile
set feature_access = 1
where feature_id in ('CPORTACTOPEN','CPORTACTCLOSED')
and user_group_id in ('cc_scoord','servcoord')
and company_id = 'mvgl' and country_code = 'in'


delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MHMACTOPEN' and user_group_id='servcoord'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'servcoord', N'MHMACTOPEN', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MHMACTCLOSED' and user_group_id='servcoord'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'servcoord', N'MHMACTCLOSED', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MHMACTOPEN' and user_group_id='cc_scoord'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'cc_scoord', N'MHMACTOPEN', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MHMACTCLOSED' and user_group_id='cc_scoord'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'cc_scoord', N'MHMACTCLOSED', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MCALCOMPLETE' and user_group_id='cc_scoord'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'cc_scoord', N'MCALCOMPLETE', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='MCALCLOSE' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id])
VALUES (N'mvgl', N'in', N'custowner', N'MCALCLOSE', 1, 0, 0, 0, 0, 0, 0, 0, N'system')



delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='CALCLOSE1' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id])
VALUES (N'mvgl', N'in', N'custowner', N'CALCLOSE1', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='CALCLOSE1' and user_group_id='servcoord'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'servcoord', N'CALCLOSE1', 0, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='mvgl' and country_code='in' and feature_id='CALCLOSE1' and user_group_id='cc_scoord'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'mvgl', N'in', N'cc_scoord', N'CALCLOSE1', 0, 0, 0, 0, 0, 0, 0, 0, N'system')


DELETE from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and feature_id = 'MUSERATTACH'

	Insert into functional_access_profile (user_group_id, company_id, country_code, feature_access, add_access,
	edit_access, view_access, delete_access, export_access, print_access, import_access,feature_id, last_update_id)
	select user_group_id, company_id,country_code,feature_access,add_access,edit_access,view_access,delete_access,
	export_access,print_access,import_access,'MUSERATTACH','system'
	from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and feature_id='MUSERATTACHMENT'
	
	
IF EXISTS (select 1 from functional_access_profile  where company_id=@p_company_id and country_code=@p_country_code and feature_id ='MNGUSRS' and user_group_id='servcoord' and feature_access = 0)
	BEGIN
			update functional_access_profile 
			set feature_access = 1
			where company_id=@p_company_id and country_code=@p_country_code and feature_id ='MNGUSRS' 
			and user_group_id='servcoord' and feature_access = 0
	END
	
IF EXISTS (select 1 from functional_access_profile  where company_id=@p_company_id and country_code=@p_country_code and feature_id ='ACTDACTUSER' and user_group_id='servcoord' and feature_access = 0)
	BEGIN
			update functional_access_profile 
			set feature_access = 1
			where company_id=@p_company_id and country_code=@p_country_code and feature_id ='ACTDACTUSER' 
			and user_group_id='servcoord' and feature_access = 0
	END
	



delete from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and feature_id = 'MHMMYSERVCALL'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','MHMMYSERVCALL','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'mvgl' and country_code = 'in' and feature_id='MHMMYSERVCALL' and user_group_id in (	select user_group_id from functional_access_profile where company_id = 'mvgl' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access= 1)



delete from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and feature_id = 'MHMMYSERVFIL'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','MHMMYSERVFIL','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'mvgl' and country_code = 'in' and feature_id='MHMMYSERVFIL' and user_group_id in (	select user_group_id from functional_access_profile where company_id = 'mvgl' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access= 1)




delete from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and feature_id = 'MHMMYSERVREF'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','MHMMYSERVREF','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'mvgl' and country_code = 'in' and feature_id='MHMMYSERVREF' and user_group_id in (	select user_group_id from functional_access_profile where company_id = 'mvgl' and country_code= 'in'	and feature_id='MMYCALLS2' and feature_access= 1)




delete from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and feature_id = 'MHMMYVISITCALL'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','MHMMYVISITCALL','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'


delete from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and feature_id = 'MHMMYVISITFIL'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','MHMMYVISITFIL','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'



delete from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and feature_id = 'MHMMYVISITREF'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','MHMMYVISITREF','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'



IF EXISTS (select 1 from functional_access_profile  where company_id=@p_company_id and country_code=@p_country_code and feature_id ='MNGUSRS' and user_group_id='cc_scoord' and feature_access = 0)
	BEGIN
			update functional_access_profile 
			set feature_access = 1
			where company_id=@p_company_id and country_code=@p_country_code 
			and user_group_id='cc_scoord' and feature_access = 0 and feature_id ='MNGUSRS' 
	END
	
IF EXISTS (select 1 from functional_access_profile  where company_id=@p_company_id and country_code=@p_country_code and feature_id ='ACTDACTUSER' and user_group_id='cc_scoord' and feature_access = 0)
	BEGIN
			update functional_access_profile 
			set feature_access = 1
			where company_id=@p_company_id and country_code=@p_country_code 
			and user_group_id='cc_scoord' and feature_access = 0 and feature_id ='ACTDACTUSER' 
	END	
	
	
	

delete from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and feature_id = 'MHMPUNCHINOUT'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'mvgl','in','MHMPUNCHINOUT','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'mvgl' and country_code = 'in'


update functional_access_profile
set feature_access=1
where company_id = 'mvgl' and country_code = 'in' and feature_id='MHMPUNCHINOUT' and user_group_id in (	select user_group_id from functional_access_profile where company_id = 'mvgl' and country_code= 'in'	and feature_id='MPUNCHINOUT' and feature_access= 1)


delete from functional_access_profile where company_id = 'mvgl' and country_code = 'in' and feature_id = 'MCALCLOSE' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) 
VALUES (N'mvgl', N'in', N'custowner', N'MCALCLOSE', 1, 0, 0, 0, 0, 0, 0, 0, N'system')
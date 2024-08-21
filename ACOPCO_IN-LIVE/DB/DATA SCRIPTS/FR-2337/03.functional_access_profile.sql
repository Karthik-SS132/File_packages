
declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'acopco'

select @p_country_code = 'in'


delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMPRODINFO' and user_group_id='appvisitor'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'appvisitor', N'MHMPRODINFO', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMPRODINFO' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'custowner', N'MHMPRODINFO', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id = 'acopco' and country_code = 'in' and feature_id = 'MHMPRODINFO'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acopco','in','MHMPRODINFO','1','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acopco' and country_code = 'in'

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYASSET' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'custowner', N'MHMMYASSET', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMACHINELIFE' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'custowner', N'MHMMACHINELIFE', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMHOME' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'custowner', N'MHMHOME', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMACTOPEN' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'custowner', N'MHMACTOPEN', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMACTCLOSED' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'custowner', N'MHMACTCLOSED', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYSERVCALL' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'MHMMYSERVCALL', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYSERVFIL' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'MHMMYSERVFIL', 1, 1, 1, 1, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYSERVREF' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'MHMMYSERVREF', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYSERVCALL' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MHMMYSERVCALL', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYSERVFIL' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MHMMYSERVFIL', 1, 1, 1, 1, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYSERVREF' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MHMMYSERVREF', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MUSERATTACHMENT' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MUSERATTACHMENT', 1, 1, 1, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where feature_id like 'CPORT%'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acopco','in','CPORTACTCLOSED','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acopco' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acopco','in','CPORTACTLOGGING','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acopco' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acopco','in','CPORTACTOPEN','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acopco' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acopco','in','CPORTDASH','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acopco' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acopco','in','CPORTMYMACHINES','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acopco' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acopco','in','CPORTNB','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acopco' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acopco','in','CPORTPRODINFO','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acopco' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acopco','in','CPORTTIMELINE','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acopco' and country_code = 'in'

update functional_access_profile
set feature_access = 1
where feature_id in ('CPORTPRODINFO')
and company_id = 'acopco' and country_code = 'in'

update functional_access_profile
set feature_access = 1
where feature_id in ('CPORTTIMELINE','CPORTMYMACHINES','CPORTACTOPEN','CPORTACTLOGGING','CPORTACTCLOSED')
and user_group_id = 'custowner'
and company_id = 'acopco' and country_code = 'in'

update functional_access_profile
set feature_access = 1,add_access=1
where feature_id in ('CPORTACTLOGGING')
and user_group_id = 'custowner'
and company_id = 'acopco' and country_code = 'in'


update functional_access_profile
set feature_access = 1
where feature_id in ('CPORTACTOPEN','CPORTACTCLOSED')
and user_group_id in ('SCOORD-OEM','DLRSC-MU')
and company_id = 'acopco' and country_code = 'in'

delete from functional_access_profile where company_id = 'acopco' and country_code = 'in' and user_group_id = 'SCOORD-OEM' and feature_id = 'MNGCUSCON'

/* INSERT QUERY NO: 1 */
INSERT INTO functional_access_profile(company_id, country_code, user_group_id, feature_id, feature_access, add_access, edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
VALUES
(
'acopco', 'in', 'SCOORD-OEM', 'MNGCUSCON', 1, 1, 1, 1, 0, 0, 0, 0, 'system'
);

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMACTOPEN' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'MHMACTOPEN', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMACTCLOSED' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'MHMACTCLOSED', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMACTOPEN' and user_group_id='SCOORD-OEM'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'SCOORD-OEM', N'MHMACTOPEN', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMACTCLOSED' and user_group_id='SCOORD-OEM'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'SCOORD-OEM', N'MHMACTCLOSED', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MCALCOMPLETE' and user_group_id='SCOORD-OEM'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'SCOORD-OEM', N'MCALCOMPLETE', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MCALCLOSE' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id])
VALUES (N'acopco', N'in', N'custowner', N'MCALCLOSE', 1, 0, 0, 0, 0, 0, 0, 0, N'system')



delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='CALCLOSE1' and user_group_id='custowner'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id])
VALUES (N'acopco', N'in', N'custowner', N'CALCLOSE1', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='CALCLOSE1' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'CALCLOSE1', 0, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='CALCLOSE1' and user_group_id='SCOORD-OEM'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'SCOORD-OEM', N'CALCLOSE1', 0, 0, 0, 0, 0, 0, 0, 0, N'system')


DELETE from functional_access_profile where company_id = 'acopco' and country_code = 'in' and feature_id = 'MUSERATTACH'

	Insert into functional_access_profile (user_group_id, company_id, country_code, feature_access, add_access,
	edit_access, view_access, delete_access, export_access, print_access, import_access,feature_id, last_update_id)
	select user_group_id, company_id,country_code,feature_access,add_access,edit_access,view_access,delete_access,
	export_access,print_access,import_access,'MUSERATTACH','system'
	from functional_access_profile where company_id = 'acopco' and country_code = 'in' and feature_id='MUSERATTACHMENT'
	
	
IF EXISTS (select 1 from functional_access_profile  where company_id=@p_company_id and country_code=@p_country_code and feature_id ='MNGUSRS' and user_group_id='DLRSC-MU' and feature_access = 0)
	BEGIN
			update functional_access_profile 
			set feature_access = 1
			where company_id=@p_company_id and country_code=@p_country_code and feature_id ='MNGUSRS' 
			and user_group_id='DLRSC-MU' and feature_access = 0
	END
	
IF EXISTS (select 1 from functional_access_profile  where company_id=@p_company_id and country_code=@p_country_code and feature_id ='ACTDACTUSER' and user_group_id='DLRSC-MU' and feature_access = 0)
	BEGIN
			update functional_access_profile 
			set feature_access = 1
			where company_id=@p_company_id and country_code=@p_country_code and feature_id ='ACTDACTUSER' 
			and user_group_id='DLRSC-MU' and feature_access = 0
	END
	
DELETE from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMPUNCHINOUT' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MHMPUNCHINOUT', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYVISITCALL' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'MHMMYVISITCALL', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYVISITFIL' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'MHMMYVISITFIL', 1, 1, 1, 1, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYVISITREF' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'MHMMYVISITREF', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYVISITCALL' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MHMMYVISITCALL', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYVISITFIL' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MHMMYVISITFIL', 1, 1, 1, 1, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYVISITREF' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MHMMYVISITREF', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYINSPCALL' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'MHMMYINSPCALL', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYINSPFIL' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'MHMMYINSPFIL', 1, 1, 1, 1, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYINSPREF' and user_group_id='DLRSC-MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSC-MU', N'MHMMYINSPREF', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYINSPCALL' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MHMMYINSPCALL', 1, 0, 0, 0, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYINSPFIL' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MHMMYINSPFIL', 1, 1, 1, 1, 0, 0, 0, 0, N'system')

delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MHMMYINSPREF' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MHMMYINSPREF', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


delete from functional_access_profile where company_id='acopco' and country_code='in' and feature_id='MGENMRPL' and user_group_id='DLRSE_MU'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acopco', N'in', N'DLRSE_MU', N'MGENMRPL', 1, 0, 0, 0, 0, 0, 0, 0, N'system')
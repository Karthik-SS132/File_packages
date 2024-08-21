Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='custowner' and feature_id='MHMPRODINFO'


INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'acgw', N'in', N'custowner', N'MHMPRODINFO', 1, 0, 0, 0, 0, 0, 0, 0, N'system')



Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='custowner' and feature_id='MHMHOME'

	INSERT functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','custowner','MHMHOME',1,0,0,0,0,0,0,0,'system'


Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='custowner' and feature_id='MHMMYASSET'
 

	INSERT functional_access_profile (company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	SELECT 'acgw','in','custowner','MHMMYASSET',1,0,0,0,0,0,0,0,'system'



Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='custowner' and feature_id='MHMMACHINELIFE'
 
	INSERT functional_access_profile (company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	SELECT 'acgw','in','custowner','MHMMACHINELIFE',1,0,0,0,0,0,0,0,'system'



Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='custowner' and feature_id='MHMACTOPEN'
	
	INSERT functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','custowner','MHMACTOPEN',1,0,0,0,0,0,0,0,'system'


Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='custowner' and feature_id='MHMACTCLOSED'
	
	INSERT functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','custowner','MHMACTCLOSED',1,0,0,0,0,0,0,0,'system'
 

Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='SECORD' AND feature_id='MHMACTOPEN'
		
	insert functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','SECORD','MHMACTOPEN',1,0,0,0,0,0,0,0,'acgwadmn'


Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='SECORD' AND feature_id='MHMACTCLOSED'
		
	insert functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','SECORD','MHMACTCLOSED',1,0,0,0,0,0,0,0,'acgwadmn'


Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='SECORD' AND feature_id='MHMPRODINFO'
	insert functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','SECORD','MHMPRODINFO',1,0,0,0,0,0,0,0,'acgwadmn'


Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='appvisitor' and feature_id='MHMPRODINFO'

	INSERT functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','appvisitor','MHMPRODINFO',1,0,0,0,0,0,0,0,'system'


Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='SEENG' AND feature_id='MHMMYSERVCALL'

	insert functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','SEENG','MHMMYSERVCALL',1,0,1,1,0,0,0,0,'acgwadmn'


Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='SEENG' AND feature_id='MHMMYVISITCALL'

	insert functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','SEENG','MHMMYVISITCALL',1,0,1,1,0,0,0,0,'acgwadmn'
	
	
Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='SEENG' AND feature_id='MHMPRODINFO'

	insert functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','SEENG','MHMPRODINFO',1,0,1,1,0,0,0,0,'acgwadmn'
	
	
	Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='SECORD' AND feature_id='MNGCUSCON'

	insert functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','SECORD','MNGCUSCON',1,1,0,0,0,0,0,0,'acgwadmn'
	
	Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='SECORD' AND feature_id='MCALCOMPLETE'

	insert functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','SECORD','MCALCOMPLETE',1,0,0,0,0,0,0,0,'acgwadmn'	

	Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='custowner' AND feature_id='MCALCLOSE'

	insert functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','custowner','MCALCLOSE',1,0,0,0,0,0,0,0,'acgwadmn'
	
	
	Delete from functional_access_profile Where company_id='acgw' and country_code='in' and user_group_id='custowner' AND feature_id='CALCLOSE'

	insert functional_access_profile(company_id,country_code,user_group_id,feature_id,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,last_update_id)
	select 'acgw','in','custowner','CALCLOSE',1,0,0,0,0,0,0,0,'acgwadmn'
	

delete from functional_access_profile where feature_id like 'CPORT%'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acgw','in','CPORTACTCLOSED','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acgw' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acgw','in','CPORTACTLOGGING','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acgw' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acgw','in','CPORTACTOPEN','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acgw' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acgw','in','CPORTDASH','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acgw' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acgw','in','CPORTMYMACHINES','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acgw' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acgw','in','CPORTNB','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acgw' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acgw','in','CPORTPRODINFO','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acgw' and country_code = 'in'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'acgw','in','CPORTTIMELINE','0','0','0','0','0','0','0','0','system'
from user_group where company_id = 'acgw' and country_code = 'in'


update functional_access_profile
set feature_access = 1
where feature_id in ('CPORTPRODINFO','CPORTTIMELINE','CPORTMYMACHINES','CPORTACTLOGGING','CPORTACTOPEN','CPORTACTCLOSED')
and user_group_id = 'custowner'
and company_id = 'acgw' and country_code = 'in'


update functional_access_profile
set feature_access = 1
where feature_id in ('CPORTPRODINFO','CPORTACTOPEN','CPORTACTCLOSED')
and user_group_id ='SECORD'
and company_id = 'acgw' and country_code = 'in'

update functional_access_profile
set edit_access = 1
where feature_id ='MNGCUSCON' and user_group_id ='SECORD'and company_id = 'acgw' and country_code = 'in'

update functional_access_profile
set view_access = 1
where feature_id ='MNGCUSCON'and user_group_id ='SECORD'and company_id = 'acgw' and country_code = 'in'


update functional_access_profile
set add_access='1'
where user_group_id='custowner' and feature_id='CPORTACTLOGGING'

update functional_access_profile
set feature_access='0'
where feature_id ='MHMMYASSET' and user_group_id='appvisitor'

update functional_access_profile
set feature_access='0'
where feature_id ='MHMMACHINELIFE' and user_group_id='appvisitor'



DELETE from functional_access_profile where company_id = 'acgw' and country_code = 'in' and feature_id = 'MUSERATTACH'

Insert into functional_access_profile (user_group_id, company_id, country_code, feature_access, add_access,edit_access,view_access,delete_access,export_access, print_access, import_access,feature_id, last_update_id)
select user_group_id,company_id,country_code,feature_access,add_access,edit_access,view_access,delete_access,export_access,print_access,import_access,
'MUSERATTACH','system'
from functional_access_profile where company_id = 'acgw' and country_code = 'in' and feature_id='MUSERATTACHMENT'

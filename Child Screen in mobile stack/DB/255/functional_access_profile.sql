delete from functional_access_profile where company_id = 'stack' and country_code = 'kw' and feature_id = 'MSPARERETN'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'stack','kw','MSPARERETN',0,0,0,0,0,0,0,0,'system'
from user_group where company_id = 'stack' and country_code = 'kw'
	
UPDATE [functional_access_profile]
SET [feature_access] = 0
WHERE [company_id] = N'stack'
	AND [country_code] = N'kw'
	AND [user_group_id] IN (N'OEM_SENGG')
	AND [feature_id] IN (N'MSPARERETN')		
	
delete from functional_access_profile where company_id = 'stack' and country_code = 'kw' and feature_id = 'MSPAREREQT'

insert into functional_access_profile (user_group_id, company_id, country_code, feature_id, feature_access, add_access,
edit_access, view_access, delete_access, export_access, print_access, import_access, last_update_id)
select distinct user_group_id, 'stack','kw','MSPAREREQT',0,0,0,0,0,0,0,0,'system'
from user_group where company_id = 'stack' and country_code = 'kw'
	
UPDATE [functional_access_profile]
SET [feature_access] = 0
WHERE [company_id] = N'stack'
	AND [country_code] = N'kw'
	AND [user_group_id] IN (N'OEM_SENGG')
	AND [feature_id] IN (N'MSPAREREQT')		
	

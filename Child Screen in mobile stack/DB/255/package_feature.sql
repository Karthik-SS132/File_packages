delete from package_feature where feature_id in ('MSPARERETN')

insert into package_feature (package_id, module_id, feature_id, last_update_id)
select 'ELM','DOUBLEO','MSPARERETN','system'

delete from package_feature where feature_id in ('MSPAREREQT')

insert into package_feature (package_id, module_id, feature_id, last_update_id)
select 'ELM','DOUBLEO','MSPAREREQT','system'

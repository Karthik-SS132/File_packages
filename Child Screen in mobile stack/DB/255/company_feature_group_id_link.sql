/* company_feature_group_id_link update */

delete from company_feature_group_id_link where company_id = 'stack' and country_code = 'kw' and
parent_feature_group = 'HOMELAYOUT' and child_feature_id_or_group = 'MSPAREREQT'

insert into company_feature_group_id_link (company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind,
parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
select 'stack','kw','HOMELAYOUT','MSPAREREQT','F',0,1,0,(select MAX(child_display_order)+1 from company_feature_group_id_link where company_id = 'stack' and country_code = 'kw' and parent_feature_group = 'HOMELAYOUT'),'system'



delete from company_feature_group_id_link where company_id = 'stack' and country_code = 'kw' and
parent_feature_group = 'HOMELAYOUT' and child_feature_id_or_group = 'MSPARERETN'

insert into company_feature_group_id_link (company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind,
parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
select 'stack','kw','HOMELAYOUT','MSPARERETN','F',0,1,0,(select MAX(child_display_order)+1 from company_feature_group_id_link where company_id = 'stack' and country_code = 'kw' and parent_feature_group = 'HOMELAYOUT'),'system'

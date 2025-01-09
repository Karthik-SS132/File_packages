/* My asset Life */
DELETE FROM company_feature_group  where company_id='stack' and country_code='kw' and feature_group ='my_asset'

INSERT [dbo].[company_feature_group] ([company_id], [country_code], [feature_group], [group_display_label], [last_update_id]) 
VALUES (N'stack', N'kw', N'my_asset', N'My Asset', N'system')

DELETE FROM company_feature where company_id='stack' and country_code='kw' and feature_id ='MHMASSETLIFE'

INSERT [dbo].[company_feature] ([company_id], [country_code], [feature_id], [feature_name], [feature_display_label], [program_reference], [menu_display_ind], [screen_id], [channel_id], [last_update_id]) 
VALUES (N'stack', N'kw', N'MHMASSETLIFE', N'Asset Life', N'Asset Life', NULL, 0, N'machine_life_details', N'mobile', N'system')

DELETE FROM company_feature_group_id_link where company_id='stack' and country_code='kw' and child_feature_id_or_group ='MHMASSETLIFE'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) 
VALUES (N'stack', N'kw', N'my_asset', N'MHMASSETLIFE', N'F', 0, 1, 0, 6, N'system')

DELETE FROM functional_access_profile where company_id='stack' and country_code='kw' and feature_id ='MHMASSETLIFE'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) 
VALUES (N'stack', N'kw', N'custowner', N'MHMASSETLIFE', 1, 1, 1, 1, 0, 0, 0, 0, N'stackadmn')	

DELETE FROM package_feature where feature_id ='MHMASSETLIFE'

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) 
VALUES (N'ELM', N'DOUBLEO', N'MHMASSETLIFE', N'system')

/* custowner access */
delete from functional_access_profile where user_group_id='custowner' and feature_id in ('MHMACTCLOSED','MHMACTOPEN','MHMHOME','MHMMACHINELIFE','MHMPRODINFO','MTIMECARD')

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) 
VALUES (N'stack', N'kw', N'custowner', N'MHMACTCLOSED', 0, 0, 0, 0, 0, 0, 0, 0, N'stackadmn')	

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) 
VALUES (N'stack', N'kw', N'custowner', N'MHMACTOPEN', 0, 0, 0, 0, 0, 0, 0, 0, N'stackadmn')	

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) 
VALUES (N'stack', N'kw', N'custowner', N'MHMHOME', 0, 0, 0, 0, 0, 0, 0, 0, N'stackadmn')	

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) 
VALUES (N'stack', N'kw', N'custowner', N'MHMMACHINELIFE', 0, 0, 0, 0, 0, 0, 0, 0, N'stackadmn')	

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) 
VALUES (N'stack', N'kw', N'custowner', N'MHMPRODINFO', 1, 0, 0, 0, 0, 0, 0, 0, N'stackadmn')	

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) 
VALUES (N'stack', N'kw', N'custowner', N'MTIMECARD', 0, 0, 0, 0, 0, 0, 0, 0, N'stackadmn')	
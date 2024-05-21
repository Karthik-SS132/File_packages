delete from functional_access_profile where company_id='gwell' and country_code='in' and feature_id='CUSTFB' and user_group_id='CCENTRUSER'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'gwell', N'in', N'CCENTRUSER', N'CUSTFB', 1, 0, 1, 1, 1, 1, 1, 1, N'system')



delete from functional_access_profile where company_id='gwell' and country_code='in' and feature_id='CALCLOSE1' and user_group_id='CCENTRUSER'

INSERT [dbo].[functional_access_profile] ([company_id], [country_code], [user_group_id], [feature_id], [feature_access], [add_access], [edit_access], [view_access], [delete_access], [export_access], [print_access], [import_access], [last_update_id]) VALUES (N'gwell', N'in', N'CCENTRUSER', N'CALCLOSE1', 1, 0, 0, 0, 0, 0, 0, 0, N'system')


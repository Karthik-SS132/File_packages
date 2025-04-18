/* company feature update */

DELETE FROM [dbo].[company_feature] WHERE [company_id] = N'stack' AND [country_code] = N'kw' AND [feature_id] IN (N'MSPARERETN')

INSERT [dbo].[company_feature] ([company_id], [country_code], [feature_id], [feature_name], [feature_display_label], [program_reference], [menu_display_ind], [screen_id], [channel_id], [last_update_id]) VALUES (N'stack', N'kw', N'MSPARERETN', N'Spare Return Form', N'Spare Return Form', NULL, 1, N'spare_return_form', N'mobile', N'system')

DELETE FROM [dbo].[company_feature] WHERE [company_id] = N'stack' AND [country_code] = N'kw' AND [feature_id] IN (N'MSPAREREQT')

INSERT [dbo].[company_feature] ([company_id], [country_code], [feature_id], [feature_name], [feature_display_label], [program_reference], [menu_display_ind], [screen_id], [channel_id], [last_update_id]) VALUES (N'stack', N'kw', N'MSPAREREQT', N'Spare Request Form', N'Spare Request Form', NULL, 0, N'spare_request_form', N'mobile', N'system')

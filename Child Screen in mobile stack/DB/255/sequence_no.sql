/* company feature update */

DELETE FROM [dbo].[sequence_no] WHERE [company_id] = N'stack' AND [country_code] = N'kw' AND [sequence_no_type] = N'ANCILLARY' and by_field_1 = N'SPREQ'

INSERT [dbo].[sequence_no] ([company_id], [country_code], [sequence_no_type], [sequence_part_no], [by_field_1], [by_field_2], [by_field_3], [by_field_4], [by_field_5], [last_used_no],[last_update_id]) VALUES (N'stack', N'kw', N'ANCILLARY', N'1', N'SPREQ', N'SPREQ', N'NA', N'NA', N'NA',N'0', N'system')

DELETE FROM [dbo].[sequence_no] WHERE [company_id] = N'stack' AND [country_code] = N'kw' AND [sequence_no_type] = N'ANCILLARY' and by_field_1 = N'SPRET'

INSERT [dbo].[sequence_no] ([company_id], [country_code], [sequence_no_type], [sequence_part_no], [by_field_1], [by_field_2], [by_field_3], [by_field_4], [by_field_5], [last_used_no],[last_update_id]) VALUES (N'stack', N'kw', N'ANCILLARY', N'1', N'SPRET', N'SPRET', N'NA', N'NA', N'NA',N'0', N'system')

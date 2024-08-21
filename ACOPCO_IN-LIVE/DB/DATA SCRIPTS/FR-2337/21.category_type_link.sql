

delete from category_type_link where company_id = 'acopco' and country_code = 'in' and link_type ='CO'

/* INSERT QUERY NO: 1 */
INSERT INTO category_type_link(company_id, country_code, link_type, category_code_type, category_code_value, type_code_type, type_code_value, last_update_id)
VALUES
(
'acopco', 'in', 'CO', 'CUSTCONTCATG', 'OWNER', 'CUSTCONTTYPE', 'OWNER', 'system'
);

/* INSERT QUERY NO: 2 */
INSERT INTO category_type_link(company_id, country_code, link_type, category_code_type, category_code_value, type_code_type, type_code_value, last_update_id)
VALUES
(
'acopco', 'in', 'CO', 'CUSTCONTCATG', 'SITEINCHG', 'CUSTCONTTYPE', 'SITEINCHG', 'system'
);


delete from category_type_link where company_id = 'acopco' and country_code = 'in' and link_type = 'FS' 


INSERT [dbo].[category_type_link] ([company_id], [country_code], [link_type], [category_code_type], [category_code_value], [type_code_type], [type_code_value], [last_update_id]) VALUES (N'acopco', N'in', N'FS', N'FILECATG', N'A', N'FILESIZE', N'1', N'system')
INSERT [dbo].[category_type_link] ([company_id], [country_code], [link_type], [category_code_type], [category_code_value], [type_code_type], [type_code_value], [last_update_id]) VALUES (N'acopco', N'in', N'FS', N'FILECATG', N'CSV', N'FILESIZE', N'1', N'system')
INSERT [dbo].[category_type_link] ([company_id], [country_code], [link_type], [category_code_type], [category_code_value], [type_code_type], [type_code_value], [last_update_id]) VALUES (N'acopco', N'in', N'FS', N'FILECATG', N'D', N'FILESIZE', N'1', N'system')
INSERT [dbo].[category_type_link] ([company_id], [country_code], [link_type], [category_code_type], [category_code_value], [type_code_type], [type_code_value], [last_update_id]) VALUES (N'acopco', N'in', N'FS', N'FILECATG', N'I', N'FILESIZE', N'1', N'system')
INSERT [dbo].[category_type_link] ([company_id], [country_code], [link_type], [category_code_type], [category_code_value], [type_code_type], [type_code_value], [last_update_id]) VALUES (N'acopco', N'in', N'FS', N'FILECATG', N'P', N'FILESIZE', N'1', N'system')
INSERT [dbo].[category_type_link] ([company_id], [country_code], [link_type], [category_code_type], [category_code_value], [type_code_type], [type_code_value], [last_update_id]) VALUES (N'acopco', N'in', N'FS', N'FILECATG', N'V', N'FILESIZE', N'1', N'system')




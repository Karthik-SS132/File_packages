delete from category_type_link where company_id = 'acgw' and country_code = 'in' and link_type ='CO'

/* INSERT QUERY NO: 1 */
INSERT INTO category_type_link(company_id, country_code, link_type, category_code_type, category_code_value, type_code_type, type_code_value, last_update_id)
VALUES
(
'acgw', 'in', 'CO', 'CUSTCONTCATG', 'OWNER', 'CUSTCONTTYPE', 'OWNER', 'system'
);

/* INSERT QUERY NO: 2 */
INSERT INTO category_type_link(company_id, country_code, link_type, category_code_type, category_code_value, type_code_type, type_code_value, last_update_id)
VALUES
(
'acgw', 'in', 'CO', 'CUSTCONTCATG', 'SITEINCHG', 'CUSTCONTTYPE', 'SITEINCHG', 'system'
);


IF NOT EXISTS (select 1 from category_type_link where company_id='acgw' and country_code='in' and category_code_type = 'FILECATG' and category_code_type = 'A' and type_code_type = 'FILESIZE')

BEGIN
   INSERT [dbo].[category_type_link] ([company_id], [country_code], [link_type], [category_code_type], [category_code_value], [type_code_type], [type_code_value], [last_update_id]) VALUES (N'acgw', N'in', N'FS', N'FILECATG', N'A', N'FILESIZE', N'5', N'system')
END


IF NOT EXISTS (select 1 from category_type_link where company_id='acgw' and country_code='in' and category_code_type = 'FILECATG' and category_code_type = 'CSV' and type_code_type = 'FILESIZE')

BEGIN

  INSERT [dbo].[category_type_link] ([company_id], [country_code], [link_type], [category_code_type], [category_code_value], [type_code_type], [type_code_value], [last_update_id]) VALUES (N'acgw', N'in', N'FS', N'FILECATG', N'CSV', N'FILESIZE', N'5', N'system')

END

IF NOT EXISTS (select 1 from category_type_link where company_id='acgw' and country_code='in' and category_code_type = 'FILECATG' and category_code_type = 'D' and type_code_type = 'FILESIZE')

BEGIN

  INSERT [dbo].[category_type_link] ([company_id], [country_code], [link_type], [category_code_type], [category_code_value], [type_code_type], [type_code_value], [last_update_id]) VALUES (N'acgw', N'in', N'FS', N'FILECATG', N'D', N'FILESIZE', N'5', N'system')

END

IF NOT EXISTS (select 1 from category_type_link where company_id='acgw' and country_code='in' and category_code_type = 'FILECATG' and category_code_type = 'P' and type_code_type = 'FILESIZE')

BEGIN

  INSERT [dbo].[category_type_link] ([company_id], [country_code], [link_type], [category_code_type], [category_code_value], [type_code_type], [type_code_value], [last_update_id]) VALUES (N'acgw', N'in', N'FS', N'FILECATG', N'P', N'FILESIZE', N'5', N'system')

END

IF NOT EXISTS (select 1 from category_type_link where company_id='acgw' and country_code='in' and category_code_type = 'FILECATG' and category_code_type = 'V' and type_code_type = 'FILESIZE')

BEGIN

  INSERT [dbo].[category_type_link] ([company_id], [country_code], [link_type], [category_code_type], [category_code_value], [type_code_type], [type_code_value], [last_update_id]) VALUES (N'acgw', N'in', N'FS', N'FILECATG', N'V', N'FILESIZE', N'5', N'system')

END




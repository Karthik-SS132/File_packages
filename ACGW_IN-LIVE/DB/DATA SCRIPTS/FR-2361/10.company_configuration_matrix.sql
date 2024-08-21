declare @p_company_id varchar(20), @p_country_code varchar(5)
select @p_company_id = 'acgw'
select @p_country_code = 'in'

if exists (select 1 from company_master where company_id = @p_company_id and ho_country_code = @p_country_code)
begin
	
	if exists 
	(
		select 1 from company_configuration_matrix 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and config_code = 'SECURITY_CODE_EXPIRY_INTERVAL_IN_SEC'
			and config_sub_code = 'AUTHUSER'
			and config_value1 = '120'
	)
	begin
		delete from company_configuration_matrix 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and config_code = 'SECURITY_CODE_EXPIRY_INTERVAL_IN_SEC'
			and config_sub_code = 'AUTHUSER'
			and config_value1 = '120'
	end

delete from company_configuration_matrix 
where company_id = @p_company_id and country_code = @p_country_code and config_code = 'SECURITY_CODE_EXPIRY_INTERVAL_IN_SEC'
			
	Insert company_configuration_matrix (company_id, country_code, config_code, config_sub_code, config_value1, last_update_id)
	select @p_company_id, @p_country_code, 'SECURITY_CODE_EXPIRY_INTERVAL_IN_SEC', 'AUTHUSERMOBILE', '120', 'system'

	Insert company_configuration_matrix (company_id, country_code, config_code, config_sub_code, config_value1, last_update_id)
	select @p_company_id, @p_country_code, 'SECURITY_CODE_EXPIRY_INTERVAL_IN_SEC', 'AUTHUSEREMAIL', '180', 'system'

	Insert company_configuration_matrix (company_id, country_code, config_code, config_sub_code, config_value1, last_update_id)
	select @p_company_id, @p_country_code, 'SECURITY_CODE_EXPIRY_INTERVAL_IN_SEC', 'VERIFYMOBILE', '120', 'system'
	
	Insert company_configuration_matrix (company_id, country_code, config_code, config_sub_code, config_value1, last_update_id)
	select @p_company_id, @p_country_code, 'SECURITY_CODE_EXPIRY_INTERVAL_IN_SEC', 'VERIFYEMAIL', '180', 'system'
end	

delete from company_configuration_matrix where company_id = 'acgw' and country_code = 'in' and config_code = 'APPLICABLE-LOCALE' and config_value1='en-us'

INSERT [dbo].[company_configuration_matrix] ([company_id], [country_code], [config_code], [config_sub_code], [config_value1], [config_value2], [config_value3], [config_value4], [config_value5], [config_value6], [config_value7], [config_value8], [config_value9], [config_value10], [last_update_id]) VALUES (N'acgw', N'in', N'APPLICABLE-LOCALE', N'NA', N'en-us', N'null', N'null', N'null', N'null', N'null', N'null', N'null', N'null', N'null', N'system')

delete from locale where locale_id = 'en-us'  

INSERT [dbo].[locale] ([locale_id], [locale_name], [locale_hex], [locale_dec], [last_update_id]) VALUES (N'en-us', N'US-English', N'', 1, N'system')

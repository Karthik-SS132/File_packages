declare @p_company_id varchar(20), @p_country_code varchar(5)
select @p_company_id = 'dynapac'
select @p_country_code = 'in'

if exists (select 1 from company_master where company_id = @p_company_id and ho_country_code = @p_country_code)
begin

	if exists 
	(
		select 1 from company_notification_template_master 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_template_id = 'AUTHUSER_SECURITY_CODE'		
	)
	begin
		delete from company_notification_template_master 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_template_id = 'AUTHUSER_SECURITY_CODE'	
	end
	
	if not exists 
	(
		select 1 from company_notification_template_master 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_template_id = 'AUTHUSEREMAIL_SECURITY_CODE'		
	)
	begin
		insert company_notification_template_master (company_id, country_code, notification_template_id, description, last_update_id) 	
		select @p_company_id, @p_country_code, 'AUTHUSEREMAIL_SECURITY_CODE', 'Auth user verify Email ID', 'system'
	end
	
	if not exists 
	(
		select 1 from company_notification_template_master 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_template_id = 'AUTHUSERMOBILE_SECURITY_CODE'		
	)
	begin
		insert company_notification_template_master (company_id, country_code, notification_template_id, description, last_update_id) 	
		select @p_company_id, @p_country_code, 'AUTHUSERMOBILE_SECURITY_CODE', 'Auth user verify Mobile Number', 'system'
	end
	
	if not exists 
	(
		select 1 from company_notification_template_master 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_template_id = 'VERIFYEMAIL_SECURITY_CODE'		
	)
	begin
		insert company_notification_template_master (company_id, country_code, notification_template_id, description, last_update_id) 	
		select @p_company_id, @p_country_code, 'VERIFYEMAIL_SECURITY_CODE', 'Verify Email ID', 'system'
	end
	
	if not exists 
	(
		select 1 from company_notification_template_master 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_template_id = 'VERIFYMOBILE_SECURITY_CODE'		
	)
	begin
		insert company_notification_template_master (company_id, country_code, notification_template_id, description, last_update_id) 	
		select @p_company_id, @p_country_code, 'VERIFYMOBILE_SECURITY_CODE', 'Verify Mobile Number', 'system'
	end
	
	
end	


IF NOT EXISTS( SELECT 1 FROM company_notification_template_master WHERE company_id = @p_company_id and country_code = @p_country_code and notification_template_id = 'VISITOR_PROFILE' )

BEGIN
	INSERT company_notification_template_master ( company_id, country_code, notification_template_id, description,last_update_id)
	SELECT @p_company_id, @p_country_code,'VISITOR_PROFILE','Visitor Profile Entry','system'	
END

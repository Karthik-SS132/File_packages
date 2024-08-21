declare @p_company_id varchar(20), @p_country_code varchar(5)
select @p_company_id = 'epiroc'
select @p_country_code = 'in'

if exists (select 1 from company_master where company_id = @p_company_id and ho_country_code = @p_country_code)
begin

	delete from company_notification_mode_preference 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSERMOBILE_SECURITY_CODE'
			and  notification_mode = 'SMS'
			
		insert company_notification_mode_preference (company_id, country_code, notification_event_code, notification_mode, attachment_avl_ind, notification_template_id, last_update_id) 	
		select @p_company_id, @p_country_code, 'AUTHUSERMOBILE_SECURITY_CODE', 'SMS', 0, 'AUTHUSERMOBILE_SECURITY_CODE', 'system'		

	
	delete from company_notification_mode_preference 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSEREMAIL_SECURITY_CODE'
			and  notification_mode = 'EMAIL'

		insert company_notification_mode_preference (company_id, country_code, notification_event_code, notification_mode, attachment_avl_ind, notification_template_id, last_update_id) 	
		select @p_company_id, @p_country_code, 'AUTHUSEREMAIL_SECURITY_CODE', 'EMAIL', 0, 'AUTHUSEREMAIL_SECURITY_CODE', 'system'		


	delete from company_notification_mode_preference 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'VERIFYMOBILE_SECURITY_CODE'
			and  notification_mode = 'SMS'
			
	
		insert company_notification_mode_preference (company_id, country_code, notification_event_code, notification_mode, attachment_avl_ind, notification_template_id, last_update_id) 	
		select @p_company_id, @p_country_code, 'VERIFYMOBILE_SECURITY_CODE', 'SMS', 0, 'VERIFYMOBILE_SECURITY_CODE', 'system'		
	
	
	delete from company_notification_mode_preference 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'VERIFYEMAIL_SECURITY_CODE'
			and  notification_mode = 'EMAIL'
	
		insert company_notification_mode_preference (company_id, country_code, notification_event_code, notification_mode, attachment_avl_ind, notification_template_id, last_update_id) 	
		select @p_company_id, @p_country_code, 'VERIFYEMAIL_SECURITY_CODE', 'EMAIL', 0, 'VERIFYEMAIL_SECURITY_CODE', 'system'		

	delete from company_notification_mode_preference 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSER_SECURITY_CODE'
			and  notification_mode = 'SMS'
	
		delete from company_notification_mode_preference 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSER_SECURITY_CODE'
			and  notification_mode = 'SMS'


end	

IF NOT EXISTS( select 1 from company_notification_mode_preference where company_id = @p_company_id and country_code = @p_country_code and notification_event_code = 'VISITOR_PROFILE')
BEGIN
	INSERT company_notification_mode_preference (company_id, country_code, notification_event_code, notification_mode, attachment_avl_ind,notification_template_id, last_update_id) 	
	SELECT @p_company_id,@p_country_code,'VISITOR_PROFILE','EMAIL','0','VISITOR_PROFILE','system'
		
END
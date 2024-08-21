declare @p_company_id varchar(20), @p_country_code varchar(5)
select @p_company_id = 'epiroc'
select @p_country_code = 'in'



if exists (select 1 from company_master where company_id = @p_company_id and ho_country_code = @p_country_code)

begin

	if exists 
	(
		select 1 from company_notification 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSER_SECURITY_CODE'
			
	)
	begin
	
		delete from company_notification 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSER_SECURITY_CODE'
	end
	
	
	if not exists 
	(
		select 1 from company_notification 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSEREMAIL_SECURITY_CODE'
			
	)
	begin
		insert company_notification (company_id, country_code, notification_event_code, description, active_ind, last_update_id) 	
		select @p_company_id, @p_country_code, 'AUTHUSEREMAIL_SECURITY_CODE', 'Auth user verify Email ID', 1, 'system'
			
	end
	
	if not exists 
	(
		select 1 from company_notification 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSERMOBILE_SECURITY_CODE'
			
	)
	begin
		insert company_notification (company_id, country_code, notification_event_code, description, active_ind, last_update_id) 	
		select @p_company_id, @p_country_code, 'AUTHUSERMOBILE_SECURITY_CODE', 'Auth user verify Mobile Number', 1, 'system'
			
	end

	if not exists 
	(
		select 1 from company_notification 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'VERIFYEMAIL_SECURITY_CODE'
			
	)
	begin
		insert company_notification (company_id, country_code, notification_event_code, description, active_ind, last_update_id) 	
		select @p_company_id, @p_country_code, 'VERIFYEMAIL_SECURITY_CODE', 'Verify Email ID', 1, 'system'
			
	end
	
	if not exists 
	(
		select 1 from company_notification 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'VERIFYMOBILE_SECURITY_CODE'
			
	)
	begin
		insert company_notification (company_id, country_code, notification_event_code, description, active_ind, last_update_id) 	
		select @p_company_id, @p_country_code, 'VERIFYMOBILE_SECURITY_CODE', 'Verify Mobile Number', 1, 'system'
			
	end
end	



delete from company_notification where company_id = @p_company_id and country_code = @p_country_code and notification_event_code = 'VISITOR_PROFILE'


	INSERT company_notification (company_id, country_code, notification_event_code, description, active_ind, last_update_id) 	
	SELECT @p_company_id,@p_country_code,'VISITOR_PROFILE','Visitor Profile Entry','1','system'
		
delete from company_notification where company_id = @p_company_id and country_code = @p_country_code and notification_event_code = 'ACTIVATE_USER'

	INSERT company_notification (company_id, country_code, notification_event_code, description, active_ind, last_update_id) 	
	SELECT @p_company_id,@p_country_code,'ACTIVATE_USER','Activate User','1','system'
		

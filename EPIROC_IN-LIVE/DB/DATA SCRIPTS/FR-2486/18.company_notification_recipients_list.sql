declare @p_company_id varchar(20), @p_country_code varchar(5)
select @p_company_id = 'epiroc'
select @p_country_code = 'in'

if exists (select 1 from company_master where company_id = @p_company_id and ho_country_code = @p_country_code)
begin

	if not exists 
	(
		select 1 from company_notification_recipients_list 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSEREMAIL_SECURITY_CODE'
			and notification_mode = 'EMAIL'
			and recipient_type = 'To'
			and id_type = 'RQ'
	)
	begin
		insert company_notification_recipients_list (company_id, country_code, notification_event_code, notification_mode, recipient_type, id_type, org_level_no, id_code, last_update_id) 	
		select @p_company_id, @p_country_code, 'AUTHUSEREMAIL_SECURITY_CODE', 'EMAIL', 'To', 'RQ', NULL, NULL, 'system'
	end
	
	if not exists 
	(
		select 1 from company_notification_recipients_list 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSERMOBILE_SECURITY_CODE'
			and notification_mode = 'SMS'
			and recipient_type = 'To'
			and id_type = 'RQ'
	)
	begin
		insert company_notification_recipients_list (company_id, country_code, notification_event_code, notification_mode, recipient_type, id_type, org_level_no, id_code, last_update_id) 	
		select @p_company_id, @p_country_code, 'AUTHUSERMOBILE_SECURITY_CODE', 'SMS', 'To', 'RQ', NULL, NULL, 'system'
	end
	
	if not exists 
	(
		select 1 from company_notification_recipients_list 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'VERIFYEMAIL_SECURITY_CODE'
			and notification_mode = 'EMAIL'
			and recipient_type = 'To'
			and id_type = 'RQ'
	)
	begin
		insert company_notification_recipients_list (company_id, country_code, notification_event_code, notification_mode, recipient_type, id_type, org_level_no, id_code, last_update_id) 	
		select @p_company_id, @p_country_code, 'VERIFYEMAIL_SECURITY_CODE', 'EMAIL', 'To', 'RQ', NULL, NULL, 'system'
	end
	
	if not exists 
	(
		select 1 from company_notification_recipients_list 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'VERIFYMOBILE_SECURITY_CODE'
			and notification_mode = 'SMS'
			and recipient_type = 'To'
			and id_type = 'RQ'
	)
	begin
		insert company_notification_recipients_list (company_id, country_code, notification_event_code, notification_mode, recipient_type, id_type, org_level_no, id_code, last_update_id) 	
		select @p_company_id, @p_country_code, 'VERIFYMOBILE_SECURITY_CODE', 'SMS', 'To', 'RQ', NULL, NULL, 'system'
	end
	
	if exists 
	(
		select 1 from company_notification_recipients_list 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSER_SECURITY_CODE'
			and notification_mode = 'SMS'
			and recipient_type = 'To'
			and id_type = 'RQ'
	)
	begin
		delete from company_notification_recipients_list 
		where company_id = @p_company_id 
			and country_code = @p_country_code
			and notification_event_code = 'AUTHUSER_SECURITY_CODE'
			and notification_mode = 'SMS'
			and recipient_type = 'To'
			and id_type = 'RQ'
	end
	
end	


IF NOT EXISTS( SELECT 1 FROM company_notification_recipients_list WHERE company_id = @p_company_id and country_code = @p_country_code and notification_event_code = 'VISITOR_PROFILE' and notification_mode = 'EMAIL' and recipient_type = 'To' and id_type = 'EI')

BEGIN
	INSERT company_notification_recipients_list ( company_id, country_code, notification_event_code, notification_mode, recipient_type,id_type,org_level_no,id_code,last_update_id)
	SELECT @p_company_id, @p_country_code,'VISITOR_PROFILE','EMAIL','To','EI','0','empco001','system'	
END



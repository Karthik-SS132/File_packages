declare @p_company_id varchar(20), @p_country_code varchar(5)
select @p_company_id = 'acopco'
select @p_country_code = 'in'

if not exists 
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
	insert company_notification_recipients_list 
	(
		company_id, 
		country_code, 
		notification_event_code,
		notification_mode,
		recipient_type,
		id_type,
		last_update_id
	) 	
	select @p_company_id,
		@p_country_code,
		'AUTHUSER_SECURITY_CODE',
		'SMS',
		'To',
		'RQ',
		'system'		
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
	insert company_notification_recipients_list 
	(
		company_id, 
		country_code, 
		notification_event_code,
		notification_mode,
		recipient_type,
		id_type,
		last_update_id
	) 	
	select @p_company_id,
		@p_country_code,
		'VERIFYMOBILE_SECURITY_CODE',
		'SMS',
		'To',
		'RQ',
		'system'	
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
	insert company_notification_recipients_list 
	(
		company_id, 
		country_code, 
		notification_event_code,
		notification_mode,
		recipient_type,
		id_type,
		last_update_id
	) 	
	select @p_company_id,
		@p_country_code,
		'VERIFYEMAIL_SECURITY_CODE',
		'EMAIL',
		'To',
		'RQ',
		'system'	
end

DELETE FROM company_notification_recipients_list WHERE company_id = @p_company_id and country_code = @p_country_code and notification_event_code = 'VISITOR_PROFILE' and notification_mode = 'EMAIL' and recipient_type = 'To' and id_type = 'EI'

INSERT company_notification_recipients_list ( company_id, country_code, notification_event_code, notification_mode, recipient_type,id_type,org_level_no,id_code,last_update_id)
	SELECT @p_company_id, @p_country_code,'VISITOR_PROFILE','EMAIL','To','EI','0','pooja','system'	

IF EXISTS( select 1 from company_notification_recipients_list where company_id = @p_company_id and country_code = @p_country_code and notification_event_code = 'ACTIVATE_USER')
BEGIN

	Update company_notification_recipients_list 
	set org_level_no=0,id_code='' 
	where notification_event_code='ACTIVATE_USER'
		
END
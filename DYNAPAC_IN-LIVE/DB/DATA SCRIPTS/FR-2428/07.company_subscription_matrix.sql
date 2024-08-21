declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'dynapac'

select @p_country_code = 'in'


delete company_subscription_matrix
	where company_id = 'dynapac'
		and country_code = 'in'
		and subscription_code1 = 'APPVERSION'
		and subscription_code2 = 'com.selfservit.dpartner'
		and subscription_code3 = 'iOS'
		and subscription_code4 = 'AppleAppStore' 
		 

	insert into company_subscription_matrix(company_id,country_code,subscription_code1,subscription_code2,subscription_code3,subscription_code4,subscription_code5,subscription_value1,subscription_value2,subscription_value3,subscription_value4,subscription_value5,last_update_id)
	select 'dynapac','in','APPVERSION','com.selfservit.dpartner','iOS','AppleAppStore','Dparter','Dparter','1.1','03','DREAMS',null,'system'

delete company_subscription_matrix
	where company_id = 'dynapac'
		and country_code = 'in'
		and subscription_code1 = 'APPVERSION'
		and subscription_code2 = 'com.selfservit.dpartner'
		and subscription_code3 = 'Android'
		and subscription_code4 = 'GooglePlayStore' 
		

	insert into company_subscription_matrix(company_id,country_code,subscription_code1,subscription_code2,subscription_code3,subscription_code4,subscription_code5,subscription_value1,subscription_value2,subscription_value3,subscription_value4,subscription_value5,last_update_id)
	select 'dynapac','in','APPVERSION','com.selfservit.dpartner','Android','GooglePlayStore','Dparter','Dparter','1.1','10','DREAMS',null,'system'
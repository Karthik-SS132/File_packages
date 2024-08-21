declare @p_company_id varchar(20), @p_country_code varchar(5)
select @p_company_id = 'acgw'
select @p_country_code = 'in'




delete from company_subscription_matrix where company_id = 'acgw'and country_code = 'in'and subscription_code2 = 'com.selfservit.acg'and subscription_code3 = 'Android'

insert into company_subscription_matrix(company_id,country_code,subscription_code1,subscription_code2,subscription_code3,subscription_code4,subscription_code5,subscription_value1,subscription_value2,subscription_value3,subscription_value4,subscription_value5,last_update_id)
	select 'acgw','in','APPVERSION','com.selfservit.acg','Android','GooglePlayStore','ACG SMART SERVE','ACG SMART SERVE','1.0','0','FCMPROFESSIONAL',null,'system'




delete from company_subscription_matrix where company_id = 'acgw'and country_code = 'in'and subscription_code2 = 'com.selfservit.acg'and subscription_code3 = 'iOS'

insert into company_subscription_matrix(company_id,country_code,subscription_code1,subscription_code2,subscription_code3,subscription_code4,subscription_code5,subscription_value1,subscription_value2,subscription_value3,subscription_value4,subscription_value5,last_update_id)
	select 'acgw','in','APPVERSION','com.selfservit.acg','iOS','AppleAppStore','ACG SMART SERVE','ACG SMART SERVE','1.0','0','FCMPROFESSIONAL',null,'system'


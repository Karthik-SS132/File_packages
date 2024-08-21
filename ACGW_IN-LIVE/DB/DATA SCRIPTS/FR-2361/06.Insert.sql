
Delete employee Where company_id='acgw' and country_code='in' and employee_id='cappvisitor'


INSERT INTO employee(company_id,country_code,employee_id,first_name,middle_name,last_name,title,employee_status,organogram_level_no,organogram_level_code,location_code,contact_mobile_no,email_id,last_update_id)
VALUES	('acgw','in','cappvisitor','cappvisitor','cappvisitor','','Mr','A',1,'acgw','HO','+91-8667565944','cappvisitor@gmail.com','acgwadmn');
	


Delete user_group Where company_id='acgw' and country_code='in' and user_group_id in ('appvisitor','custowner')


INSERT INTO user_group (company_id,country_code,user_group_id,user_group_type,user_group_name,user_group_level,last_update_id)
values ('acgw','in','appvisitor','MU','App Visitor','2','system'),(
	'acgw', 'in', 'custowner', 'MU', 'Customer Owner', '2','system'
	)

Delete usage_log Where company_id='acgw' and country_code='in' and session_id='7E5851F3-B36A-408E-A0DA-49167A058B65'


insert usage_log (company_id,country_code,user_id,session_id,login_date,logout_date,device,last_update_id)
select 'acgw','in','cappvisitor','7E5851F3-B36A-408E-A0DA-49167A058B65',SYSDATETIMEOFFSET(),NULL,'Desktop','system'



Delete users Where company_id='acgw' and country_code='in' and user_id='cappvisitor'


insert users(company_id,country_code,user_id,employee_id,login_password,default_password_ind,last_login_date,user_group_id,active_ind,default_locale_id,default_timezone_id,last_update_id)
select 'acgw','in','cappvisitor','cappvisitor','7v/2yJYbOdyhtffoxGVcWb/E1WE=','N',SYSDATETIMEOFFSET(),'custowner','1','en-us','190','system'



Delete archival_excluded_session Where company_id='acgw' and country_code='in' and session_id='7E5851F3-B36A-408E-A0DA-49167A058B65'


insert into archival_excluded_session(company_id,country_code,session_id,purpose,last_update_id)
select 'acgw','in','7E5851F3-B36A-408E-A0DA-49167A058B65','Visitor Session','system'



Delete functional_role Where company_id='acgw' and country_code='in' and functional_role_id='custowner'

INSERT [dbo].[functional_role] ([company_id], [country_code], [functional_role_id], [role_description], [system_or_user_defined_role], [last_update_id]) VALUES (N'acgw', N'in', N'custowner', N'Customer Owner', N'S', N'system')



delete from functional_role_employee where company_id='acgw' and country_code='in' and employee_id ='cappvisitor'

insert into functional_role_employee(company_id,country_code,functional_role_id,employee_id,reporting_to_functional_role_id,reporting_to_employee_id,mapped_to_functional_role_id,mapped_to_employee_id,last_update_id)
select 'acgw','in','custowner','cappvisitor','','','','','acgwadmn'


delete from functional_role_employee where company_id='acgw' and country_code='in' and employee_id ='seng01'

INSERT [dbo].[functional_role_employee] ([company_id], [country_code], [functional_role_id], [employee_id], [reporting_to_functional_role_id], [reporting_to_employee_id], [mapped_to_functional_role_id], [mapped_to_employee_id], [last_update_id]) VALUES (N'acgw', N'in', N'SEENG', N'seng01', N'', N'', N'SECORD', N'secord01', N'acgwadmn')
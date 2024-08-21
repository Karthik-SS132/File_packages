declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'epiroc'

select @p_country_code = 'in'



delete from company_feature where company_id = @p_company_id and country_code = @p_country_code and feature_id = 'MNGCUSCON'	

insert company_feature (company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id) select @p_company_id, @p_country_code, 'MNGCUSCON', 'Manage Customer Contacts', 'Manage Customer Contacts', NULL, '1', 'manage_customer_contacts', 'web', 'system'



delete from company_feature where company_id='epiroc' and country_code='in' and feature_id='MHMPRODINFO' 

INSERT [dbo].[company_feature] ([company_id], [country_code], [feature_id], [feature_name], [feature_display_label], [program_reference], [menu_display_ind], [screen_id], [channel_id], [last_update_id]) VALUES (N'epiroc', N'in', N'MHMPRODINFO', N'Prodcut Information', N'Prodcut Information', NULL, 0, N'product_info', N'mobile', N'system')

delete from company_feature where company_id='epiroc' and country_code='in' and feature_id='MHMMYASSET' 

INSERT [dbo].[company_feature] ([company_id], [country_code], [feature_id], [feature_name], [feature_display_label], [program_reference], [menu_display_ind], [screen_id], [channel_id], [last_update_id]) VALUES (N'epiroc', N'in', N'MHMMYASSET', N'My Asset', N'My Asset', NULL, 0, N'my_asset', N'mobile', N'system')

delete from company_feature where company_id='epiroc' and country_code='in' and feature_id='MHMMACHINELIFE' 

INSERT [dbo].[company_feature] ([company_id], [country_code], [feature_id], [feature_name], [feature_display_label], [program_reference], [menu_display_ind], [screen_id], [channel_id], [last_update_id]) VALUES (N'epiroc', N'in', N'MHMMACHINELIFE', N'Machine Life', N'Machine Life', NULL, 0, N'machine_life', N'mobile', N'system')

delete from company_feature where company_id='epiroc' and country_code='in' and feature_id='MHMHOME' 

INSERT [dbo].[company_feature] ([company_id], [country_code], [feature_id], [feature_name], [feature_display_label], [program_reference], [menu_display_ind], [screen_id], [channel_id], [last_update_id]) VALUES (N'epiroc', N'in', N'MHMHOME', N'Help', N'Help', NULL, 0, N'my_home', N'mobile', N'system')

delete from company_feature where company_id='epiroc' and country_code='in' and feature_id='MHMACTOPEN' 

INSERT [dbo].[company_feature] ([company_id], [country_code], [feature_id], [feature_name], [feature_display_label], [program_reference], [menu_display_ind], [screen_id], [channel_id], [last_update_id]) VALUES (N'epiroc', N'in', N'MHMACTOPEN', N'My Activities Open', N'My Activities Open', NULL, 0, N'my_activities_open', N'mobile', N'system')

delete from company_feature where company_id='epiroc' and country_code='in' and feature_id='MHMACTCLOSED' 

INSERT [dbo].[company_feature] ([company_id], [country_code], [feature_id], [feature_name], [feature_display_label], [program_reference], [menu_display_ind], [screen_id], [channel_id], [last_update_id]) VALUES (N'epiroc', N'in', N'MHMACTCLOSED', N'My Activities Closed', N'My Activities Closed', NULL, 0, N'my_activities_closed', N'mobile', N'system')



delete from company_feature where company_id='epiroc' and country_code='in' and feature_id='MUSERATTACHMENT' 

INSERT [dbo].[company_feature] ([company_id], [country_code], [feature_id], [feature_name], [feature_display_label], [program_reference], [menu_display_ind], [screen_id], [channel_id], [last_update_id]) VALUES (N'epiroc', N'in', N'MUSERATTACHMENT', N'User Attachments', N'User Attachments', NULL, 0, N'manage_user_attachments', N'mobile', N'system')

delete from company_feature where feature_id='MHMMYSERVCALL'

INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'MHMMYSERVCALL', 'My Service Call', 'My Service Call', NULL, '0', 'my_service_call', 'mobile', 'system'
);

delete from company_feature where feature_id='MHMMYSERVFIL'

INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'MHMMYSERVFIL', 'My Service Call Filter', 'My Service Call Filter', NULL, '0', 'my_service_call_filter', 'mobile', 'system'
);


delete from company_feature where feature_id='MHMMYSERVREF'

INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'MHMMYSERVREF', 'My Service Call Refresh', 'My Service Call Refresh', NULL, '0', 'my_service_call_refresh', 'mobile', 'system'
);


delete from company_feature where company_id = 'epiroc' and country_code = 'in' and feature_id like 'CPORT%'

/* INSERT QUERY NO: 1 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'CPORTACTCLOSED', 'my activities closed', 'my activities closed', '', 1, 'my_activities_closed', 'web', 'system'
);

/* INSERT QUERY NO: 2 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'CPORTACTLOGGING', 'my activities logging', 'my activities logging', '', 1, 'my_activities_logging', 'web', 'system'
);

/* INSERT QUERY NO: 3 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'CPORTACTOPEN', 'my activities open', 'my activities open', '', 1, 'my_activities_open', 'web', 'system'
);

/* INSERT QUERY NO: 4 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'CPORTMYMACHINES', 'My Machines', 'My Machines', '', 1, 'my_machines', 'web', 'system'
);

/* INSERT QUERY NO: 5 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'CPORTPRODINFO', 'Product Information', 'Product Information', '', 1, 'product_information', 'web', 'system'
);

/* INSERT QUERY NO: 6 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'CPORTTIMELINE', 'Customer Timeline', 'Customer Timeline', '', 1, 'customer_timeline', 'web', 'system'
);

/* INSERT QUERY NO: 7 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'CPORTDASH', 'My Dashboard', 'My Dashboard', '', 1, 'home_dashboard', 'web', 'system'
);

/* INSERT QUERY NO: 8 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'CPORTNB', 'My Notice Board', 'My Notice Board', '', 1, 'my_notice_board', 'web', 'system'
);


IF EXISTS (select 1 from company_feature where company_id=@p_company_id and country_code=@p_country_code and feature_id ='MUSERATTACHMENT' and screen_id='manage_user_attachments' and channel_id='mobile')
	BEGIN
			update company_feature 
			set screen_id='attachments'
			where company_id=@p_company_id and country_code=@p_country_code and feature_id ='MUSERATTACHMENT' and screen_id='manage_user_attachments' and channel_id='mobile'
	END
	
IF NOT EXISTS (select 1 from company_feature where company_id='epiroc' and country_code='in' and feature_id='MUSERATTACH' )
	BEGIN

		Insert into company_feature(company_id,country_code,feature_id,feature_name,feature_display_label,program_reference,menu_display_ind,screen_id,channel_id,last_update_id)
		values ('epiroc','in','MUSERATTACH','User Attachments','User Attachments','','0','manage_user_attachments','mobile','system');
	END

delete from company_feature where company_id='epiroc' and country_code='in' and feature_id='MHMPUNCHINOUT' 

INSERT [dbo].[company_feature] ([company_id], [country_code], [feature_id], [feature_name], [feature_display_label], [program_reference], [menu_display_ind], [screen_id], [channel_id], [last_update_id]) VALUES (N'epiroc', N'in', N'MHMPUNCHINOUT', N'Punch In Out', N'Punch In Out', NULL, 0, N'punchinout', N'mobile', N'system')

delete from company_feature where feature_id='MHMMYVISITCALL'

INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'MHMMYVISITCALL', 'My Visit Call', 'My Visit Call', NULL, '0', 'my_visit_call', 'mobile', 'system'
);

delete from company_feature where feature_id='MHMMYVISITFIL'

INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'MHMMYVISITFIL', 'My Visit Call Filter', 'My Visit Call Filter', NULL, '0', 'my_visit_call_filter', 'mobile', 'system'
);


delete from company_feature where feature_id='MHMMYVISITREF'

INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'epiroc', 'in', 'MHMMYVISITREF', 'My Visit Call Refresh', 'My Visit Call Refresh', NULL, '0', 'my_visit_call_refresh', 'mobile', 'system'
);


Delete  company_feature Where company_id='acgw' and country_code='in' and feature_id='MHMPRODINFO'

	INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
	VALUES
	(
	'acgw', 'in', 'MHMPRODINFO', 'Product Info', 'Product Info', '', 0, 'product_info', 'mobile', 'system'
	);

Delete  company_feature Where company_id='acgw' and country_code='in' and feature_id='MHMMACHINELIFE' 


 
INSERT INTO company_feature (company_id,country_code,feature_id,feature_name,feature_display_label,program_reference,menu_display_ind,screen_id,channel_id,last_update_id)
values ('acgw','in','MHMMACHINELIFE','Machine Life','Machine Life','NULL','0','machine_life','mobile','system')


Delete  company_feature Where company_id='acgw' and country_code='in' and feature_id='MHMMYASSET' 


 
insert into company_feature(company_id,country_code,feature_id,feature_name,feature_display_label,program_reference,menu_display_ind,screen_id,channel_id,last_update_id)
values('acgw','in','MHMMYASSET','My Asset','My Asset','NULL','0','my_asset','mobile','system');


Delete  company_feature Where company_id='acgw' and country_code='in' and feature_id='MHMHOME'

	INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
	VALUES
	(
	'acgw', 'in', 'MHMHOME', 'Help', 'Help', '', 0, 'my_home', 'mobile', 'system'
	);


Delete  company_feature Where company_id='acgw' and country_code='in' and feature_id='MHMACTOPEN'


	INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
	VALUES
	(
	'acgw', 'in', 'MHMACTOPEN', 'My Activities Open', 'My Activities Open', '', 0, 'my_activities_open', 'mobile', 'system'
	);



Delete  company_feature Where company_id='acgw' and country_code='in' and feature_id='MHMACTCLOSED'

	INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
	VALUES
	(
	'acgw', 'in', 'MHMACTCLOSED', 'My Activities Closed', 'My Activities Closed', '', 0, 'my_activities_closed', 'mobile', 'system'
	);


Delete  company_feature Where feature_id='MHMMYSERVCALL'

INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'acgw', 'in', 'MHMMYSERVCALL', 'My Service Call', 'My Service Call', NULL, '0', 'my_service_call', 'mobile', 'system'
);

Delete  company_feature Where feature_id='MHMMYVISITCALL'

INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'acgw', 'in', 'MHMMYVISITCALL', 'My Visit Call', 'My Visit Call', NULL, '0', 'my_visit_call', 'mobile', 'system'
);


delete from company_feature where company_id = 'acgw' and country_code = 'in' and feature_id like 'CPORT%'

/* INSERT QUERY NO: 1 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTACTCLOSED', 'my activities closed', 'my activities closed', '', 1, 'my_activities_closed', 'web', 'system'
);

/* INSERT QUERY NO: 2 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTACTLOGGING', 'my activities logging', 'my activities logging', '', 1, 'my_activities_logging', 'web', 'system'
);

/* INSERT QUERY NO: 3 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTACTOPEN', 'my activities open', 'my activities open', '', 1, 'my_activities_open', 'web', 'system'
);

/* INSERT QUERY NO: 4 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTMYMACHINES', 'My Machines', 'My Machines', '', 1, 'my_machines', 'web', 'system'
);

/* INSERT QUERY NO: 5 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTPRODINFO', 'Product Information', 'Product Information', '', 1, 'product_information', 'web', 'system'
);

/* INSERT QUERY NO: 6 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTTIMELINE', 'Customer Timeline', 'Customer Timeline', '', 1, 'customer_timeline', 'web', 'system'
);

/* INSERT QUERY NO: 7 */
INSERT INTO company_feature(company_id, country_code, feature_id, feature_name, feature_display_label, program_reference, menu_display_ind, screen_id, channel_id, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTDASH', 'My Dashboard', 'My Dashboard', '', 1, 'home_dashboard', 'web', 'system'
);


/* INSERT QUERY NO: 8 */

insert into company_feature(company_id,country_code,feature_id,feature_name,feature_display_label,program_reference,menu_display_ind,screen_id,channel_id,last_update_id)
values('ACGW','in','CPORTNB','My Notice Board','My Notice Board','','1','my_notice_board','web','system')

IF EXISTS (select 1 from company_feature where company_id='acgw' and country_code='in' and feature_id ='MUSERATTACHMENT' and screen_id='manage_user_attachments')
	BEGIN
			update company_feature 
			set screen_id='attachments'
			where company_id='acgw' and country_code='in' and feature_id ='MUSERATTACHMENT' and screen_id='manage_user_attachments'
	END
	
	IF NOT EXISTS (select 1 from company_feature where company_id='acgw' and country_code='in' and feature_id='MUSERATTACH' )
	BEGIN

		Insert into company_feature(company_id,country_code,feature_id,feature_name,feature_display_label,program_reference,menu_display_ind,screen_id,channel_id,last_update_id)
		values ('acgw','in','MUSERATTACH','User Attachments','User Attachments','','0','manage_user_attachments','mobile','system');
	END


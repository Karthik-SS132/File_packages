

Delete company_feature_group_id_link Where company_id='acgw' and country_code='in' and child_feature_id_or_group='MHMPRODINFO' and parent_feature_group='HOMELAYOUT'


INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acgw', N'in', N'HOMELAYOUT', N'MHMPRODINFO', N'F', 0, 1, 0, 1, N'system')



Delete company_feature_group_id_link Where company_id='acgw' and country_code='in' and child_feature_id_or_group='MHMHOME' and parent_feature_group='HOMELAYOUT'

	INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
	VALUES
	(
	'acgw','in', 'HOMELAYOUT', 'MHMHOME', 'F', 0, 1, 0, 8, 'system'
	);



Delete company_feature_group_id_link Where company_id='acgw' and country_code='in' and child_feature_id_or_group='MHMMYASSET' and parent_feature_group='HOMELAYOUT'

	INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
	VALUES
	(
	'acgw', 'in', 'HOMELAYOUT', 'MHMMYASSET', 'F', 0, 1, 0, 2, 'system'
	);
 


Delete company_feature_group_id_link Where company_id='acgw' and country_code='in' and child_feature_id_or_group='MHMMACHINELIFE' and parent_feature_group='HOMELAYOUT'

	INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
	VALUES
	(
	'acgw', 'in', 'HOMELAYOUT', 'MHMMACHINELIFE', 'F', 0, 1, 0, 6, 'system'
	);
 


Delete company_feature_group_id_link Where company_id='acgw' and country_code='in' and child_feature_id_or_group='MHMACTOPEN' and parent_feature_group='HOMELAYOUT'

	INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
	VALUES
	(
	'acgw', 'in', 'HOMELAYOUT', 'MHMACTOPEN', 'F', 0, 1, 0, 9, 'system'
	);
 

Delete company_feature_group_id_link Where company_id='acgw' and country_code='in' and child_feature_id_or_group='MHMACTCLOSED' and parent_feature_group='HOMELAYOUT'

	INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
	VALUES
	(
	'acgw', 'in', 'HOMELAYOUT', 'MHMACTCLOSED', 'F', 0, 1, 0, 10, 'system'
	);


Delete company_feature_group_id_link Where parent_feature_group ='HOMELAYOUT' and child_feature_id_or_group='MHMMYSERVCALL' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'HOMELAYOUT', 'MHMMYSERVCALL', 'F', 0, 1, 0, 11, 'system'
);

Delete company_feature_group_id_link Where parent_feature_group ='HOMELAYOUT' and child_feature_id_or_group='MHMMYVISITCALL' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'HOMELAYOUT', 'MHMMYVISITCALL', 'F', 0, 1, 0, 12, 'system'
);



delete from company_feature_group_id_link where child_feature_id_or_group like 'CPORT%' and company_id = 'acgw' and country_code = 'in'


/* INSERT QUERY NO: 1 */
INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTACTCLOSED', 'CPORTACTCLOSED', 'F', 0, 0, 0, 7, 'system'
);

/* INSERT QUERY NO: 2 */
INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTACTLOGGING', 'CPORTACTLOGGING', 'F', 0, 0, 0, 5, 'system'
);

/* INSERT QUERY NO: 3 */
INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTACTOPEN', 'CPORTACTOPEN', 'F', 0, 0, 0, 6, 'system'
);

/* INSERT QUERY NO: 4 */
INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTDASH', 'CPORTDASH', 'F', 0, 0, 0, 2, 'system'
);

/* INSERT QUERY NO: 5 */
INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTMYMACHINES', 'CPORTMYMACHINES', 'F', 0, 0, 0, 3, 'system'
);


/* INSERT QUERY NO: 6 */
insert into company_feature_group_id_link(company_id,country_code,parent_feature_group,child_feature_id_or_group,child_feature_id_or_group_ind,parent_level_no,parent_display_order,child_level_no,child_display_order,last_update_id)
values('acgw','in','CPORTNB','CPORTNB','F','0','0','0','8','system')


/* INSERT QUERY NO: 7 */
INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTPRODINFO', 'CPORTPRODINFO', 'F', 0, 0, 0, 1, 'system'
);

/* INSERT QUERY NO: 8 */
INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'CPORTTIMELINE', 'CPORTTIMELINE', 'F', 0, 0, 0, 4, 'system'
);



delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MCALLDETAILS' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MCALLDETAILS', 'F', 0, 1, 0, 1, 'system'
);


delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MUSERATTACHMENT' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MUSERATTACHMENT', 'F', 0, 1, 0, 1, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MTRIPSTART' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MTRIPSTART', 'F', 0, 1, 0, 1, 'system'
);


delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MTRIPFINISH' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MTRIPFINISH', 'F', 0, 1, 0, 1, 'system'
);


delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MCALSTART' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MCALSTART', 'F', 0, 1, 0, 1, 'system'
);


delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MCALFINISH' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MCALFINISH', 'F', 0, 1, 0, 1, 'system'
);


delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MCALCOMPLETE' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MCALCOMPLETE', 'F', 0, 1, 0, 1, 'system'
);


delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MGENASR' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MGENASR', 'F', 0, 1, 0, 1, 'system'
);


delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MGENFMOM' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MGENFMOM', 'F', 0, 1, 0, 1, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MGENFOC' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MGENFOC', 'F', 0, 1, 0, 1, 'system'
);


delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MCALHOLD' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MCALHOLD', 'F', 0, 1, 0, 1, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MCALRELEASEHOLD' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MCALRELEASEHOLD', 'F', 0, 1, 0, 1, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MCALPROGUPD' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MCALPROGUPD', 'F', 0, 1, 0, 1, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='HOMELAYOUT' and child_feature_id_or_group='MGENAD' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'HOMELAYOUT', 'MGENAD', 'F', 0, 1, 0, 13, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MCALASSIGN' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MCALASSIGN', 'F', 0, 1, 0, 1, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MCALREASSIGN' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MCALREASSIGN', 'F', 0, 1, 0, 1, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MCALREPLAN' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MCALREPLAN', 'F', 0, 1, 0, 1, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MMEETSTART' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MMEETSTART', 'F', 0, 1, 0, 1, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MMEETFINISH' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MMEETFINISH', 'F', 0, 1, 0, 1, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='CALCLOSE' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'CALCLOSE', 'F', 0, 1, 0, 1, 'system'
);

delete from company_feature_group_id_link where parent_feature_group ='WORKFLOW' and child_feature_id_or_group='MCALCLOSE' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acgw', 'in', 'WORKFLOW', 'MCALCLOSE', 'F', 0, 1, 0, 1, 'system'
);



delete from company_feature_group_id_link where parent_feature_group ='HOMELAYOUT' and child_feature_id_or_group='MTIMECARD' and company_id = 'acgw' and country_code = 'in'

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
('acgw', 'in', 'HOMELAYOUT', 'MTIMECARD', 'F', 0, 1, 0, 14, 'system');


delete from company_feature_group_id_link where company_id='acgw' and country_code='in' and child_feature_id_or_group='MHMMYSERVREF' and parent_feature_group='ACTIONS'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acgw', N'in', N'ACTIONS', N'MHMMYSERVREF', N'F', 0, 1, 0, 2, N'system')


delete from company_feature_group_id_link where company_id='acgw' and country_code='in' and child_feature_id_or_group='MHMMYSERVFIL' and parent_feature_group='ACTIONS'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acgw', N'in', N'ACTIONS', N'MHMMYSERVFIL', N'F', 0, 1, 0, 1, N'system')




IF NOT EXISTS (select 1 from company_feature_group_id_link where company_id='acgw' and country_code='in' and child_feature_id_or_group='MUSERATTACH' and parent_feature_group='WORKFLOW')
	BEGIN
		Insert into company_feature_group_id_link(company_id,country_code,parent_feature_group,child_feature_id_or_group,child_feature_id_or_group_ind,parent_level_no,parent_display_order,child_level_no,child_display_order,last_update_id)
		values('acgw','in','WORKFLOW','MUSERATTACH','F','0','1','0','1','system')
	END


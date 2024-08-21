declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'acopco'

select @p_country_code = 'in'

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMPRODINFO' and parent_feature_group='HOMELAYOUT'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'HOMELAYOUT', N'MHMPRODINFO', N'F', 0, 1, 0, 1, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMMYASSET' and parent_feature_group='HOMELAYOUT'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'HOMELAYOUT', N'MHMMYASSET', N'F', 0, 1, 0, 2, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMMACHINELIFE' and parent_feature_group='HOMELAYOUT'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'HOMELAYOUT', N'MHMMACHINELIFE', N'F', 0, 1, 0, 3, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMHOME' and parent_feature_group='HOMELAYOUT'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'HOMELAYOUT', N'MHMHOME', N'F', 0, 1, 0, 4, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMACTOPEN' and parent_feature_group='HOMELAYOUT'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'HOMELAYOUT', N'MHMACTOPEN', N'F', 0, 1, 0, 5, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMACTCLOSED' and parent_feature_group='HOMELAYOUT'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'HOMELAYOUT', N'MHMACTCLOSED', N'F', 0, 1, 0, 6, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMMYSERVCALL' and parent_feature_group='HOMELAYOUT'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'HOMELAYOUT', N'MHMMYSERVCALL', N'F', 0, 1, 0, 7, N'system')



delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMMYSERVFIL' and parent_feature_group='ACTIONS'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'ACTIONS', N'MHMMYSERVFIL', N'F', 0, 1, 0, 1, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMMYSERVREF' and parent_feature_group='ACTIONS'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'ACTIONS', N'MHMMYSERVREF', N'F', 0, 1, 0, 2, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MCALASSIGN' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MCALASSIGN', N'F', 0, 1, 0, 1, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MCALCLOSE' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MCALCLOSE', N'F', 0, 1, 0, 1, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MCALCOMPLETE' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MCALCOMPLETE', N'F', 0, 1, 0, 1, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MCALFINISH' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MCALFINISH', N'F', 0, 1, 0, 1, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MCALLDETAILS' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MCALLDETAILS', N'F', 0, 1, 0, 1, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MCALSTART' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MCALSTART', N'F', 0, 1, 0, 1, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MCALREASSIGN' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MCALREASSIGN', N'F', 0, 1, 0, 1, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MCALRELEASEHOLD' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MCALRELEASEHOLD', N'F', 0, 1, 0, 1, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MTRIPFINISH' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MTRIPFINISH', N'F', 0, 1, 0, 1, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MTRIPSTART' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MTRIPSTART', N'F', 0, 1, 0, 1, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MUSERATTACHMENT' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MUSERATTACHMENT', N'F', 0, 1, 0, 1, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='FSRacopco' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'FSRacopco', N'F', 0, 1, 0, 1, N'system')

delete from company_feature_group_id_link where company_id = @p_company_id and country_code = @p_country_code and parent_feature_group = 'SETUPMTNCE' and child_feature_id_or_group = 'MNGCUSCON'

INSERT company_feature_group_id_link (company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind,	parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id) select @p_company_id, @p_country_code, 'SETUPMTNCE', 'MNGCUSCON', 'F',	'0', '1', '1', '25', 'system'


delete from company_feature_group_id_link where child_feature_id_or_group like 'CPORT%' and company_id = 'acopco' and country_code = 'in'

/* INSERT QUERY NO: 1 */

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acopco', 'in', 'CPORTPRODINFO', 'CPORTPRODINFO', 'F', 0, 0, 0, 1, 'system'
);

/* INSERT QUERY NO: 2 */

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acopco', 'in', 'CPORTDASH', 'CPORTDASH', 'F', 0, 0, 0, 2, 'system'
);

/* INSERT QUERY NO: 3 */

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acopco', 'in', 'CPORTMYMACHINES', 'CPORTMYMACHINES', 'F', 0, 0, 0, 3, 'system'
);

/* INSERT QUERY NO: 4 */

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acopco', 'in', 'CPORTTIMELINE', 'CPORTTIMELINE', 'F', 0, 0, 0, 4, 'system'
);


/* INSERT QUERY NO: 5 */

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acopco', 'in', 'CPORTACTLOGGING', 'CPORTACTLOGGING', 'F', 0, 0, 0, 5, 'system'
);


/* INSERT QUERY NO: 6 */


INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acopco', 'in', 'CPORTACTOPEN', 'CPORTACTOPEN', 'F', 0, 0, 0, 6, 'system'
);

/* INSERT QUERY NO: 7 */

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acopco', 'in', 'CPORTACTCLOSED', 'CPORTACTCLOSED', 'F', 0, 0, 0, 7, 'system'
);


/* INSERT QUERY NO: 8 */

INSERT INTO company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group, child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
VALUES
(
'acopco', 'in', 'CPORTNB', 'CPORTNB', 'F', 0, 0, 0, 8, 'system'
);


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='CALCLOSE1' and parent_feature_group='WORKFLOW'

insert into company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group,
child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
select 'acopco','in','WORKFLOW','CALCLOSE1','F','0','0','0','1','system'
 
 
 delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='CALCOMPLETE' and parent_feature_group='WORKFLOW'
 
 
insert into company_feature_group_id_link(company_id, country_code, parent_feature_group, child_feature_id_or_group,
child_feature_id_or_group_ind, parent_level_no, parent_display_order, child_level_no, child_display_order, last_update_id)
select 'acopco','in','WORKFLOW','CALCOMPLETE','F','0','0','0','1','system'


IF NOT EXISTS (select 1 from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MUSERATTACH' and parent_feature_group='WORKFLOW')
	BEGIN
		Insert into company_feature_group_id_link(company_id,country_code,parent_feature_group,child_feature_id_or_group,child_feature_id_or_group_ind,parent_level_no,parent_display_order,child_level_no,child_display_order,last_update_id)
		values('acopco','in','WORKFLOW','MUSERATTACH','F','0','1','0','1','system')
	END
	
IF NOT EXISTS (select 1 from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMPUNCHINOUT' and parent_feature_group='ACTIONBAR')
	BEGIN
		Insert into company_feature_group_id_link(company_id,country_code,parent_feature_group,child_feature_id_or_group,child_feature_id_or_group_ind,parent_level_no,parent_display_order,child_level_no,child_display_order,last_update_id)
		values('acopco','in','ACTIONBAR','MHMPUNCHINOUT','F','0','1','0','1','system')
	END
	
IF NOT EXISTS (select 1 from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MTIMECARD' and parent_feature_group='HOMELAYOUT')
	BEGIN
		Insert into company_feature_group_id_link(company_id,country_code,parent_feature_group,child_feature_id_or_group,child_feature_id_or_group_ind,parent_level_no,parent_display_order,child_level_no,child_display_order,last_update_id)
		values('acopco','in','HOMELAYOUT','MTIMECARD','F','0','1','0','10','system')
	END
	
delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMMYVISITCALL' and parent_feature_group='HOMELAYOUT'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'HOMELAYOUT', N'MHMMYVISITCALL', N'F', 0, 1, 0, 8, N'system')



delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMMYVISITFIL' and parent_feature_group='ACTIONS'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'ACTIONS', N'MHMMYVISITFIL', N'F', 0, 1, 0, 3, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMMYVISITREF' and parent_feature_group='ACTIONS'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'ACTIONS', N'MHMMYVISITREF', N'F', 0, 1, 0, 4, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMMYINSPCALL' and parent_feature_group='HOMELAYOUT'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'HOMELAYOUT', N'MHMMYINSPCALL', N'F', 0, 1, 0, 9, N'system')



delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMMYINSPFIL' and parent_feature_group='ACTIONS'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'ACTIONS', N'MHMMYINSPFIL', N'F', 0, 1, 0, 5, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MHMMYINSPREF' and parent_feature_group='ACTIONS'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'ACTIONS', N'MHMMYINSPREF', N'F', 0, 1, 0, 6, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MGENMRPL' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MGENMRPL', N'F', 0, 1, 0, 1, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MGENSFF' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MGENSFF', N'F', 0, 1, 0, 1, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MGENCOMM' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MGENCOMM', N'F', 0, 1, 0, 1, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MGENIS' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MGENIS', N'F', 0, 1, 0, 1, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MGENLT' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MGENLT', N'F', 0, 1, 0, 1, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MGENSRV' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MGENSRV', N'F', 0, 1, 0, 1, N'system')


delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MMEETFINISH' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MMEETFINISH', N'F', 0, 1, 0, 1, N'system')

delete from company_feature_group_id_link where company_id='acopco' and country_code='in' and child_feature_id_or_group='MMEETSTART' and parent_feature_group='WORKFLOW'

INSERT [dbo].[company_feature_group_id_link] ([company_id], [country_code], [parent_feature_group], [child_feature_id_or_group], [child_feature_id_or_group_ind], [parent_level_no], [parent_display_order], [child_level_no], [child_display_order], [last_update_id]) VALUES (N'acopco', N'in', N'WORKFLOW', N'MMEETSTART', N'F', 0, 1, 0, 1, N'system')
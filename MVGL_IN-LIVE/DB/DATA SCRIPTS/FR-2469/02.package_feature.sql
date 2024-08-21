declare @p_company_id varchar(20), @p_country_code varchar(5), @p_package_id varchar(15)

select @p_company_id = 'mvgl'

select @p_country_code = 'in'


select @p_package_id = package_id from company_subscription where company_id = @p_company_id and country_code = @p_country_code

delete from package_feature where feature_id='MNGCUSCON'and package_id=@p_package_id

INSERT package_feature (package_id, module_id, feature_id, last_update_id) select @p_package_id, 'DOUBLEO', 'MNGCUSCON', 'system'


delete from package_feature where feature_id='MHMPRODINFO'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMPRODINFO', N'system')

delete from package_feature where feature_id='MHMMYASSET'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMMYASSET', N'system')

delete from package_feature where feature_id='MHMMACHINELIFE'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMMACHINELIFE', N'system')


delete from package_feature where feature_id='MHMHOME'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMHOME', N'system')

delete from package_feature where feature_id='MHMACTOPEN'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMACTOPEN', N'system')

delete from package_feature where feature_id='MHMACTCLOSED'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMACTCLOSED', N'system')


delete from package_feature where feature_id='MHMMYSERVCALL'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMMYSERVCALL', N'system')

delete from package_feature where feature_id='MHMMYSERVFIL'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMMYSERVFIL', N'system')

delete from package_feature where feature_id='MHMMYSERVREF'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMMYSERVREF', N'system')


delete from package_feature where feature_id='MHMMYVISITCALL'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMMYVISITCALL', N'system')

delete from package_feature where feature_id='MHMMYVISITFIL'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMMYVISITFIL', N'system')

delete from package_feature where feature_id='MHMMYVISITREF'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMMYVISITREF', N'system')

delete from package_feature where feature_id='MCALLDETAILS'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'CALLMGMT', N'MCALLDETAILS', N'system')

delete from package_feature where feature_id='MUSERATTACHMENT'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'CALLMGMT', N'MUSERATTACHMENT', N'system')

delete from package_feature where feature_id='MCALCOMPLETE'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MCALCOMPLETE', N'system')

delete from package_feature where feature_id='MTRIPSTART'and package_id=@p_package_id and module_id='CALLMGMT'

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'CALLMGMT', N'MTRIPSTART', N'system')

delete from package_feature where feature_id='MTRIPFINISH'and package_id=@p_package_id and module_id='CALLMGMT'

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'CALLMGMT', N'MTRIPFINISH', N'system')


delete from package_feature where feature_id='MTRIPSTART'and package_id=@p_package_id and module_id='DOUBLEO'

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MTRIPSTART', N'system')

delete from package_feature where feature_id='MTRIPFINISH'and package_id=@p_package_id and module_id='DOUBLEO'

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MTRIPFINISH', N'system')

delete from package_feature where feature_id='MCALASSIGN'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MCALASSIGN', N'system')

delete from package_feature where feature_id='MCALSTART'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MCALSTART', N'system')

delete from package_feature where feature_id='MCALFINISH'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MCALFINISH', N'system')


delete from package_feature where feature_id='MNGCUSCON'and package_id=@p_package_id

INSERT package_feature (package_id, module_id, feature_id, last_update_id) select @p_package_id, 'DOUBLEO', 'MNGCUSCON', 'system'

delete from package_feature where package_id = @p_package_id and module_id = 'DOUBLEO' and feature_id like 'CPORT%'

/* INSERT QUERY NO: 1 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
@p_package_id, 'DOUBLEO', 'CPORTACTCLOSED', 'system'
);

/* INSERT QUERY NO: 2 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
@p_package_id, 'DOUBLEO', 'CPORTACTLOGGING', 'system'
);

/* INSERT QUERY NO: 3 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
@p_package_id, 'DOUBLEO', 'CPORTACTOPEN', 'system'
);

/* INSERT QUERY NO: 6 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
@p_package_id, 'DOUBLEO', 'CPORTNB', 'system'
);


/* INSERT QUERY NO: 4 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
@p_package_id, 'DOUBLEO', 'CPORTDASH', 'system'
);

/* INSERT QUERY NO: 5 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
@p_package_id, 'DOUBLEO', 'CPORTMYMACHINES', 'system'
);

/* INSERT QUERY NO: 7 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
@p_package_id, 'DOUBLEO', 'CPORTPRODINFO', 'system'
);

/* INSERT QUERY NO: 8 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
@p_package_id, 'DOUBLEO', 'CPORTTIMELINE', 'system'
);

delete from package_feature where feature_id='CALCLOSE1'and package_id=@p_package_id

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'CALCLOSE1', N'system')

IF NOT EXISTS (select 1 from package_feature where feature_id='MUSERATTACH')
	BEGIN
		INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
		VALUES
		(
			@p_package_id, 'DOUBLEO', 'MUSERATTACH', 'system'
		);
	END
	
delete from package_feature where feature_id='MHMPUNCHINOUT'and package_id=@p_package_id and module_id='DOUBLEO'

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'DOUBLEO', N'MHMPUNCHINOUT', N'system')

delete from package_feature where feature_id='MCALCLOSE'and package_id=@p_package_id and module_id='CALLMGMT'

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (@p_package_id, N'CALLMGMT', N'MCALCLOSE', N'system')



IF NOT EXISTS (select 1 from package_feature where feature_id='MCALHOLD')
	BEGIN
		INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
		VALUES
		(
			@p_package_id, 'DOUBLEO', 'MCALHOLD', 'system'
		);
	END

IF NOT EXISTS (select 1 from package_feature where feature_id='MCALRELEASEHOLD')
	BEGIN
		INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
		VALUES
		(
			@p_package_id, 'DOUBLEO', 'MCALRELEASEHOLD', 'system'
		);
	END
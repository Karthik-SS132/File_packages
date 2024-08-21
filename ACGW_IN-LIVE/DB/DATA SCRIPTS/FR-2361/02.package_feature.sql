Delete package_feature Where feature_id='MHMPRODINFO' and package_id='FCMPROFESSIONAL'


INSERT INTO package_feature (package_id, module_id,feature_id,last_update_id) 
VALUES ('FCMPROFESSIONAL', 'DOUBLEO', 'MHMPRODINFO', 'system')



Delete package_feature Where feature_id='MHMHOME'and package_id='FCMPROFESSIONAL'

	INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
	VALUES
	(
	'FCMPROFESSIONAL', 'DOUBLEO', 'MHMHOME', 'system'
	);


Delete package_feature Where feature_id='MHMMYASSET'and package_id='FCMPROFESSIONAL'

	INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
	VALUES
	(
		'FCMPROFESSIONAL', 'DOUBLEO', 'MHMMYASSET', 'system'
	);


Delete package_feature Where feature_id='MHMMACHINELIFE'and package_id='FCMPROFESSIONAL'

	INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
	VALUES
	(
		'FCMPROFESSIONAL', 'DOUBLEO', 'MHMMACHINELIFE', 'system'
	);


Delete package_feature Where feature_id='MHMACTOPEN'and package_id='FCMPROFESSIONAL'

	INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
	VALUES
	(
	'FCMPROFESSIONAL', 'DOUBLEO', 'MHMACTOPEN', 'system'
	);
 

Delete package_feature Where feature_id='MHMACTCLOSED'and package_id='FCMPROFESSIONAL'

	INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
	VALUES
	(
	'FCMPROFESSIONAL', 'DOUBLEO', 'MHMACTCLOSED', 'system'
	);


  Delete package_feature Where feature_id='MHMMYSERVCALL' and package_id ='FCMPROFESSIONAL'
	INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
	VALUES
	(
	'FCMPROFESSIONAL', 'DOUBLEO', 'MHMMYSERVCALL', 'system'
	);

    Delete package_feature Where feature_id='MHMMYVISITCALL' and package_id ='FCMPROFESSIONAL'
	
	INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
	VALUES
	(
	'FCMPROFESSIONAL', 'DOUBLEO', 'MHMMYVISITCALL', 'system'
	);
 
    Delete package_feature Where feature_id='MNGCUSCON' and package_id ='FCMPROFESSIONAL'
	
	INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
	VALUES
	(
	'FCMPROFESSIONAL', 'DOUBLEO', 'MNGCUSCON', 'system'
	);
	
	
	Delete package_feature Where feature_id='MTIMECARD'and package_id='FCMPROFESSIONAL'

	INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
	VALUES
	(
	'FCMPROFESSIONAL', 'DOUBLEO', 'MTIMECARD', 'system'
	);
	
	/* query call against insert  */
	
	Delete package_feature Where feature_id='CALCLOSE' and package_id='FCMPROFESSIONAL' and module_id ='DOUBLEO'

	INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
	VALUES
	(
	'FCMPROFESSIONAL', 'DOUBLEO', 'CALCLOSE', 'system'
	);
	
	
	Delete package_feature Where feature_id='MCALCLOSE' and package_id='FCMPROFESSIONAL' and module_id ='DOUBLEO'

	INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
	VALUES
	(
	'FCMPROFESSIONAL', 'DOUBLEO', 'MCALCLOSE', 'system'
	);
	
	
	
delete from package_feature where package_id = 'FCMPROFESSIONAL' and module_id = 'DOUBLEO' and feature_id like 'CPORT%'

/* INSERT QUERY NO: 1 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
'FCMPROFESSIONAL', 'DOUBLEO', 'CPORTACTCLOSED', 'system'
);

/* INSERT QUERY NO: 2 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
'FCMPROFESSIONAL', 'DOUBLEO', 'CPORTACTLOGGING', 'system'
);

/* INSERT QUERY NO: 3 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
'FCMPROFESSIONAL', 'DOUBLEO', 'CPORTACTOPEN', 'system'
);

delete from package_feature where package_id = 'FCMPROFESSIONAL' and module_id = 'DOUBLEO' and feature_id = 'CUSTQUERYMGMT'

insert package_feature (package_id, module_id, feature_id, last_update_id) select 'FCMPROFESSIONAL', 'DOUBLEO', 'CUSTQUERYMGMT', 'system'

/* INSERT QUERY NO: 4 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
'FCMPROFESSIONAL', 'DOUBLEO', 'CPORTDASH', 'system'
);

/* INSERT QUERY NO: 5 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
'FCMPROFESSIONAL', 'DOUBLEO', 'CPORTMYMACHINES', 'system'
);

/* INSERT QUERY NO: 6 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
'FCMPROFESSIONAL', 'DOUBLEO', 'CPORTNB', 'system'
);

/* INSERT QUERY NO: 7 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
'FCMPROFESSIONAL', 'DOUBLEO', 'CPORTPRODINFO', 'system'
);

/* INSERT QUERY NO: 8 */
INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
VALUES
(
'FCMPROFESSIONAL', 'DOUBLEO', 'CPORTTIMELINE', 'system'
);

delete from package_feature where feature_id='MHMMYSERVREF'and package_id= 'FCMPROFESSIONAL' and module_id = 'DOUBLEO'

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES (N'FCMPROFESSIONAL', N'DOUBLEO', N'MHMMYSERVREF', N'system')


delete from package_feature where feature_id='MHMMYSERVFIL'and package_id= 'FCMPROFESSIONAL' and module_id = 'DOUBLEO'

INSERT [dbo].[package_feature] ([package_id], [module_id], [feature_id], [last_update_id]) VALUES ('FCMPROFESSIONAL', N'DOUBLEO', N'MHMMYSERVFIL', N'system')




IF NOT EXISTS (select 1 from package_feature where feature_id='MUSERATTACH')
	BEGIN
		INSERT INTO package_feature(package_id, module_id, feature_id, last_update_id)
		VALUES
		(
			'FCMPROFESSIONAL', 'DOUBLEO', 'MUSERATTACH', 'system'
		);
	END

Delete package_feature where feature_id in('MTRIPSTART','MTRIPFINISH','MCALSTART','MCALFINISH','MCALCOMPLETE','MCALLDETAILS','MUSERATTACHMENT','MGENASR','MGENFMOM','MGENFOC','MCALHOLD','MCALRELEASEHOLD','MCALPROGUPD','MGENAD','MCALASSIGN','MCALREASSIGN','MCALREPLAN','MMEETSTART','MMEETFINISH') and package_id ='FCMPROFESSIONAL' and module_id ='DOUBLEO'

INSERT INTO package_feature (package_id, module_id,feature_id,last_update_id) 
VALUES ('FCMPROFESSIONAL', 'DOUBLEO', 'MTRIPSTART', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MTRIPFINISH', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MCALSTART', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MCALFINISH', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MCALCOMPLETE', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MCALLDETAILS', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MUSERATTACHMENT', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MGENASR', 'system'),	
('FCMPROFESSIONAL', 'DOUBLEO', 'MGENFMOM', 'system'),	
('FCMPROFESSIONAL', 'DOUBLEO', 'MGENFOC', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MCALHOLD', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MCALRELEASEHOLD', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MCALPROGUPD', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MGENAD', 'system'),	
('FCMPROFESSIONAL', 'DOUBLEO', 'MCALASSIGN', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MCALREASSIGN', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MCALREPLAN', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MMEETSTART', 'system'),
('FCMPROFESSIONAL', 'DOUBLEO', 'MMEETFINISH', 'system')
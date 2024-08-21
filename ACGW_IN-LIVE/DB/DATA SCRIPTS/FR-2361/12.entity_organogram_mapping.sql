Delete from entity_organogram_mapping Where company_id = 'acgw' and country_code = 'in' and entity_type='C' AND organogram_level_code='acgw'
	
	/* INSERT QUERY NO: 1 */
	INSERT INTO entity_organogram_mapping(company_id, country_code, entity_type, organogram_level_no, organogram_level_code, last_update_id)
	VALUES('acgw', 'in', 'C', 1, 'acgw', 'system');
	
	
Delete from entity_organogram_mapping where company_id = 'acgw' and country_code = 'in' and entity_type='O' AND organogram_level_code='Division'

	/* INSERT QUERY NO: 2 */
	INSERT INTO entity_organogram_mapping(company_id, country_code, entity_type, organogram_level_no, organogram_level_code, last_update_id)
	VALUES('acgw', 'in', 'O', 2, 'Division', 'system');
	
	
Delete from entity_organogram_mapping where company_id = 'acgw' and country_code = 'in' and entity_type='D' AND organogram_level_code IN ('PAM T','APT',
'PAM K')

INSERT INTO entity_organogram_mapping(company_id, country_code, entity_type, organogram_level_no, organogram_level_code, last_update_id)
VALUES('acgw', 'in', 'D', 3, 'PAM T', 'system'),
       ('acgw', 'in', 'D', 3, 'APT', 'system'),
      ('acgw', 'in', 'D', 3, 'PAM K', 'system')

Delete from entity_organogram_mapping Where company_id = 'acgw' and country_code = 'in' and entity_type='D' AND organogram_level_code IN ('ABHAYRANA','ADVANENGG','AKIAH-KA','DEEP-ENG','DJSINFRATCH','EISEN-TN','EQSOL','EQSOL-AP','GJEARTHEQP','HARSHEEL','KRISHNA','LAKSYA-PB','LANXIN','MSINFRA-MH','NASTECH','NAVADHAR-MP','NEEL-GJ','NIRMALA','NOBLE','PALOD','PALOD-GJ','ROSA','SHIVAKAMAM-TN','SHIVAM-BR','SHREE-GJ','SSRAJASTHAN','STERBD','STERIM','SWIFTCONS','UNIQUS-MP','VINAYEQUIP')
	
	/* INSERT QUERY NO: 2 */
	INSERT INTO entity_organogram_mapping(company_id, country_code, entity_type, organogram_level_no, organogram_level_code, last_update_id)
	VALUES('acgw', 'in', 'D', 3, 'ABHAYRANA', 'system'),
			('acgw', 'in', 'D', 3, 'ADVANENGG', 'system'),
			('acgw', 'in', 'D', 3, 'AKIAH-KA', 'system'),
			('acgw', 'in', 'D', 3, 'DEEP-ENG', 'system'),
			('acgw', 'in', 'D', 3, 'DJSINFRATCH', 'system'),
			('acgw', 'in', 'D', 3, 'EISEN-TN', 'system'),
			('acgw', 'in', 'D', 3, 'EQSOL', 'system'),
			('acgw', 'in', 'D', 3, 'EQSOL-AP', 'system'),
			('acgw', 'in', 'D', 3, 'GJEARTHEQP', 'system'),
			('acgw', 'in', 'D', 3, 'HARSHEEL', 'system'),
			('acgw', 'in', 'D', 3, 'KRISHNA', 'system'),
			('acgw', 'in', 'D', 3, 'LAKSYA-PB', 'system'),
			('acgw', 'in', 'D', 3, 'LANXIN', 'system'),
			('acgw', 'in', 'D', 3, 'MSINFRA-MH', 'system'),
			('acgw', 'in', 'D', 3, 'NASTECH', 'system'),
			('acgw', 'in', 'D', 3, 'NAVADHAR-MP', 'system'),
			('acgw', 'in', 'D', 3, 'NEEL-GJ', 'system'),
			('acgw', 'in', 'D', 3, 'NIRMALA', 'system'),
			('acgw', 'in', 'D', 3, 'NOBLE', 'system'),
			('acgw', 'in', 'D', 3, 'PALOD', 'system'),
			('acgw', 'in', 'D', 3, 'PALOD-GJ', 'system'),
			('acgw', 'in', 'D', 3, 'ROSA', 'system'),
			('acgw', 'in', 'D', 3, 'SHIVAKAMAM-TN', 'system'),
			('acgw', 'in', 'D', 3, 'SHIVAM-BR', 'system'),
			('acgw', 'in', 'D', 3, 'SHREE-GJ', 'system'),
			('acgw', 'in', 'D', 3, 'SSRAJASTHAN', 'system'),
			('acgw', 'in', 'D', 3, 'STERBD', 'system'),
			('acgw', 'in', 'D', 3, 'STERIM', 'system'),
			('acgw', 'in', 'D', 3, 'SWIFTCONS', 'system'),
			('acgw', 'in', 'D', 3, 'UNIQUS-MP', 'system'),
			('acgw', 'in', 'D', 3, 'VINAYEQUIP', 'system')
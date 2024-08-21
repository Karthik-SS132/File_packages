
IF NOT EXISTS (select 1 from entity_organogram_mapping where company_id = 'acopco' and country_code = 'in' and entity_type='C' AND organogram_level_code='atlascopco')
BEGIN
	
	/* INSERT QUERY NO: 1 */
	INSERT INTO entity_organogram_mapping(company_id, country_code, entity_type, organogram_level_no, organogram_level_code, last_update_id)
	VALUES
	(
	'acopco', 'in', 'C', 1, 'atlascopco', 'system'
	);

END


IF NOT EXISTS (select 1 from entity_organogram_mapping where company_id = 'acopco' and country_code = 'in' and entity_type='O' AND organogram_level_code='CRS')
BEGIN
	
	/* INSERT QUERY NO: 2 */
	INSERT INTO entity_organogram_mapping(company_id, country_code, entity_type, organogram_level_no, organogram_level_code, last_update_id)
	VALUES
	(
	'acopco', 'in', 'O', 3, 'CRS', 'system'
	);

END

IF NOT EXISTS (select 1 from entity_organogram_mapping where company_id = 'acopco' and country_code = 'in' and entity_type='D' AND organogram_level_code='ABHI-HR')
BEGIN
	
	/* INSERT QUERY NO: 3 */
	INSERT INTO entity_organogram_mapping(company_id, country_code, entity_type, organogram_level_no, organogram_level_code, last_update_id)
	VALUES
	(
	'acopco', 'in', 'D', 4, 'ABHI-HR', 'system'
	);

END


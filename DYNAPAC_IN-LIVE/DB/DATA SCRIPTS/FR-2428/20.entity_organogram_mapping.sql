delete from entity_organogram_mapping where company_id = 'dynapac' and country_code = 'in'


INSERT INTO entity_organogram_mapping(organogram_level_code,company_id, country_code, entity_type, organogram_level_no, last_update_id)
select distinct level1_code,'dynapac','in','C',1,'system'
from level1_code where company_id = 'dynapac' and country_code = 'in'


INSERT INTO entity_organogram_mapping(organogram_level_code,company_id, country_code, entity_type, organogram_level_no, last_update_id)
select distinct level2_code,'dynapac','in','O',2,'system'
from level2_code where company_id = 'dynapac' and country_code = 'in'	

INSERT INTO entity_organogram_mapping(organogram_level_code,company_id, country_code, entity_type, organogram_level_no, last_update_id)
select distinct level3_code,'dynapac','in','O',3,'system'
from level3_code where company_id = 'dynapac' and country_code = 'in'	


INSERT INTO entity_organogram_mapping(organogram_level_code,company_id, country_code, entity_type, organogram_level_no, last_update_id)
select distinct level4_code,'dynapac','in','D',4,'system'
from level4_code where company_id = 'dynapac' and country_code = 'in'	
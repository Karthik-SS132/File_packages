IF NOT EXISTS (select 1 from company_feature_access_order where company_id='acgw' and country_code='in' and next_feature_id='MUSERATTACH')
	BEGIN
		Insert into company_feature_access_order (company_id,country_code,transaction_type_code,request_category,request_type,request_wf_stage_no,request_wf_status,current_feature_id,next_feature_id,last_update_id)
		values ('acgw','in','CALL','ALL','ALL','0','ALL','ALL','MUSERATTACH','system')	
	END
	
	

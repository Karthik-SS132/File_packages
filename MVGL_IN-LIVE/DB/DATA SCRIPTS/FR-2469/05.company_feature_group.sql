declare @p_company_id varchar(20), @p_country_code varchar(5)

select @p_company_id = 'mvgl'

select @p_country_code = 'in'

if exists (select 1 from company_master where company_id = @p_company_id and ho_country_code = @p_country_code)
begin
	
	if not exists (select 1 from company_feature_group where company_id = @p_company_id and country_code = @p_country_code and feature_group = 'ACTIONS')
	begin
	
		insert company_feature_group (company_id, country_code, feature_group, group_display_label, last_update_id) select @p_company_id, @p_country_code, 'ACTIONS', 'Screen Actions', 'system'

	end

end
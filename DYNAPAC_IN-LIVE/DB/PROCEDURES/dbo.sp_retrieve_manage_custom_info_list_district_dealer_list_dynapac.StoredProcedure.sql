DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_district_dealer_list_dynapac]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_district_dealer_list_dynapac] 
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id], 
    @i_custom_info_code [uddt_varchar_60], 
    @i_inputparam_xml [uddt_nvarchar_max], 
    @o_retrieve_status [uddt_varchar_5] OUTPUT
AS
BEGIN
	
	declare @dealer_state_coverage nvarchar(15),@dealer_district_coverage nvarchar(15)

		select @dealer_district_coverage = e.organogram_level_code
												from employee e 
									                  where e.company_id = @i_client_id
															and e.country_code = @i_country_code
															and e.employee_id  in (select employee_id 
																					from users u
																					where u.company_id = @i_client_id
																					and u.country_code = @i_country_code
																					and u.user_id = @i_user_id)

		if (@dealer_district_coverage in (select dealer_id from dealer_master))
		begin 

		select '' as custom_info_list,
			'{' +
				'"code":"' + dm.district_code + '",' +
				'"description":"' + ISNULL(dm.district_name, '') + '",' +
				'"parent_code":"' + ISNULL(st.state_code, '') + '",' +
				'"parent_id":"' + ISNULL(st.state_code, '') + '"' +
			'}'
		as o_custom_info_json /* unicode string */
		from district_master dm, state st
		where 
		dm.country_code = st.country_code
		and dm.state_code = st.state_code
		and dm.district_code in (select dcm.district_code from dealer_coverage_mapping dcm
		                            where dcm.company_id = @i_client_id
									  and dcm.country_code =  @i_country_code
									  and dcm.dealer_id  in (select e.organogram_level_code from employee e 
									                            where e.company_id = @i_client_id
																  and e.country_code = @i_country_code
																  and e.employee_id  in (select employee_id 
																					from users u
																					where u.company_id = @i_client_id
																					and u.country_code = @i_country_code
																					and u.user_id = @i_user_id)

									                          )
							     )
		end
		else 
		begin

			select '' as custom_info_list,
					'{' +
						'"code":"' + dm.district_code + '",' +
						'"description":"' + ISNULL(dm.district_name, '') + '",' +
						'"parent_code":"' + ISNULL(st.state_code, '') + '",' +
						'"parent_id":"' + ISNULL(st.state_code, '') + '"' +
					'}'
				as o_custom_info_json /* unicode string */
				from district_master dm, state st
				where 
				dm.country_code = st.country_code
				and dm.state_code = st.state_code
		end
			
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

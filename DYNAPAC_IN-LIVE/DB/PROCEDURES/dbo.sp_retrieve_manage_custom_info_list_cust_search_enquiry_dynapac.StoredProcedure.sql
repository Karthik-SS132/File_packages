DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_cust_search_enquiry_dynapac]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_cust_search_enquiry_dynapac] 
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
	
	select '' as custom_info_list,
            '{' +
             '"code":"' + a.customer_id + '",' +
			 '"description":"' + a.customer_name + ','+ isnull(a.address_line_1,'') + ',' +
											isnull((select city_name from city_master   
													where country_code = @i_country_code
													and city_code = a.city_code),'')+ ',' + 
													isnull( (select state from state   
													where country_code = @i_country_code
													and state_code = a.state_code),'') + '-' + 
											        isnull(a.pincode,'')+'",'+
			'"customer_name":"' +isnull(a.customer_name,'') + '",'+
			'"customer_address":"' +isnull(a.address_line_1,'') + '",'+
			'"contact_person":"' +isnull(a.contact_person_1,'') +'",'+
			'"customer_city":"' +isnull(a.city,'') +'",'+
			'"customer_state":"' +isnull(a.state_code,'') +'",'+
			'"customer_pincode":"' +isnull(a.pincode,'') +'",'+
			'"contact_person_mobile_no":"' +isnull(a.contact_person_1_mobile_no,'') +'",'+
			'"customer_fulladdress":"' +isnull(a.address_line_1,'') + ',' + isnull(a.city,'')+ '-' + isnull(a.state_code,'') +'",'+
			'"customer_location":"' + isnull((select top(1) location_code from customer_location cl
										where a.company_id = @i_client_id
											and a.country_code = @i_country_code
											and a.customer_id = cl.customer_id
			),'')
			+'",'+
			'"customer_location_desc":"' + isnull((select top(1) cm.city_name from customer_location cl, city_master cm
													where a.company_id = @i_client_id
														and a.country_code = @i_country_code
														and cl.location_code = cm.city_code
														and a.customer_id = cl.customer_id),
														(select top(1) city from customer_location cl
																where a.company_id = @i_client_id
																	and a.country_code = @i_country_code
																	and a.customer_id = cl.customer_id)
													)
			+'",'+
			'"contact_person_1_email_id":"' +isnull(a.contact_person_1_email_id,'') +'"'+
			  '}' as o_custom_info_json /* unicode string */
				 from customer a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				--and a.customer_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
			
			UNION

			select '' as custom_info_list,
            '{' +
             '"code":"' + 'NEW PROSPECT'+ '",' +
			 '"description":"' + 'NEW PROSPECT'+'",'+
			'"customer_name":"' + '' + '",'+
			'"customer_address":"' + '' + '",'+
			'"contact_person":"' +'' +'",'+
			'"customer_city":"' + '' +'",'+
			'"customer_state":"' + '' +'",'+
			'"customer_pincode":"' + '' +'",'+
			'"contact_person_mobile_no":"' + '' +'",'+
			'"customer_fulladdress":"' + '' +'",'+
			'"customer_location":"' + '' +'",'+
			'"customer_location_desc":"' + '' +'",'+
			'"contact_person_1_email_id":"' + '' +'"'+
			  '}' as o_custom_info_json /* unicode string */
		
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

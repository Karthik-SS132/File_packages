declare  @p_asset_id [uddt_asset_id], @p_equipment_id [uddt_nvarchar_30], @p_customer_id [uddt_customer_id], @p_asset_location_code [uddt_nvarchar_50], 
@p_locator_layout [uddt_nvarchar_30], @p_installation_date [uddt_date], @p_asset_status [uddt_varchar_2], @p_org_level_no [uddt_tinyint], 
@p_org_level_code [uddt_nvarchar_30], @p_rec_tstamp [uddt_uid_timestamp], @p_inputparam_udf_xml [uddt_nvarchar_max], 
@p_save_mode [uddt_varchar_1], @p_oem_date [uddt_date],@p_cust_date [uddt_date],@p_oem_no [uddt_nvarchar_30],@p_cust_no [uddt_nvarchar_30],
@p_state [uddt_nvarchar_30],@p_district [uddt_nvarchar_30],@p_txn_detail1_udf_xml [uddt_nvarchar_max],@p_customer_location_code nvarchar(30),
@p_udf_xml [uddt_nvarchar_max]

DECLARE asset_master_data CURSOR FOR
select asset_id,equipment_id,customer_id,asset_location_code,installation_date,
servicing_org_level_no,servicing_org_level_code,oem_invoice_date,oem_invoice_no,customer_invoice_no,customer_invoice_date,
asset_location_state_code,asset_location_district_code,customer_location_code
from asset 

OPEN asset_master_data
				
FETCH NEXT FROM asset_master_data INTO @p_asset_id,@p_equipment_id,@p_customer_id,@p_asset_location_code,@p_installation_date,
@p_org_level_no,@p_org_level_code,@p_oem_date,@p_oem_no,@p_cust_no,
@p_cust_date,@p_state,@p_district,@p_customer_location_code

		WHILE @@FETCH_STATUS = 0
		BEGIN
			
				DECLARE	@return_value int,
					@o_update_status uddt_varchar_5,
					@errorNo errorno,
					@data [sp_save_manage_asset_master_inputparam_detail1], 
					@data1 [sp_save_manage_asset_master_inputparam_detail2], 
					@data2 [sp_save_manage_asset_master_inputparam_detail3], 
					@data3 [sp_save_manage_asset_master_inputparam_detail4], 
					@data4 [sp_save_manage_asset_master_inputparam_detail5]

			select @p_txn_detail1_udf_xml = '<asset_category>MACH</asset_category><asset_type>MACH</asset_type><customer_location>'+@p_customer_location_code+
			'</customer_location><company_location>SOUTH</company_location><installation_job_ref_no/>
			<installation_by_org_level_no>3</installation_by_org_level_no><installation_by_org_level_code>SRDINFRA-TN</installation_by_org_level_code>
			<oem_invoice_no>'+@p_oem_no+'</oem_invoice_no><oem_invoice_date>'+@p_oem_date+'</oem_invoice_date><oem_invoiced_by_org_level_no>3</oem_invoiced_by_org_level_no>
			<oem_invoiced_by_org_level_code>SRDINFRA-TN</oem_invoiced_by_org_level_code><customer_invoice_no>'+@p_cust_no+'</customer_invoice_no>
			<customer_invoice_date>'+@p_cust_date+'</customer_invoice_date><invoiced_to_customer_by_org_level_no>3</invoiced_to_customer_by_org_level_no>
			<invoiced_to_customer_by_org_level_code>SRDINFRA-TN</invoiced_to_customer_by_org_level_code><std_wty_template_id/>
			<std_wty_pm_applicable_ind>0</std_wty_pm_applicable_ind><std_wty_duration/><std_wty_duration_uom/><std_wty_start_date/><std_wty_end_date/><std_wty_frequency/>'

			select @p_udf_xml = '<inputparam><udf_char_6>4</udf_char_6><udf_date_1>2025-04-03</udf_date_1><udf_date_1_hour>00</udf_date_1_hour>
			<udf_date_1_minute>00</udf_date_1_minute><udf_char_4>78</udf_char_4><udf_char_5/><udf_asset_location_country_code>in</udf_asset_location_country_code>
			<udf_asset_location_state_code>'+@p_state+'</udf_asset_location_state_code>
			<udf_asset_location_district_code>'+@p_district+'</udf_asset_location_district_code><udf_char_2/>
			<udf_date_2/><udf_date_2_hour>00</udf_date_2_hour><udf_date_2_minute>00</udf_date_2_minute></inputparam>'

			insert @data (i_txn_detail1_sl_no, i_txn_detail1_coref_xml, i_txn_detail1_udf_xml, i_txn_detail1_crud_ind)
			select 1, @p_txn_detail1_udf_xml,
			'<inputparam></inputparam>','A'

			SELECT	@o_update_status = ''
			SELECT	@errorNo = ''

			EXEC	@return_value = [dbo].[sp_save_manage_asset_master]
					@i_session_id = '741afddd-d3d0-4712-850a-4c6ebe37014b',
					@i_user_id = 'equipicco',
					@i_client_id = 'dbinpo',
					@i_locale_id = 'en-us',
					@i_country_code = 'in',
					@i_asset_id = @p_asset_id,
					@i_equipment_id = @p_equipment_id,
					@i_customer_id = @p_customer_id,
					@i_asset_location_code = @p_asset_location_code,
					@i_locator_layout = '',
					@i_installation_date = @p_installation_date,
					@i_asset_status = 'A',
					@i_org_level_no = '3',
					@i_org_level_code = 'SRDINFRA-TN',
					@i_rec_tstamp = '00000000-0000-0000-0000-000000000000',
					@i_inputparam_udf_xml = @p_udf_xml,
					@i_save_mode = 'A',
					@o_update_status = @o_update_status OUTPUT,
					@inputparam_detail1 = @data,
					@inputparam_detail2 = @data1,
					@inputparam_detail3 = @data2,
					@inputparam_detail4 = @data3,
					@inputparam_detail5 = @data4,
					@errorNo = @errorNo OUTPUT

			SELECT	@o_update_status as N'@o_update_status',
					@errorNo as N'@errorNo'

			SELECT	'Return Value' = @return_value



		FETCH NEXT FROM asset_master_data INTO @p_asset_id,@p_equipment_id,@p_customer_id,@p_asset_location_code,@p_installation_date,@p_org_level_no,@p_org_level_code,@p_oem_date,@p_oem_no,@p_cust_no,
@p_cust_date,@p_state,@p_district,@p_customer_location_code

END
CLOSE asset_master_data
DEALLOCATE asset_master_data

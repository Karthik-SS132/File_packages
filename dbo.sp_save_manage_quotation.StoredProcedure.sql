USE [msv_cp]
GO

DECLARE	@return_value int,
		@o_update_status uddt_varchar_5,
		@errorNo errorno,
		@data sp_save_manage_quotation_inputparam_detail1,
		@data1 sp_save_manage_quotation_inputparam_detail2,
		@data2 sp_save_manage_quotation_inputparam_detail3,
		@data3 sp_save_manage_quotation_inputparam_detail4,
		@data4 sp_save_manage_quotation_inputparam_detail5

insert @data (i_txn_detail1_sl_no, i_txn_detail1_coref_xml, i_txn_detail1_udf_xml, i_txn_detail1_crud_ind)
select 1, '<item_code>3463991901</item_code><item_variant_code>SPARE</item_variant_code><net_quantity>2.00</net_quantity><uom_code>PCS</uom_code><std_rate>155.00</std_rate><currency_code>INR</currency_code><item_description>BAR CU 35*33*58*3 NI</item_description><variant_description>SPARE</variant_description><addn_description></addn_description><comments_block_1></comments_block_1><comments_block_2></comments_block_2><gross_amount>310.00</gross_amount><prorated_tax_amount>0.00</prorated_tax_amount><prorated_discount_amount>0.00</prorated_discount_amount><asset_id>144964RHC</asset_id><equipment_id>EARTH TESTER CA6417</equipment_id>', '<inputparam></inputparam>','A'

insert @data1 (i_txn_detail2_sl_no, i_txn_detail2_coref_xml, i_txn_detail2_udf_xml, i_txn_detail2_crud_ind)
select 1, '<item_code>3463991901</item_code><item_variant_code>SPARE</item_variant_code><addl_charge_ind>T</addl_charge_ind><addl_charge_category>STD</addl_charge_category><addl_charge_code>GST18</addl_charge_code><addl_charge_subcode>IGST</addl_charge_subcode><addl_charge_description>Integrated Goods and Service Tax</addl_charge_description><percentage_amount_ind>P</percentage_amount_ind><addl_charge_percentage>18.00</addl_charge_percentage><applicable_on_amount>310.00</applicable_on_amount><addl_charge_amount>55.80</addl_charge_amount><currency_code>INR</currency_code>', '<inputparam></inputparam>','A'

insert @data2 (i_txn_detail3_sl_no, i_txn_detail3_coref_xml, i_txn_detail3_udf_xml, i_txn_detail3_crud_ind)
select 1, '', '<inputparam></inputparam>','A'

insert @data3 (i_txn_detail4_sl_no, i_txn_detail4_coref_xml, i_txn_detail4_udf_xml, i_txn_detail4_crud_ind)
select 1, '', '<inputparam></inputparam>','A'

insert @data4 (i_txn_detail5_sl_no, i_txn_detail5_coref_xml, i_txn_detail5_udf_xml, i_txn_detail5_crud_ind)
select 1, '', '<inputparam></inputparam>','A'

SELECT	@o_update_status = ''
SELECT	@errorNo = ''

EXEC	@return_value = [dbo].[sp_save_manage_quotation]
		@i_session_id = 'd88b586b-70cf-4eb0-84c7-da4a8f64d4ca',
		@i_user_id = 'regnmgrnorth',
		@i_client_id = 'delups',
		@i_locale_id = 'en-us',
		@i_country_code = 'in',
		@i_txn_ref_no = '',
		@i_txn_header_coref_xml = '<quotation_category >PQ</quotation_category ><quotation_type >PARTQUOT</quotation_type ><quotation_status ></quotation_status ><quotation_date >2025-01-09</quotation_date ><expected_closure_date>2025-01-09</expected_closure_date><buyer_customer_id >C000068</buyer_customer_id ><buyer_customer_location_code >TSHYD</buyer_customer_location_code ><buyer_address_line_1 >NA</buyer_address_line_1 ><buyer_address_line_2 ></buyer_address_line_2 ><buyer_address_line_3 ></buyer_address_line_3 ><buyer_city >TSHYD</buyer_city ><buyer_state >TG</buyer_state ><buyer_country >in</buyer_country ><buyer_pincode ></buyer_pincode ><consignee_customer_id >C000193</consignee_customer_id ><consignee_customer_location_code >ORBBR</consignee_customer_location_code ><consignee_address_line_1 >NA</consignee_address_line_1 ><consignee_address_line_2 ></consignee_address_line_2 ><consignee_address_line_3 ></consignee_address_line_3 ><consignee_city >ORBBR</consignee_city ><consignee_state >OR</consignee_state ><consignee_country >in</consignee_country ><consignee_pincode ></consignee_pincode ><seller_id >DeltaUPS</seller_id ><seller_location_code >Delta-GGN</seller_location_code ><place_of_despatch >Delta-GGN</place_of_despatch ><destination >ORBBR</destination ><despatch_mode_road_rail >BYHND</despatch_mode_road_rail ><buyer_reference ></buyer_reference ><buyer_reference_date ></buyer_reference_date ><other_reference ></other_reference ><payment_terms >a</payment_terms ><delivery_terms >s</delivery_terms ><despatch_details ></despatch_details ><terms_conditions >t</terms_conditions ><summary_comments ></summary_comments ><organogram_level_no >2</organogram_level_no ><organogram_level_code >Service</organogram_level_code ><company_location_code >NORTH</company_location_code ><currency_code >INR</currency_code ><quotation_gross_amount >4585.00</quotation_gross_amount ><quotation_tax_amount >825.30</quotation_tax_amount ><quotation_discount_amount >0.00</quotation_discount_amount ><quotation_net_amount >5410.30</quotation_net_amount ><asset_id>144964RHC</asset_id><equipment_id>EARTH TESTER CA6417</equipment_id>',
		@i_txn_header_udf_xml = '<inputparam><udf_char_1>10</udf_char_1></inputparam>',
		@i_rec_timestamp = '00000000-0000-0000-0000-000000000000',
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

GO
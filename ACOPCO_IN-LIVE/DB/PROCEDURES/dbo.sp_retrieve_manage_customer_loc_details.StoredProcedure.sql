DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_customer_loc_details]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
* Function tor retrieve customer location details
*/
CREATE PROCEDURE [dbo].[sp_retrieve_manage_customer_loc_details](
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_customer_id [uddt_customer_id], 
    @i_customer_location_code [uddt_customer_loc_code], 
    @o_customer_location_detail_xml [uddt_nvarchar_max] OUTPUT, 
    @o_retrieve_status [uddt_varchar_5] OUTPUT) AS
BEGIN
/*
* Function to retrieve customer location details
*/

--The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
--returned out of this stored procedure:
/*
SET /* Use SET | SELECT for assigning values */
@o_customer_location_detail_xml = '' /* unicode string */
@o_retrieve_status = '' /* string */
*/


set @o_retrieve_status = ''

select @o_customer_location_detail_xml='<cust_id>'+customer_id+'</cust_id>'+
		'<location_code>'+location_code+ '</location_code>'+
		'<loc_name_short>'+dbo.fn_escape_special_characters(location_name_short)+'</loc_name_short>'+
		'<loc_name_long>'+dbo.fn_escape_special_characters(isnull(location_name_long,''))+'</loc_name_long>'+
		'<addr_l_1>'+dbo.fn_escape_special_characters(ISNULL(address_line_1,''))+'</addr_l_1>'+
		'<addr_l_2>'+dbo.fn_escape_special_characters(ISNULL(address_line_2,''))+'</addr_l_2>'+
		'<addr_l_3>'+dbo.fn_escape_special_characters(ISNULL(address_line_3,''))+'</addr_l_3>'+
		'<city>'+city+'</city>'+
		'<state>'+state_code+'</state>'+
		'<country>'+country_code+'</country>'+
		'<zip>'+isnull(pincode,'')+'</zip>'+
		'<landline_1>'+isnull(landline_1,'')+'</landline_1>'+
		'<landline_2>'+isnull(landline_2,'')+'</landline_2>'+
		'<fax_1>'+isnull(fax_no_1,'')+'</fax_1>'+
		'<fax_2>'+isnull(fax_no_2,'')+'</fax_2>'+
		'<contact_1>'+isnull(contact_person_1,'')+'</contact_1>'+
		'<contact_1_mobile_no>'+isnull(contact_person_1_mobile_no,'')+'</contact_1_mobile_no>'+
		'<contact_1_email>'+isnull(contact_person_1_email_id,'')+'</contact_1_email>'+
		'<contact_2>'+isnull(contact_person_1,'')+'</contact_2>'+
		'<contact_2_mobile_no>'+isnull(contact_person_2_mobile_no,'')+'</contact_2_mobile_no>'+
		'<contact_2_email>'+isnull(contact_person_2_email_id,'')+'</contact_2_email>'+
		'<udf_char_1>'+ISNULL(udf_char_1,'')+'</udf_char_1>'+ /* iec_no */
		'<udf_char_2>'+ISNULL(udf_char_2,'')+'</udf_char_2>'+ /* tin_no */
		'<udf_char_3>'+ISNULL(udf_char_3,'')+'</udf_char_3>'+ /* ecc_code */
		'<udf_char_4>'+ISNULL(udf_char_4,'')+'</udf_char_4>'+ /* apgst_code */
		'<udf_char_5>'+ISNULL(udf_char_5,'')+'</udf_char_5>'+ 
		'<udf_char_6>'+ISNULL(udf_char_6,'')+'</udf_char_6>'+ 
		'<udf_char_7>'+ISNULL(udf_char_7,'')+'</udf_char_7>'+ 
		'<udf_char_8>'+ISNULL(udf_char_8,'')+'</udf_char_8>'+ 
		'<udf_char_9>'+ISNULL(udf_char_9,'')+'</udf_char_9>'+ 
		'<udf_char_10>'+ISNULL(udf_char_10,'')+'</udf_char_10>'+ 
		'<udf_bit_1>'+cast(ISNULL(udf_bit_1,0) as varchar(1))+'</udf_bit_1>'+
        '<udf_bit_2>'+cast(ISNULL(udf_bit_2,0) as varchar(1))+'</udf_bit_2>'+
        '<udf_bit_3>'+cast(ISNULL(udf_bit_3,0) as varchar(1))+'</udf_bit_3>'+
        '<udf_bit_4>'+cast(ISNULL(udf_bit_4,0) as varchar(1))+'</udf_bit_4>'+
        '<udf_float_1>'+cast(ISNULL(udf_float_1,0) as varchar(14))+'</udf_float_1>'+
        '<udf_float_2>'+cast(ISNULL(udf_float_2,0) as varchar(14))+'</udf_float_2>'+
        '<udf_float_3>'+cast(ISNULL(udf_float_3,0) as varchar(14))+'</udf_float_3>'+
        '<udf_float_4>'+cast(ISNULL(udf_float_4,0) as varchar(14))+'</udf_float_4>'+
        '<udf_date_1>'+isnull(convert(varchar(10), udf_date_1, 120),'')+'</udf_date_1>'+
        '<udf_date_1_hour>'+isnull(substring(CONVERT(varchar(10), udf_date_1, 108),1,2),'')+'</udf_date_1_hour>'+
        '<udf_date_1_minute>'+isnull(substring(CONVERT(varchar(10), udf_date_1, 108),4,2),'')+'</udf_date_1_minute>'+
        '<udf_date_2>'+isnull(convert(varchar(10), udf_date_2, 120),'')+'</udf_date_2>'+
        '<udf_date_2_hour>'+isnull(substring(CONVERT(varchar(10), udf_date_2, 108),1,2),'')+'</udf_date_2_hour>'+
        '<udf_date_2_minute>'+isnull(substring(CONVERT(varchar(10), udf_date_2, 108),4,2),'')+'</udf_date_2_minute>'+
        '<udf_date_3>'+isnull(convert(varchar(10), udf_date_3, 120),'')+'</udf_date_3>'+
        '<udf_date_3_hour>'+isnull(substring(CONVERT(varchar(10), udf_date_3, 108),1,2),'')+'</udf_date_3_hour>'+
        '<udf_date_3_minute>'+isnull(substring(CONVERT(varchar(10), udf_date_3, 108),4,2),'')+'</udf_date_3_minute>'+
        '<udf_date_4>'+isnull(convert(varchar(10), udf_date_4, 120),'')+'</udf_date_4>'+
        '<udf_date_4_hour>'+isnull(substring(CONVERT(varchar(10), udf_date_4, 108),1,2),'')+'</udf_date_4_hour>'+
        '<udf_date_4_minute>'+isnull(substring(CONVERT(varchar(10), udf_date_4, 108),4,2),'')+'</udf_date_4_minute>'+
        '<udf_analysis_code1>'+isnull(udf_analysis_code1,'')+'</udf_analysis_code1>'+
        '<udf_analysis_code2>'+isnull(udf_analysis_code2,'')+'</udf_analysis_code2>'+
        '<udf_analysis_code3>'+isnull(udf_analysis_code3,'')+'</udf_analysis_code3>'+
        '<udf_analysis_code4>'+isnull(udf_analysis_code4,'')+'</udf_analysis_code4>'+
        '<product_udf_char_1>'+ISNULL(product_udf_char_1,'')+'</product_udf_char_1>'+
		'<product_udf_char_2>'+ISNULL(product_udf_char_2,'')+'</product_udf_char_2>'+ 
		'<product_udf_char_3>'+ISNULL(product_udf_char_3,'')+'</product_udf_char_3>'+ 
		'<product_udf_char_4>'+ISNULL(product_udf_char_4,'')+'</product_udf_char_4>'+ 
		'<product_udf_bit_1>'+cast(ISNULL(product_udf_bit_1,0) as varchar(1))+'</product_udf_bit_1>'+
        '<product_udf_bit_2>'+cast(ISNULL(product_udf_bit_2,0) as varchar(1))+'</product_udf_bit_2>'+
        '<product_udf_float_1>'+cast(ISNULL(product_udf_float_1,0) as varchar(14))+'</product_udf_float_1>'+
        '<product_udf_float_2>'+cast(ISNULL(product_udf_float_2,0) as varchar(14))+'</product_udf_float_2>'+
        '<product_udf_date_1>'+isnull(convert(varchar(10), product_udf_date_1, 120),'')+'</product_udf_date_1>'+
        '<product_udf_date_1_hour>'+isnull(substring(CONVERT(varchar(10), product_udf_date_1, 108),1,2),'')+'</product_udf_date_1_hour>'+
        '<product_udf_date_1_minute>'+isnull(substring(CONVERT(varchar(10), product_udf_date_1, 108),4,2),'')+'</product_udf_date_1_minute>'+
        '<product_udf_date_2>'+isnull(convert(varchar(10), product_udf_date_2, 120),'')+'</product_udf_date_2>'+
        '<product_udf_date_2_hour>'+isnull(substring(CONVERT(varchar(10), product_udf_date_2, 108),1,2),'')+'</product_udf_date_2_hour>'+
        '<product_udf_date_2_minute>'+isnull(substring(CONVERT(varchar(10), product_udf_date_2, 108),4,2),'')+'</product_udf_date_2_minute>'+
        '<product_udf_analysis_code1>'+isnull(product_udf_analysis_code1,'')+'</product_udf_analysis_code1>'+
        '<product_udf_analysis_code2>'+isnull(product_udf_analysis_code2,'')+'</product_udf_analysis_code2>'+
        '<product_udf_analysis_code3>'+isnull(product_udf_analysis_code3,'')+'</product_udf_analysis_code3>'+
        '<product_udf_analysis_code4>'+isnull(product_udf_analysis_code4,'')+'</product_udf_analysis_code4>'+
		'<rec_tstamp>'+cast(convert(uniqueidentifier,cast(last_update_timestamp as binary)) as varchar(36))+'</rec_tstamp>'
	from customer_location	
	where company_id = @i_client_id
	  and country_code = @i_country_code
      and customer_id = @i_customer_id
      and location_code = @i_customer_location_code  



SET NOCOUNT ON
END

GO

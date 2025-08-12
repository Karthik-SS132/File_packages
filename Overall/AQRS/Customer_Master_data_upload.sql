	declare @p_user_id nvarchar(12),@p_employee_id nvarchar(12),@p_locale_id nvarchar(5),@p_inputparam_udf_xml [uddt_nvarchar_max],@p_session_id [sessionid]


	declare  @p_company_id [varchar](20) ,@p_customer_id [nvarchar](15),@p_customer_name [nvarchar](100),@p_address_line_1 [nvarchar](200),@p_address_line_2 [nvarchar](200),@p_address_line_3 [nvarchar](200),@p_city [nvarchar](60) ,@p_state_code [nvarchar](60) ,@p_country_code [varchar](5),@p_pincode [varchar](10),@p_landline_1 [varchar](20),@p_landline_2 [varchar](20),@p_fax_no_1 [varchar](20),@p_fax_no_2 [varchar](20),@p_contact_person_1 [nvarchar](60),@p_contact_person_1_mobile_no [varchar](20),@p_contact_person_1_email_id [nvarchar](60),@p_contact_person_2 [nvarchar](60),@p_contact_person_2_mobile_no [varchar](20),@p_contact_person_2_email_id [nvarchar](60),@p_creation_date [datetimeoffset](7),@p_created_by_employee_id [nvarchar](12),@p_udf_char_1 [nvarchar](60),@p_udf_char_2 [nvarchar](60),@p_udf_char_3 [nvarchar](60),@p_udf_char_4 [nvarchar](60),@p_udf_char_5 [nvarchar](60),@p_udf_char_6 [nvarchar](60),@p_udf_char_7 [nvarchar](60),@p_udf_char_8 [nvarchar](60),@p_udf_char_9 [nvarchar](60),@p_udf_char_10 [nvarchar](60),@p_udf_bit_1 [bit],@p_udf_bit_2 [bit],@p_udf_bit_3 [bit],@p_udf_bit_4 [bit],@p_udf_float_1 [float],@p_udf_float_2 [float],@p_udf_float_3 [float],@p_udf_float_4 [float],@p_udf_date_1 [datetimeoffset](7),@p_udf_date_2 [datetimeoffset](7),@p_udf_date_3 [datetimeoffset](7),@p_udf_date_4 [datetimeoffset](7),@p_udf_analysis_code1 [nvarchar](20),@p_udf_analysis_code2 [nvarchar](20),@p_udf_analysis_code3 [nvarchar](20),@p_udf_analysis_code4 [nvarchar](20),@p_product_udf_char_1 [nvarchar](20),@p_product_udf_char_2 [nvarchar](20),@p_product_udf_char_3 [nvarchar](20),@p_product_udf_char_4 [nvarchar](20),@p_product_udf_bit_1 [bit],@p_product_udf_bit_2 [bit],@p_product_udf_float_1 [float],@p_product_udf_float_2 [float],@p_product_udf_date_1 [datetimeoffset](7),@p_product_udf_date_2 [datetimeoffset](7),@p_product_udf_analysis_code1  [nvarchar](20),@p_product_udf_analysis_code2  [nvarchar](20),@p_product_udf_analysis_code3  [nvarchar](20),@p_product_udf_analysis_code4  [nvarchar](20),@p_prospect_ind [bit],@p_city_code [nvarchar](20),@p_latitude [varchar](60),@p_longitude [varchar](60),@p_ho_district_code  [nvarchar](20),@p_district_code [nvarchar](20)

	drop table if exists #customer


	CREATE TABLE #customer(
		[company_id] [varchar](20),
		[customer_id] [nvarchar](15),
		[customer_name] [nvarchar](100),
		[address_line_1] [nvarchar](200),
		[address_line_2] [nvarchar](200),
		[address_line_3] [nvarchar](200),
		[city] [nvarchar](60) ,
		[state_code] [nvarchar](60) ,
		[country_code] [varchar](5) ,
		[pincode] [varchar](10) NULL,
		[landline_1] [varchar](20) NULL,
		[landline_2] [varchar](20) NULL,
		[fax_no_1] [varchar](20) NULL,
		[fax_no_2] [varchar](20) NULL,
		[contact_person_1] [nvarchar](60) NULL,
		[contact_person_1_mobile_no] [varchar](20) NULL,
		[contact_person_1_email_id] [nvarchar](60) NULL,
		[contact_person_2] [nvarchar](60) NULL,
		[contact_person_2_mobile_no] [varchar](20) NULL,
		[contact_person_2_email_id] [nvarchar](60) NULL,
		[creation_date] [datetimeoffset](7) ,
		[created_by_employee_id] [nvarchar](12) ,
		[udf_char_1] [nvarchar](60) NULL,
		[udf_char_2] [nvarchar](60) NULL,
		[udf_char_3] [nvarchar](60) NULL,
		[udf_char_4] [nvarchar](60) NULL,
		[udf_char_5] [nvarchar](60) NULL,
		[udf_char_6] [nvarchar](60) NULL,
		[udf_char_7] [nvarchar](60) NULL,
		[udf_char_8] [nvarchar](60) NULL,
		[udf_char_9] [nvarchar](60) NULL,
		[udf_char_10] [nvarchar](60) NULL,
		[udf_bit_1] [bit] NULL,
		[udf_bit_2] [bit] NULL,
		[udf_bit_3] [bit] NULL,
		[udf_bit_4] [bit] NULL,
		[udf_float_1] [float] NULL,
		[udf_float_2] [float] NULL,
		[udf_float_3] [float] NULL,
		[udf_float_4] [float] NULL,
		[udf_date_1] [datetimeoffset](7) NULL,
		[udf_date_2] [datetimeoffset](7) NULL,
		[udf_date_3] [datetimeoffset](7) NULL,
		[udf_date_4] [datetimeoffset](7) NULL,
		[udf_analysis_code1] [nvarchar](20) NULL,
		[udf_analysis_code2] [nvarchar](20) NULL,
		[udf_analysis_code3] [nvarchar](20) NULL,
		[udf_analysis_code4] [nvarchar](20) NULL,
		[product_udf_char_1] [nvarchar](60) NULL,
		[product_udf_char_2] [nvarchar](60) NULL,
		[product_udf_char_3] [nvarchar](60) NULL,
		[product_udf_char_4] [nvarchar](60) NULL,
		[product_udf_bit_1] [bit] NULL,
		[product_udf_bit_2] [bit] NULL,
		[product_udf_float_1] [float] NULL,
		[product_udf_float_2] [float] NULL,
		[product_udf_date_1] [datetimeoffset](7) NULL,
		[product_udf_date_2] [datetimeoffset](7) NULL,
		[product_udf_analysis_code1] [nvarchar](20) NULL,
		[product_udf_analysis_code2] [nvarchar](20) NULL,
		[product_udf_analysis_code3] [nvarchar](20) NULL,
		[product_udf_analysis_code4] [nvarchar](20) NULL,
		[prospect_ind] [bit] NULL,
		[city_code] [nvarchar](20) NULL,
		[latitude] [varchar](60) NULL,
		[longitude] [varchar](60) NULL,
		[ho_district_code] [nvarchar](20) NULL,
		[district_code] [nvarchar](20) NULL
		)
		
		

/* INSERT QUERY NO: 1 */
INSERT INTO #customer(company_id, customer_id, customer_name, address_line_1, city, state_code, country_code, pincode, landline_1, landline_2, fax_no_1, fax_no_2, contact_person_1, contact_person_1_mobile_no, contact_person_1_email_id, contact_person_2, contact_person_2_mobile_no, contact_person_2_email_id, creation_date, created_by_employee_id, udf_char_1, udf_char_2, udf_char_3, udf_char_4, udf_char_5, udf_char_6, udf_char_7, udf_char_8, udf_char_9, udf_char_10, udf_bit_1, udf_bit_2, udf_bit_3, udf_bit_4, udf_float_1, udf_float_2, udf_float_3, udf_float_4, udf_date_1, udf_date_2, udf_date_3, udf_date_4, udf_analysis_code1, udf_analysis_code2, udf_analysis_code3, udf_analysis_code4, product_udf_char_1, product_udf_char_2, product_udf_char_3, product_udf_char_4, product_udf_bit_1, product_udf_bit_2, product_udf_float_1, product_udf_float_2, product_udf_date_1, product_udf_date_2, product_udf_analysis_code1, product_udf_analysis_code2, product_udf_analysis_code3, product_udf_analysis_code4, prospect_ind, city_code, latitude, longitude, ho_district_code, district_code)
VALUES
(
'aqrs', '170A214', 'Arpee Infra Corporation', 'Boulevard  opp viaay sales   sadhu vasvani chowk  Pune atation  Pune.411001', 'MHPU', 'MH', 'in', '', '', '', '', '', 'Mr Gupta', 9890020101, '', '', '', '', sysdatetimeoffset(), 'pmoemcoord', 'BOTH', '', '', '', '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
);


		declare customer_creation_cursor cursor for
		select company_id,customer_id,isnull(customer_name,''),isnull(address_line_1,''),isnull(address_line_2,''),isnull(address_line_3,''),isnull(city,''),isnull(state_code,''),country_code,isnull(pincode,''),isnull(landline_1,''),isnull(landline_2,''),isnull(fax_no_1,''),isnull(fax_no_2,''),isnull(contact_person_1,''),isnull(case(contact_person_1_mobile_no) when '0' then '' when '' then '' else '+91-'+contact_person_1_mobile_no end,''),isnull(contact_person_1_email_id,''),isnull(contact_person_2,''),isnull(case(contact_person_2_mobile_no) when '0' then '' when '' then '' else '+91-'+contact_person_2_mobile_no end,''),isnull(contact_person_2_email_id,''),creation_date,created_by_employee_id,udf_char_1,udf_char_2,udf_char_3,udf_char_4,udf_char_5,udf_char_6,udf_char_7,udf_char_8,udf_char_9,udf_char_10,udf_bit_1,udf_bit_2,udf_bit_3,udf_bit_4,udf_float_1,udf_float_2,udf_float_3,udf_float_4,udf_date_1,udf_date_2,udf_date_3,udf_date_4,udf_analysis_code1,udf_analysis_code2,udf_analysis_code3,udf_analysis_code4,product_udf_char_1,product_udf_char_2,product_udf_char_3,product_udf_char_4,product_udf_bit_1,product_udf_bit_2,product_udf_float_1,product_udf_float_2,product_udf_date_1,product_udf_date_2,product_udf_analysis_code1,product_udf_analysis_code2,product_udf_analysis_code3,product_udf_analysis_code4,prospect_ind,city_code,latitude,longitude,ho_district_code,district_code
		from #customer

			open customer_creation_cursor

			fetch next from customer_creation_cursor
			into @p_company_id,@p_customer_id,@p_customer_name,@p_address_line_1,@p_address_line_2,@p_address_line_3,@p_city,@p_state_code,@p_country_code,@p_pincode,@p_landline_1,@p_landline_2,@p_fax_no_1,@p_fax_no_2,@p_contact_person_1,@p_contact_person_1_mobile_no,@p_contact_person_1_email_id,@p_contact_person_2,@p_contact_person_2_mobile_no,@p_contact_person_2_email_id,@p_creation_date,@p_created_by_employee_id,@p_udf_char_1,@p_udf_char_2,@p_udf_char_3,@p_udf_char_4,@p_udf_char_5,@p_udf_char_6,@p_udf_char_7,@p_udf_char_8,@p_udf_char_9,@p_udf_char_10,@p_udf_bit_1,@p_udf_bit_2,@p_udf_bit_3,@p_udf_bit_4,@p_udf_float_1,@p_udf_float_2,@p_udf_float_3,@p_udf_float_4,@p_udf_date_1,@p_udf_date_2,@p_udf_date_3,@p_udf_date_4,@p_udf_analysis_code1,@p_udf_analysis_code2,@p_udf_analysis_code3,@p_udf_analysis_code4,@p_product_udf_char_1,@p_product_udf_char_2,@p_product_udf_char_3,@p_product_udf_char_4,@p_product_udf_bit_1,@p_product_udf_bit_2,@p_product_udf_float_1,@p_product_udf_float_2,@p_product_udf_date_1,@p_product_udf_date_2,@p_product_udf_analysis_code1,@p_product_udf_analysis_code2,@p_product_udf_analysis_code3,@p_product_udf_analysis_code4,@p_prospect_ind,@p_city_code,@p_latitude,@p_longitude,@p_ho_district_code,@p_district_code

			while @@FETCH_STATUS = 0
			begin
					
				  select @p_inputparam_udf_xml = '<inputparam><udf_customer_category></udf_customer_category><udf_customer_type></udf_customer_type><customer_master_district>'+isnull(@p_district_code,'')+'</customer_master_district><udf_char_1>'+isnull(@p_udf_char_1,'')+'</udf_char_1><udf_char_2>'+isnull(@p_udf_char_2,'')+'</udf_char_2><udf_char_3>'+isnull(@p_udf_char_3,'')+'</udf_char_3><udf_char_4>'+isnull(@p_udf_char_4,'')+'</udf_char_4><udf_char_5>'+isnull(@p_udf_char_5,'')+'</udf_char_5><udf_char_6>'+isnull(@p_udf_char_6,'')+'</udf_char_6><udf_char_7>'+isnull(@p_udf_char_7,'')+'</udf_char_7><udf_char_8>'+isnull(@p_udf_char_8,'')+'</udf_char_8><udf_char_9>'+isnull(@p_udf_char_9,'')+'</udf_char_9><udf_char_10>'+isnull(@p_udf_char_10,'')+'</udf_char_10><udf_bit_1>'+isnull(cast(@p_udf_bit_1 as varchar(1)),'')+'</udf_bit_1><udf_bit_2>'+isnull(cast(@p_udf_bit_2 as varchar(1)),'')+'</udf_bit_2><udf_bit_3>'+isnull(cast(@p_udf_bit_3 as varchar(1)),'')+'</udf_bit_3><udf_bit_4>'+isnull(cast(@p_udf_bit_4 as varchar(1)),'')+'</udf_bit_4><udf_float_1>'+isnull(cast(@p_udf_float_1 as varchar(24)),'')+'</udf_float_1><udf_float_2>'+isnull(cast(@p_udf_float_2 as varchar(24)),'')+'</udf_float_2><udf_float_3>'+isnull(cast(@p_udf_float_3 as varchar(24)),'')+'</udf_float_3><udf_float_4>'+isnull(cast(@p_udf_float_4 as varchar(24)),'')+'</udf_float_4><udf_date_1>'+isnull(cast(@p_udf_date_1 as nvarchar(10)),'')+'</udf_date_1><udf_date_1_hour>00</udf_date_1_hour><udf_date_1_minute>00</udf_date_1_minute><udf_date_2>'+isnull(cast(@p_udf_date_2 as nvarchar(10)),'')+'</udf_date_2><udf_date_2_hour>00</udf_date_2_hour><udf_date_2_minute>00</udf_date_2_minute><udf_date_3>'+isnull(cast(@p_udf_date_3 as nvarchar(10)),'')+'</udf_date_3><udf_date_3_hour>00</udf_date_3_hour><udf_date_3_minute>00</udf_date_3_minute><udf_date_4>'+isnull(cast(@p_udf_date_4 as nvarchar(10)),'')+'</udf_date_4><udf_date_4_hour>00</udf_date_4_hour><udf_date_4_minute>00</udf_date_4_minute><udf_analysis_code1>'+isnull(@p_udf_analysis_code1,'')+'</udf_analysis_code1><udf_analysis_code2>'+isnull(@p_udf_analysis_code2,'')+'</udf_analysis_code2><udf_analysis_code3>'+isnull(@p_udf_analysis_code3,'')+'</udf_analysis_code3><udf_analysis_code4>'+isnull(@p_udf_analysis_code4,'')+'</udf_analysis_code4><product_udf_char_1>'+isnull(@p_product_udf_char_1,'')+'</product_udf_char_1><product_udf_char_2>'+isnull(@p_product_udf_char_2,'')+'</product_udf_char_2><product_udf_char_3>'+isnull(@p_product_udf_char_3,'')+'</product_udf_char_3><product_udf_char_4>'+isnull(@p_product_udf_char_4,'')+'</product_udf_char_4><product_udf_bit_1>'+isnull(cast(@p_product_udf_bit_1 as varchar(1)),'')+'</product_udf_bit_1><product_udf_bit_2>'+isnull(cast(@p_product_udf_bit_2 as varchar(1)),'')+'</product_udf_bit_2><product_udf_float_1>'+isnull(cast(@p_product_udf_float_1 as varchar(24)),'')+'</product_udf_float_1><product_udf_float_2>'+isnull(cast(@p_product_udf_float_2 as varchar(24)),'')+'</product_udf_float_2><product_udf_date_1>'+isnull(cast(@p_product_udf_date_1 as nvarchar(10)),'')+'</product_udf_date_1><product_udf_date_1_hour>00</product_udf_date_1_hour><product_udf_date_1_minute>00</product_udf_date_1_minute><product_udf_date_2>'+isnull(cast(@p_product_udf_date_2 as nvarchar(10)),'')+'</product_udf_date_2><product_udf_date_2_hour>00</product_udf_date_2_hour><product_udf_date_2_minute>00</product_udf_date_2_minute><product_udf_analysis_code1>'+isnull(@p_product_udf_analysis_code1,'')+'</product_udf_analysis_code1><product_udf_analysis_code2>'+isnull(@p_product_udf_analysis_code1,'')+'</product_udf_analysis_code2><product_udf_analysis_code3>'+isnull(@p_product_udf_analysis_code1,'')+'</product_udf_analysis_code3><product_udf_analysis_code4>'+isnull(@p_product_udf_analysis_code1,'')+'</product_udf_analysis_code4><prospect_ind>'+isnull(cast(@p_prospect_ind as varchar(1)),'')+'</prospect_ind><city_code>'+isnull(@p_city_code,'')+'</city_code><longitude>'+isnull(@p_longitude,'')+'</longitude><latitude>'+isnull(@p_latitude,'')+'</latitude><ho_district_code>'+isnull(@p_ho_district_code,'')+'</ho_district_code></inputparam>'
				
				if not exists(select 1 from customer_location 
							  where company_id = @p_company_id 
							  and country_code = @p_country_code
							  and customer_id = @p_customer_id
							  and location_code = case isnull(@p_city,'') when '' then @p_customer_id else @p_city end)
				begin
						select @p_session_id = NEWID(),@p_user_id = 'Dnyanswrk'
						 
						DECLARE	@return_value int,
								@o_output_field_1 uddt_nvarchar_100,
								@o_update_status uddt_varchar_5,
								@errorNo errorno

						SELECT	@o_output_field_1 = ''
						SELECT	@o_update_status = ''
						SELECT	@errorNo = ''

						EXEC	@return_value = [dbo].[sp_save_manage_customer_master]
								@i_session_id = @p_session_id,
								@i_user_id = @p_user_id,
								@i_client_id = @p_company_id,
								@i_locale_id = @p_locale_id,
								@i_country_code = @p_country_code,
								@i_customer_id = @p_customer_id,
								@i_customer_name = @p_customer_name,
								@i_address_line_1 = @p_address_line_1,
								@i_address_line_2 = @p_address_line_2,
								@i_address_line_3 = @p_address_line_3,
								@i_city = @p_city,
								@i_state = @p_state_code,
								@i_country = @p_country_code,
								@i_pincode = @p_pincode,
								@i_landline_1 = @p_landline_1,
								@i_landline_2 = @p_landline_2,
								@i_fax_no_1 = @p_fax_no_1,
								@i_fax_no_2 = @p_fax_no_2,
								@i_contact_person_1 = @p_contact_person_1,
								@i_contact_person_1_mobile_no = @p_contact_person_1_mobile_no,
								@i_contact_person_1_email_id = @p_contact_person_1_email_id,
								@i_contact_person_2 = @p_contact_person_2,
								@i_contact_person_2_mobile_no = @p_contact_person_2_mobile_no,
								@i_contact_person_2_email_id = @p_contact_person_2_email_id,
								@i_inputparam_udf_xml = @p_inputparam_udf_xml,
								@i_rec_tstamp = '00000000-0000-0000-0000-000000000000',
								@i_save_mode = 'A',
								@o_output_field_1 = @o_output_field_1 OUTPUT,
								@o_update_status = @o_update_status OUTPUT,
								@errorNo = @errorNo OUTPUT

						SELECT	@o_output_field_1 as N'@o_output_field_1',
								@o_update_status as N'@o_update_status',
								@errorNo as N'@errorNo'

						SELECT	'Return Value' = @return_value

				end
				
				
			fetch next from customer_creation_cursor
			into @p_company_id,@p_customer_id,@p_customer_name,@p_address_line_1,@p_address_line_2,@p_address_line_3,@p_city,@p_state_code,@p_country_code,@p_pincode,@p_landline_1,@p_landline_2,@p_fax_no_1,@p_fax_no_2,@p_contact_person_1,@p_contact_person_1_mobile_no,@p_contact_person_1_email_id,@p_contact_person_2,@p_contact_person_2_mobile_no,@p_contact_person_2_email_id,@p_creation_date,@p_created_by_employee_id,@p_udf_char_1,@p_udf_char_2,@p_udf_char_3,@p_udf_char_4,@p_udf_char_5,@p_udf_char_6,@p_udf_char_7,@p_udf_char_8,@p_udf_char_9,@p_udf_char_10,@p_udf_bit_1,@p_udf_bit_2,@p_udf_bit_3,@p_udf_bit_4,@p_udf_float_1,@p_udf_float_2,@p_udf_float_3,@p_udf_float_4,@p_udf_date_1,@p_udf_date_2,@p_udf_date_3,@p_udf_date_4,@p_udf_analysis_code1,@p_udf_analysis_code2,@p_udf_analysis_code3,@p_udf_analysis_code4,@p_product_udf_char_1,@p_product_udf_char_2,@p_product_udf_char_3,@p_product_udf_char_4,@p_product_udf_bit_1,@p_product_udf_bit_2,@p_product_udf_float_1,@p_product_udf_float_2,@p_product_udf_date_1,@p_product_udf_date_2,@p_product_udf_analysis_code1,@p_product_udf_analysis_code2,@p_product_udf_analysis_code3,@p_product_udf_analysis_code4,@p_prospect_ind,@p_city_code,@p_latitude,@p_longitude,@p_ho_district_code,@p_district_code

		end	
		close customer_creation_cursor
		deallocate customer_creation_cursor
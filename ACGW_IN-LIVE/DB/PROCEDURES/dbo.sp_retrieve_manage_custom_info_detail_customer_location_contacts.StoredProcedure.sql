IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_detail_customer_location_contacts')
BEGIN

	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_detail_customer_location_contacts]
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
 * Retrieves custom info detail
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_detail_customer_location_contacts] 
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id], 
    @i_custom_info_code [uddt_varchar_60], 
    @i_custom_info_ref_no1 [uddt_nvarchar_60], 
    @i_custom_info_ref_no2 [uddt_nvarchar_60], 
    @o_custom_info_header_json [uddt_nvarchar_max] OUTPUT
AS
BEGIN
    /*
     * Retrieves custom info detail
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    -- The following code raises a 'Not implemented' error. Remove this code after implementing this procedure.
    --RAISERROR( N'Procedure ''sp_retrieve_manage_custom_info_detail'' is yet to be implemented', 15, 1)

    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_custom_info_header_json = '' /* unicode string */
     */

    /*
    -- The following SQL snippet illustrates selection of result sets expected from this stored procedure: 
    
    -- Result set 1: custom_info_detail_json

    SELECT
        '' as custom_info_detail_json, /* dummy column aliased by result set name */
        '' as o_custom_info_json /* unicode string */
    FROM <Table name>
    */

	set @o_custom_info_header_json = ''

	create table #customer_contact_asset_mapping (
		asset_id nvarchar(30), 
		equipment_id nvarchar (30),
		customer_id nvarchar (30),
		applicable_ind bit
	)

	insert into #customer_contact_asset_mapping (asset_id, equipment_id, customer_id, applicable_ind)
	select asset_id, equipment_id, customer_id, 0 
	from asset_master
	where company_id = @i_client_id
		and country_code = @i_country_code
		and customer_id = substring(@i_custom_info_ref_no1, 0, charindex('/', @i_custom_info_ref_no1, 0))
		and asset_status = 'A'

	update #customer_contact_asset_mapping
	set applicable_ind = 1
	from customer_user_mapping_to_assets a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.asset_id = #customer_contact_asset_mapping.asset_id
		and a.customer_id = substring(@i_custom_info_ref_no1, 0, charindex('/', @i_custom_info_ref_no1, 0))
		and a.customer_location_code = substring(@i_custom_info_ref_no1,CHARINDEX('/',@i_custom_info_ref_no1)+1,LEN(@i_custom_info_ref_no1))
		and a.employee_id = substring(@i_custom_info_ref_no2,CHARINDEX('-',@i_custom_info_ref_no2)+1,LEN(@i_custom_info_ref_no2))

	select @o_custom_info_header_json = 
		'{' +
			'"total":"'+ convert(varchar(12), count(*) over()) +'",'+
			'"contact_category":"'+ isnull(a.contact_category,'') +'",'+
			'"contact_category_desc":"'+ isnull(dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CUSTCONTCATG',a.contact_category),'') +'",'+
			'"contact_type":"'+ isnull(a.contact_type,'') +'",'+
			'"contact_type_desc":"'+ isnull(dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CUSTCONTTYPE',a.contact_type),'') +'",'+
			'"customer_id":"'+ a.customer_id +'",'+
			'"customer_name":"' + 
				isnull((
					select c.customer_name 
					from customer c
					where c.company_id			= @i_client_id
						and  c.country_code		= @i_country_code
						and  a.company_id		= c.company_id
						and  a.country_code     = c.country_code
						and  c.customer_id		= a.customer_id ), '') + 
			'",' +
			'"location_code":"'+ a.location_code +'",'+
			'"location_code_desc":"' + 
				isnull((
					select cl.location_name_short 
					from customer_location cl
					where cl.company_id			= @i_client_id
						and  cl.country_code	= @i_country_code
						and  a.company_id		= cl.company_id
						and  a.country_code     = cl.country_code
						and  cl.customer_id		= a.customer_id
						and  cl.location_code	= a.location_code ), '') + 
			'",' +
			'"title":"'+ isnull(a.title,'Mr/Ms') +'",'+
			'"first_name":"'+ a.first_name +'",'+
			'"middle_name":"'+ isnull(a.middle_name,'') +'",'+
			'"last_name":"'+ isnull(a.last_name,'') +'",'+
			'"address_line_1":"'+ a.address_line_1 +'",'+
			'"address_line_2":"'+ isnull(a.address_line_2,'') +'",'+
			'"address_line_3":"'+ isnull(a.address_line_3,'') +'",'+
			'"city":"'+ isnull(a.city_code,'') +'",'+
			'"city_desc":"' + 
				isnull((
					select cm.city_name 
					from city_master cm
					where a.company_id			= @i_client_id
						and  cm.country_code	= @i_country_code
						and  cm.country_code    = a.country_code
						and  cm.state_code		= a.state_code 
						and	 cm.district_code	= a.district
						and  cm.city_code		= a.city_code), '') + 
			'",' +
			'"district":"'+ isnull(a.district,'') +'",'+
			'"district_desc":"' + 
				isnull((
					select dm.district_name 
					from district_master dm
					where a.company_id			= @i_client_id
						and  dm.country_code	= @i_country_code
						and  dm.country_code    = a.country_code
						and  dm.state_code		= a.state_code 
						and	 dm.district_code	= a.district), '') + 
			'",' +
			'"state":"'+ a.state_code +'",'+
			'"state_desc":"' + 
				isnull((
					select s.state 
					from state s
					where a.company_id			= @i_client_id
						and  s.country_code		= @i_country_code
						and  s.country_code     = a.country_code
						and  s.state_code		= a.state_code ), '') + 
			'",' +
			'"pincode":"'+ isnull(a.pincode,'') +'",'+
			'"country":"'+ a.country_code +'",'+
			'"country_desc":"' + 
				isnull((
					select c.country_name 
					from country c
					where a.company_id			= @i_client_id
						and  c.country_code		= @i_country_code
						and  c.country_code		= a.country_code ), '') + 
			'",' +
			'"contact_phone_no":"'+ isnull(a.contact_phone_no,'') +'",'+
			'"email_id":"'+ isnull(a.email_id,'') +'",'+
			'"designation":"'+ isnull(a.designation,'') +'",'+
			'"department":"'+ isnull(a.department,'') +'",'+
			'"udf_char_1":"'+ isnull(a.udf_char_1,'') +'",'+
			'"udf_char_2":"'+ isnull(a.udf_char_2,'') +'",'+
			'"udf_char_3":"'+ isnull(a.udf_char_3,'') +'",'+
			'"udf_char_4":"'+ isnull(a.udf_char_4,'') +'",'+
			'"udf_char_5":"'+ isnull(a.udf_char_5,'') +'",'+
			'"udf_char_6":"'+ isnull(a.udf_char_6,'') +'",'+
			'"udf_char_7":"'+ isnull(a.udf_char_7,'') +'",'+
			'"udf_char_8":"'+ isnull(a.udf_char_8,'') +'",'+
			'"udf_char_9":"'+ isnull(a.udf_char_9,'') +'",'+
			'"udf_char_10":"'+ isnull(a.udf_char_10,'') +'",'+
			'"udf_bit_1":"'+ cast(ISNULL(udf_bit_1,0) as varchar(1)) +'",'+
			'"udf_bit_2":"'+ cast(ISNULL(udf_bit_2,0) as varchar(1)) +'",'+
			'"udf_bit_3":"'+ cast(ISNULL(udf_bit_3,0) as varchar(1)) +'",'+
			'"udf_bit_4":"'+ cast(ISNULL(udf_bit_4,0) as varchar(1)) +'",'+
			'"udf_float_1":"'+cast(ISNULL(udf_float_1,0) as varchar(14)) +'",'+
			'"udf_float_2":"'+cast(ISNULL(udf_float_2,0) as varchar(14)) +'",'+
			'"udf_float_3":"'+cast(ISNULL(udf_float_3,0) as varchar(14)) +'",'+
			'"udf_float_4":"'+cast(ISNULL(udf_float_4,0) as varchar(14)) +'",'+
			'"udf_analysis_code1":"'+ isnull(a.udf_analysis_code1,'') +'",'+
			'"udf_analysis_code2":"'+ isnull(a.udf_analysis_code2,'') +'",'+
			'"udf_analysis_code3":"'+ isnull(a.udf_analysis_code3,'') +'",'+
			'"udf_analysis_code4":"'+ isnull(a.udf_analysis_code4,'') +'",'+
			'"rec_tstamp":"'+cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))+'"'+
		'}'
	from customer_location_contacts a 
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.customer_id = substring(@i_custom_info_ref_no1, 0, charindex('/', @i_custom_info_ref_no1, 0))
		and a.location_code = substring(@i_custom_info_ref_no1,CHARINDEX('/',@i_custom_info_ref_no1)+1,LEN(@i_custom_info_ref_no1))
		and a.contact_phone_no = @i_custom_info_ref_no2

	select  '' as custom_info_detail_json,
		'{' +
			'"customer_id":"' + isnull(a.customer_id, '')  + '",' +
			'"asset_id":"' + isnull(a.asset_id, '')  + '",' +
			'"equipment_id":"' + isnull(a.equipment_id, '')  + '",' +
			'"applicable_ind":"' + cast(ISNULL(a.applicable_ind,0) as varchar(1))   + '"' +
		'}'
	as  o_custom_info_json
	from #customer_contact_asset_mapping a
	
    SET NOCOUNT OFF;
END


GO

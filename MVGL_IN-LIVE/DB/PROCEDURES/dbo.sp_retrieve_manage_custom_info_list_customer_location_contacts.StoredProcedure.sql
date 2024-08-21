IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_customer_location_contacts')
BEGIN

	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_customer_location_contacts]
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_customer_location_contacts] 
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
    /*
     * Function to retrieve list of ciustom info records
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_retrieve_status = '' /* string */
     */

    /*
    -- The following SQL snippet illustrates selection of result sets expected from this stored procedure: 
    
    -- Result set 1: custom_info_list

    SELECT
        '' as custom_info_list, /* dummy column aliased by result set name */
        '' as o_custom_info_json /* unicode string */
    FROM <Table name>
    */

	
	declare @p_inputparam_xml xml, @p_skip varchar(10), @p_take varchar(10), 
	@p_offset_count int, @p_rowcount int
	
	create table #input_params
	(
		paramname varchar(50) not null,
		paramval varchar(50) null
	)

	set @p_inputparam_xml = CAST(@i_inputparam_xml as XML)

	insert #input_params
	(paramname, paramval)
	SELECT nodes.value('local-name(.)', 'varchar(50)'),
			nodes.value('(.)[1]', 'varchar(50)')
	FROM @p_inputparam_xml.nodes('/inputparam/*') AS Tbl(nodes)

	update #input_params
	set paramval = null 
	where paramval = 'ALL'
	or paramval = ''

	select @p_skip = paramval from #input_params where paramname = 'skip'

	select @p_take = paramval from #input_params where paramname = 'take'
	

	if 	@p_skip = '%' select @p_skip = 0
	if  @p_take = '%' select @p_take = 0
	
	select @p_offset_count = @p_skip

	if @p_take = 0
		select @p_rowcount = count(*) 
		from customer_location_contacts
		where company_id = @i_client_id
			and country_code = @i_country_code
	else
		select @p_rowcount = cast(@p_take as int)
    
	select '' as custom_info_list,
		'{' +
			'"total":"'+ convert(varchar(12), count(*) over()) +'",'+
			'"contact_category":"'+ isnull(a.contact_category,'') +'",'+
			'"contact_category_desc":"'+ isnull(dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CUSTCONTCATG',a.contact_category),'') +'",'+
			'"contact_type":"'+ isnull(a.contact_type,'') +'",'+
			'"contact_type_desc":"'+ isnull(dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CUSTCONTTYPE',a.contact_type),'') +'",'+
			'"customer_id":"'+ a.customer_id +'",'+
			'"customer_name":"'+ isnull((select top(1) customer_name from customer  cr
			                              where cr.company_id = @i_client_id
											  and cr.country_code = @i_country_code
											  and cr.customer_id = a.customer_id ),'') 
			+'",'+
			'"location_code":"'+ a.location_code +'",'+
			'"contact_name":"'+ isnull(a.first_name,'')+' '+isnull(a.last_name,'') +'",'+
			'"address_line_1":"'+ a.address_line_1 +'",'+
			'"address_line_2":"'+ isnull(a.address_line_2,'') +'",'+
			'"address_line_3":"'+ isnull(a.address_line_3,'') +'",'+
			'"city":"'+ isnull(a.city,'') +'",'+
			'"state":"'+ a.state_code +'",'+
			'"pincode":"'+ isnull(a.pincode,'') +'",'+
			'"country":"'+ a.country_code +'",'+
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
		as o_custom_info_json
	from customer_location_contacts a 
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.customer_id like 
			isnull( (select '%'+paramval+'%' from #input_params where paramname = 'customer_id_filter') , a.customer_id)
		and a.location_code like 
			isnull( (select '%'+paramval+'%' from #input_params where paramname = 'location_code_filter') , a.location_code)
		and a.contact_phone_no like 
			isnull( (select '%'+paramval+'%' from #input_params where paramname = 'contact_phone_no_filter') , a.contact_phone_no)
		and isnull(a.first_name,'')+isnull(a.middle_name,'')+isnull(a.last_name,'') like 
			isnull((select '%'+paramval+'%' from #input_params where paramname = 'contact_name_filter') , isnull(a.first_name,'')+isnull(a.middle_name,'')+isnull(a.last_name,''))
		
		order by a.creation_date desc
		offset @p_offset_count rows fetch next @p_rowcount  rows only
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END



GO

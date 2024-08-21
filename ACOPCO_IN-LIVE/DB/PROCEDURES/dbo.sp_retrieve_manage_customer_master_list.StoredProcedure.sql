DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_customer_master_list]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[sp_retrieve_manage_customer_master_list] 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_inputparam_xml [uddt_nvarchar_500], 
    @o_retrieve_status [uddt_varchar_5] OUTPUT
AS
BEGIN
    /*
     * Function to retrieve customer list
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    -- The following code raises a 'Not implemented' error. Remove this code after implementing this procedure.
    --RAISERROR( N'Procedure ''sp_retrieve_manage_customer_master_list'' is yet to be implemented', 15, 1)

    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_retrieve_status = '' /* string */
     */

    /*
    -- The following SQL snippet illustrates selection of result sets expected from this stored procedure: 
    
    -- Result set 1: customer_list

    SELECT
        '' as customer_list, /* dummy column aliased by result set name */
        '' as o_customer_list_xml /* unicode string */
    FROM <Table name>
    */
    
   declare @p_inputparam_xml xml, @p_employee_id nvarchar(12),
		@p_skip varchar(10), @p_take varchar(10), @p_offset_count int, @p_rowcount int
    
	set @p_inputparam_xml = CAST(@i_inputparam_xml as XML)
	
	DECLARE @p_handle INT      
    EXEC SP_XML_PREPAREDOCUMENT  @p_handle OUTPUT, @p_inputparam_xml
    
  create table #input_params
 (paramname varchar(50) not null,
  paramval varchar(50) null
  )
  
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
			from customer
			where company_id = @i_client_id
				and country_code = @i_country_code
		else
			select @p_rowcount = cast(@p_take as int)
 
	select @p_employee_id = b.employee_id
	from users a, employee b 
	where a.company_id = @i_client_id
	  and a.country_code = @i_country_code
	  and a.user_id = @i_user_id
	  and a.company_id = b.company_id
	  and a.country_code = b.country_code
	  and a.employee_id = b.employee_id
	  
	  if @p_employee_id is null
		select @p_employee_id = ''
		
    set @o_retrieve_status = ''

	select '' as customer_list,
		'{' + 
			'"total":"'+ convert(varchar(12), count(*) over()) +'",'+	
			'"cust_id":"' + customer_id + '",' +
			'"cust_name":"' + customer_name + '",' +
			'"cust_address_line_1":"'+ address_line_1+'",'+
			'"cust_address_line_2":"'+ISNULL(address_line_2,'')+'",'+
			'"cust_address_line_3":"'+ISNULL(address_line_3,'')+'",'+
			'"city":"' + city + '",' +
			'"state":"' + state_code + '",' +
			'"pincode":"' + isnull(pincode,'') + '",' +
			'"country":"' + country_code + '",' +
			'"landline_1":"' + ISNULL(landline_1,'') + '",' +
			'"landline_2":"' + ISNULL(landline_2,'') + '",' +	
			'"fax_no_1":"' + ISNULL(fax_no_1,'') + '",' +
			'"fax_no_2":"' + ISNULL(fax_no_2,'') + '",' +			
			'"contact_person_1_name":"'+ISNULL(contact_person_1,'')+'",'+
			'"contact_person_1_mobile_no":"'+ISNULL(contact_person_1_mobile_no,'')+'",'+
			'"contact_person_1_email":"'+ISNULL(contact_person_1_email_id,'')+'",'+
			'"contact_person_2_name":"'+ISNULL(contact_person_2,'')+'",'+
			'"contact_person_2_mobile_no":"'+ISNULL(contact_person_2_mobile_no,'')+'",'+
			'"contact_person_2_email":"'+ISNULL(contact_person_2_email_id,'')+'",'+
			'"prospect_ind":"' + cast(ISNULL(prospect_ind,0) as varchar(1)) + '",' +
			'"rec_tstamp":"' + cast(convert(uniqueidentifier, cast(last_update_timestamp as binary)) as varchar(36)) + '"' +
		'}'
		as o_customer_list_xml
	from customer	
	where company_id = @i_client_id
	  and country_code = @i_country_code
	  and customer_id like 
		'%'+isnull( (select paramval from #input_params where paramname = 'customer_id_filter') , isnull(customer_id,''))+'%'
	  and customer_name like 
		'%'+isnull( (select paramval from #input_params where paramname = 'customer_name_filter') , isnull(customer_name,''))+'%'	  
	  and city like
		'%'+isnull( (select paramval from #input_params where paramname = 'customer_city_filter') , isnull(city,''))+'%'  
	  and state_code like
		'%'+isnull( (select paramval from #input_params where paramname = 'customer_state_filter') , isnull(state_code,''))+'%'	  
		 and prospect_ind like
		'%'+isnull( (select paramval from #input_params where paramname = 'prospect_flag_filter') , isnull(prospect_ind,''))+'%'
	  and (created_by_employee_id = @p_employee_id
	       or
			(isnull( (select paramval from #input_params where paramname = 'dealer_code_filter') , '') = ''
			 or 
			 (isnull( (select paramval from #input_params where paramname = 'dealer_code_filter') , '') != ''
			  and 
			  customer_id in ( 
				select b1.customer_id from asset_master b1
				where b1.company_id = @i_client_id
				  and b1.country_code = @i_country_code
				  and cast(b1.servicing_org_level_no as varchar(2))+b1.servicing_org_level_code = 
					( select cast(b2.organogram_level_no as varchar(2))+b2.organogram_level_code
					  from dealer_organogram_mapping b2
					  where b2.company_id = @i_client_id
						and b2.country_code = @i_country_code
						and b2.dealer_id = isnull( (select paramval from #input_params where paramname = 'dealer_code_filter') , '')
					)
				)
			  )			   
	       )
	     )
	  and isnull(udf_char_1,'') like 
		isnull( (select paramval from #input_params where paramname = 'udf_char_1_filter') , isnull(udf_char_1,''))	
	  and isnull(udf_char_2,'') like 
		isnull( (select paramval from #input_params where paramname = 'udf_char_2_filter') , isnull(udf_char_2,''))	
	  and isnull(udf_char_3,'') like 
		isnull( (select paramval from #input_params where paramname = 'udf_char_3_filter') , isnull(udf_char_3,''))	
	  and isnull(udf_char_4,'') like 
		isnull( (select paramval from #input_params where paramname = 'udf_char_4_filter') , isnull(udf_char_4,''))	
	  and isnull(udf_analysis_code1,'') like 
		isnull( (select paramval from #input_params where paramname = 'udf_analysis_code1_filter') , isnull(udf_analysis_code1,''))	
	  and isnull(udf_analysis_code2,'') like 
		isnull( (select paramval from #input_params where paramname = 'udf_analysis_code2_filter') , isnull(udf_analysis_code2,''))	
	  and isnull(udf_analysis_code3,'') like 
		isnull( (select paramval from #input_params where paramname = 'udf_analysis_code3_filter') , isnull(udf_analysis_code3,''))	
	  and isnull(udf_analysis_code4,'') like 
		isnull( (select paramval from #input_params where paramname = 'udf_analysis_code4_filter') , isnull(udf_analysis_code4,''))	
	order by customer_id desc
			offset @p_offset_count rows fetch next @p_rowcount  rows only
		  
	if @@ROWCOUNT != 0
	   set @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END

GO

DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_listof_notifications_for_delivery]
GO
																																  
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_listof_notifications_for_delivery] 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @o_retrieve_status [uddt_varchar_5] OUTPUT
AS
BEGIN
    /*
     * Function to retrieve list of notifications for delivery
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
    
    -- Result set 1: notification_header

    SELECT
        '' as notification_header, /* dummy column aliased by result set name */
        0 as o_notification_id, /* integer */
        '' as o_n_company_code, /* string */
        '' as o_n_country_code, /* string */
        '' as o_n_event_code, /* unicode string */
        '' as o_n_info_xml /* unicode string */
    FROM <Table name>
    
    -- Result set 2: outputparam_detail_n_mode_detail

    SELECT
        '' as outputparam_detail_n_mode_detail, /* dummy column aliased by result set name */
        0 as o_notification_id, /* integer */
        '' as o_n_mode, /* string */
        '' as o_n_template_id, /* string */
        0 | 1 as o_n_attachment_avl_ind /* boolean - 0 | 1 to be assigned respectively for false | true */
    FROM <Table name>
    
    -- Result set 3: outputparam_detail_n_recipient_detail

    SELECT
        '' as outputparam_detail_n_recipient_detail, /* dummy column aliased by result set name */
        '' as o_n_mode, /* string */
        0 as o_notification_id, /* integer */
        '' as o_n_recipient_type, /* string */
        '' as o_n_recipient_user_id, /* unicode string */
        '' as o_n_recipient_employee_id, /* unicode string */
        '' as o_n_recipient_name, /* unicode string */
        '' as o_n_recipient_email_id, /* unicode string */
        '' as o_n_recipient_mobile_no /* string */
    FROM <Table name>
    */

	declare @p_notification_id int, @p_notification_event_code nvarchar(60), @p_notification_mode varchar(15), 
			@p_recipient_type varchar(2), @p_id_type varchar(3), @p_org_level_no tinyint, @p_id_code varchar(30),
			@p_recipient_employee_id nvarchar(12), @p_recipient_user_id nvarchar(12), @p_recipient_email_id nvarchar(60),
			@p_recipient_mobile_no varchar(20), @p_requestor_user_id nvarchar(12), @p_requestor_employee_id nvarchar(12),
			@p_handle INT, @p_notification_xml nvarchar(max), @p_recipient_name nvarchar(160)
			      
    declare @p_call_no nvarchar(20), @p_jo_no nvarchar(20), @p_cust_id varchar(15), 
			@p_cust_name nvarchar(100) , @p_cust_contact_no nvarchar(100), @p_support_desk_no nvarchar(100),    
			@p_cust_contact_email_id nvarchar(60), @p_notification_template_id varchar(60)
			
	declare @p_invoice_no nvarchar(30)
	
	declare @p_invoice_net_amount decimal(18,4),
			@p_currency_code varchar(3),
			@p_invoice_status varchar(3),
			@p_cust_contact_name nvarchar(20),
			@p_assigned_to_emp_id nvarchar(12),
			@p_assigned_to_emp_org_level_no tinyint,
			@p_assigned_to_emp_org_level_code nvarchar(15),
			@p_notification_exception_email_id nvarchar(100)
				
	create table #notification_recipients_list
	(
		notification_id int not null,
		notification_event_code nvarchar(60) not null,
		notification_mode varchar(15) not null, 
		recipient_type varchar(2) not null,
		recipient_employee_id nvarchar(12) null,
		recipient_name nvarchar(160) null,		
		recipient_user_id nvarchar(12) null,
		recipient_email_id nvarchar(60) null,
		recipient_mobile_no varchar(20) null,
		notification_xml nvarchar(max) null
	)
 
	create table #notification_info
	(
		notification_id int null,
		id tinyint null,
		parentid tinyint null,
		localname varchar(60) null,
		text nvarchar(max) null
	)

		if (@i_user_id != @i_client_id + 'admn' and @i_user_id != 'sadmn')
	begin

		declare notification_list_cursor cursor for
		select top(1) notification_id, notification_event_code,requestor_user_id,
				notification_xml
		FROM notification_log a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.requestor_user_id = @i_user_id
		  and a.notification_id not in (select notification_id from notification_log_delivery)
		  and a.notification_event_code like '%_SECURITY_CODE'

	end
	else
	begin

		declare notification_list_cursor cursor for
		select notification_id, notification_event_code,requestor_user_id,
				notification_xml
		FROM notification_log a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and notification_id not in (select notification_id from notification_log_delivery)
		  and datediff(dd, convert(datetimeoffset, '2019-03-06',121), creation_datetime) >= 0
		  and a.notification_event_code not like '%_SECURITY_CODE'
		union all 
		select top(50) notification_id, notification_event_code,requestor_user_id,
				notification_xml
		FROM notification_log a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and notification_id not in (select notification_id from notification_log_delivery)
		  and a.notification_event_code not like '%_SECURITY_CODE'

	end	
	  

	open notification_list_cursor

	fetch next from notification_list_cursor into 
			@p_notification_id, @p_notification_event_code, @p_requestor_user_id,@p_notification_xml
			
	while (@@FETCH_STATUS = 0)
	begin
		
	if exists ( select 1 from company_notification a
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and notification_Event_code = @p_notification_event_code
				  and active_ind = 1)
	begin
		select @p_notification_xml = replace(replace(replace(replace(replace(replace(replace(replace(
							REPLACE(@p_notification_xml, '&', '&amp;'), char(9),''),char(10),''),char(11),''),
							char(12),''),char(13),''),char(14),''),char(15),''),char(160),'')

		if try_cast(@p_notification_xml as xml) is not null
		begin
	
			EXEC SP_XML_PREPAREDOCUMENT  @p_handle OUTPUT, @p_notification_xml

			/* Create an edge table and read relevant values from it */
	
			insert #notification_info
			(
				notification_id, id, parentid, localname, text
			)
			select @p_notification_id, id, parentid, localname, text
			FROM OPENXML(@p_handle, '/notification_info',2)      
			where @p_notification_id not in 
			( select notification_id from #notification_info)
			
			exec sp_xml_removedocument @p_handle
			update #notification_info
		set text = REPLACE(text, '&amp;', '&')
		
		declare notification_recipients_cursor cursor for
		select c.notification_mode, 
				c.notification_template_id, 
				d.recipient_type, 
				d.id_type, 
				isnull(d.org_level_no,0), 
				isnull(d.id_code,'')
		FROM company_notification a, company_notification_mode_preference c, company_notification_recipients_list d
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.notification_event_code = @p_notification_event_code
		and a.company_id = c.company_id
		and a.country_code = c.country_code
		and a.notification_event_code = c.notification_event_code
		and c.company_id = d.company_id
		and c.country_code = d.country_code
		and c.notification_event_code = d.notification_event_code
		and c.notification_mode = d.notification_mode
			    
			open notification_recipients_cursor

			fetch notification_recipients_cursor into 
				@p_notification_mode, 
				@p_notification_template_id , 
				@p_recipient_type, 
				@p_id_type, 
				 @p_org_level_no, 
				 @p_id_code 

			while (@@FETCH_STATUS =  0)
			begin
		
			select  @p_recipient_user_id = '', 
					@p_recipient_employee_id =  '',
					@p_recipient_name = '',
					@p_recipient_email_id = '', 
					@p_recipient_mobile_no = ''
							
			if @p_id_type = 'RQ'
			begin
			
				select  @p_recipient_user_id = b.user_id, 
						@p_recipient_employee_id = b.employee_id,
						@p_recipient_name = a.title+' '+a.first_name+' '+isnull(a.middle_name,'')+' '+a.last_name,
						@p_recipient_email_id = a.email_id, 
						@p_recipient_mobile_no = a.contact_mobile_no
				from employee a, users b
				where b.company_id = @i_client_id
				  and b.country_code = @i_country_code
				  and b.user_id = @p_requestor_user_id
				  and a.company_id = b.company_id
				  and a.country_code = b.country_code
				  and a.employee_id = b.employee_id
				  and a.employee_status = 'A'
			
			end
			else if @p_id_type = 'CU'
			begin
			
				select @p_call_no = '', @p_cust_name = '', @p_cust_contact_no= '',@p_cust_contact_email_id = '' 
				
			    if @p_notification_template_id  like 'CALL_%' 
				begin
				
					select @p_call_no = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select top(1) id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'call_no')
	
					select @p_cust_name = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select top(1) id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'cust_name')
					
					select @p_cust_contact_no = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select top(1) id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'cust_contact_no')
					
					select @p_cust_contact_email_id = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select top(1) id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'cust_contact_email_id')
					
         			select  @p_recipient_user_id = 'CUSTOMER', 
							@p_recipient_employee_id =  'CUSTOMER',
							@p_recipient_name = @p_cust_name,
							@p_recipient_email_id = @p_cust_contact_email_id, 
							@p_recipient_mobile_no = @p_cust_contact_no
					  
				end
				
			end			
			else if @p_id_type = 'FR'
			begin
			
			    if @p_notification_template_id like 'CALL_%'
				begin
											
					select @p_call_no = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'call_no')
				
					
					select @p_recipient_employee_id = ''
					
					/* Get the employee id with the specified functional role
					   with in the same organization and location */
					
					select @p_recipient_employee_id = c.employee_id 
					from call_register a,  functional_role_employee b,
         				  employee c
         			where a.company_id = @i_client_id
         			  and a.country_code = @i_country_code
         			  and a.call_ref_no = @p_call_no
         			  and b.company_id = a.company_id
         			  and b.country_code = a.country_code
         			  and b.functional_role_id = @p_id_code
         			  and c.company_id = b.company_id
         			  and c.country_code = b.country_code
         			  and c.employee_id = b.employee_id 
         			  and c.employee_status = 'A'
         			  AND C.organogram_level_no = A.organogram_level_no
         			  AND c.organogram_level_code = a.organogram_level_code
         			  and c.location_code = a.company_location_code
         			
					if isnull(@p_recipient_employee_id,'') = ''
					begin
					
						select top(1) @p_recipient_employee_id = c.employee_id 
						from call_register a,  functional_role_employee b,
							  employee c
						where a.company_id = @i_client_id
						  and a.country_code = @i_country_code
						  and a.call_ref_no = @p_call_no
						  and b.company_id = a.company_id
						  and b.country_code = a.country_code
						  and b.functional_role_id = @p_id_code
						  and c.company_id = b.company_id
						  and c.country_code = b.country_code
						  and c.employee_id = b.employee_id 
						  and c.employee_status = 'A'
						  AND C.organogram_level_no = A.organogram_level_no
						  AND c.organogram_level_code = a.organogram_level_code
										
					end

					if isnull(@p_recipient_employee_id,'') = ''
					begin
					
						select top(1) @p_recipient_employee_id = c.employee_id 
						from call_register a,  functional_role_employee b,
							  employee c
						where a.company_id = @i_client_id
						  and a.country_code = @i_country_code
						  and a.call_ref_no = @p_call_no
						  and b.company_id = a.company_id
						  and b.country_code = a.country_code
						  and b.functional_role_id = @p_id_code
						  and c.company_id = b.company_id
						  and c.country_code = b.country_code
						  and c.employee_id = b.employee_id 
						  and c.employee_status = 'A'
										
					end

					if @p_recipient_employee_id = ''
					begin
         					select  @p_recipient_user_id = 'FUNC.ROLE', 
									@p_recipient_employee_id =  'NOFREMPID',
									@p_recipient_name = 'NOFREMPNAME',
									@p_recipient_email_id = 'selfservit@gmail.com', 
									@p_recipient_mobile_no = 'NOFREMPMOBILE'
					end  
					else
					begin
						select  @p_recipient_user_id = d.user_id, 
							@p_recipient_employee_id =  c.employee_id,
							@p_recipient_name = c.title+' '+c.first_name+' '+isnull(c.middle_name,'')+' '+c.last_name,
							@p_recipient_email_id = c.email_id, 
							@p_recipient_mobile_no = c.contact_mobile_no
						from employee c , users d
						where c.company_id = @i_client_id
						  and c.country_code = @i_country_code
						  and c.employee_id = @p_recipient_employee_id
						  and c.employee_status = 'A'
						  and c.company_id = d.company_id
						  and c.country_code = d.country_code
						  and c.employee_id = d.employee_id
         			end
					
				end
				
			end			
			else if @p_id_type = 'CF'
			begin
			
			    if @p_notification_template_id like 'CALL_%'
				begin
									  	
					select @p_call_no = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select top(1) id from #notification_info
									  where notification_id = @p_notification_id
									  	and localname = 'call_no')
				
					
					select @p_recipient_employee_id = ''
					
					/* Get the employee id with the specified functional role
					   with in the same organization and location */
					
					select @p_recipient_employee_id = c.employee_id 
					from customer_mapping_to_employee a,  functional_role_employee b,
         				  employee c
         			where a.company_id = @i_client_id
         			  and a.country_code = @i_country_code
         			  and a.mapping_purpose_code = 'SROOMABMMAPPING' /* Need to remove this and add  functional role in notification recipient*/
         			  and a.customer_id = ( select g.customer_id
         									from call_register g
         									where g.company_id = @i_client_id
         									  and g.country_code = @i_country_code
         									  and g.call_ref_no = @p_call_no) 
          			  and b.company_id = a.company_id
         			  and b.country_code = a.country_code
         			  and b.functional_role_id = @p_id_code
         			  and a.employee_id = b.employee_id         			  
         			  and c.company_id = b.company_id
         			  and c.country_code = b.country_code
         			  and c.employee_id = b.employee_id 
					  and c.employee_status = 'A'
					           			
					if @p_recipient_employee_id = ''
					begin
         					select  @p_recipient_user_id = 'C.MAP.FROLE', 
									@p_recipient_employee_id =  'NOCFEMPID',
									@p_recipient_name = 'NOCFEMPNAME',
									@p_recipient_email_id = 'selfservit@gmail.com', 
									@p_recipient_mobile_no = 'NOCFEMPMOBILE'
					end  
					else
					begin
						select  @p_recipient_user_id = d.user_id, 
							@p_recipient_employee_id =  c.employee_id,
							@p_recipient_name = c.title+' '+c.first_name+' '+isnull(c.middle_name,'')+' '+c.last_name,
							@p_recipient_email_id = c.email_id, 
							@p_recipient_mobile_no = c.contact_mobile_no
						from employee c , users d
						where c.company_id = @i_client_id
						  and c.country_code = @i_country_code
						  and c.employee_id = @p_recipient_employee_id
						  and c.employee_status = 'A'
						  and c.company_id = d.company_id
						  and c.country_code = d.country_code
						  and c.employee_id = d.employee_id
         			end
					
				end
				
			end			
			else if @p_id_type = 'TE'
			begin
			
			    if @p_notification_template_id like 'CALL_%'
				begin
									  	
					select @p_call_no = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select top(1) id from #notification_info
									  where notification_id = @p_notification_id
									  	and localname = 'call_no')
				
					
					select @p_recipient_employee_id = ''
					
					/* Get the employee id with the specified functional role
					   with in the same organization and location */
					
					select @p_recipient_employee_id = c.employee_id 
					from call_register a,  functional_role_employee b,
         				  employee c
         			where a.company_id = @i_client_id
         			  and a.country_code = @i_country_code
         			  and a.call_ref_no = @p_call_no   	
         			  and b.company_id = a.company_id
         			  and b.country_code = a.country_code
         			  and b.functional_role_id = a.call_mapped_to_func_role
         			  and b.employee_id = a.call_mapped_to_employee_id
         			  and c.company_id = b.company_id
         			  and c.country_code = b.country_code
         			  and c.employee_id = b.employee_id 
					  and c.employee_status = 'A'
					           			
					if @p_recipient_employee_id = ''
					begin
         					select  @p_recipient_user_id = 'CALL.TE', 
									@p_recipient_employee_id =  'NOTEEMPID',
									@p_recipient_name = 'NOEMPNAME',
									@p_recipient_email_id = 'selfservit@gmail.com', 
									@p_recipient_mobile_no = 'NOTEEMPMOBILE'
					end  
					else
					begin
						select  @p_recipient_user_id = d.user_id, 
							@p_recipient_employee_id =  c.employee_id,
							@p_recipient_name = c.title+' '+c.first_name+' '+isnull(c.middle_name,'')+' '+c.last_name,
							@p_recipient_email_id = c.email_id, 
							@p_recipient_mobile_no = c.contact_mobile_no
						from employee c , users d
						where c.company_id = @i_client_id
						  and c.country_code = @i_country_code
						  and c.employee_id = @p_recipient_employee_id
						  and c.employee_status = 'A'
						  and c.company_id = d.company_id
						  and c.country_code = d.country_code
						  and c.employee_id = d.employee_id
         			end
					
				end
				
			end			
			else if @p_id_type = 'TS'
			begin
			
			    if @p_notification_template_id like 'CALL_%'
				begin
									  	
					select @p_call_no = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select top(1) id from #notification_info
									  where notification_id = @p_notification_id
									  	and localname = 'call_no')
				
					
					select @p_recipient_employee_id = '', @p_requestor_employee_id = ''
					
					
					/* Get the employee id with the specified functional role
					   with in the same organization and location */
					
					select @p_requestor_employee_id = c.employee_id 
					from call_register a,  functional_role_employee b,
         				  employee c
         			where a.company_id = @i_client_id
         			  and a.country_code = @i_country_code
         			  and a.call_ref_no = @p_call_no   	
         			  and b.company_id = a.company_id
         			  and b.country_code = a.country_code
         			  and b.functional_role_id = a.call_mapped_to_func_role
         			  and b.employee_id = a.call_mapped_to_employee_id
         			  and c.company_id = b.company_id
         			  and c.country_code = b.country_code
         			  and c.employee_id = b.employee_id 
					  and c.employee_status = 'A'
					
					
					/* Get the employee id with the specified functional role
					   with in the same organization and location */
					
				if @p_id_code = 'SUPVSR1'
				begin
				
				select  @p_recipient_user_id = '', 
						@p_recipient_employee_id = '',
						@p_recipient_name = '',
						@p_recipient_email_id = '', 
						@p_recipient_mobile_no = ''
					
					select  @p_recipient_user_id = c.user_id, 
						@p_recipient_employee_id = b.employee_id,
						@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
						@p_recipient_email_id = b.email_id, 
						@p_recipient_mobile_no = b.contact_mobile_no
					from employee a, employee b, users c
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.employee_id = @p_requestor_employee_id
					  and a.employee_status = 'A'
					  and b.company_id = a.company_id
					  and b.country_code = a.country_code
					  and b.employee_id = a.supervisor_emp_id
					  and b.employee_status = 'A'
					  and c.company_id = b.company_id
					  and c.country_code = b.country_code
					  and c.employee_id = b.employee_id
			
				end
				else if @p_id_code = 'SUPVSR2'
				begin
				
				select  @p_recipient_user_id = '', 
						@p_recipient_employee_id = '',
						@p_recipient_name = '',
						@p_recipient_email_id = '', 
						@p_recipient_mobile_no = ''
					
					select  @p_recipient_user_id = d.user_id, 
						@p_recipient_employee_id = c.employee_id,
						@p_recipient_name = c.title+' '+c.first_name+' '+isnull(c.middle_name,'')+' '+c.last_name,
						@p_recipient_email_id = c.email_id, 
						@p_recipient_mobile_no = c.contact_mobile_no
					from employee a, employee b, employee c, users d
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.employee_id = @p_requestor_employee_id
					  and a.employee_status = 'A'
					  and b.company_id = a.company_id
					  and b.country_code = a.country_code
					  and b.employee_id = a.supervisor_emp_id
					  and b.employee_status = 'A'
					  and c.company_id = b.company_id
					  and c.country_code = b.country_code
					  and c.employee_id = b.supervisor_emp_id
					  and c.employee_status = 'A'
					  and d.company_id = c.company_id
					  and d.country_code = c.country_code
					  and d.employee_id = c.supervisor_emp_id
				
				end
				else if @p_id_code = 'SUPVSR3'
				begin
				
					select  @p_recipient_user_id = '', 
						@p_recipient_employee_id = '',
						@p_recipient_name = '',
						@p_recipient_email_id = '', 
						@p_recipient_mobile_no = ''
						
					select  @p_recipient_user_id = e.user_id, 
						@p_recipient_employee_id = d.employee_id,
						@p_recipient_name = d.title+' '+d.first_name+' '+isnull(d.middle_name,'')+' '+d.last_name,
						@p_recipient_email_id = d.email_id, 
						@p_recipient_mobile_no = d.contact_mobile_no
					from employee a, employee b, employee c, employee d, users e
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.employee_id = @p_requestor_employee_id
					  and a.employee_status = 'A'
					  and b.company_id = a.company_id
					  and b.country_code = a.country_code
					  and b.employee_id = a.supervisor_emp_id
					  and b.employee_status = 'A'
					  and c.company_id = b.company_id
					  and c.country_code = b.country_code
					  and c.employee_id = b.supervisor_emp_id
					  and c.employee_status = 'A'
					  and d.company_id = c.company_id
					  and d.country_code = c.country_code
					  and d.employee_id = c.supervisor_emp_id
					  and d.employee_status = 'A'
					  and e.company_id = d.company_id
					  and e.country_code = d.country_code
					  and e.employee_id = d.supervisor_emp_id
		
					  
				end           			
					if @p_recipient_employee_id = ''
					begin
         					select  @p_recipient_user_id = 'TS.FROLE', 
									@p_recipient_employee_id =  'NOTSEMPID',
									@p_recipient_name = 'NOTSEMPNAME',
									@p_recipient_email_id = 'selfservit@gmail.com', 
									@p_recipient_mobile_no = 'NOTSEMPMOBILE'
					end  
					else
					begin
						select  @p_recipient_user_id = d.user_id, 
							@p_recipient_employee_id =  c.employee_id,
							@p_recipient_name = c.title+' '+c.first_name+' '+isnull(c.middle_name,'')+' '+c.last_name,
							@p_recipient_email_id = c.email_id, 
							@p_recipient_mobile_no = c.contact_mobile_no
						from employee c , users d
						where c.company_id = @i_client_id
						  and c.country_code = @i_country_code
						  and c.employee_id = @p_recipient_employee_id
						  and c.employee_status = 'A'
						  and c.company_id = d.company_id
						  and c.country_code = d.country_code
						  and c.employee_id = d.employee_id
         			end
					
				end
				
			end			
			else if @p_id_type = 'FS' /* Functional Supervisor */
			begin
			
				
			    if @p_notification_template_id like 'CALL_%'
				begin
				
					
					select @p_call_no = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select top(1) id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'call_no')
					
						
					select @p_recipient_employee_id = ''

					/* Determine if the call is assigned */
					select  @p_recipient_employee_id =  c.employee_id
					from call_register a, call_assignment b, employee c, users d
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.call_ref_no = @p_call_no
					  and a.company_id = b.company_id
					  and a.country_code = b.country_code
					  and b.call_ref_no = @p_call_no
					  and b.primary_resource_ind = 1
					  and a.company_id = c.company_id
					  and a.country_code = c.country_code
					  and b.resource_emp_id = c.employee_id
					  and c.company_id = d.company_id
					  and c.country_code = d.country_code
					  and c.employee_id = d.employee_id	 
					  and c.employee_status = 'A' 
					
					/* If it is not assigned, Pick the requestor's supervisor*/
					
					if @p_recipient_employee_id = ''
					begin
						select @p_recipient_employee_id = a.created_by_employee_id 
						from call_register a
						where a.company_id = @i_client_id
						  and a.country_code = @i_country_code
						  and a.call_ref_no = @p_call_no
					end
					  
					/* Pick Functional Supervisor */
					
					select @p_recipient_employee_id = c.employee_id 
					from functional_role_employee b,
         				 employee c
         			where b.company_id = @i_client_id
         			  and b.country_code = @i_country_code
         			  and b.employee_id = @p_recipient_employee_id
         			  and c.company_id = b.company_id
         			  and c.country_code = b.country_code
         			  and c.employee_id = b.reporting_to_employee_id
         			  and c.employee_status = 'A'
         			
					if @p_recipient_employee_id = ''
					begin
         					select  @p_recipient_user_id = 'FUNC.SUPVSR', 
									@p_recipient_employee_id =  'NOFSEMPID',
									@p_recipient_name = 'NOFSEMPNAME',
									@p_recipient_email_id = 'selfservit@gmail.com', 
									@p_recipient_mobile_no = 'NOFSEMPMOBILE'
					end  
					else
					begin
						select  @p_recipient_user_id = d.user_id, 
							@p_recipient_employee_id =  c.employee_id,
							@p_recipient_name = c.title+' '+c.first_name+' '+isnull(c.middle_name,'')+' '+c.last_name,
							@p_recipient_email_id = c.email_id, 
							@p_recipient_mobile_no = c.contact_mobile_no
						from employee c , users d
						where c.company_id = @i_client_id
						  and c.country_code = @i_country_code
						  and c.employee_id = @p_recipient_employee_id
						  and c.employee_status = 'A'
						  and c.company_id = d.company_id
						  and c.country_code = d.country_code
						  and c.employee_id = d.employee_id
						  
         			end
					
				end
				
				
			end			
			else if @p_id_type = 'AT'
			begin
			
				if @p_notification_template_id = 'ACTIVATE_USER'
				begin

				
					select @p_recipient_user_id = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'for_user_id')
					
				
					select  @p_recipient_employee_id = b.employee_id,
						@p_recipient_name = a.title+' '+a.first_name+' '+isnull(a.middle_name,'')+' '+a.last_name,
						@p_recipient_email_id = a.email_id, 
						@p_recipient_mobile_no = a.contact_mobile_no
					from employee a, users b
					where b.company_id = @i_client_id
					  and b.country_code = @i_country_code
					  and b.user_id = @p_recipient_user_id
					  and a.company_id = b.company_id
					  and a.country_code = b.country_code
					  and a.employee_id = b.employee_id
					  and a.employee_status = 'A'
				  
				end
				else if @p_notification_template_id like 'CALL_EXP%'
				begin

					select  @p_recipient_user_id = d.user_id, 
						@p_recipient_employee_id =  c.employee_id,
						@p_recipient_name = c.title+' '+c.first_name+' '+isnull(c.middle_name,'')+' '+c.last_name,
						@p_recipient_email_id = c.email_id, 
						@p_recipient_mobile_no = c.contact_mobile_no
					from expdoc_header a, expdoc_workflow_assignment b, 
						employee c, users d
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.expdoc_ref_no = 
						(select isnull(TEXT,'')
							from #notification_info
							where notification_id = @p_notification_id
							  and localname = '#text'
							  and parentid = (select top(1) id from #notification_info
											  where notification_id = @p_notification_id
												and localname = 'expdoc_no')
						)
					  and a.company_id = b.company_id
					  and a.country_code = b.country_code
					  and b.expdoc_ref_no = a.expdoc_ref_no
					  and b.current_assignee_ind = 1
					  and a.company_id = c.company_id
					  and a.country_code = c.country_code
					  and b.resource_emp_id = c.employee_id
					  and c.employee_status = 'A'
					  and c.company_id = d.company_id
					  and c.country_code = d.country_code
					  and c.employee_id = d.employee_id
				     
				end
				else if @p_notification_template_id like 'CALL_PWCLAIM%'
				begin

					select  @p_recipient_user_id = d.user_id, 
						@p_recipient_employee_id =  c.employee_id,
						@p_recipient_name = c.title+' '+c.first_name+' '+isnull(c.middle_name,'')+' '+c.last_name,
						@p_recipient_email_id = c.email_id, 
						@p_recipient_mobile_no = c.contact_mobile_no
					from asset_pwclaim_header a, asset_pwclaim_workflow_assignment b, 
						employee c, users d
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.pwclaim_ref_no = 
						(select isnull(TEXT,'')
							from #notification_info
							where notification_id = @p_notification_id
							  and localname = '#text'
							  and parentid = (select top(1) id from #notification_info
											  where notification_id = @p_notification_id
												and localname = 'pwclaim_no')
						)
					  and a.company_id = b.company_id
					  and a.country_code = b.country_code
					  and b.pwclaim_ref_no = a.pwclaim_ref_no
					  and b.current_assignee_ind = 1
					  and a.company_id = c.company_id
					  and a.country_code = c.country_code
					  and b.resource_emp_id = c.employee_id
					  and c.employee_status = 'A'
					  and c.company_id = d.company_id
					  and c.country_code = d.country_code
					  and c.employee_id = d.employee_id
				     
				end
				else if @p_notification_template_id like 'CALL_%'
				begin

					
					select @p_call_no = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select top(1) id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'call_no')
					
					select  @p_recipient_user_id = d.user_id, 
						@p_recipient_employee_id =  c.employee_id,
						@p_recipient_name = c.title+' '+c.first_name+' '+isnull(c.middle_name,'')+' '+c.last_name,
						@p_recipient_email_id = c.email_id, 
						@p_recipient_mobile_no = c.contact_mobile_no
					from call_register a, call_assignment b, employee c, users d
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.call_ref_no = @p_call_no
					  and a.company_id = b.company_id
					  and a.country_code = b.country_code
					  and b.call_ref_no = @p_call_no
					  and b.primary_resource_ind = 1
					  and a.company_id = c.company_id
					  and a.country_code = c.country_code
					  and b.resource_emp_id = c.employee_id
					  and c.employee_status = 'A'
					  and c.company_id = d.company_id
					  and c.country_code = d.country_code
					  and c.employee_id = d.employee_id
				  
				     
				end
				else if @p_notification_template_id like 'JO_%'
				begin
				
					select @p_jo_no = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'jo_no')
					
					select  @p_recipient_user_id = c.user_id, 
						@p_recipient_employee_id =  b.employee_id,
						@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
						@p_recipient_email_id = b.email_id, 
						@p_recipient_mobile_no = b.contact_mobile_no
					from job_order_properties a, employee b, users c
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.project_id = @p_jo_no
					  and a.company_id = b.company_id
					  and a.country_code = b.country_code
					  and a.assigned_to_emp_id = b.employee_id
					  and b.employee_status = 'A'
					  and c.company_id = b.company_id
					  and c.country_code = b.country_code
					  and c.employee_id = b.employee_id
				end
				
			end
			else if @p_id_type = 'EI'
			begin
			if @p_notification_template_id = 'VISITOR_PROFILE'
				begin
					if((select count(*) from customer_location_contacts 
							where company_id = @i_client_id 
								and country_code = @i_country_code 
								and contact_phone_no = (select substring(@p_notification_xml, charindex('<mobile_no>', @p_notification_xml) + len('<mobile_no>'), 
									charindex('</mobile_no>',@p_notification_xml) - charindex('<mobile_no>', @p_notification_xml) - len('</mobile_no>') + 1))) > 0)
					begin
						if((select count(distinct servicing_org_level_code) from asset_master 
								where company_id = @i_client_id 
									and country_code = @i_country_code 
									and customer_id in (select customer_id from customer_location_contacts 
															where company_id = @i_client_id 
																and country_code = @i_country_code 
																and contact_phone_no = (select substring(@p_notification_xml, charindex('<mobile_no>', @p_notification_xml) + len('<mobile_no>'), 
																	charindex('</mobile_no>',@p_notification_xml) - charindex('<mobile_no>', @p_notification_xml) - len('</mobile_no>') + 1)))
																and asset_status = 'A') = 1)
						begin
							if exists (select 1 from employee a, users b
										where a.company_id = @i_client_id
											and a.country_code = @i_country_code
											and a.employee_status = 'A'
											and a.company_id = b.company_id
											and a.country_code = b.country_code
											and a.employee_id = b.employee_id
											and a.organogram_level_code = (select distinct servicing_org_level_code from asset_master 
																			where company_id = @i_client_id 
																				and country_code = @i_country_code 
																				and customer_id in (select customer_id from customer_location_contacts 
																									where company_id = @i_client_id 
																										and country_code = @i_country_code
																										and contact_phone_no = (select substring(@p_notification_xml, charindex('<mobile_no>', @p_notification_xml) + len('<mobile_no>'), 
																											charindex('</mobile_no>',@p_notification_xml) - charindex('<mobile_no>', @p_notification_xml) - len('</mobile_no>') + 1)))
																										and asset_status = 'A')
												and b.user_group_id = 'SCOORD-DLR')
							begin
								select top(1) @p_recipient_user_id = b.user_id, 
									@p_recipient_employee_id = b.employee_id,
									@p_recipient_name = a.title+' '+a.first_name+' '+isnull(a.middle_name,'')+' '+a.last_name,
									@p_recipient_email_id = a.email_id, 
									@p_recipient_mobile_no = a.contact_mobile_no
								from employee a, users b
								where a.company_id = @i_client_id
											and a.country_code = @i_country_code
											and a.employee_status = 'A'
											and a.company_id = b.company_id
											and a.country_code = b.country_code
											and a.employee_id = b.employee_id
											and a.organogram_level_code = (select distinct servicing_org_level_code from asset_master 
																			where company_id = @i_client_id 
																				and country_code = @i_country_code 
																				and customer_id in (select customer_id from customer_location_contacts 
																									where company_id = @i_client_id 
																										and country_code = @i_country_code
																										and contact_phone_no = (select substring(@p_notification_xml, charindex('<mobile_no>', @p_notification_xml) + len('<mobile_no>'), 
																											charindex('</mobile_no>',@p_notification_xml) - charindex('<mobile_no>', @p_notification_xml) - len('</mobile_no>') + 1)))
																										and asset_status = 'A')
												and b.user_group_id = 'SCOORD-DLR'
							end
							else
							begin
							
								select  @p_recipient_user_id = b.user_id, 
									@p_recipient_employee_id = b.employee_id,
									@p_recipient_name = a.title+' '+a.first_name+' '+isnull(a.middle_name,'')+' '+a.last_name,
									@p_recipient_email_id = a.email_id, 
									@p_recipient_mobile_no = a.contact_mobile_no
								from employee a, users b
								where a.company_id = @i_client_id
								  and a.country_code = @i_country_code
								  and a.employee_id = @p_id_code
								  and a.employee_status = 'A'
								  and a.company_id = b.company_id
								  and a.country_code = b.country_code
								  and a.employee_id = b.employee_id
							end
						end
						else
						begin
							select  @p_recipient_user_id = b.user_id, 
								@p_recipient_employee_id = b.employee_id,
								@p_recipient_name = a.title+' '+a.first_name+' '+isnull(a.middle_name,'')+' '+a.last_name,
								@p_recipient_email_id = a.email_id, 
								@p_recipient_mobile_no = a.contact_mobile_no
							from employee a, users b
							where a.company_id = @i_client_id
							  and a.country_code = @i_country_code
							  and a.employee_id = @p_id_code
							  and a.employee_status = 'A'
							  and a.company_id = b.company_id
							  and a.country_code = b.country_code
							  and a.employee_id = b.employee_id
						end
					end
					else 
					begin
						select  @p_recipient_user_id = b.user_id, 
							@p_recipient_employee_id = b.employee_id,
							@p_recipient_name = a.title+' '+a.first_name+' '+isnull(a.middle_name,'')+' '+a.last_name,
							@p_recipient_email_id = a.email_id, 
							@p_recipient_mobile_no = a.contact_mobile_no
						from employee a, users b
						where a.company_id = @i_client_id
						  and a.country_code = @i_country_code
						  and a.employee_id = @p_id_code
						  and a.employee_status = 'A'
						  and a.company_id = b.company_id
						  and a.country_code = b.country_code
						  and a.employee_id = b.employee_id
					end

				end
				else
				begin
					select  @p_recipient_user_id = b.user_id, 
						@p_recipient_employee_id = b.employee_id,
						@p_recipient_name = a.title+' '+a.first_name+' '+isnull(a.middle_name,'')+' '+a.last_name,
						@p_recipient_email_id = a.email_id, 
						@p_recipient_mobile_no = a.contact_mobile_no
					from employee a, users b
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.employee_id = @p_id_code
					  and a.employee_status = 'A'
					  and a.company_id = b.company_id
					  and a.country_code = b.country_code
					  and a.employee_id = b.employee_id
				end
			end
			else if @p_id_type = 'OR'
			begin
				/***/
					if @p_notification_template_id like 'CALL_%'
					begin

						select @p_call_no = isnull(TEXT,'')
						from #notification_info
						where notification_id = @p_notification_id
						  and localname = '#text'
						  and parentid = (select top(1) id from #notification_info
										  where notification_id = @p_notification_id
											and localname = 'call_no')
						
						select  @p_assigned_to_emp_id = b.resource_emp_id
						from call_register a, call_assignment b
						where a.company_id = @i_client_id
						  and a.country_code = @i_country_code
						  and a.call_ref_no = @p_call_no
						  and a.company_id = b.company_id
						  and a.country_code = b.country_code
						  and b.call_ref_no = @p_call_no
						  and b.primary_resource_ind = 1
					     
					end
					else if @p_notification_template_id like 'JO_%'
					begin
					
						select @p_jo_no = isnull(TEXT,'')
						from #notification_info
						where notification_id = @p_notification_id
						  and localname = '#text'
						  and parentid = (select id from #notification_info
										  where notification_id = @p_notification_id
											and localname = 'jo_no')
						
						select  @p_assigned_to_emp_id = a.assigned_to_emp_id
						from job_order_properties a
						where a.company_id = @i_client_id
						  and a.country_code = @i_country_code
						  and a.project_id = @p_jo_no
					end

					select @p_assigned_to_emp_org_level_no = organogram_level_no,
							@p_assigned_to_emp_org_level_code = organogram_level_code
					from employee 
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and employee_id = @p_assigned_to_emp_id
					  and employee_status = 'A'
					  
					 if @p_id_code = 'AO'
					 begin
				
						if @p_assigned_to_emp_org_level_no = 1
						begin
							select @p_recipient_user_id = c.user_id, 
								@p_recipient_employee_id = b.employee_id,
								@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
								@p_recipient_email_id = b.email_id, 
								@p_recipient_mobile_no = b.contact_mobile_no
							from level1_code a, employee b, users c
							where a.company_id = @i_client_id
							  and a.country_code = @i_country_code
							  and a.level1_code = @p_assigned_to_emp_org_level_code
							  and b.company_id = a.company_id
							  and b.country_code = a.country_code
							  and b.employee_id = a.head_emp_id
							  and b.employee_status = 'A'
							  and c.company_id = b.company_id
							  and c.country_code = b.country_code
							  and c.employee_id = b.employee_id
						end	
						else if @p_assigned_to_emp_org_level_no = 2
						begin
							select @p_recipient_user_id = c.user_id, 
								@p_recipient_employee_id = b.employee_id,
								@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
								@p_recipient_email_id = b.email_id, 
								@p_recipient_mobile_no = b.contact_mobile_no
							from level2_code a, employee b, users c
							where a.company_id = @i_client_id
							  and a.country_code = @i_country_code
							  and a.level2_code = @p_assigned_to_emp_org_level_code
							  and b.company_id = a.company_id
							  and b.country_code = a.country_code
							  and b.employee_id = a.head_emp_id
							  and b.employee_status = 'A'
							  and c.company_id = b.company_id
							  and c.country_code = b.country_code
							  and c.employee_id = b.employee_id
						end
						else if @p_assigned_to_emp_org_level_no = 3
						begin
							select @p_recipient_user_id = c.user_id, 
								@p_recipient_employee_id = b.employee_id,
								@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
								@p_recipient_email_id = b.email_id, 
								@p_recipient_mobile_no = b.contact_mobile_no
							from level3_code a, employee b, users c
							where a.company_id = @i_client_id
							  and a.country_code = @i_country_code
							  and a.level3_code =  @p_assigned_to_emp_org_level_code
							  and b.company_id = a.company_id
							  and b.country_code = a.country_code
							  and b.employee_id = a.head_emp_id
							  and b.employee_status = 'A'
							  and c.company_id = b.company_id
							  and c.country_code = b.country_code
							  and c.employee_id = b.employee_id
						end
						else if @p_assigned_to_emp_org_level_no = 4
						begin
							select @p_recipient_user_id = c.user_id, 
								@p_recipient_employee_id = b.employee_id,
								@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
								@p_recipient_email_id = b.email_id, 
								@p_recipient_mobile_no = b.contact_mobile_no
							from level4_code a, employee b, users c
							where a.company_id = @i_client_id
							  and a.country_code = @i_country_code
							  and a.level4_code = @p_assigned_to_emp_org_level_code
							  and b.company_id = a.company_id
							  and b.country_code = a.country_code
							  and b.employee_id = a.head_emp_id
							  and b.employee_status = 'A'
							  and c.company_id = b.company_id
							  and c.country_code = b.country_code
							  and c.employee_id = b.employee_id
						end
						else if @p_assigned_to_emp_org_level_no = 5
						begin
							select @p_recipient_user_id = c.user_id, 
								@p_recipient_employee_id = b.employee_id,
								@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
								@p_recipient_email_id = b.email_id, 
								@p_recipient_mobile_no = b.contact_mobile_no
							from level5_code a, employee b, users c
							where a.company_id = @i_client_id
							  and a.country_code = @i_country_code
							  and a.level5_code =  @p_assigned_to_emp_org_level_code
							  and b.company_id = a.company_id
							  and b.country_code = a.country_code
							  and b.employee_id = a.head_emp_id
							  and b.employee_status = 'A'
							  and c.company_id = b.company_id
							  and c.country_code = b.country_code
							  and c.employee_id = b.employee_id
						end
							
						
					 end
					 else if @p_id_code = 'O1'
					 begin
			
							
						if @p_assigned_to_emp_org_level_no = 1 /* Escalates to same person again in this case as there is no higher level*/
						begin
							select @p_recipient_user_id = c.user_id, 
								@p_recipient_employee_id = b.employee_id,
								@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
								@p_recipient_email_id = b.email_id, 
								@p_recipient_mobile_no = b.contact_mobile_no
							from level1_code a, employee b, users c
							where a.company_id = @i_client_id
							  and a.country_code = @i_country_code
							  and a.level1_code = @p_assigned_to_emp_org_level_code
							  and b.company_id = a.company_id
							  and b.country_code = a.country_code
							  and b.employee_id = a.head_emp_id
							  and b.employee_status = 'A'
							  and c.company_id = b.company_id
							  and c.country_code = b.country_code
							  and c.employee_id = b.employee_id
						end	
						else if @p_assigned_to_emp_org_level_no = 2
						begin
							select @p_recipient_user_id = c.user_id, 
								@p_recipient_employee_id = b.employee_id,
								@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
								@p_recipient_email_id = b.email_id, 
								@p_recipient_mobile_no = b.contact_mobile_no
							from level1_code a, employee b, users c
							where a.company_id = @i_client_id
							  and a.country_code = @i_country_code
							  and a.level1_code = 
							    (
									select a.level1_code
									from level2_code a
									where a.company_id = @i_client_id
									  and a.country_code = @i_country_code
									  and a.level2_code = @p_assigned_to_emp_org_level_code
							     ) 
							  and b.company_id = a.company_id
							  and b.country_code = a.country_code
							  and b.employee_id = a.head_emp_id
							  and b.employee_status = 'A'
							  and c.company_id = b.company_id
							  and c.country_code = b.country_code
							  and c.employee_id = b.employee_id
							  
						end
						else if @p_assigned_to_emp_org_level_no = 3
						begin
							select @p_recipient_user_id = c.user_id, 
									@p_recipient_employee_id = b.employee_id,
									@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
									@p_recipient_email_id = b.email_id, 
									@p_recipient_mobile_no = b.contact_mobile_no
								from level2_code a, employee b, users c
								where a.company_id = @i_client_id
								  and a.country_code = @i_country_code
								  and a.level2_code = 
									(
										select a.level2_code
										from level3_code a
										where a.company_id = @i_client_id
										  and a.country_code = @i_country_code
										  and a.level3_code = @p_assigned_to_emp_org_level_code
									 ) 
								  and b.company_id = a.company_id
								  and b.country_code = a.country_code
								  and b.employee_id = a.head_emp_id
								  and b.employee_status = 'A'
								  and c.company_id = b.company_id
								  and c.country_code = b.country_code
								  and c.employee_id = b.employee_id
						end
						else if @p_assigned_to_emp_org_level_no = 4
						begin
							select @p_recipient_user_id = c.user_id, 
									@p_recipient_employee_id = b.employee_id,
									@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
									@p_recipient_email_id = b.email_id, 
									@p_recipient_mobile_no = b.contact_mobile_no
								from level3_code a, employee b, users c
								where a.company_id = @i_client_id
								  and a.country_code = @i_country_code
								  and a.level3_code = 
									(
										select a.level3_code
										from level4_code a
										where a.company_id = @i_client_id
										  and a.country_code = @i_country_code
										  and a.level4_code = @p_assigned_to_emp_org_level_code
									 ) 
								  and b.company_id = a.company_id
								  and b.country_code = a.country_code
								  and b.employee_id = a.head_emp_id
								  and b.employee_status = 'A'
								  and c.company_id = b.company_id
								  and c.country_code = b.country_code
								  and c.employee_id = b.employee_id
						end
						else if @p_assigned_to_emp_org_level_no = 5
						begin
							select @p_recipient_user_id = c.user_id, 
									@p_recipient_employee_id = b.employee_id,
									@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
									@p_recipient_email_id = b.email_id, 
									@p_recipient_mobile_no = b.contact_mobile_no
								from level4_code a, employee b, users c
								where a.company_id = @i_client_id
								  and a.country_code = @i_country_code
								  and a.level4_code = 
									(
										select a.level4_code
										from level5_code a
										where a.company_id = @i_client_id
										  and a.country_code = @i_country_code
										  and a.level5_code = @p_assigned_to_emp_org_level_code
									 ) 
								  and b.company_id = a.company_id
								  and b.country_code = a.country_code
								  and b.employee_id = a.head_emp_id
								  and b.employee_status = 'A'
								  and c.company_id = b.company_id
								  and c.country_code = b.country_code
								  and c.employee_id = b.employee_id
						
						end
							
						
					 end
					 else if @p_id_code = 'O2'
					 begin
				
						if @p_assigned_to_emp_org_level_no = 1 /* Escalates to same person again in this case as there is no higher level*/
						begin
							select @p_recipient_user_id = c.user_id, 
								@p_recipient_employee_id = b.employee_id,
								@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
								@p_recipient_email_id = b.email_id, 
								@p_recipient_mobile_no = b.contact_mobile_no
							from level1_code a, employee b, users c
							where a.company_id = @i_client_id
							  and a.country_code = @i_country_code
							  and a.level1_code = @p_assigned_to_emp_org_level_code
							  and b.company_id = a.company_id
							  and b.country_code = a.country_code
							  and b.employee_id = a.head_emp_id
							  and b.employee_status = 'A'
							  and c.company_id = b.company_id
							  and c.country_code = b.country_code
							  and c.employee_id = b.employee_id
						end	
						else if @p_assigned_to_emp_org_level_no = 2 /* Escalated to O1 head again in case of level2 */
						begin
						
							select @p_recipient_user_id = c.user_id, 
								@p_recipient_employee_id = b.employee_id,
								@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
								@p_recipient_email_id = b.email_id, 
								@p_recipient_mobile_no = b.contact_mobile_no
							from level1_code a, employee b, users c
							where a.company_id = @i_client_id
							  and a.country_code = @i_country_code
							  and a.level1_code = 
							  	  (
									select a.level1_code
									from level2_code a
									where a.company_id = @i_client_id
									  and a.country_code = @i_country_code
									  and a.level2_code = @p_assigned_to_emp_org_level_code
							     ) 
							  and b.company_id = a.company_id
							  and b.country_code = a.country_code
							  and b.employee_id = a.head_emp_id
							  and b.employee_status = 'A'
							  and c.company_id = b.company_id
							  and c.country_code = b.country_code
							  and c.employee_id = b.employee_id
							  
						end
						else if @p_assigned_to_emp_org_level_no = 3
						begin
							select @p_recipient_user_id = c.user_id, 
								@p_recipient_employee_id = b.employee_id,
								@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
								@p_recipient_email_id = b.email_id, 
								@p_recipient_mobile_no = b.contact_mobile_no
							from level1_code a, employee b, users c
							where a.company_id = @i_client_id
							  and a.country_code = @i_country_code
							  and a.level1_code = 
							    (
									select a.level1_code
									from level3_code a
									where a.company_id = @i_client_id
									  and a.country_code = @i_country_code
									  and a.level3_code = @p_assigned_to_emp_org_level_code
							     ) 
							  and b.company_id = a.company_id
							  and b.country_code = a.country_code
							  and b.employee_id = a.head_emp_id
							  and b.employee_status = 'A'
							  and c.company_id = b.company_id
							  and c.country_code = b.country_code
							  and c.employee_id = b.employee_id
						end
						else if @p_assigned_to_emp_org_level_no = 4
						begin
				
							select @p_recipient_user_id = c.user_id, 
									@p_recipient_employee_id = b.employee_id,
									@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
									@p_recipient_email_id = b.email_id, 
									@p_recipient_mobile_no = b.contact_mobile_no
								from level2_code a, employee b, users c
								where a.company_id = @i_client_id
								  and a.country_code = @i_country_code
								  and a.level2_code = 
									(
										select a.level2_code
										from level4_code a
										where a.company_id = @i_client_id
										  and a.country_code = @i_country_code
										  and a.level4_code = @p_assigned_to_emp_org_level_code
									 ) 
								  and b.company_id = a.company_id
								  and b.country_code = a.country_code
								  and b.employee_id = a.head_emp_id
								  and c.company_id = b.company_id
								  and c.country_code = b.country_code
								  and c.employee_id = b.employee_id
								  and b.employee_status = 'A'
						end
						else if @p_assigned_to_emp_org_level_no = 5
						begin
				
							select @p_recipient_user_id = c.user_id, 
									@p_recipient_employee_id = b.employee_id,
									@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
									@p_recipient_email_id = b.email_id, 
									@p_recipient_mobile_no = b.contact_mobile_no
								from level3_code a, employee b, users c
								where a.company_id = @i_client_id
								  and a.country_code = @i_country_code
								  and a.level3_code = 
									(
										select a.level3_code
										from level5_code a
										where a.company_id = @i_client_id
										  and a.country_code = @i_country_code
										  and a.level5_code = @p_assigned_to_emp_org_level_code
									 ) 
								  and b.company_id = a.company_id
								  and b.country_code = a.country_code
								  and b.employee_id = a.head_emp_id
								  and c.company_id = b.company_id
								  and c.country_code = b.country_code
								  and c.employee_id = b.employee_id
								  and b.employee_status = 'A'
						
						end
							
						
					 end
					 
					
				/***/
			end
			else if @p_id_type = 'SU'
			begin
			
				if @p_notification_template_id like 'CALL_%' 
				begin

				
					select @p_call_no = isnull(TEXT,'')
					from #notification_info
					where notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select top(1) id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'call_no')

		
					/* Check if the call is assigned */					         
					select  @p_requestor_employee_id = c.employee_id
					from call_register a, call_assignment b, employee c, users d
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.call_ref_no = @p_call_no
					  and a.company_id = b.company_id
					  and a.country_code = b.country_code
					  and b.call_ref_no = @p_call_no
					  and b.primary_resource_ind = 1
					  and a.company_id = c.company_id
					  and a.country_code = c.country_code
					  and b.resource_emp_id = c.employee_id
					  and c.company_id = d.company_id
					  and c.country_code = d.country_code
					  and c.employee_id = d.employee_id
					  and c.employee_status = 'A'
					  
					 if isnull(@p_requestor_employee_id,'') = ''
					 begin
					 
						/* Get the employee id of the creator */
					
						select  @p_requestor_employee_id = c.employee_id
						from call_register a, employee c
						where a.company_id = @i_client_id
						  and a.country_code = @i_country_code
						  and a.call_ref_no = @p_call_no
						  and a.company_id = c.company_id
						  and a.country_code = c.country_code
						  and a.created_by_employee_id = c.employee_id
						  and c.employee_status = 'A'
						  			
					 end
				end
				else if @p_notification_template_id like 'JO_%'
				begin
									
					select @p_jo_no = isnull(TEXT,'')
					from #notification_info
					where  notification_id = @p_notification_id
					  and notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'jo_no')
         
					select  @p_requestor_employee_id = a.assigned_to_emp_id
					from job_order_properties a, employee b
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.project_id = @p_jo_no
					  and a.company_id = b.company_id
					  and a.country_code = b.country_code
					  and a.assigned_to_emp_id = b.employee_id
					  and b.employee_status = 'A'
					  
					if isnull(@p_requestor_employee_id,'') = ''
					begin
					
						/* Select creator's employee id */
						select  @p_requestor_employee_id = b.employee_id
						from job_order_properties a, users b
						where a.company_id = @i_client_id
						  and a.country_code = @i_country_code
						  and a.project_id = @p_jo_no
						  and a.company_id = b.company_id
						  and a.country_code = b.country_code
						  and a.generated_by_user_id = b.user_id
						
						
					end
				end
				else if @p_notification_template_id like 'INVOICE_%'
				begin
				
				/* Need to separate these snippets for each event code */
									
					select @p_invoice_no = isnull(TEXT,'')
					from #notification_info
					where  notification_id = @p_notification_id
					  and notification_id = @p_notification_id
					  and localname = '#text'
					  and parentid = (select id from #notification_info
									  where notification_id = @p_notification_id
										and localname = 'invoice_no')
         
					select @p_requestor_user_id = last_update_id /* Need to change this to 	maker's id */
					from invoice_header
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and invoice_no = @p_invoice_no
					  
					  select  @p_requestor_employee_id = b.employee_id
						from employee a, users b
						where b.company_id = @i_client_id
						  and b.country_code = @i_country_code
						  and b.user_id = @p_requestor_user_id
						  and a.company_id = b.company_id
						  and a.country_code = b.country_code
						  and a.employee_id = b.employee_id
						  and a.employee_status = 'A'
				
				end
				
				if @p_id_code = 'SUPVSR1'
				begin
				
				select  @p_recipient_user_id = '', 
						@p_recipient_employee_id = '',
						@p_recipient_name = '',
						@p_recipient_email_id = '', 
						@p_recipient_mobile_no = ''
					
					select  @p_recipient_user_id = c.user_id, 
						@p_recipient_employee_id = b.employee_id,
						@p_recipient_name = b.title+' '+b.first_name+' '+isnull(b.middle_name,'')+' '+b.last_name,
						@p_recipient_email_id = b.email_id, 
						@p_recipient_mobile_no = b.contact_mobile_no
					from employee a, employee b, users c
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.employee_id = @p_requestor_employee_id
					  and a.employee_status = 'A'
					  and b.company_id = a.company_id
					  and b.country_code = a.country_code
					  and b.employee_id = a.supervisor_emp_id
					  and b.employee_status = 'A'
					  and c.company_id = b.company_id
					  and c.country_code = b.country_code
					  and c.employee_id = b.employee_id
			
				end
				else if @p_id_code = 'SUPVSR2'
				begin
				
				select  @p_recipient_user_id = '', 
						@p_recipient_employee_id = '',
						@p_recipient_name = '',
						@p_recipient_email_id = '', 
						@p_recipient_mobile_no = ''
					
					select  @p_recipient_user_id = d.user_id, 
						@p_recipient_employee_id = c.employee_id,
						@p_recipient_name = c.title+' '+c.first_name+' '+isnull(c.middle_name,'')+' '+c.last_name,
						@p_recipient_email_id = c.email_id, 
						@p_recipient_mobile_no = c.contact_mobile_no
					from employee a, employee b, employee c, users d
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.employee_id = @p_requestor_employee_id
					  and a.employee_status = 'A'
					  and b.company_id = a.company_id
					  and b.country_code = a.country_code
					  and b.employee_id = a.supervisor_emp_id
					  and b.employee_status = 'A'
					  and c.company_id = b.company_id
					  and c.country_code = b.country_code
					  and c.employee_id = b.supervisor_emp_id
					  and c.employee_status = 'A'
					  and d.company_id = c.company_id
					  and d.country_code = c.country_code
					  and d.employee_id = c.supervisor_emp_id
				
				end
				else if @p_id_code = 'SUPVSR3'
				begin
				
					select  @p_recipient_user_id = '', 
						@p_recipient_employee_id = '',
						@p_recipient_name = '',
						@p_recipient_email_id = '', 
						@p_recipient_mobile_no = ''
						
					select  @p_recipient_user_id = e.user_id, 
						@p_recipient_employee_id = d.employee_id,
						@p_recipient_name = d.title+' '+d.first_name+' '+isnull(d.middle_name,'')+' '+d.last_name,
						@p_recipient_email_id = d.email_id, 
						@p_recipient_mobile_no = d.contact_mobile_no
					from employee a, employee b, employee c, employee d, users e
					where a.company_id = @i_client_id
					  and a.country_code = @i_country_code
					  and a.employee_id = @p_requestor_employee_id
					  and a.employee_status = 'A'
					  and b.company_id = a.company_id
					  and b.country_code = a.country_code
					  and b.employee_id = a.supervisor_emp_id
					  and b.employee_status = 'A'
					  and c.company_id = b.company_id
					  and c.country_code = b.country_code
					  and c.employee_id = b.supervisor_emp_id
					  and c.employee_status = 'A'
					  and d.company_id = c.company_id
					  and d.country_code = c.country_code
					  and d.employee_id = c.supervisor_emp_id
					  and d.employee_status = 'A'
					  and e.company_id = d.company_id
					  and e.country_code = d.country_code
					  and e.employee_id = d.supervisor_emp_id
		
					  
				end
			end
			
			if (@p_recipient_email_id  = '')
				select @p_recipient_email_id = 'selfservit@gmail.com'
			
			if not exists ( select 1 from #notification_recipients_list
							where notification_id = @p_notification_id
							  and notification_event_code = @p_notification_event_code
							  and notification_mode = @p_notification_mode
							  and recipient_employee_id = isnull(@p_recipient_employee_id, 'NOEMPID'))
			begin				  
			
				insert #notification_recipients_list
				(
					notification_id,
					notification_event_code,
					notification_mode,
					recipient_type,
					recipient_employee_id,
					recipient_name,
					recipient_user_id,
					recipient_email_id,
					recipient_mobile_no,
					notification_xml
				) 	
				values
				(
					@p_notification_id, @p_notification_event_code, @p_notification_mode,
					@p_recipient_type, isnull(@p_recipient_employee_id, 'NOEMPID'), 
					isnull(@p_recipient_name, ''),
					isnull(@p_recipient_user_id,'NOUSRID'),
					isnull(@p_recipient_email_id, 'selfservit@gmail.com'), isnull(@p_recipient_mobile_no,'NOMOBILENO'),
					@p_notification_xml
				)

				if @@ROWCOUNT = 0
				begin
					select @o_retrieve_status = 'SP001'
					close notification_list_cursor
					deallocate notification_list_cursor
					return
				end
			end

		
			
			fetch notification_recipients_cursor into 
				@p_notification_mode, 
				@p_notification_template_id , 
				@p_recipient_type, 
				@p_id_type, 
				 @p_org_level_no, 
				 @p_id_code 
	

			end /* notifications recipients cursor while fetch status */
	
		
		close notification_recipients_cursor
		deallocate notification_recipients_cursor
		end /* if try_cast is not null */
		else
		begin
			 insert notification_log_delivery
			 (
				company_id, country_code, notification_id, delivery_status, delivery_remarks,
				last_update_id
			 )
			 select @i_client_id, @i_country_code, @p_notification_id, 'INCXML', 'Wrong XML', 'system'

	  end
		
	 end /*	if exists ( select 1 from company_notification a
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and notification_Event_code = @p_notification_event_code
				  and active_ind = 1)

			*/
	 				
	fetch next from notification_list_cursor into 
	@p_notification_id, @p_notification_event_code, @p_requestor_user_id,@p_notification_xml
	
	end
	
	close notification_list_cursor
	deallocate notification_list_cursor
	
	
	if exists ( select 1 from notification_log_recipients_list a, #notification_recipients_list b
				where a.company_id = @i_client_id
				  and a.country_code = @i_country_code
				  and a.notification_id = b.notification_id)
	begin
	
		delete notification_log_recipients_list
		from #notification_recipients_list b
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and notification_log_recipients_list.notification_id = b.notification_id
	end
	
	
	insert notification_log_recipients_list
	(company_id, country_code, notification_event_code,
	 notification_id, notification_mode, recipient_employee_id,recipient_name,
	 recipient_user_id, recipient_type, recipient_email_id, recipient_mobile_no, last_update_id)
	 select distinct @i_client_id, @i_country_code, notification_event_code,
	 notification_id, notification_mode, recipient_employee_id, recipient_name,
	 recipient_user_id, recipient_type, recipient_email_id, recipient_mobile_no,
	 @i_user_id
	 from #notification_recipients_list

		insert notification_log_delivery
			 (
				company_id, country_code, notification_id, delivery_status, delivery_remarks,
				last_update_id
			 )
			 select distinct @i_client_id, @i_country_code, notification_id, '', '', 'system'
			 from #notification_recipients_list
	
	 /* if recipient employee id is NOEMPID, set delivery status to 'Delivered' */
	  update notification_log_delivery
	 set delivery_status = 'D',
		 delivery_remarks = 'NOEMPID'
	 where company_id = @i_client_id
	   and country_code = @i_country_code
	   and notification_id in 
			( select notification_id from #notification_recipients_list
			  where (recipient_employee_id like 'NO%EMPID'
					 or
					 recipient_email_id = 'selfservit@gmail.com')
			    and notification_mode = 'EMAIL'		 
			    and recipient_type = 'To'
			  )
	
	 /* if recipient mobile no is empty*/
	 update notification_log_delivery
	 set delivery_status = 'D',
		delivery_remarks = 'NORECPMOBILENO'
	 where company_id = @i_client_id
	   and country_code = @i_country_code
	   and notification_id in 
			( select notification_id from #notification_recipients_list
			  where notification_mode = 'SMS'
			    and (recipient_mobile_no in ('','NOFREMPMOBILE')
			        or
			        SUBSTRING(recipient_mobile_no,1,2) in ('04','02','01')
			        or SUBSTRING(recipient_mobile_no,1,1) in ('4','2'))
			    and recipient_type = 'To'
			  )
	
		
	 SELECT distinct 
        '' as notification_header, /* dummy column aliased by result set name */
        a.notification_id as o_notification_id, /* integer */
        @i_client_id as o_n_company_code, /* string */
        @i_country_code as o_n_country_code, /* string */
        a.notification_event_code as o_n_event_code, /* string */
        a.notification_xml as o_n_info_xml /* unicode string */
    FROM #notification_recipients_list a
	
    -- Result set 2: outputparam_detail_n_mode_detail

    SELECT distinct 
        '' as outputparam_detail_n_mode_detail, /* dummy column aliased by result set name */
        a.notification_id as o_notification_id, /* integer */
        c.notification_mode as o_n_mode, /* string */
        c.notification_template_id as o_n_template_id,
       CAST( cast(c.attachment_avl_ind as tinyint) as varchar(1)) as o_n_attachment_avl_ind /* string */
    FROM #notification_recipients_list a , company_notification_mode_preference c
    where c.company_id = @i_client_id
	  and c.country_code = @i_country_code
	  and a.notification_event_code = c.notification_event_code
 
    
    -- Result set 3: outputparam_detail_n_recipient_detail

    SELECT distinct 
        '' as outputparam_detail_n_recipient_detail, /* dummy column aliased by result set name */
        c.notification_mode as o_n_mode, /* string */
        d.notification_id as o_notification_id, /* integer */
        d.recipient_type as o_n_recipient_type, /* string */
        d.recipient_user_id as o_n_recipient_user_id, /* unicode string */
        d.recipient_employee_id as o_n_recipient_employee_id, /* unicode string */
        d.recipient_name as o_n_recipient_name,
        d.recipient_email_id as o_n_recipient_email_id, /* unicode string */
        d.recipient_mobile_no as o_n_recipient_mobile_no /* string */
	FROM company_notification_mode_preference c, #notification_recipients_list d
	where c.company_id = @i_client_id
	  and c.country_code = @i_country_code
	  and d.notification_event_code = c.notification_event_code
	  and d.notification_mode = c.notification_mode
 
  if @@ROWCOUNT != 0
    set @o_retrieve_status = ''
  else
    set @o_retrieve_status = 'SP001'
    

    SET NOCOUNT OFF;
END

/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_mserviceAI_transactionMessagesList]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_mserviceAI_transactionMessagesList')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_mserviceAI_transactionMessagesList]
END
GO
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_mserviceAI_transactionMessagesList]    Script Date: 4/10/2023 2:00:54 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* 
* function to activate / deactivate user access
*/
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_mserviceAI_transactionMessagesList]
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

	declare @p_transaction_type nvarchar(50),
		@p_request_ref_no nvarchar(50),
		@p_scrID varchar(100)

	create table #txnMsgList (
		creation_date datetimeoffset(7),
		listJson nvarchar(max)
	)

	/* GET THE INPUT DETAILS FROM MESSAGE PAYLOAD */
	select @p_transaction_type = isnull(json_value(@i_inputparam_xml, '$.transaction_type'), '')
	select @p_request_ref_no = isnull(json_value(@i_inputparam_xml, '$.request_ref_no'), '')
	select @p_scrID = isnull(json_value(@i_inputparam_xml, '$.scrID'), '')


	if (@p_transaction_type = 'CALL') --SUGGESTION LIST TO RETURN NEXT ACTION
	begin

		insert #txnMsgList (creation_date, listJson)
		select event_date, '{' + 
				'"autoReply": "true",' +
				'"key": "transaction_messages",' +
				'"subKey": "' + call_ref_no + '",' +
				'"from": {' +
					'"id": "system",' +
					'"name": "",' +
					'"initial": "",' +
					'"channel": "web",' +
					'"sysMsg": "true"' +
				'},' +
				'"to": [{' +
						'"id": "system",' +
						'"name": "",' +
						'"initial": ""' +
					'}' +
				'],' +
				'"attachments": [],' +
				'"msgType": "text",' +
				'"content": "' + 
							(case (select 1 from ancillary_request_register_actions
									where company_id = @i_client_id
										and country_code = @i_country_code
										and action_category = 'LINK'
										and action_type in ('SERVAGAINSTQUERY','ENQAGAINSTQUERY')
										and sys_gen_request_ref_no = call_ref_no
										and to_status = 'O')
								when 1 then ( 'This Ticket was created against the Query Ticket No : ' + (select request_ref_no from ancillary_request_register_actions
										where company_id = @i_client_id
											and country_code = @i_country_code
											and action_category = 'LINK'
											and action_type in ('SERVAGAINSTQUERY','ENQAGAINSTQUERY')
											and sys_gen_request_ref_no = call_ref_no) + '</br>Ticket No : ' + call_ref_no)
								else ( 'Ticket No : ' + call_ref_no)
							end)
							 + ' moved to ' + 
							isnull((select
								case(	
									select 1 from code_table_mlingual_translation f
									where f.company_id = @i_client_id
										and f.country_code = @i_country_code
										and f.locale_id = @i_locale_id
										and f.code_type = 'CALLSTATUS'
										and f.code = b.code)			
								when 1 then(
									select e.short_description from code_table_mlingual_translation e
									where e.company_id = @i_client_id
									and e.country_code = @i_country_code
									and e.locale_id = @i_locale_id
									and e.code_type = 'CALLSTATUS'
									and e.code = b.code)
								else(
									select g.short_description from code_table_mlingual_translation g
									where g.company_id = @i_client_id
										and g.country_code = @i_country_code
										and g.locale_id = 'ALL'
										and g.code_type = 'CALLSTATUS'
										and g.code = b.code)
								end
							from code_table b
							where b.company_id = @i_client_id
								and b.country_code = @i_country_code
								and b.code = to_status
								and b.code_type = 'CALLSTATUS'), '') + 
							' on ' + CONVERT(varchar, event_date, 106) + ' by ' +
							ISNULL((select l.title + '.' + l.first_name + ' ' + isnull(l.middle_name, '') + ' ' + l.last_name
							from employee l
							where l.company_id = @i_client_id
								and l.country_code = @i_country_code
								and l.employee_id = by_employee_id), '') + '",' +				
				'"translations": "",' +
				'"followup": "",' +
				'"actionPath": "",' +
				'"suggestions": [],' +
				'"actions": [],' +
				'"allowMsg": "false",' +
				'"allowAttach": "false",' +
				'"idleTime": "",' +
				'"refreshHeader": "",' +
				'"scrID": "' + @p_scrID + '",' +
				'"info": {' +
					'"id": "' + format(event_date,'yyyyMMddHHmmssfff') + '",' +
					'"date": "' + format(event_date,'yyyy-MM-dd') + '",' +
					'"hour": "' + format(event_date,'HH') + '",' +
					'"min": "' + format(event_date,'mm') + '",' +
					'"sec": "' + format(event_date,'ss') + '",' +
					'"type": "chat"' +
				'}' +
			'}'
		from call_status_event_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @p_request_ref_no

		insert #txnMsgList (creation_date, listJson)
		select sysdatetimeoffset(), '{' + 
				'"autoReply": "true",' +
				'"key": "transaction_messages",' +
				'"subKey": "' + call_ref_no + '",' +
				'"from": {' +
					'"id": "system",' +
					'"name": "",' +
					'"initial": "",' +
					'"channel": "web",' +
					'"sysMsg": "true"' +
				'},' +
				'"to": [{' +
						'"id": "system",' +
						'"name": "",' +
						'"initial": ""' +
				'}],' +
				'"attachments": [{' +
					'"type":"' + attachment_file_type + '",' +
					'"name":"' + attachment_file_name + '",' +
					'"src":"' + replace('call_attachments', '\', '\\') + '/' + call_ref_no + '/' + attachment_file_name + '"' +
				'}],' +
				'"msgType": "attachment",' +
				'"content": "",' +
				'"translations": "",' +
				'"followup": "",' +
				'"actionPath": "",' +
				'"suggestions": [],' +
				'"actions": [],' +
				'"allowMsg": "false",' +
				'"allowAttach": "false",' +
				'"idleTime": "",' +
				'"refreshHeader": "",' +
				'"scrID": "' + @p_scrID + '",' +
				'"info": {' +
					'"id": "' + format(sysdatetimeoffset(),'yyyyMMddHHmmssfff') + cast(row_number() over (order by call_ref_no) as nvarchar(12)) + '",' +
					'"date": "' + format(sysdatetimeoffset(),'yyyy-MM-dd') + '",' +
					'"hour": "' + format(sysdatetimeoffset(),'HH') + '",' +
					'"min": "' + format(sysdatetimeoffset(),'mm') + '",' +
					'"sec": "' + format(sysdatetimeoffset(),'ss') + '",' +
					'"type": "chat"' +
				'}' +
			'}' as o_custom_info_json
		from call_user_attachments
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @p_request_ref_no

	end
	
	if (@p_transaction_type = 'QUOTATION') --SUGGESTION LIST TO RETURN NEXT ACTION
	begin

		insert #txnMsgList (creation_date, listJson)
		select event_date, '{' + 
				'"autoReply": "true",' +
				'"key": "transaction_messages",' +
				'"subKey": "' + quotation_no + '",' +
				'"from": {' +
					'"id": "system",' +
					'"name": "",' +
					'"initial": "",' +
					'"channel": "web",' +
					'"sysMsg": "true"' +
				'},' +
				'"to": [{' +
						'"id": "system",' +
						'"name": "",' +
						'"initial": ""' +
					'}' +
				'],' +
				'"attachments": [],' +
				'"msgType": "text",' +
				'"content": "' + 'Ticket No : ' + quotation_no + ' moved to ' + 
							isnull((select
								case(	
									select 1 from code_table_mlingual_translation f
									where f.company_id = @i_client_id
										and f.country_code = @i_country_code
										and f.locale_id = @i_locale_id
										and f.code_type = 'QUOTSTATUS'
										and f.code = b.code)			
								when 1 then(
									select e.short_description from code_table_mlingual_translation e
									where e.company_id = @i_client_id
									and e.country_code = @i_country_code
									and e.locale_id = @i_locale_id
									and e.code_type = 'QUOTSTATUS'
									and e.code = b.code)
								else(
									select g.short_description from code_table_mlingual_translation g
									where g.company_id = @i_client_id
										and g.country_code = @i_country_code
										and g.locale_id = 'ALL'
										and g.code_type = 'QUOTSTATUS'
										and g.code = b.code)
								end
							from code_table b
							where b.company_id = @i_client_id
								and b.country_code = @i_country_code
								and b.code = to_status
								and b.code_type = 'QUOTSTATUS'), '') + 
							' on ' + CONVERT(varchar, event_date, 106) + ' by ' +
							ISNULL((select l.title + '.' + l.first_name + ' ' + isnull(l.middle_name, '') + ' ' + l.last_name
							from employee l
							where l.company_id = @i_client_id
								and l.country_code = @i_country_code
								and l.employee_id = by_employee_id), '') + '",' +				
				'"translations": "",' +
				'"followup": "",' +
				'"actionPath": "",' +
				'"suggestions": [],' +
				'"actions": [],' +
				'"allowMsg": "false",' +
				'"allowAttach": "false",' +
				'"idleTime": "",' +
				'"refreshHeader": "",' +
				'"scrID": "' + @p_scrID + '",' +
				'"info": {' +
					'"id": "' + format(event_date,'yyyyMMddHHmmssfff') + '",' +
					'"date": "' + format(event_date,'yyyy-MM-dd') + '",' +
					'"hour": "' + format(event_date,'HH') + '",' +
					'"min": "' + format(event_date,'mm') + '",' +
					'"sec": "' + format(event_date,'ss') + '",' +
					'"type": "chat"' +
				'}' +
			'}'
		from quotation_status_event_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and replace(quotation_no,'/','-') = @p_request_ref_no

		insert #txnMsgList (creation_date, listJson)
		select sysdatetimeoffset(), '{' + 
				'"autoReply": "true",' +
				'"key": "transaction_messages",' +
				'"subKey": "' + quotation_no + '",' +
				'"from": {' +
					'"id": "system",' +
					'"name": "",' +
					'"initial": "",' +
					'"channel": "web",' +
					'"sysMsg": "true"' +
				'},' +
				'"to": [{' +
						'"id": "system",' +
						'"name": "",' +
						'"initial": ""' +
				'}],' +
				'"attachments": [{' +
					'"type":"' + attachment_file_type + '",' +
					'"name":"' + attachment_file_name + '",' +
					'"src":"' + replace('quotation_attachments', '\', '\\') + '/' + quotation_no + '/' + attachment_file_name + '"' +
				'}],' +
				'"msgType": "attachment",' +
				'"content": "",' +
				'"translations": "",' +
				'"followup": "",' +
				'"actionPath": "",' +
				'"suggestions": [],' +
				'"actions": [],' +
				'"allowMsg": "false",' +
				'"allowAttach": "false",' +
				'"idleTime": "",' +
				'"refreshHeader": "",' +
				'"scrID": "' + @p_scrID + '",' +
				'"info": {' +
					'"id": "' + format(sysdatetimeoffset(),'yyyyMMddHHmmssfff') + cast(row_number() over (order by quotation_no) as nvarchar(12)) + '",' +
					'"date": "' + format(sysdatetimeoffset(),'yyyy-MM-dd') + '",' +
					'"hour": "' + format(sysdatetimeoffset(),'HH') + '",' +
					'"min": "' + format(sysdatetimeoffset(),'mm') + '",' +
					'"sec": "' + format(sysdatetimeoffset(),'ss') + '",' +
					'"type": "chat"' +
				'}' +
			'}' as o_custom_info_json
		from quotation_user_attachments
		where company_id = @i_client_id
			and country_code = @i_country_code
			and replace(quotation_no,'/','-') = @p_request_ref_no

	end

	if (@p_transaction_type = 'SALESINVOICE') --SUGGESTION LIST TO RETURN NEXT ACTION
	begin

		insert #txnMsgList (creation_date, listJson)
		select event_date, '{' + 
				'"autoReply": "true",' +
				'"key": "transaction_messages",' +
				'"subKey": "' + invoice_no + '",' +
				'"from": {' +
					'"id": "system",' +
					'"name": "",' +
					'"initial": "",' +
					'"channel": "web",' +
					'"sysMsg": "true"' +
				'},' +
				'"to": [{' +
						'"id": "system",' +
						'"name": "",' +
						'"initial": ""' +
					'}' +
				'],' +
				'"attachments": [],' +
				'"msgType": "text",' +
				'"content": "' + 'Ticket No : ' + invoice_no + ' moved to ' + 
							isnull((select
								case(	
									select 1 from code_table_mlingual_translation f
									where f.company_id = @i_client_id
										and f.country_code = @i_country_code
										and f.locale_id = @i_locale_id
										and f.code_type = 'SINVSTATUS'
										and f.code = b.code)			
								when 1 then(
									select e.short_description from code_table_mlingual_translation e
									where e.company_id = @i_client_id
									and e.country_code = @i_country_code
									and e.locale_id = @i_locale_id
									and e.code_type = 'SINVSTATUS'
									and e.code = b.code)
								else(
									select g.short_description from code_table_mlingual_translation g
									where g.company_id = @i_client_id
										and g.country_code = @i_country_code
										and g.locale_id = 'ALL'
										and g.code_type = 'SINVSTATUS'
										and g.code = b.code)
								end
							from code_table b
							where b.company_id = @i_client_id
								and b.country_code = @i_country_code
								and b.code = to_status
								and b.code_type = 'SINVSTATUS'), '') + 
							' on ' + CONVERT(varchar, event_date, 106) + ' by ' +
							ISNULL((select l.title + '.' + l.first_name + ' ' + isnull(l.middle_name, '') + ' ' + l.last_name
							from employee l
							where l.company_id = @i_client_id
								and l.country_code = @i_country_code
								and l.employee_id = by_employee_id), '') + '",' +				
				'"translations": "",' +
				'"followup": "",' +
				'"actionPath": "",' +
				'"suggestions": [],' +
				'"actions": [],' +
				'"allowMsg": "false",' +
				'"allowAttach": "false",' +
				'"idleTime": "",' +
				'"refreshHeader": "",' +
				'"scrID": "' + @p_scrID + '",' +
				'"info": {' +
					'"id": "' + format(event_date,'yyyyMMddHHmmssfff') + '",' +
					'"date": "' + format(event_date,'yyyy-MM-dd') + '",' +
					'"hour": "' + format(event_date,'HH') + '",' +
					'"min": "' + format(event_date,'mm') + '",' +
					'"sec": "' + format(event_date,'ss') + '",' +
					'"type": "chat"' +
				'}' +
			'}'
		from salesinvoice_status_event_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and replace(invoice_no,'/','-') = @p_request_ref_no

		insert #txnMsgList (creation_date, listJson)
		select sysdatetimeoffset(), '{' + 
				'"autoReply": "true",' +
				'"key": "transaction_messages",' +
				'"subKey": "' + invoice_no + '",' +
				'"from": {' +
					'"id": "system",' +
					'"name": "",' +
					'"initial": "",' +
					'"channel": "web",' +
					'"sysMsg": "true"' +
				'},' +
				'"to": [{' +
						'"id": "system",' +
						'"name": "",' +
						'"initial": ""' +
				'}],' +
				'"attachments": [{' +
					'"type":"' + attachment_file_type + '",' +
					'"name":"' + attachment_file_name + '",' +
					'"src":"' + replace('call_attachments', '\', '\\') + '/' + invoice_no + '/' + attachment_file_name + '"' +
				'}],' +
				'"msgType": "attachment",' +
				'"content": "",' +
				'"translations": "",' +
				'"followup": "",' +
				'"actionPath": "",' +
				'"suggestions": [],' +
				'"actions": [],' +
				'"allowMsg": "false",' +
				'"allowAttach": "false",' +
				'"idleTime": "",' +
				'"refreshHeader": "",' +
				'"scrID": "' + @p_scrID + '",' +
				'"info": {' +
					'"id": "' + format(sysdatetimeoffset(),'yyyyMMddHHmmssfff') + cast(row_number() over (order by invoice_no) as nvarchar(12)) + '",' +
					'"date": "' + format(sysdatetimeoffset(),'yyyy-MM-dd') + '",' +
					'"hour": "' + format(sysdatetimeoffset(),'HH') + '",' +
					'"min": "' + format(sysdatetimeoffset(),'mm') + '",' +
					'"sec": "' + format(sysdatetimeoffset(),'ss') + '",' +
					'"type": "chat"' +
				'}' +
			'}' as o_custom_info_json
		from salesinvoice_user_attachments
		where company_id = @i_client_id
			and country_code = @i_country_code
			and replace(invoice_no,'/','-') = @p_request_ref_no

	end

	select '' as custom_info_list,
			listJson
		as o_custom_info_json
		from #txnMsgList

		order by creation_date

	select @o_retrieve_status = 'SP001'
	
	SET NOCOUNT OFF;
END


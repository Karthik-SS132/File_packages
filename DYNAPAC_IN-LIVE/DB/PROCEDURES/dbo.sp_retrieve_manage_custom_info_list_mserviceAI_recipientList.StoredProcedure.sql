DROP PROCEDURE IF EXISTS [dbo].[sp_retrieve_manage_custom_info_list_mserviceAI_recipientList]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_mserviceAI_recipientList] 
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

	declare @p_id_type varchar(2),
		@p_id_code varchar(50),
		@p_transaction_type varchar(30),
		@p_transaction_ref_no varchar(30)

	declare @p_recipient_list as table 
	(
		recipient_id nvarchar(12)
	)


	declare mserviceAI_recipient_list_cursor cursor
	for
	select json_value(value, '$.idType'),
		json_value(value, '$.idCode')
	from openjson (@i_inputparam_xml, '$.recipientList')

	open mserviceAI_recipient_list_cursor
		
	fetch next from mserviceAI_recipient_list_cursor
	into @p_id_type, @p_id_code

	while @@FETCH_STATUS = 0
	begin

		select @p_transaction_type = json_value(@i_inputparam_xml, '$.msgBody.custom.trans_type')
		select @p_transaction_ref_no = json_value(@i_inputparam_xml, '$.msgBody.custom.transaction_ref_no')

		if (@p_id_type = 'RQ') --REQUESTOR OF THE MESSAGE [MSGFROM]
		begin

			insert @p_recipient_list (recipient_id)
			select json_value(@i_inputparam_xml, '$.msgBody.from.id')

		end
		else if (@p_id_type = 'CB') --REQUEST TRANSACTION CREATED BY USER 
		begin

			if (@p_transaction_type = 'CALL')
			begin

				insert @p_recipient_list (recipient_id)
				select a.user_id 
				from users a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.employee_id = (
						select b.created_by_employee_id
						from call_register b
						where b.company_id = a.company_id
							and b.country_code = a.country_code
							and b.call_ref_no = @p_transaction_ref_no
					)

			end
			else if (@p_transaction_type = 'ANCILLARY')
			begin

				insert @p_recipient_list (recipient_id)
				select a.user_id 
				from users a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.employee_id = (
						select b.created_by_employee_id
						from ancillary_request_register b
						where b.company_id = a.company_id
							and b.country_code = a.country_code
							and b.request_ref_no = @p_transaction_ref_no
					)

			end

		end
		else if (@p_id_type = 'AT') --ASSIGNED TO EMPLOYEE
		begin

			if (@p_transaction_type = 'CALL')
			begin

				insert @p_recipient_list (recipient_id)
				select a.user_id 
				from users a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.employee_id = (
						select b.resource_emp_id
						from call_assignment b
						where b.company_id = a.company_id
							and b.country_code = a.country_code
							and b.call_ref_no = @p_transaction_ref_no
							and b.primary_resource_ind = 1
					)

			end
			else if (@p_transaction_type = 'ANCILLARY')
			begin

				insert @p_recipient_list (recipient_id)
				select a.user_id 
				from users a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.employee_id = (
						select b.resource_emp_id
						from ancillary_request_assignment b
						where b.company_id = a.company_id
							and b.country_code = a.country_code
							and b.request_ref_no = @p_transaction_ref_no
							and b.primary_resource_ind = 1
					)

			end

		end
		else if (@p_id_type = 'DC') --DEALER COORD
		begin

			if (@p_transaction_type = 'CALL')
			begin

				insert @p_recipient_list (recipient_id)
				select a.user_id 
				from users a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and user_group_id = 'DLRCOORD'

			end
			else if (@p_transaction_type = 'ANCILLARY')
			begin

				insert @p_recipient_list (recipient_id)
				select a.user_id 
				from users a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and user_group_id = 'DLRCOORD'

			end

		end

		fetch next from mserviceAI_recipient_list_cursor
		into @p_id_type, @p_id_code

	end

	close mserviceAI_recipient_list_cursor
	
	deallocate mserviceAI_recipient_list_cursor


	/* REMOVE FROM ID FROM RECIPIENT LIST IN CASE OF GENERAL MESSAGE */
	if (json_value(@i_inputparam_xml, '$.msgBody.autoReply') = 'false')
	begin

		delete from @p_recipient_list
		where recipient_id = json_value(@i_inputparam_xml, '$.msgBody.from.id')

	end
	

	select distinct '' as custom_info_list,
		recipient_id
	as o_custom_info_json
	from @p_recipient_list

	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO

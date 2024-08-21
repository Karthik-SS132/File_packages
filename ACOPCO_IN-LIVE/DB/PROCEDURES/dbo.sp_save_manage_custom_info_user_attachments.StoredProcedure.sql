DROP PROCEDURE IF EXISTS[dbo].[sp_save_manage_custom_info_user_attachments] 
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_user_attachments] 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_custom_info_code [uddt_varchar_60], 
    @i_custom_info_ref_no1 [uddt_nvarchar_60], 
    @i_custom_info_ref_no2 [uddt_nvarchar_60], 
    @i_inputparam_header_xml [uddt_nvarchar_max], 
    @i_rec_timestamp [uddt_uid_timestamp], 
    @i_save_mode [uddt_varchar_1], 
	@o_outputparam_detail_xml [uddt_nvarchar_max] OUTPUT, 
    @o_update_status [uddt_varchar_5] OUTPUT, 
	@custom_info_detail [sp_save_manage_custom_info_custom_info_detail] READONLY,
    @i_error_msg [uddt_nvarchar_max] OUTPUT
AS
BEGIN

	declare	@p_sysdatetimeoffset datetimeoffset(7),
		@p_transaction_type varchar(50), 
		@p_transaction_ref_no varchar(50), 
		@p_file_category varchar(2), 
		@p_file_type varchar(2), 
		@p_file_path nvarchar(100), 
		@p_file_name nvarchar(60), 
		@p_file_extension nvarchar(10), 
		@p_closure_report_ind char(1),
		@p_custom_info_detail_xml_string nvarchar(max), 
		@p_custom_info_detail_xml xml,
		@p_file_id nvarchar(20)


	/* GETTING THE INPUTPARAMETER VARIABLE VALUES */
	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset(@i_client_id, @i_country_code, @i_user_id)
		
	select @p_transaction_type = json_value(@i_inputparam_header_xml, '$.transaction_type')
	select @p_transaction_ref_no = json_value(@i_inputparam_header_xml, '$.transaction_ref_no')


	if (@i_save_mode = 'A')
	begin

		if exists (select 1 from @custom_info_detail)
		begin
				
			declare user_attachment_cursor cursor for
			select i_custom_info_detail_inputparam_detail_xml
			from @custom_info_detail

			open user_attachment_cursor

			fetch user_attachment_cursor into @p_custom_info_detail_xml_string

			while @@FETCH_STATUS = 0
			begin

				select @p_file_category = json_value(@p_custom_info_detail_xml_string, '$.file_category')
				select @p_file_type = json_value(@p_custom_info_detail_xml_string, '$.file_type')
				select @p_file_name = json_value(@p_custom_info_detail_xml_string, '$.file_name')
				select @p_file_extension = json_value(@p_custom_info_detail_xml_string, '$.file_extension')
				select @p_closure_report_ind = json_value(@p_custom_info_detail_xml_string, '$.closure_report_ind')

				if exists 
				(
					select 1 from category_type_link
					where company_id = @i_client_id
						and country_code = @i_country_code
						and link_type = 'FA'
						and category_code_type = 'FILECATG'
						and category_code_value = @p_file_category
						and type_code_type = 'FILEEXTNALLOWED'
						and type_code_value = @p_file_extension
				)
				begin
						
					if (@p_transaction_type = 'CALL')
					begin
					
						select @p_file_path = code
						from code_table
						where company_id = @i_client_id
							and country_code = @i_country_code
							and code_type = 'CALLATTACHPATH'


						insert call_user_attachments 
						(
							company_id, 
							country_code, 
							call_ref_no,
							attachment_file_category, 
							attachment_file_type, 
							attachment_file_name, 
							attachment_file_path, 
							closure_report_ind, 
							last_update_id
						)
						select @i_client_id, 
							@i_country_code, 
							@p_transaction_ref_no,
							@p_file_category, 
							@p_file_type,
							@p_file_name, 
							@p_file_path, 
							@p_closure_report_ind, 
							@i_user_id
								
						if @@ROWCOUNT = 0
						begin

							set @i_error_msg = '{"code":"error_user_attachment_insert"}'
							close user_attachment_cursor
							deallocate user_attachment_cursor
							return

						end


						update call_user_attachments
						set attachment_file_id = attachment_file_category + attachment_file_type + replace(str(attachment_file_sysgen_id, 5, 0), ' ' , '0')							
						where company_id = @i_client_id
							and country_code = @i_country_code
							and call_ref_no = @p_transaction_ref_no
							and attachment_file_name = @p_file_name 

						if @@ROWCOUNT = 0
						begin

							set @i_error_msg = '{"code":"error_user_attachment_update"}'
							close user_attachment_cursor
							deallocate user_attachment_cursor
							return

						end

					end
					else if (@p_transaction_type = 'EXPENSE')
					begin
							
						/* Insert logic for expense */
						return 

					end
						
				end
				else
				begin
						
					set @i_error_msg = '{"code":"error_invalid_extension"}'
					close user_attachment_cursor
					deallocate user_attachment_cursor
					return

				end					

				fetch user_attachment_cursor into @p_custom_info_detail_xml_string

			end

			close user_attachment_cursor
			deallocate user_attachment_cursor				

		end

	end
	else if (@i_save_mode = 'D')
	begin

		select @p_file_id = json_value(@i_inputparam_header_xml, '$.file_id')
		select @p_file_name = json_value(@i_inputparam_header_xml, '$.file_name')
			
		if (@p_transaction_type = 'CALL')
		begin
				
			if exists 
			(
				select 1 from call_user_attachments
				where company_id = @i_client_id
					and country_code = @i_country_code
					and call_ref_no = @p_transaction_ref_no
					and attachment_file_name = @p_file_name
			)
			begin
					
				delete call_user_attachments
				where company_id = @i_client_id
					and country_code = @i_country_code
					and call_ref_no = @p_transaction_ref_no
					and attachment_file_name = @p_file_name

				if @@ROWCOUNT = 0
				begin

					set @i_error_msg = '{"code":"error_user_attachment_delete"}'
					return

				end

			end
			else
			begin
					
				set @i_error_msg = '{"code":"error_attachment_not_exist"}'
				return

			end

		end
		else if (@p_transaction_type = 'EXPENSE')
		begin
				
			/* DELETE LOGIC FOR EXPENSE */
			return

		end

	end
		

	set @o_update_status = 'SP001'
		
END
GO

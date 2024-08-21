DROP FUNCTION IF EXISTS [dbo].[fn_get_client_specific_fields_for_my_activities]
Go
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE function [dbo].[fn_get_client_specific_fields_for_my_activities]
(
	@i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id],
	@i_request_ref_no [varchar] (30),
	@i_transaction_type [varchar] (30)
)
returns nvarchar(max)
as
begin	
	
	declare @p_function_name varchar(500), 
		@p_return_value nvarchar(max)

	/* IDENTIFY THE FUNCTION TO BE EXECUTED */
	if exists 
	(
		select 1 from sys.objects
		where type = 'FN'
			and name = 'fn_get_client_specific_fields_for_my_activities_' + @i_client_id + '_' + @i_country_code
	)
	begin	

		set @p_function_name = 'fn_get_client_specific_fields_for_my_activities_' + @i_client_id + '_' + @i_country_code

	end
	else if exists 
	(
		select 1 from sys.objects
		where type = 'FN'
			and name = 'fn_get_client_specific_fields_for_my_activities_' + @i_client_id
	)
	begin

		set @p_function_name = 'fn_get_client_specific_fields_for_my_activities_' + @i_client_id

	end


	/* GET THE CUSTOM FIELDS DEFINED */
	if (@p_function_name is not null)
	begin

		exec @p_return_value = @p_function_name 
			@i_client_id, 
			@i_country_code, 
			@i_session_id, 
			@i_user_id, 
			@i_locale_id, 
			@i_request_ref_no, 
			@i_transaction_type	

	end
	else
	begin

		select @p_return_value = ''

	end

	return @p_return_value

end



GO

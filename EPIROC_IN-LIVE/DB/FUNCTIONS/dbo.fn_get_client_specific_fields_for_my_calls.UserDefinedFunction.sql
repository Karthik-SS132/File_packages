/****** Object:  UserDefinedFunction [dbo].[fn_get_client_specific_fields_for_my_calls]    Script Date: 12/23/2021 6:28:53 PM ******/
DROP FUNCTION IF EXISTS [dbo].[fn_get_client_specific_fields_for_my_calls]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_get_client_specific_fields_for_my_calls]    Script Date: 12/23/2021 6:28:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE function [dbo].[fn_get_client_specific_fields_for_my_calls]
(
	@i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id],
	@i_transaction_ref_no [varchar] (30),
	@i_transaction_type [varchar] (1)
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
			and name = 'fn_get_client_specific_fields_for_my_calls_' + @i_client_id + '_' + @i_country_code
	)
	begin	

		set @p_function_name = 'fn_get_client_specific_fields_for_my_calls_' + @i_client_id + '_' + @i_country_code

	end
	else if exists 
	(
		select 1 from sys.objects
		where type = 'FN'
			and name = 'fn_get_client_specific_fields_for_my_calls_' + @i_client_id
	)
	begin

		set @p_function_name = 'fn_get_client_specific_fields_for_my_calls_' + @i_client_id

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
			@i_transaction_ref_no, 
			@i_transaction_type	

	end
	else
	begin

		select @p_return_value = ''

	end

	return @p_return_value

end
GO

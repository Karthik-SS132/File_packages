/****** Object:  UserDefinedFunction [dbo].[fn_check_duplicate_event_for_workflow]    Script Date: 8/24/2023 12:54:12 PM ******/
DROP FUNCTION IF EXISTS [dbo].[fn_check_duplicate_event_for_workflow]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_check_duplicate_event_for_workflow]    Script Date: 8/24/2023 12:54:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE function [dbo].[fn_check_duplicate_event_for_workflow]
(
	@i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id],
	@i_transaction_ref_no [varchar] (30),
	@i_transaction_type [varchar] (30),
	@i_wfeventverb_id [varchar] (60),
	@i_error_msg [nvarchar] (max)
)
returns nvarchar(max)
as
begin

	declare @p_return_value nvarchar(max),
		@p_last_eventverb_id varchar(60)

	if (@i_transaction_type = 'CALL')
	begin

		select top(1) @p_last_eventverb_id = eventverb_id 
		from call_status_event_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @i_transaction_ref_no
		order by event_id desc
					
		if (@p_last_eventverb_id = @i_wfeventverb_id)
		begin

			select @p_return_value = 'E_UP_DUPLICATE' + ' - ' + @i_error_msg

		end
		else
		begin

			select @p_return_value = @i_error_msg

		end

	end
	else
	begin

		select @p_return_value = @i_error_msg

	end

	select @p_return_value = '{"code":"' + @p_return_value + '"}'

	return @p_return_value

end
GO

DROP FUNCTION IF EXISTS [dbo].[fn_sysdatetimeoffset]
Go
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE function [dbo].[fn_sysdatetimeoffset]
(
@i_client_id [uddt_client_id],
@i_country_code [uddt_country_code],
@i_user_id [userid]
)
returns datetimeoffset(7)
as
begin
return (select switchoffset(getutcdate(), b.utc_offset_hours+':'+b.utc_offset_minutes)
		from users a, timezone b
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.user_id = @i_user_id
		  and a.default_timezone_id = b.timezone_id
		  )
end
GO

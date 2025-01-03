/****** Object:  UserDefinedFunction [dbo].[fn_client_specific_stamping_call_no]    Script Date: 8/4/2022 1:00:46 PM ******/

DROP FUNCTION IF EXISTS [dbo].[fn_client_specific_stamping_call_no]
Go
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE function [dbo].[fn_client_specific_stamping_call_no]
(
@i_client_id [uddt_client_id],
@i_country_code [uddt_country_code],
@i_request_category [varchar] (10),
@i_request_type [nvarchar] (10),
@i_call_no [int],
@i_by_field_1 [nvarchar] (30),
@i_by_field_2 [nvarchar] (30),
@i_by_field_3 [nvarchar] (30),
@i_by_field_4 [nvarchar] (30),
@i_by_field_5 [nvarchar] (30) 
)
returns nvarchar(20)
as
begin

declare @o_call_ref_no nvarchar(20)

set @o_call_ref_no = REPLACE(str(@i_call_no,6,0),' ','0')

/* For client specific call no stamping */
if @i_client_id = 'mvgl'
begin

if @i_request_category = 'EQ'
	select @o_call_ref_no = 'C'+
	CONVERT(varchar(6),sysdatetimeoffset(),12)+
	REPLACE(str(@i_call_no,5,0),' ','0')
	else if @i_request_category = 'SE'
	select @o_call_ref_no = 'S'+
	CONVERT(varchar(6),sysdatetimeoffset(),12)+
	REPLACE(str(@i_call_no,5,0),' ','0')
	else if @i_request_category = 'IC'
	select @o_call_ref_no = 'I'+
	CONVERT(varchar(6),sysdatetimeoffset(),12)+
	REPLACE(str(@i_call_no,5,0),' ','0')

end
else if @i_client_id = 'kpcl'
begin


	if @i_request_category = 'PE'
	select @o_call_ref_no = 'PE'+'-'+
	@i_by_field_1 +'-'+
	REPLACE(str(@i_call_no,5,0),' ','0')

	else if @i_request_category = 'SA'
	select @o_call_ref_no = 'SA'+'-'+
	@i_by_field_1 +'-'+
	REPLACE(str(@i_call_no,5,0),' ','0')

end	
else if @i_client_id = 'cp'
begin
	select @o_call_ref_no = 'CP'+@o_call_ref_no
end
else
begin

if @i_request_category = 'PE'
		select @o_call_ref_no = 'PE'+
		CONVERT(varchar(6),sysdatetimeoffset(),12)+
		REPLACE(str(@i_call_no,6,0),' ','0')

		else if @i_request_category = 'SA'
		select @o_call_ref_no = 'SA'+
		CONVERT(varchar(6),sysdatetimeoffset(),12)+
		REPLACE(str(@i_call_no,6,0),' ','0')

end
return @o_call_ref_no

end
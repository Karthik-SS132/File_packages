DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_user_attachments]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_user_attachments] 
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

	declare @p_transaction_type varchar(50), 
		@p_transaction_ref_no nvarchar(50)
	
	create table #inputparams 
	(
		paramname varchar(50) not null,
		paramval varchar(50) null
	)

	insert #inputparams 
	(
		paramname, 
		paramval
	)
	select [key], [value]
	from openjson(@i_inputparam_xml)

	update #inputparams
	set paramval = null 
	where paramval = 'ALL'
		or paramval = ''
		
	
	select @p_transaction_type = paramval 
	from #inputparams 
	where paramname = 'transaction_type'

	select @p_transaction_ref_no = paramval 
	from #inputparams 
	where paramname = 'transaction_ref_no'


	create table #user_attachments 
	( 
		transaction_type varchar(50) not null,
		transaction_ref_no nvarchar(50) not null,
		attachment_file_id nvarchar(50) not null,
		attachment_file_sysgen_id varchar(5) not null,
		attachment_file_category varchar(2) not null,
		attachment_file_type varchar(2) not null,
		attachment_file_path nvarchar(100) not null,
		attachment_file_name nvarchar(60) not null
	) 

	if (@p_transaction_type = 'CALL')
	begin
		
		insert #user_attachments 
		(
			transaction_type, 
			transaction_ref_no,
			attachment_file_id, 
			attachment_file_sysgen_id,
			attachment_file_category, 
			attachment_file_type,
			attachment_file_path, 
			attachment_file_name
		)
		select @p_transaction_type, 
			a.call_ref_no,
			isnull(a.attachment_file_id, ''), 
			convert(varchar(5), a.attachment_file_sysgen_id),
			a.attachment_file_category, 
			a.attachment_file_type,
			a.attachment_file_path, 
			a.attachment_file_name
		from call_user_attachments a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.call_ref_no = @p_transaction_ref_no

	end

	select
        '' as custom_info_list,
        '{' +
			'"transaction_type":"' + a.transaction_type + '",' +
			'"transaction_ref_no":"' + a.transaction_ref_no + '",' +
			'"attachment_file_id":"' + a.attachment_file_id + '",' +
			'"attachment_file_sysgen_id":"' + a.attachment_file_sysgen_id + '",' +
			'"attachment_file_category":"' + a.attachment_file_category  + '",' +
			'"attachment_file_type":"' + a.attachment_file_type  + '",' +
			'"attachment_file_path":"' + a.attachment_file_path  + '",' +
			'"attachment_file_name":"' + a.attachment_file_name  + '"' +
		'}' as o_custom_info_json
	from #user_attachments a

END
GO

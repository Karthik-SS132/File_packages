/****** Object:  UserDefinedFunction [dbo].[fn_get_calldb_parameters]    Script Date: 10/15/2020 7:31:36 PM ******/
DROP FUNCTION IF EXISTS [dbo].[fn_get_calldb_parameters]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_get_calldb_parameters]    Script Date: 10/15/2020 7:31:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_get_calldb_parameters] 
(
	@i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
	@i_action_path nvarchar(500)
)
RETURNS @o_call_db_parameters TABLE 
(
	param_name varchar(50),
	param_value nvarchar(50)
)
AS
BEGIN
	
	/* PROCESSING THE ACTION PATH DETAILS */
	declare @p_index int, @p_temp_action_path varchar(500), 
		@p_employee_id varchar(30), @p_assigned_to_emp_id varchar(30),
		@p_request_type nvarchar(10)

	declare @calldb_action_path_info table (
		path_index int, path_value varchar(50)
	)

	set @p_index = 1
	set @p_temp_action_path = @i_action_path

	while @p_index <= 10
	begin
	
		if (@p_temp_action_path != '' and charindex('.', @p_temp_action_path, 0) != 0)
		begin

			insert @calldb_action_path_info (path_index, path_value) values (@p_index, substring(@p_temp_action_path, 0, charindex('.', @p_temp_action_path, 0)))	
			select @p_temp_action_path = substring(@p_temp_action_path, charindex('.', @p_temp_action_path, 0) + 1, len(@p_temp_action_path))	
		
		end
		else
		begin

			insert @calldb_action_path_info (path_index, path_value) values (@p_index, isnull(@p_temp_action_path, ''))
			select @p_temp_action_path = ''

		end

		set @p_index = @p_index + 1

	end

	/* IDENTIFYING THE EMPLOYEE ID OF THE REQUEST USER */
	select @p_employee_id = employee_id 
	from users
	where company_id = @i_client_id
		and country_code = @i_country_code
		and user_id = @i_user_id
			
	select @p_request_type = substring(path_value, 2, len(path_value))
	from @calldb_action_path_info 
	where path_index = 2

	select @p_assigned_to_emp_id = supervisor_emp_id
	from employee
	where company_id = @i_client_id
		and country_code = @i_country_code
		and employee_id = @p_employee_id

	insert @o_call_db_parameters (param_name, param_value)
	select 'request_type', @p_request_type
	union
	select 'additional_information', @i_action_path
	union
	select 'assigned_to_employee_id', @p_assigned_to_emp_id

	return
END
GO

/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_detail_visitor_profile]    Script Date: 10/13/2023 2:42:46 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_retrieve_manage_custom_info_detail_visitor_profile]
GO
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_detail_visitor_profile]    Script Date: 10/13/2023 2:42:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_detail_visitor_profile] 
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id], 
    @i_custom_info_code [uddt_varchar_60], 
    @i_custom_info_ref_no1 [uddt_nvarchar_60], 
    @i_custom_info_ref_no2 [uddt_nvarchar_60], 
    @o_custom_info_header_json [uddt_nvarchar_max] OUTPUT
AS
BEGIN
    /*
     * Retrieves custom info detail
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    -- The following code raises a 'Not implemented' error. Remove this code after implementing this procedure.
    --RAISERROR( N'Procedure ''sp_retrieve_manage_custom_info_detail'' is yet to be implemented', 15, 1)

    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_custom_info_header_json = '' /* unicode string */
     */

    /*
    -- The following SQL snippet illustrates selection of result sets expected from this stored procedure: 
    
    -- Result set 1: custom_info_detail_json

    SELECT
        '' as custom_info_detail_json, /* dummy column aliased by result set name */
        '' as o_custom_info_json /* unicode string */
    FROM <Table name>
    */

	declare @p_package_id varchar(15), @p_user_group_id nvarchar(10), @p_channel_id varchar(20)

	set @p_user_group_id = 'appvisitor'
	set @p_channel_id = @i_custom_info_ref_no2

	if (@i_custom_info_ref_no2 = '')
	begin

		set @p_channel_id = 'mobile'

	end
	

	select @p_package_id = package_id
	from company_subscription
	where company_id = @i_client_id
		and country_code = @i_country_code

	if @p_package_id is null
	begin

		select @p_package_id = package_id
		from company_subscription
		where company_id = @i_client_id
			and country_code = 'ALL'

	end

	set @o_custom_info_header_json = ''

	create table #visitor_fa_profile
	(
		parent_feature_group varchar(15) not null,
		child_feature_id_or_group varchar(15) not null,
		child_feature_id_or_group_ind varchar(1) not null,
		parent_level_no tinyint not null, 
		parent_display_order tinyint not null, 
		child_level_no tinyint not null, 
		child_display_order tinyint not null, 
		parent_display_label nvarchar(50) null, 
		child_display_label nvarchar(50) null,
		screen_id varchar(60) null, 
		channel_id varchar(20) null, 
		feature_access bit null, 
		add_access bit null, 
		delete_access bit null,
		view_access bit null, 
		edit_access bit null, 
		export_access bit null, 
		import_access bit null, 
		print_access  bit null,
		menu_display_ind  bit null
	)


	insert #visitor_fa_profile
	(
		parent_feature_group,
		child_feature_id_or_group,
		child_feature_id_or_group_ind,
		parent_level_no,
		parent_display_order,
		child_level_no,
		child_display_order,
		parent_display_label,
		child_display_label,
		screen_id,
		channel_id,
		feature_access,
		add_access, 
		delete_access,
		view_access,
		edit_access,
		export_access,
		import_access,
		print_access,
		menu_display_ind
	)
	select c.parent_feature_group,
		c.child_feature_id_or_group,
		c.child_feature_id_or_group_ind,
		c.parent_level_no, 
		c.parent_display_order, 
		c.child_level_no, 
		c.child_display_order, 
		(
			select group_display_label 
			from company_feature_group
			where company_id = a.company_id
				and country_code = a.country_code
				and feature_group = c.parent_feature_group
		), 
		a.feature_display_label,
		a.screen_id, 
		a.channel_id, 
		b.feature_access, 
		b.add_access, 
		b.delete_access,
		b.view_access, 
		b.edit_access, 
		b.export_access, 
		b.import_access, 
		b.print_access,
		a.menu_display_ind
	from company_feature a, functional_access_profile b, company_feature_group_id_link c
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.channel_id = @p_channel_id
		and b.company_id = a.company_id
		and b.country_code = a.country_code
		and b.feature_id = a.feature_id
		and b.user_group_id = @p_user_group_id
		and b.feature_access = 1
		and c.company_id = a.company_id
		and c.country_code = a.country_code
		and c.child_feature_id_or_group = a.feature_id

	

	if @p_package_id != 'ALL'
    begin
    
		delete #visitor_fa_profile
		where child_feature_id_or_group_ind = 'F'
			and child_feature_id_or_group not in (
				select feature_id 
				from package_feature
				where package_id = @p_package_id
			)
    end

	if (@i_custom_info_ref_no1 = '')
	begin
		
		select @o_custom_info_header_json = 
			'{' +
				'"visitor_id":"' + a.employee_id + '",' +
				'"first_name":"' + a.first_name + '",' +
				'"last_name":"' + a.last_name + '",' +
				'"visitor_status":"' + a.employee_status + '",' +
				'"title":"' + a.title + '",' +
				'"org_lvl_no":"' + convert(varchar(5), a.organogram_level_no) + '",' +
				'"org_lvl_code":"' + a.organogram_level_code + '",' +
				'"location_code":"' + a.location_code + '",' +
				'"location_name":"' + (
					select location_name_short 
					from company_location
					where company_id = a.company_id
						and country_code = a.country_code
						and location_code = a.location_code
				) + '",' +
				'"mobile_no":"' + isnull(a.contact_mobile_no, '') + '",' +
				'"email_id":"' + isnull(a.email_id, '') + '",' +
				'"locale_id":"' + isnull(b.default_locale_id, '') + '",' +
				'"timezone_id":"' + convert(varchar(5), isnull(b.default_timezone_id, 0)) + '",' +
				'"solution":"' + lower(isnull((
					select c.subscription_value2 
					from company_subscription_matrix c
					where c.company_id = a.company_id
						and c.country_code = a.country_code
						and c.subscription_code1 = 'SUBSCRIPTION_PROFILE'
						and c.subscription_code2 = 'SOLUTION'
				), '')) + '",' + 
				'"vertical":"' + lower(isnull((
					select c.subscription_value2 
					from company_subscription_matrix c
					where c.company_id = a.company_id
						and c.country_code = a.country_code
						and c.subscription_code1 = 'SUBSCRIPTION_PROFILE'
						and c.subscription_code2 = 'VERTICAL'
				), '')) + '",' + 
				'"clientgroup":"' + lower(isnull((
					select c.subscription_value2 
					from company_subscription_matrix c
					where c.company_id = a.company_id
						and c.country_code = a.country_code
						and c.subscription_code1 = 'SUBSCRIPTION_PROFILE'
						and c.subscription_code2 = 'CLIENTGROUP'
				), '')) + '",' + 
				'"location_fetch_interval_in_seconds":"' + isnull((
					select isnull(convert(varchar(10), c.location_fetch_interval_in_seconds), '0') 
					from company_configuration c
					where c.company_id = a.company_id
						and c.country_code = a.country_code
				), '') + '"' +
			'}'
		from employee a, users b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.employee_id = 'cappvisitor'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.employee_id = a.employee_id

	end
	else 
	begin

		select @o_custom_info_header_json = 
			'{' +
				'"visitor_id":"' + convert(varchar(5), a.visitor_id) + '",' +
				'"first_name":"' + a.first_name + '",' +
				'"last_name":"' + a.last_name + '",' +
				'"visitor_status":"' + a.visitor_status + '",' +
				'"title":"' + a.title + '",' +
				'"org_lvl_no":"' + convert(varchar(5), a.organogram_level_no) + '",' +
				'"org_lvl_code":"' + a.organogram_level_code + '",' +
				'"location_code":"' + a.location_code + '",' +
				'"location_name":"' + (
					select location_name_short 
					from company_location
					where company_id = a.company_id
						and country_code = a.country_code
						and location_code = a.location_code
				) + '",' +
				'"mobile_no":"' + isnull(a.contact_mobile_no, '') + '",' +
				'"email_id":"' + isnull(a.email_id, '') + '",' +
				'"locale_id":"' + isnull(a.default_locale_id, '') + '",' +
				'"timezone_id":"' + convert(varchar(5), isnull(a.default_timezone_id, 0)) + '",' +
				'"solution":"' + lower(isnull((
					select c.subscription_value2 
					from company_subscription_matrix c
					where c.company_id = a.company_id
						and c.country_code = a.country_code
						and c.subscription_code1 = 'SUBSCRIPTION_PROFILE'
						and c.subscription_code2 = 'SOLUTION'
				), '')) + '",' + 
				'"vertical":"' + lower(isnull((
					select c.subscription_value2 
					from company_subscription_matrix c
					where c.company_id = a.company_id
						and c.country_code = a.country_code
						and c.subscription_code1 = 'SUBSCRIPTION_PROFILE'
						and c.subscription_code2 = 'VERTICAL'
				), '')) + '",' + 
				'"clientgroup":"' + lower(isnull((
					select c.subscription_value2 
					from company_subscription_matrix c
					where c.company_id = a.company_id
						and c.country_code = a.country_code
						and c.subscription_code1 = 'SUBSCRIPTION_PROFILE'
						and c.subscription_code2 = 'CLIENTGROUP'
				), '')) + '",' + 
				'"location_fetch_interval_in_seconds":"' + isnull((
					select isnull(convert(varchar(10), c.location_fetch_interval_in_seconds), '0') 
					from company_configuration c
					where c.company_id = a.company_id
						and c.country_code = a.country_code
				), '') + '"' +
			'}'
		from visitor a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.contact_mobile_no = @i_custom_info_ref_no1

	end


	select '' as custom_info_detail_json,
		'{' +
			'"p_parent_feature_group":"' + parent_feature_group + '",' +
			'"p_child_feature_id_or_group":"' + child_feature_id_or_group + '",' +
			'"p_child_feature_id_or_group_ind":"' + child_feature_id_or_group_ind + '",' +
			'"p_parent_group_display_label":"' + isnull(parent_display_label, '') + '",' +
			'"p_parent_level_no":"' + convert(varchar(2), isnull(parent_level_no, 0)) + '",' +
			'"p_parent_display_order":"' + convert(varchar(2), isnull(parent_display_order, 0)) + '",' +
			'"p_child_feature_display_label":"' + child_display_label + '",' +
			'"p_child_level_no":"' + convert(varchar(2), isnull(child_level_no, 0)) + '",' +
			'"p_child_display_order":"' + convert(varchar(2), isnull(child_display_order, 0)) + '",' +
			'"p_child_screen_id":"' + screen_id + '",' +
			'"p_channel_id":"' + 'mobile' + '",' +
			'"p_feature_access":"' + case feature_access when 1 then 'true' else 'false' end + '",' +
			'"p_add_access":"' + case isnull(add_access, 0) when 1 then 'true' else 'false' end + '",' +
			'"p_edit_access":"' + case isnull(edit_access, 0) when 1 then 'true' else 'false' end + '",' +
			'"p_delete_access":"' + case isnull(delete_access, 0) when 1 then 'true' else 'false' end + '",' +
			'"p_view_access":"' + case isnull(view_access, 0) when 1 then 'true' else 'false' end + '",' +
			'"p_export_access":"' + case isnull(export_access, 0) when 1 then 'true' else 'false' end + '",' +
			'"p_print_access":"' + case isnull(print_access, 0) when 1 then 'true' else 'false' end + '",' +
			'"p_import_access":"' + case isnull(import_access, 0) when 1 then 'true' else 'false' end + '",' +
			'"p_menu_display_ind":"' + case isnull(menu_display_ind, 0) when 1 then 'true' else 'false' end + '"' +
		'}'
	as  o_custom_info_json
	from #visitor_fa_profile
	order by parent_display_order, child_display_order
	

    SET NOCOUNT OFF;
END
GO

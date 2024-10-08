IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[campaign_register]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[campaign_register]
	END
/****** Object:  Table [dbo].[campaign_register]    Script Date: 19-07-2023 16:47:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[campaign_register](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[campaign_code] [nvarchar](60) NULL,
	[campaign_identity] [int] IDENTITY(1,1) NOT NULL,
	[campaign_category] [varchar](10) NOT NULL,
	[campaign_type] [nvarchar](10) NOT NULL,
	[campaign_wf_stage_no] [tinyint] NOT NULL,
	[campaign_status] [varchar](2) NOT NULL,
	[company_location_code] [nvarchar](8) NOT NULL,
	[organogram_level_no] [tinyint] NOT NULL,
	[organogram_level_code] [nvarchar](15) NOT NULL,
	[campaign_name] [nvarchar](1000) NULL,
	[campaign_objective] [nvarchar](1000) NULL,
	[plan_start_date] [datetimeoffset](7) NULL,
	[plan_finish_date] [datetimeoffset](7) NULL,
	[plan_duration_in_days] [int] NULL,
	[target_noof_leads] [int] NULL,
	[target_amount] [decimal](10, 2) NULL,
	[act_start_date] [datetimeoffset](7) NULL,
	[act_finish_date] [datetimeoffset](7) NULL,
	[actual_duration] [decimal](10, 2) NULL,
	[actual_noof_leads] [int] NULL,
	[actual_amount] [decimal](10, 2) NULL,
	[currency_code] [varchar](3) NOT NULL,
	[system_user_generation_ind] [char](1) NOT NULL,
	[created_by_employee_id] [nvarchar](12) NOT NULL,
	[created_on_date] [datetimeoffset](7) NOT NULL,
	[closed_by_employee_id] [nvarchar](12) NULL,
	[closed_on_date] [datetimeoffset](7) NULL,
	[udf_char_1] [nvarchar](60) NULL,
	[udf_char_2] [nvarchar](60) NULL,
	[udf_char_3] [nvarchar](60) NULL,
	[udf_char_4] [nvarchar](60) NULL,
	[udf_bit_1] [bit] NULL,
	[udf_bit_2] [bit] NULL,
	[udf_bit_3] [bit] NULL,
	[udf_bit_4] [bit] NULL,
	[udf_float_1] [float] NULL,
	[udf_float_2] [float] NULL,
	[udf_float_3] [float] NULL,
	[udf_float_4] [float] NULL,
	[udf_date_1] [datetimeoffset](7) NULL,
	[udf_date_2] [datetimeoffset](7) NULL,
	[udf_date_3] [datetimeoffset](7) NULL,
	[udf_date_4] [datetimeoffset](7) NULL,
	[udf_analysis_code1] [nvarchar](20) NULL,
	[udf_analysis_code2] [nvarchar](20) NULL,
	[udf_analysis_code3] [nvarchar](20) NULL,
	[udf_analysis_code4] [nvarchar](20) NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL
) ON [PRIMARY]
GO

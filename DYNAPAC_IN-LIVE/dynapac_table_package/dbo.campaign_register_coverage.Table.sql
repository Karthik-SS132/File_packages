IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[campaign_register_coverage]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[campaign_register_coverage]
	END
/****** Object:  Table [dbo].[campaign_register_coverage]    Script Date: 19-07-2023 16:49:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[campaign_register_coverage](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[campaign_code] [nvarchar](60) NOT NULL,
	[coverage_category] [varchar](30) NOT NULL,
	[coverage_type] [varchar](30) NOT NULL,
	[coverage_code] [nvarchar](30) NOT NULL,
	[coverage_sub_code] [nvarchar](30) NOT NULL,
	[action_seqno] [int] IDENTITY(1,1) NOT NULL,
	[description] [nvarchar](500) NULL,
	[additional_information] [nvarchar](2000) NULL,
	[start_date] [datetimeoffset](7) NULL,
	[finish_date] [datetimeoffset](7) NULL,
	[target_noof_leads] [int] NULL,
	[target_amount] [decimal](10, 2) NULL,
	[actual_duration] [decimal](10, 2) NULL,
	[actual_noof_leads] [int] NULL,
	[actual_amount] [decimal](10, 2) NULL,
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
	[last_update_id] [nvarchar](12) NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_campaign_register_coverage] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[country_code] ASC,
	[campaign_code] ASC,
	[coverage_category] ASC,
	[coverage_type] ASC,
	[coverage_code] ASC,
	[coverage_sub_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

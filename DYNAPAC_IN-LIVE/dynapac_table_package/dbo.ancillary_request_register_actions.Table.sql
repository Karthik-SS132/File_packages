
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ancillary_request_register_actions]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[ancillary_request_register_actions]
	END

/****** Object:  Table [dbo].[ancillary_request_register_actions]    Script Date: 19-07-2023 11:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ancillary_request_register_actions](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[request_ref_no] [nvarchar](20) NOT NULL,
	[action_category] [varchar](30) NOT NULL,
	[action_type] [varchar](30) NOT NULL,
	[product_code] [nvarchar](30) NOT NULL,
	[product_sub_code] [nvarchar](30) NOT NULL,
	[action_seqno] [int] IDENTITY(1,1) NOT NULL,
	[requirement] [nvarchar](500) NULL,
	[additional_information] [nvarchar](500) NULL,
	[no_of_units] [numeric](10, 2) NULL,
	[uom_code] [varchar](12) NULL,
	[sys_gen_call_ref_no] [nvarchar](20) NULL,
	[product_group_code] [nvarchar](15) NULL,
	[product_sub_group_code] [nvarchar](15) NULL,
	[product_category] [nvarchar](30) NULL,
	[comments_block_1] [nvarchar](max) NULL,
	[comments_block_2] [nvarchar](max) NULL,
	[comments_block_3] [nvarchar](max) NULL,
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
	[udf_analysis_code1] [nvarchar](50) NULL,
	[udf_analysis_code2] [nvarchar](50) NULL,
	[udf_analysis_code3] [nvarchar](50) NULL,
	[udf_analysis_code4] [nvarchar](20) NULL,
	[last_update_id] [nvarchar](12) NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_ancillary_request_register_actions] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[country_code] ASC,
	[request_ref_no] ASC,
	[action_category] ASC,
	[action_type] ASC,
	[product_code] ASC,
	[product_sub_code] ASC,
	[action_seqno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

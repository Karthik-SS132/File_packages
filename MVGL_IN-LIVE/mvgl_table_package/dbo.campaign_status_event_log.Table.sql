/****** Object:  Table [dbo].[campaign_status_event_log]    Script Date: 7/27/2022 4:21:02 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[campaign_status_event_log]') AND type in (N'U'))
DROP TABLE [dbo].[campaign_status_event_log]
GO

/****** Object:  Table [dbo].[campaign_status_event_log]    Script Date: 7/27/2022 4:21:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[campaign_status_event_log](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[campaign_code] [nvarchar](60) NOT NULL,
	[event_id] [int] IDENTITY(1,1) NOT NULL,
	[event_date] [datetimeoffset](7) NOT NULL,
	[channel_id] [varchar](20) NOT NULL,
	[to_wf_stage_no] [tinyint] NOT NULL,
	[from_wf_stage_no] [tinyint] NOT NULL,
	[to_status] [varchar](2) NOT NULL,
	[from_status] [nvarchar](2) NOT NULL,
	[by_employee_id] [nvarchar](12) NOT NULL,
	[to_employee_id_string] [nvarchar](255) NULL,
	[comments] [nvarchar](1000) NULL,
	[reason_code] [nvarchar](50) NULL,
	[eventverb_id] [varchar](60) NULL,
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
	[last_update_timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_campaign_status_event_log] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[country_code] ASC,
	[campaign_code] ASC,
	[event_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


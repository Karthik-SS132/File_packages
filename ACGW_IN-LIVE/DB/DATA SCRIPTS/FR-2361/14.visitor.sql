Drop Table visitor

USE [msv_acgw]
GO
/****** Object:  Table [dbo].[visitor]    Script Date: 06-12-2023 11:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[visitor](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[visitor_id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [nvarchar](50) NOT NULL,
	[middle_name] [nvarchar](50) NULL,
	[last_name] [nvarchar](50) NOT NULL,
	[title] [nvarchar](10) NOT NULL,
	[visitor_status] [varchar](2) NOT NULL,
	[organogram_level_no] [tinyint] NOT NULL,
	[organogram_level_code] [nvarchar](15) NOT NULL,
	[location_code] [nvarchar](8) NOT NULL,
	[contact_mobile_no] [varchar](20) NULL,
	[email_id] [nvarchar](60) NULL,
	[photo_reference] [nvarchar](255) NULL,
	[default_locale_id] [nvarchar](5) NULL,
	[default_timezone_id] [tinyint] NULL,
	[organisation_name] [nvarchar](100) NULL,
	[organisation_address] [nvarchar](300) NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_visitor] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[country_code] ASC,
	[visitor_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

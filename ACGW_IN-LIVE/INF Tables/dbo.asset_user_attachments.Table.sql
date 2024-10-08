IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[asset_user_attachments]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[asset_user_attachments]
	END

/****** Object:  Table [dbo].[asset_user_attachments]    Script Date: 8/24/2023 12:47:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[asset_user_attachments](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[asset_id] [nvarchar](30) NOT NULL,
	[file_id] [nvarchar](20) NULL,
	[file_sysgen_id] [int] IDENTITY(1,1) NOT NULL,
	[file_category] [varchar](2) NOT NULL,
	[file_type] [varchar](2) NOT NULL,
	[file_path] [nvarchar](500) NOT NULL,
	[file_name] [nvarchar](500) NOT NULL,
	[attached_on_date] [datetimeoffset](7) NOT NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_asset_user_attachments] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[country_code] ASC,
	[file_sysgen_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

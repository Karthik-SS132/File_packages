IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[inventory_adjustment_user_attachments]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[inventory_adjustment_user_attachments]
	END

/****** Object:  Table [dbo].[inventory_adjustment_user_attachments]    Script Date: 8/24/2023 12:47:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inventory_adjustment_user_attachments](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[adj_txn_ref_no] [nvarchar](30) NOT NULL,
	[attachment_file_id] [nvarchar](20) NULL,
	[attachment_file_sysgen_id] [int] IDENTITY(1,1) NOT NULL,
	[attachment_file_category] [varchar](2) NOT NULL,
	[attachment_file_type] [varchar](2) NOT NULL,
	[attachment_file_path] [nvarchar](500) NOT NULL,
	[attachment_file_name] [nvarchar](500) NOT NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_inventory_adjustment_user_attachments] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[country_code] ASC,
	[adj_txn_ref_no] ASC,
	[attachment_file_sysgen_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

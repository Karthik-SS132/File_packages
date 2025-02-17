IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[call_user_attachments_store]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[call_user_attachments_store]
	END

/****** Object:  Table [dbo].[call_user_attachments_store]    Script Date: 8/24/2023 12:47:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[call_user_attachments_store](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[call_ref_no] [nvarchar](20) NOT NULL,
	[attachment_file_id] [nvarchar](20) NULL,
	[attachment_file_sysgen_id] [int] IDENTITY(1,1) NOT NULL,
	[attachment_file_category] [varchar](2) NOT NULL,
	[attachment_file_type] [varchar](2) NOT NULL,
	[attachment_file_path] [nvarchar](500) NOT NULL,
	[attachment_file_name] [nvarchar](500) NOT NULL,
	[event_id] [int] NULL,
	[closure_report_ind] [bit] NOT NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL
) ON [PRIMARY]
GO

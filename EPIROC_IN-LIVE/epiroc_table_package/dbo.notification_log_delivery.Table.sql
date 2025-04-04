IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[notification_log_delivery]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[notification_log_delivery]
	END
/****** Object:  Table [dbo].[notification_log_delivery]    Script Date: 19-07-2023 19:13:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[notification_log_delivery](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[notification_id] [int] NOT NULL,
	[delivery_datetime] [datetimeoffset](7) NULL,
	[delivery_status] [varchar](10) NOT NULL,
	[delivery_remarks] [nvarchar](200) NULL,
	[delivery_sessionid] [uniqueidentifier] NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_notification_log_delivery] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[country_code] ASC,
	[notification_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

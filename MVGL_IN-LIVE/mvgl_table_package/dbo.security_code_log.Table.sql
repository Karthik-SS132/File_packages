/****** Object:  Table [dbo].[security_code_log]    Script Date: 6/29/2023 2:42:03 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[security_code_log]') AND type in (N'U'))
DROP TABLE [dbo].[security_code_log]
GO

/****** Object:  Table [dbo].[security_code_log]    Script Date: 6/29/2023 2:42:03 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[security_code_log](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[user_id] [nvarchar](12) NOT NULL,
	[security_code] [varchar](6) NOT NULL,
	[purpose_code] [varchar](60) NOT NULL,
	[expiry_in_seconds] [tinyint] NOT NULL,
	[code_generated_on_datetime] [datetimeoffset](7) NOT NULL,
	[validation_datetime] [datetimeoffset](7) NULL,
	[validation_status] [varchar](1) NULL,
	[last_update_id] [nvarchar](12) NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_security_code_log] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[country_code] ASC,
	[user_id] ASC,
	[purpose_code] ASC,
	[code_generated_on_datetime] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO



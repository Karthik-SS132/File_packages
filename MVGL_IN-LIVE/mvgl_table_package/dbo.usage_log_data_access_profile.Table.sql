IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[usage_log_data_access_profile]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[usage_log_data_access_profile]
	END
	
/****** Object:  Table [dbo].[usage_log_data_access_profile]    Script Date: 09-12-2023 14:07:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usage_log_data_access_profile](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[session_id] [char](36) NOT NULL,
	[access_to_info_type] [varchar](20) NOT NULL,
	[access_code_type] [varchar](60) NOT NULL,
	[access_code_value1] [nvarchar](100) NOT NULL,
	[access_code_value2] [nvarchar](100) NULL,
	[access_code_value3] [nvarchar](100) NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL
) ON [PRIMARY]
GO

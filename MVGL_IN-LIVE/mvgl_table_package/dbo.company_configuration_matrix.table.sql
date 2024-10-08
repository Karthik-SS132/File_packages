IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[company_configuration_matrix]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[company_configuration_matrix]
	END
	
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[company_configuration_matrix](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[config_code] [varchar](60) NOT NULL,
	[config_sub_code] [varchar](60) NOT NULL,
	[config_value1] [nvarchar](100) NULL,
	[config_value2] [nvarchar](100) NULL,
	[config_value3] [nvarchar](100) NULL,
	[config_value4] [nvarchar](100) NULL,
	[config_value5] [nvarchar](100) NULL,
	[config_value6] [nvarchar](100) NULL,
	[config_value7] [nvarchar](100) NULL,
	[config_value8] [nvarchar](100) NULL,
	[config_value9] [nvarchar](100) NULL,
	[config_value10] [nvarchar](100) NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL
) ON [PRIMARY]
GO

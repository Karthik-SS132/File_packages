IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[city_master]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[city_master]
	END

/****** Object:  Table [dbo].[city_master]    Script Date: 30/05/2023 16:01:23 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[city_master](
	[country_code] [varchar](5) NOT NULL,
	[state_code] [nvarchar](10) NOT NULL,
	[city_code] [nvarchar](20) NOT NULL,
	[city_name] [nvarchar](100) NULL,
	[district_code] [nvarchar](20) NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_city_master] PRIMARY KEY CLUSTERED 
(
	[country_code] ASC,
	[state_code] ASC,
	[city_code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]




IF EXISTS(SELECT *  FROM   INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME = 'timezone')
BEGIN

	select * into timezone_backup from timezone
	
	IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[timezone]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[timezone]
	END


/****** Object:  Table [dbo].[timezone]    Script Date: 30/05/2023 16:01:23 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[timezone](
	[timezone_id] [tinyint] NOT NULL,
	[timezone_name] [varchar](50) NULL,
	[utc_offset] [float] NOT NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
	[utc_offset_hours] [varchar](3) NULL,
	[utc_offset_minutes] [varchar](2) NULL,
 CONSTRAINT [PK_timezone_1] PRIMARY KEY CLUSTERED 
(
	[timezone_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]



	INSERT timezone (timezone_id,timezone_name,utc_offset,utc_offset_hours,utc_offset_minutes,last_update_id)
	SELECT '190', 'India Time', '5940000', N'+05', N'30','chak'
	from timezone_backup



	Drop table timezone_backup

END
GO

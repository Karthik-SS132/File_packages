IF EXISTS(SELECT *  FROM   INFORMATION_SCHEMA.COLUMNS WHERE  TABLE_NAME = 'equipment')
BEGIN

	select * into equipment_backup from equipment
	
	IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[equipment]') AND type in (N'U'))
	BEGIN
		DROP TABLE [dbo].[equipment]
	END


/****** Object:  Table [dbo].[equipment]    Script Date: 30/05/2023 16:01:23 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[equipment](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[equipment_id] [nvarchar](30) NOT NULL,
	[description] [nvarchar](100) NOT NULL,
	[servicing_org_level_no] [tinyint] NOT NULL,
	[servicing_org_level_code] [nvarchar](15) NOT NULL,
	[equipment_category] [nvarchar](15) NOT NULL,
	[equipment_type] [nvarchar](15) NOT NULL,
	[creation_date] [datetimeoffset](7) NULL,
	[udf_char_1] [nvarchar](60) NULL,
	[udf_char_2] [nvarchar](60) NULL,
	[udf_char_3] [nvarchar](60) NULL,
	[udf_char_4] [nvarchar](60) NULL,
	[udf_bit_1] [bit] NULL,
	[udf_bit_2] [bit] NULL,
	[udf_bit_3] [bit] NULL,
	[udf_bit_4] [bit] NULL,
	[udf_float_1] [float] NULL,
	[udf_float_2] [float] NULL,
	[udf_float_3] [float] NULL,
	[udf_float_4] [float] NULL,
	[udf_date_1] [datetimeoffset](7) NULL,
	[udf_date_2] [datetimeoffset](7) NULL,
	[udf_date_3] [datetimeoffset](7) NULL,
	[udf_date_4] [datetimeoffset](7) NULL,
	[udf_analysis_code1] [nvarchar](20) NULL,
	[udf_analysis_code2] [nvarchar](20) NULL,
	[udf_analysis_code3] [nvarchar](20) NULL,
	[udf_analysis_code4] [nvarchar](20) NULL,
	[last_update_id] [varchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
	[equipment_oem] [nvarchar](60) NULL,
 CONSTRAINT [PK_equipment] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[country_code] ASC,
	[equipment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


	INSERT equipment (company_id,country_code,equipment_id,description,servicing_org_level_no,servicing_org_level_code,equipment_category,equipment_type,creation_date,udf_char_1,udf_char_2,udf_char_3,udf_char_4,udf_bit_1,udf_bit_2,udf_bit_3,udf_bit_4,udf_float_1,udf_float_2,udf_float_3,udf_float_4,udf_date_1,udf_date_2,udf_date_3,udf_date_4,udf_analysis_code1,udf_analysis_code2,udf_analysis_code3,udf_analysis_code4,last_update_id,equipment_oem)
	SELECT company_id,country_code,equipment_id,description,servicing_org_level_no,servicing_org_level_code,equipment_category,equipment_type,creation_date,udf_char_1,udf_char_2,udf_char_3,udf_char_4,udf_bit_1,udf_bit_2,udf_bit_3,udf_bit_4,udf_float_1,udf_float_2,udf_float_3,udf_float_4,udf_date_1,udf_date_2,udf_date_3,udf_date_4,udf_analysis_code1,udf_analysis_code2,udf_analysis_code3,udf_analysis_code4,last_update_id,'epiroc'
	from equipment_backup



	Drop table equipment_backup

END
GO

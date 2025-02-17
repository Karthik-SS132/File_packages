
	
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[customer_location_contacts]') AND type in (N'U'))
BEGIN
	DROP TABLE [dbo].[customer_location_contacts]
END


/****** Object:  Table [dbo].[customer_location_contacts]  Script Date: 28/09/2023 13:32:47 ******/
SET ANSI_NULLS ON

SET QUOTED_IDENTIFIER ON

CREATE TABLE [dbo].[customer_location_contacts](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[customer_id] [nvarchar](15) NOT NULL,
	[location_code] [nvarchar](10) NOT NULL,
	[contact_category] [varchar](10) NOT NULL,
	[contact_type] [nvarchar](10) NULL,
	[contact_verification_stage] [tinyint] NOT NULL,
	[contact_verification_status] [varchar](2) NOT NULL,
	[title] [nvarchar](10) NOT NULL,
	[first_name] [nvarchar](200) NOT NULL,
	[middle_name] [nvarchar](200) NULL,
	[last_name] [nvarchar](200) NOT NULL,
	[address_line_1] [nvarchar](200) NOT NULL,
	[address_line_2] [nvarchar](200) NULL,
	[address_line_3] [nvarchar](200) NULL,
	[city] [nvarchar](60) NOT NULL,
	[city_code] [nvarchar](20) NULL,
	[district] [nvarchar](20) NULL,
	[state_code] [nvarchar](10) NOT NULL,
	[contact_phone_no] [varchar](20) NOT NULL,
	[pincode] [varchar](10) NULL,
	[email_id] [varchar](100) NULL,
	[designation] [nvarchar](100) NULL,
	[department] [nvarchar](200) NULL,
	[latitude] [varchar](60) NULL,
	[longitude] [varchar](60) NULL,
	[creation_date] [datetimeoffset](7) NOT NULL,
	[udf_char_1] [nvarchar](60) NULL,
	[udf_char_2] [nvarchar](60) NULL,
	[udf_char_3] [nvarchar](60) NULL,
	[udf_char_4] [nvarchar](60) NULL,
	[udf_char_5] [nvarchar](60) NULL,
	[udf_char_6] [nvarchar](60) NULL,
	[udf_char_7] [nvarchar](60) NULL,
	[udf_char_8] [nvarchar](60) NULL,
	[udf_char_9] [nvarchar](60) NULL,
	[udf_char_10] [nvarchar](60) NULL,
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
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_customer_location_contacts] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[country_code] ASC,
	[customer_id] ASC,
	[location_code] ASC,
	[contact_phone_no] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) 

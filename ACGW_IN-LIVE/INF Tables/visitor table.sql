Drop Table visitor

USE [msv_acgw]
GO
/****** Object:  Table [dbo].[visitor]    Script Date: 06-12-2023 11:24:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[visitor](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[visitor_id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [nvarchar](50) NOT NULL,
	[middle_name] [nvarchar](50) NULL,
	[last_name] [nvarchar](50) NOT NULL,
	[title] [nvarchar](10) NOT NULL,
	[visitor_status] [varchar](2) NOT NULL,
	[organogram_level_no] [tinyint] NOT NULL,
	[organogram_level_code] [nvarchar](15) NOT NULL,
	[location_code] [nvarchar](8) NOT NULL,
	[contact_mobile_no] [varchar](20) NULL,
	[email_id] [nvarchar](60) NULL,
	[photo_reference] [nvarchar](255) NULL,
	[default_locale_id] [nvarchar](5) NULL,
	[default_timezone_id] [tinyint] NULL,
	[organisation_name] [nvarchar](100) NULL,
	[organisation_address] [nvarchar](300) NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL,
 CONSTRAINT [PK_visitor] PRIMARY KEY CLUSTERED 
(
	[company_id] ASC,
	[country_code] ASC,
	[visitor_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[visitor] ON 

INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 1, N'', NULL, N'', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'ss111', N'', NULL, N'en-us', 190, NULL, NULL, N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 2, N'Arun', NULL, N'M', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'+91-8667565944', N'arun.m@selfservit.com', NULL, N'en-us', 190, NULL, NULL, N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 3, N'T', NULL, N'D', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'+91-9898989898', N'arun.m@selfservit.com', NULL, N'en-us', 190, NULL, NULL, N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 4, N'R', NULL, N'F', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'+91-9696969696', N'test@gmail.com', NULL, N'en-us', 190, NULL, NULL, N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 5, N'J', NULL, N'R', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'+91-1231231233', N'test@gmail.com', NULL, N'en-us', 190, NULL, NULL, N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 6, N'Ramesh', NULL, N'R', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'+91-9595959595', N'test@gmail.com', NULL, N'en-us', 190, NULL, NULL, N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 7, N'Kamal', NULL, N'K', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'+91-9494949494', N'test@gmail.com', NULL, N'en-us', 190, N'Test', N'Chennai', N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 8, N'Kamali', NULL, N'K', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'+91-9393939393', N'test@gmail.com', NULL, N'en-us', 190, N'Test', N'Chennai', N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 9, N'Rajesh', NULL, N'R', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'+91-9696969693', N'test@gmail.com', NULL, N'en-us', 190, N'Test', N'Chennai', N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 10, N'T', NULL, N'Y', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'+91-1234567899', N'test@gmail.com', NULL, N'en-us', 190, N'T', N'Ch', N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 11, N'Akilan', NULL, N'A', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'+91-9292929292', N'test@gmail.com', NULL, N'en-us', 190, N'Test', N'Chn', N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 12, N'Ramesh', NULL, N'R', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'+91-9191919191', N'test@gmail.com', NULL, N'en-us', 190, N'Test', N'Chennai', N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 13, N'', NULL, N'', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'emp01', N'', NULL, N'en-us', 190, NULL, NULL, N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 1013, N'', NULL, N'', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'cp1', N'', NULL, N'en-us', 190, NULL, NULL, N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 1014, N'', NULL, N'', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'emp03', N'', NULL, N'en-us', 190, NULL, NULL, N'cappvisitor')
INSERT [dbo].[visitor] ([company_id], [country_code], [visitor_id], [first_name], [middle_name], [last_name], [title], [visitor_status], [organogram_level_no], [organogram_level_code], [location_code], [contact_mobile_no], [email_id], [photo_reference], [default_locale_id], [default_timezone_id], [organisation_name], [organisation_address], [last_update_id]) VALUES (N'acgw', N'in', 1015, N'', NULL, N'', N'Mr/Mrs', N'A', 1, N'acgw', N'HO', N'ss110', N'', NULL, N'en-us', 190, NULL, NULL, N'cappvisitor')
SET IDENTITY_INSERT [dbo].[visitor] OFF
GO

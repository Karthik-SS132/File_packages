/****** Object:  Table [dbo].[campaign_workflow_assignment]    Script Date: 7/27/2022 4:21:47 PM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[campaign_workflow_assignment]') AND type in (N'U'))
DROP TABLE [dbo].[campaign_workflow_assignment]
GO

/****** Object:  Table [dbo].[campaign_workflow_assignment]    Script Date: 7/27/2022 4:21:47 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[campaign_workflow_assignment](
	[company_id] [varchar](20) NOT NULL,
	[country_code] [varchar](5) NOT NULL,
	[campaign_code] [nvarchar](30) NOT NULL,
	[resource_emp_id] [nvarchar](12) NOT NULL,
	[assigned_on_date] [datetimeoffset](7) NOT NULL,
	[current_assignee_ind] [bit] NOT NULL,
	[last_update_id] [nvarchar](12) NOT NULL,
	[last_update_timestamp] [timestamp] NOT NULL
) ON [PRIMARY]
GO


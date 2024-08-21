<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="spm_report_nos_mod">
		"Job #","Job Type","Month","Machine #","Model Id","Brand","Product Group","Product Subgroup","Employee Name","Dealer Code","Zone","Customer Id","Customer Name","Contact Name","Contact Number","Contact Email","Commissioning date"
		<xsl:for-each select="spm_report_nos_mod">
			<br/>
			"=""<xsl:value-of select="call_no"/>""",
			"=""<xsl:value-of select="call_type"/>""",
			"=""<xsl:value-of select="created_month"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="equipment_oem"/>""",
			"=""<xsl:value-of select="equipment_category"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="assigned_to_emp_name"/>""",
			"=""<xsl:value-of select="dealer_org_lvl_code"/>""",
			"=""<xsl:value-of select="company_location_code"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="customer_contact_name"/>""",
			"=""<xsl:value-of select="customer_contact_no"/>""",
			"=""<xsl:value-of select="customer_contact_email_id"/>""",
			"=""<xsl:value-of select="created_on_date"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
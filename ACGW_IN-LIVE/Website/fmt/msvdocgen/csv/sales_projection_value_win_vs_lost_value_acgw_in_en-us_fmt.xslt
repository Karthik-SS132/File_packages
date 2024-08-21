<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="sales_projection_value_win_vs_lost_value">
		"Job #","Type","Amount","Machine #","Machine Status","Model Id","Model Type","Date of Call","Customer Id","Customer Name","Dealer Code","Company Location"
		<xsl:for-each select="sales_projection_value_win_vs_lost_value">
			<br/>
			"=""<xsl:value-of select="call_ref_no"/>""",
			"=""<xsl:value-of select="charge_type"/>""",
			"=""<xsl:value-of select="charge_amount"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="asset_status"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="created_on_date"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="org_lvl_code"/>""",
			"=""<xsl:value-of select="comp_loc"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
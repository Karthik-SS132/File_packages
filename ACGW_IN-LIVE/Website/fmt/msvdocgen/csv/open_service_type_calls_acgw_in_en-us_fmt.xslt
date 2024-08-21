<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="open_service_type_calls">
		"Job #","Job Type","Creation Month","Machine #","Model Id","Brand","Product Group","Product Subgroup","Dealer Code","Zone","Job Priority","Customer Requirement","Additional Info","Customer Id","Customer Name","Contact Name","Contact Number","Contact Email","Job Creation Date"
		<xsl:for-each select="open_service_type_calls">
			<br/>
			"=""<xsl:value-of select="call_no"/>""",
			"=""<xsl:value-of select="call_type"/>""",
			"=""<xsl:value-of select="creation_month"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="equipment_oem"/>""",
			"=""<xsl:value-of select="equipment_category"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="comp_loc"/>""",
			"=""<xsl:value-of select="priority_code"/>""",
			"=""<xsl:value-of select="problem_description"/>""",
			"=""<xsl:value-of select="additional_information"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="customer_contact_name"/>""",
			"=""<xsl:value-of select="customer_contact_no"/>""",
			"=""<xsl:value-of select="customer_contact_email_id"/>""",
			"=""<xsl:value-of select="created_on_date"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
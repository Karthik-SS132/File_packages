<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="one_to_one_all_jobs">
		"Machine #","Dealer Code","Type","last job number","last job type","Company Location","Model#","Product Group","Product Sub Group","Customer Id","Customer Name"
		<xsl:for-each select="one_to_one_all_jobs">
			<br/>
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="one_to_one"/>""",
			"=""<xsl:value-of select="job_order_no"/>""",
			"=""<xsl:value-of select="work_type"/>""",
			"=""<xsl:value-of select="comp_loc"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="equipment_category"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
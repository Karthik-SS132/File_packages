<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="mean_time_to_resolve">"Job#","Job creation date","Job complete date","ACG Region","Customer","Engineer","Model#","Brand","Equipment Product Group","Product Subgroup","Resolved in hrs","Resolved in days"		<xsl:for-each select="mean_time_to_resolve"><br/>"=""<xsl:value-of select="call_ref_no"/>""","=""<xsl:value-of select="creation_date"/>""","=""<xsl:value-of select="complete_date"/>""","=""<xsl:value-of select="company_location_code"/>""","=""<xsl:value-of select="customer_name"/>""","=""<xsl:value-of select="assigned_to_emp_name"/>""","=""<xsl:value-of select="equipment_id"/>""","=""<xsl:value-of select="equipment_oem"/>""","=""<xsl:value-of select="equipment_category"/>""","=""<xsl:value-of select="equipment_type"/>""","=""<xsl:value-of select="difference_in_hrs"/>""","=""<xsl:value-of select="difference_in_days"/>"""</xsl:for-each></xsl:template></xsl:stylesheet>
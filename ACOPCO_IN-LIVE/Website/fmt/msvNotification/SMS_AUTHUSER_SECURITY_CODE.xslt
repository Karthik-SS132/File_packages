<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:user="http://mycompany.com/mynamespace"
                xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                xmlns:dt="urn:schemas-microsoft-com:datatypes">
 <xsl:template match="/">
	<html>
		<subject>
			<div>Your SECURITY CODE verification Code</div>
		</subject>
		<body style="font-family:perpetua, Arial, san-serif;font-size:16;">
			<p>message=Dear <xsl:value-of select="document/outputparam_detail_n_mode_detail/outputparam_detail_n_recipient_detail/p_n_recipient_name"/>, A New Service Call OTP <xsl:value-of select="document/p_n_info_xml/notification_info/security_code"/> with equipment model <xsl:value-of select="document/outputparam_detail_n_mode_detail/outputparam_detail_n_recipient_detail/p_n_recipient_user_id"/> is assigned to <xsl:value-of select="document/outputparam_detail_n_mode_detail/outputparam_detail_n_recipient_detail/p_n_recipient_name"/> and contact number <xsl:value-of select="document/outputparam_detail_n_mode_detail/outputparam_detail_n_recipient_detail/p_n_recipient_mobile_no"/>. SCHWING Stetter &amp;tempid=1107164848425368407 </p>   
		</body>				
	</html>	
 </xsl:template>
</xsl:stylesheet>



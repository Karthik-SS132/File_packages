<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:user="http://mycompany.com/mynamespace"
                xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                xmlns:dt="urn:schemas-microsoft-com:datatypes">
       <msxsl:script language="javascript" implements-prefix="user">
         function loginurl(url,client_id)
         {
         url = url+'/login.html?client_id='+client_id;
         return url.replace(/\s+/g, ' ');
         }
       </msxsl:script>
       <xsl:template match="/">
			  <xsl:variable name="recipient_name" select="content/p_n_recipient_name"/>
			  <xsl:variable name="first_name" select="content/notification_info/first_name"/>
			  <xsl:variable name="last_name" select="content/notification_info/last_name"/>
			  <xsl:variable name="mobile_no" select="content/notification_info/mobile_no"/>
			  <xsl:variable name="email_id" select="content/notification_info/email_id"/>
			  <xsl:variable name="org_name" select="content/notification_info/org_name"/>
			  <xsl:variable name="org_address" select="content/notification_info/org_address"/>
			  <xsl:variable name="addl_info" select="content/notification_info/addl_info"/>
              <html></html>
       </xsl:template>
</xsl:stylesheet>

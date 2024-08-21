<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:user="http://mycompany.com/mynamespace"
                xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                xmlns:dt="urn:schemas-microsoft-com:datatypes">
       <msxsl:script language="javascript" implements-prefix="user">
         function loginurl(url,client_id)
         {
         return url.replace(/\s+/g, ' ');
         }
       </msxsl:script>
       <xsl:template match="/">
              <xsl:variable name="new_password" select="content/notification_info/new_password"/>
              <xsl:variable name="clientid" select="content/client_properties/clientid"/>
              <xsl:variable name="domain_url" select="content/client_properties/domain_url"/>
              <html></html>
       </xsl:template>
</xsl:stylesheet>

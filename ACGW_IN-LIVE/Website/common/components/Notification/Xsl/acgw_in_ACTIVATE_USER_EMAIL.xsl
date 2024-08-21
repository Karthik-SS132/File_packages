<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:user="http://mycompany.com/mynamespace"
                xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                xmlns:dt="urn:schemas-microsoft-com:datatypes">
       <msxsl:script language="javascript" implements-prefix="user">
		function loginurl(url,client_id,user_group_id){
			if (user_group_id == "custowner"){
				return "https://play.google.com/store/apps/details?id=com.selfservit.kobelco";
			} else {
				url = url+'/login.html?client_id='+client_id;
				return url.replace(/\s+/g, ' ');
			} 
		}
       </msxsl:script>
       <xsl:template match="/">
			  <xsl:variable name="recipient_name" select="content/p_n_recipient_name"/>
              <xsl:variable name="activate_deactivate_ind" select="content/notification_info/activate_deactivate_ind"/>
			  <xsl:variable name="user_id" select="content/notification_info/for_user_id"/>
			  <xsl:variable name="password" select="content/notification_info/password" />
			  <xsl:variable name="user_group_id" select="content/notification_info/user_group_id" />
              <xsl:variable name="clientid" select="content/client_properties/clientid"/>
              <xsl:variable name="domain_url" select="content/client_properties/domain_url"/>
              <html></html>
       </xsl:template>
</xsl:stylesheet>

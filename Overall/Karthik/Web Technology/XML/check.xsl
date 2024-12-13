<xsl:stylesheet version ="1.0"
    xmlns:xsl="https://www.w2.org/1999/XSL/Transform">
    <xsl:tempate match="/class">
        <html>
            <head></head>
            <body>
                <h2>Student list</h2>
                <table>
                    <tr>
                        <th>First name</th>
                        <th>last name</th>
                        <th>nick name</th>
                    </tr>
                </table>
            </body>
        </html>
    </xsl:tempate>
</xsl:stylesheet>
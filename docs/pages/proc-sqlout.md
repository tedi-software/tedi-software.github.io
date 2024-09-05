---
layout: page
title: sqlout
parent: Processors
permalink: /processors/sqlout
nav_order: 15
---

# sqlout Processor
{: .fs-7 }

**`sqlout`** is a processor used to write records to a database.


---

**Common Settings**
{: .fs-4 }


| **Setting**                   | **Description**           | **Data Type** | **Default**    |
|:------------------------------|:--------------------------|:--------------|:---------------|
| `service.type=sqlout`         | indicates the type of processor | string | n/a |
| `datasource.name`             | name of the database connection to use | string | n/a |
| `timeout`                     | sql INSERT timeout | string | n/a |

---


**`sqlout`** requires the input to be **xml** and in the following format:

```xml
<insertStatements>
    <insertStatement>
        <sql>
            insert statement
        </sql>
        <params>
            <param type="varchar" colName="tedi_row_id">1</param>
            <param type="varchar" colName="tedi_publish_dt">20240904</param>
        </params>
    </insertStatement>
</insertStatements>
```

---

You will find it best and easiest to use `xslt` to format your input data, for example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:date="http://exslt.org/dates-and-times"
  xmlns:exsl="http://exslt.org/common"
  xmlns:func="http://exslt.org/functions"
  xmlns:random="http://exslt.org/random"
  xmlns:regexp="http://exslt.org/regular-expressions"
  xmlns:set="http://exslt.org/sets"
  xmlns:str="http://exslt.org/strings"
  version="1.0"
  extension-element-prefixes="date exsl func random regexp set str">

  <xsl:output method="xml" encoding="utf-8" omit-xml-declaration="no" indent="yes" />

  <xsl:template match="/">
    <insertStatements>
      <xsl:choose>
        <xsl:when test="/tedi/record">
          <insertStatement>
            <sql>
<![CDATA[
  INSERT INTO sub_single_in (
    tedi_row_id
    , tedi_publish_dt
    , a_bit
    , a_bool
    , a_smallint
    , a_int
    , a_bigint
    , a_decimal
    , a_string
    , a_datetime
  ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
]]>
            </sql>
            <xsl:for-each select="//tedi/record">
              <xsl:call-template name="test" />
            </xsl:for-each>
          </insertStatement>
        </xsl:when>
      </xsl:choose>
    </insertStatements>
  </xsl:template>

  <xsl:template name="test">
    <params>
      <param type="varchar" colName="tedi_row_id">
        <xsl:value-of select="tedi_row_id" />
      </param>
      <param type="varchar" colName="tedi_publish_dt">
        <xsl:value-of select="tedi_publish_dt" />
      </param>
      <param type="varchar" colName="a_bit">
        <xsl:value-of select="a_bit" />
      </param>
      <param type="varchar" colName="a_bool">
        <xsl:value-of select="a_bool" />
      </param>
      <param type="varchar" colName="a_smallint">
        <xsl:value-of select="a_smallint" />
      </param>
      <param type="varchar" colName="a_int">
        <xsl:value-of select="a_int" />
      </param>
      <param type="varchar" colName="a_bigint">
        <xsl:value-of select="a_bigint" />
      </param>
      <param type="varchar" colName="a_decimal">
        <xsl:value-of select="a_decimal" />
      </param>
      <param type="varchar" colName="a_string">
        <xsl:value-of select="a_string" />
      </param>
      <param type="varchar" colName="a_datetime">
        <xsl:value-of select="a_datetime" />
      </param>
    </params>
  </xsl:template>
</xsl:stylesheet>
```
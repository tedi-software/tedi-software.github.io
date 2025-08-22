---
layout: page
title: converter_csv_to_json
parent: Processors
permalink: /processors/converter-csv-to-json
description: "Convert CSV to JSON or JSONL automatically to streamline data processing and system integration."
---

# converter_csv_to_json Processor
{: .fs-7 }

The **`converter_csv_to_json`** processor transforms a CSV document into either a structured JSON array or line-delimited JSON (JSONL).  

Use this processor to convert tabular data into a format suitable for APIs, data pipelines, or storage systems that require JSON.

---

**Settings**
{: .fs-4 }


| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `timeout`                     | maximum time allowed to complete the conversion |
| `field.delimiter`             | indicate the field delimiter, e.g. comma, semicolon, tab (\t), ^, \|, etc.  comma is the default delimiter for CSV files |
| `file.includes.headers`       | indicate the first line of the CSV file contains headers |
| `file.headers`                | specify the headers directly (if the file itself does not contain them) - comma delimited |
|                               | note: if file.includes.headers=false and file.headers is not set the converter will use default headers: col1, col2, col3, etc. |
| `output.format`               | output the result as json array (default) or jsonl |

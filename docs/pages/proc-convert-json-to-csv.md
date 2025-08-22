---
layout: page
title: converter_json_to_csv
parent: Processors
permalink: /processors/converter-json-to-csv
description: "Convert JSON to CSV to automatically to streamline data processing and system integration."
---

# converter_json_to_csv Processor
{: .fs-7 }

The **`converter_json_to_csv`** processor transforms a JSON array of objects into a CSV document.  

Use this processor to export structured data to a tabular format for spreadsheets, reports, or systems that require flat-file input.

---

**Settings**
{: .fs-4 }


| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `timeout`                     | maximum time allowed to complete the conversion |
| `field.delimiter`             | indicate the field delimiter, e.g. comma, semicolon, tab (\t), ^, \|, etc.  comma is the default delimiter for CSV files |
| `file.headers`                | specify headers here to override json keys |
| `input.format`                | indicate if the input is JSON or JSONL |
| `sort.columns`                | sort the output by the field names (i.e. column name); default=false |

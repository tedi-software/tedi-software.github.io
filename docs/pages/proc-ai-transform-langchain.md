---
layout: page
title: ai_transform_langchain
parent: Processors
permalink: /processors/ai-transform-langchain
description: "Integrate LangChain for AI-powered reasoning, transformation, and dynamic logic in your system workflows."

---

# ai_transform_langchain Processor
{: .fs-7 }

The **`ai_transform_langchain`** processor integrates with LangChain to perform AI-driven reasoning, transformation, and logic within your data pipeline.  

Use it to execute chains that perform contextual analysis, enrich or restructure data, or apply prompt-driven logic to dynamic inputs.  
Whether you're leveraging LLMs to interpret, reformat, or route content — this processor gives you a flexible interface to LangChain’s powerful capabilities.

The use cases are virtually unlimited.

---

**Settings**
{: .fs-4 }


| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `sub.service.type.config`     | http configuration (httpout service settings) to make the API requests (inc_http.properties) |
| `langchain.chain.name`        | chain name to invoke on the LangChain server |
| `langchain.temperature`       | controls randomness (0 = deterministic, 1 = creative) |
| `langchain.top.p`             | nucleus sampling (0–1); often left at 1.0 |
| `langchain.max.tokens`        | limit token output (helps cost, latency) |
| `langchain.response.format`        | controls how the AI service formats its response [ text \| json_object ]| 
| `langchain.response.output.format` |  format to extract from the response [json, xml, csv, raw, regex] | 
| `langchain.response.output.format.regex`        | use a regular expression to extract the desired content | 
| `langchain.response.output.format.regex.group`  | if using regex, specify the group (optional) | 
| `langchain.prompt.templated `            | allow the use of templated prompts in the AI service | 
| `langchain.log.prompt`            | log the prompt (only if templated prompt is used) | 
| `langchain.prompt`               | the prompt to use for the AI service.  | 

---
layout: page
title: ai_transform_openai
parent: Processors
permalink: /processors/ai-transform-openai
description: "Integrate OpenAI for AI-driven reasoning, dynamic data transformation, and intelligent logic steps in system workflows."
---

# ai_transform_openai Processor
{: .fs-7 }

The **`ai_transform_openai`** processor enables seamless integration with OpenAI's high-performance LLMs as a reasoning or transformation step within your data pipeline. 

Use it to inject AI-powered decision-making, contextual analysis, or format conversion directly into your workflows. Whether you're enriching records, restructuring output, or applying custom logic through prompts — this processor gives you a flexible, extensible interface to openai's models. 

The use cases are virtually unlimited.

---

**Settings**
{: .fs-4 }


| **Setting**                   | **Description**           |
|:------------------------------|:--------------------------|
| `sub.service.type.config`     | http configuration (httpout service settings) to make the API requests (inc_http.properties) |
| `openai.model`                  | specify the LLM name (e.g. mixtral-8x7b, gpt-4,llama3-70b-8192) |
| `openai.temperature`            | controls randomness (0 = deterministic, 1 = creative) |
| `openai.top.p`                  | nucleus sampling (0–1); often left at 1.0 |
| `openai.max.tokens`             | limit token output (helps cost, latency) |
| `openai.stop`                   | custom stop sequences (e.g. ["\n\n"]) |
|                               | note: not curerntly used | 
| `openai.response.format`        | controls how the AI service formats its response [ text \| json_object ]| 
| `openai.response.output.format` |  format to extract from the response [json, xml, csv, raw, regex] | 
| `openai.response.output.format.regex`        | use a regular expression to extract the desired content | 
| `openai.response.output.format.regex.group`  | if using regex, specify the group (optional) | 
| `openai.prompt.templated `            | allow the use of templated prompts in the AI service | 
| `openai.log.prompt`            | log the prompt (only if templated prompt is used) | 
| `openai.prompt`               | the prompt to use for the AI service.  | 

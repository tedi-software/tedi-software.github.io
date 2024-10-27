---
layout: page
title: Properties Files
parent: TEDI Components
permalink: /components/properties
nav_order: 2
description: "Configure TEDI systems integrations with customizable properties, streamlining settings to enhance enterprise component performance and adaptability"
---

# Properties Files
{: .fs-7 }

**`file-name.properties`** are simple key=value files used to configure all things in TEDI.

{: .important }
>
> TEDI uses the UTF-8 character set; however, do **not** use special characters or non-printable characters in property files.


---

**Collections**
{: .fs-4 }

In order to specify a collection of related settings, which result in duplicated key names, TEDI employs the following syntax: `{integer}.key`

For example:

```sh
0.key_1 = value_1
1.key_1 = value_2
2.key_1 = value_3
```

For more nested collections, TEDI will augment the syntax and add more integer segments: `{integer}.{integer}.key`

{: .highlight }
> TEDI is a zero-based index system. Counting always starts at 0. You're welcome.

---

**Comments**
{: .fs-4 }

```sh
# prefix the line with the pound sign as in a shell script to add comments

# ----------------------------------------------------------------------
#  for multi-line comments, repeat #
# ----------------------------------------------------------------------
```

---

**Single Line Values**
{: .fs-4 }

spacing is allowed between the key and value. Whitespace will be ignored.

```sh
key = value
```

---

**Multi-Line Values**
{: .fs-4 }

for multi-line values, use a backslash \ to indicate the value continues on the next line.
note - white-space is not preserved by default.

Enclose each line in quotes " " if you need to preserve the whitespace.

```sh

key =   value-1 \
      , value-2 \
      , value-3

key =   "Lorem ipsum dolor sit amet, consectetur adipiscing elit "  \
        "minim veniam, quis nostrud exercitation ullamco laboris "  \
        "in voluptate velit esse cillum dolore eu fart"
```

---

**Includes**
{: .fs-4 }

You can also include other files using the keyword `.include`

Using the `.include` will allow you to easily reuse property files between the services in your workflows.

```sh
.include =  /absolute/path/to/files.properties
.include =  ../../relative/path/to/files.properties
```

---

**Environment Variables**
{: .fs-4 }

You can inject environment variables via the `.env.{key}` syntax.
```sh
.env.user_name = USER_NAME
```

{: .note }
>
> You cannot inject an environment variable into a string of text

For example, this is not currently supported:

```sh
    key =  "Lorem ipsum dolor sit amet, ${ENVIRONMENT_VARIABLE} consectetur adipiscing elit "
```
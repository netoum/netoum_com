---
title: "Gettext and Cldr"
description: "Localization made easy with Gettext and Cldr"
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-10T16:04:48+02:00
draft: true
menu:
  docs:
    parent: ""
    identifier: "gettext-6a1a6be4373e933280d78ea5f45e6158e"
weight: 810
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Setup Gettext

Edit `live_air/lib/live_air_web/gettext.ex` with

```
  use Gettext,
    otp_app: :live_air,
    default_locale: "en",
    locales: ~w("fr")
```

## Setup Cldr

Add the follwing to your `mix.ex`

```
  {:ex_cldr, "~> 2.37.2"},
  {:ex_cldr_plugs, "~> 1.3"},
  {:ex_cldr_locale_display, "~> 1.4"},
  {:ex_cldr_currencies, "~> 2.15"},
  {:ex_cldr_dates_times, "~> 2.14"},

```
Run `mix deps.get`

Create a new file `live_air/cldr.ex` with the followng content

```
defmodule LiveAir.Cldr do
  @moduledoc """
  Define a backend module that will host our
  Cldr configuration and public API.

  Most function calls in Cldr will be calls
  to functions on this module.
  """
  use Cldr,
    locales: ["en", "fr"],
    default_locale: "en",
    gettext: LiveAirWeb.Gettext,
    providers: [
      Cldr.Number,
      Cldr.Calendar,
      Cldr.DateTime,
      Cldr.Territory,
      Cldr.LocaleDisplay
    ]
end

```


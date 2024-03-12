---
title: "Flytis.com (Beta) is now live"
description: "The next generation of flight booking is now live"
summary: "Experience the next generation a streamlined booking process with no ads, no tracking, and no price changes."
date: 2024-03-01T16:27:22+02:00
lastmod: 2024-03-09T16:27:22+02:00
draft: false
weight: 50
categories: ["Elixir", "Phoenix Framework", "Production"]
tags: []
contributors: []
pinned: false
homepage: false

seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

[Flytis.com](https://wwww.flytis.com), is now live.
Direct and instant booking from over 30+ airlines.

Experience the next generation a streamlined booking process with
no ads, no tracking, and no price changes.
Fast, hassle-free bookings await you.

{{< card-grid >}}
  {{< link-card title="Flytis.com"
    description="Try it out"
 target="_blank" href="https://www.flytis.com" >}}
  {{< link-card title="Open source"
  description="Check out LiveAir" href="/sharings/phoenix/liveair" >}}
{{< /card-grid >}}

## The Beginning of time

My journey into Elixir, Phoenix and Liveview started when reading about [Changelog website](https://changelog.com/) and how fast it was reported by many developers. 
This is where it all started 
```
  asdf install
  mix phx.new
  mix ecto.create
  mix format
  mix test

A few weeks past and I started to feel that this language / technology has something different.

Let's be honest, learning a new language is always a difficult task.
In my own experience, starting with a small project that allows to cover the basics is the best way to go.

The hard part is to find the scale of the project, too small and you will miss some important concept and too big and you will more patch things that constructing them.

This is where I was browsing the companies currently using Elixir in general and found an article about Duffel Travel API.

Once again `duffel.com -> Ressources -> Documentation`

I immediately knew that this will be my first project with  Phoenix Liveview.

I contacted Duffel in order to know in they had an example or packages in Elixir but despite and very quick and enthusiastic answer, I didn't have have any resources available as it is currently not requested by developers. 
It reaffirm my conviction that this would be it.

## Technologies

Flytis.com is fully build with Elixir and Phoenix Framework from development to production: 

- [Elixir](https://elixir-lang.org/) is a dynamic, functional language for building scalable and maintainable applications.

- [Phoenix Framework](https://www.phoenixframework.org/) is a web development framework for the Elixir programming language.

- [Surface](https://surface-ui.org/) A server-side rendering component library for Phoenix Framework

- [Moon Design](https://surface.moon.io/) Moon Design System is a collection of reusable components build with Surface

- [Gigalixir](https://www.gigalixir.com) is a fully-featured, production-stable platform-as-a-service built just for Elixir

- [Duffel API](https://www.duffel.com) Sell travel,
without the complexity. Any business can build flights and accommodation, purchase extras, manage bookings and more.

-HTTPoison for managing the communication with Duffel API

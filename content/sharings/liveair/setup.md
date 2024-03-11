---
title: "Live Air Setup"
description: "Install Asdf, Erlang, Elixir and Phoenix and get you Duffel API key"
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-09T16:04:48+02:00
draft: false
menu:
  docs:
    parent: ""
    identifier: "setup-6a1a6be4373e933280d78ea5f45e6158e"
weight: 810
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

The goal of the sharing to build the basic for a flight search booking with Elixir and Phoenix Framework. 

This open source project **is not for production** but for educational purpose only

- [Elixir](https://elixir-lang.org/) is a dynamic, functional language for building scalable and maintainable applications.

- [Phoenix Framework](https://www.phoenixframework.org/) is a web development framework for the Elixir programming language.

- [Surface](https://surface-ui.org/) A server-side rendering component library for Phoenix Framework

- [Moon Design](https://surface.moon.io/) Moon Design System is a collection of reusable components build with Surface

- [Gigalixir](https://www.gigalixir.com) is a fully-featured, production-stable platform-as-a-service built just for Elixir

- [Duffel API](https://www.duffel.com). Build an intuitive flight search, offer loyalty programme perks, add seats and bags, manage your orders, and more.

## Install Asdf

We advise to use asdf in order to manage the versions for Erlang, Elixr, Node and Postres

> Depending on your OS, you will find detailled intructions on Asdf offical documentation. Despite a mild complex setup, asdf has been saving a lot of time, effort and joy


On a parent folder create a file

    .tool-versions

Add the following content, we are using the latest versions available

    elixir 1.16.1
    erlang 26.2.2
    nodejs 21.6.1
    postgres 15.4

Then run 

    asdf install

## Install Phoenix

Install Hex and Phoenix

    mix local.hex
    mix archive.install hex phx_new

## Create your project

We are now ready to create our Phoenix app

    mix phx.new live_air

Lets save our project to github

    cd live_air
    git init

You can then commit and publish your branch. By default we name our branch "master"


> Using Git is essential in this project, however we will not go over the command. If you are starting with Github, we recommend using [Github Desktop](https://desktop.github.com/) for a start. I simplify, adding project, publishing, switching branches , commiting,etc  

{{< link-card
  title="Download the final project"
  description="Full project on github"
  href="https://github.com/netoum/live_air"
  target="_blank"
>}}
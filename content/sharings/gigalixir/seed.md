---
title: "How to Seed on Gigalixir"
description: "How to setup your Seeds in Gigalixir"
summary: "Use the build'in functions of gigalixir to setup your seeds"
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-09T16:04:48+02:00
draft: false
menu:
  docs:
    parent: ""
    identifier: "seeds-6a1a6be4373e933281d78ea53de6158e"
weight: 810
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---


> This sharing assumes that you already have a deployed version of your application on Gigalixir using **Elixir Releases**

{{< link-card
  title="Getting started with Gigalixir"
  description="Deploy your first application"
  href="https://www.gigalixir.com/docs/getting-started-guide/phoenix-releases-deploy"
  target="_blank"
>}}

Gigalixit made it very easy to seed in 3 simple steps

## 1- Login to your remote console

Add your SSH key to remote server

    gigalixir account:ssh_keys:add "$(cat ~/.ssh/id_rsa.pub)"

Login to your console

    gigalixir ps:remote_console

> Once in the remote console, your input may get slower, so give it couple of seconds when your paste or press enter

## 2- Locate your seed file

  You need to tell Gigalixir where your seed file file, by default it should be in your priv directory. 

    seed_script = Path.join(["#{:code.priv_dir(:myapp)}", "repo", "seeds.exs"])

  > We are here using the buildin function :code.priv_dir(:myapp) in order to retreive the priv folder. 
  We can also use this function insside your elixir code, for example to write or read files 

## 3- Execute the script

  Then we can execute the file with the following command

    Code.eval_file(seed_script)

## Further reading

- Read [LiveAir](https://netoum.com/sharings/liveair/), a personal journey into Phoenix Framework

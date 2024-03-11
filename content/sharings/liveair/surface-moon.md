---
title: "Surface and Moon Setup"
description: "Install and setup Surface and Moon Design System"
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-09T16:04:48+02:00
draft: false
menu:
  docs:
    parent: ""
    identifier: "surfacemoon-6a1a6be4373e933280d78ea5f45e6158e"
weight: 810
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

> The [official documentation of Moon Design](https://surface.moon.io/getting-started?role=I%27m+a+developer) provides the steps to install it, however we are going to make some modifications in order to get it ready for production. This modifications are mainly related to relative links in the Config file

## Add Moon Design dependency

We will using thelatest version of the Hex package of Moon
In your `mix.ex` file add the following under tour deps

    {:moon, "~> 2.81.0"}


We also need to add the latest version of Sourceror due to a [bug](https://github.com/surface-ui/surface/issues/707) in the older version of Surface use in moon

    {:sourceror, "~> 0.12.0"}


And run `mix deps.get`

Oups , we have some conflict. This happens because we are using a newer version of Phoenix
Lets downgrade some deps to fit Moon requirements.

    {:phoenix_html, "~> 3.0"},
    {:phoenix_live_view, "~> 0.18.3"},
    {:phoenix_live_dashboard, "~> 0.7.2"},


Run again `mix deps.get`


## Mix Compile

Create a new file in `config/surface.ex` and copy the content of `deps/moon/config/surface.exs` into it

We can now edit our `config/config.exs` file

Add the following 

    import_config "surface.exs"
    config :surface, :components, []

Modify the Node Path to the config

    env: %{"NODE_PATH" => "#{Path.expand("../deps", __DIR__)}:./node_modules"}

You can now run `mix compile` (be aware, it will take some time)

## Mix Surface Init

We now need to configure Surface because moon depend on it and because we love it.

    mix surface.init

## Layout

Lets setup our layout with Surface emebed templates
The original layout folder is inside components, however the module name does not include components. The layout folder should potentially be on the root of our `live_air_web` folder

So lets move the `layouts` folder and `layout.ex` to `live_air_web` folder

We will now edit `layout.ex` 

Remove 

    embed_templates "layouts/*"

Add

    embed_sface("layouts/master.sface")
    embed_sface("layouts/root.sface")

Replace the `html.heex` template by the Surface alternative `.sface`

In the `root.sface`


    <!DOCTYPE html>
    <html lang="en" class="[scrollbar-gutter:stable]">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="csrf-token" content={get_csrf_token()} />
        <title>{assigns[:page_title] || dgettext("layouts", "Flytis, booking simply")}</title>
        <link phx-track-static rel="stylesheet" href={~p"/assets/app.css"} />
        <script defer phx-track-static type="text/javascript" src={~p"/assets/app.js"}>
        </script>
      </head>
      <body class="bg-white antialiased">
        {@inner_content}
      </body>
    </html>



In the `app.sface`

Replace `<%= @inner_content %>` by `{@inner_content}`
and replace `<%= Application.spec(:phoenix, :vsn) %> ` by `{Application.spec(:phoenix, :vsn) }`

## Moon Icons and Assets

We add the Moon icons to our `endpoint.ex` file

    plug Plug.Static,
    at: "/moon/assets",
    from: :moon,
    gzip: false,
    only: ~w(assets themes images fonts svgs favicon.ico robots.txt),
    cache_control_for_etags: "public, max-age=86400"

    plug Plug.Static,
    at: "/moon_icons/",
    from: :moon_icons,
    gzip: true,
    cache_control_for_etags: "public, max-age=86400"

## App JS

Replace 

```
let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {
  longPollFallbackMs: 2500,
  params: {_csrf_token: csrfToken}
})
```

by 

```
import Hooks from "./_hooks"
import MoonHooks from "../../deps/moon/assets/js/hooks"

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {
  longPollFallbackMs: 2500,
  params: {
    _csrf_token: csrfToken
    },
  hooks: {
    ...MoonHooks,
    ...Hooks
  }})
```

## Moon Theme CSS

We theme add our them css
Lets create a `live_air/assets/css/theme/moon.css` file and copy the content of `live_air/deps/moon/priv/static/themes/moon.css` in to it

We also need to add our theme class to our html
Open `live_air/lib/live_air_web/layouts/root.sface`

and replace the body class

    <body class="theme-moon-light">
    {@inner_content}
    </body>

## Assets Package JSON


Create `assets.package.json` with the following content

    {
      "name": "assets",
      "version": "1.0.0",
      "description": "",
      "main": "tailwind.config.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "deploy": "cd .. && mix assets.deploy && rm -f _build/esbuild",
        "build": "tailwindcss -i css/app.css -o ../priv/static/assets/app.css --postcss",
        "watch": "tailwindcss -i css/app.css -o ../priv/static/assets/app.css --postcss --watch"
      },
      "dependencies": {
        "@popperjs/core": "^2.11.6",
        "@tailwindcss/forms": "^0.4.0",
        "autoprefixer": "^10.4.2",
        "postcss": "^8.4.5",
        "postcss-import": "^14.0.2",
        "scroll-into-view-if-needed": "^3.0.10",
        "smooth-scroll-into-view-if-needed": "^2.0.0",
        "tailwindcss": "^3.3.2"
      },
      "author": "",
      "license": "ISC",
      "devDependencies": {
        "postcss-nesting": "^12.0.1"
      }
    }

> Please note the additional deploy line. This is needed later by Gigalixir for deployment 


## Post CSS

Create a `live_air/assets/postcss.config.js` file with the following content

    module.exports = {
      plugins: {
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {}
      }
    }

## Tailwind Config

> Once again for deployment purposes, we need to import moon tailwind config directly and not from the deps folder.

1 Create `live_air/assets/js/moon` folder and copy the followinf the folling files

    live_air/deps/moon/assets/js/bottomsheet.config.js
    live_air/deps/moon/assets/js/breadcrumb.config.js
    live_air/deps/moon/assets/js/dropdown.config.js
    live_air/deps/moon/assets/ds-moon-preset.js
    live_air/deps/moon/assets/colors.json

2 Edit your Tailwind config file to combin Moon and Phoenix setup

Your final file should looki like this

```
const plugin = require("tailwindcss/plugin");
const { tailwindClassesBottomsheet } = require("./js/moon/bottomsheet.config");
const { tailwindClassesDropdown } = require("./js/moon/dropdown.config");
const { tailwindClassesBreadcrumb } = require("./js/moon/breadcrumb.config"); 

//as Variant of using rgba color with opacity
const withOpacityValue = (rgbColor) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${rgbColor}))`;
    }
    return `rgb(var(${rgbColor}) / ${opacityValue})`;
  };
};

module.exports = {
  content: [
    "./js/**/*.js",
    "../lib/live_air_web.ex",
    "../lib/live_air_web/**/*.*ex",
    "../lib/live_air_web/**/*.sface",
    "../deps/moon/lib/**/*.ex",
    "../deps/moon/lib/**/*.heex",
    "../deps/moon/lib/**/*.eex",
    "../deps/moon/assets/js/**/*.js",
  ],
  safelist: [
    "bg-krillin-10",
    "bg-krillin-60",
    "bg-krillin",
    "bg-chichi-10",
    "bg-chichi-60",
    "bg-chichi",
    "bg-roshi-10",
    "bg-roshi-60",
    "bg-roshi",
    "bg-dodoria-10",
    "bg-dodoria-60",
    "bg-dodoria",
    "bg-cell-10",
    "bg-cell-60",
    "bg-cell",
    "bg-raditz-10",
    "bg-raditz-60",
    "bg-raditz",
    "bg-whis-10",
    "bg-whis-60",
    "bg-whis",
    "bg-frieza-10",
    "bg-frieza-60",
    "bg-frieza",
    "bg-nappa-10",
    "bg-nappa-60",
    "bg-nappa",
    "bg-piccolo",
    "bg-hit",
    "bg-goten",
    "bg-popo",
    "bg-goku",
    "bg-gohan",
    "bg-beerus",
    "bg-bulma",
    "bg-trunks",
    "bg-jiren",
    "bg-heles",
    "bg-zeno",
    "text-krillin-10",
    "text-krillin-60",
    "text-krillin",
    "text-chichi-10",
    "text-chichi-60",
    "text-chichi",
    "text-roshi-10",
    "text-roshi-60",
    "text-roshi",
    "text-dodoria-10",
    "text-dodoria-60",
    "text-dodoria",
    "text-cell-10",
    "text-cell-60",
    "text-cell",
    "text-raditz-10",
    "text-raditz-60",
    "text-raditz",
    "text-whis-10",
    "text-whis-60",
    "text-whis",
    "text-frieza-10",
    "text-frieza-60",
    "text-frieza",
    "text-nappa-10",
    "text-nappa-60",
    "text-nappa",
    "text-piccolo",
    "text-hit",
    "text-goten",
    "text-goku",
    "text-gohan",
    "text-popo",
    "text-beerus",
    "text-bulma",
    "text-trunks",
    "border-krillin-10",
    "border-krillin-60",
    "border-krillin",
    "border-chichi-10",
    "border-chichi-60",
    "border-chichi",
    "border-roshi-10",
    "border-roshi-60",
    "border-roshi",
    "border-dodoria-10",
    "border-dodoria-60",
    "border-dodoria",
    "border-cell-10",
    "border-cell-60",
    "border-cell",
    "border-raditz-10",
    "border-raditz-60",
    "border-raditz",
    "border-whis-10",
    "border-whis-60",
    "border-whis",
    "border-frieza-10",
    "border-frieza-60",
    "border-frieza",
    "border-nappa-10",
    "border-nappa-60",
    "border-nappa",
    "border-piccolo",
    "border-hit",
    "border-goten",
    "border-goku",
    "border-gohan",
    "border-popo",
    "border-beerus",
    "border-bulma",
    "border-trunks",
  ].concat(tailwindClassesBottomsheet(), tailwindClassesDropdown(), tailwindClassesBreadcrumb()),
  
  theme: {
    extend: {
      backgroundOpacity: {
        12: "0.12",
      },
      colors: require("./colors.json"),
      screens: {
        "3xl": "1800px",
      },
      fontFamily: {
        grotesk: 'var(--grotesk), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        averta:
          'var(--averta), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        'dm-sans':
          'var(--dm-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(({ addVariant }) => addVariant("phx-no-feedback", [".phx-no-feedback&", ".phx-no-feedback &"])),
    plugin(({ addVariant }) => addVariant("phx-click-loading", [".phx-click-loading&", ".phx-click-loading &"])),
    plugin(({ addVariant }) => addVariant("phx-submit-loading", [".phx-submit-loading&", ".phx-submit-loading &"])),
    plugin(({ addVariant }) => addVariant("phx-change-loading", [".phx-change-loading&", ".phx-change-loading &"])),  
    plugin(({ addComponents }) => {
      addComponents({
        ".btn-primary": {
          color: "rgb(var(--goten))",
          backgroundColor: `rgb(var(--piccolo))`,
        },
        ".btn-secondary": {
          color: "rgb(var(--bulma))",
          background: "none",
          boxShadow: `inset 0 0 0 1px rgb(var(--trunks)/1)`,
          "&:hover": {
            boxShadow: `inset 0 0 0 1px rgb(var(--bulma))`,
          },
        },
        ".btn-tertiary": {
          color: "rgb(var(--goten))",
          backgroundColor: "rgb(var(--hit))",
        },
        ".anim-error": {
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        },
        ".anim-pulse": {
          boxShadow: "0 0 0 0 rgb(var(--piccolo))",
        },
        ".input-number-clear": {
          MozAppearance: "textfield",
          "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
            opacity: 0,
          },
        },
        ".input-xl": {
          "&:not(:focus):not([disabled])::placeholder": {
            opacity: 0,
          },
          "&:not(:focus):not([disabled]):placeholder-shown + label": {
            top: "50%",
            marginTop: "-0.438rem",
            fontSize: "1rem",
            lineHeight: "1rem",
          },
        },
        ".input-dt-shared": {
          "&::-webkit-datetime-edit, &::-webkit-date-and-time-value": {
            display: "block",
            padding: 0,
            height: "2.375rem",
            lineHeight: "2.375rem",
          },
          "&::-webkit-date-and-time-value": {
            paddingTop: "0.5rem",
          },
          "&::-webkit-calendar-picker-indicator": {
            position: "absolute",
          },
        },
        ".input-lg-dt-shared": {
          "&::-webkit-datetime-edit": {
            height: "2.875rem",
            lineHeight: "2.875rem",
          },
          "&::-webkit-date-and-time-value": {
            paddingTop: "0.625rem",
          },
        },
        ".input-xl-dt-shared": {
          "&::-webkit-datetime-edit": {
            height: "3.5rem",
            lineHeight: "3.5rem",
          },
          "&::-webkit-date-and-time-value": {
            paddingTop: "1rem",
          },
        },
        ".input-xl-dt-label": {
          "&::-webkit-datetime-edit": {
            height: "2.25rem",
            lineHeight: "2.125rem",
          },
          "&::-webkit-date-and-time-value": {
            paddingTop: 0,
          },
        },
        ".input-d": {
          "&::-webkit-calendar-picker-indicator": {
            right: "0.875rem",
          },
        },
        ".input-t": {
          "&::-webkit-calendar-picker-indicator": {
            right: "0.875rem",
          },
        },
        ".input-d-rtl": {
          //type === 'date' rtl
          "&::-webkit-datetime-edit, &::-webkit-date-and-time-value": {
            position: "absolute",
            right: "0",
          },
          "&::-webkit-calendar-picker-indicator": {
            left: "0.5rem",
          },
        },
        ".input-t-rtl": {
          //type === 'time' rtl
          "&::-webkit-datetime-edit, &::-webkit-date-and-time-value": {
            position: "absolute",
            right: "0.5rem",
          },
          "&::-webkit-calendar-picker-indicator": {
            left: "0.5rem",
          },
        },
        ".input-dt-local-rtl": {
          //type === 'datetime-local' rtl
          "&::-webkit-datetime-edit, &::-webkit-date-and-time-value": {
            position: "absolute",
            right: "0",
          },
          "&::-webkit-calendar-picker-indicator": {
            left: "0.5rem",
          },
        },
        ".input-rsb-hidden": {
          "&:not(:hover):not(:focus):not(:invalid)": {
            clipPath: `inset(calc(var(--border-i-width) * -1) 0.125rem calc(var(--border-i-width) * -1) 0)`,
          },
        },
        ".input-lsb-hidden": {
          "&:not(:hover):not(:focus):not(:invalid)": {
            clipPath: `inset(calc(var(--border-i-width) * -1) 0 calc(var(--border-i-width) * -1) 0.125rem)`,
          },
        },
        ".input-tbb-hidden": {
          "&:not(:hover):not(:focus):not(:invalid)": {
            clipPath: `inset(0.125rem calc(var(--border-i-width) * -1) 0 calc(var(--border-i-width) * -1))`,
          },
        },
        ".input-bbb-hidden": {
          "&:not(:hover):not(:focus):not(:invalid)": {
            clipPath: `inset(0 calc(var(--border-i-width) * -1) 0.125rem calc(var(--border-i-width) * -1))`,
          },
        },
        ".brcrumb-li": {
          "& a, & span": {
            padding: "0.5rem",
          },
        },
      });
    }),
  ],
  presets: [require("./js/moon/ds-moon-preset")],
};


```

## Mix Assets Setup

In your file edit the following

```
      "assets.setup": ["cmd --cd assets npm i", "esbuild.install --if-missing"],
      "assets.build": ["cmd --cd assets npm run build", "esbuild default"],
      "assets.clean": ["cmd rm -rf assets/node_modules", "phx.digest.clean --all"]
```

You can now run `mix.assets.setup`



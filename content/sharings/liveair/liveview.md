---
title: "Home Live View"
description: "Setup the first live view using Surface"
summary: ""
date: 2023-09-07T16:04:48+02:00
lastmod: 2023-09-09T16:04:48+02:00
draft: false
menu:
  docs:
    parent: ""
    identifier: "live-6a1a6be4373e933280d78ea5f45e6158e"
weight: 810
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---

## Mix Test

Before to start lets run the inital test suite with `mix test`

```
Finished in 0.1 seconds (0.06s async, 0.09s sync)
5 tests, 0 failures
```

## First Surface LiveView

Lets create our first Surface Live View.

    live_air/lib/live_air_web/live/home_live/index.ex
```
defmodule LiveAirWeb.HomeLive.Index do
  use LiveAirWeb, :surface_live_view

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply,
     socket
     |> apply_action(socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "Live Air")
  end
end

```

And the sface template

    live_air/lib/live_air_web/live/home_live/index.sface

    ```
    <div>
    Home
    </div>
    ```

We also want to edit the `router.ex` to point the homepage to our Live View

Replace `get "/", PageController, :home` by `live "/", HomeLive.Index, :new`

We can now run `mix phx.server`

Great we have our first Live View.


## First Moon/Surface Component

Lets test our Live View with a simple button
In your `live_air/lib/live_air_web/live/home_live/index.sface`

Let replace it by

```
  <div>
    <Button variant="outline" on_click="set_open">
      Modal on large screens
    </Button>
    <BottomSheet id="modal_bottom_sheet" as_modal_on="lg">
      <BottomSheet.Backdrop />
      <BottomSheet.Panel class="px-0">
        <BottomSheet.Header class="border-b-2 border-beerus">
          <BottomSheet.DragHandle />
          <h3 class="text-moon-18 text-bulma font-medium text-center pt-2">Do you think I'm Modal?</h3>
        </BottomSheet.Header>
        <p class="p-4 text-trunks">
          Well, I'm a BottomSheet that looks like Modal on large screens ( > 1024px).
          Try resizing your window to see how I adapt.
        </p>
        <div class="p-4">
          <Button size="lg" full_width on_click="set_close">
            Got it!
          </Button>
        </div>
      </BottomSheet.Panel>
    </BottomSheet>
  </div>

```

You also need to add the following to your `live_air/lib/live_air_web/live/home_live/index.ex`

    alias Moon.Design.Button
    alias Moon.Design.BottomSheet

      def handle_event("set_open", _, socket) do
    BottomSheet.open("modal_bottom_sheet")
    {:noreply, socket}
  end
  
  def handle_event("set_close", _, socket) do
    BottomSheet.close("modal_bottom_sheet")
    {:noreply, socket}
  end

  Let run  `mix phx.server` and see our modal/bottomsheet in action

  However if we run `mix test` our previous test are failing
  Let's investigate

  We see that `live_air/test/live_air_web/controllers/page_controller_test.exs` that is failing because we removed the original homepage.

  Let's replace it with a temporary test until the homepage is completed

  ```
    test "GET /", %{conn: conn} do
    conn = get(conn, ~p"/")
    assert html_response(conn, 200) =~ "Homepage Button"
    end
  ```

  Lets run again `mix test`

  Feel free to visit [Moon Design Documentation](https://surface.moon.io/) and try out the different components. They are provided with full examples and data.
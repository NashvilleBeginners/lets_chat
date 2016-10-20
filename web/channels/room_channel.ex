defmodule LetsChat.RoomChannel do
  use LetsChat.Web, :channel

  def join("rooms:lobby", _params, socket) do
    {:ok, socket}
  end

  def handle_in("new_msg", params, socket) do
    broadcast! socket, "new_message", %{
      user: "anon",
      body: params["body"]
    }
    {:reply, :ok, socket}
  end
end

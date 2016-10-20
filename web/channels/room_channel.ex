defmodule LetsChat.RoomChannel do
  use LetsChat.Web, :channel

  def join("rooms:lobby", _params, socket) do
    {:ok, socket}
  end
end

defmodule LetsChat.RoomChannel do
  use Phoenix.Channel
  alias LetsChat.User
  alias LetsChat.Repo

  def join("room:lobby", _message, socket) do
    IO.puts "User##{socket.assigns.user_id} joined rooms:lobby"
    { :ok, socket }
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    { :error, %{ reason: "unauthorized" }}
  end

  def handle_in("whoami", _body, socket) do
    user = Repo.get(User, socket.assigns.user_id)
    { :reply, { :ok, %{ body: user.username }}, socket }
  end

  def handle_out(name, payload, socket) do
    push socket, name, payload
    {:noreply, socket}
  end
end

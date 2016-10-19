defmodule LetsChat.RoomChannel do
  use Phoenix.Channel
  alias LetsChat.User
  alias LetsChat.Room
  alias LetsChat.Repo
  import Ecto.Query

  def join("room:lobby", _message, socket) do
    IO.puts "User##{socket.assigns.user_id} joined rooms:lobby"
    { :ok, socket }
  end

  def join("room:" <> room_id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("get_rooms", _body, socket) do
    rooms = Repo.all(from r in Room, select: r.name, order_by: r.name)
    {:reply, {:ok, %{rooms: rooms}}, socket}
  end

  def handle_in("whoami", _body, socket) do
    user = Repo.get(User, socket.assigns.user_id)
    { :reply, { :ok, %{ username: user.username }}, socket }
  end

  def handle_out(name, payload, socket) do
    push socket, name, payload
    {:noreply, socket}
  end
end

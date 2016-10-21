defmodule LetsChat.RoomChannel do
  use Phoenix.Channel
  alias LetsChat.{User, Room, Message, Repo}
  alias LetsChat.Repo
  import Ecto.Query
  require IEx

  def join("rooms:lobby", _message, socket) do
    IO.puts "User##{socket.assigns.user_id} joined rooms:lobby"
    { :ok, socket }
  end

  def join("rooms:" <> room_id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("get_rooms", _body, socket) do
    rooms = Repo.all(from r in Room, select: r.name, order_by: r.name)
    {:reply, {:ok, %{rooms: rooms}}, socket}
  end

  def handle_in("get_messages", _body, %Phoenix.Socket{topic: "rooms:" <> room} = socket) do
    join_query = from m in Message, join: r in Room, where: r.id == m.room_id, join: u in User, where: u.id == m.user_id
    query = from [m, r, u] in join_query,
      where: r.name == ^room,
      select: %{body: m.body, username: u.username, avatar: u.avatar}

    messages = Repo.all(query)
    {:reply, {:ok, %{messages: messages}}, socket}
  end

  def handle_in("new_msg", %{"body" => body}, %Phoenix.Socket{assigns: %{user_id: user_id}, topic: "rooms:" <> room} = socket) do
    room = Repo.one(from r in Room, where: r.name == ^room)
    user = Repo.get(User, user_id)
    {:safe, text} = Phoenix.HTML.html_escape(body)

    case Repo.insert(%Message{body: text, user_id: user_id, room_id: room.id}) do
      {:ok, message} ->
        broadcast! socket, "new_msg", %{body: message.body, username: user.username, avatar: user.avatar}
        {:noreply, socket}
      _ ->
        {:error, socket}
    end
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

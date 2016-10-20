defmodule LetsChat.RoomChannel do
  use LetsChat.Web, :channel
  alias LetsChat.{Repo, User, Message}
  import Ecto.Query

  def join("rooms:lobby", _params, socket) do
    {:ok, socket}
  end

  def handle_in(event, params, socket) do
    user = Repo.get(LetsChat.User, socket.assigns.user_id)
    handle_in(event, params, user, socket)
  end

  def handle_in("new_msg", params, user, socket) do
    changeset = Message.changeset(%Message{}, Map.put_new(params, "user_id", user.id))

    case Repo.insert(changeset) do
      {:ok, message} ->
        broadcast! socket, "new_message", %{
          user: user.username,
          body: params["body"]
        }
        {:reply, :ok, socket}

      {:error, changeset} ->
        {:reply, {:error, %{errors: changeset}}, socket}
    end
  end
end

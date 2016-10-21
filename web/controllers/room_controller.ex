defmodule LetsChat.RoomController do
  use LetsChat.Web, :controller

  plug :authenticate when action in [:lobby]

  def lobby(conn, params) do
    render conn, "index.html"
  end

  defp authenticate(conn, _) do
    if current_user = conn.private.plug_session["current_user"] do
      conn
    else
      conn
      |> put_flash(:error, "You must be authenticated")
      |> redirect(to: page_path(conn, :index))
      |> halt()
    end
  end
end

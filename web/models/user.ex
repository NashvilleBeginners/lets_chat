defmodule LetsChat.User do
  use LetsChat.Web, :model
  alias Ueberauth.Auth
  alias LetsChat.{User, Repo}

  schema "users" do
    field :username, :string
    field :email, :string
    field :avatar, :string
    has_many :messages, LetsChat.Message

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :email, :avatar])
    |> validate_required([:username, :email])
    |> unique_constraint(:username)
    |> unique_constraint(:email)
  end

  def find_or_create(%Auth{} = auth) do
    user = Repo.one(from u in User, where: u.email == ^auth.info.email) || %User{}
    user
    |> changeset(basic_info(auth))
    |> Repo.insert_or_update
  end

  defp basic_info(auth) do
    %{username: auth.info.nickname, email: auth.info.email || "#{auth.info.nickname}@letschat.com", avatar: auth.info.urls.avatar_url}
  end
end

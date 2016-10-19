defmodule LetsChat.Message do
  use LetsChat.Web, :model

  schema "messages" do
    field :body, :string
    belongs_to :user, LetsChat.User
    belongs_to :room, LetsChat.Room

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:body])
    |> validate_required([:body])
  end
end

defmodule LetsChat.Repo.Migrations.CreateMessage do
  use Ecto.Migration

  def change do
    create table(:messages, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :body, :text
      add :user_id, references(:users, on_delete: :nothing, type: :binary_id)
      add :room_id, references(:rooms, on_delete: :nothing, type: :binary_id)

      timestamps()
    end
    create index(:messages, [:user_id])
    create index(:messages, [:room_id])

  end
end

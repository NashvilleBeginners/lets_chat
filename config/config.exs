# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :lets_chat,
  ecto_repos: [LetsChat.Repo]

# Configures the endpoint
config :lets_chat, LetsChat.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "FOMLrf1JAIntKx5ft/anrjr+lsfKuyMPE5xoyAr/mq/LoknPikEjwKqpw+KkQPa6",
  render_errors: [view: LetsChat.ErrorView, accepts: ~w(html json)],
  pubsub: [name: LetsChat.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

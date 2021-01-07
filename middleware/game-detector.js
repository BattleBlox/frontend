// REDIRECT: when no game has been setup
export default function ({ store, redirect }) {
  const currentPlayers = store.state.players.players

  if (currentPlayers.length === 0) {
    return redirect('/')
  }
}

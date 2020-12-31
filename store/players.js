import { PLAYERS_SET_PLAYERS } from './mutations.constants'

// eslint-disable-next-line no-unused-vars
const player = {
  name: 'Player 1',
  colour: 'red',
  isComputer: false,
  index: 1
}

export const state = () => ({
  players: []
})

export const mutations = {
  [PLAYERS_SET_PLAYERS]: (state, payload) => {
    state.players = payload
  }
}

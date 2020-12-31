import { PLAYERS_SET_PLAYERS } from './mutations.constants'

export const state = () => ({
  players: [{
    name: 'Player 1',
    colour: 'red',
    isComputer: false,
    index: 1
  },
  {
    name: 'Player 2',
    colour: 'blue',
    isComputer: true,
    index: 2
  }]
})

export const mutations = {
  [PLAYERS_SET_PLAYERS]: (state, payload) => {
    state.players = payload
  }
}

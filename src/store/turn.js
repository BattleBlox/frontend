import { TURN_SET_SELECTED_TILE, TURN_DESELECT_TILE, TURN_SELECT_PLAYER, TURN_SELECT_MODE } from '@/store/mutations.constants'

export const state = () => ({
  selectedTile: null,
  currentPlayer: null,
  currentMode: null
})

export const mutations = {
  [TURN_SET_SELECTED_TILE]: (state, selectedTile) => {
    state.selectedTile = selectedTile
  },

  [TURN_DESELECT_TILE]: (state) => {
    state.selectedTile = null
  },

  [TURN_SELECT_PLAYER]: (state, player) => {
    state.currentPlayer = player
  },

  [TURN_SELECT_MODE]: (state, mode) => {
    state.currentMode = mode
  }
}

export const actions = {
  selectTile: ({ commit, state }, payload) => {
    const { selectedTile, empire } = payload

    // PREVENT: Selection of free tiles
    if (empire === null) {
      return
    }

    // PREVENT: Selection of other player tiles
    if (empire !== state.currentPlayer) {
      return
    }

    if (state.selectedTile === null || selectedTile !== state.selectedTile) {
      commit(TURN_SET_SELECTED_TILE, selectedTile)
    } else {
      commit(TURN_DESELECT_TILE, selectedTile)
    }
  },

  selectPlayer: ({ commit }, player) => {
    commit(TURN_SELECT_PLAYER, player)
  },

  selectMode: ({ commit }, mode) => {
    commit(TURN_SELECT_MODE, mode)
  }
}

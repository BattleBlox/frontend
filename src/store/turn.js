import { TURN_SET_SELECTED_TILE, TURN_DESELECT_TILE, TURN_SELECT_PLAYER, TURN_SELECT_MODE, TURN_SET_RANGED_TILES, TURN_SET_HIT_POINTS, TURN_CLEAR_RANGED_TILES } from '@/store/mutations.constants'

export const state = () => ({
  selectedTile: null,
  currentPlayer: null,
  currentMode: null,
  rangedTiles: [],
  hitPoints: null
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
  },

  [TURN_SET_HIT_POINTS]: (state, hitPoints) => {
    state.hitPoints = hitPoints
  },

  [TURN_CLEAR_RANGED_TILES]: (state) => {
    state.rangedTiles = []
  },

  [TURN_SET_RANGED_TILES]: (state, focusTileIdentifier) => {
    const rangedTiles = []

    if (focusTileIdentifier < 90) {
      rangedTiles.push(focusTileIdentifier + 10)
    }

    if (focusTileIdentifier % 10 !== 1) {
      rangedTiles.push(focusTileIdentifier - 1)
    }

    if (focusTileIdentifier % 10 !== 0) {
      rangedTiles.push(focusTileIdentifier + 1)
    }

    if (focusTileIdentifier > 10) {
      rangedTiles.push(focusTileIdentifier - 10)
    }

    state.rangedTiles = rangedTiles
  }
}

export const actions = {
  endTurn: ({ commit, state, rootState }) => {
    commit(TURN_DESELECT_TILE)
    commit(TURN_SET_HIT_POINTS, 0)
    commit(TURN_CLEAR_RANGED_TILES)
    commit(TURN_SELECT_MODE, 'attack')

    const nextPlayer = rootState.players.players.find(plr => plr.name !== state.currentPlayer).name
    commit(TURN_SELECT_PLAYER, nextPlayer)
  },

  selectTile: ({ commit, state }, payload) => {
    const { selectedTile, empire, hitPoints } = payload

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
      commit(TURN_SET_RANGED_TILES, selectedTile)
      commit(TURN_SET_HIT_POINTS, hitPoints)
    } else {
      commit(TURN_DESELECT_TILE, selectedTile)
      commit(TURN_SET_HIT_POINTS, 0)
    }
  },

  selectPlayer: ({ commit }, player) => {
    commit(TURN_SELECT_PLAYER, player)
  },

  selectMode: ({ commit }, mode) => {
    commit(TURN_SELECT_MODE, mode)
  }
}

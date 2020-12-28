import {
  TURN_SET_SELECTED_TILE,
  TURN_DESELECT_TILE,
  TURN_SELECT_PLAYER,
  TURN_SELECT_MODE,
  TURN_SET_RANGED_TILES,
  TURN_SET_HIT_POINTS,
  TURN_CLEAR_RANGED_TILES,
  TURN_SET_ROLL_VALUE
} from '@/store/mutations.constants'

export const state = () => ({
  selectedTile: null,
  currentPlayer: null,
  currentMode: null,
  rangedTiles: [],
  selectedTileHitPoints: null,
  rollValue: 0
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
    state.selectedTileHitPoints = hitPoints
  },

  [TURN_SET_ROLL_VALUE]: (state, rollValue) => {
    state.rollValue = rollValue
  },

  [TURN_CLEAR_RANGED_TILES]: (state) => {
    state.rangedTiles = []
  },

  [TURN_SET_RANGED_TILES]: (state, { selectedTile, hitPoints }) => {
    const rangedTiles = []

    if (hitPoints > 1) {
      if (selectedTile < 90) {
        rangedTiles.push(selectedTile + 10)
      }

      if (selectedTile % 10 !== 1) {
        rangedTiles.push(selectedTile - 1)
      }

      if (selectedTile % 10 !== 0) {
        rangedTiles.push(selectedTile + 1)
      }

      if (selectedTile > 10) {
        rangedTiles.push(selectedTile - 10)
      }
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
      commit(TURN_SET_HIT_POINTS, hitPoints)

      if (state.currentMode === 'attack') {
        commit(TURN_SET_RANGED_TILES, { selectedTile, hitPoints })
      }
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
  },

  roll: ({ commit }) => {
    const roll = Math.floor(Math.random() * 10) + 1

    commit(TURN_SET_ROLL_VALUE, roll)
  }
}
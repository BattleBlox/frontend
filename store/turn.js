import {
  TURN_SET_SELECTED_TILE,
  TURN_DESELECT_TILE,
  TURN_SELECT_PLAYER,
  TURN_SELECT_MODE,
  TURN_SET_RANGED_TILES,
  TURN_CLEAR_RANGED_TILES,
  TURN_SET_ROLL_VALUE,
  TURN_SET_GAME_OVER
} from '@/store/mutations.constants'

export const state = () => ({
  selectedTile: null,
  selectedPlayer: null,
  currentMode: null,
  rangedTiles: [],
  rollValue: 0,
  gameOver: false
})

export const mutations = {
  [TURN_SET_GAME_OVER]: (state, value) => {
    state.gameOver = value
  },

  [TURN_SET_SELECTED_TILE]: (state, selectedTile) => {
    state.selectedTile = selectedTile
  },

  [TURN_DESELECT_TILE]: (state) => {
    state.selectedTile = null
  },

  [TURN_SELECT_PLAYER]: (state, player) => {
    state.selectedPlayer = player
  },

  [TURN_SELECT_MODE]: (state, mode) => {
    state.currentMode = mode
  },

  [TURN_SET_ROLL_VALUE]: (state, rollValue) => {
    state.rollValue = rollValue
  },

  [TURN_CLEAR_RANGED_TILES]: (state) => {
    state.rangedTiles = []
  },

  [TURN_SET_RANGED_TILES]: (state) => {
    const rangedTiles = []

    if (state.selectedTile.hitPoints > 1 || state.selectedPlayer.isComputer) {
      if (state.selectedTile.identifier < 91) {
        rangedTiles.push(state.selectedTile.identifier + 10)
      }

      if (state.selectedTile.identifier % 10 !== 1) {
        rangedTiles.push(state.selectedTile.identifier - 1)
      }

      if (state.selectedTile.identifier % 10 !== 0) {
        rangedTiles.push(state.selectedTile.identifier + 1)
      }

      if (state.selectedTile.identifier > 10) {
        rangedTiles.push(state.selectedTile.identifier - 10)
      }
    }

    state.rangedTiles = rangedTiles
  }
}

export const actions = {
  endTurn: ({ commit, state, rootState }) => {
    commit(TURN_DESELECT_TILE)
    commit(TURN_CLEAR_RANGED_TILES)
    commit(TURN_SELECT_MODE, 'attack')

    const nextPlayerIndex = (state.selectedPlayer.index + 1 <= rootState.players.players.length)
      ? state.selectedPlayer.index + 1
      : 1

    const nextPlayer = rootState.players.players.find(x => x.index === nextPlayerIndex)

    commit(TURN_SELECT_PLAYER, nextPlayer)
  },

  selectTile: ({ commit, state }, tile) => {
    // PREVENT: Selection of tiles the player doesn't own
    if (tile.empire === null || tile.empire !== state.selectedPlayer.name) {
      return
    }

    if (state.selectedTile && state.selectedTile.identifier === tile.identifier) {
      commit(TURN_DESELECT_TILE)
    } else {
      commit(TURN_SET_SELECTED_TILE, tile)

      if (state.currentMode === 'attack' || state.selectedPlayer.isComputer) {
        commit(TURN_SET_RANGED_TILES)
      }
    }
  },

  setGameOver: ({ commit }, player) => {
    commit(TURN_SET_GAME_OVER, true)
    commit(TURN_SELECT_PLAYER, player)
    commit(TURN_DESELECT_TILE)
  },

  selectPlayer: ({ commit }, player) => {
    commit(TURN_SELECT_PLAYER, player)
    commit(TURN_SELECT_MODE, 'attack')
    commit(TURN_CLEAR_RANGED_TILES)
    commit(TURN_SET_GAME_OVER, false)
  },

  roll: ({ commit }, { controlledTiles, capitalTiles }) => {
    commit(TURN_SELECT_MODE, 'roll')
    commit(TURN_CLEAR_RANGED_TILES)

    const roll = Math.floor(Math.random() * 6) + 1

    const bonusPoints = Math.round(controlledTiles / 5)

    commit(TURN_SET_ROLL_VALUE, roll + bonusPoints + Math.round(capitalTiles * 1.5))
  }
}

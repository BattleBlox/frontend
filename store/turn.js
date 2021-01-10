import {
  TURN_SET_SELECTED_TILE,
  TURN_DESELECT_TILE,
  TURN_SELECT_PLAYER,
  TURN_SELECT_MODE,
  TURN_SET_ROLL_VALUE,
  TURN_SET_GAME_OVER
} from '@/store/mutations.constants'

export const state = () => ({
  selectedTile: null,
  selectedPlayer: null,
  currentMode: null,
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
  }
}

export const actions = {
  endTurn: ({ commit, state, rootState }) => {
    if (state.gameOver) {
      return
    }

    commit(TURN_DESELECT_TILE)
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
    }
  },

  setGameOver: ({ commit }, player) => {
    commit(TURN_SET_GAME_OVER, true)
    commit(TURN_SELECT_PLAYER, player)
    commit(TURN_DESELECT_TILE)
  },

  selectPlayer: ({ commit }, player) => {
    commit(TURN_SELECT_PLAYER, player)
    commit(TURN_DESELECT_TILE)
    commit(TURN_SELECT_MODE, 'attack')
    commit(TURN_SET_GAME_OVER, false)
  },

  roll: ({ commit, state, rootState }) => {
    commit(TURN_SELECT_MODE, 'roll')
    commit(TURN_DESELECT_TILE)

    const capitalTiles = rootState.tiles.tiles.filter(x => x.empire === state.selectedPlayer.name && x.hitPoints >= 10).length
    const capitalBonusPoints = Math.floor(capitalTiles * 2)

    const controlledTiles = rootState.tiles.tiles.filter(x => x.empire === state.selectedPlayer.name).length
    const expansionBonusPoints = Math.floor(controlledTiles / 4)

    const roll = Math.floor(Math.random() * 6) + 1

    commit(TURN_SET_ROLL_VALUE, roll + expansionBonusPoints + capitalBonusPoints)
  }
}

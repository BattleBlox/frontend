/* eslint-disable curly */
import { TILES_SET_ALL_TILES, TILES_SET_TILE } from '@/store/mutations.constants'

// eslint-disable-next-line no-unused-vars
const tile = {
  identifier: 1,
  empire: 'Player Name',
  hitPoints: 1
}

export const state = () => ({
  tiles: []
})

export const mutations = {
  [TILES_SET_ALL_TILES]: (state, tiles) => {
    state.tiles = tiles
  },

  [TILES_SET_TILE]: (state, tile) => {
    // Remove tile
    state.tiles = state.tiles.filter(tle => tle.identifier !== tile.identifier)

    // Add tile
    state.tiles.push(tile)

    // Update tile order
    state.tiles.sort((a, b) => (a.identifier > b.identifier) ? 1 : -1)
  }
}

export const actions = {
  setupBoard: ({ commit }) => {
    const tiles = []

    for (let identifier = 1; identifier <= 140; identifier++) {
      const rangedTiles = []
      if (identifier < 127) rangedTiles.push(identifier + 14)
      if (identifier % 14 !== 1) rangedTiles.push(identifier - 1)
      if (identifier % 14 !== 0) rangedTiles.push(identifier + 1)
      if (identifier > 14) rangedTiles.push(identifier - 14)

      tiles.push({
        identifier,
        empire: null,
        hitPoints: 0,
        rangedTiles
      })
    }

    commit(TILES_SET_ALL_TILES, tiles)
  },

  setupBlockedTiles: ({ commit, state }, numberOfTiles) => {
    while (state.tiles.filter(x => x.empire === 'blocked').length < numberOfTiles) {
      const tile = Math.floor(Math.random() * 140) + 1

      if (state.tiles.find(x => x.identifier === tile && x.empire === null)) {
        commit(TILES_SET_TILE, {
          identifier: tile,
          empire: 'blocked',
          hitPoints: 0,
          rangedTiles: []
        })
      }
    }
  },

  controlTile: ({ commit, state }, { empire, hitPoints, tileIdentifier }) => {
    const tile = {
      ...state.tiles.find(x => x.identifier === tileIdentifier)
    }

    tile.empire = empire || tile.empire
    tile.hitPoints = hitPoints || tile.hitPoints

    commit(TILES_SET_TILE, tile)
  },

  controlTiles: ({ commit, state }, { empire, hitPoints, tiles }) => {
    tiles.forEach((controlledTile) => {
      const tile = {
        ...state.tiles.find(x => x.identifier === controlledTile)
      }

      tile.empire = empire || 'blocked'
      tile.hitPoints = hitPoints

      commit(TILES_SET_TILE, tile)
    })
  }
}

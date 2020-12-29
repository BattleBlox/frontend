import { TILES_SET_ALL_TILES, TILES_SET_TILE } from '@/store/mutations.constants'

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

    for (let loop = 1; loop <= 100; loop++) {
      tiles.push({
        identifier: loop,
        empire: null,
        hitPoints: 0
      })
    }

    commit(TILES_SET_ALL_TILES, tiles)
  },

  setupBlockedTiles: ({ commit, state }, numberOfTiles) => {
    while (state.tiles.filter(x => x.empire === 'blocked').length < numberOfTiles) {
      const tile = Math.floor(Math.random() * 100) + 1

      if (state.tiles.find(x => x.identifier === tile && x.empire === null)) {
        commit(TILES_SET_TILE, {
          identifier: tile,
          empire: 'blocked'
        })
      }
    }
  },

  controlTile: ({ commit }, payload) => {
    const { empire, hitPoints, tileIdentifier } = payload

    const tile = {
      identifier: tileIdentifier,
      empire,
      hitPoints
    }

    commit(TILES_SET_TILE, tile)
  },

  controlTiles: ({ commit }, payload) => {
    const { empire, hitPoints, tiles } = payload

    tiles.forEach((tile) => {
      const controlTile = {
        identifier: tile,
        empire,
        hitPoints
      }

      commit(TILES_SET_TILE, controlTile)
    })
  }
}

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

  controlTile: ({ commit }, { empire, hitPoints, tileIdentifier }) => {
    commit(TILES_SET_TILE, {
      identifier: tileIdentifier,
      empire,
      hitPoints
    })
  },

  controlTiles: ({ commit }, { empire, hitPoints, tiles }) => {
    tiles.forEach((tile) => {
      commit(TILES_SET_TILE, {
        identifier: tile,
        empire,
        hitPoints
      })
    })
  }
}

import { TILES_SET_ALL_TILES, TILES_SET_TILE } from '@/store/mutations.constants'

export const state = () => ({
  tiles: []
})

export const mutations = {
  [TILES_SET_ALL_TILES]: (state, tiles) => {
    state.tiles = tiles
  },

  [TILES_SET_TILE]: (state, tile) => {
    // state.tiles[tile.identifier - 1] = tile

    state.tiles = state.tiles.filter(tle => tle.identifier !== tile.identifier)
    state.tiles.push(tile)

    state.tiles.sort((a, b) => (a.identifier > b.identifier) ? 1 : -1)
  }
}

export const actions = {
  setupTiles: ({ commit }) => {
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

  setupBlockedTiles: ({ commit }, { numberOfTiles, excludedTiles }) => {
    const blocks = []

    while (blocks.length < numberOfTiles) {
      const block = Math.floor(Math.random() * 100) + 1

      if (excludedTiles.includes(block)) {
        continue
      }

      if (!blocks.some(blk => blk === block)) {
        blocks.push(block)

        const tile = {
          identifier: block,
          empire: 'blocked',
          hitPoints: 1
        }

        commit(TILES_SET_TILE, tile)
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

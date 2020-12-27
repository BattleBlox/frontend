import { TILES_SET_ALL_TILES } from '@/store/mutations.constants'

export const state = () => ({
  tiles: []
})

export const mutations = {
  [TILES_SET_ALL_TILES]: (state, tiles) => {
    state.tiles = tiles
  }
}

export const actions = {
  setupTiles: ({ commit }) => {
    const tiles = []

    for (let loop = 1; loop <= 100; loop++) {
      tiles.push({
        identifier: loop
      })
    }

    commit(TILES_SET_ALL_TILES, tiles)
  }
}

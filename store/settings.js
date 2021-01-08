import { SETTINGS_SET_COMPUTER_SPEED } from './mutations.constants'

export const state = () => ({
  computerSpeed: 1500
})

export const mutations = {
  [SETTINGS_SET_COMPUTER_SPEED]: (state, speed) => {
    state.computerSpeed = speed
  }
}

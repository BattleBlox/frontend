import { mount } from '@vue/test-utils'
import Board from '../board.vue'

describe('Board', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Board)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

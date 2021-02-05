import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Header.vue', () => {
  it('renders', () => {
    const title = 'new message'
    const wrapper = shallowMount(Header, {
      propsData: { title }
    })
    expect(wrapper.element).toBeDefined()
  })
})

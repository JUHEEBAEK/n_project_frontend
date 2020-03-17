import { mount } from '@vue/test-utils';
import Toolbar from '@/components/member/Toolbar.vue';

describe('Toolbar', () => {
  test('count all member', () => {
    const wrapper = mount(Toolbar);
    console.log(wrapper);
    expect(wrapper.classes()).toContain('member__count')
    expect(wrapper.classes('member__count')).toBe(true)
  });
});


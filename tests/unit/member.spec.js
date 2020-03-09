import { mount } from '@vue/test-utils';
import Toolbar from '@/components/member/Toolbar.vue';

describe('Toolbar', () => {
  test('count all member', () => {
    const wrapper = mount(Toolbar);
    console.log(wrapper);
    expect(wrapper.find('[v-toolbar-title]').text()).toEqual('총 57 명');
  });
});


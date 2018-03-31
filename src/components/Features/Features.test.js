import MOCK_FEATURES from '../../../__mocks__/camp_features'
import Features from './Features';
import ListItem from './ListItem/ListItem';

describe('Component: <Features />', () => {
  let wrapper;

  it('no errors thrown when no data was passed in', () => {
    wrapper = mount(<Features />);
    expect(wrapper).toHaveLength(1);
  });

  it('renders the Feature component without error', () => {
    wrapper = mount(<Features data={MOCK_FEATURES} />);
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(ListItem)).toHaveLength(4);
  });

  it('Reveal only subfeatures when presence is true', () => {
    wrapper = mount(<Features data={MOCK_FEATURES} />);
    expect(wrapper.find('.features__sub-list')).toHaveLength(0);
    wrapper.find('.trash').simulate('click');
    expect(wrapper.find('.features__sub-list')).toHaveLength(1);

    wrapper.find('.trash-bin').simulate('click');
    expect(wrapper.find('.features__sub-list')).toHaveLength(2);
  });

  it('Does not reveal sub features when presence is false', () => {
    wrapper = mount(<Features data={MOCK_FEATURES} />);
    expect(wrapper.find('.features__sub-list')).toHaveLength(0);
    wrapper.find('.shower').simulate('click');
    expect(wrapper.find('.features__sub-list')).toHaveLength(0);
  });

  it('Does not render feature more than three levels deep', () => {
    const FOUR_NODE_DEEP_FEATURE = [
      {
        'title': 'Trash',
        'presence': true,
        'subfeatures': [
          {
            'title': 'Trash bin',
            'presence': true,
            'subfeatures': [
              {
                'title': 'Pack Out',
                'presence': true,
                'subfeatures': [
                  {
                    'title': 'Not shown',
                    'presence': true,
                    'subfeatures': []
                  },
                ]
              }
            ]
          }
        ]
      }
    ];

    wrapper = mount(<Features data={FOUR_NODE_DEEP_FEATURE} />);
    expect(wrapper.find('.features__sub-list')).toHaveLength(0);
    wrapper.find('.trash').simulate('click');
    expect(wrapper.find('.features__sub-list')).toHaveLength(1);
    wrapper.find('.trash-bin').simulate('click');
    expect(wrapper.find('.features__sub-list')).toHaveLength(2);
    wrapper.find('.pack-out').simulate('click');

    // Fourth node is not rendered
    expect(wrapper.find('.features__sub-list')).toHaveLength(2);
    expect(wrapper.find('.not-shown')).toHaveLength(0);
  });
});

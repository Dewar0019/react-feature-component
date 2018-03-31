import React from 'react';
import App from './App';

describe('Component: <App />', () => {
  let wrapper;

  it('shallow renders without crashing', () => {
    wrapper = shallow(<App/>);
    expect(wrapper).toHaveLength(1);
  });

  it('mount renders without crashing', () => {
    wrapper = mount(<App/>);
    expect(wrapper).toHaveLength(1);
  });
});
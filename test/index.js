import 'babel-polyfill';
import LinkButton from '../src';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
chai.use(chaiEnzyme()).should();
describe('LinkButton', () => {

  it('renders a React element', () => {
    React.isValidElement(<LinkButton />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let linkButton = null;
    beforeEach(() => {
      rendered = mount(<LinkButton />);
      linkButton = rendered.find('.link-button');
    });

    it('renders a top level a.link-button', () => {
      linkButton.should.have.tagName('a');
      linkButton.should.have.className('link-button');
    });

    it('renders given children', () => {
      mount(<LinkButton><div id="child">Test</div></LinkButton>)
        .find('#child').should.have.text('Test');
    });

    it('renders href', () => {
      mount(<LinkButton href="http://www.economist.com" />)
        .find('a').should.have.attr('href', 'http://www.economist.com');
      mount(
        <LinkButton icon={{
          icon: 'video',
          color: 'honolulu',
          'useBackground': true }}
          href="http://www.economist.com"
        >
          Use icon as background
        </LinkButton>
      ).find('a').should.have.attr('href', 'http://www.economist.com');
    });

    it('renders className', () => {
      mount(<LinkButton className="testing" />)
      .find('a').should.have.className('testing');
    });

  });

});

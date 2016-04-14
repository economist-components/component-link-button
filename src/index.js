import Icon from '@economist/component-icon';
import React from 'react';
/* eslint-disable id-match */
/* eslint-disable  react/display-name */
import { createI13nNode } from 'react-i13n';

function defaultPreventer(event) {
  event.preventDefault();
}

export default function Button(props) {
  const { className, children, disabled, shadow, icon, unstyled, i13nModel } = props;
  const extraClassNames = className ? className.split(/\s+/g) : [];
  let onClick = props.onClick;
  if (!unstyled) {
    extraClassNames.push('link-button--styled');
  }
  if (disabled === true) {
    onClick = defaultPreventer;
    extraClassNames.push('link-button--disabled');
  }
  if (shadow === true) {
    extraClassNames.push('link-button--shadow');
  }
  let content = children;
  const linkProps = { ...props };
  if (icon) {
    extraClassNames.push('link-button--icon');
    extraClassNames.push(`link-button-icon--${ icon.icon }`);
    if (icon.className) {
      extraClassNames.push(icon.className);
    }
    if (icon.color) {
      extraClassNames.push(`icon--${ icon.icon }-${ icon.color }`);
    }
    if (Boolean(icon.useBackground) === false) {
      content = (
        <span className="link-button__group">
          <Icon {...icon} key="link-button__icon" />
          <span className="link-button__text" key="link-button__text">{content}</span>
        </span>
      );
    } else {
      extraClassNames.push('link-button--icon-background');
      linkProps.style = { backgroundRepeat: 'no-repeat' };
    }
    // We don't want the icon prop to spread on <a> tag.
    Reflect.deleteProperty(linkProps, 'icon');
  }

  linkProps.role = 'button';
  linkProps.onClick = onClick;
  linkProps.className = [ 'link-button' ].concat(extraClassNames).join(' ');

  if (i13nModel) {
    const I13nLink = createI13nNode('a', {
      isLeafNode: true,
      bindClickEvent: true,
      follow: true,
    });
    return (<I13nLink {...linkProps}>{content}</I13nLink>);
  }
  return (<a {...linkProps}>{content}</a>);
}

Button.propTypes = {
  href: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
  disabled: React.PropTypes.bool,
  shadow: React.PropTypes.bool,
  unstyled: React.PropTypes.bool,
  icon: React.PropTypes.shape(Icon.propTypes),
  // i13n genuinely takes any object
  i13nModel: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

import Icon from '@economist/component-icon';
import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable id-match */
/* eslint-disable  react/display-name */
import { createI13nNode } from 'react-i13n';

function defaultPreventer(event) {
  event.preventDefault();
}

function handleKeyDown(onClick, event) {
  if (event.code === 'Enter' || event.code === 'Space') {
    onClick(event);
  }
}

/* eslint-disable complexity */
export default function Button(props) {
/* eslint-enable complexity */
  // We want to filter out the props, which concern only the Button and should not be passed on.
  const { LinkComponent = 'a', icon, shadow, unstyled, i13nModel, children, ...linkProps } = props;
  const { className, disabled } = props;
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
  }

  if (props.buttonRole) {
    linkProps.role = props.buttonRole;
  }
  linkProps.onClick = onClick;
  linkProps.className = [ 'link-button' ].concat(extraClassNames).join(' ');
  linkProps.role = 'button';
  linkProps.tabIndex = '0';
  linkProps.onKeyDown = handleKeyDown.bind(null, onClick);

  if (i13nModel) {
    const I13nLink = createI13nNode(LinkComponent, {
      isLeafNode: true,
      bindClickEvent: false,
      follow: true,
    });
    return (<I13nLink {...linkProps} i13nModel={i13nModel}>{content}</I13nLink>);
  }
  return (<LinkComponent {...linkProps}>{content}</LinkComponent>);
}

Button.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  shadow: PropTypes.bool,
  unstyled: PropTypes.bool,
  icon: PropTypes.shape(Icon.propTypes),
  // i13n genuinely takes any object
  i13nModel: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  buttonRole: PropTypes.string,
  LinkComponent: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

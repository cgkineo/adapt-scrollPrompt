import React from 'react';
import { classes } from 'core/js/reactHelpers';

export default function ScrollPromptButton (props) {

  const {
    _scrollPrompt,
    onScrollPromptClick
  } = props;

  // The prompt is hidden from screen readers (aria-hidden on its wrapper),
  // so keep the button out of the tab order as well. Keyboard users reach
  // the same content with Tab or the scroll keys.
  return (

    <button
      className='btn-icon scrollPrompt__btn'
      tabIndex={-1}
      onClick={onScrollPromptClick}
    >
      <span
        className={classes([
          'icon',
          _scrollPrompt._iconClass || 'icon-controls-down'
        ])}
        aria-hidden='true'
      />
    </button>

  );
}

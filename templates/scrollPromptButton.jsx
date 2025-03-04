import React from 'react';
import { classes } from 'core/js/reactHelpers';

export default function ScrollPromptButton (props) {

  const {
    _scrollPrompt,
    onScrollPromptClick
  } = props;

  return (

    <button
      className='btn-icon scrollPrompt__btn'
      onClick={onScrollPromptClick}
    >
      <span
        className={classes([
          'icon',
          _scrollPrompt._iconClass
            ? _scrollPrompt._iconClass
            : 'icon-controls-down'
        ])}
        aria-hidden='true'
      />
    </button>

  );
}

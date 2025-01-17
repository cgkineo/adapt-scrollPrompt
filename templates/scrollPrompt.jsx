import React from 'react';
import { classes, compile } from 'core/js/reactHelpers';

export default function ScrollPrompt (props) {
  const {
    _scrollPrompt,
    onScrollPromptClick
  } = props;

  return (
    <div
      className='scrollPrompt__inner a11y-ignore'
      aria-hidden='true'
    >

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

      {_scrollPrompt.instruction &&
      <div
        className='scrollPrompt__instruction'
        dangerouslySetInnerHTML={{ __html: compile(_scrollPrompt.instruction, props) }}
      />
      }

    </div>
  );
}

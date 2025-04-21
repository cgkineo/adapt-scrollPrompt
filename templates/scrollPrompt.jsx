import React from 'react';
import { classes, compile, templates } from 'core/js/reactHelpers';

export default function ScrollPrompt (props) {
  const {
    _scrollPrompt
  } = props;

  const buttonPosition = _scrollPrompt._buttonPosition || 'left';
  let buttonRenderOrder = 'first';

  if (buttonPosition === 'bottom' || buttonPosition === 'right') {
    buttonRenderOrder = 'last';
  }

  return (
    <div
      className={classes([
        'scrollPrompt__inner',
        buttonPosition && `align-button-${buttonPosition}`,
        'a11y-ignore'
      ])}
      aria-hidden='true'
    >

      {buttonRenderOrder === 'first' &&
      <templates.scrollPromptButton {...props} />
      }

      {_scrollPrompt.instruction &&
      <div
        className='scrollPrompt__instruction'
        dangerouslySetInnerHTML={{ __html: compile(_scrollPrompt.instruction, props) }}
      />
      }

      {buttonRenderOrder === 'last' &&
      <templates.scrollPromptButton {...props} />
      }

    </div>
  );
}

import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-scrollPrompt - v1.1.1 to v1.2.0', async () => {
  let course, scrollDownBefore;

  whereFromPlugin('adapt-scrollPrompt - from v1.1.1', { name: 'adapt-scrollPrompt', version: '<1.2.0' });

  whereContent('adapt-scrollPrompt - where course object is present', async content => {
    course = content.find(({ _type }) => _type === 'course');
    if (!course) return false;
    scrollDownBefore = _.get(course, '_globals._extensions._scrollPrompt.scrollDown');
    return true;
  });

  mutateContent('adapt-scrollPrompt - add course _globals._extensions._scrollPrompt.scrollDown', async () => {
    if (!_.has(course, '_globals._extensions._scrollPrompt.scrollDown')) _.set(course, '_globals._extensions._scrollPrompt.scrollDown', 'Scroll down');
    return true;
  });

  checkContent('adapt-scrollPrompt - check course _globals._extensions._scrollPrompt.scrollDown', async () => {
    const expected = scrollDownBefore ?? 'Scroll down';
    if (_.get(course, '_globals._extensions._scrollPrompt.scrollDown') !== expected) throw new Error('adapt-scrollPrompt - _globals._extensions._scrollPrompt.scrollDown not backfilled/preserved correctly');
    return true;
  });

  updatePlugin('adapt-scrollPrompt - update to v1.2.0', { name: 'adapt-scrollPrompt', version: '1.2.0', framework: '>=5' });

  testSuccessWhere('course with no _globals creates intermediates and scrollDown', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.1.1' }],
    content: [
      { _id: 'c-100', _component: 'text' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('course with scrollDown already authored is preserved', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.1.1' }],
    content: [
      { _id: 'c-100', _component: 'text' },
      { _type: 'course', _globals: { _extensions: { _scrollPrompt: { scrollDown: 'Custom scroll text' } } } }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.2.0' }]
  });

  testStopWhere('no course object', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.1.1' }],
    content: [
      { _id: 'c-100', _component: 'text' }
    ]
  });
});

describe('adapt-scrollPrompt - v1.2.0 to v1.3.0', async () => {
  let scrollPrompts, iconClassesBefore, untouchedItem;

  whereFromPlugin('adapt-scrollPrompt - from v1.2.0', { name: 'adapt-scrollPrompt', version: '<1.3.0' });

  whereContent('adapt-scrollPrompt - where _scrollPrompt is present', async content => {
    scrollPrompts = content.filter(({ _scrollPrompt }) => Boolean(_scrollPrompt)).map(({ _scrollPrompt }) => _scrollPrompt);
    iconClassesBefore = scrollPrompts.map(scrollPrompt => scrollPrompt._iconClass);
    untouchedItem = content.find(item => !item._scrollPrompt);
    return scrollPrompts.length;
  });

  mutateContent('adapt-scrollPrompt - add _scrollPrompt._iconClass', async () => {
    scrollPrompts.forEach(scrollPrompt => {
      if (scrollPrompt._iconClass === undefined) scrollPrompt._iconClass = 'icon-controls-down';
    });
    return true;
  });

  checkContent('adapt-scrollPrompt - check _scrollPrompt._iconClass attribute', async () => {
    const isValid = scrollPrompts.every((scrollPrompt, i) => scrollPrompt._iconClass === (iconClassesBefore[i] ?? 'icon-controls-down'));
    if (!isValid) throw new Error('adapt-scrollPrompt - _iconClass not backfilled/preserved correctly on every instance of _scrollPrompt');
    if (untouchedItem?._scrollPrompt) throw new Error('adapt-scrollPrompt - _scrollPrompt should not be created on an item that did not already have it');
    return true;
  });

  updatePlugin('adapt-scrollPrompt - update to v1.3.0', { name: 'adapt-scrollPrompt', version: '1.3.0', framework: '>=5' });

  testSuccessWhere('_scrollPrompt at course, contentobject, block and component levels, mixing missing and authored _iconClass', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.2.0' }],
    content: [
      { _type: 'course', _scrollPrompt: { _isEnabled: true } },
      { _id: 'co-10', _type: 'page', _scrollPrompt: { _isEnabled: true, _iconClass: 'icon-custom-down' } },
      { _id: 'a-10', _type: 'article' },
      { _id: 'b-10', _type: 'block', _scrollPrompt: { _isEnabled: false } },
      { _id: 'c-100', _component: 'text' },
      { _id: 'c-101', _component: 'scrollPrompt', _scrollPrompt: { _isEnabled: true, _buttonPosition: 'left', _iconClass: 'icon-existing' } }
    ]
  });

  testSuccessWhere('only course has _scrollPrompt without _iconClass, page has none', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.2.0' }],
    content: [
      { _type: 'course', _scrollPrompt: { _isEnabled: true } },
      { _id: 'co-10', _type: 'page' }
    ]
  });

  testStopWhere('no _scrollPrompt present anywhere', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.2.0' }],
    content: [
      { _type: 'course' },
      { _id: 'c-100', _component: 'text' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.3.0' }]
  });
});

describe('adapt-scrollPrompt - v1.3.0 to v1.4.0', async () => {
  let scrollPrompts, buttonPositionsBefore, untouchedItem;

  whereFromPlugin('adapt-scrollPrompt - from v1.3.0', { name: 'adapt-scrollPrompt', version: '<1.4.0' });

  whereContent('adapt-scrollPrompt - where _scrollPrompt is present', async content => {
    scrollPrompts = content.filter(({ _scrollPrompt }) => Boolean(_scrollPrompt)).map(({ _scrollPrompt }) => _scrollPrompt);
    buttonPositionsBefore = scrollPrompts.map(scrollPrompt => scrollPrompt._buttonPosition);
    untouchedItem = content.find(item => !item._scrollPrompt);
    return scrollPrompts.length;
  });

  mutateContent('adapt-scrollPrompt - add _scrollPrompt._buttonPosition', async () => {
    scrollPrompts.forEach(scrollPrompt => {
      if (scrollPrompt._buttonPosition === undefined) scrollPrompt._buttonPosition = 'left';
    });
    return true;
  });

  checkContent('adapt-scrollPrompt - check _scrollPrompt._buttonPosition attribute', async () => {
    const isValid = scrollPrompts.every((scrollPrompt, i) => scrollPrompt._buttonPosition === (buttonPositionsBefore[i] ?? 'left'));
    if (!isValid) throw new Error('adapt-scrollPrompt - _buttonPosition not backfilled/preserved correctly on every instance of _scrollPrompt');
    if (untouchedItem?._scrollPrompt) throw new Error('adapt-scrollPrompt - _scrollPrompt should not be created on an item that did not already have it');
    return true;
  });

  updatePlugin('adapt-scrollPrompt - update to v1.4.0', { name: 'adapt-scrollPrompt', version: '1.4.0', framework: '>=5' });

  testSuccessWhere('_scrollPrompt at course, contentobject, block and component levels, mixing missing and authored _buttonPosition', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.3.0' }],
    content: [
      { _type: 'course', _scrollPrompt: { _isEnabled: true, _iconClass: 'icon-controls-down' } },
      { _id: 'co-10', _type: 'page', _scrollPrompt: { _isEnabled: true, _iconClass: 'icon-controls-down', _buttonPosition: 'right' } },
      { _id: 'a-10', _type: 'article' },
      { _id: 'b-10', _type: 'block', _scrollPrompt: { _isEnabled: false, _iconClass: 'icon-controls-down' } },
      { _id: 'c-100', _component: 'text' },
      { _id: 'c-101', _component: 'scrollPrompt', _scrollPrompt: { _isEnabled: true, _iconClass: 'icon-controls-down', _buttonPosition: 'top' } }
    ]
  });

  testSuccessWhere('only course has _scrollPrompt without _buttonPosition, page has none', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.3.0' }],
    content: [
      { _type: 'course', _scrollPrompt: { _isEnabled: true, _iconClass: 'icon-controls-down' } },
      { _id: 'co-10', _type: 'page' }
    ]
  });

  testStopWhere('no _scrollPrompt present anywhere', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.3.0' }],
    content: [
      { _type: 'course' },
      { _id: 'c-100', _component: 'text' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-scrollPrompt', version: '1.4.0' }]
  });
});

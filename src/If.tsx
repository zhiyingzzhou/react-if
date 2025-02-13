import React, { FC, Fragment, ReactElement } from 'react';
import { Else } from './Else';
import { getConditionResult } from './getConditionResults';
import { tinyWarning } from './tinyWarning';
import { Then } from './Then';
import type { ComponentWithConditionProps } from './types';

/**
 * If condition evaluates to true, renders the `<Then />` block will be rendered,
 * otherwise renders the `<Else />` block. Either block may be omitted.
 *
 * This component can contain any number of `<Then />` or `<Else />` blocks,
 * but only the first block of the right type (either Then or Else, depending on the condition) will be rendered.
 * @param __namedParameters The props to pass down to the `<IF />` component, see {@link ComponentWithConditionProps}
 */
export const If: FC<ComponentWithConditionProps> = ({ condition, children }) => {
  if (!children) {
    return null;
  }

  tinyWarning(
    (!Array.isArray(children) && !((children as ReactElement).type === Else || (children as ReactElement).type === Then)) ||
      !(React.Children.toArray(children) as ReactElement[]).every((child) => child.type === Else || child.type === Then),
    'The <If> component should contain <Then /> and <Else /> components as its children'
  );

  const conditionResult = getConditionResult(condition);

  return <Fragment>{(React.Children.toArray(children) as ReactElement[]).find((c) => (c.type !== (<Else />).type) !== !conditionResult) || null}</Fragment>;
};

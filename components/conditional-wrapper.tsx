import {ReactElement} from "react";

/**
 * ConditionalWrapper component is a higher order component that wraps children with a wrapper component if a condition is met.
 * @param condition the condition to be met
 * @param wrapper the wrapper component(s)
 * @param children the children to be wrapped
 * @constructor ConditionalWrapper component
 */
export const ConditionalWrapper = ({condition, wrapper, children}: { condition: boolean, wrapper: (children: ReactElement) => ReactElement, children: ReactElement }) =>
    condition ? wrapper(children) : children;

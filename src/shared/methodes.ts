import classNames from 'classnames';

export function cn(...args: (string | undefined | null | false)[]): string {
    return classNames(...args);
}
import React, {AnchorHTMLAttributes, FC, ReactNode} from 'react';
import Link, {LinkProps} from "next/link";

interface InternalLink extends AnchorHTMLAttributes<HTMLLinkElement>{}
interface Props extends InternalLink                       {
    className: string,
    children: ReactNode,
    href: string
    [key: string]: any
}


const LinkButton: FC<Props> = ({href, className, children, ...rest})=> {
    return (
        <Link href={href} passHref>
            <a {...rest}>{children}</a>
        </Link>
    );
};

export default LinkButton;
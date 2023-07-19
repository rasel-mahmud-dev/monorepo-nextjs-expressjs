import React, {FC, HTMLAttributes} from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement>{

}
const Button: FC<Props> = (props) => {
    return (
        <button {...props} />
    );
};

export default Button;
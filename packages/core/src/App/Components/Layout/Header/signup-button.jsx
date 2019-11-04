import PropTypes    from 'prop-types';
import React        from 'react';
import { Button }   from 'deriv-components';
import { localize } from 'App/i18n';

const SignupButton = ({ className }) => (
    <Button
        id='dt_signup_button'
        className={className}
        has_effect
        text={localize('Sign up')}
        onClick={() => { window.open('https://deriv.com'); }}
        primary
    />
);

SignupButton.propTypes = {
    className: PropTypes.string,
};

export { SignupButton };

import PropTypes         from 'prop-types';
import React             from 'react';
import { localize }      from 'deriv-translations';
import Fieldset          from 'App/Components/Form/fieldset.jsx';
import InputWithCheckbox from 'App/Components/Form/InputField/input-with-checkbox.jsx';
import { connect }       from 'Stores/connect';

const StopLoss = ({
    currency,
    has_stop_loss,
    is_single_currency,
    onChange,
    onChangeMultiple,
    stop_loss,
    validation_errors,
}) => {
    const changeValue = (e) => {
        if (e.target.name === 'has_stop_loss') {
            const new_val = e.target.value;
            onChangeMultiple({
                [e.target.name]: new_val,
                ...(new_val ? { has_deal_cancellation: false } : {}),
            });
        } else {
            onChange(e);
        }
    };

    return (
        <Fieldset className='trade-container__fieldset'>
            <InputWithCheckbox
                className='trade-container__amount'
                classNameInlinePrefix='trade-container__currency'
                classNameInput='trade-container__input'
                currency={currency}
                defaultChecked={has_stop_loss}
                error_messages={has_stop_loss ? validation_errors.stop_loss : undefined}
                is_single_currency={is_single_currency}
                is_negative_disabled={true}
                label={localize('Stop loss')}
                name='stop_loss'
                onChange={changeValue}
                tooltip_label={localize('Your contract is closed automatically when your loss is more than or equals to this amount.')}
                value={stop_loss}
            />
        </Fieldset>
    );
};

StopLoss.propTypes = {
    currency          : PropTypes.string,
    has_stop_loss     : PropTypes.bool,
    is_single_currency: PropTypes.bool,
    onChange          : PropTypes.func,
    onChangeMultiple  : PropTypes.func,
    stop_loss         : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    validation_errors: PropTypes.object,
};

export default connect(({ modules, client }) => ({
    is_single_currency: client.is_single_currency,
    currency          : modules.trade.currency,
    has_stop_loss     : modules.trade.has_stop_loss,
    onChange          : modules.trade.onChange,
    onChangeMultiple  : modules.trade.onChangeMultiple,
    stop_loss         : modules.trade.stop_loss,
    validation_errors : modules.trade.validation_errors,
}))(StopLoss);

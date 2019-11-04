import PropTypes    from 'prop-types';
import React        from 'react';
import { localize } from 'App/i18n';
import { connect }  from 'Stores/connect';
import OrderInput   from './order-input.jsx';

const TakeProfit = ({
    currency,
    is_single_currency,
    onChange,
    validation_errors,
    take_profit,
}) => {
    return (
        <OrderInput
            amount={take_profit}
            currency={currency}
            is_single_currency={is_single_currency}
            name='take_profit'
            label={localize('Take profit')}
            tooltip_label={localize('Close the deal when my profit reaches this amount.')}
            onChange={onChange}
            validation_errors={validation_errors}
        />
    );
};

TakeProfit.propTypes = {
    currency          : PropTypes.string,
    is_single_currency: PropTypes.bool,
    onChange          : PropTypes.func,
    take_profit       : PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    tooltip_label    : PropTypes.string,
    validation_errors: PropTypes.object,
};

export default connect(({ modules, client }) => ({
    currency          : modules.trade.currency,
    is_single_currency: client.is_single_currency,
    onChange          : modules.trade.onChange,
    validation_errors : modules.trade.validation_errors,
    take_profit       : modules.trade.take_profit,
}))(TakeProfit);

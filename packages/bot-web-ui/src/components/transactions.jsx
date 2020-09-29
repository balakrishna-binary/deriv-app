import classnames from 'classnames';
import { Icon, DesktopWrapper, DataList } from '@deriv/components';
import { localize } from '@deriv/translations';
import { PropTypes } from 'prop-types';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Transaction from './transaction.jsx';
import Download from './download.jsx';
import { transaction_elements } from '../constants/transactions';
import { connect } from '../stores/connect';
import { contract_stages } from '../constants/contract-stage';
import '../assets/sass/download.scss';
import '../assets/sass/transactions.scss';

const TransactionItem = ({ row, can_show_transition }) => {
    const [in_prop, setInProp] = React.useState(false);

    React.useEffect(() => {
        if (can_show_transition) setInProp(true);
    }, [can_show_transition]);

    switch (row.type) {
        case transaction_elements.CONTRACT: {
            const { data: contract } = row;
            return (
                <CSSTransition in={in_prop} timeout={500} classNames='list__animation'>
                    <Transaction contract={contract} />
                </CSSTransition>
            );
        }
        case transaction_elements.DIVIDER: {
            return (
                <div className='transactions__divider'>
                    <div className='transactions__divider-line' />
                </div>
            );
        }
        default: {
            return null;
        }
    }
};

class Transactions extends React.PureComponent {
    componentDidMount() {
        this.props.onMount();
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    render() {
        const { elements, is_drawer_open, is_mobile, contract_stage } = this.props;
        return (
            <div
                className={classnames('transactions', {
                    'run-panel-tab__content': !is_mobile,
                    'run-panel-tab__content--mobile': is_mobile && is_drawer_open,
                })}
            >
                <DesktopWrapper>
                    <div className='download__container'>
                        <Download tab='transactions' />
                    </div>
                </DesktopWrapper>
                <div className='transactions__header'>
                    <span className='transactions__header-column transactions__header-type'>{localize('Type')}</span>
                    <span className='transactions__header-column transactions__header-spot'>
                        {localize('Entry/Exit spot')}
                    </span>
                    <span className='transactions__header-column transactions__header-profit'>
                        {localize('Buy price and P/L')}
                    </span>
                </div>
                <div
                    className={classnames({
                        transactions__content: !is_mobile,
                        'transactions__content--mobile': is_mobile,
                    })}
                >
                    <div className='transactions__scrollbar'>
                        {elements.length ? (
                            <DataList
                                className='transactions'
                                data_source={elements}
                                rowRenderer={props => <TransactionItem {...props} />}
                                keyMapper={row => {
                                    switch (row.type) {
                                        case transaction_elements.CONTRACT: {
                                            return row.data.transaction_ids.buy;
                                        }
                                        case transaction_elements.DIVIDER: {
                                            return row.data;
                                        }
                                    }
                                }}
                            />
                        ) : (
                            <>
                                {contract_stage >= contract_stages.STARTING ? (
                                    <Transaction contract={null} />
                                ) : (
                                    <div className='transactions-empty'>
                                        <Icon
                                            icon='IcBox'
                                            className='transactions-empty__icon'
                                            size={64}
                                            color='secondary'
                                        />
                                        <h4 className='transactions-empty__header'>
                                            {localize('There are no transactions to display')}
                                        </h4>
                                        <div className='transactions-empty__message'>
                                            <span>{localize('Here are the possible reasons:')}</span>
                                            <ul className='transactions-empty__list'>
                                                <li>{localize('The bot is not running')}</li>
                                                <li>{localize('The stats are cleared')}</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Transactions.propTypes = {
    contract_stage: PropTypes.number,
    elements: PropTypes.array,
    is_mobile: PropTypes.bool,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
};

export default connect(({ transactions, run_panel, ui }) => ({
    contract_stage: run_panel.contract_stage,
    elements: transactions.elements,
    is_mobile: ui.is_mobile,
    onMount: transactions.onMount,
    onUnmount: transactions.onUnmount,
}))(Transactions);

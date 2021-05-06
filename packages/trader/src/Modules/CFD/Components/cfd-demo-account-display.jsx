import React from 'react';
import { localize } from '@deriv/translations';
import specifications from 'Modules/CFD/Constants/cfd-specifications';
import { CFDAccountCard } from './cfd-account-card.jsx';
import Loading from '../../../templates/_common/components/loading.jsx';

const CFDDemoAccountDisplay = ({
    is_eu,
    is_eu_country,
    has_maltainvest_account,
    has_cfd_account_error,
    openAccountNeededModal,
    standpoint,
    is_loading,
    is_logged_in,
    landing_companies,
    onSelectAccount,
    openAccountTransfer,
    platform,
    current_list,
    has_cfd_account,
    openPasswordManager,
}) => {
    const openCFDAccount = () => {
        if (is_eu && !has_maltainvest_account && standpoint.iom) {
            openAccountNeededModal('maltainvest', localize('Deriv Financial'), localize('DMT5 Demo Financial'));
        } else {
            onSelectAccount({
                category: 'demo',
                type: 'financial',
            });
        }
    };

    const should_center_cards = platform === 'dxtrade' || !landing_companies?.mt_financial_company?.financial_stp;

    return is_loading ? (
        <div className='cfd-demo-accounts-display'>
            <Loading />
        </div>
    ) : (
        <div
            className='cfd-demo-accounts-display'
            style={{ justifyContent: should_center_cards ? 'center' : 'space-between' }}
        >
            {(landing_companies?.mt_gaming_company?.financial || !is_logged_in) && (
                <CFDAccountCard
                    has_cfd_account={has_cfd_account}
                    title={localize('Synthetic')}
                    type={{
                        category: 'demo',
                        type: 'synthetic',
                        platform,
                    }}
                    is_disabled={has_cfd_account_error}
                    is_logged_in={is_logged_in}
                    existing_data={
                        current_list[
                            Object.keys(current_list).find(key => key.startsWith(`${platform}.demo.synthetic`))
                        ]
                    }
                    commission_message={localize('No commission')}
                    onSelectAccount={() =>
                        onSelectAccount({
                            category: 'demo',
                            type: 'synthetic',
                        })
                    }
                    onPasswordManager={openPasswordManager}
                    onClickFund={() =>
                        openAccountTransfer(
                            current_list[
                                Object.keys(current_list).find(key => key.startsWith(`${platform}.demo.synthetic`))
                            ],
                            {
                                category: 'demo',
                                type: 'synthetic',
                            }
                        )
                    }
                    platform={platform}
                    descriptor={localize(
                        'Trade CFDs on our Synthetic Indices that simulate real-world market movement.'
                    )}
                    specs={{
                        [localize('Leverage')]: localize('Up to 1:1000'),
                        [localize('Margin call')]: localize('100%'),
                        [localize('Stop out level')]: localize('50%'),
                        [localize('Number of assets')]: localize('10+'),
                    }}
                    has_banner
                />
            )}

            {(landing_companies?.mt_financial_company?.financial || !is_logged_in) && (
                <CFDAccountCard
                    has_cfd_account={has_cfd_account}
                    title={localize('Financial')}
                    is_disabled={has_cfd_account_error}
                    is_logged_in={is_logged_in}
                    type={{
                        category: 'demo',
                        type: 'financial',
                        platform,
                    }}
                    existing_data={
                        current_list[
                            Object.keys(current_list).find(key => key.startsWith(`${platform}.demo.financial@`))
                        ]
                    }
                    commission_message={localize('No commission')}
                    onSelectAccount={openCFDAccount}
                    onPasswordManager={openPasswordManager}
                    onClickFund={() =>
                        openAccountTransfer(
                            current_list[
                                Object.keys(current_list).find(key => key.startsWith(`${platform}.demo.financial@`))
                            ],
                            {
                                category: 'demo',
                                type: 'financial',
                            }
                        )
                    }
                    platform={platform}
                    descriptor={localize(
                        'Trade CFDs on forex, stocks & indices, commodities, and cryptocurrencies with leverage.'
                    )}
                    specs={
                        is_eu || is_eu_country
                            ? specifications[platform].eu_real_financial_specs
                            : {
                                  [localize('Leverage')]: localize('Up to 1:1000'),
                                  [localize('Margin call')]: localize('150%'),
                                  [localize('Stop out level')]: localize('75%'),
                                  [localize('Number of assets')]: localize('50+'),
                              }
                    }
                    has_banner
                />
            )}
            {(landing_companies?.mt_financial_company?.financial_stp || !is_logged_in) && platform === 'mt5' && (
                <CFDAccountCard
                    has_cfd_account={has_cfd_account}
                    title={localize('Financial STP')}
                    type={{
                        category: 'demo',
                        type: 'financial_stp',
                        platform,
                    }}
                    is_disabled={has_cfd_account_error}
                    is_logged_in={is_logged_in}
                    existing_data={
                        current_list[
                            Object.keys(current_list).find(key => key.startsWith(`${platform}.demo.financial_stp@`))
                        ]
                    }
                    commission_message={localize('No commission')}
                    onSelectAccount={() =>
                        onSelectAccount({
                            category: 'demo',
                            type: 'financial_stp',
                        })
                    }
                    onPasswordManager={openPasswordManager}
                    onClickFund={() =>
                        openAccountTransfer(
                            current_list[
                                Object.keys(current_list).find(key => key.startsWith(`${platform}.demo.financial_stp@`))
                            ],
                            {
                                category: 'demo',
                                type: 'financial_stp',
                            }
                        )
                    }
                    descriptor={localize(
                        'Trade popular currency pairs and cryptocurrencies with straight-through processing order (STP).'
                    )}
                    specs={{
                        [localize('Leverage')]: localize('Up to 1:100'),
                        [localize('Margin call')]: localize('150%'),
                        [localize('Stop out level')]: localize('75%'),
                        [localize('Number of assets')]: localize('50+'),
                    }}
                    has_banner
                />
            )}
        </div>
    );
};

export { CFDDemoAccountDisplay };

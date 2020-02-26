import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Icon, Div100vhContainer, Modal } from '@deriv/components';
import { localize } from '@deriv/translations';
import routes from 'Constants/routes';
import { BinaryLink } from 'App/Components/Routes';
import EmptyPortfolioMessage from 'Modules/Reports/Components/empty-portfolio-message.jsx';
import PositionsModalCard from 'App/Components/Elements/PositionsDrawer/positions-modal-card.jsx';
import { connect } from 'Stores/connect';
import TogglePositions from './toggle-positions.jsx';

class TogglePositionsMobile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            is_positions_visible: false,
        };
    }

    togglePositions = () =>
        this.setState({
            is_positions_visible: !this.state.is_positions_visible,
        });

    render() {
        const {
            all_positions,
            error,
            currency,
            is_empty,
            onClickSell,
            onClickRemove,
            toggleUnsupportedContractModal,
        } = this.props;
        // Show only 5 most recent open contracts
        const body_content = (
            <React.Fragment>
                <TransitionGroup component='div'>
                    {all_positions.slice(0, 5).map(portfolio_position => (
                        <CSSTransition
                            appear
                            key={portfolio_position.id}
                            in={true}
                            timeout={150}
                            classNames={{
                                appear: 'positions-drawer-card__wrapper--enter',
                                enter: 'positions-drawer-card__wrapper--enter',
                                enterDone: 'positions-drawer-card__wrapper--enter-done',
                                exit: 'positions-drawer-card__wrapper--exit',
                            }}
                            unmountOnExit
                        >
                            <PositionsModalCard
                                onClickSell={onClickSell}
                                onClickRemove={onClickRemove}
                                key={portfolio_position.id}
                                currency={currency}
                                toggleUnsupportedContractModal={toggleUnsupportedContractModal}
                                {...portfolio_position}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </React.Fragment>
        );

        return (
            <React.Fragment>
                <TogglePositions
                    is_open={this.state.is_positions_visible}
                    togglePositions={this.togglePositions}
                    positions_count={this.props.active_positions_count}
                />
                <Modal
                    is_open={this.state.is_positions_visible}
                    toggleModal={this.togglePositions}
                    id='dt_mobile_positions'
                    is_vertical_top
                    has_close_icon={false}
                    enableApp={this.props.enableApp}
                    disableApp={this.props.disableApp}
                    width='calc(100vw - 32px)'
                >
                    <Div100vhContainer className='positions-modal' height_offset='48px'>
                        <div className='positions-modal__header'>
                            <span className='positions-modal__title'>
                                <Icon icon='IcPortfolio' className='positions-modal__title-icon' />
                                {localize('Recent Positions')}
                            </span>
                            <div className='positions-modal__close-btn' onClick={this.togglePositions}>
                                <Icon icon='IcMinusBold' />
                            </div>
                        </div>
                        <div className='positions-modal__body'>
                            {is_empty || error ? <EmptyPortfolioMessage error={error} /> : body_content}
                        </div>
                        <div className='positions-modal__footer'>
                            <BinaryLink
                                onClick={this.togglePositions}
                                className='btn btn--secondary btn__large positions-modal__footer-btn'
                                to={routes.reports}
                            >
                                <span className='btn__text'>{localize('Go to Reports')}</span>
                            </BinaryLink>
                        </div>
                    </Div100vhContainer>
                </Modal>
            </React.Fragment>
        );
    }
}
// TODO: Needs to be connected to store due to issue with trade-header-extensions not updating all_positions prop
// Fixes issue with positions not updated in positions modal
export default connect(() => ({}))(TogglePositionsMobile);

import { RECEIVE_PORT_CRYPTOS } from '../actions/portfolio_actions';
import { RECEIVE_CRYPTO_HIST, RECEIVE_CRYPTO, RECEIVE_CRYPTOS } from '../actions/crypto_actions';
import { merge } from 'lodash';

const cryptosReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    let cryptoId;
    let data;
    switch (action.type) {
        case RECEIVE_PORT_CRYPTOS:
            return Object.assign({}, action.allPortCryptos.cryptos); //need to key into "cryptos"
        case RECEIVE_CRYPTO_HIST:
            // maybe can use lodash to deep merge these states instead of this nested logic
            cryptoId = Object.keys(action.crypto)[0];
            data = action.crypto[cryptoId]
            if (!nextState[cryptoId]) {
                nextState[cryptoId] = {chartData: ''}
            }
            nextState[cryptoId]['chartData'] = data
            return nextState;
        case RECEIVE_CRYPTO:
            cryptoId = Object.keys(action.crypto)[0];
            if (Object.values(nextState).length > 0 && nextState[cryptoId]['chartData']) {
                data = nextState[cryptoId]['chartData'];
                nextState[cryptoId] = action.crypto[cryptoId];
                nextState[cryptoId]['chartData'] = data;
                return nextState;
            } else {
                nextState[cryptoId] = action.crypto[cryptoId];
                return nextState;
            };
        case RECEIVE_CRYPTOS:
            return merge({}, nextState, action.cryptos);
        default:
            return state;
    };
};

export default cryptosReducer;
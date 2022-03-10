import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorage } from '../services/LocalStorage';

class ScreenGame extends Component {
  componentDidMount = () => {
    getLocalStorage('token');
  }

 onClickSettingsBtn = () => {
   const { history } = this.props;
   history.push('/settings');
 }

 render() {
   return (
     <div>
       <h1>Tela do jogo</h1>
       <button
         type="button"
         onClick={ this.onClickSettingsBtn }
         data-testid="btn-settings"
       >
         Configurações
       </button>
     </div>
   );
 }
}

ScreenGame.propTypes = {
  history: PropTypes.objectOf.isRequired,
};
export default ScreenGame;

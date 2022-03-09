import React, { Component } from 'react';
import { getLocalStorage } from '../services/LocalStorage';

class ScreenGame extends Component {
  componentDidMount = () => {
    getLocalStorage('token');
  }

  render() {
    return (
      <div>
        <h1>Tela do jogo</h1>
      </div>
    );
  }
}
export default ScreenGame;

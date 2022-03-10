import React, { Component } from 'react';
import { getLocalStorage } from '../services/LocalStorage';
import Header from '../components/Header';

class ScreenGame extends Component {
  componentDidMount = () => {
    getLocalStorage('token');
  }

  render() {
    return (
      <div>
        <h1>Tela do jogo</h1>
        <Header />
      </div>
    );
  }
}

export default ScreenGame;

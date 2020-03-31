import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import alertify from 'alertifyjs';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {

      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile');
    
    } catch (err) {
      alertify.error('Something wrong with your Login, try again!');
    }
  }

  return (
    <div className='login-container'>
      <section className='form'>
        <img src={logoImg} alt='Be The Hero' />

        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <input
            placeholder='Your ID'
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className='button' type='submit'>
            Login
          </button>

          <Link className='back-link' to='/register'>
            <FiLogIn size={16} color='#e02041' />
            Don't have an account?
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt='Heroes' />
    </div>
  );
}

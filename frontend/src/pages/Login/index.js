import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login() {
  const history = useHistory();
  const [name, setName] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const { data } = await api.post('sessions', { name });
      localStorage.setItem('ongId', data.id);
      localStorage.setItem('ongName', name);

      history.push('/profile');
    } catch (err) {
      alert('Something wrong with your Login, try again!');
    }
  }

  return (
    <div className='login-container'>
      <section className='form'>
        <img src={logoImg} alt='Be The Hero' />

        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>

          <Input
            id='organization'
            placeholder='Your organization'
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <Button className='button' type='submit' label='Login' />

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

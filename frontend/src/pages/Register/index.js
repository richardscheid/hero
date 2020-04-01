import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import Input from '../../components/Input';
import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const details = { name, email, whatsapp, city, uf };

    try {
      
      const { data } = await api.post('ongs', details);
      
      localStorage.setItem('ongId', data.id);
      localStorage.setItem('ongName', data.name);
      history.push('/profile');
      
    } catch (err) {
      alert('There is something wrong with your registration , try again!');
    }
  }

  return (
    <div className='register-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be The Hero' />

          <h1>Register</h1>
          <p>Register and help people find the cases of your NGO</p>

          <Link className='back-link' to='/'>
            <FiArrowLeft size={16} color='#E02041' />
            Back to Login
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <Input
            placeholder='NGO Name'
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <Input
            placeholder='Phone number'
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className='input-group'>
            <Input
              value={city}
              placeholder='City'
              onChange={e => setCity(e.target.value)}
            />

            <Input
              value={uf}
              placeholder='PR'
              maxlength='2'
              style={{ width: 80 }}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className='button' type='submit'>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

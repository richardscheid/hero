import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Textarea from '../../components/Textarea';

export default function NewIncident() {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  
  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch (err) {
      alert('Something wrong with this case, try again!');
    }
  }

  return (
    <div className='new-incident-container'>
      <div className='content'>
        <section>
          <img src={logoImg} alt='Be the Hero' />
          
          <h1>Register new case</h1>
          
          <p>Describe the case in detail to find a hero to help.</p>

          <Link className='back-link' to='/profile'>
            <FiArrowLeft size={16} color='#E02041' />
            Back to Home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <Input
            placeholder='Title of the case'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          
          <Textarea
            placeholder='Description'
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <Input
            placeholder='Value'
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <Button className='button' type='submit' label='Register' />
        </form>
      </div>
    </div>
  );
}

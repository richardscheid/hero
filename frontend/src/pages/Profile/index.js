import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get('profile', { headers: { Authorization: ongId } }).then(response => {
      setIncidents(response.data);
    });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Something wrong when deleting a case, try again!');
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className='profile-container'>
      <header>
        <img src={logoImg} alt='Be the Hero' />
        <span>
          Welcome, <strong>{ongName}</strong>!
        </span>

        <Link className='button' to='incidents/new'>
          New Case
        </Link>
        <button onClick={handleLogout} type='button'>
          <FiPower size={18} color='#E02041' />
        </button>
      </header>

      <h1>Cases</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Case:</strong>
            <p>{incident.title}</p>
            <strong>Description:</strong>
            <p>{incident.description}</p>
            <strong>Value:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)}
              type='button'>
              <FiTrash2 size={20} color='#E02041' />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

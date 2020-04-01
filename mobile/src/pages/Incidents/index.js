import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import styles from './styles';
import logoImage from '../../assets/logo.png';

export default function Incidents() {
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIncidents, setTotalIncidents] = useState(0);

  const navigation = useNavigation();

  function navigateToDetails(incident) {
    navigation.navigate('Details', { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (isTheLastPage()) {
      return;
    }

    setLoading(true);

    const response = await api.get('/incidents', {
      params: {
        page: currentPage
      }
    });

    setIncidents([...incidents, ...response.data]);
    setTotalIncidents(response.headers['x-total-count']);

    setCurrentPage(currentPage + 1);
    setLoading(false);
  }

  function isTheLastPage() {
    return totalIncidents > 0 && incidents.length === totalIncidents;
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.incidentsContainer}>
      <View style={styles.headerContainer}>
        <Image source={logoImage} />
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{totalIncidents} cases</Text>
        </Text>
      </View>
      <Text style={styles.mainTitle}>Welcome</Text>
      <Text style={styles.mainDescription}>
        Choose one of the cases below and save the day!
      </Text>

      <FlatList
        style={styles.incidentsList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentOng}>
              {incident.name} from {incident.city}/{incident.uf}
            </Text>

            <Text style={styles.incidentDescription}>
              {incident.description}
            </Text>

            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              onPress={() => navigateToDetails(incident)}
              style={styles.incidentButton}
            >
              <Text style={styles.incidentButtonText}>More Details</Text>
              <Feather name='arrow-right' size={16} color='#E02041' />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

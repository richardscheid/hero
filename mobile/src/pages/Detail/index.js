import React from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

import logoImage from '../../assets/logo.png';

export default function Details() {
  const route = useRoute();
  const navigation = useNavigation();

  const { params: { incident } } = route;

  const messageToSend = `Hello ${
      incident.name
    }, I'm getting in touch because I would like to help in the case "${
      incident.title
    }" with the value of ${Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(incident.value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Hero of the case: ${incident.title}`,
      recipients: [incident.email],
      body: messageToSend
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${messageToSend}`
    );
  }

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.headerContainer}>
        <Image source={logoImage} />

        <TouchableOpacity style={styles.headerButton} onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color='#E02041' />
          <Text style={styles.headerButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentOng}>
          {incident.name} from {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentDescription}>{incident.description}</Text>

        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contact}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero of this case</Text>

        <Text style={styles.heroDescription}>Get in touch:</Text>
        <View style={styles.contactButtons}>
          <TouchableOpacity
            onPress={sendWhatsapp}
            style={styles.buttonWhatsapp}
          >
            <FontAwesome name='whatsapp' size={32} color='#E9FAEF' />
            <Text style={[styles.buttonText, styles.buttonTextWhatsapp]}>
              Whatsapp
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={sendEmail} style={styles.buttonEmail}>
            <FontAwesome name='envelope-o' size={30} color='#FBE8EC' />
            <Text style={[styles.buttonText, styles.buttonTextEmail]}>
              Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

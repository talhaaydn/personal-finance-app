import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

const App = () => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return (
    <View
      style={{
        backgroundColor: '#F1F3F6',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}>
      <Image source={require('./assets/logo.png')} />
      <Text
        style={{
          marginTop: 10,
          color: '#3D6670',
          fontSize: 30,
          fontFamily: 'Nunito-Black',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 18,
          shadowColor: '#000',
          shadowOpacity: 0.7,
        }}>
        GİRİŞ YAP
      </Text>

      <View
        style={{
          borderRadius: 5,
          backgroundColor: '#fff',
          paddingVertical: 5,
          paddingHorizontal: 12,
          borderRadius: 5,
          marginTop: 50,
          width: '100%',
        }}>
        <TextInput
          style={{
            height: 45,
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
            color: '#3D6670',
            fontSize: 18,
            fontFamily: 'Nunito-Regular',
          }}
          placeholder="Email"
          placeholderTextColor="#94AFB6"
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
        />
        <TextInput
          style={{
            height: 45,
            color: '#3D6670',
            fontSize: 18,
            fontFamily: 'Nunito-Regular',
          }}
          onChangeText={(text) => onChangePassword(text)}
          placeholder="Password"
          placeholderTextColor="#94AFB6"
          secureTextEntry={true}
          value={password}
        />
      </View>

      <TouchableOpacity
        style={{
          color: '#fff',
          backgroundColor: '#404CB2',
          borderRadius: 4,
          fontFamily: 'Nunito-Bold',
          fontSize: 16,
          width: '100%',
          paddingHorizontal: 24,
          paddingVertical: 15,
          marginTop: 100,
        }}>
        <Text
          style={{
            color: '#fff',
            fontFamily: 'Nunito-Bold',
            fontSize: 16,
            alignSelf: 'center',
          }}>
          Giriş Yap
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

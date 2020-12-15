import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Login = () => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return (
    <View style={styles.loginContainer}>
      <Image source={require('../assets/logo.png')} />
      <Text style={styles.loginTitle}>GİRİŞ YAP</Text>

      <View style={styles.loginFormContainer}>
        <TextInput
          style={{
            borderBottomColor: '#ddd',
            borderBottomWidth: 1,
            ...styles.loginInput,
          }}
          placeholder="Email"
          placeholderTextColor="#94AFB6"
          onChangeText={(text) => onChangeEmail(text)}
          value={email}
        />

        <TextInput
          style={styles.loginInput}
          onChangeText={(text) => onChangePassword(text)}
          placeholder="Password"
          placeholderTextColor="#94AFB6"
          secureTextEntry={true}
          value={password}
        />
      </View>

      <TouchableOpacity style={{marginTop: 20}}>
        <Text style={styles.registerLink}>Üye olmak için tıklayın</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: '#F1F3F6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  loginTitle: {
    marginTop: 10,
    color: '#3D6670',
    fontSize: 30,
    fontFamily: 'Nunito-Black',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.7,
  },
  loginFormContainer: {
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 50,
    width: '100%',
  },
  loginInput: {
    height: 45,
    color: '#3D6670',
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
  },
  loginButton: {
    color: '#fff',
    backgroundColor: '#404CB2',
    borderRadius: 4,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginTop: 100,
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    alignSelf: 'center',
  },
  registerLink: {
    color: '#404CB2',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
  },
});

export default Login;

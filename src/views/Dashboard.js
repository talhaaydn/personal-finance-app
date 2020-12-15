import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {Home} from '../components/icons';

const DashboardScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home screen</Text>
      <Home stroke="#000" />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default DashboardScreen;

import * as React from 'react';
import {View, Text, Button} from 'react-native';

const MoneySavingScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Birikim hedefleri burada listelencek.</Text>
      <Button
        title="Yeni birikim hedefi"
        onPress={() => navigation.navigate('NewMoneySaving')}
      />

      <Button
        title="Birikim hedefi güncelle"
        onPress={() => navigation.navigate('MoneySavingDetailScreen')}
      />
    </View>
  );
};

export default MoneySavingScreen;

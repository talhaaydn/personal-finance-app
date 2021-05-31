import React, {useState, useEffect} from 'react';
import {Image, View, Text} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

const AddFavoriteScreen = ({route, navigation}) => {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const {item} = route.params;

  const saveForm = async () => {
    const result = await axios({
      method: 'post',
      url: 'http://localhost:8080/api/favorite',
      data: {
        coin_id: item.id,
        user_id: '5ff09e7bbe598c1c199cd9aa',
        min_price: Number(minPrice),
        max_price: Number(maxPrice),
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.status == 200) {
      setMinPrice('');
      setMaxPrice('');
    }
  };

  return (
    <FormContainer
      style={{
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'red',
        shadowOffset: {height: 0, width: 0},
      }}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Image style={{width: 120, height: 120}} source={{uri: item.image}} />
          <InputLabel
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginTop: 5,
              marginBottom: 20,
            }}>
            {item.name}
          </InputLabel>
        </View>
        <InputGroup>
          <InputLabel>Anlık Değer: {item.current_price}$</InputLabel>
          <InputLabel>
            Gün içerisindeki maksimum değer: {item.high_24h}$
          </InputLabel>
          <InputLabel>
            Gün içerisindeki minimum değer: {item.low_24h}$
          </InputLabel>
          <View style={{flexDirection: 'row'}}>
            <InputLabel style={{marginRight: 5}}>
              Gün değişim yüzdesi:
            </InputLabel>
            <InputLabel
              style={
                ({
                  fontSize: 17,
                  fontWeight: 'bold',
                },
                [
                  item.price_change_percentage_24h < 0
                    ? {color: '#EB1F39'}
                    : {color: '#41BE06'},
                ])
              }>
              {item.price_change_percentage_24h}%
            </InputLabel>
          </View>
        </InputGroup>
        <InputGroup>
          <InputLabel>Minimum Fiyat</InputLabel>
          <Input onChangeText={(text) => setMinPrice(text)} value={minPrice} />
        </InputGroup>
        <InputGroup>
          <InputLabel>Maksimum Fiyat</InputLabel>
          <Input onChangeText={(text) => setMaxPrice(text)} value={maxPrice} />
        </InputGroup>
        <InputButton onPress={saveForm}>
          <ButtonText>EKLE</ButtonText>
        </InputButton>
      </ScrollView>
    </FormContainer>
  );
};

const FormContainer = styled.View`
  padding: 30px 16px;
  background-color: #fff;
  border-radius: 12px;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  shadow-radius: 20;
  elevation: 20;
  margin: 16px;
`;
const InputGroup = styled.View`
  margin-bottom: 18px;
`;
const InputLabel = styled.Text`
  font-family: 'Nunito-Bold';
  font-size: 16px;
  color: #1c1e21;
`;
const Input = styled.TextInput`
  height: 40px;
  border: 1px solid #94afb6;
  border-radius: 4px;
  margin-top: 6px;
`;
const InputButton = styled.TouchableOpacity`
  background-color: #404cb3;
  border-radius: 4px;
  padding: 15px;
`;
const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Nunito-Bold';
  font-size: 18px;
  text-align: center;
`;
const SelectBox = styled.View`
  border: 1px solid #94afb6;
  border-radius: 4px;
`;

export default AddFavoriteScreen;

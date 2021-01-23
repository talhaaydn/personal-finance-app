import React, {useState, useEffect} from 'react';
import {Picker} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

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
      <InputGroup>
        <InputLabel>
          {item.name} biriminin şuan değeri {item.current_price}$
        </InputLabel>
        <InputLabel>
          Gün içerisindeki maksimum değeri {item.high_24h}$
        </InputLabel>
        <InputLabel>Gün içerisindeki minimum değeri {item.low_24h}$</InputLabel>
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
  font-size: 14px;
  color: #94afb6;
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

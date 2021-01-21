import React, {useState, useEffect} from 'react';
import {Picker} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

const IncomeExpenseScreen = () => {
  const [selectedValue, setSelectedValue] = useState('income-type');
  const [types, setTypes] = useState([]);
  const [type, setType] = useState();
  const [price, setPrice] = useState();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:8080/api/' + selectedValue);
      setTypes(result.data);
    };

    fetchData();
  }, ['http://localhost:8080/api/' + selectedValue]);

  const saveForm = async () => {
    const url =
      'http://localhost:8080/api/' +
      (selectedValue == 'income-type' ? 'income' : 'expense');

    var columnName = null;
    if (selectedValue == 'income-type') {
      columnName = 'income_type';
    } else {
      columnName = 'expense_type';
    }

    const result = await axios({
      method: 'post',
      url: url,
      data: {
        [columnName + '_id']: type,
        user_id: '5ff09e7bbe598c1c199cd9aa',
        value: Number(price),
        content: content,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (result.status == 200) {
      setPrice('');
      setContent('');
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
        <InputLabel>Giriş Türü</InputLabel>
        <SelectBox>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Gelir" value="income-type" />
            <Picker.Item label="Gider" value="expense-type" />
          </Picker>
        </SelectBox>
      </InputGroup>
      <InputGroup>
        <InputLabel>Tür</InputLabel>
        <SelectBox>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
            {types.length > 0
              ? types.map((type) => (
                  <Picker.Item
                    label={type.title}
                    value={type._id}
                    key={type._id}
                  />
                ))
              : null}
          </Picker>
        </SelectBox>
      </InputGroup>
      <InputGroup>
        <InputLabel>Tutar</InputLabel>
        <Input onChangeText={(text) => setPrice(text)} value={price} />
      </InputGroup>
      <InputGroup>
        <InputLabel>Açıklama</InputLabel>
        <Input onChangeText={(text) => setContent(text)} value={content} />
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

export default IncomeExpenseScreen;

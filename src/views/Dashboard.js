import React from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({item}) => (
  <TouchableOpacity>
    <Text>{item.title}</Text>
  </TouchableOpacity>
);

const DashboardScreen = ({navigation}) => {
  const renderItem = ({item}) => {
    return <Item item={item} />;
  };

  return (
    <Container>
      <ScrollView>
        <DashboardHeader>
          <DashboardHeaderTitle style={{fontFamily: 'Nunito-Bold'}}>
            Total Balance
          </DashboardHeaderTitle>
          <DashboardHeaderMoney style={{fontFamily: 'Nunito-Bold'}}>
            24.000 TL
          </DashboardHeaderMoney>
        </DashboardHeader>
        <IncomeExpenseContainer>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </IncomeExpenseContainer>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f0ffff;
`;
const DashboardHeader = styled.View`
  background-color: #243972;
  height: 200px;
  align-items: center;
  justify-content: center;
`;
const DashboardHeaderTitle = styled.Text`
  color: #a8addd;
  font-size: 14px;
  text-transform: uppercase;
`;
const DashboardHeaderMoney = styled.Text`
  color: #fff;
  font-size: 32px;
  text-transform: uppercase;
`;
const IncomeExpenseContainer = styled.View`
  background-color: #fff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin: 0 16px;
  padding: 12px 16px;
`;

export default DashboardScreen;

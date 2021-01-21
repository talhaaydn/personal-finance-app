import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {ArrowDown, ArrowUp} from '../components/icons';
import axios from 'axios';

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

const DashboardScreen = ({navigation}) => {
  const [type, setType] = useState('income');
  const [data, setData] = useState({result: null, info: null});
  const monthNames = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];

  useEffect(() => {
    const fetchData = async () => {
      const expenseIncomeList = await axios(
        'http://localhost:8080/api/' + type,
      );
      const infoData = await axios(
        'http://localhost:8080/api/user/expense-income',
      );
      setData({result: expenseIncomeList.data, info: infoData.data});
    };

    fetchData();
  }, [type]);

  return (
    <Container>
      <ScrollView>
        {/* Dashboard Header */}
        <DashboardHeader>
          <DashboardHeaderTitle style={{fontFamily: 'Nunito-Bold'}}>
            Toplam Miktar
          </DashboardHeaderTitle>
          <DashboardHeaderMoney style={{fontFamily: 'Nunito-Bold'}}>
            {data.info?.total} TL
          </DashboardHeaderMoney>
        </DashboardHeader>
        {/* IncomeExpenseContainer */}
        <IncomeExpenseContainer>
          {/* IncomeExpenseInfo */}
          <IncomeExpenseInfo>
            {/* InfoItem */}
            <IncomeExpenseInfoItem
              onPress={() => {
                setType('income');
              }}>
              <InfoItemCircle style={{backgroundColor: '#41BE06'}}>
                <ArrowUp stroke={'#fff'} width={24} height={24}></ArrowUp>
              </InfoItemCircle>
              <View>
                <InfoItemName>Gelir</InfoItemName>
                <InfoItemPrice>{data.info?.incomesSum}</InfoItemPrice>
              </View>
            </IncomeExpenseInfoItem>
            {/* InfoItem */}
            <IncomeExpenseInfoItem
              onPress={() => {
                setType('expense');
              }}>
              <InfoItemCircle style={{backgroundColor: '#EB1F39'}}>
                <ArrowDown stroke={'#fff'} width={24} height={24}></ArrowDown>
              </InfoItemCircle>
              <View>
                <InfoItemName>Gider</InfoItemName>
                <InfoItemPrice>{data.info?.expensesSum}</InfoItemPrice>
              </View>
            </IncomeExpenseInfoItem>
          </IncomeExpenseInfo>
          {/* IncomeExpenseList */}

          {data.result?.length > 0
            ? data.result.map((resultList) => (
                <View key={resultList._id.day}>
                  <Date>
                    {resultList._id.day} {monthNames[resultList._id.month - 1]}
                  </Date>

                  {resultList.result.map((item, index) => (
                    <ExpenseIncomeItem
                      key={index}
                      style={
                        resultList.result.length == index + 1
                          ? {marginBottom: 15, borderBottomWidth: 0}
                          : null
                      }>
                      <ExpenseIncomeItemTitle>
                        {type == 'expense'
                          ? item.expense_type_name
                          : item.income_type_name}
                      </ExpenseIncomeItemTitle>
                      <View>
                        {/* <ExpenseIncomeItemTime>02:03 PM</ExpenseIncomeItemTime> */}
                        <ExpenseIncomeItemPrice
                          style={
                            type == 'income'
                              ? styles.incomeColor
                              : styles.expenseColor
                          }>
                          {type == 'income' ? '+' : '-'} {item.value} TL
                        </ExpenseIncomeItemPrice>
                      </View>
                    </ExpenseIncomeItem>
                  ))}
                </View>
              ))
            : null}
        </IncomeExpenseContainer>
        {/* <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        /> */}
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
  font-family: 'Nunito-Bold';
  font-weight: 700;
`;
const DashboardHeaderMoney = styled.Text`
  color: #fff;
  font-size: 32px;
  text-transform: uppercase;
`;
const IncomeExpenseContainer = styled.View`
  background-color: #fff;
  border-radius: 12px;
  margin: 0 16px;
  padding: 12px 16px;
  margin-top: -40px;
`;
const IncomeExpenseInfo = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const IncomeExpenseInfoItem = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 12px 10px;
`;
const InfoItemCircle = styled.View`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 48px;
  margin-right: 10px;
`;
const InfoItemName = styled.Text`
  font-family: Nunito-Semibold;
  font-size: 13px;
  font-weight: 700;
  color: #94afb6;
`;
const InfoItemPrice = styled.Text`
  font-family: Nunito-Black;
  font-size: 17px;
  color: #3d6670;
`;

const ExpenseIncomeItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom-color: #ddd;
  border-bottom-width: 1px;
`;
const ExpenseIncomeItemTitle = styled.Text`
  font-family: Nunito-Bold;
  font-size: 15px;
  font-weight: 600;
  color: #3d6670;
`;
const ExpenseIncomeItemTime = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: #94afb6;
  text-align: right;
`;
const ExpenseIncomeItemPrice = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;
const Date = styled.Text`
  font-family: Nunito-Regular;
  font-weight: 600;
  font-size: 13px;
  color: #94afb6;
`;

const styles = StyleSheet.create({
  borderBottomForExpenseIncomeItem: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  incomeColor: {
    color: '#41BE06',
  },
  expenseColor: {
    color: '#EB1F39',
  },
});

export default DashboardScreen;

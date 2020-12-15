import * as React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DashboardScreen from './views/Dashboard';
import DashboardDetailScreen from './views/DashboardDetail';
import IncomeExpenseScreen from './views/IncomeExpense';
import MoneySavingScreen from './views/MoneySaving';
import NewMoneySavingScreen from './views/NewMoneySaving';
import MoneySavingDetailScreen from './views/MoneySavingDetail';

const DashboardStack = createStackNavigator();

function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="Dashboard" component={DashboardScreen} />
      <DashboardStack.Screen name="Details" component={DashboardDetailScreen} />
    </DashboardStack.Navigator>
  );
}

const MoneySavingStack = createStackNavigator();

function MoneySavingStackScreen() {
  return (
    <MoneySavingStack.Navigator>
      <MoneySavingStack.Screen
        name="MoneySaving"
        component={MoneySavingScreen}
      />
      <MoneySavingStack.Screen
        name="NewMoneySaving"
        component={NewMoneySavingScreen}
      />
      <MoneySavingStack.Screen
        name="MoneySavingDetailScreen"
        component={MoneySavingDetailScreen}
      />
    </MoneySavingStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Anasayfa">
      <Tab.Navigator>
        <Tab.Screen name="Anasayfa" component={DashboardStackScreen} />
        <Tab.Screen name="Gelir/Gider Ekle" component={IncomeExpenseScreen} />
        <Tab.Screen name="Birikim Takibi" component={MoneySavingStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

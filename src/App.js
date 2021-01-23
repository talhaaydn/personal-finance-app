import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from './components/tab-bar';

import DashboardScreen from './views/Dashboard';
import IncomeExpenseScreen from './views/IncomeExpense';
import NewsScreen from './views/News';
import NewsWebViewScreen from './views/NewsWebView';
import InvestScreen from './views/Invest';
import AddFavoriteScreen from './views/AddFavorite';

const NewsStack = createStackNavigator();

function NewsStackScreen() {
  return (
    <NewsStack.Navigator initialRouteName="Haberler">
      <NewsStack.Screen name="Haberler" component={NewsScreen} />
      <NewsStack.Screen name="Haber Detayı" component={NewsWebViewScreen} />
    </NewsStack.Navigator>
  );
}

const InvestStack = createStackNavigator();

function InvestStackScreen() {
  return (
    <InvestStack.Navigator initialRouteName="Haberler">
      <InvestStack.Screen
        name="Yatırım"
        component={InvestScreen}
        options={{headerShown: false}}
      />
      <InvestStack.Screen name="Favori Ekle" component={AddFavoriteScreen} />
    </InvestStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer initialRouteName="Anasayfa">
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="Anasayfa" component={DashboardScreen} />
        <Tab.Screen name="Gelir/Gider Ekle" component={IncomeExpenseScreen} />
        <Tab.Screen name="Yatırım" component={InvestStackScreen} />
        <Tab.Screen name="Haberler" component={NewsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

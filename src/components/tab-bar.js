import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Home, Plus, Layout} from './icons';

function TabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.TabBar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            style={styles.TabBarItem}
            key={label}>
            {label === 'Anasayfa' && (
              <Home
                stroke={isFocused ? '#404CB3' : '#94AFB6'}
                width={30}
                height={30}
              />
            )}
            {label === 'Gelir/Gider Ekle' && (
              <Plus
                stroke={isFocused ? '#404CB3' : '#94AFB6'}
                width={30}
                height={30}
              />
            )}
            {label === 'Haberler' && (
              <Layout
                stroke={isFocused ? '#404CB3' : '#94AFB6'}
                width={30}
                height={30}
              />
            )}

            <Text
              style={[
                styles.TabBarText,
                isFocused
                  ? styles.TabBarTextFocused
                  : styles.TabBarTextNotFocused,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  TabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    height: 65,
    paddingHorizontal: 15,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  TabBarItem: {
    alignItems: 'center',
  },
  TabBarText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
    marginTop: -5,
  },
  TabBarTextFocused: {
    color: '#404CB3',
  },
  TabBarTextNotFocused: {
    color: '#94AFB6',
  },
});

export default TabBar;

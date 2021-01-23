import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {Star} from '../components/icons';

const Invest = ({navigation}) => {
  const [coins, setCoins] = useState([]);
  const [favoriteCoins, setFavoriteCoins] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const coinsResult = await axios(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false',
      );
      const favoriteCoinsResult = await axios(
        'http://localhost:8080/api/favorite',
      );

      const coinIds = [];
      favoriteCoinsResult.data.map((coin) => coinIds.push(coin.coin_id));

      const filteredCoins = [];
      coinsResult.data.map((coin) => {
        if (coinIds.includes(coin.id)) {
          filteredCoins.push(coin);
        }
      });

      setCoins(coinsResult.data);
      setFavoriteCoins(filteredCoins);
    };

    fetchData();
  }, []);

  function renderItem({item}) {
    return (
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          backgroundColor: '#fff',
          borderRadius: 12,
          marginBottom: 15,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 60, height: 60, marginRight: 15}}
            source={{uri: item.image}}
          />
          <View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text
                style={{
                  color: '#3D6670',
                  fontSize: 16,
                  fontWeight: 'bold',
                  marginRight: 10,
                }}>
                {item.name}
              </Text>
              <Text
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
                ({item.price_change_percentage_24h.toFixed(2)})
              </Text>
            </View>
            <Text
              style={{
                color: '#3D6670',
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              {item.current_price.toFixed(2)}$
            </Text>
          </View>
        </View>

        <TouchableHighlight
          style={{alignSelf: 'center'}}
          onPress={() => {
            navigation.navigate('Favori Ekle', {
              item,
            });
          }}>
          <Star
            stroke="#243972"
            fill={isFavorite == true ? '#243972' : null}
            width={30}
            height={30}></Star>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View style={{backgroundColor: '#243972', flex: 1, padding: 16}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: '#404CB2',
            borderRadius: 12,
            marginBottom: 15,
            width: '49%',
            marginRight: '1%',
          }}
          onPress={() => setIsFavorite(false)}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Tümü
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: '#404CB2',
            borderRadius: 12,
            marginBottom: 15,
            width: '49%',
            marginLeft: '1%',
          }}
          onPress={() => setIsFavorite(true)}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Favoriler
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={isFavorite == true ? favoriteCoins : coins}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Invest;

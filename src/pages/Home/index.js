import React, {useEffect, useState, useCallback} from 'react';
import {ScrollView, StyleSheet, View, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {
  FoodCard,
  Gap,
  HomeTabSection,
  HomeProfile,
  FoodCardSkeleton,
} from '../../components';
import {API_HOST} from '../../config';
import {getFoodData} from '../../redux/action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {food} = useSelector(state => state.homeReducer);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getFoodData());
  }, []);

  const onRefresh = useCallback(() => {
    dispatch({type: 'RESET_FOOD'});
    setRefreshing(true);

    axios
      .get(`${API_HOST.url}/food`)
      .then(response => {
        dispatch({type: 'SET_FOOD', value: response.data.data.data});
        setRefreshing(false);
      })
      .catch(() => {
        showMessage('Data List Produk Gagal Diambil!');
      });
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#FFC700']}
        />
      }>
      <View style={styles.page}>
        <HomeProfile />
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.foodCardContainer}>
              <Gap width={24} />
              {food.length < 1 ? (
                <FoodCardSkeleton />
              ) : (
                food.map((itemFood, index) => {
                  return (
                    <FoodCard
                      key={index}
                      image={{uri: itemFood.picturePath}}
                      name={itemFood.name}
                      rating={itemFood.rate}
                      onPress={() =>
                        navigation.navigate('FoodDetail', itemFood)
                      }
                    />
                  );
                })
              )}
            </View>
          </ScrollView>
        </View>
        <View style={styles.tabContainer}>
          <HomeTabSection />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  foodCardContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  tabContainer: {
    flex: 1,
  },
});

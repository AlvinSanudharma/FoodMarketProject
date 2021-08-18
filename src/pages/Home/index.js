import React, {useEffect, useState, useCallback} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  FoodDummy1,
  FoodDummy2,
  FoodDummy3,
  FoodDummy4,
  ProfileDummy,
} from '../../assets';
import {
  FoodCard,
  Gap,
  HomeTabSection,
  HomeProfile,
  FoodCardSkeleton,
} from '../../components';
import {getFoodData} from '../../redux/action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {food} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getFoodData());
  }, []);

  return (
    <ScrollView>
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

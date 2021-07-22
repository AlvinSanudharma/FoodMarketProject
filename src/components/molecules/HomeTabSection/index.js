import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useNavigation} from '@react-navigation/native';
import {FoodDummy5, FoodDummy6, FoodDummy7} from '../../../assets';
import Rating from '../Rating';
import ItemListFood from '../ItemListFood';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 3,
      width: '15%',
      marginLeft: '3%',
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1,
    }}
    tabStyle={{
      width: 'auto',
    }}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? '#020202' : '#8D92A3',
        }}>
        {route.title}
      </Text>
    )}
  />
);

const NewTaste = () => {
  const navigation = useNavigation();

  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ItemListFood
        type="product"
        rating
        onPress={() => navigation.navigate('FoodDetail')}
        image={FoodDummy5}
        name="Soup Bumil"
        price="289.000"
      />
      <ItemListFood
        type="product"
        rating
        onPress={() => navigation.navigate('FoodDetail')}
        image={FoodDummy6}
        name="Chicken"
        price="4.509.000"
      />
      <ItemListFood
        type="product"
        rating
        onPress={() => navigation.navigate('FoodDetail')}
        image={FoodDummy7}
        name="Shrimp"
        price="999.000"
      />
    </View>
  );
};

const Popular = () => {
  const navigation = useNavigation();

  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ItemListFood
        type="product"
        rating
        onPress={() => navigation.navigate('FoodDetail')}
        image={FoodDummy6}
        name="Chicken"
        price="4.509.000"
      />
      <ItemListFood
        type="product"
        rating
        onPress={() => navigation.navigate('FoodDetail')}
        image={FoodDummy5}
        name="Shrimp"
        price="999.000"
      />
    </View>
  );
};

const Recommended = () => {
  const navigation = useNavigation();

  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      <ItemListFood
        type="product"
        rating
        onPress={() => navigation.navigate('FoodDetail')}
        image={FoodDummy7}
        name="Soup Bumil"
        price="289.000"
      />
    </View>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

const HomeTabSection = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: '1', title: 'New Taste'},
    {key: '2', title: 'Popular'},
    {key: '3', title: 'Recommended'},
  ]);

  const renderScene = SceneMap({
    1: NewTaste,
    2: Popular,
    3: Recommended,
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default HomeTabSection;

const styles = StyleSheet.create({});
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
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
      width: '0.1%',
      marginLeft: '0.1%',
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

const inProgress = () => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        <ItemListFood
          type="in-progress"
          items="3"
          onPress={() => navigation.navigate('OrderDetail')}
          image={FoodDummy5}
          name="Soup Bumil"
          price="289.000"
        />
        <ItemListFood
          type="in-progress"
          items="3"
          onPress={() => navigation.navigate('OrderDetail')}
          image={FoodDummy6}
          name="Chicken"
          price="4.509.000"
        />
        <ItemListFood
          type="in-progress"
          items="3"
          onPress={() => navigation.navigate('OrderDetail')}
          image={FoodDummy7}
          name="Shrimp"
          price="999.000"
        />
      </View>
    </ScrollView>
  );
};

const pastOrders = () => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        <ItemListFood
          type="past-orders"
          status="Cancelled"
          date="Mei 2, 09:00"
          items={3}
          onPress={() => navigation.navigate('OrderDetail')}
          image={FoodDummy6}
          name="Chicken"
          price="4.509.000"
        />
        <ItemListFood
          type="past-orders"
          status="Cancelled"
          date="Mei 2, 09:00"
          items={3}
          onPress={() => navigation.navigate('OrderDetail')}
          image={FoodDummy5}
          name="Shrimp"
          price="999.000"
        />
      </View>
    </ScrollView>
  );
};

const OrderTabSection = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: '1', title: 'In Progress'},
    {key: '2', title: 'Past Orders'},
  ]);

  const renderScene = SceneMap({
    1: inProgress,
    2: pastOrders,
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={layout}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default OrderTabSection;

const styles = StyleSheet.create({});

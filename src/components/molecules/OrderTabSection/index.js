import React, {useState, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {getInProgress, getPastOrders} from '../../../redux/action';

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

const inProgress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {inProgress} = useSelector(state => state.orderReducer);
  // console.log(state);
  useEffect(() => {
    dispatch(getInProgress());
  }, []);
  // console.log(inProgress);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        {inProgress.map(order => {
          return (
            <ItemListFood
              key={order.id}
              type="in-progress"
              items={order.quantity}
              onPress={() => navigation.navigate('OrderDetail')}
              image={{uri: order.food.picturePath}}
              name={order.food.name}
              price={order.total}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const pastOrders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {pastOrders} = useSelector(state => state.orderReducer);
  // console.log(state);
  useEffect(() => {
    dispatch(getPastOrders());
  }, []);
  // console.log(pastOrders);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        {pastOrders.map(order => {
          return (
            <ItemListFood
              key={order.id}
              type="past-orders"
              status={order.status}
              date={order.created_at}
              items={order.quantity}
              onPress={() => navigation.navigate('OrderDetail')}
              image={{uri: order.food.picturePath}}
              name={order.food.name}
              price={order.total}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const initialLayout = {width: Dimensions.get('window').width};

const OrderTabSection = () => {
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
      initialLayout={initialLayout}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default OrderTabSection;

const styles = StyleSheet.create({});

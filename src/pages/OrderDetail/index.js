import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, ItemListFood, ItemValue, Button, Gap} from '../../components';
import {FoodDummy1} from '../../assets';
import axios from 'axios';
import {API_HOST} from '../../config';
import {getData, showMessage} from '../../utils';

const OrderDetail = ({navigation, route}) => {
  const order = route.params;

  const onCancel = () => {
    const data = {
      status: 'CANCELLED',
    };
    getData('token').then(res => {
      axios
        .post(`${API_HOST.url}/transaction/${order.id}`, data, {
          headers: {
            Authorization: res.value,
          },
        })
        .then(response => {
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        })
        .catch(() => {
          showMessage('Something When Wrong');
        });
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header
        title="Payment"
        subTitle="You deserve better meal"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Item Ordered</Text>
        <ItemListFood
          type="order-summary"
          image={{uri: order.food.picturePath}}
          name={order.food.name}
          price={order.food.price}
          items={order.food.quantity}
        />
        <Text style={styles.label}>Details Transaction</Text>
        <ItemValue
          label={order.food.name}
          value={order.food.price * order.quantity}
          type="currency"
        />
        <ItemValue label="Driver" value={50000} type="currency" />
        <ItemValue
          label="Tax 10%"
          value={(10 / 100) * order.total}
          type="currency"
        />
        <ItemValue
          label="Total Price"
          valueColor="#1ABC9C"
          value={order.total}
          type="currency"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Deliver To: </Text>
        <ItemValue label="Name" value={order.user.name} />
        <ItemValue label="Phone No." value={order.user.phoneNumber} />
        <ItemValue label="Address" value={order.user.address} />
        <ItemValue label="House No." value={order.user.houseNumber} />
        <ItemValue label="City" value={order.user.city} />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Order Status: </Text>
        <ItemValue
          label={`#FM${order.id}`}
          value={order.status}
          valueColor={order.status === 'CANCELLED' ? '#D9435E' : '#1ABC9C'}
        />
      </View>
      <View style={styles.button}>
        {order.status === 'PENDING' && (
          <Button
            text="Cancel My Order"
            onPress={onCancel}
            color="#D9435E"
            textColor="white"
          />
        )}
      </View>
      <Gap height={24} />
    </ScrollView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 8,
  },
  button: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
});

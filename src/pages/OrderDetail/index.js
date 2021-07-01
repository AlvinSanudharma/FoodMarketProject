import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, ItemListFood, ItemValue, Button, Gap} from '../../components';
import {FoodDummy1} from '../../assets';

const OrderDetail = ({navigation}) => {
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
          image={FoodDummy1}
          name="Cherry Healthy"
          price="289.000"
          items="14"
        />
        <Text style={styles.label}>Details Transaction</Text>
        <ItemValue label="Cherry Healthy" value="IDR 18.390.000" />
        <ItemValue label="Driver" value="IDR 50.000" />
        <ItemValue label="Tax 10%" value="IDR 1.800.390" />
        <ItemValue
          label="Total Price"
          valueColor="#1ABC9C"
          value="IDR 390.803.000"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Deliver To: </Text>
        <ItemValue label="Name" value="Alvin Sanudharma" />
        <ItemValue label="Phone No." value="0822 0819 9688" />
        <ItemValue label="Address" value="Jalan Laksamana VI" />
        <ItemValue label="House No." value="A5 Hooks" />
        <ItemValue label="City" value="Denpasar" />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Order Status: </Text>
        <ItemValue label="#FM209391" value="Paid" valueColor="#1ABC9C" />
      </View>
      <View style={styles.button}>
        <Button
          text="Cancel My Order"
          onPress={() => navigation.replace('SuccessOrder')}
          color="#D9435E"
          textColor="white"
        />
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

import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import axios from 'axios';
import {
  Header,
  ItemListFood,
  ItemValue,
  Button,
  Loading,
} from '../../components';
import {WebView} from 'react-native-webview';
import {API_HOST} from '../../config';
import {getData, showMessage} from '../../utils';

const OrderSummary = ({navigation, route}) => {
  const {id, item, transaction, userProfile} = route.params;
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('https://google.com');

  const onCheckout = () => {
    const data = {
      food_id: item.id,
      user_id: userProfile.id,
      quantity: transaction.totalItem,
      total: transaction.total,
      status: 'PENDING',
    };
    getData('token').then(response => {
      axios
        .post(`${API_HOST.url}/checkout`, data, {
          headers: {
            Authorization: response.value,
          },
        })
        .then(response => {
          setIsPaymentOpen(true);
          setPaymentUrl(response.data.data.payment_url);
        })
        .catch(error => {
          showMessage('Transaction Failed');
        });
    });
  };

  const onNavChange = state => {
    const title = 'Example Domain';

    if (state.title === title) {
      navigation.reset({index: 0, routes: [{name: 'SuccessOrder'}]});
    }
  };

  if (isPaymentOpen) {
    return (
      <>
        <Header
          title="Payment"
          subTitle="You deserve better meal"
          onBack
          onPress={() => setIsPaymentOpen(false)}
        />
        <WebView
          source={{uri: paymentUrl}}
          onNavigationStateChange={onNavChange}
          startInLoadingState={true}
          renderLoading={() => <Loading />}
        />
      </>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header
        title="Order Summary"
        subTitle="You deserve better meal"
        onBack
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Item Ordered</Text>
        <ItemListFood
          type="order-summary"
          image={{uri: item.picturePath}}
          name={item.name}
          price={item.price}
          items={transaction.totalItem}
        />
        <Text style={styles.label}>Details Transaction</Text>
        <ItemValue
          type="currency"
          label={item.name}
          value={transaction.totalPrice}
        />
        <ItemValue type="currency" label="Driver" value={transaction.driver} />
        <ItemValue type="currency" label="Tax 10%" value={transaction.tax} />
        <ItemValue
          type="currency"
          label="Total Price"
          valueColor="#1ABC9C"
          value={transaction.total}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Deliver To: </Text>
        <ItemValue label="Name" value={userProfile.name} />
        <ItemValue label="Phone No." value={userProfile.phoneNumber} />
        <ItemValue label="Address" value={userProfile.address} />
        <ItemValue label="House No." value={userProfile.houseNumber} />
        <ItemValue label="City" value={userProfile.city} />
      </View>
      <View style={styles.button}>
        <Button text="Checkout Now" onPress={onCheckout} />
      </View>
    </ScrollView>
  );
};

export default OrderSummary;

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
    marginBottom: 26,
  },
});

import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {FoodDummy1} from '../../../assets';
import Number from '../Number';
import Rating from '../Rating';

const ItemListFood = ({
  image,
  name,
  price,
  onPress,
  items,
  rating,
  type,
  date,
  status,
}) => {
  const renderContent = () => {
    switch (type) {
      case 'product':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.name}>{name}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <Rating number={rating} />
          </>
        );
        break;
      case 'order-summary':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.name}>{name}</Text>
              <Number number={price} style={styles.price} />
            </View>
            <Text style={styles.items}>{items} Items</Text>
          </>
        );
        break;
      case 'in-progress':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>{items} items</Text>
                <View style={styles.dot} />
                <Number style={styles.price} number={price} />
              </View>
            </View>
          </>
        );
        break;
      case 'past-orders':
        const newDate = new Date(date).toDateString();

        return (
          <>
            <View style={styles.content}>
              <Text style={styles.name}>{name}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>{items} items</Text>
                <View style={styles.dot} />
                <Number style={styles.price} number={price} />
              </View>
            </View>
            <View>
              <Text style={styles.date}>{newDate}</Text>
              <Text style={styles.status(status)}>{status}</Text>
            </View>
          </>
        );
        break;

      default:
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.price}>IDR {price}</Text>
            </View>
            <Rating number={rating} />
          </>
        );
        break;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        {renderContent()}
      </View>
    </TouchableOpacity>
  );
};

export default ItemListFood;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  content: {flex: 1},
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  price: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  items: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  date: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  status: status => ({
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: status === 'CANCELLED' ? '#D9435E' : '#1ABC9C',
    marginTop: 2,
  }),
  row: {flexDirection: 'row', alignItems: 'center'},
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#8D92A3',
    marginHorizontal: 4,
  },
});

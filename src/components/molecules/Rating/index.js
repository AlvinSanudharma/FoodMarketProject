import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IcStarOff, IcStarOn} from '../../../assets';
import Number from '../Number';

const Rating = ({number}) => {
  const renderStar = () => {
    let star = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= number) {
        star.push(<IcStarOn key={`index-${i}`} />);
      } else {
        star.push(<IcStarOff key={`index-${i}`} />);
      }
    }

    return star;
  };

  return (
    <View style={styles.ratingContainer}>
      <View style={styles.starContainer}>{renderStar()}</View>
      {/* <Number number={number} type="decimal" /> */}
      <Text>{`${number}.0`}</Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
});

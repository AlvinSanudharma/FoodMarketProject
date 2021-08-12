import React from 'react';
import {View, Text} from 'react-native';
import {Gap} from '../../atoms';

const FoodCardSkeleton = () => {
  const setLoading = () => {
    let loading = [];

    for (let i = 1; i <= 3; i++) {
      loading.push(
        <View
          key={i}
          style={{
            width: 200,
            backgroundColor: '#FAFAFC',
            borderRadius: 8,
            marginRight: 24,
          }}>
          <Gap height={140} />
          <View style={{padding: 12}}>
            <View
              style={{
                width: 119,
                height: 12,
                backgroundColor: '#F2F2F2',
                borderRadius: 40,
                marginBottom: 6,
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 88,
                  height: 8,
                  backgroundColor: '#F2F2F2',
                  borderRadius: 40,
                  marginRight: 12,
                }}
              />
              <View
                style={{
                  width: 17,
                  height: 8,
                  backgroundColor: '#F2F2F2',
                  borderRadius: 40,
                }}
              />
            </View>
          </View>
        </View>,
      );
    }

    return loading;
  };

  return <>{setLoading()}</>;
};

export default FoodCardSkeleton;

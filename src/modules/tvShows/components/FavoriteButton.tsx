import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface FavoriteButtonProps {
  selected: boolean;
  onPress: () => void;
}

export const FavoriteButton = ({ selected, onPress }: FavoriteButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="star" size={22} color={'purple'} solid={selected} />
    </TouchableOpacity>
  );
};

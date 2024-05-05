import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../../../style/Theme';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: Theme.fontSize.title,
  },
});

interface InfoRowProps {
  title: string;
  value?: string | null;
}

export const InfoRow = ({ title, value }: InfoRowProps) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={[styles.title, styles.text]}>{title}</Text>
      <Text style={styles.text}>{value ?? 'Unavailable'}</Text>
    </View>
  );
};

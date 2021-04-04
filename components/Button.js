import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const Button = ({onPress, children, ...props}) => {
  return (
    <TouchableOpacity
      style={props.styles ? props.styles : styles.enterButton}
      onPress={onPress}>
      <Text style={styles.enterButtonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  enterButton: {
    marginTop: 24,
    backgroundColor: '#5d9ee9',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 5,
    width: 120,
  },
  enterButtonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Button;

import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/Redux_action';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const Screen_03 = ({ route }) => {
  const { product } = route.params; 
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    try {
      dispatch(addToCart(product));

      const response = await fetch('https://6703b083ab8a8f8927313cb6.mockapi.io/nguyenbaodai/20015321/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product), 
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Thêm vào giỏ hàng thành công:', data);
      } else {
        console.error('Lỗi khi thêm vào giỏ hàng:', response.status);
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.img }} style={styles.image} />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>Giá: {product.price} $</Text>
      <Text style={styles.description}>Mô tả: {product.description}</Text>
      <Button title="Thêm vào giỏ hàng" onPress={handleAddToCart} color="#FF6347" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#2E8B57',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default Screen_03;

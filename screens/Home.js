import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View, Image, StyleSheet, useWindowDimensions, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Asegúrate de tener esto instalado y configurado

import getpost from '../services';
import HTML from 'react-native-render-html';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { width: windowWidth } = useWindowDimensions();
  const navigation = useNavigation(); // Hook de navegación de React Navigation

  useEffect(() => {
    loadPosts();
  }, [currentPage]);


  const loadPosts = async () => {
    if (loading) return;
  
    setLoading(true);
  
    try {
      const data = await getpost(currentPage);
  
      console.log('Data length:', data.length);
  
      if (data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...data]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const goToDetailScreen = (item) => {
    // Navegar a la pantalla de detalles y pasar el post como parámetro
    navigation.navigate('DetailScreen', { post: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => goToDetailScreen(item)}>
      <View style={styles.postContainer}>
        <Text style={styles.title}>{item.title.rendered}</Text>
        <Image source={{ uri: item._embedded['wp:featuredmedia'][0].source_url }} style={styles.image} />
        <Text style={styles.introduction}>{getIntroduction(item.content.rendered)}</Text>
        <Button onPress={() => goToDetailScreen(item)} title="Ver más" />
      </View>
    </TouchableOpacity>
  );

const getIntroduction = (htmlContent) => {
  // Parsear el HTML para obtener solo el texto y limitar la introducción a cierta longitud
  const strippedText = htmlContent.replace(/<[^>]*>/g, ''); // Eliminar etiquetas HTML
  const introductionLength = 150; 
  const introduction = strippedText.length > introductionLength ? `${strippedText.slice(0, introductionLength)}...` : strippedText;
  return introduction;
};

  if (posts.length === 0) {
    return <Text>No hay posts disponibles</Text>;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={loadPosts}
      onEndReachedThreshold={0.1}
      ListFooterComponent={loading && <Text>Cargando...</Text>}
    />
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  authorContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 8,
  },
  introduction: {
    marginBottom: 8,
  },
});
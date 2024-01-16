import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import HTML from 'react-native-render-html';

const DetailScreen = ({ route }) => {
  const { post } = route.params;
  const windowWidth = useWindowDimensions().width;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title.rendered}</Text>
      <View style={styles.authorContainer}>
        {post._embedded.author[0]?.avatar_urls && (
          <Image source={{ uri: post._embedded.author[0].avatar_urls[96] }} style={styles.authorImage} />
        )}
        <Text style={styles.author}>Por: {post._embedded.author[0]?.name}</Text>
      </View>
      <Image source={{ uri: post._embedded['wp:featuredmedia'][0].source_url }} style={styles.image} />
      <HTML source={{ html: post.content.rendered }} tagsStyles={{ p: styles.content }} contentWidth={windowWidth} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333', 
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  author: {
    fontSize: 16,
    color: '#666666', 
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
    color: '#333333', 
  },
});

export default DetailScreen;

import React from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, Pressable, SafeAreaView, Text, View } from 'react-native';

export default function PlayVideo() {
  const videoId = 'gvomEvafG5s';
  const uri = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&cc_load_policy=1`;
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        allowsFullscreenVideo={true}
        javaScriptEnabled={true} // Required for YouTube embeds
        domStorageEnabled={true} // Ensures YouTube's embed player works
        source={{ uri: uri }}
      />
      <View style={styles.bottomSpace}>
        <Text style={styles.text}>
          This is the white space below the video.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  bottomSpace: {
    flex: 1, // Occupies remaining space
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // White background
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

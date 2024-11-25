import React from 'react';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, Pressable, SafeAreaView, Text } from 'react-native';

export default function PlayVideo() {
  const videoId = 'gvomEvafG5s';
  const uri = `https://www.youtube.com/watch?v=${videoId}`;
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.container}
        allowsFullscreenVideo={true}
        source={{ uri: uri }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

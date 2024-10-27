import * as FileSystem from 'expo-file-system';

export async function saveRecording(uri: string | null, filename: string) {
  console.log({ uri, filename });
  const fileUri = `${FileSystem.documentDirectory}${filename}`;
  if (uri) {
    try {
      await FileSystem.moveAsync({
        from: uri, //takes the uri from cache
        to: fileUri, //moves it FileSystem
      });
      // Check if the file exists at the new location
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      console.log('File info:', fileInfo); // Logs details about the saved file

      return fileUri;
    } catch (error) {
      console.error('Error saving recording:', error);
      throw error;
    }
  }
}
//{"filename": "AudioRecording.m4a", "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FLessonText-94eaebcc-2129-4d91-bf45-710fc6d16bcf/Audio/recording-e023ba22-3177-4566-94f4-39f58d92a4e9.m4a"}
// const callback = downloadProgress => {
//   const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
//   this.setState({
//     downloadProgress: progress,
//   });
// };

// const downloadResumable = FileSystem.createDownloadResumable(
//   'http://techslides.com/demos/sample-videos/small.mp4',
//   FileSystem.documentDirectory + 'small.mp4',
//   {},
//   callback
// );

// try {
//   const { uri } = await downloadResumable.downloadAsync();
//   console.log('Finished downloading to ', uri);
// } catch (e) {
//   console.error(e);
// }

// try {
//   await downloadResumable.pauseAsync();
//   console.log('Paused download operation, saving for future retrieval');
//   AsyncStorage.setItem('pausedDownload', JSON.stringify(downloadResumable.savable()));
// } catch (e) {
//   console.error(e);
// }

// try {
//   const { uri } = await downloadResumable.resumeAsync();
//   console.log('Finished downloading to ', uri);
// } catch (e) {
//   console.error(e);
// }

//To resume a download across app restarts, assuming the DownloadResumable.savable() object was stored:
// const downloadSnapshotJson = await AsyncStorage.getItem('pausedDownload');
// const downloadSnapshot = JSON.parse(downloadSnapshotJson);
// const downloadResumable = new FileSystem.DownloadResumable(
//   downloadSnapshot.url,
//   downloadSnapshot.fileUri,
//   downloadSnapshot.options,
//   callback,
//   downloadSnapshot.resumeData
// );

// try {
//   const { uri } = await downloadResumable.resumeAsync();
//   console.log('Finished downloading to ', uri);
// } catch (e) {
//   console.error(e);
// }

import * as FileSystem from 'expo-file-system';

export async function saveRecording(uriCache: string | null, filename: string, setUriFileSys: (uri: string | null) => void) {
  const fileUri = `${FileSystem.documentDirectory}${filename}`;
  if (uriCache) {
    try {
      await FileSystem.moveAsync({
        from: uriCache, //takes the uri from cache
        to: fileUri, //moves it FileSystem
      });
      // Check if the file exists at the new location
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if(fileInfo.exists != undefined){
        setUriFileSys(fileUri)
      }
      return fileUri;
    } catch (error) {
      console.error('Error saving recording:', error);
      throw error;
    }
  }
}

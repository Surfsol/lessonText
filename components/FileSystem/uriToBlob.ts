// import * as FileSystem from 'expo-file-system';
// const uriToBlob = async (uriFileSys: string) => {
//   console.log('in uriToBlob');
//   // Read file as base64
//   const base64Data = await FileSystem.readAsStringAsync(uriFileSys, {
//     encoding: FileSystem.EncodingType.Base64,
//   });
//   if (base64Data) console.log('base64Data');
//   // Convert base64 to binary Blob
//   const byteCharacters = atob(base64Data);
//   const byteArrays = [];

//   for (let offset = 0; offset < byteCharacters.length; offset += 512) {
//     const slice = byteCharacters.slice(offset, offset + 512);
//     const byteNumbers = new Array(slice.length);

//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }

//     byteArrays.push(new Uint8Array(byteNumbers));
//   }
//   if (byteArrays.length > 1) console.log('bytesArray', byteArrays.length);
//   const blob = new Blob(byteArrays, { type: 'audio/m4a' });
//   console.log('blob finished');
//   return blob;
// };

// export default uriToBlob;

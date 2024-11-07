import { Audio } from 'expo-av';
import { Button } from 'react-native';
import { textLanguage } from '../assets/textTranslate/textLanguage';

interface PlayBackAudio {
  uriFileSys: string | null | undefined;
}

const PlayBackAudio: React.FC<PlayBackAudio> = ({ uriFileSys }) => {
  const playPause = async () => {
    console.log('in playpause', { uriFileSys });
    try {
     
      if (uriFileSys) {
        const { sound: playbackObject } = await Audio.Sound.createAsync(
          { uri: uriFileSys },
          { shouldPlay: true }
        );
      }
    } catch (err) {
      console.log({ err });
    }
  };

  return <Button title={textLanguage.playbackAudio['Play / Pause']} onPress={playPause} />;
};

export default PlayBackAudio;

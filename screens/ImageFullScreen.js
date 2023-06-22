import React from 'react';

import {Image, StyleSheet, View} from 'react-native';
import {Loader} from '../components';

const ImageFullScreen = ({route, navigation}) => {
  const [isImageLoading, setIsImageLoading] = React.useState(false);
  const imageUrl = route.params.imageUrl;
  const onLoading = () => {
    setIsImageLoading(!isImageLoading);
  };
  return (
    <View style={styles.container}>
      {isImageLoading && <Loader />}
      <Image
        style={styles.img}
        source={{uri: imageUrl}}
        onLoadStart={onLoading}
        onLoadEnd={onLoading}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: '100%',
    width: '100%',
  },
});
export default ImageFullScreen;

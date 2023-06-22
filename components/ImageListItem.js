import React from 'react';

import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IMAGE_FULL_SCREEN} from '../constants/screens';
import {Loader} from './index';

const ImageListItem = ({id, imageUrl, description, author}) => {
  const [isImageLoading, setIsImageLoading] = React.useState(false);
  const onLoading = () => {
    setIsImageLoading(!isImageLoading);
  };
  const navigation = useNavigation();
  const onPressHandler = () => {
    navigation.navigate(IMAGE_FULL_SCREEN, {imageUrl: imageUrl.regular});
  };
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPressHandler}
        style={({pressed}) => pressed && styles.pressed}>
        <View>
          <View style={styles.imgContainer}>
            {isImageLoading && <Loader />}
            <Image
              source={{uri: imageUrl.thumb}}
              style={styles.img}
              onLoadStart={onLoading}
              onLoadEnd={onLoading}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
            <View style={styles.authorContainer}>
              <Image
                style={styles.authorImg}
                source={{uri: author.profile_image}}
              />
              <Text style={styles.author} numberOfLines={1}>
                {author.name}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1 / 2,
  },
  imgContainer: {
    height: 200,
  },
  img: {
    flex: 1,
  },
  detailsContainer: {
    padding: 8,
    backgroundColor: '#e3e3e3',
    flex: 1,
    minHeight: 80,
  },
  description: {
    color: 'black',
    flex: 1,
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  authorContainer: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  authorImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  author: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
    flexShrink: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
export default React.memo(ImageListItem);

import React, {useEffect, useLayoutEffect} from 'react';

import {Alert, StyleSheet, View} from 'react-native';
import {ImageList, Loader} from '../components';
import {getImages, increasePage, setRandomPage} from '../store/imagesSlice';
import {useDispatch, useSelector} from 'react-redux';

const Gallery = () => {
  const {errors, isLoading} = useSelector(store => store.images);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRandomPage());
    dispatch(getImages());
  }, [dispatch]);

  useEffect(() => {
    if (errors.isError) {
      Alert.alert(errors.errorMsg);
    }
  }, [errors]);

  return (
    <View style={styles.container}>
      <ImageList />
      {isLoading && (
        <View style={styles.loaderContainer}>
          <Loader />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(204,204,204,0.45)',
  },
});
export default Gallery;

import React from 'react';

import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {ImageListItem} from './index';
import {useDispatch, useSelector} from 'react-redux';
import {
  getImages,
  setRandomPage,
  resetImageArray,
  increasePage,
  setIsRefreshing,
} from '../store/imagesSlice';

const ImageList = () => {
  const {imagesList, isLoading, isRefreshing} = useSelector(
    store => store.images,
  );
  const dispatch = useDispatch();
  const onRefresh = () => {
    dispatch(setIsRefreshing());
    dispatch(resetImageArray());
    dispatch(setRandomPage());
    dispatch(getImages());
  };
  const handleEndReached = () => {
    if (!isLoading) {
      dispatch(increasePage());
      dispatch(getImages());
    }
  };
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      numColumns={2}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.7}
      data={imagesList}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ImageListItem
          id={item.id}
          description={item.description}
          imageUrl={item.urls}
          author={item.user}
        />
      )}
    />
  );
};
const styles = StyleSheet.create({});
export default ImageList;

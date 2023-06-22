import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {customFetch} from '../utils/axios';

const initialState = {
  imagesList: [],
  isLoading: false,
  isRefreshing: false,
  page: 1,
  errors: {
    isError: false,
    errorMsg: '',
  },
};

export const getImages = createAsyncThunk(
  'imagesArray/getImages',
  async (_, thunkAPI) => {
    const {page} = thunkAPI.getState().images;
    console.log('getImages', page);
    try {
      const response = await customFetch(`/photos?page=${page}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    increasePage: state => {
      state.page = state.page + 1;
    },
    setRandomPage: state => {
      state.page = Math.floor(Math.random() * 200) + 1;
    },
    resetImageArray: state => {
      state.imagesList = [];
    },
    setIsRefreshing: state => {
      state.isRefreshing = true;
    },
  },
  extraReducers: builder => {
    builder.addCase(getImages.pending, state => {
      state.errors.isError = false;
      state.errors.errorMsg = '';
      state.isLoading = true;
    });
    builder.addCase(getImages.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.isRefreshing = false;
      const idSet = new Set(state.imagesList.map(obj => obj.id));
      const newArray = payload?.reduce((accumulator, currentObject) => {
        if (idSet.has(currentObject.id)) {
          console.log('existing id!!!', currentObject.id);
          return accumulator;
        }
        const newObj = {
          id: currentObject.id,
          description: currentObject.alt_description,
          urls: {
            regular: currentObject.urls.regular,
            thumb: currentObject.urls.thumb,
          },
          user: {
            name: currentObject.user.name,
            profile_image: currentObject.user.profile_image.small,
          },
        };
        accumulator.push(newObj);
        return accumulator;
      }, []);
      state.imagesList.push(...newArray);
    });
    builder.addCase(getImages.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isRefreshing = false;
      state.errors.isError = true;
      state.errors.errorMsg = payload;
    });
  },
});
export const {increasePage, setRandomPage, resetImageArray, setIsRefreshing} =
  imagesSlice.actions;
export default imagesSlice.reducer;

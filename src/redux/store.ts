
// import {configureStore} from '@reduxjs/toolkit'
import taskReducer from '@/components/app/home/tasks/redux/taskSlice';
import { configureStore} from '@reduxjs/toolkit'


export type AppDispatch = typeof store.dispatch;


const store = configureStore({
    reducer: {
      task : taskReducer
    },
  
  });





export default store

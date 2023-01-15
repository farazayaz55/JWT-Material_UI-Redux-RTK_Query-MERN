import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {update,reset} from './authSlice'
const user = JSON.parse(localStorage.getItem('user'))
const baseQuery=fetchBaseQuery({
    baseUrl: 'http://localhost:5000' ,
    prepareHeaders:(headers,{getState})=>{//this runs before each api call
      if(user)
        headers.set('Authorization',`Bearer ${getState().auth.user.accesstoken}`)//if you 're logged in
      else
      headers.set('Authorization',``)//else
      return headers
    },
    credentials:"include",
  })
  
  const baseQueryWithReauth=async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)//simply you tried the base query
    //if auth error comes
    if (result.error && result.error.status === 403) {
      console.log("error came");
      // try to get a new token
      const refreshResult = await baseQuery('/auth/refresh_token', api, extraOptions)//you change the base query to refresh token
      if (refreshResult.data) {
          // api.dispatch(authSlice.reducer.setCredentials({ ...refreshResult.data }))//update the token
  
              //now update the accesstoken
            // api.dispatch(authSlice.caseReducers.update({...refreshResult.data}))//change the state by dispatch
  
              api.dispatch(update({...refreshResult.data}))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)//re run the base query
      } 
      else {
  
        if (refreshResult?.error?.status === 403) {
            refreshResult.error.data.message = "Your login has expired. "
        }
        return refreshResult
    }
    }
    return result
  }
  
  // Define a service using a base URL and expected endpoints
  export const signIn = createApi({
    reducerPath: 'signinAPI',
    tagTypes:['TODO','USER'],//it means we can have two types of tags in this api
    //the tag is like A TAG you can give to an api for caching
    baseQuery: baseQueryWithReauth,
    
    endpoints: (builder) => ({
      signin: builder.mutation({
        invalidatesTags:['USER'],
        query: (payload) => ({
          url: '/auth/login',
          method: 'POST',
          body: payload,
        }),
      }),
      register:builder.mutation({
          invalidatesTags:['USER'],
          query: (payload) => ({
            url: '/auth/register',
            method: 'POST',
            body: payload,
          }),
        }),
      getList:builder.query({
        providesTags:['TODO'],
        query: () => '/'
      }),
      logout:builder.query({
        providesTags:['USER'],
        query: () => '/auth/logout'
      }),
      postLIST:builder.mutation({
        invalidatesTags:['TODO'],
        query: (payload) => ({
          url: '/',
          method: 'POST',
          body: payload,
        }),
      }),
      updateLIST:builder.mutation({
        invalidatesTags:['TODO'],
        query: (payload) => ({
          url: '/',
          method: 'PATCH',
          body: payload,
        }),
      }),
      deleteList:builder.mutation({
        invalidatesTags:['TODO'],
        query: (payload) => ({
          url: '/',
          method: 'DELETE',
          body: payload,
        }),
      }),
    }),
  })
  
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const {useSigninMutation,useRegisterMutation,useGetListQuery,usePostLISTMutation,useUpdateLISTMutation,useDeleteListMutation,useLogoutQuery}= signIn //for each endpoint you get a hook
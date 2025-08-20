import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import axios from "axios";

/* const initialState = [{
    id: 1, title: "title 1", content: "content 1", date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
        like: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0
    }
},
    { id: 2, title: "title 2", content: "content 2", date: sub(new Date(), {minutes:5}).toISOString(),
    reactions: {
        like: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0
    } }
]*/

const POSTS_URL= "https://jsonplaceholder.typicode.com/posts"

const initialState = {
    posts:[],
    status:'idle', // 'idle' | 'loading' | 'succeded' | 'failed' 
    error: null 
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
    try {
        const response = await axios.get(POSTS_URL)
        return [...response.data]
    } catch (error) {
        return error.message
    }
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async(initialPost)=>{
    try {
        const response = await axios.post(POSTS_URL, initialPost)
        return response.data
    } catch (error) {
        return error.message
    }
})



const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
            state.posts.push(action.payload)
            },
            prepare(title, content, userId){
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        reactions: {
                            like: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
     reactionAdded(state, action){
        let {postId, reaction} = action.payload
        let existingPost = state.posts.find((post) => post.id === postId)
         if (existingPost){
            existingPost.reactions[reaction]++
         }
     }
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading' 
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeded'
            let min = 1
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString()
                post.reactions = {
                like: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                 coffee: 0
                }
                return post 
            })
            state.posts =[...new Set(state.posts.concat(loadedPosts))]
            
            
            console.log(state.posts)
        })
        .addCase(fetchPosts.rejected, (state, action)=>{
            state.status = 'failed' 
            state.error = action.error.message
        })
            .addCase(addNewPost.fulfilled, (state, action) => {
            action.payload.userId = Number(action.payload.userId) 
            action.payload.date =  new Date().toISOString()
            action.payload.reactions = {
                like: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                 coffee: 0
            }
            state.posts.push(action.payload)    
            
        })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error
export const selectByPostId = (state, postId) => state.posts.posts.find(post => post.id === postId) 

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
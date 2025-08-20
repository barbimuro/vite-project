import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, reset, incrementByAmount } from "./app/features/counter/counterSlice"
import { useState } from "react"
import PostsLists from "./app/features/posts/PostsLists"
import AddPostForm from "./app/features/posts/AddPostForm"
import {Route, Routes }  from 'react-router'
import Layout from "./components/Layout"
import SinglePostPage from "./app/features/posts/SinglePostPage"

function App() {

  //const [incrementAmount, setIncrementAmount] = useState(0)
  
  //const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()
  
  return (
    <Routes>

    <Route path='/' element={<Layout/>}/>
    <Route index element={<PostsLists/>}/>
      <Route path='post' >
          <Route index element={<AddPostForm/>} />
          <Route path=':postId' element={<SinglePostPage/>}/>
      </Route>
     {/* <main className="App">
      <AddPostForm/>
     <PostsLists/>
     </main>
     */}
    </Routes>
  )
}

export default App

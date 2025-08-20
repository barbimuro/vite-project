import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import PostsExcerpt from './PostsExcerpt'

function PostsLists() {

  const posts = useSelector(selectAllPosts)
  const dispatch = useDispatch()
  const postsStatus = useSelector(getPostsStatus)
  const postsError = useSelector(getPostsError)



  useEffect(() => {
    console.log(postsStatus)
    if (postsStatus === 'idle') {
      console.log("fetch posts")
      dispatch(fetchPosts())
    }
  },
[postsStatus, dispatch])

  let content 
  if (postsStatus === 'loading') {
    content = <p>LOADING...</p>
  }else if(postsStatus === 'succeded'){
    const orderPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    console.log(orderPosts, "ordered posts")
    content = orderPosts.map((post) => {
     // console.log(JSON.stringify(post))
     return <PostsExcerpt key={post.id} post={post} />
    })
  }else if(postsStatus === 'failed'){
    content = <p>{postsError}</p>
  }
  
  
  return (
    <div>
        <h2>Posts:</h2>
          {content}
    </div>
  )
}

export default PostsLists

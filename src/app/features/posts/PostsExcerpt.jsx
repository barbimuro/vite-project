import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'


function PostsExcerpt({post}) {
  return (
    <div>
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <PostAuthor userId={post.userId}/>
          <TimeAgo timestamp={post.date} />
          <ReactionButtons post={post}/>
      </article>
    </div>
  )
}

export default PostsExcerpt

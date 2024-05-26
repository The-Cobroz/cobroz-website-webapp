import React, { useState, useEffect } from 'react';
import axios from "axios";
import AppNavbar from './AppNavbar'
import "./AppStyles.css";
import { getCookieVal } from '../../UtilFunctions/getCookie';
import PostOnApp from './Post/PostOnApp';
import InfiniteScroll from 'react-infinite-scroll-component';

const CobrozApp = () => {
  const newpost = () => {
    window.location.href = "/post/new"
  }

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts(){
      try{
        const val = getCookieVal("CobrozAccType");
        var type = null;
        if(val === 1){
          type = "lawyer";
        }
        else{
          type = "client"
        }
        await axios
                .get(`http://localhost:5000/post/getPosts/${type}`, {withCredentials: true})
                .then(response => {
                  setPosts(response.data);
                })
                .catch(error => {
                  console.log(error);
                  alert("No posts found");
                })
      }
      catch(error){
        alert("Error fetching posts");
      }
    }

    getPosts();
    //console.log(posts);
  }, []);

  return (
    <>
      <AppNavbar/>
      <div className='cobroz-apppage row'>
        <div className='col-sm-3'></div>
        <div className='col-sm-6'>
          <section id='addNewPost'>
            <div className='row newposthomepage'>
              <div className='col-2'>
                <img alt='You' src=''/>
              </div>
              <div className='col-10' onClick={newpost}>
                Want to say same something....
              </div>
            </div>
          </section>
          <section id='cobrozpostsarea'>
            <h6>See what's going on!!</h6>
            <InfiniteScroll
              dataLength={posts.length}
              endMessage={() => {
                return(
                  <div>
                    <h5>No more posts</h5>
                  </div>
                )
              }}
            >
              {posts && posts.map((post) => <PostOnApp key={post.post_id} data={post}/>)}
            </InfiniteScroll>
          </section>
        </div>
        <div className='col-sm-3'></div>
      </div>
    </>
  )
}

export default CobrozApp

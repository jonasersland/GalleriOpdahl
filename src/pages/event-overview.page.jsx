import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";

import aos from "aos";
import "aos/dist/aos.css";

import NavBar from '../components/nav-bar/nav-bar.component';

import '../App.css';

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "event"]{eventTitle,slug,"previewImageUrl": previewImage.asset->url}`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    aos.init({});
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        {allPostsData &&
          allPostsData.map((post, index) => (
            <div key={index} className='contentGridElement' data-aos="fade-in">
                <div className='contentGridImageWrapper'>
                    <Link to={"/Ny/news/" + post.slug.current} key={post.slug.current}>
                        <img src={post.previewImageUrl} alt='Preview' />
                    </Link>
                </div>
                <div className='contentGridElementCaption'>
                    <Link to={"/Ny/news/" + post.slug.current} key={post.slug.current}>
                        {post.eventTitle}
                    </Link>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
}
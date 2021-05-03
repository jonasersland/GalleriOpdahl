import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";

import aos from "aos";
import "aos/dist/aos.css";

import NavBar from '../components/nav-bar/nav-bar.component';

import '../App.css';
import './exhibition-overview.style.css';

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);

  useEffect(() => { 
    sanityClient
      .fetch(
        `*[_type == "exhibition"]{
          openingDate,
          exhibitionTitle,
          exhibitionSubTitle,
          slug,
          "previewImageUrl": exhibitionImages[]{"imageUrl": image.asset->url}[0]
        } | order(openingDate desc)`
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
      <div className="exhibitionGridMode">
        {allPostsData &&
          allPostsData.map((post, index) => (
            <div key={index} className='contentGridElement' data-aos="fade-in">
                <div className='contentGridImageWrapper'>
                    <Link to={"/Ny/exhibition/" + post.slug.current} key={post.slug.current}>
                        <img src={post.previewImageUrl.imageUrl} alt='Preview' />
                    </Link>
                </div>
                <div className='contentGridElementCaption'>
                    <Link to={"/Ny/exhibition/" + post.slug.current} key={post.slug.current}>
                        {post.exhibitionTitle}<br/>
                        <span className="fontWeight500">{post.exhibitionSubTitle}</span>
                    </Link>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
}
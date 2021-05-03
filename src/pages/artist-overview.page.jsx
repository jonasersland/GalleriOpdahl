import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";

import aos from "aos";
import "aos/dist/aos.css";

import {BiGridAlt} from "react-icons/bi";
import {BiMenu} from "react-icons/bi";

import NavBar from '../components/nav-bar/nav-bar.component';

import '../App.css';
import './artist-overview.style.css';

export default function AllPosts() {
  const [allPostsData, setAllPosts] = useState(null);
  const [viewGridMode, toggleGridMode] = useState(true);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "artist"]{
          firstName,lastName,slug,"previewImageUrl": workImages[]{"imageUrl": image.asset->url}[0]} | order(lastName asc)`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);
console.log(allPostsData);
  useEffect(() => {
    aos.init({});
  }, []);

  const setGridView = () => {
    toggleGridMode(true)
  }

  const setListView = () => {
    toggleGridMode(false)
  }

  return (
    <div>
      <NavBar />
      <div>
        <div className="toggleButtonContainer">
          <div onClick={() => setGridView()} className={`toggleButton ${viewGridMode ? "active" : "gray"}`}><BiGridAlt /></div>
          <div onClick={() => setListView()}className={`toggleButton ${viewGridMode ? "gray" : "active"}`}><BiMenu /></div>
        </div>

        {viewGridMode ?
          <div className="gridMode">
            {allPostsData &&
              allPostsData.map((post, index) => (
                <div key={index} className='contentGridElement' data-aos="fade-in">
                    <div className='contentGridImageWrapper'>
                        <Link to={"/Ny/artist/" + post.slug.current} key={post.slug.current}>
                            <img src={post.previewImageUrl.imageUrl} alt='Preview' />
                        </Link>
                    </div>
                    <div className='contentGridElementCaption'>
                        <Link to={"/Ny/artist/" + post.slug.current} key={post.slug.current}>
                            {post.firstName} {post.lastName} 
                        </Link>
                    </div>
                </div>
              ))}
          </div>
        :
          <div className="listMode">
            {allPostsData &&
              allPostsData.map((post, index) => (
                <div key={index} className='contentGridElement'>
                    <div className='contentGridImageWrapper'>
                        <Link to={"/Ny/artist/" + post.slug.current} key={post.slug.current}>
                            <img src={post.previewImageUrl.imageUrl} alt='Preview' />
                        </Link>
                    </div>
                    <div className='contentGridElementCaption'>
                        <Link to={"/Ny/artist/" + post.slug.current} key={post.slug.current}>
                            {post.firstName} {post.lastName} 
                        </Link>
                    </div>
                </div>
              ))}
          </div>
        }
      </div>
    </div>
  );
}
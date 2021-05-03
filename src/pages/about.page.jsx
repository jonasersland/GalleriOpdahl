import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { useMediaQuery } from 'react-responsive';

import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

import { Gallery, Item } from 'react-photoswipe-gallery'

import NavBar from '../components/nav-bar/nav-bar.component';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost() {

    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-width: 1000px)'
      });

const [postData, setPostData] = useState(null);
const {slug} = useParams();
const [viewpostSize, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight
  });
useEffect(() => {
    sanityClient
    .fetch(
        `*[_type == "about"]{
            title,
            slug,
            aboutText,
            previewImageText,
            "previewImageUrl": previewImage.asset->url,
            "previewImageMeta": previewImage.asset->metadata,
        }`
    )
    .then((data) => setPostData(data[0]))
    .catch(console.error);
}, [slug]);
console.log(postData);
  if (!postData) return <div>Loading...</div>;

  const setPreviewImageStyle = () =>{
    if(isTabletOrMobileDevice){
        return ({backgroundImage: `url(${postData.previewImageUrl})`, width: `${viewpostSize.x}px`, height:`${postData.previewImageMeta.dimensions.height/(postData.previewImageMeta.dimensions.width/viewpostSize.x)}px`})
    } else {
        return ({backgroundImage: `url(${postData.previewImageUrl})`})
    }
}
const previewImageStyle = setPreviewImageStyle();

  return (
    <div>
        <NavBar />
        <div className='contentWrapper'>
        {!isTabletOrMobileDevice ? '' : 
            <div className='textSectionTitleWrapper'>
                <div className='title'>
                    {postData.title}
                </div>
            </div>
        }
            <div className='imageSection'>

                <div className='singleImage' style={previewImageStyle}>
                    <div className='singleImageCaption'>
                        <div className='singleImageCaptionMeta gray'>
                                            <BlockContent
                                            blocks={postData.previewImageText}
                                            projectId={sanityClient.clientConfig.projectId}
                                            dataset={sanityClient.clientConfig.dataset}
                                        />
                        </div>
                    </div>
                </div>
            </div>
            <div className='textSection'>
                {isTabletOrMobileDevice ? '' : 
                    <div className='textSectionTitleWrapper'>
                        <div className='title'>
                            {postData.title}
                        </div>
                    </div>
                }
                <div className='textSectionContent'>
                    <BlockContent
                        blocks={postData.aboutText}
                        projectId={sanityClient.clientConfig.projectId}
                        dataset={sanityClient.clientConfig.dataset}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
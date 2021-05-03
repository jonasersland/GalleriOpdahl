import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { useMediaQuery } from 'react-responsive';

import moment from 'moment';

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
      })

const [postData, setPostData] = useState(null);
const {slug} = useParams();
const [viewpostSize, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight
  });
useEffect(() => {
    sanityClient
    .fetch(
        `*[slug.current == "${slug}"]{
            eventTitle,
            slug,
            vimeoEmbed,
            openingDate,
            closingDate,
            "previewImageUrl": previewImage.asset->url,
            "previewImageMeta: previewImage.asset->metadata,
            "eventImages": eventImages[]{title,subTitle, "imageUrl": image.asset->url},
            previewImageCaption,
            eventText
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

  let vimeoEmbedId = null;
  let opening = null;
  let closing = null;

  if (postData.vimeoEmbed){
    vimeoEmbedId = postData.vimeoEmbed.split("/").pop();
  }
  if (postData.openingDate){
    opening = moment(postData.openingDate).format('DD.MM.YY');
  }
  if (postData.closingDate){
    closing = moment(postData.closingDate).format('DD.MM.YY');
  }

  return (
    <div>
        <NavBar />
        <div className='contentWrapper'>
            {!isTabletOrMobileDevice ? '' :
                    <div className='textSectionTitleWrapper'>
                    <div className="date gray">
                        {opening ? `${opening}` : ""} {closing ? ` - ${closing}` : ""}
                    </div>
                    <div className='title'>
                        {postData.eventTitle}
                    </div>
                </div>
            }
            <div className='imageSection'>
                {postData.vimeoEmbed ? 
                    <div className="iframeEmbed">
                        <iframe src={`https://player.vimeo.com/video/${vimeoEmbedId}?color=ffffff&badge=0`} width="640" height="268" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
                    </div>
                :
                    <div className='singleImage' style={previewImageStyle}>
                        <div className='singleImageCaption singleImageCaptionMeta gray'>
                            <BlockContent
                                blocks={postData.previewImageCaption}
                                projectId={sanityClient.clientConfig.projectId}
                                dataset={sanityClient.clientConfig.dataset}
                            />
                        </div>
                    </div>
                }
            </div>
            <div className='textSection'>
                {isTabletOrMobileDevice ? '' :
                    <div className='textSectionTitleWrapper'>
                        <div className="date gray">
                            {opening ? `${opening}` : ""} {closing ? ` - ${closing}` : ""}
                        </div>
                        <div className='title'>
                            {postData.eventTitle}
                        </div>
                    </div>
                }
                <div className='textSectionContent'>
                    <BlockContent
                        blocks={postData.eventText}
                        projectId={sanityClient.clientConfig.projectId}
                        dataset={sanityClient.clientConfig.dataset}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
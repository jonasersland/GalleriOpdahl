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
      })
const [viewpostSize, setSize] = useState({
        x: window.innerWidth,
        y: window.innerHeight
      });

const [postData, setPostData] = useState(null);
const {slug} = useParams();

useEffect(() => {
    sanityClient
    .fetch(
        `*[slug.current == "${slug}"]{
            firstName,
            lastName,
            slug,
            previewImage,
            "previewImage": workImages[]{caption, "imageUrl": image.asset->url,"imageMeta": image.asset->metadata}[0],
            "workImages": workImages[]{caption, "imageUrl": image.asset->url, "imageMeta": image.asset->metadata}[1...100],
            artistBio,
            press
        }`
    )
    .then((data) => setPostData(data[0]))
    .catch(console.error);
}, [slug]);
console.log(postData);
  if (!postData) return <div>Loading...</div>;
  const setPreviewImageStyle = () =>{
    if(isTabletOrMobileDevice){
        return ({backgroundImage: `url(${postData.previewImage.imageUrl})`, width: `${viewpostSize.x}px`, height:`${postData.previewImage.imageMeta.dimensions.height/(postData.previewImage.imageMeta.dimensions.width/viewpostSize.x)}px`})
    } else {
        return ({backgroundImage: `url(${postData.previewImage.imageUrl})`})
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
                        {postData.firstName} {postData.lastName}
                    </div>
                </div>
            }
            <div className='imageSection'>
                <div className='singleImage' style={previewImageStyle}>
                    <div className='singleImageCaption singleImageCaptionMeta gray'>
                        <BlockContent
                            blocks={postData.previewImage.caption}
                            projectId={sanityClient.clientConfig.projectId}
                            dataset={sanityClient.clientConfig.dataset}
                        />
                    </div>
                </div>

                <div className='imageSectionGrid'>
                    <Gallery>

                        { postData.workImages.map((workImage, index) => {

                            function toPlainText(blocks = []) {
                                return blocks
                                // loop through each block
                                .map(block => {
                                    // if it's not a text block with children, 
                                    // return nothing
                                    if (block._type !== 'block' || !block.children) {
                                    return ''
                                    }
                                    // loop through the children spans, and join the
                                    // text strings
                                    return block.children.map(child => child.text).join("\n")
                                })
                                // join the paragraphs leaving split by two linebreaks
                                .join('\n\n')
                            }
                            
                            const caption = toPlainText(workImage.caption);
                            console.log(caption);
                            return(
                                <div key={index} className="imageSectionGridItem">
                                    <Item
                                        key={index}
                                        original={workImage.imageUrl}
                                        thumbnail={urlFor(workImage.imageUrl).width(200).url()}
                                        width={workImage.imageMeta.dimensions.width}
                                        height={workImage.imageMeta.dimensions.height}
                                        title={caption}
                                    >
                                    {({ ref, open }) => (
                                        <img ref={ref} onClick={open} src={workImage.imageUrl} />
                                    )}
                                    </Item>
                                </div>
                            )
                        })}

                    </Gallery>
                </div>

            </div>
            <div className='textSection'>
                {isTabletOrMobileDevice ? '' :
                    <div className='textSectionTitleWrapper'>
                        <div className='title'>
                            {postData.firstName} {postData.lastName}
                        </div>
                    </div>
                }
                <div className='textSectionContent'>
                    <BlockContent
                        blocks={postData.artistBio}
                        projectId={sanityClient.clientConfig.projectId}
                        dataset={sanityClient.clientConfig.dataset}
                    />

                    {postData.press ?
                        <div className="press">
                            <div className="textSectionTitle">Press</div>
                            <BlockContent
                                blocks={postData.press}
                                projectId={sanityClient.clientConfig.projectId}
                                dataset={sanityClient.clientConfig.dataset}
                            />
                        </div>
                    : 
                        ""
                    }
                </div>
            </div>
        </div>
    </div>
  );
}
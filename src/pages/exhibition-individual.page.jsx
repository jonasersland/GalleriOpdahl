import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { useMediaQuery } from 'react-responsive';

import moment from 'moment';

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import { Gallery, Item } from 'react-photoswipe-gallery';

import NavBar from '../components/nav-bar/nav-bar.component';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function OnePost() {

const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-width: 1000px)'
});
const [viewpostSize, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight
});

const [postData, setPostData] = useState(null);
const {slug} = useParams();
//probably an error with using variable in query, look into it
useEffect(() => {
    sanityClient
    .fetch(
        `*[slug.current == "${slug}"]{ 
            openingDate,
            closingDate,
            exhibitionTitle,
            exhibitionSubTitle,
            previewImage,
            "exhibitionImages": exhibitionImages[]{caption, "imageUrl": image.asset->url, "imageMeta": image.asset->metadata}[1...100],
            "previewImage": exhibitionImages[]{caption,"imageUrl": image.asset->url,"imageMeta": image.asset->metadata}[0],
            exhibitionText
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
  const opening = moment(postData.openingDate).format('DD.MM.YY');
  const closing = moment(postData.closingDate).format('DD.MM.YY');

  return (
    <div>
        <NavBar />
        <div className='contentWrapper'>
            {!isTabletOrMobileDevice ? '' :
                <div className='textSectionTitleWrapper'>
                    <div className="date gray">
                        {opening} - {closing}
                    </div>
                    <div className='title'>
                        {postData.exhibitionTitle}<br/>
                        {postData.exhibitionSubTitle}

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

                {postData.exhibitionImages ?
                    <div className='imageSectionGrid'>
                        <Gallery>

                            { postData.exhibitionImages.map((exhibitionImage, index) => {

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
                                
                                const caption = toPlainText(exhibitionImage.caption);
                                console.log(caption);
                                return(
                                    <div key={index} className="imageSectionGridItem">
                                        <Item
                                            key={index}
                                            original={exhibitionImage.imageUrl}
                                            thumbnail={urlFor(exhibitionImage.imageUrl).width(200).url()}
                                            width={exhibitionImage.imageMeta.dimensions.width}
                                            height={exhibitionImage.imageMeta.dimensions.height}
                                            title={caption}
                                        >
                                        {({ ref, open }) => (
                                            <img ref={ref} onClick={open} src={exhibitionImage.imageUrl} />
                                        )}
                                        </Item>
                                    </div>
                                )
                            })}

                        </Gallery>
                    </div>
                :
                ""
                }

            </div>
            <div className='textSection'>
                {isTabletOrMobileDevice ? '' :
                    <div className='textSectionTitleWrapper'>
                        <div className="date gray">
                            {opening} - {closing}
                        </div>
                        <div className='title'>
                            {postData.exhibitionTitle}<br/>
                            {postData.exhibitionSubTitle}

                        </div>
                    </div>
                }
                <div className='textSectionContent'>
                    <BlockContent
                        blocks={postData.exhibitionText}
                        projectId={sanityClient.clientConfig.projectId}
                        dataset={sanityClient.clientConfig.dataset}
                    />
                </div>
            </div>
        </div>
    </div>
  );
}
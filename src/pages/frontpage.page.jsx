import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import moment from 'moment';
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

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

useEffect(() => {
    sanityClient
    .fetch(
        `*[_type == "frontpage"]{
            "type":frontpageItem->{_type},
           "featuredItem": frontpageItem->{
               exhibitionTitle,
               exhibitionSubTitle,
               openingDate,
               closingDate,
               slug,
               "previewImageUrl": exhibitionImages[]{"imageUrl": image.asset->url}[0]
            },
        }`
    )
    .then((data) => setPostData(data[0]))
    .catch(console.error);
}, [slug]);

  if (!postData) return <div>Loading...</div>;
  const {exhibitionTitle,exhibitionSubTitle,openingDate,closingDate,previewImageUrl} = postData.featuredItem;
  const currentType = postData.type._type;
    const opening = moment(openingDate).format('DD.MM.YY');
    const closing = moment(closingDate).format('DD.MM.YY');
  return (
    <div className="home">
        <NavBar />
        <div className='contentWrapper'>

            {!isTabletOrMobileDevice ? '' :
                <div className='mobileTextSection'>
                    <div className='textSectionTitleWrapper'>
                        <div className="date gray">
                            {opening} - {closing}
                        </div>
                        <div className='title'>
                            <Link to={"/Ny/" + currentType + "/" + postData.featuredItem.slug.current}>
                                {exhibitionTitle}<br/>
                                {exhibitionSubTitle}
                            </Link>
                        </div>
                    </div>
                </div>
            }

            <div className='imageSection'>
            <Link to={"/Ny/" + currentType + "/" + postData.featuredItem.slug.current}>
                <div className="singleImageFullscreen" style={{backgroundImage: `url(${previewImageUrl.imageUrl})`}}></div>
            </Link>
            </div>

            {isTabletOrMobileDevice ? '' :
            <div className='textSection'>
                <div className='textSectionTitleWrapper'>
                    <div className="date gray">
                        {opening} - {closing}
                    </div>
                    <div className='title'>
                        <Link to={"/Ny/" + currentType + "/" + postData.featuredItem.slug.current}>
                            {exhibitionTitle}<br/>
                            {exhibitionSubTitle}
                        </Link>
                    </div>
                </div>
            </div>
            }

        </div>
    </div>
  );
}
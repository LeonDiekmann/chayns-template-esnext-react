import React from 'react';

const ListItem = (element) => (
    // return (
    //     <a href="https://chayns.net/${element.siteId}" target ="_blank">
    //         <div className="ListItem ListItem--clickable">
    //             <div className="ListItem__head">
    //                 <div className="ListItem__Image">
    //                     { <img style = "background-image: URL('https://chayns.tobit.com/storage/${element.siteId}/Images/icon-57.png'); background-size: 40px, 40px;">
    //                     </img> }
    //                 </div>
    //                 <div className="ListItem__Title">
    //                     <p className="ListItem__Title--headline">
    //                         {element.appstoreName}
    //                     </p>
    //                     <p className = "ListItem__Title--description">

    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     </a>
    // );
            <a href={`https://chayns.net/${element.siteId}`} target ="_blank">
            <div className="ListItem ListItem--clickable">
                <div className="ListItem__head">
                    <div className="ListItem__Image">
                        <img style = {{backgroundImage: `URL('https://chayns.tobit.com/storage/${element.siteId}/Images/icon-57.png')`, backgroundSize: "40px, 40px"}}>
                        </img>
                    </div>
                    <div className="ListItem__Title">
                        <p className="ListItem__Title--headline">
                            {element.appstoreName}
                        </p>
                        <p className = "ListItem__Title--description">

                        </p>
                    </div>
                </div>
            </div>
        </a>
);

export default ListItem;
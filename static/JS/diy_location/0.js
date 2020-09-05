const { Package } = ARjsStudioBackend;
//等价于const Package = ARjsStudioBackend.Package

window.locations = true;
window.assetParam = {
    scale: 1.0,
    size: {
        width: 1.0,
        height: 1.0,
        depth: 1.0,
    },
    locations: [
        // {
        //     latitude: 12.345678, // required for location based AR
        //     longitude: 12.345678 // required for location based AR
        // }
    ]
};

const checkUserUploadStatus = () => {
    enablePageFooter(window.assetParam.locations.length && window.assetFile);
};

// All the required components are uploaded by the user => footer will be enable
const enablePageFooter = (enable) => {
    if (enable) {
        console.log(window.assetParam.locations.length)
        console.log(window.assetFile)
    } else {
        console.log(window.assetParam.locations.length)
        console.log(window.assetFile)
    }
}




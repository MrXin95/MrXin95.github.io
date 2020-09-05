const supportedFileMap = {
    '3d': {
        types: ['gltf', 'glb', 'zip'],
        maxSize: 60 * 1024 * 1024,
        maxSizeText: '60MB',
    },
    image: {
        types: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
        maxSize: 20 * 1024 * 1024,
        maxSizeText: '20MB',
    },
    audio: {
        types: ['audio/wav', 'audio/mp3'],
        maxSize: 15 * 1024 * 1024,
        maxSizeText: '15MB',
    },
    video: {
        types: ['video/mp4'],
        maxSize: 40 * 1024 * 1024,
        maxSizeText: '40MB',
    }
};

function getFileType(file) {
    //split把字符串分割成元素组成的数组，pop()获取最后一个元素，再转换成小写
    let type = file.name.split('.').pop().toLocaleLowerCase();

    //indexOf检索字符在数组中首次出现的位置。如果要检索的字符串值没有出现，则该方法返回 -1
    if (supportedFileMap['3d'].types.indexOf(type) > -1) return '3d';
    if (supportedFileMap['image'].types.indexOf('image/' + type) > -1) return 'image';
    if (supportedFileMap['audio'].types.indexOf('audio/' + type) > -1) return 'audio';
    if (supportedFileMap['video'].types.indexOf('video/' + type) > -1) return 'video';
};

function isValidFile(type, file, errorId) {
    const supportedFile = supportedFileMap[type];
    const previewError = document.getElementById(errorId)

    if (!type || !isValidFileType(type, file)) {
        previewError.innerHTML = '*所选择文件格式不支持，请重新选择.';
        return false;
    }
    if (!isValidFileSize(type, file)) {
        previewError.innerHTML = `*文件太大！请不要超过${supportedFile.maxSizeText}.`;
        return false;
    }
    if (!isValidFileExt(type, file)) {
        previewError.innerHTML = `*不支持该文件！支持的文件类型有${supportedFile.types.join(', ')}.`;
        return false;
    }

    previewError.innerHTML = ""
    return true
};

/** Checks whether file is uploaded and its type exists in the supportedFileMap. */
function isValidFileType(type, file) {
    const supportedFile = supportedFileMap[type];
    return supportedFile && file;
}

/** Checks whether file size is correct based on its type. */
function isValidFileSize(type, file) {
    const supportedFile = supportedFileMap[type];
    return file.size < supportedFile.maxSize;
}

/** Checks whether file extention is correct based on its type. */
function isValidFileExt(type, file) {
    const supportedFile = supportedFileMap[type];
    const fileType = type === '3d' ? file.name.split('.').slice(-1)[0] : file.type
    return supportedFile.types.includes(fileType)
}

function dataURItoBlob(dataURI) {
    const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const binary = atob(dataURI.split(",")[1]);
    let array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: mime });
}

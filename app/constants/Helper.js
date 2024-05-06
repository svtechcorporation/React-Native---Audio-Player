
 export const removeFileType = (filename) => {
    var lastIndex = filename.lastIndexOf(".");
    var regex = new RegExp("_", 'g');
    if (lastIndex !== -1) {
      return filename.substring(0, lastIndex).replace(regex, ' ');
    } else {
      return filename.replace(regex, ' ');
    }
  }

  
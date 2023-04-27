const getMedia = (media) => {
    if(media) {
      const arrayBuffer = new Uint8Array(media.data.data);
      const blob = new Blob([arrayBuffer], {type: "image/*"});
      const mediaUrl = URL.createObjectURL(blob);
      return mediaUrl;
    }
    return;
}

export default getMedia;
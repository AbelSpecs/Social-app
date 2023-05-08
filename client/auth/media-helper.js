import img from "../assets/images/react.png";

const getMedia = (media, type = true) => {
    if(media) {
      const arrayBuffer = new Uint8Array(media.data?.data);
      const blob = new Blob([arrayBuffer], {type: "image/*"});
      const mediaUrl = URL.createObjectURL(blob);
      return mediaUrl;
    }
    return !type ? img : '';
}

export default getMedia;
import { PosterSize, ProfileSize } from "../utils/api/query/apiQueryBuilder";

export default {
    /**
     * MovieCollection height
     */
    Movie_Collection_Height: 443,

    /**
     * Item width inside MovieCollection
     */
    Movie_Collection_Item_Width: 250,
    Movie_Collection_Image_Ratio: 1.5,
    Movie_Collection_Poster_Size: PosterSize.w500,

    Cast_Collection_Height: 400,
    Cast_Collection_Item_Width: 185,
    Cast_Collection_Image_Ratio: 1.4,
    Cast_Collection_Image_Profile_Size: ProfileSize.w185,
}
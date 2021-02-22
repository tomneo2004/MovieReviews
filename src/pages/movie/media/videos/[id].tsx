import { useRouter } from 'next/router';
import React from 'react';

const VideosPage = ()=>{
    const router = useRouter();
    const {id} = router.query;
}

export default VideosPage;
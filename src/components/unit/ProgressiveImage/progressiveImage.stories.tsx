import { Button, CircularProgress } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React from 'react';
import ProgressiveImage from './ProgressiveImage';

export default {
  title: 'Progressive Image',
};

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate condimentum felis, eu condimentum odio sagittis at. Morbi posuere, enim sagittis ornare elementum, leo lectus auctor nibh, nec imperdiet eros turpis a arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras ornare consectetur mi eget convallis. Sed dapibus euismod ultrices. Aliquam quis dui id metus ullamcorper consectetur a eu ante. Suspendisse mattis, purus non aliquam efficitur, sem nibh cursus nisi, eu eleifend ante nibh a augue. Vestibulum pretium feugiat sapien vel accumsan.

Nam aliquet mollis facilisis. Morbi pretium augue ante, at feugiat elit pulvinar sed. Nulla pharetra placerat ante, ac pretium felis mattis id. Fusce vulputate ullamcorper ex, ac gravida urna sagittis a. Cras eu velit metus. Suspendisse a sagittis tortor. Donec condimentum lacinia dolor sit amet cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et felis a ex gravida blandit. Curabitur viverra augue ligula, eget efficitur velit ultricies non. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ornare nibh eu viverra faucibus. Phasellus vestibulum non turpis vel mollis.

Nullam nunc enim, pulvinar vel sem vitae, faucibus dapibus massa. Cras sed gravida urna, a laoreet felis. In sed aliquet odio. Aenean consequat elit sem, eu pharetra mi finibus vitae. Duis pulvinar eros sed erat ultricies, et ultricies nisl eleifend. Sed eget risus vitae tellus dictum lacinia sed ac dolor. Proin rutrum urna nisi, eu ultricies tortor aliquam quis. Fusce diam sapien, rutrum eget mi non, dictum luctus metus. Nunc bibendum suscipit iaculis. Quisque quis urna nec ante convallis tincidunt. Fusce libero odio, congue at mollis sed, ultrices at arcu. Nullam odio ante, finibus eget porttitor sed, imperdiet id magna. Curabitur sollicitudin in tortor nec faucibus. Etiam malesuada enim ac commodo aliquet.

Quisque lobortis nulla sit amet metus aliquet, vitae aliquet dui interdum. Donec purus diam, viverra non tempor vel, vestibulum et mauris. In non ex non orci feugiat bibendum a sed nisl. Cras auctor dictum sapien at aliquam. Nullam varius quam vitae accumsan elementum. Pellentesque fringilla iaculis tellus. Aenean dictum facilisis tortor, porttitor condimentum felis aliquam et. Vestibulum sit amet placerat lectus. Aenean efficitur ultrices lectus. Nunc feugiat pretium neque nec faucibus. Nullam ut molestie nibh, sit amet interdum augue. Fusce erat nibh, fringilla vitae luctus malesuada, gravida sit amet purus. Nulla eu turpis sed massa cursus consectetur sit amet ut felis. Aenean efficitur est vestibulum tellus porta fermentum.

Nulla eget neque neque. Sed interdum porta nunc, non lobortis ante. Nam in purus porta, fermentum enim in, volutpat massa. Maecenas ante orci, faucibus quis dolor vel, cursus varius dolor. Aliquam eget eros nisl. Praesent euismod lectus ligula. Morbi venenatis blandit turpis, at mollis nulla efficitur eu. Sed varius non tortor at posuere. Suspendisse potenti. Etiam et tempor felis. Maecenas convallis bibendum neque non hendrerit. Nullam maximus, sapien a sagittis euismod, tellus diam tincidunt tortor, nec tristique odio felis eget arcu. Donec interdum erat venenatis, lacinia ipsum id, tristique nisl.`
export const Default = () => {
    return (
        <ProgressiveImage 
        imageSrc='https://image.tmdb.org/t/p/original/htBUhLSS7FfHtydgYxUWjL3J1Q1.jpg'
        >
            <Box>
            {text}
            </Box>
        </ProgressiveImage>
    )
}

const imgSources = [
    {
        preview: 'https://image.tmdb.org/t/p/w300/htBUhLSS7FfHtydgYxUWjL3J1Q1.jpg',
        image: 'https://image.tmdb.org/t/p/original/htBUhLSS7FfHtydgYxUWjL3J1Q1.jpg'
    },
    {
        preview: "https://image.tmdb.org/t/p/w300/3ombg55JQiIpoPnXYb2oYdr6DtP.jpg",
        image: "https://image.tmdb.org/t/p/original/3ombg55JQiIpoPnXYb2oYdr6DtP.jpg",
    },
    {
        preview: "https://image.tmdb.org/t/p/w300//srYya1ZlI97Au4jUYAktDe3avyA.jpg",
        image: "https://image.tmdb.org/t/p/original/srYya1ZlI97Au4jUYAktDe3avyA.jpg",
    }
];
let counter = 0;
export const BackdropColor = () => {
    const [img, setImg] = React.useState(imgSources[0])

    const handleNextImage = ()=>{
        counter += 1;
        setImg(imgSources[counter % imgSources.length])
    }

    return (
        <React.Fragment>
            <ProgressiveImage 
            imageSrc={img.image}
            backdropColor='rgba(255,255,255,0.6)'
            />
            <Box>{text}</Box>
            <Button variant='contained' onClick={handleNextImage}>Next Image</Button>
        </React.Fragment>
    )
}

export const LoadingIndicator = () => {
    const [img, setImg] = React.useState(imgSources[0])

    const handleNextImage = ()=>{
        counter += 1;
        setImg(imgSources[counter % imgSources.length])
    }

    return (
        <React.Fragment>
            <ProgressiveImage 
            imageSrc={img.image}
            backdropColor='rgba(255,255,255,0.6)'
            loadingIndicator={
                <Box position='absolute' right='1%' bottom='5%'>
                    <CircularProgress />
                </Box>
            }
            />
            <Box>{text}</Box>
            <Button variant='contained' onClick={handleNextImage}>Next Image</Button>
        </React.Fragment>
    )
}

export const SlideLeft = () => {
    const [img, setImg] = React.useState(imgSources[0])

    const handleNextImage = ()=>{
        counter += 1;
        setImg(imgSources[counter % imgSources.length])
    }

    return (
        <React.Fragment>
            <ProgressiveImage 
            imageSrc={img.image}
            backdropColor='rgba(255,255,255,0.6)'
            keyframesAnimOut={{
                '0%':{transform:'translate(0%)'},
                '100%':{transform:'translate(-100%)'}
            }}
            animOutTimeFun='ease'
            keyframesAnimIn={{
                '0%':{transform:'translate(100%)'},
                '100%':{transform:'translate(0%)'}
            }}
            animInTimeFun='ease'
            />
            <Box>{text}</Box>
            <Button variant='contained' onClick={handleNextImage}>Next Image</Button>
        </React.Fragment>
    )
}

export const SlideDown = () => {
    const [img, setImg] = React.useState(imgSources[0])

    const handleNextImage = ()=>{
        counter += 1;
        setImg(imgSources[counter % imgSources.length])
    }

    return (
        <React.Fragment>
            <ProgressiveImage 
            imageSrc={img.image}
            backdropColor='rgba(255,255,255,0.6)'
            keyframesAnimOut={{
                '0%':{transform:'translateY(0%)'},
                '100%':{transform:'translateY(100%)'}
            }}
            animOutTimeFun='ease'
            keyframesAnimIn={{
                '0%':{transform:'translateY(-100%)'},
                '100%':{transform:'translateY(0%)'}
            }}
            animInTimeFun='ease'
            />
            <Box>{text}</Box>
            <Button variant='contained' onClick={handleNextImage}>Next Image</Button>
        </React.Fragment>
    )
}

export const Scale = () => {
    const [img, setImg] = React.useState(imgSources[0])

    const handleNextImage = ()=>{
        counter += 1;
        setImg(imgSources[counter % imgSources.length])
    }

    return (
        <React.Fragment>
            <ProgressiveImage 
            imageSrc={img.image}
            backdropColor='rgba(255,255,255,0.6)'
            keyframesAnimOut={{
                '0%':{transform:'scale(1, 1)', opacity:1},
                '100%':{transform:'scale(0, 0)', opacity:0.15}
            }}
            animOutTimeFun='ease'
            keyframesAnimIn={{
                '0%':{transform:'scale(0.1, 0.1)', opacity:0.15},
                '100%':{transform:'scale(1, 1)', opacity:1}
            }}
            animInTimeFun='ease'
            />
            <Box>{text}</Box>
            <Button variant='contained' onClick={handleNextImage}>Next Image</Button>
        </React.Fragment>
    )
}

export const Flip = () => {
    const [img, setImg] = React.useState(imgSources[0])

    const handleNextImage = ()=>{
        counter += 1;
        setImg(imgSources[counter % imgSources.length])
    }

    return (
        <React.Fragment>
            <ProgressiveImage 
            imageSrc={img.image}
            backdropColor='rgba(255,255,255,0.6)'
            keyframesAnimOut={{
                '0%':{transform:'rotateY(0deg)', opacity:1},
                '100%':{transform:'rotateY(180deg)', opacity:0}
            }}
            animOutTimeFun='ease'
            keyframesAnimIn={{
                '0%':{transform:'rotateY(180deg)', opacity:0},
                '100%':{transform:'rotateY(0deg)', opacity:1}
            }}
            animInTimeFun='ease'
            />
                
            <Box>{text}</Box>
            <Button variant='contained' onClick={handleNextImage}>Next Image</Button>
        </React.Fragment>
    )
}
import React from 'react';
import ReviewCard from './reviewCard';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

export default {
  title: 'ReviewCard',
};

const longReview = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget orci vitae leo feugiat vestibulum. Aenean non tortor laoreet, maximus nunc eget, aliquam tellus. Mauris tempor felis non lorem volutpat, vel auctor metus commodo. Nulla facilisi. Duis efficitur nulla eget dapibus tempor. Proin volutpat consectetur velit sit amet maximus. Nulla facilisi. Sed eget nisl metus. Maecenas vehicula nibh libero, ac semper velit scelerisque id. Praesent nisi elit, vulputate a congue id, ultricies vitae dui.

Curabitur condimentum ex ac urna ullamcorper dapibus ut in purus. Praesent eget ligula quis odio blandit porta eget consequat ipsum. Nam vitae consequat orci, nec tincidunt odio. Praesent fermentum maximus cursus. Nunc semper porttitor mauris nec ultricies. Vestibulum felis ex, euismod et massa sed, imperdiet convallis metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec pharetra, quam at tincidunt faucibus, erat ligula volutpat velit, sit amet tincidunt arcu magna quis est. Donec fringilla cursus blandit. Nullam mi quam, sagittis in lobortis eget, auctor laoreet augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec a commodo odio, id efficitur magna.

Pellentesque malesuada justo ante, ut lacinia massa viverra vitae. Curabitur placerat malesuada nulla, ac sodales ipsum pretium non. Fusce ac luctus magna. Suspendisse facilisis, velit eget pharetra consectetur, nunc erat egestas velit, a laoreet velit risus nec turpis. Donec vitae dignissim metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum efficitur, dui at congue congue, arcu enim interdum augue, quis ultrices odio tortor non nisl. Nullam dolor ex, interdum nec sem a, pellentesque sollicitudin sapien. Suspendisse gravida ultricies mi. Praesent aliquam mi ante, sit amet porta massa viverra at. Donec mollis dapibus odio, sed mollis quam tempus rhoncus. In tincidunt velit in rhoncus dictum.

Maecenas ullamcorper neque ut condimentum aliquet. Vivamus sit amet vestibulum ex. Phasellus ac sagittis lacus, et faucibus quam. Duis commodo odio a massa lacinia ornare. Proin nec porttitor nisi. Nunc turpis augue, finibus cursus rhoncus in, ultricies quis nunc. Aenean aliquam sodales mi nec facilisis. Quisque eu vestibulum ligula. Ut suscipit lectus turpis, non porta augue feugiat ac. Pellentesque vitae ipsum sit amet diam egestas fermentum non vitae magna. Quisque vel lacus a mauris aliquam fermentum vitae at urna. Mauris sapien elit, venenatis eu est nec, pellentesque iaculis ante. Mauris vel suscipit sem. Pellentesque a tincidunt sapien, et porta nunc.

Praesent nisl nisi, interdum vitae ultricies non, euismod eget tortor. Proin mollis quam ut ex vehicula pellentesque. Nunc facilisis vehicula velit, quis ultrices metus lobortis eget. Aliquam quis consectetur tortor. Mauris ac laoreet tellus. Nunc maximus tempus felis nec ornare. Etiam at fringilla metus. Nulla placerat facilisis ipsum id sodales. Praesent commodo, quam eget ultricies congue, velit elit egestas mi, quis sagittis quam augue sed neque. Ut eget quam massa. Nullam at augue ac nunc suscipit rhoncus. Cras et sapien felis. Etiam faucibus, eros vel tempus tincidunt, dolor est lacinia urna, id tempor libero urna nec eros. Sed ac ultrices tortor. Proin quis tincidunt arcu, non commodo dui.

Donec et interdum lacus. Pellentesque tortor sem, convallis ac magna nec, interdum feugiat ante. Praesent eleifend, massa nec ullamcorper tristique, sapien libero ullamcorper ante, a malesuada leo ante maximus erat. Integer porttitor arcu non mi dictum tempus consectetur vitae sapien. Vivamus laoreet blandit lacus. Duis semper nec diam sit amet bibendum. Curabitur vitae ex massa. Etiam congue nibh non lorem vestibulum convallis. Nam vel metus tincidunt, feugiat purus in, vehicula lectus. Pellentesque sit amet enim in orci maximus aliquet aliquet id purus.

Etiam egestas, diam sit amet pharetra eleifend, lorem sem maximus lorem, eu venenatis lorem orci at neque. Maecenas mattis ut odio eu auctor. Phasellus facilisis venenatis mollis. Morbi laoreet vitae metus quis lobortis. Ut blandit lorem ut quam placerat, non semper mi vehicula. Integer efficitur imperdiet nisi, viverra venenatis ante consequat eget. Etiam vehicula ultricies risus, nec faucibus urna semper id. Vestibulum euismod vulputate tortor, in venenatis elit aliquam a. Duis lobortis ex mauris. Donec eget tortor commodo, sagittis felis in, porta velit.

Proin ultrices gravida tortor non consectetur. Etiam tincidunt, odio et maximus ullamcorper, nisl nisl consequat turpis, vel ullamcorper libero lacus vestibulum purus. Suspendisse dignissim consequat elit ac malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut pretium urna felis, eget tincidunt odio blandit ac. Phasellus sed luctus nisl. Sed sodales interdum ipsum sit amet tempor. Mauris sit amet lacinia odio. Aenean dui enim, convallis ac mattis vel, aliquam viverra augue.

Nam at malesuada leo. Nam at nibh rutrum, iaculis felis sed, ornare eros. Morbi eros massa, ultricies ut erat a, elementum tincidunt sapien. Sed id dolor et augue tristique fringilla at id neque. Praesent mollis ultrices pulvinar. Fusce sodales odio sed tellus ultrices vulputate. Duis luctus, tellus vel posuere hendrerit, eros purus rhoncus elit, in finibus massa elit sit amet nulla. Ut eu ultrices libero. Etiam tristique quam nisl, commodo sagittis sapien viverra id. Donec id aliquam ipsum, in fermentum risus.

Duis viverra orci vitae velit facilisis, vel laoreet mauris viverra. Fusce pretium malesuada auctor. Suspendisse nibh metus, commodo et tellus sit amet, luctus imperdiet tortor. Ut at elit ac tellus iaculis molestie vel id nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed sit amet dapibus augue. Nunc dictum elit risus, sit amet commodo magna sodales et. Mauris ultrices, lacus sed tristique dignissim, lectus diam semper massa, hendrerit luctus arcu risus vitae massa. Vivamus arcu sapien, ultrices nec lorem eget, vehicula viverra felis.

Proin varius rhoncus tortor sed gravida. Quisque lectus ante, efficitur ut commodo eu, convallis in dolor. Vivamus aliquet nibh et enim posuere pulvinar. Nullam nec rhoncus enim. Maecenas faucibus venenatis urna, ut rhoncus dolor. Nullam bibendum dignissim libero, ac efficitur libero commodo sed. Pellentesque ac ultrices tortor, quis finibus libero. Praesent diam metus, placerat id condimentum vitae, gravida vitae dolor. Maecenas lacus odio, semper ut aliquam ut, imperdiet ut nisl. In ac condimentum neque. Maecenas molestie laoreet lectus ut vestibulum. Nulla a dolor velit. In interdum orci.
`
const mediumReview = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget orci vitae leo feugiat vestibulum. Aenean non tortor laoreet, maximus nunc eget, aliquam tellus. Mauris tempor felis non lorem volutpat, vel auctor metus commodo. Nulla facilisi. Duis efficitur nulla eget dapibus tempor. Proin volutpat consectetur velit sit amet maximus. Nulla facilisi. Sed eget nisl metus. Maecenas vehicula nibh libero, ac semper velit scelerisque id. Praesent nisi elit, vulputate a congue id, ultricies vitae dui.

Curabitur condimentum ex ac urna ullamcorper dapibus ut in purus. Praesent eget ligula quis odio blandit porta eget consequat ipsum. Nam vitae consequat orci, nec tincidunt odio. Praesent fermentum maximus cursus. Nunc semper porttitor mauris nec ultricies. Vestibulum felis ex, euismod et massa sed, imperdiet convallis metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec pharetra, quam at tincidunt faucibus, erat ligula volutpat velit, sit amet tincidunt arcu magna quis est. Donec fringilla cursus blandit. Nullam mi quam, sagittis in lobortis eget, auctor laoreet augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec a commodo odio, id efficitur magna.
`
const shortReview = `Excellent`

export const LongReview = () => {
    return (
        <ReviewCard
        authorName='Jennifier Claudy'
        createdAt='2012-Jan-14'
        paragraph={longReview}
        rating={5}
        ratingMax={10}
        />
    )
}

export const MediumReview = () => {
    return (
        <ReviewCard
        authorName='Jennifier Claudy'
        createdAt='2012-Jan-14'
        paragraph={mediumReview}
        rating={5}
        ratingMax={10}
        />
    )
}

export const ShortReview = () => {
    return (
        <ReviewCard
        authorName='Jennifier Claudy'
        createdAt='2012-Jan-14'
        paragraph={shortReview}
        rating={5}
        ratingMax={10}
        />
    )
}

export const Subheader = () => {
    return (
        <ReviewCard
        authorName='Jennifier Claudy'
        createdAt={
            <Box display='flex' flexDirection='row'>
                <Typography variant='body1'>
                    <Box mr={1}>Created at</Box>
                </Typography>
                <Typography variant='body1'>
                    <Box fontWeight='800'>2020-Feb-09</Box>
                </Typography>
            </Box>
        }
        paragraph={longReview}
        rating={5}
        ratingMax={10}
        />
    )
}
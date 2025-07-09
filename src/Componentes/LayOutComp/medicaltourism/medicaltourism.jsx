import React from 'react'
import TourSlider from './slider/slider'
import Tourp from './paragraph/paragraph';
import Tourcards from './cards/cards';
import Features from './features/features';
import Adver from './Adver/Adver';
import Footer from '../../Ui/Footer/Footer';
import Name from './name/name';
function MedicalTourism(){
    return(
        <>
           <TourSlider/>
           <Tourp/>
           <Tourcards/>
           <Adver/>
           <Features/>
           <Footer/>
           <Name/>
        </>
    )
}

export default MedicalTourism;
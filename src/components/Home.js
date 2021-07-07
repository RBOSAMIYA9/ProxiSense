import React from 'react'
import {

    Box,
    
} from '@chakra-ui/react';


import Header from '../components/landingPage/Header'
import HeroSection from '../components/landingPage/HeroSection'
import Benifits from '../components/landingPage/Benifits'
import HowItWorks from '../components/landingPage/HowItWorks'
import UseCases from '../components/landingPage/UseCases'
import WorkingVideo from '../components/landingPage/WorkingVideo'
import Footer from '../components/landingPage/Footer'

function Home() {
    return (
        <>
            <Box textAlign="center" fontSize="xl">
                <Header />
                <HeroSection />
                <Benifits />
                <HowItWorks />
                <UseCases />
                <WorkingVideo />
                <Footer />
            </Box>
        </>
    )
}

export default Home

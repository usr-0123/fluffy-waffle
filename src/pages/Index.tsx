import Hero from '../components/Hero';
import Services from '../components/Services';
import Partnership from '../components/Partnership';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

const Index = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <Services />
            <Partnership />
            <Gallery />
            <Footer />
        </div>
    );
};

export default Index;

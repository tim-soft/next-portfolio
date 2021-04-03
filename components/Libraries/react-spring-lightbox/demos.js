import ImageGallery from './ImageGallery';
import LightboxFooter from './LightboxFooter';
import LightboxHeader from '../../Blog/BlogImageGallery/components/LightboxHeader';
import LightboxArrowButton from '../../Blog/BlogImageGallery/components/LightboxArrowButton';
import LightboxImageOverlay from './LightboxImageOverlay';

const images = [
    {
        src: 'https://i.imgur.com/8oNzu0S.png',
        alt: 'README.md',
        caption: 'README.md',
        width: 2486,
        height: 1469,
    },
    {
        src:
            'https://timellenberger.com/static/blog-content/dark-mode/win10-dark-mode.jpg',
        alt: 'Windows 10 Dark Mode Setting',
        caption: 'Windows 10 Dark Mode Setting',
        width: 2848,
        height: 2035,
    },
    {
        src:
            'https://timellenberger.com/static/blog-content/dark-mode/macos-dark-mode.png',
        alt: 'macOS Mojave Dark Mode Setting',
        caption: 'macOS Mojave Dark Mode Setting',
        width: 1200,
        height: 1218,
    },
    {
        src:
            'https://timellenberger.com/static/blog-content/dark-mode/android-9-dark-mode.jpg',
        alt: 'Android 9.0 Dark Mode Setting',
        caption: 'Android 9.0 Dark Mode Setting',
        width: 1280,
        height: 600,
    },
];

export const LightboxDemoNoUI = () => <ImageGallery images={images} />;

export const LightboxDemoAllControls = () => (
    <ImageGallery
        galleryTitle="Fixed header, absolutely positioned footer and left/right buttons"
        LightboxHeader={LightboxHeader}
        LightboxFooter={LightboxFooter}
        LightboxArrowButton={LightboxArrowButton}
        LightboxImageOverlay={LightboxImageOverlay}
        images={images}
    />
);

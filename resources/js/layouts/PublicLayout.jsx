import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PublicLayout({ children, title, description, settings: directSettings }) {
    const { props } = usePage();
    const settings = directSettings || props.settings || {};

    const metaTitle = title || settings.seo_title || settings.site_name || 'Allied Energies';
    const metaDescription = description || settings.seo_description || settings.site_description;

    return (
        <>
            <Head>
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                {settings.seo_keywords && <meta name="keywords" content={settings.seo_keywords} />}
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer settings={settings} />
            <ToastContainer position="bottom-right" theme="colored" />
        </>
    );
}

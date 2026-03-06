import { Head } from '@inertiajs/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PublicLayout({ children, title, description, settings = {} }) {
    return (
        <>
            <Head>
                {title && <title>{title}</title>}
                {description && <meta name="description" content={description} />}
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer settings={settings} />
            <ToastContainer position="bottom-right" theme="colored" />
        </>
    );
}

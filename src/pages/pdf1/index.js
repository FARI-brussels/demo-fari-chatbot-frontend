import styles from './pdf.module.css';
import Loading from '../../../components/Loading/loading';
import { useEffect, useState } from 'react';
import { fetchData, fetchGenerativeAi } from '../../../api/axios';
import ChatInterface from '../chatbotpdf1';

function Pdf1({ languages }) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [translatedData, setTranslatedData] = useState(null);
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const response = await fetchData(languages);
            setResponseData(response.data);
            const translationData = await fetchGenerativeAi(languages);
            setTranslatedData(translationData.data);
        };
        fetchDataAndUpdateState();
    }, [languages]);

    return (
        <>
            {loading ? (<Loading />) : (
                <div className={styles.container}>
                    <h3 className={styles.stepHeader}>
                        {translatedData && translatedData.attributes.step3_title}
                    </h3>
                    <p className={styles.stepParagraph}>
                        {translatedData && translatedData.attributes.step3_description}
                    </p>
                    <div className={styles.gridContainer}>
                        <div className={styles.gridItem}>
                            <p className={styles.inputHeader}>This is the pdf you selected</p>
                            <iframe className={styles.selectedImage} src={translatedData && translatedData.attributes.pdf.pdfs[0].url}/>
                        </div>
                        <div className={styles.gridItem}>
                            <p className={styles.inputHeader}>Ask any question about this pdf</p>
                            <ChatInterface languages={languages}/>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Pdf1;
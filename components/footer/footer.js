import styles from './footer.module.css';
import Image from 'next/image';
import cls from 'classnames';
import { useRouter } from 'next/router';
import { fetchInterfaceComponent } from '../../api/axios';
import { useContext, useEffect, useState } from 'react';
import { InputTypeContext } from '../../context/InputTypeContext';
import { OutputTypeContext } from '../../context/OutputTypeContext';
import { GlobalInputContext } from '../../context/GlobalInputContext';
import { PredictionContext } from '../../context/PredictionContext';
import { VersionContext } from '../../context/VersionContext';
import { LinkContext } from '../../context/LinkContext';


const Footer = ({ setNextPageHref, handleNextStep, handleTryAgain, disabled, onSubmit, languages }) => {
    const { setSelectedInputType } = useContext(InputTypeContext);
    const { setSelectedOutputType } = useContext(OutputTypeContext);
    const { setGlobalInput } = useContext(GlobalInputContext);
    const { prediction, setPrediction } = useContext(PredictionContext);
    const { setSelectedVersion } = useContext(VersionContext);
    const { setLinkSource } = useContext(LinkContext);
    const [translation, setTranslation] = useState(null);
    const router = useRouter();

    const handleButtonClick = (e) => {
        handleNextStep();
        e.preventDefault();
        if (router.pathname === '/image-page'
            || router.pathname === '/pdf-page') {
            onSubmit();
        }
    };

    const handlePreviousStep = async () => {
        if (router.pathname === '/output') {
            setSelectedInputType(null);
            setSelectedOutputType(null);
            setNextPageHref(null);
        }
        else if
            (router.pathname === '/image-page' || router.pathname === '/pdf-page') {
            setSelectedOutputType(null);
            setGlobalInput({});
            //cancelPrediction(cancelUrl);
        } else if (router.pathname === '/result') {
            setPrediction(null);
            setGlobalInput({});
            setLinkSource('');
        }
        router.back(); // Navigate to the previous page
    };

    const handleTryAgainClick = (e) => {
        handleTryAgain(); // Call the function to handle "Try Again" action
        e.preventDefault();
        router.reload();
    };

    useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            const translatedData = await fetchInterfaceComponent(languages);
            setTranslation(translatedData);
        };
        fetchDataAndUpdateState();
    }, [languages]);

    const shouldDisplayTryAgainButton = [].includes(router.pathname);
    disabled= true

    const resultPaths = ['/chat', '/pdf1', '/pdf2','/pdf3','/pdf4','/building','/headphone','/tortoise','/color'];
    const isResultPage = resultPaths.includes(router.pathname);
    return (
        <footer className={styles.footer} >
            <div className={styles.container}>
            <div className={styles.btnWrapper} style={{position: "absolute", top: "0px", left: "40px"}}>
                <button
                    onClick={handlePreviousStep}
                    className={styles.previousBtn}>
                    <Image className={styles.icon} src="/static/arrow-left-light.svg" alt="arrow" width={24} height={24} />
                    {translation && translation.data.attributes.previous}
                </button>
                </div>

             {isResultPage ? null : (
            <div className={styles.btnWrapper}>
                    <button
                        disabled={false}
                        onClick={handleButtonClick}
                        className={cls(styles.nextStepBtn)}>
                        {translation && translation.data.attributes.next}
                    </button>
                    
                </div>
            )}
            
            </div>
        </footer>
    )
}

export default Footer; 
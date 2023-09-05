import styles from '../imageTextCard/ImageTextCard.module.css';
import cls from 'classnames';
import Image from 'next/image';


export default function TextCard({ handleSelectedInput, selectedInputType, handlePathValueClick, title, description }) {

    return (
        <div onClick={handleSelectedInput} className={styles.container} >
            <div onClick={handlePathValueClick} className={cls(styles.iconContainer, { [styles.selected]: selectedInputType })}>
                
                    <h3 className={styles.exampleParagraph}>{title}</h3>
                    <p className={styles.exampleText}>{description}</p>
                
                <div className={styles.secondColorDiv}>
                    <Image
                        priority={true}
                        className={styles.image}
                        src="/static/pdf.svg"
                        alt="Fox in the show" width={320} height={149} />
                </div>
            </div>
        </div>
    )
}


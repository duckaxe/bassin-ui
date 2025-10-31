import './Footer.scss';
import Logo from '../images/logo.svg';
import { BASSIN_STRATUM_PORT, POLL_INTERVAL_SECONDS } from '../helpers/constants';

interface TimerProps {
    timer: number;
}

export default function Footer({ timer }: TimerProps) {
    const progress = Math.max(0, 100 - (timer / POLL_INTERVAL_SECONDS) * 100);
    const progressStyle = { width: `${progress.toFixed(2)}%` };

    return (
        <footer className="footer">
            <div className="progress" style={progressStyle} />

            <div className="wrapper">
                <figure>
                    <img src={Logo} width={48} height={48} alt="BASSIN Logo" />
                    <figcaption className="font-monospace">BASSIN</figcaption>
                </figure>

                <span>
                    {`${window.location.hostname}:${BASSIN_STRATUM_PORT}`}
                </span>
            </div>
        </footer>
    );
}

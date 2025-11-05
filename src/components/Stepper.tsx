import './Stepper.scss';
import { BASSIN_STRATUM_PORT } from '../helpers/constants';

interface StepperProps {
    step: number;
}

export default function Stepper({ step }: StepperProps) {
    return (
        <div className='stepper' data-step={step}>
            <ul className="steps">
                <li>
                    <span>Node</span>
                    <hr />
                </li>
                <li>
                    <span>Miner</span>
                </li>
            </ul>

            <ul className="panel">
                <li>
                    <h3 className='font-barlow'>Connecting Node ...</h3>
                    <p>
                        Ensure that your Bitcoin Node is running and fully synced.
                    </p>
                </li>
                <li>
                    <h3 className='font-barlow'>Awaiting Shares ...</h3>
                    <table>
						<tbody>
							<tr>
								<td>Host</td>
								<td><code>{`${window.location.hostname}:${BASSIN_STRATUM_PORT}`}</code></td>
							</tr>
							<tr>
								<td>Username</td>
								<td><code>&lt;btcaddress&gt;.&lt;worker&gt;</code></td>
							</tr>
							<tr>
								<td>Password</td>
								<td><code>x</code></td>
							</tr>
						</tbody>
					</table>
                </li>
            </ul>
        </div>
    );
};
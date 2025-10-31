import './Message.scss';

interface MessageProps {
    msg: string,
    severity?: 'warn' | 'error';
    children?: React.ReactNode;
}

export default function Message({ msg, severity, children }: MessageProps) {
    return (
        <div className='message'>
            <strong className={severity}>{msg}</strong>
            {children && children}
        </div>
    );
};
import HRnetLogo from '@/assets/logo.png'
export function Logo() {
    return (
        <>
            <img
                src={HRnetLogo}
                alt="Wealth Health logo"
                width={40}
                height={40}
            />
            <span className="text-xl font-bold text-slate-900">
                HRnet{' '}
                <small className="font-normal text-slate-500">
                    by Wealth Health
                </small>
            </span>
        </>
    )
}

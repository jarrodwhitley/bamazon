import NotFound from '../assets/images/four-oh-four.webp';

export default function PageNotFound() {
    return (
        <div className={'four-oh-four flex gap-4'}>
            <h1 className={'text-white font-black text-6xl'}>NOTHING TO SEE HERE</h1>
            <h2 className={'text-white font-black text-8xl'}>Everything is <span className={'underline'}>FINE</span></h2>
            <div className={'text-white font-black text-3xl'}>Just click on something else now...</div>
            <div className={'text-white font-black text-2xl'}>(404)</div>
        </div>
    )
}
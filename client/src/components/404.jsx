import NotFound from '../assets/images/four-oh-four.webp';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div className={'four-oh-four flex gap-4'}>
            <div className={'w-full flex flex-col items-center absolute top-1/2 lg:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'}>
                <h1 className={'text-white font-black text-2xl lg:text-6xl'}>NOTHING TO SEE HERE</h1>
                <h2 className={'text-white font-black text-4xl lg:text-8xl'}>Everything is <span className={'underline'}>FINE</span>
                </h2>
                <div className={'text-white font-black text-xl lg:text-3xl mt-2'}>Maybe just head back
                    <Link to={'/'} className={'underline text-white hover:text-blue-500 ml-2'}>home?</Link>
                </div>
                <div className={'text-white font-black text-2xl'}>(404)</div>
            </div>
        </div>
    )
}
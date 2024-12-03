import { useIsFiltering} from "./ContextProvider.jsx";

export default function Footer() {
    const isFiltering = useIsFiltering();
    return (
        <>
            { !isFiltering && (
                <footer className="h-[500px] bg-blue-950 mt-6 text-white">
                    <div className="footer-content">
                        <div className="footer-logo">
                            <span className="text-3xl font-bold">Bamazon</span>
                        </div>
                        <div className="footer-links">
                            <a href="#">Home</a>
                            <a href="#">About</a>
                            <a href="#">Contact</a>
                        </div>
                    </div>
                </footer>
            )}
        </>
    );
}
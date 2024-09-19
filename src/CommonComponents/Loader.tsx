// components/Loader.js
const Loader = () => (
    <div className="loader" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        fontSize: '24px',
        fontWeight: 'bold',
        zIndex: 1000 // Ensure the loader is above other content
    }}>
        Loading...
    </div>
);

export default Loader;


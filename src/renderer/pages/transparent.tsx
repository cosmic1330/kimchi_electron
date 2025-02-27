
export default function Transparent() {
    const handleClose = () => {
        window.electron.transparentWindow.close();
    }
    return (
        <div >
            <h1>透明視窗</h1>
            <p>透明視窗</p>
            <button onClick={handleClose} onMouseEnter={() => {
            window.electron.transparentWindow.disable();
        }} 
        onMouseLeave={() => {
            window.electron.transparentWindow.enable();

        }}>關閉1</button>
        </div>
    );
}
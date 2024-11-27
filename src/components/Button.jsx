export default function Button({ children, action, type }) {
    return (
        <button
            className="btn btn-primary"
            onClick={action}
            type={type}
        >
            {children}
        </button>
    );
}

import { useEffect, useState } from "react";

const AlertSuccess = ({ message, onClose }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowAlert(false);
      onClose(); // Callback to perform any additional actions when the alert is closed
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <>
      {showAlert && (
        <div
          role="alert"
          className="rounded-xl border border-gray-100 bg-white p-4"
        >
          <div
            role="alert"
            className="rounded-xl border border-gray-100 bg-white p-4"
          >
            <div className="flex items-start gap-4">
              <span className="text-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>

              <div className="flex-1">
                <strong className="block font-medium text-success">
                  Changes saved
                </strong>

                <p className="mt-1 text-sm text-success">{message}</p>
              </div>

              <button className="text-gray-500 transition hover:text-gray-600">
                <span className="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          ;
        </div>
      )}
    </>
  );
};

export default AlertSuccess;

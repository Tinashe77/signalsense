// src/components/Error.jsx
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function Error({ message, fullScreen = false }) {
  const baseClasses = "rounded-md bg-red-50 p-4";
  const classes = fullScreen ? `${baseClasses} m-4` : baseClasses;

  return (
    <div className={classes}>
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
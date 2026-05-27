export default function BlockedPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
        <div className="max-w-lg text-center space-y-4">
          <h1 className="text-4xl font-bold text-red-500">
            Account Inactive
          </h1>
  
          <p className="text-lg text-gray-300">
            Your account has been temporarily disabled.
          </p>
  
          <p className="text-sm text-gray-500">
            Please contact support or administration for more information.
          </p>
        </div>
      </div>
    );
  }
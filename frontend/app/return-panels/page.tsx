import { CheckCircle } from "lucide-react";

export default function ReturnPanelsPage() {
    return (
        <div className="flex justify-center min-h-screen bg-gray-100 shadow-lg md:py-12">
            <div className="w-full md:max-w-md bg-white md:shadow-lg md:rounded-lg min-h-full">
                <div className={`p-4 rounded-lg bg-green-50  m-4`}>
                    <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />

                        <div>
                            <h2 className={`text-lg font-semibold text-green-700`}>
                                {"You're all set! Thank you for your service."}
                            </h2>
                            <p className="text-sm text-green-600">
                                Please return all panels that were not installed. You can do this by contacting your supervisor or the support team. <br /> <br />
                                You can close this page now.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
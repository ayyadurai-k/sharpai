import React from 'react';
import { Download, Shield, Users } from 'lucide-react';

function WhyChooseSection() {
    return (
        <div className="bg-white mt-2 mb-12">
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why Choose ResumeFlow
                </h2>
                <div className="grid md:grid-cols-3 gap-8 container">
                    {/* Card 1 */}
                    <div className="p-6 border-transparent rounded-3xl hover:bg-blue-50   transition-all text-center ring-1 ring-blue-300 ring-offset-2 hover:ring-transparent">
                        <Download className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Easy Resume Access</h3>
                        <p className="text-gray-600">
                            Download and manage resumes with just a few clicks.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 border-transparent rounded-3xl hover:bg-green-50 hover:ring-transparent transition-all text-center ring-1 ring-green-300 ring-offset-2">
                        <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                        <p className="text-gray-600">
                            Your data is protected with enterprise-grade security.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 border-transparent rounded-3xl hover:bg-yellow-50  hover:ring-transparent  transition-all text-center ring-1 ring-yellow-300 ring-offset-2 bg-white">
                        <Users className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                        <p className="text-gray-600">
                            Work together seamlessly with your recruitment team.
                        </p>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default WhyChooseSection;

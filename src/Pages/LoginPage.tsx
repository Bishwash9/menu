import React from 'react';
import { LoginForm } from '../Features/Auth/Components/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Branding Section */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#002366] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#002366]/20">
                        <span className="text-2xl font-bold text-[#D4AF37]">M</span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-[#002366]">Welcome Back</h1>
                    <p className="text-slate-500 mt-2 font-medium">Please enter your details to sign in</p>
                </div>

                {/* Form Card */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
                    <LoginForm />
                    
                </div>
                
            </div>
        </div>
    );
};

export default LoginPage;
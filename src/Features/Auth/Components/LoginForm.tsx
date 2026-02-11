import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, ArrowRight, Link } from 'lucide-react';

export const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({ phone: '', password: '' });
    const [errors, setErrors] = useState({ phone: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors = { phone: '', password: '' };
        let isValid = true;

        // Phone: Must be numeric and 10 digits (adjust length as needed)
        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
            isValid = false;
        }

        // Password: Minimum 6 characters
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Logging in with:', formData);
            // Handle login logic here
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number Field */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">
                    Phone Number
                </label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="tel"
                        placeholder="98XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all ${
                            errors.phone ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-[#002366] focus:ring-4 focus:ring-[#002366]/10'
                        }`}
                    />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.phone}</p>}
            </div>

            {/* Password Field */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`w-full pl-10 pr-12 py-3 bg-slate-50 border rounded-xl outline-none transition-all ${
                            errors.password ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-[#002366] focus:ring-4 focus:ring-[#002366]/10'
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#002366] transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <Link to="/dashboard">
                <button
                type="submit"
                className="w-full bg-[#002366] text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover shadow-lg shadow-[#002366]/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
                Login to Dashboard
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
            
        </form>
    );
};
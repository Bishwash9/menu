import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../Services/authService';
import { useAuth } from '../../../Context/AuthContext';
import type { Role } from '../../../Lib/roles';

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ phone: '', password: '' });
    const [errors, setErrors] = useState({ phone: '', password: '', general: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { setRole, setUser } = useAuth();

    const validate = () => {
        const newErrors = { phone: '', password: '', general: '' };
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

        if (isValid) {
            console.log(' Validation passed');
        } else {
            console.log(' Validation failed:', newErrors);
        }
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(' Login form submitted');
        if (validate()) {
            setErrors({ phone: '', password: '', general: '' });
            setIsSubmitting(true);
            try {
                const response = await authService.login(formData.phone, formData.password);
                let UserRole : Role;

                //case 1 for business login 
                if(response.business && response.business.length > 0){
                    const mainBusiness = response.business[0];
                    UserRole = mainBusiness.role.toLowerCase() as Role;

                    setUser({
                        name: mainBusiness.business_name,
                        email: mainBusiness.email || '',
                        role: mainBusiness.role,
                        username: mainBusiness.username || '',
                        business_id: mainBusiness.business_id,
                        business_type: mainBusiness.business_type
                    });
               
                }else if(response.staff){
                    const staff = response.staff;
                    
                    let mappedRole: Role = 'staff'; //default
                    const backendRole = staff.role.toLowerCase();

                    if(backendRole === 'housekeeper' || backendRole === 'housekeeping'){
                        mappedRole = 'housekeeper';
                    }else if(backendRole === 'staff'){
                        mappedRole = 'staff';
                    }

                    UserRole = mappedRole

                    setUser({
                        name: staff.name,
                        email: '', // Staff typically don't log in with email
                        role: staff.role,
                        username: '',
                        business_id: staff.business_id,
                        business_type: '' // Staff might not have this, or backend needs to send it
                    });
                }

                else{
                    throw new Error('Login successful but no user data found. Please contact support.');
                }

                setRole(UserRole);

                //navigation switch
                  if(UserRole === 'admin'){
                    navigate('/dashboard');
                  }else if(UserRole === 'staff'){
                    navigate('/dashboard');
                  }else if(UserRole === 'housekeeper'){
                    navigate('/dashboard');
                  }

              
            } catch (error: any) {
                console.error(' Login error:', error);
                setErrors({ ...errors, general: error.message });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* General Error Message */}
            {errors.general && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl animate-in fade-in slide-in-from-top-1">
                    <p className="text-red-700 text-sm font-bold">{errors.general}</p>
                </div>
            )}
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
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all ${errors.phone ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-dashboard-primary focus:ring-4 focus:ring-dashboard-primary/10'
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
                        className={`w-full pl-10 pr-12 py-3 bg-slate-50 border rounded-xl outline-none transition-all ${errors.password ? 'border-red-500 ring-4 ring-red-500/10' : 'border-slate-200 focus:border-dashboard-primary focus:ring-4 focus:ring-dashboard-primary/10'
                            }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-dashboard-accent transition-colors"
                    >
                        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{errors.password}</p>}
            </div>

            {/* Submit Button */}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-dashboard-primary text-white font-bold py-3.5 rounded-xl hover:bg-dashboard-accent cursor-pointer shadow-lg shadow-[#002366]/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
                {isSubmitting ? 'Signing In...' : 'Login to Dashboard'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>


        </form>
    );
};
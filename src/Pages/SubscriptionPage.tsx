import React from 'react';
import { SideBar } from '../Components/Layout/Sidebar';
import { Check, Zap, Star, Rocket } from 'lucide-react';
import { DashboardHeader } from '../Components/Layout';

const SubscriptionPage: React.FC = () => {
  const plans = [
    {
      name: 'Basic Plan',
      price: '1,499',
      icon: <Zap size={24} className="text-slate-600" />,
      features: [
        'Up to 50 orders/day',
        'Basic Sales Reports',
        'Staff Management',
        'Single Device Access',
        'Email Support'
      ],
      color: 'bg-slate-50',
      buttonColor: 'bg-[#1E3A8A]',
      popular: false
    },
    {
      name: 'Normal Plan',
      price: '3,499',
      icon: <Star size={24} className="text-[#D4AF37]" />,
      features: [
        'Unlimited orders',
        'Premium Analytics',
        'Inventory Tracking',
        'Multi-device Sync',
        '24/7 Priority Support',
        'Menu Customization'
      ],
      color: 'bg-white border-2 border-[#D4AF37]/50',
      buttonColor: 'bg-[#D4AF37]',
      popular: true
    },
    {
      name: 'Premium Plan',
      price: '5,999',
      icon: <Rocket size={24} className="text-[#1E3A8A]" />,
      features: [
        'Everything in Normal',
        'Custom Branding',
        'Dedicated Account Manager',
        'API Access',
        'Advanced Security',
        'VIP Feature Requests'
      ],
      color: 'bg-slate-50',
      buttonColor: 'bg-[#1E3A8A]',
      popular: false
    }
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <SideBar />

      <main className="flex-1 overflow-auto">
        {/* Header Space */}
        <div className="h-16 bg-white border-b border-slate-200">
             <DashboardHeader/>
        </div>

        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-[#002366] mb-2 text-wrap">Choose Your Plan</h1>
              <p className="text-slate-600">Grow your business with the right tools</p>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-8 flex flex-col shadow-sm transition-all hover:shadow-md ${plan.color}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#002366]">{plan.name}</h3>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-slate-500">RS</span>
                      <span className="text-4xl font-black text-[#002366]">{plan.price}</span>
                      <span className="text-slate-500">/mo</span>
                    </div>
                  </div>

                  <ul className="mb-10 space-y-4 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-1 p-0.5 bg-green-100 rounded-full">
                          <Check size={12} className="text-green-600" />
                        </div>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3.5 rounded-xl text-white font-bold transition-transform active:scale-95 shadow-lg ${plan.buttonColor}`}
                  >
                    Subscribe Now
                  </button>
                </div>
              ))}
            </div>

            {/* FAQ/Support Section */}
            <div className="mt-16 text-center">
              <p className="text-slate-500 text-sm">
                Questions? <button className="text-[#1E3A8A] font-bold hover:underline">Contact our support team</button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionPage;
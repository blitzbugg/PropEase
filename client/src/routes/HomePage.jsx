import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { currentUser } = useContext(AuthContext);

  const stats = [
    { value: '10,000+', label: 'Properties Listed' },
    { value: '5,000+', label: 'Happy Customers' },
    { value: '50+', label: 'Cities Covered' },
    { value: '24/7', label: 'Customer Support' },
  ];

  const features = [
    {
      title: 'Verified Listings',
      desc: 'Every property is hand-checked by our team before it goes live.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Smart Search',
      desc: 'Filter by price, location and amenities to find your perfect match.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      title: 'Direct Owner Chat',
      desc: 'Message property owners instantly — no middlemen, no brokerage.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 pb-24 sm:pb-28 lg:pb-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury home with pool"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80"></div>
        </div>
        <div className="relative pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-emerald-300 text-xs font-semibold uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                India's trusted property platform
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find Your <span className="text-emerald-400">Dream Home</span> with Ease
              </h1>
              <p className="mt-5 text-lg sm:text-xl leading-8 text-slate-200">
                Propease connects you with the perfect property tailored to your lifestyle and budget.
              </p>
              <div className="mt-10 flex items-center justify-center">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Trusted by homeowners and investors
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-500">
                Join thousands who've found their perfect property through Propease
              </p>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, statIdx) => (
                <div
                  key={statIdx}
                  className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-8 text-center transition-all duration-300 hover:shadow-[0_12px_30px_rgba(16,185,129,0.08)] hover:border-emerald-200"
                >
                  <dd className="order-first text-3xl font-extrabold tracking-tight text-emerald-600">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-sm font-semibold text-slate-500">{stat.label}</dt>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Why choose <span className="text-emerald-600">PropEase?</span>
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-500">
              Everything you need to find the right home, in one place
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-8 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-50">
        <div className="mx-auto max-w-7xl py-20 px-6 sm:py-24 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-16 sm:px-16 sm:py-20 shadow-xl shadow-emerald-600/20">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/10 blur-2xl"></div>
            <div className="relative text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to find your dream home?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-emerald-100">
                Browse verified properties or list your own — our platform makes it effortless.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-4">
                {currentUser ? (
                  <Link
                    to="/list"
                    className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-emerald-700 shadow-lg hover:bg-emerald-50 transition-all duration-200"
                  >
                    Browse Properties
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-emerald-700 shadow-lg hover:bg-emerald-50 transition-all duration-200"
                    >
                      Get Started Free
                    </Link>
                    <Link
                      to="/list"
                      className="rounded-xl border border-white/40 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all duration-200"
                    >
                      Explore Listings
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
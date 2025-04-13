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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Adjusted padding to move content up */}
      <div className="relative overflow-hidden bg-gray-900 pb-24 sm:pb-32 lg:pb-40">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury home with pool"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        {/* Significantly reduced top padding here */}
        <div className="relative pt-24 pb-24 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find Your <span className="text-indigo-400">Dream Home</span> with Ease
              </h1>
              <p className="mt-4 text-xl leading-8 text-indigo-100">
                Propease connects you with the perfect property tailored to your lifestyle and budget.
              </p>
              <div className="mt-8 flex items-center justify-center">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the code remains the same */}
      {/* Stats Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Trusted by homeowners and investors
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Join thousands who've found their perfect property through Propease
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, statIdx) => (
                <div key={statIdx} className="flex flex-col bg-indigo-50 p-8">
                  <dt className="text-sm font-semibold leading-6 text-indigo-600">{stat.label}</dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-indigo-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* CTA Section */}
      <div className="relative bg-indigo-700">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-20"
            src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt=""
          />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to find your dream home?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-200">
              Our expert agents are ready to help you every step of the way.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {currentUser ? (
                <Link
                  to="/list"
                  className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Browse Properties
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="rounded-md bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
import React, { useState } from 'react';
import Filter from '../components/Filter';
import Card from '../components/Card';
import Map from '../components/Map';
import { listData } from '../lib/dummydata';

const ListPage = () => {
  const Data = listData;
  const [filteredProperties, setFilteredProperties] = useState(Data);

  const handleSearch = (filters) => {
    let results = [...Data];

    if (filters.location) {
      results = results.filter((property) =>
        property.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      results = results.filter((property) => property.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      results = results.filter((property) => property.price <= filters.maxPrice);
    }

    if (filters.bedroom && filters.bedroom !== 'Any') {
      const bedroomFilter = filters.bedroom === '4+' ? 4 : parseInt(filters.bedroom);
      if (filters.bedroom === '4+') {
        results = results.filter((property) => property.bedroom >= bedroomFilter);
      } else {
        results = results.filter((property) => property.bedroom === bedroomFilter);
      }
    }

    setFilteredProperties(results);
  };

  return (
    <div className="container my-2 mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <Filter onSearch={handleSearch} />

      <div className="flex flex-col-reverse lg:flex-row mt-6 gap-6">
        <div className="lg:w-1/2 overflow-y-auto" style={{ maxHeight: '80vh' }}>
          {filteredProperties.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-200">
              <p className="text-gray-600 font-medium">
                No properties found. Try tweaking your filters!
              </p>
            </div>
          ) : (
            filteredProperties.map((property) => (
              <Card key={property.id} property={property} />
            ))
          )}
        </div>

        <div className="lg:w-1/2 h-[600px]">
          <Map properties={filteredProperties} />
        </div>
      </div>
    </div>
  );
};

export default ListPage;
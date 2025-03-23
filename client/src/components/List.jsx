import React from 'react';
import Card from './Card';

const List = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-500">No properties found</h3>
          <p className="mt-2 text-gray-400">Add some properties to your list</p>
        </div>
      ) : (
        data.map((property) => (
          <Card key={property.id} property={property} />
        ))
      )}
    </div>
  );
};

export default List;
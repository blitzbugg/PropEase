import React from 'react';
import Card from './Card';

const List = ({ data }) => {
  return (
    <div className="space-y-4">
      {!data || data.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-700">No properties found</h3>
          <p className="mt-1.5 text-slate-400 text-sm">Add some properties to your list</p>
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
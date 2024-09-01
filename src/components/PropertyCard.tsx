import React from 'react';

interface PropertyCardProps {
    property: {
        id: string;
        name: string;
        property_code: string;
        check_in: string;
        check_out: string;
        price: number;
        bedrooms: number;
        nights: number;
        adults: number;
        children: number;
        parking: number;
        pets: number;
    }
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div className="flex">
                <img src="https://via.placeholder.com/150" alt="Property" className="w-32 h-32 rounded-lg"/>
                <div className="ml-4">
                    <h2 className="text-lg font-semibold">{property.name}</h2>
                    <p className="text-sm text-gray-600">Property code: {property.property_code}</p>
                    <p className="text-sm text-gray-600">Check in: {property.check_in}</p>
                    <p className="text-sm text-gray-600">Check out: {property.check_out}</p>
                    <div className="mt-2 flex">
                        <div className="mr-4">
                            <span>Bedrooms: {property.bedrooms}</span>
                        </div>
                        <div className="mr-4">
                            <span>Nights: {property.nights}</span>
                        </div>
                        <div className="mr-4">
                            <span>Adults: {property.adults}</span>
                        </div>
                        <div className="mr-4">
                            <span>Children: {property.children}</span>
                        </div>
                        <div className="mr-4">
                            <span>Parking: {property.parking}</span>
                        </div>
                        <div>
                            <span>Pets: {property.pets}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-lg font-semibold text-blue-600">USD {property.price}</p>
                <button className="mt-2 bg-orange-500 text-white py-2 px-4 rounded">Select</button>
            </div>
        </div>
    );
}

export default PropertyCard;

import React from 'react';
import { BsStarFill } from 'react-icons/bs';

interface RestaurantDetailsProps {
    details: any;
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ details }) => {
    const renderHalfStarRating = () => {
        let starsRating = details.user_rating.aggregate_rating;
        if (starsRating % 1 !== 0) {
            return (
                <BsStarFill
                    className='star-fill p-1 mr-2 rounded-sm'
                    size='20'
                    color='#fff'
                />
            );
        }
    };

    const renderFullStarRating = () => {
        const starsRating = Math.floor(details.user_rating.aggregate_rating);
        return (
            <div className='flex justify-evenly'>
                {Array(starsRating).fill(
                    <BsStarFill
                        className='bg-black p-1 mr-2 rounded-sm'
                        size='20'
                        color='#fff'
                    />
                )}
            </div>
        );
    };

    return (
        <div className='flex justify-between h-screen-50 my-4'>
            <div className='flex items-start flex-col'>
                <h1 className='text-3xl cursor-pointer leading-tight'>
                    {details.name}
                </h1>
                <p className='font-hairline text-gray-700 cursor-pointer'>
                    {details.cuisines}
                </p>
                <p className='hover:text-gray-700 font-hairline text-gray-500 cursor-pointer'>
                    {details.location.locality}
                </p>
                <p className='text-sm flex font-hairline text-gray-600'>
                    {details.timings}
                </p>
            </div>
            <div className='flex items-center flex-col'>
                <div className='flex items-center'>
                    {renderFullStarRating()}
                    {renderHalfStarRating()}
                    <p className='text-lg text-gray-900 ml-1'>
                        {details.user_rating.aggregate_rating}
                    </p>
                </div>
                <p className='text-gray-700 border-b border-dashed border-gray-500 cursor-pointer'>
                    {details.all_reviews_count} Reviews
                </p>
            </div>
        </div>
    );
};

export default RestaurantDetails;

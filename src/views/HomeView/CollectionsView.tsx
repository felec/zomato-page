import React from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';

const CollectionsView: React.SFC = () => {
    return (
        <div>
            <h1 className='flex flex-col justify-center text-3xl'>
                Collections
            </h1>

            <div className='flex items-center justify-between'>
                <h3 className='text-xl'>
                    Explore curated lists of top restaurants, cafes, pubs, and
                    bars in Las Vegas, based on trends
                </h3>
                <div className='flex'>
                    <p className='text-base text-red-600'>
                        All collections in Los Angeles
                    </p>
                    <TiArrowSortedDown
                        className='self-center transform -rotate-90'
                        color='#e8596a'
                        size='1.3rem'
                    />
                </div>
            </div>

            <div className='grid grid-cols-4 col-auto row-auto my-8'>
                <div
                    style={styles.mealImage}
                    className='flex flex-col justify-end rounded-md shadow-inner p-3 cursor-pointer'
                >
                    <h1 className='text-xl text-white'>Trending This Week</h1>
                    <p className='text-white'>30 Places &rarr;</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    mealImage: {
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.05) 85%), url(${require('../../assets/meal.jpg')})`,
        height: '20rem',
        width: '16rem',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
};

export default CollectionsView;

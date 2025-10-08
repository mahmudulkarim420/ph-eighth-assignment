import React from 'react';
import NavBar from '../Components/NavBar';
import { Outlet } from 'react-router-dom'; // এখানে Outet-কে 'react-router-dom' থেকে ইম্পোর্ট করা হয়েছে, আপনার কোডে ঠিক ছিল
import Footer from '../Components/Footer';
// Loading Context এবং Spinner ইম্পোর্ট করা হলো
import { LoadingProvider, useLoading } from '../Context/LoadingContext';
import LoadingSpinner from '../Pages/LoadingSpinner'; 


// নতুন কম্পোনেন্ট: এটি LoadingProvider এর ভেতরে থাকবে
const RootContent = () => {
    // Loading State অ্যাক্সেস করুন
    const { isLoading } = useLoading();
    
    return (
        <div className="min-h-screen flex flex-col">
            {/* নেভিগেশন চেঞ্জের সময় Spinner দেখান */}
            {isLoading && <LoadingSpinner />} 
            
            <NavBar />
    
            <main className="flex-1">
                {/* Outlets (পেজের কন্টেন্ট) লোড হবে */}
                <Outlet />
            </main>
    
            <Footer />
        </div>
    );
}


const Root = () => {
    return (
        // পুরো রুট কম্পোনেন্টটিকে LoadingProvider দিয়ে মুড়ে দিন
        <LoadingProvider>
            <RootContent />
        </LoadingProvider>
    );
};

export default Root;
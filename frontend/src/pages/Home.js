// React / Packages
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import toast from 'react-hot-toast';

// Components
import Layout from "../layouts/Layout";
import Banner from "../components/Banner";
import CardHome from "../components/CardHome";
import { Tabs, StandardDropdown } from "../components/Buttons";
import { Divider } from "../components/Miscellaneous";

// Assets
import { NewspaperIcon, GlobeAltIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import BannerImage from "../assets/home-banner.png";
import Sample1 from "../assets/sample-nuts.jpg";

// API
import { postAll } from "../apis/exportedAPIs";

export default function Home() {
    const [allPosts, setAllPosts] = useState(null);
    const [categoryFilteredPosts, setCategoryFilteredPosts] = useState(null);

    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        async function fetchData() {
            const fetchedData = await postAll({
                organisation: '',
                category: '',
                filter: '',
                sortByPinned: false,
            });

            const json = await fetchedData.json();
            if (fetchedData.ok) {
                setAllPosts(json.posts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
                setCategoryFilteredPosts(json.posts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
            } else {
                toast.error(json.error);
            }
        }

        fetchData();
    }, []);

    function handleCategoryPosts(e) {
        const category = e.target.getAttribute('data-value');

        if (allPosts) {
            const filteredItems = allPosts.filter(item => {
                if (category === "donation") {
                    return item.donation;
                }
                else if (category === "event") {
                    return item.event;
                }
                else if (category === "discussion") {
                    return !item.donation && !item.event;
                }
                return true;
            });
    
            setCategoryFilteredPosts(sortBy === "newest" ? filteredItems.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) : filteredItems.sort((a, b) => b.likes - a.likes));
        }
    }

    function handleSortPosts(e) {
        const sortByValue = e.target.value;
        setSortBy(sortByValue);

        if (sortByValue === "newest") {
            setCategoryFilteredPosts(categoryFilteredPosts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
        }
        else if(sortByValue === "top") {
            setCategoryFilteredPosts(categoryFilteredPosts.sort((a, b) => b.likes - a.likes));
        }
    }

    return (
        <Layout>
            <section className="grid">
                <Banner image={BannerImage} title="Home" />

                <div className="flex flex-row justify-between mt-2">
                    <div className="flex basis-4/5">
                        <Tabs title="Post Types" tabs={['all', 'discussion', 'event', 'donation']} heroIconsArr={[<NewspaperIcon />, <ChatBubbleLeftRightIcon />, <CalendarDaysIcon />, <CurrencyDollarIcon />]}
                            onClick={(e) => handleCategoryPosts(e)} />
                    </div>

                    <div className="basis-1/5">
                        <StandardDropdown title="Sort By" value={sortBy} options={['newest', 'top']} onChange={(e) => handleSortPosts(e)} />
                    </div>
                </div>

                <div className="-mt-2">
                    <Divider padding={0} />
                </div>

                <div className="grid grid-cols-2 max-lg:grid-cols-1 p-2">
                    {categoryFilteredPosts ?
                        (categoryFilteredPosts.map((item) => (
                            <NavLink key={item._id} to={`/organisation/${item.organisation._id}/post/${item._id}`}>
                                <CardHome organisation={{
                                    "id": item._id,
                                    "title": item.title,
                                    "description": item.description,
                                    "category": item.category,
                                    "organisationName": item.organisation.name,
                                    "image": item.organisation.imagePath.poster,
                                }} />
                            </NavLink>
                        ))) : ""
                    }
                </div>
            </section>
        </Layout >
    )
}

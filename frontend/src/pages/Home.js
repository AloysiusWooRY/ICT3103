// React / Packages
import React, { useState, useEffect } from "react";

// Components
import Layout from "../layouts/Layout";
import Banner from "../components/Banner";
import CategoryButton from "../components/CategoryButton";
import CardHome from "../components/CardHome";
import { Tabs } from "../components/Buttons";
import { Divider } from "../components/Miscellaneous";

// Assets
import { SparklesIcon, ArrowUpIcon, GlobeAltIcon, CalendarDaysIcon, ChatBubbleLeftRightIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import BannerImage from "../assets/home-banner.png";
import CategoryAllImage from "../assets/home-cat-all.png";
import CategoryEventImage from "../assets/home-cat-event.png";
import CategoryDiscussionImage from "../assets/home-cat-discussion.png";
import CategoryDonationImage from "../assets/home-cat-donation.png";
import Sample1 from "../assets/sample-nuts.jpg";

// API
import { organisationAll } from "../apis/exportedAPIs";

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState('new');

    useEffect(() => {
        async function fetchData() {
            const fish = await organisationAll({category: 'health'});
            const fishtwo = await fish.json();
            console.log(fishtwo);
          }
          fetchData();
    }, []);

    return (
        <Layout>
            <section className="grid">
                <Banner image={BannerImage} title="Home" />
                <div className="grid grid-cols-4 h-32 my-2 gap-2">
                    <CategoryButton image={CategoryAllImage} title="ALL" icon={GlobeAltIcon} />
                    <CategoryButton image={CategoryEventImage} title="EVENTS" icon={CalendarDaysIcon} />
                    <CategoryButton image={CategoryDiscussionImage} title="DISCUSSIONS" icon={ChatBubbleLeftRightIcon} />
                    <CategoryButton image={CategoryDonationImage} title="DONATIONS" icon={CurrencyDollarIcon} />
                </div>

                <Tabs tabs={['new', 'top']} heroIconsArr={[<SparklesIcon />, <ArrowUpIcon />]}
                    onClick={(e) => setSelectedCategory(e.target.getAttribute('data-value'))} />

                <Divider padding={0} />

                <div className="grid grid-cols-2 max-lg:grid-cols-1 p-2">
                    {
                        [...Array(9)].map((_, index) => (
                            <CardHome key={index} image={Sample1} title="Save deez nutz" organisation="Nut Allergy Foundation" category="Health" />
                        ))
                    }
                </div>
            </section>
        </Layout >
    )
}

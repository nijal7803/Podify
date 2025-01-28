// "use client";
// import PodcastCard from '@/components/PodcastCard'
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import LoaderSpinner from '@/components/LoaderSpinner';

// const Home = () => {
//   const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

//   if(!trendingPodcasts) return <LoaderSpinner />
  
//   return (
//     <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
//       <section className='flex flex-col gap-5'>
//         <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

//         <div className="podcast_grid">
//           {trendingPodcasts?.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
//             <PodcastCard 
//               key={_id}
//               imgUrl={imageUrl as string}
//               title={podcastTitle}
//               description={podcastDescription}
//               podcastId={_id}
//             />
//           ))}
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Home

"use client";
import PodcastCard from '@/components/PodcastCard';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from '@/components/LoaderSpinner';

// Mock hardcoded podcasts
const mockPodcasts = [
  {
    _id: "1",
    podcastTitle: "AI and the Future of Work",
    podcastDescription: "Exploring how AI is reshaping industries and jobs in the modern era.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "2",
    podcastTitle: "Tech Trends 2025",
    podcastDescription: "A deep dive into the upcoming tech trends for the next decade.",
    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1406&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    _id: "3",
    podcastTitle: "Mindfulness and Productivity",
    podcastDescription: "How mindfulness practices can boost your productivity.",
    imageUrl: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Home = () => {
  const trendingPodcasts = useQuery(api.podcasts.getTrendingPodcasts);

  const podcastsToDisplay = trendingPodcasts?.length ? trendingPodcasts : mockPodcasts;

  if (!trendingPodcasts && !mockPodcasts.length) return <LoaderSpinner />;

  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold text-orange-500">Trending Podcasts</h1>

        <div className="podcast-grid">
          {podcastsToDisplay.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
            <div
              key={_id}
              className="podcast-card bg-black text-white p-4 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={imageUrl as string}
                alt={podcastTitle}
                className="rounded-lg w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-bold text-orange-500">{podcastTitle}</h3>
              <p className="text-sm text-gray-300 mt-2">{podcastDescription}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;


import React, { useState, useEffect } from 'react';
import './TravelPackages.css';

function TravelPackages() {
  const experiences = [
    { 
      date: "7 July 2024", 
      duration: "2 days 3 nights", 
      title: "Find the Nature", 
      description: "Discover Kerala's breathtaking nature. Find serenity in lush landscapes and pristine wilderness.",
      imgSrcs: [
        "https://www.swantour.com/blogs/wp-content/uploads/2019/04/Festivals-of-Kerala.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6nRwwajw-OQXSCcraP1eEM9JYEg_CrjniiQ&s",
        "https://www.ramana-maharshi.org/wp-content/uploads/2024/06/Keralas_Karma_The_States_Hindu_Temples_0003.jpg"
      ]
    },
    { 
      date: "3 October 2024", 
      duration: "10 days 9 nights", 
      title: "Jamboo Savari", 
      description: "Immerse in Mysore Dasara celebrations, a stunning showcase of the city’s rich cultural heritage and royal traditions.",
      imgSrcs: [
        "https://bxmysuru.com/wp-content/uploads/2024/08/MYSURU-DASARA-2024.webp",
        "https://www.india-tours.com/images/festivals/mysuru-dasara/mysuru-dasara1.jpg",
        "https://media.assettype.com/outlooktraveller%2Fimport%2Fpublic%2Fuploads%2Ffiles%2F2015%2F04%2F210915144815-msor1.jpg"
      ]
    },
    { 
      date: "17 August 2024", 
      duration: "2 days 1 night", 
      title: "Goa, the party capital of India", 
      description: "As the sun goes down, the coastal state transforms into a pulsating nightlife.The nightlife in Goa is diverse",
      imgSrcs: [
        "https://veeragroup.com/wp-content/uploads/2024/01/Soro-Panjim-900-x-550-px.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1N3zdRbAJiVYP_gPbIe0d1z3bK7PeJAK2VQ&s",
        "https://i0.wp.com/traveldiaryparnashree.com/wp-content/uploads/2021/04/GOA-NIGHLIFE.jpg?resize=1080%2C675&ssl=1"
      ]
    },
    { 
      date: "30 July 2024", 
      duration: "7 days 6 nights", 
      title: "Hidden Gems of Karnataka", 
      description: "Discover Karnataka's best-kept secrets and unveil its hidden gems off the beaten path.",
      imgSrcs: [
        "https://www.bynekaadu.com/wp-content/uploads/2024/03/Places-to-Visit-in-Karnataka-Discovering-the-Splendor-of-History-Nature-and-Culture.png",
        "https://static.toiimg.com/thumb/imgsize-133846,msid-111403299,width-375,height-210,resizemode-75/111403299.jpg",
        "https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticleimages%2F2022%2F05%2F31%2Fkudremukh-dh-1113925-1653964546.jpg?auto=format%2Ccompress&fmt=webp&fit=max&format=webp&q=70&w=400&dpr=2"
      ]
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle the slideshow interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % experiences[0].imgSrcs.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="recommendation">
      <h2>Famous Tour Events</h2>
      <div className="recommendation-cards">
        {experiences.map((exp, index) => (
          <div key={index} className="card">
            <div className="image">
              <img src={exp.imgSrcs[currentIndex]} alt={exp.title} />
            </div>
            <h3>{exp.title}</h3>
            <p>{exp.date} - {exp.duration}</p>
            <p>{exp.description}</p>
            <a href="#!" className="plan-tour">Plan a tour</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TravelPackages;
